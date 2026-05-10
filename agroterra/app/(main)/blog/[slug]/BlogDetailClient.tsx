"use client"

import Image from 'next/image'
import Link from 'next/link'
import logo from '@/public/ASA logo.jpg'
import { FaConciergeBell } from 'react-icons/fa'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Sun, Moon } from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1] as const

type Theme = {
  page: string; pageVal: string; surface: string; surfaceVal: string
  borderVal: string; accentVal: string; headingVal: string; bodyVal: string
  mutedVal: string; ruleLine: string; chipBg: string; chipBorder: string
}

const light: Theme = {
  page: 'bg-[#f5f2eb]', pageVal: '#f5f2eb',
  surface: 'bg-white', surfaceVal: '#ffffff',
  borderVal: '#ddd5c4', accentVal: '#1e5e32',
  headingVal: '#0f1f0f', bodyVal: '#3a4e3a',
  mutedVal: '#7a8c6a', ruleLine: '#cec8bc',
  chipBg: 'rgba(30,94,50,0.08)', chipBorder: 'rgba(30,94,50,0.2)',
}

const dark: Theme = {
  page: 'bg-[#080e08]', pageVal: '#080e08',
  surface: 'bg-[#0f180f]', surfaceVal: '#0f180f',
  borderVal: '#243424', accentVal: '#7ec850',
  headingVal: '#e0f0c8', bodyVal: '#9abf7e',
  mutedVal: '#4e6e3e', ruleLine: '#1a2a1a',
  chipBg: 'rgba(126,200,80,0.08)', chipBorder: 'rgba(126,200,80,0.22)',
}

function Chip({ label, t }: { label: string; t: Theme }) {
  return (
    <div
      className="flex items-center gap-2 px-3.5 py-2 rounded-full text-[12px] font-medium"
      style={{ backgroundColor: t.chipBg, border: `1px solid ${t.chipBorder}`, color: t.bodyVal }}
    >
      {label}
    </div>
  )
}

function Divider({ t }: { t: Theme }) {
  return (
    <div className="flex items-center gap-4 px-6 sm:px-10 max-w-5xl mx-auto my-8">
      <div className="flex-1 h-px" style={{ backgroundColor: t.ruleLine }} />
      <div className="w-1.5 h-1.5 rounded-full rotate-45"
        style={{ backgroundColor: t.accentVal, opacity: 0.5 }} />
      <div className="flex-1 h-px" style={{ backgroundColor: t.ruleLine }} />
    </div>
  )
}

type BlogPost = {
  slug: string
  title: string
  src: any
  excerpt?: string
}

type Props = {
  post: BlogPost
  related: BlogPost[]
}

export default function BlogDetailClient({ post, related }: Props) {
  const [isDark, setIsDark] = useState(false)
  const t = isDark ? dark : light

  return (
    <div className={`${t.page} min-h-screen eb-garamond transition-colors duration-300 overflow-x-hidden`}>

      {/* ── Theme toggle ── */}
      <motion.button
        aria-label="Toggle dark mode"
        onClick={() => setIsDark(!isDark)}
        className="fixed bottom-6 right-6 z-50 cursor-pointer w-12 h-12 rounded-full flex items-center justify-center"
        style={{ backgroundColor: isDark ? '#0f180f' : '#ede8df', color: t.accentVal, border: `1px solid ${t.borderVal}` }}
        animate={{
          boxShadow: [`0 0 0px 0px ${t.accentVal}00`, `0 0 16px 4px ${t.accentVal}55`, `0 0 0px 0px ${t.accentVal}00`],
          rotate: [0, -8, 8, -4, 4, 0],
        }}
        transition={{ boxShadow: { duration: 2.5, repeat: Infinity }, rotate: { duration: 2.5, repeat: Infinity, delay: 0.5 } }}
        whileHover={{ scale: 1.18, rotate: 20 }}
        whileTap={{ scale: 0.88, rotate: -15 }}
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </motion.button>

      {/* ── Nav ── */}
      <nav
        className="flex items-center justify-between px-4 sm:px-8 md:px-16 lg:px-28 py-3 sm:py-4 transition-colors duration-300"
        style={{ backgroundColor: t.surfaceVal, borderBottom: `1px solid ${t.borderVal}` }}
      >
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="Agroterra Logo" height={32} className="h-7 sm:h-8 w-auto" />
          <h3
            className="uppercase eb-garamond-extrabold text-[14px] sm:text-[16px] lg:text-[17px]"
            style={{ color: t.headingVal }}
          >
            Agroterra
          </h3>
        </Link>
        <Link href="/contact">
          <button
            className="hidden lg:flex items-center gap-2 font-bold text-[11px] uppercase tracking-[0.13em] cursor-pointer rounded-full px-5 py-2.5 transition-all duration-200"
            style={{ backgroundColor: t.accentVal, color: t.pageVal }}
          >
            <FaConciergeBell size={13} />
            Book Now
          </button>
        </Link>
      </nav>

      {/* ── Hero ── */}
      <div className="relative w-full h-[55vh] min-h-85 overflow-hidden">
        <Image src={post.src} alt={post.title} fill className="object-cover scale-105" priority />
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/25 to-black/80" />

        <div className="absolute inset-x-0 bottom-0 z-10 px-6 sm:px-10 md:px-20 lg:px-32 pb-10 sm:pb-14">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/blog" className="text-white/60 hover:text-white text-[11px] tracking-[0.15em] uppercase transition-colors font-light">Blog</Link>
            <span className="text-white/30 text-[10px]">—</span>
            <span className="text-white/60 text-[11px] tracking-[0.15em] uppercase font-light">Agroterra</span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="eb-garamond-semibold text-white leading-[1.1] max-w-3xl"
            style={{ fontSize: 'clamp(26px,4vw,48px)' }}
          >
            {post.title}
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            className="mt-5 w-12 h-0.5 origin-left"
            style={{ backgroundColor: t.accentVal }}
          />
        </div>
      </div>

      {/* ── Pull-quote card ── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="relative -mt-10 sm:-mt-14 z-20 rounded-xl sm:rounded-2xl px-8 sm:px-12 py-8 sm:py-10 max-w-2xl"
          style={{
            backgroundColor: t.surfaceVal,
            border: `1px solid ${t.borderVal}`,
            boxShadow: `0 24px 64px rgba(0,0,0,0.18), 0 2px 0 ${t.accentVal}30`,
          }}
        >
          <div className="absolute top-0 left-10 right-10 h-0.5 rounded-full"
            style={{ background: `linear-gradient(to right, transparent, ${t.accentVal}, transparent)` }} />
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px" style={{ backgroundColor: t.accentVal }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: t.accentVal }}>
              Feature Article
            </span>
          </div>
          <p
            className="eb-garamond-semibold italic leading-relaxed"
            style={{ fontSize: 'clamp(16px,2vw,20px)', color: t.headingVal }}
          >
            {post.excerpt ?? 'A space where relaxation, nature, and sport come together in harmony.'}
          </p>
        </motion.div>
      </div>

      {/* ── Section header ── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 pt-14 sm:pt-20 pb-4">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}>
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] mb-2" style={{ color: t.accentVal }}>
            Blog · Leisure
          </p>
          <h2
            className="eb-garamond-semibold leading-none"
            style={{ fontSize: 'clamp(28px,4vw,48px)', color: t.headingVal }}
          >
            {post.title}
          </h2>
          <p className="cormorant-garamond-light-italic mt-2 text-[15px] sm:text-[16px] tracking-wide"
            style={{ color: t.accentVal }}>
            Nature · Sport · Relaxation
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            {['Golf Course', 'Open Year-Round', 'All Skill Levels', 'Family Friendly'].map(label => (
              <Chip key={label} label={label} t={t} />
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="mt-6 h-px origin-left"
          style={{ backgroundColor: t.borderVal }}
        />
      </div>

      {/* ── Main layout ── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE }}
          className="flex flex-col lg:flex-row gap-12 lg:gap-16"
        >

          {/* ── Article body ── */}
          <article className="flex-1 min-w-0">
            <div
              className="relative rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-12"
              style={{
                backgroundColor: t.surfaceVal,
                boxShadow: `0 24px 80px rgba(0,0,0,0.18), 0 2px 0 ${t.accentVal}30`,
                border: `1px solid ${t.borderVal}`,
              }}
            >
              <div className="absolute top-0 left-10 right-10 h-0.5 rounded-full"
                style={{ background: `linear-gradient(to right, transparent, ${t.accentVal}, transparent)` }} />

              <div className="space-y-0">
                <motion.p
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.6 }}
                  className="cormorant-garamond-light-italic leading-[1.9] text-[17px] sm:text-[18px] mt-2"
                  style={{ color: t.bodyVal }}
                >
                  <span
                    className="eb-garamond-semibold float-left leading-[0.8] mr-3 mt-1"
                    style={{ fontSize: '72px', color: t.headingVal, fontStyle: 'normal' }}
                  >T</span>
                  ucked within the peaceful surroundings of Agroterra Resort, the Golf Course offers more than just a place to play. It is a space where relaxation, nature, and sport come together to create a refreshing experience for beginners, enthusiasts, and seasoned golfers alike.
                </motion.p>

                <div className="my-8 pl-6 py-1" style={{ borderLeft: `3px solid ${t.accentVal}` }}>
                  <p
                    className="eb-garamond-semibold italic leading-snug text-[20px] sm:text-[22px]"
                    style={{ color: t.headingVal }}
                  >
                    "Every moment on the course feels relaxed and unhurried."
                  </p>
                </div>

                {[
                  'The course is thoughtfully designed to blend naturally with its environment. Wide fairways, well-maintained greens, and scenic views create a playing experience that is both enjoyable and visually rewarding.',
                  'One of the most appealing features is its welcoming atmosphere. Guests of all skill levels can enjoy the facility without feeling intimidated. The peaceful surroundings make it an ideal place for practice, casual games, or friendly competitions.',
                  'Beyond the game itself, the golf course offers a perfect escape from the noise and stress of everyday life. Early mornings are especially refreshing, with cool air and soft sunlight setting the tone for a great day.',
                  'The Agroterra Golf Course is also a great choice for social and recreational activities. Families, friends, and corporate groups use the space to relax, bond, and enjoy quality time together.',
                ].map((text, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className="cormorant-garamond-light-italic leading-[1.9] text-[16px] sm:text-[17px] md:text-[18px] mt-5"
                    style={{ color: t.bodyVal }}
                  >
                    {text}
                  </motion.p>
                ))}
              </div>

              <div className="mt-10 pt-8 flex flex-wrap gap-2" style={{ borderTop: `1px solid ${t.borderVal}` }}>
                {['Leisure', 'Golf', 'Nature', 'Resort Life'].map((tag) => (
                  <Chip key={tag} label={tag} t={t} />
                ))}
              </div>

              <div className="mt-8">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.14em] transition-all duration-300"
                  style={{ backgroundColor: t.accentVal, color: t.pageVal, boxShadow: `0 8px 28px ${t.accentVal}40` }}
                >
                  Book a Tee Time
                  <ArrowUpRight size={14}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </article>

          {/* ── Sidebar ── */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-10 space-y-6">
              <div
                className="relative rounded-2xl p-6 sm:p-8"
                style={{
                  backgroundColor: t.surfaceVal,
                  border: `1px solid ${t.borderVal}`,
                  boxShadow: `0 12px 40px rgba(0,0,0,0.1)`,
                }}
              >
                <div className="absolute top-0 left-6 right-6 h-0.5 rounded-full"
                  style={{ background: `linear-gradient(to right, transparent, ${t.accentVal}, transparent)` }} />

                <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: t.accentVal }}>
                  You Might Also Like
                </p>
                <div className="h-px mb-4" style={{ backgroundColor: t.borderVal }} />

                <div className="divide-y" style={{ borderColor: t.borderVal }}>
                  {related.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/blog/${rel.slug}`}
                      className="group flex items-start gap-4 py-4 transition-opacity hover:opacity-75"
                    >
                      <div
                        className="w-16 h-12 relative shrink-0 overflow-hidden rounded-lg"
                        style={{ border: `1px solid ${t.borderVal}` }}
                      >
                        <Image
                          src={rel.src} alt={rel.title} fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3
                          className="eb-garamond-semibold text-[14px] leading-tight mb-1 line-clamp-2 transition-colors"
                          style={{ color: t.headingVal }}
                        >
                          {rel.title}
                        </h3>
                        <p className="text-[12px] line-clamp-2 leading-relaxed" style={{ color: t.mutedVal }}>
                          {rel.excerpt}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div
                className="relative rounded-2xl p-6 sm:p-8"
                style={{ backgroundColor: t.accentVal, boxShadow: `0 12px 40px ${t.accentVal}40` }}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2 opacity-70"
                  style={{ color: t.pageVal }}>
                  Plan Your Visit
                </p>
                <p className="eb-garamond-semibold text-[18px] leading-snug mb-5" style={{ color: t.pageVal }}>
                  Experience the course for yourself
                </p>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 font-bold text-[11px] uppercase tracking-[0.13em] rounded-full px-5 py-2.5 transition-all duration-200"
                  style={{ backgroundColor: t.pageVal, color: t.accentVal }}
                >
                  Book a Tee Time
                  <ArrowUpRight size={12}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </aside>
        </motion.div>
      </div>

      <Divider t={t} />

      {/* ── Footer ── */}
      <footer className="py-8 px-6 text-center" style={{ borderTop: `1px solid ${t.borderVal}` }}>
        <p className="text-[11px] tracking-widest uppercase" style={{ color: t.mutedVal }}>
          © {new Date().getFullYear()} Agroterra Resort · Blog
        </p>
      </footer>
    </div>
  )
}