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
import { IoBedOutline } from "react-icons/io5"
import { TbCrosshair } from "react-icons/tb"
import { MdOutlineBathtub, MdOutlinePeopleOutline } from "react-icons/md"
import { ArrowUpRight } from "lucide-react"
import Navbar from "@/components/Navbar"


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
            )) :

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

type TabType = 'family' | 'junior' | 'deluxe'

const suiteData: Record<TabType, any[]> = {
  family: Array.from({ length: 4 }, () => ({
    title: 'Family Suite',
    image: family,
    description:
      'The Family Suite is perfect for families seeking space, comfort, and relaxation. Featuring elegant interiors and modern amenities.',
    size: '45 sqm',
    beds: '2 Beds',
    bath: '1 Bath',
    guests: '4 Guests',
    slug: 'family',
  })),

  junior: Array.from({ length: 4 }, () => ({
    title: 'Junior Suite',
    image: junior,
    description:
      'The Junior Suite blends modern comfort with tasteful elegance, ideal for couples or solo travelers.',
    size: '35 sqm',
    beds: '1 Bed',
    bath: '1 Bath',
    guests: '2 Guests',
    slug: 'junior',
  })),

  deluxe: Array.from({ length: 4 }, () => ({
    title: 'Deluxe Suite',
    image: deluxe,
    description:
      'The Deluxe Suite delivers premium comfort with spacious interiors, refined décor, and serene surroundings.',
    size: '50 sqm',
    beds: '2 Beds',
    bath: '1 Bath',
    guests: '4 Guests',
    slug: 'deluxe',
  })),
}

export default function Page() {
  const [activeTab, setActiveTab] = useState<TabType>('family')

  // Load saved tab
  useEffect(() => {
    const tabFromLocal = localStorage.getItem('tab3') as TabType | null
    if (tabFromLocal) {
      setActiveTab(tabFromLocal)
    }
  }, [])

  const handleTabSwitch = (tab: TabType, e: React.MouseEvent) => {
    e.preventDefault()
    setActiveTab(tab)
    localStorage.setItem('tab3', tab)
  }

  return (
    <div className="">
      <div className="flex-col min-h-screen bg-zinc-50 dark:bg-black">
        <main className="flex flex-col min-h-screen w-full bg-white">

          {/* Background Carousel */}
          <div className="w-full relative">
            <EmblaCarousel />
            <div className="absolute top-1 w-full h-[95vh] bg-[#00000075] flex flex-col px-12 py-6">
              {/* Nav */}
              <Navbar />
              <div className="h-full flex flex-col text-white items-center justify-center leading-relaxed">
                <div className="flex flex-col justify-center items-center -mt-16">
                  <h2 className="text-center eb-garamond-semibold text-[62px] welcome-text">AGROTERRA</h2>
                  <p className="eb-garamond-italic text-[28px] max-w-140 text-center">&ldquo;Where nature, comfort, and experience meet.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex w-full mt-12 mb-20 px-40">
            {[
              { key: 'family', label: 'Family Suite' },
              { key: 'junior', label: 'Junior Suite' },
              { key: 'deluxe', label: 'Deluxe Double Room' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={(e) => handleTabSwitch(tab.key as TabType, e)}
                className={`w-full py-4 text-[16px] eb-garamond-bold transition cursor-pointer
                  ${activeTab === tab.key
                    ? 'border-b-2 border-b-[#101996] text-[#101996]'
                    : 'text-[#111111] opacity-30'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Suites */}
          <div className="flex flex-col gap-24 pb-16">
            {suiteData[activeTab].map((suite, index) => (
              <div key={index}>
                {/* Purple demarcation line */}
                <div className="w-full h-px bg-gray-400 mb-16" />

                {/* Suite Card */}
                <div className="flex items-center justify-between px-48 gap-12">
                  <Image
                    src={suite.image}
                    alt={suite.title}
                    width={600}
                    className="rounded-2xl"
                  />

                  <div className="flex flex-col gap-4">
                    <h3 className="eb-garamond-semibold text-[18px] uppercase text-[#111111]">
                      {suite.title}
                    </h3>

                    <p className="text-[#5A5A5A] work-sans tracking-wider text-[16px] max-w-lg">
                      {suite.description}
                    </p>

                    <div className="flex text-[12px] gap-8">
                      <div className="flex items-center gap-2 opacity-80 text-[#111111]">
                        <TbCrosshair size={15} />
                        <span>{suite.size}</span>
                      </div>
                      <div className="flex items-center gap-2 opacity-80 text-[#111111]">
                        <IoBedOutline size={15} />
                        <span>{suite.beds}</span>
                      </div>
                      <div className="flex items-center gap-2 opacity-80 text-[#111111]">
                        <MdOutlineBathtub size={15} />
                        <span>{suite.bath}</span>
                      </div>
                      <div className="flex items-center gap-2 opacity-80 text-[#111111]">
                        <MdOutlinePeopleOutline size={15} />
                        <span>{suite.guests}</span>
                      </div>
                    </div>

                    <Link
                      href={`/room/${suite.slug}`}
                      className="flex border justify-center items-center gap-2 w-[30%]
                      text-[#101996] border-[#101996] rounded-2xl p-2
                      work-sans text-[12px] uppercase
                      hover:scale-110 transition duration-500 ease-in-out"
                    >
                      Room Details <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}