"use client";

import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSignup } from "@/hooks/useSignup";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function SignupPage() {
  const {
    email,
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    passwordMatchError,
    verificationCode,
    verificationError,
    isLoading,
    successMessage,
    termsAccepted,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    toggleShowPassword,
    toggleShowConfirmPassword,
    handleVerificationCodeChange,
    handleTermsAcceptedChange,
    handleSignUp,
    handleVerifyEmail,
    handleResendVerification,
    setVerificationError,
  } = useSignup();

  const [isFirstClick, setIsFirstClick] = useState(true);
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
    if (!email || !password || !confirmPassword || !termsAccepted) {
      setVerificationError("Please fill in all required fields.");
      return;
    }

    // إذا كانت كلمات المرور غير متطابقة، لا نقوم بالمتابعة
    if (passwordMatchError) {
      setVerificationError("Passwords do not match.");
      return;
    }

    setVerificationError(""); // إعادة تعيين رسالة الخطأ إن وجدت
    setIsButtonDisabled(true);

    if (isFirstClick) {
      // استدعاء التسجيل في حالة الضغط الأولي
      await handleSignUp(e);
      setIsFirstClick(false);
    } else {
      // في حالة إعادة إرسال الرمز
      await handleResendVerification(e);
      setResendTimer(60);
    }

    // منع الضغط المتكرر لمدة 3 ثواني
    setTimeout(() => setIsButtonDisabled(false), 3000);
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
    <Image
      src="/logo.png"
      alt="logo"
      width={150}
      height={100}
      className="text-center"
    />
      <div className="p-8 w-full max-w-sm space-y-6">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Our Freelancer account is all you need to access all Freelancer
            services.
          </p>
          <p className="text-sm text-gray-600">
            Only email registration is supported in your region.
          </p>

          <form className="space-y-4">
            <div>
              <input
                required
                type="email"
                placeholder="Email address"
                value={email}
                onChange={handleEmailChange}
                className="w-full px-4 py-2 border border-green-500 rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <input
                required
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border border-green-500 rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="relative">
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="w-full px-4 py-2 border border-green-500 rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={toggleShowConfirmPassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {passwordMatchError && (
              <p className="text-sm text-red-500">Passwords do not match.</p>
            )}

            <div className="flex space-x-10 items-center">
              <input
                type="text"
                placeholder="# Code"
                value={verificationCode}
                onChange={handleVerificationCodeChange}
                className="w-1/2 px-4 py-2 border border-green-500 rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={handleButtonClick}
                disabled={isButtonDisabled}
                className="text-gray-600 border border-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
              >
                {isButtonDisabled
                  ? "Please wait..."
                  : resendTimer > 0
                  ? `Resend in ${resendTimer}s`
                  : isFirstClick
                  ? "Send Code"
                  : "Resend Code"}
              </button>
            </div>

            {verificationError && (
              <p className="text-sm text-red-500">{verificationError}</p>
            )}

            {successMessage && (
              <p className="text-sm text-green-500">{successMessage}</p>
            )}

            <div className="flex text-xs">
              <input
                required
                type="checkbox"
                name="termsAccepted"
                checked={termsAccepted}
                onChange={handleTermsAcceptedChange}
                className="w-5 h-5 accent-green-500 rounded-lg focus:ring-green-500"
              />
              <label className="ml-2 text-gray-600">
                I confirm that I have read, consent and agree to
                Freelancer&apos;s{" "}
                <Link href="#" className="text-green-600 hover:underline">
                  Terms of Use
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-green-600 hover:underline">
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            <button
              type="button"
              onClick={handleVerifyEmail}
              disabled={isLoading}
              className="w-full bg-green-500 text-white py-2.5 rounded-lg hover:bg-green-600 transition-colors duration-200"
            >
              {isLoading ? "Signing Up..." : "Sign up"}
            </button>
          </form>

          <div className="text-center">
            <div className="flex justify-center">
              <Link
                href="/sign-in"
                className="text-green-600 text-sm hover:underline"
              >
                Login
              </Link>
            </div>
          </div>
        </div>

        <footer className="fixed bottom-0 left-0 right-0 text-center text-sm text-gray-500 py-4 bg-white">
          <Link href="#">© 2025 FLS. All rights reserved. Contact us.</Link>
        </footer>
      </div>
    </div>
  );
}
