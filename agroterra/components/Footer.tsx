'use client'

import { Facebook, Instagram, Mail, MapPin, PhoneCall, Twitter, Youtube } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '../public/Group 1.svg'


const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/reservation', label: 'Reservation' },
  { href: '/golf', label: 'Golf' },
  { href: '/sport-academy', label: 'Sport Academy' },
  { href: '/sheedxfm', label: 'SheedX FM' },
  { href: '/contact', label: 'Contact' },
  { href: '/about', label: 'About Us' },
]

const socialLinks = [
  { icon: <Facebook size={15} />, label: 'Facebook', href: '/' },
  { icon: <Twitter size={15} />, label: 'Twitter', href: '/' },
  { icon: <Instagram size={15} />, label: 'Instagram', href: '/' },
  { icon: <Youtube size={15} />, label: 'YouTube', href: '/' },
]

const Footer = () => {
  const [email, setEmail] = React.useState('')
  const [submitted, setSubmitted] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    // TODO: wire up to your newsletter API
    setSubmitted(true)
    setEmail('')
  }

  return (
    <footer style={{ backgroundColor: '#0E1512' }} className="w-full text-white eb-garamond">

      {/* ── Top accent stripe ── */}
      <div className="h-0.75 w-full" style={{ backgroundColor: '#28683E' }} />

      <div className="px-6 sm:px-10 md:px-14 lg:px-20 pt-14 pb-10">

        {/* ── Main grid ── */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-0">

          {/* ── Col 1: Brand + newsletter ── */}
          <div
            className="w-full lg:w-[42%] lg:pr-14 pb-10 lg:pb-0 border-b lg:border-b-0 lg:border-r"
            style={{ borderColor: '#ffffff18' }}
          >
            {/* Logo — fix: mix-blend-mode makes black bg transparent on dark surface */}
            <Link href="/" className="inline-block mb-8">
              <Image
                src={logo}
                alt="Agroterra logo"
                width={130}
                height={40}
                className="h-10 w-auto"
                style={{ mixBlendMode: 'screen' }}
              />
            </Link>

            <p
              className="text-[15px] sm:text-[16px] font-medium leading-relaxed mb-7 max-w-sm"
              style={{ color: '#d4d4d4' }}
            >
              Sign up for our newsletter to receive special offers, news, and events.
            </p>

            {/* Newsletter form */}
            {submitted ? (
              <p className="text-[13px] mb-8" style={{ color: '#61A962' }}>
                ✓ You're subscribed. Thank you!
              </p>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex items-center mb-10 w-full max-w-sm border-b pb-1"
                style={{ borderColor: '#ffffff30' }}
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="outline-none bg-transparent flex-1 py-1 text-[13px] work-sans placeholder-white/30"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="work-sans text-[10px] tracking-[0.16em] uppercase px-4 py-2 ml-2 transition-colors whitespace-nowrap"
                  style={{ color: '#61A962' }}
                  onMouseOver={e => (e.currentTarget.style.color = '#F8FAF6')}
                  onMouseOut={e => (e.currentTarget.style.color = '#61A962')}
                >
                  Sign Up →
                </button>
              </form>
            )}

            {/* Contact details */}
            <div className="flex flex-col gap-3">
              <Link
                href="https://www.google.com/maps/place/Agroterra+Farm+Resort/@7.0972934,3.1209846,15z"
                target="_blank"
                className="flex gap-2.5 items-start group"
                style={{ color: '#aaaaaa' }}
              >
                <MapPin size={14} className="mt-0.5 shrink-0 group-hover:text-white transition-colors" />
                <span className="text-[12px] sm:text-[13px] work-sans leading-relaxed group-hover:text-white transition-colors">
                  Joga-Orile, Iboro/Joga 110123, Ogun State
                </span>
              </Link>

              <Link
                href="tel:+2348033194444"
                className="flex items-center gap-2.5 group"
                style={{ color: '#aaaaaa' }}
              >
                <PhoneCall size={14} className="shrink-0 group-hover:text-white transition-colors" />
                <span className="work-sans text-[12px] sm:text-[13px] group-hover:text-white transition-colors">
                  (+234) 803 319 4444
                </span>
              </Link>

              <a
                href="mailto:info@agroterraresort.com"
                className="flex items-center gap-2.5 group"
                style={{ color: '#aaaaaa' }}
              >
                <Mail size={14} className="shrink-0 group-hover:text-white transition-colors" />
                <span className="work-sans text-[12px] sm:text-[13px] group-hover:text-white transition-colors">
                  info@agroterraresort.com
                </span>
              </a>
            </div>
          </div>

          {/* ── Col 2: Nav + Social ── */}
          <div className="w-full lg:w-[58%] lg:pl-16 flex flex-row flex-wrap gap-10 sm:gap-14 pt-2">

            {/* General nav */}
            <div>
              <p
                className="text-[10px] tracking-[0.2em] uppercase mb-5 work-sans"
                style={{ color: '#61A962' }}
              >
                Navigate
              </p>
              <ul className="flex flex-col gap-2.5">
                {navLinks.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="work-sans text-[13px] transition-colors"
                      style={{ color: '#aaaaaa' }}
                      onMouseOver={e => (e.currentTarget.style.color = '#F8FAF6')}
                      onMouseOut={e => (e.currentTarget.style.color = '#aaaaaa')}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <p
                className="text-[10px] tracking-[0.2em] uppercase mb-5 work-sans"
                style={{ color: '#61A962' }}
              >
                Connect
              </p>
              <ul className="flex flex-col gap-3">
                {socialLinks.map(({ icon, label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="flex items-center gap-2.5 group transition-colors work-sans text-[13px]"
                      style={{ color: '#aaaaaa' }}
                      onMouseOver={e => (e.currentTarget.style.color = '#F8FAF6')}
                      onMouseOut={e => (e.currentTarget.style.color = '#aaaaaa')}
                    >
                      <span className="group-hover:text-white transition-colors">{icon}</span>
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hours — bonus column, easy to remove */}
            <div>
              <p
                className="text-[10px] tracking-[0.2em] uppercase mb-5 work-sans"
                style={{ color: '#61A962' }}
              >
                Hours
              </p>
              <ul className="flex flex-col gap-2 work-sans text-[12px] sm:text-[13px]" style={{ color: '#aaaaaa' }}>
                <li>Mon – Fri &nbsp; 7am – 10pm</li>
                <li>Saturday &nbsp; 7am – 11pm</li>
                <li>Sunday &nbsp;&nbsp;&nbsp; 8am – 9pm</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="mt-12 mb-7 h-px w-full" style={{ backgroundColor: '#ffffff12' }} />

        {/* ── Bottom bar ── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Logo (small) */}
          {/* <Link href="/" className="shrink-0">
            <Image
              src={logo}
              alt="Agroterra"
              width={90}
              height={28}
              className="h-7 w-auto"
              style={{ mixBlendMode: 'screen' }}
            />
          </Link> */}

          {/* Copyright */}
          <p className="work-sans text-[11px] text-center" style={{ color: '#555555' }}>
            © {new Date().getFullYear()} Agroterra Resort. All rights reserved.
          </p>

          {/* Legal links — fixed: use <Link> not <p> */}
          <div className="flex gap-5">
            <Link
              href="/terms"
              className="work-sans text-[11px] transition-colors"
              style={{ color: '#555555' }}
              onMouseOver={e => (e.currentTarget.style.color = '#F8FAF6')}
              onMouseOut={e => (e.currentTarget.style.color = '#555555')}
            >
              Terms &amp; Conditions
            </Link>
            <Link
              href="/privacy"
              className="work-sans text-[11px] transition-colors"
              style={{ color: '#555555' }}
              onMouseOver={e => (e.currentTarget.style.color = '#F8FAF6')}
              onMouseOut={e => (e.currentTarget.style.color = '#555555')}
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer