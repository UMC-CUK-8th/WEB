import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import LpModal from "./LpModal";

const FloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-32 right-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#D0C1FF] text-white rounded-full hover:bg-[#8977ad] hover:scale-110 transition duration-300 w-16 h-16 flex items-center justify-center text-3xl"
        >
          <FiPlus />
        </button>
      </div>
      {isOpen && <LpModal onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default FloatingButton;
