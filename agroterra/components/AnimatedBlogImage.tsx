'use client'

import { motion } from 'framer-motion'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

type Props = {
  src: StaticImageData
  title: string
  slug: string
  reverse?: boolean
}

const AnimatedBlogImage = ({ src, title, slug, reverse = false }: Props) => {
  return (
    <Link href={`/blog/${slug}`} className="block">
      <motion.div
        className="relative w-full overflow-hidden rounded-xl cursor-pointer"
        animate={{
          height: reverse ? [340, 260, 340] : [260, 340, 260],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Image
          src={src}
          alt={title}
          fill
          className="object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30 hover:bg-black/45 transition-colors duration-300" />

        {/* Text overlay */}
        <h3 className="absolute bottom-10 left-8 text-white text-[20px] max-w-74 font-semibold eb-garamond">
          {title}
        </h3>
      </motion.div>
    </Link>
  )
}

export default AnimatedBlogImage