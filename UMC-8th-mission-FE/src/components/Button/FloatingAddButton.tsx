import { Plus } from "lucide-react";

const FloatingAddButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      className="fixed bottom-6 right-6 bg-pink-500 text-white p-4 rounded-full shadow-lg hover:bg-pink-600 transition-all duration-200 z-50"
      onClick={onClick}
    >
      <Plus className="w-6 h-6" />
    </button>
  );
};

export default FloatingAddButton;
