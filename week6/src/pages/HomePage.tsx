import { useEffect, useState } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { useInView } from "react-intersection-observer";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";
import { PAGINATION_ORDER } from "../enums/common";

const HomePage = () => {
    const [search, setSearch] = useState("");
    // const {data, isPending, isError} = useGetLpList({search, limit: 50,});
    const {data:lps, isFetching, hasNextPage, isPending, fetchNextPage, isError} = useGetInfiniteLpList(
        10, search, PAGINATION_ORDER.desc,);
    
    const {ref, inView} = useInView({
        threshold: 0,
    });

    useEffect(() => {
        if (inView) {
            if (!isFetching && hasNextPage) {
                fetchNextPage();
            }
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage]);

    if (isError) {
        return <div className="mt-20">Error...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <input value={search} onChange={e => setSearch(e.target.value)} />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {isPending && <LpCardSkeletonList count={20} />}
                {lps?.pages
                ?.map((page) => page.data.data)
                ?.flat()
                ?.map((lp) => <LpCard lp={lp} key={lp.id} />)}
                {isFetching && <LpCardSkeletonList count={20} />}
                {/* {data?.map((lp) => <h1>{lp.title}</h1>)} */}
            </div>
            <div ref={ref} className="h-2" />
        </div>
    );
};

export default HomePage;