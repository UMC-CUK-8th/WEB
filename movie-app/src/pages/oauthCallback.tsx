import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OauthCallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      alert("구글 로그인 성공!");
      navigate("/");
    } else {
      alert("로그인 실패: 토큰이 없습니다.");
      navigate("/login");
    }
  }, []);

  return <div className="text-white text-center mt-20">로그인 처리 중...</div>;
};

export default OauthCallbackPage;
