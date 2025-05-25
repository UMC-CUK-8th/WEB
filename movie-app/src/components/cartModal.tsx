import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { closeModal } from "../features/modal/modalSlice";
import { clearCart } from "../features/cart/cartSlice";

const CartModal = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector((state: RootState) => state.modal.isOpen);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded p-6 w-64 shadow-lg">
                <p className="text-center font-semibold mb-4">정말 삭제하시겠습니까?</p>
                <div className="flex justify-around">
                    <button
                        className="px-4 py-1 bg-gray-200 text-sm rounded"
                        onClick={() => dispatch(closeModal())}
                    >
                        아니요
                    </button>
                    <button
                        className="px-4 py-1 bg-red-500 text-white text-sm rounded"
                        onClick={() => {
                        dispatch(clearCart());
                        dispatch(closeModal());
                        }}
                    >
                        네
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartModal;
