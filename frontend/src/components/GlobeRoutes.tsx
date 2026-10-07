import { motion } from 'framer-motion'
import { CheckCircle2, Package, Plane } from 'lucide-react'

// Stylised positions on the globe — the story is Pakistan → UK, USA & Canada.
const hubs = [
  { x: 420, y: 255, label: 'Pakistan', main: true, lx: 12, ly: 22 },
  { x: 255, y: 150, label: 'London', main: true, lx: 10, ly: -12 },
  { x: 135, y: 280, label: 'New York', main: true, lx: 10, ly: 22 },
  { x: 108, y: 212, label: 'Toronto', main: true, lx: 10, ly: -12 },
]

const routes = [
  'M420 255 Q 350 115 255 150', // Pakistan → London
  'M420 255 Q 290 70 135 280', // Pakistan → New York
  'M420 255 Q 270 40 108 212', // Pakistan → Toronto
  'M255 150 Q 175 170 135 280', // London → New York
]

export default function GlobeRoutes() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      {/* glow */}
      <div className="absolute inset-10 rounded-full bg-brand-600/40 blur-3xl" />
      <div className="absolute inset-24 rounded-full bg-accent-500/20 blur-3xl" />

      <svg viewBox="0 0 600 600" className="relative h-full w-full">
        <defs>
          <radialGradient id="globe-fill" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#120f85" />
            <stop offset="100%" stopColor="#02012a" />
          </radialGradient>
          <linearGradient id="route" x1="0" x2="1">
            <stop offset="0%" stopColor="#ff030a" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#ff4d53" />
            <stop offset="100%" stopColor="#7b78ff" />
          </linearGradient>
          <clipPath id="globe-clip">
            <circle cx="300" cy="300" r="240" />
          </clipPath>
        </defs>

        <circle cx="300" cy="300" r="240" fill="url(#globe-fill)" stroke="#7b78ff" strokeOpacity="0.35" />

        {/* rotating meridians */}
        <g clipPath="url(#globe-clip)" stroke="#7b78ff" strokeOpacity="0.18" fill="none">
          <g className="origin-center animate-spin-slow" style={{ transformBox: 'view-box' }}>
            {[40, 90, 140, 190, 240].map((rx) => (
              <ellipse key={rx} cx="300" cy="300" rx={rx} ry="240" />
            ))}
          </g>
          {[-160, -80, 0, 80, 160].map((dy) => (
            <ellipse key={dy} cx="300" cy={300 + dy} rx={Math.sqrt(240 ** 2 - dy ** 2)} ry="18" />
          ))}
        </g>

        {/* dotted land hint */}
        <g fill="#7b78ff" fillOpacity="0.35" clipPath="url(#globe-clip)">
          {Array.from({ length: 140 }).map((_, i) => {
            const a = i * 2.39996
            const r = Math.sqrt(i / 140) * 230
            const x = 300 + Math.cos(a) * r
            const y = 300 + Math.sin(a) * r
            return <circle key={i} cx={x} cy={y} r={1.6} />
          })}
        </g>

        {/* routes */}
        <g transform="translate(0 0)">
          {routes.map((d, i) => (
            <g key={d}>
              <motion.path
                d={d}
                fill="none"
                stroke="url(#route)"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.6, delay: 0.6 + i * 0.35, ease: 'easeInOut' }}
              />
              <circle r="4" fill="#fff">
                <animateMotion dur={`${3 + i * 0.6}s`} repeatCount="indefinite" path={d} begin={`${2 + i * 0.35}s`} />
              </circle>
            </g>
          ))}
        </g>

        {/* hubs */}
        {hubs.map((h, i) => (
          <g key={h.label} opacity={h.main ? 1 : 0.7}>
            {h.main && (
              <circle cx={h.x} cy={h.y} r="12" fill="#ff030a" fillOpacity="0.25">
                <animate attributeName="r" values="6;16;6" dur="2.4s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                <animate attributeName="fill-opacity" values="0.5;0;0.5" dur="2.4s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
              </circle>
            )}
            <circle cx={h.x} cy={h.y} r={h.main ? 5 : 3.5} fill={h.main ? '#ff030a' : '#7b78ff'} stroke="#fff" strokeWidth="2" />
            <text x={h.x + h.lx} y={h.y + h.ly} fill="#cbd5e1" fontSize={h.main ? 14 : 12} fontWeight="600">
              {h.label}
            </text>
          </g>
        ))}
      </svg>

      {/* floating cards */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute top-[2%] -left-2 sm:-left-6"
      >
        <div className="animate-float flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-3 pr-5 shadow-2xl backdrop-blur-xl">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-500 text-white">
            <Plane className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-xs text-slate-300">APX-20490</span>
            <span className="block text-sm font-bold text-white">In transit · KHI → LHR</span>
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute right-0 bottom-[14%] sm:-right-4"
      >
        <div className="animate-float flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 p-3 pr-5 shadow-2xl backdrop-blur-xl [animation-delay:1.5s]">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-500 text-white">
            <CheckCircle2 className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-xs text-slate-300">Delivered</span>
            <span className="block text-sm font-bold text-white">New York · 2 days early</span>
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.2, type: 'spring' }}
        className="absolute top-[52%] -left-1 hidden sm:block"
      >
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-500 text-white shadow-xl shadow-brand-500/40 animate-float [animation-delay:3s]">
          <Package className="h-6 w-6" />
        </div>
      </motion.div>
    </div>
  )
}
