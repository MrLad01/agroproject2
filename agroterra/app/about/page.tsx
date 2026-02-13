'use client'

import Image from "next/image";
import Link from "next/link";
import { FaConciergeBell } from "react-icons/fa";
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import background1 from '@/public/relaxation3.png'
import background2 from '@/public/IMG_20241010_175833.jpg'
import background3 from '@/public/kitchen.png'
import background4 from '@/public/radio.jpg'
import background5 from '@/public/relaxation2.png'
import background6 from '@/public/dorm6.png'
import background7 from '@/public/golf3.png'
import background8 from '@/public/top-view.png'
import securityImage from '@/public/security.png'
import aboutImage from '@/public/house2.png'
import aboutImage2 from '@/public/house3.png'
import logo from '@/public/ASA logo.jpg'
import { DotButton, ScrollingDots, useDotButton } from "@/components/Embla/EmblaCarouselDotButton";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useState } from 'react';
import Navbar from "@/components/Navbar";

// export function EmblaCarousel() {
//   const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()])
//   const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

//   const images = [background1, background2, background3, background4, background5]

//   return (
//     <section className="embla">
//       <div className="embla__viewport" ref={emblaRef}>
//         <div className="embla__container h-[95.8vh]">
//           <div className="embla__slide relative">
//             <Image src={background1} alt="House background image" fill loading="eager" />
//           </div>
//           <div className="embla__slide relative">
//             <Image src={background2} alt="Golf Course background image" fill loading="lazy" />
//           </div>
//           <div className="embla__slide relative">
//             <Image src={background3} alt="Kitchen background image 3" fill loading="lazy" />
//           </div>
//           <div className="embla__slide relative">
//             <Image src={background4} alt="Radio background image" fill loading="lazy" />
//           </div>
//           <div className="embla__slide relative">
//             <Image src={background5} alt="Recreation background image" fill loading="lazy" />
//           </div>
//         </div>
//         <div className="embla__controls">
//           <div className="embla__dots">
//             {images.length <= 3 ? scrollSnaps.map((_, index) => (
//               <DotButton
//                 key={index}
//                 onClick={() => onDotButtonClick(index)}
//                 image={images[index]}
//                 isSelected={index === selectedIndex}
//               />
//             )) :
//               <ScrollingDots
//                 images={images}
//                 selectedIndex={selectedIndex}
//                 onDotButtonClick={onDotButtonClick}
//               />
//             }
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }



export default function page() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero text animation on load
    gsap.fromTo(".hero-text",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.8, ease: "power4.out", stagger: 0.3 }
    );

    // Nav animation on load
    gsap.fromTo("nav",
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, ease: "power4.out" }
    );

    // Animate sections on scroll.
    // Using fromTo + immediateRender:false prevents GSAP from applying
    // opacity:0 before the ScrollTrigger fires — which was causing sections
    // already visible in the viewport to stay invisible.
    const sections = gsap.utils.toArray<HTMLElement>(".animate-section");
    sections.forEach((section) => {
      const textElements = section.querySelectorAll<HTMLElement>('h2, p, span');
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

  return (
    <div className="pb-16 sm:pb-10">
      <div className=" font-sans">
        <main className=" w-full">

          {/* ====================== HERO ====================== */}
          <div className="relative w-full h-svh">
            <div className="relative w-full h-full">
              <Image
                src={aboutImage2}
                alt="Background image"
                className="w-screen h-svh object-cover"
                priority
              />
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-[#00000075] flex flex-col px-4 sm:px-8 md:px-12 py-4 sm:py-6 z-10">

              {/* ─── Navbar ─── */}
              <Navbar />

              {/* ─── Hero Text ─── */}
              <div className="flex-1 flex flex-col text-white items-center justify-center leading-relaxed px-4">
                <div className="flex flex-col justify-center items-center -mt-16 sm:-mt-20 md:-mt-26 px-4">
                  <h2 className="text-center eb-garamond-semibold text-[36px] sm:text-[44px] md:text-[52px] welcome-text hero-text">
                    AGROTERRA
                  </h2>
                  <p className="eb-garamond-italic text-[18px] sm:text-[22px] md:text-[28px] max-w-[90vw] sm:max-w-140 md:max-w-140 text-center hero-text">
                    Where nature, comfort, and experience meet.
                  </p>
                </div>
              </div>

            </div>
            
          </div>
        </main>
      </div>

      {/* ====================== ABOUT SECTION ====================== */}
      <div className="flex flex-col lg:flex-row px-6 sm:px-10 md:px-20 lg:px-40 pb-12 sm:pb-16 md:pb-20 pt-8 gap-10 lg:gap-20 items-center justify-center animate-section bg-white">
        <div className="flex flex-col gap-3 max-w-xl lg:max-w-none">
          <h2 className="cormorant-garamond-medium-italic text-3xl sm:text-4xl text-zinc-800">About Agroterra Resort</h2>
          <p className="cormorant-garamond-light-italic text-[16px] sm:text-[17px] md:text-[18px] text-zinc-700">
            Agroterra Resort is a peaceful destination designed to bring people closer to nature while offering comfort and relaxation. Surrounded by open landscapes and natural beauty, the resort provides a calm escape from busy everyday life. Every space is created to feel at home—welcoming, spacious, and refreshing, allowing guests to slow down, breathe deeply, and enjoy meaningful moments. From leisure experiences to quiet retreats, Agroterra combines nature, comfort, and thoughtful design to create a stay that feels both restful and memorable.
          </p>
        </div>
        <Image
          src={aboutImage}
          alt="About Agroterra Resort"
          className="w-full sm:w-[85%] md:w-[75%] lg:w-160 h-64 sm:h-80 md:h-96 lg:h-100 object-cover animate-image"
        />
      </div>

      {/* ====================== RELAXATION SECTION ====================== */}
      <div className="flex flex-col-reverse lg:flex-row px-6 sm:px-10 md:px-20 lg:px-30 py-12 sm:py-16 md:py-24 gap-10 lg:gap-20 items-center justify-between bg-zinc-100 animate-section">
        <Image
          src={background1}
          alt="About Agroterra Resort"
          className="w-full sm:w-[85%] md:w-[75%] lg:w-160 h-64 sm:h-80 md:h-88 lg:h-90 object-cover animate-image"
        />
        <div className="flex flex-col gap-3 max-w-xl lg:max-w-none">
          <h2 className="cormorant-garamond-medium-italic text-3xl sm:text-4xl text-zinc-800">Surrounded by Natural Beauty</h2>
          <p className="cormorant-garamond-light-italic text-[16px] sm:text-[17px] md:text-[18px] text-zinc-700">
            Nature is at the heart of the Agroterra experience. The resort is embraced by trees, open skies, and fresh air that create a peaceful and grounding atmosphere. The natural setting adds beauty to every moment, from morning walks to quiet evenings. This connection to the outdoors is what makes every visit feel refreshing and different from daily life. It is a setting that encourages calm, reflection, and comfort.
          </p>
        </div>
      </div>

      {/* ====================== GOLF SECTION ====================== */}
      <div className="flex flex-col lg:flex-row px-6 sm:px-10 md:px-20 lg:px-40 py-12 sm:py-16 md:py-24 gap-10 lg:gap-20 items-center justify-between animate-section bg-white">
        <div className="flex flex-col gap-3 max-w-xl lg:max-w-none">
          <h2 className="cormorant-garamond-medium-italic text-3xl sm:text-4xl text-zinc-800">Golf at Agroterra</h2>
          <p className="cormorant-garamond-light-italic text-[16px] sm:text-[17px] md:text-[18px] text-zinc-700">
            Set within a peaceful natural landscape, the golf experience at Agroterra Resort is designed to be both relaxing and engaging. The course stretches across a wide portion of land, surrounded by trees and open skies that create a calm and refreshing environment. Every hole offers a blend of space, scenery, and thoughtful design, making each round feel enjoyable and unhurried.<br />
            Whether you are an experienced golfer or new to the game, the course provides a welcoming setting where you can focus, improve, and enjoy time outdoors. The natural surroundings reduce distractions and create a sense of privacy, turning each round into a quiet escape. From smooth greens to open fairways, the course balances recreation with the peaceful atmosphere that defines Agroterra Resort.
          </p>
        </div>
        <Image
          src={background7}
          alt="Golf at Agroterra Resort"
          className="w-full sm:w-[85%] md:w-[75%] lg:w-160 h-64 sm:h-80 md:h-96 lg:h-100 object-cover animate-image"
        />
      </div>

      {/* ====================== KITCHEN SECTION ====================== */}
      <div className="flex flex-col-reverse lg:flex-row px-6 sm:px-10 md:px-20 lg:px-40 py-12 sm:py-16 md:py-24 gap-10 lg:gap-20 items-center justify-between bg-zinc-100 animate-section">
        <Image
          src={background3}
          alt="Kitchen at Agroterra Resort"
          className="w-full sm:w-[85%] md:w-[75%] lg:w-140 h-64 sm:h-80 md:h-88 lg:h-90 object-cover animate-image"
        />
        <div className="flex flex-col gap-3 max-w-xl lg:max-w-none">
          <h2 className="cormorant-garamond-medium-italic text-3xl sm:text-4xl text-zinc-800">Kitchen at Agroterra</h2>
          <p className="cormorant-garamond-light-italic text-[16px] sm:text-[17px] md:text-[18px] text-zinc-700">
            Step into the lively heart of Agroterra—the kitchen, where flavors dance and good vibes flow endlessly! As the ultimate relaxation spot in the compound, it's buzzing with energy, offering a perfect blend of chill-out zones and fun relaxation sports like pool or darts to keep the fun going. Open for a whopping 16 to 18 hours a day, our culinary wizards whip up mouthwatering meals from dawn till dusk, using fresh, local ingredients that turn every bite into a celebration of taste and togetherness. Whether you're craving a hearty breakfast, a leisurely lunch, or a late-night snack, the kitchen is your go-to haven for delicious eats and unforgettable moments.
          </p>
        </div>
      </div>

      {/* ====================== SHEEDXFM SECTION ====================== */}
      <div className="flex flex-col lg:flex-row px-6 sm:px-10 md:px-20 lg:px-30 py-12 sm:py-16 md:py-24 gap-10 lg:gap-20 items-center justify-between animate-section bg-white">
        <div className="flex flex-col gap-3 max-w-xl lg:max-w-none">
          <h2 className="cormorant-garamond-medium-italic text-3xl sm:text-4xl text-zinc-800">SheedXfm at Agroterra</h2>
          <p className="cormorant-garamond-light-italic text-[16px] sm:text-[17px] md:text-[18px] text-zinc-700">
            Located at Agroterra Resort, SheedXfm is a radio station that serves not only the guests of the resort but also citizens across the country. It broadcasts local updates, resort events, cultural content, and international news, showcasing Yewa cultural pride through Nigeria's vibe. Focusing on culture, groove, and gist, it offers a unique blend of information and entertainment. Equipped with modern studios and accessible listening options, SheedXfm keeps listeners informed and connected, whether on-site or nationwide. SheedXfm is currently awaiting full approval from the Federal Government of Nigeria.
          </p>
        </div>
        <Image
          src={background4}
          alt="SheedXfm at Agroterra Resort"
          className="w-full sm:w-[85%] md:w-[75%] lg:w-140 h-64 sm:h-80 md:h-88 lg:h-90 object-cover animate-image"
        />
      </div>

      {/* ====================== SPORT ACADEMY SECTION ====================== */}
      <div className="flex flex-col-reverse lg:flex-row px-6 sm:px-10 md:px-20 lg:px-40 py-12 sm:py-16 md:py-24 gap-10 lg:gap-20 items-center justify-between bg-zinc-100 animate-section">
        <Image
          src={background6}
          alt="Sport Academy at Agroterra Resort"
          className="w-full sm:w-[85%] md:w-[75%] lg:w-140 h-64 sm:h-80 md:h-88 lg:h-90 object-cover animate-image"
        />
        <div className="flex flex-col gap-3 max-w-xl lg:max-w-none">
          <h2 className="cormorant-garamond-medium-italic text-3xl sm:text-4xl text-zinc-800">Sport Academy at Agroterra</h2>
          <p className="cormorant-garamond-light-italic text-[16px] sm:text-[17px] md:text-[18px] text-zinc-700">
            Agroterra Sport Academy offers youth sports training programs for boys and girls aged 3–15, focusing on professional athlete development, skill-building, and fitness transformation. With a mission to transform athletes into champions through world-class training, professional coaching, and inclusive environments, the academy features state-of-the-art facilities including an elite performance gym, championship sports arena, athletic track, and natural training fields. Programs range from elite performance academies and youth development to specialized camps in sports like soccer, basketball, tennis, athletics, and swimming, emphasizing safety, character building, and sports science.
          </p>
        </div>
      </div>

      {/* ====================== SECURITY SECTION ====================== */}
      <div className="flex flex-col lg:flex-row px-6 sm:px-10 md:px-20 lg:px-40 py-12 sm:py-16 md:py-24 gap-10 lg:gap-20 items-center justify-between animate-section bg-white">
        <div className="flex flex-col gap-3 max-w-xl lg:max-w-none">
          <h2 className="cormorant-garamond-medium-italic text-3xl sm:text-4xl text-zinc-800">Security at Agroterra</h2>
          <p className="cormorant-garamond-light-italic text-[16px] sm:text-[17px] md:text-[18px] text-zinc-700">
            Kick back and enjoy every second — we've got your safety on lock! Agroterra is seriously guarded with a <span className="font-semibold text-zinc-900">heavy, round-the-clock presence of Ogun State So-Safe Corps officers</span> patrolling the entire property. These are not just any officers — they're some of the sharpest, most dedicated security professionals in the state, trained to keep everything calm, safe, and under control. Combined with CCTV coverage, controlled access points, and rapid-response teams, you can play golf at midnight, dance in the kitchen at 3 AM, or stroll the grounds whenever you feel like it… knowing nothing can disturb your peace. At Agroterra, true relaxation starts with unbreakable security.
          </p>
        </div>
        <Image
          src={securityImage}
          alt="Security at Agroterra Resort"
          className="w-full sm:w-[85%] md:w-[75%] lg:w-140 h-64 sm:h-80 md:h-88 lg:h-90 rounded-lg object-cover animate-image"
        />
      </div>

      {/* ====================== EXTRA / CLOSING SECTION ====================== */}
      <div className="relative flex items-center justify-center bg-zinc-100 animate-section overflow-hidden min-h-100 sm:min-h-120 md:min-h-130">
        <Image
          src={background8}
          alt="Aerial view of Agroterra Resort"
          fill
          className="object-cover animate-image"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#00000055]" />

        {/* Text centred over image */}
        <div className="relative z-10 flex flex-col gap-3 text-white items-center text-center px-6 sm:px-10 md:px-20 py-16 sm:py-20 md:py-24">
          <h2 className="cormorant-garamond-medium-italic text-[26px] sm:text-[30px] md:text-[34px]">
            Where Nature Meets Relaxation
          </h2>
          <p className="cormorant-garamond-light-italic text-[16px] sm:text-[18px] md:text-[20px] max-w-[90vw] sm:max-w-lg md:max-w-140">
            Agroterra Resort is designed to bring you closer to nature, offering peaceful spaces, open landscapes, and a calm environment where every moment feels refreshing and unhurried.
          </p>
        </div>
      </div>
    </div>
  )
}