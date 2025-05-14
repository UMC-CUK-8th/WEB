import { RequestSigninDto, RequestSignupDto, ResponseMyTypeDto, ResponseSigninDto, ResponseSignupDto } from '../types/auth';
import { axiosInstance } from './axios';

// 회원가입 api
export const postSignup = async (body: RequestSignupDto): Promise<ResponseSignupDto> => {
  const { data } = await axiosInstance.post('/v1/auth/signup', body);

  return data;
};

// 로그인 api
export const postSignin = async (body: RequestSigninDto): Promise<ResponseSigninDto> => {
  const { data } = await axiosInstance.post('/v1/auth/signin', body);

  return data;
};

// 내정보 조회 api
export const getMyInfo = async (): Promise<ResponseMyTypeDto> => {
  const { data } = await axiosInstance.get('/v1/users/me');

  return data;
};

// 로그아웃 api
export const postLogout = async () => {
  const { data } = await axiosInstance.post('/v1/auth/signout');

  return data;
};

// 회원탈퇴 api
export const deleteAuth = async () => {
  const { data } = await axiosInstance.delete('/v1/users');

  return data;
};
