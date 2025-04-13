import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDTO } from "../types/auth";

const MyPage = () => {
    const [data, setData] = useState<ResponseMyInfoDTO>();

    useEffect(() => {
        const getData = async () => {
            const response = await getMyInfo();
            console.log(response);
        };

        getData();
    }, []);
    
    return (
        <>
        <div>MyPage</div>
        </>
    );
};

export default MyPage;