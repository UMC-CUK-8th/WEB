import { axiosInstance } from "./axios";

interface UpdateMyInfoParams {
  name?: string;
  bio?: string | null;
  avatar?: string | null;
}

export async function updateMyInfo(params: UpdateMyInfoParams) {
  const response = await axiosInstance.patch("/v1/users", params);
  return response.data;
}
