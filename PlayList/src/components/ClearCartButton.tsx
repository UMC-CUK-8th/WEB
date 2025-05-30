import { useDispatch } from "react-redux";
import { openModal } from "../slices/modalSlice";

const ClearCartButton = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(openModal());
  };

  return (
    <button
      onClick={handleClick}
      className="p-4 border rounded-md my-10"
    >
      전체 삭제
    </button>
  );
};

export default ClearCartButton;
