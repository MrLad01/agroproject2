'use client'

import { Facebook, Instagram, Mail, MapPin, PhoneCall, Twitter, Youtube } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '../public/Group 1.svg'

const Footer = () => {
    const [email, setEmail] = React.useState<string>('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setEmail(e.target.value);
    }

    return (
        <div className='bg-[#111111] w-full text-white px-4 sm:px-8 py-12 sm:py-16 eb-garamond'>

            {/* ── Main grid ── */}
            <div className='flex flex-col lg:flex-row items-start justify-center gap-10 lg:gap-12'>

                {/* ── Left: newsletter + contact ── */}
                <div className='w-full lg:w-[42%] lg:border-r-2 lg:border-[#EEEEEE66] lg:pr-10 pb-8 lg:pb-0 border-b-2 border-[#EEEEEE66] lg:border-b-0'>
                    <h5 className='font-medium leading-6 text-[17px] sm:text-[20px] mb-6'>
                        Sign up for our newsletter to receive<br className='hidden sm:block' /> special offers, news, and events.
                    </h5>

                    {/* Email input */}
                    <div className='flex items-center mb-6 border-b w-full sm:w-[80%] max-w-sm'>
                        <input
                            type="email"
                            placeholder='example@gmail.com'
                            className='outline-0 bg-transparent w-full py-1 text-[13px] placeholder-[#aaaaaa]'
                            onChange={(e) => handleInputChange(e)}
                            value={email}
                        />
                        <button className='work-sans text-[11px] sm:text-[12px] whitespace-nowrap px-4 sm:px-6 py-2 hover:text-zinc-300 transition-colors'>
                            SIGN UP
                        </button>
                    </div>

                    {/* Contact details */}
                    <div className='flex flex-col gap-3'>
                        <Link
                            className="flex gap-2 items-start text-[12px] sm:text-[13px] hover:text-zinc-300 transition-colors"
                            href="https://www.google.com/maps/place/Agroterra+Farm+Resort/@7.0972934,3.1209846,15z"
                            target='_blank'
                        >
                            <MapPin size={16} className='mt-0.5 shrink-0' />
                            <span>Joga-Orile, Iboro/Joga 110123, Ogun State</span>
                        </Link>
                        <Link
                            href={`tel:+2347036536705`}
                            className='flex items-center gap-2 hover:text-zinc-300 transition-colors'
                        >
                            <PhoneCall size={16} className='shrink-0' />
                            <p className='work-sans text-[12px] sm:text-[13px]'>(+234) 803 319 4444</p>
                        </Link>
                        <div className='flex items-center gap-2'>
                            <Mail size={16} className='shrink-0' />
                            <p className='work-sans text-[12px] sm:text-[13px]'>info@agroterraresort.com</p>
                        </div>
                    </div>
                </div>

                {/* ── Right: nav links ── */}
                <div className='w-full lg:w-[40%] flex flex-row flex-wrap gap-10 sm:gap-12 pt-2'>
                    {/* General links */}
                    <div>
                        <h1 className='eb-garamond font-medium text-[20px] sm:text-[22px] mb-3'>General</h1>
                        <ul className='flex flex-col gap-1.5'>
                            {[
                                { href: '/', label: 'Home' },
                                { href: '/reservation', label: 'Reservation' },
                                { href: '/golf', label: 'Golf' },
                                { href: '/sport-academy', label: 'Sport Academy' },
                                { href: '/contact', label: 'Contact' },
                                { href: '/about', label: 'About Us' },
                            ].map(({ href, label }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className='work-sans text-[12px] sm:text-[13px] hover:text-zinc-300 transition-colors'
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social links */}
                    <div>
                        <h1 className='eb-garamond font-medium text-[20px] sm:text-[22px] mb-3'>Connect</h1>
                        <ul className='flex flex-col gap-1.5'>
                            {[
                                { icon: <Facebook size={16} />, label: 'Facebook', href: '/' },
                                { icon: <Twitter size={16} />, label: 'Twitter', href: '/' },
                                { icon: <Instagram size={16} />, label: 'Instagram', href: '/' },
                                { icon: <Youtube size={16} />, label: 'Youtube', href: '/' },
                            ].map(({ icon, label, href }) => (
                                <li key={label} className='flex items-center gap-2'>
                                    {icon}
                                    <Link
                                        href={href}
                                        className='work-sans text-[12px] sm:text-[13px] hover:text-zinc-300 transition-colors'
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* ── Divider ── */}
            <hr className='mt-10 border-[#EEEEEE33]' />

            {/* ── Bottom bar ── */}
            <div className='mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-0 sm:px-4 md:px-10'>
                {/* Logo */}
                <Link href='/'>
                    <Image src={logo} alt='Agroterra logo' height={40} className='h-8 sm:h-10 w-auto' />
                </Link>

                {/* Copyright */}
                <p className='work-sans text-[11px] sm:text-[12px] text-[#aaaaaa] text-center'>
                    © {new Date().getFullYear()} Agroterra. All Rights Reserved.
                </p>

                {/* Legal links */}
                <div className='flex gap-4'>
                    <p className='work-sans text-[11px] sm:text-[12px] text-[#aaaaaa] cursor-pointer hover:text-white transition-colors'>
                        Terms &amp; Conditions
                    </p>
                    <p className='work-sans text-[11px] sm:text-[12px] text-[#aaaaaa] cursor-pointer hover:text-white transition-colors'>
                        Privacy Policy
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer