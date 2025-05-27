import { useState } from "react";
import LpPost from "./LpPost";

const FloatingButton = () => {
    const [modal, setModal] = useState(false);

    const handleOpen = () => {
        setModal(true);
        // 모달이 열릴 때 body 스크롤 방지
        document.body.style.overflow = 'hidden';
    };
    const handleClose = () => {
        setModal(false);
        document.body.style.overflow = 'auto';
    };

    return (
        <>
            <button
                onClick={() => setModal(true)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 text-white text-3xl rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition-colors z-20"
            >+</button>

            {modal && (
                <LpPost
                    modal={modal}
                    handleClose={handleClose}
                />
            )}
        </>
    );
};

export default FloatingButton;