import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Sidebar from '../components/SideBar'
import { Outlet } from 'react-router-dom'

const HomeTestLayout = () => {
  return (
    <div className="flex flex-col bg-black text-white min-h-screen ">
      <Navbar />
      <div className="ml-60 pt-16">
        <Sidebar />
        <div className="flex-1">
          <main className="p-4">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default HomeTestLayout;
