import { useCartActions } from '../hooks/useCartStore';
import { useDispatch } from '../hooks/useCustomRedux';
import { useModalActions } from '../hooks/useModalStore';
import { closeModal } from '../slices/modalSlice';

const ClearCartModal = () => {
    /*
    const dispatch = useDispatch();

    const handleInitializeCart = () => {
        dispatch({ type: 'cart/clearCart' });
        dispatch({ type: 'cart/calculateTotals' });
        dispatch(closeModal());
    };
    
    const handleCancel = () => {
        dispatch(closeModal());
    };
    */

    const { clearCart, calculateTotals } = useCartActions();
    const { closeModal } = useModalActions();

    const handleInitializeCart = () => {
        clearCart();
        calculateTotals();
        closeModal();
    };
    
    return (
        <div
        className="fixed inset-0 flex items-center justify-center bg-black/50 z-40"
        >
            <div
            className="relative bg-white p-20 rounded-lg shadow-lg flex flex-col items-center space-y-5"
            onClick={e => e.stopPropagation()}
            >
                <div className="text-lg font-semibold text-gray-800 mb-10">
                정말 삭제하시겠습니까?
                </div>

                <div className="flex space-x-4">
                    <button
                    className="text-gray-600 w-[100px] p-2 text-md rounded-lg border border-gray-300 transition hover:bg-gray-300 cursor-pointer"
                    type="button"
                    onClick={handleInitializeCart}
                    >
                    네
                    </button>
                    <button
                    className="text-gray-600 w-[100px] p-2 text-md rounded-lg border border-gray-300 transition hover:bg-gray-300 cursor-pointer"
                    type="button"
                    onClick={closeModal}
                    >
                    아니요
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ClearCartModal;
