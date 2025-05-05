import { RequestLpDTO, ResponseLpDTO, ResponseLpListDTO } from '../types/lp';
import { PaginationDTO } from './../types/common';
import { axiosInstance } from './axios';

export const getLpList = async (
    paginationDTO: PaginationDTO,
): Promise<ResponseLpListDTO> => {
    const { data } = await axiosInstance.get("/v1/lps", {
        params: paginationDTO,
    });
    
    return data;
};

export const getLpDetail = async ({lpId}: RequestLpDTO): Promise<ResponseLpDTO> => {
    const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);

    return data;
};
