import { Link } from 'react-router-dom'
import { profile } from '../../data/profile.js'
import NavLinks from './NavLinks.jsx'
import SocialLinks from './SocialLinks.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import DownloadCvButton from '../DownloadCvButton.jsx'
import Avatar from './Avatar.jsx'

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[16.5rem] flex-col border-r border-line bg-paper-2 overflow-y-auto px-4 py-6 lg:flex">
      <Link to="/" className="flex items-center gap-3 rounded-lg px-2 py-1">
        <Avatar size={44} />
        <span className="min-w-0">
          <span className="block font-display text-[0.9375rem] font-bold leading-tight text-ink">{profile.name}</span>
          <span className="block text-xs text-muted">{profile.role}</span>
        </span>
      </Link>

      <nav aria-label="Main" className="mt-8">
        <NavLinks />
      </nav>

      <div className="mt-auto flex flex-col gap-4">
        <div className="flex items-center justify-between px-1">
          <SocialLinks />
          <ThemeToggle />
        </div>
        <DownloadCvButton variant="primary" />
      </div>
    </aside>
  )
}
