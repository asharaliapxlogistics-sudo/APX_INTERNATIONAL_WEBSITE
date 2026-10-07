import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type Props = {
  eyebrow: string
  title: string
  text?: string
  children?: ReactNode
}

export default function PageHeader({ eyebrow, title, text, children }: Props) {
  return (
    <section className="relative overflow-hidden bg-ink-900 pt-40 pb-24 text-white">
      <div className="grid-bg absolute inset-0" />
      <div className="absolute -top-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-brand-600/30 blur-3xl" />
      <div className="absolute -bottom-40 -left-20 h-80 w-80 rounded-full bg-accent-500/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1.5 text-sm text-slate-400"
        >
          <Link to="/" className="hover:text-white">Home</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-accent-400">{eyebrow}</span>
        </motion.nav>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>
        {text && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-300"
          >
            {text}
          </motion.p>
        )}
        {children}
      </div>
    </section>
  )
}
