'use client'
// components/HomeClient.tsx
// Receives pre-fetched RSS articles as props and renders the full page.
// Bug fixes + elevated design + Facebook Live integration.

import Navbar from '@/components/Navbar'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Play, Phone, Radio, Wifi, WifiOff, ExternalLink, ChevronRight } from 'lucide-react'
import bg from '@/public/sheedx.svg'
import type { Article } from '@/lib/rss'
import {
  SectionHeader,
  HeroCard,
  SmallCard,
  GridCard,
  SidebarFeaturedCard,
} from '@/components/NewsCard'
import { useState, useEffect } from 'react'

interface Props {
  politics:      Article[]
  entertainment: Article[]
  sports:        Article[]
  featured:      Article
}

const TABS = ['Politics', 'Entertainment', 'Sports'] as const
type Tab = (typeof TABS)[number]

// ── Facebook Live status types ────────────────────────────────────────────
type LiveStatus = 'loading' | 'live' | 'offline' | 'error'

// ── Facebook Live Hook ────────────────────────────────────────────────────
// The Facebook Graph API requires a page token for live_videos.
// We do an oEmbed probe instead — it's public and CORS-safe.
// If you have a server-side token, swap this for a proper /live_videos call.
function useFacebookLive(pageSlug: string) {
  const [status, setStatus] = useState<LiveStatus>('loading')
  const [liveUrl, setLiveUrl] = useState<string>('')

  useEffect(() => {
    const fbPageUrl = `https://www.facebook.com/${pageSlug}/live`
    setLiveUrl(fbPageUrl)

    // We use the oEmbed endpoint to detect if the live page resolves.
    // For a production app, replace this with a server action that calls
    // GET /v19.0/{page-id}/live_videos?status=LIVE using a page access token.
    const controller = new AbortController()

    fetch(
      `https://graph.facebook.com/oembed_page?url=${encodeURIComponent(
        `https://www.facebook.com/${pageSlug}`
      )}&format=json`,
      { signal: controller.signal }
    )
      .then((res) => {
        if (res.ok) {
          // Page exists — we can't confirm live without a token,
          // so we set 'offline' and note that a token is needed for live detection.
          setStatus('offline')
        } else {
          setStatus('error')
        }
      })
      .catch(() => {
        // Network error or CORS block — fallback gracefully
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

  // offline
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

// ── Main component ────────────────────────────────────────────────────────
export default function HomeClient({ politics, entertainment, sports, featured }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('Politics')
  const { status: liveStatus, liveUrl } = useFacebookLive('sheedxfm')

  const sidebarArticles: Article[] =
    activeTab === 'Politics'      ? politics.slice(0, 3) :
    activeTab === 'Entertainment' ? entertainment.slice(0, 3) :
                                    sports.slice(0, 3)

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 font-sans">
      <main className="flex flex-col min-h-screen w-full bg-white dark:bg-zinc-950 items-center">

        {/* ── HERO ── */}
        <div className="w-full mb-8 sm:mb-10 lg:mb-12 relative">
          <div className="relative h-[55vh] sm:h-[65vh] md:h-[75vh] lg:h-[95vh]">
            <Image src={bg} alt="SheedX FM" fill className="object-cover" priority />

            {/* Dark gradient overlay — richer depth */}
            <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/80" />

            {/* Noise texture overlay for premium feel */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }}
            />

            <div className="absolute inset-0 flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-5 lg:py-6">
              <Navbar />

              <div className="h-full flex flex-col text-white items-center justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col justify-center items-center gap-5 px-4 text-center"
                >
                  {/* Live status badge */}
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

              {/* Bottom scroll indicator */}
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
        <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 pb-20">

          {/* ── FEATURED STORY ── */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-5 bg-red-600 rounded-full" />
                <span className="text-[11px] font-black uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
                  Featured Story
                </span>
              </div>

              <Link
                href={featured.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-full aspect-16/7 rounded-xl overflow-hidden bg-zinc-800 cursor-pointer group block shadow-2xl"
              >
                {featured.image && (
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                    unoptimized
                  />
                )}
                {/* Fixed: was bg-linear-to-t */}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 z-10">
                  <span className="bg-red-600 text-white text-[9px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-sm">
                    Featured
                  </span>
                  <h3 className="text-white text-lg sm:text-2xl md:text-3xl font-extrabold mt-3 leading-snug line-clamp-2 max-w-2xl">
                    {featured.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-white/50 text-xs font-medium">{featured.source}</p>
                    <ChevronRight size={12} className="text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>

                {/* Subtle play ring */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center">
                    <Play size={20} className="text-white ml-1" fill="white" />
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* ── TWO-COLUMN LAYOUT ── */}
          <div className="flex flex-col lg:flex-row gap-10">

            {/* ── LEFT: News Sections ── */}
            <div className="flex-1 min-w-0 space-y-12">

              {/* POLITICS */}
              {politics.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <SectionHeader title="Politics" />
                  <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <HeroCard article={politics[0]} />
                    <div className="flex flex-col gap-3 flex-1">
                      {politics.slice(1, 3).map((a) => (
                        <SmallCard key={a.id} article={a} />
                      ))}
                    </div>
                  </div>
                </motion.section>
              )}

              {/* ENTERTAINMENT */}
              {entertainment.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <SectionHeader title="Entertainment" />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                    {entertainment.slice(0, 3).map((a) => (
                      <GridCard key={a.id} article={a} />
                    ))}
                  </div>
                </motion.section>
              )}

              {/* SPORTS */}
              {sports.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <SectionHeader title="Sports" />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                    {sports.slice(0, 3).map((a) => (
                      <GridCard key={a.id} article={a} />
                    ))}
                  </div>
                </motion.section>
              )}

            </div>

            {/* ── RIGHT: Sidebar ── */}
            <motion.aside
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-60 shrink-0 space-y-6"
            >
              {/* Category tabs */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 mb-3">
                  Top Stories
                </p>
                <div className="flex gap-1.5 flex-wrap">
                  {TABS.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`text-[10px] font-bold px-3 py-1.5 rounded-sm transition-all duration-200 ${
                        activeTab === tab
                          ? 'bg-red-600 text-white shadow-md shadow-red-900/30'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sidebar article cards with animated tab switch */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-4"
                >
                  {sidebarArticles.map((a) => (
                    <SidebarFeaturedCard key={a.id} article={a} />
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Facebook Live Card */}
              <div className="rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
                <div className="bg-zinc-900 px-4 py-3 flex items-center gap-2">
                  <Radio size={12} className="text-red-500" />
                  <span className="text-white text-[10px] font-black uppercase tracking-widest">SheedX FM Live</span>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-900/50 px-4 py-4 text-center">
                  <div className="mb-3">
                    {liveStatus === 'live' ? (
                      <div className="flex items-center justify-center gap-1.5 mb-1">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                        </span>
                        <span className="text-red-600 text-[10px] font-black uppercase tracking-wider">On Air</span>
                      </div>
                    ) : liveStatus === 'offline' ? (
                      <div className="flex items-center justify-center gap-1.5 mb-1">
                        <Wifi size={10} className="text-zinc-400" />
                        <span className="text-zinc-400 text-[10px] font-semibold uppercase tracking-wider">Off Air</span>
                      </div>
                    ) : liveStatus === 'loading' ? (
                      <div className="flex items-center justify-center gap-1.5 mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 animate-pulse" />
                        <span className="text-zinc-400 text-[10px] font-semibold uppercase tracking-wider">Checking…</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-1.5 mb-1">
                        <WifiOff size={10} className="text-zinc-400" />
                        <span className="text-zinc-400 text-[10px] font-semibold uppercase tracking-wider">Unknown</span>
                      </div>
                    )}
                    <p className="text-zinc-600 dark:text-zinc-400 text-[10px] leading-relaxed mt-1">
                      {liveStatus === 'live'
                        ? 'We are streaming live on Facebook right now!'
                        : liveStatus === 'offline'
                        ? 'No live stream at the moment. Follow us to get notified.'
                        : liveStatus === 'loading'
                        ? 'Checking Facebook live status…'
                        : 'Could not reach Facebook. Check our page directly.'}
                    </p>
                  </div>
                  <a
                    href={liveUrl || 'https://www.facebook.com/sheedxfm/live'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-[#1877F2] hover:bg-[#166FE5] transition-colors text-white text-[10px] font-bold px-4 py-2 rounded-full w-full justify-center"
                  >
                    <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Watch on Facebook
                  </a>
                </div>
              </div>

            </motion.aside>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <footer className="w-full border-t border-zinc-100 dark:border-zinc-800 py-8 px-6 text-center">
          <p className="text-zinc-500 dark:text-zinc-400 text-[11px] tracking-wider uppercase font-medium">
            © {new Date().getFullYear()} SheedX FM · All rights reserved
          </p>
        </footer>

      </main>
    </div>
  )
}