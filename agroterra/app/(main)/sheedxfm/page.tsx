// app/page.tsx  (or app/(home)/page.tsx — adjust to your route structure)
// ISR: revalidates every 10 minutes — fresh news, fast page loads, full SEO.

import { fetchAllFeeds } from '@/lib/rss'
import HomeClient from '@/components/HomeClient'

// ── ISR config ─────────────────────────────────────────────────────────────
export const revalidate = 600 // seconds — Next.js ISR

export default async function Page() {
  const { politics, entertainment, sports, featured } = await fetchAllFeeds()

  return (
    <HomeClient
      politics={politics}
      entertainment={entertainment}
      sports={sports}
      featured={featured}
    />
  )
}