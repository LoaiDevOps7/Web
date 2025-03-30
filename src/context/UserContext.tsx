"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
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

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        return;
      }

      try {
        const response = await axiosClient.get<User>("/users/data");
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) return;
      try {
        const response = await getUser(user?.sub);
        setUserProfile(response);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
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
