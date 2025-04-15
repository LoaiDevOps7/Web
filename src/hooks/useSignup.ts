import { useState, useCallback, useMemo } from "react";
import { register, resendVerification, verifyEmail } from "../api/auth";
import { useRouter } from "next/navigation";
import { registerSchema } from "../utils/validation";
import { debounce } from "lodash";
import { useToast } from "@/hooks/use-toast";

export const useSignup = () => {
  const { toast } = useToast();
  const router = useRouter();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    verificationCode: "",
    showPassword: false,
    showConfirmPassword: false,
    termsAccepted: false,
  });

  const [uiState, setUIState] = useState({
    passwordMatchError: false,
    isLoading: false,
    isCodeSent: false,
  });

  const debouncedEmailValidation = useMemo(
    () =>
      debounce(async (email: string) => {
        try {
          await registerSchema.validate({ email });
          setUIState((prev) => ({ ...prev, verificationError: "" }));
        } catch (error: any) {
          setUIState((prev) => ({
            ...prev,
            verificationError: error.message || "Invalid email format",
          }));
        }
      }, 500),
    []
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: name === "termsAccepted" ? checked : value,
    }));
  }, []);

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(e);
      debouncedEmailValidation(e.target.value);
    },
    [handleChange, debouncedEmailValidation]
  );


  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(e);
      setUIState((prev) => ({
        ...prev,
        passwordMatchError: e.target.value !== formState.confirmPassword,
      }));
    },
    [formState.confirmPassword, handleChange]
  );

  const handleConfirmPasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(e);
      setUIState((prev) => ({
        ...prev,
        passwordMatchError: e.target.value !== formState.password,
      }));
    },
    [formState.password, handleChange]
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

  const validationSchema = useMemo(() => registerSchema, []);

  const handleSignUp = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        setUIState((prev) => ({
          ...prev,
          isLoading: true,
        }));

        await validationSchema.validate(formState, { abortEarly: false });
        await register(formState.email, formState.password);
        setUIState((prev) => ({ ...prev, isCodeSent: true }));
        toast({
          title: "تم التسجيل بنجاح",
          description: "تفقد بريدك الإلكتروني لإكمال التحقق",
        });
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "خطأ في التسجيل",
          description:
            error.message || "حدث خطأ غير متوقع، يرجى المحاولة لاحقًا",
        });
      } finally {
        setUIState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [formState, toast, validationSchema]
  );

  const handleVerifyEmail = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        setUIState((prev) => ({
          ...prev,
          isLoading: true,
        }));

        await verifyEmail(formState.email, formState.verificationCode);

        toast({
          title: "تم التحقق بنجاح!",
          description: "جاري تحويلك إلى صفحة تسجيل الدخول...",
        });
        router.push("/sign-in");
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "فشل التحقق",
          description: error.message || "رمز التحقق غير صحيح أو منتهي الصلاحية",
        });
      } finally {
        setUIState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [formState, router, toast]
  );

  const handleResendVerification = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        if (!formState.email) {
        throw new Error("لم يتم إرسال الرمز مسبقاً");
      }
        setUIState((prev) => ({ ...prev, isLoading: true }));
        await resendVerification(formState.email);
        toast({
          title: "تم إعادة الإرسال",
          description: "تفقد بريدك الإلكتروني للحصول على الرمز الجديد",
        });
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "فشل إعادة الإرسال",
          description: error.message || "يرجى المحاولة مرة أخرى بعد قليل",
        });
      } finally {
        setUIState((prev) => ({ ...prev, isLoading: false }));
      }
    },
    [formState.email, toast]
  );

  return {
    formState,
    setFormState,
    uiState,
    handleChange,
    handlePasswordChange,
    handleEmailChange,
    handleConfirmPasswordChange,
    handleSignUp,
    handleVerifyEmail,
    handleResendVerification,
    toggleShowPassword,
    toggleShowConfirmPassword,
  };
};
