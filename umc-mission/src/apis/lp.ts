import { PaginationDTO } from "../types/common";
import { RequestLpDTO, ResponseLpDTO, ResponseLpListDTO } from "../types/lp";
import { axiosInstance } from "./axios";

export const getLpList = async (
    PaginationDto:PaginationDTO,
    ):Promise<ResponseLpListDTO> => {
    const {data} = await axiosInstance.get("/v1/lps",{
        params:PaginationDto,
    });

    return data;
}; 


export const getLpDetail = async ({lpId}: RequestLpDTO): Promise<ResponseLpDTO> => {
    const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);

    return data;
};