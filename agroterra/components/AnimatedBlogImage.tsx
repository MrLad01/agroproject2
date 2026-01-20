'use client' // IMPORTANT if you're using Next.js App Router

import { motion } from 'framer-motion'
import Image, { StaticImageData } from 'next/image'

type Props = {
  src: StaticImageData
  title: string
  reverse?: boolean
}

const AnimatedBlogImage = ({ src, title, reverse = false }: Props) => {
  return (
    <motion.div
      className="relative w-full overflow-hidden rounded-xl"
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
      <div className="absolute inset-0 bg-black/30" />

      {/* Text overlay */}
      <h3 className="absolute bottom-10 left-8 text-white text-[20px] max-w-74 font-semibold eb-garamond">
        {title}
      </h3>
    </motion.div>
  )
}

export default AnimatedBlogImage
