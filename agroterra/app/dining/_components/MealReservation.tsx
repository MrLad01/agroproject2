'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronLeft, Check } from 'lucide-react'
import { Theme, EASE } from '@/lib/theme'
import { MEALS, MealItem } from '@/data/data'
import { SelectionPill } from './ui'

// ── Meal card ─────────────────────────────────────────────────────
function MealCard({
  item,
  selected,
  onToggle,
  t,
}: {
  item: MealItem
  selected: boolean
  onToggle: () => void
  t: Theme
}) {
  return (
    <button
      onClick={onToggle}
      className="w-full text-left flex items-center gap-4 rounded-2xl px-4 py-3.5 transition-all duration-200"
      style={{
        border: `1.5px solid ${selected ? t.accentVal : t.borderVal}`,
        backgroundColor: selected ? t.chipBg : t.surfaceVal,
      }}
    >
      <div
        className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200"
        style={{
          backgroundColor: selected ? t.accentVal : 'transparent',
          border: `1.5px solid ${selected ? t.accentVal : t.borderVal}`,
        }}
      >
        {selected && <Check size={11} color={t.pageVal} strokeWidth={2.5} />}
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="eb-garamond-semibold text-[14px] sm:text-[15px]"
          style={{ color: t.headingVal }}
        >
          {item.name}
        </p>
        <p
          className="cormorant-garamond-light-italic text-[12px] sm:text-[13px] mt-0.5"
          style={{ color: t.mutedVal }}
        >
          {item.desc}
        </p>
      </div>
      <span
        className="text-[9px] font-bold px-2.5 py-0.5 rounded-full tracking-widest uppercase shrink-0"
        style={{ backgroundColor: t.accentVal, color: t.pageVal }}
      >
        {item.cat}
      </span>
    </button>
  )
}

// ── Form types ────────────────────────────────────────────────────
type FormData = {
  name: string
  email: string
  phone: string
  date: string
  guests: string
  notes: string
}

// ── MealReservation ───────────────────────────────────────────────
export function MealReservation({ t }: { t: Theme }) {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '',
    notes: '',
  })
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)

  const toggle = (name: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(name) ? next.delete(name) : next.add(name)
      return next
    })
  }

  const handleSubmit = () => {
    const hasName = form.name.trim().length > 0
    const hasEmail = form.email.trim().length > 0
    setNameError(!hasName)
    setEmailError(!hasEmail)
    if (!hasName || !hasEmail) return
    setStep(3)
  }

  const inputStyle = (error?: boolean): React.CSSProperties => ({
    width: '100%',
    padding: '10px 18px',
    borderRadius: '9999px',
    border: `1px solid ${error ? '#e24b4a' : t.borderVal}`,
    backgroundColor: t.surfaceVal,
    color: t.bodyVal,
    fontSize: 13,
    outline: 'none',
    boxSizing: 'border-box' as const,
    fontFamily: 'inherit',
    transition: 'border-color .2s',
  })

  const textareaStyle: React.CSSProperties = {
    ...inputStyle(),
    borderRadius: 16,
    resize: 'none',
    padding: '12px 18px',
  }

  const btnPrimary: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '12px 28px',
    borderRadius: 9999,
    border: 'none',
    backgroundColor: t.accentVal,
    color: t.pageVal,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '0.13em',
    textTransform: 'uppercase' as const,
    cursor: selected.size === 0 && step === 1 ? 'not-allowed' : 'pointer',
    opacity: selected.size === 0 && step === 1 ? 0.4 : 1,
    fontFamily: 'inherit',
    boxShadow: `0 8px 24px ${t.accentVal}38`,
    transition: 'opacity .2s',
  }

  const btnOutline: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '12px 24px',
    borderRadius: 9999,
    border: `1.5px solid ${t.accentVal}`,
    backgroundColor: 'transparent',
    color: t.accentVal,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '0.13em',
    textTransform: 'uppercase' as const,
    cursor: 'pointer',
    fontFamily: 'inherit',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.14em',
    textTransform: 'uppercase' as const,
    color: t.mutedVal,
    marginBottom: 10,
    display: 'block',
  }

  return (
    <section
      className="w-full py-10 px-4 sm:px-6 mb-14"
      style={{
        backgroundColor: t.tintVal,
        borderTop: `1px solid ${t.borderVal}`,
        borderBottom: `1px solid ${t.borderVal}`,
      }}
    >
      <div className="max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <div className="mb-8">
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.24em] mb-1"
                  style={{ color: t.accentVal }}
                >
                  Reservations
                </p>
                <h2
                  className="eb-garamond-semibold text-[22px] sm:text-[28px] leading-tight"
                  style={{ color: t.headingVal }}
                >
                  Reserve Your Meal
                </h2>
                <p
                  className="cormorant-garamond-light-italic text-[15px] mt-1"
                  style={{ color: t.mutedVal }}
                >
                  Select the meals you'd like — we'll confirm your reservation directly.
                </p>
              </div>
              <div className="flex flex-col gap-8">
                {MEALS.map((group) => (
                  <div key={group.section}>
                    <span style={labelStyle}>{group.section}</span>
                    <div className="flex flex-col gap-2.5">
                      {group.items.map((item) => (
                        <MealCard
                          key={item.name}
                          item={item}
                          selected={selected.has(item.name)}
                          onToggle={() => toggle(item.name)}
                          t={t}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-8 flex-wrap gap-4">
                <p
                  className="cormorant-garamond-light-italic text-[14px]"
                  style={{ color: t.mutedVal }}
                >
                  {selected.size === 0
                    ? 'No meals selected yet'
                    : `${selected.size} meal${selected.size > 1 ? 's' : ''} selected`}
                </p>
                <button
                  style={btnPrimary}
                  disabled={selected.size === 0}
                  onClick={() => selected.size > 0 && setStep(2)}
                >
                  Continue <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <div className="mb-6">
                <p
                  className="text-[10px] font-bold uppercase tracking-[0.24em] mb-1"
                  style={{ color: t.accentVal }}
                >
                  Almost there
                </p>
                <h2
                  className="eb-garamond-semibold text-[22px] sm:text-[28px] leading-tight"
                  style={{ color: t.headingVal }}
                >
                  Your Details
                </h2>
                <p
                  className="cormorant-garamond-light-italic text-[15px] mt-1"
                  style={{ color: t.mutedVal }}
                >
                  We'll use these to confirm your dining reservation.
                </p>
              </div>
              <div className="mb-6">
                <span style={labelStyle}>Your selected meals</span>
                <div className="flex flex-wrap gap-2">
                  {[...selected].map((name) => (
                    <SelectionPill key={name} label={name} t={t} />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3 mb-6">
                <div>
                  <input
                    style={inputStyle(nameError)}
                    placeholder="Full name *"
                    value={form.name}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, name: e.target.value }))
                      setNameError(false)
                    }}
                  />
                  {nameError && (
                    <p className="text-[11px] mt-1 ml-4" style={{ color: '#e24b4a' }}>
                      Name is required
                    </p>
                  )}
                </div>
                <div>
                  <input
                    style={inputStyle(emailError)}
                    type="email"
                    placeholder="Email address *"
                    value={form.email}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, email: e.target.value }))
                      setEmailError(false)
                    }}
                  />
                  {emailError && (
                    <p className="text-[11px] mt-1 ml-4" style={{ color: '#e24b4a' }}>
                      Email is required
                    </p>
                  )}
                </div>
                <input
                  style={inputStyle()}
                  type="tel"
                  placeholder="Phone number (optional)"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                />
                <input
                  style={inputStyle()}
                  type="date"
                  placeholder="Preferred date"
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                />
                <select
                  style={{ ...inputStyle(), appearance: 'none' as const }}
                  value={form.guests}
                  onChange={(e) => setForm((f) => ({ ...f, guests: e.target.value }))}
                >
                  <option value="">Number of guests</option>
                  {['1 guest', '2 guests', '3 guests', '4 guests', '5+ guests'].map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
                <textarea
                  style={textareaStyle}
                  rows={3}
                  placeholder="Dietary requirements or special requests? (optional)"
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                />
              </div>
              <div className="flex gap-3 flex-wrap">
                <button style={btnOutline} onClick={() => setStep(1)}>
                  <ChevronLeft size={14} /> Back
                </button>
                <button style={btnPrimary} onClick={handleSubmit}>
                  Send Reservation <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="text-center py-8"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{
                  backgroundColor: t.chipBg,
                  border: `2px solid ${t.accentVal}`,
                }}
              >
                <Check size={24} strokeWidth={2} style={{ color: t.accentVal }} />
              </div>
              <h2
                className="eb-garamond-semibold text-[26px] sm:text-[32px] leading-tight mb-3"
                style={{ color: t.headingVal }}
              >
                Reservation Sent!
              </h2>
              <p
                className="cormorant-garamond-light-italic text-[16px] sm:text-[17px] mb-6 max-w-sm mx-auto"
                style={{ color: t.bodyVal }}
              >
                Thank you,{' '}
                <span style={{ color: t.accentVal, fontStyle: 'normal' }}>{form.name}</span>. We've
                received your selection and will contact you shortly to confirm.
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {[...selected].map((name) => (
                  <SelectionPill key={name} label={name} t={t} />
                ))}
              </div>
              <p className="text-[12px]" style={{ color: t.mutedVal }}>
                Questions? Email us at{' '}
                <a
                  href="mailto:dining@agroterra.com"
                  className="font-bold"
                  style={{ color: t.accentVal }}
                >
                  dining@agroterra.com
                </a>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}