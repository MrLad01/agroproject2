'use client'

import Image from "next/image";
import Link from "next/link";
import { FaConciergeBell } from "react-icons/fa"
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import background1 from '@/public/house1.png'
import background2 from '@/public/IMG_20241010_175833.jpg'
import background3 from '@/public/kitchen.png'
import background4 from '@/public/IMG_20240627_163644.jpg'
import background5 from '@/public/relaxation2.png'
import logo from '@/public/ASA logo.jpg'
import { DotButton, ScrollingDots, useDotButton } from "@/components/Embla/EmblaCarouselDotButton";
import Blog from "@/components/Blog";
import SectionOne from "@/components/Section1";
import SectionTwo from "@/components/Section2";
import Review from "@/components/Review";
import { gsap } from "gsap";
    
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);


export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()])
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

  // Array of images for the carousel
  const images = [background1, background2, background3, background4, background5]

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container h-[95.8vh]">

          <div className="embla__slide relative">
            <Image src={background1} alt="House background image" fill loading="eager" />
          </div>

          <div className="embla__slide relative">
            <Image src={background2} alt="Golf Course background image" fill loading="lazy" />
          </div>
    
          <div className="embla__slide relative">
            <Image src={background3} alt="Kitchen background image 3" fill loading="lazy" />
          </div>
          
          <div className="embla__slide relative">
            <Image src={background4} alt="Football background image 4" fill loading="lazy" />
          </div>

          <div className="embla__slide relative">
            <Image src={background5} alt="Recreation background image 4" fill loading="lazy" />
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


export default function Home() {
  return (
    <div className="pb-130">
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex flex-col min-h-screen w-full bg-white dark:bg-black sm:items-start">
          {/* Background Carousel */}
          <div className="w-full">
            <EmblaCarousel />
            <div className="absolute top-8 w-full h-[95vh] bg-[#00000075] flex flex-col px-12 py-6">
              {/* Nav */}
              <nav className="flex items-center justify-between shadow-2xl">
                {/* Logo */}
                <div className="flex gap-2 items-center">
                  <Image src={logo} alt="Agroterra Logo" height={30}  />
                  <h3 className="uppercase eb-garamond-extrabold text-[17px] text-white">Agroterra</h3>
                </div>
                <div className="flex gap-12 items-center text-[14px] normal-font pt-0.5">
                  <Link href={`/`} className=" text-white">Home</Link>
                  <Link href={`/reservation`} className=" text-white">Reservation</Link>
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
              <div className="h-full flex flex-col text-white items-center justify-center leading-relaxed">
                <div className="flex flex-col justify-center items-center -mt-16">
                  <h2 className="text-center eb-garamond-semibold text-[62px] welcome-text">WELCOME TO AGROTERRA</h2>
                  <p className="eb-garamond-italic text-[32px] max-w-140 text-center">&ldquo;A place that celebrates life rather than sucks life out of it.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ============ WELCOME SECTION ============ */}
      <SectionOne />

      {/* ============ EXPLORE SECTION ============ */}
      <SectionTwo />

      {/* ============ REVIEW SECTION ============ */}
      <Review />
      
      {/* ============ BLOG SECTION ============ */}
      <Blog />
    </div>
  );
}
