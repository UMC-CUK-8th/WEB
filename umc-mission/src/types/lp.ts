import { CursorBasedResponse } from "./common";

export type Tag = {
    id:number;
    name:string;
};

export type Likes = {
    id:number;
    userId:number;
    lpId:number;
};

export type ResponseLpListDto=CursorBasedResponse<{
    data: {
        id:number;
        title:string;
        content:string;
        thumbnail:string;
        published:boolean;
        authorId:number;
        createAt:Date;
        updateAt:Date;
        tags:Tag[];
        likes:Likes[];
    }[];
}>;