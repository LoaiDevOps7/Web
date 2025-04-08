export type Skill = {
  name: string;
  length?: number;
  map?: (arg0: (skill: Skill, index: number) => JSX.Element) => JSX.Element;
};

export type JobSkills = Skill[];

type Job = {
  name: string;
  skills: JobSkills;
};

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
  job: Job;
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
