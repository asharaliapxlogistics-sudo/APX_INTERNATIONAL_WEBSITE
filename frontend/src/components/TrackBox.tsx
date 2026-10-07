import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ArrowRight } from 'lucide-react'

type Props = {
  initial?: string
  onSubmit?: (trackingNumber: string) => void
  dark?: boolean
}

export default function TrackBox({ initial = '', onSubmit, dark = true }: Props) {
  const [value, setValue] = useState(initial)
  const navigate = useNavigate()

  function submit(e: FormEvent) {
    e.preventDefault()
    const no = value.trim()
    if (!no) return
    if (onSubmit) onSubmit(no)
    else navigate(`/tracking?no=${encodeURIComponent(no)}`)
  }

  return (
    <form
      onSubmit={submit}
      className={`group flex w-full items-center gap-2 rounded-2xl p-2 transition-shadow ${
        dark
          ? 'border border-white/15 bg-white/10 backdrop-blur-xl focus-within:border-accent-500/60 focus-within:shadow-[0_0_0_4px_rgba(242,17,26,0.15)]'
          : 'border border-slate-200 bg-white shadow-xl shadow-ink-900/5 focus-within:border-accent-500 focus-within:shadow-[0_0_0_4px_rgba(242,17,26,0.12)]'
      }`}
    >
      <Search className={`ml-3 h-5 w-5 shrink-0 ${dark ? 'text-slate-400' : 'text-slate-400'}`} />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter your tracking number"
        className={`min-w-0 flex-1 bg-transparent px-2 py-3 text-base outline-none ${
          dark ? 'text-white placeholder:text-slate-400' : 'text-ink-900 placeholder:text-slate-400'
        }`}
      />
      <button
        type="submit"
        className="flex shrink-0 items-center gap-2 rounded-xl bg-accent-500 px-5 py-3 text-sm font-bold text-white transition-all hover:bg-accent-600 active:scale-95"
      >
        Track <ArrowRight className="h-4 w-4 transition-transform group-focus-within:translate-x-0.5" />
      </button>
    </form>
  )
}
