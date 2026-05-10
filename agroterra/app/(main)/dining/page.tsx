'use client'

import Navbar from '@/components/Navbar'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import bg from '@/public/kitchen.png'

// ── Theme ─────────────────────────────────────────────────────────
import { light, dark, EASE } from '@/lib/theme'

// ── Shared UI ─────────────────────────────────────────────────────
import { Badge, SectionHeading, Divider } from './_components/ui'

// ── Data ──────────────────────────────────────────────────────────
import { categories, topCategories, weeklyFeatured, weeklySide } from '@/data/data'

// ── Animation variants ────────────────────────────────────────────
import { containerVariants, cardVariants } from '@/lib/theme'

// ── Section components ────────────────────────────────────────────
import { MealReservation } from './_components/MealReservation'
import { ExploreLatestRecipes } from './_components/ExploreLatestRecipes'
import { AllRecipesOverlay } from './_components/AllRecipesOverlay'
import { WellnessSection } from './_components/WellnessSection'

// ── Page ──────────────────────────────────────────────────────────
const Page = () => {
  const [isDark, setIsDark] = useState(false)
  const [showAllRecipes, setShowAllRecipes] = useState(false)
  const t = isDark ? dark : light

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) setIsDark(true)
  }, [])

  return (
    <div
      className="eb-garamond transition-colors duration-300 overflow-x-hidden"
      style={{ backgroundColor: t.pageVal }}
    >
      {/* All Recipes Overlay */}
      <AnimatePresence>
        {showAllRecipes && (
          <AllRecipesOverlay t={t} onClose={() => setShowAllRecipes(false)} />
        )}
      </AnimatePresence>

      {/* Theme toggle */}
      <motion.button
        onClick={() => setIsDark((d) => !d)}
        aria-label="Toggle dark mode"
        className="fixed bottom-6 right-6 z-50 cursor-pointer w-12 h-12 rounded-full flex items-center justify-center"
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
        whileTap={{ scale: 0.88, rotate: -15 }}
      >
        <motion.div
          animate={{ rotate: isDark ? 0 : 360 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </motion.div>
      </motion.button>

      <main className="flex flex-col min-h-screen w-full items-center">

        {/* ── HERO ── */}
        <div className="w-full mb-6 sm:mb-10 relative">
          <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[93vh]">
            <Image src={bg} alt="Agroterra Kitchen" fill className="object-cover" priority />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to bottom,rgba(0,0,0,0.68) 0%,rgba(0,0,0,0.08) 42%,rgba(0,0,0,0.82) 100%)',
              }}
            />
            <div className="absolute inset-x-0 top-0 z-20 px-4 sm:px-8 md:px-14 py-4 sm:py-6">
              <Navbar />
            </div>
            <div className="absolute bottom-16 sm:bottom-20 left-0 right-0 z-10 px-6 sm:px-12 md:px-20 lg:px-28">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.15 }}
                className="text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-white/50 mb-4"
              >
                Agroterra Resort · Dining
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE }}
                className="eb-garamond-semibold text-white leading-[0.92] uppercase"
                style={{ fontSize: 'clamp(44px,9vw,110px)' }}
              >
                Our
                <br />
                Dining
              </motion.h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
                className="w-16 h-px mt-6 mb-5 origin-left"
                style={{ backgroundColor: t.accentVal }}
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.75 }}
                className="eb-garamond-italic text-white/70 max-w-sm"
                style={{ fontSize: 'clamp(16px,2.5vw,22px)' }}
              >
                &ldquo;A place that celebrates life.&rdquo;
              </motion.p>
            </div>
          </div>
        </div>

        {/* ── CATEGORY CARDS ── */}
        <section className="w-full max-w-5xl px-4 sm:px-6 mb-14">
          <SectionHeading title="Browse by Category" t={t} />
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {categories.map((cat) => (
              <motion.div
                key={cat.label}
                variants={cardVariants}
                className="flex flex-col cursor-pointer group"
              >
                <div
                  className="relative w-full aspect-square overflow-hidden rounded-2xl"
                  style={{
                    border: `1px solid ${t.borderVal}`,
                    boxShadow: `0 8px 32px rgba(0,0,0,0.12)`,
                  }}
                >
                  <Image
                    src={cat.img}
                    alt={cat.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)',
                    }}
                  />
                  <div className="absolute bottom-3 left-3">
                    <Badge label={cat.label} t={t} />
                  </div>
                </div>
                <p
                  className="mt-3 text-center text-[14px] sm:text-[15px] leading-snug px-1 cormorant-garamond-light-italic transition-opacity group-hover:opacity-60"
                  style={{ color: t.bodyVal }}
                >
                  {cat.title}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <div className="w-full max-w-5xl px-4 sm:px-6">
          <Divider t={t} />
        </div>

        {/* ── MEAL RESERVATION ── */}
        <MealReservation t={t} />

        {/* ── EXPLORE LATEST RECIPES ── */}
        <ExploreLatestRecipes t={t} onViewAll={() => setShowAllRecipes(true)} />

        <div className="w-full max-w-5xl px-4 sm:px-6">
          <Divider t={t} />
        </div>

        {/* ── TOP CATEGORIES ── */}
        <section
          className="w-full py-12 sm:py-16 px-4 sm:px-6 mb-14"
          style={{
            backgroundColor: t.tintVal,
            borderTop: `1px solid ${t.borderVal}`,
            borderBottom: `1px solid ${t.borderVal}`,
          }}
        >
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <p
              className="text-[10px] font-bold uppercase tracking-[0.28em] mb-2"
              style={{ color: t.accentVal }}
            >
              Agroterra Dining
            </p>
            <h2
              className="eb-garamond-semibold mb-3 text-center"
              style={{ fontSize: 'clamp(22px,3.5vw,34px)', color: t.headingVal }}
            >
              Our Top Categories
            </h2>
            <div className="w-10 h-px mb-4" style={{ backgroundColor: t.accentVal }} />
            <p
              className="cormorant-garamond-light-italic text-[15px] text-center max-w-sm mb-10 leading-relaxed"
              style={{ color: t.mutedVal }}
            >
              Browned Butter And Brown Sugar Caramelly Goodness, Crispy Edges Thick And Soft
              Centers And Melty Little Puddles
            </p>
            <motion.div
              className="flex flex-wrap justify-center gap-6 sm:gap-10"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {topCategories.map((cat) => (
                <motion.div
                  key={cat.label}
                  variants={cardVariants}
                  className="flex flex-col items-center gap-3 cursor-pointer group"
                >
                  <div
                    className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden transition-all duration-300"
                    style={{
                      border: `3px solid ${t.accentVal}`,
                      boxShadow: `0 0 0 4px ${t.chipBg}, 0 8px 24px rgba(0,0,0,0.15)`,
                    }}
                  >
                    <Image
                      src={cat.img}
                      alt={cat.label}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-[0.18em]"
                    style={{ color: t.accentVal }}
                  >
                    {cat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── WEEKLY BEST RECIPES ── */}
        <section className="w-full max-w-5xl px-4 sm:px-6 mb-14">
          <SectionHeading title="Weekly Best Recipes" t={t} viewAll />
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={cardVariants} className="cursor-pointer group">
              <div
                className="relative w-full h-64 sm:h-full min-h-70 overflow-hidden rounded-2xl"
                style={{
                  border: `1px solid ${t.borderVal}`,
                  boxShadow: `0 16px 48px rgba(0,0,0,0.15)`,
                }}
              >
                <Image
                  src={weeklyFeatured.img}
                  alt={weeklyFeatured.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)',
                  }}
                />
                <div
                  className="absolute top-0 left-10 right-10 h-0.5 rounded-full"
                  style={{
                    background: `linear-gradient(to right, transparent, ${t.accentVal}, transparent)`,
                  }}
                />
                <div className="absolute bottom-5 left-5 right-5">
                  <Badge label={weeklyFeatured.label} t={t} />
                  <h3 className="mt-3 text-white eb-garamond-semibold text-[18px] sm:text-[22px] leading-snug group-hover:opacity-80 transition-opacity">
                    {weeklyFeatured.title}
                  </h3>
                </div>
              </div>
            </motion.div>
            <div className="flex flex-col gap-4 justify-between">
              {weeklySide.map((r) => (
                <motion.div
                  key={r.title}
                  variants={cardVariants}
                  className="flex gap-4 cursor-pointer group items-center p-3 rounded-2xl transition-colors duration-200"
                  style={{ border: `1px solid ${t.borderVal}`, backgroundColor: t.surfaceVal }}
                >
                  <div
                    className="relative w-24 h-20 sm:w-28 shrink-0 overflow-hidden rounded-xl"
                    style={{ border: `1px solid ${t.borderVal}`, minHeight: 80 }}
                  >
                    <Image
                      src={r.img}
                      alt={r.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-2">
                    <Badge label={r.label} t={t} />
                    <p
                      className="text-[14px] sm:text-[15px] eb-garamond-semibold leading-snug line-clamp-2 group-hover:opacity-60 transition-opacity"
                      style={{ color: t.headingVal }}
                    >
                      {r.title}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <div className="w-full max-w-5xl px-4 sm:px-6">
          <Divider t={t} />
        </div>

        {/* ── WELLNESS & NUTRITION ── */}
        <WellnessSection t={t} />

        {/* ── Footer ── */}
        <footer
          className="w-full py-8 px-6 text-center"
          style={{ borderTop: `1px solid ${t.borderVal}` }}
        >
          <p className="text-[11px] tracking-widest uppercase" style={{ color: t.mutedVal }}>
            © {new Date().getFullYear()} Agroterra Resort · Dining
          </p>
        </footer>
      </main>
    </div>
  )
}

export default Page