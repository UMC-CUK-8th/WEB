import { CursorBasedResponse } from "./common";

export type Tag={
    id:number;
    name:string;
};

export type Likes={
    id:number;
    userId:number;
    lpId:number;
}

export type LpItems={
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
export type ResponseLpListDto=CursorBasedResponse<{
    data:LpItems[];
}>;



export type Author={
    id: number;
    name: string;
    email: string;
    bio: string;
    avatar: string;
    createdAt: string;
    updatedAt: string;
};

export type LpDetailItems={
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    published: boolean;
    authorId: number;
    createdAt: string;
    updatedAt: string;
    author: Author;
    tags: Tag[];
    likes: Likes[];
}
export type ResponseLpDetailDto=CursorBasedResponse<{
    data:LpDetailItems;
}>;