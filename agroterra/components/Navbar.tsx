'use client'

import React, { useState } from 'react'
import Image from "next/image";
import Link from "next/link";
import logo from '@/public/ASA logo.jpg'
import { FaConciergeBell } from 'react-icons/fa';


/* ─── Mobile Navigation ─── */
function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button — visible only on mobile/tablet */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden flex flex-col justify-center items-center gap-1.25 w-8 h-8 z-50 relative"
        aria-label="Toggle menu"
      >
        <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-1.75' : ''}`} />
        <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
        <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-1.75' : ''}`} />
      </button>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/90 backdrop-blur-sm z-40 flex flex-col items-center justify-center gap-8 transition-all duration-500 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        {[
          { href: '/', label: 'Home' },
          { href: '/reservation', label: 'Reservation' },
          { href: '/golf', label: 'Golf Course' },
          { href: '/sport-academy', label: 'Sport Academy' },
          { href: '/contact', label: 'Contact' },
          { href: '/about', label: 'About Us' },
        ].map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className="text-white eb-garamond-semibold text-[26px] tracking-wider hover:text-zinc-300 transition-colors"
          >
            {label}
          </Link>
        ))}
        <button
          onClick={() => setOpen(false)}
          className="work-sans-bold text-[13px] text-[#111111] uppercase px-8 py-3 bg-white rounded-full flex items-center gap-2 mt-4"
        >
          <FaConciergeBell size={14} />
          Book Now
        </button>
      </div>
    </>
  );
}


export default function Navbar() {
  return (
    <div>
        <nav className="flex items-center justify-between shadow-2xl">
                {/* Logo */}
                <div className="flex gap-2 items-center">
                  <Image src={logo} alt="Agroterra Logo" height={30} />
                  <h3 className="uppercase eb-garamond-extrabold text-[15px] sm:text-[17px] text-white">
                    Agroterra
                  </h3>
                </div>

                {/* Desktop links */}
                <div className="hidden lg:flex gap-8 xl:gap-12 items-center text-[13px] xl:text-[14px] normal-font pt-0.5">
                  <Link href="/" className="text-white hover:text-zinc-200 transition-colors">Home</Link>
                  <Link href="/reservation" className="text-white hover:text-zinc-200 transition-colors">Reservation</Link>
                  <Link href="/golf" className="text-white hover:text-zinc-200 transition-colors">Golf Course</Link>
                  <Link href="/sport-academy" className="text-white hover:text-zinc-200 transition-colors">Sport Academy</Link>
                  <Link href="/contact" className="text-white hover:text-zinc-200 transition-colors">Contact</Link>
                  <Link href="/about" className="text-white hover:text-zinc-200 transition-colors">About Us</Link>
                </div>

                {/* Desktop Book Now */}
                <button className="hidden lg:flex work-sans-bold text-[12px] text-[#111111] mr-10 uppercase px-6 py-2.5 bg-white rounded-4xl items-center gap-2 hover:bg-zinc-100 transition-colors">
                  <FaConciergeBell size={14} />
                  Book Now
                </button>

                {/* Mobile hamburger */}
                <MobileNav />
              </nav>
    </div>
  )
}
