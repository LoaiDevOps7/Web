import { create } from "zustand";
import axiosClient from "@/lib/axiosClient";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "@/context/UserContext";
import { setCookie } from "cookies-next";

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,

  setToken: (newToken) => {
    const isProduction = process.env.NODE_ENV === "production";

    // إعدادات الكوكي حسب البيئة
    const cookieOptions = isProduction
      ? {
          path: "/",
          secure: true, // مطلوب لـ SameSite=None
          ssameSite: "none" as const, // للسماح عبر النطاقات
          // لا نحدد domain هنا
        }
      : {
          path: "/",
          secure: false, // غير مطلوب في التطوير
          sameSite: "lax" as const,
          domain: "localhost",
        };

    set({ token: newToken });
    setCookie("authToken", newToken, cookieOptions);
  },

  clearToken: () => {
    const isProduction = process.env.NODE_ENV === "production";

    set({ token: null });
    setCookie("authToken", "", {
      path: "/",
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: -1,
    });
  },

  initialize: async () => {
    try {
      const cookies = document.cookie.split("; ");
      const authTokenCookie = cookies.find((cookie) =>
        cookie.startsWith("authToken=")
      );

      if (authTokenCookie) {
        const tokenValue = authTokenCookie.split("=")[1];
        const decoded = jwtDecode<JwtPayload>(tokenValue);

        // تحقق من صلاحية التوكن
        if (decoded.exp && decoded.exp * 1000 > Date.now()) {
          // إذا كان التوكن صالحًا، لا حاجة لطلب توكن جديد
          set({ token: tokenValue });
        } else {
          // إذا كان التوكن غير صالح، قم بطلب تجديد التوكن
          const { data } = await axiosClient.post("/auth/refresh-token");
          set({ token: data.access_token });
        }
      }
    } catch {
      set({ token: null });
    }
  },
}));
