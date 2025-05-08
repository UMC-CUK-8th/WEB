import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Site/Navbar';
import Footer from '../components/Site/Footer';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Site/Sidebar';

export default function ProtectedLayout() {
  const { accessToken } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(() => window.innerWidth >= 1024);

  useEffect(() => {
    const hanldeResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(true);
      } else {
        setIsMenuOpen(false);
      }
    };

    //창 크기 변경 이벤트 리스너 등록
    window.addEventListener('resize', hanldeResize);
    //초기 상태 체크
    hanldeResize();

    return () => window.removeEventListener('resize', hanldeResize);
  }, []);

  if (!accessToken) {
    alert('로그인이 필요한 서비스입니다.');
    return <Navigate to={'/login'} replace />;
  }

  return (
    // 전체 화면 높이 설정, main 컨텐츠 높이 설정
    <div className='h-dvh flex flex-col bg-black'>
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main className={`flex flex-row relative overflow-y-auto h-full justify-center ${isMenuOpen ? 'lg:ml-72' : ''}`}>
        {isMenuOpen && (
          <div className='fixed left-0 w-64 bg-[#1f1e1e] h-[calc(100%-8rem)] z-50'>
            <Sidebar />
          </div>
        )}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
