import { motion } from 'framer-motion'
import { CheckCircle2, Package, Radio } from 'lucide-react'
import Flag from './Flag'
import type { TrackingResult } from '../lib/api'

// Positions on /world-dots.svg (viewBox 0 0 126 60), from the same dotted-map projection as the About page map.
const CITIES: Record<string, { x: number; y: number; flag: string }> = {
  Karachi: { x: 87, y: 26.85, flag: 'pk' },
  Lahore: { x: 89.5, y: 24.25, flag: 'pk' },
  Islamabad: { x: 89, y: 23.38, flag: 'pk' },
  London: { x: 63, y: 14.72, flag: 'gb' },
  Manchester: { x: 62.5, y: 13.86, flag: 'gb' },
  'New York': { x: 36.5, y: 20.78, flag: 'us' },
  Toronto: { x: 35.5, y: 19.05, flag: 'ca' },
  Sydney: { x: 116.5, y: 48.5, flag: 'au' },
  Riyadh: { x: 79, y: 26.85, flag: 'sa' },
}

// How far along the route the parcel is for each status (0 = origin, 1 = destination).
const ROUTE_POSITION: Record<string, number> = {
  'Shipment booked': 0,
  'Picked up': 0,
  'Departed origin facility': 0.12,
  'In transit': 0.5,
  'Arrived at destination hub': 0.9,
  'Out for delivery': 0.96,
  Delivered: 1,
}

type Pt = { x: number; y: number }
const lerp = (a: Pt, b: Pt, t: number): Pt => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t })

const cityOf = (place: string) => CITIES[place.split(',')[0].trim()]

export default function TrackingMap({ result }: { result: TrackingResult }) {
  const from = cityOf(result.origin)
  const to = cityOf(result.destination)
  if (!from || !to) return null

  // Quadratic arc from origin to destination, bowing upwards.
  const dist = Math.hypot(to.x - from.x, to.y - from.y)
  const ctrl: Pt = { x: (from.x + to.x) / 2, y: Math.min(from.y, to.y) - dist * 0.3 }

  // Split the curve at the parcel's position (de Casteljau) into a travelled and a remaining part.
  const t = ROUTE_POSITION[result.current_status] ?? result.progress / 100
  const q1 = lerp(from, ctrl, t)
  const r1 = lerp(ctrl, to, t)
  const here = lerp(q1, r1, t)
  const travelled = `M${from.x} ${from.y} Q ${q1.x} ${q1.y} ${here.x} ${here.y}`
  const remaining = `M${here.x} ${here.y} Q ${r1.x} ${r1.y} ${to.x} ${to.y}`

  // Zoom the map to the route, keeping a wide aspect ratio and staying inside the world map.
  const ASPECT = 2
  const pad = 7
  let minX = Math.min(from.x, to.x, ctrl.x) - pad
  let maxX = Math.max(from.x, to.x, ctrl.x) + pad
  let minY = Math.min(from.y, to.y, ctrl.y) - pad
  let maxY = Math.max(from.y, to.y, ctrl.y) + pad
  let w = Math.max(maxX - minX, 40)
  let h = maxY - minY
  if (w / h < ASPECT) w = h * ASPECT
  w = Math.min(w, 126)
  h = w / ASPECT
  const cx = (minX + maxX) / 2
  const cy = (minY + maxY) / 2
  minX = Math.min(Math.max(cx - w / 2, 0), 126 - Math.min(w, 126))
  minY = Math.min(Math.max(cy - h / 2, 0), 60 - Math.min(h, 60))
  const pct = (p: Pt) => ({ left: `${((p.x - minX) / w) * 100}%`, top: `${((p.y - minY) / h) * 100}%` })

  const delivered = t >= 1
  const label = (place: string, code: string, align: 'left' | 'right') => (
    <span
      className={`absolute top-1/2 flex w-max -translate-y-1/2 items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-bold whitespace-nowrap text-ink-900 shadow-lg sm:text-xs ${
        align === 'left' ? 'right-4' : 'left-4'
      }`}
    >
      <Flag code={code} className="h-3" /> {place.split(',')[0]}
    </span>
  )

  return (
    <div className="relative overflow-hidden rounded-3xl bg-ink-900 shadow-xl ring-1 shadow-ink-900/10 ring-ink-800">
      <div className="relative w-full" style={{ aspectRatio: `${ASPECT}` }}>
        <svg viewBox={`${minX} ${minY} ${w} ${h}`} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="trk-done" gradientUnits="userSpaceOnUse" x1={from.x} y1={from.y} x2={here.x} y2={here.y}>
              <stop offset="0%" stopColor="#7b78ff" />
              <stop offset="100%" stopColor="#ff030a" />
            </linearGradient>
          </defs>
          <image href="/world-dots.svg" x="0" y="0" width="126" height="60" opacity="0.45" />

          <path
            d={remaining}
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.4"
            strokeWidth="2"
            strokeDasharray="2 6"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <motion.path
            d={travelled}
            fill="none"
            stroke="url(#trk-done)"
            strokeWidth={w / 260}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, delay: 0.3, ease: 'easeInOut' }}
          />
        </svg>

        {/* Origin */}
        <span className="absolute" style={pct(from)}>
          <span className="absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-brand-400" />
          {label(result.origin, from.flag, from.x > to.x ? 'left' : 'right')}
        </span>

        {/* Destination */}
        <span className="absolute" style={pct(to)}>
          <span
            className={`absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white ${
              delivered ? 'bg-emerald-500' : 'bg-white/30'
            }`}
          />
          {label(result.destination, to.flag, from.x > to.x ? 'right' : 'left')}
        </span>

        {/* Parcel's current position */}
        {!delivered && (
          <motion.span
            className="absolute"
            style={pct(here)}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, type: 'spring' }}
          >
            <span className="absolute h-12 w-12 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-accent-500/40" />
            <span className="absolute grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-accent-500 text-white shadow-xl shadow-accent-500/50">
              <Package className="h-5 w-5" />
            </span>
          </motion.span>
        )}

        {/* Overlay info */}
        <span className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
          {delivered ? (
            <>
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Delivered
            </>
          ) : (
            <>
              <Radio className="h-3.5 w-3.5 text-accent-400" /> {result.current_status}
            </>
          )}
        </span>
        <span className="absolute right-4 bottom-4 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
          {Math.round(t * 100)}% of the way
        </span>
      </div>
    </div>
  )
}
