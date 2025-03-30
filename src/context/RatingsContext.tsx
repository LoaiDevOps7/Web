"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  getRatingsForUser,
  getAverageRating,
  getPerformanceAnalysis,
} from "@/api/rate";
import { UserContext } from "@/context/UserContext";
import { Rate } from "@/types/Rate";

interface RatingsContextType {
  ratings: Rate[];
  average: number;
  analysis: any;
  isLoading: boolean;
  error: any;
}

const RatingsContext = createContext<RatingsContextType | undefined>(undefined);

export const RatingsProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useContext(UserContext) || {};
  const [ratings, setRatings] = useState<Rate[]>([]);
  const [average, setAverage] = useState(0);
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const ratingsData = await getRatingsForUser(user.sub);
        setRatings(ratingsData || []);

        const avgData = await getAverageRating(user.sub);
        setAverage(avgData?.average || 0);

        const analysisData = await getPerformanceAnalysis(user.sub);
        setAnalysis(analysisData || {});
      } catch (err) {
        console.error("Error fetching rating data:", err);
        setError(err);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [user]);

  return (
    <RatingsContext.Provider
      value={{ ratings, average, analysis, isLoading, error }}
    >
      {children}
    </RatingsContext.Provider>
  );
};

export const useRatings = () => {
  const context = useContext(RatingsContext);
  if (context === undefined) {
    throw new Error("useRatings must be used within a RatingsProvider");
  }
  return context;
};
