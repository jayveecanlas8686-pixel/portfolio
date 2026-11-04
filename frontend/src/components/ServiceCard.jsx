import { Link } from 'react-router-dom'
import { Check } from '@phosphor-icons/react'
import { getProject } from '../data/projects.js'
import ResultHeadline from './ResultHeadline.jsx'

// One service in the 2×2 hairline grid. Not numbered: services aren't a sequence (design doc).
// showProofResults: also print each proof project's result headline (Services page).
export default function ServiceCard({ service, showProofResults = false, headingLevel = 3 }) {
  const Heading = `h${headingLevel}`
  const proofs = service.proofSlugs.map(getProject).filter(Boolean)
  return (
    <article id={service.id} data-testid="service" className="scroll-mt-24 py-8 sm:px-8">
      <Heading className="text-2xl font-bold">{service.title}</Heading>
      <p className="mt-2 max-w-[46ch] text-muted">{service.outcome}</p>
      <ul className="mt-4 space-y-1.5">
        {service.benefits.map((b) => (
          <li key={b} className="flex items-start gap-2 text-[15px]">
            <Check size={18} weight="bold" className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
            {b}
          </li>
        ))}
      </ul>
      <div className="mt-5 text-sm">
        <span className="text-muted">Proof: </span>
        <ul className="inline">
          {proofs.map((p, i) => (
            <li key={p.slug} className="inline">
              <Link to={`/projects/${p.slug}`} className="font-semibold text-ink underline decoration-line underline-offset-4 hover:decoration-accent">
                {p.title}
              </Link>
              {showProofResults && p.result && (
                <>
                  {' '}
                  <ResultHeadline result={p.result} className="text-sm" />
                </>
              )}
              {i < proofs.length - 1 && <span className="text-muted">, </span>}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
