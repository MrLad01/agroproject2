'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { TbCrosshair } from 'react-icons/tb'
import { IoBedOutline } from 'react-icons/io5'
import { MdOutlineBathtub, MdOutlinePeopleOutline } from 'react-icons/md'
import ExperienceCard from './ExperienceCard'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { useRoomHeroData, useRoomTypes, useSiteData, useSectionTwo } from '@/app/context/SiteDataContext'

// ── Theme tokens ──────────────────────────────────────────────────
const themes = {
  light: {
    bg: '#f8f5ef', border: '#ddd5c4', accent: '#1e5e32', heading: '#0f1f0f',
    body: '#3a4e3a', spec: '#2a3a2a', chipBg: 'rgba(30,94,50,0.07)',
    chipBorder: 'rgba(30,94,50,0.18)', tabActive: '#1e5e32', tabInactive: '#aaaaaa',
    tabBorder: '#ddd5c4', ruleLine: '#cec8bc', imgShadow: '0 12px 48px rgba(0,0,0,0.10)',
    ctaColor: '#ffffff', pageVal: '#f8f5ef',
  },
  dark: {
    bg: '#080e08', border: '#243424', accent: '#7ec850', heading: '#e0f0c8',
    body: '#9abf7e', spec: '#c8e0a8', chipBg: 'rgba(126,200,80,0.08)',
    chipBorder: 'rgba(126,200,80,0.22)', tabActive: '#7ec850', tabInactive: '#3a5a3a',
    tabBorder: '#243424', ruleLine: '#1a2a1a', imgShadow: '0 12px 48px rgba(0,0,0,0.50)',
    ctaColor: '#080e08', pageVal: '#080e08',
  },
}

// ── API Types ─────────────────────────────────────────────────────
type MediaAsset = {
  id: string; title: string; imageUrl: string
  publicId: string; resourceType: string; createdAt: string
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
  images: RoomImage[]
}

type S1Image    = { id: string; order: number; assetId: string; asset: MediaAsset }
type SectionOneData = { id: string; label: string; heading: string; quote: string; images: S1Image[] }
type SectionTwoData = { id: string; label: string; heading: string; subheading: string; expLabel: string; expHeading: string }

type Tk = typeof themes.light

// ── Spec chip ─────────────────────────────────────────────────────
function Chip({ icon, label, tk }: { icon: React.ReactNode; label: string; tk: Tk }) {
  return (
    <div className="flex items-center gap-2 px-3.5 py-2 rounded-full text-[12px] font-medium"
      style={{ backgroundColor: tk.chipBg, border: `1px solid ${tk.chipBorder}`, color: tk.spec }}>
      <span style={{ color: tk.accent }}>{icon}</span>
      {label}
    </div>
  )
}

// ── Room card ─────────────────────────────────────────────────────
function RoomCard({
  roomType, imageLeft = false, tk,
}: {
  roomType: RoomType; imageLeft?: boolean; tk: Tk
}) {
  // Best image to show: first gallery image or hero image
  const imageUrl = roomType.images[0]?.asset.imageUrl ?? roomType.heroImage?.imageUrl ?? null

  const specs = [
    { icon: <TbCrosshair size={14} />,            label: roomType.sizeSqm ? `${roomType.sizeSqm} sqm` : '—' },
    { icon: <IoBedOutline size={14} />,           label: roomType.beds },
    { icon: <MdOutlineBathtub size={14} />,       label: `${roomType.bathrooms} Bath` },
    { icon: <MdOutlinePeopleOutline size={14} />, label: `${roomType.maxGuests} Guests` },
  ]

  const textBlock = (
    <div className="flex flex-col gap-5 w-full lg:w-1/2">
      <div className="flex items-center gap-3">
        <div className="w-6 h-px" style={{ backgroundColor: tk.accent }} />
        <span className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: tk.accent }}>
          Suite
        </span>
      </div>
      <h3 className="eb-garamond-semibold leading-tight"
        style={{ fontSize: 'clamp(22px,3.5vw,34px)', color: tk.heading }}>
        {roomType.label ?? roomType.name}
      </h3>
      <div className="w-8 h-0.5 rounded-full" style={{ backgroundColor: tk.accent }} />
      <p className="cormorant-garamond-light-italic leading-[1.85] text-[16px] sm:text-[17px] md:text-[18px]"
        style={{ color: tk.body }}>
        {roomType.description ?? ''}
      </p>
      <div className="flex flex-wrap gap-2">
        {specs.map(({ icon, label }) => (
          <Chip key={label} icon={icon} label={label} tk={tk} />
        ))}
      </div>
      <Link
        href={`/room/${roomType.slug}`}
        className="group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5
          text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.14em]
          transition-all duration-300 w-fit"
        style={{ backgroundColor: tk.accent, color: tk.ctaColor, boxShadow: `0 8px 28px ${tk.accent}40` }}>
        Room Details
        <ArrowUpRight size={14}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </div>
  )

  const imageBlock = (
    <div className="w-full lg:w-1/2 overflow-hidden rounded-2xl" style={{ boxShadow: tk.imgShadow }}>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={roomType.label ?? roomType.name}
          width={800} height={600}
          className="w-full h-64 sm:h-80 md:h-96 lg:h-112 object-cover
            transition-transform duration-[1.2s] ease-out hover:scale-[1.04]"
        />
      ) : (
        // Placeholder when no image is set yet
        <div className="w-full h-64 sm:h-80 md:h-96 lg:h-112 rounded-2xl"
          style={{ backgroundColor: tk.chipBg }} />
      )}
    </div>
  )

  return (
    <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${imageLeft ? 'lg:flex-row-reverse' : ''}`}>
      {imageLeft ? <>{imageBlock}{textBlock}</> : <>{textBlock}{imageBlock}</>}
    </div>
  )
}

// ── Main section ──────────────────────────────────────────────────
type Props = { dark?: boolean }

const SectionTwo = ({ dark = false }: Props) => {
  const tk = dark ? themes.dark : themes.light
  const { loading } = useSiteData()
  const [s2, setS2] = useState<SectionTwoData>({ id: '', label: '', heading: '', subheading: '', expLabel: '', expHeading: '' })
  // const [roomTypes, setRoomTypes] = useState<RoomType[]>([])
  const [activeSlug, setActiveSlug] = useState<string>('')

  const sectionTwo  = useSectionTwo()

  const { roomHeroText, roomSlides } = useRoomHeroData()
  const  roomTypes = useRoomTypes()

  useEffect(()=> {
    if (Array.isArray(roomTypes) && roomTypes.length > 0) {
        const sorted = [...roomTypes].sort((a, b) => a.order - b.order)
  
        const saved = localStorage.getItem('home-room-tab')
        const validSlug = sorted.find(rt => rt.slug === saved)?.slug ?? sorted[0].slug
        setActiveSlug(validSlug)
    }

  }, [roomTypes])

  const handleTabSwitch = (slug: string, e: React.MouseEvent) => {
    e.preventDefault()
    setActiveSlug(slug)
    localStorage.setItem('home-room-tab', slug)
  }

  const activeRoomType = roomTypes.find(rt => rt.slug === activeSlug)

  // Alternate image layout per tab position (even = text left, odd = text right)
  const activeIndex = roomTypes.findIndex(rt => rt.slug === activeSlug)
  const imageLeft   = activeIndex % 2 !== 0

  return (
    <section
      style={{ backgroundColor: tk.bg, borderTop: `1px solid ${tk.border}` }}
      className="py-14 sm:py-20 md:py-28 px-6 sm:px-12 md:px-20 lg:px-40">

      {/* Section header */}
      <div className="text-center mb-10 sm:mb-14">
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] mb-3" style={{ color: tk.accent }}>
          { sectionTwo?.label || 'Explore' }
        </p>
        <h2 className="eb-garamond-semibold leading-tight"
          style={{ fontSize: 'clamp(28px,5vw,50px)', color: tk.heading }}>
          { sectionTwo?.heading || 'A Place That Fits You' }
        </h2>
        <div className="w-10 h-px mx-auto mt-4 mb-4 rounded-full"
          style={{ backgroundColor: tk.accent, opacity: 0.65 }} />
        <p className="cormorant-garamond-light-italic text-[16px] sm:text-[18px] max-w-xl mx-auto leading-relaxed"
          style={{ color: tk.body }}>
          { sectionTwo?.subheading || 'Choose from spacious suites designed to give you and your loved ones the comfort, privacy, and serenity you deserve.'}
        </p>
      </div>

      {/* Tab bar — driven entirely by API */}
      {!loading && roomTypes.length > 0 && (
        <div className="flex w-full mb-10 sm:mb-14"
          style={{ borderBottom: `1px solid ${tk.tabBorder}` }}>
          {roomTypes.map(({ slug, label, name }) => (
            <button key={slug} onClick={(e) => handleTabSwitch(slug, e)}
              className="flex-1 py-3.5 sm:py-4 text-[11px] sm:text-[13px] font-bold uppercase
                tracking-widest border-b-2 -mb-px transition-all duration-200 cursor-pointer"
              style={{
                color:       activeSlug === slug ? tk.tabActive : tk.tabInactive,
                borderColor: activeSlug === slug ? tk.tabActive : 'transparent',
              }}>
              {label ?? name}
            </button>
          ))}
        </div>
      )}

      {/* Tab skeleton */}
      {loading && (
        <div className="flex w-full mb-10 sm:mb-14 animate-pulse"
          style={{ borderBottom: `1px solid ${tk.tabBorder}` }}>
          {[1, 2, 3].map(i => (
            <div key={i} className="flex-1 h-12 mx-2 rounded-t-lg"
              style={{ backgroundColor: tk.chipBg }} />
          ))}
        </div>
      )}

      {/* Room card — driven entirely by API */}
      {!loading && activeRoomType && (
        <RoomCard
          key={activeRoomType.slug}
          roomType={activeRoomType}
          imageLeft={imageLeft}
          tk={tk}
        />
      )}

      {/* Card skeleton */}
      {loading && (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 animate-pulse">
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="h-4 w-20 rounded-full" style={{ backgroundColor: tk.chipBg }} />
            <div className="h-9 w-2/3 rounded-xl" style={{ backgroundColor: tk.chipBg }} />
            <div className="h-24 rounded-xl" style={{ backgroundColor: tk.chipBg }} />
            <div className="flex gap-2">
              {[1, 2, 3, 4].map(i => <div key={i} className="h-9 w-20 rounded-full" style={{ backgroundColor: tk.chipBg }} />)}
            </div>
          </div>
          <div className="w-full lg:w-1/2 h-64 sm:h-80 rounded-2xl" style={{ backgroundColor: tk.chipBg }} />
        </div>
      )}

      {/* Experiences */}
      <div className="mt-20 sm:mt-28 md:mt-32 pt-14 sm:pt-20"
        style={{ borderTop: `1px solid ${tk.ruleLine}` }}>
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] mb-3" style={{ color: tk.accent }}>
            {sectionTwo?.expLabel || 'Experiences'}
          </p>
          <h2 className="eb-garamond-semibold leading-tight"
            style={{ fontSize: 'clamp(28px,5vw,50px)', color: tk.heading }}>
            {sectionTwo?.expHeading || 'Harmony With Nature'}
          </h2>
          <div className="w-10 h-px mx-auto mt-4 rounded-full"
            style={{ backgroundColor: tk.accent, opacity: 0.65 }} />
        </div>
        <div className="relative max-w-6xl mx-auto flex justify-center">
          <ExperienceCard />
        </div>
      </div>
    </section>
  )
}

export default SectionTwo