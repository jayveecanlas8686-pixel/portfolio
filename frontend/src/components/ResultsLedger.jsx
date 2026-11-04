import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'

// Before → after rows (design doc: results are a change log, not stat tiles).
export default function ResultsLedger({ results }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {results.map((r) => (
        <li key={r.slug}>
          <Link
            to={`/projects/${r.slug}`}
            className="group grid grid-cols-1 gap-x-6 gap-y-1 py-5 sm:grid-cols-[minmax(0,14rem)_1fr_auto] sm:items-center"
          >
            <span className="font-display text-base font-bold text-ink">
              {r.title}
              <span className="sr-only"> ({r.value})</span>
            </span>
            <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-muted line-through decoration-1">{r.before}</span>
              <ArrowRight size={16} className="self-center text-muted" aria-label="became" />
              <span className="font-display text-xl font-bold text-accent">{r.after}</span>
              {r.estimate && <span className="text-sm text-muted">(~40 hrs/month, estimate)</span>}
            </span>
            <ArrowUpRight
              size={18}
              aria-hidden="true"
              className="hidden text-muted transition-colors group-hover:text-accent sm:block"
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}
