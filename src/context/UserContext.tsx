"use client";

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import axiosClient from "../lib/axiosClient";
import { getUser } from "@/api/user";
import { Bid } from "@/types/Bid";
import { useAuthStore } from "@/store/authStore";
import { jwtDecode } from "jwt-decode";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export interface JwtPayload {
  sub: number;
  email: string;
  roles: string[];
  exp?: number;
  iat?: number;
}

// تعريف نوع بيانات المستخدم
export interface User {
  sub: number;
  email: string;
  roles: string[];
}

interface UserProfile {
  isEmailVerified: boolean;
  verificationCode: string | null;
  verificationCodeExpiry: string | null;
  remainingBids: number;
  lastBidReset: string | null;
  resetCode: string | null;
  resetCodeExpiry: string | null;
  subscriptions: string[] | null;
  personalInfo: string | null;
  kycVerification: string | null;
  projects: string[] | null;
  bids: Bid[] | null;
  wallet: string;
  transactions: string[] | null;
  portfolio: string[] | null;
  ratingsGiven: string[] | null;
  ratingsReceived: string[] | null;
}

// تعريف نوع الـ Context
interface UserContextType {
  userProfile: UserProfile | null;
  setUserProfile: (userProfile: UserProfile | null) => void;
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
}

// إنشاء الـ Context مع القيمة الافتراضية
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

// تعريف نوع البروبز لمكون UserProvider
interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({
  children,
}): JSX.Element => {
  const { toast } = useToast();
   const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { token, clearToken } = useAuthStore();

  const deleteAllCookies = useCallback(() => {
    const hostParts = window.location.hostname.split(".");
    const domains = [
      window.location.hostname,
      `.${hostParts.slice(-2).join(".")}`,
      "",
    ];

    domains.forEach((domain) => {
      document.cookie = `authToken=; Path=/; Domain=${domain}; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
      document.cookie = `refreshToken=; Path=/; Domain=${domain}; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
    });
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await axiosClient.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearToken();
      deleteAllCookies();
      setUser(null);
      setUserProfile(null);
      router.push("/sign-in");
    }
  }, [clearToken, deleteAllCookies, router]);

   useEffect(() => {
     const parseToken = () => {
       if (!token) {
         setUser(null);
         return;
       }

       try {
         const decoded = jwtDecode<JwtPayload>(token);
         if (decoded.exp && decoded.exp * 1000 < Date.now()) {
           handleLogout();
           return;
         }

         setUser({
           sub: decoded.sub,
           email: decoded.email,
           roles: decoded.roles,
         });
       } catch (error) {
         console.error("Invalid token:", error);
         toast({
           variant: "destructive",
           title: "خطأ في المصادقة",
           description: "رمز المصادقة غير الصالح.",
         });
         handleLogout();
       }
     };

     parseToken();
   }, [token, handleLogout, toast]);

  useEffect(() => {
    const interceptor = axiosClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          handleLogout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosClient.interceptors.response.eject(interceptor);
    };
  }, [handleLogout]);

  const fetchUserData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axiosClient.get<User>("/users/data");
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
       toast({
         variant: "destructive",
         title: "خطأ في البيانات",
         description: "فشل جلب بيانات المستخدم. يرجى المحاولة مرة أخرى.",
       });
      handleLogout();
    } finally {
      setIsLoading(false);
    }
  }, [handleLogout, toast]);

  useEffect(() => {
    const checkAuthState = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        await axiosClient.get("/auth/validate-token");
        await fetchUserData();
      } catch (error) {
        toast({
          variant: "destructive",
          title: "خطأ في الجلسة",
          description:
            "فشل في التحقق من صحة الجلسة. يرجى تسجيل الدخول مرة أخرى.",
        });
        handleLogout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthState();
  }, [token, fetchUserData, handleLogout, toast]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user?.sub) return;

      setIsLoading(true);
      try {
        const response = await getUser(user.sub);
        setUserProfile(response);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        toast({
          variant: "destructive",
          title: "خطأ في الملف الشخصي",
          description: "فشل تحميل ملف تعريف المستخدم. اعاده المحاوله...",
        });
        setTimeout(fetchUserProfile, 5000);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [user?.sub, toast]);

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      userProfile,
      setUserProfile,
      isLoading,
    }),
    [user, userProfile, isLoading]
  );


  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
