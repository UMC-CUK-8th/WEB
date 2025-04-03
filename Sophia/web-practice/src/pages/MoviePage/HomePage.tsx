import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Movie/Navbar';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default HomePage;
