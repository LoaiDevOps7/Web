import { useState, useEffect, useCallback } from "react";
import { resetPassword } from "../api/auth";
import { useRouter } from "next/navigation";
import { resetPasswordSchema } from "../utils/validation";
import { useToast } from "./use-toast";
import { ValidationError } from "yup";

export const useResetPassword = (userId: number | null) => {
  const { toast } = useToast();
  const router = useRouter();

  const [formState, setFormState] = useState({
    userId: userId,
    newPassword: "",
    confirmPassword: "",
    showPassword: false,
    showConfirmPassword: false,
    isLoading: false,
  });

  useEffect(() => {
    setFormState((prev) => ({
      ...prev,
      userId: userId,
    }));
  }, [userId]);

  useEffect(() => {
    if (userId !== null) {
      setFormState((prev) => ({
        ...prev,
        userId: userId,
        newPassword: "",
        confirmPassword: "",
      }));
    }
  }, [userId]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormState((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const toggleShowPassword = useCallback(() => {
    setFormState((prev) => ({
      ...prev,
      showPassword: !prev.showPassword,
    }));
  }, []);

  const toggleShowConfirmPassword = useCallback(() => {
    setFormState((prev) => ({
      ...prev,
      showConfirmPassword: !prev.showConfirmPassword,
    }));
  }, []);

  const handleResetPassword = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        setFormState((prev) => ({ ...prev, isLoading: true }));

        if (!formState.userId) {
          toast({
            variant: "destructive",
            title: "خطأ في المصادقة",
            description: "الجلسة منتهية، يرجى طلب رمز جديد",
          });
          return router.push("/forgot-password");
        }
        
        await resetPasswordSchema.validate(
          {
            newPassword: formState.newPassword,
            confirmPassword: formState.confirmPassword,
          },
          { abortEarly: false }
        );

        await resetPassword(formState.userId, formState.newPassword);

        toast({
          title: "تم التحديث بنجاح",
          description: "جاري تحويلك إلى لوحة التحكم...",
        });

        router.push("/user");
      } catch (error: any) {
          let errorMessage = "فشل في تحديث كلمة المرور، يرجى المحاولة لاحقًا";

          // معالجة أخطاء التحقق من Yup
          if (error instanceof ValidationError) {
            errorMessage = error.errors.join("، ");
          }
          // معالجة أخطاء API
          else if (error?.response?.data?.message) {
            errorMessage = error.response.data.message;
          }
          // معالجة أخطاء الشبكة
          else if (error.message) {
            errorMessage = error.message;
          }

          toast({
            variant: "destructive",
            title: "فشل العملية",
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
    handleResetPassword,
    toggleShowPassword,
    toggleShowConfirmPassword,
  };
};
