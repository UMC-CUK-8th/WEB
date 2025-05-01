import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const {logout} = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto>();

    useEffect(() => {
        const getData = async () => {
            const response = await getMyInfo();
            console.log(response);

            setData(response);
        };

        getData();
    }, [])

    const handleLogout = async() => {
      await logout();
      navigate("/");
    }

  return (
    <div className="flex mt-16 items-center justify-center text-white">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-xl flex flex-col items-center gap-6 w-[350px] animate-fade-in">
      {data?.data?.avatar ? (
        <img
          src={data.data.avatar}
          alt="profile"
          className="w-24 h-24 rounded-full"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-gray-400 flex items-center justify-center text-white text-sm font-semibold">
        </div>
      )}
        <h1 className="text-2xl font-bold">
          {data?.data?.name}님, 환영합니다!
        </h1>
        <p className="text-gray-300">{data?.data?.email}</p>

        <button
          onClick={handleLogout}
          className="mt-4 px-6 py-2 bg-pink-500 rounded-md hover:bg-pink-400 transition-transform hover:scale-95 text-white font-semibold"
        >
          로그아웃
        </button>
      </div>
    </div>
  )
}

export default MyPage;