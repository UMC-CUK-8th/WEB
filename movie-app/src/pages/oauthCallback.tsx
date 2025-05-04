import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OauthCallbackPage = () => {
  const navigate = useNavigate();
  const [processed, setProcessed] = useState(false);

  useEffect(() => {
    if (processed) return;

    console.log("OauthCallbackPage 실행", window.location.search);
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    console.log("accessToken:", accessToken);

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
      setProcessed(true);
      alert("구글 로그인 성공!");
      navigate("/mypage");
      return;
    } else {
      setProcessed(true);
      alert("로그인 실패: 토큰이 없습니다.");
      navigate("/login");
    }
  }, [navigate]);

  return <div className="text-white text-center mt-20">로그인 처리 중...</div>;
};

export default OauthCallbackPage;
