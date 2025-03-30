import { JSX } from "react";

export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  dateOfBirth: string;
  description: string;
  profileImage: string;
  city: string;
  country: string;
  createdAt: string;
  updatedAt: string;
  job: {
    name: string;
    skills: string[];
  };
  user: {
    id: number;
    email: string;
    roles: string[];
    status: "online" | "offline";
    ratingsReceived: string;
    kycVerification: {
      verificationStatus: string;
    };
  };
}
