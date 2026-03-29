// components/NewsCard.tsx
// Shared card components used across the page.

import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import type { Article } from '@/lib/rss'

// ── Helpers ────────────────────────────────────────────────────────────────
const CATEGORY_COLORS: Record<Article['category'], string> = {
  politics:      '#e53e3e',
  entertainment: '#d69e2e',
  sports:        '#2b6cb0',
  general:       '#718096',
}

export function CategoryBadge({ category, label }: { category: Article['category']; label?: string }) {
  return (
    <span
      className="inline-block text-white text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-sm"
      style={{ backgroundColor: CATEGORY_COLORS[category] }}
    >
      {label ?? category}
    </span>
  )
}

export function SectionHeader({ title, href = '#' }: { title: string; href?: string }) {
  return (
    <div className="flex items-center justify-between mb-4 border-b-2 border-red-600 pb-1">
      <h2 className="text-sm font-extrabold uppercase tracking-widest text-gray-900">{title}</h2>
      <Link
        href={href}
        className="flex items-center gap-1 text-[11px] font-semibold text-gray-500 hover:text-red-600 transition-colors"
      >
        VIEW ALL <ChevronRight size={12} />
      </Link>
    </div>
  )
}

// ── Thumbnail with fallback ────────────────────────────────────────────────
function Thumb({ src, alt, className = '' }: { src: string | null; alt: string; className?: string }) {
  if (src) {
    return (
      <div className={`relative overflow-hidden shrink-0 ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized // RSS images are external; remove if you proxy them
        />
      </div>
    )
  }
  // Fallback placeholder
  return (
    <div className={`bg-linear-to-br from-gray-200 to-gray-300 flex items-center justify-center shrink-0 ${className}`}>
      <span className="text-gray-400 text-[10px] text-center px-2 leading-tight">{alt.slice(0, 30)}</span>
    </div>
  )
}

// ── Large hero card (used in Politics featured slot) ───────────────────────
export function HeroCard({ article }: { article: Article }) {
  return (
    <Link
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative sm:w-[45%] aspect-4/3 rounded overflow-hidden shrink-0 cursor-pointer group block"
    >
      <Thumb src={article.image} alt={article.title} className="w-full h-full absolute inset-0" />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 p-3 z-10">
        <CategoryBadge category={article.category} label="BREAKING NEWS" />
        <p className="text-white text-[13px] font-bold mt-1 leading-snug line-clamp-2">{article.title}</p>
        <p className="text-white/60 text-[10px] mt-1">{article.source}</p>
      </div>
    </Link>
  )
}

// ── Small horizontal card (side list) ─────────────────────────────────────
export function SmallCard({ article }: { article: Article }) {
  return (
    <Link
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex gap-3 cursor-pointer group"
    >
      <div className="relative w-24 h-20 rounded overflow-hidden shrink-0">
        <Thumb src={article.image} alt={article.title} className="w-full h-full absolute inset-0" />
      </div>
      <div className="flex flex-col justify-center gap-1">
        <CategoryBadge category={article.category} />
        <p className="text-[12px] font-semibold text-gray-800 leading-snug line-clamp-2 group-hover:text-red-600 transition-colors">
          {article.title}
        </p>
        <p className="text-[10px] text-gray-400">{article.source}</p>
      </div>
    </Link>
  )
}

// ── Grid card (Entertainment / Sports) ────────────────────────────────────
export function GridCard({ article }: { article: Article }) {
  return (
    <Link
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="cursor-pointer group block"
    >
      <div className="relative aspect-4/3 rounded overflow-hidden mb-2">
        <Thumb src={article.image} alt={article.title} className="w-full h-full absolute inset-0" />
      </div>
      <CategoryBadge category={article.category} />
      <p className="text-[12px] font-semibold text-gray-800 mt-1 leading-snug line-clamp-2 group-hover:text-red-600 transition-colors">
        {article.title}
      </p>
      <p className="text-[10px] text-gray-400 mt-1">{article.source}</p>
    </Link>
  )
}

// ── Featured banner card (sidebar) ────────────────────────────────────────
export function SidebarFeaturedCard({ article }: { article: Article }) {
  return (
    <Link
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="relative aspect-16/10 rounded overflow-hidden cursor-pointer group block"
    >
      <Thumb src={article.image} alt={article.title} className="w-full h-full absolute inset-0" />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
      <div className="absolute bottom-2 left-2 right-2 z-10">
        <CategoryBadge category={article.category} />
        <p className="text-white text-[11px] font-bold leading-snug line-clamp-2 mt-1">{article.title}</p>
      </div>
    </Link>
  )
}