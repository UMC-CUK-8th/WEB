import { useEffect, useState } from "react";
import LpCard from "../components/LpCard/LpCard";
import { PAGINATION_ORDER } from "../enums/common";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import {useInView} from "react-intersection-observer";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import useThrottle from "../hooks/useThrottle";

const HomePage=()=>{

    
    const [search,setSearch]=useState("");
    const [oldnew,setOldnew]=useState(PAGINATION_ORDER.asc);
    //const {data,isPending,isError}=useGetLpList({order:oldnew, limit:32});
    const {data:lps,isFetching,hasNextPage,isPending,fetchNextPage,isError}=useGetInfiniteLpList(10,search,oldnew)

    //ref,inView
    //ref->특정한 HTML 요소를 감시할 수 있다.
    //inView->그 요소가 화면에 보이면 true
    const {ref,inView}=useInView({threshold:0,})

    
    
    const handleScroll=useThrottle(()=>{
        useEffect(()=>{
        if (inView&&!isFetching && hasNextPage){fetchNextPage()
        }
        },[inView,isFetching,fetchNextPage]);
    },2000);
        
    
    useEffect(()=>{
        window.addEventListener("scroll",handleScroll);

        return ()=>window.removeEventListener("scroll",handleScroll);
    },[handleScroll]);


    if (isError){
        return <div>Error.</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center bg-black min-h-screen">
        <div className="flex w-full pt-8 pr-10 justify-end">
            <button className={`w-23 p-2 border-2 border-white cursor-pointer rounded-l-lg ${oldnew === "asc" ? "bg-white text-black" : "bg-black text-white"}`}
                onClick={()=>setOldnew(PAGINATION_ORDER.asc)}>오래된순</button>
            <button className={`w-23 p-2 border-2 border-white cursor-pointer rounded-r-lg ${oldnew !== "asc" ? "bg-white text-black" : "bg-black text-white"}`}
                onClick={()=>setOldnew(PAGINATION_ORDER.desc)}>최신순</button>
        </div>
      <div className="grid p-3 gird-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {isPending&&
            <LpCardSkeletonList count={20}/>}
        {lps?.pages?.map((page)=>page.data.data)?.flat()?.map((lp)=><LpCard key={lp.id} lp={lp}/>  
        )}
        {isFetching&&
            <LpCardSkeletonList count={20}/>
        }
        <div ref={ref} className="h-2">
      </div>
      </div>
      
        </div>
        
    )
}
export default HomePage;