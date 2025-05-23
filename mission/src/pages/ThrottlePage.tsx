import { useEffect, useState } from "react"
import useThrottle from "../hooks/useThrottle";


const ThrottlePage = () => {
    const [scrollY, setScrollY] = useState<number>(0);
    const handleScroll = useThrottle(() => {
        setScrollY(window.scrollY);
    }, 2000);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll)
    },[handleScroll]);

    return (
    <div className="flex flex-col items-center justify-center text-white">
        <h1>쓰로톨링이 무엇일까요?</h1>
        <p>ScrollY: {scrollY}px</p>
    </div>
  )
}

export default ThrottlePage