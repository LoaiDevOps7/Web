import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "./use-toast";

export const useLogout = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const logout = async () => {
    try {
      setIsLoading(true);

      localStorage.removeItem("authToken");
      document.cookie =
        "authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";

      router.push("/sign-in");

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
  };

  return { isLoading, logout };
};
