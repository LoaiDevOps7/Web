import axiosClient from "../lib/axiosClient";

export const getSubscriptionsByUser = async (id: number) => {
  try {
    const response = await axiosClient.get(
      `/subscriptions/subscriptions-by-user/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
