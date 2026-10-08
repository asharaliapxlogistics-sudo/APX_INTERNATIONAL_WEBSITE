import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, X } from 'lucide-react'
import Flag from './Flag'
import { offices } from '../data/site'

const message = encodeURIComponent('Hello APX, I would like to know more about shipping a parcel.')

function WhatsAppIcon({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden>
      <path d="M16.04 3C8.86 3 3.03 8.82 3.03 16c0 2.3.6 4.53 1.74 6.5L3 29l6.68-1.75A12.95 12.95 0 0 0 16.04 29C23.2 29 29 23.18 29 16S23.2 3 16.04 3Zm0 23.64c-2 0-3.95-.54-5.65-1.55l-.4-.24-3.96 1.04 1.06-3.86-.26-.4A10.6 10.6 0 0 1 5.4 16c0-5.87 4.77-10.64 10.64-10.64 5.86 0 10.62 4.77 10.62 10.64 0 5.86-4.76 10.64-10.62 10.64Zm5.83-7.96c-.32-.16-1.89-.93-2.18-1.04-.3-.1-.5-.16-.72.16-.21.32-.82 1.04-1 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.21-.18-.32-.02-.5.14-.65.15-.15.32-.37.48-.56.16-.19.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.53-.54-.72-.55h-.62c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66 0 1.57 1.14 3.09 1.3 3.3.16.21 2.25 3.43 5.45 4.81.76.33 1.36.53 1.82.67.77.24 1.46.21 2.01.13.61-.09 1.89-.77 2.15-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  )
}

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-72 origin-bottom-right overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 shadow-ink-900/20 ring-slate-100"
          >
            <div className="flex items-center gap-3 bg-[#075e54] px-5 py-4 text-white">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-white/15">
                <WhatsAppIcon className="h-6 w-6" />
              </span>
              <div>
                <p className="font-bold">Chat with APX</p>
                <p className="text-xs text-white/80">We usually reply within minutes</p>
              </div>
            </div>
            <div className="space-y-2 p-3">
              {offices.filter((o) => o.whatsapp).map((o) => (
                <a
                  key={o.label}
                  href={`https://wa.me/${o.whatsapp}?text=${message}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 rounded-2xl p-3 transition-colors hover:bg-slate-50"
                >
                  <Flag code={o.flag} className="h-6" />
                  <span className="flex-1">
                    <span className="block text-sm font-bold text-ink-900">{o.country} · {o.label}</span>
                    <span className="block text-xs text-slate-500">{o.phones.find((p) => p.replace(/\D/g, '') === o.whatsapp) ?? `+${o.whatsapp}`}</span>
                  </span>
                  <ChevronRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-[#25d366]" />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-3">
        <AnimatePresence>
          {!open && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ delay: 2.5 }}
              className="hidden rounded-full bg-white px-4 py-2 text-sm font-bold text-ink-900 shadow-xl ring-1 ring-slate-100 sm:block"
            >
              Need help? Chat with us
            </motion.span>
          )}
        </AnimatePresence>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close WhatsApp chat' : 'Chat on WhatsApp'}
          className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-xl shadow-[#25d366]/40 transition-transform hover:scale-105 active:scale-95"
        >
          {!open && <span className="absolute inset-0 animate-ping rounded-full bg-[#25d366] opacity-40" />}
          <motion.span
            key={open ? 'x' : 'wa'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.15 }}
            className="relative"
          >
            {open ? <X className="h-6 w-6" /> : <WhatsAppIcon />}
          </motion.span>
        </button>
      </div>
    </div>
  )
}
