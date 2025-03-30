import { create } from "zustand";

// تعريف نوع بيانات حالة التوكن
interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

// إنشاء Zustand store مع تحديد الأنواع
export const useAuthStore = create<AuthState>((set) => ({
  token:
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null,

  setToken: (newToken) => {
    localStorage.setItem("authToken", newToken);
    set({ token: newToken });
  },

  clearToken: () => {
    localStorage.removeItem("authToken");
    set({ token: null });
  },
}));
