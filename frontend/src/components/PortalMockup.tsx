import { motion } from 'framer-motion'
import {
  BarChart3,
  Bell,
  CheckCircle2,
  FileText,
  LayoutDashboard,
  MapPin,
  Package,
  PackagePlus,
  Search,
  Settings,
  Truck,
  Wallet,
} from 'lucide-react'

// Illustrative preview of the upcoming APX customer portal — all data is sample data.

const statusStyles: Record<string, string> = {
  Delivered: 'bg-emerald-50 text-emerald-600',
  'In transit': 'bg-brand-50 text-brand-500',
  'Out for delivery': 'bg-amber-50 text-amber-600',
  'Picked up': 'bg-sky-50 text-sky-600',
  Booked: 'bg-slate-100 text-slate-500',
}

const shipments = [
  { id: 'APX20481', to: 'London, UK', status: 'In transit' },
  { id: 'APX20476', to: 'Toronto, CA', status: 'Out for delivery' },
  { id: 'APX20469', to: 'New York, US', status: 'Delivered' },
  { id: 'APX20455', to: 'Manchester, UK', status: 'Picked up' },
  { id: 'APX20450', to: 'Sydney, AU', status: 'Booked' },
]

const bars = [42, 58, 50, 72, 64, 88, 76]

const nav = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Package, label: 'Shipments' },
  { icon: PackagePlus, label: 'Book' },
  { icon: FileText, label: 'Invoices' },
  { icon: BarChart3, label: 'Reports' },
  { icon: Settings, label: 'Settings' },
]

const trackSteps = [
  { label: 'Booked', place: 'Karachi, PK', time: '02 Oct, 10:15 AM', done: true },
  { label: 'Picked up', place: 'Karachi, PK', time: '02 Oct, 04:40 PM', done: true },
  { label: 'Departed origin', place: 'Karachi Hub', time: '03 Oct, 02:10 AM', done: true },
  { label: 'In transit', place: 'Istanbul, TR', time: '03 Oct, 11:30 AM', done: true, current: true },
  { label: 'Arrived destination', place: 'London, UK', time: '', done: false },
  { label: 'Delivered', place: 'London, UK', time: '', done: false },
]

function Dashboard() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 shadow-ink-900/20 ring-slate-200">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-3 flex-1 truncate rounded-md bg-white px-3 py-1 text-[10px] text-slate-400 ring-1 ring-slate-200">
          portal.apxlog.com/dashboard
        </span>
      </div>

      <div className="flex text-[11px]">
        {/* Sidebar */}
        <aside className="hidden w-36 shrink-0 flex-col gap-1 bg-ink-900 p-3 sm:flex">
          <img src="/apx-logo-light.svg" alt="" className="mb-4 h-7 w-auto self-start" />
          {nav.map(({ icon: Icon, label, active }) => (
            <span
              key={label}
              className={`flex items-center gap-2 rounded-lg px-2.5 py-2 font-semibold ${
                active ? 'bg-accent-500 text-white' : 'text-slate-400'
              }`}
            >
              <Icon className="h-3.5 w-3.5" /> {label}
            </span>
          ))}
        </aside>

        {/* Main */}
        <div className="min-w-0 flex-1 bg-slate-50/60 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] text-slate-400">Welcome back,</p>
              <p className="text-sm font-extrabold text-ink-900">Al-Noor Traders</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-slate-400 ring-1 ring-slate-200 md:flex">
                <Search className="h-3 w-3" /> Search shipments
              </span>
              <span className="relative grid h-7 w-7 place-items-center rounded-lg bg-white ring-1 ring-slate-200">
                <Bell className="h-3.5 w-3.5 text-slate-500" />
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-accent-500" />
              </span>
              <span className="rounded-lg bg-accent-500 px-2.5 py-1.5 font-bold text-white">+ New shipment</span>
            </div>
          </div>

          {/* Stat cards */}
          <div className="mt-4 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
            {[
              { icon: Package, label: 'Total shipments', value: '1,248', tone: 'text-brand-500 bg-brand-50' },
              { icon: Truck, label: 'In transit', value: '86', tone: 'text-amber-600 bg-amber-50' },
              { icon: CheckCircle2, label: 'Delivered', value: '1,140', tone: 'text-emerald-600 bg-emerald-50' },
              { icon: Wallet, label: 'COD balance', value: 'Rs 284k', tone: 'text-accent-500 bg-accent-500/10' },
            ].map(({ icon: Icon, label, value, tone }) => (
              <div key={label} className="rounded-xl bg-white p-3 ring-1 ring-slate-100">
                <span className={`grid h-6 w-6 place-items-center rounded-md ${tone}`}>
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <p className="mt-2 text-base font-extrabold text-ink-900">{value}</p>
                <p className="text-[10px] text-slate-400">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-2.5 grid gap-2.5 lg:grid-cols-5">
            {/* Chart */}
            <div className="rounded-xl bg-white p-3 ring-1 ring-slate-100 lg:col-span-2">
              <p className="font-bold text-ink-900">Shipments this week</p>
              <div className="mt-3 flex h-24 items-end gap-2">
                {bars.map((h, i) => (
                  <motion.span
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 + i * 0.08, ease: 'easeOut' }}
                    className={`flex-1 rounded-t-md ${i === 5 ? 'bg-accent-500' : 'bg-brand-500/80'}`}
                  />
                ))}
              </div>
              <div className="mt-1.5 flex justify-between text-[9px] text-slate-400">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                  <span key={i} className="flex-1 text-center">{d}</span>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="rounded-xl bg-white p-3 ring-1 ring-slate-100 lg:col-span-3">
              <p className="font-bold text-ink-900">Recent shipments</p>
              <div className="mt-2 divide-y divide-slate-100">
                {shipments.map((s, i) => (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.08 }}
                    className="flex items-center justify-between gap-2 py-1.5"
                  >
                    <span className="font-mono font-semibold text-ink-900">{s.id}</span>
                    <span className="hidden truncate text-slate-400 sm:block">{s.to}</span>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold ${statusStyles[s.status]}`}>
                      {s.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Phone() {
  return (
    <div className="w-56 rounded-[2.2rem] bg-ink-950 p-2 shadow-2xl ring-1 shadow-ink-900/40 ring-white/10">
      <div className="relative overflow-hidden rounded-[1.8rem] bg-white">
        <div className="absolute top-1.5 left-1/2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-ink-950" />
        {/* Header */}
        <div className="bg-ink-900 px-4 pt-8 pb-4 text-white">
          <p className="text-[9px] text-slate-400">Tracking number</p>
          <p className="font-mono text-sm font-bold">APX20481</p>
          <div className="mt-2 flex items-center justify-between text-[9px]">
            <span className="flex items-center gap-1"><MapPin className="h-2.5 w-2.5 text-accent-400" /> KHI</span>
            <span className="mx-2 h-px flex-1 border-t border-dashed border-white/30" />
            <span className="flex items-center gap-1"><MapPin className="h-2.5 w-2.5 text-accent-400" /> LHR</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '62%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="h-full rounded-full bg-accent-500"
            />
          </div>
          <span className="mt-2.5 inline-block rounded-full bg-accent-500 px-2 py-0.5 text-[9px] font-bold">In transit</span>
        </div>

        {/* Timeline */}
        <ol className="px-4 py-3">
          {trackSteps.map((s, i) => (
            <li key={s.label} className="relative flex gap-2.5 pb-2.5 last:pb-0">
              {i < trackSteps.length - 1 && (
                <span className={`absolute top-3.5 bottom-0 left-[5px] w-px ${s.done && trackSteps[i + 1].done ? 'bg-accent-500' : 'bg-slate-200'}`} />
              )}
              <span
                className={`relative mt-0.5 h-[11px] w-[11px] shrink-0 rounded-full border-2 ${
                  s.current
                    ? 'border-accent-500 bg-white ring-4 ring-accent-500/20'
                    : s.done
                      ? 'border-accent-500 bg-accent-500'
                      : 'border-slate-300 bg-white'
                }`}
              />
              <div className="leading-tight">
                <p className={`text-[10px] font-bold ${s.done ? 'text-ink-900' : 'text-slate-400'}`}>{s.label}</p>
                <p className="text-[8.5px] text-slate-400">
                  {s.place}
                  {s.time && ` · ${s.time}`}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default function PortalMockup() {
  return (
    <motion.div
      className="relative pb-16 lg:pr-48"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
    >
      <motion.div
        variants={{ hidden: { opacity: 0, y: 40, rotateX: 8 }, show: { opacity: 1, y: 0, rotateX: 0 } }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformPerspective: 1200 }}
      >
        <Dashboard />
      </motion.div>

      <motion.div
        variants={{ hidden: { opacity: 0, y: 60 }, show: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-10 right-0 hidden lg:block"
      >
        <div className="animate-float">
          <Phone />
        </div>
      </motion.div>

      {/* Notification toast */}
      <motion.div
        variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
        transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -bottom-2 left-4 sm:left-10"
      >
        <div className="flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-2xl ring-1 shadow-ink-900/15 ring-slate-100">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-500 text-white">
            <CheckCircle2 className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-xs font-bold text-ink-900">APX20469 delivered</span>
            <span className="block text-[10px] text-slate-500">New York, US · just now</span>
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}
