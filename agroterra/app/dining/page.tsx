"use client"

import Navbar from '@/components/Navbar'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Sun, Moon, ArrowRight, ChevronLeft, Check, X, Search, Clock, ChevronRight } from 'lucide-react'
import bg from '@/public/kitchen.png'
import imgOfeAkwu from '@/public/ofe-akwu.png'
import imgAkaraOgi from '@/public/akara & ogi.jpeg'
import imgSuya from '@/public/Suya.jpg'
import imgPuffPuff from '@/public/puff puff2.png'
import imgYamEgg from '@/public/yam and egg.jpg'
import imgOhaSoup from '@/public/oha-soup.jpg'
import imgKunu from '@/public/Kunu.png'
import imgChinChin from '@/public/chin chin.jpg'
import imgBangaSoup from '@/public/banga soup.jpg'
import rappetizer from '@/public/rappetizer.svg'
import dinner from '@/public/egusi.svg'
import breakfast from '@/public/breakfast.svg'
import dessert from '@/public/lunch.svg'
import drinks from '@/public/wine.jpg'
import ham from '@/public/ham.svg'
import jollof from '@/public/jollof.svg'
import puff from '@/public/puffpuff.svg'

// ── Easing ────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const

// ── Theme ─────────────────────────────────────────────────────────
type Theme = {
  pageVal: string
  surfaceVal: string
  borderVal: string
  accentVal: string
  headingVal: string
  bodyVal: string
  mutedVal: string
  ruleLine: string
  tintVal: string
  chipBg: string
  chipBorder: string
}

const light: Theme = {
  pageVal: '#f5f2eb',
  surfaceVal: '#ffffff',
  borderVal: '#ddd5c4',
  accentVal: '#1e5e32',
  headingVal: '#0f1f0f',
  bodyVal: '#3a4e3a',
  mutedVal: '#7a8c6a',
  ruleLine: '#cec8bc',
  tintVal: '#e8f0e4',
  chipBg: 'rgba(30,94,50,0.08)',
  chipBorder: 'rgba(30,94,50,0.2)',
}

const dark: Theme = {
  pageVal: '#080e08',
  surfaceVal: '#0f180f',
  borderVal: '#243424',
  accentVal: '#7ec850',
  headingVal: '#e0f0c8',
  bodyVal: '#9abf7e',
  mutedVal: '#4e6e3e',
  ruleLine: '#1a2a1a',
  tintVal: '#0d1f0d',
  chipBg: 'rgba(126,200,80,0.08)',
  chipBorder: 'rgba(126,200,80,0.22)',
}

// ── Meal data ─────────────────────────────────────────────────────
type MealItem = { name: string; desc: string; cat: string }

const MEALS: { section: string; items: MealItem[] }[] = [
  {
    section: 'Breakfast',
    items: [
      { name: 'Agroterra Full Breakfast', desc: 'Eggs, toast, grilled tomato, local produce', cat: 'Breakfast' },
      { name: 'Akara & Ogi', desc: 'Bean fritters with warm pap — a morning classic', cat: 'Breakfast' },
    ],
  },
  {
    section: 'Lunch',
    items: [
      { name: 'Jollof Rice & Grilled Chicken', desc: 'Party-style jollof with smoky grilled chicken', cat: 'Lunch' },
      { name: 'Egusi Soup & Eba', desc: 'Rich melon seed soup, slow-cooked to perfection', cat: 'Lunch' },
    ],
  },
  {
    section: 'Dinner',
    items: [
      { name: 'Pepper Soup', desc: 'Spiced goat meat broth — warming and aromatic', cat: 'Dinner' },
      { name: 'Ofada Rice & Ayamase Stew', desc: 'Local brown rice with green pepper stew', cat: 'Dinner' },
    ],
  },
  {
    section: 'Dessert & Drinks',
    items: [
      { name: 'Puff Puff & Chin Chin', desc: 'Hand-pressed dough, lightly sweetened', cat: 'Dessert' },
      { name: 'Soft Drinks & Palm wine', desc: 'Chilled drinks', cat: 'Drinks' },
    ],
  },
]

// ── All Recipes data ──────────────────────────────────────────────
type Recipe = {
  label: string
  title: string
  desc: string
  time: string
  img: any
  cat: 'Main course' | 'Soups & stews' | 'Breakfast' | 'Small chops' | 'Sides' | 'Desserts' | 'Drinks'
  gradientFrom: string
  gradientTo: string
}

const ALL_RECIPES: Recipe[] = [
  {
    label: 'MAIN COURSE', title: 'Ofe Akwu — Palm Nut Soup',
    desc: 'Rich palm extract simmered with goat meat, crayfish & uziza. Served with pounded yam.',
    time: '90 min', img: imgOfeAkwu, cat: 'Main course',
    gradientFrom: '#1a3a1a', gradientTo: '#2d5a1a',
  },
  {
    label: 'MAIN COURSE', title: 'Ofada Stew with Ayamase Sauce',
    desc: 'Bold green pepper sauce with assorted offal over locally grown Ofada rice.',
    time: '75 min', img: jollof, cat: 'Main course',
    gradientFrom: '#3a1a0a', gradientTo: '#5a2a0a',
  },
  {
    label: 'MAIN COURSE', title: 'Banga Soup with Catfish',
    desc: 'Delta-style palm nut soup fragrant with orotor spice and fresh river catfish.',
    time: '80 min', img: imgBangaSoup, cat: 'Main course',
    gradientFrom: '#4a1a0a', gradientTo: '#6a2a1a',
  },
  {
    label: 'SOUPS & STEWS', title: 'Egusi Soup',
    desc: 'Ground melon seed soup with stockfish, smoked prawns & bitter leaf from our garden.',
    time: '60 min', img: dinner, cat: 'Soups & stews',
    gradientFrom: '#1a2a0a', gradientTo: '#2a4a1a',
  },
  {
    label: 'SOUPS & STEWS', title: 'Oha Soup',
    desc: 'Ora leaves in a cocoyam-thickened broth with assorted meat. A true eastern classic.',
    time: '55 min', img: imgOhaSoup, cat: 'Soups & stews',
    gradientFrom: '#1a3a2a', gradientTo: '#2a5a3a',
  },
  {
    label: 'SOUPS & STEWS', title: 'Groundnut Soup',
    desc: 'West-African peanut slow-cooked with chicken, tomatoes & farm-fresh spices.',
    time: '65 min', img: dinner, cat: 'Soups & stews',
    gradientFrom: '#2a2a0a', gradientTo: '#4a3a1a',
  },
  {
    label: 'BREAKFAST', title: 'Akara & Ogi',
    desc: 'Crispy bean fritters paired with smooth fermented corn porridge. A breakfast morning duo.',
    time: '30 min', img: imgAkaraOgi, cat: 'Breakfast',
    gradientFrom: '#3a1a0a', gradientTo: '#5a2a0a',
  },
  {
    label: 'BREAKFAST', title: 'Yam & Egg Sauce',
    desc: 'Pan-fried yam slices with a spiced tomato and egg sauce, finished with scent leaf.',
    time: '25 min', img: imgYamEgg, cat: 'Breakfast',
    gradientFrom: '#1a2a3a', gradientTo: '#1a3a5a',
  },
  {
    label: 'SMALL CHOPS', title: 'Suya Skewers',
    desc: 'Hausa-spiced beef skewers with groundnut crust, served with sliced onion & tomatoes.',
    time: '40 min', img: imgSuya, cat: 'Small chops',
    gradientFrom: '#3a1a1a', gradientTo: '#5a2a2a',
  },
  {
    label: 'SMALL CHOPS', title: 'Puff Puff',
    desc: 'Light fried dough balls, golden and airy — dusted with sugar or served with pepper dip.',
    time: '20 min', img: imgPuffPuff, cat: 'Small chops',
    gradientFrom: '#3a2a0a', gradientTo: '#5a3a1a',
  },
  {
    label: 'SIDES', title: 'Fried Plantain (Dodo)',
    desc: 'Ripe plantain sliced and pan-fried to caramelised perfection. The perfect companion.',
    time: '15 min', img: jollof, cat: 'Sides',
    gradientFrom: '#2a3a0a', gradientTo: '#3a5a1a',
  },
  {
    label: 'DESSERTS', title: 'Chin Chin',
    desc: 'Crunchy fried pastry snacks lightly sweetened with coconut and nutmeg. Farm-made.',
    time: '40 min', img: imgChinChin, cat: 'Desserts',
    gradientFrom: '#3a1a2a', gradientTo: '#5a2a3a',
  },
  {
    label: 'DRINKS', title: 'Zobo Hibiscus Cooler',
    desc: 'Dried hibiscus tea steeped with ginger, cloves & pineapple. Refreshing and bold.',
    time: '20 min', img: drinks, cat: 'Drinks',
    gradientFrom: '#2a1a3a', gradientTo: '#3a2a5a',
  },
  {
    label: 'DRINKS', title: 'Kunu Zaki',
    desc: 'Spiced millet drink with a nod of ginger — a northern Nigerian staple, lightly sweetened.',
    time: '30 min', img: imgKunu, cat: 'Drinks',
    gradientFrom: '#1a3a3a', gradientTo: '#2a5a5a',
  },
]

const ALL_FILTER_TABS = ['All', 'Main course', 'Soups & stews', 'Breakfast', 'Small chops', 'Sides', 'Desserts', 'Drinks'] as const

// ── Featured + side recipes for the section ───────────────────────
const featuredRecipe = {
  label: 'MAIN COURSE',
  title: 'Ofe Akwu — Rich Palm Nut Soup',
  description: 'Slow-simmered palm nut extract with tender goat meat, crayfish, and fresh uziza leaves — a dish that carries the warmth of every Nigerian kitchen. Served with pounded yam from our farm.',
  img: imgOfeAkwu,
  gradientFrom: '#1a3a1a',
  gradientTo: '#2d5a1a',
}

const sideRecipes = [
  {
    label: 'BREAKFAST',
    title: 'Akara & Ogi — Bean Fritters with Fermented Porridge',
    img: imgAkaraOgi,
    gradientFrom: '#3a1a0a',
    gradientTo: '#5a2a0a',
  },
  {
    label: 'SMALL CHOPS',
    title: 'Suya Skewers with Groundnut Spice Crust',
    img: imgSuya,
    gradientFrom: '#1a2a0a',
    gradientTo: '#2a4a1a',
  },
]

// ── Dining data ───────────────────────────────────────────────────
const categories = [
  { label: 'DINNER', title: 'Really Quick Traditional Dishes', img: dinner },
  { label: 'BREAKFAST', title: 'Announcing The Spring Bucket List', img: breakfast },
  { label: 'DESSERT', title: 'Favorite Snacks', img: dessert },
  { label: 'DRINKS', title: 'Refreshing Drinks', img: drinks },
]

const topCategories = [
  { label: 'BREAKFAST', img: ham },
  { label: 'DESSERT', img: dessert },
  { label: 'LUNCH', img: jollof },
  { label: 'APPETIZER', img: puff },
  { label: 'DINNER', img: dinner },
]

const weeklyFeatured = {
  label: 'BREAKFAST',
  title: 'Have The Best Delicacies At Your Door Step',
  img: dinner,
}
const weeklySide = [
  { label: 'LUNCH', title: 'Exploring The Potential Of Cooking International Cuisines', img: jollof },
  { label: 'DESSERT', title: 'Favorite Browned Butter Chocolate Cookies Daily Breakfast', img: dessert },
  { label: 'APPETIZER', title: 'The Potentially Dangerous Non Sibility Of Cookie Notices', img: rappetizer },
]

const healthyRecipes = [
  { label: 'LUNCH', title: 'Have The Best Cuisine In Our Resort', img: jollof },
  { label: 'BREAKFAST', title: 'The Best Handoff Is No Handoff', img: breakfast },
  { label: 'DESSERT', title: 'One Of The Best Desserts In The Country', img: dessert },
  { label: 'PIZZA', title: 'How To Make Puff Puff in Thirty Minutes.', img: puff },
  { label: 'DINNER', title: 'Why You Should Consider Trying Our Traditional Recipe', img: dinner },
  { label: 'APPETIZER', title: 'How To Create Dynamic Donut Plating Works', img: rappetizer },
]

// ── Animation variants ────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

// ── Badge ─────────────────────────────────────────────────────────
function Badge({ label, t }: { label: string; t: Theme }) {
  return (
    <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full tracking-widest uppercase"
      style={{ backgroundColor: t.accentVal, color: t.pageVal }}>
      {label}
    </span>
  )
}

// ── Section heading ───────────────────────────────────────────────
function SectionHeading({ title, t, viewAll, onViewAll }: { title: string; t: Theme; viewAll?: boolean; onViewAll?: () => void }) {
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
        <button
          onClick={onViewAll}
          className="text-[11px] font-bold uppercase tracking-[0.14em] transition-opacity hover:opacity-60"
          style={{ color: t.mutedVal }}>
          View All →
        </button>
      )}
    </div>
  )
}

// ── Divider ───────────────────────────────────────────────────────
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

// ── Meal card ─────────────────────────────────────────────────────
function MealCard({
  item, selected, onToggle, t,
}: {
  item: MealItem
  selected: boolean
  onToggle: () => void
  t: Theme
}) {
  return (
    <button
      onClick={onToggle}
      className="w-full text-left flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-all duration-200"
      style={{
        border: `1.5px solid ${selected ? t.accentVal : t.borderVal}`,
        backgroundColor: selected ? t.chipBg : t.surfaceVal,
      }}>
      <div
        className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200"
        style={{
          backgroundColor: selected ? t.accentVal : 'transparent',
          border: `1.5px solid ${selected ? t.accentVal : t.borderVal}`,
        }}>
        {selected && <Check size={11} color={t.pageVal} strokeWidth={2.5} />}
      </div>
      <div className="flex-1 min-w-0">
        <p className="eb-garamond-semibold text-[14px] sm:text-[15px]"
          style={{ color: t.headingVal }}>
          {item.name}
        </p>
        <p className="cormorant-garamond-light-italic text-[12px] sm:text-[13px] mt-0.5"
          style={{ color: t.mutedVal }}>
          {item.desc}
        </p>
      </div>
      <Badge label={item.cat} t={t} />
    </button>
  )
}

// ── Selection pill ────────────────────────────────────────────────
function SelectionPill({ label, t }: { label: string; t: Theme }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold"
      style={{ backgroundColor: t.chipBg, border: `1px solid ${t.chipBorder}`, color: t.bodyVal }}>
      <Check size={10} strokeWidth={2.5} style={{ color: t.accentVal }} />
      {label}
    </span>
  )
}

// ── All Recipes Overlay ───────────────────────────────────────────
function AllRecipesOverlay({ t, onClose }: { t: Theme; onClose: () => void }) {
  const [activeFilter, setActiveFilter] = useState<string>('All')
  const [search, setSearch] = useState('')

  const filtered = ALL_RECIPES.filter(r => {
    const matchCat = activeFilter === 'All' || r.cat === activeFilter
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.desc.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  // Prevent body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const filterPillStyle = (active: boolean): React.CSSProperties => ({
    padding: '6px 16px',
    borderRadius: 9999,
    border: `1px solid ${active ? t.accentVal : t.borderVal}`,
    backgroundColor: active ? t.accentVal : t.surfaceVal,
    color: active ? t.pageVal : t.bodyVal,
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
    transition: 'all .2s',
    fontFamily: 'inherit',
  })

  return (
    <motion.div
      key="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-100 overflow-y-auto"
      style={{ backgroundColor: t.pageVal }}>

      {/* Header */}
      <div className="sticky top-0 z-10 px-6 sm:px-10 py-6"
        style={{ backgroundColor: t.pageVal, borderBottom: `1px solid ${t.borderVal}` }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start justify-between mb-1">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em]"
                style={{ color: t.accentVal }}>
                Agroterra Dining
              </p>
              <h1 className="eb-garamond-semibold"
                style={{ fontSize: 'clamp(26px,4vw,42px)', color: t.headingVal, lineHeight: 1.1 }}>
                All Recipes
              </h1>
              <div className="mt-2 w-10 h-px" style={{ backgroundColor: t.accentVal }} />
              <p className="cormorant-garamond-light-italic text-[14px] mt-2 max-w-md"
                style={{ color: t.mutedVal }}>
                From slow-simmered soups to street-style small chops — every dish rooted in West
                African tradition, prepared with produce from our farm.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center ml-4 shrink-0 transition-all hover:opacity-60"
              style={{ border: `1px solid ${t.borderVal}`, color: t.headingVal, backgroundColor: t.surfaceVal }}>
              <X size={18} />
            </button>
          </div>

          {/* Filter tabs + search */}
          <div className="mt-5 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            {/* Scrollable filter row */}
            <div className="flex gap-2 overflow-x-auto pb-1 flex-wrap">
              {ALL_FILTER_TABS.map(tab => (
                <button key={tab} style={filterPillStyle(activeFilter === tab)}
                  onClick={() => setActiveFilter(tab)}>
                  {tab}
                </button>
              ))}
            </div>
            {/* Search */}
            <div className="relative shrink-0 sm:ml-auto w-full sm:w-48">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: t.mutedVal }} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search recipes..."
                style={{
                  width: '100%',
                  paddingLeft: 32,
                  paddingRight: 14,
                  paddingTop: 7,
                  paddingBottom: 7,
                  borderRadius: 9999,
                  border: `1px solid ${t.borderVal}`,
                  backgroundColor: t.surfaceVal,
                  color: t.bodyVal,
                  fontSize: 12,
                  outline: 'none',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box' as const,
                }}
              />
            </div>
          </div>

          <p className="mt-3 text-[11px] font-semibold uppercase tracking-wider"
            style={{ color: t.mutedVal }}>
            Showing {filtered.length} recipe{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Recipe grid */}
      <div className="px-6 sm:px-10 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible">
            {filtered.map((recipe) => (
              <motion.div
                key={recipe.title}
                variants={cardVariants}
                className="flex flex-col cursor-pointer group">
                {/* Image card */}
                <div
                  className="relative w-full overflow-hidden rounded-xl"
                  style={{
                    aspectRatio: '4/3',
                    background: `linear-gradient(135deg, ${recipe.gradientFrom}, ${recipe.gradientTo})`,
                    border: `1px solid ${t.borderVal}`,
                  }}>
                  <Image
                    src={recipe.img}
                    alt={recipe.title}
                    fill
                    className="object-cover opacity-80 transition-all duration-500 group-hover:opacity-95 group-hover:scale-105"
                  />
                  {/* Category badge — bottom left */}
                  <div className="absolute bottom-3 left-3">
                    <span
                      className="text-[8px] font-bold px-2 py-0.5 rounded-full tracking-widest uppercase"
                      style={{ backgroundColor: t.accentVal, color: t.pageVal }}>
                      {recipe.label}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="mt-2.5 flex-1">
                  <p className="eb-garamond-semibold text-[14px] sm:text-[15px] leading-snug group-hover:opacity-70 transition-opacity"
                    style={{ color: t.headingVal }}>
                    {recipe.title}
                  </p>
                  <p className="cormorant-garamond-light-italic text-[12px] sm:text-[13px] mt-1 leading-relaxed line-clamp-2"
                    style={{ color: t.mutedVal }}>
                    {recipe.desc}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1" style={{ color: t.mutedVal }}>
                      <Clock size={11} />
                      <span className="text-[11px] font-medium">{recipe.time}</span>
                    </div>
                    <ChevronRight size={13} style={{ color: t.accentVal }} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="eb-garamond-semibold text-[20px]" style={{ color: t.mutedVal }}>
                No recipes found
              </p>
              <p className="cormorant-garamond-light-italic text-[14px] mt-2" style={{ color: t.mutedVal }}>
                Try a different filter or search term
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ── Explore Latest Recipes Section ────────────────────────────────
function ExploreLatestRecipes({ t, onViewAll }: { t: Theme; onViewAll: () => void }) {
  return (
    <section className="w-full max-w-5xl px-4 sm:px-6 mb-16">
      <SectionHeading title="Taste of the Motherland" t={t} viewAll onViewAll={onViewAll} />

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-[1fr_420px] gap-4 sm:gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>

        {/* ── Large featured card ── */}
        <motion.div variants={cardVariants} className="flex flex-col cursor-pointer group">
          <div
            className="relative w-full overflow-hidden rounded-2xl"
            style={{
              height: 'clamp(280px, 40vw, 440px)',
              background: `linear-gradient(135deg, ${featuredRecipe.gradientFrom}, ${featuredRecipe.gradientTo})`,
              border: `1px solid ${t.borderVal}`,
              boxShadow: `0 16px 48px rgba(0,0,0,0.18)`,
            }}>
            <Image
              src={featuredRecipe.img}
              alt={featuredRecipe.title}
              fill
              className="object-cover opacity-75 transition-all duration-500 group-hover:opacity-90 group-hover:scale-105"
            />
            {/* Gradient overlay — bottom */}
            <div className="absolute inset-0 rounded-2xl"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)' }} />

            {/* Category badge */}
            <div className="absolute bottom-5 left-5 right-5">
              <Badge label={featuredRecipe.label} t={t} />
              <h3 className="mt-2 text-white eb-garamond-semibold leading-tight group-hover:opacity-80 transition-opacity"
                style={{ fontSize: 'clamp(20px,3vw,30px)' }}>
                {featuredRecipe.title}
              </h3>
            </div>
          </div>

          {/* Description below */}
          <p className="mt-3 cormorant-garamond-light-italic text-[14px] sm:text-[15px] leading-relaxed"
            style={{ color: t.mutedVal }}>
            {featuredRecipe.description}
          </p>
        </motion.div>

        {/* ── Two stacked side cards ── */}
        <div className="flex flex-col gap-4">
          {sideRecipes.map((r) => (
            <motion.div key={r.title} variants={cardVariants} className="flex flex-col cursor-pointer group flex-1">
              <div
                className="relative w-full overflow-hidden rounded-2xl flex-1"
                style={{
                  minHeight: 190,
                  background: `linear-gradient(135deg, ${r.gradientFrom}, ${r.gradientTo})`,
                  border: `1px solid ${t.borderVal}`,
                  boxShadow: `0 8px 24px rgba(0,0,0,0.14)`,
                }}>
                <Image
                  src={r.img}
                  alt={r.title}
                  fill
                  className="object-cover opacity-75 transition-all duration-500 group-hover:opacity-90 group-hover:scale-105"
                />
                <div className="absolute inset-0 rounded-2xl"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)' }} />
                <div className="absolute bottom-4 left-4 right-4">
                  <Badge label={r.label} t={t} />
                  <h3 className="mt-2 text-white eb-garamond-semibold text-[15px] sm:text-[17px] leading-snug group-hover:opacity-80 transition-opacity">
                    {r.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

// ── Meal Reservation ──────────────────────────────────────────────
type FormData = {
  name: string
  email: string
  phone: string
  date: string
  guests: string
  notes: string
}

function MealReservation({ t }: { t: Theme }) {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [form, setForm] = useState<FormData>({ name: '', email: '', phone: '', date: '', guests: '', notes: '' })
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)

  const toggle = (name: string) => {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(name) ? next.delete(name) : next.add(name)
      return next
    })
  }

  const handleSubmit = () => {
    const hasName = form.name.trim().length > 0
    const hasEmail = form.email.trim().length > 0
    setNameError(!hasName)
    setEmailError(!hasEmail)
    if (!hasName || !hasEmail) return
    setStep(3)
  }

  const inputStyle = (error?: boolean): React.CSSProperties => ({
    width: '100%',
    padding: '10px 18px',
    borderRadius: '9999px',
    border: `1px solid ${error ? '#e24b4a' : t.borderVal}`,
    backgroundColor: t.surfaceVal,
    color: t.bodyVal,
    fontSize: 13,
    outline: 'none',
    boxSizing: 'border-box' as const,
    fontFamily: 'inherit',
    transition: 'border-color .2s',
  })

  const textareaStyle: React.CSSProperties = {
    ...inputStyle(),
    borderRadius: 16,
    resize: 'none',
    padding: '12px 18px',
  }

  const btnPrimary: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '12px 28px',
    borderRadius: 9999,
    border: 'none',
    backgroundColor: t.accentVal,
    color: t.pageVal,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '0.13em',
    textTransform: 'uppercase' as const,
    cursor: selected.size === 0 && step === 1 ? 'not-allowed' : 'pointer',
    opacity: selected.size === 0 && step === 1 ? 0.4 : 1,
    fontFamily: 'inherit',
    boxShadow: `0 8px 24px ${t.accentVal}38`,
    transition: 'opacity .2s',
  }

  const btnOutline: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '12px 24px',
    borderRadius: 9999,
    border: `1.5px solid ${t.accentVal}`,
    backgroundColor: 'transparent',
    color: t.accentVal,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '0.13em',
    textTransform: 'uppercase' as const,
    cursor: 'pointer',
    fontFamily: 'inherit',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.14em',
    textTransform: 'uppercase' as const,
    color: t.mutedVal,
    marginBottom: 10,
    display: 'block',
  }

  return (
    <section
      className="w-full py-10 px-4 sm:px-6 mb-14"
      style={{ backgroundColor: t.tintVal, borderTop: `1px solid ${t.borderVal}`, borderBottom: `1px solid ${t.borderVal}` }}>
      <div className="max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1"
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: EASE }}>
              <div className="mb-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] mb-1" style={{ color: t.accentVal }}>Reservations</p>
                <h2 className="eb-garamond-semibold text-[22px] sm:text-[28px] leading-tight" style={{ color: t.headingVal }}>Reserve Your Meal</h2>
                <p className="cormorant-garamond-light-italic text-[15px] mt-1" style={{ color: t.mutedVal }}>Select the meals you'd like — we'll confirm your reservation directly.</p>
              </div>
              <div className="flex flex-col gap-8">
                {MEALS.map(group => (
                  <div key={group.section}>
                    <span style={labelStyle}>{group.section}</span>
                    <div className="flex flex-col gap-2.5">
                      {group.items.map(item => (
                        <MealCard key={item.name} item={item} selected={selected.has(item.name)} onToggle={() => toggle(item.name)} t={t} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-8 flex-wrap gap-4">
                <p className="cormorant-garamond-light-italic text-[14px]" style={{ color: t.mutedVal }}>
                  {selected.size === 0 ? 'No meals selected yet' : `${selected.size} meal${selected.size > 1 ? 's' : ''} selected`}
                </p>
                <button style={btnPrimary} disabled={selected.size === 0} onClick={() => selected.size > 0 && setStep(2)}>
                  Continue <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2"
              initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: EASE }}>
              <div className="mb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] mb-1" style={{ color: t.accentVal }}>Almost there</p>
                <h2 className="eb-garamond-semibold text-[22px] sm:text-[28px] leading-tight" style={{ color: t.headingVal }}>Your Details</h2>
                <p className="cormorant-garamond-light-italic text-[15px] mt-1" style={{ color: t.mutedVal }}>We'll use these to confirm your dining reservation.</p>
              </div>
              <div className="mb-6">
                <span style={labelStyle}>Your selected meals</span>
                <div className="flex flex-wrap gap-2">
                  {[...selected].map(name => <SelectionPill key={name} label={name} t={t} />)}
                </div>
              </div>
              <div className="flex flex-col gap-3 mb-6">
                <div>
                  <input style={inputStyle(nameError)} placeholder="Full name *" value={form.name} onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setNameError(false) }} />
                  {nameError && <p className="text-[11px] mt-1 ml-4" style={{ color: '#e24b4a' }}>Name is required</p>}
                </div>
                <div>
                  <input style={inputStyle(emailError)} type="email" placeholder="Email address *" value={form.email} onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setEmailError(false) }} />
                  {emailError && <p className="text-[11px] mt-1 ml-4" style={{ color: '#e24b4a' }}>Email is required</p>}
                </div>
                <input style={inputStyle()} type="tel" placeholder="Phone number (optional)" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                <input style={inputStyle()} type="date" placeholder="Preferred date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
                <select style={{ ...inputStyle(), appearance: 'none' as const }} value={form.guests} onChange={e => setForm(f => ({ ...f, guests: e.target.value }))}>
                  <option value="">Number of guests</option>
                  {['1 guest', '2 guests', '3 guests', '4 guests', '5+ guests'].map(g => <option key={g}>{g}</option>)}
                </select>
                <textarea style={textareaStyle} rows={3} placeholder="Dietary requirements or special requests? (optional)" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
              </div>
              <div className="flex gap-3 flex-wrap">
                <button style={btnOutline} onClick={() => setStep(1)}><ChevronLeft size={14} /> Back</button>
                <button style={btnPrimary} onClick={handleSubmit}>Send Reservation <ArrowRight size={14} /></button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3"
              initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="text-center py-8">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ backgroundColor: t.chipBg, border: `2px solid ${t.accentVal}` }}>
                <Check size={24} strokeWidth={2} style={{ color: t.accentVal }} />
              </div>
              <h2 className="eb-garamond-semibold text-[26px] sm:text-[32px] leading-tight mb-3" style={{ color: t.headingVal }}>Reservation Sent!</h2>
              <p className="cormorant-garamond-light-italic text-[16px] sm:text-[17px] mb-6 max-w-sm mx-auto" style={{ color: t.bodyVal }}>
                Thank you, <span style={{ color: t.accentVal, fontStyle: 'normal' }}>{form.name}</span>. We've received your selection and will contact you shortly to confirm.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {[...selected].map(name => <SelectionPill key={name} label={name} t={t} />)}
              </div>
              <p className="text-[12px]" style={{ color: t.mutedVal }}>
                Questions? Email us at{' '}
                <a href="mailto:dining@agroterra.com" className="font-bold" style={{ color: t.accentVal }}>dining@agroterra.com</a>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────
const Page = () => {
  const [isDark, setIsDark] = useState(false)
  const [showAllRecipes, setShowAllRecipes] = useState(false)
  const t = isDark ? dark : light

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) setIsDark(true)
  }, [])

  return (
    <div className="eb-garamond transition-colors duration-300 overflow-x-hidden"
      style={{ backgroundColor: t.pageVal }}>

      {/* All Recipes Overlay */}
      <AnimatePresence>
        {showAllRecipes && (
          <AllRecipesOverlay t={t} onClose={() => setShowAllRecipes(false)} />
        )}
      </AnimatePresence>

      {/* Theme toggle */}
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

      <main className="flex flex-col min-h-screen w-full items-center">

        {/* ── HERO ── */}
        <div className="w-full mb-6 sm:mb-10 relative">
          <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[93vh]">
            <Image src={bg} alt="Agroterra Kitchen" fill className="object-cover" priority />
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to bottom,rgba(0,0,0,0.68) 0%,rgba(0,0,0,0.08) 42%,rgba(0,0,0,0.82) 100%)' }} />
            <div className="absolute inset-x-0 top-0 z-20 px-4 sm:px-8 md:px-14 py-4 sm:py-6">
              <Navbar />
            </div>
            <div className="absolute bottom-16 sm:bottom-20 left-0 right-0 z-10 px-6 sm:px-12 md:px-20 lg:px-28">
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.15 }}
                className="text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-white/50 mb-4">
                Agroterra Resort · Dining
              </motion.p>
              <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE }}
                className="eb-garamond-semibold text-white leading-[0.92] uppercase"
                style={{ fontSize: 'clamp(44px,9vw,110px)' }}>
                Our<br />Dining
              </motion.h1>
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
                className="w-16 h-px mt-6 mb-5 origin-left" style={{ backgroundColor: t.accentVal }} />
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.75 }}
                className="eb-garamond-italic text-white/70 max-w-sm" style={{ fontSize: 'clamp(16px,2.5vw,22px)' }}>
                &ldquo;A place that celebrates life.&rdquo;
              </motion.p>
            </div>
          </div>
        </div>

        {/* ── CATEGORY CARDS ── */}
        <section className="w-full max-w-5xl px-4 sm:px-6 mb-14">
          <SectionHeading title="Browse by Category" t={t} />
          <motion.div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6"
            variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            {categories.map((cat) => (
              <motion.div key={cat.label} variants={cardVariants} className="flex flex-col cursor-pointer group">
                <div className="relative w-full aspect-square overflow-hidden rounded-2xl"
                  style={{ border: `1px solid ${t.borderVal}`, boxShadow: `0 8px 32px rgba(0,0,0,0.12)` }}>
                  <Image src={cat.img} alt={cat.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 rounded-2xl" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)' }} />
                  <div className="absolute bottom-3 left-3"><Badge label={cat.label} t={t} /></div>
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

        {/* ── MEAL RESERVATION ── */}
        <MealReservation t={t} />

        {/* ── EXPLORE LATEST RECIPES (new layout) ── */}
        <ExploreLatestRecipes t={t} onViewAll={() => setShowAllRecipes(true)} />

        <div className="w-full max-w-5xl px-4 sm:px-6"><Divider t={t} /></div>

        {/* ── TOP CATEGORIES ── */}
        <section className="w-full py-12 sm:py-16 px-4 sm:px-6 mb-14"
          style={{ backgroundColor: t.tintVal, borderTop: `1px solid ${t.borderVal}`, borderBottom: `1px solid ${t.borderVal}` }}>
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] mb-2" style={{ color: t.accentVal }}>Agroterra Dining</p>
            <h2 className="eb-garamond-semibold mb-3 text-center" style={{ fontSize: 'clamp(22px,3.5vw,34px)', color: t.headingVal }}>Our Top Categories</h2>
            <div className="w-10 h-px mb-4" style={{ backgroundColor: t.accentVal }} />
            <p className="cormorant-garamond-light-italic text-[15px] text-center max-w-sm mb-10 leading-relaxed" style={{ color: t.mutedVal }}>
              Browned Butter And Brown Sugar Caramelly Goodness, Crispy Edges Thick And Soft Centers And Melty Little Puddles
            </p>
            <motion.div className="flex flex-wrap justify-center gap-6 sm:gap-10"
              variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
              {topCategories.map((cat) => (
                <motion.div key={cat.label} variants={cardVariants} className="flex flex-col items-center gap-3 cursor-pointer group">
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden transition-all duration-300"
                    style={{ border: `3px solid ${t.accentVal}`, boxShadow: `0 0 0 4px ${t.chipBg}, 0 8px 24px rgba(0,0,0,0.15)` }}>
                    <Image src={cat.img} alt={cat.label} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: t.accentVal }}>{cat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── WEEKLY BEST RECIPES ── */}
        <section className="w-full max-w-5xl px-4 sm:px-6 mb-14">
          <SectionHeading title="Weekly Best Recipes" t={t} viewAll />
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
            variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
            <motion.div variants={cardVariants} className="cursor-pointer group">
              <div className="relative w-full h-64 sm:h-full min-h-70 overflow-hidden rounded-2xl"
                style={{ border: `1px solid ${t.borderVal}`, boxShadow: `0 16px 48px rgba(0,0,0,0.15)` }}>
                <Image src={weeklyFeatured.img} alt={weeklyFeatured.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 rounded-2xl"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)' }} />
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
            <div className="flex flex-col gap-4 justify-between">
              {weeklySide.map((r) => (
                <motion.div key={r.title} variants={cardVariants}
                  className="flex gap-4 cursor-pointer group items-center p-3 rounded-2xl transition-colors duration-200"
                  style={{ border: `1px solid ${t.borderVal}`, backgroundColor: t.surfaceVal }}>
                  <div className="relative w-24 h-20 sm:w-28 shrink-0 overflow-hidden rounded-xl"
                    style={{ border: `1px solid ${t.borderVal}`, minHeight: 80 }}>
                    <Image src={r.img} alt={r.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
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
          <motion.div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6"
            variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
            {healthyRecipes.map((r) => (
              <motion.div key={r.title} variants={cardVariants} className="flex flex-col cursor-pointer group">
                <div className="relative w-full aspect-4/3 overflow-hidden rounded-2xl"
                  style={{ border: `1px solid ${t.borderVal}`, boxShadow: `0 8px 24px rgba(0,0,0,0.10)` }}>
                  <Image src={r.img} alt={r.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 rounded-2xl" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%)' }} />
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
        <footer className="w-full py-8 px-6 text-center" style={{ borderTop: `1px solid ${t.borderVal}` }}>
          <p className="text-[11px] tracking-widest uppercase" style={{ color: t.mutedVal }}>
            © {new Date().getFullYear()} Agroterra Resort · Dining
          </p>
        </footer>

      </main>
    </div>
  )
}

export default Page