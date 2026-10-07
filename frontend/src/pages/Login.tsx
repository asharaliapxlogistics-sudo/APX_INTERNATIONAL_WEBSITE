import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, BarChart3, FileText, Info, Lock, Mail, PackageSearch, User, Building2 } from 'lucide-react'
import Logo from '../components/Logo'

const perks = [
  { icon: PackageSearch, text: 'Book & track all your shipments' },
  { icon: FileText, text: 'Download invoices and airway bills' },
  { icon: BarChart3, text: 'Reports on your shipping activity' },
]

const inputWrap =
  'flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 transition-all focus-within:border-accent-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-accent-500/10'

export default function Login() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [notice, setNotice] = useState(false)

  function submit(e: FormEvent) {
    e.preventDefault()
    setNotice(true)
  }

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

      {/* Form panel */}
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
          <h2 className="text-3xl font-extrabold tracking-tight text-ink-900">Customer Portal</h2>
          <p className="mt-2 text-slate-500">
            {mode === 'login' ? 'Welcome back! Sign in to manage your shipments.' : 'Create an account to start shipping with APX.'}
          </p>

          <div className="relative mt-8 grid grid-cols-2 rounded-xl bg-slate-100 p-1">
            {(['login', 'signup'] as const).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m)
                  setNotice(false)
                }}
                className={`relative z-10 rounded-lg py-2.5 text-sm font-bold transition-colors ${mode === m ? 'text-ink-900' : 'text-slate-500'}`}
              >
                {mode === m && (
                  <motion.span layoutId="auth-tab" className="absolute inset-0 -z-10 rounded-lg bg-white shadow" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                )}
                {m === 'login' ? 'Login' : 'Sign up'}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.form
              key={mode}
              initial={{ opacity: 0, x: mode === 'login' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onSubmit={submit}
              className="mt-8 space-y-4"
            >
              {mode === 'signup' && (
                <>
                  <label className={inputWrap}>
                    <User className="h-5 w-5 text-slate-400" />
                    <input required placeholder="Full name" className="w-full bg-transparent py-3.5 outline-none" />
                  </label>
                  <label className={inputWrap}>
                    <Building2 className="h-5 w-5 text-slate-400" />
                    <input placeholder="Company (optional)" className="w-full bg-transparent py-3.5 outline-none" />
                  </label>
                </>
              )}
              <label className={inputWrap}>
                <Mail className="h-5 w-5 text-slate-400" />
                <input required type="email" placeholder="Email address" className="w-full bg-transparent py-3.5 outline-none" />
              </label>
              <label className={inputWrap}>
                <Lock className="h-5 w-5 text-slate-400" />
                <input required type="password" placeholder="Password" className="w-full bg-transparent py-3.5 outline-none" />
              </label>

              {mode === 'login' && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-slate-500">
                    <input type="checkbox" className="h-4 w-4 accent-accent-500" /> Remember me
                  </label>
                  <button type="button" onClick={() => setNotice(true)} className="font-semibold text-brand-600 hover:underline">
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-accent-500 py-4 font-bold text-white shadow-lg shadow-accent-500/30 transition-all hover:bg-accent-600 active:scale-[0.99]"
              >
                {mode === 'login' ? 'Sign in' : 'Create account'}
              </button>

              {mode === 'signup' && (
                <p className="text-center text-xs text-slate-400">
                  By creating an account you agree to our{' '}
                  <Link to="/terms" className="font-semibold text-slate-500 hover:text-accent-500">Terms</Link> and{' '}
                  <Link to="/privacy" className="font-semibold text-slate-500 hover:text-accent-500">Privacy Policy</Link>.
                </p>
              )}

              <AnimatePresence>
                {notice && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-start gap-3 rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-700"
                  >
                    <Info className="mt-0.5 h-4 w-4 shrink-0" />
                    The customer portal is launching soon. Meanwhile, please contact us at info@apxlog.com for bookings.
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.form>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
