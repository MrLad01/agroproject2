import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { blogPosts } from '@/data/blogData'
import Navbar from '@/components/Navbar'

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) notFound()

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3)

  return (
    <div className="min-h-screen bg-[#FAF8F4]">

      {/* ── Hero ── */}
      <div className="relative w-full h-[55vh] min-h-[340px] overflow-hidden">
        <Image
          src={post.src}
          alt={post.title}
          fill
          className="object-cover scale-105"
          priority
        />
        {/* Gradient overlay — dark at bottom for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/75" />

        {/* Navbar sits at top */}
        <div className="absolute inset-x-0 top-0 z-20 px-6 sm:px-10 md:px-16 py-5">
          <Navbar />
        </div>

        {/* Hero text anchored to bottom */}
        <div className="absolute inset-x-0 bottom-0 z-10 px-6 sm:px-10 md:px-20 lg:px-32 pb-10 sm:pb-14">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-4">
            <Link
              href="/blog"
              className="text-white/60 hover:text-white text-[11px] tracking-[0.15em] uppercase transition-colors font-light"
            >
              Blog
            </Link>
            <span className="text-white/30 text-[10px]">—</span>
            <span className="text-white/60 text-[11px] tracking-[0.15em] uppercase font-light">
              Agroterra
            </span>
          </div>

          <h1 className="eb-garamond-semibold text-white text-[30px] sm:text-[42px] md:text-[52px] leading-[1.1] max-w-3xl">
            {post.title}
          </h1>

          {/* Thin accent line under title */}
          <div className="mt-5 w-12 h-[1.5px] bg-[#C9A84C]" />
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24">

        {/* Pull-quote / intro card */}
        <div className="relative -mt-10 sm:-mt-14 z-20 bg-white border border-[#E8E2D6] shadow-sm rounded-sm px-8 sm:px-14 py-8 sm:py-10 max-w-2xl">
          <p className="eb-garamond-semibold text-[#2C2410] text-[18px] sm:text-[21px] leading-relaxed italic">
            {post.excerpt ?? 'A space where relaxation, nature, and sport come together in harmony.'}
          </p>
        </div>

        {/* Two-column layout */}
        <div className="mt-16 sm:mt-20 flex flex-col lg:flex-row gap-16 lg:gap-24 pb-24">

          {/* Article body */}
          <article className="flex-1 min-w-0">

            {/* Decorative drop-cap first letter via CSS */}
            <div
              className="text-[14px] sm:text-[15.5px] text-[#3A3020] leading-[1.9] space-y-6"
              style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
            >
              {/* First paragraph gets a drop-cap treatment via a wrapper */}
              <p className="first-para">
                <span
                  className="eb-garamond-semibold float-left text-[#2C2410] text-[72px] leading-[0.8] mr-3 mt-1"
                >
                  T
                </span>
                ucked within the peaceful surroundings of Agroterra Resort, the Agroterra Golf Course offers more than just a place to play. It is a space where relaxation, nature, and sport come together to create a refreshing experience for beginners, enthusiasts, and seasoned golfers alike. Surrounded by lush greenery and open landscapes, the course provides a calm environment that allows players to focus on their game while enjoying the beauty of nature.
              </p>

              <p>
                The Agroterra Golf Course is thoughtfully designed to blend naturally with its environment. Wide fairways, well-maintained greens, and scenic views create a playing experience that is both enjoyable and visually rewarding. Tall trees line sections of the course, offering shade and a gentle breeze, while the open areas provide plenty of space for confident swings and strategic play.
              </p>

              {/* Inline pull-quote */}
              <blockquote className="border-l-[3px] border-[#C9A84C] pl-6 sm:pl-8 py-1 my-8">
                <p
                  className="eb-garamond-semibold text-[#2C2410] text-[20px] sm:text-[24px] leading-snug italic"
                >
                  "Every moment on the course feels relaxed and unhurried."
                </p>
              </blockquote>

              <p>
                One of the most appealing features of the course is its welcoming atmosphere. Guests of all skill levels can enjoy the facility without feeling intimidated. Beginners can take their time learning the basics, while experienced players can challenge themselves and refine their techniques. The peaceful surroundings make it an ideal place for practice, casual games with friends, or even friendly competitions.
              </p>

              {/* Inline image break */}
              <div className="my-10 w-full aspect-[16/9] relative rounded-sm overflow-hidden">
                <Image
                  src={post.src}
                  alt="Agroterra Golf Course"
                  fill
                  className="object-cover"
                />
                <p className="absolute bottom-0 inset-x-0 bg-black/40 text-white/80 text-[11px] px-4 py-2 tracking-wide">
                  The course at golden hour — a serene retreat from everyday life.
                </p>
              </div>

              <p>
                Beyond the game itself, the golf course offers a perfect escape from the noise and stress of everyday life. The quiet environment, fresh air, and natural scenery create a sense of calm that enhances both focus and enjoyment. Early mornings on the course are especially refreshing, with cool air and soft sunlight setting the tone for a great day.
              </p>

              <p>
                The Agroterra Golf Course is also a great choice for social and recreational activities. Families, friends, and corporate groups often use the space to relax, bond, and enjoy quality time together. It serves as a unique setting for team-building sessions, casual meetups, and weekend outings. The relaxed pace of the game encourages conversation, connection, and shared experiences.
              </p>

              <p>
                Guests staying at Agroterra Resort enjoy convenient access to the golf course as part of their leisure options. After a game, players can return to the comfort of their rooms, enjoy a meal at the resort, or explore other amenities available on the property. This seamless combination of recreation and relaxation makes the experience even more enjoyable.
              </p>

              <p>
                Maintaining the quality of the course is a top priority at Agroterra. The greens and fairways are carefully cared for to ensure smooth play and a consistent experience throughout the year. Attention to detail in landscaping and upkeep helps preserve the natural beauty of the environment while providing excellent playing conditions.
              </p>

              <p>
                Whether you are planning a weekend getaway, a family vacation, or a quiet retreat, a visit to the Agroterra Golf Course adds a special touch to your stay. Come for the game, stay for the scenery, and leave feeling refreshed, relaxed, and ready to return again.
              </p>
            </div>

            {/* Tags / categories */}
            <div className="mt-12 pt-8 border-t border-[#E0D9CE] flex flex-wrap gap-2">
              {['Leisure', 'Golf', 'Nature', 'Resort Life'].map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] tracking-[0.12em] uppercase text-[#8A7A5C] border border-[#D4C9AF] px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>

          {/* ── Sidebar ── */}
          <aside className="w-full lg:w-[280px] shrink-0 space-y-10">

            {/* Sticky wrapper */}
            <div className="lg:sticky lg:top-10 space-y-10">

              {/* Section header */}
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#8A7A5C] mb-4">
                  You Might Also Like
                </p>
                <div className="h-[1px] bg-[#DDD5C3]" />
              </div>

              {/* Related posts */}
              <div className="space-y-0 divide-y divide-[#E8E2D6]">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="group flex items-start gap-4 py-5 transition-opacity hover:opacity-80"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-[52px] relative shrink-0 overflow-hidden rounded-sm">
                      <Image
                        src={rel.src}
                        alt={rel.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <h3 className="eb-garamond-semibold text-[#2C2410] text-[15px] leading-tight mb-1 group-hover:text-[#8A5A1A] transition-colors line-clamp-2">
                        {rel.title}
                      </h3>
                      <p className="text-[12px] text-[#8A7A5C] line-clamp-2 leading-relaxed">
                        {rel.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* CTA box */}
              <div className="bg-[#2C2410] text-white p-6 rounded-sm">
                <p className="text-[10px] tracking-[0.18em] uppercase text-[#C9A84C] mb-3">
                  Plan Your Visit
                </p>
                <p className="eb-garamond-semibold text-[18px] leading-snug mb-5">
                  Experience the course for yourself
                </p>
                <Link
                  href="/contact"
                  className="inline-block text-[11px] tracking-[0.15em] uppercase text-[#2C2410] bg-[#C9A84C] hover:bg-[#D4B860] px-5 py-3 transition-colors"
                >
                  Book a Tee Time
                </Link>
              </div>

            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}