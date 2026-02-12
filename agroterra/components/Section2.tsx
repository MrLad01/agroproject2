'use client'

import { useState, useEffect } from "react"
import junior from '@/public/juniorBed.png'
import family from '@/public/familyBed.jpg'
import deluxe from '@/public/deluxeBed.jpg'
import Image from "next/image"
import { TbCrosshair } from "react-icons/tb"
import { IoBedOutline } from "react-icons/io5"
import { MdOutlineBathtub, MdOutlinePeopleOutline } from "react-icons/md"
import ExperienceCard from "./ExperienceCard"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

/* ── Shared room card layout ── */
function RoomCard({
  title,
  description,
  specs,
  href,
  image,
  imageAlt,
  imageLeft = false,
}: {
  title: string
  description: string
  specs: { icon: React.ReactNode; label: string }[]
  href: string
  image: any
  imageAlt: string
  imageLeft?: boolean
}) {
  const textBlock = (
    <div className="flex flex-col gap-4 w-full lg:w-1/2">
      <h3 className="eb-garamond-semibold text-[16px] sm:text-[18px] uppercase text-[#111111]">
        {title}
      </h3>
      <p className="text-[#5A5A5A] work-sans tracking-wider text-[14px] sm:text-[16px]">
        {description}
      </p>
      {/* Specs */}
      <div className="flex flex-wrap gap-4 text-[12px]">
        {specs.map(({ icon, label }) => (
          <div key={label} className="flex items-center gap-1.5 text-[#111111] opacity-80">
            {icon}
            <span>{label}</span>
          </div>
        ))}
      </div>
      <Link
        href={href}
        className="flex border justify-center items-center gap-2
          w-full sm:w-[60%] md:w-[40%] lg:w-[38%]
          text-[#101996] border-[#101996] rounded-2xl p-2
          work-sans text-[12px] cursor-pointer
          hover:scale-105 transition duration-300 ease-in-out uppercase"
      >
        Room Details <ArrowUpRight size={16} />
      </Link>
    </div>
  )

  const imageBlock = (
    <div className="w-full lg:w-1/2 flex justify-center">
      <Image
        src={image}
        alt={imageAlt}
        className="rounded-2xl w-full max-w-140 lg:max-w-none object-cover h-64 sm:h-80 md:h-96 lg:h-auto"
      />
    </div>
  )

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
      {/* On mobile always show text first; on desktop respect imageLeft */}
      <div className={`contents lg:flex lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:w-full ${imageLeft ? 'lg:[&>*:first-child]:order-last' : ''}`}>
        {imageLeft ? (
          <>
            {imageBlock}
            {textBlock}
          </>
        ) : (
          <>
            {textBlock}
            {imageBlock}
          </>
        )}
      </div>
    </div>
  )
}

const SectionTwo = () => {
  const [activeTab, setActiveTab] = useState<string>('family')

  useEffect(() => {
    const tabFromLocal = localStorage.getItem('tab')
    if (tabFromLocal) setActiveTab(tabFromLocal)
  }, [])

  const handleTabSwitch = (tabStart: string, e: React.MouseEvent) => {
    e.preventDefault()
    setActiveTab(tabStart)
    localStorage.setItem("tab", tabStart)
  }

  const tabs = [
    { key: 'family',  label: 'Family Suite' },
    { key: 'junior',  label: 'Junior Suite' },
    { key: 'deluxe',  label: 'Deluxe Double' },
  ]

  const familySpecs = [
    { icon: <TbCrosshair size={15} />,           label: '45 sqm' },
    { icon: <IoBedOutline size={15} />,          label: '2 Beds' },
    { icon: <MdOutlineBathtub size={15} />,      label: '1 Bath' },
    { icon: <MdOutlinePeopleOutline size={15} />,label: '4 Guests' },
  ]
  const juniorSpecs = [
    { icon: <TbCrosshair size={15} />,           label: '35 sqm' },
    { icon: <IoBedOutline size={15} />,          label: '1 Bed' },
    { icon: <MdOutlineBathtub size={15} />,      label: '1 Bath' },
    { icon: <MdOutlinePeopleOutline size={15} />,label: '2 Guests' },
  ]
  const deluxeSpecs = [
    { icon: <TbCrosshair size={15} />,           label: '50 sqm' },
    { icon: <IoBedOutline size={15} />,          label: '2 Beds' },
    { icon: <MdOutlineBathtub size={15} />,      label: '1 Bath' },
    { icon: <MdOutlinePeopleOutline size={15} />,label: '4 Guests' },
  ]

  return (
    <div className="bg-white py-12 mb-10 px-6 sm:px-12 md:px-20 lg:px-40">

      {/* Section header */}
      <h1 className="text-[#1A1A1A] uppercase text-center tracking-[0.28rem] text-[13px] sm:text-[16px] font-bold">
        explore
      </h1>
      <h2 className="text-[#1A1A1A] text-center text-[28px] sm:text-[36px] md:text-[42px] lg:text-[46px] font-semibold eb-garamond">
        A Place That Fits You
      </h2>
      <p className="text-[#5A5A5A] text-center text-[14px] sm:text-[16px] mt-1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et rhoncus lacus.
      </p>

      {/* Tab bar — scrollable on mobile so nothing overflows */}
      <div className="flex items-center-safe w-full mt-8 mb-10 border-b border-zinc-200">
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={(e) => handleTabSwitch(key, e)}
            className={`
              w-1/3 shrink-0 px-4 sm:px-6 py-3 sm:py-4
              text-[10px] sm:text-[15px] md:text-[16px]
              uppercase eb-garamond-bold whitespace-nowrap
              transition-colors duration-200
              ${activeTab === key
                ? 'border-b-2 border-[#101996] text-[#101996] -mb-px'
                : 'text-[#111111] opacity-40 cursor-pointer hover:opacity-70'
              }
            `}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab panels */}
      {activeTab === 'family' && (
        <RoomCard
          title="Family Suite"
          description="The Family Suite is perfect for families looking for a comfortable and spacious accommodation option. This suite features two bedrooms, a living area, and a private balcony with stunning views of the resort's gardens."
          specs={familySpecs}
          href="/room/family"
          image={family}
          imageAlt="Family Suite"
        />
      )}

      {activeTab === 'junior' && (
        <RoomCard
          title="Junior Suite"
          description="The Junior Suite offers a blend of comfort and style, ideal for solo travelers or couples. This suite includes a spacious bedroom, a cozy seating area, and modern amenities to ensure a relaxing stay."
          specs={juniorSpecs}
          href="/room/junior"
          image={junior}
          imageAlt="Junior Suite"
          imageLeft
        />
      )}

      {activeTab === 'deluxe' && (
        <RoomCard
          title="Deluxe Suite"
          description="The Deluxe Suite is perfect for families looking for a comfortable and spacious accommodation option. This suite features two bedrooms, a living area, and a private balcony with stunning views of the resort's gardens."
          specs={deluxeSpecs}
          href="/room/deluxe"
          image={deluxe}
          imageAlt="Deluxe Suite"
        />
      )}

      {/* Experiences sub-section */}
      <div className="bg-white py-12 mt-16 sm:mt-20 md:mt-24">
        <h1 className="text-[#1A1A1A] text-center tracking-[0.28rem] mb-2 text-[13px] sm:text-[16px] font-bold">
          EXPERIENCES
        </h1>
        <h2 className="text-[#1A1A1A] text-center text-[28px] sm:text-[36px] md:text-[42px] lg:text-[46px] mb-6 sm:mb-8 font-semibold eb-garamond">
          Harmony With Nature
        </h2>
        <div className="relative max-w-6xl mx-auto flex justify-center">
          <ExperienceCard />
        </div>
      </div>
    </div>
  )
}

export default SectionTwo