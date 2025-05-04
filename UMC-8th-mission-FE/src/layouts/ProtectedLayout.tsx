import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col text-white">
      <header className="bg-[#141414] px-6 py-4 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold text-pink-400">마이페이지</h1>
        <span className="text-sm text-gray-300">환영합니다!</span>
      </header>

      <main className="flex flex-1">
        <aside className="w-64 bg-[#222222] p-4 space-y-4">
          <nav className="flex flex-col gap-2">
            <a href="/my" className="hover:text-pink-400">내 정보</a>
            <a href="/my/favorites" className="hover:text-pink-400">즐겨찾기</a>
            <a href="/my/settings" className="hover:text-pink-400">설정</a>
          </nav>
        </aside>

        <section className="flex-1 p-6">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default ProtectedLayout;
