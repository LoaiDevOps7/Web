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
    skills: 
      {
        length: number;
        map(
          arg0: (skill: any, index: any) => JSX.Element
        ): import("react").ReactNode;
        name: string;
      }
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
