import axios from "axios";
import { setCookie, destroyCookie } from "nookies";
import { useAuthStore } from "@/store/authStore";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// متغيرات التحكم
let isRefreshing = false;
let failedQueue: any[] = [];
let redirecting = false; // علامة لمنع التكرار

const processQueue = (error: any) => {
  failedQueue.forEach((prom) => {
    error ? prom.reject(error) : prom.resolve();
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

    if (originalRequest.url.includes("/auth/refresh-token")) {
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
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axiosClient.post("/auth/refresh-token");
        const newAccessToken = data.access_token;

        setCookie(null, "authToken", newAccessToken, {
          maxAge: 900000,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        useAuthStore.getState().setToken(newAccessToken);
        processQueue(null);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);

        if (!redirecting && typeof window !== "undefined") {
          redirecting = true;
          destroyCookie(null, "authToken");
          destroyCookie(null, "refreshToken");
          useAuthStore.getState().clearToken();

          setTimeout(() => {
            if (!window.location.pathname.startsWith("/login")) {
              window.location.replace("/login?session_expired=1");
            }
            redirecting = false;
          }, 50);
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
