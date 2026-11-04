import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { House, FolderSimple, Briefcase, User, EnvelopeSimple } from '@phosphor-icons/react'
import { EASE } from '../../lib/motion.js'

const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: House },
  { to: '/projects', label: 'Projects', icon: FolderSimple },
  { to: '/services', label: 'Services', icon: Briefcase },
  { to: '/about', label: 'About', icon: User },
  { to: '/contact', label: 'Contact', icon: EnvelopeSimple },
]

function NavIcon({ icon }) {
  const Icon = icon
  return <Icon size="1.125rem" weight="duotone" aria-hidden="true" className="relative" />
}

// pillId: each nav (sidebar, mobile menu) needs its own id so the sliding highlight stays in its own list.
export default function NavLinks({ onNavigate, pillId = 'nav-pill' }) {
  return (
    <ul className="flex flex-col gap-1">
      {NAV_ITEMS.map(({ to, label, icon }) => (
        <li key={to}>
          <NavLink
            to={to}
            end={to === '/'}
            onClick={onNavigate}
            className={({ isActive }) =>
              `relative flex items-center gap-3 rounded-lg px-3 py-2 text-[0.9375rem] transition-colors ${
                isActive ? 'font-semibold text-ink' : 'text-muted hover:text-ink'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.span
                    layoutId={pillId}
                    aria-hidden="true"
                    className="absolute inset-0 rounded-lg bg-card shadow-[0_1px_0_var(--line)] ring-1 ring-line"
                    transition={{ duration: 0.35, ease: EASE }}
                  />
                )}
                <NavIcon icon={icon} />
                <span className="relative">{label}</span>
              </>
            )}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}
