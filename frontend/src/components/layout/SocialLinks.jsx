import { GithubLogo, LinkedinLogo, FacebookLogo, EnvelopeSimple } from '@phosphor-icons/react'
import { profile } from '../../data/profile.js'

const ICONS = { GitHub: GithubLogo, LinkedIn: LinkedinLogo, Facebook: FacebookLogo }

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-1">
      {profile.socials.map(({ label, href }) => {
        const Icon = ICONS[label]
        return (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-card hover:text-ink"
          >
            <Icon size={18} aria-hidden="true" />
          </a>
        )
      })}
      <a
        href={`mailto:${profile.email}`}
        aria-label="Email"
        className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-card hover:text-ink"
      >
        <EnvelopeSimple size={18} aria-hidden="true" />
      </a>
    </div>
  )
}
