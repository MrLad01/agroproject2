'use client'

import AnimatedBlogImage from '@/components/AnimatedBlogImage'
import { blogPosts } from '@/data/blogData'
import Link from 'next/link'

// ── Theme tokens ──────────────────────────────────────────────────
const themes = {
  light: {
    bg:          '#f8f5ef',
    border:      '#ddd5c4',
    heading:     '#0f1f0f',
    body:        '#3a4e3a',
    muted:       '#7a8c6a',
    accent:      '#1e5e32',
    ctaBorder:   '#1e5e32',
    ctaText:     '#1e5e32',
    ctaHoverBg:  '#1e5e32',
    ctaHoverText:'#ffffff',
    ruleLine:    '#cec8bc',
  },
  dark: {
    bg:          '#080e08',
    border:      '#243424',
    heading:     '#e0f0c8',
    body:        '#9abf7e',
    muted:       '#4e6e3e',
    accent:      '#7ec850',
    ctaBorder:   '#7ec850',
    ctaText:     '#7ec850',
    ctaHoverBg:  '#7ec850',
    ctaHoverText:'#080e08',
    ruleLine:    '#1a2a1a',
  },
}

type Props = { dark?: boolean }

const Blog = ({ dark = false }: Props) => {
  const tk = dark ? themes.dark : themes.light

  const [col1, col2, col3] = [
    blogPosts.slice(0, 2),
    blogPosts.slice(2, 4),
    blogPosts.slice(4, 6),
  ]

  return (
    <section
      style={{
        backgroundColor: tk.bg,
        borderTop:       `1px solid ${tk.border}`,
        transition:      'background-color 0.3s, border-color 0.3s',
      }}
      className="py-14 sm:py-20 md:py-28 -mb-10 px-6 sm:px-10 md:px-14 eb-garamond"
    >
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="text-center mb-2">
        <p
          className="text-[10px] font-bold uppercase tracking-[0.28em] mb-3"
          style={{ color: tk.accent, transition: 'color 0.3s' }}
        >
          Blog
        </p>
        <h2
          className="eb-garamond-semibold leading-tight"
          style={{ fontSize: 'clamp(26px,5vw,48px)', color: tk.heading, transition: 'color 0.3s' }}
        >
          Latest From Our Blog
        </h2>
        <div
          className="w-10 h-px mx-auto mt-4 mb-4 rounded-full"
          style={{ backgroundColor: tk.accent, opacity: 0.65, transition: 'background-color 0.3s' }}
        />
        <p
          className="cormorant-garamond-light-italic text-[16px] sm:text-[18px] max-w-2xl mx-auto leading-relaxed"
          style={{ color: tk.body, transition: 'color 0.3s' }}
        >
          Stay updated with the latest news, experiences, and insights from Agroterra Resort.
          Discover travel tips, upcoming events, wellness ideas, and highlights designed to help
          you make the most of your stay.
        </p>
      </div>

      {/* ── Blog grid ──────────────────────────────────────── */}
      <div className="py-10 sm:py-12 px-0 sm:px-4 md:px-8 lg:px-16">

        {/* Mobile: single column */}
        <div className="flex flex-col gap-6 sm:hidden">
          {blogPosts.map((post) => (
            <AnimatedBlogImage
              key={post.slug}
              src={post.src}
              title={post.title}
              slug={post.slug}
              reverse={post.reverse}
            />
          ))}
        </div>

        {/* Tablet: 2 columns */}
        <div className="hidden sm:grid md:hidden grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            {[blogPosts[0], blogPosts[2], blogPosts[4]].map((post) => (
              <AnimatedBlogImage
                key={post.slug}
                src={post.src}
                title={post.title}
                slug={post.slug}
                reverse={post.reverse}
              />
            ))}
          </div>
          <div className="flex flex-col gap-6">
            {[blogPosts[1], blogPosts[3], blogPosts[5]].map((post) => (
              <AnimatedBlogImage
                key={post.slug}
                src={post.src}
                title={post.title}
                slug={post.slug}
                reverse={post.reverse}
              />
            ))}
          </div>
        </div>

        {/* Desktop: 3 columns */}
        <div className="hidden md:flex justify-center gap-6">
          {[col1, col2, col3].map((col, i) => (
            <div key={i} className="flex flex-col w-1/3 gap-6">
              {col.map((post) => (
                <AnimatedBlogImage
                  key={post.slug}
                  src={post.src}
                  title={post.title}
                  slug={post.slug}
                  reverse={post.reverse}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ────────────────────────────────────────────── */}
      <div className="flex justify-center mt-2">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 rounded-full px-8 py-3.5
            text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.14em]
            transition-all duration-300"
          style={{
            border:          `1.5px solid ${tk.ctaBorder}`,
            color:           tk.ctaText,
            backgroundColor: 'transparent',
            transition:      'background-color 0.3s, color 0.3s, border-color 0.3s',
          }}
          onMouseOver={e => {
            const el = e.currentTarget
            el.style.backgroundColor = tk.ctaHoverBg
            el.style.color           = tk.ctaHoverText
            el.style.boxShadow       = `0 8px 28px ${tk.accent}40`
          }}
          onMouseOut={e => {
            const el = e.currentTarget
            el.style.backgroundColor = 'transparent'
            el.style.color           = tk.ctaText
            el.style.boxShadow       = 'none'
          }}
        >
          View All Posts
        </Link>
      </div>
    </section>
  )
}

export default Blog