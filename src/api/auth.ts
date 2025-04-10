import { setCookie, destroyCookie } from "nookies";
import axiosClient from "../lib/axiosClient";
import axios from "axios";
import { COOKIE_CONFIG } from "@/lib/constants";

// const authToken = localStorage.getItem("authToken");

const handleApiError = (error: unknown, defaultMessage: string) => {
  if (axios.isAxiosError(error)) {
    const serverMessage = error.response?.data?.message || "حدث خطأ غير متوقع";
    throw new Error(serverMessage);
  }
  throw new Error(defaultMessage);
};

export const register = async (email: string, password: string) => {
  try {
    const response = await axiosClient.post("/auth/register", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "فشل في عملية التسجيل");
  }
};

export const verifyEmail = async (email: string, code: string) => {
  try {
    const response = await axiosClient.post("/auth/verify-email", {
      email,
      code,
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "فشل في تأكيد البريد الإلكتروني");
  }
};

export const resendVerification = async (email: string) => {
  try {
    const response = await axiosClient.post("/auth/resend-verification", {
      email,
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "فشل الإرسال");
  }
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosClient.post("/auth/login", { email, password });
    setCookie(null, "authToken", response.data.access_token, {
      ...COOKIE_CONFIG,
      maxAge: 900, // 15 دقيقة
    });
    setCookie(null, "refreshToken", response.data.refresh_token, {
      ...COOKIE_CONFIG,
      maxAge: 604800, // 7 أيام
    });
    return response.data;
  } catch (error) {
    handleApiError(error, "فشل في تسجيل الدخول");
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await axiosClient.post("/auth/forgot-password", { email });
    return response.data;
  } catch (error: any) {
    handleApiError(error, "فشل في عملية إرسال بريد إعادة تعيين كلمة المرور");
    throw new Error("حدث خطأ أثناء محاولة إرسال البريد الإلكتروني");
  }
};

export const verifyResetCode = async (userId: number, resetCode: string) => {
  try {
    const response = await axiosClient.post("/auth/verify-reset-code", {
      userId,
      resetCode,
    });
    return response.data;
  } catch (error: any) {
    handleApiError(error, "فشل في عملية التحقق من رمز إعادة تعيين كلمة المرور");
    throw new Error(
      "حدث خطأ أثناء محاولة التحقق من رمز إعادة تعيين كلمة المرور",
    );
  }
};

export const resetPassword = async (userId: number, newPassword: string) => {
  try {
    const response = await axiosClient.post(`/auth/reset-password/${userId}`, {
      newPassword,
    });
    return response.data;
  } catch (error: any) {
    handleApiError(error, "فشل في عملية إعادة تعيين كلمة المرور");
    throw new Error("حدث خطأ أثناء محاولة إعادة تعيين كلمة المرور");
  }
};
