import axios from "axios";
import { setCookie, destroyCookie } from "nookies";
import { useAuthStore } from "@/store/authStore";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

const authState = {
  isRefreshing: false,
  refreshPromise: null as Promise<any> | null,
};

axiosClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    // معالجة أخطاء 401 Unauthorized
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (!authState.isRefreshing) {
          authState.isRefreshing = true;
          authState.refreshPromise = axiosClient.post("/auth/refresh-token");
        }

        const { data } = await authState.refreshPromise;
        const newToken = data.access_token;

        // تحديث التوكن في المتجر والكوكيز
        useAuthStore.getState().setToken(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        // إعادة الطلب الأصلي بعد التحديث
        return axiosClient(originalRequest);
      } catch (refreshError) {
        // معالجة فشل تجديد التوكن
        destroyCookie(null, "authToken");
        destroyCookie(null, "refreshToken");
        useAuthStore.getState().clearToken();

        // إعادة التوجيه لصفحة تسجيل الدخول
        if (typeof window !== "undefined") {
          window.location.href = "/sign-in";
        }
        return Promise.reject(refreshError);
      } finally {
        authState.isRefreshing = false;
        authState.refreshPromise = null;
      }
    }

    // معالجة أخطاء أخرى
    return Promise.reject(error);
  }
);

export default axiosClient;
