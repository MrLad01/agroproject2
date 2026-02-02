"use client"

import Image from 'next/image'
import Link from 'next/link'
import { FaConciergeBell } from 'react-icons/fa'
import logo from '@/public/ASA logo.jpg'
import bg from '@/public/book background.png'
import golfIcon from "@/public/Golf image block 1.png"
import palm from '@/public/half 1.png'
import palm2 from '@/public/half 2.png'

const Feature = ({
  icon,
  title,
  text,
}: {
  icon: any
  title: string
  text: string
}) => (
  <div className="flex  items-center max-w-50">
    <div className='rounded-full'>
    <Image src={icon} alt={title} width={48} height={48}  />
    </div>
    <div className='flex flex-col items-center'>
    <h4 className="mt-4 text-sm font-semibold uppercase">{title}</h4>
    <p className="text-xs mt-2 opacity-80">{text}</p>
    </div>
  </div>
)

const Reason = ({
  icon,
  title,
  text,
}: {
  icon: any
  title: string
  text: string
}) => (
  <div className="flex flex-col items-center max-w-55">
    <Image src={icon} alt={title} width={48} height={48} />
    <h4 className="mt-4 text-sm font-semibold uppercase">{title}</h4>
    <p className="text-xs mt-2 opacity-80">{text}</p>
  </div>
)

export default function page() {
  return (
    <div className='pb-130'>
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex flex-col min-h-screen w-full bg-white sm:items-start">
          {/* Background Carousel */}
          <div className="w-full mb-10">
            {/* <EmblaCarousel /> */}
            <Image src={bg} alt="Background image" className="w-screen" />
            <div className="absolute top-8 w-full h-[93vh] flex flex-col px-12 py-6">
              {/* Nav */}
              <nav className="flex items-center justify-between shadow-2xl">
                {/* Logo */}
                <div className="flex gap-2 items-center">
                  <Image src={logo} alt="Agroterra Logo" height={30} />
                  <h3 className="uppercase eb-garamond-extrabold text-[17px] text-white">Agroterra</h3>
                </div>
                <div className="flex gap-12 items-center text-[14px] normal-font pt-0.5">
                  <Link href={`/`} className=" text-white">Home</Link>
                  <Link href={`/reservation`} className=" text-white">Reservation</Link>
                  <Link href={`/golf`} className=" text-white">Golf Course</Link>
                  <Link href={`/sport-academy`} className=" text-white">Sport Academy</Link>
                  <Link href={`/contact`} className=" text-white">Contact</Link>
                  <Link href={`/about`} className=" text-white">About Us</Link>
                </div>
                <button className="work-sans-bold text-[12px] text-[#111111] mr-10 uppercase px-6 py-2.5 bg-white rounded-4xl flex items-center gap-2">
                  <FaConciergeBell size={14} />
                  Book Now
                </button>
              </nav>
              <div className="h-full flex flex-col text-white items-center justify-center leading-relaxed">
                <div className="flex flex-col justify-center items-center mt-12">
                  <h2 className="text-center uppercase eb-garamond-semibold text-[40px] welcome-text">Book Your Stay at Agroterra <br /> Resort</h2>
                  <p className="eb-garamond-italic uppercase text-[18px] max-w-140 text-center">Reserve your escape into nature, comfort, and relaxation
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-4xl mx-auto bg-gray-50 rounded-2xl mb-20 shadow-lg p-10">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                  Check-in Date
                </label>
                <input
                  type="date"
                  className="w-full rounded-lg border border-gray-300 text-[#ACA6A6] px-4 py-3 text-sm focus:outline-none bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                  Check-out Date
                </label>
                <input
                  type="date"
                  className="w-full rounded-lg border border-gray-300 text-[#ACA6A6] px-4 py-3 text-sm focus:outline-none bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                  Room Type
                </label>
                <select
                  className="w-full rounded-lg border border-gray-300 text-[#ACA6A6] px-4 py-3 text-sm focus:outline-none bg-white"
                >
                  <option>Select Room Type</option>
                  <option>Deluxe Room</option>
                  <option>Executive Suite</option>
                  <option>Family Villa</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full rounded-lg border border-gray-300 text-[#ACA6A6] px-4 py-3 text-sm focus:outline-none bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="+234..."
                  className="w-full rounded-lg border border-gray-300 text-[#ACA6A6] px-4 py-3 text-sm focus:outline-none bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                  Guests
                </label>
                <input
                  type="number"
                  placeholder="Number of guests"
                  min={1}
                  className="w-full rounded-lg border border-gray-300 text-[#ACA6A6] px-4 py-3 text-sm focus:outline-none bg-white"
                />
              </div>
              <div className="md:col-span-2 flex justify-center pt-4">
                <button
                  type="submit"
                  className="px-12 py-3 rounded-xl bg-[#BFDDE7] text-[#111] text-sm font-semibold shadow-md hover:bg-[#a9d1de] transition cursor-pointer"
                >
                  CHECK AVAILABILITY
                </button>
              </div>
            </form>
          </div>

          <div className="relative w-full h-235 my-4">
            <Image
              src={palm}
              alt="Palm background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/25" />

            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white mt-48">
              <h2 className="text-[48px] eb-garamond-bold uppercase mb-4">
                Stay With Us
              </h2>

              <p className="max-w-3xl leading-relaxed opacity-90 text-[18px] uppercase font-normal mb-14">
                Enjoy peaceful surroundings, access to leisure facilities, and a
                naturally enriching environment designed for rest and recreation.
                Our resort ensures your time is smooth and comfortable from arrival
                to departure.
              </p>

              <div className="flex flex-col md:flex-row gap-16">
                <Feature
                  icon={golfIcon}
                  title="Access to Golf Areas"
                  text="Enjoy open green spaces and leisure activities."
                />
                <Feature
                  icon={golfIcon}
                  title="Natural Open Spaces"
                  text="Fresh air, greenery, and peaceful surroundings."
                />
                <Feature
                  icon={golfIcon}
                  title="Relaxing Environment"
                  text="Designed for comfort, calm, and quiet moments."
                />
              </div>
            </div>
          </div>
          <div className="relative w-full h-205">
      <Image
        src={palm2}
        alt="Palm tree"
        fill
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/15" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
        <h2 className="text-[42px] eb-garamond-semibold uppercase mb-16">
          Why Book With Us
        </h2>

        <div className="flex flex-col md:flex-row gap-20">
          <Reason
            icon={golfIcon}
            title="Easy Reservation"
            text="Enjoy a simple and seamless booking experience."
          />
          <Reason
            icon={golfIcon}
            title="Peaceful Location"
            text="Surrounded by nature for complete relaxation."
          />
          <Reason
            icon={golfIcon}
            title="Leisure Activities"
            text="Access open green spaces and resort amenities."
          />
        </div>
      </div>
    </div>
        </main>
      </div>
    </div>
  )
}
