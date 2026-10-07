import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Ban,
  Check,
  ChevronRight,
  FileText,
  Gift,
  MapPinned,
  Minus,
  Plus,
  Shirt,
  ShoppingBag,
} from 'lucide-react'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import { services } from '../data/site'
import { scrollToElement } from '../lib/smoothScroll'

const img = (id: string, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`
const ease = [0.22, 1, 0.36, 1] as const

const industries = [
  { icon: ShoppingBag, title: 'E-commerce', text: 'Cross-border parcels for online sellers, with COD and returns support.' },
  { icon: Shirt, title: 'Garments & Textiles', text: 'Samples and bulk export shipments for Pakistan’s textile industry.' },
  { icon: FileText, title: 'Documents', text: 'Fast, trackable delivery for legal, business and personal papers.' },
  { icon: Gift, title: 'Personal & Gifts', text: 'Send gifts and personal effects to family anywhere in the world.' },
]

const faqs = [
  { q: 'Which countries do you deliver to?', a: 'APX delivers to more than 200 countries and territories through our own hubs in Pakistan, the UK, the USA and Canada, plus our international partner network.' },
  { q: 'How can I track my shipment?', a: 'Use the tracking number on your booking receipt on our Tracking page, or log in to the customer portal to see every shipment and its latest status in one place.' },
  { q: 'Do you handle customs clearance?', a: 'Yes. Our team prepares the documentation and supports clearance at origin and destination. Duties and taxes depend on the destination country and the goods being shipped.' },
  { q: 'How is the shipping price calculated?', a: 'Pricing depends on the destination, the service you choose and the chargeable weight — the higher of actual weight and volumetric weight. Contact us for an exact quote.' },
  { q: 'Which items cannot be shipped?', a: 'Dangerous goods, flammables, cash, narcotics and other restricted items cannot be shipped. Rules vary by country — see our Prohibited Items page or check with our team before booking.' },
  { q: 'Do you offer door pickup?', a: 'Yes — we can collect your shipment from your home or office. Call us or request a pickup through the contact form.' },
]

export default function Services() {
  const { hash } = useLocation()
  const [active, setActive] = useState(services[0].slug)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  useEffect(() => {
    if (!hash) return
    const el = document.querySelector(hash)
    if (el instanceof HTMLElement) setTimeout(() => scrollToElement(el), 300)
  }, [hash])

  // Scroll-spy: highlight the service currently under the sticky tab bar.
  useEffect(() => {
    const onScroll = () => {
      let current = services[0].slug
      for (const s of services) {
        const el = document.getElementById(s.slug)
        if (el && el.getBoundingClientRect().top < 260) current = s.slug
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ───────── HERO ───────── */}
      <section className="relative overflow-hidden bg-ink-950 pt-40 pb-28 text-white lg:pt-48 lg:pb-36">
        <img src={img('1578575437130-527eed3abbec', 1800)} alt="" className="absolute inset-0 h-full w-full scale-105 object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <motion.nav initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-1.5 text-sm text-slate-400">
            <Link to="/" className="hover:text-white">Home</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-accent-400">Services</span>
          </motion.nav>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease }}
            className="mt-5 max-w-3xl text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Logistics solutions for <span className="text-accent-500">every shipment</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300"
          >
            From a single document to full containers — international courier, freight, transport, domestic express and
            warehousing under one roof.
          </motion.p>

          {/* Service cards */}
          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {services.map((s, i) => (
              <motion.a
                key={s.slug}
                href={`#${s.slug}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.08, duration: 0.6, ease }}
                className="group rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-accent-500/60 hover:bg-white/10"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-500/15 text-accent-400 transition-colors group-hover:bg-accent-500 group-hover:text-white">
                  <s.icon className="h-5 w-5" />
                </span>
                <p className="mt-3 text-sm leading-snug font-bold">{s.title}</p>
                <p className="mt-1 flex items-center gap-1 text-xs text-slate-400 group-hover:text-accent-400">
                  Explore <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs stay pinned only while the service sections are on screen */}
      <div>
        {/* ───────── STICKY TABS ───────── */}
        <div className="sticky top-[72px] z-30 sm:top-[80px] border-b border-slate-100 bg-white/90 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2 [scrollbar-width:none] sm:px-6">
            {services.map((s) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                className={`relative flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  active === s.slug ? 'text-white' : 'text-slate-500 hover:text-ink-900'
                }`}
              >
                {active === s.slug && (
                  <motion.span layoutId="svc-tab" className="absolute inset-0 -z-10 rounded-full bg-ink-900" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
                )}
                <s.icon className="h-4 w-4" /> {s.title}
              </a>
            ))}
          </div>
        </div>

        {/* ───────── SERVICES ───────── */}
        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl space-y-28 px-4 sm:px-6 lg:space-y-40">
            {services.map((s, i) => (
              <div id={s.slug} key={s.slug} className="grid scroll-mt-40 items-center gap-12 lg:grid-cols-2 lg:gap-20">
                <Reveal className={`relative ${i % 2 ? 'lg:order-2' : ''}`}>
                  <div className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-ink-900 shadow-2xl shadow-ink-900/20">
                    <img
                      src={img(s.image)}
                      alt={s.title}
                      loading="lazy"
                      style={s.imagePosition ? { objectPosition: s.imagePosition } : undefined}
                      className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
                    <span className="absolute top-5 left-5 grid h-12 w-12 place-items-center rounded-2xl bg-white/15 text-white backdrop-blur-md">
                      <s.icon className="h-6 w-6" />
                    </span>
                    <span className="absolute right-6 bottom-3 text-7xl font-extrabold text-white/20">0{i + 1}</span>
                  </div>

                  {/* Floating stat */}
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6, ease }}
                    className={`absolute -bottom-8 ${i % 2 ? 'right-4 xl:-right-4 2xl:-right-8' : 'left-4 xl:-left-4 2xl:-left-8'}`}
                  >
                    <div className="animate-float rounded-2xl bg-white p-4 pr-6 shadow-2xl ring-1 shadow-ink-900/15 ring-slate-100">
                      <p className="text-2xl font-extrabold text-ink-900">{s.stat.value}</p>
                      <p className="text-xs font-semibold text-slate-500">{s.stat.label}</p>
                      <span className="mt-2 block h-1 w-10 rounded-full bg-accent-500" />
                    </div>
                  </motion.div>
                </Reveal>

                <Reveal delay={0.15}>
                  <span className="inline-flex items-center gap-2 rounded-full bg-accent-500/10 px-3 py-1 text-xs font-bold tracking-widest text-accent-500 uppercase">
                    Service 0{i + 1}
                  </span>
                  <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">{s.title}</h2>
                  <p className="mt-5 text-lg leading-relaxed text-slate-500">{s.description}</p>
                  <ul className="mt-8 grid gap-3 sm:grid-cols-1">
                    {s.points.map((p, k) => (
                      <motion.li
                        key={p}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.25 + k * 0.1 }}
                        className="flex items-center gap-3 rounded-xl border border-slate-100 px-4 py-3 font-semibold text-ink-900"
                      >
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-500 text-white">
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        </span>
                        {p}
                      </motion.li>
                    ))}
                  </ul>
                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <Link
                      to={`/contact?service=${encodeURIComponent(s.title)}`}
                      className="group inline-flex items-center gap-2 rounded-full bg-accent-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-accent-500/25 transition-all hover:-translate-y-0.5 hover:bg-accent-600"
                    >
                      Request a quote <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link to="/tracking" className="inline-flex items-center gap-2 font-bold text-ink-900 hover:text-accent-500">
                      <MapPinned className="h-4 w-4" /> Track a shipment
                    </Link>
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ───────── INDUSTRIES ───────── */}
      <section className="relative overflow-hidden bg-ink-900 py-24 text-white lg:py-32">
        <div className="grid-bg absolute inset-0" />
        <div className="absolute -top-32 right-0 h-96 w-96 rounded-full bg-accent-500/15 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle light eyebrow="Industries we serve" title="Trusted by businesses of every kind" />
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((ind, i) => (
              <Reveal key={ind.title} delay={i * 0.07}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-accent-500/50">
                  <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-accent-500/0 blur-2xl transition-colors duration-500 group-hover:bg-accent-500/30" />
                  <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-accent-400 transition-all duration-500 group-hover:rotate-6 group-hover:bg-accent-500 group-hover:text-white">
                    <ind.icon className="h-6 w-6" />
                  </span>
                  <h3 className="relative mt-6 text-xl font-bold">{ind.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-slate-400">{ind.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <SectionTitle
              center={false}
              eyebrow="FAQ"
              title="Questions, answered"
              text="Can’t find what you’re looking for? Our team is happy to help."
            />
            <Reveal delay={0.1}>
              <Link to="/contact" className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3.5 font-bold text-white transition-colors hover:bg-accent-500">
                Ask our team <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/packaging" className="mt-4 flex items-center gap-2 font-bold text-ink-900 hover:text-accent-500">
                <FileText className="h-4 w-4" /> Read our packaging guide
              </Link>
              <Link to="/prohibited-items" className="mt-3 flex items-center gap-2 font-bold text-ink-900 hover:text-accent-500">
                <Ban className="h-4 w-4" /> Check prohibited items
              </Link>
            </Reveal>
          </div>
          <div className="space-y-3 lg:col-span-3">
            {faqs.map((f, i) => {
              const open = openFaq === i
              return (
                <Reveal key={f.q} delay={i * 0.05}>
                  <div className={`overflow-hidden rounded-2xl border transition-colors ${open ? 'border-accent-500/40 bg-accent-500/[0.03]' : 'border-slate-200'}`}>
                    <button
                      onClick={() => setOpenFaq(open ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                      aria-expanded={open}
                    >
                      <span className="font-bold text-ink-900">{f.q}</span>
                      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors ${open ? 'bg-accent-500 text-white' : 'bg-slate-100 text-ink-900'}`}>
                        {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease }}
                        >
                          <p className="px-6 pb-6 leading-relaxed text-slate-500">{f.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ───────── CTA ───────── */}
      <section className="px-4 pb-24 sm:px-6">
        <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-ink-900 text-white">
          <img src={img('1570710891163-6d3b5c47248b', 1600)} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/85 to-ink-900/40" />
          <div className="relative flex flex-col items-start justify-between gap-8 px-8 py-14 sm:px-14 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Not sure which service you need?</h2>
              <p className="mt-3 max-w-lg text-slate-300">Tell us what you’re shipping and where — we’ll recommend the fastest, most cost-effective option.</p>
            </div>
            <Link
              to="/contact"
              className="group flex shrink-0 items-center gap-2 rounded-full bg-accent-500 px-7 py-4 font-bold shadow-xl shadow-accent-500/30 transition-all hover:-translate-y-0.5 hover:bg-accent-600"
            >
              Get a free quote <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  )
}
