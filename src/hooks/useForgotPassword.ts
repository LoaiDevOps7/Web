import { useCallback, useState } from "react";
import { forgotPassword, verifyResetCode } from "../api/auth";
import { forgotPasswordSchema } from "../utils/validation";
import { useRouter } from "next/navigation";
import { useToast } from "./use-toast";

export const useForgotPassword = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [formState, setFormState] = useState({
    email: "",
    resetCode: "",
    isLoading: false,
    isCodeLoading: false,
  });

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormState((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const handleForgotPassword = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        setFormState((prev) => ({ ...prev, isLoading: true }));

        await forgotPasswordSchema.validate(
          { email: formState.email },
          { abortEarly: false }
        );

        const response = await forgotPassword(formState.email);

        if (response?.userId) {
          localStorage.setItem("userId", response.userId.toString());
          toast({
            title: "تم الإرسال بنجاح",
            description:
              "تم إرسال البريد الإلكتروني لإعادة تعيين كلمة المرور بنجاح",
          });
        }
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "خطأ في الإرسال",
          description: "حدث خطأ. يرجى المحاولة مرة أخرى لاحقا",
        });
      } finally {
        setFormState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [formState, router, toast]
  );

  const handleVerifyResetCode = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        setFormState((prev) => ({ ...prev, isCodeLoading: true }));

        const storedUserId = localStorage.getItem("userId");
        if (!storedUserId) {
          toast({
            variant: "destructive",
            title: "خطأ في التحقق",
            description:
              "لم يتم العثور على معرف المستخدم. يرجى طلب إعادة تعيين الرمز مرة أخرى",
          });
        }
        const userId = Number(storedUserId);

        await verifyResetCode(userId, formState.resetCode);

        toast({
          title: "تم التحقق بنجاح",
          description: "جاري تحويلك إلى صفحة إعادة التعيين...",
        });
        router.push(`/reset-password/${userId}`);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "فشل التحقق",
          description: "حدث خطأ. يرجى المحاولة مرة أخرى لاحقا",
        });
      } finally {
        setFormState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [formState.resetCode, router, toast]
  );

  return {
    formState,
    handleInputChange,
    handleForgotPassword,
    handleVerifyResetCode,
  };
};
