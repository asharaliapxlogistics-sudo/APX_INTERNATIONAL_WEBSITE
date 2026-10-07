import Flag from '../components/Flag'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Award,
  BadgeCheck,
  ChevronRight,
  Eye,
  Gem,
  HeartHandshake,
  MapPin,
  Radar,
  Rocket,
  ShieldCheck,
  Target,
  Zap,
} from 'lucide-react'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import Counter from '../components/Counter'
import NetworkMap, { locations } from '../components/NetworkMap'
import ScrollRevealText from '../components/ScrollRevealText'
import { stats } from '../data/site'

// Free Unsplash stock photos — swap for APX's own photography when available.
const img = (id: string, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`
const photos = {
  aisle: img('1553413077-190dd305871c'),
  plane: img('1570710891163-6d3b5c47248b'),
  port: img('1578575437130-527eed3abbec', 1400),
  workers: img('1586528116022-aeda1613c63d', 1200),
  team: img('1661347232532-9376b989b51c'),
}

const timeline = [
  { year: '1990', title: 'APX is founded', text: 'Started in Karachi with a simple promise — deliver the best, every time.' },
  { year: '2005', title: 'Going global', text: 'Built a partner network that now reaches more than 200 countries.' },
  { year: '2012', title: 'Freight & cargo', text: 'Launched dedicated air and sea freight services for commercial cargo.' },
  { year: 'Expansion', title: 'UK, USA & Canada', text: 'Opened our own warehouses in the United Kingdom, United States and Canada for faster delivery across three continents.' },
  { year: 'Today', title: 'Award-winning logistics', text: 'Trusted by thousands of businesses and individuals worldwide.' },
]

const values = [
  { icon: HeartHandshake, title: 'Customer first', text: 'Customers are our most valuable asset — satisfaction and trust come before everything.' },
  { icon: ShieldCheck, title: 'Reliability', text: 'Secure handling and dependable delivery you can plan your business around.' },
  { icon: Zap, title: 'Speed', text: 'A constant push to be faster, better and more cost-effective.' },
  { icon: Gem, title: 'Integrity', text: 'We don’t just promise commitment — we invite you to see it for yourself.' },
]

const ease = [0.22, 1, 0.36, 1] as const

export default function About() {
  return (
    <>
      {/* ───────── HERO ───────── */}
      <section className="relative overflow-hidden bg-ink-900 pt-36 pb-24 text-white lg:pt-44 lg:pb-32">
        <div className="grid-bg absolute inset-0" />
        <div className="absolute -top-40 -right-32 h-[30rem] w-[30rem] rounded-full bg-brand-500/30 blur-3xl" />
        <div className="absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <motion.nav initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-1.5 text-sm text-slate-400">
              <Link to="/" className="hover:text-white">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-accent-400">About us</span>
            </motion.nav>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease }}
              className="mt-5 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
            >
              Three decades of <span className="text-accent-500">moving the world</span> forward.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300"
            >
              APX International is a trusted courier & logistics partner — connecting Pakistan and the Gulf to more
              than 200 countries since 1990.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="mt-10 grid max-w-lg grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur"
            >
              {[
                { v: 35, s: '+', l: 'Years' },
                { v: 200, s: '+', l: 'Countries' },
                { v: 4, s: '', l: 'Global hubs' },
              ].map((x) => (
                <div key={x.l} className="px-5 py-4">
                  <p className="text-3xl font-extrabold"><Counter to={x.v} suffix={x.s} /></p>
                  <p className="text-xs font-semibold text-slate-400">{x.l}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Photo collage */}
          <div className="relative grid h-[460px] grid-cols-5 grid-rows-2 gap-4 sm:h-[520px]">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1, ease }}
              className="col-span-3 row-span-2 overflow-hidden rounded-[2rem]"
            >
              <img src={photos.aisle} alt="APX warehouse aisle" className="h-full w-full object-cover" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 1, ease }}
              className="col-span-2 overflow-hidden rounded-[2rem]"
            >
              <img src={photos.plane} alt="Air cargo in flight" className="h-full w-full object-cover" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55, duration: 1, ease }}
              className="col-span-2 overflow-hidden rounded-[2rem]"
            >
              <img src={photos.port} alt="Container port" className="h-full w-full object-cover" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, type: 'spring' }}
              className="absolute -bottom-6 left-6 sm:-left-6"
            >
              <div className="animate-float flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 text-ink-900 shadow-2xl">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-500 text-white">
                  <Award className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-sm font-extrabold">IATA Accredited</span>
                  <span className="block text-xs text-slate-500">International air cargo agent</span>
                </span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: 'spring' }}
              className="absolute top-1/2 -right-2 -translate-y-1/2 sm:-right-6"
            >
              <div className="animate-float rounded-2xl bg-accent-500 px-4 py-3 text-center shadow-2xl shadow-accent-500/40 [animation-delay:2s]">
                <span className="block text-[10px] font-bold tracking-widest uppercase opacity-80">Since</span>
                <span className="block text-2xl font-extrabold">1990</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────── PURPOSE STATEMENT ───────── */}
      <section className="py-24 lg:py-36">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <p className="mb-8 text-sm font-bold tracking-widest text-accent-500 uppercase">Our purpose</p>
          <ScrollRevealText
            text="To make shipping from Pakistan and the Gulf to anywhere in the world fast, simple and secure — so every business can grow without borders."
            highlight={['fast', 'simple', 'secure']}
          />
        </div>
      </section>

      {/* ───────── WHO WE ARE ───────── */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal className="relative order-2 lg:order-1">
            <div className="overflow-hidden rounded-[2rem]">
              <img src={photos.workers} alt="APX team at work in the warehouse" loading="lazy" className="aspect-[4/3] w-full object-cover" />
            </div>
            <div className="relative -mt-20 grid gap-4 px-4 sm:grid-cols-2 sm:px-8">
              {[
                { icon: Target, title: 'Our Mission', text: 'Secure, reliable and cost-effective courier & logistics solutions tailored to every customer.', cls: 'bg-ink-900 text-white' },
                { icon: Eye, title: 'Our Vision', text: 'To be the most trusted logistics partner connecting Pakistan and the Gulf to the world.', cls: 'bg-accent-500 text-white' },
              ].map(({ icon: Icon, title, text, cls }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.15, duration: 0.7, ease }}
                  className={`rounded-3xl p-6 shadow-2xl shadow-ink-900/20 ${cls}`}
                >
                  <Icon className="h-8 w-8" />
                  <h3 className="mt-4 text-xl font-extrabold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed opacity-85">{text}</p>
                </motion.div>
              ))}
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <SectionTitle center={false} eyebrow="Who we are" title="Built on trust, driven by our customers" />
            <Reveal delay={0.1}>
              <div className="mt-6 space-y-5 leading-relaxed text-slate-600">
                <p>
                  At APX, we consider our customers our most valuable asset, and we prioritise two things above all:
                  <strong className="text-ink-900"> customer satisfaction and trust</strong>. That trust is earned
                  through first-hand experience — or recommendations from people who have already shipped with us.
                </p>
                <p>
                  We are dedicated to surpassing expectations, offering services that go above and beyond to grow a
                  base of satisfied customers. Our strategy is a constant search for new ways to make every shipment
                  faster, better and more cost-effective.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {['Door-to-door worldwide', 'Customs clearance experts', 'Own overseas warehouses', 'Dedicated account support'].map((t) => (
                  <li key={t} className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 text-sm font-semibold text-ink-900">
                    <BadgeCheck className="h-5 w-5 shrink-0 text-accent-500" /> {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── GLOBAL NETWORK ───────── */}
      <section className="relative overflow-hidden bg-ink-950 py-24 text-white lg:py-32">
        <div className="absolute top-0 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div>
            <SectionTitle
              light
              center={false}
              eyebrow="Global network"
              title="A worldwide network, every continent covered"
              text="Our head office in Karachi, UK office at Heathrow and warehouses in the USA and Canada connect to a delivery network spanning 200+ countries — from Tokyo to São Paulo, Lagos to Sydney."
            />
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="border-l-2 border-accent-500 pl-4">
                  <p className="text-3xl font-extrabold"><Counter to={s.value} suffix={s.suffix} /></p>
                  <p className="mt-1 text-xs text-slate-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <Reveal className="mt-16">
            <NetworkMap />
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs font-semibold text-slate-400">
              <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full border-2 border-white bg-accent-500" /> Head office</span>
              <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full border-2 border-white bg-brand-400" /> APX hubs & warehouses</span>
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-white" /> Delivery destinations — 200+ countries</span>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {locations.map((l, i) => (
              <Reveal key={l.key} delay={i * 0.08}>
                <div
                  className={`group h-full rounded-2xl border p-5 transition-all hover:-translate-y-1 ${
                    'hq' in l ? 'border-accent-500/50 bg-accent-500/10' : 'border-white/10 bg-white/5 hover:border-white/25'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Flag code={l.flag} className="h-7" />
                    <MapPin className={`h-4 w-4 ${'hq' in l ? 'text-accent-400' : 'text-slate-500'}`} />
                  </div>
                  <p className="mt-4 text-lg font-bold">{l.city}</p>
                  <p className="text-xs text-slate-400">{l.country}</p>
                  <span
                    className={`mt-4 inline-block rounded-full px-2.5 py-1 text-[11px] font-bold ${
                      'hq' in l ? 'bg-accent-500 text-white' : 'bg-white/10 text-slate-300'
                    }`}
                  >
                    {l.role}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── WHY APX (BENTO) ───────── */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle eyebrow="Why APX" title="Everything your shipment needs, under one roof" />
          <div className="mt-16 grid auto-rows-[240px] gap-5 md:grid-cols-4">
            <Reveal className="group relative overflow-hidden rounded-[2rem] md:col-span-2 md:row-span-2">
              <img src={photos.port} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                <span className="rounded-full bg-accent-500 px-3 py-1 text-xs font-bold">Air · Sea · Road</span>
                <h3 className="mt-4 text-3xl font-extrabold">End-to-end freight, fully managed</h3>
                <p className="mt-2 max-w-md text-sm text-slate-300">
                  Booking, documentation, customs and last-mile delivery — handled by one team, tracked in one place.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="group relative overflow-hidden rounded-[2rem]">
              <img src={photos.plane} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 to-transparent" />
              <div className="absolute bottom-0 p-6 text-white">
                <p className="text-3xl font-extrabold">200+</p>
                <p className="text-sm text-slate-300">Countries in our express network</p>
              </div>
            </Reveal>

            <Reveal delay={0.15} className="flex flex-col justify-between rounded-[2rem] bg-ink-900 p-6 text-white">
              <Award className="h-9 w-9 text-accent-400" />
              <div>
                <h3 className="text-xl font-extrabold">IATA Accredited</h3>
                <p className="mt-1 text-sm text-slate-400">Certified international air cargo agent.</p>
              </div>
            </Reveal>

            <Reveal delay={0.2} className="flex flex-col justify-between rounded-[2rem] bg-accent-500 p-6 text-white">
              <Radar className="h-9 w-9" />
              <div>
                <h3 className="text-xl font-extrabold">Real-time tracking</h3>
                <p className="mt-1 text-sm text-white/85">Every status, from pickup to proof of delivery.</p>
              </div>
            </Reveal>

            <Reveal delay={0.25} className="group relative overflow-hidden rounded-[2rem]">
              <img src={photos.aisle} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 to-transparent" />
              <div className="absolute bottom-0 p-6 text-white">
                <p className="text-lg leading-snug font-extrabold">Own warehouses in UK, USA & Canada</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────── TIMELINE ───────── */}
      <section className="relative overflow-hidden bg-ink-900 py-24 text-white lg:py-32">
        <div className="grid-bg absolute inset-0" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
          <SectionTitle light eyebrow="Our journey" title="Three decades of moving the world" />
          <div className="relative mt-16">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
              className="absolute top-0 bottom-0 left-5 w-0.5 origin-top bg-gradient-to-b from-accent-500 to-brand-400 md:left-1/2"
            />
            <div className="space-y-12">
              {timeline.map((t, i) => (
                <Reveal key={t.year} delay={i * 0.1}>
                  <div className={`relative flex items-start gap-8 md:w-1/2 ${i % 2 ? 'md:ml-auto md:pl-12' : 'md:pr-12 md:text-right'}`}>
                    <span
                      className={`absolute top-1 left-5 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-ink-900 bg-accent-500 ring-4 ring-accent-500/20 ${
                        i % 2 ? 'md:left-0' : 'md:right-0 md:left-auto md:translate-x-1/2'
                      }`}
                    />
                    <div className="flex-1 pl-12 md:pl-0">
                      <span className="text-sm font-bold text-accent-400">{t.year}</span>
                      <h3 className="mt-1 text-xl font-bold">{t.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">{t.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────── VALUES ───────── */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle eyebrow="Our values" title="What every APX shipment stands for" />
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="group relative h-full overflow-hidden rounded-3xl border border-slate-100 p-8 transition-all hover:-translate-y-1 hover:border-transparent hover:shadow-2xl hover:shadow-ink-900/10">
                  <span className="absolute -top-4 -right-2 text-8xl font-extrabold text-slate-50 transition-colors group-hover:text-accent-500/10">
                    0{i + 1}
                  </span>
                  <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition-all group-hover:scale-110 group-hover:bg-accent-500 group-hover:text-white">
                    <v.icon className="h-6 w-6" />
                  </span>
                  <h3 className="relative mt-6 text-lg font-bold text-ink-900">{v.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-slate-500">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* CTA with team photo */}
          <Reveal className="relative mt-24 overflow-hidden rounded-[2.5rem] bg-ink-900 text-white">
            <div className="grid items-center md:grid-cols-5">
              <div className="relative p-10 sm:p-14 md:col-span-3">
                <div className="grid-bg absolute inset-0" />
                <div className="relative">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent-500">
                    <Rocket className="h-6 w-6" />
                  </span>
                  <h3 className="mt-6 text-3xl font-extrabold sm:text-4xl">See our commitment first-hand</h3>
                  <p className="mt-3 max-w-md text-slate-300">
                    Book your next shipment with APX and see how we don’t just meet our promises — we exceed them.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link to="/contact" className="group flex items-center gap-2 rounded-full bg-accent-500 px-6 py-3.5 font-bold transition-colors hover:bg-accent-600">
                      Get started <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link to="/services" className="rounded-full border border-white/20 px-6 py-3.5 font-bold transition-colors hover:bg-white/10">
                      Our services
                    </Link>
                  </div>
                </div>
              </div>
              <div className="relative h-72 md:col-span-2 md:h-full md:min-h-[420px]">
                <img src={photos.team} alt="APX team with parcels" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-transparent to-transparent" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
