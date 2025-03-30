import axiosClient from "../lib/axiosClient";

// الحصول على محفظة المستخدم
export const getWalletUser = async (userId: number) => {
  try {
    const response = await axiosClient.get(`/wallets/get/${userId}`);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching wallet for user:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// إضافة رصيد إلى المحفظة
export const addFundsToWallet = async (
  userId: number,
  amount: number,
  currency: string
) => {
  try {
    const response = await axiosClient.patch(`/wallets/add/${userId}`, {
      amount,
      currency,
    });
    return response.data;
  } catch (error: any) {
    console.error("Error adding funds:", error.response?.data || error.message);
    throw error;
  }
};

// خصم رصيد من المحفظة
export const deductFundsFromWallet = async (
  userId: number,
  amount: number,
  currency: string
) => {
  try {
    const response = await axiosClient.patch(`/wallets/deduct/${userId}`, {
      amount,
      currency,
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error deducting funds:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// تحويل الأموال إلى محفظة فريلانسر
export const transferFundsToFreelancer = async (
  userId: number,
  amount: number,
  currency: string
) => {
  try {
    const response = await axiosClient.patch(
      `/wallets/transfer-freelancer/${userId}`,
      { amount, currency }
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error transferring funds to freelancer:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// تحويل الأموال إلى حساب الموقع
export const transferFundsToSiteAccount = async (
  userId: number,
  amount: number,
  currency: string
) => {
  try {
    const response = await axiosClient.patch(
      `/wallets/transfer-site/${userId}`,
      { amount, currency }
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error transferring funds to site account:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// استرداد الأموال (Refund) بناءً على معرف المعاملة
export const refundTransaction = async (
  userId: number,
  transactionId: number
) => {
  try {
    const response = await axiosClient.patch(
      `/wallets/refund/${userId}/${transactionId}`
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Error refunding transaction:",
      error.response?.data || error.message
    );
    throw error;
  }
};

// الحصول على سجل المعاملات
export const getTransactions = async (userId: number) => {
  try {
    const response = await axiosClient.get(`/wallets/transactions/${userId}`);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching transactions:",
      error.response?.data || error.message
    );
    throw error;
  }
};
