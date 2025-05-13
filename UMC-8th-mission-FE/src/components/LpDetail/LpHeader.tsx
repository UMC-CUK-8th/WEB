import { formatDistanceToNow } from "date-fns";

const LpHeader = ({ lp }: { lp: any }) => {
  return (
    <div className="flex justify-between items-start">
      <div>
        <div className="flex items-center space-x-2">
          <img
            src={lp.author.avatar || "/images/profile.png"}
            alt="작성자"
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm font-medium">{lp.author.name}</span>
        </div>
        <h2 className="text-xl font-bold mt-2">{lp.title}</h2>
      </div>

      <div className="flex flex-col items-end space-y-1">
        <div className="flex space-x-2 text-gray-400 cursor-pointer">
          <img src="/images/editIcon.svg" alt="수정" className="w-4 h-4" />
          <img src="/images/trashIcon.svg" alt="삭제" className="w-4 h-4" />
        </div>
        <div className="text-xs text-gray-400 mt-1">
          {formatDistanceToNow(new Date(lp.createdAt), { addSuffix: true })}
        </div>
      </div>
    </div>
  );
};

export default LpHeader;
