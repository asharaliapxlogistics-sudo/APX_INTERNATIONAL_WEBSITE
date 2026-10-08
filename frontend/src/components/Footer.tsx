import Flag from './Flag'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, MapPin, MessageCircle, PackageSearch, Phone } from 'lucide-react'
import Logo from './Logo'
import { company, mapsLink, offices, services, socials } from '../data/site'

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3Z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  )
}

export default function Footer() {
  const whatsapp = offices.find((o) => o.whatsapp)?.whatsapp

  return (
    <footer className="relative overflow-hidden bg-ink-950 text-slate-400">
      <div className="grid-bg absolute inset-0 opacity-40" />
      <div className="absolute -top-40 left-1/2 h-96 w-[50rem] -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* ───── Links ───── */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 pt-20 pb-16 lg:grid-cols-12">
          <div className="col-span-2 lg:col-span-4">
            <Logo light />
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              The leading provider of secure, reliable and trusted courier & logistics services worldwide — proudly
              delivering since {company.since}.
            </p>
            <div className="mt-6 flex gap-3">
              <a href={socials.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 transition-colors hover:border-accent-500 hover:bg-accent-500 hover:text-white">
                <FacebookIcon />
              </a>
              <a href={socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-white/10 transition-colors hover:border-accent-500 hover:bg-accent-500 hover:text-white">
                <InstagramIcon />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white">Company</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                ['About Us', '/about'],
                ['Services', '/services'],
                ['Track Shipment', '/tracking'],
                ['Packaging Guide', '/packaging'],
                ['Prohibited Items', '/prohibited-items'],
                ['Contact', '/contact'],
                ['Customer Portal', '/login'],
              ].map(([label, to]) => (
                <li key={to}>
                  <Link to={to} className="transition-colors hover:text-accent-400">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white">Services</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services#${s.slug}`} className="transition-colors hover:text-accent-400">{s.title}</Link>
                </li>
              ))}
            </ul>
            <h4 className="mt-8 text-sm font-bold uppercase tracking-widest text-white">Legal</h4>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link to="/privacy" className="transition-colors hover:text-accent-400">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="transition-colors hover:text-accent-400">Terms &amp; Conditions</Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white">Get in touch</h4>
            <ul className="mt-5 space-y-4 text-sm">
              {offices.map((o) => (
                <li key={o.label}>
                  <p className="font-semibold text-slate-200">
                    <Flag code={o.flag} className="mr-1.5 h-3.5 align-[-2px]" />
                    {o.country} · {o.label}
                  </p>
                  <a href={mapsLink(o)} target="_blank" rel="noreferrer" className="mt-1.5 flex items-start gap-2 hover:text-accent-400">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {o.address.join(', ')}
                  </a>
                  {o.phones.map((p) => (
                    <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="mt-1 flex items-center gap-2 hover:text-accent-400">
                      <Phone className="h-3.5 w-3.5" /> {p}
                    </a>
                  ))}
                  {o.email && (
                    <a href={`mailto:${o.email}`} className="mt-1 flex items-center gap-2 hover:text-accent-400">
                      <Mail className="h-3.5 w-3.5" /> {o.email}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10" />
      </div>

      {/* CTA with the giant wordmark glowing behind it */}
      <div className="relative">
        <div className="absolute bottom-0 left-1/2 h-72 w-[40rem] -translate-x-1/2 translate-y-1/2 rounded-full bg-accent-500/15 blur-3xl" />
        {/* ───── Giant wordmark ───── */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 -mb-[0.18em] flex justify-center overflow-hidden text-[clamp(7rem,30vw,26rem)] leading-[0.8] font-extrabold tracking-tighter select-none"
        >
          {['A', 'P', 'X'].map((ch, i) => (
            <motion.span
              key={ch}
              initial={{ y: '45%', opacity: 0 }}
              whileInView={{ y: '0%', opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className={`bg-gradient-to-b bg-clip-text text-transparent ${
                ch === 'X' ? 'from-accent-500/70 to-accent-500/0' : 'from-white/[0.14] to-white/0'
              }`}
            >
              {ch}
            </motion.span>
          ))}
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          {/* ───── Big CTA ───── */}
          <div className="grid items-end gap-10 pt-20 pb-[16vw] lg:grid-cols-5 lg:pt-28 lg:pb-56">
            <div className="lg:col-span-3">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-sm font-bold tracking-widest text-accent-400 uppercase"
              >
                Let’s get moving
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="mt-4 text-5xl leading-[0.95] font-extrabold tracking-tight text-white sm:text-7xl lg:text-8xl"
              >
                Ready to <span className="text-accent-500">ship?</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-6 max-w-lg text-lg leading-relaxed text-slate-300"
              >
                From Pakistan to the UK, USA, Canada and 200+ countries — get a quote in minutes.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-3 lg:col-span-2"
            >
              <Link
                to="/contact"
                className="group flex items-center justify-between rounded-2xl bg-accent-500 px-6 py-5 text-lg font-bold text-white shadow-xl shadow-accent-500/25 transition-all hover:-translate-y-0.5 hover:bg-accent-600"
              >
                Get a free quote
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <div className="grid grid-cols-2 gap-3">
                {whatsapp && (
                  <a
                    href={`https://wa.me/${whatsapp}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 px-4 py-4 font-bold text-white transition-colors hover:border-[#25d366] hover:bg-[#25d366]/10"
                  >
                    <MessageCircle className="h-5 w-5 text-[#25d366]" /> WhatsApp
                  </a>
                )}
                <Link
                  to="/tracking"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 px-4 py-4 font-bold text-white transition-colors hover:bg-white/10"
                >
                  <PackageSearch className="h-5 w-5 text-accent-400" /> Track
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ───── Copyright ───── */}
      <p className="relative border-t border-white/10 px-4 py-6 text-center text-xs">
        © {new Date().getFullYear()} {company.name}. All rights reserved.
      </p>
    </footer>
  )
}
