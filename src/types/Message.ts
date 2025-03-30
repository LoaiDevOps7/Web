export interface Message {
  id: string;
  content: string;
  attachmentUrl?: string;
  createdAt: Date;
  sender: {
    user: {
      id: number;
    };
    personalInfo: {
      firstName?: string;
      lastName?: string;
      profileImage?: string;
    };
  };
  receiver?: {
    user: {
      id: string;
    };
    personalInfo: {
      firstName?: string;
      lastName?: string;
    };
  };
  reactions?: Array<{
    id: string;
    reactionType: string;
  }>;
}
