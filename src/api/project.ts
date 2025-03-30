import axiosClient from "../lib/axiosClient";

export const createProject = async (projectDto: any) => {
  try {
    const response = await axiosClient.post("/projects", projectDto);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const acceptBid = async (projectId: string, bidId: string) => {
  try {
    const response = await axiosClient.post(
      `/projects/${projectId}/accept-bid/${bidId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const rejectBid = async (projectId: string, bidId: string) => {
  try {
    const response = await axiosClient.post(
      `/projects/${projectId}/reject-bid/${bidId}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateProjectStatus = async (
  projectId: string,
  status: string
) => {
  try {
    const response = await axiosClient.patch(`/projects/${projectId}/status`, {
      status,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProjectsForOwner = async (ownerId: number) => {
  try {
    const response = await axiosClient.get(`/projects/owner/${ownerId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllProjects = async () => {
  try {
    const response = await axiosClient.get("/projects");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProjectById = async (projectId: string) => {
  try {
    const response = await axiosClient.get(`/projects/${projectId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getProjectsByCategory = async (categoryId: string) => {
  try {
    const response = await axiosClient.get(`/projects/category/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
