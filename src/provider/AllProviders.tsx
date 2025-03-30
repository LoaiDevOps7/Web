import { ReactNode, memo } from "react";
import UserProvider from "@/context/UserContext";
import { ActivityProvider } from "@/context/ActivityContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { PortfolioProvider } from "@/context/PortfolioContext";
import { RatingsProvider } from "@/context/RatingsContext";
import { ProfileProvider } from "@/context/ProfileContext";
import { WalletProvider } from "@/context/WalletContext";
import { ProjectProvider } from "@/context/ProjectContext";
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
  return providers.reduce(
    (acc, Provider) => <Provider>{acc}</Provider>,
    children
  );
};

export default memo(CombinedProviders);