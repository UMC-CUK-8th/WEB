import { useEffect, useState } from "react";
import useThrottle from "../hooks/useThrottle";

const ThrottlePage = () => {
    const [scrollY, setScrollY] = useState<number>(0);

    const handleScroll = () => {
        setScrollY(window.scrollY);
    };

    // const handleScroll = useThrottle(() => {
    //     setScrollY(window.scrollY);
    // }, 2000);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    console.log("리렌더링");

    return (
        <div className="h-dvh flex flex-col items-center justify-center">
            <h1 className="text-xl font-bold">Throttling이 무엇일까요?</h1>
            <p>Scroll Y: {scrollY}px</p>
        </div>
    );
}

export default ThrottlePage;