import { useCallback, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./use-toast";
import { UserContext } from "@/context/UserContext";

export const useLogout = () => {
  const userContext = useContext(UserContext);
  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const deleteAllCookies = () => {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=; Path=/; Domain=${window.location.hostname}; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
      document.cookie = `${name}=; Path=/; Domain=.${window.location.hostname}; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    }
  };

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);

      // إزالة بيانات التخزين المحلي
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");

      deleteAllCookies();

      // إعادة تعيين حالة المستخدم
      if (userContext) {
        userContext.setUser(null);
        userContext.setUserProfile(null);
      }

      // إعادة التوجيه
      router.push("/sign-in", { scroll: false });
      window.location.href = "/sign-in";

      toast({
        title: "تم تسجيل الخروج بنجاح",
        description: "نراك قريباً!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطأ في تسجيل الخروج",
        description: "حدث خطأ أثناء محاولة تسجيل الخروج",
      });
    } finally {
      setIsLoading(false);
    }
  }, [router, toast, userContext]);

  return { isLoading, logout };
};
