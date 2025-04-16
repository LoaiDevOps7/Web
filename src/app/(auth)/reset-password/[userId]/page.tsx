"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useResetPassword } from "@/hooks/useResetPassword";
import { useToast } from "@/hooks/use-toast";

export default function ResetPasswordPage() {
  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const userIdParam = params.userId;
  const isValidParam = searchParams.get("valid");

  const [validUserId, setValidUserId] = useState<number | null>(null);

  const {
    formState,
    handleInputChange,
    handleResetPassword,
    toggleShowPassword,
    toggleShowConfirmPassword,
  } = useResetPassword(validUserId);

  useEffect(() => {
    if (isValidParam !== "true") {
      router.push("/forgot-password");
    }
  }, [isValidParam, router]);

  useEffect(() => {
    const validateUserId = () => {
      if (!userIdParam) {
        router.push("/forgot-password");
        return;
      }

      const userId = Number(userIdParam);
      if (isNaN(userId) || userId <= 0) {
        router.push("/forgot-password");
      } else {
        setValidUserId(userId);
      }
    };

    validateUserId();
  }, [userIdParam, router]);

  if (validUserId === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

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

      {userIdParam && (
        <div className="p-8 w-full max-w-sm space-y-6">
          <div className="text-center space-y-2">
            <p className="text-gray-600 ext-3xl">إعادة تعيين كلمة المرور</p>
            <p className="text-gray-600 text-sm">
              أدخل كلمة مرور جديدة أدناه لتغيير كلمة المرور الخاصة بك
            </p>
          </div>

          <form
            className="space-y-4"
            onSubmit={handleResetPassword}
          >
            <div className="relative">
              <input
                required
                type={formState.showPassword ? "text" : "password"}
                name="newPassword"
                placeholder="كلمة المرور الجديدة"
                value={formState.newPassword}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-lamagreen rounded-lg outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={toggleShowConfirmPassword}
                className="absolute inset-y-0 right-8 pr-3 flex items-center text-gray-600"
              >
                {formState.showConfirmPassword ? (
                  <FaEyeSlash className="text-gray-500 hover:text-gray-600" />
                ) : (
                  <FaEye className="text-gray-500 hover:text-gray-600" />
                )}
              </button>
            </div>
            <button
              type="submit"
              disabled={formState.isLoading}
              className="w-full bg-lamagreen text-white py-2.5 rounded-lg hover:bg-green-500 transition-colors duration-200"
            >
              {formState.isLoading ? "جاري التحديث..." : "تعيين كلمة المرور"}
            </button>
          </form>
        </div>
      )}
      <div className="text-center">
        <div className="flex justify-center">
          <Link
            href="/forgot-password"
            className="text-green-600 text-sm hover:underline"
          >
            العودة
          </Link>
        </div>
      </div>
    </div>
  );
}
