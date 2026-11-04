const KEY = 'theme'

// Light is the default (spec §5); only an explicit saved choice switches it.
export function getInitialTheme() {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // storage blocked (private mode): fall through to the default
  }
  return 'light'
}

export function saveTheme(theme) {
  try {
    localStorage.setItem(KEY, theme)
  } catch {
    // storage blocked: the choice lasts for this page view only
  }
}

export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme
}

// ── One shared theme state for every toggle (sidebar + mobile menu) ──
// The <html data-theme> attribute is the single source of truth, so a toggle that
// mounts later (the mobile menu) reads the current theme instead of re-deriving it.
const listeners = new Set()

export function getTheme() {
  const current = document.documentElement.dataset.theme
  return current === 'dark' || current === 'light' ? current : getInitialTheme()
}

export function setTheme(theme) {
  applyTheme(theme)
  saveTheme(theme)
  listeners.forEach((l) => l())
}

export function subscribeTheme(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
