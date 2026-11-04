import { useEffect, useState } from 'react'
import { CheckCircle } from '@phosphor-icons/react'
import { useReducedMotion } from '../lib/useReducedMotion.js'

const STEP_MS = 650

// The page's one orchestrated moment: a workflow that "runs" once on load, node by node.
// States per node: idle → running → done. Reduced motion shows the finished run.
export default function WorkflowStrip({ steps, result, caption, compact = false }) {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(reduced ? steps.length : 0)

  useEffect(() => {
    if (reduced) {
      setActive(steps.length)
      return
    }
    if (active >= steps.length) return
    const t = setTimeout(() => setActive((a) => a + 1), STEP_MS)
    return () => clearTimeout(t)
  }, [active, reduced, steps.length])

  const finished = active >= steps.length

  return (
    <figure className={`rounded-[1.25rem] bg-card ring-1 ring-line ${compact ? "p-5" : "p-5 sm:p-6"}`}>
      <figcaption className={`${compact ? "mb-4" : "mb-5"} flex items-center gap-2 text-sm text-muted`}>
        <span
          aria-hidden="true"
          className={`h-2 w-2 rounded-full ${finished ? 'bg-accent' : 'animate-pulse bg-accent/60'}`}
        />
        {caption ?? (finished ? 'Workflow finished' : 'Workflow running')}
      </figcaption>

      <ol className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-0">
        {steps.map((step, i) => {
          const state = i < active ? 'done' : i === active ? 'running' : 'idle'
          return (
            <li key={step} data-state={state} className="flex items-center sm:flex-1 sm:last:flex-none">
              <span
                className={`whitespace-nowrap rounded-xl font-semibold ${compact ? "px-2.5 py-1.5 text-xs" : "px-3 py-2 text-sm"} ring-1 transition-colors duration-300 ${
                  state === 'done'
                    ? 'bg-accent-soft text-accent ring-accent/40'
                    : state === 'running'
                      ? 'bg-card text-ink ring-accent'
                      : 'bg-paper text-muted ring-line'
                }`}
              >
                {step}
              </span>
              {i < steps.length - 1 && (
                <span aria-hidden="true" className={`relative ${compact ? "mx-1.5" : "mx-2"} hidden h-0.5 min-w-3 flex-1 overflow-hidden rounded bg-line sm:block`}>
                  <span
                    className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-500 ease-out"
                    style={{ width: i < active ? '100%' : '0%' }}
                  />
                </span>
              )}
            </li>
          )
        })}
      </ol>

      {result && (
        <p
          className={`${compact ? "mt-4 text-base" : "mt-5 text-lg"} flex items-center gap-2 font-display font-bold text-accent transition-opacity duration-500 ${
            finished ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <CheckCircle size="1.375rem" weight="fill" aria-hidden="true" />
          {result}
        </p>
      )}
    </figure>
  )
}
