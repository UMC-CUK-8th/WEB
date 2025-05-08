import { ResponseLpDetailDto, ResponseLpListDto } from '../types/lp';
import { PaginationDto } from './../types/common';
import { axiosInstance } from './axios';

export const getLpList = async (paginationDto: PaginationDto): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get('/v1/lps', {
    params: paginationDto,
  });

  return data;
};

export const getLpDetail = async (lpId: string | undefined): Promise<ResponseLpDetailDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);

  return data;
};
