import { useCartActions } from "../hooks/useCartStore";

const ClearCartButton = () => {
  const { openModal } = useCartActions();

  return (
    <button
      onClick={openModal}
      className="p-4 border rounded-md my-10"
    >
      전체 삭제
    </button>
  );
};

export default ClearCartButton;
