import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import { PAGINATION_ORDER } from "../enums/common";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";


const HomePage = () =>{
    
    const [search, setSearch] = useState ("");
    const [order, setOrder] = useState (PAGINATION_ORDER.asc);
    //const {data, ispending, isError} = useGetLpList({search,limit:50,});
    const {data:lps, isFetching,hasNextPage,isPending,fetchNextPage,isError,refetch} = 
    useGetInfiniteLpList(10, search, order);

    const {ref, inView} = useInView(
    
    ); 
    useEffect(()=>{
        if(inView){
            !isFetching&&hasNextPage&&fetchNextPage();
        }
    }, [inView,isFetching,hasNextPage,fetchNextPage]);

   useEffect(()=>{
    refetch;
   },[order,search,refetch]);
    // if(!isError){
    //     return <div className={"mt-20"}>Error...</div>;
    // }

    const handleOrderChange = (newOrder) =>{
        setOrder(newOrder);
    }
    console.log(lps);

    return( 
       
        
        <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-4">
        <input value={search} onChange={(e)=>setSearch(e.target.value)}/>

        <div className="space-x-2">
            <button onClick={()=>handleOrderChange(PAGINATION_ORDER.asc)}
            className={`px-4 py-2 rounded ${
                order === PAGINATION_ORDER.asc
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200"
              }`}
              >
                오래된 순
            </button>
            <button
            onClick={() => handleOrderChange(PAGINATION_ORDER.desc)}
            className={`px-4 py-2 rounded ${
              order === PAGINATION_ORDER.desc
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            >
            최신 순
            </button>
        </div>
        </div>
        

        <div className={"grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"}>
        {isPending&&<LpCardSkeletonList count={20}/>}
        {lps?.pages
        ?.map((page)=> page.data.data)
        ?.flat()
        ?.map((lp)=><LpCard key={lp.id}lp={lp}/>)}
        {isFetching&&<LpCardSkeletonList count={20}/>}
        </div>
        <div ref={ref} className="h-2"></div>
        </div>
)
    
};


export default HomePage;