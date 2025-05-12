import { axiosInstance } from "./axios";
import { ResponseCommentListDTO, ResponseCommentDTO } from "../types/lp";



export const getComments = async (
  lpId: number,
  cursor: number,
  order: "asc" | "desc" = "desc"
): Promise<ResponseCommentListDTO> => {
  const { data } = await axiosInstance.get("/v1/lps/${lpId}/comments", {
    params: { lpId, cursor, order },
  });
  return data.data;
};

export const postComment = async (
  lpId: number,
  content: string
): Promise<ResponseCommentDTO> => {
  const { data } = await axiosInstance.post("/v1/lps/${lpId}/comments", { lpId, content });
  return data.data;
};

export type CommentPage = {
    data: Comment[];
    nextCursor: number | null;
    hasNext: boolean;
  };