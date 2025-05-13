import { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Sidebar from '../components/SideBar';
import { Outlet } from 'react-router-dom';

const HomeTestLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState); 
  };

  return (
    <div className="flex flex-col bg-black text-white min-h-screen">
      <Navbar toggleSidebar={toggleSidebar} /> 
      <div className={`flex pt-16 ${isSidebarOpen ? 'ml-60' : 'ml-0'}`}>
        <Sidebar isOpen={isSidebarOpen} /> 
        <div className="flex-1">
          <main className="p-4">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomeTestLayout;
