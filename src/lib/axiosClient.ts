import axios from "axios";
import { setCookie, destroyCookie } from "nookies";
import { useAuthStore } from "@/store/authStore";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// متغيرات للتحكم في التكرار
let isRefreshing = false;
let failedRequests: any[] = [];

// اعتراض الطلبات
axiosClient.interceptors.request.use((config) => {
  if (config.url !== "/auth/refresh-token") {
    const token = useAuthStore.getState().token; // استخدام الـ store بدلاً من localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// اعتراض الاستجابات
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // تجاهل طلبات refresh-token الفاشلة لمنع الحلقة اللانهائية
    if (error.config.url === "/auth/refresh-token") {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // إرجاع promise جديدة للطلبات المتزامنة
        return new Promise((resolve, reject) => {
          failedRequests.push({ resolve, reject });
        })
          .then(() => axiosClient(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axiosClient.post("/auth/refresh-token", {});
        const newAccessToken = response.data.access_token;

        // تحديث الـ store والطلبات الفاشلة
        useAuthStore.getState().setToken(newAccessToken);
        setCookie(null, "authToken", newAccessToken, {
          maxAge: 900000,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        // إعادة الطلبات الفاشلة
        failedRequests.forEach((prom) => prom.resolve());
        failedRequests = [];

        return axiosClient(originalRequest);
      } catch (refreshError) {
        // تنظيف جميع البيانات وإعادة التوجيه
        failedRequests.forEach((prom) => prom.reject(refreshError));
        failedRequests = [];

        destroyCookie(null, "authToken");
        destroyCookie(null, "refreshToken");
        useAuthStore.getState().clearToken();

        // إعادة التوجيه لصفحة تسجيل الدخول
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
