import { notFound } from 'next/navigation'
import Image from 'next/image'
import { blogPosts } from '@/data/blogData'
import Navbar from '@/components/Navbar'
import { EmblaCarousel } from '@/app/page'
import Link from 'next/link'

type Props = {
  params: Promise<{ slug: string }>
}

// Generates all static paths at build time
export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) notFound()

  return (
    <div className="pb-10 bg-white">
      <div className="font-sans">
        <main className="w-full">

          {/* ── Hero: carousel + overlay ── */}
          <div className="relative w-full h-svh">

            {/* Carousel fills the hero — same as home page */}
            <EmblaCarousel />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-[#00000075] flex flex-col px-4 sm:px-8 md:px-12 py-4 sm:py-6 z-10">

              {/* Navbar */}
              <Navbar />

              {/* Hero text — shows the selected blog title */}
              <div className="flex-1 flex flex-col text-white items-center justify-center leading-relaxed px-4">
                <div className="flex flex-col justify-center items-center -mt-10 sm:-mt-14 md:-mt-16 text-center">
                  <h2 className="eb-garamond-semibold welcome-text
                    text-[28px] sm:text-[40px] md:text-[50px] lg:text-[58px]
                    max-w-[95vw] sm:max-w-[80vw] md:max-w-3xl">
                      AGROTERRA BLOG
                  </h2>
                  <p className="eb-garamond-italic
                    text-[17px] sm:text-[24px] md:text-[28px] lg:text-[32px]
                    max-w-[90vw] sm:max-w-150 md:max-w-140 mt-2">
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

        {/* Small hero image — the selected blog image */}
        <div className="flex justify-center mb-6">
          <div className="w-64 h-40 sm:w-96 sm:h-56 relative rounded-md overflow-hidden">
            <Image
              src={post.src}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Article card */}
        <div className="rounded-sm p-6 sm:p-8">

          {/* Article title */}
          <h1 className="eb-garamond-semibold text-[22px] sm:text-[26px] font-bold mb-4 text-gray-900">
            {post.title}
          </h1>

          {/* Article body — same for all posts for now */}
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
        <div className="mt-10 px-6 sm:px-8">
          <p className="text-[15px] sm:text-[24px] font-semibold text-gray-800 eb-garamond-semibold text-center mb-12">
            Other Related Searches
          </p>

          {/* 3 related posts — exclude current, take first 3 */}
          <div className="flex flex-col gap-16">
            {blogPosts
              .filter((p) => p.slug !== slug)
              .slice(0, 3)
              .map((related, index) => (
                <div
                  key={related.slug}
                  className={`flex flex-col sm:flex-row items-center gap-8 sm:gap-12 ${
                    index % 2 !== 0 ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Image */}
                  <div className="w-full sm:w-96 h-60 relative rounded-md overflow-hidden shrink-0">
                    <Image
                      src={related.src}
                      alt={related.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Text */}
                  <Link href={`/blog/${related.slug}`}>
                  <div className="flex-1 text-center px-2 sm:px-4">
                    <h3 className="eb-garamond-semibold text-[18px] sm:text-[20px] font-semibold text-gray-900 mb-3">
                      {related.title}
                    </h3>
                    <p className="text-[13px] sm:text-[14px] text-gray-700 leading-relaxed">
                      {related.excerpt}
                    </p>
                  </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>

      </div>
    </div>
  )
}