"use client"

import Image from 'next/image'
import Link from 'next/link'
import { FaConciergeBell } from 'react-icons/fa'
import logo from '@/public/ASA logo.jpg'
import bg from '@/public/Screenshot 2026-02-03 040000.png'
import golfIcon from "@/public/Golf image block 1.png"
import palm2 from '@/public/Screenshot 2026-02-03 040130.png'
import palm from '@/public/Screenshot 2026-02-03 040106.png'
import Navbar from '@/components/Navbar'
import { motion, cubicBezier } from 'framer-motion'

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: cubicBezier(0.25, 0.46, 0.45, 0.94)
    }
  },
}

const Feature = ({
  icon,
  title,
  text,
  index,
}: {
  icon: any
  title: string
  text: string
  index: number
}) => (
  <motion.div 
    variants={fadeIn}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.2 }}
    className="flex flex-col sm:flex-row items-center max-w-full sm:max-w-50 gap-3 sm:gap-0"
  >
    <motion.div 
      className='rounded-full'
      whileHover={{ scale: 1.1, rotate: 5 }}
      transition={{ duration: 0.3 }}
    >
      <Image src={icon} alt={title} width={48} height={48} className="w-10 h-10 sm:w-12 sm:h-12" />
    </motion.div>
    <div className='flex flex-col items-center sm:items-start sm:ml-3'>
      <h4 className="mt-2 sm:mt-4 text-xs sm:text-sm font-semibold uppercase text-center sm:text-left">{title}</h4>
      <p className="text-[11px] sm:text-xs mt-1 sm:mt-2 opacity-80 text-center sm:text-left">{text}</p>
    </div>
  </motion.div>
)

const Reason = ({
  icon,
  title,
  text,
  index,
}: {
  icon: any
  title: string
  text: string
  index: number
}) => (
  <motion.div 
    variants={fadeIn}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.2 }}
    className="flex flex-col items-center max-w-full sm:max-w-55"
  >
    <motion.div
      whileHover={{ scale: 1.15, rotate: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Image src={icon} alt={title} width={48} height={48} className="w-10 h-10 sm:w-12 sm:h-12" />
    </motion.div>
    <h4 className="mt-3 sm:mt-4 text-xs sm:text-sm font-semibold uppercase text-center">{title}</h4>
    <p className="text-[11px] sm:text-xs mt-1 sm:mt-2 opacity-80 text-center px-2">{text}</p>
  </motion.div>
)

export default function page() {
  return (
    <div className=''>
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex flex-col min-h-screen w-full bg-white items-center">
          {/* Background Hero Section */}
          <div className="w-full mb-6 sm:mb-8 lg:mb-10 relative">
            <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[93vh]">
              <Image 
                src={bg} 
                alt="Background image" 
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 w-full h-full flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-5 lg:py-6">
                {/* Nav */}
                <Navbar />
                <div className="h-full flex flex-col text-white items-center justify-center leading-relaxed">
                  <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col justify-center items-center mt-6 sm:mt-8 lg:mt-12 px-4"
                  >
                    <motion.h2 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-center uppercase eb-garamond-semibold text-[24px] sm:text-[32px] md:text-[36px] lg:text-[40px] welcome-text leading-tight"
                    >
                      Book Your Stay at Agroterra <br className="hidden sm:block" /> Resort
                    </motion.h2>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="eb-garamond-italic uppercase text-[14px] sm:text-[16px] lg:text-[18px] max-w-[90%] sm:max-w-140 text-center mt-2 sm:mt-0"
                    >
                      Reserve your escape into nature, comfort, and relaxation
                    </motion.p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-4xl bg-gray-50 rounded-2xl mb-12 sm:mb-16 lg:mb-20 shadow-lg p-6 sm:p-8 lg:p-10 mx-4"
          >
            <motion.form 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-4 sm:gap-y-6"
            >
              <motion.div variants={fadeIn}>
                <label className="block text-[11px] sm:text-xs font-semibold text-gray-600 uppercase mb-2">
                  Check-in Date
                </label>
                <input
                  type="date"
                  className="w-full rounded-lg border border-gray-300 text-[#ACA6A6] px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#BFDDE7] transition bg-white"
                />
              </motion.div>

              <motion.div variants={fadeIn}>
                <label className="block text-[11px] sm:text-xs font-semibold text-gray-600 uppercase mb-2">
                  Check-out Date
                </label>
                <input
                  type="date"
                  className="w-full rounded-lg border border-gray-300 text-[#ACA6A6] px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#BFDDE7] transition bg-white"
                />
              </motion.div>

              <motion.div variants={fadeIn}>
                <label className="block text-[11px] sm:text-xs font-semibold text-gray-600 uppercase mb-2">
                  Room Type
                </label>
                <select
                  className="w-full rounded-lg border border-gray-300 text-[#ACA6A6] px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#BFDDE7] transition bg-white"
                >
                  <option>Select Room Type</option>
                  <option>Deluxe Room</option>
                  <option>Executive Suite</option>
                  <option>Family Villa</option>
                </select>
              </motion.div>

              <motion.div variants={fadeIn}>
                <label className="block text-[11px] sm:text-xs font-semibold text-gray-600 uppercase mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full rounded-lg border border-gray-300 text-[#ACA6A6] px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#BFDDE7] transition bg-white placeholder:text-gray-400"
                />
              </motion.div>

              <motion.div variants={fadeIn}>
                <label className="block text-[11px] sm:text-xs font-semibold text-gray-600 uppercase mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  placeholder="+234..."
                  className="w-full rounded-lg border border-gray-300 text-[#ACA6A6] px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#BFDDE7] transition bg-white placeholder:text-gray-400"
                />
              </motion.div>

              <motion.div variants={fadeIn}>
                <label className="block text-[11px] sm:text-xs font-semibold text-gray-600 uppercase mb-2">
                  Guests
                </label>
                <input
                  type="number"
                  placeholder="Number of guests"
                  min={1}
                  className="w-full rounded-lg border border-gray-300 text-[#ACA6A6] px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#BFDDE7] transition bg-white placeholder:text-gray-400"
                />
              </motion.div>

              <motion.div 
                variants={scaleIn}
                className="md:col-span-2 flex justify-center pt-2 sm:pt-4"
              >
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(191, 221, 231, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="px-8 sm:px-10 lg:px-12 py-2.5 sm:py-3 rounded-xl bg-[#BFDDE7] text-[#111] text-xs sm:text-sm font-semibold shadow-md hover:bg-[#a9d1de] transition cursor-pointer"
                >
                  CHECK AVAILABILITY
                </motion.button>
              </motion.div>
            </motion.form>
          </motion.div>

          {/* Stay With Us Section */}
          <div className="relative w-full h-auto sm:h-125 md:h-150 lg:h-215 my-4 sm:my-6 lg:my-4">
            <div className="relative w-full h-full min-h-150 sm:min-h-0">
              <Image
                src={palm}
                alt="Palm background"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/25" />

              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="text-[32px] sm:text-[38px] md:text-[42px] lg:text-[48px] eb-garamond-bold uppercase mb-3 sm:mb-4"
                >
                  Stay With Us
                </motion.h2>

                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="max-w-[95%] sm:max-w-2xl lg:max-w-3xl leading-relaxed opacity-90 text-[14px] sm:text-[16px] lg:text-[18px] uppercase font-normal mb-8 sm:mb-10 lg:mb-14 px-4"
                >
                  Enjoy peaceful surroundings, access to leisure facilities, and a
                  naturally enriching environment designed for rest and recreation.
                  Our resort ensures your time is smooth and comfortable from arrival
                  to departure.
                </motion.p>

                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-col md:flex-row gap-8 sm:gap-10 lg:gap-16 w-full max-w-5xl px-4"
                >
                  <Feature
                    icon={golfIcon}
                    title="Access to Golf Areas"
                    text="Enjoy open green spaces and leisure activities."
                    index={0}
                  />
                  <Feature
                    icon={golfIcon}
                    title="Natural Open Spaces"
                    text="Fresh air, greenery, and peaceful surroundings."
                    index={1}
                  />
                  <Feature
                    icon={golfIcon}
                    title="Relaxing Environment"
                    text="Designed for comfort, calm, and quiet moments."
                    index={2}
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Why Book With Us Section - Uncommented and Responsive */}
          {/* <div className="relative w-full h-auto sm:h-112.5 md:h-137.5 lg:h-205 mb-6 sm:mb-8">
            <div className="relative w-full h-full min-h-137.5 sm:min-h-0">
              <Image
                src={palm2}
                alt="Palm tree"
                fill
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black/15" />

              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4 sm:px-6 py-12 sm:py-16">
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="text-[32px] sm:text-[36px] md:text-[40px] lg:text-[42px] eb-garamond-semibold uppercase mb-8 sm:mb-12 lg:mb-16"
                >
                  Why Book With Us
                </motion.h2>

                <motion.div 
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex flex-col md:flex-row gap-10 sm:gap-14 lg:gap-20 w-full max-w-4xl"
                >
                  <Reason
                    icon={golfIcon}
                    title="Easy Reservation"
                    text="Enjoy a simple and seamless booking experience."
                    index={0}
                  />
                  <Reason
                    icon={golfIcon}
                    title="Peaceful Location"
                    text="Surrounded by nature for complete relaxation."
                    index={1}
                  />
                  <Reason
                    icon={golfIcon}
                    title="Leisure Activities"
                    text="Access open green spaces and resort amenities."
                    index={2}
                  />
                </motion.div>
              </div>
            </div>
          </div> */}
        </main>
      </div>
    </div>
  )
}