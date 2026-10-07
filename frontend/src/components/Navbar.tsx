import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, LogIn, LayoutDashboard, Phone, ChevronDown, PackageOpen, Ban, ArrowRight, MapPinned } from 'lucide-react'
import Logo from './Logo'
import { company, offices, services } from '../data/site'

const thumb = (id: string, w = 160) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${w}&q=70`

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/tracking', label: 'Tracking' },
  { to: '/contact', label: 'Contact' },
]

const resources = [
  { to: '/packaging', label: 'Packaging Guide', text: 'How to pack your parcel safely', icon: PackageOpen },
  { to: '/prohibited-items', label: 'Prohibited Items', text: 'What you can and can’t ship', icon: Ban },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const [resOpen, setResOpen] = useState(false)
  const resActive = resources.some((r) => r.to === pathname)

  // Services mega menu: opens on hover, with a short close delay so the pointer can travel into the panel.
  const [megaOpen, setMegaOpen] = useState(false)
  const closeTimer = useRef<number | undefined>(undefined)
  const openMega = () => {
    window.clearTimeout(closeTimer.current)
    setMegaOpen(true)
  }
  const closeMegaSoon = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 150)
  }

  const renderLink = (l: (typeof links)[number]) => (
    <li
      key={l.to}
      {...(l.to === '/services' && { onMouseEnter: openMega, onMouseLeave: closeMegaSoon, onFocus: openMega })}
    >
      <NavLink
        to={l.to}
        end={l.to === '/'}
        onClick={() => setMegaOpen(false)}
        className={({ isActive }) =>
          `relative inline-flex items-center rounded-full px-3 py-2 text-sm font-semibold whitespace-nowrap transition-colors xl:px-4 ${
            solid
              ? isActive ? 'text-ink-900' : 'text-slate-500 hover:text-ink-900'
              : isActive ? 'text-white' : 'text-slate-300 hover:text-white'
          }`
        }
      >
        {({ isActive }) => (
          <span className="flex items-center gap-1">
            {l.label}
            {l.to === '/services' && <ChevronDown className={`h-4 w-4 transition-transform ${megaOpen ? 'rotate-180' : ''}`} />}
            {isActive && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent-500"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
          </span>
        )}
      </NavLink>
    </li>
  )


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setResOpen(false)
    setMegaOpen(false)
  }, [pathname])

  const solid = scrolled || open

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Top contact strip */}
      <div
        className={`hidden overflow-hidden bg-ink-950 text-xs text-slate-400 transition-all duration-300 lg:block ${
          scrolled ? 'max-h-0' : 'max-h-10'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2">
          <span>Providing courier & logistics services worldwide since {company.since}</span>
          <span className="flex items-center gap-5">
            <a href={`tel:${offices[0].phones[0].replace(/\s/g, '')}`} className="flex items-center gap-1.5 hover:text-white">
              <Phone className="h-3.5 w-3.5" /> {offices[0].phones[0]}
            </a>
            <a href={`mailto:${company.email}`} className="hover:text-white">
              {company.email}
            </a>
          </span>
        </div>
      </div>

      <nav
        className={`relative transition-all duration-300 ${
          solid ? 'bg-white/90 shadow-lg shadow-ink-900/5 backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" aria-label="APX home" className="shrink-0">
            <Logo light={!solid} />
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.slice(0, 4).map(renderLink)}
            <li
              className="relative"
              onMouseEnter={() => setResOpen(true)}
              onMouseLeave={() => setResOpen(false)}
            >
              <button
                onClick={() => setResOpen((o) => !o)}
                className={`relative flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold whitespace-nowrap transition-colors xl:px-4 ${
                  solid
                    ? resActive ? 'text-ink-900' : 'text-slate-500 hover:text-ink-900'
                    : resActive ? 'text-white' : 'text-slate-300 hover:text-white'
                }`}
              >
                Resources <ChevronDown className={`h-4 w-4 transition-transform ${resOpen ? 'rotate-180' : ''}`} />
                {resActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent-500"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
              </button>
              <AnimatePresence>
                {resOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-1/2 w-72 -translate-x-1/2 pt-3"
                  >
                    <div className="rounded-2xl bg-white p-2 shadow-2xl ring-1 shadow-ink-900/10 ring-slate-100">
                      {resources.map((r) => (
                        <Link key={r.to} to={r.to} className="flex gap-3 rounded-xl p-3 transition-colors hover:bg-slate-50">
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-500/10 text-accent-500">
                            <r.icon className="h-5 w-5" />
                          </span>
                          <span>
                            <span className="block text-sm font-bold text-ink-900">{r.label}</span>
                            <span className="block text-xs text-slate-500">{r.text}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
            {links.slice(4).map(renderLink)}
          </ul>

          <div className="hidden items-center gap-2 lg:flex">
            <Link
              to="/login"
              className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold whitespace-nowrap transition-colors xl:px-4 ${
                solid ? 'text-ink-900 hover:bg-slate-100' : 'text-white hover:bg-white/10'
              }`}
            >
              <LogIn className="h-4 w-4" /> Login
            </Link>
            <Link
              to={company.portalUrl}
              className="group flex items-center gap-2 rounded-full bg-accent-500 px-4 py-2.5 text-sm font-bold whitespace-nowrap text-white xl:px-5 shadow-lg shadow-accent-500/30 transition-all hover:-translate-y-0.5 hover:bg-accent-600"
            >
              <LayoutDashboard className="h-4 w-4 transition-transform group-hover:rotate-12" />
              Customer Portal
            </Link>
          </div>

          <button
            onClick={() => setOpen((o) => !o)}
            className={`rounded-lg p-2 lg:hidden ${solid ? 'text-ink-900' : 'text-white'}`}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>


        {/* ───── Services mega menu (desktop) ───── */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={openMega}
              onMouseLeave={closeMegaSoon}
              className="absolute inset-x-0 top-full hidden px-6 pt-2 lg:block"
            >
              <div className="mx-auto grid max-w-7xl grid-cols-12 gap-6 overflow-hidden rounded-3xl bg-white p-6 shadow-2xl ring-1 shadow-ink-900/15 ring-slate-100">
                <div className="col-span-8">
                  <div className="flex items-center justify-between px-3">
                    <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">Our services</p>
                    <Link
                      to="/services"
                      onClick={() => setMegaOpen(false)}
                      className="group flex items-center gap-1 text-sm font-bold text-accent-500"
                    >
                      View all <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-1">
                    {services.map((sv, i) => (
                      <motion.div
                        key={sv.slug}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.04 * i }}
                      >
                        <Link
                          to={`/services#${sv.slug}`}
                          onClick={() => setMegaOpen(false)}
                          className="group flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-slate-50"
                        >
                          <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                            <img
                              src={thumb(sv.image)}
                              alt=""
                              loading="lazy"
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                              style={sv.imagePosition ? { objectPosition: sv.imagePosition } : undefined}
                            />
                            <span className="absolute inset-0 bg-ink-900/20" />
                            <sv.icon className="absolute bottom-1.5 left-1.5 h-4 w-4 text-white" />
                          </span>
                          <span className="min-w-0">
                            <span className="flex items-center gap-1 font-bold text-ink-900 group-hover:text-accent-500">
                              {sv.title}
                              <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                            </span>
                            <span className="mt-0.5 line-clamp-2 block text-xs leading-relaxed text-slate-500">{sv.short}</span>
                          </span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="col-span-4 flex flex-col gap-3">
                  <Link
                    to="/contact"
                    onClick={() => setMegaOpen(false)}
                    className="group relative flex flex-1 flex-col justify-end overflow-hidden rounded-2xl p-5 text-white"
                  >
                    <img
                      src={thumb('1578575437130-527eed3abbec', 600)}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-ink-950/10" />
                    <span className="relative">
                      <span className="block text-lg leading-snug font-extrabold">Not sure which service you need?</span>
                      <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-accent-500 px-4 py-2 text-sm font-bold">
                        Get a free quote <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </span>
                  </Link>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { to: '/tracking', label: 'Track', icon: MapPinned },
                      ...resources.map((r) => ({ to: r.to, label: r.label.split(' ')[0], icon: r.icon })),
                    ].map((q) => (
                      <Link
                        key={q.to}
                        to={q.to}
                        onClick={() => setMegaOpen(false)}
                        className="flex flex-col items-center gap-1.5 rounded-xl bg-slate-50 py-3 text-xs font-bold text-ink-900 transition-colors hover:bg-accent-500/10 hover:text-accent-500"
                      >
                        <q.icon className="h-4 w-4 text-accent-500" /> {q.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-slate-100 bg-white lg:hidden"
            >
              <div className="space-y-1 px-4 py-4">
                {links.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    end={l.to === '/'}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-3 text-sm font-semibold ${
                        isActive ? 'bg-brand-50 text-brand-600' : 'text-slate-600 hover:bg-slate-50'
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
                {resources.map((r) => (
                  <NavLink
                    key={r.to}
                    to={r.to}
                    className={({ isActive }) =>
                      `flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${
                        isActive ? 'bg-brand-50 text-brand-600' : 'text-slate-600 hover:bg-slate-50'
                      }`
                    }
                  >
                    <r.icon className="h-4 w-4 text-accent-500" /> {r.label}
                  </NavLink>
                ))}
                <div className="grid grid-cols-2 gap-2 pt-3">
                  <Link to="/login" className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-ink-900">
                    <LogIn className="h-4 w-4" /> Login
                  </Link>
                  <Link to={company.portalUrl} className="flex items-center justify-center gap-2 rounded-xl bg-accent-500 py-3 text-sm font-bold text-white">
                    <LayoutDashboard className="h-4 w-4" /> Portal
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
