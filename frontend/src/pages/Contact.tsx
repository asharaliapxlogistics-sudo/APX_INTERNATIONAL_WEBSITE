import Flag from '../components/Flag'
import { useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, CheckCircle2, Loader2, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import { mapsLink, offices, services } from '../data/site'
import { sendContact, type ContactPayload } from '../lib/api'

const inputCls =
  'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-ink-900 outline-none transition-all placeholder:text-slate-400 focus:border-accent-500 focus:bg-white focus:ring-4 focus:ring-accent-500/10'

export default function Contact() {
  const [params] = useSearchParams()
  const [form, setForm] = useState<ContactPayload>({
    name: '',
    email: '',
    phone: '',
    service: params.get('service') ?? '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')

  const set = (k: keyof ContactPayload) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  async function submit(e: FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setError('')
    try {
      await sendContact(form)
      setStatus('sent')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send your message')
      setStatus('error')
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let’s move something together"
        text="Questions, quotes or a shipment that needs special care — our teams in Pakistan and the UK are ready to help."
      />

      <section className="py-24 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-2">
            {offices.map((o, i) => (
              <Reveal key={o.country} delay={i * 0.1}>
                <div className="rounded-3xl border border-slate-100 p-8 transition-shadow hover:shadow-xl hover:shadow-brand-600/5">
                  <div className="flex items-center gap-3">
                    <Flag code={o.flag} className="h-8" />
                    <div>
                      <h3 className="text-lg font-bold text-ink-900">{o.country}</h3>
                      <p className="text-sm text-slate-500">{o.label}</p>
                    </div>
                  </div>
                  <a
                    href={mapsLink(o)}
                    target="_blank"
                    rel="noreferrer"
                    className="group mt-6 flex items-start gap-3 text-sm font-semibold text-slate-600 hover:text-accent-500"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <span>
                      {o.address.map((line) => (
                        <span key={line} className="block">{line}</span>
                      ))}
                      <span className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-accent-500">
                        Get directions <ArrowUpRight className="h-3 w-3" />
                      </span>
                    </span>
                  </a>
                  <ul className="mt-3 space-y-3 text-sm">
                    {o.phones.map((p) => (
                      <li key={p}>
                        <a href={`tel:${p.replace(/\s/g, '')}`} className="flex items-center gap-3 font-semibold text-slate-600 hover:text-accent-500">
                          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-50 text-brand-600">
                            <Phone className="h-4 w-4" />
                          </span>
                          {p}
                        </a>
                      </li>
                    ))}
                    {o.whatsapp && (
                      <li>
                        <a
                          href={`https://wa.me/${o.whatsapp}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-3 font-semibold text-slate-600 hover:text-[#25d366]"
                        >
                          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#25d366]/10 text-[#25d366]">
                            <MessageCircle className="h-4 w-4" />
                          </span>
                          WhatsApp us
                        </a>
                      </li>
                    )}
                    {o.email && (
                      <li>
                        <a href={`mailto:${o.email}`} className="flex items-center gap-3 font-semibold text-slate-600 hover:text-accent-500">
                          <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent-500/10 text-accent-500">
                            <Mail className="h-4 w-4" />
                          </span>
                          {o.email}
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15} className="lg:col-span-3">
            <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-2xl ring-1 shadow-ink-900/5 ring-slate-100 sm:p-10">
              <AnimatePresence mode="wait">
                {status === 'sent' ? (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex min-h-[28rem] flex-col items-center justify-center text-center"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.1 }}
                      className="grid h-20 w-20 place-items-center rounded-full bg-emerald-500 text-white"
                    >
                      <CheckCircle2 className="h-10 w-10" />
                    </motion.span>
                    <h3 className="mt-6 text-2xl font-extrabold text-ink-900">Message sent!</h3>
                    <p className="mt-2 max-w-sm text-slate-500">Thank you, {form.name.split(' ')[0]}. Our team will get back to you shortly.</p>
                    <button
                      onClick={() => {
                        setForm({ name: '', email: '', phone: '', service: '', message: '' })
                        setStatus('idle')
                      }}
                      className="mt-8 rounded-full border border-slate-200 px-6 py-3 text-sm font-bold text-ink-900 hover:bg-slate-50"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" exit={{ opacity: 0 }} onSubmit={submit} className="space-y-5">
                    <div>
                      <h2 className="text-2xl font-extrabold text-ink-900">Send us a message</h2>
                      <p className="mt-1 text-sm text-slate-500">We usually reply within a few hours.</p>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <input required minLength={2} value={form.name} onChange={set('name')} placeholder="Full name" className={inputCls} />
                      <input required type="email" value={form.email} onChange={set('email')} placeholder="Email address" className={inputCls} />
                      <input required value={form.phone} onChange={set('phone')} placeholder="Phone number" className={inputCls} />
                      <select required value={form.service} onChange={set('service')} className={inputCls}>
                        <option value="" disabled>Select a service</option>
                        {services.map((s) => (
                          <option key={s.slug} value={s.title}>{s.title}</option>
                        ))}
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <textarea
                      required
                      minLength={10}
                      rows={5}
                      value={form.message}
                      onChange={set('message')}
                      placeholder="Tell us about your shipment — origin, destination, weight…"
                      className={`${inputCls} resize-none`}
                    />
                    {status === 'error' && (
                      <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{error}</p>
                    )}
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-accent-500 py-4 font-bold text-white shadow-lg shadow-accent-500/30 transition-all hover:bg-accent-600 disabled:opacity-70 sm:w-auto sm:px-10"
                    >
                      {status === 'sending' ? (
                        <><Loader2 className="h-5 w-5 animate-spin" /> Sending…</>
                      ) : (
                        <>Send Message <Send className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></>
                      )}
                    </button>
                    <p className="text-xs text-slate-400">
                      By sending this form you agree to our{' '}
                      <Link to="/privacy" className="font-semibold text-slate-500 underline-offset-2 hover:text-accent-500 hover:underline">
                        Privacy Policy
                      </Link>
                      .
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
