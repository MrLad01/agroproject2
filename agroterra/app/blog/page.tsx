import Image from 'next/image'
import Link from 'next/link'
import { blogPosts } from '@/data/blogData'
import Navbar from '@/components/Navbar'

export default function BlogPage() {
  const [featured, ...rest] = blogPosts

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero banner ── */}
      <div className="relative w-full h-[38vh] min-h-65 overflow-hidden">
        <Image
          src={featured.src}
          alt="Blog"
          fill
          className="object-cover"
          priority
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, #1B201Eaa, #1B201Ef0)' }}
        />
        <div className="absolute inset-x-0 top-0 z-10 px-6 sm:px-10 md:px-16 py-5">
          <Navbar />
        </div>
        <div className="absolute inset-x-0 bottom-0 z-10 px-6 sm:px-10 md:px-16 pb-10">
          <p className="text-[10px] tracking-[0.22em] uppercase mb-3" style={{ color: '#61A962' }}>
            Agroterra
          </p>
          <h1
            className="eb-garamond-semibold text-[32px] sm:text-[46px] leading-tight"
            style={{ color: '#F8FAF6' }}
          >
            Stories & Insights
          </h1>
        </div>
      </div>

      {/* ── Featured post ── */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 md:px-16 mt-14">
        <p
          className="text-[10px] tracking-[0.2em] uppercase mb-6"
          style={{ color: '#28683E' }}
        >
          Featured
        </p>

        <Link
          href={`/blog/${featured.slug}`}
          className="group flex flex-col sm:flex-row gap-8 sm:gap-12 items-start"
        >
          {/* Image */}
          <div className="w-full sm:w-[52%] aspect-16/10 relative overflow-hidden shrink-0">
            <Image
              src={featured.src}
              alt={featured.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>

          {/* Text */}
          <div className="flex-1 flex flex-col justify-center py-2">
            <h2
              className="eb-garamond-semibold text-[26px] sm:text-[34px] leading-tight mb-4 group-hover:opacity-70 transition-opacity"
              style={{ color: '#1B201E' }}
            >
              {featured.title}
            </h2>
            <p className="text-[14px] leading-relaxed mb-6 text-gray-500">
              {featured.excerpt}
            </p>
            <span
              className="text-[11px] tracking-[0.15em] uppercase self-start"
              style={{ color: '#28683E' }}
            >
              Read Article →
            </span>
          </div>
        </Link>

        {/* Divider */}
        <div className="mt-14 mb-12 h-px bg-gray-100" />

        {/* ── Grid of remaining posts ── */}
        <p
          className="text-[10px] tracking-[0.2em] uppercase mb-8"
          style={{ color: '#28683E' }}
        >
          All Posts
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 pb-24">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col"
            >
              {/* Thumbnail */}
              <div className="w-full aspect-4/3 relative overflow-hidden mb-4">
                <Image
                  src={post.src}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>

              {/* Title */}
              <h3
                className="eb-garamond-semibold text-[19px] sm:text-[21px] leading-snug mb-2 group-hover:opacity-60 transition-opacity"
                style={{ color: '#1B201E' }}
              >
                {post.title}
              </h3>

              {/* Excerpt */}
              <p className="text-[13px] leading-relaxed text-gray-500 line-clamp-3 mb-3 flex-1">
                {post.excerpt}
              </p>

              {/* Read link */}
              <span
                className="text-[11px] tracking-[0.13em] uppercase mt-auto"
                style={{ color: '#28683E' }}
              >
                Read →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}