"use client"

import Navbar from '@/components/Navbar'
import Image from 'next/image'
import { motion } from 'framer-motion'
import bg from '@/public/kitchen.png'
import dinner from '@/public/egusi.svg'
import breakfast from '@/public/breakfast.svg'
import dessert from '@/public/lunch.svg'
import rbreakfast from '@/public/rbreakfast.svg'
import rlunch from '@/public/rlunch.svg'
import rappetizer from '@/public/rappetizer.svg'
import drinks from '@/public/wine.jpg'
import ham from '@/public/ham.svg'
import jollof from '@/public/jollof.svg'
import puff from '@/public/puffpuff.svg'

const categories = [
  { label: "DINNER",    labelColor: "bg-[#F4796C]", title: "Really Quick Traditional Dishes",       img: dinner },
  { label: "BREAKFAST", labelColor: "bg-[#F4796C]", title: "Announcing The Spring Bucket List",     img: breakfast },
  { label: "DESSERT",   labelColor: "bg-[#F4796C]", title: "Favorite Snacks",                       img: dessert },
  { label: "DRINKS",    labelColor: "bg-[#F4796C]", title: "Refreshing Drinks",                     img: drinks },
]

// ── Top Categories (circular) ──
const topCategories = [
  { label: "BREAKFAST", img: ham },
  { label: "DESSERT",   img: dessert },
  { label: "LUNCH",     img: jollof },
  { label: "APPETIZER", img: puff },
  { label: "DINNER",    img: dinner },
]

// ── Weekly Best Recipes ──
const weeklyFeatured = {
  label: "BREAKFAST",
  title: "Have The Best Delicacies At Your Door Step",
  img: dinner,
}
const weeklySide = [
  { label: "LUNCH",     title: "Exploring The Potential Of Cooking International Cuisines",        img: jollof },
  { label: "DESSERT",   title: "Favorite Browned Butter Chocolate Cookies Daily Breakfast",        img: dessert },
  { label: "APPETIZER", title: "The Potentially Dangerous Non Sibility Of Cookie Notices",         img: rappetizer },
]

// ── Healthy Recipes ──
const healthyRecipes = [
  { label: "LUNCH",     title: "Have The Best Cuisine In Our Resort",                              img: jollof },
  { label: "BREAKFAST", title: "The Best Handoff Is No Handoff",                                   img: breakfast },
  { label: "DESSERT",   title: "One Of The Best Desserts In The Country",                          img: dessert },
  { label: "PIZZA",     title: "How To Make Puff Puff in Thirty Minutes.",                         img: puff },
  { label: "DINNER",    title: "Why You Should Consider Trying Our Traditional Recipe",            img: dinner },
  { label: "APPETIZER", title: "How To Create Dynamic Donut Plating Works",                        img: rappetizer },
]

// ── Explore Latest Recipes ──
const recipes = [
  { label: "BREAKFAST", title: "The Potentially Dangerous Non-Accessibility Of Cookie", img: rbreakfast },
  { label: "LUNCH",     title: "One-Pan Baked Sausage And Lentils",                     img: rlunch },
]
const featuredRecipe = {
  label: "APPETIZER",
  title: "Food Presentation At It's Best!",
  description: "Browned Butter And Brown Sugar Caramelly Goodness, Crispy Edges Thick And Soft Centers And Melty Little Puddles Of Chocolate My First Favorite Thing About These Browned Butter...",
  img: rappetizer,
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const page = () => {
  return (
    <div>
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex flex-col min-h-screen w-full bg-white items-center">

          {/* ── HERO ── */}
          <div className="w-full mb-6 sm:mb-8 lg:mb-10 relative">
            <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[93vh]">
              <Image src={bg} alt="Background image" fill className="object-cover" priority />
              <div className="absolute inset-0 bg-[#00000075] w-full h-full flex flex-col px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-5 lg:py-6">
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
                      AGROTERRA DINING
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="eb-garamond-italic uppercase text-[14px] sm:text-[16px] lg:text-[18px] max-w-[90%] sm:max-w-140 text-center mt-2 sm:mt-8"
                    >
                      &ldquo;A place that celebrates life.&rdquo;
                    </motion.p>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* ── CATEGORY CARDS ── */}
          <section className="w-full max-w-5xl px-4 sm:px-6 mb-10 sm:mb-14">
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {categories.map((cat) => (
                <motion.div key={cat.label} variants={cardVariants} className="flex flex-col items-center cursor-pointer group">
                  <div className="relative w-full aspect-square overflow-hidden rounded-sm shadow-sm">
                    <Image src={cat.img} alt={cat.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    <span className={`absolute top-2 left-2 ${cat.labelColor} text-white text-[10px] font-bold px-2 py-0.5 rounded-sm tracking-wide`}>
                      {cat.label}
                    </span>
                  </div>
                  <p className="mt-2 text-center text-lg font-semibold text-gray-800 leading-tight px-1 group-hover:text-[#F4796C] transition-colors">
                    {cat.title}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* ── NEWSLETTER BANNER ── */}
          <section className="w-full bg-[#e8f5f2] py-8 px-4 sm:px-6 mb-10 sm:mb-14">
            <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <p className="text-gray-700 font-semibold text-lg sm:text-xl text-center sm:text-left whitespace-nowrap">
                Get Your Food<br className="hidden sm:block" /> Served To You
              </p>
              <div className="flex flex-col sm:flex-row gap-2 w-full">
                <input type="text" placeholder="Name" className="flex-1 border border-gray-300 bg-white rounded-sm px-3 py-2 text-sm outline-none text-gray-500 focus:border-[#F4796C] transition-colors" />
                <input type="email" placeholder="E-mail" className="flex-1 border border-gray-300 bg-white rounded-sm px-3 py-2 text-sm outline-none text-gray-500 focus:border-[#F4796C] transition-colors" />
                <button className="bg-[#F4796C] hover:bg-orange-600 transition-colors text-white text-sm font-semibold px-5 py-2 rounded-sm whitespace-nowrap">
                  Submit Now →
                </button>
              </div>
            </div>
          </section>

          {/* ── EXPLORE LATEST RECIPES ── */}
          <section className="w-full max-w-5xl px-4 sm:px-6 mb-16">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Explore Latest Recipes</h2>
              <button className="text-sm text-gray-500 hover:text-[#F4796C] transition-colors">VIEW ALL →</button>
            </div>
            <div className="w-8 h-0.75 bg-red-500 mb-6" />
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div variants={cardVariants} className="sm:col-span-2 flex flex-col cursor-pointer group">
                <div className="relative w-full h-64 sm:h-80 overflow-hidden rounded-sm shadow-sm">
                  <Image src={featuredRecipe.img} alt={featuredRecipe.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute top-3 left-3 bg-[#F4796C] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm tracking-wide">
                    {featuredRecipe.label}
                  </span>
                </div>
                <h3 className="mt-3 text-lg sm:text-2xl font-bold text-gray-800 group-hover:text-[#F4796C] transition-colors leading-tight text-center">
                  {featuredRecipe.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500 leading-relaxed text-center line-clamp-3">{featuredRecipe.description}</p>
              </motion.div>
              <div className="flex flex-col gap-4">
                {recipes.map((r) => (
                  <motion.div key={r.title} variants={cardVariants} className="flex flex-col cursor-pointer group">
                    <div className="relative w-full h-36 sm:h-40 overflow-hidden rounded-sm shadow-sm">
                      <Image src={r.img} alt={r.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      <span className="absolute top-2 left-2 bg-[#F4796C] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm tracking-wide">
                        {r.label}
                      </span>
                    </div>
                    <h4 className="mt-2 text-sm font-semibold text-gray-800 group-hover:text-[#F4796C] transition-colors leading-tight text-center">
                      {r.title}
                    </h4>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          <section className="w-full bg-[#ddeee9] py-10 sm:py-14 px-4 sm:px-6 mb-10 sm:mb-14 relative overflow-hidden">
            {/* subtle dot-grid texture */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{ backgroundImage: "radial-gradient(circle, #6aaa93 1px, transparent 1px)", backgroundSize: "28px 28px" }}
            />
            <div className="relative max-w-3xl mx-auto flex flex-col items-center">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">Our Top Categories</h2>
              <div className="w-8 h-0.75 bg-[#F4796C] mb-3" />
              <p className="text-[13px] text-gray-500 text-center max-w-sm mb-8 leading-snug">
                Browned Butter And Brown Sugar Caramelly Goodness, Crispy Edges
                Thick And Soft Centers And Melty Little Puddles
              </p>
              <motion.div
                className="flex flex-wrap justify-center gap-5 sm:gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {topCategories.map((cat) => (
                  <motion.div key={cat.label} variants={cardVariants} className="flex flex-col items-center gap-2 cursor-pointer group">
                    <div className="relative w-24 h-24 sm:w-30 sm:h-30 rounded-full overflow-hidden border-4 border-white shadow-md group-hover:shadow-xl transition-shadow duration-300">
                      <Image src={cat.img} alt={cat.label} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                      {/* label bar at bottom of circle */}
                      <span className="absolute bottom-10 left-6 inset-x-0 w-16 bg-[#F4796C] text-white text-[9px] font-bold text-center py-0
                       tracking-wide">
                        {cat.label}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          <section className="w-full max-w-5xl px-4 sm:px-6 mb-14">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Weekly Best Recipes</h2>
              <button className="text-sm text-gray-500 hover:text-[#F4796C] transition-colors">VIEW ALL →</button>
            </div>
            <div className="w-8 h-0.75 bg-[#F4796C] mb-6" />

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div variants={cardVariants} className="cursor-pointer group">
                <div className="relative w-full h-64 sm:h-full min-h-70 overflow-hidden rounded-sm shadow-sm">
                  <Image src={weeklyFeatured.img} alt={weeklyFeatured.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="bg-[#F4796C] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm tracking-wide">
                      {weeklyFeatured.label}
                    </span>
                    <h3 className="mt-2 text-white font-normal text-base sm:text-2xl leading-snug group-hover:text-[#F4796C] transition-colors">
                      {weeklyFeatured.title}
                    </h3>
                  </div>
                </div>
              </motion.div>

              {/* 3 horizontal side cards */}
              <div className="flex flex-col gap-4 justify-between">
                {weeklySide.map((r) => (
                  <motion.div key={r.title} variants={cardVariants} className="flex gap-3 cursor-pointer group">
                    <div className="relative w-24 h-20 sm:w-28 sm:h-22 shrink-0 overflow-hidden rounded-sm shadow-sm">
                      <Image src={r.img} alt={r.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="flex flex-col justify-center gap-1.5">
                      <span className="bg-[#F4796C] text-white text-[9px] font-bold px-2 py-0.5 rounded-sm tracking-wide w-fit">
                        {r.label}
                      </span>
                      <h4 className="text-lg font-semibold text-gray-800 group-hover:text-[#F4796C] transition-colors leading-snug line-clamp-2">
                        {r.title}
                      </h4>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          <section className="w-full max-w-5xl px-4 sm:px-6 mb-16">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Healthy Recipes</h2>
            </div>
            <div className="w-8 h-0.75 bg-[#F4796C] mb-6" />

            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              {healthyRecipes.map((r) => (
                <motion.div key={r.title} variants={cardVariants} className="flex flex-col cursor-pointer group">
                  <div className="relative w-full aspect-4/3 overflow-hidden rounded-sm shadow-sm">
                    <Image src={r.img} alt={r.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    {/* label centred at bottom of image */}
                    <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#F4796C] text-white text-[9px] font-bold px-3 py-0.5 rounded-sm tracking-wide whitespace-nowrap">
                      {r.label}
                    </span>
                  </div>
                  <p className="mt-2 text-center text-lg font-semibold text-gray-800 group-hover:text-[#F4796C] transition-colors leading-snug px-1 line-clamp-2">
                    {r.title}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </section>

        </main>
      </div>
    </div>
  )
}

export default page