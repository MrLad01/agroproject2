'use client'

import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import background1 from '@/public/house1.png'
import background2 from '@/public/IMG_20241010_175833.jpg'
import background3 from '@/public/kitchen.png'
import background4 from '@/public/IMG_20240627_163644.jpg'
import background5 from '@/public/relaxation2.png'
import { useDotButton } from '@/components/Embla/EmblaCarouselDotButton'
import Blog from '@/components/Blog'
import SectionOne from '@/components/Section1'
import SectionTwo from '@/components/Section2'
import Review from '@/components/Review'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import Navbar from '@/components/Navbar'
import { useState, useEffect, useCallback } from 'react'
import { Sun, Moon } from 'lucide-react'
import { StaticImageData } from 'next/image'

gsap.registerPlugin(TextPlugin)

// ── Theme tokens for the hero / page shell ────────────────────────
const heroOverlay = {
  light: 'rgba(0,0,0,0.45)',
  dark:  'rgba(8,14,8,0.72)',
}

const toggleStyle = {
  light: { bg: '#ede8df', border: '#ddd5c4', accent: '#1e5e32' },
  dark:  { bg: '#0f180f', border: '#243424', accent: '#7ec850' },
}

// ── Carousel breadcrumbs (image thumbnails + mobile pill) ─────────
function ImageBreadcrumbs({
  slides, selected, onSelect, isDark,
}: {
  slides: StaticImageData[]
  selected: number
  onSelect: (i: number) => void
  isDark: boolean
}) {
  const accentVal  = isDark ? '#7ec850' : '#1e5e32'
  const ruleLine   = isDark ? '#2a3d2a' : '#c5d4b0'
  const thumbRing  = accentVal
  const thumbTint  = isDark ? 'rgba(126,200,80,0.18)' : 'rgba(30,94,50,0.18)'

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {slides.map((src, i) => {
        const active = i === selected
        return (
          <button key={i} onClick={() => onSelect(i)} aria-label={`Slide ${i + 1}`}
            className="relative shrink-0 focus:outline-none">
            {/* Desktop thumbnail */}
            <span className="hidden sm:block relative overflow-hidden rounded-lg" style={{
              width:      active ? 72 : 48,
              height:     active ? 48 : 32,
              transition: 'width .4s cubic-bezier(.22,1,.36,1), height .4s cubic-bezier(.22,1,.36,1)',
              boxShadow:  active
                ? `0 0 0 2.5px ${thumbRing}, 0 6px 20px rgba(0,0,0,0.5)`
                : '0 2px 8px rgba(0,0,0,0.4)',
              opacity: active ? 1 : 0.5,
            }}>
              <Image src={src} alt="" fill className="object-cover" sizes="80px" />
              {active && (
                <span className="absolute inset-0 rounded-lg"
                  style={{ background: `linear-gradient(135deg,${thumbTint},transparent)` }} />
              )}
            </span>
            {/* Mobile pill */}
            <span className="block sm:hidden rounded-full" style={{
              width:           active ? 28 : 8,
              height:          8,
              backgroundColor: active ? accentVal : ruleLine,
              opacity:         active ? 1 : 0.5,
              transition:      'width .35s cubic-bezier(.22,1,.36,1)',
            }} />
          </button>
        )
      })}
    </div>
  )
}

// ── Carousel ──────────────────────────────────────────────────────
function EmblaCarousel({ isDark }: { isDark: boolean }) {
  const slides: StaticImageData[] = [
    background1, background2, background3, background4, background5,
  ]

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 4800, stopOnInteraction: false })]
  )
  const { selectedIndex, onDotButtonClick } = useDotButton(emblaApi)

  return (
    <div className="relative w-full h-full">
      {/* Viewport */}
      <div className="overflow-hidden w-full h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((src, i) => (
            <div key={i} className="relative flex-[0_0_100%] h-full">
              <Image
                src={src}
                alt={`Agroterra slide ${i + 1}`}
                fill
                className="object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
                priority={i === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Breadcrumb tray — bottom of carousel */}
      <div className="absolute bottom-5 sm:bottom-7 inset-x-0 z-20 flex justify-center px-4">
        <div
          className="flex items-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl"
          // style={{
          //   background:     'rgba(0,0,0,0.38)',
          //   backdropFilter: 'blur(14px)',
          //   border:         '1px solid rgba(255,255,255,0.13)',
          // }}
        >
          <ImageBreadcrumbs
            slides={slides}
            selected={selectedIndex}
            onSelect={onDotButtonClick}
            isDark={isDark}
          />
        </div>
      </div>
    </div>
  )
}

// ── Home page ─────────────────────────────────────────────────────
export default function Home() {
  const [isDark, setIsDark] = useState(false)

  // Respect OS preference on first load
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) setIsDark(true)
  }, [])

  const tg = isDark ? toggleStyle.dark : toggleStyle.light
  const overlay = isDark ? heroOverlay.dark : heroOverlay.light

  return (
    <div
      style={{
        backgroundColor: isDark ? '#080e08' : '#f8f5ef',
        transition: 'background-color 0.3s',
      }}
      className="pb-10"
    >
      {/* ── Single global dark/light toggle — fixed, bottom-right ── */}
      <button
        onClick={() => setIsDark(d => !d)}
        aria-label="Toggle dark mode"
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          backgroundColor: tg.bg,
          color:           tg.accent,
          border:          `1px solid ${tg.border}`,
          boxShadow:       `0 4px 24px ${tg.accent}28`,
          transition:      'background-color 0.3s, color 0.3s, border-color 0.3s',
        }}
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <div className="font-sans">
        <main className="w-full">

          {/* ── Hero ─────────────────────────────────────────────── */}
          <div className="relative w-full h-svh">

            {/* Carousel */}
            <EmblaCarousel isDark={isDark} />

            {/* Dark overlay + navbar + hero text */}
            <div
              className="absolute inset-0 flex flex-col px-4 sm:px-8 md:px-12 py-4 sm:py-6 z-10"
              style={{
                background: `linear-gradient(to bottom, ${overlay} 0%, rgba(0,0,0,0.18) 45%, ${overlay} 100%)`,
                transition: 'background 0.3s',
              }}
            >
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
                    max-w-[90vw] sm:max-w-150 md:max-w-140 mt-2">
                    &ldquo;A place that celebrates life.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>

      {/* ── Sections — all receive isDark ── */}
      <SectionOne dark={isDark} />
      <SectionTwo dark={isDark} />
      {/* <Review dark={isDark} /> */}
      <Blog dark={isDark} />
    </div>
  )
}