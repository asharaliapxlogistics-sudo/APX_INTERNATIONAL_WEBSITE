import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, BarChart3, Building2, FileText, Info, PackageSearch, ShieldCheck } from 'lucide-react'
import Logo from '../components/Logo'

// The APX ERP, where customers and staff actually sign in.
const ERP_URL = (import.meta.env.VITE_ERP_URL || 'https://erp.apxintl.net').replace(/\/$/, '')

const portals = [
  {
    href: `${ERP_URL}/login`,
    icon: ShieldCheck,
    iconCls: 'bg-brand-50 text-brand-600',
    title: 'APX Staff / Admin',
    text: 'Bookings, airway bills, billing and reports',
  },
  {
    href: `${ERP_URL}/portal/login`,
    icon: Building2,
    iconCls: 'bg-accent-500/10 text-accent-500',
    title: 'Customer Portal',
    text: 'Track shipments, send addresses and see invoices',
  },
]

const perks = [
  { icon: PackageSearch, text: 'Track all your shipments' },
  { icon: FileText, text: 'See and print your invoices' },
  { icon: BarChart3, text: 'Reports on your shipping activity' },
]

export default function Login() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left visual panel */}
      <div className="relative hidden overflow-hidden bg-ink-900 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="grid-bg absolute inset-0" />
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-brand-600/40 blur-3xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-accent-500/25 blur-3xl" />

        <Link to="/" className="relative">
          <Logo light />
        </Link>

        <div className="relative">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl leading-tight font-extrabold tracking-tight"
          >
            Your shipments.
            <br />
            <span className="text-gradient">One dashboard.</span>
          </motion.h1>
          <ul className="mt-10 space-y-4">
            {perks.map((p, i) => (
              <motion.li
                key={p.text}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.12 }}
                className="flex items-center gap-4"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-accent-400 backdrop-blur">
                  <p.icon className="h-5 w-5" />
                </span>
                <span className="font-semibold text-slate-200">{p.text}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <p className="relative text-sm text-slate-400">© {new Date().getFullYear()} APX International</p>
      </div>

      {/* Portal links: both sign-ins live in the APX ERP */}
      <div className="flex flex-col px-6 py-10 sm:px-12">
        <div className="flex items-center justify-between">
          <Link to="/" className="lg:hidden">
            <Logo />
          </Link>
          <Link to="/" className="ml-auto flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-ink-900">
            <ArrowLeft className="h-4 w-4" /> Back to website
          </Link>
        </div>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink-900">Sign in</h2>
          <p className="mt-2 text-slate-500">Choose your portal. You will sign in with the username and password APX gave you.</p>

          <div className="mt-8 space-y-4">
            {portals.map((p, i) => (
              <motion.a
                key={p.href}
                href={p.href}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-accent-500 hover:shadow-xl hover:shadow-accent-500/10"
              >
                <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${p.iconCls}`}>
                  <p.icon className="h-6 w-6" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-bold text-ink-900">{p.title}</span>
                  <span className="block text-sm text-slate-500">{p.text}</span>
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-accent-500" />
              </motion.a>
            ))}
          </div>

          <p className="mt-8 flex items-start gap-3 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-500">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
            <span>
              Need a customer account? APX sets it up for you.{' '}
              <Link to="/contact" className="font-semibold text-brand-600 hover:underline">Contact us</Link>.
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
