import { useEffect, useState } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import {useInView} from "react-intersection-observer"; 
import LpCard from "../components/LpCard";
import LpCardSkeletonList from "../components/LpCardSkeletonList";


const HomePage =()=>{
    const [search, setSearch] = useState("");
    //const {data, isPending, isError} = useGetLPList({
    //    search,
    //    limit:50,
    //});

    //ref,inView
    //ref-> 특정한 HTML 요소를 감시할 수 있다
    //inVew-> 그 요소가 화면에 보이면 true, 아니면 false
    const {data:lps, isFetching, hasNextPage, isPending, fetchNextPage, isError} = useGetInfiniteLpList(3, search,PAGINATION_ORDER.desc)

    const{ref, inView} = useInView({
        threshold:0,
    });

    useEffect(()=>{
        if(inView){
            !isFetching && hasNextPage && fetchNextPage()
        }
    },[inView, isFetching, hasNextPage, fetchNextPage])
    if(isPending){
        return <div className={"mt-20"}>Loading...</div>;
    }
    if(isError){
        return <div className={"mt-20"}>Error...</div>
    }

    console.log(lps);
    console.log('Pages:', lps?.pages);
    console.log('Flattened Data:', lps?.pages?.map((page)=>page.data.data)?.flat());
    return(
        <div className="container mx-auto px-4 py-6">
            <input value={search} onChange={(e)=>setSearch(e.target.value)}/>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {lps?.pages?.map((page)=>page.data.data)
            ?.flat()
            ?.map((lp)=> <LpCard key = {lp.id} lp={lp}/>)}  

            {isFetching&& <LpCardSkeletonList count={20}/>}
            </div>
            <div ref ={ref} className="h-2"/>
        </div> 
    )
};
export default HomePage;