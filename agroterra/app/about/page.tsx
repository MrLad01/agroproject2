'use client'

import Image from "next/image";
import Link from "next/link";
import { FaConciergeBell } from "react-icons/fa";
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import background from '@/public/17.png'
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

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()])
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

  const images = [background1, background2, background3, background4, background5]

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container h-[95.8vh]">

          <div className="embla__slide relative">
            <Image src={background1} alt="House background image" fill loading="eager" />
          </div>

          <div className="embla__slide relative">
            <Image src={background2} alt="Golf Course background image" fill loading="lazy" />
          </div>
    
          <div className="embla__slide relative">
            <Image src={background3} alt="Kitchen background image 3" fill loading="lazy" />
          </div>
          
          <div className="embla__slide relative">
            <Image src={background4} alt="Radio background image" fill loading="lazy" />
          </div>

          <div className="embla__slide relative">
            <Image src={background5} alt="Recreation background image" fill loading="lazy" />
          </div>
          
        </div>
        <div className="embla__controls">
          <div className="embla__dots">
            {images.length <= 3 ? scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                image={images[index]}
                isSelected={index === selectedIndex}
              />
            )): 
            
            <ScrollingDots 
              images={images}
              selectedIndex={selectedIndex}
              onDotButtonClick={onDotButtonClick}
            />

            }
          </div>
        </div>
      </div>
    </section>
  )
}


export default function page() {
  return (
    <div className="pb-116">
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="flex flex-col min-h-screen w-full bg-white dark:bg-black sm:items-start">
          {/* Background Carousel */}
          <div className="w-full">
            {/* <EmblaCarousel /> */}
            <Image src={aboutImage2} alt="Background image" className="w-screen" />
            <div className="absolute top-8 w-full h-[93vh] bg-[#00000075] flex flex-col px-12 py-6">
              {/* Nav */}
              <nav className="flex items-center justify-between shadow-2xl">
                {/* Logo */}
                <div className="flex gap-2 items-center">
                  <Image src={logo} alt="Agroterra Logo" height={30}  />
                  <h3 className="uppercase eb-garamond-extrabold text-[17px] text-white">Agroterra</h3>
                </div>
                <div className="flex gap-12 items-center text-[14px] normal-font pt-0.5">
                  <Link href={`/`} className=" text-white">Home</Link>
                  <Link href={`/reservation`} className=" text-white">Reservation</Link>
                  <Link href={`/golf`} className=" text-white">Golf Course</Link>
                  <Link href={`/sport-academy`} className=" text-white">Sport Academy</Link>
                  <Link href={`/contact`} className=" text-white">Contact</Link>
                  <Link href={`/about`} className=" text-white">About Us</Link>
                </div>
                <button className="work-sans-bold text-[12px] text-[#111111] mr-10 uppercase px-6 py-2.5 bg-white rounded-4xl flex items-center gap-2">
                  <FaConciergeBell size={14} />
                  Book Now
                </button>
              </nav>
              <div className="h-full flex flex-col text-white items-center justify-center leading-relaxed">
                <div className="flex flex-col justify-center items-center -mt-26">
                  <h2 className="text-center eb-garamond-semibold text-[52px] welcome-text">AGROTERRA</h2>
                  <p className="eb-garamond-italic text-[28px] max-w-140 text-center">Where nature, comfort, and experience meet.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* <div className="overlay bg-white w-full z-50 top-200 absolute h-25"></div> */}

      {/* ====================== ABOUT SECTION ====================== */}
      <div className="flex px-40 pb-20 pt-8 gap-20 items-center justify-center">
        <div className="flex flex-col gap-3">
          <h2 className="cormorant-garamond-medium-italic text-4xl">About Agroterra Resort</h2>
          <p className="cormorant-garamond-light-italic text-[18px]">Agroterra Resort is a peaceful destination designed to bring people closer to nature while offering comfort and relaxation. Surrounded by open landscapes and natural beauty, the resort provides a calm escape from busy everyday life. Every space is created to feel at home<br />welcoming, spacious, and refreshing, allowing guests to slow down, breathe deeply, and enjoy meaningful moments. From leisure experiences to quiet retreats, Agroterra combines nature, comfort, and thoughtful design to create a stay that feels both restful and memorable.</p>
        </div>
        <Image src={aboutImage} alt="About Agroterra Resort" className="w-160 h-100" />
      </div>

      {/* ====================== RELAXATION SECTION ====================== */}
      <div className="flex px-30 py-24 gap-20 items-center justify-between bg-zinc-100">
        <Image src={background1} alt="About Agroterra Resort" className="w-160 h-90" />
        <div className="flex flex-col gap-3">
          <h2 className="cormorant-garamond-medium-italic text-4xl">Surrounded by Natural Beauty</h2>
          <p className="cormorant-garamond-light-italic text-[18px]">Nature is at the heart of the Agroterra experience. The resort is embraced by trees, open skies, and fresh air that create a peaceful and grounding atmosphere. The natural setting adds beauty to every moment, from morning walks to quiet evenings. This connection to the outdoors is what makes every visit feel refreshing and different from daily life. It is a setting that encourages calm, reflection, and comfort.</p>
        </div>
      </div>

      {/* ====================== GOLF SECTION ====================== */}
      <div className="flex px-40 py-24 gap-20 items-center justify-between">
        <div className="flex flex-col gap-3">
          <h2 className="cormorant-garamond-medium-italic text-4xl">Golf at Agroterra</h2>
          <p className="cormorant-garamond-light-italic text-[18px]">Set within a peaceful natural landscape, the golf experience at Agroterra Resort is designed to be both relaxing and engaging. The course stretches across a wide portion of land, surrounded by trees and open skies that create a calm and refreshing environment. Every hole offers a blend of space, scenery, and thoughtful design, making each round feel enjoyable and unhurried.<br />
          Whether you are an experienced golfer or new to the game, the course provides a welcoming setting where you can focus, improve, and enjoy time outdoors. The natural surroundings reduce distractions and create a sense of privacy, turning each round into a quiet escape. From smooth greens to open fairways, the course balances recreation with the peaceful atmosphere that defines Agroterra Resort.</p>
        </div>
        <Image src={background7} alt="Golf at Agroterra Resort" className="w-160 h-100" />
      </div>

      {/* ====================== KITCHEN SECTION ====================== */}
      <div className="flex px-40 py-24 gap-20 items-center justify-between bg-zinc-100">
        <Image src={background3} alt="Kitchen at Agroterra Resort" className="w-140 h-90" />
        <div className="flex flex-col gap-3">
          <h2 className="cormorant-garamond-medium-italic text-4xl">Kitchen at Agroterra</h2>
          <p className="cormorant-garamond-light-italic text-[18px]">Step into the lively heart of Agroterra—the kitchen, where flavors dance and good vibes flow endlessly! As the ultimate relaxation spot in the compound, it's buzzing with energy, offering a perfect blend of chill-out zones and fun relaxation sports like pool or darts to keep the fun going. Open for a whopping 16 to 18 hours a day, our culinary wizards whip up mouthwatering meals from dawn till dusk, using fresh, local ingredients that turn every bite into a celebration of taste and togetherness. Whether you're craving a hearty breakfast, a leisurely lunch, or a late-night snack, the kitchen is your go-to haven for delicious eats and unforgettable moments.</p>
        </div>
      </div>

      {/* ====================== SHEEDXFM SECTION ====================== */}
      <div className="flex px-30 py-24 gap-20 items-center justify-between">
        <div className="flex flex-col gap-3">
          <h2 className="cormorant-garamond-medium-italic text-4xl">SheedXfm at Agroterra</h2>
          <p className="cormorant-garamond-light-italic text-[18px]">Located at Agroterra Resort, SheedXfm is a radio station that serves not only the guests of the resort but also citizens across the country. It broadcasts local updates, resort events, cultural content, and international news, showcasing Yewa cultural pride through Nigeria's vibe. Focusing on culture, groove, and gist, it offers a unique blend of information and entertainment. Equipped with modern studios and accessible listening options, SheedXfm keeps listeners informed and connected, whether on-site or nationwide. SheedXfm is currently awaiting full approval from the Federal Government of Nigeria.</p>
        </div>
        <Image src={background4} alt="SheedXfm at Agroterra Resort" className="w-140 h-90" />
      </div>

      {/* ====================== SPORT ACADEMY SECTION ====================== */}
      <div className="flex px-40 py-24 gap-20 items-center justify-between bg-zinc-100">
        <Image src={background6} alt="Sport Academy at Agroterra Resort" className="w-140 h-90" />
        <div className="flex flex-col gap-3">
          <h2 className="cormorant-garamond-medium-italic text-4xl">Sport Academy at Agroterra</h2>
          <p className="cormorant-garamond-light-italic text-[18px]">Agroterra Sport Academy offers youth sports training programs for boys and girls aged 3-15, focusing on professional athlete development, skill-building, and fitness transformation. With a mission to transform athletes into champions through world-class training, professional coaching, and inclusive environments, the academy features state-of-the-art facilities including an elite performance gym, championship sports arena, athletic track, and natural training fields. Programs range from elite performance academies and youth development to specialized camps in sports like soccer, basketball, tennis, athletics, and swimming, emphasizing safety, character building, and sports science.</p>
        </div>
      </div>

      {/* ====================== SECURITY SECTION ====================== */}
      <div className="flex px-40 py-24 gap-20 items-center justify-between">
        <div className="flex flex-col gap-3">
          <h2 className="cormorant-garamond-medium-italic text-4xl">Security at Agroterra</h2>
          <p className="cormorant-garamond-light-italic text-[18px]">
            Kick back and enjoy every second — we’ve got your safety on lock! Agroterra is seriously guarded with a <span className="font-semibold">heavy, round-the-clock presence of Ogun State So-Safe Corps officers</span> patrolling the entire property. These are not just any officers — they’re some of the sharpest, most dedicated security professionals in the state, trained to keep everything calm, safe, and under control. Combined with CCTV coverage, controlled access points, and rapid-response teams, you can play golf at midnight, dance in the kitchen at 3 AM, or stroll the grounds whenever you feel like it… knowing nothing can disturb your peace. At Agroterra, true relaxation starts with unbreakable security.
          </p>
        </div>
        <Image src={securityImage} alt="Security at Agroterra Resort" className="w-140 h-90 rounded-lg object-cover" />
      </div>

      {/* ====================== EXTRA SECTION ====================== */}
      <div className="flex px-40 py-24 items-center relative justify-center bg-zinc-100 text-white">
        <div className="relative">
          <Image src={background8} alt="Sport Academy at Agroterra Resort" className="w-280 h-120" />
          <div className="absolute top-0 w-full h-full bg-[#00000045]"></div>
        </div>
        <div className="flex flex-col absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 gap-3">
          <h2 className="cormorant-garamond-medium-italic text-[34px]">Where Nature Meets Relaxation</h2>
          <p className="cormorant-garamond-light-italic text-[20px] max-w-140 ">Agroterra Resort is designed to bring you closer to nature, offering peaceful spaces, open landscapes, and a calm environment where every moment feels refreshing and unhurried.</p>
        </div>
      </div>
    </div>
  )
}