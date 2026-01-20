import Image from 'next/image'
import golf from '../public/golf carousel.svg'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const ExperienceCard = () => {
  return (
    <div className="relative w-105 h-130 rounded-2xl overflow-hidden shadow-lg">
      {/* Background Image */}
      <Image
        src={golf}
        alt="Golf Course"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/25" />

      <div className="relative z-10 h-full flex flex-col justify-between p-6 text-white">
        <div>
          <p className="text-xs tracking-widest text-[#1A1A1A] opacity-80">01 / 04</p>
          <h3 className="text-[44px] text-[#1A1A1A] font-semibold eb-garamond mt-2">
            GOLF COURSE
          </h3>

          <p className="text-sm mt-4 leading-relaxed max-w-[90%] opacity-90">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-6">
          <button className="px-6 py-2 rounded-full border border-white text-xs font-semibold tracking-wider hover:bg-white hover:text-black transition">
            GOLF WITH US
          </button>

          {/* Navigation */}
          <div className="flex gap-3">
            <button className="w-10 h-10 rounded-full bg-[#1E3A8A] flex items-center justify-center">
              <ArrowLeft />
            </button>
            <button className="w-10 h-10 rounded-full bg-[#1E3A8A] flex items-center justify-center">
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExperienceCard
