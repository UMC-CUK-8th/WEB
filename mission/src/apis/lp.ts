import { PaginationDto } from "../types/common";
import { ResponseLpDetailDto, ResponseLpListDto } from '../types/lp';
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
  