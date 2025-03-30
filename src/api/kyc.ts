import axiosClient from "../lib/axiosClient";

export const createKycPersonalInfo = async (
  userId: number,
  createPersonalInfoDto: any
) => {
  try {
    const response = await axiosClient.post(
      `/kyc-personal-info/create/${userId}`,
      createPersonalInfoDto,
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

export const addSkillsToPersonalInfo = async (personalInfoId: string, skills: string[]) => {
  try {
    const response = await axiosClient.post(
      `/kyc-personal-info/${personalInfoId}/skills`,
      { skills }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const removeSkillFromPersonalInfo = async (
  personalInfoId: string,
  skillName: string
) => {
  try {
    const response = await axiosClient.delete(
      `/kyc-personal-info/${personalInfoId}/skills/${skillName}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getKycPersonalInfo = async (userId: number) => {
  try {
    const response = await axiosClient.get(`/kyc-personal-info/get/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllSkills = async () => {
  try {
    const response = await axiosClient.get("/kyc-personal-info/getAll/skills");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateKycPersonalInfo = async (
  userId: number,
  updatePersonalInfoDto: any
) => {
  try {
    const response = await axiosClient.put(
      `/kyc-personal-info/update/${userId}`,
      updatePersonalInfoDto,
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

export const createKycVerification = async (
  userId: number,
  createVerificationDto: any
) => {
  try {
    const response = await axiosClient.post(
      `/kyc-verification/create/${userId}`,
      createVerificationDto,
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

export const getKycVerification = async (userId: number) => {
  try {
    const response = await axiosClient.get(`/kyc-verification/get/${userId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateKycVerification = async (
  userId: number,
  updatePersonalInfoDto: any
) => {
  try {
    const response = await axiosClient.put(
      `/kyc-verification/update/${userId}`,
      {
        updatePersonalInfoDto,
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
