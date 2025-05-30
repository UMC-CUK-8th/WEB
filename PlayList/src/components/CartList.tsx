import CartItem from "./CartItem";
// import { useDispatch, useSelector } from "../hooks/useCustomRedux";
// import { clearCart } from "../slices/cartSlice";
import { useCartActions, useCartInfo } from "../hooks/useCartStore";

const CartList = () => {
  const { cartItems } = useCartInfo();
  const { clearCart } = useCartActions();

  // 이 방식 비추천.
  // state.cartList가 안받아와짐.
  // 타입 추론이 잘 안됨. useSelector의 제네릭으로 타입을 명시해주면 해결됨.
  // const { cartList } = useSelector((state) => ({ cartList: state.
  // cartList }));
  
  // ----- redux-toolkit 사용 시 -----
  // hooks 생성
  // const { cartItems } = useSelector(
  //   (state) => state.cart
  // );
  // const dispatch = useDispatch();

  // const handleAllClearButton = () => {
  //   dispatch(clearCart());
  // };

  const handleAllClearButton = () => {
    clearCart();
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      { cartItems.length === 0 && (
        <div className="my-10">
          <p className="text-2xl font-semibold">
            장바구니가 비어있습니다.
          </p>
        </div>
      )}
      <ul>
          {cartItems.map((item, index) => (
              <CartItem key={index} lp={item} />
          ))}
      </ul>
      <button
        onClick={handleAllClearButton}
        className="p-4 border rounded-md my-10"
      >
        전체 삭제
      </button>
    </div>
  )
}

export default CartList;