import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Award,
  Clock,
  Globe2,
  ShieldCheck,
  Headset,
  BadgeCheck,
  PackagePlus,
  Truck,
  MapPinned,
  Star,
  LayoutDashboard,
} from 'lucide-react'
import GlobeRoutes from '../components/GlobeRoutes'
import TrackBox from '../components/TrackBox'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import Counter from '../components/Counter'
import PortalMockup from '../components/PortalMockup'
import VideoShowcase from '../components/VideoShowcase'
import { company, services, stats } from '../data/site'

const trust = [
  'IATA Accredited',
  '200+ Countries',
  'Since 1990',
  'Pakistan & UK Offices',
  'Door-to-Door Delivery',
  'Customs Clearance',
  'Air & Sea Freight',
  '24/7 Support',
]

const steps = [
  { icon: PackagePlus, title: 'Book a shipment', text: 'Call us, email us or book through the customer portal in minutes.' },
  { icon: Truck, title: 'We pick it up', text: 'Our team collects your parcel from your door — packed and labelled.' },
  { icon: MapPinned, title: 'Track every move', text: 'Follow your shipment in real time from origin to destination.' },
  { icon: BadgeCheck, title: 'Delivered safely', text: 'On-time delivery with proof of delivery, anywhere in the world.' },
]

const testimonials = [
  { name: 'Ahmed R.', role: 'E-commerce seller, Karachi', text: 'APX has handled our international orders for years. Parcels reach the UK and US fast and customers are always kept informed.' },
  { name: 'Sara K.', role: 'Operations Manager, London', text: 'Their freight team made our cargo movement completely stress-free — documentation, clearance, everything was handled.' },
  { name: 'Bilal H.', role: 'Exporter, Lahore', text: 'Reliable, responsive and genuinely cost-effective. APX is the first courier we call for urgent shipments.' },
]

export default function Home() {
  return (
    <>
      {/* ───────── HERO ───────── */}
      <section className="relative overflow-hidden bg-ink-900 pt-32 pb-20 text-white lg:pt-40 lg:pb-28">
        <div className="grid-bg absolute inset-0" />
        <div className="absolute -top-48 -left-40 h-[36rem] w-[36rem] rounded-full bg-brand-600/25 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-accent-500/15 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-slate-300 backdrop-blur"
            >
              <Award className="h-4 w-4 text-accent-400" /> Award-winning logistics · Since {company.since}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              Hassle-free delivery, <span className="text-gradient">anywhere</span> in the world.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300"
            >
              Secure, reliable and trusted international courier, freight & cargo services — connecting Pakistan to the UK, USA,
              Canada and 200+ countries.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-8 max-w-xl"
            >
              <TrackBox />
              <p className="mt-3 text-xs text-slate-400">Try any number, e.g. <span className="font-mono text-slate-300">APX20490</span></p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/contact"
                className="group flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-ink-900 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-white/10"
              >
                Get a Quote <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/services"
                className="flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
              >
                Our Services
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <GlobeRoutes />
          </motion.div>
        </div>
      </section>

      {/* ───────── TRUST MARQUEE ───────── */}
      <section className="overflow-hidden border-b border-slate-100 bg-white py-6">
        <div className="animate-marquee flex w-max gap-12 hover:[animation-play-state:paused]">
          {[...trust, ...trust].map((t, i) => (
            <span key={i} className="flex items-center gap-3 text-sm font-bold whitespace-nowrap text-slate-400 uppercase tracking-widest">
              <span className="h-2 w-2 rotate-45 bg-accent-500" /> {t}
            </span>
          ))}
        </div>
      </section>

      {/* ───────── ABOUT PREVIEW ───────── */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="group relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[2rem] bg-ink-900 shadow-2xl shadow-ink-900/30">
              {/* Stock photo (Unsplash) — swap for a real APX team photo when available */}
              <img
                src="https://images.unsplash.com/photo-1661347232532-9376b989b51c?auto=format&fit=crop&w=900&q=80"
                alt="APX team with parcels ready for dispatch"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent" />
              <div className="absolute top-5 left-5 rounded-2xl border border-white/15 bg-ink-950/50 px-3 py-2 backdrop-blur-md">
                <img src="/apx-logo-light.svg" alt="APX" className="h-8 w-auto" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent-400">Our promise</p>
                <p className="mt-2 text-xl leading-snug font-extrabold sm:text-2xl">
                  “Customer satisfaction and trust — above everything else.”
                </p>
              </div>
            </div>

            {/* Floating chips */}
            {[
              { icon: ShieldCheck, label: 'Secure handling', cls: 'top-[38%] right-2 sm:right-0 lg:-right-6', delay: 0.3 },
              { icon: Headset, label: '24/7 support', cls: 'top-[54%] right-4 lg:-right-2', delay: 0.5 },
            ].map(({ icon: Icon, label, cls, delay }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay, type: 'spring', stiffness: 120 }}
                className={`absolute ${cls}`}
              >
                <div className="animate-float flex items-center gap-2.5 rounded-full bg-white py-2.5 pr-5 pl-2.5 shadow-xl shadow-ink-900/10 ring-1 ring-slate-100" style={{ animationDelay: `${delay * 4}s` }}>
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-accent-500/10 text-accent-500">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-bold text-ink-900">{label}</span>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="absolute -top-6 right-2 rounded-3xl bg-accent-500 p-5 text-white shadow-2xl shadow-accent-500/40 sm:right-0 lg:-right-6"
            >
              <p className="text-5xl font-extrabold"><Counter to={35} />+</p>
              <p className="text-sm font-semibold">Years of trust</p>
            </motion.div>
          </Reveal>

          <div>
            <SectionTitle
              center={false}
              eyebrow="About APX"
              title="Trusted courier & logistics partner since 1990"
              text="APX is the leading provider of secure, reliable and trusted courier & logistics services worldwide. We deliver seamless transportation solutions tailored to the unique needs of every business — and we’re always finding ways to be faster, better and more cost-effective."
            />
            <div className="mt-10 space-y-5">
              {[
                { icon: Clock, title: 'On Time Delivery', text: 'Comprehensive solutions tailored to the specific needs of every business.' },
                { icon: Globe2, title: 'Global Service', text: 'Seamless global solutions for a truly world-class experience.' },
              ].map(({ icon: Icon, title, text }, i) => (
                <Reveal key={title} delay={i * 0.1}>
                  <div className="group flex gap-5 rounded-2xl border border-slate-100 p-5 transition-all hover:border-brand-100 hover:shadow-xl hover:shadow-brand-600/5">
                    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-ink-900">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-500">{text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2}>
              <Link to="/about" className="group mt-8 inline-flex items-center gap-2 font-bold text-brand-600">
                More about us <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── SERVICES ───────── */}
      <section className="bg-slate-50 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle
            eyebrow="What we do"
            title="Services built to move your business"
            text="A network covering 200+ countries, backed by technology and people who keep you informed every step of the way."
          />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.08}>
                <Link
                  to={`/services#${s.slug}`}
                  className="group relative flex h-[26rem] flex-col justify-end overflow-hidden rounded-3xl bg-ink-900 text-white shadow-lg shadow-ink-900/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-ink-900/25"
                >
                  <img
                    src={`https://images.unsplash.com/photo-${s.image}?auto=format&fit=crop&w=800&q=75`}
                    alt={s.title}
                    loading="lazy"
                    style={s.imagePosition ? { objectPosition: s.imagePosition } : undefined}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-ink-950/10 transition-colors duration-500 group-hover:via-ink-950/70" />

                  <span className="absolute top-5 left-5 grid h-12 w-12 place-items-center rounded-2xl bg-white/15 backdrop-blur-md transition-colors duration-500 group-hover:bg-accent-500">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <span className="absolute top-4 right-6 text-6xl font-extrabold text-white/15">0{i + 1}</span>

                  <div className="relative p-7">
                    <h3 className="text-2xl font-extrabold">{s.title}</h3>
                    {/* Description slides open on hover (always shown on touch screens) */}
                    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 group-hover:grid-rows-[1fr] max-lg:grid-rows-[1fr]">
                      <p className="overflow-hidden text-sm leading-relaxed text-slate-300">
                        <span className="block pt-3">{s.short}</span>
                      </p>
                    </div>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-accent-400">
                      Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute bottom-0 left-7 h-1 w-0 rounded-full bg-accent-500 transition-all duration-500 group-hover:w-16" />
                  </div>
                </Link>
              </Reveal>
            ))}
            <Reveal delay={0.4} className="sm:col-span-2">
              <Link
                to="/contact"
                className="group relative flex h-[26rem] flex-col justify-between overflow-hidden rounded-3xl bg-accent-500 p-8 text-white transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent-500/30"
              >
                <div className="absolute -right-16 -bottom-16 h-56 w-56 rounded-full bg-white/10 transition-transform duration-700 group-hover:scale-125" />
                <div className="relative">
                  <h3 className="text-3xl font-extrabold">Need something custom?</h3>
                  <p className="mt-3 leading-relaxed text-white/85">
                    Tell us what you’re shipping and we’ll build the right solution for you.
                  </p>
                </div>
                <span className="relative inline-flex items-center gap-2 font-bold">
                  Talk to our team <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── VIDEO ───────── */}
      <VideoShowcase />

      {/* ───────── STATS ───────── */}
      <section className="relative overflow-hidden bg-ink-900 py-20 text-white">
        <div className="grid-bg absolute inset-0" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-10 px-4 sm:px-6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="text-center">
              <p className="text-5xl font-extrabold tracking-tight sm:text-6xl">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-400">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───────── CUSTOMER PORTAL PREVIEW ───────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-brand-50/60 to-white py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle
            eyebrow="Customer portal"
            title="Your shipments, all in one dashboard"
            text="Book shipments, follow every status from pickup to delivery, download invoices and track COD — anytime, from any device."
          />
          <Reveal delay={0.1} className="mt-8 flex flex-wrap justify-center gap-3">
            {[
              { icon: PackagePlus, label: 'Book in seconds' },
              { icon: MapPinned, label: 'Live status updates' },
              { icon: BadgeCheck, label: 'Proof of delivery' },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink-900 shadow-sm ring-1 ring-slate-100">
                <Icon className="h-4 w-4 text-accent-500" /> {label}
              </span>
            ))}
          </Reveal>

          <div className="mx-auto mt-16 max-w-6xl">
            <PortalMockup />
          </div>

          <Reveal className="mt-14 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/login"
              className="group flex items-center gap-2 rounded-full bg-accent-500 px-7 py-3.5 font-bold text-white shadow-lg shadow-accent-500/30 transition-all hover:-translate-y-0.5 hover:bg-accent-600"
            >
              <LayoutDashboard className="h-5 w-5" /> Open Customer Portal
            </Link>
            <Link to="/tracking" className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 font-bold text-ink-900 transition-colors hover:bg-slate-50">
              Track a shipment <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ───────── HOW IT WORKS ───────── */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle eyebrow="How it works" title="Shipping with APX in four simple steps" />
          <div className="relative mt-16 grid grid-cols-2 gap-x-4 gap-y-12 md:mt-20 md:grid-cols-4 md:gap-6">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
              className="absolute top-8 right-[12%] left-[12%] hidden h-0.5 origin-left bg-gradient-to-r from-accent-500 via-brand-500 to-accent-500 md:block"
            />
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={0.3 + i * 0.2} className="relative text-center">
                <span className="relative mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-white text-brand-600 shadow-xl ring-1 shadow-brand-600/10 ring-slate-100">
                  <s.icon className="h-7 w-7" />
                  <span className="absolute -top-2 -right-2 grid h-6 w-6 place-items-center rounded-full bg-accent-500 text-xs font-bold text-white">
                    {i + 1}
                  </span>
                </span>
                <h3 className="mt-6 text-lg font-bold text-ink-900">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-[16rem] text-sm leading-relaxed text-slate-500">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── TESTIMONIALS ───────── */}
      <section className="bg-slate-50 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle eyebrow="Testimonials" title="Businesses that ship with confidence" />
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1}>
                <figure className="flex h-full flex-col rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-xl">
                  <div className="flex gap-1 text-accent-500">
                    {Array.from({ length: 5 }).map((_, k) => (
                      <Star key={k} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-5 flex-1 leading-relaxed text-slate-600">“{t.text}”</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-ink-900 font-bold text-white">
                      {t.name[0]}
                    </span>
                    <span>
                      <span className="block font-bold text-ink-900">{t.name}</span>
                      <span className="block text-xs text-slate-500">{t.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
