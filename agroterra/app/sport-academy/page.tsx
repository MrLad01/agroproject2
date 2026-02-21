'use client'

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import background6 from '@/public/dorm6.png'

const REDIRECT_URL = 'https://agroterra-sport-academy.vercel.app/';

export default function Page() {
  const [count, setCount] = useState(3);
  const [redirected, setRedirected] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timerRef.current!);
          timerRef.current = null;

          // Detect mobile — open in same tab; desktop — try new tab
          const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
          if (isMobile) {
            window.location.href = REDIRECT_URL;
          } else {
            const newWindow = window.open(REDIRECT_URL, '_blank');
            // If pop-up was blocked, fall back to same tab
            if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
              window.location.href = REDIRECT_URL;
            }
          }

          setRedirected(true);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    startTimer();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Reset count when tab is hidden (user switched away)
        setCount(3);
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      } else {
        // Resume when tab becomes visible again
        startTimer();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="">
      <div className="relative min-h-screen w-full flex items-center justify-center">
        <Image
          src={background6}
          alt="Background image"
          fill
          className="w-screen h-svh object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-80 z-5" />

        <div className="relative z-10 flex flex-col items-center gap-6 text-white text-center px-4">
          {!redirected ? (
            <p className="text-3xl font-bold">
              We are redirecting to our academy page in {count}…
            </p>
          ) : (
            <>
              <p className="text-3xl font-bold">You have been redirected!</p>
              <p className="text-lg text-white/70">
                If the page didn&apos;t open, your browser may have blocked the pop-up.
              </p>
              <a
                href={REDIRECT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-white/90 transition"
              >
                Open Academy Page
              </a>
              <a
                href="/"
                className="px-6 py-3 border border-white text-white font-semibold rounded-xl hover:bg-white/10 transition"
              >
                Return Home
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}