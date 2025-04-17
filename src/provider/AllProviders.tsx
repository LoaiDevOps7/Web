"use client";

import { ReactNode, memo, useEffect } from "react";
import UserProvider from "@/context/UserContext";
import { ActivityProvider } from "@/context/ActivityContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { PortfolioProvider } from "@/context/PortfolioContext";
import { RatingsProvider } from "@/context/RatingsContext";
import { ProfileProvider } from "@/context/ProfileContext";
import { WalletProvider } from "@/context/WalletContext";
import { ProjectProvider } from "@/context/ProjectContext";
import { useAuthStore } from "@/store/authStore";
// import { ChatProvider } from "@/context/ChatContext";

const providers = [
  UserProvider,
  ProjectProvider,
  ProfileProvider,
  ActivityProvider,
  NotificationProvider,
  PortfolioProvider,
  RatingsProvider,
  WalletProvider,
  // ChatProvider,
].reverse();

const CombinedProviders = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    useAuthStore.getState().initialize();
  }, []);
  return providers.reduce(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  );
};

export default memo(CombinedProviders);
