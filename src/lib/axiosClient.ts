import axios from "axios";
import { setCookie, destroyCookie } from "nookies";
import { useAuthStore } from "@/store/authStore";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // تأكد من إرسال الكوكيز مع كل طلب
});

// اعتراض الطلبات لإضافة الـ access token من localStorage لكل الطلبات ما عدا طلب تجديد التوكن
axiosClient.interceptors.request.use((config) => {
  // لا نضيف الـ Authorization في حالة طلب تجديد التوكن
  if (config.url !== "/auth/refresh-token") {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// اعتراض الاستجابات للتعامل مع أخطاء 401 وتجديد التوكن
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // إذا كانت حالة الخطأ 401 ولم تتم إعادة المحاولة بعد
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // إرسال طلب لتحديث التوكن؛ الـ refresh token سيُستخلص من الكوكيز تلقائيًا
        const response = await axiosClient.post("/auth/refresh-token", {});
        const newAccessToken = response.data.access_token;
        const newRefreshToken = response.data.refresh_token;

        // تحديث الكوكيز بالتوكنات الجديدة
        setCookie(null, "authToken", newAccessToken, {
          maxAge: 900000,
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
        setCookie(null, "refreshToken", newRefreshToken, {
          maxAge: 604800000, // 7 أيام
          path: "/",
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        useAuthStore.getState().setToken(newAccessToken);

        // تحديث الـ Authorization header في الطلب الأصلي وإعادة إرساله
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (err) {
        // في حال فشل تجديد التوكن، يتم مسح الكوكيز وإعادة التوجيه لصفحة تسجيل الدخول
        destroyCookie(null, "authToken");
        destroyCookie(null, "refreshToken");
        useAuthStore.getState().clearToken();
        
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
