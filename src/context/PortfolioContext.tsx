"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getPortfolio } from "@/api/portfolio";
import { Portfolio } from "@/types/Portfolio";
import { UserContext } from "@/context/UserContext";

interface PortfolioContextType {
  portfolio: Portfolio[];
}

export const PortfolioContext = createContext<PortfolioContextType>({
  portfolio: [],
});

interface PortfolioProviderProps {
  children: ReactNode;
}

export const PortfolioProvider = ({ children }: PortfolioProviderProps) => {
  const { user } = useContext(UserContext) || {};
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const data = await getPortfolio(user.sub);
      setPortfolio(data);
    };
    fetchData();
  }, [user]);

  return (
    <PortfolioContext.Provider value={{ portfolio }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
