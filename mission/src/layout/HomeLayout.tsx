import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import FloatingButton from '../components/FloatingButton';

export default function HomeLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(() => window.innerWidth >= 1024);

  useEffect(() => {
    const hanldeResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(true);
      } else {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', hanldeResize);
    hanldeResize();

    return () => window.removeEventListener('resize', hanldeResize);
  }, []);

  return (
    <div className='h-dvh flex flex-col bg-black'>
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main className={`relative overflow-y-auto h-full ${isMenuOpen ? 'lg:ml-72' : ''}`}>
        {isMenuOpen && (
          <div className='fixed left-0 w-64 bg-[#1f1e1e] h-[calc(100%-8rem)] z-50'>
            <Sidebar />
          </div>
        )}
        <Outlet />
        <FloatingButton/>
      </main>
      <Footer />
    </div>
  );
}
