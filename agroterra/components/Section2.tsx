'use client'

import { useState, useEffect } from "react"
import junior from '@/public/juniorBed.png'
import family from '@/public/familyBed.jpg'
import deluxe from '@/public/deluxeBed.jpg'
import Image from "next/image"
import { TbCrosshair } from "react-icons/tb";
import { IoBedOutline } from "react-icons/io5";
import { MdOutlineBathtub, MdOutlinePeopleOutline } from "react-icons/md";
import ExperienceCard from "./ExperienceCard"
import { ArrowUpRight } from "lucide-react"


const SectionTwo = () => {
  const [activeTab, setActiveTab] = useState<string>('family')

  // Load from localStorage only after component mounts (client-side only)
  useEffect(() => {
    const tabFromLocal = localStorage.getItem('tab')
    if (tabFromLocal) {
      setActiveTab(tabFromLocal)
    }
  }, [])

  const handleTabSwitch = (tabStart: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveTab(tabStart);
    localStorage.setItem("tab", tabStart)
  }

  return (
    <div className="bg-white py-12 mb-10 px-40">
      <h1 className="text-[#1A1A1A] uppercase text-center tracking-[0.28rem] text-[16px] font-bold">
        explore
      </h1>

      <h2 className="text-[#1A1A1A] text-center text-[46px] font-semibold eb-garamond">
        A Place That Fits You
      </h2>

      <p className="text-[#5A5A5A] text-center text-[16px]">
        Lorem ipsum dolor sit amet, consectetur <br />
        adipiscing elit. Sed et rhoncus lacus.
      </p>

      <div className="flex items-center-safe w-full mt-8 mb-16">
        <button className={`w-full py-4 text-[16px] uppercase eb-garamond-bold ${activeTab === "family" ? "border-b-[#101996] text-[#101996] border-b-2" : " text-[#111111] opacity-30 cursor-pointer"}`} onClick={(e) => handleTabSwitch("family", e)}>
          Family Suite
        </button>
        <button className={`w-full py-4 text-[16px] uppercase eb-garamond-bold ${activeTab === "junior" ? "border-b-[#101996] text-[#101996] border-b-2" : "text-[#111111] opacity-30 cursor-pointer"}`} onClick={(e) => handleTabSwitch("junior", e)}>
          Junior Suite
        </button>
        <button className={`w-full py-4 text-[16px] uppercase eb-garamond-bold ${activeTab === "deluxe" ? "border-b-[#101996] text-[#101996] border-b-2" : "text-[#111111] opacity-30 cursor-pointer"}`} onClick={(e) => handleTabSwitch("deluxe", e)}>
          Deluxe Double Room
        </button>
      </div>

      {
        activeTab === "family" && (
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-4">
              <h3 className="eb-garamond-semibold text-[18px] uppercase text-[#111111]">Family Suite</h3>
              <p className="text-[#5A5A5A] work-sans tracking-wider text-[16px] max-w-lg">
                The Family Suite is perfect for families looking for a comfortable and spacious accommodation option. This suite features two bedrooms, a living area, and a private balcony with stunning views of the resort's gardens.
              </p>
              <div className="flex text-[12px] items-center-safe gap-8">
                <div className="flex items-center gap-2 text-[#111111] opacity-80">
                  <TbCrosshair size={15} />
                  <h4>45 sqm</h4>
                </div>
                <div className="flex items-center gap-2 text-[#111111] opacity-80">
                  <IoBedOutline size={15} />
                  <h4>2 Beds</h4>
                </div>
                <div className="flex items-center gap-2 text-[#111111] opacity-80">
                  <MdOutlineBathtub size={15} />
                  <h4>1 Bath</h4>
                </div>
                <div className="flex items-center gap-2 text-[#111111] opacity-80">
                  <MdOutlinePeopleOutline size={15} />
                  <h4>4 Guests</h4>
                </div>
              </div>
              <button className="flex border justify-center items-center gap-2 w-[30%] text-[#101996] border-[#101996] rounded-2xl p-2 work-sans text-[12px] cursor-pointer hover:scale-110 transition duration-500 ease-in-out uppercase"> Room Details <ArrowUpRight size={16} /></button>
            </div>
            <Image src={family} alt="Family Suite" width={600} className="rounded-2xl" />
          </div>
        )
      }

      {
        activeTab === "junior" && (
          <div className="flex items-center justify-between">
            <Image src={junior} alt="Junior Suite" width={600} className="rounded-2xl" />
            <div className="flex flex-col gap-4">
              <h3 className="eb-garamond-semibold text-[18px] uppercase text-[#111111]">Junior Suite</h3>
              <p className="text-[#5A5A5A] work-sans tracking-wider text-[16px] max-w-lg">
                The Junior Suite offers a blend of comfort and style, ideal for solo travelers or couples. This suite includes a spacious bedroom, a cozy seating area, and modern amenities to ensure a relaxing stay.
              </p>
              <div className="flex text-[12px] items-center-safe gap-8">
                <div className="flex items-center gap-2 text-[#111111] opacity-80">
                  <TbCrosshair size={15} />
                  <h4>35 sqm</h4>
                </div>
                <div className="flex items-center gap-2 text-[#111111] opacity-80">
                  <IoBedOutline size={15} />
                  <h4>1 Bed</h4>
                </div>
                <div className="flex items-center gap-2 text-[#111111] opacity-80">
                  <MdOutlineBathtub size={15} />
                  <h4>1 Bath</h4>
                </div>
                <div className="flex items-center gap-2 text-[#111111] opacity-80">
                  <MdOutlinePeopleOutline size={15} />
                  <h4>2 Guests</h4>
                </div>
              </div>
              <button className="flex border justify-center items-center gap-2 w-[30%] text-[#101996] border-[#101996] rounded-2xl p-2 work-sans text-[12px] cursor-pointer hover:scale-110 transition duration-500 ease-in-out uppercase"> Room Details <ArrowUpRight size={16} /></button>
            </div>
          </div>
        )
      }

      {
        activeTab === "deluxe" && (
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-4">
              <h3 className="eb-garamond-semibold text-[18px] uppercase text-[#111111]">Deluxe Suite</h3>
              <p className="text-[#5A5A5A] work-sans tracking-wider text-[16px] max-w-lg">
                The Deluxe Suite is perfect for families looking for a comfortable and spacious accommodation option. This suite features two bedrooms, a living area, and a private balcony with stunning views of the resort's gardens.
              </p>
              <div className="flex text-[12px] items-center-safe gap-8">
                <div className="flex items-center gap-2 text-[#111111] opacity-80">
                  <TbCrosshair size={15} />
                  <h4>50 sqm</h4>
                </div>
                <div className="flex items-center gap-2 text-[#111111] opacity-80">
                  <IoBedOutline size={15} />
                  <h4>2 Beds</h4>
                </div>
                <div className="flex items-center gap-2 text-[#111111] opacity-80">
                  <MdOutlineBathtub size={15} />
                  <h4>1 Bath</h4>
                </div>
                <div className="flex items-center gap-2 text-[#111111] opacity-80">
                  <MdOutlinePeopleOutline size={15} />
                  <h4>4 Guests</h4>
                </div>
              </div>
              <button className="flex border justify-center items-center gap-2 w-[30%] text-[#101996] border-[#101996] rounded-2xl p-2 work-sans text-[14px] cursor-pointer hover:scale-110 transition duration-500 ease-in-out uppercase"> Room Details <ArrowUpRight size={16} /></button>
            </div>
            <Image src={deluxe} alt="Deluxe Suite" width={600} className="rounded-2xl" />
          </div>
        )
      }

      <div className="bg-white py-12 mt-24">
        <h1 className="text-[#1A1A1A] text-center tracking-[0.28rem] mb-2 text-[16px] font-bold">
          EXPERIENCES
        </h1>
        <h2 className="text-[#1A1A1A] text-center text-[46px] mb-8 font-semibold eb-garamond">
          Harmony With Nature
        </h2>
        {/* Content */}
        <div className="relative max-w-6xl mx-auto flex justify-center">
          <ExperienceCard />
        </div>

        {/* Bottom Indicator */}
        <div className="mt-10 flex items-center justify-center gap-6 text-sm">
          <span className="font-medium text-[#111111] eb-garamond text-[20px]">01</span>
          <span className="w-56 h-px bg-[#111111]" />
          <span className="font-medium text-[#111111] eb-garamond text-[20px]">Activities</span>
        </div>
      </div>


    </div>
  )
}

export default SectionTwo