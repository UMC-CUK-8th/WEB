import { CommonResponse, CursorBasedResponse } from "./common";

export type Tag = {
    id:number;
    name:string;
};

export type Likes = {
    id:number;
    userId:number;
    lpId:number;
};

export type Lp = {
    id:number;
    title:string;
    content:string;
    thumbnail:string;
    published:boolean;
    authorId:number;
    createdAt:Date;
    updatedAt:Date;
    tags:Tag[];
    likes:Likes[];
}

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

export type ResponseLpListDTO=CursorBasedResponse<Lp[]>;
export type ResponseLpDTO = CommonResponse<Lp>;
export type ResponseCommentListDTO = CursorBasedResponse<Comment[]>;
export type ResponseCommentDTO = CommonResponse<Comment>;
export type RequestLpDTO = {
  lpId: number;
};
export const getLpList = async() =>{};