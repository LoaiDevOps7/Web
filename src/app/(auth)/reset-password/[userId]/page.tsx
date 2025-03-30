"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useResetPassword } from "@/hooks/useResetPassword";
import Link from "next/link";
import Image from "next/image";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { userId } = useParams();

  const {
    newPassword,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    passwordMatchError,
    isLoading,
    successMessage,
    verificationError,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleResetPassword,
    toggleShowPassword,
    toggleShowConfirmPassword,
    setUserId,
  } = useResetPassword();

  useEffect(() => {
    if (!userId) {
      router.push("/forgot-password");
    } else {
      setUserId(Number(userId));
    }
  }, [userId, router, setUserId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Image
        src="/Logo.png"
        alt="logo"
        width={150}
        height={100}
        className="text-center"
      />
      {userId && (
        <div className="p-8 w-full max-w-sm space-y-6">
          <h1 className="text-3xl font-bold text-center text-gray-800">
            Freelancer
          </h1>

          <div className="text-center space-y-2">
            <p className="text-gray-600 ext-3xl">Reset password</p>
            <p className="text-gray-600 text-sm">
              Enter a new password below to change your password.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleResetPassword}>
            <div className="relative">
              <input
                required
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
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
            <div className="relative">
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="w-full px-4 py-2 border border-green-500 rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={toggleShowConfirmPassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}{" "}
              </button>
            </div>
            {passwordMatchError && (
              <p className="text-red-500 text-sm">Passwords do not match.</p>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500 text-white py-2.5 rounded-lg hover:bg-green-600 transition-colors duration-200"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
          {successMessage && (
            <p className="text-green-500 text-center">{successMessage}</p>
          )}
          {verificationError && (
            <p className="text-red-500 text-center">{verificationError}</p>
          )}
        </div>
      )}
      <div className="text-center">
        <div className="flex justify-center">
          <Link
            href="/forgot-password"
            className="text-green-600 text-sm hover:underline"
          >
            Get Back
          </Link>
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 text-center text-sm text-gray-500 py-4 bg-white">
        <Link href="#">© 2025 FLS. All rights reserved. Contact us.</Link>
      </footer>
    </div>
  );
}
