"use client";

import React from "react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLogin } from "@/hooks/useLogin";
import Image from "next/image";

export default function LogInPage() {
  const {
    email,
    password,
    showPassword,
    error,
    isLoading,
    termsAccepted,
    handleEmailChange,
    handlePasswordChange,
    toggleShowPassword,
    handleTermsAcceptedChange,
    handleLogin,
  } = useLogin();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Image
        src="/Logo.png"
        alt="logo"
        width={150}
        height={100}
        className="text-center"
      />
      <div className="p-8 w-full max-w-sm space-y-6">
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-gray-600 text-sm">
              Only login via email or Google is supported in your region.
            </p>
          </div>

          {/* نموذج تسجيل الدخول */}
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <input
                required
                type="text"
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
                {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
              </button>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="flex text-xs">
              <input
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
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 text-white py-2.5 rounded-lg hover:bg-green-600 transition-colors duration-200"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* الروابط الإضافية */}
          <div className="text-center">
            <div className="flex justify-between space-x-6">
              <Link
                href="/forgot-password"
                className="text-green-600 text-sm hover:underline"
              >
                Forgot password?
              </Link>
              <Link
                href="/sign-up"
                className="text-green-600 text-sm hover:underline"
              >
                Sign up
              </Link>
            </div>
          </div>

          {/* خط فاصل */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-white text-gray-500 text-sm">or</span>
            </div>
          </div>

          {/* زر جوجل */}
          <button
            className="w-full flex items-center justify-center gap-2
                     text-gray-600 border border-gray-400 py-2.5 rounded-lg
                     hover:bg-gray-100 transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
            </svg>
            Login with Google
          </button>
        </div>

        <footer className="fixed bottom-0 left-0 right-0 text-center text-sm text-gray-500 py-4 bg-white">
          <Link href={"#"}>© 2025 FLS. All rights reserved. Contact us.</Link>
        </footer>
      </div>
    </div>
  );
}
