import { Outlet, useNavigate } from "react-router-dom";

const HomeLayout = () => {
  const navigate = useNavigate();
  
    return (
      <div className="h-dvh flex flex-col">
        <nav className="h-16 flex items-center justify-between px-6 bg-[#141414] ">
          <div className="text-pink-500 font-bold text-lg">돌려돌려LP판</div>
          <div className="flex gap-4">
            <button
              className="bg-black px-4 py-2 rounded text-white"
              onClick={() => navigate("/login")} // ← 로그인 페이지로 이동
            >
              로그인
            </button>
            <button
              className="bg-pink-500 px-4 py-2 rounded text-white"
              onClick={() => navigate("/signup")} // ← 회원가입 페이지로 이동
            >
              회원가입
            </button>
          </div>
        </nav>
  
        <main className="flex-1">
          <Outlet />
        </main>
  
        <footer className="h-16 flex items-center justify-center bg-[#141414] text-sm text-gray-400">
          ⓒ UMC와 함께하는 로그인과 회원가입
        </footer>
      </div>
    );
  };

  export default HomeLayout;
  