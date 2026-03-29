'use client'

import AnimatedBlogImage from '@/components/AnimatedBlogImage'
import { blogPosts } from '@/data/blogData'

const Blog = () => {
  const [col1, col2, col3] = [
    blogPosts.slice(0, 2),
    blogPosts.slice(2, 4),
    blogPosts.slice(4, 6),
  ]

  return (
    <div className="bg-white py-12 px-6 sm:px-10 md:px-14">

      {/* Header */}
      <h1 className="text-[#1A1A1A] text-center tracking-[0.28rem] text-[13px] sm:text-[16px] font-bold">
        BLOG
      </h1>
      <h2 className="text-[#1A1A1A] text-center text-[28px] sm:text-[36px] md:text-[42px] lg:text-[46px] font-semibold eb-garamond">
        Latest From Our Blog
      </h2>
      <p className="text-[#5A5A5A] text-center text-[14px] sm:text-[16px] mt-1">
        Stay updated with the latest news, experiences, and insights from Agroterra Resort.<br /> Discover travel tips, upcoming events, wellness ideas, and highlights designed to help you make the most of your stay and enjoy every moment with us.
      </p>

      {/* ── Blog grid ── */}
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

      {/* CTA */}
      <div className="flex justify-center mt-2">
        <button className="border text-[#101996] rounded-3xl cursor-pointer hover:scale-110 transition duration-300 ease-in-out border-[#101996] px-6 py-3 text-[12px] sm:text-[13px]">
          VIEW ALL BLOG
        </button>
      </div>
    </div>
  )
}

export default Blog