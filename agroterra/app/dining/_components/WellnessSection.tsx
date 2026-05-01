'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { Theme } from '@/lib/theme'
import { containerVariants, cardVariants } from '@/lib/theme'
import { WELLNESS_ARTICLES, WELLNESS_TABS, WellnessArticle } from '@/data/data'

// Badge colour map per wellness category
const wellnessBadgeStyle = (cat: string): React.CSSProperties => {
  const map: Record<string, { bg: string; color: string; border: string }> = {
    Nutrition: { bg: 'rgba(232,244,220,0.95)', color: '#2e5e14', border: '#a0c870' },
    Wellness:  { bg: 'rgba(255,248,228,0.95)', color: '#7a5010', border: '#c89830' },
    Detox:     { bg: 'rgba(228,240,252,0.95)', color: '#1a4070', border: '#70a0c0' },
    Immunity:  { bg: 'rgba(252,228,228,0.95)', color: '#7a1010', border: '#c07070' },
    Energy:    { bg: 'rgba(228,252,240,0.95)', color: '#106040', border: '#70c0a0' },
    Lifestyle: { bg: 'rgba(240,228,252,0.95)', color: '#501a7a', border: '#a070c0' },
  }
  const s = map[cat] ?? { bg: 'rgba(240,240,240,0.95)', color: '#444', border: '#bbb' }
  return { backgroundColor: s.bg, color: s.color, border: `1px solid ${s.border}` }
}

function WellnessBadge({ cat }: { cat: string }) {
  return (
    <span
      className="text-[9px] font-bold px-2.5 py-0.5 rounded-full tracking-widest uppercase absolute top-3 left-3"
      style={wellnessBadgeStyle(cat)}
    >
      {cat}
    </span>
  )
}

function CardFooter({ readTime, t }: { readTime: string; t: Theme }) {
  return (
    <div
      className="flex items-center justify-between mt-3 pt-3"
      style={{ borderTop: `1px solid ${t.borderVal}` }}
    >
      <span className="text-[11px]" style={{ color: t.mutedVal }}>
        {readTime}
      </span>
      <button
        className="text-[11px] font-semibold flex items-center gap-1 transition-opacity hover:opacity-60"
        style={{
          color: t.accentVal,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        Read Article <ChevronRight size={12} />
      </button>
    </div>
  )
}

export function WellnessSection({ t }: { t: Theme }) {
  const [activeTab, setActiveTab] = useState<string>('All')

  const filtered = WELLNESS_ARTICLES.filter(
    (a) => activeTab === 'All' || a.cat === activeTab
  )

  const heroArticle = filtered[0]
  const restArticles = filtered.slice(1)

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: '6px 18px',
    borderRadius: 9999,
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: '0.4px',
    border: `1px solid ${active ? t.accentVal : t.borderVal}`,
    backgroundColor: active ? t.accentVal : 'transparent',
    color: active ? t.pageVal : t.mutedVal,
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontFamily: 'inherit',
    whiteSpace: 'nowrap' as const,
  })

  return (
    <section className="w-full max-w-5xl px-4 sm:px-6 mb-20">
      {/* Header */}
      <div className="mb-5">
        <p
          className="text-[10px] font-bold uppercase tracking-[0.28em] mb-1"
          style={{ color: t.accentVal }}
        >
          Wellness & Nutrition
        </p>
        <div className="flex items-end justify-between">
          <div>
            <h2
              className="eb-garamond-semibold leading-none"
              style={{ fontSize: 'clamp(22px,3.5vw,34px)', color: t.headingVal }}
            >
              Eat Well, Live Well
            </h2>
            <div className="mt-3 w-10 h-px" style={{ backgroundColor: t.accentVal }} />
          </div>
        </div>
        <p
          className="cormorant-garamond-light-italic text-[14px] sm:text-[15px] mt-3 max-w-lg leading-relaxed"
          style={{ color: t.mutedVal }}
        >
          Our resort nutritionists share expert-backed insights on the foods that fuel your body,
          boost your energy, and help you feel your very best.
        </p>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-5">
        <div className="flex-1 h-px" style={{ backgroundColor: t.ruleLine }} />
        <span style={{ color: t.accentVal, fontSize: 12 }}>✦</span>
        <div className="flex-1 h-px" style={{ backgroundColor: t.ruleLine }} />
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {WELLNESS_TABS.map((tab) => (
          <button key={tab} style={tabStyle(activeTab === tab)} onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      {/* Cards grid
          FIX: `key={activeTab}` forces the motion container to fully remount whenever the
          active filter changes — this ensures the stagger animation replays and all cards
          are visible when switching back to "All" or any other tab. */}
      <motion.div
        key={activeTab}
        className="grid grid-cols-1 sm:grid-cols-3 gap-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {filtered.length === 0 && (
          <div className="col-span-3 text-center py-16">
            <p className="eb-garamond-semibold text-[18px]" style={{ color: t.mutedVal }}>
              No articles in this category
            </p>
          </div>
        )}

        {/* Hero card — spans 2 cols */}
        {heroArticle && (
          <motion.div
            key={`hero-${heroArticle.id}`}
            variants={cardVariants}
            className="sm:col-span-2 flex flex-col sm:flex-row cursor-pointer group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
            style={{
              backgroundColor: t.surfaceVal,
              border: `1px solid ${t.borderVal}`,
              boxShadow: `0 4px 16px rgba(0,0,0,0.07)`,
            }}
          >
            {/* Image — left side on sm+ */}
            <div
              className="relative sm:w-[55%] h-52 sm:h-auto shrink-0 overflow-hidden"
              style={{ minHeight: 220 }}
            >
              <Image
                src={heroArticle.img}
                alt={heroArticle.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(10,20,5,0.4) 0%, transparent 60%)',
                }}
              />
              <WellnessBadge cat={heroArticle.cat} />
            </div>
            {/* Text — right side */}
            <div className="flex flex-col justify-center p-5 sm:p-7 flex-1">
              <p
                className="eb-garamond-semibold leading-snug mb-3 group-hover:opacity-70 transition-opacity"
                style={{
                  fontSize: 'clamp(15px,1.6vw,19px)',
                  color: t.headingVal,
                  fontStyle: 'italic',
                }}
              >
                {heroArticle.title}
              </p>
              <p
                className="cormorant-garamond-light-italic text-[13px] leading-relaxed flex-1"
                style={{ color: t.mutedVal }}
              >
                {heroArticle.excerpt}
              </p>
              <CardFooter readTime={heroArticle.readTime} t={t} />
            </div>
          </motion.div>
        )}

        {/* Regular cards */}
        {restArticles.map((article) => (
          <motion.div
            key={article.id}
            variants={cardVariants}
            className="flex flex-col cursor-pointer group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
            style={{
              backgroundColor: t.surfaceVal,
              border: `1px solid ${t.borderVal}`,
              boxShadow: `0 4px 16px rgba(0,0,0,0.07)`,
            }}
          >
            {/* Image */}
            <div className="relative w-full h-44 sm:h-48 overflow-hidden shrink-0">
              <Image
                src={article.img}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(10,20,5,0.42) 0%, transparent 60%)',
                }}
              />
              <WellnessBadge cat={article.cat} />
            </div>
            {/* Body */}
            <div className="flex flex-col flex-1 p-4 gap-2">
              <p
                className="eb-garamond-semibold text-[14px] sm:text-[15px] leading-snug group-hover:opacity-70 transition-opacity"
                style={{ color: t.headingVal, fontStyle: 'italic' }}
              >
                {article.title}
              </p>
              <p
                className="cormorant-garamond-light-italic text-[12px] leading-relaxed flex-1"
                style={{ color: t.mutedVal }}
              >
                {article.excerpt}
              </p>
              <CardFooter readTime={article.readTime} t={t} />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <div className="mt-10 text-center">
        <button
          className="text-[11px] font-bold uppercase tracking-[0.15em] px-9 py-3.5 rounded-full transition-all duration-200 hover:opacity-80"
          style={{
            border: `1px solid ${t.accentVal}`,
            color: t.accentVal,
            background: 'transparent',
            fontFamily: 'inherit',
            letterSpacing: '1.5px',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = t.accentVal
            ;(e.currentTarget as HTMLButtonElement).style.color = t.pageVal
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'
            ;(e.currentTarget as HTMLButtonElement).style.color = t.accentVal
          }}
        >
          Explore All Articles
        </button>
      </div>
    </section>
  )
}