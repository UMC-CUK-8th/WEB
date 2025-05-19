import { Comment } from './lp';
import { CommonResponse, CursorBasedResponse } from "./common";
import { PAGINATION_ORDER } from '../enums/common';

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
  authored: number;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  likes: Likes[];
};

export type ResponseLpDTO = CommonResponse<Lp>;

export type ResponseLpListDTO = CursorBasedResponse<Lp[]>;

export type RequestLpDTO = {
  lpId: number;
};

export type ResponseLikeLpDTO = CommonResponse<{
  id: number;
  userId: number;
  lpId: number;
}>;

export type RequestPostLpDTO = {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
};

export type ResponsePostLpDTO = CommonResponse<{
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
}>;

export type CommentAuthor = {
  id: number;
  name: string;
  email: string;
  bio: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Comment = {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  author : CommentAuthor;
};

export type CommentList = {
  data: Comment[];
  nextCursor: number;
  hasNext: boolean;
};

export type CommentPaginationDTO = {
  cursor?: number;
  limit?: number;
  order?: PAGINATION_ORDER;
};

export type ResponseCommentListDTO = CursorBasedResponse<Comment[]>;

export type RequestPostCommentDTO = {
  content: string;
};

export type ResponsePostCommentDTO = CommonResponse<{
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
}>;