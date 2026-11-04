import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { List, X } from '@phosphor-icons/react'
import { profile } from '../../data/profile.js'
import NavLinks from './NavLinks.jsx'
import SocialLinks from './SocialLinks.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import DownloadCvButton from '../DownloadCvButton.jsx'
import Avatar from './Avatar.jsx'

export default function MobileBar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-sm lg:hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex min-w-0 items-center gap-2.5">
          <Avatar size={34} />
          <span className="truncate font-display text-[0.9375rem] font-bold">{profile.name}</span>
        </Link>
        <div className="flex items-center gap-2">
          <DownloadCvButton variant="compact" />
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg ring-1 ring-line"
          >
            {open ? <X size="1.125rem" aria-hidden="true" /> : <List size="1.125rem" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-label="Site menu"
          className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-paper px-4 pb-5 pt-3"
        >
          <nav aria-label="Mobile">
            <NavLinks onNavigate={() => setOpen(false)} pillId="nav-pill-mobile" />
          </nav>
          <div className="mt-4 flex items-center justify-between">
            <SocialLinks />
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  )
}
