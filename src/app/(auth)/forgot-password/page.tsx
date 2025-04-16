"use client";

import Link from "next/link";
import { useForgotPassword } from "@/hooks/useForgotPassword";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const {
    formState,
    handleInputChange,
    handleForgotPassword,
    handleVerifyResetCode,
  } = useForgotPassword();

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
          <div className="text-center space-y-2">
            <p className="text-gray-600 ext-3xl">إعادة تعيين كلمة المرور</p>
            <p className="text-gray-600 text-sm">
              أدخل عنوان بريدك الإلكتروني وسنرسل لك رمز التحقق لإعادة تعيين كلمة
              المرور الخاصة بك.
            </p>
          </div>

          <form className="space-y-4">
            <div>
              <input
                required
                type="email"
                name="email"
                placeholder="عنوان البريد الالكتروني"
                value={formState.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-lamagreen rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 relative">
              <input
                type="text"
                name="resetCode"
                maxLength={6}
                placeholder="# كود"
                value={formState.resetCode}
                onChange={handleInputChange}
                className="w-full sm:w-1/2 px-4 py-2 border border-lamagreen rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={formState.isLoading}
                className="w-full sm:w-auto text-gray-600 border border-lamagreen px-4 py-2 rounded-lg hover:bg-green-500 transition-colors duration-200 whitespace-nowrap min-w-[120px] sm:min-w-[160px] text-sm sm:text-base flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {formState.isLoading && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {formState.isLoading ? "انتظر..." : "إرسال الكود"}
              </button>
            </div>

            <button
              type="button"
              onClick={handleVerifyResetCode}
              disabled={formState.isCodeLoading}
              className="w-full bg-lamagreen text-white py-2.5 rounded-lg hover:bg-green-500 transition-colors duration-200 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {formState.isCodeLoading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {formState.isCodeLoading ? "جاري التحقق..." : "استمر"}
            </button>
          </form>
          <div className="text-center">
            <div className="flex justify-center">
              <Link
                href="/sign-in"
                className="text-green-600 text-sm hover:underline"
              >
                العودة إلى تسجيل الدخول
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
