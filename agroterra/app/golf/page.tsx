'use client'

import Image from 'next/image'
import Link from 'next/link'
import logo from '@/public/ASA logo.jpg'
import { FaConciergeBell } from 'react-icons/fa'
// import bg from '@/public/09.png'
import bg from '@/public/image_14.png'
import video from "@/public/golf course side.png"
import block1 from "@/public/Golf image block 1.png"
import block2 from "@/public/Golf image block 2.png"
import block3 from "@/public/Golf image block 3.png"
import block4 from "@/public/Golf image block 4.png"
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}


export default function page() {
  const [activeTab, setActiveTab] = useState<string>('about');

  // Load from localStorage only after component mounts (client-side only)
  useEffect(() => {
    const tabFromLocal = localStorage.getItem('tab2')
    if (tabFromLocal) {
      setActiveTab(tabFromLocal)
    }
  }, [])

  const handleTabSwitch = (tabStart: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveTab(tabStart);
    localStorage.setItem("tab2", tabStart)
  }

  return (
    <div className="pb-130">
      <div className="flex-col min-h-screen overflow-x-hidden items-center justify-center bg-zinc-50 font-sans">
        <main className="flex flex-col min-h-screen w-full bg-white dark:bg-black sm:items-start">
          {/* Background Carousel */}
          <div className="w-[108vw]">
            <Image src={bg} alt='bg-image' className='w-full border object-fill -ml-28' />
            <div className="absolute top-8 w-full h-[108vh] bg-[#00000075] flex flex-col px-12 py-6"></div>
            <div className="absolute top-8 w-full h-[110vh] flex flex-col px-12 py-6">
              {/* Nav */}
              <nav className="flex items-center justify-between shadow-3xl">
                {/* Logo */}
                <div className="flex gap-2 items-center">
                  <Image src={logo} alt="Agroterra Logo" height={30} />
                  <h3 className="uppercase eb-garamond-extrabold text-[17px] text-white">Agroterra</h3>
                </div>
                <div className="flex gap-12 items-center text-[14px] normal-font pt-0.5">
                  <Link href={`/`} className=" text-white">Home</Link>
                  <Link href={`/about`} className=" text-white">About Us</Link>
                  <Link href={`/resort`} className=" text-white">Resort</Link>
                  <Link href={`/golf`} className=" text-white">Golf</Link>
                  <Link href={`/sport-academy`} className=" text-white">Sport Academy</Link>
                  <Link href={`/contact`} className=" text-white">Contact</Link>
                </div>
                <button className="work-sans-bold text-[12px] mr-10 uppercase px-6 py-2.5 bg-white rounded-4xl flex items-center gap-2">
                  <FaConciergeBell size={14} />
                  Book Now
                </button>
              </nav>
              <div className="h-full flex flex-col text-white items-center justify-center leading-relaxed">
                <div className="flex flex-col justify-center items-center -mt-16">
                  <h2 className="text-center eb-garamond-semibold text-[62px] welcome-text">AGROTERRA</h2>
                  <p className="eb-garamond-italic text-[28px] max-w-140 text-center">&ldquo;Where nature, comfort, and experience meet.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
        <div className="flex items-center-safe w-full mt-8 mb-16 px-60">
          <button className={`w-full py-4 text-[16px]  eb-garamond-bold ${activeTab === "about" ? "border-b-[#101996] text-[#101996] border-b-2" : " text-[#111111] opacity-30 cursor-pointer"}`} onClick={(e) => handleTabSwitch("about", e)}>
            About
          </button>
          <button className={`w-full py-4 text-[16px]  eb-garamond-bold ${activeTab === "driving range" ? "border-b-[#101996] text-[#101996] border-b-2" : "text-[#111111] opacity-30 cursor-pointer"}`} onClick={(e) => handleTabSwitch("driving range", e)}>
            Driving Range
          </button>
          <button className={`w-full py-4 text-[16px]  eb-garamond-bold ${activeTab === "club house" ? "border-b-[#101996] text-[#101996] border-b-2" : "text-[#111111] opacity-30 cursor-pointer"}`} onClick={(e) => handleTabSwitch("club house", e)}>
            Club House
          </button>
        </div>
        {activeTab === "about" && (
          <div className='flex-col justify-center items-center px-60 py-8 gap-2'>
            {/* VIDEO */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1 }}
              className="flex justify-center"
            >
              <div className="relative w-[70%] aspect-video rounded-xl overflow-hidden shadow-xl">
                <iframe
                  src="https://www.youtube.com/embed/Hc0KW9WMBpU?autoplay=1&mute=1&loop=1&playlist=Hc0KW9WMBpU&controls=0&modestbranding=1"
                  title="Golf Course Video"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </motion.div>
            <p className="work-sans font-bold text-black tracking-wide text-[16px] mt-12">
              Welcome to the golf course at Agroterra Resort, where nature and recreation come together in a peaceful, open setting. Surrounded by trees and spread across a large portion of land, the course offers an experience that is both relaxing and rewarding. From the moment you step onto the grounds, you are welcomed by fresh air, wide green views, and a calm atmosphere that makes every visit feel like an escape.
            </p>
            <p className="work-sans font-bold text-black tracking-wide text-[16px] mt-12">
              One of the most distinctive features of the course is its sense of space. The generous layout allows each hole to feel open and inviting, giving players room to focus and play comfortably. Fairways stretch naturally across the landscape, while greens sit in quiet clearings framed by trees. This openness creates an unhurried pace, making the course enjoyable for both casual rounds and focused games.
            </p>
            <p className="work-sans font-bold text-black tracking-wide text-[16px] mt-12">
              The surrounding trees shape the character of the golf course. They form a natural border that brings privacy and serenity, while also adding beauty and shade throughout the day. Sunlight filtering through the branches creates soft patterns on the grass, and the gentle sounds of leaves and birds enhance the peaceful environment. The presence of nature is felt at every step, turning a simple game into a refreshing outdoor experience.
            </p>
            <p className="work-sans font-bold text-black tracking-wide text-[16px] mt-12">
              Designed to follow the natural contours of the land, the course flows smoothly with gentle slopes and subtle changes in elevation. This thoughtful layout makes the course welcoming to players of all skill levels. Beginners can feel at ease on the open fairways, while more experienced golfers can enjoy the variety and strategy offered by the terrain and green placements.
              Each hole has its own atmosphere. Some open up to broad views of sky and greenery, while others feel more enclosed and quiet, encouraging focus and precision. The journey between holes becomes part of the enjoyment, offering moments to take in the scenery and relax before the next shot.
            </p>
            <p className="work-sans font-bold text-black tracking-wide text-[16px] mt-12">
              The greens are carefully maintained, providing a smooth and satisfying surface for play. Their well kept condition reflects the care given to the course while preserving its natural charm. The balance between maintained playing areas and the surrounding landscape gives the course its unique appeal.
            </p>
            <p className="work-sans font-bold text-black tracking-wide text-[16px] mt-12">
              The golf course at Agroterra Resort is also a place for connection. Friends, families, and colleagues gather here to share time outdoors in a welcoming setting. The spacious design allows everyone to enjoy their game without feeling crowded, creating a comfortable and social environment.
              More than just a sports facility, the golf course is a space to slow down and recharge. Its large open areas, tree lined surroundings, and calm atmosphere create a setting where you can enjoy both the game and the beauty of nature. At Agroterra Resort, every round of golf becomes a relaxing journey through a landscape designed to inspire comfort, focus, and enjoyment
            </p>
            <div className="py-24 space-y-14">
              <div className="flex gap-4 justify-center">
                {[block1, block2].map((img, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <Image src={img} alt="image" />
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-4 justify-center">
                {[block3, block4].map((img, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <Image src={img} alt="image" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
        {activeTab === "driving range" && (
          <div className='flex-col justify-center items-center px-60 py-8 gap-2'>
            {/* VIDEO */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1 }}
              className="flex justify-center"
            >
              <div className="relative w-[70%] aspect-video rounded-xl overflow-hidden shadow-xl">
                <iframe
                  src="https://www.youtube.com/embed/Hc0KW9WMBpU?autoplay=1&mute=1&loop=1&playlist=Hc0KW9WMBpU&controls=0&modestbranding=1"
                  title="Golf Course Video"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </motion.div>
            <p className="work-sans font-bold text-black tracking-wide text-[16px] mt-12">
              The driving range at Agroterra Resort is designed as the perfect space to practice, warm up, and build confidence in a calm natural environment. Just like the main course, the range is surrounded by trees and open landscape, creating a setting that feels peaceful and focused rather than busy or crowded. It is a place where players of all levels can take their time, work on their swing, and enjoy the simple rhythm of the game.
            </p>
            <p className="work-sans font-bold text-black tracking-wide text-[16px] mt-12">
              Set within a spacious portion of land, the driving range offers plenty of room to practice full shots comfortably. The open layout allows you to see the full flight of the ball against the wide sky, helping you better understand distance, direction, and control. Whether you are preparing for a round on the course or simply visiting to improve your technique, the range provides an environment that supports steady progress.
            </p>
            <p className="work-sans font-bold text-black tracking-wide text-[16px] mt-12">
              The natural surroundings play an important role in the experience. Trees line the edges of the range, offering shade and a sense of privacy while also reducing outside distractions. The sound of clubs connecting with balls blends with the quiet atmosphere of nature, creating a setting that feels both active and relaxing. Practicing here does not feel rushed or pressured. Instead, it feels like time well spent outdoors.
            </p>
            <p className="work-sans font-bold text-black tracking-wide text-[16px] mt-12">
              The surface of the range is carefully maintained to ensure a comfortable and consistent practice experience. Players can focus on refining their stance, swing path, and timing with confidence. The open target area gives a clear view, making it easier to set personal goals and track improvement over time. From short controlled shots to powerful drives, the range supports every aspect of long game practice.
            </p>
            <p className="work-sans font-bold text-black tracking-wide text-[16px] mt-12">
              The driving range is ideal for beginners who are just getting comfortable with the fundamentals of golf. The welcoming and open environment helps reduce tension, allowing new players to learn at their own pace. At the same time, experienced golfers can use the space to fine tune their mechanics, build consistency, and prepare mentally before stepping onto the course.
              More than just a practice area, the driving range at Agroterra Resort is part of the overall experience of relaxation and recreation. It offers a quiet corner of the resort where focus and calm come together. Surrounded by trees, open air, and natural beauty, it turns practice into a refreshing and enjoyable part of your visit.
            </p>
            <div className="py-24 space-y-14">
              <div className="flex gap-4 justify-center">
                {[block1, block2].map((img, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <Image src={img} alt="image" />
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-4 justify-center">
                {[block3, block4].map((img, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <Image src={img} alt="image" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "club house" && (
          <div className='flex-col justify-center items-center px-60 py-8 gap-2'>
            {/* VIDEO */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              transition={{ duration: 1 }}
              className="flex justify-center"
            >
              <div className="relative w-[70%] aspect-video rounded-xl overflow-hidden shadow-xl">
                <iframe
                  src="https://www.youtube.com/embed/Hc0KW9WMBpU?autoplay=1&mute=1&loop=1&playlist=Hc0KW9WMBpU&controls=0&modestbranding=1"
                  title="Golf Course Video"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </motion.div>
            <p className="work-sans font-bold text-black tracking-wide text-[16px] mt-12">
              The clubhouse at Agroterra Resort is the heart of the golf experience, a welcoming space where comfort, connection, and relaxation come together. Designed to complement the natural beauty of the surrounding course, the clubhouse offers a calm and inviting environment where players and visitors can unwind before or after their time on the greens.
            </p>
            <p className="work-sans font-bold text-black tracking-wide text-[16px] mt-12">
              Set against the backdrop of trees and open landscape, the clubhouse blends seamlessly with its surroundings. Large windows and open views allow natural light to fill the space, creating a bright and refreshing atmosphere. From inside, guests can still feel connected to the course, with views of the greenery that extend the outdoor experience into a comfortable indoor setting.
            </p>
            <p className="work-sans font-bold text-black tracking-wide text-[16px] mt-12">
              The clubhouse serves as a gathering place for golfers, families, and friends. It is where rounds begin with anticipation and end with shared stories of the day’s best shots. The relaxed environment encourages conversation, laughter, and moments of rest. Whether you are meeting fellow players, taking a quiet break, or simply enjoying the peaceful setting, the clubhouse provides a space that feels both social and serene.
            </p>
            <p className="work-sans font-bold text-black tracking-wide text-[16px] mt-12">
              Comfort is at the center of the clubhouse experience. Seating areas are arranged to help guests feel at ease, offering a place to sit back and recharge. The atmosphere is calm and unhurried, reflecting the overall pace of life at Agroterra Resort. After spending time outdoors, the clubhouse offers a welcome transition where you can cool down, refresh, and reflect on your game.
              The clubhouse also supports the practical side of your visit, helping ensure a smooth and enjoyable day at the course. It is a convenient point of arrival and departure, where guests can prepare for their round and wind down afterward. Its thoughtful design and welcoming feel make it more than just a building. It is an essential part of the overall golf experience.
            </p>
            <p className="work-sans font-bold text-black tracking-wide text-[16px] mt-12">
              At Agroterra Resort, the clubhouse represents hospitality and comfort set within nature. Surrounded by trees and open air, it brings together the beauty of the outdoors with the ease of an indoor retreat, creating a space where every visit to the golf course feels complete.
            </p>
            <div className="py-24 space-y-14">
              <div className="flex gap-4 justify-center">
                {[block1, block2].map((img, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <Image src={img} alt="image" />
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-4 justify-center">
                {[block3, block4].map((img, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <Image src={img} alt="image" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
