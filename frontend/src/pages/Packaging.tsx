import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Box,
  Calculator,
  Check,
  ChevronRight,
  FileText,
  Shirt,
  Sparkles,
  Wine,
  X,
} from 'lucide-react'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import { ArtCushion, ArtHero, ArtHTape, ArtLabel, ArtMeasure, ArtSturdyBox, ArtWrapItem } from '../components/PackArt'

const ease = [0.22, 1, 0.36, 1] as const

const steps = [
  {
    art: ArtSturdyBox,
    title: 'Choose a strong box',
    text: 'Use a new, rigid corrugated box — double-wall for heavy or valuable items. Used boxes get weaker every time they travel.',
    tips: ['Box should be bigger than the item, with room for cushioning', 'Remove old labels and barcodes'],
  },
  {
    art: ArtWrapItem,
    title: 'Wrap every item separately',
    text: 'Wrap each item in at least two layers of bubble wrap or foam so items never touch each other or the box walls.',
    tips: ['Wrap fragile items one by one', 'Protect corners and edges'],
  },
  {
    art: ArtCushion,
    title: 'Fill every empty space',
    text: 'Leave about 5 cm of cushioning on all sides and fill gaps with bubble wrap, foam or crumpled paper.',
    tips: ['Shake test: nothing should move', 'Don’t overfill so the box bulges'],
  },
  {
    art: ArtHTape,
    title: 'Seal with the H-taping method',
    text: 'Tape along the centre seam and across both edge seams — on the top and the bottom of the box — so it looks like an “H”.',
    tips: ['Use 5 cm wide packing tape', 'Avoid string, paper or masking tape'],
  },
  {
    art: ArtLabel,
    title: 'Label it clearly',
    text: 'Place one shipping label on the largest flat surface. Include full addresses and a phone number for both sender and receiver.',
    tips: ['Put a copy of the address inside the box', 'Mark “Fragile” or “This side up” if needed'],
  },
  {
    art: ArtMeasure,
    title: 'Measure and weigh',
    text: 'Measure length, width and height in centimetres and weigh the sealed box — this decides your chargeable weight.',
    tips: ['Round up to the nearest cm', 'Use the calculator below'],
  },
]

const items = [
  { icon: Wine, title: 'Glass & fragile', text: 'Use the box-in-box method: wrap, box, then place in an outer box with 5 cm cushioning all round.' },
  { icon: Shirt, title: 'Clothing & textiles', text: 'Fold into a waterproof poly bag first, then box. Soft items still need a sturdy outer box.' },
  { icon: FileText, title: 'Documents', text: 'Use a rigid envelope or document pack so papers don’t bend. Keep originals flat.' },
  { icon: Box, title: 'Heavy items', text: 'Double-wall box, heavy items at the bottom, and extra tape on the base. Over 30 kg? Ask about freight.' },
]

const dos = [
  'Use new, sturdy corrugated boxes',
  'Cushion 5 cm on every side',
  'Tape all seams with the H-method',
  'Remove old labels and barcodes',
  'Add a phone number on the label',
]
const donts = [
  'Reuse damaged or soft boxes',
  'Leave items loose inside the box',
  'Use string, paper or masking tape',
  'Wrap the box in brown paper',
  'Ship prohibited or dangerous goods',
]

function VolumetricCalculator() {
  const [v, setV] = useState({ l: '40', w: '30', h: '20', kg: '5' })
  const n = (s: string) => Math.max(0, parseFloat(s) || 0)
  const volumetric = (n(v.l) * n(v.w) * n(v.h)) / 5000
  const actual = n(v.kg)
  const chargeable = Math.max(volumetric, actual)
  const byVolume = volumetric > actual

  const field = (key: keyof typeof v, label: string, unit: string) => (
    <label className="block">
      <span className="text-xs font-semibold text-slate-400">{label}</span>
      <span className="mt-1.5 flex items-center rounded-xl border border-white/10 bg-white/5 focus-within:border-accent-500">
        <input
          type="number"
          min="0"
          inputMode="decimal"
          value={v[key]}
          onChange={(e) => setV((s) => ({ ...s, [key]: e.target.value }))}
          className="w-full min-w-0 bg-transparent px-4 py-3 text-lg font-bold text-white outline-none"
        />
        <span className="pr-4 text-sm text-slate-400">{unit}</span>
      </span>
    </label>
  )

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="grid grid-cols-2 gap-4">
        {field('l', 'Length', 'cm')}
        {field('w', 'Width', 'cm')}
        {field('h', 'Height', 'cm')}
        {field('kg', 'Actual weight', 'kg')}
        <p className="col-span-2 text-xs leading-relaxed text-slate-400">
          Volumetric weight = L × W × H ÷ 5000. You pay for whichever is higher — the actual or the volumetric weight.
          Final weight is confirmed at booking.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs font-semibold text-slate-400">Volumetric weight</p>
          <p className="mt-2 text-3xl font-extrabold">{volumetric.toFixed(2)} <span className="text-base text-slate-400">kg</span></p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="text-xs font-semibold text-slate-400">Actual weight</p>
          <p className="mt-2 text-3xl font-extrabold">{actual.toFixed(2)} <span className="text-base text-slate-400">kg</span></p>
        </div>
        <motion.div
          key={chargeable.toFixed(2)}
          initial={{ scale: 0.97 }}
          animate={{ scale: 1 }}
          className="col-span-2 rounded-2xl bg-accent-500 p-6"
        >
          <p className="text-sm font-semibold text-white/85">Chargeable weight</p>
          <p className="mt-1 text-5xl font-extrabold">{chargeable.toFixed(2)} kg</p>
          <p className="mt-2 text-sm text-white/85">
            {byVolume
              ? 'Your box is light for its size — a smaller box would cost less.'
              : 'Charged on actual weight — your box size is efficient.'}
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default function Packaging() {
  return (
    <>
      {/* ───────── HERO ───────── */}
      <section className="relative overflow-hidden bg-ink-900 pt-36 pb-24 text-white lg:pt-44 lg:pb-28">
        <div className="grid-bg absolute inset-0" />
        <div className="absolute -top-40 -right-32 h-[30rem] w-[30rem] rounded-full bg-brand-500/30 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <motion.nav initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-1.5 text-sm text-slate-400">
              <Link to="/" className="hover:text-white">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-accent-400">Packaging guide</span>
            </motion.nav>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease }}
              className="mt-5 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Pack it right, <span className="text-accent-500">ship it safe.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300"
            >
              Good packaging is the best protection. Follow these six simple steps and your parcel will arrive exactly
              the way you sent it.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8 flex flex-wrap gap-3">
              <a href="#steps" className="group flex items-center gap-2 rounded-full bg-accent-500 px-6 py-3.5 font-bold transition-colors hover:bg-accent-600">
                Start the guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#calculator" className="flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 font-bold transition-colors hover:bg-white/10">
                <Calculator className="h-4 w-4" /> Weight calculator
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 1, ease }}
            className="relative mx-auto aspect-[4/3] w-full max-w-md"
          >
            <div className="absolute inset-10 rounded-full bg-accent-500/20 blur-3xl" />
            <div className="animate-float relative h-full w-full">
              <ArtHero />
            </div>
            {[
              { t: '5 cm cushioning', cls: 'top-4 -left-2 sm:-left-8', d: 0.8 },
              { t: 'H-taped seams', cls: 'top-1/3 -right-2 sm:-right-6', d: 1 },
              { t: 'Clear label on top', cls: 'bottom-6 left-4', d: 1.2 },
            ].map((c) => (
              <motion.span
                key={c.t}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: c.d }}
                className={`absolute flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-ink-900 shadow-xl ${c.cls}`}
              >
                <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-500 text-white">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {c.t}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───────── STEPS ───────── */}
      <section id="steps" className="scroll-mt-20 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle eyebrow="Step by step" title="Six steps to a parcel that arrives safely" />
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 0.1}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-100 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-ink-900/10">
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-brand-50 via-white to-accent-500/5 p-6">
                    <span className="absolute top-5 left-5 grid h-10 w-10 place-items-center rounded-full bg-ink-900 text-sm font-extrabold text-white">
                      {i + 1}
                    </span>
                    <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
                      <s.art />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <h3 className="text-xl font-extrabold text-ink-900">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.text}</p>
                    <ul className="mt-5 space-y-2 border-t border-slate-100 pt-5">
                      {s.tips.map((t) => (
                        <li key={t} className="flex items-start gap-2.5 text-sm font-medium text-ink-900">
                          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" /> {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── BY ITEM TYPE ───────── */}
      <section className="bg-slate-50 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle eyebrow="By item type" title="Special care for special items" />
          <div className="mx-auto mt-16 grid max-w-5xl gap-5 sm:grid-cols-2">
            {items.map((it, i) => (
              <Reveal key={it.title} delay={(i % 3) * 0.08}>
                <div className="group flex h-full gap-5 rounded-3xl bg-white p-7 ring-1 ring-slate-100 transition-all hover:shadow-xl hover:shadow-ink-900/5">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-accent-500/10 text-accent-500 transition-all group-hover:scale-110 group-hover:bg-accent-500 group-hover:text-white">
                    <it.icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-ink-900">{it.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{it.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── DO'S & DON'TS ───────── */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle eyebrow="Quick checklist" title="Do’s and don’ts" />
          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {[
              { title: 'Do', list: dos, ok: true },
              { title: 'Don’t', list: donts, ok: false },
            ].map((col, c) => (
              <Reveal key={col.title} delay={c * 0.1}>
                <div className={`h-full rounded-[2rem] p-8 ${col.ok ? 'bg-emerald-50 ring-1 ring-emerald-100' : 'bg-red-50 ring-1 ring-red-100'}`}>
                  <h3 className={`flex items-center gap-3 text-2xl font-extrabold ${col.ok ? 'text-emerald-700' : 'text-red-600'}`}>
                    <span className={`grid h-10 w-10 place-items-center rounded-full text-white ${col.ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
                      {col.ok ? <Check className="h-5 w-5" strokeWidth={3} /> : <X className="h-5 w-5" strokeWidth={3} />}
                    </span>
                    {col.title}
                  </h3>
                  <ul className="mt-6 space-y-3">
                    {col.list.map((t, i) => (
                      <motion.li
                        key={t}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 + i * 0.07 }}
                        className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 font-semibold text-ink-900 shadow-sm"
                      >
                        {col.ok ? <Check className="h-4 w-4 shrink-0 text-emerald-500" strokeWidth={3} /> : <X className="h-4 w-4 shrink-0 text-red-500" strokeWidth={3} />}
                        {t}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CALCULATOR ───────── */}
      <section id="calculator" className="relative scroll-mt-20 overflow-hidden bg-ink-900 py-24 text-white lg:py-32">
        <div className="grid-bg absolute inset-0" />
        <div className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-accent-500/15 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <SectionTitle
            light
            eyebrow="Volumetric weight"
            title="How much will my box weigh?"
            text="Couriers charge by space as well as weight. Enter your box size to see the chargeable weight."
          />
          <Reveal className="mt-14">
            <VolumetricCalculator />
          </Reveal>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="px-4 py-24 sm:px-6">
        <Reveal className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 rounded-[2rem] bg-slate-50 p-10 text-center ring-1 ring-slate-100 md:flex-row md:text-left">
          <div>
            <h3 className="text-2xl font-extrabold text-ink-900">Packed and ready?</h3>
            <p className="mt-1 text-slate-500">Get a quote or book a pickup — our team will take it from here.</p>
          </div>
          <Link to="/contact" className="group flex shrink-0 items-center gap-2 rounded-full bg-accent-500 px-7 py-4 font-bold text-white shadow-lg shadow-accent-500/25 transition-all hover:-translate-y-0.5 hover:bg-accent-600">
            Book a shipment <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>
    </>
  )
}
