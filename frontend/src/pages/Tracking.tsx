import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CalendarClock, CheckCircle2, Circle, Info, Loader2, MapPin, Package } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import TrackBox from '../components/TrackBox'
import TrackingMap from '../components/TrackingMap'
import { trackShipment, type TrackingResult } from '../lib/api'

export default function Tracking() {
  const [params, setParams] = useSearchParams()
  const no = params.get('no') ?? ''
  const [result, setResult] = useState<TrackingResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!no) {
      setResult(null)
      return
    }
    let cancelled = false
    setLoading(true)
    setError('')
    trackShipment(no)
      .then((r) => !cancelled && setResult(r))
      .catch((e: Error) => {
        if (cancelled) return
        setResult(null)
        setError(e.message)
      })
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [no])

  return (
    <>
      <PageHeader
        eyebrow="Tracking"
        title="Track your shipment"
        text="Enter your APX tracking number to see where your parcel is right now."
      >
        <div className="mt-10 max-w-2xl">
          <TrackBox key={no} initial={no} onSubmit={(n) => setParams({ no: n })} />
        </div>
      </PageHeader>

      <section className="min-h-[50vh] bg-slate-50 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mb-8 flex items-start gap-3 rounded-2xl border border-brand-100 bg-brand-50 px-5 py-4 text-sm text-brand-700">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              <strong>Preview mode:</strong> live tracking is being connected to the APX system. Results shown here are
              sample data for demonstration.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {loading && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center py-20 text-slate-500">
                <Loader2 className="h-10 w-10 animate-spin text-accent-500" />
                <p className="mt-4 font-semibold">Locating your shipment…</p>
              </motion.div>
            )}

            {!loading && error && (
              <motion.div key="error" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-4 rounded-3xl bg-white p-8 ring-1 ring-red-100">
                <AlertCircle className="h-8 w-8 shrink-0 text-red-500" />
                <div>
                  <p className="font-bold text-ink-900">We couldn’t find that shipment</p>
                  <p className="text-sm text-slate-500">{error}</p>
                </div>
              </motion.div>
            )}

            {!loading && !error && !result && (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center py-16 text-center">
                <span className="grid h-20 w-20 place-items-center rounded-3xl bg-white text-brand-600 shadow-xl animate-float">
                  <Package className="h-9 w-9" />
                </span>
                <p className="mt-6 text-lg font-bold text-ink-900">Enter a tracking number above</p>
                <p className="mt-1 text-sm text-slate-500">Try a sample like <span className="font-mono">APX20490</span></p>
              </motion.div>
            )}

            {!loading && result && (
              <motion.div key={result.tracking_number} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
                <div className="overflow-hidden rounded-3xl bg-white shadow-xl ring-1 shadow-ink-900/5 ring-slate-100">
                  <div className="flex flex-wrap items-center justify-between gap-4 bg-ink-900 px-8 py-6 text-white">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-slate-400">Tracking number</p>
                      <p className="mt-1 font-mono text-2xl font-bold">{result.tracking_number}</p>
                    </div>
                    <span className="rounded-full bg-accent-500 px-4 py-2 text-sm font-bold">{result.current_status}</span>
                  </div>
                  <div className="grid gap-6 p-8 sm:grid-cols-3">
                    <Info2 icon={MapPin} label="From" value={result.origin} />
                    <Info2 icon={MapPin} label="To" value={result.destination} />
                    <Info2 icon={CalendarClock} label="Estimated delivery" value={result.estimated_delivery} />
                  </div>
                  <div className="px-8 pb-8">
                    <div className="flex justify-between text-xs font-semibold text-slate-500">
                      <span>{result.service}</span>
                      <span>{result.progress}%</span>
                    </div>
                    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.progress}%` }}
                        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                        className="h-full rounded-full bg-gradient-to-r from-accent-500 to-brand-500"
                      />
                    </div>
                  </div>
                </div>

                <TrackingMap result={result} />

                <div className="rounded-3xl bg-white p-8 shadow-xl ring-1 shadow-ink-900/5 ring-slate-100">
                  <h3 className="text-lg font-bold text-ink-900">Shipment history</h3>
                  <ol className="mt-6">
                    {result.events.map((ev, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        className="relative flex gap-5 pb-8 last:pb-0"
                      >
                        {i < result.events.length - 1 && (
                          <span className={`absolute top-7 bottom-0 left-[11px] w-0.5 ${ev.done ? 'bg-accent-500' : 'bg-slate-200'}`} />
                        )}
                        {ev.done ? (
                          <CheckCircle2 className="relative h-6 w-6 shrink-0 text-accent-500" />
                        ) : (
                          <Circle className="relative h-6 w-6 shrink-0 text-slate-300" />
                        )}
                        <div className="-mt-0.5">
                          <p className={`font-bold ${ev.done ? 'text-ink-900' : 'text-slate-400'}`}>{ev.status}</p>
                          <p className="text-sm text-slate-500">{ev.location}</p>
                          {ev.timestamp && <p className="mt-0.5 text-xs text-slate-400">{ev.timestamp}</p>}
                        </div>
                      </motion.li>
                    ))}
                  </ol>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  )
}

function Info2({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="font-bold text-ink-900">{value}</p>
      </div>
    </div>
  )
}
