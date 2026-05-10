'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Search, Clock, ChevronRight, X } from 'lucide-react'
import { Theme } from '@/lib/theme'
import { containerVariants, cardVariants } from '@/lib/theme'
import { ALL_RECIPES, ALL_FILTER_TABS } from '@/data/data'

export function AllRecipesOverlay({ t, onClose }: { t: Theme; onClose: () => void }) {
  const [activeFilter, setActiveFilter] = useState<string>('All')
  const [search, setSearch] = useState('')

  // FIX: filter using trimmed lowercase comparison to avoid subtle mismatches
  const filtered = ALL_RECIPES.filter((r) => {
    const matchCat = activeFilter === 'All' || r.cat === activeFilter
    const q = search.toLowerCase().trim()
    const matchSearch =
      !q ||
      r.title.toLowerCase().includes(q) ||
      r.desc.toLowerCase().includes(q)
    return matchCat && matchSearch
  })

  // Prevent body scroll when overlay is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
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
      style={{ backgroundColor: t.pageVal }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-10 px-6 sm:px-10 py-6"
        style={{ backgroundColor: t.pageVal, borderBottom: `1px solid ${t.borderVal}` }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start justify-between mb-1">
            <div>
              <p
                className="text-[10px] font-bold uppercase tracking-[0.28em]"
                style={{ color: t.accentVal }}
              >
                Agroterra Dining
              </p>
              <h1
                className="eb-garamond-semibold"
                style={{
                  fontSize: 'clamp(26px,4vw,42px)',
                  color: t.headingVal,
                  lineHeight: 1.1,
                }}
              >
                All Recipes
              </h1>
              <div className="mt-2 w-10 h-px" style={{ backgroundColor: t.accentVal }} />
              <p
                className="cormorant-garamond-light-italic text-[14px] mt-2 max-w-md"
                style={{ color: t.mutedVal }}
              >
                From slow-simmered soups to street-style small chops — every dish rooted in West
                African tradition, prepared with produce from our farm.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center ml-4 shrink-0 transition-all hover:opacity-60"
              style={{
                border: `1px solid ${t.borderVal}`,
                color: t.headingVal,
                backgroundColor: t.surfaceVal,
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Filter tabs + search */}
          <div className="mt-5 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="flex gap-2 overflow-x-auto pb-1 flex-wrap">
              {ALL_FILTER_TABS.map((tab) => (
                <button
                  key={tab}
                  style={filterPillStyle(activeFilter === tab)}
                  onClick={() => setActiveFilter(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            {/* Search */}
            <div className="relative shrink-0 sm:ml-auto w-full sm:w-48">
              <Search
                size={13}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: t.mutedVal }}
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
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

          <p
            className="mt-3 text-[11px] font-semibold uppercase tracking-wider"
            style={{ color: t.mutedVal }}
          >
            Showing {filtered.length} recipe{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Recipe grid */}
      <div className="px-6 sm:px-10 py-8">
        <div className="max-w-4xl mx-auto">
          {/* FIX: key on the motion container forces re-mount & re-animation when filter changes,
              so "All" and every other filter always shows cards properly */}
          <motion.div
            key={`${activeFilter}-${search}`}
            className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filtered.map((recipe) => (
              <motion.div
                key={recipe.title}
                variants={cardVariants}
                className="flex flex-col cursor-pointer group"
              >
                {/* Image card */}
                <div
                  className="relative w-full overflow-hidden rounded-xl"
                  style={{
                    aspectRatio: '4/3',
                    background: `linear-gradient(135deg, ${recipe.gradientFrom}, ${recipe.gradientTo})`,
                    border: `1px solid ${t.borderVal}`,
                  }}
                >
                  <Image
                    src={recipe.img}
                    alt={recipe.title}
                    fill
                    className="object-cover opacity-80 transition-all duration-500 group-hover:opacity-95 group-hover:scale-105"
                  />
                  <div className="absolute bottom-3 left-3">
                    <span
                      className="text-[8px] font-bold px-2 py-0.5 rounded-full tracking-widest uppercase"
                      style={{ backgroundColor: t.accentVal, color: t.pageVal }}
                    >
                      {recipe.label}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="mt-2.5 flex-1">
                  <p
                    className="eb-garamond-semibold text-[14px] sm:text-[15px] leading-snug group-hover:opacity-70 transition-opacity"
                    style={{ color: t.headingVal }}
                  >
                    {recipe.title}
                  </p>
                  <p
                    className="cormorant-garamond-light-italic text-[12px] sm:text-[13px] mt-1 leading-relaxed line-clamp-2"
                    style={{ color: t.mutedVal }}
                  >
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
              <p
                className="cormorant-garamond-light-italic text-[14px] mt-2"
                style={{ color: t.mutedVal }}
              >
                Try a different filter or search term
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}