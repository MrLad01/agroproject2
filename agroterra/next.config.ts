// // next.config.ts
// import type { NextConfig } from 'next'

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'images.unsplash.com',
//       },
      
//     ],
//   },
// }

// export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Option A (recommended for RSS sites): disable optimization entirely for external images.
    // This means Next.js won't resize/cache them, but they'll always load regardless of domain.
    // Since you're already using `unoptimized` on every <Image>, this is consistent.
    // unoptimized: true,

    // Option B: keep optimization but whitelist every RSS source domain.
    // Comment out `unoptimized: true` above and uncomment remotePatterns below if you
    // want Next.js image optimization (better performance, but requires updating this list
    // whenever you add a new feed).
    remotePatterns: [
      // BBC
      { protocol: 'https', hostname: 'ichef.bbci.co.uk' },
      { protocol: 'https', hostname: 'news.bbcimg.co.uk' },

      // Reuters
      { protocol: 'https', hostname: 'cloudfront-us-east-2.images.arcpublishing.com' },
      { protocol: 'https', hostname: 's.reutersmedia.net' },
      { protocol: 'https', hostname: 'media.reuters.com' },

      // Punch NG
      { protocol: 'https', hostname: 'punchng.com' },
      { protocol: 'https', hostname: 'i0.wp.com' },
      { protocol: 'https', hostname: 'i1.wp.com' },
      { protocol: 'https', hostname: 'i2.wp.com' },

      // Vanguard
      { protocol: 'https', hostname: 'www.vanguardngr.com' },

      // Pulse NG
      { protocol: 'https', hostname: 'pulse.ng' },
      { protocol: 'https', hostname: 'cdn.pulse.ng' },
      { protocol: 'https', hostname: 'ocdn.eu' },

      // Complete Sports
      { protocol: 'https', hostname: 'completesports.com' },
      { protocol: 'https', hostname: 'www.completesports.com' },

      // Generic CDNs commonly used by news sites
      { protocol: 'https', hostname: '**.wp.com' },
      { protocol: 'https', hostname: '**.cloudinary.com' },
      { protocol: 'https', hostname: '**.twimg.com' },
      { protocol: 'https', hostname: '**.amazonaws.com' },
    ],
  },
}

module.exports = nextConfig