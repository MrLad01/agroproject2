"use client"

import Image from "next/image"
import Link from "next/link"
import logo from "@/public/ASA logo.jpg"
import { FaConciergeBell } from "react-icons/fa"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import family from "@/public/familyBed.jpg"
import Navbar, { MobileNav } from "@/components/Navbar"

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export default function Page() {
  const [activeTab, setActiveTab] = useState<string>("bedroom")

  useEffect(() => {
    const tabFromLocal = localStorage.getItem("tabr")
    if (tabFromLocal) setActiveTab(tabFromLocal)
  }, [])

  const handleTabSwitch = (tabStart: string, e: React.MouseEvent) => {
    e.preventDefault()
    setActiveTab(tabStart)
    localStorage.setItem("tabr", tabStart)
  }

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-zinc-50 font-sans">
      {/* ================= NAV ================= */}
      {/* <nav className="flex items-center justify-between shadow-2xl px-4 sm:px-8 md:px-16 lg:px-28 h-16 bg-white">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="Agroterra Logo" height={30} />
          <h3 className="uppercase eb-garamond-extrabold text-[15px] sm:text-[17px] text-[#111111]">
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
      </nav> */}

      <nav className="flex items-center justify-between shadow-lg px-4 sm:px-8 md:px-16 lg:px-28 h-16 text-gray-600 dark:bg-gray-100">
        {/* Logo */}
        <div className="flex gap-2 items-center">
          <Image src={logo} alt="Agroterra Logo" height={30} />
          <h3 className="uppercase eb-garamond-extrabold text-[15px] sm:text-[17px]">
            Agroterra
          </h3>
        </div>

        {/* Desktop links */}
        <div className="hidden lg:flex gap-8 xl:gap-12 items-center text-[13px] xl:text-[14px] normal-font pt-0.5">
          <Link href="/" className="hover:text-zinc-400 transition-colors">Home</Link>
          <Link href="/reservation" className=" hover:text-zinc-400 transition-colors">Reservation</Link>
          <Link href="/golf" className=" hover:text-zinc-400 transition-colors">Golf Course</Link>
          <Link href="/sport-academy" className=" hover:text-zinc-400 transition-colors">Sport Academy</Link>
          <Link href="/contact" className=" hover:text-zinc-400 transition-colors">Contact</Link>
          <Link href="/about" className=" hover:text-zinc-400 transition-colors">About Us</Link>
        </div>

        {/* Desktop Book Now */}
        <Link href={'/contact'}>
        <button className="hidden lg:flex work-sans-bold text-[12px] text-[#111111] mr-10 uppercase px-6 py-2.5 bg-white rounded-4xl items-center gap-2 hover:bg-zinc-100 transition-colors cursor-pointer">
          <FaConciergeBell size={14} />
          Book Now
        </button>
        </Link>

        {/* Mobile hamburger */}
        <MobileNav />
      </nav>

      {/* ================= TABS ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mx-auto w-full max-w-7xl px-4 sm:px-12 md:px-24 lg:px-40 mt-6 sm:mt-8 mb-12"
      >
        <div className="flex flex-col sm:flex-row w-full">
          {[
            { key: "bedroom", label: "Bedroom" },
            { key: "bathroom", label: "Bathroom" },
          ].map((tab, index) => (
            <motion.button
              key={tab.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 sm:py-4 text-[14px] sm:text-[15px] lg:text-[16px] eb-garamond-semibold transition
                ${activeTab === tab.key
                  ? "border-b-2 border-[#101996] text-[#101996]"
                  : "text-[#111111] opacity-60 hover:opacity-100"
                }`}
              onClick={(e) => handleTabSwitch(tab.key, e)}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ================= CONTENT ================= */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 md:px-16 lg:px-32 xl:px-40 pb-20">
        {/* ================= BEDROOM ================= */}
        {activeTab === "bedroom" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1 }}
              className="flex justify-center"
            >
              <div className="relative w-full sm:w-[85%] md:w-[75%] lg:w-[70%] aspect-video rounded-xl overflow-hidden shadow-lg">
                <Image src={family} alt="image" fill className="object-cover" priority />
              </div>
            </motion.div>

            {[
              `The family bedroom at Agroterra Resort is thoughtfully designed to provide a warm, spacious, and relaxing environment where families can unwind, reconnect, and enjoy quality time together. From the moment guests enter, they are welcomed by a calming atmosphere inspired by nature, comfort, and modern elegance. The room is carefully arranged to balance functionality with a sense of retreat, ensuring that every family member feels at home throughout their stay.`,
              `The layout is intentionally spacious to accommodate families comfortably without feeling crowded. A large, comfortable king size bed serves as the centerpiece for parents, dressed in premium linens, soft pillows, and a plush duvet that promises restful sleep. Additional sleeping arrangements are provided through cozy twin beds or a stylish sofa bed, making the space flexible for children or extra guests. Each sleeping area is positioned to allow privacy while maintaining a shared family atmosphere.`,
              `Natural light plays an important role in the room’s ambiance. Large windows or sliding glass doors invite sunlight to fill the space during the day while offering beautiful views of the resort’s lush greenery, landscaped gardens, or serene natural surroundings. Blackout curtains and sheer drapes allow guests to control lighting and privacy according to their preference, ensuring comfort both day and night.`,
              `The interior design reflects the spirit of Agroterra, blending natural textures, warm earth tones, and modern finishes. Wooden accents, soft fabrics, and subtle decorative elements create a welcoming environment that feels both luxurious and grounded. The room includes a dedicated sitting area where families can relax together, read, watch television, or plan their activities for the day.`,
              `Modern amenities are thoughtfully integrated to enhance convenience and entertainment. A large flat screen television with family friendly channels, high speed wireless internet, and multiple charging ports ensure that both adults and children stay connected and entertained. A work desk and comfortable chair provide space for remote work or personal tasks, while ample storage including wardrobes, drawers, and luggage space helps keep the room organized throughout the stay.`,
              `For added comfort, the family bedroom is equipped with climate control, allowing guests to adjust the temperature to their liking regardless of the season. A mini refrigerator, coffee and tea station, and complimentary bottled water add a touch of convenience, making it easy for families to refresh at any time. Safety features such as secure locks, smoke detectors, and child friendly design considerations provide peace of mind for parents.`,
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="work-sans font-bold text-black tracking-wide text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed max-w-4xl mx-auto mt-8 sm:mt-10"
              >
                {text}
              </motion.p>
            ))}

            <div className="flex justify-center mt-16 sm:mt-20">
              <div className="relative w-full sm:w-[85%] md:w-[75%] lg:w-[70%] aspect-video rounded-xl overflow-hidden shadow-xl">
                <iframe
                  loading="lazy"
                  src="https://www.youtube.com/embed/CdNSFf2hjEE?si=WUJXoytTL9YNF4W-"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* ================= BATHROOM ================= */}
        {activeTab === "bathroom" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-center">
              <div className="relative w-full sm:w-[85%] md:w-[75%] lg:w-[70%] aspect-video rounded-xl overflow-hidden shadow-lg">
                <Image src={family} alt="image" fill className="object-cover" priority />
              </div>
            </div>

            {[
              `The family bathroom at Agroterra Resort is designed to complement the comfort of the bedroom while offering a clean, spacious, and refreshing environment suitable for guests of all ages. With a focus on hygiene, functionality, and modern elegance, the bathroom provides everything families need to start and end their day with ease.`,
              `The bathroom features a modern walk in shower with high quality fittings that deliver a consistent and relaxing water experience. In select rooms, a full size bathtub is also available, providing families with the option of a soothing soak or a fun and safe bathing experience for younger children. Non slip flooring and carefully positioned fixtures ensure safety while maintaining the bathroom’s sleek appearance.`,
              `Cleanliness and comfort are at the heart of the design. Fresh, soft towels, bath mats, and premium toiletries are provided daily. Guests enjoy access to quality shampoo, conditioner, body wash, hand soap, and moisturizing lotion, all selected to enhance relaxation while being gentle on the skin. A hairdryer and additional personal care amenities are also available for convenience.`,
              `Ventilation and lighting are carefully planned to maintain a fresh and pleasant environment at all times. Bright overhead lights combined with task lighting around the mirror ensure visibility, while efficient ventilation keeps the space dry and comfortable after use. The overall design incorporates neutral tones, smooth surfaces, and elegant finishes that reflect the natural and calming aesthetic of the resort.`,
              `Storage solutions such as shelves, towel racks, and under sink cabinets help families keep their toiletries and personal items neatly arranged throughout their stay. Child friendly considerations, easy to use fixtures, and accessible layouts ensure that guests of all ages can use the space comfortably.`,
              `The family bathroom at Agroterra Resort is more than a functional space; it is a private wellness area where guests can refresh, recharge, and enjoy moments of relaxation. Together with the family bedroom, it completes a comfortable and welcoming living experience that reflects the resort’s commitment to quality, comfort, and family friendly hospitality.`,
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="work-sans font-bold text-black tracking-wide text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px] leading-relaxed max-w-4xl mx-auto mt-8 sm:mt-10"
              >
                {text}
              </motion.p>
            ))}

            <div className="flex justify-center mt-16 sm:mt-20">
              <div className="relative w-full sm:w-[85%] md:w-[75%] lg:w-[70%] aspect-video rounded-xl overflow-hidden shadow-xl">
                <iframe
                  loading="lazy"
                  src="https://youtube.com/embed/Ftze5hE-M9g?si=Y2fhq-F7VCYSZFSZ"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}