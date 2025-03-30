"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getWalletUser } from "@/api/wallet";
import { Wallet } from "@/types/Wallet";
import { UserContext } from "@/context/UserContext";

interface WalletContextType {
  wallet: Wallet | undefined;
  isLoading: boolean;
  error: any;
  refreshWallet: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useContext(UserContext) || {};
  const [wallet, setWallet] = useState<Wallet | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchWallet = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const data = await getWalletUser(user.sub);
      setWallet(data);
    } catch (err) {
      setError(err);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchWallet();
  }, [user]);

  return (
    <WalletContext.Provider value={{ wallet, isLoading, error, refreshWallet: fetchWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
