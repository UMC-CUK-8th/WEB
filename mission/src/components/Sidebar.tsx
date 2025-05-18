import { Link } from 'react-router-dom';
import { FaSearch, FaUser } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { accessToken } = useAuth();

  return (
    <div>
      <aside
        className={`fixed left-0 top-16 w-56 h-[calc(100%-4rem)] bg-[#1e1e1e] dark:bg-gray-900 shadow-md text-white z-40 transition-transform duration-300 ease-in-out flex flex-col justify-between`}
      >
        <div className="p-6 space-y-6">
          <Link to="/search" className="flex items-center gap-2 hover:bg-gray-800 px-2 py-2 rounded-md">
            <FaSearch /> 찾기
          </Link>
          <Link to="/my" className="flex items-center gap-2 hover:bg-gray-800 px-2 py-2 rounded-md">
            <FaUser /> 마이페이지
          </Link>
        </div>
        <div className="p-6 text-sm">
          {accessToken && (
           <button className="items-flex-end mt-2 block cursor-pointer hover:text-red-600">탈퇴하기</button>
          )}
        </div>
      </aside>
    </div>
  );
}
