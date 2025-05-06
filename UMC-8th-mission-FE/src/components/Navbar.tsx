import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { accessToken } = useAuth();
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (keyword.trim() !== '') {
      navigate(`/?search=${encodeURIComponent(keyword)}`);
    }
  };

  return (
    <nav className='bg-white dark:bg-[#141414] shadow-md fixed w-full z-10 h-20'>
      <div className='flex items-center justify-between p-5'>
        <Link
          to="/"
          className='text-lg font-bold text-gray-900 dark:text-pink-600'
        >
          돌려요말아요LP판
        </Link>

        <div className='flex items-center space-x-4'>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="앨범 검색"
            className="px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-[#1e1e1e] text-black dark:text-white"
          />
          <button
            onClick={handleSearch}
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
          >
            검색
          </button>

          {!accessToken && (
            <>
              <Link
                to="/login"
                className='bg-[#434343] text-gray-700 dark:text-gray-300 dark:bg-black hover:bg-blue-600 px-5 py-2 rounded'
              >
                로그인
              </Link>
              <Link
                to="/signup"
                className='bg-[#434343] text-gray-700 dark:text-gray-300 dark:bg-black hover:bg-pink-600 px-6 py-2 rounded'
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
