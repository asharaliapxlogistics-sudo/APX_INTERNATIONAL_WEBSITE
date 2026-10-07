import Reveal from './Reveal'

type Props = {
  eyebrow: string
  title: string
  text?: string
  light?: boolean
  center?: boolean
}

export default function SectionTitle({ eyebrow, title, text, light, center = true }: Props) {
  return (
    <Reveal className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <span className="inline-flex items-center gap-2 rounded-full border border-accent-500/30 bg-accent-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent-500">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
        {eyebrow}
      </span>
      <h2
        className={`mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl ${
          light ? 'text-white' : 'text-ink-900'
        }`}
      >
        {title}
      </h2>
      {text && (
        <p className={`mt-4 text-base leading-relaxed ${light ? 'text-slate-300' : 'text-slate-500'}`}>
          {text}
        </p>
      )}
    </Reveal>
  )
}
