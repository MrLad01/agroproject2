'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
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
  },
  {
    title: 'NATURE WALK',
    description:
      'Reconnect with nature as you stroll through serene walking paths, lush gardens, and scenic trails crafted for relaxation and mindfulness.',
    cta: 'EXPLORE THE TRAILS',
    image: background4,
  },
  {
    title: 'RELAXATION',
    description:
      'Indulge in a calming escape with rejuvenating spa therapies and peaceful spaces designed to restore balance to your body and mind.',
    cta: 'BOOK A SESSION',
    image: relaxation,
  },
  {
    title: 'OUTDOOR DINING',
    description:
      'Savor thoughtfully prepared meals made from fresh ingredients, served in an open-air setting that blends fine dining with nature.',
    cta: 'VIEW THE MENU',
    image: kitchen,
  },
]

const ExperienceCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const totalSlides = slides.length
  const currentSlide = slides[currentIndex]

  // 🔁 Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === totalSlides - 1 ? 0 : prev + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [totalSlides])

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? totalSlides - 1 : prev - 1
    )
  }

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === totalSlides - 1 ? 0 : prev + 1
    )
  }

  return (
    <div className="relative w-180 h-116 rounded-2xl overflow-hidden shadow-lg">
      <Image
        src={currentSlide.image}
        alt={currentSlide.title}
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-black/25" />

      <div className="relative z-10 h-full flex flex-col justify-between p-6 text-white">
        <div>
          <p className="text-sm tracking-wider text-white work-sans font-bold">
            {String(currentIndex + 1).padStart(2, '0')} /{' '}
            {String(totalSlides).padStart(2, '0')}
          </p>

          <h3 className="text-[48px] text-white font-extrabold eb-garamond">
            {currentSlide.title}
          </h3>

          <p className="text-sm leading-relaxed max-w-100 opacity-90">
            {currentSlide.description}
          </p>
        </div>

        <div className="flex flex-col absolute bottom-2 left-[38%] items-center gap-3">
          <button className="px-6 py-2 rounded-full border border-white text-xs font-semibold tracking-wider hover:bg-white hover:text-black transition cursor-pointer">
            {currentSlide.cta}
          </button>

          <div className="flex gap-3">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-[#1E3A8A] cursor-pointer flex items-center justify-center hover:scale-105 transition"
            >
              <ArrowLeft className="text-white" />
            </button>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-[#1E3A8A] cursor-pointer flex items-center justify-center hover:scale-105 transition"
            >
              <ArrowRight className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExperienceCard
