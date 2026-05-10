import { Theme } from '../../../lib/theme'

// ── Badge ─────────────────────────────────────────────────────────
export function Badge({ label, t }: { label: string; t: Theme }) {
  return (
    <span
      className="text-[9px] font-bold px-2.5 py-0.5 rounded-full tracking-widest uppercase"
      style={{ backgroundColor: t.accentVal, color: t.pageVal }}
    >
      {label}
    </span>
  )
}

// ── Section Heading ───────────────────────────────────────────────
export function SectionHeading({
  title,
  t,
  viewAll,
  onViewAll,
}: {
  title: string
  t: Theme
  viewAll?: boolean
  onViewAll?: () => void
}) {
  return (
    <div className="flex items-end justify-between mb-5">
      <div>
        <p
          className="text-[10px] font-bold uppercase tracking-[0.28em] mb-1"
          style={{ color: t.accentVal }}
        >
          Agroterra Dining
        </p>
        <h2
          className="eb-garamond-semibold leading-none"
          style={{ fontSize: 'clamp(22px,3.5vw,34px)', color: t.headingVal }}
        >
          {title}
        </h2>
        <div className="mt-3 w-10 h-px" style={{ backgroundColor: t.accentVal }} />
      </div>
      {viewAll && (
        <button
          onClick={onViewAll}
          className="text-[11px] font-bold uppercase tracking-[0.14em] transition-opacity hover:opacity-60"
          style={{ color: t.mutedVal }}
        >
          View All →
        </button>
      )}
    </div>
  )
}

// ── Divider ───────────────────────────────────────────────────────
export function Divider({ t }: { t: Theme }) {
  return (
    <div className="flex items-center gap-4 my-6">
      <div className="flex-1 h-px" style={{ backgroundColor: t.ruleLine }} />
      <div
        className="w-1.5 h-1.5 rounded-full rotate-45"
        style={{ backgroundColor: t.accentVal, opacity: 0.5 }}
      />
      <div className="flex-1 h-px" style={{ backgroundColor: t.ruleLine }} />
    </div>
  )
}

// ── Selection pill ────────────────────────────────────────────────
import { Check } from 'lucide-react'

export function SelectionPill({ label, t }: { label: string; t: Theme }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold"
      style={{
        backgroundColor: t.chipBg,
        border: `1px solid ${t.chipBorder}`,
        color: t.bodyVal,
      }}
    >
      <Check size={10} strokeWidth={2.5} style={{ color: t.accentVal }} />
      {label}
    </span>
  )
}