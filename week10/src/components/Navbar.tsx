import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from '../hooks/useCustomRedux';
import { useEffect } from 'react';
import { useCartActions, useCartInfo } from '../hooks/useCartStore';

const Navbar = () => {
    /*
    const { amount, cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(calculateTotals());
    }, [dispatch, cartItems]);
    */

    const { amount, cartItems } = useCartInfo();
    const { calculateTotals } = useCartActions();

    useEffect(() => {
        calculateTotals();
    }, [cartItems, calculateTotals]);
    
    return (
        <div className="flex justify-between items-center bg-gray-800 p-4 text-white">
            <h1 onClick={() => window.location.href = '/'}
                className="text-2xl font-semibold cursor-pointer">L i v</h1>
            <div className="flex item-center space-x-2">
                <FaShoppingCart className="text-2xl" />
                <span className="text-xl font-semibold">{amount}</span>
            </div>
        </div>
    );
};

export default Navbar;