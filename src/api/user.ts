import axiosClient from "../lib/axiosClient";

export const getUser = async (userId: number) => {
  try {
    const response = await axiosClient.get(`/users/profile/${userId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const changeRoleToOwner = async (userId: number) => {
  try {
    const response = await axiosClient.patch(
      `/users/${userId}/change-role-to-owner`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
