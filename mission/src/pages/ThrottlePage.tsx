import { useEffect, useRef, useState } from "react";
import throttle from "lodash/throttle";

const ThrottlePage = () => {
  const [scrollY, setScrollY] = useState<number>(0);
  const scrollHandlerRef = useRef<any>();

  useEffect(() => {
    scrollHandlerRef.current = throttle(() => {
      const currentY = window.scrollY;
      setScrollY(currentY);
      console.log(`리렌더링 scrollY: ${currentY}`); // 로그 출력
    }, 2000);

    window.addEventListener("scroll", scrollHandlerRef.current);
    return () => {
      window.removeEventListener("scroll", scrollHandlerRef.current);
    };
  }, []);

  return (
    <div className="text-white">
      <h1 className="text-center mt-10 text-2xl">쓰로틀링이 무엇일까요?</h1>
      <p className="text-center mb-4">ScrollY: {scrollY}px</p>
      <div className="h-[2000px]" />
    </div>
  );
};

export default ThrottlePage;




// import { useEffect, useState } from "react"
// import useThrottle from "../hooks/useThrottle";


// const ThrottlePage = () => {
//     const [scrollY, setScrollY] = useState<number>(0);
//     const handleScroll = useThrottle(() => {
//         setScrollY(window.scrollY);
//     }, 2000);

//     useEffect(() => {
//         window.addEventListener("scroll", handleScroll);

//         return () => window.removeEventListener("scroll", handleScroll)
//     },[handleScroll]);

//     return (
//     <div className="flex flex-col items-center justify-center text-white">
//         <h1>쓰로톨링이 무엇일까요?</h1>
//         <p>ScrollY: {scrollY}px</p>
//     </div>
//   )
// }

// export default ThrottlePage