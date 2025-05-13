import {PaginationDto, PaginationDto2} from "../types/common.ts"
import { ResponseCommentsListDto, ResponseLpDetailDto, ResponseLpListDto } from "../types/lp.ts";
import { axiosInstance } from "./axios";
export const getLpList=async(paginationDto:PaginationDto):Promise<ResponseLpListDto>=>{
    const{data}=await axiosInstance.get("/v1/lps",{
        params:paginationDto,
    })
    return data;
};

export const getCommentsList=async(PaginationDto2:PaginationDto2):Promise<ResponseCommentsListDto>=>{
    const {lpId,...restParams}=PaginationDto2;

    const{data}=await axiosInstance.get(`/v1/lps/${lpId}/comments`,{
        params:restParams,
        headers: {
            Authorization:`Bearer ${localStorage.getItem("accessToken")}`,
        }
    })
    return data;
};

export const getLpDetail=async(lpId:number):Promise<ResponseLpDetailDto>=>{
    const{data}=await axiosInstance.get(`/v1/lps/${lpId}`);
    console.log("API response data:", data);
    return data;
};