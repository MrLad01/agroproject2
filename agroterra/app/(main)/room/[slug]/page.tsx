"use client"

import Image from 'next/image'
import Link from 'next/link'
import logo from '@/public/ASA logo.jpg'
import { FaConciergeBell } from 'react-icons/fa'
import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Sun, Moon } from 'lucide-react'
import { IoBedOutline } from 'react-icons/io5'
import { TbCrosshair } from 'react-icons/tb'
import { MdOutlineBathtub, MdOutlinePeopleOutline } from 'react-icons/md'

const EASE = [0.22, 1, 0.36, 1] as const

// ── Theme ─────────────────────────────────────────────────────────
type Theme = {
  page: string; pageVal: string; surface: string; surfaceVal: string
  borderVal: string; accentVal: string; headingVal: string; bodyVal: string
  mutedVal: string; ruleLine: string; thumbRing: string; thumbTint: string
  tabActive: string; tabInactive: string; chipBg: string; chipBorder: string
}

const light: Theme = {
  page: 'bg-[#f5f2eb]', pageVal: '#f5f2eb', surface: 'bg-white', surfaceVal: '#ffffff',
  borderVal: '#ddd5c4', accentVal: '#1e5e32', headingVal: '#0f1f0f', bodyVal: '#3a4e3a',
  mutedVal: '#7a8c6a', ruleLine: '#cec8bc', thumbRing: '#1e5e32', thumbTint: 'rgba(30,94,50,0.2)',
  tabActive: 'text-[#1e5e32] border-b-[#1e5e32]',
  tabInactive: 'text-[#999] border-b-transparent hover:text-[#1e5e32]',
  chipBg: 'rgba(30,94,50,0.08)', chipBorder: 'rgba(30,94,50,0.2)',
}

const dark: Theme = {
  page: 'bg-[#080e08]', pageVal: '#080e08', surface: 'bg-[#0f180f]', surfaceVal: '#0f180f',
  borderVal: '#243424', accentVal: '#7ec850', headingVal: '#e0f0c8', bodyVal: '#9abf7e',
  mutedVal: '#4e6e3e', ruleLine: '#1a2a1a', thumbRing: '#7ec850', thumbTint: 'rgba(126,200,80,0.2)',
  tabActive: 'text-[#7ec850] border-b-[#7ec850]',
  tabInactive: 'text-[#3a5a3a] border-b-transparent hover:text-[#7ec850]',
  chipBg: 'rgba(126,200,80,0.08)', chipBorder: 'rgba(126,200,80,0.22)',
}

// ── API Types ─────────────────────────────────────────────────────
type MediaAsset = {
  id: string; title: string; imageUrl: string
  publicId: string; resourceType: string; createdAt: string
}

type RoomTabParagraph = {
  id: string; tabId: string; text: string; order: number
}

type RoomTab = {
  id: string; roomTypeId: string; key: string
  eyebrow: string; title: string; tagline: string
  size: string | null; beds: string | null; bath: string | null; guests: string | null
  videoSrc: string | null; order: number
  imageId: string | null; image: MediaAsset | null
  paragraphs: RoomTabParagraph[]
}

type RoomImage = {
  id: string; roomTypeId: string; assetId: string
  order: number; createdAt: string; asset: MediaAsset
}

type RoomType = {
  id: string; name: string; slug: string; label: string | null
  description: string | null; tagline: string | null
  basePrice: string; sizeSqm: number | null; maxGuests: number
  beds: string; bathrooms: number; order: number
  heroImageId: string | null; heroImage: MediaAsset | null
  images: RoomImage[]; tabs: RoomTab[]
}

// ── Small components ──────────────────────────────────────────────
function Chip({ icon, label, t }: { icon: React.ReactNode; label: string; t: Theme }) {
  return (
    <div className="flex items-center gap-2 px-3.5 py-2 rounded-full text-[12px] font-medium"
      style={{ backgroundColor: t.chipBg, border: `1px solid ${t.chipBorder}`, color: t.bodyVal }}>
      <span style={{ color: t.accentVal }}>{icon}</span>
      {label}
    </div>
  )
}

function Divider({ t }: { t: Theme }) {
  return (
    <div className="flex items-center gap-4 px-6 sm:px-10 max-w-4xl mx-auto my-6 sm:my-10">
      <div className="flex-1 h-px" style={{ backgroundColor: t.ruleLine }} />
      <div className="w-1.5 h-1.5 rounded-full rotate-45"
        style={{ backgroundColor: t.accentVal, opacity: 0.5 }} />
      <div className="flex-1 h-px" style={{ backgroundColor: t.ruleLine }} />
    </div>
  )
}

function AnimatedParagraph({ children, delay = 0, t }: {
  children: React.ReactNode; delay?: number; t: Theme
}) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay }}
      className="cormorant-garamond-light-italic leading-[1.9] text-[16px] sm:text-[17px] md:text-[18px] mt-5"
      style={{ color: t.bodyVal }}>
      {children}
    </motion.p>
  )
}

function MediaContainer({ children, t }: { children: React.ReactNode; t: Theme }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full aspect-video rounded-2xl overflow-hidden"
      style={{ border: `1px solid ${t.borderVal}`, boxShadow: `0 24px 64px rgba(0,0,0,0.15)` }}>
      {children}
    </motion.div>
  )
}

// ── Skeleton loader ───────────────────────────────────────────────
function Skeleton({ t }: { t: Theme }) {
  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-10 pt-14 pb-20 space-y-6 animate-pulse">
      <div className="h-4 w-32 rounded-full" style={{ backgroundColor: t.borderVal }} />
      <div className="h-10 w-2/3 rounded-xl" style={{ backgroundColor: t.borderVal }} />
      <div className="h-px w-full" style={{ backgroundColor: t.borderVal }} />
      <div className="aspect-video rounded-2xl" style={{ backgroundColor: t.borderVal }} />
      <div className="flex gap-2">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-9 w-24 rounded-full" style={{ backgroundColor: t.borderVal }} />
        ))}
      </div>
      {[1, 2, 3].map(i => (
        <div key={i} className="h-4 rounded-full" style={{ backgroundColor: t.borderVal }} />
      ))}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────
export default function RoomDetailPage() {
  const params = useParams()
  const slug = params?.slug as string

  const [isDark, setIsDark] = useState(false)
  const t = isDark ? dark : light

  const [roomType, setRoomType] = useState<RoomType | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [activeTabKey, setActiveTabKey] = useState<string>('')

  // System dark mode preference
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) setIsDark(true)
  }, [])

  // Fetch the specific room type by slug
  const fetchRoom = useCallback(async () => {
    if (!slug) return;
    try {
        const res = await fetch(`/api/rooms/room-types/${slug}`)
        if (!res.ok) throw new Error()
        const found: RoomType = await res.json()
        setRoomType(found)

      // Set active tab: restore from localStorage or default to first tab
      const tabs = [...found.tabs].sort((a, b) => a.order - b.order)
      const saved = localStorage.getItem(`room-tab-${slug}`)
      const validTab = tabs.find(tb => tb.key === saved) ?? tabs[0]
      if (validTab) setActiveTabKey(validTab.key)
    } catch {
      setNotFound(true)
    } finally {
      setLoading(false)
    }
  }, [slug])

  useEffect(() => { fetchRoom() }, [fetchRoom])

  const handleTab = (key: string) => {
    setActiveTabKey(key)
    localStorage.setItem(`room-tab-${slug}`, key)
  }

  // Derive sorted tabs and active tab content
  const sortedTabs = roomType ? [...roomType.tabs].sort((a, b) => a.order - b.order) : []
  const activeTab = sortedTabs.find(tb => tb.key === activeTabKey)
  const sortedParagraphs = activeTab
    ? [...activeTab.paragraphs].sort((a, b) => a.order - b.order)
    : []

  // Hero image: prefer tab's own image, fall back to roomType heroImage
  const heroImageUrl = activeTab?.image?.imageUrl ?? roomType?.heroImage?.imageUrl ?? null

  // ── Not found ──
  if (!loading && notFound) {
    return (
      <div className={`${t.page} min-h-screen flex flex-col items-center justify-center gap-4`}>
        <p className="eb-garamond-semibold text-4xl" style={{ color: t.headingVal }}>Room not found</p>
        <Link href="/rooms" className="underline text-sm" style={{ color: t.accentVal }}>
          ← Back to rooms
        </Link>
      </div>
    )
  }

  return (
    <div className={`${t.page} min-h-screen eb-garamond transition-colors duration-300 overflow-x-hidden`}>

      {/* ── Theme toggle ── */}
      <motion.button
        onClick={() => setIsDark(d => !d)}
        aria-label="Toggle dark mode"
        className="fixed bottom-6 right-6 z-50 cursor-pointer w-12 h-12 rounded-full flex items-center justify-center"
        style={{ backgroundColor: isDark ? '#0f180f' : '#ede8df', color: t.accentVal, border: `1px solid ${t.borderVal}` }}
        animate={{
          boxShadow: [`0 0 0px 0px ${t.accentVal}00`, `0 0 16px 4px ${t.accentVal}55`, `0 0 0px 0px ${t.accentVal}00`],
          rotate: [0, -8, 8, -4, 4, 0],
        }}
        transition={{
          boxShadow: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
        }}
        whileHover={{ scale: 1.18, rotate: 20 }}
        whileTap={{ scale: 0.88, rotate: -15 }}>
        <motion.div animate={{ rotate: isDark ? 0 : 360 }} transition={{ duration: 0.5, ease: EASE }}>
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </motion.div>
      </motion.button>

      {/* ── Nav ── */}
      <nav
        className="flex items-center justify-between px-4 sm:px-8 md:px-16 lg:px-28 py-3 sm:py-4 transition-colors duration-300"
        style={{ backgroundColor: t.surfaceVal, borderBottom: `1px solid ${t.borderVal}` }}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.history.back()}
            aria-label="Go back"
            className="flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-[0.13em] cursor-pointer rounded-full px-4 py-2 transition-all duration-200"
            style={{ backgroundColor: t.chipBg, color: t.bodyVal, border: `1px solid ${t.chipBorder}` }}>
            <ArrowUpRight size={13} className="rotate-225" />
            Back
          </button>
          <Link href="/" className="flex items-center gap-2">
            <Image src={logo} alt="Agroterra Logo" height={32} className="h-7 sm:h-8 w-auto" />
            <h3 className="uppercase eb-garamond-extrabold text-[14px] sm:text-[16px] lg:text-[17px]"
              style={{ color: t.headingVal }}>
              Agroterra
            </h3>
          </Link>
        </div>
        <Link href="/contact">
          <button
            className="hidden lg:flex items-center gap-2 font-bold text-[11px] uppercase tracking-[0.13em] cursor-pointer rounded-full px-5 py-2.5 transition-all duration-200"
            style={{ backgroundColor: t.accentVal, color: t.pageVal }}>
            <FaConciergeBell size={13} />
            Book Now
          </button>
        </Link>
      </nav>

      {/* ── Loading skeleton ── */}
      {loading && <Skeleton t={t} />}

      {/* ── Loaded content ── */}
      {!loading && roomType && (
        <>
          {/* ── Sticky tabs (only if more than one tab) ── */}
          {sortedTabs.length > 1 && (
            <div className="sticky top-0 z-30 transition-colors duration-300"
              style={{ backgroundColor: t.pageVal, backdropFilter: 'blur(16px)', borderBottom: `1px solid ${t.borderVal}` }}>
              <div className="max-w-4xl mx-auto px-4 sm:px-10 flex">
                {sortedTabs.map(tab => (
                  <button key={tab.key} onClick={() => handleTab(tab.key)}
                    className={`flex-1 py-4 sm:py-5 text-[11px] sm:text-[12px] lg:text-[13px] font-bold tracking-[0.14em] uppercase
                      border-b-2 transition-all duration-200 cursor-pointer
                      ${activeTabKey === tab.key ? t.tabActive : t.tabInactive}`}>
                    {/* Use a clean display label: strip slug prefix if present */}
                    {tab.key}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Section header ── */}
          <div className="max-w-4xl mx-auto px-6 sm:px-10 pt-14 sm:pt-20 pb-6">
            <AnimatePresence mode="wait">
              <motion.div key={activeTabKey}
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] mb-2"
                  style={{ color: t.accentVal }}>
                  Accommodations · {roomType.label ?? roomType.name}
                </p>
                <h2 className="eb-garamond-semibold leading-none"
                  style={{ fontSize: 'clamp(32px,5vw,56px)', color: t.headingVal }}>
                  {activeTab?.title ?? roomType.name}
                </h2>
                <p className="cormorant-garamond-light-italic mt-2 text-[15px] sm:text-[16px] tracking-wide"
                  style={{ color: t.accentVal }}>
                  {activeTab?.tagline ?? roomType.tagline}
                </p>
              </motion.div>
            </AnimatePresence>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              className="mt-5 h-px origin-left" style={{ backgroundColor: t.borderVal }} />
          </div>

          {/* ── Content card ── */}
          <div className="max-w-4xl mx-auto px-6 sm:px-10 pb-10">
            <AnimatePresence mode="wait">
              <motion.div key={activeTabKey}
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="relative rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-12 flex flex-col gap-6"
                style={{
                  backgroundColor: t.surfaceVal,
                  boxShadow: `0 24px 80px rgba(0,0,0,0.18), 0 2px 0 ${t.accentVal}30`,
                  border: `1px solid ${t.borderVal}`,
                }}>
                {/* Top accent bar */}
                <div className="absolute top-0 left-10 right-10 h-0.5 rounded-full"
                  style={{ background: `linear-gradient(to right, transparent, ${t.accentVal}, transparent)` }} />

                {/* Eyebrow */}
                <div className="flex items-center gap-3">
                  <div className="w-6 h-px" style={{ backgroundColor: t.accentVal }} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: t.accentVal }}>
                    {activeTab?.eyebrow ?? 'Suite'}
                  </span>
                </div>

                {/* Hero image */}
                {heroImageUrl && (
                  <MediaContainer t={t}>
                    <Image
                      src={heroImageUrl}
                      alt={activeTab?.title ?? roomType.name}
                      fill className="object-cover" priority
                    />
                  </MediaContainer>
                )}

                {/* Rule */}
                <div className="w-full h-px" style={{ backgroundColor: t.borderVal }} />

                {/* Spec chips */}
                <div className="flex flex-wrap gap-2">
                  <Chip icon={<TbCrosshair size={13} />} label={activeTab?.size ?? (roomType.sizeSqm ? `${roomType.sizeSqm} sqm` : '—')} t={t} />
                  <Chip icon={<IoBedOutline size={13} />} label={activeTab?.beds ?? roomType.beds} t={t} />
                  <Chip icon={<MdOutlineBathtub size={13} />} label={activeTab?.bath ?? `${roomType.bathrooms} Bath`} t={t} />
                  <Chip icon={<MdOutlinePeopleOutline size={13} />} label={activeTab?.guests ?? `${roomType.maxGuests} Guests`} t={t} />
                </div>

                {/* Paragraphs */}
                <div>
                  {sortedParagraphs.map((p, i) => (
                    <AnimatedParagraph key={p.id} delay={i * 0.08} t={t}>
                      {p.text}
                    </AnimatedParagraph>
                  ))}
                </div>

                {/* CTA */}
                <div>
                  <Link href="/reservation"
                    className="group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5
                      text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.14em] transition-all duration-300"
                    style={{ backgroundColor: t.accentVal, color: t.pageVal, boxShadow: `0 8px 28px ${t.accentVal}40` }}>
                    Reserve this Room
                    <ArrowUpRight size={14}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Video section ── */}
          {activeTab?.videoSrc && (
            <>
              <Divider t={t} />
              <div className="max-w-4xl mx-auto px-6 sm:px-10 pb-20 sm:pb-32">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] mb-6 text-center"
                  style={{ color: t.accentVal }}>
                  Room Walkthrough
                </p>
                <MediaContainer t={t}>
                  <iframe
                    src={activeTab.videoSrc}
                    title="Room walkthrough video"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    frameBorder="0"
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="absolute inset-0 w-full h-full"
                  />
                </MediaContainer>
              </div>
            </>
          )}
        </>
      )}

      {/* ── Footer ── */}
      <footer className="py-8 px-6 text-center" style={{ borderTop: `1px solid ${t.borderVal}` }}>
        <p className="text-[11px] tracking-widest uppercase" style={{ color: t.mutedVal }}>
          © {new Date().getFullYear()} Agroterra Resort · Accommodations
        </p>
      </footer>
    </div>
  )
}