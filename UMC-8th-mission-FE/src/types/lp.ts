import { CommonResponse, CursorBasedResponse } from "./common";

export type Tag = {
    id: number;
    name: string;
};

export type Likes = {
    id?: number;
    userId: number;
    lpId: number;
};

export type Author = {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
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

export type LpComment = {
    id: number;
    content: string;
    lpId: number;
    authorId: number;
    createdAt: string;
    updatedAt: string;
    author: Author;
    nextCursor?: number;
    hasNext?: boolean;
};

export type RequestLpDto = {
    lpId: number;
};

export type LpDetail = Lp & {
    author: Author[];
};

export type LpWithout = Omit<Lp, "tags" | "likes">;

export type ResponseLpListDto = CursorBasedResponse<Lp[]>;

export type ResponseLpDetailDto = CommonResponse<LpDetail>;

export type ResponseLpDto = CommonResponse<LpWithout[]>;

export type ResponseLpCommentsDto = CursorBasedResponse<LpComment[]>;

export type ResponseLikeLpDto = CommonResponse<{
    id: number;
    useId: number;
    lpId: number;
}>;

export interface CreateLpRequest {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
}

