import { DownloadSimple } from '@phosphor-icons/react'
import { profile } from '../data/profile.js'
import { recordCvDownload } from '../lib/cvCounter.js'

const STYLES = {
  primary:
    'inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-paper transition-opacity hover:opacity-90',
  compact:
    'inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-paper',
  outline:
    'inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-ink ring-1 ring-line hover:bg-card',
}

// Fire-and-forget count, then the browser downloads the PDF as normal (spec §9).
export default function DownloadCvButton({ variant = 'primary' }) {
  return (
    <a
      data-testid="download-cv"
      href={profile.cvPath}
      download
      onClick={() => {
        recordCvDownload()
      }}
      className={STYLES[variant] ?? STYLES.primary}
    >
      <DownloadSimple size={16} weight="bold" aria-hidden="true" />
      Download CV
    </a>
  )
}
