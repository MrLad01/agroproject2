// ── Theme ─────────────────────────────────────────────────────────
export type Theme = {
  pageVal: string
  surfaceVal: string
  borderVal: string
  accentVal: string
  headingVal: string
  bodyVal: string
  mutedVal: string
  ruleLine: string
  tintVal: string
  chipBg: string
  chipBorder: string
}

export const light: Theme = {
  pageVal: '#f5f2eb',
  surfaceVal: '#ffffff',
  borderVal: '#ddd5c4',
  accentVal: '#1e5e32',
  headingVal: '#0f1f0f',
  bodyVal: '#3a4e3a',
  mutedVal: '#7a8c6a',
  ruleLine: '#cec8bc',
  tintVal: '#e8f0e4',
  chipBg: 'rgba(30,94,50,0.08)',
  chipBorder: 'rgba(30,94,50,0.2)',
}

export const dark: Theme = {
  pageVal: '#080e08',
  surfaceVal: '#0f180f',
  borderVal: '#243424',
  accentVal: '#7ec850',
  headingVal: '#e0f0c8',
  bodyVal: '#9abf7e',
  mutedVal: '#4e6e3e',
  ruleLine: '#1a2a1a',
  tintVal: '#0d1f0d',
  chipBg: 'rgba(126,200,80,0.08)',
  chipBorder: 'rgba(126,200,80,0.22)',
}

export const EASE = [0.22, 1, 0.36, 1] as const

export const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

export const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}