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
    text: 'Our stay at Agroterra Resort was absolutely wonderful. The Family Suite was spacious, clean, and perfect for our needs. The environment was peaceful, the staff were friendly, and the gardens created a relaxing atmosphere. It felt like a true escape from the busy city life.',
    name: 'Mira',
    role: 'Marketing',
    avatar: mira,
  },
  {
    text: 'Agroterra exceeded my expectations. The rooms were comfortable, the service was professional, and the overall experience was seamless from check-in to checkout. It is the perfect place for both relaxation and small corporate retreats. I will definitely be visiting again.',
    name: 'Kevin',
    role: 'CEO',
    avatar: kevin,
  },
  {
    text: 'I loved the calm and natural setting of the resort. The rooms were beautifully maintained, and every space felt fresh and inviting. The attention to detail and the quiet surroundings made my stay inspiring and refreshing. Highly recommended for a peaceful getaway.',
    name: 'Jenny',
    role: 'Designer',
    avatar: jenny,
  },
]

export default function Review() {
  const [active, setActive] = useState(1)

  return (
    <section className="bg-[#F8FAF6] py-14 sm:py-20">

      {/* Header */}
      <div className="flex flex-col items-center mb-12 sm:mb-16 px-4">
        <Image src={icon} alt="" className="w-8 h-8 sm:w-10 sm:h-10" />
        <h2 className="mt-4 text-[28px] sm:text-[36px] md:text-[44px] text-[#1B201E] eb-garamond font-semibold text-center">
          Happy Customers
        </h2>
        {/* Accent line */}
        <div className="mt-3 w-10 h-0.5 bg-[#28683E]" />
      </div>

      {/* ── Cards ── */}
      <div className="px-4 sm:px-8 md:px-12">

        {/* Mobile: single active card */}
        <div className="sm:hidden flex justify-center">
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
            <div className="absolute -top-3 right-5">
              <Image src={quote} alt="" className="w-7 h-7" />
            </div>
            <p className="text-[14px] text-gray-500 work-sans leading-[1.75] mb-6">
              &ldquo;{reviews[active].text}&rdquo;
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 shrink-0">
                <Image
                  src={reviews[active].avatar}
                  alt={reviews[active].name}
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <p className="text-[14px] font-semibold text-[#1B201E] work-sans">{reviews[active].name}</p>
                <p className="text-[12px] text-gray-400 work-sans">{reviews[active].role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tablet+: all three cards */}
        <div className="hidden sm:flex justify-center items-stretch gap-4 md:gap-6">
          {reviews.map((review, index) => (
            <div
              key={index}
              onClick={() => setActive(index)}
              className="relative rounded-2xl bg-white p-6 cursor-pointer border transition-all duration-300 flex flex-col"
              style={{
                width: '300px',
                flexShrink: 0,
                // Fix: add z-index so active card scales above siblings
                zIndex: index === active ? 10 : 1,
                transform: index === active ? 'scale(1.04)' : 'scale(1)',
                boxShadow:
                  index === active
                    ? '0 20px 40px rgba(0,0,0,0.10)'
                    : '0 2px 8px rgba(0,0,0,0.04)',
                borderColor: index === active ? '#28683E' : '#f0f0f0',
                opacity: index === active ? 1 : 0.65,
                transition: 'all 0.3s ease',
              }}
            >
              {/* Quote icon */}
              <div className="absolute -top-3 right-5">
                <Image src={quote} alt="" className="w-6 h-6" />
              </div>

              {/* Active indicator dot */}
              {index === active && (
                <div
                  className="absolute top-4 left-4 w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: '#28683E' }}
                />
              )}

              <p className="text-[13px] sm:text-[14px] text-gray-500 work-sans leading-[1.8] mb-6 flex-1">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Divider */}
              <div className="h-px bg-gray-100 mb-4" />

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 shrink-0">
                  <Image
                    src={review.avatar}
                    alt={review.name}
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[#1B201E] work-sans">{review.name}</p>
                  <p className="text-[12px] text-gray-400 work-sans">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots — shared between mobile and desktop */}
      <div className="mt-10 flex justify-center gap-2">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            aria-label={`View review ${index + 1}`}
            className="h-2 rounded-full cursor-pointer transition-all duration-300"
            style={{
              width: active === index ? '20px' : '8px',
              backgroundColor: active === index ? '#28683E' : '#d1d5db',
            }}
          />
        ))}
      </div>
    </section>
  )
}