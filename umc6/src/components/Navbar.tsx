import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { getMyInfo } from "../apis/auth";
import { useEffect, useState } from "react";
import { ResponseMyInfoDto } from "../types/auth";

interface NavbarProps {
  onSidebarToggle?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSidebarToggle }) => {
  const { accessToken, logout } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<ResponseMyInfoDto>();

  useEffect(() => {
    if (accessToken) {
      getMyInfo().then((res) => setData(res));
    }
  }, [accessToken]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between bg-[#1e1e1e] text-white p-4">
      <div className="flex items-center gap-4">
        <button
          onClick={onSidebarToggle}
          className="text-white bg-[#ac0576] p-2 rounded-md"
        >
          <GiHamburgerMenu size={20} />
        </button>
        <Link to="/" className="text-2xl font-bold text-[#ac0576]">
          돌려돌려 LP판
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {!accessToken ? (
          <>
            <Link
              to="/login"
              className="w-20 bg-black p-2 rounded-md text-white text-center"
            >
              로그인
            </Link>
            <Link
              to="/signup"
              className="w-20 bg-[#ac0576] p-2 rounded-md text-black text-center"
            >
              회원가입
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={handleLogout}
              className="text-white text-base cursor-pointer hover:text-gray-600 transition"
            >
              로그아웃
            </button>
            <h1 className="text-white">{data?.data.name}님 반갑습니다.</h1>
          </>
        )}
        <Link
          to="/search"
          className="text-[#ac0576] hover:text-gray-600 transition"
          title="검색"
        >
          <FaSearch size={20} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { FaSearch } from "react-icons/fa";
// import { getMyInfo } from "../apis/auth";
// import { useEffect, useState } from "react";
// import { ResponseMyInfoDto } from "../types/auth"; // 타입도 필요하면

// export const Navbar = () => {
//   const { accessToken } = useAuth();
//   const navigate = useNavigate();
//   const { logout } = useAuth();

//   const [data, setData] = useState<ResponseMyInfoDto>(); // ✅ 컴포넌트 안으로

//   useEffect(() => {
//     if (accessToken) {
//       // 로그인 된 경우에만 getMyInfo 호출
//       const getData = async () => {
//         const response = await getMyInfo();
//         setData(response); // 또는 setData(response.data)
//       };
//       getData();
//     }
//   }, [accessToken]); // accessToken이 변경될 때만 호출

//   const handleLogout = async () => {
//     await logout();
//     navigate("/");
//   };

//   return (
//     <nav className="flex items-center justify-between bg-[#1e1e1e] text-white p-4">
//       <div className="flex text-[#ac0576] font-bold text-2xl">
//         <Link to="/">돌려돌려 LP판</Link>
//       </div>
//       <div className="flex items-center gap-4">
//         {!accessToken && (
//           <>
//             <Link
//               to="/login"
//               className="w-20 bg-black p-2 rounded-md text-white text-center"
//             >
//               로그인
//             </Link>
//             <Link
//               to="/signup"
//               className="w-20 bg-[#ac0576] p-2 rounded-md text-black text-center"
//             >
//               회원가입
//             </Link>
//           </>
//         )}
//         {accessToken && (
//           <>
//             <button
//               onClick={handleLogout}
//               className="text-white text-base cursor-pointer hover:text-gray-600 transition"
//             >
//               로그아웃
//             </button>
//             <h1>{data?.data.name}님 반갑습니다.</h1>
//           </>
//         )}
//         <Link
//           to="/search"
//           className="text-[#ac0576] hover:text-gray-600 transition"
//           title="검색"
//         >
//           <FaSearch size={20} />
//         </Link>
//       </div>
//     </nav>
//   );
// };
