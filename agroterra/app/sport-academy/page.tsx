'use client'

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import background6 from '@/public/dorm6.png'

export default function Page() {
  const [count, setCount] = useState(3);
  const redirected = useRef(false);
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) return;
    didMount.current = true;

    const timer = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) {
          if (!redirected.current) {
            redirected.current = true;
            window.open('https://agroterra-sport-academy.vercel.app/', '_blank');
          }
          clearInterval(timer);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setCount(3);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="">
      <div className="relative min-h-screen  w-full flex items-center justify-center">
        <Image 
          src={background6} 
          alt="Background image" 
          fill 
          className="w-screen h-svh object-cover" 
        />
        <div className="absolute inset-0 bg-black opacity-80 z-5"></div>
        <div className="relative z-10 text-white text-3xl font-bold">
          We are redirecting to our academy page in {count}
        </div>
      </div>
    </div>
  )
}