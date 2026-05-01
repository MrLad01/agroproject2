'use client'

import Image, { StaticImageData } from 'next/image'
import bg from '@/public/image_14.png'
import bg1 from '@/public/golf2.png'
import bg2 from '@/public/golf3.png'
import block1 from "@/public/Golf image block 1.png"
import block2 from "@/public/Golf image block 2.png"
import block3 from "@/public/Golf image block 3.png"
import block4 from "@/public/Golf image block 4.png"
import { useEffect, useState } from 'react'
import { motion, AnimatePresence, Variants, Transition } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import { useDotButton } from '@/components/Embla/EmblaCarouselDotButton'
import Autoplay from 'embla-carousel-autoplay'
import Navbar from '@/components/Navbar'
import { Sun, Moon } from 'lucide-react'

// ─────────────────────────────────────────────────────────────────
// FIX: Framer Motion's `ease` type requires a named string OR a
// 4-tuple [number,number,number,number], NOT a plain number[].
// Declare it `as const` so TS infers the narrow tuple type.
// ─────────────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const

// Factory for per-element staggered transitions
const staggerTrans = (i: number): Transition => ({
  duration: 0.7,
  delay: i * 0.1,
  ease: EASE,
})

// fadeUp — uses Framer's `custom` prop for per-element delay
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  // The `visible` key is a TargetResolver when it's a function.
  // Casting the whole object to Variants keeps TS happy.
  visible: (i: number) => ({ opacity: 1, y: 0, transition: staggerTrans(i) }),
}

const tabContent: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25 } },
}

// ── Theme ─────────────────────────────────────────────────────────
type Theme = {
  page: string
  surface: string
  border: string
  borderVal: string
  accentVal: string
  bodyVal: string
  mutedVal: string
  tabActive: string
  tabInactive: string
  ruleLine: string
  quoteBar: string
  thumbRing: string
  thumbTint: string
}

const light: Theme = {
  page: 'bg-[#f8f5ef]',
  surface: 'bg-white',
  border: 'border-[#d8cfc0]',
  borderVal: '#d8cfc0',
  accentVal: '#28683E',
  bodyVal: '#2c3e2c',
  mutedVal: '#7a8c6a',
  tabActive: 'text-[#28683E] border-b-[#28683E]',
  tabInactive: 'text-[#8a9c7a] border-b-transparent',
  ruleLine: '#c5d4b0',
  quoteBar: '#28683E',
  thumbRing: '#28683E',
  thumbTint: 'rgba(40,104,62,0.18)',
}

const dark: Theme = {
  page: 'bg-[#0a120a]',
  surface: 'bg-[#111a11]',
  border: 'border-[#2a3d2a]',
  borderVal: '#2a3d2a',
  accentVal: '#7ec850',
  bodyVal: '#a8c890',
  mutedVal: '#5a7a4a',
  tabActive: 'text-[#7ec850] border-b-[#7ec850]',
  tabInactive: 'text-[#3a5a3a] border-b-transparent',
  ruleLine: '#2a3d2a',
  quoteBar: '#7ec850',
  thumbRing: '#7ec850',
  thumbTint: 'rgba(126,200,80,0.18)',
}

// ── Image breadcrumbs ─────────────────────────────────────────────
// Desktop: animated thumbnail with accent ring + shimmer tint.
// Mobile:  slim expanding pill — both in one component, toggled
//          via responsive `hidden sm:block` / `block sm:hidden`.
function ImageBreadcrumbs({
  slides, selected, onSelect, t,
}: {
  slides: StaticImageData[]
  selected: number
  onSelect: (i: number) => void
  t: Theme
}) {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {slides.map((src, i) => {
        const active = i === selected
        return (
          <button
            key={i}
            onClick={() => onSelect(i)}
            aria-label={`Slide ${i + 1}`}
            className="relative shrink-0 focus:outline-none"
          >
            {/* ── Desktop thumbnail ── */}
            <span
              className="hidden sm:block relative overflow-hidden rounded-lg"
              style={{
                width: active ? 70 : 48,
                height: active ? 46 : 32,
                transition: 'width 0.38s cubic-bezier(0.16,1,0.3,1), height 0.38s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s',
                boxShadow: active
                  ? `0 0 0 2.5px ${t.thumbRing}, 0 6px 20px rgba(0,0,0,0.45)`
                  : '0 2px 8px rgba(0,0,0,0.35)',
                opacity: active ? 1 : 0.5,
              }}
            >
              <Image src={src} alt="" fill className="object-cover" sizes="80px" />
              {active && (
                <span
                  className="absolute inset-0 rounded-lg"
                  style={{ background: `linear-gradient(135deg, ${t.thumbTint}, transparent)` }}
                />
              )}
            </span>

            {/* ── Mobile pill ── */}
            <span
              className="block sm:hidden rounded-full"
              style={{
                width: active ? 26 : 8,
                height: 8,
                backgroundColor: active ? t.accentVal : t.ruleLine,
                opacity: active ? 1 : 0.5,
                transition: 'width 0.35s cubic-bezier(0.16,1,0.3,1)',
              }}
            />
          </button>
        )
      })}
    </div>
  )
}

// ── Hero carousel ─────────────────────────────────────────────────
function HeroCarousel({ t }: { t: Theme }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 5200, stopOnInteraction: false })]
  )
  const { selectedIndex, onDotButtonClick } = useDotButton(emblaApi)
  const slides: StaticImageData[] = [bg, bg1, bg2]

  return (
    <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[95vh]">

      {/* Slides */}
      <div className="overflow-hidden w-full h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((src, i) => (
            <div key={i} className="relative flex-[0_0_100%] h-full">
              <Image
                src={src}
                alt={`Golf course — view ${i + 1}`}
                fill
                className="object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Cinematic gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.15) 38%, rgba(0,0,0,0.80) 100%)',
        }}
      />

      {/* Navbar */}
      <div className="absolute inset-x-0 top-0 z-20 px-4 sm:px-8 md:px-12 py-4 sm:py-6">
        <Navbar />
      </div>

      {/* Hero copy */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 text-center pointer-events-none">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.25 }}
          className="text-[10px] sm:text-[11px] uppercase font-semibold mb-5 tracking-[0.32em] text-white/55"
        >
          Agroterra Resort
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 46 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: EASE }}
          className="eb-garamond-semibold text-[46px] sm:text-[62px] md:text-[76px] lg:text-[90px] leading-none uppercase text-white"
        >
          Golf Course
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.75, delay: 0.58, ease: EASE }}
          className="w-14 h-px mt-6 mb-5 origin-center"
          style={{ backgroundColor: 'rgba(255,255,255,0.42)' }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.72 }}
          className="eb-garamond-italic text-[17px] sm:text-[21px] md:text-[25px] text-white/75 max-w-md"
        >
          Where nature, comfort, and experience meet.
        </motion.p>
      </div>

      {/* Breadcrumb tray — frosted glass pill */}
      <div className="absolute bottom-5 sm:bottom-8 inset-x-0 z-20 flex justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="flex items-center px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl"
        // style={{
        //   background:     'rgba(0,0,0,0.36)',
        //   backdropFilter: 'blur(12px)',
        //   border:         '1px solid rgba(255,255,255,0.13)',
        // }}
        >
          <ImageBreadcrumbs
            slides={slides}
            selected={selectedIndex}
            onSelect={onDotButtonClick}
            t={t}
          />
        </motion.div>
      </div>
    </div>
  )
}

// ── Tabs & content ────────────────────────────────────────────────
const TABS = [
  { key: 'about', label: 'About' },
  { key: 'driving-range', label: 'Driving Range' },
  { key: 'club-house', label: 'Club House' },
] as const
type TabKey = typeof TABS[number]['key']

const TAB_DATA: Record<TabKey, { intro: string; paragraphs: string[] }> = {
  about: {
    intro: 'A place where every round feels like an escape into nature.',
    paragraphs: [
      "Welcome to the golf course at Agroterra Resort, where nature and recreation come together in a peaceful, open setting. Surrounded by trees and spread across a large portion of land, the course offers an experience that is both relaxing and rewarding. From the moment you step onto the grounds, you are welcomed by fresh air, wide green views, and a calm atmosphere that makes every visit feel like an escape.",
      "One of the most distinctive features of the course is its sense of space. The generous layout allows each hole to feel open and inviting, giving players room to focus and play comfortably. Fairways stretch naturally across the landscape, while greens sit in quiet clearings framed by trees.",
      "The surrounding trees shape the character of the golf course. They form a natural border that brings privacy and serenity, while also adding beauty and shade throughout the day. Sunlight filtering through the branches creates soft patterns on the grass, and the gentle sounds of leaves and birds enhance the peaceful environment.",
      "Designed to follow the natural contours of the land, the course flows smoothly with gentle slopes and subtle changes in elevation. Beginners can feel at ease on the open fairways, while experienced golfers enjoy the variety and strategy offered by the terrain and green placements.",
      "The greens are carefully maintained, providing a smooth and satisfying surface for play. More than just a sports facility, the golf course is a space to slow down and recharge — a landscape designed to inspire comfort, focus, and enjoyment.",
    ],
  },
  'driving-range': {
    intro: 'The perfect space to practice, warm up, and build confidence.',
    paragraphs: [
      "The driving range at Agroterra Resort is designed as the perfect space to practice, warm up, and build confidence in a calm natural environment. Just like the main course, the range is surrounded by trees and open landscape, creating a setting that feels peaceful and focused.",
      "Set within a spacious portion of land, the range offers plenty of room to practice full shots comfortably. The open layout allows you to see the full flight of the ball against the wide sky, helping you better understand distance, direction, and control.",
      "The natural surroundings play an important role in the experience. Trees line the edges of the range, offering shade and a sense of privacy while also reducing outside distractions. The sound of clubs connecting with balls blends with the quiet atmosphere of nature.",
      "The surface of the range is carefully maintained to ensure a comfortable and consistent practice experience. From short controlled shots to powerful drives, the range supports every aspect of long game practice.",
      "The driving range is ideal for beginners and experienced golfers alike. Surrounded by trees, open air, and natural beauty, it turns practice into a refreshing and enjoyable part of your visit.",
    ],
  },
  'club-house': {
    intro: 'The heart of the golf experience — where comfort and connection meet.',
    paragraphs: [
      "The clubhouse at Agroterra Resort is the heart of the golf experience, a welcoming space where comfort, connection, and relaxation come together. Designed to complement the natural beauty of the surrounding course, it offers a calm and inviting environment for players and visitors alike.",
      "Set against the backdrop of trees and open landscape, the clubhouse blends seamlessly with its surroundings. Large windows and open views allow natural light to fill the space, creating a bright and refreshing atmosphere where guests remain connected to the course.",
      "The clubhouse serves as a gathering place for golfers, families, and friends — where rounds begin with anticipation and end with shared stories of the day's best shots. The relaxed environment encourages conversation, laughter, and moments of rest.",
      "Comfort is at the center of the clubhouse experience. Seating areas are arranged to help guests feel at ease. The atmosphere is calm and unhurried, reflecting the overall pace of life at Agroterra Resort.",
      "At Agroterra Resort, the clubhouse represents hospitality and comfort set within nature — bringing together the beauty of the outdoors with the ease of an indoor retreat, creating a space where every visit feels complete.",
    ],
  },
}

// ── Image grid ────────────────────────────────────────────────────
function ImageGrid({ t }: { t: Theme }) {
  const pairs = [[block1, block2], [block3, block4]]
  return (
    <div className="space-y-3 sm:space-y-5 mt-14 sm:mt-20">
      {pairs.map((pair, pi) => (
        <div key={pi} className="grid grid-cols-2 gap-3 sm:gap-5">
          {pair.map((img, ii) => (
            <motion.div
              key={ii}
              custom={pi * 2 + ii}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="overflow-hidden rounded-xl"
              style={{ boxShadow: `0 8px 32px ${t.accentVal}14` }}
            >
              <Image
                src={img}
                alt={`Golf image ${pi * 2 + ii + 1}`}
                className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  )
}

// ── Tab body ──────────────────────────────────────────────────────
function TabBody({ tabKey, t }: { tabKey: TabKey; t: Theme }) {
  const data = TAB_DATA[tabKey]
  return (
    <motion.div variants={tabContent} initial="hidden" animate="visible" exit="exit" className="w-full">

      {/* Video */}
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible"
        className="flex justify-center mb-12 sm:mb-16">
        <div
          className="relative w-full sm:w-[88%] md:w-[78%] aspect-video rounded-2xl overflow-hidden"
          style={{ boxShadow: `0 20px 60px ${t.accentVal}20` }}
        >
          <iframe
            src="https://www.youtube.com/embed/Hc0KW9WMBpU?autoplay=1&mute=1&loop=1&playlist=Hc0KW9WMBpU&controls=0&modestbranding=1"
            title="Golf Course Video"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </motion.div>

      {/* Pull-quote */}
      <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible"
        className="relative pl-5 sm:pl-7 mb-10 sm:mb-14"
        style={{ borderLeft: `3px solid ${t.quoteBar}` }}>
        <p className="cormorant-garamond-medium-italic text-[22px] sm:text-[26px] md:text-[30px] leading-snug"
          style={{ color: t.accentVal }}>
          {data.intro}
        </p>
      </motion.div>

      {/* Divider */}
      <div className="w-full h-px mb-10 sm:mb-12" style={{ backgroundColor: t.ruleLine }} />

      {/* Paragraphs */}
      <div className="space-y-8 sm:space-y-10">
        {data.paragraphs.map((text, i) => (
          <motion.p
            key={i}
            custom={i + 2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="cormorant-garamond-light-italic text-[17px] sm:text-[18px] md:text-[19px] lg:text-[20px] leading-[1.85]"
            style={{ color: t.bodyVal }}
          >
            {text}
          </motion.p>
        ))}
      </div>

      {/* Diamond rule */}
      <div className="flex items-center gap-4 my-14 sm:my-20">
        <div className="flex-1 h-px" style={{ backgroundColor: t.ruleLine }} />
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: t.accentVal }} />
        <div className="flex-1 h-px" style={{ backgroundColor: t.ruleLine }} />
      </div>

      <ImageGrid t={t} />
    </motion.div>
  )
}

// ── Page ──────────────────────────────────────────────────────────
export default function GolfPage() {
  const [isDark, setIsDark] = useState(false)
  const t = isDark ? dark : light
  const [activeTab, setActiveTab] = useState<TabKey>('about')

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) setIsDark(true)
    const saved = localStorage.getItem('golf-tab') as TabKey | null
    if (saved && TABS.some(tb => tb.key === saved)) setActiveTab(saved)
  }, [])

  const handleTab = (key: TabKey) => {
    setActiveTab(key)
    localStorage.setItem('golf-tab', key)
  }

  return (
    <div className={`${t.page} min-h-screen transition-colors duration-300`}>

      {/* Theme toggle */}
      <motion.button
        onClick={() => setIsDark(d => !d)}
        aria-label="Toggle dark mode"
        className="fixed bottom-6 right-6 z-50 cursor-pointer w-12 h-12 rounded-full
          flex items-center justify-center"
        style={{
          backgroundColor: isDark ? '#0f180f' : '#ede8df',
          color: t.accentVal,
          border: `1px solid ${t.borderVal}`,
        }}
        animate={{
          boxShadow: [
            `0 0 0px 0px ${t.accentVal}00`,
            `0 0 16px 4px ${t.accentVal}55`,
            `0 0 0px 0px ${t.accentVal}00`,
          ],
          rotate: [0, -8, 8, -4, 4, 0],
        }}
        transition={{
          boxShadow: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
        }}
        whileHover={{ scale: 1.18, rotate: 20 }}
        whileTap={{ scale: 0.88, rotate: -15 }}>
        <motion.div
          animate={{ rotate: isDark ? 0 : 360 }}
          transition={{ duration: 0.5, ease: EASE }}>
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </motion.div>
      </motion.button>

      <HeroCarousel t={t} />

      {/* Sticky tab bar */}
      <div
        className={`sticky top-0 z-30 ${t.surface} border-b ${t.border} transition-colors duration-300`}
        style={{ backdropFilter: 'blur(12px)' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-8 flex">
          {TABS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleTab(key)}
              className={`
                flex-1 py-4 sm:py-5 cursor-pointer
                text-[12px] sm:text-[13px] font-semibold tracking-widest uppercase
                border-b-2 transition-all duration-200
                ${activeTab === key ? t.tabActive : t.tabInactive}
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 md:px-12 py-12 sm:py-16 md:py-20">
        <AnimatePresence mode="wait">
          <TabBody key={activeTab} tabKey={activeTab} t={t} />
        </AnimatePresence>
      </div>

      <footer className="py-8 px-6 text-center" style={{ borderTop: `1px solid ${t.borderVal}` }}>
        <p className="text-[11px] tracking-widest uppercase" style={{ color: t.mutedVal }}>
          © {new Date().getFullYear()} Agroterra Resort · Golf Course
        </p>
      </footer>

    </div>
  )
}