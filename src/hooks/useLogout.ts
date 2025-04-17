import { useCallback, useContext, useState } from "react";
import { useToast } from "./use-toast";
import { UserContext } from "@/context/UserContext";
import { useAuthStore } from "@/store/authStore";

export const useLogout = () => {
  const userContext = useContext(UserContext);
  const { toast } = useToast();

  const clearToken = useAuthStore((state) => state.clearToken);
  const setUser = userContext?.setUser;
  const setUserProfile = userContext?.setUserProfile;

  const [isLoading, setIsLoading] = useState(false);

  const deleteAllCookies = useCallback(() => {
    const hostParts = window.location.hostname.split(".");
    const domains = [
      window.location.hostname,
      `.${hostParts.slice(-2).join(".")}`, // النطاق الرئيسي مثل .example.com
      "",
    ];

    domains.forEach((domain) => {
      document.cookie = `authToken=; Path=/; Domain=${domain}; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
      document.cookie = `refreshToken=; Path=/; Domain=${domain}; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
    });
  }, []);

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);

      clearToken();
      deleteAllCookies();

      // إعادة تعيين حالة المستخدم
      setUser?.(null);
      setUserProfile?.(null);

      toast({
        title: "تم تسجيل الخروج بنجاح",
        description: "نراك قريباً!",
      });

      // إعادة التوجيه
      setTimeout(() => {
        window.location.href = `/sign-in?t=${Date.now()}`;
      }, 1000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطأ في تسجيل الخروج",
        description: "حدث خطأ أثناء محاولة تسجيل الخروج",
      });
    } finally {
      setIsLoading(false);
    }
  }, [clearToken, deleteAllCookies, setUser, setUserProfile, toast]);

  return { isLoading, logout };
};
