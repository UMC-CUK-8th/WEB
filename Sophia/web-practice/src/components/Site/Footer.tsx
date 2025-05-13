import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className='bg-[#1f1e1e] p-3'>
      <div className='container mx-auto text-center text-white'>
        <p>&copy;{new Date().getFullYear()} SpinningSpinning Dolimpan. All rights reserved.</p>
        <div className='flex justify-center space-x-4 mt-4'>
          <Link to={'#'}>Privacy Policy</Link>
          <Link to={'#'}>Terms of Service</Link>
          <Link to={'#'}>Contact</Link>
        </div>
      </div>
    </footer>
  );
}
