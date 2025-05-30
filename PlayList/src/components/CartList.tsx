import CartItem from "./CartItem";
// import { useDispatch, useSelector } from "../hooks/useCustomRedux";
// import { clearCart } from "../slices/cartSlice";
import { useCartInfo } from "../hooks/useCartStore";
import ClearCartButton from "./ClearCartButton";
import Modal from "./Modal";

const CartList = () => {
  const { cartItems } = useCartInfo();
  // const { clearCart } = useCartActions();

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

  // 화면에서 직접 전체 삭제하는 것을 모달에서 처리하도록 변경.
  // const handleAllClearButton = () => {
  //   clearCart();
  // };

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
      <ClearCartButton />
      <Modal />
    </div>
  )
}

export default CartList;