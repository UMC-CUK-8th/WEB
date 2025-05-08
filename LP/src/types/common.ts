import { PAGINATION_ORDER } from "../enums/common";

export type CommonResponse<T>={
    status:boolean;
    statusCode:number;
    messege:string;
    data:T;
};

export type CursorBasedResponse<T>={
    status:boolean;
    statusCode:number;
    messege:string;
    data:T;
    nextCursor:number;
    hasNext:boolean;
};

export type PaginationDto={
    cursor?:number;
    limit?:number;
    search?:string;
    order?:PAGINATION_ORDER /* "asc"|"desc"라 써도 ok*/ 
};