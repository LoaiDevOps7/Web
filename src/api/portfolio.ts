import axiosClient from "../lib/axiosClient";

export const createPortfolio = async (userId: number, portfolioDto: any) => {
  try {
    const response = await axiosClient.post(
      `/portfolios/create/${userId}`,
      portfolioDto,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getPortfolio = async (userId: number) => {
  try {
    const response = await axiosClient.get(
      `/portfolios/${userId}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
