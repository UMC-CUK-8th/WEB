import CartItem from './CartItem';
import { useSelector } from '../hooks/useCustomRedux';
import { useCartInfo } from "../hooks/useCartStore";

const CartList = () => {
//   const { cartItems } = useSelector((state) => state.cart);
  const { cartItems } = useCartInfo();

  return (
    <div className='flex flex-col items-center justify-center'>
      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} lp={item} />
        ))}
      </ul>
    </div>
  );
}
export default CartList;