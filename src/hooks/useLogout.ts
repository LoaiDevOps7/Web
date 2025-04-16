import { useCallback, useContext, useState } from "react";
import { useToast } from "./use-toast";
import { UserContext } from "@/context/UserContext";

export const useLogout = () => {
  const userContext = useContext(UserContext);
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const deleteAllCookies = () => {
    const cookies = document.cookie.split(";");
    const domainParts = window.location.hostname.split(".");
    const mainDomain = domainParts.slice(-2).join(".");

    cookies.forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();

      // حذف جميع الإصدارات الممكنة للكوكي
      [
        `; Path=/; Domain=${mainDomain}`,
        `; Path=/; Domain=.${mainDomain}`,
        `; Path=/`,
      ].forEach((attrs) => {
        document.cookie = `${name}=; Expires=Thu, 01 Jan 1970 00:00:01 GMT${attrs}`;
      });
    });
  };

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);

      // إزالة بيانات التخزين المحلي
      localStorage.clear();

      deleteAllCookies();

      // إعادة تعيين حالة المستخدم
      if (userContext) {
        userContext.setUser(null);
        userContext.setUserProfile(null);
      }

      // إعادة التوجيه
      window.location.href = `/sign-in?t=${Date.now()}`;

      window.setTimeout(() => {
        toast({
          title: "تم تسجيل الخروج بنجاح",
          description: "نراك قريباً!",
        });
      }, 500);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطأ في تسجيل الخروج",
        description: "حدث خطأ أثناء محاولة تسجيل الخروج",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast, userContext]);

  return { isLoading, logout };
};
