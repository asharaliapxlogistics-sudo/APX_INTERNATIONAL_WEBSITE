import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => cleanup())

// jsdom lacks these browser APIs; framer-motion, the video section and scrolling rely on them.

class MockIntersectionObserver {
  private callback: IntersectionObserverCallback
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback
  }
  observe(target: Element) {
    // Report everything as on screen so "animate when in view" content renders.
    this.callback([{ isIntersecting: true, target, intersectionRatio: 1 } as IntersectionObserverEntry], this as never)
  }
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}
vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)

class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
vi.stubGlobal('ResizeObserver', MockResizeObserver)

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }),
})

window.scrollTo = vi.fn() as unknown as typeof window.scrollTo
Element.prototype.scrollIntoView = vi.fn()
HTMLMediaElement.prototype.play = vi.fn(() => Promise.resolve())
HTMLMediaElement.prototype.pause = vi.fn()
