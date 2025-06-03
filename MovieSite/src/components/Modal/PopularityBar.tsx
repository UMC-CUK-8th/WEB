import React from "react";

type PopularityBarProps = {
  popularity: number;
};

const PopularityBar: React.FC<PopularityBarProps> = ({ popularity }) => {
  const normalized = Math.min((popularity / 100) * 100, 100);

  return (
    <div className="w-full bg-gray-200 rounded-full h-3">
      <div
        className="bg-blue-400 h-3 rounded-full"
        style={{ width: `${normalized}%` }}
      ></div>
    </div>
  );
};

export default PopularityBar;
