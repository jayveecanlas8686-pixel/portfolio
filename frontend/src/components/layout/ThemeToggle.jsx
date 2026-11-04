import { useEffect, useState } from 'react'
import { Moon, Sun } from '@phosphor-icons/react'
import { applyTheme, getInitialTheme, saveTheme } from '../../lib/theme.js'

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={() => {
        setTheme(next)
        saveTheme(next)
      }}
      aria-label={`Switch to ${next} mode`}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted ring-1 ring-line hover:bg-card hover:text-ink"
    >
      {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  )
}
