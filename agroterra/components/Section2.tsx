'use client'

import React from 'react'
import AnimatedBlogImage from '@/components/AnimatedBlogImage'

import g1 from '../public/09.png'
import g2 from '../public/11.png'
import g3 from '../public/13.png'
import g4 from '../public/15.png'
import g5 from '../public/17.png'
import g6 from '../public/agroterra.png'

const SectionTwo = () => {
  return (
    <div className="bg-white py-12 px-14">
      <h1 className="text-[#1A1A1A] uppercase text-center tracking-[0.28rem] text-[16px] font-bold">
        explore
      </h1>

      <h2 className="text-[#1A1A1A] text-center text-[46px] font-semibold eb-garamond">
        A Place That Fits You
      </h2>

      <p className="text-[#5A5A5A] text-center text-[16px]">
        Lorem ipsum dolor sit amet, consectetur <br />
        adipiscing elit. Sed et rhoncus lacus.
      </p>

      {/* Images */}
      <div className="flex justify-center py-12 px-24 gap-6">
        {/* Column 1 */}
        <div className="flex flex-col w-1/3 gap-6">
          <AnimatedBlogImage
            src={g1}
            title="Golf Course"
          />
          <AnimatedBlogImage
            src={g2}
            title="Cottonwood Cove established Resort & Marina"
            reverse
          />
        </div>

        {/* Column 2 */}
        <div className="flex flex-col w-1/3 gap-6">
          <AnimatedBlogImage
            src={g3}
            title="Benefits of Having Online Registration at Your Hotel"
            reverse
          />
          <AnimatedBlogImage
            src={g4}
            title="Headwaters at Eagle Ranch Resort"
          />
        </div>

        {/* Column 3 */}
        <div className="flex flex-col w-1/3 gap-6">
          <AnimatedBlogImage
            src={g5}
            title="Food Rocks food festival, Lyme Regis"
          />
          <AnimatedBlogImage
            src={g6}
            title="Your Hotel Digital Marketing Checklist"
            reverse
          />
        </div>
      </div>
    </div>
  )
}

export default SectionTwo
