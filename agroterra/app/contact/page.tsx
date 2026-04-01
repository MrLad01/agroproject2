"use client"

import Image from 'next/image'
import { useState } from 'react'
import bg from '@/public/Screenshot 2026-02-03 040000.png'
import palm from '@/public/Screenshot 2026-02-03 040106.png'
import Navbar from '@/components/Navbar'
import { motion, cubicBezier, AnimatePresence } from 'framer-motion'
import { Leaf, Wind, Dumbbell, Clock, CheckCircle, X, MessageCircle } from 'lucide-react'

// ── Animation variants ────────────────────────────────────────────
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

// ── WhatsApp number ───────────────────────────────────────────────
const WA_NUMBER = '2347036536705'

// ── Types ─────────────────────────────────────────────────────────
type FormData = {
  checkIn: string
  checkOut: string
  roomType: string
  name: string
  phone: string
  guests: string
}

// ── Feature card ─────────────────────────────────────────────────
const Feature = ({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ElementType
  title: string
  text: string
}) => (
  <motion.div variants={fadeIn} className="flex flex-col items-center text-center max-w-50">
    <div
      className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
      style={{ backgroundColor: 'rgba(97,169,98,0.2)', border: '1px solid rgba(97,169,98,0.4)' }}
    >
      <Icon size={22} color="#61A962" />
    </div>
    <h4 className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.12em] text-white mb-2">
      {title}
    </h4>
    <p className="text-[12px] sm:text-[13px] text-white/70 leading-relaxed">{text}</p>
  </motion.div>
)

// ── Form field wrapper ────────────────────────────────────────────
const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <motion.div variants={fadeIn} className="flex flex-col gap-1.5">
    <label className="text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: '#28683E' }}>
      {label}
    </label>
    {children}
  </motion.div>
)

const inputClass =
  'w-full border-b bg-transparent px-0 py-2 text-[13px] text-[#1B201E] placeholder:text-gray-400 focus:outline-none transition-colors'
const inputStyle = { borderColor: '#d1d5db', borderBottomWidth: '1px' as const }

// ── Confirmation Modal ────────────────────────────────────────────
function ConfirmModal({
  data,
  onConfirm,
  onCancel,
}: {
  data: FormData
  onConfirm: () => void
  onCancel: () => void
}) {
  const details = [
    data.checkIn  && `Check-in: ${data.checkIn}`,
    data.checkOut && `Check-out: ${data.checkOut}`,
    data.roomType && `Room: ${data.roomType}`,
    data.guests   && `Guests: ${data.guests}`,
    data.phone    && `My number: ${data.phone}`,
  ].filter(Boolean) as string[]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: 'rgba(27,32,30,0.72)', backdropFilter: 'blur(4px)' }}
      onClick={onCancel}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.97 }}
        transition={{ duration: 0.25, ease: cubicBezier(0.25, 0.46, 0.45, 0.94) }}
        className="relative w-full max-w-md bg-white shadow-2xl"
        style={{ borderTop: '3px solid #28683E' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X size={17} />
        </button>

        <div className="px-7 sm:px-9 py-8">

          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: '#25D366' }}
            >
              <MessageCircle size={18} color="white" fill="white" />
            </div>
            <div>
              <p className="text-[10px] tracking-[0.16em] uppercase mb-0.5" style={{ color: '#28683E' }}>
                Opening WhatsApp
              </p>
              <h3 className="eb-garamond-semibold text-[22px] text-[#1B201E] leading-none">
                Confirm &amp; Send
              </h3>
            </div>
          </div>

          <p className="text-[12px] text-gray-400 leading-relaxed mb-5">
            This will open <strong className="text-gray-600">WhatsApp</strong> with a pre-filled message to our team. They'll confirm your room availability shortly.
          </p>

          {/* Message preview */}
          <div
            className="px-4 py-4 mb-6 space-y-1 text-[12px] leading-relaxed"
            style={{ backgroundColor: '#F8FAF6', border: '1px solid #e6e1d8' }}
          >
            <p className="text-[10px] tracking-[0.14em] uppercase text-gray-400 mb-2">
              Message preview
            </p>
            <p className="text-gray-700">
              Hi, I'm{' '}
              <span className="font-semibold text-[#1B201E]">{data.name || 'a guest'}</span>.
              I'd like to check availability at Agroterra Resort.
            </p>
            {details.map((line, i) => (
              <p key={i} className="text-gray-500">{line}</p>
            ))}
            <p className="text-gray-500">Please let me know if this is available. Thank you!</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-3 text-[11px] tracking-[0.12em] uppercase transition-colors cursor-pointer"
              style={{ border: '1px solid #d1d5db', color: '#999' }}
              onMouseOver={(e) => (e.currentTarget.style.borderColor = '#aaa')}
              onMouseOut={(e) => (e.currentTarget.style.borderColor = '#d1d5db')}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-3 text-[11px] tracking-[0.12em] uppercase font-semibold text-white flex items-center justify-center gap-2 transition-colors cursor-pointer"
              style={{ backgroundColor: '#25D366' }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1ebc58')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#25D366')}
            >
              <MessageCircle size={13} />
              Send on WhatsApp
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Page ─────────────────────────────────────────────────────────
export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    checkIn: '',
    checkOut: '',
    roomType: '',
    name: '',
    phone: '',
    guests: '',
  })
  const [showModal, setShowModal] = useState(false)

  // Today's date in YYYY-MM-DD — used as min for date inputs
  const today = new Date().toISOString().split('T')[0]

  const set =
    (key: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) {
      document.getElementById('field-name')?.focus()
      return
    }
    setShowModal(true)
  }

  const handleConfirm = () => {
    const message = [
      `Hi, I'm ${form.name}. I'd like to check availability at Agroterra Resort.`,
      form.checkIn  && `Check-in: ${form.checkIn}`,
      form.checkOut && `Check-out: ${form.checkOut}`,
      form.roomType && `Room type: ${form.roomType}`,
      form.guests   && `Guests: ${form.guests}`,
      form.phone    && `My contact number: ${form.phone}`,
      `Please let me know if this is available. Thank you!`,
    ]
      .filter(Boolean)
      .join('\n')

    window.open(
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    )
    setShowModal(false)
  }

  return (
    <>
      <AnimatePresence>
        {showModal && (
          <ConfirmModal data={form} onConfirm={handleConfirm} onCancel={() => setShowModal(false)} />
        )}
      </AnimatePresence>

      <main className="flex flex-col w-full bg-white">

        {/* ── Hero ──────────────────────────────────────────── */}
        <div className="relative w-full h-[55vh] sm:h-[65vh] lg:h-[92vh]">
          <Image src={bg} alt="Agroterra Resort" fill className="object-cover" priority />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(27,32,30,0.6), rgba(27,32,30,0.82))' }}
          />
          <div className="absolute inset-x-0 top-0 z-20 px-4 sm:px-8 lg:px-12 py-4 sm:py-5">
            <Navbar />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4 text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[10px] tracking-[0.25em] uppercase mb-4"
              style={{ color: '#61A962' }}
            >
              Agroterra Resort
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.15 }}
              className="eb-garamond-semibold text-[28px] sm:text-[40px] lg:text-[52px] leading-tight uppercase max-w-3xl"
            >
              Book Your Stay
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.75, delay: 0.3 }}
              className="mt-3 text-[13px] sm:text-[15px] text-white/75 max-w-md leading-relaxed"
            >
              Reserve your escape into nature, comfort, and relaxation
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="absolute bottom-8 flex flex-col items-center gap-1"
            >
              <span className="text-[10px] tracking-[0.18em] uppercase text-white/40">Scroll</span>
              <div className="w-px h-8 bg-white/25" />
            </motion.div>
          </div>
        </div>

        {/* ── Booking Form ──────────────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full flex justify-center px-4 -mt-10 sm:-mt-14 relative z-10 pb-16 sm:pb-24"
        >
          <div
            className="w-full max-w-3xl bg-white shadow-2xl px-6 sm:px-10 lg:px-14 py-10 sm:py-12"
            style={{ borderTop: '3px solid #28683E' }}
          >
            <div className="mb-8 sm:mb-10">
              <p className="text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: '#28683E' }}>
                Availability
              </p>
              <h2 className="eb-garamond-semibold text-[24px] sm:text-[30px]" style={{ color: '#1B201E' }}>
                Check Availability
              </h2>
            </div>

            <motion.form
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7"
            >
              <Field label="Check-in Date">
                <input type="date" value={form.checkIn} onChange={set('checkIn')}
                  min={today}
                  className={inputClass} style={inputStyle} />
              </Field>

              <Field label="Check-out Date">
                <input type="date" value={form.checkOut} onChange={set('checkOut')}
                  min={form.checkIn || today}
                  className={inputClass} style={inputStyle} />
              </Field>

              <Field label="Room Type">
                <select value={form.roomType} onChange={set('roomType')}
                  className={inputClass} style={inputStyle}>
                  <option value="" disabled>Select room type</option>
                  <option>Deluxe Room</option>
                  <option>Executive Suite</option>
                  <option>Family Villa</option>
                </select>
              </Field>

              {/* Name — only required field */}
              <Field label="Your Name *">
                <input
                  id="field-name"
                  type="text"
                  placeholder="Your full name"
                  required
                  value={form.name}
                  onChange={set('name')}
                  className={inputClass}
                  style={inputStyle}
                />
              </Field>

              <Field label="Phone (optional)">
                <input type="tel" placeholder="+234..." value={form.phone} onChange={set('phone')}
                  className={inputClass} style={inputStyle} />
              </Field>

              <Field label="Number of Guests">
                <input type="number" placeholder="e.g. 2" min={1} value={form.guests}
                  onChange={set('guests')} className={inputClass} style={inputStyle} />
              </Field>

              {/* Submit row */}
              <motion.div
                variants={fadeIn}
                className="sm:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 mt-2"
                style={{ borderTop: '1px solid #f0f0f0' }}
              >
                <div className="flex items-center gap-4">
                  {[
                    { icon: CheckCircle, text: 'Free cancellation' },
                    { icon: Clock, text: 'Instant reply' },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex items-center gap-1.5">
                      <Icon size={13} color="#28683E" />
                      <span className="text-[11px] text-gray-400">{text}</span>
                    </div>
                  ))}
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-8 py-3 text-[11px] font-semibold tracking-[0.15em] uppercase text-white transition-colors cursor-pointer whitespace-nowrap"
                  style={{ backgroundColor: '#28683E' }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#1f5432')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#28683E')}
                >
                  <MessageCircle size={14} />
                  Check Availability
                </motion.button>
              </motion.div>
            </motion.form>
          </div>
        </motion.section>

        {/* ── Stay With Us ──────────────────────────────────── */}
        <section className="relative w-full overflow-hidden" style={{ minHeight: '520px' }}>
          <Image src={palm} alt="Resort grounds" fill className="object-cover" />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(27,32,30,0.6), rgba(27,32,30,0.82))' }}
          />
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20 sm:py-28">
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[10px] tracking-[0.22em] uppercase mb-4"
              style={{ color: '#61A962' }}
            >
              The Experience
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="eb-garamond-semibold text-[32px] sm:text-[42px] lg:text-[50px] text-white uppercase leading-tight mb-2"
            >
              Stay With Us
            </motion.h2>
            <div className="w-10 h-0.5 mb-8 sm:mb-10" style={{ backgroundColor: '#61A962' }} />
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-xl text-white/70 text-[13px] sm:text-[15px] leading-[1.85] mb-14 sm:mb-16"
            >
              Enjoy peaceful surroundings, access to leisure facilities, and a naturally
              enriching environment designed for rest and recreation. Your stay is smooth
              and comfortable from arrival to departure.
            </motion.p>
            <motion.div
              variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-10 sm:gap-16 lg:gap-24 items-center justify-center"
            >
              <Feature icon={Dumbbell} title="Access to Golf Areas" text="Enjoy open green spaces and leisure activities." />
              <Feature icon={Leaf} title="Natural Open Spaces" text="Fresh air, greenery, and peaceful surroundings." />
              <Feature icon={Wind} title="Relaxing Environment" text="Designed for comfort, calm, and quiet moments." />
            </motion.div>
          </div>
        </section>

      </main>
    </>
  )
}