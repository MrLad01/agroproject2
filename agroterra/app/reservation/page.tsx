"use client"

import Image, { StaticImageData } from 'next/image'
import Link from "next/link"
import junior from '@/public/juniorBed.png'
import family from '@/public/familyBed.jpg'
import deluxe from '@/public/deluxeBed.jpg'
import bg from '@/public/kitchen.png'
import { useEffect, useState, useCallback } from "react"
import { IoBedOutline } from "react-icons/io5"
import { TbCrosshair } from "react-icons/tb"
import { MdOutlineBathtub, MdOutlinePeopleOutline } from "react-icons/md"
import { ArrowUpRight, ChevronLeft, ChevronRight, Sun, Moon } from "lucide-react"
import Navbar from "@/components/Navbar"
import { motion, AnimatePresence } from "framer-motion"
import useEmblaCarousel from "embla-carousel-react"
import { useDotButton } from "@/components/Embla/EmblaCarouselDotButton"
import Autoplay from "embla-carousel-autoplay"

// ── Easing ────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const

// ── Theme ─────────────────────────────────────────────────────────
type Theme = {
  page: string
  pageVal: string
  surface: string
  surfaceVal: string
  borderVal: string
  accentVal: string
  headingVal: string
  bodyVal: string
  mutedVal: string
  ruleLine: string
  thumbRing: string
  thumbTint: string
  tabActive: string
  tabInactive: string
  chipBg: string
  chipBorder: string
}

const light: Theme = {
  page: 'bg-[#f5f2eb]',
  pageVal: '#f5f2eb',
  surface: 'bg-white',
  surfaceVal: '#ffffff',
  borderVal: '#ddd5c4',
  accentVal: '#1e5e32',
  headingVal: '#0f1f0f',
  bodyVal: '#3a4e3a',
  mutedVal: '#7a8c6a',
  ruleLine: '#cec8bc',
  thumbRing: '#1e5e32',
  thumbTint: 'rgba(30,94,50,0.2)',
  tabActive: 'text-[#1e5e32] border-b-[#1e5e32]',
  tabInactive: 'text-[#999] border-b-transparent hover:text-[#1e5e32]',
  chipBg: 'rgba(30,94,50,0.08)',
  chipBorder: 'rgba(30,94,50,0.2)',
}

const dark: Theme = {
  page: 'bg-[#080e08]',
  pageVal: '#080e08',
  surface: 'bg-[#0f180f]',
  surfaceVal: '#0f180f',
  borderVal: '#243424',
  accentVal: '#7ec850',
  headingVal: '#e0f0c8',
  bodyVal: '#9abf7e',
  mutedVal: '#4e6e3e',
  ruleLine: '#1a2a1a',
  thumbRing: '#7ec850',
  thumbTint: 'rgba(126,200,80,0.2)',
  tabActive: 'text-[#7ec850] border-b-[#7ec850]',
  tabInactive: 'text-[#3a5a3a] border-b-transparent hover:text-[#7ec850]',
  chipBg: 'rgba(126,200,80,0.08)',
  chipBorder: 'rgba(126,200,80,0.22)',
}

// ── Suite data ────────────────────────────────────────────────────
type TabType = 'family' | 'junior' | 'deluxe'

type Suite = {
  title: string
  subtitle: string
  image: StaticImageData
  tagline: string
  description: string
  size: string
  beds: string
  bath: string
  guests: string
  slug: string
  accentWord: string
}

const suiteData: Record<TabType, Suite[]> = {
  family: Array.from({ length: 4 }, (_, i) => ({
    title: 'Family Suite',
    subtitle: `Suite ${String(i + 1).padStart(2, '0')}`,
    image: family,
    tagline: 'Space · Warmth · Togetherness',
    accentWord: 'comfort',
    description: 'Designed for families who refuse to compromise. The Family Suite wraps generous space in warm textures and modern comfort — a place where children can play and parents can breathe.',
    size: '45 sqm', beds: '2 Beds', bath: '1 Bath', guests: '4 Guests',
    slug: 'family',
  })),
  junior: Array.from({ length: 4 }, (_, i) => ({
    title: 'Junior Suite',
    subtitle: `Suite ${String(i + 1).padStart(2, '0')}`,
    image: junior,
    tagline: 'Modern · Intimate · Refined',
    accentWord: 'elegance',
    description: 'A sanctuary for two. The Junior Suite distils everything essential — clean lines, curated textures, and a calm so complete it feels like the outside world dissolved.',
    size: '35 sqm', beds: '1 Bed', bath: '1 Bath', guests: '2 Guests',
    slug: 'junior',
  })),
  deluxe: Array.from({ length: 4 }, (_, i) => ({
    title: 'Deluxe Double Room',
    subtitle: `Suite ${String(i + 1).padStart(2, '0')}`,
    image: deluxe,
    tagline: 'Premium · Spacious · Serene',
    accentWord: 'premium',
    description: 'The pinnacle of the Agroterra stay. The Deluxe Double Room pairs sweeping proportions with refined décor — every surface chosen, every detail considered.',
    size: '50 sqm', beds: '2 Beds', bath: '1 Bath', guests: '4 Guests',
    slug: 'deluxe',
  })),
}

const TABS: { key: TabType; label: string; image: StaticImageData }[] = [
  { key: 'family', label: 'Family Suite', image: family },
  { key: 'junior', label: 'Junior Suite', image: junior },
  { key: 'deluxe', label: 'Deluxe Double Room', image: deluxe },
]

// ── Image breadcrumbs ─────────────────────────────────────────────
function ImageBreadcrumbs({
  slides, selected, onSelect, t,
}: {
  slides: { src: StaticImageData; alt: string }[]
  selected: number
  onSelect: (i: number) => void
  t: Theme
}) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {slides.map((s, i) => {
        const active = i === selected
        return (
          <button key={i} onClick={() => onSelect(i)} aria-label={s.alt}
            className="relative shrink-0 focus:outline-none">
            {/* Desktop thumbnail */}
            <span className="hidden sm:block relative overflow-hidden rounded-lg" style={{
              width: active ? 72 : 48,
              height: active ? 48 : 32,
              transition: 'width .4s cubic-bezier(.22,1,.36,1),height .4s cubic-bezier(.22,1,.36,1)',
              boxShadow: active
                ? `0 0 0 2.5px ${t.thumbRing},0 6px 20px rgba(0,0,0,0.5)`
                : '0 2px 8px rgba(0,0,0,0.4)',
              opacity: active ? 1 : 0.45,
            }}>
              <Image src={s.src} alt="" fill className="object-cover" sizes="80px" />
              {active && (
                <span className="absolute inset-0 rounded-lg"
                  style={{ background: `linear-gradient(135deg,${t.thumbTint},transparent)` }} />
              )}
            </span>
            {/* Mobile pill */}
            <span className="block sm:hidden rounded-full" style={{
              width: active ? 28 : 8,
              height: 8,
              backgroundColor: active ? t.accentVal : t.ruleLine,
              opacity: active ? 1 : 0.45,
              transition: 'width .35s cubic-bezier(.22,1,.36,1)',
            }} />
          </button>
        )
      })}
    </div>
  )
}

// ── Hero Carousel ─────────────────────────────────────────────────
function HeroCarousel({ t }: { t: Theme }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  )
  const { selectedIndex, onDotButtonClick } = useDotButton(emblaApi)
  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const slides = [
    { src: family, alt: 'Family Suite' },
    { src: deluxe, alt: 'Deluxe Double Room' },
    { src: junior, alt: 'Junior Suite' },
    { src: family, alt: 'Family Suite — evening light' },
  ]

  return (
    <div className="relative w-full" style={{ height: 'clamp(54vh,82vw,97vh)' }}>
      <div className="overflow-hidden w-full h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((s, i) => (
            <div key={i} className="relative flex-[0_0_100%] h-full">
              <Image src={s.src} alt={s.alt} fill priority={i === 0}
                loading={i === 0 ? 'eager' : 'lazy'}
                className="object-cover" sizes="100vw" />
            </div>
          ))}
        </div>
      </div>

      {/* Gradient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom,rgba(0,0,0,0.68) 0%,rgba(0,0,0,0.08) 42%,rgba(0,0,0,0.82) 100%)' }} />

      {/* Navbar */}
      <div className="absolute inset-x-0 top-0 z-20 px-4 sm:px-8 md:px-14 py-4 sm:py-6">
        <Navbar />
      </div>

      {/* Hero text */}
      <div className="absolute bottom-16 sm:bottom-20 left-0 right-0 z-10 px-6 sm:px-12 md:px-20 lg:px-28">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-white/50 mb-4">
          Agroterra Resort · Accommodations
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE }}
          className="eb-garamond-semibold text-white leading-[0.92] uppercase"
          style={{ fontSize: 'clamp(44px,9vw,110px)' }}>
          Our<br />Rooms
        </motion.h1>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
          className="w-16 h-px mt-6 mb-5 origin-left"
          style={{ backgroundColor: t.accentVal }} />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="eb-garamond-italic text-white/70 max-w-sm"
          style={{ fontSize: 'clamp(16px,2.5vw,22px)' }}>
          Where nature, comfort, and experience meet.
        </motion.p>
      </div>

      {/* Arrows */}
      {[
        { label: 'Prev', fn: prev, Icon: ChevronLeft, pos: 'left-4 md:left-8' },
        { label: 'Next', fn: next, Icon: ChevronRight, pos: 'right-4 md:right-8' },
      ].map(({ label, fn, Icon, pos }) => (
        <button key={label} onClick={fn} aria-label={label}
          className={`hidden sm:flex absolute ${pos} top-1/2 -translate-y-1/2 z-20
            w-10 h-10 md:w-12 md:h-12 items-center justify-center
            rounded-full bg-black/25 hover:bg-black/55 text-white
            backdrop-blur-md border border-white/10 transition-all duration-200`}>
          <Icon size={20} />
        </button>
      ))}

      {/* Breadcrumb tray */}
      <div className="absolute bottom-5 sm:bottom-7 inset-x-0 z-20 flex justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex items-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl">
          <ImageBreadcrumbs slides={slides} selected={selectedIndex} onSelect={onDotButtonClick} t={t} />
        </motion.div>
      </div>
    </div>
  )
}

// ── Sticky tab bar ────────────────────────────────────────────────
function TabBar({ active, onChange, t }: { active: TabType; onChange: (k: TabType) => void; t: Theme }) {
  return (
    <div className="sticky top-0 z-30 transition-colors duration-300"
      style={{ backgroundColor: t.pageVal, backdropFilter: 'blur(16px)', borderBottom: `1px solid ${t.borderVal}` }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-10 flex">
        {TABS.map(({ key, label }) => (
          <button key={key} onClick={() => onChange(key)}
            className={`flex-1 py-4 sm:py-5 text-[11px] sm:text-[12px] lg:text-[13px] font-bold tracking-[0.14em] uppercase
              border-b-2 transition-all duration-200 cursor-pointer
              ${active === key ? t.tabActive : t.tabInactive}`}>
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Spec chip ─────────────────────────────────────────────────────
function Chip({ icon, label, t }: { icon: React.ReactNode; label: string; t: Theme }) {
  return (
    <div className="flex items-center gap-2 px-3.5 py-2 rounded-full text-[12px] font-medium"
      style={{ backgroundColor: t.chipBg, border: `1px solid ${t.chipBorder}`, color: t.bodyVal }}>
      <span style={{ color: t.accentVal }}>{icon}</span>
      {label}
    </div>
  )
}

// ── Suite panel ───────────────────────────────────────────────────
function SuitePanel({ suite, index, t }: { suite: Suite; index: number; t: Theme }) {
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.85, ease: EASE }}
      className="relative"
    >
      <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} min-h-130 sm:min-h-150 lg:min-h-170`}>

        {/* IMAGE */}
        <div className="relative w-full lg:w-[60%] h-[52vw] sm:h-[44vw] lg:h-auto overflow-hidden">
          <Image
            src={suite.image}
            alt={suite.title}
            fill
            className="object-cover transition-transform duration-[1.4s] ease-out hover:scale-[1.04]"
            sizes="(max-width:1024px) 100vw, 60vw"
          />
          <div className="absolute inset-0"
            style={{
              background: isEven
                ? 'linear-gradient(to right, transparent 60%, rgba(0,0,0,0.0) 100%)'
                : 'linear-gradient(to left,  transparent 60%, rgba(0,0,0,0.0) 100%)',
            }}
          />
          <div
            className={`absolute bottom-4 sm:bottom-6 ${isEven ? 'right-4 sm:right-6' : 'left-4 sm:left-6'} 
              eb-garamond-semibold leading-none select-none pointer-events-none`}
            style={{ fontSize: 'clamp(80px,14vw,160px)', color: 'rgba(255,255,255,0.10)', lineHeight: 1 }}>
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>

        {/* TEXT PANEL */}
        <div className={`
          relative z-10 w-full lg:w-[48%]
          flex flex-col justify-center
          px-6 sm:px-10 md:px-14 lg:px-12 xl:px-16
          py-10 sm:py-14 lg:py-0
          ${isEven ? 'lg:-ml-[8%]' : 'lg:-mr-[8%]'}
        `}>
          <div
            className="relative rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-12 flex flex-col gap-6"
            style={{
              backgroundColor: t.surfaceVal,
              boxShadow: `0 24px 80px rgba(0,0,0,0.18), 0 2px 0 ${t.accentVal}30`,
              border: `1px solid ${t.borderVal}`,
            }}
          >
            <div className="absolute top-0 left-10 right-10 h-0.5 rounded-full"
              style={{ background: `linear-gradient(to right, transparent, ${t.accentVal}, transparent)` }} />

            <div className="flex items-center gap-3">
              <div className="w-6 h-px" style={{ backgroundColor: t.accentVal }} />
              <span className="text-[10px] font-bold uppercase tracking-[0.24em]"
                style={{ color: t.accentVal }}>
                {suite.subtitle}
              </span>
            </div>

            <div>
              <h2 className="eb-garamond-semibold leading-[1.05]"
                style={{ fontSize: 'clamp(28px,4vw,46px)', color: t.headingVal }}>
                {suite.title}
              </h2>
              <p className="cormorant-garamond-light-italic mt-2 text-[15px] sm:text-[16px] tracking-wide"
                style={{ color: t.accentVal }}>
                {suite.tagline}
              </p>
            </div>

            <div className="w-full h-px" style={{ backgroundColor: t.borderVal }} />

            <p className="cormorant-garamond-light-italic leading-[1.9] text-[16px] sm:text-[17px] md:text-[18px]"
              style={{ color: t.bodyVal }}>
              {suite.description}
            </p>

            <div className="flex flex-wrap gap-2">
              <Chip icon={<TbCrosshair size={13} />} label={suite.size} t={t} />
              <Chip icon={<IoBedOutline size={13} />} label={suite.beds} t={t} />
              <Chip icon={<MdOutlineBathtub size={13} />} label={suite.bath} t={t} />
              <Chip icon={<MdOutlinePeopleOutline size={13} />} label={suite.guests} t={t} />
            </div>

            <div>
              <Link href={`/room/${suite.slug}`}
                className="group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5
                  text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.14em]
                  transition-all duration-300"
                style={{
                  backgroundColor: t.accentVal,
                  color: t.pageVal,
                  boxShadow: `0 8px 28px ${t.accentVal}40`,
                }}>
                Room Details
                <ArrowUpRight size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Decorative section divider ────────────────────────────────────
function Divider({ t }: { t: Theme }) {
  return (
    <div className="flex items-center gap-4 px-6 sm:px-10 max-w-6xl mx-auto my-4 sm:my-6">
      <div className="flex-1 h-px" style={{ backgroundColor: t.ruleLine }} />
      <div className="w-1.5 h-1.5 rounded-full rotate-45"
        style={{ backgroundColor: t.accentVal, opacity: 0.5 }} />
      <div className="flex-1 h-px" style={{ backgroundColor: t.ruleLine }} />
    </div>
  )
}

// ── Dining Teaser ─────────────────────────────────────────────────
function DiningTeaser({ t }: { t: Theme }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
      <Divider t={t} />

      {/* Section heading */}
      <div className="pt-10 pb-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] mb-2"
          style={{ color: t.accentVal }}>
          Agroterra Resort · Dining
        </p>
        <h2 className="eb-garamond-semibold leading-none"
          style={{ fontSize: 'clamp(30px,4.5vw,52px)', color: t.headingVal }}>
          Indoor Dining Experience
        </h2>
        <div className="mt-4 w-10 h-px" style={{ backgroundColor: t.accentVal }} />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.85, ease: EASE }}
        className="flex flex-col lg:flex-row overflow-hidden rounded-2xl sm:rounded-3xl"
        style={{ border: `1px solid ${t.borderVal}`, boxShadow: `0 24px 80px rgba(0,0,0,0.12)` }}>

        {/* ── Image ── */}
        <div className="relative w-full lg:w-[55%] overflow-hidden" style={{ minHeight: '540px' }}>
          <Image
            src={bg}
            alt="Agroterra indoor dining"
            fill
            className="object-cover transition-transform duration-[1.4s] ease-out hover:scale-[1.03]"
            sizes="(max-width:1024px) 100vw, 55vw"
          />
          {/* subtle right-edge fade into text panel on desktop */}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, transparent 60%, rgba(0,0,0,0.06) 100%)' }} />
          {/* top accent line */}
          <div className="absolute top-0 left-10 right-10 h-0.5 rounded-full"
            style={{ background: `linear-gradient(to right, transparent, ${t.accentVal}88, transparent)` }} />
          {/* watermark number */}
          <div className="absolute bottom-4 right-6 eb-garamond-semibold select-none pointer-events-none"
            style={{ fontSize: 'clamp(80px,12vw,140px)', color: 'rgba(255,255,255,0.07)', lineHeight: 1 }}>
            01
          </div>
        </div>

        {/* ── Text panel ── */}
        <div
          className="relative flex flex-col justify-center gap-6 w-full lg:w-[45%] px-8 sm:px-12 py-12 lg:py-14"
          style={{ backgroundColor: t.surfaceVal }}>

          {/* top accent bar */}
          <div className="absolute top-0 left-10 right-10 h-0.5 rounded-full"
            style={{ background: `linear-gradient(to right, transparent, ${t.accentVal}50, transparent)` }} />

          {/* eyebrow */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-px" style={{ backgroundColor: t.accentVal }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.24em]"
              style={{ color: t.accentVal }}>
              Experience
            </span>
          </div>

          {/* heading */}
          <div>
            <h3 className="eb-garamond-semibold leading-[1.08]"
              style={{ fontSize: 'clamp(22px,3vw,38px)', color: t.headingVal }}>
              A Culinary Journey, Indoors
            </h3>
            <p className="cormorant-garamond-light-italic mt-2 text-[15px] sm:text-[16px] tracking-wide"
              style={{ color: t.accentVal }}>
              Warmth · Flavour · Tradition
            </p>
          </div>

          {/* rule */}
          <div className="w-full h-px" style={{ backgroundColor: t.borderVal }} />

          {/* description */}
          <p className="cormorant-garamond-light-italic leading-[1.9] text-[16px] sm:text-[17px] md:text-[18px]"
            style={{ color: t.bodyVal }}>
            Step inside our dining room and let the aromas welcome you home. Agroterra's indoor dining
            celebrates the richness of Nigerian heritage — slow-cooked stews, traditional dishes,
            and vibrant jollof — served with the warmth and grace of a family table.
          </p>

          {/* chips */}
          <div className="flex flex-wrap gap-2">
            <Chip icon={<IoBedOutline size={13} />} label="Breakfast · Lunch · Dinner" t={t} />
            <Chip icon={<MdOutlinePeopleOutline size={13} />} label="Traditional Cuisine" t={t} />
            <Chip icon={<TbCrosshair size={13} />} label="Private Reservations" t={t} />
          </div>

          {/* CTA */}
          <div>
            <Link href="/dining"
              className="group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5
                text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.14em]
                transition-all duration-300"
              style={{
                backgroundColor: t.accentVal,
                color: t.pageVal,
                boxShadow: `0 8px 28px ${t.accentVal}40`,
              }}>
              Explore Our Dining
              <ArrowUpRight size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────
export default function RoomsPage() {
  const [isDark, setIsDark] = useState(false)
  const t = isDark ? dark : light
  const [activeTab, setActiveTab] = useState<TabType>('family')

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) setIsDark(true)
    const saved = localStorage.getItem('rooms-tab') as TabType | null
    if (saved && saved in suiteData) setActiveTab(saved)
  }, [])

  const handleTab = (key: TabType) => {
    setActiveTab(key)
    localStorage.setItem('rooms-tab', key)
  }

  return (
    <div className={`${t.page} min-h-screen eb-garamond transition-colors duration-300 overflow-x-hidden`}>

      {/* Theme toggle */}
      <button onClick={() => setIsDark(d => !d)} aria-label="Toggle dark mode"
        className="fixed bottom-6 right-6 z-50 cursor-pointer w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          backgroundColor: isDark ? '#0f180f' : '#ede8df',
          color: t.accentVal,
          border: `1px solid ${t.borderVal}`,
          boxShadow: `0 4px 24px ${t.accentVal}28`,
        }}>
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {/* Hero */}
      <HeroCarousel t={t} />

      {/* Sticky tabs */}
      <TabBar active={activeTab} onChange={handleTab} t={t} />

      {/* Section header */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 pt-14 sm:pt-20 pb-6">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-0">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] mb-2"
              style={{ color: t.accentVal }}>
              Accommodations
            </p>
            <h2 className="eb-garamond-semibold leading-none"
              style={{ fontSize: 'clamp(32px,5vw,56px)', color: t.headingVal }}>
              {TABS.find(tb => tb.key === activeTab)?.label}
            </h2>
          </div>
          <p className="cormorant-garamond-light-italic text-[15px]" style={{ color: t.mutedVal }}>
            {suiteData[activeTab].length} rooms available
          </p>
        </motion.div>

        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="mt-5 h-px origin-left"
          style={{ backgroundColor: t.borderVal }} />
      </div>

      {/* Suite panels */}
      <div className="max-w-6xl mx-auto pb-20 sm:pb-32">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}>
            {suiteData[activeTab].map((suite, i) => (
              <div key={i}>
                <div className="px-0 sm:px-6 lg:px-0">
                  <SuitePanel suite={suite} index={i} t={t} />
                </div>
                {i < suiteData[activeTab].length - 1 && <Divider t={t} />}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dining teaser */}
      <DiningTeaser t={t} />

      {/* Footer */}
      <footer className="py-8 px-6 text-center" style={{ borderTop: `1px solid ${t.borderVal}` }}>
        <p className="text-[11px] tracking-widest uppercase" style={{ color: t.mutedVal }}>
          © {new Date().getFullYear()} Agroterra Resort · Accommodations
        </p>
      </footer>

    </div>
  )
}