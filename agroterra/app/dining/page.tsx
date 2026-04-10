"use client"

import Navbar from '@/components/Navbar'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import bg from '@/public/kitchen.png'
import dinner from '@/public/egusi.svg'
import breakfast from '@/public/breakfast.svg'
import dessert from '@/public/lunch.svg'
import rbreakfast from '@/public/rbreakfast.svg'
import rlunch from '@/public/rlunch.svg'
import rappetizer from '@/public/rappetizer.svg'
import drinks from '@/public/wine.jpg'
import ham from '@/public/ham.svg'
import jollof from '@/public/jollof.svg'
import puff from '@/public/puffpuff.svg'

// ── Easing ────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const

// ── Theme ─────────────────────────────────────────────────────────
type Theme = {
  pageVal:    string
  surfaceVal: string
  borderVal:  string
  accentVal:  string
  headingVal: string
  bodyVal:    string
  mutedVal:   string
  ruleLine:   string
  tintVal:    string
  chipBg:     string
  chipBorder: string
}

const light: Theme = {
  pageVal:    '#f5f2eb',
  surfaceVal: '#ffffff',
  borderVal:  '#ddd5c4',
  accentVal:  '#1e5e32',
  headingVal: '#0f1f0f',
  bodyVal:    '#3a4e3a',
  mutedVal:   '#7a8c6a',
  ruleLine:   '#cec8bc',
  tintVal:    '#e8f0e4',
  chipBg:     'rgba(30,94,50,0.08)',
  chipBorder: 'rgba(30,94,50,0.2)',
}

const dark: Theme = {
  pageVal:    '#080e08',
  surfaceVal: '#0f180f',
  borderVal:  '#243424',
  accentVal:  '#7ec850',
  headingVal: '#e0f0c8',
  bodyVal:    '#9abf7e',
  mutedVal:   '#4e6e3e',
  ruleLine:   '#1a2a1a',
  tintVal:    '#0d1f0d',
  chipBg:     'rgba(126,200,80,0.08)',
  chipBorder: 'rgba(126,200,80,0.22)',
}

// ── Data ──────────────────────────────────────────────────────────
const categories = [
  { label: 'DINNER',    title: 'Really Quick Traditional Dishes',   img: dinner    },
  { label: 'BREAKFAST', title: 'Announcing The Spring Bucket List',  img: breakfast },
  { label: 'DESSERT',   title: 'Favorite Snacks',                    img: dessert   },
  { label: 'DRINKS',    title: 'Refreshing Drinks',                  img: drinks    },
]

const topCategories = [
  { label: 'BREAKFAST', img: ham     },
  { label: 'DESSERT',   img: dessert },
  { label: 'LUNCH',     img: jollof  },
  { label: 'APPETIZER', img: puff    },
  { label: 'DINNER',    img: dinner  },
]

const weeklyFeatured = {
  label: 'BREAKFAST',
  title: 'Have The Best Delicacies At Your Door Step',
  img: dinner,
}
const weeklySide = [
  { label: 'LUNCH',     title: 'Exploring The Potential Of Cooking International Cuisines',  img: jollof    },
  { label: 'DESSERT',   title: 'Favorite Browned Butter Chocolate Cookies Daily Breakfast',  img: dessert   },
  { label: 'APPETIZER', title: 'The Potentially Dangerous Non Sibility Of Cookie Notices',   img: rappetizer },
]

const healthyRecipes = [
  { label: 'LUNCH',     title: 'Have The Best Cuisine In Our Resort',                       img: jollof    },
  { label: 'BREAKFAST', title: 'The Best Handoff Is No Handoff',                            img: breakfast },
  { label: 'DESSERT',   title: 'One Of The Best Desserts In The Country',                   img: dessert   },
  { label: 'PIZZA',     title: 'How To Make Puff Puff in Thirty Minutes.',                  img: puff      },
  { label: 'DINNER',    title: 'Why You Should Consider Trying Our Traditional Recipe',     img: dinner    },
  { label: 'APPETIZER', title: 'How To Create Dynamic Donut Plating Works',                 img: rappetizer },
]

const recipes = [
  { label: 'BREAKFAST', title: 'The Potentially Dangerous Non-Accessibility Of Cookie', img: rbreakfast },
  { label: 'LUNCH',     title: 'One-Pan Baked Sausage And Lentils',                     img: rlunch     },
]
const featuredRecipe = {
  label: 'APPETIZER',
  title: "Food Presentation At It's Best!",
  description: 'Browned Butter And Brown Sugar Caramelly Goodness, Crispy Edges Thick And Soft Centers And Melty Little Puddles Of Chocolate My First Favorite Thing About These Browned Butter...',
  img: rappetizer,
}

// ── Animation variants ─────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const cardVariants = {
  hidden:   { opacity: 0, y: 30 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

// ── Label badge ───────────────────────────────────────────────────
function Badge({ label, t }: { label: string; t: Theme }) {
  return (
    <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full tracking-widest uppercase"
      style={{ backgroundColor: t.accentVal, color: t.pageVal }}>
      {label}
    </span>
  )
}

// ── Section heading ───────────────────────────────────────────────
function SectionHeading({ title, t, viewAll }: { title: string; t: Theme; viewAll?: boolean }) {
  return (
    <div className="flex items-end justify-between mb-5">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] mb-1"
          style={{ color: t.accentVal }}>
          Agroterra Dining
        </p>
        <h2 className="eb-garamond-semibold leading-none"
          style={{ fontSize: 'clamp(22px,3.5vw,34px)', color: t.headingVal }}>
          {title}
        </h2>
        <div className="mt-3 w-10 h-px" style={{ backgroundColor: t.accentVal }} />
      </div>
      {viewAll && (
        <button className="text-[11px] font-bold uppercase tracking-[0.14em] transition-opacity hover:opacity-60"
          style={{ color: t.mutedVal }}>
          View All →
        </button>
      )}
    </div>
  )
}

// ── Decorative divider ─────────────────────────────────────────────
function Divider({ t }: { t: Theme }) {
  return (
    <div className="flex items-center gap-4 my-6">
      <div className="flex-1 h-px" style={{ backgroundColor: t.ruleLine }} />
      <div className="w-1.5 h-1.5 rounded-full rotate-45"
        style={{ backgroundColor: t.accentVal, opacity: 0.5 }} />
      <div className="flex-1 h-px" style={{ backgroundColor: t.ruleLine }} />
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────
const Page = () => {
  const [isDark, setIsDark] = useState(false)
  const t = isDark ? dark : light

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) setIsDark(true)
  }, [])

  return (
    <div className="eb-garamond transition-colors duration-300 overflow-x-hidden"
      style={{ backgroundColor: t.pageVal }}>

      {/* ── Theme toggle ── */}
      <button onClick={() => setIsDark(d => !d)} aria-label="Toggle dark mode"
        className="fixed bottom-6 right-6 z-50 cursor-pointer w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          backgroundColor: isDark ? '#0f180f' : '#ede8df',
          color:           t.accentVal,
          border:          `1px solid ${t.borderVal}`,
          boxShadow:       `0 4px 24px ${t.accentVal}28`,
        }}>
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <main className="flex flex-col min-h-screen w-full items-center">

        {/* ── HERO ── */}
        <div className="w-full mb-6 sm:mb-10 relative">
          <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[93vh]">
            <Image src={bg} alt="Agroterra Kitchen" fill className="object-cover" priority />
            {/* gradient: dark at top for nav, dark at bottom for text */}
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to bottom,rgba(0,0,0,0.68) 0%,rgba(0,0,0,0.08) 42%,rgba(0,0,0,0.82) 100%)' }} />

            {/* Navbar sits in the hero */}
            <div className="absolute inset-x-0 top-0 z-20 px-4 sm:px-8 md:px-14 py-4 sm:py-6">
              <Navbar />
            </div>

            {/* Hero text */}
            <div className="absolute bottom-16 sm:bottom-20 left-0 right-0 z-10 px-6 sm:px-12 md:px-20 lg:px-28">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.15 }}
                className="text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-white/50 mb-4">
                Agroterra Resort · Dining
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: EASE }}
                className="eb-garamond-semibold text-white leading-[0.92] uppercase"
                style={{ fontSize: 'clamp(44px,9vw,110px)' }}>
                Our<br />Dining
              </motion.h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
                className="w-16 h-px mt-6 mb-5 origin-left"
                style={{ backgroundColor: t.accentVal }} />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.75 }}
                className="eb-garamond-italic text-white/70 max-w-sm"
                style={{ fontSize: 'clamp(16px,2.5vw,22px)' }}>
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
              <motion.div key={cat.label} variants={cardVariants}
                className="flex flex-col cursor-pointer group">
                <div className="relative w-full aspect-square overflow-hidden rounded-2xl"
                  style={{ border: `1px solid ${t.borderVal}`, boxShadow: `0 8px 32px rgba(0,0,0,0.12)` }}>
                  <Image src={cat.img} alt={cat.title} fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  {/* Bottom overlay */}
                  <div className="absolute inset-0 rounded-2xl"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)' }} />
                  <div className="absolute bottom-3 left-3">
                    <Badge label={cat.label} t={t} />
                  </div>
                </div>
                <p className="mt-3 text-center text-[14px] sm:text-[15px] leading-snug px-1 cormorant-garamond-light-italic transition-opacity group-hover:opacity-60"
                  style={{ color: t.bodyVal }}>
                  {cat.title}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <div className="w-full max-w-5xl px-4 sm:px-6"><Divider t={t} /></div>

        {/* ── NEWSLETTER BANNER ── */}
        <section className="w-full py-10 px-4 sm:px-6 mb-14"
          style={{ backgroundColor: t.tintVal, borderTop: `1px solid ${t.borderVal}`, borderBottom: `1px solid ${t.borderVal}` }}>
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-6">
            <div className="shrink-0 text-center sm:text-left">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] mb-1"
                style={{ color: t.accentVal }}>
                Reservations
              </p>
              <p className="eb-garamond-semibold text-[20px] sm:text-[22px] leading-tight"
                style={{ color: t.headingVal }}>
                Get Your Food<br />Served To You
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full">
              <input type="text" placeholder="Name"
                className="flex-1 rounded-full px-4 py-2.5 text-[13px] outline-none transition-colors"
                style={{ backgroundColor: t.surfaceVal, border: `1px solid ${t.borderVal}`, color: t.bodyVal }} />
              <input type="email" placeholder="E-mail"
                className="flex-1 rounded-full px-4 py-2.5 text-[13px] outline-none transition-colors"
                style={{ backgroundColor: t.surfaceVal, border: `1px solid ${t.borderVal}`, color: t.bodyVal }} />
              <button
                className="rounded-full px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.13em] whitespace-nowrap transition-opacity hover:opacity-80"
                style={{ backgroundColor: t.accentVal, color: t.pageVal }}>
                Submit Now →
              </button>
            </div>
          </div>
        </section>

        {/* ── EXPLORE LATEST RECIPES ── */}
        <section className="w-full max-w-5xl px-4 sm:px-6 mb-16">
          <SectionHeading title="Explore Latest Recipes" t={t} viewAll />
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Featured */}
            <motion.div variants={cardVariants} className="sm:col-span-2 flex flex-col cursor-pointer group">
              <div className="relative w-full h-64 sm:h-80 overflow-hidden rounded-2xl"
                style={{ border: `1px solid ${t.borderVal}`, boxShadow: `0 16px 48px rgba(0,0,0,0.15)` }}>
                <Image src={featuredRecipe.img} alt={featuredRecipe.title} fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 rounded-2xl"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)' }} />
                {/* Top accent bar */}
                <div className="absolute top-0 left-10 right-10 h-0.5 rounded-full"
                  style={{ background: `linear-gradient(to right, transparent, ${t.accentVal}, transparent)` }} />
                <div className="absolute bottom-4 left-4 right-4">
                  <Badge label={featuredRecipe.label} t={t} />
                  <h3 className="mt-2 text-white eb-garamond-semibold leading-tight text-[18px] sm:text-[22px] group-hover:opacity-80 transition-opacity">
                    {featuredRecipe.title}
                  </h3>
                </div>
              </div>
              <p className="mt-3 text-[14px] leading-relaxed cormorant-garamond-light-italic line-clamp-3"
                style={{ color: t.mutedVal }}>
                {featuredRecipe.description}
              </p>
            </motion.div>

            {/* Side cards */}
            <div className="flex flex-col gap-4">
              {recipes.map((r) => (
                <motion.div key={r.title} variants={cardVariants} className="flex flex-col cursor-pointer group">
                  <div className="relative w-full h-36 sm:h-40 overflow-hidden rounded-2xl"
                    style={{ border: `1px solid ${t.borderVal}`, boxShadow: `0 8px 24px rgba(0,0,0,0.12)` }}>
                    <Image src={r.img} alt={r.title} fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 rounded-2xl"
                      style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)' }} />
                    <div className="absolute bottom-3 left-3">
                      <Badge label={r.label} t={t} />
                    </div>
                  </div>
                  <p className="mt-2 text-[13px] cormorant-garamond-light-italic leading-snug group-hover:opacity-60 transition-opacity"
                    style={{ color: t.bodyVal }}>
                    {r.title}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <div className="w-full max-w-5xl px-4 sm:px-6"><Divider t={t} /></div>

        {/* ── TOP CATEGORIES ── */}
        <section className="w-full py-12 sm:py-16 px-4 sm:px-6 mb-14"
          style={{ backgroundColor: t.tintVal, borderTop: `1px solid ${t.borderVal}`, borderBottom: `1px solid ${t.borderVal}` }}>
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] mb-2"
              style={{ color: t.accentVal }}>
              Agroterra Dining
            </p>
            <h2 className="eb-garamond-semibold mb-3 text-center"
              style={{ fontSize: 'clamp(22px,3.5vw,34px)', color: t.headingVal }}>
              Our Top Categories
            </h2>
            <div className="w-10 h-px mb-4" style={{ backgroundColor: t.accentVal }} />
            <p className="cormorant-garamond-light-italic text-[15px] text-center max-w-sm mb-10 leading-relaxed"
              style={{ color: t.mutedVal }}>
              Browned Butter And Brown Sugar Caramelly Goodness, Crispy Edges
              Thick And Soft Centers And Melty Little Puddles
            </p>
            <motion.div
              className="flex flex-wrap justify-center gap-6 sm:gap-10"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {topCategories.map((cat) => (
                <motion.div key={cat.label} variants={cardVariants}
                  className="flex flex-col items-center gap-3 cursor-pointer group">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden transition-all duration-300"
                    style={{
                      border: `3px solid ${t.accentVal}`,
                      boxShadow: `0 0 0 4px ${t.chipBg}, 0 8px 24px rgba(0,0,0,0.15)`,
                    }}>
                    <Image src={cat.img} alt={cat.label} fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em]"
                    style={{ color: t.accentVal }}>
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
            {/* Featured */}
            <motion.div variants={cardVariants} className="cursor-pointer group">
              <div className="relative w-full h-64 sm:h-full min-h-70 overflow-hidden rounded-2xl"
                style={{ border: `1px solid ${t.borderVal}`, boxShadow: `0 16px 48px rgba(0,0,0,0.15)` }}>
                <Image src={weeklyFeatured.img} alt={weeklyFeatured.title} fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 rounded-2xl"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)' }} />
                {/* Top accent bar */}
                <div className="absolute top-0 left-10 right-10 h-0.5 rounded-full"
                  style={{ background: `linear-gradient(to right, transparent, ${t.accentVal}, transparent)` }} />
                <div className="absolute bottom-5 left-5 right-5">
                  <Badge label={weeklyFeatured.label} t={t} />
                  <h3 className="mt-3 text-white eb-garamond-semibold text-[18px] sm:text-[22px] leading-snug group-hover:opacity-80 transition-opacity">
                    {weeklyFeatured.title}
                  </h3>
                </div>
              </div>
            </motion.div>

            {/* Side list */}
            <div className="flex flex-col gap-4 justify-between">
              {weeklySide.map((r) => (
                <motion.div key={r.title} variants={cardVariants}
                  className="flex gap-4 cursor-pointer group items-center p-3 rounded-2xl transition-colors duration-200"
                  style={{ border: `1px solid ${t.borderVal}`, backgroundColor: t.surfaceVal }}>
                  <div className="relative w-24 h-20 sm:w-28 sm:h-22 shrink-0 overflow-hidden rounded-xl"
                    style={{ border: `1px solid ${t.borderVal}` }}>
                    <Image src={r.img} alt={r.title} fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-col justify-center gap-2">
                    <Badge label={r.label} t={t} />
                    <p className="text-[14px] sm:text-[15px] eb-garamond-semibold leading-snug line-clamp-2 group-hover:opacity-60 transition-opacity"
                      style={{ color: t.headingVal }}>
                      {r.title}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <div className="w-full max-w-5xl px-4 sm:px-6"><Divider t={t} /></div>

        {/* ── HEALTHY RECIPES ── */}
        <section className="w-full max-w-5xl px-4 sm:px-6 mb-20">
          <SectionHeading title="Healthy Recipes" t={t} />
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {healthyRecipes.map((r) => (
              <motion.div key={r.title} variants={cardVariants}
                className="flex flex-col cursor-pointer group">
                <div className="relative w-full aspect-4/3 overflow-hidden rounded-2xl"
                  style={{ border: `1px solid ${t.borderVal}`, boxShadow: `0 8px 24px rgba(0,0,0,0.10)` }}>
                  <Image src={r.img} alt={r.title} fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 rounded-2xl"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)' }} />
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                    <Badge label={r.label} t={t} />
                  </div>
                </div>
                <p className="mt-3 text-center text-[13px] sm:text-[14px] cormorant-garamond-light-italic leading-snug px-1 line-clamp-2 group-hover:opacity-60 transition-opacity"
                  style={{ color: t.bodyVal }}>
                  {r.title}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── Footer ── */}
        <footer className="w-full py-8 px-6 text-center"
          style={{ borderTop: `1px solid ${t.borderVal}` }}>
          <p className="text-[11px] tracking-widest uppercase" style={{ color: t.mutedVal }}>
            © {new Date().getFullYear()} Agroterra Resort · Dining
          </p>
        </footer>

      </main>
    </div>
  )
}

export default Page