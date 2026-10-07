import Flag from './Flag'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronsLeftRight } from 'lucide-react'

// Pin positions come from the dotted-map projection used to generate /world-dots.svg (viewBox 0 0 126 60).
export const locations = [
  {
    key: 'karachi',
    city: 'Karachi',
    country: 'Pakistan',
    flag: 'pk',
    short: 'Pakistan',
    role: 'Head office & hub',
    x: 87,
    y: 26.85,
    hq: true,
    label: 'right',
  },
  {
    key: 'london',
    city: 'London',
    country: 'United Kingdom',
    flag: 'gb',
    short: 'UK',
    role: 'UK office & warehouse',
    x: 63,
    y: 14.72,
    label: 'left',
  },
  {
    key: 'newyork',
    city: 'New York',
    country: 'United States',
    flag: 'us',
    short: 'USA',
    role: 'Warehouse',
    x: 36.5,
    y: 20.78,
    label: 'right',
  },
  {
    key: 'toronto',
    city: 'Toronto',
    country: 'Canada',
    flag: 'ca',
    short: 'Canada',
    role: 'Warehouse',
    x: 35.5,
    y: 19.05,
    label: 'left',
  },
] as const

type HubKey = (typeof locations)[number]['key']

// Delivery destinations across every continent, each served from its nearest APX hub.
// `at` places the country label: r(ight), l(eft), b(elow) or t(op) of the dot.
const destinations: {
  country: string
  flag: string
  x: number
  y: number
  hub: HubKey
  at: 'r' | 'l' | 'b' | 't'
}[] = [
  {
    country: 'Bangladesh',
    flag: 'bd',
    x: 94.5,
    y: 27.71,
    hub: 'karachi',
    at: 'r',
  },
  {
    country: 'Singapore',
    flag: 'sg',
    x: 100,
    y: 35.51,
    hub: 'karachi',
    at: 'l',
  },
  {
    country: 'Indonesia',
    flag: 'id',
    x: 100.5,
    y: 38.11,
    hub: 'karachi',
    at: 'b',
  },
  { country: 'China', flag: 'cn', x: 105.5, y: 24.25, hub: 'karachi', at: 'r' },
  {
    country: 'South Korea',
    flag: 'kr',
    x: 108,
    y: 21.65,
    hub: 'karachi',
    at: 't',
  },
  { country: 'Japan', flag: 'jp', x: 112.5, y: 22.52, hub: 'karachi', at: 'r' },
  {
    country: 'Australia',
    flag: 'au',
    x: 116.5,
    y: 48.5,
    hub: 'karachi',
    at: 't',
  },
  {
    country: 'New Zealand',
    flag: 'nz',
    x: 124.5,
    y: 50.23,
    hub: 'karachi',
    at: 'l',
  },
  { country: 'Egypt', flag: 'eg', x: 74, y: 25.11, hub: 'karachi', at: 'l' },
  { country: 'Turkey', flag: 'tr', x: 73, y: 19.92, hub: 'london', at: 'r' },
  { country: 'Russia', flag: 'ru', x: 76.5, y: 12.12, hub: 'london', at: 'r' },
  { country: 'Kenya', flag: 'ke', x: 75.5, y: 36.37, hub: 'karachi', at: 'r' },
  {
    country: 'South Africa',
    flag: 'za',
    x: 73,
    y: 45.9,
    hub: 'karachi',
    at: 'r',
  },
  { country: 'Nigeria', flag: 'ng', x: 64, y: 33.77, hub: 'london', at: 'l' },
  { country: 'France', flag: 'fr', x: 64, y: 16.45, hub: 'london', at: 'b' },
  { country: 'Germany', flag: 'de', x: 66.5, y: 15.59, hub: 'london', at: 'r' },
  { country: 'Spain', flag: 'es', x: 61.5, y: 20.78, hub: 'london', at: 'l' },
  { country: 'Mexico', flag: 'mx', x: 28.5, y: 29.44, hub: 'newyork', at: 'l' },
  {
    country: 'Colombia',
    flag: 'co',
    x: 36.5,
    y: 34.64,
    hub: 'newyork',
    at: 'r',
  },
  { country: 'Peru', flag: 'pe', x: 36, y: 40.7, hub: 'newyork', at: 'l' },
  { country: 'Brazil', flag: 'br', x: 46.5, y: 45.03, hub: 'newyork', at: 'r' },
  {
    country: 'Argentina',
    flag: 'ar',
    x: 42,
    y: 49.36,
    hub: 'newyork',
    at: 'l',
  },
]

const labelClass = {
  r: 'left-4 -translate-y-1/2',
  l: 'right-4 -translate-y-1/2',
  b: 'top-3 -translate-x-1/2',
  t: 'bottom-3 -translate-x-1/2',
}

const hq = locations[0]
const hubOf = (k: HubKey) => locations.find((l) => l.key === k)!

function arc(ax: number, ay: number, bx: number, by: number) {
  const dist = Math.hypot(bx - ax, by - ay)
  const mx = (ax + bx) / 2
  const my = Math.min(ay, by) - dist * 0.25
  return `M${ax} ${ay} Q ${mx} ${my} ${bx} ${by}`
}

const routes = [
  // Hub-to-hub trunk lines from Karachi
  ...locations.slice(1).map((l) => ({ id: l.key, d: arc(hq.x, hq.y, l.x, l.y), trunk: true })),
  // Hub-to-destination lines
  ...destinations.map((t) => {
    const h = hubOf(t.hub)
    return { id: t.country, d: arc(h.x, h.y, t.x, t.y), trunk: false }
  }),
]

export default function NetworkMap() {
  const scrollRef = useRef<HTMLDivElement>(null)

  // On phones the map is wider than the screen and swipes sideways — open it centred on Pakistan.
  useEffect(() => {
    const el = scrollRef.current
    if (el && el.scrollWidth > el.clientWidth) {
      el.scrollLeft = (el.scrollWidth * hq.x) / 126 - el.clientWidth / 2
    }
  }, [])

  return (
    <div>
      <p className="mb-3 flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 sm:hidden">
        <ChevronsLeftRight className="h-4 w-4" /> Swipe to explore the map
      </p>
      <div ref={scrollRef} className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:overflow-visible sm:px-0">
        <div className="relative mx-auto aspect-[126/60] w-full min-w-[920px] sm:min-w-0">
          <img src="/world-dots.svg" alt="" className="absolute inset-0 h-full w-full opacity-40" />

          <svg viewBox="0 0 126 60" className="absolute inset-0 h-full w-full overflow-visible">
            <defs>
              <linearGradient id="net-route" x1="1" x2="0">
                <stop offset="0%" stopColor="#ff030a" />
                <stop offset="100%" stopColor="#7b78ff" />
              </linearGradient>
            </defs>
            {routes.map((r, i) => (
              <g key={r.id}>
                <motion.path
                  d={r.d}
                  fill="none"
                  stroke={r.trunk ? 'url(#net-route)' : '#7b78ff'}
                  strokeOpacity={r.trunk ? 1 : 0.45}
                  strokeWidth={r.trunk ? 0.35 : 0.18}
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: r.trunk ? 1.6 : 1.2,
                    delay: r.trunk ? 0.3 + i * 0.2 : 1.4 + i * 0.06,
                    ease: 'easeInOut',
                  }}
                />
                <circle r={r.trunk ? 0.55 : 0.35} fill={r.trunk ? '#fff' : '#ff4d53'}>
                  <animateMotion
                    dur={`${3 + (i % 5) * 0.6}s`}
                    repeatCount="indefinite"
                    path={r.d}
                    begin={`${2 + (i % 7) * 0.4}s`}
                  />
                </circle>
              </g>
            ))}

            {/* Destination dots */}
            {destinations.map((t, i) => (
              <motion.g
                key={t.country}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 2 + i * 0.06 }}
              >
                <circle cx={t.x} cy={t.y} r="0.9" fill="#fff" fillOpacity="0.15">
                  <animate attributeName="r" values="0.5;1.4;0.5" dur="3s" begin={`${(i % 6) * 0.5}s`} repeatCount="indefinite" />
                </circle>
                <circle cx={t.x} cy={t.y} r="0.45" fill="#fff">
                  <title>{t.country}</title>
                </circle>
              </motion.g>
            ))}
          </svg>

          {/* Country labels with flags */}
          {destinations.map((t, i) => (
            <motion.span
              key={t.country}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 2.2 + i * 0.06 }}
              className="absolute"
              style={{
                left: `${(t.x / 126) * 100}%`,
                top: `${(t.y / 60) * 100}%`,
              }}
            >
              <span
                className={`absolute flex items-center gap-1 text-[10px] leading-none font-semibold whitespace-nowrap text-slate-300 lg:text-[11px] ${labelClass[t.at]}`}
              >
                <Flag code={t.flag} className="h-2.5" /> {t.country}
              </span>
            </motion.span>
          ))}

          {locations.map((l, i) => (
            <motion.div
              key={l.key}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.15, type: 'spring' }}
              className="absolute"
              style={{
                left: `${(l.x / 126) * 100}%`,
                top: `${(l.y / 60) * 100}%`,
              }}
            >
              <span className="absolute -translate-x-1/2 -translate-y-1/2">
                <span
                  className={`absolute inset-0 animate-ping rounded-full ${'hq' in l ? 'bg-accent-500/60' : 'bg-white/40'}`}
                />
                <span
                  className={`relative block rounded-full border-2 border-white ${
                    'hq' in l ? 'h-3.5 w-3.5 bg-accent-500' : 'h-2.5 w-2.5 bg-brand-400'
                  }`}
                />
              </span>
              <span
                className={`absolute top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold whitespace-nowrap text-white backdrop-blur ${
                  l.label === 'left' ? 'right-3' : 'left-3'
                } ${l.key === 'toronto' || l.key === 'karachi' ? '-mt-4' : ''} ${l.key === 'newyork' ? 'mt-4' : ''}`}
              >
                <Flag code={l.flag} className="mr-1 h-3 align-[-2px]" /> {l.short}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
