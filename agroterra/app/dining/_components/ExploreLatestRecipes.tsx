'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Theme } from '@/lib/theme'
import { containerVariants, cardVariants } from '@/lib/theme'
import { featuredRecipe, sideRecipes } from '@/data/data'
import { SectionHeading, Badge } from './ui'

export function ExploreLatestRecipes({
  t,
  onViewAll,
}: {
  t: Theme
  onViewAll: () => void
}) {
  return (
    <section className="w-full max-w-5xl px-4 sm:px-6 mb-16">
      <SectionHeading title="Taste of the Motherland" t={t} viewAll onViewAll={onViewAll} />

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-[1fr_420px] gap-4 sm:gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Large featured card */}
        <motion.div variants={cardVariants} className="flex flex-col cursor-pointer group">
          <div
            className="relative w-full overflow-hidden rounded-2xl"
            style={{
              height: 'clamp(280px, 40vw, 440px)',
              background: `linear-gradient(135deg, ${featuredRecipe.gradientFrom}, ${featuredRecipe.gradientTo})`,
              border: `1px solid ${t.borderVal}`,
              boxShadow: `0 16px 48px rgba(0,0,0,0.18)`,
            }}
          >
            <Image
              src={featuredRecipe.img}
              alt={featuredRecipe.title}
              fill
              className="object-cover opacity-75 transition-all duration-500 group-hover:opacity-90 group-hover:scale-105"
            />
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)',
              }}
            />
            <div className="absolute bottom-5 left-5 right-5">
              <Badge label={featuredRecipe.label} t={t} />
              <h3
                className="mt-2 text-white eb-garamond-semibold leading-tight group-hover:opacity-80 transition-opacity"
                style={{ fontSize: 'clamp(20px,3vw,30px)' }}
              >
                {featuredRecipe.title}
              </h3>
            </div>
          </div>

          <p
            className="mt-3 cormorant-garamond-light-italic text-[14px] sm:text-[15px] leading-relaxed"
            style={{ color: t.mutedVal }}
          >
            {featuredRecipe.description}
          </p>
        </motion.div>

        {/* Two stacked side cards */}
        <div className="flex flex-col gap-4">
          {sideRecipes.map((r) => (
            <motion.div
              key={r.title}
              variants={cardVariants}
              className="flex flex-col cursor-pointer group flex-1"
            >
              <div
                className="relative w-full overflow-hidden rounded-2xl flex-1"
                style={{
                  minHeight: 190,
                  background: `linear-gradient(135deg, ${r.gradientFrom}, ${r.gradientTo})`,
                  border: `1px solid ${t.borderVal}`,
                  boxShadow: `0 8px 24px rgba(0,0,0,0.14)`,
                }}
              >
                <Image
                  src={r.img}
                  alt={r.title}
                  fill
                  className="object-cover opacity-75 transition-all duration-500 group-hover:opacity-90 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)',
                  }}
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <Badge label={r.label} t={t} />
                  <h3 className="mt-2 text-white eb-garamond-semibold text-[15px] sm:text-[17px] leading-snug group-hover:opacity-80 transition-opacity">
                    {r.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}