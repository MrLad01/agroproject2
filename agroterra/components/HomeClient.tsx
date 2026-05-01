'use client'

import Navbar from '@/components/Navbar'
import { motion, AnimatePresence, easeInOut } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Play, Phone, Radio, Wifi, WifiOff, ExternalLink, ChevronRight, Sun, Moon, Newspaper, ArrowUpRight, ChevronLeft } from 'lucide-react'
import bg from '@/public/sheedx.svg'
import type { Article } from '@/lib/rss'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useCallback, useEffect, useState, useRef } from 'react'

interface Props {
  politics:      Article[]
  entertainment: Article[]
  sports:        Article[]
  featured:      Article
}

// ── Tab type kept for sidebar (commented out below)
const TABS = ['Politics', 'Entertainment', 'Sports'] as const
type Tab = (typeof TABS)[number]

// ── Facebook Live status types ────────────────────────────────────────────
type LiveStatus = 'loading' | 'live' | 'offline' | 'error'

// ── Theme tokens ──────────────────────────────────────────────────────────
type Theme = {
  page:          string
  surface:       string
  border:        string
  borderClass:   string
  accent:        string
  accentClass:   string
  heading:       string
  headingClass:  string
  body:          string
  bodyClass:     string
  muted:         string
  mutedClass:    string
  toggleBg:      string
  toggleBorder:  string
  navDot:        string
  footerBorder:  string
}

const lightTheme: Theme = {
  page:         'bg-white',
  surface:      'bg-[#f3f7f0]',
  border:       '#c5ddb5',
  borderClass:  'border-[#c5ddb5]',
  accent:       '#28683E',
  accentClass:  'text-[#28683E]',
  heading:      '#1a3d1a',
  headingClass: 'text-[#1a3d1a]',
  body:         '#3a5c3a',
  bodyClass:    'text-[#3a5c3a]',
  muted:        '#6b8f6b',
  mutedClass:   'text-[#6b8f6b]',
  toggleBg:     '#f3f7f0',
  toggleBorder: '#c5ddb5',
  navDot:       '#28683E',
  footerBorder: '#e8f0e8',
}

const darkTheme: Theme = {
  page:         'bg-[#0a120a]',
  surface:      'bg-[#111a11]',
  border:       '#2d4d2d',
  borderClass:  'border-[#2d4d2d]',
  accent:       '#7ec850',
  accentClass:  'text-[#7ec850]',
  heading:      '#c8e6a0',
  headingClass: 'text-[#c8e6a0]',
  body:         '#9bbf85',
  bodyClass:    'text-[#9bbf85]',
  muted:        '#5a7a5a',
  mutedClass:   'text-[#5a7a5a]',
  toggleBg:     '#111a11',
  toggleBorder: '#2d4d2d',
  navDot:       '#7ec850',
  footerBorder: '#1a2a1a',
}

// ── Hero media items ──────────────────────────────────────────────────────
// Replace src values with your actual image paths / video URLs.
// type: 'image' | 'video'
// For video, provide an mp4 src (and optionally a poster image).
type MediaItem =
  | { type: 'image'; src: string; alt: string }
  | { type: 'video'; src: string; poster?: string; alt: string }

const HERO_MEDIA: MediaItem[] = [
  // ── EXAMPLE ENTRIES — swap these for your real assets ──────────────────
  // Images can be local imports or URL strings.
  // For local imports, import them at the top and pass the imported value.
  { type: 'image', src: bg as unknown as string,  alt: 'SheedX FM – studio'     },
  // { type: 'image', src: '/hero/slide2.jpg',       alt: 'SheedX FM – on air'     },
  { type: 'video', src: 'https://res.cloudinary.com/do7woqgon/video/upload/v1777632758/news_4_zudthl.mp4', poster: '/hero/promo-poster.jpg', alt: 'SheedX FM promo reel 1' },
  { type: 'video', src: 'https://res.cloudinary.com/do7woqgon/video/upload/v1777632725/news_2_gqpvas.mp4', poster: '/hero/promo-poster.jpg', alt: 'SheedX FM promo reel 2' },
  { type: 'video', src: 'https://res.cloudinary.com/do7woqgon/video/upload/v1777632725/news_3_qbp2ku.mp4', poster: '/hero/promo-poster.jpg', alt: 'SheedX FM promo reel 3' },
]

// ── Hero Carousel ─────────────────────────────────────────────────────────
function HeroCarousel({ dark }: { dark: boolean }) {
  const autoplayRef = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })
  )

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 40 },
    [autoplayRef.current]
  )

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps]     = useState<number[]>([])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo   = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi])

  const overlayGradient = dark
    ? 'linear-gradient(to bottom, rgba(10,18,10,0.72) 0%, rgba(10,18,10,0.50) 45%, rgba(10,18,10,0.88) 100%)'
    : 'linear-gradient(to bottom, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.38) 45%, rgba(0,0,0,0.80) 100%)'

  return (
    <div className="relative h-full w-full overflow-hidden" ref={emblaRef}>

      {/* ── Slides ── */}
      <div className="flex h-full" style={{ touchAction: 'pan-y' }}>
        {HERO_MEDIA.map((item, i) => (
          <div key={i} className="relative min-w-full h-full shrink-0">
            {item.type === 'video' ? (
              <>
                {/* Blurred backdrop — fills the frame for portrait (9:16) videos
                <video
                  src={item.src}
                  poster={item.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-hidden
                  className="absolute inset-0 w-full h-full object-cover scale-110"
                  style={{ filter: 'blur(28px) brightness(0.45) saturate(1.4)' }}
                /> */}
                {/* Foreground video — contained so nothing is cropped */}
                <video
                  src={item.src}
                  poster={item.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-label={item.alt}
                  className="absolute inset-0 w-full h-full"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
              </>
            ) : (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                priority={i === 0}
                unoptimized={typeof item.src === 'string' && item.src.startsWith('http')}
              />
            )}

            {/* Per-slide overlay */}
            <div className="absolute inset-0" style={{ background: overlayGradient }} />

            {/* Noise texture */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
              }}
            />
          </div>
        ))}
      </div>

      {/* ── Prev / Next arrows (hidden when only 1 slide) ── */}
      {HERO_MEDIA.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            aria-label="Previous slide"
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20
                       w-9 h-9 rounded-full flex items-center justify-center
                       bg-black/30 hover:bg-black/55 border border-white/20
                       backdrop-blur-sm text-white transition-all duration-200
                       hover:scale-110 active:scale-95"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={scrollNext}
            aria-label="Next slide"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20
                       w-9 h-9 rounded-full flex items-center justify-center
                       bg-black/30 hover:bg-black/55 border border-white/20
                       backdrop-blur-sm text-white transition-all duration-200
                       hover:scale-110 active:scale-95"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      {/* ── Dot navigation (hidden when only 1 slide) ── */}
      {HERO_MEDIA.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="transition-all duration-300"
              style={{
                width:           i === selectedIndex ? 22 : 7,
                height:          7,
                borderRadius:    9999,
                backgroundColor: i === selectedIndex
                  ? 'rgba(255,255,255,0.95)'
                  : 'rgba(255,255,255,0.35)',
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ── Facebook Live Hook ────────────────────────────────────────────────────
function useFacebookLive(pageSlug: string) {
  const [status, setStatus] = useState<LiveStatus>('loading')
  const [liveUrl, setLiveUrl] = useState<string>('')

  useEffect(() => {
    const fbPageUrl = `https://www.facebook.com/${pageSlug}/live`
    setLiveUrl(fbPageUrl)

    const controller = new AbortController()

    fetch(
      `https://graph.facebook.com/oembed_page?url=${encodeURIComponent(
        `https://www.facebook.com/${pageSlug}`
      )}&format=json`,
      { signal: controller.signal }
    )
      .then((res) => {
        if (res.ok) {
          setStatus('offline')
        } else {
          setStatus('error')
        }
      })
      .catch(() => {
        setStatus('offline')
      })

    return () => controller.abort()
  }, [pageSlug])

  return { status, liveUrl }
}

// ── Live Badge ────────────────────────────────────────────────────────────
function LiveBadge({ status, liveUrl }: { status: LiveStatus; liveUrl: string }) {
  if (status === 'loading') {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-800/80 backdrop-blur-sm border border-white/10 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-pulse" />
        Checking live…
      </div>
    )
  }

  if (status === 'live') {
    return (
      <a
        href={liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600 hover:bg-red-500 transition-colors text-white text-[11px] font-bold uppercase tracking-wider shadow-lg shadow-red-900/40"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
        </span>
        Live on Facebook
        <ExternalLink size={10} />
      </a>
    )
  }

  if (status === 'error') {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-800/80 backdrop-blur-sm border border-white/10 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
        <WifiOff size={10} />
        Unable to check live status
      </div>
    )
  }

  return (
    <a
      href={liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/80 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-colors text-white text-[11px] font-semibold uppercase tracking-wider"
    >
      <WifiOff size={10} className="text-zinc-400" />
      Not Live Right Now
      <ExternalLink size={10} className="text-zinc-400" />
    </a>
  )
}

// ── SheedXpress Redirect Section ──────────────────────────────────────────
function SheedXpressSection({ t }: { t: Theme }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
      className={`
        w-full rounded-2xl overflow-hidden
        ${t.surface}
        border ${t.borderClass}
        relative
      `}
    >
      <div className="h-1 w-full" style={{ background: `linear-gradient(to right, ${t.accent}, #25D366, ${t.accent})` }} />

      <div className="px-6 sm:px-12 md:px-16 py-16 sm:py-20 md:py-24 flex flex-col items-center text-center gap-8 relative z-10">

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: `${t.accent}18`,
              border: `1.5px solid ${t.accent}40`,
              boxShadow: `0 0 40px ${t.accent}18`,
            }}
          >
            <Newspaper size={32} style={{ color: t.accent }} />
          </div>
          <div
            className="absolute inset-0 rounded-full animate-ping opacity-20"
            style={{ backgroundColor: t.accent }}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[10px] font-black uppercase tracking-[0.28em]"
          style={{ color: t.accent }}
        >
          News &amp; Updates
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="eb-garamond-semibold text-[32px] sm:text-[42px] md:text-[52px] leading-tight max-w-2xl"
          style={{ color: t.heading }}
        >
          Read the Latest on SheedXpress
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="text-[14px] sm:text-[16px] leading-relaxed max-w-xl"
          style={{ color: t.body }}
        >
          Politics, entertainment, sports, and everything in between — SheedXpress is
          SheedX FM's official news platform, updated around the clock with stories
          that matter to you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.42 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {['Politics', 'Entertainment', 'Sports', 'Culture', 'Breaking News'].map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold uppercase tracking-[0.14em] px-3 py-1.5 rounded-full"
              style={{
                border: `1px solid ${t.border}`,
                color: t.muted,
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.5 }}
        >
          <a
            href="https://sheedxpress.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-[13px] tracking-[0.12em] uppercase text-white shadow-xl transition-all duration-300 hover:scale-[1.04] hover:shadow-2xl active:scale-[0.98]"
            style={{
              background: `linear-gradient(135deg, ${t.accent}, #1a5c28)`,
              boxShadow: `0 8px 32px ${t.accent}35`,
            }}
          >
            <Newspaper size={15} />
            Visit SheedXpress
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-[10px] tracking-widest uppercase"
          style={{ color: t.muted }}
        >
          sheedxpress.com
        </motion.p>
      </div>

      <div className="h-1 w-full" style={{ background: `linear-gradient(to right, ${t.accent}, #25D366, ${t.accent})` }} />
    </motion.section>
  )
}


// ── Main component ────────────────────────────────────────────────────────
export default function HomeClient({ politics, entertainment, sports, featured }: Props) {
  const [dark, setDark] = useState(false)
  const t = dark ? darkTheme : lightTheme

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) setDark(true)
  }, [])

  const [activeTab, setActiveTab] = useState<Tab>('Politics')
  const { status: liveStatus, liveUrl } = useFacebookLive('sheedxfm')

  return (
    <div className={`${t.page} min-h-screen eb-garamond transition-colors duration-300`}>

      {/* ── Dark / Light Toggle ────────────────────────────────────── */}
      <motion.button
        onClick={() => setDark(d => !d)}
        aria-label="Toggle dark mode"
        className="fixed bottom-6 right-6 z-50 cursor-pointer w-12 h-12 rounded-full
          flex items-center justify-center"
        style={{
          backgroundColor: dark ? '#0f180f' : '#ede8df',
          color: t.accent,
          border: `1px solid ${t.border}`,
        }}
        animate={{
          boxShadow: [
            `0 0 0px 0px ${t.accent}00`,
            `0 0 16px 4px ${t.accent}55`,
            `0 0 0px 0px ${t.accent}00`,
          ],
          rotate: [0, -8, 8, -4, 4, 0],
        }}
        transition={{
          boxShadow: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
        }}
        whileHover={{ scale: 1.18, rotate: 20 }}
        whileTap={{ scale: 0.88, rotate: -15 }}
      >
        <motion.div
          animate={{ rotate: dark ? 0 : 360 }}
          transition={{ duration: 0.5, ease: easeInOut }}
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </motion.div>
      </motion.button>

      <main className="flex flex-col min-h-screen w-full items-center">

        {/* ── HERO ── */}
        <div className="w-full mb-8 sm:mb-10 lg:mb-12 relative">
          <div className="relative h-[55vh] sm:h-[65vh] md:h-[75vh] lg:h-[95vh]">

            {/* ── EMBLA CAROUSEL (replaces static Image) ── */}
            <HeroCarousel dark={dark} />

            {/* ── Hero content (rendered above the carousel) ── */}
            <div className="absolute inset-0 flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-5 lg:py-6 z-10">
              <Navbar />

              <div className="h-full flex flex-col text-white items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col justify-center items-center gap-5 px-4 text-center"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <LiveBadge status={liveStatus} liveUrl={liveUrl} />
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="uppercase font-black text-[28px] sm:text-[40px] md:text-[52px] lg:text-[68px] leading-none tracking-tight"
                    style={{ fontFamily: "'EB Garamond', Georgia, serif", letterSpacing: '-0.01em' }}
                  >
                    SHEEDX FM
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-white/50 text-xs sm:text-sm tracking-[0.2em] uppercase font-medium"
                  >
                    Your #1 News &amp; Entertainment Station
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.55 }}
                    className="flex flex-wrap gap-3 mt-2"
                  >
                    <button className="group flex items-center gap-2 bg-white text-black text-xs font-bold px-6 py-3 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 shadow-xl shadow-black/30 cursor-pointer">
                      <Play size={14} fill="currentColor" className="group-hover:scale-110 transition-transform" />
                      LISTEN LIVE
                    </button>
                    <Link href="tel:+2349038798730" className="flex items-center gap-2 bg-transparent border border-white/40 text-white text-xs font-bold px-6 py-3 rounded-full hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm">
                      <Phone size={14} />
                      CALL US
                    </Link>
                  </motion.div>
                </motion.div>
              </div>

              {/* Scroll hint */}
              <motion.div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 1.2 }}
              >
                <span className="text-white text-[9px] tracking-[0.2em] uppercase font-medium">Scroll</span>
                <div className="w-px h-8 bg-linear-to-b from-white to-transparent" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── PAGE BODY ── */}
        <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 pb-20 space-y-16">

          <SheedXpressSection t={t} />

          {/* ── FACEBOOK LIVE CARD ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`rounded-xl overflow-hidden border ${t.borderClass}`}
          >
            <div className="px-5 py-3.5 flex items-center gap-2" style={{ backgroundColor: '#0a120a' }}>
              <Radio size={12} className="text-red-500" />
              <span className="text-white text-[10px] font-black uppercase tracking-widest">SheedX FM · Facebook Live</span>
            </div>
            <div className={`${t.surface} px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-6`}>
              <div className="flex items-center gap-4">
                <div>
                  {liveStatus === 'live' ? (
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                      </span>
                      <span className="text-red-500 text-[11px] font-black uppercase tracking-wider">On Air Now</span>
                    </div>
                  ) : liveStatus === 'offline' ? (
                    <div className="flex items-center gap-1.5">
                      <Wifi size={11} style={{ color: t.muted }} />
                      <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: t.muted }}>Off Air</span>
                    </div>
                  ) : liveStatus === 'loading' ? (
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: t.muted }} />
                      <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: t.muted }}>Checking…</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      <WifiOff size={11} style={{ color: t.muted }} />
                      <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: t.muted }}>Unknown</span>
                    </div>
                  )}
                  <p className="text-[12px] leading-relaxed mt-1 max-w-xs" style={{ color: t.muted }}>
                    {liveStatus === 'live'
                      ? 'We are streaming live on Facebook right now!'
                      : liveStatus === 'offline'
                      ? 'No live stream at the moment. Follow us to get notified.'
                      : liveStatus === 'loading'
                      ? 'Checking Facebook live status…'
                      : 'Could not reach Facebook. Check our page directly.'}
                  </p>
                </div>
              </div>

              <a
                href={liveUrl || 'https://www.facebook.com/sheedxfm/live'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white text-[11px] font-bold px-6 py-3 rounded-full whitespace-nowrap transition-all duration-200 hover:opacity-90 hover:scale-[1.02] shrink-0"
                style={{ backgroundColor: '#1877F2' }}
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Watch on Facebook
              </a>
            </div>
          </motion.div>

        </div>

        {/* ── FOOTER ── */}
        <footer
          className="w-full py-8 px-6 text-center"
          style={{ borderTop: `1px solid ${t.footerBorder}` }}
        >
          <p className="text-[11px] tracking-wider uppercase font-medium" style={{ color: t.muted }}>
            © {new Date().getFullYear()} SheedX FM · All rights reserved
          </p>
        </footer>

      </main>
    </div>
  )
}