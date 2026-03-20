'use client'

import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import background1 from '@/public/house1.png'
import background2 from '@/public/IMG_20241010_175833.jpg'
import background3 from '@/public/kitchen.png'
import background4 from '@/public/IMG_20240627_163644.jpg'
import background5 from '@/public/relaxation2.png'
import { DotButton, ScrollingDots, useDotButton } from '@/components/Embla/EmblaCarouselDotButton'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import golf from "@/public/golf carousel.svg"

export function EmblaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

  const images = [background1, background2, background3, background4, background5]

  return (
    <section className="embla w-full h-full">
      <div className="embla__viewport h-full" ref={emblaRef}>
        <div className="embla__container h-full">

          <div className="embla__slide relative h-full">
            <Image src={background1} alt="House background image" fill className="object-cover" loading="eager" />
          </div>

          <div className="embla__slide relative h-full">
            <Image src={background2} alt="Golf Course background image" fill className="object-cover" loading="lazy" />
          </div>

          <div className="embla__slide relative h-full">
            <Image src={background3} alt="Kitchen background image" fill className="object-cover" loading="lazy" />
          </div>

          <div className="embla__slide relative h-full">
            <Image src={background4} alt="Football background image" fill className="object-cover" loading="lazy" />
          </div>

          <div className="embla__slide relative h-full">
            <Image src={background5} alt="Recreation background image" fill className="object-cover" loading="lazy" />
          </div>

        </div>

        <div className="embla__controls">
          <div className="embla__dots">
            {images.length <= 3
              ? scrollSnaps.map((_, index) => (
                <DotButton
                  key={index}
                  onClick={() => onDotButtonClick(index)}
                  image={images[index]}
                  isSelected={index === selectedIndex}
                />
              ))
              : <ScrollingDots
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

const page = () => {
  return (
    <div className="pb-10 bg-white">
          <div className="font-sans">
            <main className="w-full">
    
              {/* ── Hero: carousel + overlay in a single positioned container ── */}
              <div className="relative w-full h-svh">
    
                {/* Carousel fills the container */}
                <EmblaCarousel />
    
                {/* Dark overlay — covers carousel, sits above it */}
                <div className="absolute inset-0 bg-[#00000075] flex flex-col px-4 sm:px-8 md:px-12 py-4 sm:py-6 z-10">
    
                  {/* Navbar */}
                  <Navbar />
    
                  {/* Hero text */}
                  <div className="flex-1 flex flex-col text-white items-center justify-center leading-relaxed px-4">
                    <div className="flex flex-col justify-center items-center -mt-10 sm:-mt-14 md:-mt-16 text-center">
                      <h2 className="eb-garamond-semibold welcome-text
                        text-[32px] sm:text-[46px] md:text-[56px] lg:text-[62px]
                        max-w-[95vw] sm:max-w-[80vw] md:max-w-none">
                        AGROTERRA BLOG
                      </h2>
                      <p className="eb-garamond-italic
                        text-[17px] sm:text-[24px] md:text-[28px] lg:text-[32px]
                        max-w-[90vw] sm:max-w-150 md:max-w-140">
                        &ldquo;A place that celebrates life.&rdquo;
                      </p>
                    </div>
                  </div>
    
                </div>
              </div>
    
            </main>
          </div>

          {/* ── Blog Article Section ── */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10">

            {/* Small hero image */}
            <div className="flex justify-center mb-6">
              <div className="w-72 h-48 sm:w-80 sm:h-48 relative rounded-md overflow-hidden">
                <Image
                  src={background2}
                  alt="Agroterra Golf Course"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Article card with border */}
            <div className=" p-6 sm:p-8">

              {/* Article title */}
              <h1 className="eb-garamond-semibold text-[22px] sm:text-[26px] font-bold mb-4 text-gray-900">
                Agroterra Golf Course: Where Nature Meets the Perfect Game
              </h1>

              {/* Article body */}
              <div className="text-[13px] sm:text-[14px] text-gray-700 leading-relaxed space-y-4">
                <p>
                  Tucked within the peaceful surroundings of Agro terra Resort, the Agro terra Golf Course offers more than just a place to play. It is a space where relaxation, nature, and sport come together to create a refreshing experience for beginners, enthusiasts, and seasoned golfers alike. Surrounded by lush greenery and open landscapes, the course provides a calm environment that allows players to focus on their game while enjoying the beauty of nature.
                </p>
                <p>
                  The Agro terra Golf Course is thoughtfully designed to blend naturally with its environment. Wide fairways, well-maintained greens, and scenic views create a playing experience that is both enjoyable and visually rewarding. Tall trees line sections of the course, offering shade and a gentle breeze, while the open areas provide plenty of space for confident swings and strategic play. Whether you are practicing your short game or enjoying a full round, every moment on the course feels relaxed and unhurried.
                </p>
                <p>
                  One of the most appealing features of the course is its welcoming atmosphere. Guests of all skill levels can enjoy the facility without feeling intimidated. Beginners can take their time learning the basics, while experienced players can challenge themselves and refine their techniques. The peaceful surroundings make it an ideal place for practice, casual games with friends, or even friendly competitions.
                </p>
                <p>
                  Beyond the game itself, the golf course offers a perfect escape from the noise and stress of everyday life. The quiet environment, fresh air, and natural scenery create a sense of calm that enhances both focus and enjoyment. Early mornings on the course are especially refreshing, with cool air and soft sunlight setting the tone for a great day. Even afternoon sessions remain comfortable thanks to the natural shade and open layout.
                </p>
                <p>
                  The Agro terra Golf Course is also a great choice for social and recreational activities. Families, friends, and corporate groups often use the space to relax, bond, and enjoy quality time together. It serves as a unique setting for team-building sessions, casual meetups, and weekend outings. The relaxed pace of the game encourages conversation, connection, and shared experiences.
                </p>
                <p>
                  Guests staying at Agro terra Resort enjoy convenient access to the golf course as part of their leisure options. After a game, players can return to the comfort of their rooms, enjoy a meal at the resort, or explore other amenities available on the property. This seamless combination of recreation and relaxation makes the experience even more enjoyable.
                </p>
                <p>
                  Maintaining the quality of the course is a top priority at Agro terra. The greens and fairways are carefully cared for to ensure smooth play and a consistent experience throughout the year. Attention to detail in landscaping and upkeep helps preserve the natural beauty of the environment while providing excellent playing conditions.
                </p>
                <p>
                  For those looking to improve their skills, the course also serves as a great practice environment. The calm setting allows players to focus on technique, build confidence, and develop their game at their own pace. Whether you are learning how to swing for the first time or working to lower your score, the environment supports steady improvement.
                </p>
                <p>
                  The Agro terra Golf Course is more than a sporting facility. It is a place where guests can slow down, reconnect with nature, and enjoy a healthy outdoor activity. The combination of scenic surroundings, accessible design, and relaxed atmosphere makes it one of the standout experiences within the resort.
                </p>
                <p>
                  Whether you are planning a weekend getaway, a family vacation, or a quiet retreat, a visit to the Agroterra Golf Course adds a special touch to your stay. Come for the game, stay for the scenery, and leave feeling refreshed, relaxed, and ready to return again.
                </p>
              </div>

              
            </div>

            {/* Other related searches */}
            <div className="mt-8 text-center">
              <p className="text-[15px] sm:text-[17px] font-semibold text-gray-800 eb-garamond-semibold">
                other related searches
              </p>
            </div>

          </div>
    </div>
  )
}

export default page