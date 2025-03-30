"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getKycPersonalInfo } from "@/api/kyc";
import { UserContext } from "@/context/UserContext";
import { Profile } from "@/types/Profile";

interface ProfileContextType {
  profile: Profile | null;
  isLoading: boolean;
  error: any;
  setProfile: (profile: Profile) => void;
}

const defaultContextValue: ProfileContextType = {
  profile: null,
  isLoading: true,
  error: null,
  setProfile: () => {},
};

export const ProfileContext = createContext<ProfileContextType>(defaultContextValue);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useContext(UserContext) || {};
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      try {
        const data = await getKycPersonalInfo(user.sub);
        setProfile(data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  return (
    <ProfileContext.Provider value={{ profile, isLoading, error, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
