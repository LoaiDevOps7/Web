export type Rate = {
  id: string;
  comment: string;
  raterRole: string;
  ratedRole: string;
  projectId: string;
  createdAt: string;
  ratingProfessionalism: number;
  ratingCommunication: number;
  ratingQuality: number;
  ratingExpertise: number;
  ratingTimeliness: number;
  ratingRepeat: number;
  rated: {
    id: string;
    email: string;
    roles: string[];
    kyc: string;
  };
  rater: {
    id: string;
    email: string;
    roles: string[];
    kyc: string;
  };
};
