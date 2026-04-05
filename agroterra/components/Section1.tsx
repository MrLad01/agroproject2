'use client'

import Image from 'next/image'
import image1 from '@/public/relaxation.png'
import image2 from '@/public/contact.png'
import React from 'react'

// ── Theme tokens (passed down from parent or consumed via context) ─
// Since this is a standalone section, it accepts an optional `dark`
// boolean prop so the parent page can drive the theme toggle.
type Props = {
  dark?: boolean
}

const SectionOne = ({ dark = false }: Props) => {
  // ── Tokens ────────────────────────────────────────────────────
  const bg       = dark ? '#0a120a' : '#f8f5ef'
  const heading  = dark ? '#d4ebb0' : '#0f1f0f'
  const quote    = dark ? '#7ec850' : '#1e5e32'
  const border   = dark ? '#2a3d2a' : '#ddd5c4'
  const imgShadow = dark
    ? '0 8px 40px rgba(0,0,0,0.55)'
    : '0 8px 40px rgba(0,0,0,0.10)'

  return (
    <section
      style={{ backgroundColor: bg, borderTop: `1px solid ${border}`, transition: 'background-color .3s, border-color .3s' }}
      className="py-14 sm:py-20 md:py-28 px-6 sm:px-12 md:px-20 lg:px-40 flex flex-col items-center"
    >
      {/* ── Label ─────────────────────────────────────────────── */}
      <p
        className="text-[10px] font-bold uppercase tracking-[0.28em] mb-4"
        style={{ color: quote, transition: 'color .3s' }}
      >
        Agroterra Resort
      </p>

      {/* ── Heading ───────────────────────────────────────────── */}
      <h2
        className="eb-garamond-semibold text-center leading-tight"
        style={{
          color: heading,
          fontSize: 'clamp(28px,5vw,52px)',
          transition: 'color .3s',
        }}
      >
        WELCOME TO AGROTERRA
      </h2>

      {/* ── Accent rule ───────────────────────────────────────── */}
      <div
        className="mt-4 mb-3 w-12 h-px rounded-full"
        style={{ backgroundColor: quote, opacity: 0.7 }}
      />

      {/* ── Quote ─────────────────────────────────────────────── */}
      <p
        className="eb-garamond-italic text-center max-w-[88vw] sm:max-w-lg"
        style={{
          color: quote,
          fontSize: 'clamp(17px,2.8vw,26px)',
          transition: 'color .3s',
        }}
      >
        &ldquo;A place that celebrates life.&rdquo;
      </p>

      {/* ── Images ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-7 md:gap-10 mt-12 sm:mt-14 items-stretch w-full justify-center">
        {[
          { src: image1, alt: 'Relaxation at Agroterra' },
          { src: image2, alt: 'Agroterra grounds' },
        ].map(({ src, alt }, i) => (
          <div
            key={i}
            className="w-full sm:w-1/2 overflow-hidden rounded-2xl"
            style={{ boxShadow: imgShadow, transition: 'box-shadow .3s' }}
          >
            <Image
              src={src}
              alt={alt}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.04]"
              style={{ display: 'block' }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default SectionOne