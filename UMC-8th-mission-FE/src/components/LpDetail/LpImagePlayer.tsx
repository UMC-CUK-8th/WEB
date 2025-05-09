const LpImagePlayer = ({ thumbnail, isRotating, onRotate }: { thumbnail: string, isRotating: boolean, onRotate: () => void }) => {
    return (
      <div className="flex justify-center my-6 relative" onClick={onRotate}>
        <div className="w-100 h-100 bg-[#282A30] border border-[#434343] rounded-sm relative flex justify-center items-center cursor-pointer shadow-2xl">
          <div className={`w-92 h-92 bg-[#333] rounded-full flex justify-center items-center ${isRotating ? "animate-spin" : ""}`}>
            <div className="w-full h-full bg-black border-4 border-[#222] rounded-full relative overflow-hidden">
              <img
                src={thumbnail || "/images/lp_sample.png"}
                alt="LP"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#434343] border-4 border-[#fdfdfd] rounded-full z-20"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default LpImagePlayer;
  