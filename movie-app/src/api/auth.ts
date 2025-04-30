import axios from "axios";

const BASE_URL = import.meta.env.VITE_BE_URL;

// 회원가입 요청 함수
export const signup = async (data: { name: string; email: string; password: string }) => {
  const response = await axios.post(`${BASE_URL}/v1/auth/signup`, data);
  return response.data;
};

// 로그인 요청 함수
export const login = async (email: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/v1/auth/signin`, {
    email,
    password,
  });
  return response.data;
};

export const getMyInfo = async (token: string) => {
  const response = await axios.get(`${BASE_URL}/v1/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
