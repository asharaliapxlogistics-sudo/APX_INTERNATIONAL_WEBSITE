import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, FileCheck2, MapPin, MapPinned, Plane, Truck } from 'lucide-react'
import Flag from './Flag'
import Reveal from './Reveal'
import SectionTitle from './SectionTitle'
import { offices } from '../data/site'

// Free Unsplash stock photo of the Manhattan skyline — swap for APX's own photo when available.
const PHOTO = 'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?auto=format&fit=crop&w=1200&q=80'

const usOffice = offices.find((o) => o.country === 'United States')

const points = [
  { icon: Plane, title: 'Flown into JFK', text: 'Air shipments from Pakistan land at John F. Kennedy International Airport, New York.' },
  { icon: FileCheck2, title: 'Customs support', text: 'Help with US customs documentation and clearance at JFK.' },
  { icon: Truck, title: 'Delivered across the USA', text: 'Onward delivery from New York to your customer’s door, anywhere in the country.' },
  ...(usOffice
    ? [{ icon: MapPin, title: 'A team in the US', text: `Our US branch office in ${usOffice.address[1].replace(/\s*\d{5}(-\d{4})?$/, '')} is on hand to help.` }]
    : []),
]

/** Home page section about New York's JFK airport, APX's gateway into the USA. */
export default function JfkGateway() {
  return (
    <section className="overflow-hidden py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2">
        {/* Photo with the KHI → JFK route */}
        <Reveal className="relative">
          <div className="group relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-ink-900 shadow-2xl shadow-ink-900/20">
            <img
              src={PHOTO}
              alt="New York skyline"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/20 to-transparent" />

            <span className="absolute top-5 left-5 flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-2 text-xs font-bold text-white backdrop-blur-md">
              <Flag code="us" className="h-3" /> New York · JFK
            </span>

            <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/15 bg-ink-950/60 p-5 text-white backdrop-blur-md">
              <div className="flex items-center justify-between text-sm font-extrabold">
                <span className="flex items-center gap-2">
                  <Flag code="pk" className="h-3.5" /> KHI
                </span>
                <span className="flex items-center gap-2">
                  JFK <Flag code="us" className="h-3.5" />
                </span>
              </div>
              <div className="relative mt-3 h-6">
                <span className="absolute inset-x-0 top-1/2 border-t-2 border-dashed border-white/30" />
                <motion.span
                  className="absolute top-1/2 -translate-y-1/2"
                  initial={{ left: '0%' }}
                  animate={{ left: ['0%', '92%'] }}
                  transition={{ duration: 4, repeat: Infinity, repeatDelay: 0.6, ease: 'easeInOut' }}
                >
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-accent-500 shadow-lg shadow-accent-500/50">
                    <Plane className="h-3.5 w-3.5" />
                  </span>
                </motion.span>
              </div>
              <p className="mt-2 text-xs text-slate-300">John F. Kennedy International Airport, New York</p>
            </div>
          </div>
        </Reveal>

        <div>
          <SectionTitle
            center={false}
            eyebrow="USA gateway"
            title="Pakistan to New York, via JFK"
            text="Shipping to the United States? Your parcels fly into New York’s JFK airport, clear customs and continue to their final address anywhere in the USA."
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {points.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="group h-full rounded-2xl border border-slate-100 p-5 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-ink-900/5">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-500/10 text-accent-500 transition-colors group-hover:bg-accent-500 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-bold text-ink-900">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to={`/contact?service=${encodeURIComponent('International Courier')}`}
              className="group inline-flex items-center gap-2 rounded-full bg-accent-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-accent-500/25 transition-all hover:-translate-y-0.5 hover:bg-accent-600"
            >
              Get a USA quote <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/tracking" className="inline-flex items-center gap-2 font-bold text-ink-900 hover:text-accent-500">
              <MapPinned className="h-4 w-4" /> Track a shipment
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
