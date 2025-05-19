import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import DeleteModal from './Modal/DeleteModal';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => {
  const { accessToken } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleDeleteAccount = () => {
    alert("탈퇴 처리 완료");
    setShowModal(false);
  };

  return (
    <>
      <aside
        id="sidebar"
        className={`mt-6 w-58 h-full bg-[#121212] text-white fixed top-0 left-0 flex flex-col pt-20 pl-6 pr-6 justify-between z-20 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } hidden lg:block`}
      >
        <div>
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
              <img
                src="/images/Search.svg"
                alt="search icon"
                className="w-5 h-5"
              />
              <span>찾기</span>
            </div>
          </Link>
        </div>

        <button
          className="absolute bottom-16 left-6 right-6 w-auto py-2 bg-red-600 hover:bg-red-500 rounded text-center font-semibold"
          onClick={() => setShowModal(true)}
        >
          탈퇴하기
        </button>
      </aside>

      {showModal && (
        <DeleteModal
          onConfirm={handleDeleteAccount}
          onCancel={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
