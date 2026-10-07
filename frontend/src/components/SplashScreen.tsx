import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { setScrollLocked } from '../lib/smoothScroll'

const KEY = 'apx-splash-seen'
const DURATION = 1700

function seenThisSession() {
  try {
    return sessionStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

/** Brand intro shown once per browser session while the site starts up. */
export default function SplashScreen() {
  const [show, setShow] = useState(() => !seenThisSession())

  useEffect(() => {
    if (!show) return
    try {
      sessionStorage.setItem(KEY, '1')
    } catch {
      /* storage unavailable — splash simply shows again next time */
    }
    document.documentElement.style.overflow = 'hidden'
    setScrollLocked(true)
    const t = setTimeout(() => setShow(false), DURATION)
    return () => {
      clearTimeout(t)
      document.documentElement.style.overflow = ''
      setScrollLocked(false)
    }
  }, [show])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-ink-900"
        >
          <div className="grid-bg absolute inset-0 opacity-60" />
          <div className="absolute top-1/2 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/25 blur-3xl" />

          <div className="relative flex flex-col items-center">
            <motion.img
              src="/apx-logo-light.svg"
              alt="APX International"
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="h-20 w-auto sm:h-24"
            />

            <div className="mt-8 h-1 w-48 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: DURATION / 1000 - 0.2, ease: 'easeInOut' }}
                className="h-full rounded-full bg-accent-500"
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-4 text-[11px] font-semibold tracking-[0.3em] text-slate-400 uppercase"
            >
              Delivering since 1990
            </motion.p>
          </div>

          {/* red speed lines */}
          {[30, 55, 75].map((top, i) => (
            <motion.span
              key={top}
              initial={{ x: '-30vw', opacity: 0 }}
              animate={{ x: '130vw', opacity: [0, 1, 0] }}
              transition={{ duration: 1.2, delay: 0.2 + i * 0.18, ease: 'easeIn' }}
              className="absolute left-0 h-0.5 w-40 rounded-full bg-gradient-to-r from-transparent to-accent-500"
              style={{ top: `${top}%` }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
