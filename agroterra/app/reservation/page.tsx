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
import { motion, easeInOut } from "framer-motion"


export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()])
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

  // Array of images for the carousel
  const images = [family, deluxe, junior]

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[95.8vh]">

          <div className="embla__slide relative">
            <Image src={family} alt="House background image" fill loading="eager" className="object-cover" />
          </div>

          <div className="embla__slide relative">
            <Image src={deluxe} alt="Golf Course background image" fill loading="lazy" className="object-cover" />
          </div>

          <div className="embla__slide relative">
            <Image src={junior} alt="Kitchen background image 3" fill loading="lazy" className="object-cover" />
          </div>

          <div className="embla__slide relative">
            <Image src={family} alt="Football background image 4" fill loading="lazy" className="object-cover" />
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

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.7,
      ease: easeInOut
    }
  },
}

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.7,
      ease: easeInOut
    }
  },
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
            <div className="absolute top-1 w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[95vh] bg-[#00000075] flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-5 lg:py-6">
              {/* Nav */}
              <Navbar />
              <div className="h-full flex flex-col text-white items-center justify-center leading-relaxed">
                <div className="flex flex-col justify-center items-center -mt-8 sm:-mt-12 lg:-mt-16">
                  <motion.h2 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center eb-garamond-semibold text-[32px] sm:text-[42px] md:text-[52px] lg:text-[62px] welcome-text"
                  >
                    AGROTERRA
                  </motion.h2>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="eb-garamond-italic text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px] max-w-[90%] sm:max-w-140 text-center px-4"
                  >
                    &ldquo;Where nature, comfort, and experience meet.&rdquo;
                  </motion.p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row w-full mt-8 sm:mt-10 lg:mt-12 mb-12 sm:mb-16 lg:mb-20 px-4 sm:px-8 md:px-16 lg:px-32 xl:px-40"
          >
            {[
              { key: 'family', label: 'Family Suite' },
              { key: 'junior', label: 'Junior Suite' },
              { key: 'deluxe', label: 'Deluxe Double Room' },
            ].map((tab, index) => (
              <motion.button
                key={tab.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => handleTabSwitch(tab.key as TabType, e)}
                className={`w-full py-3 sm:py-4 text-[14px] sm:text-[15px] lg:text-[16px] eb-garamond-bold transition cursor-pointer
                  ${activeTab === tab.key
                    ? 'border-b-2 border-b-[#101996] text-[#101996]'
                    : 'text-[#111111] opacity-30'
                  }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </motion.div>

          {/* Suites */}
          <div className="flex flex-col gap-12 sm:gap-16 lg:gap-24 pb-8 sm:pb-12 lg:pb-16">
            {suiteData[activeTab].map((suite, index) => (
              <motion.div 
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
              >
                {/* Purple demarcation line */}
                <motion.div 
                  variants={fadeIn}
                  className="w-full h-px bg-gray-400 mb-8 sm:mb-12 lg:mb-16" 
                />

                {/* Suite Card */}
                <div className="flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 gap-6 sm:gap-8 lg:gap-12">
                  <motion.div 
                    variants={index % 2 === 0 ? slideInLeft : slideInRight}
                    className="w-full lg:w-auto flex justify-center lg:justify-start"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Image
                        src={suite.image}
                        alt={suite.title}
                        width={600}
                        className="rounded-2xl w-full max-w-125 lg:max-w-150 h-auto shadow-lg"
                      />
                    </motion.div>
                  </motion.div>

                  <motion.div 
                    variants={index % 2 === 0 ? slideInRight : slideInLeft}
                    className="flex flex-col gap-3 sm:gap-4 w-full lg:w-auto"
                  >
                    <motion.h3 
                      variants={fadeIn}
                      className="eb-garamond-semibold text-[16px] sm:text-[17px] lg:text-[18px] uppercase text-[#111111]"
                    >
                      {suite.title}
                    </motion.h3>

                    <motion.p 
                      variants={fadeIn}
                      className="text-[#5A5A5A] work-sans tracking-wider text-[14px] sm:text-[15px] lg:text-[16px] max-w-full lg:max-w-lg"
                    >
                      {suite.description}
                    </motion.p>

                    <motion.div 
                      variants={fadeIn}
                      className="flex flex-wrap text-[11px] sm:text-[12px] gap-4 sm:gap-6 lg:gap-8"
                    >
                      <motion.div 
                        whileHover={{ scale: 1.1, x: 5 }}
                        className="flex items-center gap-2 opacity-80 text-[#111111]"
                      >
                        <TbCrosshair size={15} />
                        <span>{suite.size}</span>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.1, x: 5 }}
                        className="flex items-center gap-2 opacity-80 text-[#111111]"
                      >
                        <IoBedOutline size={15} />
                        <span>{suite.beds}</span>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.1, x: 5 }}
                        className="flex items-center gap-2 opacity-80 text-[#111111]"
                      >
                        <MdOutlineBathtub size={15} />
                        <span>{suite.bath}</span>
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.1, x: 5 }}
                        className="flex items-center gap-2 opacity-80 text-[#111111]"
                      >
                        <MdOutlinePeopleOutline size={15} />
                        <span>{suite.guests}</span>
                      </motion.div>
                    </motion.div>

                    <motion.div
                      variants={fadeIn}
                    >
                      <Link
                        href={`/room/${suite.slug}`}
                        className="inline-flex border justify-center items-center gap-2 w-full sm:w-[50%] lg:w-[40%] xl:w-[30%]
                        text-[#101996] border-[#101996] rounded-2xl p-2
                        work-sans text-[11px] sm:text-[12px] uppercase
                        hover:scale-110 hover:bg-[#101996] hover:text-white transition-all duration-500 ease-in-out"
                      >
                        Room Details <ArrowUpRight size={16} />
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}