import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// jsdom has no matchMedia; default every query to "no match" (light theme, motion allowed).
// Tests that need a match override window.matchMedia themselves.
export function mockMatchMedia(matches = () => false) {
  window.matchMedia = vi.fn((query) => ({
    matches: matches(query),
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
}

mockMatchMedia()

// jsdom lacks IntersectionObserver, which framer-motion's whileInView uses.
class IO {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return [] }
}
window.IntersectionObserver = IO

window.scrollTo = vi.fn()

afterEach(() => {
  cleanup()
  mockMatchMedia()
  vi.restoreAllMocks()
})
