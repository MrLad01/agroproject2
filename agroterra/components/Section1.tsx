'use client'

import Image from 'next/image'
import image1 from '@/public/relaxation.png'
import image2 from '@/public/contact.png'
import React from 'react'

const SectionOne = () => {
  return (
    <div className="bg-white py-12 sm:py-16 md:py-20 px-6 sm:px-12 md:px-20 lg:px-40 flex flex-col items-center">
      <h2 className="text-[#1A1A1A] text-center text-[28px] sm:text-[36px] md:text-[42px] lg:text-[46px] font-semibold eb-garamond-semibold">
        WELCOME TO AGROTERRA
      </h2>

      <p className="text-[#5A5A5A] text-center text-[18px] sm:text-[22px] md:text-[26px] lg:text-[28px] max-w-[90vw] sm:max-w-120 md:max-w-120 eb-garamond-italic mt-3">
        &ldquo;A place that celebrates life rather than sucks life out of it.&rdquo;
      </p>

      {/* Images: stack on mobile, side by side on md+ */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-10 mt-10 sm:mt-12 items-center w-full justify-center">
        <Image
          src={image1}
          alt="Relaxation at Agroterra"
          className="w-full sm:w-1/2 max-w-sm sm:max-w-none rounded-lg object-cover"
        />
        <Image
          src={image2}
          alt="Agroterra contact area"
          className="w-full sm:w-1/2 max-w-sm sm:max-w-none rounded-lg object-cover"
        />
      </div>
    </div>
  )
}

export default SectionOne