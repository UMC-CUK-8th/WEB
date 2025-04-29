import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Site/Navbar';

export default function ProtectedLayout() {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <Navigate to={'/login'} replace />;
  }

  return (
    // 전체 화면 높이 설정, main 컨텐츠 높이 설정
    <div className='h-dvh flex flex-col bg-black'>
      <Navbar />
      <main className='flex-1'>
        <Outlet />
      </main>
      <footer className='text-white'>Footer</footer>
    </div>
  );
}
