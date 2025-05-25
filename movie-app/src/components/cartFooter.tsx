import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { clearCart } from "../features/cart/cartSlice";

const CartFooter = () => {
    const { totalAmount, totalPrice } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();

    return (
        <div className="bg-white shadow-md border-t fixed bottom-0 left-0 right-0 p-4 flex justify-between items-center">
        <div>
            <p className="text-sm text-gray-500">총 수량: {totalAmount}개</p>
            <p className="text-lg font-bold">총 금액: ₩{totalPrice.toLocaleString()}</p>
        </div>
        <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => dispatch(clearCart())}
        >
            전체 삭제
        </button>
        </div>
    );
};

export default CartFooter;
