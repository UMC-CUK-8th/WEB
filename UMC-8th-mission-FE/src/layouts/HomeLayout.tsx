import { Outlet, useNavigate } from "react-router-dom";

const HomeLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <nav className="h-16 flex items-center justify-between px-6 bg-[#141414] shrink-0">
        <div className="text-pink-500 font-bold text-lg">돌려돌려비디오테이프</div>
        <div className="flex gap-4">
          <button
            className="bg-black px-4 py-2 rounded text-white"
            onClick={() => navigate("/login")}
          >
            로그인
          </button>
          <button
            className="bg-pink-500 px-4 py-2 rounded text-white"
            onClick={() => navigate("/signup")}
          >
            회원가입
          </button>
        </div>
      </nav>

      {/* 메인 콘텐츠 영역: 남은 공간 채움 + 스크롤 가능 */}
      <main className="flex-grow overflow-auto">
        <Outlet />
      </main>

      <footer className="h-20 flex items-center justify-center bg-[#141414] text-sm text-gray-400 shrink-0">
        ⓒ UMC와 함께하는 로그인과 회원가입
      </footer>
    </div>
  );
};

export default HomeLayout;
