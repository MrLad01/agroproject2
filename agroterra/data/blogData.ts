import { StaticImageData } from 'next/image'

import g1 from '../public/09.png'
import g2 from '../public/11.png'
import g3 from '../public/13.png'
import g4 from '@/public/relaxation2.png'
import g5 from '../public/17.png'
import g6 from '../public/agroterra.png'

export type BlogEntry = {
  slug: string
  title: string
  src: StaticImageData
  reverse?: boolean
  excerpt: string
}

export const blogPosts: BlogEntry[] = [
  {
    slug: 'golf-course',
    title: 'Golf Course',
    src: g1,
    excerpt:
      'Surrounded by lush greenery and open fairways, the Agroterra Golf Course offers a calm, scenic experience for players of every skill level.',
  },
  {
    slug: 'fountain-center',
    title: 'Fountain Center',
    src: g2,
    reverse: true,
    excerpt:
      'The Fountain Center is a tranquil gathering point at the heart of the resort, where guests can unwind and enjoy the soothing sound of flowing water.',
  },
  {
    slug: 'benefits-of-having-online-registration-at-your-hotel',
    title: 'Benefits of Having Online Registration at Your Hotel',
    src: g3,
    reverse: true,
    excerpt:
      'Online registration simplifies the check-in experience, reduces wait times, and allows guests to start enjoying their stay from the moment they arrive.',
  },
  {
    slug: 'recreational-space',
    title: 'Recreational Space',
    src: g4,
    excerpt:
      'Our recreational spaces are designed for relaxation and fun, offering guests a variety of activities to enjoy at their own pace throughout the day.',
  },
  {
    slug: 'food-rocks-food-festival-lyme-regis',
    title: 'Food Rocks food festival, Lyme Regis',
    src: g5,
    excerpt:
      'A celebration of flavour and culture, the Food Rocks festival brings together local ingredients and creative cooking in a vibrant, community atmosphere.',
  },
  {
    slug: 'your-hotel-digital-marketing-checklist',
    title: 'Your Hotel Digital Marketing Checklist',
    src: g6,
    reverse: true,
    excerpt:
      'From social media to SEO, a strong digital presence helps your hotel reach more guests and deliver a seamless booking experience online.',
  },
]