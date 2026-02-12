'use client'

import { useState } from 'react'
import Image from 'next/image'

import icon from '../public/icon.svg'
import quote from '../public/icon2.svg'
import jenny from '../public/jenny.svg'
import mira from '../public/mira.svg'
import kevin from '../public/kevin.svg'

const reviews = [
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.',
    name: 'Mira',
    role: 'Marketing',
    avatar: mira,
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.',
    name: 'Kevin',
    role: 'CEO',
    avatar: kevin,
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.',
    name: 'Jenny',
    role: 'Designer',
    avatar: jenny,
  },
]

export default function Review() {
  const [active, setActive] = useState(1)

  return (
    <section className="bg-blue-50 py-12 sm:py-16 md:py-20">

      {/* Header */}
      <div className="flex flex-col items-center mb-10 sm:mb-14 px-4">
        <Image src={icon} alt="icon" className="w-8 h-8 sm:w-10 sm:h-10" />
        <h2 className="mt-4 text-[28px] sm:text-[36px] md:text-[42px] lg:text-[46px] text-[#1A1A1A] font-semibold eb-garamond text-center">
          Happy Customers
        </h2>
      </div>

      {/* ── Cards ──
          Mobile  : single card (show only active)
          Tablet+ : all three cards side by side
      */}
      <div className="px-4 sm:px-8 md:px-12">

        {/* Mobile: show only the active card */}
        <div className="sm:hidden flex justify-center">
          <div className="relative w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <div className="absolute -top-2 right-6">
              <Image src={quote} alt="quote" className="w-6 h-6" />
            </div>
            <p className="text-[14px] text-[#555555] work-sans leading-relaxed mb-6">
              &ldquo;{reviews[active].text}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <Image src={reviews[active].avatar} alt={reviews[active].name} className="rounded-full w-10 h-10" />
              <div>
                <h4 className="text-[#5A5A5A] font-medium text-[15px] work-sans">{reviews[active].name}</h4>
                <p className="text-[#5A5A5A] font-medium text-[13px] work-sans">{reviews[active].role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tablet+: all cards */}
        <div className="hidden sm:flex justify-center gap-4 md:gap-6 flex-wrap lg:flex-nowrap">
          {reviews.map((review, index) => (
            <div
              key={index}
              onClick={() => setActive(index)}
              className={`
                relative rounded-xl cursor-pointer bg-white p-6
                w-full sm:w-70 md:w-75 lg:w-[320px]
                transition-all duration-300
                ${index === active ? 'scale-105 shadow-xl' : 'opacity-70 hover:opacity-90'}
              `}
            >
              <div className="absolute -top-2 right-6">
                <Image src={quote} alt="quote" className="w-6 h-6" />
              </div>
              <p className="text-[13px] sm:text-[14px] text-[#555555] work-sans leading-relaxed mb-6">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <Image src={review.avatar} alt={review.name} className="rounded-full w-10 h-10" />
                <div>
                  <h4 className="text-[#5A5A5A] font-medium text-[15px] sm:text-[16px] work-sans">{review.name}</h4>
                  <p className="text-[#5A5A5A] font-medium text-[13px] sm:text-[14px] work-sans">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="mt-8 sm:mt-10 flex justify-center gap-2">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            className={`h-2 rounded-full transition-all cursor-pointer
              ${active === index ? 'bg-blue-600 w-5' : 'bg-gray-300 w-2'}
            `}
          />
        ))}
      </div>
    </section>
  )
}