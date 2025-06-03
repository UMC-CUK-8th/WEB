import { RequestLpDTO, RequestPostCommentDTO, RequestPostLpDTO, ResponseCommentListDTO, ResponseLikeLpDTO, ResponseLpDTO, ResponseLpListDTO, ResponsePostCommentDTO, ResponsePostLpDTO } from '../types/cart';
import { PaginationDTO } from '../types/common';
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

export const postLike = async ({lpId}: RequestLpDTO): Promise<ResponseLikeLpDTO> => {
    const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);

    return data;
};

export const deleteLike = async ({lpId}: RequestLpDTO): Promise<ResponseLikeLpDTO> => {
    const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);

    return data;
};

export const postLp = async (body: RequestPostLpDTO): Promise<ResponsePostLpDTO> => {
    const { data } = await axiosInstance.post(
        "/v1/lps",
        body,
    );

    return data;
};

export const getCommentList = async (
    lpId: number,
    paginationDTO: PaginationDTO,
): Promise<ResponseCommentListDTO> => {
    const { data } = await axiosInstance.get(
        `/v1/lps/${lpId}/comments`, {
        params: paginationDTO,
    });
    
    return data;
};

export const postComment = async (
    lpId: number, 
    body: RequestPostCommentDTO
): Promise<ResponsePostCommentDTO> => {
    console.log("보내는 데이터", body);
    const { data } = await axiosInstance.post(
        `/v1/lps/${lpId}/comments`,
        body,
    );

    return data;
};