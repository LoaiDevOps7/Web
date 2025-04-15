"use client";

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import axiosClient from "../lib/axiosClient";
import { getUser } from "@/api/user";
import { Bid } from "@/types/Bid";

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
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const deleteAllCookies = () => {
    const cookies = document.cookie.split(";");
    const domainParts = window.location.hostname.split(".");
    const mainDomain = domainParts.slice(-2).join(".");

    cookies.forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();

      // حذف الكوكي لكل المسارات والدومينات الممكنة
      document.cookie = `${name}=; Path=/; Domain=${mainDomain}; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
      document.cookie = `${name}=; Path=/; Domain=.${mainDomain}; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
      document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    });
  };

  const fetchUserData = useCallback(async () => {
    try {
      const response = await axiosClient.get<User>("/users/data");
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.error("Failed to fetch user:", error);
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    }
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const authToken = localStorage.getItem("authToken");

    if (storedUser && authToken) {
      setUser(JSON.parse(storedUser));
    } else if (authToken) {
      fetchUserData();
    }
  }, [fetchUserData]);

  useEffect(() => {
    const checkTokenValidity = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) return;

      try {
        await axiosClient.get("/auth/validate-token");
      } catch (error) {
        localStorage.clear();
        deleteAllCookies();
        setUser(null);
        setUserProfile(null);
      }
    };

    checkTokenValidity();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        setUser(null);
        setUserProfile(null);
      }
    }, 300000); // كل 5 دقائق

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user?.sub) return;
      try {
        const response = await getUser(user.sub);
        setUserProfile(response);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile();
  }, [user]);

  return (
    <UserContext.Provider
      value={{ user, setUser, userProfile, setUserProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
