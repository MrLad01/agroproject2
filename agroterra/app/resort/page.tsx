"use client"

import { DotButton, ScrollingDots, useDotButton } from "@/components/Embla/EmblaCarouselDotButton"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import Link from "next/link"
import { FaConciergeBell } from "react-icons/fa"
import junior from '@/public/juniorBed.png'
import family from '@/public/familyBed.jpg'
import deluxe from '@/public/deluxeBed.jpg'
import logo from '@/public/ASA logo.jpg'
import { useEffect, useState } from "react"


export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()])
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

  // Array of images for the carousel
  const images = [family, deluxe, junior]

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container h-[95.8vh]">

          <div className="embla__slide relative">
            <Image src={family} alt="House background image" fill loading="eager" />
          </div>

          <div className="embla__slide relative">
            <Image src={deluxe} alt="Golf Course background image" fill loading="lazy" />
          </div>
    
          <div className="embla__slide relative">
            <Image src={junior} alt="Kitchen background image 3" fill loading="lazy" />
          </div>
          
          <div className="embla__slide relative">
            <Image src={family} alt="Football background image 4" fill loading="lazy" />
          </div>
          
        </div>
        <div className="embla__controls">
          <div className="embla__dots">
            {images.length <= 3 ? scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                image={images[index]}
                isSelected={index === selectedIndex}
              />
            )): 
            
            <ScrollingDots 
              images={images}
              selectedIndex={selectedIndex}
              onDotButtonClick={onDotButtonClick}
            />

            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default function page() {
  const [activeTab, setActiveTab] = useState<string>('family');
  
    // Load from localStorage only after component mounts (client-side only)
    useEffect(() => {
      const tabFromLocal = localStorage.getItem('tab3')
      if (tabFromLocal) {
        setActiveTab(tabFromLocal)
      }
    }, [])
  
    const handleTabSwitch = (tabStart: string, e: React.MouseEvent) => {
      e.preventDefault();
      setActiveTab(tabStart);
      localStorage.setItem("tab3", tabStart)
    }

  return (
    <div className='pb-130'>
      <div className="flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
              <main className="flex flex-col min-h-screen w-full bg-white sm:items-start">
                {/* Background Carousel */}
                <div className="w-full">
                  <EmblaCarousel />
                  <div className="absolute top-8 w-full h-[95vh] bg-[#00000025] flex flex-col px-12 py-6">
                    {/* Nav */}
                    <nav className="flex items-center justify-between shadow-2xl">
                      {/* Logo */}
                      <div className="flex gap-2 items-center">
                        <Image src={logo} alt="Agroterra Logo" height={30}  />
                        <h3 className="uppercase eb-garamond-extrabold text-[17px] text-white">Agroterra</h3>
                      </div>
                      <div className="flex gap-12 items-center text-[14px] normal-font pt-0.5">
                        <Link href={`/`} className=" text-white">Home</Link>
                        <Link href={`/resort`} className=" text-white">Reservation</Link>
                        <Link href={`/golf`} className=" text-white">Golf Course</Link>
                        <Link href={`/sport-academy`} className=" text-white">Sport Academy</Link>
                        <Link href={`/contact`} className=" text-white">Contact</Link>
                        <Link href={`/about`} className=" text-white">About Us</Link>
                      </div>
                      <button className="work-sans-bold text-[12px] text-[#111111] mr-10 uppercase px-6 py-2.5 bg-white rounded-4xl flex items-center gap-2">
                        <FaConciergeBell size={14} />
                        Book Now
                      </button>
                    </nav>
                  </div>
                </div>
              <div className="flex items-center-safe w-full mt-8 mb-16 px-72">
          <button className={`w-full py-4 text-[16px]  eb-garamond-bold ${activeTab === "family" ? "border-b-[#101996] text-[#101996] border-b-2" : " text-[#111111] opacity-30 cursor-pointer"}`} onClick={(e) => handleTabSwitch("family", e)}>
            Family Suite
          </button>
          <button className={`w-full py-4 text-[16px]  eb-garamond-bold ${activeTab === "junior" ? "border-b-[#101996] text-[#101996] border-b-2" : "text-[#111111] opacity-30 cursor-pointer"}`} onClick={(e) => handleTabSwitch("junior", e)}>
            Junior Suite
          </button>
          <button className={`w-full py-4 text-[16px]  eb-garamond-bold ${activeTab === "deluxe" ? "border-b-[#101996] text-[#101996] border-b-2" : "text-[#111111] opacity-30 cursor-pointer"}`} onClick={(e) => handleTabSwitch("deluxe", e)}>
            Deluxe Double Room
          </button>
        </div>
              </main>
            </div>
    </div>
  )
}
