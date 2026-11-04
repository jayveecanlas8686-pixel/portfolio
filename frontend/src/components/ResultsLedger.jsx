import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'

// Before → after rows (design doc: results are a change log, not stat tiles).
// compact: stacked rows for the Home hub tile.
export default function ResultsLedger({ results, compact = false }) {
  return (
    <ul className={`divide-y divide-line ${compact ? 'flex flex-1 flex-col' : 'border-y border-line'}`}>
      {results.map((r) => (
        <li key={r.slug} className={compact ? 'flex flex-1 items-center' : undefined}>
          <Link
            to={`/projects/${r.slug}`}
            className={
              compact
                ? 'group flex w-full items-start justify-between gap-3 py-3 first:pt-0'
                : 'group grid grid-cols-1 gap-x-6 gap-y-1 py-5 sm:grid-cols-[minmax(0,14rem)_1fr_auto] sm:items-center'
            }
          >
            <span className={compact ? 'min-w-0 flex-1' : 'contents'}>
              <span
                className={`font-display font-bold text-ink ${compact ? 'flex flex-wrap items-baseline justify-between gap-x-3 text-sm xl:flex-nowrap' : 'block text-base'}`}
              >
                <span className="min-w-0 xl:truncate">
                  {r.title}
                  <span className="sr-only"> ({r.value})</span>
                </span>
                {r.client && <span className="shrink-0 font-body text-xs font-normal text-muted">{r.client}</span>}
              </span>
              <span className={`flex flex-wrap items-baseline gap-x-2 gap-y-0.5 ${compact ? 'mt-0.5' : ''}`}>
                <span className={`text-muted line-through decoration-1 ${compact ? 'text-sm' : ''}`}>{r.before}</span>
                <ArrowRight size={compact ? '0.875rem' : '1rem'} className="self-center text-muted" role="img" aria-label="became" />
                <span className={`font-display font-bold text-accent ${compact ? 'text-base' : 'text-xl'}`}>{r.after}</span>
                {r.note && <span className="text-xs text-muted">({r.note})</span>}
              </span>
            </span>
            {!compact && (
              <ArrowUpRight
                size="1.125rem"
                aria-hidden="true"
                className="hidden shrink-0 text-muted transition-colors group-hover:text-accent sm:block"
              />
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}
