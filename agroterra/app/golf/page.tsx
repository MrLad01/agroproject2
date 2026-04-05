'use client'

import Image from 'next/image'
import Link from 'next/link'
import bg from '@/public/image_14.png'
import bg1 from '@/public/golf2.png'
import bg2 from '@/public/golf3.png'
import block1 from "@/public/Golf image block 1.png"
import block2 from "@/public/Golf image block 2.png"
import block3 from "@/public/Golf image block 3.png"
import block4 from "@/public/Golf image block 4.png"
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import { useDotButton } from '@/components/Embla/EmblaCarouselDotButton'
import Autoplay from 'embla-carousel-autoplay'
import Navbar from '@/components/Navbar'
import { Sun, Moon } from 'lucide-react'

// ── Animation variants ────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
}

const tabContent = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  exit:   { opacity: 0, y: -8, transition: { duration: 0.25 } },
}

// ── Theme tokens ──────────────────────────────────────────────────
type Theme = {
  page:        string
  surface:     string
  surfaceAlt:  string
  border:      string
  borderVal:   string
  accent:      string
  accentVal:   string
  heading:     string
  headingVal:  string
  body:        string
  bodyVal:     string
  muted:       string
  mutedVal:    string
  tabActive:   string
  tabInactive: string
  ruleLine:    string
  quoteBar:    string
}

const light: Theme = {
  page:        'bg-[#f8f5ef]',
  surface:     'bg-white',
  surfaceAlt:  'bg-[#f0ebe1]',
  border:      'border-[#d8cfc0]',
  borderVal:   '#d8cfc0',
  accent:      'text-[#28683E]',
  accentVal:   '#28683E',
  heading:     'text-[#1a2e1a]',
  headingVal:  '#1a2e1a',
  body:        'text-[#2c3e2c]',
  bodyVal:     '#2c3e2c',
  muted:       'text-[#7a8c6a]',
  mutedVal:    '#7a8c6a',
  tabActive:   'text-[#28683E] border-b-[#28683E]',
  tabInactive: 'text-[#8a9c7a] border-b-transparent',
  ruleLine:    '#c5d4b0',
  quoteBar:    '#28683E',
}

const dark: Theme = {
  page:        'bg-[#0a120a]',
  surface:     'bg-[#111a11]',
  surfaceAlt:  'bg-[#0d160d]',
  border:      'border-[#2a3d2a]',
  borderVal:   '#2a3d2a',
  accent:      'text-[#7ec850]',
  accentVal:   '#7ec850',
  heading:     'text-[#d4ebb0]',
  headingVal:  '#d4ebb0',
  body:        'text-[#a8c890]',
  bodyVal:     '#a8c890',
  muted:       'text-[#5a7a4a]',
  mutedVal:    '#5a7a4a',
  tabActive:   'text-[#7ec850] border-b-[#7ec850]',
  tabInactive: 'text-[#3a5a3a] border-b-transparent',
  ruleLine:    '#2a3d2a',
  quoteBar:    '#7ec850',
}

// ── Slim carousel dots (mobile-safe) ─────────────────────────────
function CarouselDots({
  count,
  selected,
  onSelect,
  t,
}: {
  count: number
  selected: number
  onSelect: (i: number) => void
  t: Theme
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Slide ${i + 1}`}
          className="transition-all duration-300 rounded-full"
          style={{
            width:  i === selected ? 28 : 8,
            height: 8,
            backgroundColor: i === selected ? t.accentVal : t.ruleLine,
            opacity: i === selected ? 1 : 0.6,
          }}
        />
      ))}
    </div>
  )
}

// ── Carousel ──────────────────────────────────────────────────────
function HeroCarousel({ t }: { t: Theme }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })])
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)
  const slides = [bg, bg1, bg2]

  return (
    <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[95vh]">
      {/* Viewport */}
      <div className="overflow-hidden w-full h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((src, i) => (
            <div key={i} className="relative flex-[0_0_100%] h-full">
              <Image
                src={src}
                alt={`Golf slide ${i + 1}`}
                fill
                className="object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.72) 100%)',
        }}
      />

      {/* Navbar */}
      <div className="absolute inset-x-0 top-0 z-20 px-4 sm:px-8 md:px-12 py-4 sm:py-6">
        <Navbar />
      </div>

      {/* Hero text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, letterSpacing: '0.4em' }}
          animate={{ opacity: 1, letterSpacing: '0.28em' }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-[10px] sm:text-[11px] uppercase font-semibold mb-4 text-white/60"
          style={{ letterSpacing: '0.28em' }}
        >
          Agroterra Resort
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="eb-garamond-semibold text-[42px] sm:text-[58px] md:text-[70px] lg:text-[84px] leading-none uppercase"
        >
          Golf Course
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-16 h-px bg-white/50 mt-5 mb-4 origin-left"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="eb-garamond-italic text-[18px] sm:text-[22px] md:text-[26px] text-white/80 max-w-lg"
        >
          Where nature, comfort, and experience meet.
        </motion.p>
      </div>

      {/* Dots — slim pill style, always centered, mobile-safe */}
      <div className="absolute bottom-5 sm:bottom-7 inset-x-0 z-20 flex justify-center px-4">
        <CarouselDots
          count={slides.length}
          selected={selectedIndex}
          onSelect={onDotButtonClick}
          t={t}
        />
      </div>
    </div>
  )
}

// ── Tab definitions ───────────────────────────────────────────────
const TABS = [
  { key: 'about',         label: 'About' },
  { key: 'driving-range', label: 'Driving Range' },
  { key: 'club-house',    label: 'Club House' },
] as const
type TabKey = typeof TABS[number]['key']

// ── Tab content data ──────────────────────────────────────────────
const TAB_DATA: Record<TabKey, { intro: string; paragraphs: string[] }> = {
  about: {
    intro: 'A place where every round feels like an escape into nature.',
    paragraphs: [
      "Welcome to the golf course at Agroterra Resort, where nature and recreation come together in a peaceful, open setting. Surrounded by trees and spread across a large portion of land, the course offers an experience that is both relaxing and rewarding. From the moment you step onto the grounds, you are welcomed by fresh air, wide green views, and a calm atmosphere that makes every visit feel like an escape.",
      "One of the most distinctive features of the course is its sense of space. The generous layout allows each hole to feel open and inviting, giving players room to focus and play comfortably. Fairways stretch naturally across the landscape, while greens sit in quiet clearings framed by trees.",
      "The surrounding trees shape the character of the golf course. They form a natural border that brings privacy and serenity, while also adding beauty and shade throughout the day. Sunlight filtering through the branches creates soft patterns on the grass, and the gentle sounds of leaves and birds enhance the peaceful environment.",
      "Designed to follow the natural contours of the land, the course flows smoothly with gentle slopes and subtle changes in elevation. Beginners can feel at ease on the open fairways, while experienced golfers enjoy the variety and strategy offered by the terrain and green placements. Each hole has its own atmosphere — some open to broad views of sky and greenery, others feel more enclosed, encouraging focus and precision.",
      "The greens are carefully maintained, providing a smooth and satisfying surface for play. Their well-kept condition reflects the care given to the course while preserving its natural charm. More than just a sports facility, the golf course is a space to slow down and recharge — a landscape designed to inspire comfort, focus, and enjoyment.",
    ],
  },
  'driving-range': {
    intro: 'The perfect space to practice, warm up, and build confidence.',
    paragraphs: [
      "The driving range at Agroterra Resort is designed as the perfect space to practice, warm up, and build confidence in a calm natural environment. Just like the main course, the range is surrounded by trees and open landscape, creating a setting that feels peaceful and focused rather than busy or crowded.",
      "Set within a spacious portion of land, the driving range offers plenty of room to practice full shots comfortably. The open layout allows you to see the full flight of the ball against the wide sky, helping you better understand distance, direction, and control.",
      "The natural surroundings play an important role in the experience. Trees line the edges of the range, offering shade and a sense of privacy while also reducing outside distractions. The sound of clubs connecting with balls blends with the quiet atmosphere of nature, creating a setting that feels both active and relaxing.",
      "The surface of the range is carefully maintained to ensure a comfortable and consistent practice experience. From short controlled shots to powerful drives, the range supports every aspect of long game practice.",
      "The driving range is ideal for beginners getting comfortable with the fundamentals, while experienced golfers can fine-tune mechanics and prepare mentally before stepping onto the course. Surrounded by trees, open air, and natural beauty, it turns practice into a refreshing and enjoyable part of your visit.",
    ],
  },
  'club-house': {
    intro: 'The heart of the golf experience — where comfort and connection meet.',
    paragraphs: [
      "The clubhouse at Agroterra Resort is the heart of the golf experience, a welcoming space where comfort, connection, and relaxation come together. Designed to complement the natural beauty of the surrounding course, the clubhouse offers a calm and inviting environment where players and visitors can unwind before or after their time on the greens.",
      "Set against the backdrop of trees and open landscape, the clubhouse blends seamlessly with its surroundings. Large windows and open views allow natural light to fill the space, creating a bright and refreshing atmosphere where guests remain connected to the course.",
      "The clubhouse serves as a gathering place for golfers, families, and friends — where rounds begin with anticipation and end with shared stories of the day's best shots. The relaxed environment encourages conversation, laughter, and moments of rest.",
      "Comfort is at the center of the clubhouse experience. Seating areas are arranged to help guests feel at ease. The atmosphere is calm and unhurried, reflecting the overall pace of life at Agroterra Resort. After spending time outdoors, the clubhouse offers a welcome transition where you can cool down, refresh, and reflect on your game.",
      "At Agroterra Resort, the clubhouse represents hospitality and comfort set within nature. Surrounded by trees and open air, it brings together the beauty of the outdoors with the ease of an indoor retreat, creating a space where every visit feels complete.",
    ],
  },
}

// ── Image grid ────────────────────────────────────────────────────
function ImageGrid({ t }: { t: Theme }) {
  const pairs = [[block1, block2], [block3, block4]]
  return (
    <div className="space-y-4 sm:space-y-5 mt-14 sm:mt-20">
      {pairs.map((pair, pi) => (
        <div key={pi} className="grid grid-cols-2 gap-4 sm:gap-5">
          {pair.map((img, ii) => (
            <motion.div
              key={ii}
              custom={pi * 2 + ii}
              // variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="overflow-hidden rounded-xl"
              style={{ boxShadow: `0 8px 32px ${t.accentVal}15` }}
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
    <motion.div
      key={tabKey}
      // variants={tabContent}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-full"
    >
      {/* Video */}
      <motion.div
        custom={0} 
        // variants={fadeUp} 
        initial="hidden" animate="visible"
        className="flex justify-center mb-12 sm:mb-16"
      >
        <div className="relative w-full sm:w-[88%] md:w-[78%] aspect-video rounded-2xl overflow-hidden shadow-2xl"
          style={{ boxShadow: `0 20px 60px ${t.accentVal}25` }}>
          <iframe
            src="https://www.youtube.com/embed/Hc0KW9WMBpU?autoplay=1&mute=1&loop=1&playlist=Hc0KW9WMBpU&controls=0&modestbranding=1"
            title="Golf Course Video"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </motion.div>

      {/* Pull-quote intro */}
      <motion.div
        custom={1} 
        // variants={fadeUp} 
        initial="hidden" animate="visible"
        className="relative pl-5 sm:pl-7 mb-10 sm:mb-14"
        style={{ borderLeft: `3px solid ${t.quoteBar}` }}
      >
        <p
          className="cormorant-garamond-medium-italic text-[22px] sm:text-[26px] md:text-[30px] leading-snug"
          style={{ color: t.accentVal }}
        >
          {data.intro}
        </p>
      </motion.div>

      {/* Rule */}
      <div className="w-full h-px mb-10 sm:mb-12" style={{ backgroundColor: t.ruleLine }} />

      {/* Paragraphs — alternating layout on larger screens */}
      <div className="space-y-8 sm:space-y-10">
        {data.paragraphs.map((text, i) => (
          <motion.p
            key={i}
            custom={i + 2}
            // variants={fadeUp}
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

      {/* Decorative mid-rule */}
      <div className="flex items-center gap-4 my-14 sm:my-20">
        <div className="flex-1 h-px" style={{ backgroundColor: t.ruleLine }} />
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: t.accentVal }} />
        <div className="flex-1 h-px" style={{ backgroundColor: t.ruleLine }} />
      </div>

      {/* Image grid */}
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

      {/* ── Toggle ───────────────────────────────────────── */}
      <button
        onClick={() => setIsDark(d => !d)}
        aria-label="Toggle dark mode"
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all duration-300"
        style={{
          backgroundColor: isDark ? '#111a11' : '#f0ebe1',
          color: t.accentVal,
          border: `1px solid ${t.borderVal}`,
          boxShadow: `0 4px 20px ${t.accentVal}20`,
        }}
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {/* ── Hero Carousel ─────────────────────────────── */}
      <HeroCarousel t={t} />

      {/* ── Tabs ──────────────────────────────────────── */}
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
                flex-1 py-4 sm:py-5
                text-[13px] sm:text-[14px] font-semibold tracking-[0.08em] uppercase
                border-b-2 transition-all duration-250
                ${activeTab === key ? t.tabActive : t.tabInactive}
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab Content ───────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 md:px-12 py-12 sm:py-16 md:py-20">
        <AnimatePresence mode="wait">
          <TabBody key={activeTab} tabKey={activeTab} t={t} />
        </AnimatePresence>
      </div>

      {/* ── Footer ────────────────────────────────────── */}
      <footer
        className="py-8 px-6 text-center"
        style={{ borderTop: `1px solid ${t.borderVal}` }}
      >
        <p
          className="text-[11px] tracking-widest uppercase"
          style={{ color: t.mutedVal }}
        >
          © {new Date().getFullYear()} Agroterra Resort · Golf Course
        </p>
      </footer>

    </div>
  )
}