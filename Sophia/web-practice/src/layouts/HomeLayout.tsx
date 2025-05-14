import { Outlet } from 'react-router-dom';
import Navbar from '../components/Site/Navbar';
import Footer from '../components/Site/Footer';
import { useEffect, useRef, useState } from 'react';
import Sidebar from '../components/Site/Sidebar';
import Modal from '../components/Site/Modal';
import ModalDeleteAuth from '../components/Site/ModalDeleteAuth';

export default function HomeLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(() => window.innerWidth >= 1024);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalBg = useRef<HTMLDivElement | null>(null);
  const [isModalDeleteAuthOpen, setIsModalDeleteAuthOpen] = useState(false);

  // 화면 크기에 따른 사이드바 열기/닫기
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

  // 모달창 바깥 영역 클릭 시 모달창 닫기
  useEffect(() => {
    const handleClickModalbg = (e: MouseEvent) => {
      if (isModalOpen && modalBg.current && !modalBg.current.contains(e.target as Node)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickModalbg);

    return () => {
      document.removeEventListener('mousedown', handleClickModalbg);
    };
  }, [isModalOpen]);

  return (
    // 전체 화면 높이 설정, main 컨텐츠 높이 설정
    <div className='h-dvh flex flex-col bg-black'>
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main className={`flex justify-center relative overflow-y-auto h-full ${isMenuOpen ? 'lg:ml-72' : ''}`}>
        {isMenuOpen && (
          <div className='fixed left-0 w-64 bg-[#1f1e1e] h-[calc(100%-8rem)] z-50'>
            <Sidebar onOpen={() => setIsModalDeleteAuthOpen(true)} />
          </div>
        )}
        {isModalOpen && (
          <div className='fixed inset-0 bg-black/80 flex justify-center items-center z-50'>
            <div ref={modalBg} className='w-[30rem]'>
              <Modal onClose={() => setIsModalOpen(false)} />
            </div>
          </div>
        )}
        {isModalDeleteAuthOpen && (
          <div className='fixed inset-0 bg-black/30 flex justify-center items-center z-50'>
            <div className='w-[25rem]'>
              <ModalDeleteAuth onClose={() => setIsModalDeleteAuthOpen(false)} />
            </div>
          </div>
        )}
        <Outlet />
        <button type='button' className='text-white fixed bottom-[7rem] right-6 bg-pink-500 rounded-full w-10 h-10 text-3xl flex justify-center z-50' onClick={() => setIsModalOpen(true)}>
          +
        </button>
      </main>
      <Footer />
    </div>
  );
}
