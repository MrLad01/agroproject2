'use client'

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react'

// ── Types ─────────────────────────────────────────────────────────
export type MediaAsset = {
  id: string; title: string; imageUrl: string
  publicId: string; resourceType: string; createdAt: string
}

export type RoomImage = {
  id: string; roomTypeId: string; assetId: string
  order: number; createdAt: string; asset: MediaAsset
}

export type RoomTabParagraph = {
  id: string; tabId: string; text: string; order: number
}

export type RoomTab = {
  id: string; roomTypeId: string; key: string
  eyebrow: string; title: string; tagline: string
  size: string | null; beds: string | null; bath: string | null; guests: string | null
  videoSrc: string | null; order: number
  imageId: string | null; image: MediaAsset | null
  paragraphs: RoomTabParagraph[]
}

export type RoomType = {
  id: string; name: string; slug: string; label: string | null
  description: string | null; tagline: string | null
  basePrice: string; sizeSqm: number | null; maxGuests: number
  beds: string; bathrooms: number; order: number
  heroImageId: string | null; heroImage: MediaAsset | null
  images: RoomImage[]; tabs: RoomTab[]
}

export type HeroText     = { id: string; heading: string; subtext: string }
export type HeroSlide    = { id: string; order: number; active: boolean; assetId: string; asset: MediaAsset }
export type S1Image      = { id: string; order: number; assetId: string; asset: MediaAsset }
export type RoomHeroText = { id: string; heading: string; subtext: string }
export type RoomSlide    = { id: string; order: number; active: boolean; assetId: string; asset: MediaAsset }

export type SectionOneData = {
  id: string; label: string; heading: string; quote: string; images: S1Image[]
}

export type SectionTwoData = {
  id: string; label: string; heading: string; subheading: string
  expLabel: string; expHeading: string
}

// ── State shape (no functions) ────────────────────────────────────
type SiteState = {
  heroText:     HeroText | null
  heroSlides:   HeroSlide[]
  sectionOne:   SectionOneData | null
  sectionTwo:   SectionTwoData | null
  roomTypes:    RoomType[]
  roomHeroText: RoomHeroText | null
  roomSlides:   RoomSlide[]
  loading:      boolean
  error:        string | null
}

// ── Context shape (state + actions) ──────────────────────────────
type SiteData = SiteState & {
  refetch: () => void
}

// ── Initial state ─────────────────────────────────────────────────
const initialState: SiteState = {
  heroText:     null,
  heroSlides:   [],
  sectionOne:   null,
  sectionTwo:   null,
  roomTypes:    [],
  roomHeroText: null,
  roomSlides:   [],
  loading:      true,
  error:        null,
}

// ── Context ───────────────────────────────────────────────────────
const SiteDataContext = createContext<SiteData>({
  ...initialState,
  refetch: () => {},
})

export function SiteDataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SiteState>(initialState)

  const fetchAll = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    try {
      const [
        heroTextRes, heroSlidesRes,
        s1Res, s2Res,
        roomTypesRes, roomHeroTextRes, roomSlidesRes,
      ] = await Promise.all([
        fetch('/api/home/hero-text'),
        fetch('/api/home/hero-slides'),
        fetch('/api/home/section-one'),
        fetch('/api/home/section-two'),
        fetch('/api/rooms/room-types'),
        fetch('/api/rooms/room-hero-text'),
        fetch('/api/rooms/room-hero-slides'),
      ])

      const [
        heroText, heroSlides,
        sectionOne, sectionTwo,
        roomTypes, roomHeroText, roomSlides,
      ] = await Promise.all([
        heroTextRes.ok     ? heroTextRes.json()     : null,
        heroSlidesRes.ok   ? heroSlidesRes.json()   : [],
        s1Res.ok           ? s1Res.json()           : null,
        s2Res.ok           ? s2Res.json()           : null,
        roomTypesRes.ok    ? roomTypesRes.json()    : [],
        roomHeroTextRes.ok ? roomHeroTextRes.json() : null,
        roomSlidesRes.ok   ? roomSlidesRes.json()   : [],
      ])

      setState({
        heroText,
        heroSlides:   Array.isArray(heroSlides)  ? heroSlides  : [],
        sectionOne,
        sectionTwo,
        roomTypes:    Array.isArray(roomTypes)
          ? [...roomTypes].sort((a, b) => a.order - b.order)
          : [],
        roomHeroText,
        roomSlides:   Array.isArray(roomSlides)  ? roomSlides  : [],
        loading: false,
        error:   null,
      })
    } catch {
      setState(prev => ({ ...prev, loading: false, error: 'Failed to load site data' }))
    }
  }, [])

  useEffect(() => { fetchAll() }, [fetchAll])

  return (
    <SiteDataContext.Provider value={{ ...state, refetch: fetchAll }}>
      {children}
    </SiteDataContext.Provider>
  )
}

// ── Hooks ─────────────────────────────────────────────────────────
export function useSiteData()     { return useContext(SiteDataContext) }
export function useRoomTypes()    { return useContext(SiteDataContext).roomTypes }
export function useHeroData()     { const { heroText, heroSlides } = useContext(SiteDataContext); return { heroText, heroSlides } }
export function useSectionOne()   { return useContext(SiteDataContext).sectionOne }
export function useSectionTwo()   { return useContext(SiteDataContext).sectionTwo }
export function useRoomHeroData() { const { roomHeroText, roomSlides } = useContext(SiteDataContext); return { roomHeroText, roomSlides } }