'use client'
// components/NewsCard.tsx

import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, ImageOff } from 'lucide-react'
import type { Article } from '@/lib/rss'

// ── Fallback placeholder ──────────────────────────────────────────────────
function NoImage({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-zinc-800 flex items-center justify-center ${className}`}>
      <ImageOff size={20} className="text-zinc-600" />
    </div>
  )
}

// ── ArticleImage — must be placed inside a `relative` sized container ─────
// The parent is responsible for size (aspect ratio / fixed height).
// This component just fills it.
function ArticleImage({ src, alt }: { src?: string; alt: string }) {
  if (!src) return <NoImage className="absolute inset-0 w-full h-full" />

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover group-hover:scale-105 transition-transform duration-500"
      unoptimized
      onError={(e) => {
        // Hide broken image, let the bg-zinc-800 on the parent show
        ;(e.currentTarget as HTMLImageElement).style.display = 'none'
      }}
    />
  )
}

// ── Category pill ─────────────────────────────────────────────────────────
function CategoryPill({ label }: { label?: string }) {
  if (!label) return null
  return (
    <span className="inline-block bg-red-600 text-white text-[8px] font-black uppercase tracking-[0.12em] px-1.5 py-0.5 rounded-sm">
      {label}
    </span>
  )
}

// ── Timestamp ─────────────────────────────────────────────────────────────
function Timestamp({ date, source }: { date?: string; source?: string }) {
  const parts = [source, date].filter(Boolean)
  if (!parts.length) return null
  return (
    <p className="text-zinc-500 dark:text-zinc-400 text-[10px] font-medium mt-1 leading-none">
      {parts.join(' · ')}
    </p>
  )
}

// ── SectionHeader ─────────────────────────────────────────────────────────
export function SectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-1 h-6 bg-red-600 rounded-full shrink-0" />
      <h2 className="text-sm font-black uppercase tracking-[0.15em] text-zinc-900 dark:text-zinc-100">
        {title}
      </h2>
      <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-700" />
    </div>
  )
}

// ── HeroCard ──────────────────────────────────────────────────────────────
export function HeroCard({ article }: { article: Article }) {
  return (
    <Link
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col flex-1 min-w-0 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-sm hover:shadow-md"
    >
      {/* Parent defines size; ArticleImage fills with fill prop */}
      <div className="relative w-full aspect-video bg-zinc-800 overflow-hidden">
        <ArticleImage src={article.image ?? undefined} alt={article.title} />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <CategoryPill label={article.category} />
        <h3 className="text-zinc-900 dark:text-zinc-100 text-sm font-bold leading-snug line-clamp-3 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
          {article.title}
        </h3>
        {article.description && (
          <p className="text-zinc-600 dark:text-zinc-400 text-[11px] leading-relaxed line-clamp-2">
            {article.description}
          </p>
        )}
        <div className="mt-auto pt-2">
          <Timestamp date={article.publishedAt} source={article.source} />
        </div>
      </div>
    </Link>
  )
}

// ── SmallCard ─────────────────────────────────────────────────────────────
export function SmallCard({ article }: { article: Article }) {
  return (
    <Link
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors p-3 overflow-hidden"
    >
      {/* Fixed height + relative = fill works */}
      <div className="relative w-20 h-16 shrink-0 rounded-md overflow-hidden bg-zinc-800">
        <ArticleImage src={article.image ?? undefined} alt={article.title} />
      </div>

      <div className="flex flex-col gap-1 min-w-0 flex-1 justify-center">
        <CategoryPill label={article.category} />
        <h3 className="text-zinc-900 dark:text-zinc-100 text-[12px] font-bold leading-snug line-clamp-2 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
          {article.title}
        </h3>
        <Timestamp date={article.publishedAt} source={article.source} />
      </div>

      <ChevronRight
        size={14}
        className="text-zinc-300 dark:text-zinc-600 group-hover:text-red-500 group-hover:translate-x-0.5 transition-all shrink-0 self-center"
      />
    </Link>
  )
}

// ── GridCard ──────────────────────────────────────────────────────────────
export function GridCard({ article }: { article: Article }) {
  return (
    <Link
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-sm hover:shadow-md"
    >
      {/* aspect-[4/3] — explicit arbitrary value, not aspect-4/3 */}
      <div className="relative w-full aspect-4/3 bg-zinc-800 overflow-hidden">
        <ArticleImage src={article.image ?? undefined} alt={article.title} />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <CategoryPill label={article.category} />
        <h3 className="text-zinc-900 dark:text-zinc-100 text-[12px] font-bold leading-snug line-clamp-3 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
          {article.title}
        </h3>
        <div className="mt-auto pt-1">
          <Timestamp date={article.publishedAt} source={article.source} />
        </div>
      </div>
    </Link>
  )
}

// ── SidebarFeaturedCard ───────────────────────────────────────────────────
export function SidebarFeaturedCard({ article }: { article: Article }) {
  return (
    <Link
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-3 items-start border-b border-zinc-100 dark:border-zinc-800 pb-4 last:border-0 last:pb-0"
    >
      {/* Fixed w and h so fill has a box to fill */}
      <div className="relative w-16 h-14 shrink-0 rounded-md overflow-hidden bg-zinc-800">
        <ArticleImage src={article.image ?? undefined} alt={article.title} />
      </div>

      <div className="flex flex-col gap-1 min-w-0 flex-1">
        <h3 className="text-zinc-900 dark:text-zinc-100 text-[11px] font-bold leading-snug line-clamp-3 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
          {article.title}
        </h3>
        <Timestamp date={article.publishedAt} source={article.source} />
      </div>
    </Link>
  )
}