import { useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa'
import { useSelector } from '../hooks/useCustomRedux';
import { useDispatch } from 'react-redux';
import { calculateTotals } from '../slices/cartSlice';
import { useCartActions, useCartInfo } from "../hooks/useCartStore";

const Navbar = () => {
//   const { amount, cartItems } = useSelector((state) => state.cart);
//   const dispatch = useDispatch();
    const {amount,cartItems}=useCartInfo();
    const {calculateTotals}=useCartActions();

  useEffect(() => {
    // dispatch(calculateTotals());
    calculateTotals()
  }, [cartItems, cartItems]);

  return (
    <div className='flex justify-between items-center p-4 bg-yellow-200 text-black'>
      <h1 onClick={() => (window.location.href = '/')} className='text-2xl font-semibold cursor-pointer'>PlayList</h1>
      <div className='flex items-center gap-2'>
        <FaShoppingCart className='text-2xl' />
        <span className='text-xl font-medium'>{amount}</span>
      </div>
    </div>
  );
}

export default Navbar;