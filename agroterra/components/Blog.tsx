'use client'

import React from 'react'
import AnimatedBlogImage from '@/components/AnimatedBlogImage'

import g1 from '../public/09.png'
import g2 from '../public/11.png'
import g3 from '../public/13.png'
import g4 from '../public/15.png'
import g5 from '../public/17.png'
import g6 from '../public/agroterra.png'

const Blog = () => {
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et rhoncus lacus.
      </p>

      {/* ── Blog grid ──
          Mobile  : single column, images full width
          Tablet  : 2 columns
          Desktop : 3 columns (original layout)
      */}
      <div className="py-10 sm:py-12 px-0 sm:px-4 md:px-8 lg:px-16">

        {/* Mobile: single column */}
        <div className="flex flex-col gap-6 sm:hidden">
          <AnimatedBlogImage src={g1} title="Golf Course" />
          <AnimatedBlogImage src={g2} title="Cottonwood Cove established Resort & Marina" reverse />
          <AnimatedBlogImage src={g3} title="Benefits of Having Online Registration at Your Hotel" reverse />
          <AnimatedBlogImage src={g4} title="Headwaters at Eagle Ranch Resort" />
          <AnimatedBlogImage src={g5} title="Food Rocks food festival, Lyme Regis" />
          <AnimatedBlogImage src={g6} title="Your Hotel Digital Marketing Checklist" reverse />
        </div>

        {/* Tablet: 2 columns */}
        <div className="hidden sm:grid md:hidden grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            <AnimatedBlogImage src={g1} title="Golf Course" />
            <AnimatedBlogImage src={g3} title="Benefits of Having Online Registration at Your Hotel" reverse />
            <AnimatedBlogImage src={g5} title="Food Rocks food festival, Lyme Regis" />
          </div>
          <div className="flex flex-col gap-6">
            <AnimatedBlogImage src={g2} title="Cottonwood Cove established Resort & Marina" reverse />
            <AnimatedBlogImage src={g4} title="Headwaters at Eagle Ranch Resort" />
            <AnimatedBlogImage src={g6} title="Your Hotel Digital Marketing Checklist" reverse />
          </div>
        </div>

        {/* Desktop: 3 columns (original) */}
        <div className="hidden md:flex justify-center gap-6">
          <div className="flex flex-col w-1/3 gap-6">
            <AnimatedBlogImage src={g1} title="Golf Course" />
            <AnimatedBlogImage src={g2} title="Cottonwood Cove established Resort & Marina" reverse />
          </div>
          <div className="flex flex-col w-1/3 gap-6">
            <AnimatedBlogImage src={g3} title="Benefits of Having Online Registration at Your Hotel" reverse />
            <AnimatedBlogImage src={g4} title="Headwaters at Eagle Ranch Resort" />
          </div>
          <div className="flex flex-col w-1/3 gap-6">
            <AnimatedBlogImage src={g5} title="Food Rocks food festival, Lyme Regis" />
            <AnimatedBlogImage src={g6} title="Your Hotel Digital Marketing Checklist" reverse />
          </div>
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