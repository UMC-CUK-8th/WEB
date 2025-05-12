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

export type ResponseLpListDTO=CursorBasedResponse<Lp[]>;
export type ResponseLpDTO = CommonResponse<Lp>;
export type RequestLpDTO = {
  lpId: number;
};
export const getLpList = async() =>{};