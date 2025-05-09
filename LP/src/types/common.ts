import { PAGINATION_ORDER } from "../enums/common";

export type CommonResponse<T>={
    status:boolean;
    statusCode:number;
    messege:string;
    data:T;
};

export type CursorBasedResponse<T>=CommonResponse<{
    data:T;
    nextCursor:number|null;
    hasNext:boolean;
}>;
/*export type CursorBasedResponse<T>={
    status:boolean;
    statusCode:number;
    messege:string;
    data:{
        data:T;
        nextCursor:number;
        hasNext:boolean;
    }
};*/

export type PaginationDto={
    cursor?:number;
    limit?:number;
    search?:string;
    order?:PAGINATION_ORDER /* "asc"|"desc"라 써도 ok*/ 
};

export type PaginationDto2={
    lpId:number;
    cursor?:number;
    limit?:number;
    order?:PAGINATION_ORDER /* "asc"|"desc"라 써도 ok*/ 
};