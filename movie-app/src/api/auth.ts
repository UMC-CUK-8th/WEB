import axios from "axios";

const BASE_URL = import.meta.env.VITE_BE_URL;

// 로그인 요청 함수
export const login = async (email: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/v1/auth/signin`, {
    email,
    password,
  });
  return response.data;
};
