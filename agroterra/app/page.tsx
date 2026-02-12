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
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

gsap.registerPlugin(TextPlugin);


export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

  const images = [background1, background2, background3, background4, background5]

  return (
    <section className="embla w-full h-full">
      <div className="embla__viewport h-full" ref={emblaRef}>
        <div className="embla__container h-full">

          <div className="embla__slide relative h-full">
            <Image src={background1} alt="House background image" fill className="object-cover" loading="eager" />
          </div>

          <div className="embla__slide relative h-full">
            <Image src={background2} alt="Golf Course background image" fill className="object-cover" loading="lazy" />
          </div>

          <div className="embla__slide relative h-full">
            <Image src={background3} alt="Kitchen background image" fill className="object-cover" loading="lazy" />
          </div>

          <div className="embla__slide relative h-full">
            <Image src={background4} alt="Football background image" fill className="object-cover" loading="lazy" />
          </div>

          <div className="embla__slide relative h-full">
            <Image src={background5} alt="Recreation background image" fill className="object-cover" loading="lazy" />
          </div>

        </div>

        <div className="embla__controls">
          <div className="embla__dots">
            {images.length <= 3
              ? scrollSnaps.map((_, index) => (
                <DotButton
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                  image={images[index]}
                  isSelected={index === selectedIndex}
                />
              ))
              : <ScrollingDots
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
    <div className="pb-10">
      <div className="font-sans">
        <main className="w-full">

          {/* ── Hero: carousel + overlay in a single positioned container ── */}
          <div className="relative w-full h-svh">

            {/* Carousel fills the container */}
            <EmblaCarousel />

            {/* Dark overlay — covers carousel, sits above it */}
            <div className="absolute inset-0 bg-[#00000075] flex flex-col px-4 sm:px-8 md:px-12 py-4 sm:py-6 z-10">

              {/* Navbar */}
              <Navbar />

              {/* Hero text */}
              <div className="flex-1 flex flex-col text-white items-center justify-center leading-relaxed px-4">
                <div className="flex flex-col justify-center items-center -mt-10 sm:-mt-14 md:-mt-16 text-center">
                  <h2 className="eb-garamond-semibold welcome-text
                    text-[32px] sm:text-[46px] md:text-[56px] lg:text-[62px]
                    max-w-[95vw] sm:max-w-[80vw] md:max-w-none">
                    WELCOME TO AGROTERRA
                  </h2>
                  <p className="eb-garamond-italic
                    text-[17px] sm:text-[24px] md:text-[28px] lg:text-[32px]
                    max-w-[90vw] sm:max-w-150 md:max-w-140">
                    &ldquo;A place that celebrates life rather than sucks life out of it.&rdquo;
                  </p>
                </div>
              </div>

            </div>
          </div>

        </main>
      </div>

      {/* ── Sections ── */}
      <SectionOne />
      <SectionTwo />
      <Review />
      <Blog />
    </div>
  );
}