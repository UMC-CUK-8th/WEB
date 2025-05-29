import { useDispatch } from "react-redux";
import { useSelector } from "../hooks/useCustomRedux";
import { closeModal } from "../slices/modalSlice";
import { useCartActions } from "../hooks/useCartStore";

const Modal=()=>{
    const {isOpen}=useSelector((state)=>state.modal);
    const dispatch=useDispatch();

    const {clearCart}=useCartActions();

    const handleCloseModal=()=>{
        dispatch(closeModal());
    }
    const handleClickYes=()=>{
        clearCart();
        dispatch(closeModal());
    }


    return(
        <>
        {isOpen&&(
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm">
                <div className="bg-white flex flex-col items-center justify-center gap-y-5 drop-shadow-xl w-70 h-30 rounded-lg">
                    <p className="font-bold text-lg">정말 삭제하시겠습니까?</p>
                    <div className="flex gap-x-2 w-40 justify-between">
                        <button onClick={handleCloseModal} className="bg-gray-200 rounded-md h-9 w-20 cursor-pointer">아니요</button>
                        <button onClick={handleClickYes} className="bg-red-500 rounded-md w-12 h-9 text-white cursor-pointer">네</button>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}
export default Modal;