import { useState, useEffect, useCallback } from "react";
import { resetPassword } from "../api/auth";
import { useRouter } from "next/navigation";
import { resetPasswordSchema } from "../utils/validation";
import { useToast } from "./use-toast";

export const useResetPassword = () => {
  const { toast } = useToast();
  const router = useRouter();

 const [formState, setFormState] = useState({
   userId: null as number | null,
   newPassword: "",
   confirmPassword: "",
   showPassword: false,
   showConfirmPassword: false,
   isLoading: false,
   passwordMatchError: false,
 });

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId");
    if (storedUserId) {
      setFormState((prev) => ({
        ...prev,
        userId: parseInt(storedUserId, 10) || null,
      }));
    }
  }, []);

  useEffect(() => {
    const match =
      formState.newPassword === formState.confirmPassword &&
      formState.confirmPassword.length > 0;

    setFormState((prev) => ({
      ...prev,
      passwordMatchError: !match,
    }));
  }, [formState.newPassword, formState.confirmPassword]);


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

      if (!formState.userId) {
        toast({
          variant: "destructive",
          title: "خطأ في المصادقة",
          description: "الجلسة منتهية، يرجى طلب رمز جديد",
        });
        return router.push("/forgot-password");
      }

      try {
        setFormState((prev) => ({ ...prev, isLoading: true }));

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
        localStorage.removeItem("userId");
        router.push("/user");
      } catch (error: any) {
        let errorMessage = "فشل في تحديث كلمة المرور، يرجى المحاولة لاحقًا";
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
