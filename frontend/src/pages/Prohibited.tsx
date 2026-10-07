import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  AlertTriangle,
  ArrowRight,
  Ban,
  Banknote,
  BatteryCharging,
  Bomb,
  ChevronRight,
  Cigarette,
  Cookie,
  Copy,
  Droplets,
  Fish,
  Flame,
  FlaskConical,
  Gem,
  Globe2,
  Magnet,
  MessageCircle,
  PawPrint,
  Pill,
  Radiation,
  Search,
  Smartphone,
  SprayCan,
  Sprout,
  Sword,
  Syringe,
  Wine,
  type LucideIcon,
} from 'lucide-react'
import Reveal from '../components/Reveal'
import SectionTitle from '../components/SectionTitle'
import { ArtProhibited } from '../components/PackArt'
import { scrollToElement } from '../lib/smoothScroll'

const ease = [0.22, 1, 0.36, 1] as const

type Status = 'prohibited' | 'restricted'
type Item = { name: string; icon: LucideIcon; status: Status; note: string; keywords: string }

const items: Item[] = [
  // Not allowed at all
  { name: 'Cash & currency', icon: Banknote, status: 'prohibited', note: 'Bank notes, coins, cheques and other negotiable instruments.', keywords: 'money cash currency notes coins cheque bond' },
  { name: 'Weapons & ammunition', icon: Sword, status: 'prohibited', note: 'Firearms, parts, replicas, knives, ammunition and any weapon.', keywords: 'gun pistol knife sword weapon ammo bullets replica' },
  { name: 'Explosives & fireworks', icon: Bomb, status: 'prohibited', note: 'Fireworks, flares, party poppers, gunpowder or anything explosive.', keywords: 'fireworks crackers explosive gunpowder flare' },
  { name: 'Drugs & narcotics', icon: Syringe, status: 'prohibited', note: 'Illegal drugs and controlled substances of any kind.', keywords: 'drugs narcotics charas hashish cannabis weed' },
  { name: 'Flammable liquids & gases', icon: Flame, status: 'prohibited', note: 'Petrol, lighter fluid, paint thinner, gas cylinders and lighters.', keywords: 'petrol fuel gas cylinder lighter thinner kerosene' },
  { name: 'Toxic & corrosive chemicals', icon: FlaskConical, status: 'prohibited', note: 'Acids, bleach, pesticides, poisons and other hazardous chemicals.', keywords: 'acid bleach chemical poison pesticide' },
  { name: 'Radioactive material', icon: Radiation, status: 'prohibited', note: 'Any radioactive or nuclear material.', keywords: 'radioactive nuclear uranium' },
  { name: 'Live animals', icon: PawPrint, status: 'prohibited', note: 'Pets, birds, insects or any living creature.', keywords: 'animal pet bird cat dog fish insect' },
  { name: 'Gold, jewellery & gems', icon: Gem, status: 'prohibited', note: 'Precious metals, loose stones and high-value jewellery.', keywords: 'gold silver jewellery jewelry diamond gem stones' },
  { name: 'Counterfeit goods', icon: Copy, status: 'prohibited', note: 'Fake or copied branded products and pirated media.', keywords: 'fake copy replica counterfeit pirated' },
  { name: 'Perishable food', icon: Fish, status: 'prohibited', note: 'Fresh meat, fish, dairy and anything that needs refrigeration.', keywords: 'meat fish milk dairy fresh food frozen' },
  { name: 'Alcohol', icon: Wine, status: 'prohibited', note: 'Wine, beer, spirits and any alcoholic drink.', keywords: 'alcohol wine beer liquor whisky vodka spirits' },
  { name: 'Tobacco & e-cigarettes', icon: Cigarette, status: 'prohibited', note: 'Cigarettes, vapes, e-liquids, shisha and all tobacco products.', keywords: 'cigarette tobacco vape e-cigarette e-liquid shisha hookah naswar cigar' },

  // Allowed only with conditions
  { name: 'Lithium batteries', icon: BatteryCharging, status: 'restricted', note: 'Accepted only when installed in the device. Loose and spare batteries or power banks are not accepted.', keywords: 'battery batteries lithium power bank cell' },
  { name: 'Phones & laptops', icon: Smartphone, status: 'restricted', note: 'Accepted with the battery inside, switched off and well protected.', keywords: 'mobile phone laptop tablet electronics' },
  { name: 'Perfume & aftershave', icon: Droplets, status: 'restricted', note: 'Alcohol-based fragrance ships under special rules and limited quantities.', keywords: 'perfume attar fragrance cologne aftershave scent' },
  { name: 'Aerosols & sprays', icon: SprayCan, status: 'restricted', note: 'Deodorant and other pressurised sprays are usually not accepted by air.', keywords: 'spray deodorant aerosol body spray' },
  { name: 'Medicines', icon: Pill, status: 'restricted', note: 'Personal-use quantities with a copy of the prescription. Some medicines are banned in certain countries.', keywords: 'medicine tablets medication pharma drugs prescription' },
  { name: 'Packaged food', icon: Cookie, status: 'restricted', note: 'Sealed, factory-packed and labelled dry food only — sweets, spices, snacks.', keywords: 'food sweets mithai spices masala snacks biscuits dry' },
  { name: 'Seeds & plants', icon: Sprout, status: 'restricted', note: 'Need a phytosanitary certificate for most destinations.', keywords: 'seeds plants soil flowers' },
  { name: 'Magnets & speakers', icon: Magnet, status: 'restricted', note: 'Strong magnets need special packing and may need declaration.', keywords: 'magnet speaker' },
]

const meta: Record<Status, { label: string; badge: string; ring: string; icon: string }> = {
  prohibited: {
    label: 'Not allowed',
    badge: 'bg-red-500 text-white',
    ring: 'hover:border-red-200',
    icon: 'bg-red-50 text-red-500 group-hover:bg-red-500 group-hover:text-white',
  },
  restricted: {
    label: 'Restricted',
    badge: 'bg-amber-400 text-ink-900',
    ring: 'hover:border-amber-200',
    icon: 'bg-amber-50 text-amber-600 group-hover:bg-amber-400 group-hover:text-ink-900',
  },
}

const filters: { key: 'all' | Status; label: string }[] = [
  { key: 'all', label: 'All items' },
  { key: 'prohibited', label: 'Not allowed' },
  { key: 'restricted', label: 'Restricted' },
]

export default function Prohibited() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<'all' | Status>('all')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return items.filter(
      (i) =>
        (filter === 'all' || i.status === filter) &&
        (!q || i.name.toLowerCase().includes(q) || i.keywords.includes(q) || i.note.toLowerCase().includes(q)),
    )
  }, [query, filter])

  const counts = {
    all: items.length,
    prohibited: items.filter((i) => i.status === 'prohibited').length,
    restricted: items.filter((i) => i.status === 'restricted').length,
  }

  return (
    <>
      {/* ───────── HERO ───────── */}
      <section className="relative overflow-hidden bg-ink-900 pt-36 pb-24 text-white lg:pt-44 lg:pb-28">
        <div className="grid-bg absolute inset-0" />
        <div className="absolute -top-40 -right-32 h-[30rem] w-[30rem] rounded-full bg-accent-500/25 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <motion.nav initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-1.5 text-sm text-slate-400">
              <Link to="/" className="hover:text-white">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-accent-400">Prohibited items</span>
            </motion.nav>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease }}
              className="mt-5 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
            >
              What you <span className="text-accent-500">can’t</span> ship — and what needs care.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300"
            >
              Some items are dangerous in transit or banned by law. Check your item before booking to avoid delays,
              returns or confiscation at customs.
            </motion.p>

            {/* Search */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-8 flex max-w-xl items-center gap-2 rounded-2xl border border-white/15 bg-white/10 p-2 backdrop-blur-xl focus-within:border-accent-500/60"
            >
              <Search className="ml-3 h-5 w-5 shrink-0 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  const items = document.getElementById('items')
                  if (e.key === 'Enter' && items) scrollToElement(items)
                }}
                placeholder="Can I ship… perfume, battery, mithai?"
                className="min-w-0 flex-1 bg-transparent px-2 py-3 text-base text-white outline-none placeholder:text-slate-400"
              />
              <a href="#items" className="shrink-0 rounded-xl bg-accent-500 px-5 py-3 text-sm font-bold transition-colors hover:bg-accent-600">
                Check
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
              <ArtProhibited />
            </div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="absolute bottom-4 left-0 flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-ink-900 shadow-xl"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-red-500" /> {counts.prohibited} not allowed
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="absolute top-1/2 right-0 flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-ink-900 shadow-xl"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" /> {counts.restricted} restricted
            </motion.span>
          </motion.div>
        </div>
      </section>

      {/* ───────── ITEMS ───────── */}
      <section id="items" className="scroll-mt-24 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionTitle center={false} eyebrow="Item checker" title={query ? `Results for “${query}”` : 'Check before you ship'} />
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`relative rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                    filter === f.key ? 'text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {filter === f.key && (
                    <motion.span layoutId="prohib-filter" className="absolute inset-0 -z-10 rounded-full bg-ink-900" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />
                  )}
                  {f.label} <span className="opacity-60">{counts[f.key]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-2xl bg-red-50 p-4 ring-1 ring-red-100">
              <Ban className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
              <p className="text-sm text-slate-600"><strong className="text-red-600">Not allowed</strong> — we cannot accept these items to any destination.</p>
            </div>
            <div className="flex items-start gap-3 rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-100">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
              <p className="text-sm text-slate-600"><strong className="text-amber-600">Restricted</strong> — may be accepted with conditions. Ask our team before booking.</p>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((it) => {
                const m = meta[it.status]
                return (
                  <motion.div
                    key={it.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`group flex gap-4 rounded-3xl border border-slate-100 bg-white p-6 transition-shadow hover:shadow-xl hover:shadow-ink-900/5 ${m.ring}`}
                  >
                    <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl transition-colors ${m.icon}`}>
                      <it.icon className="h-6 w-6" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-ink-900">{it.name}</h3>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${m.badge}`}>{m.label}</span>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{it.note}</p>
                    </div>
                  </motion.div>
                )
              })}
          </div>

          {results.length === 0 && (
            <div className="mt-6 flex flex-col items-center rounded-3xl bg-slate-50 p-10 text-center ring-1 ring-slate-100">
              <MessageCircle className="h-10 w-10 text-brand-500" />
              <p className="mt-4 text-lg font-bold text-ink-900">“{query}” isn’t on our list</p>
              <p className="mt-1 max-w-md text-sm text-slate-500">
                That doesn’t always mean it can be shipped — destination rules vary. Ask our team and we’ll confirm.
              </p>
              <Link to="/contact" className="mt-6 rounded-full bg-ink-900 px-6 py-3 text-sm font-bold text-white hover:bg-accent-500">
                Ask about my item
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ───────── DESTINATION RULES ───────── */}
      <section className="px-4 pb-24 sm:px-6">
        <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-ink-900 p-10 text-white sm:p-14">
          <div className="grid-bg absolute inset-0" />
          <div className="relative grid items-center gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent-500">
                <Globe2 className="h-6 w-6" />
              </span>
              <h2 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">Every country has its own rules</h2>
              <p className="mt-4 max-w-xl leading-relaxed text-slate-300">
                This list is a general guide. Customs rules differ by destination — some countries restrict certain medicines, food or used goods. Final acceptance is at APX’s discretion, so please
                check with our team before booking anything you’re unsure about.
              </p>
            </div>
            <div className="flex flex-col gap-3 lg:col-span-2 lg:items-end">
              <Link
                to="/contact"
                className="group flex items-center gap-2 rounded-full bg-accent-500 px-7 py-4 font-bold shadow-xl shadow-accent-500/30 transition-all hover:-translate-y-0.5 hover:bg-accent-600"
              >
                Ask before you ship <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/packaging" className="rounded-full border border-white/20 px-7 py-4 text-center font-bold transition-colors hover:bg-white/10">
                Read the packaging guide
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
