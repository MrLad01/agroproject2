'use client'

import { useState, useEffect } from "react"
import junior from '@/public/juniorBed.png'
import family from '@/public/familyBed.jpg'
import deluxe from '@/public/deluxeBed.jpg'
import Image, { StaticImageData } from "next/image"
import { TbCrosshair } from "react-icons/tb"
import { IoBedOutline } from "react-icons/io5"
import { MdOutlineBathtub, MdOutlinePeopleOutline } from "react-icons/md"
import ExperienceCard from "./ExperienceCard"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

// ── Theme tokens ──────────────────────────────────────────────────
type Theme = {
  page:       string
  pageVal:    string
  surfaceVal: string
  borderVal:  string
  accentVal:  string
  headingVal: string
  bodyVal:    string
  mutedVal:   string
  labelVal:   string
  specVal:    string
  chipBg:     string
  chipBorder: string
  tabActive:  string
  tabInactive:string
  tabBorderB: string
  ruleLine:   string
  imgShadow:  string
}

const lightTheme: Theme = {
  page:        'bg-[#f8f5ef]',
  pageVal:     '#f8f5ef',
  surfaceVal:  '#ffffff',
  borderVal:   '#ddd5c4',
  accentVal:   '#1e5e32',
  headingVal:  '#0f1f0f',
  bodyVal:     '#3a4e3a',
  mutedVal:    '#7a8c6a',
  labelVal:    '#1e5e32',
  specVal:     '#2a3a2a',
  chipBg:      'rgba(30,94,50,0.07)',
  chipBorder:  'rgba(30,94,50,0.18)',
  tabActive:   '#1e5e32',
  tabInactive: '#aaaaaa',
  tabBorderB:  '#ddd5c4',
  ruleLine:    '#cec8bc',
  imgShadow:   '0 12px 48px rgba(0,0,0,0.10)',
}

const darkTheme: Theme = {
  page:        'bg-[#080e08]',
  pageVal:     '#080e08',
  surfaceVal:  '#0f180f',
  borderVal:   '#243424',
  accentVal:   '#7ec850',
  headingVal:  '#e0f0c8',
  bodyVal:     '#9abf7e',
  mutedVal:    '#4e6e3e',
  labelVal:    '#7ec850',
  specVal:     '#c8e0a8',
  chipBg:      'rgba(126,200,80,0.08)',
  chipBorder:  'rgba(126,200,80,0.22)',
  tabActive:   '#7ec850',
  tabInactive: '#3a5a3a',
  tabBorderB:  '#243424',
  ruleLine:    '#1a2a1a',
  imgShadow:   '0 12px 48px rgba(0,0,0,0.50)',
}

// ── Spec chip ─────────────────────────────────────────────────────
function Chip({ icon, label, t }: {
  icon: React.ReactNode; label: string; t: Theme
}) {
  return (
    <div
      className="flex items-center gap-2 px-3.5 py-2 rounded-full text-[12px] font-medium"
      style={{
        backgroundColor: t.chipBg,
        border: `1px solid ${t.chipBorder}`,
        color: t.specVal,
      }}
    >
      <span style={{ color: t.accentVal }}>{icon}</span>
      {label}
    </div>
  )
}

// ── Room card ─────────────────────────────────────────────────────
function RoomCard({
  title, description, specs, href, image, imageAlt, imageLeft = false, t,
}: {
  title: string
  description: string
  specs: { icon: React.ReactNode; label: string }[]
  href: string
  image: StaticImageData
  imageAlt: string
  imageLeft?: boolean
  t: Theme
}) {
  const textBlock = (
    <div className="flex flex-col gap-5 w-full lg:w-1/2">
      {/* Subtitle line */}
      <div className="flex items-center gap-3">
        <div className="w-6 h-px" style={{ backgroundColor: t.accentVal }} />
        <span
          className="text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ color: t.accentVal }}
        >
          Suite
        </span>
      </div>

      <h3
        className="eb-garamond-semibold leading-tight"
        style={{ fontSize: 'clamp(22px,3.5vw,34px)', color: t.headingVal }}
      >
        {title}
      </h3>

      <div className="w-8 h-0.5 rounded-full" style={{ backgroundColor: t.accentVal }} />

      <p
        className="cormorant-garamond-light-italic leading-[1.85] text-[16px] sm:text-[17px] md:text-[18px]"
        style={{ color: t.bodyVal }}
      >
        {description}
      </p>

      {/* Specs */}
      <div className="flex flex-wrap gap-2">
        {specs.map(({ icon, label }) => (
          <Chip key={label} icon={icon} label={label} t={t} />
        ))}
      </div>

      {/* CTA */}
      <Link
        href={href}
        className="group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5
          text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.14em]
          transition-all duration-300 w-fit"
        style={{
          backgroundColor: t.accentVal,
          color: t.pageVal,
          boxShadow: `0 8px 28px ${t.accentVal}40`,
        }}
      >
        Room Details
        <ArrowUpRight
          size={14}
          className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </Link>
    </div>
  )

  const imageBlock = (
    <div className="w-full lg:w-1/2 overflow-hidden rounded-2xl"
      style={{ boxShadow: t.imgShadow }}>
      <Image
        src={image}
        alt={imageAlt}
        className="w-full h-64 sm:h-80 md:h-96 lg:h-112 object-cover
          transition-transform duration-[1.2s] ease-out hover:scale-[1.04]"
      />
    </div>
  )

  return (
    <div className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${imageLeft ? 'lg:flex-row-reverse' : ''}`}>
      {imageLeft ? <>{imageBlock}{textBlock}</> : <>{textBlock}{imageBlock}</>}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────
type Props = { dark?: boolean }

const SectionTwo = ({ dark = false }: Props) => {
  const t = dark ? darkTheme : lightTheme
  const [activeTab, setActiveTab] = useState<string>('family')

  useEffect(() => {
    const saved = localStorage.getItem('tab')
    if (saved) setActiveTab(saved)
  }, [])

  const handleTabSwitch = (tab: string, e: React.MouseEvent) => {
    e.preventDefault()
    setActiveTab(tab)
    localStorage.setItem('tab', tab)
  }

  const tabs = [
    { key: 'family', label: 'Family Suite' },
    { key: 'junior', label: 'Junior Suite' },
    { key: 'deluxe', label: 'Deluxe Double' },
  ]

  const specs = {
    family: [
      { icon: <TbCrosshair size={14} />,            label: '45–60 sqm' },
      { icon: <IoBedOutline size={14} />,           label: '2–3 Beds' },
      { icon: <MdOutlineBathtub size={14} />,       label: '1–2 Bath' },
      { icon: <MdOutlinePeopleOutline size={14} />, label: '4–6 Guests' },
    ],
    junior: [
      { icon: <TbCrosshair size={14} />,            label: '35 sqm' },
      { icon: <IoBedOutline size={14} />,           label: '1 Bed' },
      { icon: <MdOutlineBathtub size={14} />,       label: '1 Bath' },
      { icon: <MdOutlinePeopleOutline size={14} />, label: '2 Guests' },
    ],
    deluxe: [
      { icon: <TbCrosshair size={14} />,            label: '50 sqm' },
      { icon: <IoBedOutline size={14} />,           label: '2 Beds' },
      { icon: <MdOutlineBathtub size={14} />,       label: '1 Bath' },
      { icon: <MdOutlinePeopleOutline size={14} />, label: '4 Guests' },
    ],
  }

  const rooms = {
    family: {
      title: 'Family Suite',
      description: 'The Family Suite is perfect for families and groups seeking comfortable, spacious accommodation. Featuring well-appointed bedrooms, a cozy living area, and a private balcony with garden views — it creates a warm, home-like atmosphere. For those needing more space, the 3-Bedroom Detached option provides a private standalone residence with full resort access.',
      image: family, imageAlt: 'Family Suite', imageLeft: false, href: '/room/family',
    },
    junior: {
      title: 'Junior Suite',
      description: 'The Junior Suite blends modern comfort with tasteful elegance — a sanctuary for couples or solo travellers. A spacious bedroom, curated textures, and a calm so complete it feels like the outside world dissolved.',
      image: junior, imageAlt: 'Junior Suite', imageLeft: true, href: '/room/junior',
    },
    deluxe: {
      title: 'Deluxe Double Room',
      description: 'The Deluxe Double Room delivers premium comfort with sweeping proportions and refined décor. Two spacious bedrooms and a private balcony look out over the resort&apos;s lush gardens — every surface chosen, every detail considered.',
      image: deluxe, imageAlt: 'Deluxe Suite', imageLeft: false, href: '/room/deluxe',
    },
  }

  const active = rooms[activeTab as keyof typeof rooms]

  return (
    <section
      style={{
        backgroundColor: t.pageVal,
        borderTop: `1px solid ${t.borderVal}`,
        transition: 'background-color .3s, border-color .3s',
      }}
      className="py-14 sm:py-20 md:py-28 px-6 sm:px-12 md:px-20 lg:px-40"
    >
      {/* ── Section header ────────────────────────────────────── */}
      <div className="text-center mb-10 sm:mb-14">
        <p
          className="text-[10px] font-bold uppercase tracking-[0.28em] mb-3"
          style={{ color: t.labelVal }}
        >
          Explore
        </p>
        <h2
          className="eb-garamond-semibold leading-tight"
          style={{ fontSize: 'clamp(28px,5vw,50px)', color: t.headingVal }}
        >
          A Place That Fits You
        </h2>
        <div
          className="w-10 h-px mx-auto mt-4 mb-4 rounded-full"
          style={{ backgroundColor: t.accentVal, opacity: 0.65 }}
        />
        <p
          className="cormorant-garamond-light-italic text-[16px] sm:text-[18px] max-w-xl mx-auto leading-relaxed"
          style={{ color: t.bodyVal }}
        >
          Choose from spacious suites designed to give you and your loved ones
          the comfort, privacy, and serenity you deserve.
        </p>
      </div>

      {/* ── Tab bar ───────────────────────────────────────────── */}
      <div
        className="flex w-full mb-10 sm:mb-14"
        style={{ borderBottom: `1px solid ${t.tabBorderB}` }}
      >
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={(e) => handleTabSwitch(key, e)}
            className="flex-1 py-3.5 sm:py-4 text-[11px] sm:text-[13px] font-bold uppercase
              tracking-widest border-b-2 -mb-px transition-all duration-200 cursor-pointer"
            style={{
              color:       activeTab === key ? t.tabActive : t.tabInactive,
              borderColor: activeTab === key ? t.tabActive : 'transparent',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Active room card ──────────────────────────────────── */}
      <RoomCard
        key={activeTab}
        title={active.title}
        description={active.description}
        specs={specs[activeTab as keyof typeof specs]}
        href={active.href}
        image={active.image}
        imageAlt={active.imageAlt}
        imageLeft={active.imageLeft}
        t={t}
      />

      {/* ── Experiences sub-section ───────────────────────────── */}
      <div
        className="mt-20 sm:mt-28 md:mt-32 pt-14 sm:pt-20"
        style={{ borderTop: `1px solid ${t.ruleLine}` }}
      >
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <p
            className="text-[10px] font-bold uppercase tracking-[0.28em] mb-3"
            style={{ color: t.labelVal }}
          >
            Experiences
          </p>
          <h2
            className="eb-garamond-semibold leading-tight"
            style={{ fontSize: 'clamp(28px,5vw,50px)', color: t.headingVal }}
          >
            Harmony With Nature
          </h2>
          <div
            className="w-10 h-px mx-auto mt-4 rounded-full"
            style={{ backgroundColor: t.accentVal, opacity: 0.65 }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto flex justify-center">
          <ExperienceCard />
        </div>
      </div>
    </section>
  )
}

export default SectionTwo