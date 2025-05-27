import { Link, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col text-white">
      <header className="bg-[#141414] px-6 py-4 shadow-md flex justify-between items-center">
        <h1 className="text-xl font-bold text-pink-600">돌리고고</h1>
        <span className="text-sm text-gray-300">환영합니다!</span>
      </header>

      <main className="flex flex-1">
        <aside className="w-64 bg-[#222222] p-4 space-y-4">
          <nav className="flex flex-col gap-2">
            {accessToken && (
              <Link to="/my" className="hover:text-pink-500">
                <div className="flex items-center space-x-2 mb-4">
                  <img
                    src="/images/mypageIcon.svg"
                    alt="mypage icon"
                    className="w-5 h-5"
                  />
                  <span>마이페이지</span>
                </div>
              </Link>
            )}
            <Link to="/" className="hover:text-pink-500">
              <div className="flex items-center space-x-2">
                <img src="/images/Search.svg" alt="search icon" className="w-5 h-5" />
                <span>찾기</span>
              </div>
            </Link>
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
