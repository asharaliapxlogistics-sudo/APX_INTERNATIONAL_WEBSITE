import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageHeader from './PageHeader'

export type LegalSection = { id: string; title: string; body: ReactNode }

type Props = {
  eyebrow: string
  title: string
  intro: string
  updated: string
  sections: LegalSection[]
}

/** Shared layout for the Terms and Privacy pages: header, sticky contents list and readable body text. */
export default function LegalLayout({ eyebrow, title, intro, updated, sections }: Props) {
  const [active, setActive] = useState(sections[0]?.id)

  useEffect(() => {
    const onScroll = () => {
      let current = sections[0]?.id
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top < 160) current = s.id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [sections])

  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} text={intro}>
        <p className="mt-6 text-sm text-slate-400">Last updated: {updated}</p>
      </PageHeader>

      <section className="py-20 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[16rem_1fr]">
          <aside className="hidden lg:block">
            <nav className="sticky top-28">
              <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">Contents</p>
              <ol className="mt-4 space-y-1 border-l border-slate-200">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm transition-colors ${
                        active === s.id
                          ? 'border-accent-500 font-semibold text-ink-900'
                          : 'border-transparent text-slate-500 hover:text-ink-900'
                      }`}
                    >
                      {i + 1}. {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="min-w-0">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="scroll-mt-28 border-b border-slate-100 py-8 first:pt-0 last:border-0">
                <h2 className="text-2xl font-extrabold tracking-tight text-ink-900">
                  <span className="mr-2 text-accent-500">{i + 1}.</span>
                  {s.title}
                </h2>
                <div className="legal-body mt-4 space-y-4 leading-relaxed text-slate-600">{s.body}</div>
              </section>
            ))}

            <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-3xl bg-slate-50 p-8 ring-1 ring-slate-100 sm:flex-row sm:items-center">
              <div>
                <p className="font-bold text-ink-900">Questions about this page?</p>
                <p className="text-sm text-slate-500">Our team is happy to help.</p>
              </div>
              <Link
                to="/contact"
                className="group flex items-center gap-2 rounded-full bg-ink-900 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-accent-500"
              >
                Contact us <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  )
}
