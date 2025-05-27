import { PaginationDto } from "../types/common";
import { ResponseLpListDto, ResponseLpDetailDto, RequestLpDto, ResponseLikeLpDto, ResponseLpDto, CreateLpRequest } from "../types/lp"; 
import { axiosInstance } from "./axios";

// LP 목록 조회
export const getLpList = async (
  paginationDto: PaginationDto,
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get('/v1/lps', {
    params: paginationDto,
  });
  return data;
};

// LP 상세 조회
export const getLpDetail = async (
  lpId: number,
): Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
  return data;
};

export const postLike = async ({ 
  lpId 
}: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);

  return data;
}

export const deleteLike = async ({
  lpId
}: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);

  return data;
}

// Lp 생성
export const postLp = async (
  lpData: CreateLpRequest
): Promise<ResponseLpDto> => {
  const response = await axiosInstance.post("/v1/lps", lpData);
  return response.data;
};

