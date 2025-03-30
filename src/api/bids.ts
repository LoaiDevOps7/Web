import axiosClient from "../lib/axiosClient";

export const createBid = async (createBidDto: any) => {
  try {
    const response = await axiosClient.post("/bids/create", createBidDto);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getBidsFreelancer = async (id: number) => {
  try {
    const response = await axiosClient.get(`/bids/freelancer/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getBidsForProject = async (projectId: string) => {
  try {
    const response = await axiosClient.get(`/bids/project/${projectId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
