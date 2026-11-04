import { NavLink } from 'react-router-dom'
import { House, FolderSimple, Briefcase, User, EnvelopeSimple } from '@phosphor-icons/react'

export const NAV_ITEMS = [
  { to: '/', label: 'Home', icon: House },
  { to: '/projects', label: 'Projects', icon: FolderSimple },
  { to: '/services', label: 'Services', icon: Briefcase },
  { to: '/about', label: 'About', icon: User },
  { to: '/contact', label: 'Contact', icon: EnvelopeSimple },
]

export default function NavLinks({ onNavigate }) {
  return (
    <ul className="flex flex-col gap-1">
      {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
        <li key={to}>
          <NavLink
            to={to}
            end={to === '/'}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 text-[15px] transition-colors ${
                isActive
                  ? 'bg-card font-semibold text-ink shadow-[0_1px_0_var(--line)] ring-1 ring-line'
                  : 'text-muted hover:bg-card/60 hover:text-ink'
              }`
            }
          >
            <Icon size={18} weight="duotone" aria-hidden="true" />
            {label}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}
