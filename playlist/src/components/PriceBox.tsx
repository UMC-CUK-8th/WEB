import { useDispatch, useSelector } from '../hooks/useCustomRedux';
import { openModal } from '../slices/modalSlice'; 
import { useCartActions, useCartInfo } from "../hooks/useCartStore";
import { useEffect } from "react";

const PriceBox = () => {
//   const { total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const {calculateTotals}=useCartActions();
  const {total,cartItems}=useCartInfo();

  const handleClearCart = () => {
    dispatch(openModal('정말 삭제하시겠습니까?'));
  };
  
    useEffect(()=>{
        calculateTotals();
    },[dispatch,cartItems]);

  return (
    <div className='p-12 flex justify-between'>
      <button
        type='button'
        className='border p-4 rounded-md cursor-pointer'
        onClick={handleClearCart}
      >
        장바구니 초기화
      </button>
      <div>총 가격: {total}원</div>
    </div>
  );
};
export default PriceBox;
