import {PaginationDto} from "../types/common.ts"
import { ResponseLpDetailDto, ResponseLpListDto } from "../types/lp.ts";
import { axiosInstance } from "./axios";
export const getLpList=async(paginationDto:PaginationDto):Promise<ResponseLpListDto>=>{
    const{data}=await axiosInstance.get("/v1/lps",{
        params:paginationDto,
    })
    return data;
};


export const getLpDetail=async(lpId:number):Promise<ResponseLpDetailDto>=>{
    const{data}=await axiosInstance.get(`/v1/lps/${lpId}`);
    console.log("API response data:", data);
    return data;
};