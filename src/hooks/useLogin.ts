import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/utils/validation";
import { login } from "@/api/auth";
import { setCookie } from "nookies";
import { useToast } from "./use-toast";

export const useLogin = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
    showPassword: false,
    termsAccepted: false,
    isLoading: false,
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;
      setFormState((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    },
    []
  );

  const togglePasswordVisibility = useCallback(() => {
    setFormState((prev) => ({
      ...prev,
      showPassword: !prev.showPassword,
    }));
  }, []);

  const handleLogin = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setFormState((prev) => ({ ...prev, isLoading: true }));

      try {
        await loginSchema.validate(formState, { abortEarly: false });

        const { access_token, refresh_token } = await login(
          formState.email,
          formState.password
        );

        if (access_token) {
          // Secure token storage
          localStorage.setItem("authToken", access_token);
          localStorage.setItem("refreshToken", refresh_token);

          setCookie(null, "authToken", access_token, {
            maxAge: 900000,
            path: "/",
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
          });

          toast({
            title: "تم تسجيل الدخول بنجاح",
            description: "جاري تحويلك إلى لوحة التحكم...",
          });
          router.push("/user");
        }
      } catch (error) {
        let errorMessage = "فشل عملية تسجيل الدخول";
        toast({
          variant: "destructive",
          title: "خطأ في التسجيل",
          description: errorMessage,
        });
      } finally {
        setFormState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [formState, router, toast]
  );

  return {
    formState,
    handleInputChange,
    togglePasswordVisibility,
    handleLogin,
  };
};
