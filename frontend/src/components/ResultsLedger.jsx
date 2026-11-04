import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'

// Before → after rows (design doc: results are a change log, not stat tiles).
// compact: stacked rows for the Home hub tile.
export default function ResultsLedger({ results, compact = false }) {
  return (
    <ul className={`divide-y divide-line ${compact ? '' : 'border-y border-line'}`}>
      {results.map((r) => (
        <li key={r.slug}>
          <Link
            to={`/projects/${r.slug}`}
            className={
              compact
                ? 'group flex items-start justify-between gap-3 py-3 first:pt-0'
                : 'group grid grid-cols-1 gap-x-6 gap-y-1 py-5 sm:grid-cols-[minmax(0,14rem)_1fr_auto] sm:items-center'
            }
          >
            <span className={compact ? 'min-w-0' : 'contents'}>
              <span className={`block font-display font-bold text-ink ${compact ? 'text-sm' : 'text-base'}`}>
                {r.title}
                <span className="sr-only"> ({r.value})</span>
              </span>
              <span className={`flex flex-wrap items-baseline gap-x-2 gap-y-0.5 ${compact ? 'mt-0.5' : ''}`}>
                <span className={`text-muted line-through decoration-1 ${compact ? 'text-sm' : ''}`}>{r.before}</span>
                <ArrowRight size={compact ? 14 : 16} className="self-center text-muted" role="img" aria-label="became" />
                <span className={`font-display font-bold text-accent ${compact ? 'text-base' : 'text-xl'}`}>{r.after}</span>
                {r.note && <span className="text-xs text-muted">({r.note})</span>}
              </span>
            </span>
            <ArrowUpRight
              size={compact ? 16 : 18}
              aria-hidden="true"
              className={`shrink-0 text-muted transition-colors group-hover:text-accent ${compact ? 'mt-0.5' : 'hidden sm:block'}`}
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}
