import { useState } from "react";
import LpCard from "../components/LpCard";
import useGetLpList from "../hooks/queries/useGetLpList";
import { PAGINATION_ORDER } from "../enums/common";

const HomePage=()=>{
    const [oldnew,setOldnew]=useState(PAGINATION_ORDER.asc);
    const {data,isPending,isError}=useGetLpList({order:oldnew, limit:32});

    if(isPending){
        return <div>Loading...</div>;
    }

    if (isError){
        return <div>Error.</div>;
    }
    return (
        <div className="flex flex-col items-center justify-center bg-black ">
        <div className="flex w-full pt-8 pr-10 justify-end">
            <button className={`w-23 p-2 border-2 border-white cursor-pointer rounded-l-lg ${oldnew === "asc" ? "bg-white text-black" : "bg-black text-white"}`}
                onClick={()=>setOldnew(PAGINATION_ORDER.asc)}>오래된순</button>
            <button className={`w-23 p-2 border-2 border-white cursor-pointer rounded-r-lg ${oldnew !== "asc" ? "bg-white text-black" : "bg-black text-white"}`}
                onClick={()=>setOldnew(PAGINATION_ORDER.desc)}>최신순</button>
        </div>
        <div className='p-8 grid gap-x-4 gap-y-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7'>
        {data.map((lp) => (<LpCard key={lp.id} lp={lp}/>
        ))}
      </div>
        </div>
        
    )
}
export default HomePage;