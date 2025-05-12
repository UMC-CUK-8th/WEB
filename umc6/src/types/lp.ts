import { CommonResponse, CursorBasedResponse } from "./common";

export type Tag = {
    id: number;
    name: string;
};

export type Likes = {
    id: number;
    userId : number;
    lpId : number;
}
export type ResponseLpListDto = CursorBasedResponse<{
    hasNext: any;
    nextCursor: any;
    data: {
        id: number;
        title: string;
        content: string;
        thumbnail: string;
        published: boolean;
        authorld: number;
        createdAt: Date;
        updatedAt: Date;
        tags: Tag[];
        likes: Likes[];
    }[];
}>; 

//타입이 이거 아니지 않나
export type ResponseLpDetailDto = {
    id: string;
  title: string;
  content: string;
  date: string;
  thumbnail: string;
  likes: number;
};

export type Comment = {
    id: number;
    content: string;
    lpId: number;
    authorId: number;
    createdAt: string;
    updatedAt: string;
    author: {
      id: number;
      name: string;
      email: string;
      bio: string | null;
      avatar: string | null;
      createdAt: string;
      updatedAt: string;
    }
}

export type ResponseCommentListDTO = CursorBasedResponse<Comment[]>;
export type ResponseCommentDTO = CommonResponse<Comment>;
