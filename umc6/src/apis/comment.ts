import { axiosInstance } from "./axios";
import { ResponseCommentListDTO, ResponseCommentDTO } from "../types/lp";

// 댓글 목록을 가져오는 함수
export const getComments = async (
  lpId: number,  // 게시물 ID
  cursor: number, // 페이지네이션을 위한 커서 값
  order: "asc" | "desc" = "desc"  // 정렬 기준 (최신순 또는 오래된순)
): Promise<ResponseCommentListDTO> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, { // 백틱 사용하여 URL 경로 수정
    params: { lpId, cursor, order }, // 요청 파라미터
  });

  return data.data; // 데이터 반환
};

// 댓글을 작성하는 함수
export const postComment = async (
  lpId: number, // 게시물 ID
  content: string // 댓글 내용
): Promise<ResponseCommentDTO> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, { lpId, content }); // 백틱 사용하여 URL 경로 수정
  return data.data; // 작성된 댓글 데이터 반환
};

// 댓글 페이지에 대한 타입 정의
export type CommentPage = {
  data: Comment[];  // 댓글 목록
  nextCursor: number | null;  // 다음 페이지의 커서 (없을 경우 null)
  hasNext: boolean;  // 다음 페이지가 존재하는지 여부
};

// import { axiosInstance } from "./axios";
// import { ResponseCommentListDTO, ResponseCommentDTO } from "../types/lp";



// export const getComments = async (
//   lpId: number,
//   cursor: number,
//   order: "asc" | "desc" = "desc"
// ): Promise<ResponseCommentListDTO> => {
//   const { data } = await axiosInstance.get("/v1/lps/${lpId}/comments", {
//     params: { lpId, cursor, order },
//   });
//   return data.data;
// };

// export const postComment = async (
//   lpId: number,
//   content: string
// ): Promise<ResponseCommentDTO> => {
//   const { data } = await axiosInstance.post("/v1/lps/${lpId}/comments", { lpId, content });
//   return data.data;
// };

// export type CommentPage = {
//     data: Comment[];
//     nextCursor: number | null;
//     hasNext: boolean;
//   };