export type Subscription = {
  id: string;
  startDate: string;
  endDate: string;
  status: string;
  notified: false;
  user: {
    id: number;
    email: string;
    roles: string[];
  };
  package: {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: number;
    isActive: true;
    features: string[];
  };
};
