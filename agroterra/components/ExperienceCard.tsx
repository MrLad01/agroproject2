'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import golf from '../public/golf carousel.svg'
import kitchen from '@/public/kitchen.png'
import background4 from '@/public/house1.png'
import relaxation from '@/public/relaxation2.png'

const slides = [
  {
    title: 'GOLF COURSE',
    description:
      'Tee off on a world-class golf course surrounded by rolling greens, palm trees, and tranquil landscapes designed for both leisure and competition.',
    cta: 'GOLF WITH US',
    image: golf,
    href: '/golf',
  },
  {
    title: 'NATURE WALK',
    description:
      'Reconnect with nature as you stroll through serene walking paths, lush gardens, and scenic trails crafted for relaxation and mindfulness.',
    cta: 'EXPLORE THE TRAILS',
    image: background4,
    href: '/',
  },
  {
    title: 'RELAXATION',
    description:
      'Indulge in a calming escape with rejuvenating spa therapies and peaceful spaces designed to restore balance to your body and mind.',
    cta: 'BOOK A SESSION',
    image: relaxation,
    href: '/',
  },
  {
    title: 'INDOOR DINING',
    description:
      'Savor thoughtfully prepared meals made from fresh ingredients, served in an open-air setting that blends fine dining with nature.',
    cta: 'VIEW THE MENU',
    image: kitchen,
    href: '/dining',
  },
]

export default function ExperienceCard() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [animating, setAnimating] = useState(false)

  const totalSlides = slides.length

  const goTo = useCallback(
    (next: number) => {
      if (animating) return
      setAnimating(true)
      setCurrentIndex(next)
      setTimeout(() => setAnimating(false), 400)
    },
    [animating]
  )

  const handlePrev = () =>
    goTo(currentIndex === 0 ? totalSlides - 1 : currentIndex - 1)

  const handleNext = () =>
    goTo(currentIndex === totalSlides - 1 ? 0 : currentIndex + 1)

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [totalSlides])

  const slide = slides[currentIndex]

  return (
    <div className="relative w-full max-w-180 aspect-720/464 rounded-2xl overflow-hidden shadow-2xl">

      {/* Background image — key forces remount for crossfade */}
      <div
        key={currentIndex}
        className="absolute inset-0 transition-opacity duration-500"
        style={{ opacity: animating ? 0 : 1 }}
      >
        <Image
          src={slide.image}
          alt={slide.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Overlay — stronger at bottom for text legibility */}
      <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/30 to-black/10" />

      {/* Slide counter — top left */}
      <div className="absolute top-5 left-6 z-10">
        <p className="text-[11px] tracking-[0.2em] text-white/70 font-medium work-sans">
          {String(currentIndex + 1).padStart(2, '0')}
          <span className="mx-1 opacity-40">/</span>
          {String(totalSlides).padStart(2, '0')}
        </p>
      </div>

      {/* Progress bar */}
      <div className="absolute top-0 inset-x-0 h-0.5 bg-white/15 z-10">
        <div
          className="h-full bg-white/70 transition-none"
          style={{ width: `${((currentIndex + 1) / totalSlides) * 100}%`, transition: 'width 0.4s ease' }}
        />
      </div>

      {/* Content — always anchored to bottom */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8 flex flex-col gap-3">

        {/* Title */}
        <h3
          className="eb-garamond text-[36px] sm:text-[48px] font-extrabold text-white leading-none tracking-tight"
          style={{ opacity: animating ? 0 : 1, transform: animating ? 'translateY(6px)' : 'translateY(0)', transition: 'opacity 0.4s ease, transform 0.4s ease' }}
        >
          {slide.title}
        </h3>

        {/* Description */}
        <p
          className="text-[13px] sm:text-[14px] text-white/85 leading-relaxed max-w-105 work-sans"
          style={{ opacity: animating ? 0 : 1, transition: 'opacity 0.35s ease 0.05s' }}
        >
          {slide.description}
        </p>

        {/* CTA + arrows — in a row, no absolute positioning */}
        <div className="flex items-center justify-between mt-2">

          <Link href={slide.href}>
            <button className="px-5 py-2 rounded-full border border-white/80 text-white text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-white hover:text-black transition-all duration-200 cursor-pointer">
              {slide.cta}
            </button>
          </Link>

          {/* Navigation arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous slide"
              className="w-9 h-9 rounded-full flex items-center justify-center border border-white/30 text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <ArrowLeft size={15} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next slide"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-[#28683E] text-white hover:bg-[#1f5432] transition-colors cursor-pointer"
            >
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute top-5 right-6 z-10 flex flex-col gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="cursor-pointer transition-all duration-300"
            style={{
              width: '4px',
              height: i === currentIndex ? '20px' : '4px',
              borderRadius: '2px',
              backgroundColor: i === currentIndex ? 'white' : 'rgba(255,255,255,0.35)',
            }}
          />
        ))}
      </div>
    </div>
  )
}