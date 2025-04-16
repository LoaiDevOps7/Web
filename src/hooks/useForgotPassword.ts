import { useCallback, useState } from "react";
import { forgotPassword, verifyResetCode } from "../api/auth";
import { forgotPasswordSchema } from "../utils/validation";
import { useRouter } from "next/navigation";
import { useToast } from "./use-toast";
import { ValidationError } from "yup";

export const useForgotPassword = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [formState, setFormState] = useState({
    email: "",
    resetCode: "",
    userId: null as number | null,
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
          setFormState((prev) => ({
            ...prev,
            userId: response.userId,
          }));

          toast({
            title: "تم الإرسال بنجاح",
            description: "تم إرسال رمز التحقق إلى بريدك الإلكتروني",
          });
        }
      } catch (error: any) {
        let errorMessage = "حدث خطأ. يرجى المحاولة مرة أخرى لاحقا";

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
    [formState, toast]
  );

  const handleVerifyResetCode = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        if (!formState.userId) {
          toast({
            variant: "destructive",
            title: "خطأ في التحقق",
            description: "لم يتم العثور على مستخدم صالح",
          });
          return;
        }

        setFormState((prev) => ({ ...prev, isCodeLoading: true }));

        await verifyResetCode(formState.userId, formState.resetCode);

        toast({
          title: "تم التحقق بنجاح",
          description: "جاري تحويلك إلى صفحة إعادة التعيين...",
        });
        router.push(`/reset-password/${formState.userId}?valid=true`);
      } catch (error: any) {
        let errorMessage = "حدث خطأ. يرجى المحاولة مرة أخرى لاحقا";
        
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
        setFormState((prev) => ({ ...prev, isCodeLoading: false }));
      }
    },
    [formState.userId, formState.resetCode, router, toast]
  );

  return {
    formState,
    handleInputChange,
    handleForgotPassword,
    handleVerifyResetCode,
  };
};
