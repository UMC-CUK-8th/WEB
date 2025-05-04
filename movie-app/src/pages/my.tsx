import { useEffect } from "react";
import api from "../api/axiosInstance";
import { parseJwt } from "../utils/jwt";

const MyPage = () => {
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            const payload = parseJwt(token);
            if (payload) {
                const exp = payload.exp;
                const now = Math.floor(Date.now() / 1000);
                console.log("accessToken 만료(exp):", exp, "현재(now):", now);
                console.log("만료까지 남은 시간(초):", exp - now);
                if (exp < now) {
                console.log("accessToken이 만료되었습니다!");
                } else {
                console.log("accessToken이 아직 유효합니다!");
                }
            } else {
                console.log("토큰 파싱 실패");
            }
        } else {
            console.log("accessToken 없음");
        }
    
        // 인증 API 호출 결과도 콘솔에 찍기
        api.get("/v1/users/me")
            .then(res => {
                console.log("/v1/users/me 응답:", res.data);
            })
            .catch(err => {
                console.log("/v1/users/me 에러:", err);
            });
    }, []);

    return (
        <h1>마이페이지</h1>
    );
};

export default MyPage;