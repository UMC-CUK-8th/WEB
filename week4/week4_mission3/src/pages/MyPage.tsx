import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";

const MyPage=()=>{

    const [data,setData]=useState<ResponseMyInfoDto|null>(null);
    useEffect(()=>{
        const getData=async () =>{
            const response = await getMyInfo();
            console.log(response);
            
            setData(response);
        };
        getData();


    },[]);
    console.log(data);
    return <div>MyPage {data?.data.name}</div>;
}

export default MyPage;