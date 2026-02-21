"use client"

import { DotButton, ScrollingDots, useDotButton } from "@/components/Embla/EmblaCarouselDotButton"
import Autoplay from "embla-carousel-autoplay"
import useEmblaCarousel from "embla-carousel-react"
import Image from "next/image"
import Link from "next/link"
import junior from '@/public/juniorBed.png'
import family from '@/public/familyBed.jpg'
import deluxe from '@/public/deluxeBed.jpg'
import { useEffect, useState, useCallback } from "react"
import { IoBedOutline } from "react-icons/io5"
import { TbCrosshair } from "react-icons/tb"
import { MdOutlineBathtub, MdOutlinePeopleOutline } from "react-icons/md"
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import Navbar from "@/components/Navbar"
import { motion, easeInOut } from "framer-motion"


// ─── Carousel ────────────────────────────────────────────────────────────────

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 4500, stopOnInteraction: true })]
  )
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const slides = [
    { src: family,  alt: "Family Suite" },
    { src: deluxe,  alt: "Deluxe Double Room" },
    { src: junior,  alt: "Junior Suite" },
    { src: family,  alt: "Family Suite alternate" },
  ]

  return (
    <section className="embla w-full">
      {/* ── Viewport ── */}
      <div
        className="embla__viewport overflow-hidden"
        ref={emblaRef}
      >
        {/* Slides – height is fully responsive via clamp so no breakpoint gaps */}
        <div
          className="embla__container flex"
          style={{ height: "clamp(52vh, 80vw, 96vh)" }}
        >
          {slides.map((slide, i) => (
            <div key={i} className="embla__slide relative min-w-0 flex-[0_0_100%]">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                loading={i === 0 ? "eager" : "lazy"}
                className="object-cover"
                sizes="100vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Dot controls ── */}
      <div className="embla__controls absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20">
        <div className="embla__dots flex items-center gap-2">
          {scrollSnaps.length <= 3
            ? scrollSnaps.map((_, i) => (
                <DotButton
                  key={i}
                  onClick={() => onDotButtonClick(i)}
                  image={slides[i]?.src ?? slides[0].src}
                  isSelected={i === selectedIndex}
                />
              ))
            : (
              <ScrollingDots
                images={slides.map(s => s.src)}
                selectedIndex={selectedIndex}
                onDotButtonClick={onDotButtonClick}
              />
            )
          }
        </div>
      </div>

      {/* ── Prev / Next arrows (hidden on very small screens) ── */}
      <button
        onClick={scrollPrev}
        aria-label="Previous slide"
        className="
          hidden sm:flex
          absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20
          w-9 h-9 md:w-11 md:h-11
          items-center justify-center
          rounded-full bg-black/30 hover:bg-black/55
          text-white backdrop-blur-sm
          transition-colors duration-200
        "
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={scrollNext}
        aria-label="Next slide"
        className="
          hidden sm:flex
          absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20
          w-9 h-9 md:w-11 md:h-11
          items-center justify-center
          rounded-full bg-black/30 hover:bg-black/55
          text-white backdrop-blur-sm
          transition-colors duration-200
        "
      >
      <ChevronRight size={20} />
      </button>
    </section>
  )
}


// ─── Suite data ───────────────────────────────────────────────────────────────

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


// ─── Framer Motion variants ───────────────────────────────────────────────────

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
}

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: easeInOut } },
}

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: easeInOut } },
}


// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const [activeTab, setActiveTab] = useState<TabType>('family')

  useEffect(() => {
    const saved = localStorage.getItem('tab3') as TabType | null
    if (saved) setActiveTab(saved)
  }, [])

  const handleTabSwitch = (tab: TabType, e: React.MouseEvent) => {
    e.preventDefault()
    setActiveTab(tab)
    localStorage.setItem('tab3', tab)
  }

  return (
    <div className="flex-col min-h-screen bg-white">
      <main className="flex flex-col min-h-screen w-full bg-white">

        {/* ── Hero / Carousel section ─────────────────────────────────────── */}
        <div className="w-full relative">
          <EmblaCarousel />

          {/* Overlay — same height as the carousel via the same clamp */}
          <div
            className="
              absolute inset-0 z-10
              bg-lunear-to-b from-black/60 via-black/40 to-black/20
              flex flex-col
              px-4 sm:px-6 md:px-10 lg:px-12
              py-4 sm:py-5 lg:py-6
            "
            style={{ height: "clamp(52vh, 80vw, 96vh)" }}
          >
            {/* Nav */}
            <Navbar />

            {/* Hero text – scales with viewport, centred vertically */}
            <div className="flex-1 flex flex-col items-center justify-center text-white text-center px-4">
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="
                  eb-garamond-semibold welcome-text
                  text-[clamp(28px,8vw,72px)]
                  leading-tight tracking-wide
                "
              >
                AGROTERRA
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="
                  eb-garamond-italic mt-3
                  text-[clamp(14px,3.5vw,28px)]
                  max-w-[90%] sm:max-w-130 md:max-w-160
                  leading-snug
                "
              >
                &ldquo;Where nature, comfort, and experience meet.&rdquo;
              </motion.p>
            </div>
          </div>
        </div>


        {/* ── Tabs ────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="
            w-full
            mt-8 sm:mt-10 lg:mt-12
            mb-10 sm:mb-14 lg:mb-18
            px-4 sm:px-8 md:px-16 lg:px-32 xl:px-40
          "
        >
          {/* Scrollable on tiny screens */}
          <div className="flex overflow-x-auto no-scrollbar border-b border-gray-200">
            {([
              { key: 'family', label: 'Family Suite' },
              { key: 'junior', label: 'Junior Suite' },
              { key: 'deluxe', label: 'Deluxe Double Room' },
            ] as const).map((tab, i) => (
              <motion.button
                key={tab.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => handleTabSwitch(tab.key, e)}
                className={`
                  shrink-0
                  px-4 sm:px-0 sm:flex-1
                  py-3 sm:py-4
                  text-[13px] sm:text-[14px] lg:text-[15px]
                  eb-garamond-bold whitespace-nowrap
                  border-b-2 -mb-px transition-all duration-200 cursor-pointer
                  ${activeTab === tab.key
                    ? 'border-[#101996] text-[#101996]'
                    : 'border-transparent text-[#111111] opacity-40 hover:opacity-70'
                  }
                `}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </motion.div>


        {/* ── Suite cards ─────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-12 sm:gap-16 lg:gap-24 pb-12 sm:pb-16 lg:pb-24">
          {suiteData[activeTab].map((suite, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
            >
              {/* Divider */}
              <motion.div
                variants={fadeIn}
                className="w-full h-px bg-gray-200 mb-8 sm:mb-12 lg:mb-16"
              />

              {/* Card layout — stacks on mobile, side-by-side from lg */}
              <div className="
                flex flex-col lg:flex-row
                items-center
                justify-between
                gap-8 sm:gap-10 lg:gap-12
                px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40
              ">

                {/* Image — always full width on mobile */}
                <motion.div
                  variants={index % 2 === 0 ? slideInLeft : slideInRight}
                  className="w-full lg:w-1/2 flex justify-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.04, rotate: 0.8 }}
                    transition={{ duration: 0.35 }}
                    className="w-full max-w-130 lg:max-w-none"
                  >
                    <Image
                      src={suite.image}
                      alt={suite.title}
                      width={600}
                      height={400}
                      className="rounded-2xl w-full h-auto object-cover shadow-lg"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 50vw"
                    />
                  </motion.div>
                </motion.div>

                {/* Text */}
                <motion.div
                  variants={index % 2 === 0 ? slideInRight : slideInLeft}
                  className="flex flex-col gap-4 w-full lg:w-1/2 lg:max-w-lg"
                >
                  <motion.h3
                    variants={fadeIn}
                    className="eb-garamond-semibold text-[15px] sm:text-[16px] lg:text-[18px] uppercase text-[#111111]"
                  >
                    {suite.title}
                  </motion.h3>

                  <motion.p
                    variants={fadeIn}
                    className="text-[#5A5A5A] work-sans tracking-wide text-[14px] sm:text-[15px] leading-relaxed"
                  >
                    {suite.description}
                  </motion.p>

                  {/* Specs */}
                  <motion.div
                    variants={fadeIn}
                    className="flex flex-wrap gap-4 sm:gap-6 text-[12px] sm:text-[13px] text-[#111111]"
                  >
                    {[
                      { icon: <TbCrosshair size={15} />, label: suite.size },
                      { icon: <IoBedOutline size={15} />, label: suite.beds },
                      { icon: <MdOutlineBathtub size={15} />, label: suite.bath },
                      { icon: <MdOutlinePeopleOutline size={15} />, label: suite.guests },
                    ].map(({ icon, label }) => (
                      <motion.div
                        key={label}
                        whileHover={{ scale: 1.08, x: 4 }}
                        className="flex items-center gap-2 opacity-75"
                      >
                        {icon}
                        <span>{label}</span>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* CTA */}
                  <motion.div variants={fadeIn} className="pt-1">
                    <Link
                      href={`/room/${suite.slug}`}
                      className="
                        inline-flex items-center justify-center gap-2
                        border border-[#101996] text-[#101996] rounded-2xl
                        px-5 py-2.5
                        work-sans text-[11px] sm:text-[12px] uppercase
                        w-full sm:w-auto
                        hover:bg-[#101996] hover:text-white
                        transition-all duration-400 ease-in-out
                      "
                    >
                      Room Details <ArrowUpRight size={15} />
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

      </main>
    </div>
  )
}