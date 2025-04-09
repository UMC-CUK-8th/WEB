import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className='flex justify-between bg-[#1f1e1e] p-3'>
      <h1 className='text-pink-500 text-xl font-bold'>돌려돌려LP판</h1>
      <div className='flex gap-3'>
        <Link to='/login' className='py-1 px-3 text-white bg-black rounded-sm'>
          로그인
        </Link>
        <Link to='signup' className='py-1 px-2 text-white bg-pink-500 rounded-sm'>
          회원가입
        </Link>
      </div>
    </nav>
  );
}
