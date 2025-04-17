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
     const domain = isProduction ? ".railway.app" : "localhost";
    set({ token: newToken });
    setCookie("authToken", newToken, {
      path: "/",
      secure: isProduction,
      sameSite: "lax",
      domain: domain,
    });
  },

  clearToken: () => {
    set({ token: null });
    setCookie("authToken", "", { maxAge: -1 });
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
