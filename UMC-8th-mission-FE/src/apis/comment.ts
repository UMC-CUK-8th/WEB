import { CommonResponse, PaginationDto } from "../types/common";
import { LpComment, ResponseLpCommentsDto } from "../types/lp";
import { axiosInstance } from "./axios";

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

export const postComment = async (
  lpId: number,
  content: string,
): Promise<LpComment> => {
  const response = await axiosInstance.post<CommonResponse<LpComment>>(`/v1/lps/${lpId}/comments`, {
    content,
  });
  return response.data.data; 
};

export const patchComment = async (
  lpId: number,
  commentId: number,
  content: string
): Promise<LpComment> => {
  const response = await axiosInstance.patch<CommonResponse<LpComment>>(
    `/v1/lps/${lpId}/comments/${commentId}`,
    {
      content,
    }
  );
  return response.data.data;
};

export const deleteComment = async (lpId: number, commentId: number) => {
  const response = await axiosInstance.delete(`/v1/lps/${lpId}/comments/${commentId}`);
  return response.data.data;
};