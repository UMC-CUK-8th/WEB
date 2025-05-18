import { PaginationDto } from "../types/common";
import { ResponseLpDetailDto, ResponseLpListDto, ResponseLpCommentListDto } from '../types/lp';
import { axiosInstance } from "./axios";

export const getLpList = async (
    paginationDto: PaginationDto,
): Promise<ResponseLpListDto> => {
    const { data } = await axiosInstance.get('/v1/lps', {
        params: paginationDto,
    })

    console.log("getLpList 응답:", data);
    return data;
}

export const getLpDetail = async (lpId: number): Promise<ResponseLpDetailDto> => {
    const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
  
    return data;
  };

export const getLpCommentList = async (paginationDto: PaginationDto, lpId: string | undefined): Promise<ResponseLpCommentListDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: paginationDto,
  });

  return data;
};
