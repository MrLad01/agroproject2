'use client'
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoLocationSharp } from "react-icons/io5";
import { IoIosPhonePortrait, IoMdMailOpen } from "react-icons/io";
import { FaConciergeBell } from "react-icons/fa";
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
    <>
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
          <div className="absolute top-8 w-full h-[95vh] bg-[#00000075] flex flex-col px-12 py-6">
            {/* Nav */}
            <nav className="flex items-center justify-between shadow-2xl">
              {/* Logo */}
              <div className="flex gap-2 items-center">
                <Image src={logo} alt="Agroterra Logo" height={30}  />
                <h3 className="uppercase eb-garamond-extrabold text-[17px] text-white">Agroterra</h3>
              </div>
              <div className="flex gap-12 items-center text-[14px] normal-font pt-0.5">
                <Link href={``} className=" text-white">Home</Link>
                <Link href={``} className=" text-white">Resort</Link>
                <Link href={``} className=" text-white">Golf</Link>
                <Link href={``} className=" text-white">Sport Academy</Link>
                <Link href={``} className=" text-white">Contact</Link>
              </div>
              <button className="work-sans-bold text-[12px] mr-10 uppercase px-6 py-2.5 bg-white rounded-4xl flex items-center gap-2">
                <FaConciergeBell size={14} />
                Book Now
              </button>
            </nav>
            <div className="h-full flex flex-col text-white items-center justify-center leading-relaxed">
              <div className="flex flex-col justify-center items-center -mt-16">
                <h2 className="text-center eb-garamond-semibold text-[62px]">WELCOME TO AGROTERRA</h2>
                <p className="eb-garamond-italic text-[32px] max-w-140 text-center">&ldquo;A place that celebrates life rather than sucks life out of it.&rdquo;
                </p>
              </div>
              {/* <p className="eb-garamond-italic text-[18px] max-w-230 text-center">&ldquo;Nestled in the heart of pristine countryside, Agroterra Resort offers an unparalleled luxury experience 
              where nature meets sophistication. Our world-class facilities include premium accommodations, 
              a championship golf course, and an elite sports academy that caters to athletes of all levels.
              Whether you&apos;re seeking a peaceful retreat, an exciting golf adventure, or professional sports training, 
              Agroterra provides the perfect setting for your ultimate getaway. Experience the harmony of luxury, 
              recreation, and natural beauty in one extraordinary destination.&rdquo;
              </p> */}
            </div>
          </div>
        </div>
      </main>
    </div>
      <Blog />
    </>
  );
}
