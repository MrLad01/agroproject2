'use client'
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoLocationSharp } from "react-icons/io5";
import { IoIosPhonePortrait, IoMdMailOpen } from "react-icons/io";
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import background1 from '@/public/house1.png'
import background2 from '@/public/house2.png'
import background3 from '@/public/IMG_20241010_175833.jpg'


export function EmblaCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()])

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container h-[95.8vh]">

        <div className="embla__slide relative">
          <Image src={background1} alt="House background image" fill loading="eager" />
        </div>

        <div className="embla__slide relative">
          <Image src={background2} alt="House background image 2" fill loading="lazy" />
        </div>
  
        <div className="embla__slide relative">
          <Image src={background3} alt="House background image 2" fill loading="lazy" />
        </div>
        
      
      </div>

    </div>
  )
}


export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col min-h-screen w-full bg-white dark:bg-black sm:items-start">
        {/* TOP nav */}
        <div className="w-full py-2 px-6 bg-black text-white work-sans text-[11px] flex items-center justify-between">
          {/* Location */}
          <Link className="flex gap-1 items-center" href="https://www.google.com/maps/place/Agroterra+Farm+Resort/@7.0972934,3.1209846,15z/data=!4m6!3m5!1s0x103a55f97786c3cb:0x5dca0bc8e4d4de1!8m2!3d7.0979033!4d3.1207854!16s%2Fg%2F11hjxgkkzr?entry=ttu&g_ep=EgoyMDI1MDYxNi4wIKXMDSoASAFQAw%3D%3D" target='_blank'>
            <IoLocationSharp size={15} />
            <h3>Joga-Orile, Iboro/Joga 110123, Ogun State | 34XC+58 Alade, Nigeria</h3>
          </Link>
          <div className="flex items-center gap-6">
            {/* Phone */}
            <div className="flex gap-1">
              <IoIosPhonePortrait size={15} />
              <h3>(+234) 803 319 4444</h3>
            </div>
            {/* Mail */}
            <div className="flex gap-1">
              <IoMdMailOpen size={15} />
              <h3>info@agroterraresort.com</h3>
            </div>
          </div>
        </div>
        {/* Background Carousel */}
        <div className="w-full">
          <EmblaCarousel />
        </div>
      </main>
    </div>
  );
}
