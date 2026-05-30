'use client'

import Image, { StaticImageData } from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useDotButton } from '@/components/Embla/EmblaCarouselDotButton'
import Blog from '@/components/Blog'
import SectionOne from '@/components/Section1'
import SectionTwo from '@/components/Section2'
import Navbar from '@/components/Navbar'
import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import { useHeroData, useSiteData } from '../context/SiteDataContext'

gsap.registerPlugin(TextPlugin)

const heroOverlay = {
  light: 'rgba(0,0,0,0.45)',
  dark:  'rgba(8,14,8,0.72)',
}

const toggleStyle = {
  light: { bg: '#ede8df', border: '#ddd5c4', accent: '#1e5e32' },
  dark:  { bg: '#0f180f', border: '#243424', accent: '#7ec850' },
}

// ── Breadcrumbs ───────────────────────────────────────────────────
function ImageBreadcrumbs({
  urls, selected, onSelect, isDark,
}: {
  urls: string[]
  selected: number
  onSelect: (i: number) => void
  isDark: boolean
}) {
  const accentVal = isDark ? '#7ec850' : '#1e5e32'
  const ruleLine  = isDark ? '#2a3d2a' : '#c5d4b0'
  const thumbTint = isDark ? 'rgba(126,200,80,0.18)' : 'rgba(30,94,50,0.18)'

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {urls.map((url, i) => {
        const active = i === selected
        return (
          <button key={i} onClick={() => onSelect(i)} aria-label={`Slide ${i + 1}`}
            className="relative shrink-0 focus:outline-none">
            <span className="hidden sm:block relative overflow-hidden rounded-lg" style={{
              width:      active ? 72 : 48,
              height:     active ? 48 : 32,
              transition: 'width .4s cubic-bezier(.22,1,.36,1), height .4s cubic-bezier(.22,1,.36,1)',
              boxShadow:  active
                ? `0 0 0 2.5px ${accentVal}, 0 6px 20px rgba(0,0,0,0.5)`
                : '0 2px 8px rgba(0,0,0,0.4)',
              opacity: active ? 1 : 0.5,
            }}>
              <Image src={url} alt="" fill className="object-cover" sizes="80px" />
              {active && (
                <span className="absolute inset-0 rounded-lg"
                  style={{ background: `linear-gradient(135deg,${thumbTint},transparent)` }} />
              )}
            </span>
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

function EmblaCarousel({ slideUrls, isDark }: { slideUrls: string[]; isDark: boolean }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 4800, stopOnInteraction: false })]
  )
  const { selectedIndex, onDotButtonClick } = useDotButton(emblaApi)

  if (slideUrls.length === 0) return <div className="w-full h-full bg-black/20" />

  return (
    <div className="relative w-full h-full">
      <div className="overflow-hidden w-full h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slideUrls.map((url, i) => (
            <div key={i} className="relative flex-[0_0_100%] h-full">
              <Image
                src={url}
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

      <div className="absolute bottom-5 sm:bottom-7 inset-x-0 z-20 flex justify-center px-4">
        <div className="flex items-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl">
          <ImageBreadcrumbs
            urls={slideUrls}
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

  // Single context call — no local fetching
  const { heroText, heroSlides } = useHeroData()
  const { loading } = useSiteData()

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) setIsDark(true)
  }, [])

  const tg      = isDark ? toggleStyle.dark  : toggleStyle.light
  const overlay = isDark ? heroOverlay.dark  : heroOverlay.light

  // Extract sorted, active slide URLs from context
  const slideUrls = heroSlides
    .filter(s => s.active)
    .sort((a, b) => a.order - b.order)
    .map(s => s.asset.imageUrl)

  return (
    <div style={{ backgroundColor: isDark ? '#080e08' : '#f8f5ef', transition: 'background-color 0.3s' }}
      className="pb-10">

      {/* Theme toggle */}
      <motion.button
        onClick={() => setIsDark(d => !d)}
        aria-label="Toggle dark mode"
        className="fixed bottom-6 right-6 z-50 cursor-pointer w-12 h-12 rounded-full flex items-center justify-center"
        style={{ backgroundColor: isDark ? '#0f180f' : '#ede8df', color: tg.accent, border: `1px solid ${tg.border}` }}
        animate={{
          boxShadow: [`0 0 0px 0px ${tg.accent}00`, `0 0 16px 4px ${tg.accent}55`, `0 0 0px 0px ${tg.accent}00`],
          rotate: [0, -8, 8, -4, 4, 0],
        }}
        transition={{
          boxShadow: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
          rotate:    { duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
        }}
        whileHover={{ scale: 1.18, rotate: 20 }}
        whileTap={{ scale: 0.88, rotate: -15 }}>
        <motion.div animate={{ rotate: isDark ? 0 : 360 }} transition={{ duration: 0.5, ease: 'easeInOut' }}>
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </motion.div>
      </motion.button>

      <main className="w-full">

        {/* Hero */}
        <div className="relative w-full h-svh">
          <EmblaCarousel slideUrls={slideUrls} isDark={isDark} />

          <div
            className="absolute inset-0 flex flex-col px-4 sm:px-8 md:px-12 py-4 sm:py-6 z-10"
            style={{
              background: `linear-gradient(to bottom, ${overlay} 0%, rgba(0,0,0,0.18) 45%, ${overlay} 100%)`,
              transition: 'background 0.3s',
            }}>
            <Navbar />

            <div className="flex-1 flex flex-col text-white items-center justify-center leading-relaxed px-4">
              <div className="flex flex-col justify-center items-center -mt-10 sm:-mt-14 md:-mt-16 text-center">
                {loading ? (
                  // Skeleton while context is loading
                  <div className="animate-pulse space-y-4">
                    <div className="h-12 w-80 bg-white/20 rounded-xl mx-auto" />
                    <div className="h-7 w-56 bg-white/15 rounded-lg mx-auto" />
                  </div>
                ) : (
                  <>
                    <h2 className="eb-garamond-semibold welcome-text
                      text-[32px] sm:text-[46px] md:text-[56px] lg:text-[62px]
                      max-w-[95vw] sm:max-w-[80vw] md:max-w-none">
                      {heroText?.heading || 'WELCOME TO AGROTERRA'}
                    </h2>
                    <p className="eb-garamond-italic
                      text-[17px] sm:text-[24px] md:text-[28px] lg:text-[32px]
                      max-w-[90vw] sm:max-w-150 md:max-w-140 mt-2">
                      &ldquo;{heroText?.subtext || 'A place that celebrates life.'}&rdquo;
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

      </main>

      <SectionOne dark={isDark} />
      <SectionTwo dark={isDark} />
      <Blog dark={isDark} />
    </div>
  )
}