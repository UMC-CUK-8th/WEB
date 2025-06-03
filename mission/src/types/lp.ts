import { CursorBasedResponse, CommonResponse } from "./common";

export type Tag={
    id:number;
    name:string;
};

export type Likes={
    id:number;
    userId:number;
    lpId:number;
}

export type Lp={
        id:number;
        title:string;
        content:string;
        thumbnail:string;
        published:boolean;
        authorId:number;
        createdAt:string;
        updatedAt:Date;
        tags:Tag[];
        likes:Likes[];
}
export type ResponseLpListDto = CursorBasedResponse<Lp[]>;

export type Author={
  id: number;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
};

export type LpDetail = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  likes: Likes[];
  author: Author;
};

export type ResponseLpDetailDto = {
  status: boolean;
  statusCode: number;
  message: string;
  data: LpDetail;
};

export type Comment = {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  author: Author;
};

export type ResponseLpCommentListDto = CursorBasedResponse<Comment[]>;

export type ResponseLpLikeDto = CommonResponse<{
  id: number;
  userId: number;
  lpId: number;
}>;

export type RequestAddLpDto = {
  title: string;
  content: string;
  thumbnail?: string;
  tags: string[];
  published: boolean;
};

export type ResponseAddLpDto = CommonResponse<{
  id: string;
  title: string;
  content: string;
  thumbnail?: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
}>;

export type ResponseDeleteLp = CommonResponse<boolean>;

export type ResponseAddCommentDto = {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  author: Author;
};

export type ResponseDeleteCommentDto = CommonResponse<{
  message: string;
}>;

export type ResponseUpdateCommentDto = CommonResponse<ResponseAddCommentDto>;

export type RequestUpdateLpDetailDto = RequestAddLpDto & {
  lpId: number | null;
};

export type ResponseUpdateLpDetailDto = CommonResponse<{
  id: string;
  title: string;
  content: string;
  thumbnail?: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
}>;

export type ResponseMyLpListDto = CursorBasedResponse<Lp[]>;

export type ResponseUpdateMyInfoDto = CommonResponse<Author>;