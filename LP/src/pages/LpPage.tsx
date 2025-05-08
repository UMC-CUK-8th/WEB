import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { GoPencil } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";

const LpPage=()=>{
    const {id} = useParams();
    const numberId = Number(id);
    const {data,isPending, isError}=useGetLpDetail(numberId);
    console.log("Received ID:", id);  // id 값이 제대로 전달되었는지 확인
    console.log("Converted Number ID:", numberId);  // numberId 값 확인
    console.log("Fetched Data:", data); // 데이터를 콘솔에서 확인


    if(isPending){
        return <div>Loading...</div>;
    }

    if (isError){
        return <div>Error.</div>;
    }

    if (!data) {
        return <div>No data found</div>;  // 데이터가 없을 경우
      }

    return <div className="bg-black w-full h-full flex items-center justify-center">
    <div className="p-5 gap-y-5 bg-gray-400 w-200 h-140 rounded-lg flex flex-col items-center text-white">
        <div className="flex items-center justify-between w-150">
            <div className="flex gap-x-2">
                <img src={data.data.author.avatar} 
                className="w-10 h-10"
                alt={"구글로고"}/>
                <p className=" flex items-center">{data.data.author.name}</p>
            </div>
            <p>{data.data.createdAt.slice(0,10)}</p>
        </div>
        <div className="flex items-center justify-between w-150">
            <p>{data.data.title}</p>
            <div className="flex gap-x-2">
                <GoPencil />
                <FaRegTrashAlt />
            </div>
        </div>
        <div className="w-65 h-65 shadow-md flex items-center justify-center ">
            <img src={data.data.thumbnail} className="w-50 h-50 object-cover rounded-full"/>
        </div>
        <p className="w-150">{data.data.content}</p>
        {data.data.tags.map((tag) => (<span>#{tag.name}</span>))}
        
    </div>
    </div>
}

export default LpPage;