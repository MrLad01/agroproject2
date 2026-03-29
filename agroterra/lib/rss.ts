// lib/rss.ts
// Fetches and parses RSS feeds into a unified Article shape.
// Add or swap feed URLs freely — anything with a standard RSS/Atom feed works.

export interface Article {
  id: string
  title: string
  description: string
  url: string
  image: string | null
  publishedAt: string
  source: string
  category: 'politics' | 'entertainment' | 'sports' | 'general'
}

interface FeedConfig {
  url: string
  source: string
  category: Article['category']
}

// ── Feed list ──────────────────────────────────────────────────────────────
// Swap / add any RSS feed URL here. These all support CORS-free server-side fetching.
export const FEEDS: FeedConfig[] = [
  // Politics / World News
  { url: 'https://feeds.bbci.co.uk/news/world/rss.xml',          source: 'BBC News',      category: 'politics' },
  { url: 'https://feeds.reuters.com/reuters/worldNews',           source: 'Reuters',       category: 'politics' },
  { url: 'https://punchng.com/feed/',                             source: 'Punch NG',      category: 'politics' },
  { url: 'https://www.vanguardngr.com/feed/',                     source: 'Vanguard',      category: 'politics' },

  // Entertainment
  { url: 'https://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml', source: 'BBC Entertainment', category: 'entertainment' },
  { url: 'https://www.pulse.ng/entertainment/rss',                source: 'Pulse NG',      category: 'entertainment' },

  // Sports
  { url: 'https://feeds.bbci.co.uk/sport/rss.xml',               source: 'BBC Sport',     category: 'sports' },
  { url: 'https://completesports.com/feed/',                      source: 'Complete Sports', category: 'sports' },
]

// ── Parser ─────────────────────────────────────────────────────────────────
function extractImage(item: Element, xmlText: string): string | null {
  // 1. <media:content url="...">
  const media = item.querySelector('content')
  if (media?.getAttribute('url')) return media.getAttribute('url')

  // 2. <enclosure url="..." type="image/...">
  const enclosure = item.querySelector('enclosure')
  if (enclosure?.getAttribute('type')?.startsWith('image')) {
    return enclosure.getAttribute('url')
  }

  // 3. First <img src="..."> inside <description>
  const desc = item.querySelector('description')?.textContent ?? ''
  const imgMatch = desc.match(/<img[^>]+src=["']([^"']+)["']/)
  if (imgMatch) return imgMatch[1]

  return null
}

function slugify(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 60)
}

async function parseFeed(config: FeedConfig): Promise<Article[]> {
  try {
    const res = await fetch(config.url, {
      next: { revalidate: 600 }, // ISR: cache for 10 minutes
      headers: { 'User-Agent': 'SheedXFM/1.0 RSS Reader' },
    })
    if (!res.ok) return []

    const xml = await res.text()

    // Use DOMParser on the server via the 'node-html-parser' or plain regex fallback.
    // Since Next.js 13+ runs on Node we use a lightweight regex-based parse
    // to avoid adding a dependency. For production, swap with 'fast-xml-parser'.
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)]

    return items.slice(0, 6).map((match, i) => {
      const block = match[1]

      const title       = stripCdata(block.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? 'Untitled')
      const description = stripCdata(stripHtml(block.match(/<description>([\s\S]*?)<\/description>/)?.[1] ?? ''))
      const url         = stripCdata(block.match(/<link>([\s\S]*?)<\/link>/)?.[1] ?? block.match(/<guid[^>]*>([\s\S]*?)<\/guid>/)?.[1] ?? '')
      const publishedAt = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1] ?? new Date().toUTCString()

      // Image: try media:content, enclosure, then description img tag
      const mediaUrl    = block.match(/media:content[^>]+url=["']([^"']+)["']/)?.[1]
      const enclosureUrl = block.match(/<enclosure[^>]+url=["']([^"']+)["'][^>]+type=["']image/)?.[1]
      const descImgUrl  = block.match(/<description>[\s\S]*?<img[^>]+src=["']([^"']+)["']/)?.[1]
      const image       = mediaUrl ?? enclosureUrl ?? descImgUrl ?? null

      return {
        id:          `${slugify(title)}-${i}`,
        title:       title.trim(),
        description: description.trim().slice(0, 180),
        url:         url.trim(),
        image,
        publishedAt,
        source:      config.source,
        category:    config.category,
      }
    })
  } catch {
    console.error(`[RSS] Failed to fetch ${config.url}`)
    return []
  }
}

function stripCdata(s: string): string {
  return s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim()
}

function stripHtml(s: string): string {
  return s.replace(/<[^>]+>/g, '').replace(/&[a-z]+;/gi, ' ').trim()
}

// ── Public API ─────────────────────────────────────────────────────────────
export async function fetchAllFeeds(): Promise<{
  politics:      Article[]
  entertainment: Article[]
  sports:        Article[]
  featured:      Article
}> {
  const results = await Promise.allSettled(FEEDS.map(parseFeed))

  const all: Article[] = results.flatMap((r) => (r.status === 'fulfilled' ? r.value : []))

  const byCategory = (cat: Article['category']) =>
    all.filter((a) => a.category === cat).slice(0, 6)

  const politics      = byCategory('politics')
  const entertainment = byCategory('entertainment')
  const sports        = byCategory('sports')

  // Featured = most recent article that has an image
  const featured = all.find((a) => a.image) ?? all[0]

  return { politics, entertainment, sports, featured }
}