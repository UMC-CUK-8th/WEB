import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OauthCallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      alert("구글 로그인 성공!");
      navigate("/mypage");
    } else {
      alert("로그인 실패: 토큰이 없습니다.");
      navigate("/login");
    }
  }, []);

  return <div className="text-white text-center mt-20">로그인 처리 중...</div>;
};

export default OauthCallbackPage;
