import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto>();

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);

      setData(response);
    };

    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "black",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#ac0576",
          marginBottom: "1rem",
        }}
      >
        {data?.data.name}님 환영합니다.
      </h1>
      <img
        src={data?.data.avatar as string}
        alt="구글 로고"
        style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          marginBottom: "1rem",
        }}
      />
      <h1
        style={{
          fontSize: "1.2rem",
          color: "#ffffff",
          marginBottom: "2rem",
        }}
      >
        {data?.data.email}
      </h1>

      <button
        onClick={handleLogout}
        style={{
          cursor: "pointer",
          backgroundColor: "#ac0576",
          color: "white",
          padding: "0.75rem 2rem",
          fontSize: "1rem",
          border: "none",
          borderRadius: "8px",
          transition: "transform 0.2s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
