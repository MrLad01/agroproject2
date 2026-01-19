'use client'

import Image from 'next/image'
import image1 from '@/public/relaxation.png'
import image2 from '@/public/contact.png'
import React from 'react'

const SectionOne = () => {
  return (
    <div className="bg-white py-20 px-40 flex flex-col items-center">
      <h2 className="text-[#1A1A1A] text-center text-[46px] font-semibold eb-garamond-semibold">
        WELCOME TO AGROTERRA
      </h2>

      <p className="text-[#5A5A5A] text-center text-[28px] max-w-120 eb-garamond-italic">
        &ldquo; A place that celebrates life rather than sucks life out of it.&rdquo;
      </p>

      <div className="flex gap-10 mt-12 items-center">
        <Image src={image1} alt='' />
        <Image src={image2} alt='' />
      </div>

    </div>
  )
}

export default SectionOne
