import { Bid } from "./Bid";

export interface Project {
  id: string;
  name: string;
  budget: string;
  description: string;
  startDate: string | null;
  endDate: string | null;
  duration: number;
  skills: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
  category: {
    id: string;
    name: string;
  };
  bids: Bid[];
  owner: {
    id: number;
    email: string;
    roles: string[];
    personalInfo: {
      id: string;
      firstName: string;
      lastName: string;
      username: string;
      profileImage: string;
    };
    job: {
      name: string;
    };
  };
}
