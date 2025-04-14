"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSignup } from "@/hooks/useSignup";
import { useToast } from "@/hooks/use-toast";

export default function SignupPage() {
  const { toast } = useToast();

  const {
    formState,
    handleChange,
    uiState,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSignUp,
    handleVerifyEmail,
    handleResendVerification,
    toggleShowPassword,
    toggleShowConfirmPassword,
  } = useSignup();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  // إعداد تايمر إعادة إرسال الكود
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // عند الضغط على زر "Send Code"/"Resend Code"
  const handleButtonClick = async (e: React.FormEvent) => {
    e.preventDefault();

    // التحقق من تعبئة الحقول المطلوبة
     if (
       !formState.email ||
       !formState.password ||
       !formState.confirmPassword ||
       !formState.termsAccepted
     ) {
       toast({
         variant: "destructive",
         title: "حقول مطلوبة",
         description: "يرجى تعبئة جميع الحقول المطلوبة",
       });
       return;
     }

    // إذا كانت كلمات المرور غير متطابقة، لا نقوم بالمتابعة
    if (uiState.passwordMatchError) {
      toast({
        variant: "destructive",
        title: "خطأ في كلمة المرور",
        description: "كلمات المرور غير متطابقة",
      });
      return;
    }

    setIsButtonDisabled(true);

     try {
    if (!uiState.isCodeSent) {
      await handleSignUp(e);
      setResendTimer(90);
    } else {
      if (resendTimer > 0) return;
      await handleResendVerification(e);
      setResendTimer(90);
    }
  } catch (error) {
    toast({
      variant: "destructive",
      title: "حقول مطلوبة",
      description: "يرجى تعبئة جميع الحقول المطلوبة",
    });
  } finally {
    setTimeout(() => setIsButtonDisabled(false), 3000);
  }  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Link href="/">
        <Image
          src="/logo.png"
          alt="logo"
          width={150}
          height={100}
          className="text-center"
        />
      </Link>
      <div className="p-8 w-full max-w-sm space-y-6">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            حساب مبدع الخاص بنا هو كل ما تحتاجه للوصول إلى جميع خدمات المستقلين.
          </p>
          <p className="text-sm text-gray-600">
            يتم دعم تسجيل البريد الإلكتروني فقط في منطقتك.
          </p>

          <form className="space-y-4">
            <div>
              <input
                required
                type="email"
                name="email"
                placeholder="عنوان البريد الالكتروني"
                value={formState.email}
                onChange={handleEmailChange}
                className="w-full px-4 py-2 border border-lamagreen rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <input
                required
                type={formState.showPassword ? "text" : "password"}
                name="password"
                placeholder="كلمة المرور"
                value={formState.password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border border-lamagreen rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-8 pr-3 flex items-center text-gray-600"
              >
                {formState.showPassword ? (
                  <FaEyeSlash className="text-gray-500 hover:text-gray-600" />
                ) : (
                  <FaEye className="text-gray-500 hover:text-gray-600" />
                )}
              </button>
            </div>

            <div className="relative">
              <input
                required
                type={formState.showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="تأكيد كلمة المرور"
                value={formState.confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="w-full px-4 py-2 border border-lamagreen rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={toggleShowConfirmPassword}
                className="absolute inset-y-0 right-8 pr-3 flex items-center text-gray-600"
              >
                {formState.showPassword ? (
                  <FaEyeSlash className="text-gray-500 hover:text-gray-600" />
                ) : (
                  <FaEye className="text-gray-500 hover:text-gray-600" />
                )}
              </button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 relative">
              <input
                type="text"
                name="verificationCode"
                maxLength={6}
                placeholder="# الكود"
                value={formState.verificationCode}
                onChange={handleChange}
                className="w-full sm:w-1/2 px-4 py-2 border border-lamagreen rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={handleButtonClick}
                disabled={
                  isButtonDisabled || (uiState.isCodeSent && resendTimer > 0)
                }
                className="w-full sm:w-auto text-gray-600 border border-lamagreen px-4 py-2 rounded-lg hover:bg-green-500 transition-colors duration-200 whitespace-nowrap min-w-[120px] sm:min-w-[160px] text-sm sm:text-base"
              >
                {isButtonDisabled
                  ? "انتظر..."
                  : resendTimer > 0
                  ? `إرسال مجدداً ${resendTimer} ث`
                  : uiState.isCodeSent
                  ? "إعادة الإرسال"
                  : "إرسال الكود"}
              </button>
            </div>

            <div className="flex text-xs">
              <input
                required
                type="checkbox"
                name="termsAccepted"
                checked={formState.termsAccepted}
                onChange={handleChange}
                className="w-5 h-5 accent-lamagreen rounded-lg focus:ring-green-500"
              />
              <label className="ml-2 text-gray-600">
                أؤكد أنني قرأت ووافقت على{" "}
                <Link href="#" className="text-lamagreen hover:underline">
                  شروط الاستخدام
                </Link>{" "}
                و{" "}
                <Link href="#" className="text-lamagreen hover:underline">
                  سياسة الخصوصية
                </Link>
              </label>
            </div>

            <button
              type="button"
              onClick={async (e) => {
                try {
                  await handleVerifyEmail(e);
                } catch (error) {
                  toast({
                    variant: "destructive",
                    title: "فشل التحقق",
                    description: "رمز التحقق غير صحيح أو منتهي الصلاحية",
                  });
                }
              }}
              disabled={uiState.isLoading}
              className="w-full bg-lamagreen text-white py-2.5 rounded-lg hover:bg-green-500 transition-colors duration-200"
            >
              {uiState.isLoading ? "جاري التسجيل..." : "إنشاء حساب"}
            </button>
          </form>

          <div className="text-center">
            <div className="flex justify-center">
              <Link
                href="/sign-in"
                className="text-lamagreen text-sm hover:underline"
              >
                تسجيل الدخول
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
