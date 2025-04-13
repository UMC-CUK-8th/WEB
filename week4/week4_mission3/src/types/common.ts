export type CommonResponse<T>={
    status:boolean;
    statusCode:number;
    messege:string;
    data:T
}