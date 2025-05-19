import { useState } from "react";
import { LPModal } from "./lpModal";
import { FiPlus } from "react-icons/fi";
import { useAuth } from "../context/authContext";

export const FloatingAddButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) return null;

    return (
        <>
            <button
                className="fixed bottom-6 right-6 z-50 bg-red-600 text-black text-3xl w-14 h-14 rounded-full shadow-lg flex items-center justify-center"
                onClick={() => setIsOpen(true)}
            >
                <FiPlus />
            </button>
            {isOpen && <LPModal onClose={() => setIsOpen(false)} />}
        </>
    );
};
