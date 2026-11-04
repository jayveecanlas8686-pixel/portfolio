import { useEffect, useState } from 'react'
import { Check, Lightning } from '@phosphor-icons/react'
import { FLOW_ICONS } from '../lib/flowIcons.js'
import { useReducedMotion } from '../lib/useReducedMotion.js'

const STEP_MS = 1600

// An n8n-style workflow in place of a screenshot, for backend projects (user request 2026-11-04).
// Nodes on a dotted canvas, left to right: a trigger node first, connector lines with handle dots,
// labels under each node. It "executes" like an n8n run: the running node pulses, finished nodes get
// the green border and check badge, their connector turns green, then the run starts again.
// Reduced motion: no cycling; the run is shown finished.
export default function WorkflowCard({ title, steps, compact = false }) {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(reduced ? steps.length - 1 : 0)

  useEffect(() => {
    if (reduced) {
      setActive(steps.length - 1)
      return
    }
    const t = setInterval(() => setActive((a) => (a + 1) % steps.length), STEP_MS)
    return () => clearInterval(t)
  }, [reduced, steps.length])

  const node = compact ? 'h-12 w-12' : 'h-14 w-14'

  return (
    <figure
      aria-label={`How ${title} works`}
      className={`relative w-full overflow-hidden rounded-[18px] bg-paper-2 ring-1 ring-line ${compact ? 'px-3 py-3' : 'px-4 py-4'}`}
      style={{
        backgroundImage: 'radial-gradient(var(--dot) 1px, transparent 1.3px)',
        backgroundSize: '14px 14px',
      }}
    >
      <figcaption className="mb-3 flex items-center gap-2 font-mono text-[11px] text-muted">
        <span
          aria-hidden="true"
          className={`h-1.5 w-1.5 rounded-full ${reduced ? 'bg-accent' : 'animate-pulse bg-accent'}`}
        />
        {reduced ? 'Workflow executed' : 'Executing workflow'}
      </figcaption>

      <ol className="flex items-start">
        {steps.map((s, i) => {
          const Icon = FLOW_ICONS[s.icon]
          const done = reduced ? true : i < active
          const running = !reduced && i === active
          const last = i === steps.length - 1
          return (
            <li
              key={s.title}
              data-active={i === active ? 'true' : 'false'}
              className="relative flex min-w-0 flex-1 flex-col items-center text-center"
            >
              {/* Connector to the next node (n8n edge with handle dots) */}
              {!last && (
                <span aria-hidden="true" className={`absolute left-1/2 flex w-full items-center ${compact ? 'top-6' : 'top-7'}`}>
                  <span className={`ml-[calc(theme(spacing.7)+2px)] h-2 w-2 shrink-0 rounded-full border ${done ? 'border-accent bg-accent' : 'border-muted/50 bg-card'}`} />
                  <span className={`h-0.5 flex-1 transition-colors duration-500 ${done ? 'bg-accent' : 'bg-muted/30'}`} />
                  <span className={`mr-[calc(theme(spacing.7)+2px)] h-2 w-2 shrink-0 rounded-full border ${done ? 'border-accent bg-accent' : 'border-muted/50 bg-card'}`} />
                </span>
              )}

              {/* Node: the first is a trigger (rounded left side, lightning badge) */}
              <span
                className={`relative z-10 inline-flex ${node} items-center justify-center bg-card shadow-sm transition-all duration-300 ${
                  i === 0 ? 'rounded-l-[28px] rounded-r-xl' : 'rounded-xl'
                } ${
                  done
                    ? 'ring-2 ring-accent'
                    : running
                      ? 'ring-2 ring-accent/60 shadow-[0_0_0_6px_rgba(15,122,69,0.12)]'
                      : 'ring-1 ring-line'
                }`}
              >
                {Icon && <Icon size={compact ? 20 : 24} weight="duotone" className="text-ink" aria-hidden="true" />}
                {i === 0 && (
                  <Lightning
                    size={12}
                    weight="fill"
                    aria-hidden="true"
                    className="absolute top-1/2 -left-4 -translate-y-1/2 text-[#ff6d5a]"
                  />
                )}
                {done && (
                  <span
                    aria-hidden="true"
                    className="absolute -top-1.5 -right-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-accent text-accent-ink ring-2 ring-paper-2"
                  >
                    <Check size={10} weight="bold" />
                  </span>
                )}
              </span>

              <strong className={`mt-2 block leading-tight text-ink ${compact ? 'text-[11px]' : 'text-[12px]'}`}>{s.title}</strong>
              <span className={`mt-0.5 block px-1 leading-snug text-muted ${compact ? 'text-[10px]' : 'text-[11px]'}`}>{s.text}</span>
            </li>
          )
        })}
      </ol>
    </figure>
  )
}
