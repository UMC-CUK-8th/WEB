import { useCartInfo } from "../hooks/useCartStore";
import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { useModalActions, useModalInfo } from "../hooks/useModalStore";
import ClearCartModal from "./ClearCartModal";

const PriceBox = () => {
    /*
    const { total } = useSelector((state) => state.cart);
    const { isOpen } = useSelector((state) => state.modal);
    const dispatch = useDispatch();

    const handleModal = () => {
        dispatch({ type: 'modal/openModal' });
    };
    */
   
    const { total } = useCartInfo();
    const isOpen = useModalInfo();
    const { openModal } = useModalActions();

    return (
        <div className="p-12 flex justify-between">
            <button onClick={openModal}
            className="border p-4 rounded-md cursor-pointer">
                장바구니 초기화
            </button>
            {isOpen && (
                <ClearCartModal />
            )}
            <div>
                총 가격: {total}원
            </div>
        </div>
    );
};

export default PriceBox;