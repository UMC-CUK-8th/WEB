import { PaginationDto } from "../types/common";
import { ResponseLpListDto, ResponseLpDetailDto, ResponseLpCommentsDto } from "../types/lp"; 
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

// LP 댓글 목록 조회
export const getLpComments = async (
  lpId: number,
  paginationDto: PaginationDto
): Promise<ResponseLpCommentsDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: paginationDto,
  });
  return data;
};
