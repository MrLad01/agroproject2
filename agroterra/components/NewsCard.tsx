'use client'
// components/NewsCard.tsx
// Self-contained card components used across the home page.
// Fixes: dark mode text visibility, image display, removed orphan "View All" buttons.

import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, ImageOff } from 'lucide-react'
import type { Article } from '@/lib/rss'

// ── Shared image component with graceful fallback ─────────────────────────
function ArticleImage({
  src,
  alt,
  className = '',
}: {
  src?: string
  alt: string
  className?: string
}) {
  if (!src) {
    return (
      <div className={`bg-zinc-800 flex items-center justify-center ${className}`}>
        <ImageOff size={20} className="text-zinc-600" />
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        unoptimized
        // On error, swap to the fallback placeholder via a native img trick
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement
          target.style.display = 'none'
          const parent = target.parentElement
          if (parent) {
            parent.classList.add('bg-zinc-800')
            const icon = document.createElement('div')
            icon.className = 'absolute inset-0 flex items-center justify-center'
            icon.innerHTML =
              '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#52525b" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="2" y1="2" x2="22" y2="22"/><path d="M10.41 10.41a2 2 0 1 1-2.83-2.83"/><line x1="13.5" y1="6H6a2 2 0 0 0-2 2v10"/><path d="M18 12v6M14 18h8"/></svg>'
            parent.appendChild(icon)
          }
        }}
      />
    </div>
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

// ── Timestamp ────────────────────────────────────────────────────────────
function Timestamp({ date, source }: { date?: string; source?: string }) {
  const parts = [source, date].filter(Boolean)
  if (!parts.length) return null
  return (
    <p className="text-zinc-500 dark:text-zinc-400 text-[10px] font-medium mt-1 leading-none">
      {parts.join(' · ')}
    </p>
  )
}

// ────────────────────────────────────────────────────────────────────────
// SectionHeader — title bar with red accent, NO "View All" button
// ────────────────────────────────────────────────────────────────────────
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

// ────────────────────────────────────────────────────────────────────────
// HeroCard — large card, left column of Politics section
// ────────────────────────────────────────────────────────────────────────
export function HeroCard({ article }: { article: Article }) {
  return (
    <Link
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col flex-1 min-w-0 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-sm hover:shadow-md"
    >
      {/* Image */}
      <div className="relative aspect-video w-full bg-zinc-100 dark:bg-zinc-800">
        <ArticleImage src={article.image ?? undefined} alt={article.title} className="absolute inset-0" />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* Text */}
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

// ────────────────────────────────────────────────────────────────────────
// SmallCard — horizontal list card (sidebar of Politics hero)
// ────────────────────────────────────────────────────────────────────────
export function SmallCard({ article }: { article: Article }) {
  return (
    <Link
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors p-3 overflow-hidden"
    >
      {/* Thumbnail */}
      <div className="relative w-20 h-16 shrink-0 rounded-md overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <ArticleImage src={article.image ?? undefined} alt={article.title} className="absolute inset-0" />
      </div>

      {/* Text */}
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

// ────────────────────────────────────────────────────────────────────────
// GridCard — 3-column grid card (Entertainment & Sports)
// ────────────────────────────────────────────────────────────────────────
export function GridCard({ article }: { article: Article }) {
  return (
    <Link
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors shadow-sm hover:shadow-md"
    >
      {/* Image */}
      <div className="relative aspect-4/3 w-full bg-zinc-100 dark:bg-zinc-800">
        <ArticleImage src={article.image ?? undefined} alt={article.title} className="absolute inset-0" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* Text */}
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

// ────────────────────────────────────────────────────────────────────────
// SidebarFeaturedCard — compact horizontal card for the sidebar
// ────────────────────────────────────────────────────────────────────────
export function SidebarFeaturedCard({ article }: { article: Article }) {
  return (
    <Link
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex gap-3 items-start border-b border-zinc-100 dark:border-zinc-800 pb-4 last:border-0 last:pb-0"
    >
      {/* Thumbnail */}
      <div className="relative w-16 h-14 shrink-0 rounded-md overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <ArticleImage src={article.image ?? undefined} alt={article.title} className="absolute inset-0" />
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1 min-w-0 flex-1">
        <h3 className="text-zinc-900 dark:text-zinc-100 text-[11px] font-bold leading-snug line-clamp-3 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
          {article.title}
        </h3>
        <Timestamp date={article.publishedAt} source={article.source} />
      </div>
    </Link>
  )
}