import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const { accessToken } = useAuth();

  return (
    <aside
      id="sidebar"
      className={`mt-6 w-60 h-full bg-[#121212] text-white fixed top-0 left-0 flex flex-col pt-20 pl-6 space-y-6 z-20 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } hidden lg:block`} 
    >
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
      <Link to="/search" className="hover:text-pink-500">
        <div className="flex items-center space-x-2">
          <img src="/images/Search.svg" alt="search icon" className="w-5 h-5" />
          <span>찾기</span>
        </div>
      </Link>
    </aside>
  );
};

export default Sidebar;
