import { CommonResponse, CursorBasedResponse, CursorResponse } from './common';

export type Tag = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userId: number;
  lpId: number;
};

export type Lp = {
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
};

export type ResponseLpListDto = CursorBasedResponse<Lp[]>;

export type Author = {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  updatedAt: Date;
  createdAt: Date;
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

export type RequestCreateLpDto = {
  title: string;
  content: string;
  thumbnail?: string;
  tags: string[];
  published: boolean;
};

export type ResponseCreateLpDto = CursorResponse<{
  id: string;
  title: string;
  content: string;
  thumbnail?: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
}>;

export type ResponseDeleteLp = CursorResponse<boolean>;

export type ResponseCreateCommentDto = {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  author: Author;
};

export type ResponseDeleteCommentDto = CursorResponse<{
  message: string;
}>;

export type ResponseUpdateCommentDto = CursorResponse<ResponseCreateCommentDto>;

export type RequestUpdateLpDetailDto = RequestCreateLpDto & {
  lpId: number | null;
};

export type ReponseUpdateLpDetailDto = CursorResponse<{
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

export type ResponseUpdateMyInfoDto = CursorResponse<Author>;
