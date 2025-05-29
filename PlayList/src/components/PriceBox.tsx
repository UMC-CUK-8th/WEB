import { useEffect } from "react";
import { useSelector } from "../hooks/useCustomRedux";
import { useDispatch } from "react-redux";
import { calculateTotals, clearCart } from "../slices/cartSlice";
import { openModal } from "../slices/modalSlice";

const PriceBox=()=>{
    const {total,cartItems}=useSelector((state)=>state.cart);
    const dispatch=useDispatch();

    const handleInitializeCount=()=>{
        dispatch(clearCart());
    }
    const handleOpenModal=()=>{
        dispatch(openModal());
    }
    useEffect(()=>{
        dispatch(calculateTotals());
    },[dispatch,cartItems]);

    return (
    <div className="p-12 flex justify-between">
        <button onClick={handleOpenModal} className="border p-4 rounded-md cursor-pointer">장바구니 전체 삭제</button>
        <div>총 가격: {total}원</div>
    </div>)
}

export default PriceBox;