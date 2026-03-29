'use client'
// components/HomeClient.tsx
// Receives pre-fetched RSS articles as props and renders the full page.
// All animations and interactivity live here (client component).

import Navbar from '@/components/Navbar'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Play, Phone } from 'lucide-react'
import bg from '@/public/sheedx.svg'
import type { Article } from '@/lib/rss'
import {
  SectionHeader,
  HeroCard,
  SmallCard,
  GridCard,
  SidebarFeaturedCard,
} from '@/components/NewsCard'

interface Props {
  politics:      Article[]
  entertainment: Article[]
  sports:        Article[]
  featured:      Article
}

// ── Active tab state is client-side only ──────────────────────────────────
import { useState } from 'react'

const TABS = ['Politics', 'Entertainment', 'Sports'] as const
type Tab = (typeof TABS)[number]

export default function HomeClient({ politics, entertainment, sports, featured }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('Politics')

  const sidebarArticles: Article[] =
    activeTab === 'Politics'      ? politics.slice(0, 3) :
    activeTab === 'Entertainment' ? entertainment.slice(0, 3) :
                                    sports.slice(0, 3)

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col min-h-screen w-full bg-white items-center">

        {/* ── HERO ── */}
        <div className="w-full mb-6 sm:mb-8 lg:mb-10 relative">
          <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[93vh]">
            <Image src={bg} alt="Background image" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-[#00000075] w-full h-full flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-5 lg:py-6">
              <Navbar />
              <div className="h-full flex flex-col text-white items-center justify-center leading-relaxed">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="flex flex-col justify-center items-center mt-6 sm:mt-8 lg:mt-12 px-4"
                >
                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-center uppercase eb-garamond-semibold text-[24px] sm:text-[32px] md:text-[36px] lg:text-[50px] welcome-text leading-tight"
                  >
                    SHEEDX FM
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-white/70 text-sm sm:text-base mt-2 italic tracking-wide"
                  >
                    Where nation&apos;s pulse beats loudest
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-wrap gap-3 mt-8"
                  >
                    <button className="flex items-center gap-2 bg-transparent border border-white text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300">
                      <Play size={16} fill="currentColor" />
                      LISTEN LIVE
                    </button>
                    <button className="flex items-center gap-2 bg-transparent border border-white text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300">
                      <Phone size={16} />
                      CALL US
                    </button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* ── PAGE BODY ── */}
        <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 pb-16">

          {/* ── FEATURED STORY ── */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <Link
                href={featured.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-full aspect-16/7 rounded-md overflow-hidden bg-gray-800 cursor-pointer group block"
              >
                {featured.image && (
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    unoptimized
                  />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 z-10 max-w-2xl">
                  <span className="bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm">
                    Featured
                  </span>
                  <h3 className="text-white text-xl sm:text-2xl font-extrabold mt-2 leading-snug line-clamp-2">
                    {featured.title}
                  </h3>
                  <p className="text-white/60 text-xs mt-1">{featured.source}</p>
                </div>
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-white/20 border-2 border-white flex items-center justify-center group-hover:bg-white/40 transition-all duration-300">
                    <Play size={22} className="text-white ml-1" fill="white" />
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* ── TWO-COLUMN LAYOUT ── */}
          <div className="flex flex-col lg:flex-row gap-8">

            {/* ── LEFT: News Sections ── */}
            <div className="flex-1 min-w-0">

              {/* POLITICS */}
              {politics.length > 0 && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="mb-10"
                >
                  <SectionHeader title="Politics" />
                  <div className="flex flex-col sm:flex-row gap-4">
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
                  className="mb-10"
                >
                  <SectionHeader title="Entertainment" />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                  className="mb-10"
                >
                  <SectionHeader title="Sports" />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
              className="w-full lg:w-56 shrink-0"
            >
              {/* Category tabs */}
              <div className="flex gap-2 mb-4 flex-wrap">
                {TABS.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-[11px] font-bold px-3 py-1 rounded-sm border transition-colors ${
                      activeTab === tab
                        ? 'bg-red-600 text-white border-red-600'
                        : 'bg-white text-gray-600 border-gray-300 hover:border-red-400 hover:text-red-600'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Sidebar article cards */}
              <div className="flex flex-col gap-4">
                {sidebarArticles.map((a) => (
                  <SidebarFeaturedCard key={a.id} article={a} />
                ))}
              </div>

              {/* SheedX FM branding card */}
              <div className="mt-4 rounded overflow-hidden bg-green-700 flex items-center justify-center py-6 px-3 text-center">
                <div>
                  <p className="text-white text-[10px] font-bold uppercase tracking-widest">SheedX FM</p>
                  <p className="text-yellow-300 text-[13px] font-extrabold mt-1 leading-tight">
                    Your #1 News Source
                  </p>
                  <span className="bg-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-sm mt-2 inline-block">
                    LIVE NOW
                  </span>
                </div>
              </div>
            </motion.aside>

          </div>
        </div>
      </main>
    </div>
  )
}