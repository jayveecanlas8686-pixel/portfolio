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
