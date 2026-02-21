"use client"

import Image from 'next/image'
import Link from 'next/link'
import logo from '@/public/ASA logo.jpg'
import { FaConciergeBell } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import junior from '@/public/juniorBed.png'

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

// ─── Shared paragraph component to avoid repetition ──────────────────────────

function AnimatedParagraph({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay }}
      className="work-sans text-[#2a2a2a] tracking-wide leading-relaxed
        text-[14px] sm:text-[15px] lg:text-[16px]
        mt-6 sm:mt-8 lg:mt-10"
    >
      {children}
    </motion.p>
  )
}

// ─── Shared media container ───────────────────────────────────────────────────

function MediaContainer({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      transition={{ duration: 1 }}
      className={`flex justify-center ${className}`}
    >
      <div className="relative w-full sm:w-[85%] md:w-[75%] lg:w-[70%] aspect-video rounded-xl overflow-hidden shadow-lg">
        {children}
      </div>
    </motion.div>
  )
}

// ─── Tab content ──────────────────────────────────────────────────────────────

const tabContent: Record<string, { paragraphs: string[]; videoSrc: string }> = {
  bedroom: {
    paragraphs: [
      'The junior bedroom at Agroterra Resort is thoughtfully designed to provide a warm, spacious, and relaxing environment where families can unwind, reconnect, and enjoy quality time together. From the moment guests enter, they are welcomed by a calming atmosphere inspired by nature, comfort, and modern elegance. The room is carefully arranged to balance functionality with a sense of retreat, ensuring that every family member feels at home throughout their stay.',
      'The layout is intentionally spacious to accommodate families comfortably without feeling crowded. A large, comfortable king size bed serves as the centerpiece for parents, dressed in premium linens, soft pillows, and a plush duvet that promises restful sleep. Additional sleeping arrangements are provided through cozy twin beds or a stylish sofa bed, making the space flexible for children or extra guests. Each sleeping area is positioned to allow privacy while maintaining a shared family atmosphere.',
      'Natural light plays an important role in the room\'s ambiance. Large windows or sliding glass doors invite sunlight to fill the space during the day while offering beautiful views of the resort\'s lush greenery, landscaped gardens, or serene natural surroundings. Blackout curtains and sheer drapes allow guests to control lighting and privacy according to their preference, ensuring comfort both day and night.',
      'The interior design reflects the spirit of Agroterra, blending natural textures, warm earth tones, and modern finishes. Wooden accents, soft fabrics, and subtle decorative elements create a welcoming environment that feels both luxurious and grounded. The room includes a dedicated sitting area where families can relax together, read, watch television, or plan their activities for the day.',
      'Modern amenities are thoughtfully integrated to enhance convenience and entertainment. A large flat screen television with family friendly channels, high speed wireless internet, and multiple charging ports ensure that both adults and children stay connected and entertained. A work desk and comfortable chair provide space for remote work or personal tasks, while ample storage including wardrobes, drawers, and luggage space helps keep the room organized throughout the stay.',
      'For added comfort, the family bedroom is equipped with climate control, allowing guests to adjust the temperature to their liking regardless of the season. A mini refrigerator, coffee and tea station, and complimentary bottled water add a touch of convenience, making it easy for families to refresh at any time. Safety features such as secure locks, smoke detectors, and child friendly design considerations provide peace of mind for parents.',
    ],
    videoSrc: 'https://www.youtube.com/embed/CdNSFf2hjEE?si=WUJXoytTL9YNF4W-',
  },
  bathroom: {
    paragraphs: [
      'The junior bathroom at Agroterra Resort is designed to complement the comfort of the bedroom while offering a clean, spacious, and refreshing environment suitable for guests of all ages. With a focus on hygiene, functionality, and modern elegance, the bathroom provides everything families need to start and end their day with ease.',
      'The bathroom features a modern walk in shower with high quality fittings that deliver a consistent and relaxing water experience. In select rooms, a full size bathtub is also available, providing families with the option of a soothing soak or a fun and safe bathing experience for younger children. Non slip flooring and carefully positioned fixtures ensure safety while maintaining the bathroom\'s sleek appearance.',
      'Cleanliness and comfort are at the heart of the design. Fresh, soft towels, bath mats, and premium toiletries are provided daily. Guests enjoy access to quality shampoo, conditioner, body wash, hand soap, and moisturizing lotion, all selected to enhance relaxation while being gentle on the skin. A hairdryer and additional personal care amenities are also available for convenience.',
      'Ventilation and lighting are carefully planned to maintain a fresh and pleasant environment at all times. Bright overhead lights combined with task lighting around the mirror ensure visibility, while efficient ventilation keeps the space dry and comfortable after use. The overall design incorporates neutral tones, smooth surfaces, and elegant finishes that reflect the natural and calming aesthetic of the resort.',
      'Storage solutions such as shelves, towel racks, and under sink cabinets help families keep their toiletries and personal items neatly arranged throughout their stay. Child friendly considerations, easy to use fixtures, and accessible layouts ensure that guests of all ages can use the space comfortably.',
      'The junior bathroom at Agroterra Resort is more than a functional space; it is a private wellness area where guests can refresh, recharge, and enjoy moments of relaxation. Together with the family bedroom, it completes a comfortable and welcoming living experience that reflects the resort\'s commitment to quality, comfort, and family friendly hospitality.',
    ],
    videoSrc: 'https://youtube.com/embed/Ftze5hE-M9g?si=Y2fhq-F7VCYSZFSZ',
  },
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const [activeTab, setActiveTab] = useState<string>('bedroom')

  useEffect(() => {
    const saved = localStorage.getItem('tabr')
    if (saved && saved in tabContent) setActiveTab(saved)
  }, [])

  const handleTabSwitch = (tab: string, e: React.MouseEvent) => {
    e.preventDefault()
    setActiveTab(tab)
    localStorage.setItem('tabr', tab)
  }

  const content = tabContent[activeTab]

  return (
    <div className="min-h-screen bg-zinc-50 overflow-x-hidden">
      <main className="flex flex-col w-full bg-white">

        {/* ── Nav ──────────────────────────────────────────────────────────── */}
        <nav className="flex items-center justify-between shadow-md
          px-4 sm:px-8 md:px-16 lg:px-28
          py-3 sm:py-4"
        >
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logo}
              alt="Agroterra Logo"
              height={32}
              className="h-7 sm:h-8 w-auto"
            />
            <h3 className="uppercase eb-garamond-extrabold
              text-[14px] sm:text-[16px] lg:text-[17px]
              text-[#111111]"
            >
              Agroterra
            </h3>
          </Link>

          <button className="hidden lg:flex items-center gap-2
            work-sans font-bold text-[12px] uppercase cursor-pointer
            text-[#111111] px-5 py-2.5 rounded-full
            border border-gray-200 hover:bg-zinc-100
            transition-colors duration-200"
          >
            <FaConciergeBell size={13} />
            Book Now
          </button>
        </nav>

        {/* ── Tabs ─────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex w-full border-b border-gray-200
            mt-6 sm:mt-8
            px-4 sm:px-12 md:px-24 lg:px-40 xl:px-60"
        >
          {[
            { key: 'bedroom',  label: 'Bedroom'  },
            { key: 'bathroom', label: 'Bathroom' },
          ].map((tab, i) => (
            <motion.button
              key={tab.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              whileTap={{ scale: 0.97 }}
              onClick={(e) => handleTabSwitch(tab.key, e)}
              className={`
                flex-1 py-3 sm:py-4
                text-[13px] sm:text-[14px] lg:text-[15px]
                eb-garamond-semibold text-center
                border-b-2 -mb-px transition-all duration-200 cursor-pointer
                ${activeTab === tab.key
                  ? 'border-[#101996] text-[#101996]'
                  : 'border-transparent text-[#111111] opacity-40 hover:opacity-70'
                }
              `}
            >
              {tab.label}
            </motion.button>
          ))}
        </motion.div>

        {/* ── Tab content ──────────────────────────────────────────────────── */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="flex flex-col
            px-4 sm:px-8 md:px-16 lg:px-32 xl:px-60
            py-8 sm:py-10 lg:py-14
            mb-10 sm:mb-14 lg:mb-20"
        >
          {/* Hero image */}
          <MediaContainer>
            <Image
              src={junior}
              alt={activeTab === 'bedroom' ? 'Junior bedroom' : 'Junior bathroom'}
              fill
              className="object-cover"
              priority
            />
          </MediaContainer>

          {/* Paragraphs */}
          {content.paragraphs.map((text, i) => (
            <AnimatedParagraph key={i} delay={i * 0.1}>
              {text}
            </AnimatedParagraph>
          ))}

          {/* Video */}
          <MediaContainer className="mt-14 sm:mt-16 lg:mt-20">
            <iframe
              src={content.videoSrc}
              title="YouTube video player"
              allow="autoplay; encrypted-media"
              allowFullScreen
              frameBorder="0"
              referrerPolicy="strict-origin-when-cross-origin"
              className="absolute inset-0 w-full h-full"
            />
          </MediaContainer>
        </motion.div>

      </main>
    </div>
  )
}