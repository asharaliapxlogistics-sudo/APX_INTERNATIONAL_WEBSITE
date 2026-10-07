import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Pause, Play, Plane, Ship, Truck, Warehouse } from 'lucide-react'

// Free stock footage from Pexels (pexels.com/license) — swap for APX's own footage when available.
const clips = [
  { src: 'https://videos.pexels.com/video-files/4813172/4813172-hd_1280_720_60fps.mp4', label: 'Sea Freight', icon: Ship },
  { src: 'https://videos.pexels.com/video-files/13244607/13244607-hd_1280_720_24fps.mp4', label: 'Air Cargo', icon: Plane },
  { src: 'https://videos.pexels.com/video-files/5149779/5149779-hd_1280_720_30fps.mp4', label: 'Road Transport', icon: Truck },
  { src: 'https://videos.pexels.com/video-files/4284182/4284182-hd_1280_720_50fps.mp4', label: 'Warehousing', icon: Warehouse },
]

const CLIP_SECONDS = 7

export default function VideoShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const inView = useInView(sectionRef, { margin: '200px' })
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const [paused, setPaused] = useState(false)
  const [loaded, setLoaded] = useState<number[]>([])
  const shown = loaded.length > 0

  // Lazy-load: fetch the active clip and the one after it, once the section is near the viewport.
  useEffect(() => {
    if (!inView) return
    const want = [active, (active + 1) % clips.length]
    setLoaded((l) => (want.every((i) => l.includes(i)) ? l : [...new Set([...l, ...want])]))
  }, [inView, active])

  // Play only the active clip, and only while the section is on screen.
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return
      if (i === active && inView && !paused) {
        v.play().catch(() => {})
      } else {
        v.pause()
      }
    })
  }, [active, inView, paused, loaded])

  // Ref mirror so repeated timeupdate/ended events can't advance twice before re-render.
  const activeRef = useRef(0)

  function onTimeUpdate(i: number, v: HTMLVideoElement) {
    if (i !== activeRef.current) return
    const limit = Math.min(CLIP_SECONDS, v.duration || CLIP_SECONDS)
    setProgress(Math.min(1, v.currentTime / limit))
    if (v.currentTime >= limit) next()
  }

  function goTo(i: number) {
    const v = videoRefs.current[i]
    if (v) v.currentTime = 0
    activeRef.current = i
    setProgress(0)
    setActive(i)
  }

  function next() {
    goTo((activeRef.current + 1) % clips.length)
  }

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-ink-950 text-white">
      {/* Videos */}
      {clips.map((c, i) => (
        <video
          key={c.src}
          ref={(el) => {
            videoRefs.current[i] = el
          }}
          src={loaded.includes(i) ? c.src : undefined}
          muted
          playsInline
          preload={i === active ? 'auto' : 'metadata'}
          onTimeUpdate={(e) => onTimeUpdate(i, e.currentTarget)}
          onEnded={() => i === activeRef.current && next()}
          className={`absolute inset-0 h-full w-full scale-105 object-cover transition-opacity duration-1000 ${
            i === active ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/60 to-ink-950/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40" />

      <div className="relative mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-between gap-16 px-4 pt-20 pb-16 sm:px-6 lg:pt-28 lg:pb-20">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={shown ? { opacity: 1, y: 0 } : undefined}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-widest text-slate-200 uppercase backdrop-blur"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-500" /> APX in motion
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={shown ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
          >
            By air, sea and road — <span className="text-accent-500">we keep the world moving.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={shown ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-5 max-w-xl text-lg text-slate-300"
          >
            From our head office in Pakistan to our UK office and warehouses in the UK, USA and Canada — one partner for every
            mile of your shipment.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={shown ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-8"
          >
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 rounded-full bg-accent-500 px-7 py-3.5 font-bold shadow-xl shadow-accent-500/30 transition-all hover:-translate-y-0.5 hover:bg-accent-600"
            >
              Explore our services <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Clip selector */}
        <div className="flex items-end gap-3">
          <button
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? 'Play video' : 'Pause video'}
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10 backdrop-blur transition-colors hover:bg-white/20"
          >
            {paused ? <Play className="h-5 w-5 fill-current" /> : <Pause className="h-5 w-5 fill-current" />}
          </button>
          <div className="grid flex-1 grid-cols-4 gap-2 sm:gap-4">
            {clips.map((c, i) => (
              <button key={c.label} onClick={() => goTo(i)} className="group text-left">
                <span
                  className={`flex items-center gap-2 text-xs font-bold transition-colors sm:text-sm ${
                    i === active ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                >
                  <c.icon className="hidden h-4 w-4 sm:block" /> {c.label}
                </span>
                <span className="mt-2 block h-1 overflow-hidden rounded-full bg-white/15">
                  <span
                    className="block h-full rounded-full bg-accent-500"
                    style={{ width: i === active ? `${progress * 100}%` : i < active ? '100%' : '0%' }}
                  />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
