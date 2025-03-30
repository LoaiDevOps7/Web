import axiosClient from "../lib/axiosClient";

export const createCategory = async (categoryDto: any) => {
  try {
    const response = await axiosClient.post("/categories", categoryDto);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllCategories = async () => {
  try {
    const response = await axiosClient.get("/categories");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
