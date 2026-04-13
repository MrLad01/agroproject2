'use client'

import Image from "next/image";
import background1 from '@/public/relaxation3.png'
import background3 from '@/public/kitchen.png'
import background4 from '@/public/radio.jpg'
import background6 from '@/public/dorm6.png'
import background7 from '@/public/golf3.png'
import background8 from '@/public/top-view.png'
import securityImage from '@/public/security.png'
import aboutImage from '@/public/house2.png'
import gsap from 'gsap';
import { motion } from "framer-motion"
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";
import { Moon, Sun } from "lucide-react";

export default function Page() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [dark]);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) setDark(true);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(".hero-text",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.8, ease: "power4.out", stagger: 0.3 }
    );

    const sections = gsap.utils.toArray<HTMLElement>(".animate-section");
    sections.forEach((section) => {
      const textElements = section.querySelectorAll<HTMLElement>('h2, p, span, .badge');
      const img = section.querySelector<HTMLElement>('.animate-image');

      gsap.fromTo(
        textElements,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.15,
          immediateRender: false,
          scrollTrigger: {
            trigger: section,
            start: "top 95%",
            once: true,
          }
        }
      );

      if (img) {
        gsap.fromTo(
          img,
          { scale: 1.08, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.6,
            ease: "power4.out",
            immediateRender: false,
            scrollTrigger: {
              trigger: section,
              start: "top 95%",
              once: true,
            }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const bg = dark ? 'bg-[#0f1a0f]' : 'bg-white';
  const bgAlt = dark ? 'bg-[#151f15]' : 'bg-[#f3f7f0]';
  const textHead = dark ? 'text-[#c8e6a0]' : 'text-[#1a3d1a]';
  const textBody = dark ? 'text-[#9bbf85]' : 'text-[#3a5c3a]';
  const accent = dark ? 'text-[#7ec850]' : 'text-[#3a7d1a]';
  const divider = dark ? 'border-[#2d4d2d]' : 'border-[#c5ddb5]';

  const t = {
    accentVal: dark ? '#7ec850' : '#3a7d1a',
    borderVal: dark ? '#2d4d2d' : '#c5ddb5',
  };

  type SectionProps = {
    title: string;
    body: React.ReactNode;
    image: any;
    imageAlt: string;
    reverse?: boolean;
    bgClass?: string;
    badge?: string;
  };

  function Section({ title, body, image, imageAlt, reverse = false, bgClass, badge }: SectionProps) {
    const base = bgClass ?? bg;
    return (
      <div className={`
        animate-section
        ${base}
        flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}
        px-6 sm:px-10 md:px-20 lg:px-32
        py-14 sm:py-20 md:py-24
        gap-10 lg:gap-20
        items-center
        border-t ${divider}
      `}>
        <div className="flex flex-col gap-4 w-full lg:flex-1">
          {badge && (
            <span className={`badge inline-block self-start text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full border ${divider} ${accent}`}>
              {badge}
            </span>
          )}
          <h2 className={`cormorant-garamond-medium-italic text-3xl sm:text-4xl md:text-[2.6rem] leading-snug ${textHead}`}>
            {title}
          </h2>
          <div className={`w-10 h-0.5 rounded-full bg-current ${accent} opacity-60`} />
          <p className={`cormorant-garamond-light-italic text-[17px] sm:text-[18px] md:text-[19px] leading-relaxed ${textBody}`}>
            {body}
          </p>
        </div>

        <div className="w-full lg:flex-1 overflow-hidden rounded-xl shadow-lg">
          <Image
            src={image}
            alt={imageAlt}
            className="animate-image w-full h-64 sm:h-80 md:h-96 lg:h-104 object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`${dark ? 'dark' : ''} min-h-screen transition-colors duration-300`}>

      <motion.button
        onClick={() => setDark(d => !d)}
        aria-label="Toggle dark mode"
        className="fixed bottom-6 right-6 z-50 cursor-pointer w-12 h-12 rounded-full flex items-center justify-center"
        style={{
          backgroundColor: dark ? '#0f180f' : '#ede8df',
          color: t.accentVal,
          border: `1px solid ${t.borderVal}`,
        }}
        animate={{
          boxShadow: [
            `0 0 0px 0px ${t.accentVal}00`,
            `0 0 16px 4px ${t.accentVal}55`,
            `0 0 0px 0px ${t.accentVal}00`,
          ],
          rotate: [0, -8, 8, -4, 4, 0],
        }}
        transition={{
          boxShadow: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
        }}
        whileHover={{ scale: 1.18, rotate: 20 }}
        whileTap={{ scale: 0.88, rotate: -15 }}
      >
        <motion.div
          animate={{ rotate: dark ? 0 : 360 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </motion.div>
      </motion.button>

      {/* ====================== HERO ====================== */}
      <div className="relative w-full h-svh overflow-hidden">

        {/* Video background */}
        <video
          autoPlay
          loop
          playsInline
          controls
          className="absolute inset-0 w-full h-full object-cover"
          src="https://res.cloudinary.com/dcgvs3u4e/video/upload/VID-20260411-WA0023_m5b58f.mp4"
          // starts muted so autoplay works, user can unmute via controls
          muted
        />

        {/* Gradient overlay */}
        <div className={`absolute inset-0 pointer-events-none ${dark
          ? 'bg-linear-to-b from-black/70 via-black/55 to-black/80'
          : 'bg-linear-to-b from-black/50 via-black/40 to-black/70'
          }`} />

        {/* Navbar */}
        <div className="absolute inset-x-0 top-0 z-20 w-full px-4 sm:px-8 md:px-12 pt-4 sm:pt-6">
          <Navbar />
        </div>

        {/* Hero text */}
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center px-6 text-white -mt-16 sm:-mt-20 md:-mt-24">
          <div className="hero-text w-16 h-px bg-[#8bc34a] mb-5 opacity-80" />
          <h1 className="hero-text text-center eb-garamond-semibold text-[42px] sm:text-[56px] md:text-[68px] tracking-widest uppercase leading-none">
            AGROTERRA
          </h1>
          <p className="hero-text eb-garamond-italic text-[18px] sm:text-[22px] md:text-[26px] text-center mt-4 text-white/85 max-w-xl">
            Where nature, comfort, and experience meet.
          </p>
          <div className="hero-text mt-10 flex flex-col items-center gap-1 opacity-60">
            <span className="text-xs tracking-widest uppercase text-white/70">Scroll</span>
            <div className="w-px h-8 bg-white/50 animate-pulse" />
          </div>
        </div>
      </div>

      {/* ====================== ABOUT ====================== */}
      <Section
        title="About Agroterra Resort"
        badge="Our Story"
        body="Agroterra Resort is a peaceful destination designed to bring people closer to nature while offering comfort and relaxation. Surrounded by open landscapes and natural beauty, the resort provides a calm escape from busy everyday life. Every space is created to feel at home — welcoming, spacious, and refreshing, allowing guests to slow down, breathe deeply, and enjoy meaningful moments. From leisure experiences to quiet retreats, Agroterra combines nature, comfort, and thoughtful design to create a stay that feels both restful and memorable."
        image={aboutImage}
        imageAlt="About Agroterra Resort"
        bgClass={bg}
      />

      <Section
        title="Surrounded by Natural Beauty"
        badge="Nature"
        body="Nature is at the heart of the Agroterra experience. The resort is embraced by trees, open skies, and fresh air that create a peaceful and grounding atmosphere. The natural setting adds beauty to every moment, from morning walks to quiet evenings. This connection to the outdoors is what makes every visit feel refreshing and different from daily life — a setting that encourages calm, reflection, and comfort."
        image={background1}
        imageAlt="Natural surroundings at Agroterra"
        reverse
        bgClass={bgAlt}
      />

      <Section
        title="Golf at Agroterra"
        badge="Recreation"
        body={
          <>
            Set within a peaceful natural landscape, the golf experience at Agroterra Resort is designed to be both relaxing and engaging. The course stretches across a wide portion of land, surrounded by trees and open skies that create a calm and refreshing environment. Every hole offers a blend of space, scenery, and thoughtful design, making each round feel enjoyable and unhurried.
            <br /><br />
            Whether you are an experienced golfer or new to the game, the course provides a welcoming setting where you can focus, improve, and enjoy time outdoors. From smooth greens to open fairways, the course balances recreation with the peaceful atmosphere that defines Agroterra Resort.
          </>
        }
        image={background7}
        imageAlt="Golf course at Agroterra"
        bgClass={bg}
      />

      <Section
        title="Kitchen at Agroterra"
        badge="Dining"
        body="Step into the lively heart of Agroterra — the kitchen, where flavours dance and good vibes flow endlessly! As the ultimate relaxation spot in the compound, it's buzzing with energy, offering a perfect blend of chill-out zones and fun relaxation sports like pool or darts. Open for 16 to 18 hours a day, our culinary team whips up mouthwatering meals from dawn till dusk using fresh, local ingredients that turn every bite into a celebration of taste and togetherness."
        image={background3}
        imageAlt="Kitchen at Agroterra Resort"
        reverse
        bgClass={bgAlt}
      />

      <Section
        title="SheedXfm at Agroterra"
        badge="Media"
        body="Located at Agroterra Resort, SheedXfm is a radio station that serves not only guests of the resort but also citizens across the country. It broadcasts local updates, resort events, cultural content, and international news, showcasing Yewa cultural pride through Nigeria's vibrant voice. Focusing on culture, groove, and gist, it offers a unique blend of information and entertainment. SheedXfm is currently awaiting full approval from the Federal Government of Nigeria."
        image={background4}
        imageAlt="SheedXfm at Agroterra"
        bgClass={bg}
      />

      <Section
        title="Sport Academy at Agroterra"
        badge="Academy"
        body="Agroterra Sport Academy offers youth sports training programs for boys and girls aged 3–15, focusing on professional athlete development, skill-building, and fitness transformation. With a mission to transform athletes into champions through world-class training and professional coaching, the academy features an elite performance gym, championship sports arena, athletic track, and natural training fields — encompassing soccer, basketball, tennis, athletics, and swimming."
        image={background6}
        imageAlt="Sport Academy at Agroterra"
        reverse
        bgClass={bgAlt}
      />

      <Section
        title="Security at Agroterra"
        badge="Safety"
        body={
          <>
            Kick back and enjoy every second — we've got your safety on lock! Agroterra is seriously guarded with a{' '}
            <strong className={`font-semibold ${textHead}`}>
              heavy, round-the-clock presence of Ogun State So-Safe Corps officers
            </strong>{' '}
            patrolling the entire property. These are not just any officers — they're some of the sharpest, most dedicated security professionals in the state. Combined with CCTV coverage, controlled access points, and rapid-response teams, you can play golf at midnight or stroll the grounds at 3 AM, knowing nothing can disturb your peace.
          </>
        }
        image={securityImage}
        imageAlt="Security at Agroterra"
        bgClass={bg}
      />

      {/* ====================== CLOSING PARALLAX ====================== */}
      <div className={`animate-section relative flex items-center justify-center overflow-hidden min-h-112 sm:min-h-144 border-t ${divider}`}>
        <Image
          src={background8}
          alt="Aerial view of Agroterra Resort"
          fill
          className="animate-image object-cover"
        />
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
        <div className="relative z-10 flex flex-col gap-4 text-white items-center text-center px-6 sm:px-10 md:px-20 py-20">
          <div className="w-12 h-px bg-[#8bc34a] mb-2" />
          <h2 className="cormorant-garamond-medium-italic text-[28px] sm:text-[34px] md:text-[40px] leading-snug max-w-2xl">
            Where Nature Meets Relaxation
          </h2>
          <p className="cormorant-garamond-light-italic text-[17px] sm:text-[19px] md:text-[21px] max-w-xl text-white/80">
            Agroterra Resort is designed to bring you closer to nature, offering peaceful spaces, open landscapes, and a calm environment where every moment feels refreshing and unhurried.
          </p>
          <div className="w-12 h-px bg-[#8bc34a] mt-2" />
        </div>
      </div>

      {/* ====================== FOOTER ====================== */}
      <footer className={`${bgAlt} border-t ${divider} py-8 px-6 sm:px-10 md:px-20 flex flex-col sm:flex-row items-center justify-between gap-4`}>
        <p className={`cormorant-garamond-light-italic text-sm ${textBody}`}>
          © {new Date().getFullYear()} Agroterra Resort. All rights reserved.
        </p>
        <p className={`text-xs tracking-widest uppercase ${accent} opacity-70`}>
          Nature · Comfort · Experience
        </p>
      </footer>

    </div>
  );
}