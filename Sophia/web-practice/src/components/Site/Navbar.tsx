import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { LOCAL_STORAGE_KEY } from '../../constants/key';
import Menu from '../../assets/menu.svg';

interface NavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}

export default function Navbar({ isMenuOpen, setIsMenuOpen }: NavbarProps) {
  const { accessToken } = useAuth();
  const naviagte = useNavigate();
  const { logout } = useAuth();
  const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.userName);
  const userName = getItem();

  const handleLogout = async () => {
    await logout();
    naviagte('/');
  };

  return (
    <nav className='flex justify-between bg-[#1f1e1e] p-3'>
      <div className='flex gap-2'>
        <button type='button' onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <img src={Menu} alt='메뉴 열기' className='w-6' />
        </button>
        <Link to='/' className=' text-pink-500 text-xl font-bold'>
          돌려돌려LP판
        </Link>
      </div>
      {!accessToken && (
        <div className='flex gap-3'>
          <Link to='/login' className='py-1 px-3 text-white bg-black rounded-sm'>
            로그인
          </Link>
          <Link to='signup' className='py-1 px-2 text-white bg-pink-500 rounded-sm'>
            회원가입
          </Link>
        </div>
      )}
      {accessToken && (
        <div className='text-white flex gap-3 items-center'>
          <p>{userName}님 반갑습니다.</p>
          <button type='button' onClick={handleLogout} className=' cursor-pointer'>
            로그아웃
          </button>
        </div>
      )}
    </nav>
  );
}
