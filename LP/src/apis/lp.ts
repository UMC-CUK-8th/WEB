import { ResponseMyInfoDto } from "../types/auth.ts";
import {CommonResponse, PaginationDto, PaginationDto2} from "../types/common.ts"
import { AddLpDto, ResponseCommentsDto, ResponseCommentsListDto, ResponseLikeLpDto, ResponseLpAddDto, ResponseLpDetailDto, ResponseLpListDto, ResponseUproadsImageDto } from "../types/lp.ts";
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
        
    })
    return data;
};

export const getLpDetail=async({lpId}:{lpId:number}):Promise<ResponseLpDetailDto>=>{
    const{data}=await axiosInstance.get(`/v1/lps/${lpId}`);
    return data;
};

export const postLike = async({lpId}:{lpId:number}):Promise<ResponseLikeLpDto>=>{
    const{data}=await axiosInstance.post(`/v1/lps/${lpId}/likes`);

    return data;
}

export const deleteLike = async({lpId}:{lpId:number}):Promise<ResponseLikeLpDto>=>{
    const {data}=await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
    return data;
}

export const commentAdd = async({lpId,content}:{lpId:number; content:string}):Promise<ResponseCommentsDto>=>{
    const{data}=await axiosInstance.post(`/v1/lps/${lpId}/comments`,{content});
    return data;
}
export const commentEdit=async({lpId, commentId,content}:{lpId:number;commentId:number,content:string}):Promise<ResponseCommentsDto>=>{
    const{data}=await axiosInstance.patch(`/v1/lps/${lpId}/comments/${commentId}`,{content});
    return data;
}
export const userEdit=async({name,bio,avatar}:{name:string;bio:string|null;avatar:string|null}):Promise<ResponseMyInfoDto>=>{
    const{data}=await axiosInstance.patch(`/v1/users`,{name,bio,avatar});
    return data;
}
export const postLp = async(lpData:AddLpDto):Promise<ResponseLpAddDto>=>{
    const {data}=await axiosInstance.post(`/v1/lps`,lpData);
    return data;
}
export const PatchLp=async({lpId,lpData}:{lpId:number;lpData:AddLpDto;}):Promise<ResponseLpAddDto>=>{
    const {data}=await axiosInstance.patch(`/v1/lps/${lpId}`,lpData);
    return data;
}

export const uploadsImage=async(file:File):Promise<ResponseUproadsImageDto>=>{
    const formData=new FormData();
    formData.append("file",file);

    const {data}=await axiosInstance.post(`/v1/uploads`,formData);
    return data;
}
export const deleteUser=async():Promise<void>=>{
    await axiosInstance.delete(`/v1/users`);
}
export const signoutUser=async():Promise<CommonResponse<{data:null;}>>=>{
    const {data}=await axiosInstance.post(`/v1/auth/signout`);
    return data;
}
export const deleteLp=async({lpId}:{lpId:number}):Promise<CommonResponse<{data:true}>>=>{
    const {data}=await axiosInstance.delete(`/v1/lps/${lpId}`);
    return data;
}