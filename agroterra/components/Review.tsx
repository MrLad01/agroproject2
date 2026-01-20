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
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.',
    name: 'Mira',
    role: 'Marketing',
    avatar: mira,
  },
  {
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.',
    name: 'Kevin',
    role: 'CEO',
    avatar: kevin,
  },
  {
    text:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.',
    name: 'Jenny',
    role: 'Designer',
    avatar: jenny,
  },
]

export default function Review() {
  const [active, setActive] = useState(1)

  return (
    <section className="bg-blue-50 py-20">
      {/* Header */}
      <div className="flex flex-col items-center mb-14">
        <Image src={icon} alt="icon" />
        <h2 className="mt-4 text-[46px] text-[#1A1A1A] font-semibold eb-garamond">
          Happy Customers
        </h2>
      </div>

      {/* Cards */}
      <div className="flex justify-center gap-6 px-6">
        {reviews.map((review, index) => (
          <div
            key={index}
            onClick={() => setActive(index)}
            className={`relative w-[320px] rounded-xl cursor-pointer bg-white p-6 transition-all duration-300
              ${index === active ? 'scale-105 shadow-xl' : 'opacity-70'}
            `}
          >
            <div className="absolute -top-2 right-6">
              <Image src={quote} alt="quote" />
            </div>

            <p className="text-[14px] text-[#555555] work-sans leading-relaxed mb-6">
              &ldquo;{review.text}&rdquo;
            </p>

            <div className="flex items-center gap-3">
              <Image
                src={review.avatar}
                alt={review.name}
                className="rounded-full"
              />
              <div>
                <h4 className=" text-[#5A5A5A] font-medium text-[16px] work-sans">
                  {review.name}
                </h4>
                <p className="text-[#5A5A5A] font-medium text-[14px] work-sans">{review.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center gap-2">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            className={`h-2 w-2 rounded-full transition-all cursor-pointer
              ${active === index ? 'bg-blue-600 w-2' : 'bg-gray-300'}
            `}
          />
        ))}
      </div>
    </section>
  )
}
