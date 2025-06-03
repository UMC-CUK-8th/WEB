import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../slices/modalSlice";
import { useCartActions, useCartInfo } from "../hooks/useCartStore";

const PriceBox=()=>{
    const dispatch=useDispatch();
    const {calculateTotals}=useCartActions();
    const {total,cartItems}=useCartInfo();

    // const handleInitializeCount=()=>{
    //     dispatch(clearCart());
    // }
    const handleOpenModal=()=>{
        dispatch(openModal());
    }
    useEffect(()=>{
        calculateTotals();
    },[dispatch,cartItems]);

    return (
    <div className="p-12 flex justify-between">
        <button onClick={handleOpenModal} className="border p-4 rounded-md cursor-pointer">장바구니 전체 삭제</button>
        <div>총 가격: {total}원</div>
    </div>)
}

export default PriceBox;