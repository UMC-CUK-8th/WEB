import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { Heart } from "lucide-react";
import CommentSection from "../components/Comment/CommentSection";


const LpDetailPage = () => {
    const { LPid } = useParams();
    const { data: lp, isPending, isError } = useGetLpDetail({lpId: Number(LPid)});

    if (isPending && isError) {
      return <></>;
    }

    return (
    <div className="mt-12 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">{lp?.data.title}</h1>
    <img
      src={lp?.data.thumbnail}
      alt={lp?.data.title}
      className="w-64 h-64 rounded-full border-4 border-gray-300 shadow-lg animate-spin-slow"
      style={{ animation: "spin 5s linear infinite" }}
    />
      <p className="m-3">{lp?.data.content}</p>

    <button className="m-5">
      <Heart />
    </button>

    <div className="w-full max-w-2xl">
    {lp?.data.id && <CommentSection lpId={lp.data.id} />}

      </div>
    </div>
    )
  };

  export default LpDetailPage;