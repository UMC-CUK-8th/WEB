import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { Heart } from "lucide-react";

const LpDetailPage = () => {
    const { lpId } = useParams();
    const { data: lp, isPending, isError } = useGetLpDetail({lpId: Number(lpId)});

    if (isPending && isError) {
      return <></>;
    }

    return (
    <div className="mt-12 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">{lp?.data.title}</h1>
    <img
      src={lp?.data.thumbnail}
      alt={lp?.data.title}
      className="m-5 rounded-full border-2 border-gray-300 shadow-lg"
      style={{ animation: "spin 5s linear infinite" }}
    />
      <p className="m-3">{lp?.data.content}</p>

    <button className="m-5">
      <Heart />
    </button>
    </div>
    )
  };
  
  export default LpDetailPage;