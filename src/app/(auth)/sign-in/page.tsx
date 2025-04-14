"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLogin } from "@/hooks/useLogin";

export default function LogInPage() {
  const {
    formState,
    handleInputChange,
    togglePasswordVisibility,
    handleLogin,
  } = useLogin();

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
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              مرحباً بعودتك
            </h1>
            <p className="text-gray-600 text-sm">
              يرجى إدخال بياناتك للدخول إلى حسابك
            </p>
          </div>
          <form className="space-y-4" onSubmit={handleLogin} method="POST">
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

            <div className="relative">
              <input
                required
                type={formState.showPassword ? "text" : "password"}
                name="password"
                placeholder="كلمة المرور"
                value={formState.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-lamagreen rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-8 pr-3 flex items-center text-gray-600"
              >
                {formState.showPassword ? (
                  <FaEyeSlash className="text-gray-500 hover:text-gray-600" />
                ) : (
                  <FaEye className="text-gray-500 hover:text-gray-600" />
                )}
              </button>
            </div>
            <div className="flex text-xs">
              <input
                required
                type="checkbox"
                name="termsAccepted"
                checked={formState.termsAccepted}
                onChange={handleInputChange}
                className="w-5 h-5 accent-lamagreen rounded-lg focus:ring-green-500"
              />
              <label className="ml-2 text-gray-600">
                أوافق على{" "}
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
              type="submit"
              disabled={formState.isLoading}
              className="w-full bg-lamagreen text-white py-2.5 rounded-lg hover:bg-green-600 transition-colors duration-200 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {formState.isLoading && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {formState.isLoading ? "جاري التحقق..." : "تسجيل الدخول"}
            </button>
          </form>

          {/* الروابط الإضافية */}
          <div className="text-center">
            <div className="flex justify-between space-x-6">
              <Link
                href="/forgot-password"
                className="text-lamagreen text-sm hover:underline"
              >
                نسيت كلمة المرور ؟
              </Link>
              <Link
                href="/sign-up"
                className="text-lamagreen text-sm hover:underline"
              >
                انشاء حساب
              </Link>
            </div>
          </div>

          {/* خط فاصل */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-white text-gray-500 text-sm">او</span>
            </div>
          </div>

          {/* زر جوجل */}
          <button
            className="w-full flex items-center justify-center gap-3
                     text-gray-700 bg-white border border-gray-300 py-2.5 rounded-lg
                     hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
            </svg>
            <span>المتابعة باستخدام جوجل</span>
          </button>
        </div>
      </div>
    </div>
  );
}
