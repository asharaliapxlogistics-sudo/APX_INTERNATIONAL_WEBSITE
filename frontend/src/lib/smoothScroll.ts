import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

// Space for the fixed navbar comes from each section's own CSS scroll-margin (scroll-mt-*),
// which Lenis respects — so no extra offset here.
let lenis: Lenis | null = null

/** Starts smooth wheel scrolling for the whole site. Touch devices keep native scrolling. */
export function initSmoothScroll() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}
  lenis = new Lenis({
    autoRaf: true,
    lerp: 0.1,
    // In-page links like href="#steps" glide to their section instead of jumping
    anchors: true,
  })
  return () => {
    lenis?.destroy()
    lenis = null
  }
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true })
  else window.scrollTo({ top: 0 })
}

export function scrollToElement(el: HTMLElement) {
  if (lenis) lenis.scrollTo(el)
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/** Pause / resume page scrolling, e.g. while the splash screen is showing. */
export function setScrollLocked(locked: boolean) {
  if (locked) lenis?.stop()
  else lenis?.start()
}
