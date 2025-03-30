"use client";

import Link from "next/link";
import { useForgotPassword } from "@/hooks/useForgotPassword";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const {
    email,
    resetCode,
    isLoading,
    successMessage,
    verificationError,
    handleEmailChange,
    handleForgotPassword,
    handleResetCodeChange,
    handleVerifyResetCode,
  } = useForgotPassword();

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
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Freelancer
        </h1>

        <div className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-gray-600 ext-3xl">Reset password</p>
            <p className="text-gray-600 text-sm">
              Enter your email address and we will send you a verification code
              to reset your password.
            </p>
          </div>

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

            <div className="flex space-x-10 items-center">
              <input
                type="text"
                placeholder="# Code"
                value={resetCode}
                onChange={handleResetCodeChange}
                className="w-1/2 px-4 py-2 border border-green-500 rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={isLoading}
                className="text-gray-600 border border-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
              >
                {isLoading ? "Sending..." : "Send Code"}
              </button>
            </div>

            <button
              type="button"
              onClick={handleVerifyResetCode}
              disabled={isLoading}
              className="w-full bg-green-500 text-white py-2.5 rounded-lg hover:bg-green-600 transition-colors duration-200"
            >
              {isLoading ? "Loading..." : "Continue"}
            </button>
          </form>

          {successMessage && (
            <p className="text-green-600 text-center">{successMessage}</p>
          )}
          {verificationError && (
            <p className="text-red-600 text-center">{verificationError}</p>
          )}

          <div className="text-center">
            <div className="flex justify-center">
              <Link
                href="/sign-in"
                className="text-green-600 text-sm hover:underline"
              >
                Back to Login
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
