import axiosClient from "../lib/axiosClient";

export const createRating = async (rateDto: any) => {
  try {
    const response = await axiosClient.post("/ratings", rateDto);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getRatingsForUser = async (userId: number) => {
  try {
    const response = await axiosClient.get(`/ratings/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAverageRating = async (userId: number) => {
  try {
    const response = await axiosClient.get(`/ratings/user/${userId}/average`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getPerformanceAnalysis = async (userId: number) => {
  try {
    const response = await axiosClient.get(`/ratings/user/${userId}/analysis`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
