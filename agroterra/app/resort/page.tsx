'use client'

import Image from "next/image";
import Link from "next/link";
import { FaConciergeBell } from "react-icons/fa";
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import background from '@/public/17.png'
import background1 from '@/public/09.png'
import background2 from '@/public/IMG_20241010_175833.jpg'
import background3 from '@/public/kitchen.png'
import background4 from '@/public/IMG_20240627_163644.jpg'
import background5 from '@/public/relaxation2.png'
import aboutImage from '@/public/house2.png'
import logo from '@/public/ASA logo.jpg'
import { DotButton, ScrollingDots, useDotButton } from "@/components/Embla/EmblaCarouselDotButton";

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


export default function page() {
  return (
    <div className="pb-130">
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex flex-col min-h-screen w-full bg-white dark:bg-black sm:items-start">
          {/* Background Carousel */}
          <div className="w-full">
            {/* <EmblaCarousel /> */}
            <Image src={background} alt="Background image" className="w-screen" />
            <div className="absolute top-8 w-full h-[110vh] bg-[#00000075] flex flex-col px-12 py-6">
              {/* Nav */}
              <nav className="flex items-center justify-between shadow-2xl">
                {/* Logo */}
                <div className="flex gap-2 items-center">
                  <Image src={logo} alt="Agroterra Logo" height={30}  />
                  <h3 className="uppercase eb-garamond-extrabold text-[17px] text-white">Agroterra</h3>
                </div>
                <div className="flex gap-12 items-center text-[14px] normal-font pt-0.5">
                  <Link href={`/`} className=" text-white">Home</Link>
                  <Link href={`/resort`} className=" text-white">Resort</Link>
                  <Link href={`/golf`} className=" text-white">Golf</Link>
                  <Link href={`/sport-academy`} className=" text-white">Sport Academy</Link>
                  <Link href={`/contact`} className=" text-white">Contact</Link>
                </div>
                <button className="work-sans-bold text-[12px] mr-10 uppercase px-6 py-2.5 bg-white rounded-4xl flex items-center gap-2">
                  <FaConciergeBell size={14} />
                  Book Now
                </button>
              </nav>
              <div className="h-full flex flex-col text-white items-center justify-center leading-relaxed">
                <div className="flex flex-col justify-center items-center -mt-26">
                  <h2 className="text-center eb-garamond-semibold text-[52px] welcome-text">AGROTERRA</h2>
                  <p className="eb-garamond-italic text-[28px] max-w-140 text-center">Where nature, comfort, and experience meet.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <div className="overlay bg-white w-full z-50 top-200 absolute h-25"></div>

      <div className="flex px-40 pb-14 gap-20 items-center justify-center">
        <div className="flex flex-col gap-3">
          <h2 className="cormorant-garamond-medium-italic text-4xl">About Agroterra Resort</h2>
          <p className="cormorant-garamond-light-italic text-[18px]">Agroterra Resort is a peaceful destination designed to bring people closer to nature while offering comfort and relaxation. Surrounded by open landscapes and natural beauty, the resort provides a calm escape from busy everyday life. Every space is created to feel at home<br />welcoming, spacious, and refreshing, allowing guests to slow down, breathe deeply, and enjoy meaningful moments. From leisure experiences to quiet retreats, Agroterra combines nature, comfort, and thoughtful design to create a stay that feels both restful and memorable.</p>
        </div>
        <Image src={aboutImage} alt="About Agroterra Resort" width={1000} height={600} className="ml-12" />
      </div>

      <div className="flex px-30 py-20 gap-20 items-center justify-between bg-zinc-100">
        <Image src={aboutImage} alt="About Agroterra Resort" width={1000} height={600} className="ml-12" />
        <div className="flex flex-col gap-3">
          <h2 className="cormorant-garamond-medium-italic text-4xl">Surrounded by Natural Beauty</h2>
          <p className="cormorant-garamond-light-italic text-[18px]">Nature is at the heart of the Agroterra experience. The resort is embraced by trees, open skies, and fresh air that create a peaceful and grounding atmosphere. The natural setting adds beauty to every moment, from morning walks to quiet evenings. This connection to the outdoors is what makes every visit feel refreshing and different from daily life. It is a setting that encourages calm, reflection, and comfort.</p>
        </div>
      </div>

      <div className="flex px-40 py-14 gap-20 items-center justify-between">
        <div className="flex flex-col gap-3">
          <h2 className="cormorant-garamond-medium-italic text-4xl">Golf at Agroterra</h2>
          <p className="cormorant-garamond-light-italic text-[18px]">Set within a peaceful natural landscape, the golf experience at Agroterra Resort is designed to be both relaxing and engaging. The course stretches across a wide portion of land, surrounded by trees and open skies that create a calm and refreshing environment. Every hole offers a blend of space, scenery, and thoughtful design, making each round feel enjoyable and unhurried.<br />
          Whether you are an experienced golfer or new to the game, the course provides a welcoming setting where you can focus, improve, and enjoy time outdoors. The natural surroundings reduce distractions and create a sense of privacy, turning each round into a quiet escape. From smooth greens to open fairways, the course balances recreation with the peaceful atmosphere that defines Agroterra Resort.</p>
        </div>
        <Image src={background1} alt="About Agroterra Resort" className="w-140 h-90" />
      </div>

    </div>
  )
}
