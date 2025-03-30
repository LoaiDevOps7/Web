import axios from "axios";
import { setCookie, destroyCookie } from "nookies";
import { useAuthStore } from "@/store/authStore";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// متغيرات التحكم في التجديد
let isRefreshing = false;
let refreshPromise: Promise<any> | null = null;

axiosClient.interceptors.request.use((config) => {
  if (config.url !== "/auth/refresh-token") {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // تجاهل جميع طلبات /auth/*
    if (originalRequest.url?.includes("/auth/")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing && refreshPromise) {
        // إرجاع نفس الـ promise للطلبات المتزامنة
        return refreshPromise.then(() => {
          originalRequest.headers.Authorization = `Bearer ${
            useAuthStore.getState().token
          }`;
          return axiosClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // إنشاء promise واحدة فقط
        refreshPromise = axiosClient.post("/auth/refresh-token");

        const response = await refreshPromise;
        const newAccessToken = response.data.access_token;

        // تحديث التوكن في المتجر والكوكيز
        setCookie(null, "authToken", newAccessToken, {
          maxAge: 900000,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
        useAuthStore.getState().setToken(newAccessToken);

        // إعادة الطلب الأصلي
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        // إلغاء التوكن دون إعادة توجيه
        destroyCookie(null, "authToken");
        useAuthStore.getState().clearToken();
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
        refreshPromise = null;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
