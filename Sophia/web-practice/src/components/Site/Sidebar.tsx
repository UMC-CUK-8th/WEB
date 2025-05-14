import { Link } from 'react-router-dom';
import User from '../../assets/user.svg';
import Search from '../../assets/search.svg';

interface SidebarProps {
  onOpen: () => void;
}

export default function Sidebar({ onOpen }: SidebarProps) {
  const handleDeleteAuth = () => {
    onOpen?.();
  };

  return (
    <div className='text-white flex flex-col gap-3 mt-4'>
      <Link to={'/search'} className='flex items-center gap-3 ml-6'>
        <img src={Search} alt='검색' className='w-6' />
        찾기
      </Link>
      <Link to={'/my'} className='flex items-center gap-3 ml-6'>
        <img src={User} alt='내정보' className='w-6' />
        마이페이지
      </Link>
      <button type='button' className='absolute bottom-0 my-4 self-center' onClick={handleDeleteAuth}>
        탈퇴하기
      </button>
    </div>
  );
}
