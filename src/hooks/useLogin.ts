import { useState, useCallback } from "react";
import { loginSchema } from "@/utils/validation";
import { login } from "@/api/auth";
import { useToast } from "./use-toast";
import { ValidationError } from "yup";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

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
        await login(formState.email, formState.password);

        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: "جاري تحويلك إلى لوحة التحكم...",
        });
        router.push("/user");
      } catch (error: any) {
        let errorMessage = "فشل عملية تسجيل الدخول";
        // معالجة أخطاء التحقق من Yup
        if (error instanceof ValidationError) {
          errorMessage = error.errors.join("، ");
        }
        // معالجة أخطاء الشبكة
        else if (error.message) {
          errorMessage = error.message;
        }

        toast({
          variant: "destructive",
          title: "خطأ في التسجيل",
          description: errorMessage,
        });
      } finally {
        setFormState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [formState, toast, router]
  );

  return {
    formState,
    handleInputChange,
    togglePasswordVisibility,
    handleLogin,
  };
};
