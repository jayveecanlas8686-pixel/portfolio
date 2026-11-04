import { useSyncExternalStore } from 'react'
import { Moon, Sun } from '@phosphor-icons/react'
import { getTheme, setTheme, subscribeTheme } from '../../lib/theme.js'

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, () => 'light')
  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} mode`}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted ring-1 ring-line hover:bg-card hover:text-ink"
    >
      {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  )
}
