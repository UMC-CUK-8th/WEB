import { ShoppingCart } from 'lucide-react';
import { useSelector } from '../../hooks/useCustomRedux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { calculateTotals } from '../../slices/cartSlice';

export default function Navbar() {
  const { amount, cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [dispatch, cartItems]);

  return (
    <div className='flex justify-between items-center p-4 bg-gray-400 text-white'>
      <h1 onClick={() => (window.location.href = '/')} className='text-2xl font-semibold cursor-pointer'>
        UMC PlayList
      </h1>
      <div className='flex items-center gap-2'>
        <ShoppingCart className='text-2xl' />
        <span className='text-xl font-medium'>{amount}</span>
      </div>
    </div>
  );
}
