import { RequestSigninDTO, RequestSignupDTO, ResponseMyInfoDTO, ResponseSigninDTO, ResponseSignupDTO } from "../types/auth";
import { axiosInstance } from "./axios.ts";




export const postSignup = async (body: RequestSignupDTO):Promise<ResponseSignupDTO> => {
    const {data} = await axiosInstance.post(
        "/v1/auth/signup", 
        body,
    );

    return data;
};

export const postSignin = async (body: RequestSigninDTO):Promise<ResponseSigninDTO> => {
    const {data} = await axiosInstance.post(
        "/v1/auth/signin", 
        body,
    );

    return data;
};

export const getMyInfo = async ():Promise<ResponseMyInfoDTO> => {
    const {data} = await axiosInstance.get(
        "/v1/users/me",
    );

    return data;
};

export const postLogout = async() => {
    const { data } = await axiosInstance.post("/v1/auth/signout");

    return data;
  }

