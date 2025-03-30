import axios from "axios";
import { setCookie, destroyCookie } from "nookies";
import { useAuthStore } from "@/store/authStore";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// متغيرات للتحكم في طلبات التجديد
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

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

    // تجاهل طلبات refresh-token الفاشلة
    if (originalRequest.url === "/auth/refresh-token") {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            originalRequest.headers.Authorization = `Bearer ${
              useAuthStore.getState().token
            }`;
            return axiosClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axiosClient.post("/auth/refresh-token", {});
        const newAccessToken = response.data.access_token;
        const newRefreshToken = response.data.refresh_token;

        setCookie(null, "authToken", newAccessToken, {
          maxAge: 900000,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
        setCookie(null, "refreshToken", newRefreshToken, {
          maxAge: 604800000,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        useAuthStore.getState().setToken(newAccessToken);
        processQueue(null, newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        destroyCookie(null, "authToken");
        destroyCookie(null, "refreshToken");
        useAuthStore.getState().clearToken();

        // إعادة التوجيه لصفحة تسجيل الدخول مرة واحدة فقط
        if (
          typeof window !== "undefined" &&
          !window.location.pathname.startsWith("/login")
        ) {
          window.location.href = "/login?session_expired=1";
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
