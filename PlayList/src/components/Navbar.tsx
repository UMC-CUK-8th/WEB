import { FaShoppingCart } from "react-icons/fa"
// import { useSelector } from "../hooks/useCustomRedux"
import { useEffect } from "react"
// import { calculateTotals } from "../slices/cartSlice"
// import { useDispatch } from "../hooks/useCustomRedux"
import { useCartActions, useCartInfo } from "../hooks/useCartStore"

const NavBar = () => {
  const { amount, cartItems } = useCartInfo();
  const { calculateTotals } = useCartActions();

  useEffect(() => {
    calculateTotals();
  }, [cartItems, calculateTotals]);
 
  // redux-toolkit 사용 시
  // const { amount, cartItems } = useSelector((state) => state.cart);
  // const dispatch = useDispatch();
  //
  // useEffect(() => {
  //   dispatch(calculateTotals());
  // }, [dispatch, cartItems]);

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1
        onClick={() => {
          window.location.href = '/';
        }} 
        className="text-2xl font-semibold cursor-pointer"
      >
        GU JOOCHA
      </h1>
      <div className="flext items-center space-x-2"> 
        <FaShoppingCart className='text-2xl'/>
        <span className="text-xl font-medium">{amount}</span>
      </div>
    </div>
  )
}

export default NavBar;