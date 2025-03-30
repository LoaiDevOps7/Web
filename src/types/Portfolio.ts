export interface Portfolio {
  id: string;
  name: string;
  description: string;
  projectUrl: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    email: string;
    roles: string[];
    kycVerification: {
      verificationStatus: string;
    };
  };
}
