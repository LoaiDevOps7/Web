import { Profile } from "./Profile";

export type Bid = {
  id: string;
  amount: string;
  description: string;
  submittedAt: string;
  currency: string;
  status: "pending" | "active" | "rejected" | "accepted";
  project: {
    id: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    status: string;
  };
  freelancer: {
    id: number;
    email: string;
    roles: string[];
    personalInfo: Profile;
  };
  owner: {
    id: number;
    email: string;
    roles: string[];
    personalInfo: Profile;
  };
};
