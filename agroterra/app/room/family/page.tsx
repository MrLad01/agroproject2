"use client"

import Image from "next/image"
import Link from "next/link"
import logo from "@/public/ASA logo.jpg"
import { FaConciergeBell } from "react-icons/fa"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import family from "@/public/familyBed.jpg"
import { MobileNav } from "@/components/Navbar"
import { ArrowUpRight, Sun, Moon } from "lucide-react"
import { IoBedOutline } from "react-icons/io5"
import { TbCrosshair } from "react-icons/tb"
import { MdOutlineBathtub, MdOutlinePeopleOutline } from "react-icons/md"

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
  tabActive: 'text-[#7ec850] border-b-[#7ec850]',
  tabInactive: 'text-[#3a5a3a] border-b-transparent hover:text-[#7ec850]',
  chipBg: 'rgba(126,200,80,0.08)',
  chipBorder: 'rgba(126,200,80,0.22)',
}

// ── Content data ──────────────────────────────────────────────────
const tabContent: Record<string, {
  eyebrow: string
  title: string
  tagline: string
  size: string; beds: string; bath: string; guests: string
  paragraphs: string[]
  videoSrc: string
}> = {
  bedroom: {
    eyebrow: 'Suite 01',
    title: 'Family Suite',
    tagline: 'Space · Warmth · Togetherness',
    size: '45 sqm', beds: '2 Beds', bath: '1 Bath', guests: '4 Guests',
    paragraphs: [
      `The family bedroom at Agroterra Resort is thoughtfully designed to provide a warm, spacious, and relaxing environment where families can unwind, reconnect, and enjoy quality time together. From the moment guests enter, they are welcomed by a calming atmosphere inspired by nature, comfort, and modern elegance. The room is carefully arranged to balance functionality with a sense of retreat, ensuring that every family member feels at home throughout their stay.`,
      `The layout is intentionally spacious to accommodate families comfortably without feeling crowded. A large, comfortable king size bed serves as the centerpiece for parents, dressed in premium linens, soft pillows, and a plush duvet that promises restful sleep. Additional sleeping arrangements are provided through cozy twin beds or a stylish sofa bed, making the space flexible for children or extra guests. Each sleeping area is positioned to allow privacy while maintaining a shared family atmosphere.`,
      `Natural light plays an important role in the room's ambiance. Large windows or sliding glass doors invite sunlight to fill the space during the day while offering beautiful views of the resort's lush greenery, landscaped gardens, or serene natural surroundings. Blackout curtains and sheer drapes allow guests to control lighting and privacy according to their preference, ensuring comfort both day and night.`,
      `The interior design reflects the spirit of Agroterra, blending natural textures, warm earth tones, and modern finishes. Wooden accents, soft fabrics, and subtle decorative elements create a welcoming environment that feels both luxurious and grounded. The room includes a dedicated sitting area where families can relax together, read, watch television, or plan their activities for the day.`,
      `Modern amenities are thoughtfully integrated to enhance convenience and entertainment. A large flat screen television with family friendly channels, high speed wireless internet, and multiple charging ports ensure that both adults and children stay connected and entertained. A work desk and comfortable chair provide space for remote work or personal tasks, while ample storage including wardrobes, drawers, and luggage space helps keep the room organized throughout the stay.`,
      `For added comfort, the family bedroom is equipped with climate control, allowing guests to adjust the temperature to their liking regardless of the season. A mini refrigerator, coffee and tea station, and complimentary bottled water add a touch of convenience, making it easy for families to refresh at any time. Safety features such as secure locks, smoke detectors, and child friendly design considerations provide peace of mind for parents.`,
    ],
    videoSrc: 'https://www.youtube.com/embed/CdNSFf2hjEE?si=WUJXoytTL9YNF4W-',
  },
  bathroom: {
    eyebrow: 'Suite 01',
    title: 'Family Ensuite',
    tagline: 'Clean · Spacious · Refreshing',
    size: '12 sqm', beds: '—', bath: '1 Bath', guests: '4 Guests',
    paragraphs: [
      `The family bathroom at Agroterra Resort is designed to complement the comfort of the bedroom while offering a clean, spacious, and refreshing environment suitable for guests of all ages. With a focus on hygiene, functionality, and modern elegance, the bathroom provides everything families need to start and end their day with ease.`,
      `The bathroom features a modern walk in shower with high quality fittings that deliver a consistent and relaxing water experience. In select rooms, a full size bathtub is also available, providing families with the option of a soothing soak or a fun and safe bathing experience for younger children. Non slip flooring and carefully positioned fixtures ensure safety while maintaining the bathroom's sleek appearance.`,
      `Cleanliness and comfort are at the heart of the design. Fresh, soft towels, bath mats, and premium toiletries are provided daily. Guests enjoy access to quality shampoo, conditioner, body wash, hand soap, and moisturizing lotion, all selected to enhance relaxation while being gentle on the skin. A hairdryer and additional personal care amenities are also available for convenience.`,
      `Ventilation and lighting are carefully planned to maintain a fresh and pleasant environment at all times. Bright overhead lights combined with task lighting around the mirror ensure visibility, while efficient ventilation keeps the space dry and comfortable after use. The overall design incorporates neutral tones, smooth surfaces, and elegant finishes that reflect the natural and calming aesthetic of the resort.`,
      `Storage solutions such as shelves, towel racks, and under sink cabinets help families keep their toiletries and personal items neatly arranged throughout their stay. Child friendly considerations, easy to use fixtures, and accessible layouts ensure that guests of all ages can use the space comfortably.`,
      `The family bathroom at Agroterra Resort is more than a functional space; it is a private wellness area where guests can refresh, recharge, and enjoy moments of relaxation. Together with the family bedroom, it completes a comfortable and welcoming living experience that reflects the resort's commitment to quality, comfort, and family friendly hospitality.`,
    ],
    videoSrc: 'https://youtube.com/embed/Ftze5hE-M9g?si=Y2fhq-F7VCYSZFSZ',
  },
}

// ── Chip ─────────────────────────────────────────────────────────
function Chip({ icon, label, t }: { icon: React.ReactNode; label: string; t: Theme }) {
  return (
    <div className="flex items-center gap-2 px-3.5 py-2 rounded-full text-[12px] font-medium"
      style={{ backgroundColor: t.chipBg, border: `1px solid ${t.chipBorder}`, color: t.bodyVal }}>
      <span style={{ color: t.accentVal }}>{icon}</span>
      {label}
    </div>
  )
}

// ── Decorative divider ────────────────────────────────────────────
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

// ── Sticky tab bar ────────────────────────────────────────────────
function TabBar({ active, onChange, t }: { active: string; onChange: (k: string) => void; t: Theme }) {
  return (
    <div className="sticky top-0 z-30 transition-colors duration-300"
      style={{ backgroundColor: t.pageVal, backdropFilter: 'blur(16px)', borderBottom: `1px solid ${t.borderVal}` }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-10 flex">
        {[
          { key: 'bedroom', label: 'Bedroom' },
          { key: 'bathroom', label: 'Bathroom' },
        ].map(({ key, label }) => (
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

// ── Media container ───────────────────────────────────────────────
function MediaContainer({ children, t }: { children: React.ReactNode; t: Theme }) {
  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden"
      style={{ border: `1px solid ${t.borderVal}`, boxShadow: `0 24px 64px rgba(0,0,0,0.15)` }}>
      {children}
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────
export default function Page() {
  const [isDark, setIsDark] = useState(false)
  const t = isDark ? dark : light
  const [activeTab, setActiveTab] = useState<string>('bedroom')

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) setIsDark(true)
    const saved = localStorage.getItem('tabr')
    if (saved && saved in tabContent) setActiveTab(saved)
  }, [])

  const handleTab = (key: string) => {
    setActiveTab(key)
    localStorage.setItem('tabr', key)
  }

  const content = tabContent[activeTab]

  return (
    <div className={`${t.page} min-h-screen eb-garamond transition-colors duration-300 overflow-x-hidden`}>

      {/* ── Theme toggle ── */}
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

      {/* ── Nav ── */}
      <nav
        className="flex items-center justify-between px-4 sm:px-8 md:px-16 lg:px-28 py-3 sm:py-4 transition-colors duration-300"
        style={{ backgroundColor: t.surfaceVal, borderBottom: `1px solid ${t.borderVal}` }}
      >
        <div className="flex items-center gap-3">
          {/* ── Back button ── */}
          <button
            onClick={() => window.history.back()}
            aria-label="Go back"
            className="flex items-center gap-1.5 font-bold text-[11px] uppercase tracking-[0.13em] cursor-pointer rounded-full px-4 py-2 transition-all duration-200"
            style={{
              backgroundColor: t.chipBg,
              color: t.bodyVal,
              border: `1px solid ${t.chipBorder}`,
            }}
          >
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

      {/* ── Sticky tabs ── */}
      <TabBar active={activeTab} onChange={handleTab} t={t} />

      {/* ── Section header ── */}
      <div className="max-w-4xl mx-auto px-6 sm:px-10 pt-14 sm:pt-20 pb-6">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] mb-2"
            style={{ color: t.accentVal }}>
            Accommodations
          </p>
          <h2 className="eb-garamond-semibold leading-none"
            style={{ fontSize: 'clamp(32px,5vw,56px)', color: t.headingVal }}>
            {content.title}
          </h2>
          <p className="cormorant-garamond-light-italic mt-2 text-[15px] sm:text-[16px] tracking-wide"
            style={{ color: t.accentVal }}>
            {content.tagline}
          </p>
        </motion.div>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          className="mt-5 h-px origin-left"
          style={{ backgroundColor: t.borderVal }} />
      </div>

      {/* ── Content card ── */}
      <div className="max-w-4xl mx-auto px-6 sm:px-10 pb-10">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE }}
          className="relative rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-12 flex flex-col gap-6"
          style={{
            backgroundColor: t.surfaceVal,
            boxShadow: `0 24px 80px rgba(0,0,0,0.18), 0 2px 0 ${t.accentVal}30`,
            border: `1px solid ${t.borderVal}`,
          }}
        >
          {/* Top accent bar */}
          <div className="absolute top-0 left-10 right-10 h-0.5 rounded-full"
            style={{ background: `linear-gradient(to right, transparent, ${t.accentVal}, transparent)` }} />

          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-px" style={{ backgroundColor: t.accentVal }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.24em]"
              style={{ color: t.accentVal }}>
              {content.eyebrow}
            </span>
          </div>

          {/* Hero image */}
          <MediaContainer t={t}>
            <Image src={family} alt={activeTab === 'bedroom' ? 'Family bedroom' : 'Family bathroom'}
              fill className="object-cover" priority />
          </MediaContainer>

          {/* Rule */}
          <div className="w-full h-px" style={{ backgroundColor: t.borderVal }} />

          {/* Spec chips */}
          <div className="flex flex-wrap gap-2">
            <Chip icon={<TbCrosshair size={13} />} label={content.size} t={t} />
            <Chip icon={<IoBedOutline size={13} />} label={content.beds} t={t} />
            <Chip icon={<MdOutlineBathtub size={13} />} label={content.bath} t={t} />
            <Chip icon={<MdOutlinePeopleOutline size={13} />} label={content.guests} t={t} />
          </div>

          {/* Paragraphs */}
          <div>
            {content.paragraphs.map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="cormorant-garamond-light-italic leading-[1.9] text-[16px] sm:text-[17px] md:text-[18px] mt-5"
                style={{ color: t.bodyVal }}
              >
                {text}
              </motion.p>
            ))}
          </div>

          {/* CTA */}
          <div>
            <Link href="/contact"
              className="group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5
                text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.14em]
                transition-all duration-300"
              style={{
                backgroundColor: t.accentVal,
                color: t.pageVal,
                boxShadow: `0 8px 28px ${t.accentVal}40`,
              }}>
              Reserve this Room
              <ArrowUpRight size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ── Ornamental divider ── */}
      <Divider t={t} />

      {/* ── Video ── */}
      <div className="max-w-4xl mx-auto px-6 sm:px-10 pb-20 sm:pb-32">
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] mb-6 text-center"
          style={{ color: t.accentVal }}>
          Room Walkthrough
        </p>
        <MediaContainer t={t}>
          <iframe
            loading="lazy"
            src={content.videoSrc}
            title="Room walkthrough"
            allow="autoplay; encrypted-media"
            allowFullScreen
            frameBorder="0"
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 w-full h-full"
          />
        </MediaContainer>
      </div>

      {/* ── Footer ── */}
      <footer className="py-8 px-6 text-center" style={{ borderTop: `1px solid ${t.borderVal}` }}>
        <p className="text-[11px] tracking-widest uppercase" style={{ color: t.mutedVal }}>
          © {new Date().getFullYear()} Agroterra Resort · Accommodations
        </p>
      </footer>

    </div>
  )
}