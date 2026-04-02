// lib/rss.ts

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

export const FEEDS: FeedConfig[] = [
  { url: 'https://feeds.bbci.co.uk/news/world/rss.xml',                   source: 'BBC News',          category: 'politics'      },
  { url: 'https://feeds.reuters.com/reuters/worldNews',                    source: 'Reuters',           category: 'politics'      },
  { url: 'https://punchng.com/feed/',                                      source: 'Punch NG',          category: 'politics'      },
  { url: 'https://www.vanguardngr.com/feed/',                              source: 'Vanguard',          category: 'politics'      },
  { url: 'https://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml',  source: 'BBC Entertainment', category: 'entertainment' },
  { url: 'https://www.pulse.ng/entertainment/rss',                         source: 'Pulse NG',          category: 'entertainment' },
  { url: 'https://feeds.bbci.co.uk/sport/rss.xml',                        source: 'BBC Sport',         category: 'sports'        },
  { url: 'https://completesports.com/feed/',                               source: 'Complete Sports',   category: 'sports'        },
]

function slugify(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 60)
}

function stripCdata(s: string): string {
  return s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim()
}

function stripHtml(s: string): string {
  return s.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim()
}

function extractImage(block: string): string | null {
  // Try every known pattern, in order of reliability

  // 1. media:content url="..."  or  media:content url='...'
  const m1 = block.match(/media:content[^>]+url=["']([^"']+)["']/)
  if (m1?.[1]) return m1[1]

  // 2. media:thumbnail url="..."
  const m2 = block.match(/media:thumbnail[^>]+url=["']([^"']+)["']/)
  if (m2?.[1]) return m2[1]

  // 3. <enclosure url="..." type="image/...">
  const m3 = block.match(/<enclosure[^>]+type=["']image[^"']*["'][^>]+url=["']([^"']+)["']/)
  if (m3?.[1]) return m3[1]

  // 4. <enclosure url="..." ...> (any order)
  const m4 = block.match(/<enclosure[^>]+url=["']([^"']+)["']/)
  if (m4?.[1] && /\.(jpg|jpeg|png|webp|gif)/i.test(m4[1])) return m4[1]

  // 5. <img src="..."> anywhere in the block (description, content:encoded, etc.)
  const m5 = block.match(/<img[^>]+src=["']([^"']+)["']/)
  if (m5?.[1]) return m5[1]

  // 6. WordPress featured image pattern in content:encoded
  const m6 = block.match(/wp:image[^}]*"url"\s*:\s*"([^"]+)"/)
  if (m6?.[1]) return m6[1]

  // 7. og:image or any absolute image URL pattern inside the block
  const m7 = block.match(/https?:\/\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp|gif)(?:\?[^\s"'<>]*)?/i)
  if (m7?.[0]) return m7[0]

  return null
}

async function parseFeed(config: FeedConfig): Promise<Article[]> {
  try {
    const res = await fetch(config.url, {
      next: { revalidate: 600 },
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SheedXFM/1.0; +https://sheedxfm.com)',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
      },
    })
    if (!res.ok) return []

    const xml = await res.text()

    // Match both <item>...</item> (RSS) and <entry>...</entry> (Atom)
    const itemMatches = [
      ...xml.matchAll(/<item>([\s\S]*?)<\/item>/g),
      ...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g),
    ]

    return itemMatches.slice(0, 6).map((match, i) => {
      const block = match[1]

      const title       = stripCdata(block.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1] ?? 'Untitled')
      const description = stripHtml(stripCdata(
        block.match(/<description[^>]*>([\s\S]*?)<\/description>/)?.[1] ??
        block.match(/<summary[^>]*>([\s\S]*?)<\/summary>/)?.[1] ?? ''
      )).slice(0, 200)

      // Link: try <link> text node, then href attr (Atom), then <guid>
      const url = stripCdata(
        block.match(/<link>([\s\S]*?)<\/link>/)?.[1] ??
        block.match(/<link[^>]+href=["']([^"']+)["']/)?.[1] ??
        block.match(/<guid[^>]*>([\s\S]*?)<\/guid>/)?.[1] ?? ''
      ).trim()

      const publishedAt =
        block.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/)?.[1] ??
        block.match(/<published[^>]*>([\s\S]*?)<\/published>/)?.[1] ??
        block.match(/<updated[^>]*>([\s\S]*?)<\/updated>/)?.[1] ??
        new Date().toUTCString()

      const image = extractImage(block)

      return {
        id:          `${slugify(title)}-${i}`,
        title:       title.trim(),
        description,
        url,
        image,
        publishedAt,
        source:      config.source,
        category:    config.category,
      }
    })
  } catch (err) {
    console.error(`[RSS] Failed to fetch ${config.url}:`, err)
    return []
  }
}

export async function fetchAllFeeds(): Promise<{
  politics:      Article[]
  entertainment: Article[]
  sports:        Article[]
  featured:      Article
}> {
  const results = await Promise.allSettled(FEEDS.map(parseFeed))
  const all: Article[] = results.flatMap((r) => r.status === 'fulfilled' ? r.value : [])

  const byCategory = (cat: Article['category']) =>
    all.filter((a) => a.category === cat).slice(0, 6)

  const politics      = byCategory('politics')
  const entertainment = byCategory('entertainment')
  const sports        = byCategory('sports')

  // Featured = first article with an image, falling back to first article overall
  const featured = all.find((a) => a.image) ?? all[0]

  // Debug: log image extraction results in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[RSS] Image extraction results:')
    all.slice(0, 10).forEach((a) => console.log(`  ${a.source}: ${a.image ? '✓ ' + a.image.slice(0, 60) : '✗ no image'}`))
  }

  return { politics, entertainment, sports, featured }
}