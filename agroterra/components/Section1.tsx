'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
// import image1 from '@/public/relaxation.png'
// import image2 from '@/public/contact.png'

// ── Theme tokens ──────────────────────────────────────────────────
const themes = {
  light: {
    bg:        '#f8f5ef',
    border:    '#ddd5c4',
    heading:   '#0f1f0f',
    accent:    '#1e5e32',
    body:      '#3a4e3a',
    imgShadow: '0 8px 40px rgba(0,0,0,0.10)',
  },
  dark: {
    bg:        '#080e08',
    border:    '#243424',
    heading:   '#d4ebb0',
    accent:    '#7ec850',
    body:      '#9abf7e',
    imgShadow: '0 8px 40px rgba(0,0,0,0.55)',
  },
}

type MediaAsset = {
  id: string;
  title: string;
  imageUrl: string;
  publicId: string;
  resourceType: string;
};

type HeroSlide = {
  id: string;
  order: number;
  active: boolean;
  assetId: string;
  asset: MediaAsset;
};

type HeroText = {
  id: string;
  heading: string;
  subtext: string;
};

type S1Image = {
  id: string;
  order: number;
  assetId: string;
  asset: MediaAsset;
};

type SectionOneData = {
  id: string;
  label: string;
  heading: string;
  quote: string;
  images: S1Image[];
};

type SectionTwoData = {
  id: string;
  label: string;
  heading: string;
  subheading: string;
  expLabel: string;
  expHeading: string;
};


type Props = { dark?: boolean }

const SectionOne = ({ dark = false }: Props) => {
  const tk = dark ? themes.dark : themes.light;
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(true);
  const [heroText, setHeroText] = useState<HeroText>({ id: "", heading: "", subtext: "" });
  const [slides, setSlides]     = useState<HeroSlide[]>([]);
  const [s1, setS1]             = useState<SectionOneData>({ id: "", label: "", heading: "", quote: "", images: [] });
  const [s2, setS2]             = useState<SectionTwoData>({ id: "", label: "", heading: "", subheading: "", expLabel: "", expHeading: "" });

  function showError(msg: string) {
    setError(msg);
    setTimeout(() => setError(""), 3500);
  }
  
  // ── Fetch all data on mount ───────────────────────────────────
  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [htRes, slidesRes, s1Res, s2Res] = await Promise.all([
        fetch("/api/home/hero-text"),
        fetch("/api/home/hero-slides"),
        fetch("/api/home/section-one"),
        fetch("/api/home/section-two"),
      ]);
      const [ht, sl, s1d, s2d] = await Promise.all([
        htRes.json(), slidesRes.json(), s1Res.json(), s2Res.json(),
      ]);
      if (ht)  setHeroText(ht);
      if (sl)  setSlides(sl);
      if (s1d) setS1(s1d);
      if (s2d) setS2(s2d);
    } catch {
      showError("Failed to load page data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);
    

  return (
    <section
      style={{
        backgroundColor: tk.bg,
        borderTop:       `1px solid ${tk.border}`,
        transition:      'background-color 0.3s, border-color 0.3s',
      }}
      className="py-14 sm:py-20 md:py-28 px-6 sm:px-12 md:px-20 lg:px-40 flex flex-col items-center"
    >
      {/* Label */}
      <p
        className="text-[10px] font-bold uppercase tracking-[0.28em] mb-4"
        style={{ color: tk.accent, transition: 'color 0.3s' }}
      >
        {s1.label || "Agroterra Resort"}
      </p>

      {/* Heading */}
      <h2
        className="eb-garamond-semibold text-center leading-tight"
        style={{ color: tk.heading, fontSize: 'clamp(28px,5vw,52px)', transition: 'color 0.3s' }}
      >
        {s1.heading || "WELCOME TO AGROTERRA"}
      </h2>

      {/* Accent rule */}
      <div
        className="mt-4 mb-3 w-12 h-px rounded-full"
        style={{ backgroundColor: tk.accent, opacity: 0.7, transition: 'background-color 0.3s' }}
      />

      {/* Quote */}
      <p
        className="eb-garamond-italic text-center max-w-[88vw] sm:max-w-lg"
        style={{ color: tk.accent, fontSize: 'clamp(17px,2.8vw,26px)', transition: 'color 0.3s' }}
      >
        &ldquo;{s1.quote || "A place that celebrates life."}&rdquo;
      </p>

      {/* Images */}
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-7 md:gap-10 mt-12 sm:mt-14 items-stretch w-full justify-center">
        {s1.images
        .sort((a, b) => a.order - b.order)
        .map((img) => (
          <div
            key={img.id}
            className="w-full sm:w-1/2 overflow-hidden rounded-2xl"
            style={{ boxShadow: tk.imgShadow, transition: 'box-shadow 0.3s' }}
          >
            <Image
              src={img.asset.imageUrl}
              alt={img.asset.title}
              width={600}
              height={400}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.04]"
              style={{ display: 'block' }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export default SectionOne