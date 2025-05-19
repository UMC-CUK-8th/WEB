import { PAGINATION_ORDER } from "../../enums/common";

interface CommentOrderProps {
  order: PAGINATION_ORDER;
  setOrder: (order: PAGINATION_ORDER) => void;
}

const LpCommentOrder = ({ order, setOrder }: CommentOrderProps) => {
  
  return (
    <div className="space-x-1">
    <button
      className={`px-2 py-1 text-sm rounded-lg border border-gray-300 transition ${
        order === PAGINATION_ORDER.asc
          ? "bg-gray-300 text-black font-semibold"
          : "text-gray-600 hover:text-black"
      }`}
      onClick={() => setOrder(PAGINATION_ORDER.asc)}
    >
      오래된순
    </button>
    <button
      className={`px-2 py-1 text-sm rounded-lg border border-gray-300 transition ${
        order === PAGINATION_ORDER.desc
          ? "bg-gray-300 text-black font-semibold"
          : "text-gray-600 hover:text-black"
      }`}
      onClick={() => setOrder(PAGINATION_ORDER.desc)}
    >
      최신순
    </button>
  </div>
  );
};

export default LpCommentOrder;