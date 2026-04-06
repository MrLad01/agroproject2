'use client'

import { useState } from 'react'
import Image from 'next/image'

import icon from '../public/icon.svg'
import quote from '../public/icon2.svg'
import jenny from '../public/jenny.svg'
import mira from '../public/mira.svg'
import kevin from '../public/kevin.svg'

// ── Theme tokens ──────────────────────────────────────────────────
const themes = {
  light: {
    bg:            '#f8f5ef',
    cardBg:        '#ffffff',
    cardBorder:    '#f0ece4',
    cardActive:    '#1e5e32',
    cardShadow:    '0 20px 48px rgba(0,0,0,0.09)',
    cardShadowSm:  '0 2px 8px rgba(0,0,0,0.04)',
    heading:       '#0f1f0f',
    body:          '#6b7c6b',
    name:          '#1a2e1a',
    role:          '#9aac8a',
    divider:       '#f0ece4',
    accent:        '#1e5e32',
    dotActive:     '#1e5e32',
    dotInactive:   '#d1d5db',
    border:        '#ddd5c4',
    avatarBg:      '#eef5ea',
  },
  dark: {
    bg:            '#080e08',
    cardBg:        '#0f180f',
    cardBorder:    '#1e2e1e',
    cardActive:    '#7ec850',
    cardShadow:    '0 20px 48px rgba(0,0,0,0.55)',
    cardShadowSm:  '0 2px 8px rgba(0,0,0,0.3)',
    heading:       '#e0f0c8',
    body:          '#7a9a6a',
    name:          '#c8e6a0',
    role:          '#4e6e3e',
    divider:       '#1e2e1e',
    accent:        '#7ec850',
    dotActive:     '#7ec850',
    dotInactive:   '#2a3d2a',
    border:        '#243424',
    avatarBg:      '#162016',
  },
}

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

type Props = { dark?: boolean }

export default function Review({ dark = false }: Props) {
  const [active, setActive] = useState(1)
  const tk = dark ? themes.dark : themes.light

  return (
    <section
      style={{
        backgroundColor: tk.bg,
        borderTop:       `1px solid ${tk.border}`,
        transition:      'background-color 0.3s, border-color 0.3s',
      }}
      className="py-14 sm:py-20 md:py-28"
    >
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="flex flex-col items-center mb-12 sm:mb-16 px-4">
        {/* Icon tinted in dark mode via filter */}
        <div
          className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full"
          style={{ backgroundColor: `${tk.accent}18`, border: `1px solid ${tk.accent}30` }}
        >
          <Image src={icon} alt="" className="w-5 h-5 sm:w-6 sm:h-6"
            style={{ filter: dark ? 'brightness(0) saturate(100%) invert(72%) sepia(60%) saturate(400%) hue-rotate(60deg)' : 'none' }}
          />
        </div>

        <p
          className="mt-5 text-[10px] font-bold uppercase tracking-[0.28em] mb-2"
          style={{ color: tk.accent, transition: 'color 0.3s' }}
        >
          Testimonials
        </p>

        <h2
          className="eb-garamond-semibold text-center leading-tight"
          style={{ fontSize: 'clamp(26px,5vw,46px)', color: tk.heading, transition: 'color 0.3s' }}
        >
          Happy Customers
        </h2>

        <div
          className="mt-4 w-10 h-0.5 rounded-full"
          style={{ backgroundColor: tk.accent, opacity: 0.7, transition: 'background-color 0.3s' }}
        />
      </div>

      {/* ── Cards ──────────────────────────────────────────── */}
      <div className="px-4 sm:px-8 md:px-12">

        {/* Mobile: single active card */}
        <div className="sm:hidden flex justify-center">
          <div
            className="relative w-full max-w-sm rounded-2xl p-6"
            style={{
              backgroundColor: tk.cardBg,
              border:          `1px solid ${tk.cardActive}`,
              boxShadow:       tk.cardShadow,
              transition:      'background-color 0.3s, border-color 0.3s, box-shadow 0.3s',
            }}
          >
            {/* Top accent bar */}
            <div className="absolute top-0 left-8 right-8 h-0.5 rounded-full"
              style={{ background: `linear-gradient(to right, transparent, ${tk.accent}, transparent)` }} />

            <div className="absolute -top-3 right-5">
              <Image src={quote} alt="" className="w-7 h-7"
                style={{ filter: dark ? 'brightness(0) saturate(100%) invert(72%) sepia(60%) saturate(400%) hue-rotate(60deg)' : 'none' }} />
            </div>

            <p
              className="text-[14px] work-sans leading-[1.8] mb-6"
              style={{ color: tk.body, transition: 'color 0.3s' }}
            >
              &ldquo;{reviews[active].text}&rdquo;
            </p>

            <div className="h-px mb-4" style={{ backgroundColor: tk.divider }} />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0"
                style={{ backgroundColor: tk.avatarBg }}>
                <Image src={reviews[active].avatar} alt={reviews[active].name}
                  width={40} height={40} className="object-cover w-full h-full" />
              </div>
              <div>
                <p className="text-[14px] font-semibold work-sans"
                  style={{ color: tk.name, transition: 'color 0.3s' }}>
                  {reviews[active].name}
                </p>
                <p className="text-[12px] work-sans"
                  style={{ color: tk.role, transition: 'color 0.3s' }}>
                  {reviews[active].role}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tablet+: three cards */}
        <div className="hidden sm:flex justify-center items-stretch gap-4 md:gap-6">
          {reviews.map((review, index) => {
            const isActive = index === active
            return (
              <div
                key={index}
                onClick={() => setActive(index)}
                className="relative rounded-2xl p-6 cursor-pointer flex flex-col"
                style={{
                  width:           300,
                  flexShrink:      0,
                  zIndex:          isActive ? 10 : 1,
                  transform:       isActive ? 'scale(1.04)' : 'scale(1)',
                  backgroundColor: tk.cardBg,
                  border:          `1px solid ${isActive ? tk.cardActive : tk.cardBorder}`,
                  boxShadow:       isActive ? tk.cardShadow : tk.cardShadowSm,
                  opacity:         isActive ? 1 : 0.55,
                  transition:      'all 0.35s cubic-bezier(0.22,1,0.36,1)',
                }}
              >
                {/* Top accent bar on active */}
                {isActive && (
                  <div className="absolute top-0 left-8 right-8 h-0.5 rounded-full"
                    style={{ background: `linear-gradient(to right, transparent, ${tk.accent}, transparent)` }} />
                )}

                {/* Quote icon */}
                <div className="absolute -top-3 right-5">
                  <Image src={quote} alt="" className="w-6 h-6"
                    style={{ filter: dark ? 'brightness(0) saturate(100%) invert(72%) sepia(60%) saturate(400%) hue-rotate(60deg)' : 'none' }} />
                </div>

                {/* Active dot */}
                {isActive && (
                  <div className="absolute top-4 left-4 w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: tk.accent }} />
                )}

                <p
                  className="text-[13px] sm:text-[14px] work-sans leading-[1.85] mb-6 flex-1"
                  style={{ color: tk.body, transition: 'color 0.3s' }}
                >
                  &ldquo;{review.text}&rdquo;
                </p>

                <div className="h-px mb-4" style={{ backgroundColor: tk.divider }} />

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0"
                    style={{ backgroundColor: tk.avatarBg }}>
                    <Image src={review.avatar} alt={review.name}
                      width={40} height={40} className="object-cover w-full h-full" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold work-sans"
                      style={{ color: tk.name, transition: 'color 0.3s' }}>
                      {review.name}
                    </p>
                    <p className="text-[12px] work-sans"
                      style={{ color: tk.role, transition: 'color 0.3s' }}>
                      {review.role}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Dots ───────────────────────────────────────────── */}
      <div className="mt-10 flex justify-center gap-2.5">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            aria-label={`View review ${index + 1}`}
            className="h-2 rounded-full cursor-pointer"
            style={{
              width:           active === index ? 22 : 8,
              backgroundColor: active === index ? tk.dotActive : tk.dotInactive,
              transition:      'width 0.35s cubic-bezier(0.22,1,0.36,1), background-color 0.3s',
            }}
          />
        ))}
      </div>
    </section>
  )
}