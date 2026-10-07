import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {word}
    </motion.span>
  )
}

/** Large statement whose words light up one by one as the reader scrolls through it. */
export default function ScrollRevealText({ text, highlight = [] }: { text: string; highlight?: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const words = text.split(' ')

  return (
    <p ref={ref} className="flex flex-wrap text-3xl leading-tight font-extrabold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
      {words.map((w, i) => {
        const start = i / words.length
        const isHighlight = highlight.includes(w.replace(/[^\w&]/g, ''))
        return (
          <span key={i} className={isHighlight ? 'text-accent-500' : undefined}>
            <Word word={w} progress={scrollYProgress} range={[start, start + 1 / words.length]} />
          </span>
        )
      })}
    </p>
  )
}
