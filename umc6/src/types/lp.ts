import { CursorBasedResponse } from "./common";

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


