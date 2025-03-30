export type Wallet = {
  id: string;
  balance: number;
  availableBalance: number;
  pendingBalance: number;
  currency: string;
  createdAt: string;
  user: {
    id: number;
    email: string;
    roles: string[];
    kyc: string;
  };
};

export type Transaction = {
  id: string;
  type: string;
  amount: number;
  currency: string;
  status: string;
  wallet: Wallet;
  user: {
    id: number;
    email: string;
    roles: string[];
    kyc: string;
  };
};
