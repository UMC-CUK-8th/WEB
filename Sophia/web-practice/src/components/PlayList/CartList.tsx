import CartItem from './CartItem';
// import { useSelector } from '../../hooks/useCustomRedux';
import { useCartInfo } from '../../hooks/useCartStore';

export default function CartList() {
  const { cartItems } = useCartInfo();

  // redux
  // const { cartItems } = useSelector((state) => state.cart);

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
