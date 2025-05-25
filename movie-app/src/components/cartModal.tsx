import { useCartStore } from "../zustand/cartStore";
import { useModalStore } from "../zustand/modalStroe";

const CartModal = () => {
    const isOpen = useModalStore((state) => state.isOpen);
    const closeModal = useModalStore((state) => state.closeModal);
    const clearCart = useCartStore((state) => state.clearCart);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded p-6 w-64 shadow-lg">
                <p className="text-center font-semibold mb-4">정말 삭제하시겠습니까?</p>
                <div className="flex justify-around">
                    <button
                        className="px-4 py-1 bg-gray-200 text-sm rounded"
                        onClick={closeModal}
                    >
                        아니요
                    </button>
                    <button
                        className="px-4 py-1 bg-red-500 text-white text-sm rounded"
                        onClick={() => {
                            clearCart();
                            closeModal();
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
