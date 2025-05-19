import { useEffect, useState } from 'react';
import useThrottle from '../../hooks/useThrottle';

export default function ThrottlePage() {
  const [scrollY, setScrollY] = useState<number>(0);

  const handleScroll = useThrottle(() => {
    setScrollY(window.scrollY);
    console.log('ScrollY:', window.scrollY);
  }, 2000);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className='text-white flex flex-col items-center mt-100'>
      <div>
        <h1>What's Throttle?</h1>
        <p>ScrollY: {scrollY}px</p>
        <div style={{ height: '2000px' }} />
      </div>
    </div>
  );
}
