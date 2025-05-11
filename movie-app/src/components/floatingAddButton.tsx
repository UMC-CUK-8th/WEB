import { useState } from "react";
import { LPModal } from "./lpModal";
import { FiPlus } from "react-icons/fi";

export const FloatingAddButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
        <button
            className="fixed bottom-6 right-6 z-50 bg-red-600 text-black text-3xl w-14 h-14 rounded-full shadow-lg"
            onClick={() => setIsOpen(true)}
        >
            <FiPlus className="flex items-center" />
        </button>
        {isOpen && <LPModal onClose={() => setIsOpen(false)} />}
        </>
    );
};
