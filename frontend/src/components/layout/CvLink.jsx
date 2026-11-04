import { DownloadSimple } from '@phosphor-icons/react'
import { profile } from '../../data/profile.js'

// Placeholder until Task 3 swaps in DownloadCvButton (same testid and href).
export default function CvLink({ variant = 'primary' }) {
  const cls =
    variant === 'compact'
      ? 'inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-paper'
      : 'inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-paper hover:opacity-90'
  return (
    <a data-testid="download-cv" href={profile.cvPath} download className={cls}>
      <DownloadSimple size={16} weight="bold" aria-hidden="true" />
      Download CV
    </a>
  )
}
