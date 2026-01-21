'use client'

import { Facebook, Instagram, Mail, MapPin, PhoneCall, Twitter, Youtube } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from '../public/Group 1.svg'
// import logo from '@/public/ASA logo.jpg'

const Footer = () => {

    const [email, setEmail] = React.useState<string>('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setEmail(e.target.value);
    }

    return (
        <div className='bg-[#111111] absolute bottom-0 w-full text-white px-4 py-16 eb-garamond'>
            <div className='flex items-center justify-center gap-12'>
                <div className='border-r-2 border-[#EEEEEE66] p-4 w-[40%]'>
                    <h5 className='font-medium leading-6 text-[20px] mb-6'>Sign up for our newsletter to receive<br />special offers, news, and events.</h5>
                    <div className='flex  items-center mb-4 border-b w-[70%]'>
                        <input type="mail" placeholder='example@gmail.com' className='outline-0 w-full' onChange={(e) => handleInputChange(e)} value={email} />
                        <button className='work-sans text-[12px] w-30 px-6 py-2'>SIGN UP</button>
                    </div>
                    <div className='flex items-center justify-start gap-2 mb-4'>
                        <MapPin/>
                        <p className='work-sans text-[12px]'>Joga-Orile, Iboro/Joga 110123, Ogun State</p>
                    </div>
                    <div className='flex items-center justify-start gap-2 mb-4'>
                        <PhoneCall/>
                        <p className='work-sans text-[12px]'>(+234) 803 319 4444</p>
                    </div>
                    <div className='flex items-center justify-start gap-2'>
                        <Mail/>
                        <p className='work-sans text-[12px]'>info@agroterraresort.com</p>
                    </div>
                </div>
                <div className='flex justify-center items-start-safe gap-12 px-4 w-[40%] -mt-14'>
                    <div className='flex-col justify-center items-center'>
                        <h1 className='eb-garamond font-medium text-[22px] mb-2'>General</h1>
                        <ul>
                            <li className='work-sans text-[13px] mb-2'><Link href={'/'}>Home</Link></li>
                            <li className='work-sans text-[13px] mb-2'><Link href={'/resort'}>Resort</Link></li>
                            <li className='work-sans text-[13px] mb-2'><Link href={'/golf'}>Golf</Link></li>
                            <li className='work-sans text-[13px] mb-2'><Link href={'/sport-academy'}>Sport Academy</Link></li>
                            <li className='work-sans text-[13px] '><Link href={'/contact'}>Contact</Link></li>
                        </ul>
                    </div>
                    <div className='flex-col justify-center items-center'>
                        <h1 className='eb-garamond font-medium text-[22px] mb-2'>Connect</h1>
                        <ul>
                            <li className='flex items-center justify-start gap-2 work-sans text-[13px] mb-2'><Facebook size={20} /><Link href={'/'}>Facebook</Link></li>
                            <li className='flex items-center justify-start gap-2 work-sans text-[13px] mb-2'><Twitter size={20} /><Link href={'/'}>Twitter</Link></li>
                            <li className='flex items-center justify-start gap-2 work-sans text-[13px] mb-2'><Instagram size={20} /><Link href={'/'}>Instagram</Link></li>
                            <li className='flex items-center justify-start gap-2 work-sans text-[13px] mb-2'><Youtube size={20} /><Link href={'/'}>Youtube</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr className='mt-8 text-[#EEEEEE66] font-medium' />
            <div>
                <div className='flex justify-center items-center'>
                {/* <Image src={logo} alt='logo' width={100} className='-mt-8 -ml-12' /> */}
                <Image src={logo} alt='logo' className='-mt-8 -ml-12' />
                </div>
                <div className='flex items-center justify-between px-36 mt-4'>
                    <p className='work-sans text-[12px]'>© {new Date().getFullYear()} Agroterra. All Right Reserved.</p>
                    <div className='flex gap-4'>
                        <p className='work-sans text-[12px]'>Terms & conditions</p>
                        <p className='work-sans text-[12px]'>Privacy policy</p>
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}

export default Footer