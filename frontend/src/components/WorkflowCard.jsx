import { useEffect, useState } from 'react'
import { Sparkle } from '@phosphor-icons/react'
import { FLOW_ICONS } from '../lib/flowIcons.js'
import { useReducedMotion } from '../lib/useReducedMotion.js'

const STEP_MS = 1600

// A moving workflow in place of a screenshot, for backend projects (user request 2026-11-04,
// styled after jepoy.dev's "From lead to follow-up"): steps on the left with a highlight that
// walks down them, dashed lines flowing into a small app window, a sparkle badge.
// Reduced motion: no cycling, no flowing dashes; the last step stays highlighted.
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

  return (
    <figure
      aria-label={`How ${title} works`}
      className={`relative w-full overflow-hidden rounded-[18px] bg-paper-2 ring-1 ring-line ${compact ? 'p-3' : 'p-4'}`}
    >
      <figcaption className="mb-3 font-mono text-[11px] text-muted">How it works</figcaption>

      <div className="flex items-stretch gap-3">
        {/* Steps with a connecting rail */}
        <ol className="relative flex min-w-0 flex-1 flex-col gap-2.5">
          <span aria-hidden="true" className="absolute top-5 bottom-5 left-[7px] w-0.5 rounded bg-accent/30" />
          {steps.map((s, i) => {
            const Icon = FLOW_ICONS[s.icon]
            const on = i === active
            return (
              <li key={s.title} data-active={on ? 'true' : 'false'} className="relative flex items-center gap-2.5 pl-6">
                <span
                  aria-hidden="true"
                  className={`absolute left-0 h-4 w-4 rounded-full border-2 transition-colors duration-300 ${
                    on ? 'border-accent bg-accent' : 'border-accent/60 bg-card'
                  }`}
                />
                <span
                  className={`flex min-w-0 flex-1 items-center gap-2.5 rounded-2xl bg-card px-2.5 py-2 ring-1 transition-all duration-300 ${
                    on ? 'shadow-[0_8px_20px_-12px_rgba(15,122,69,0.6)] ring-accent/50' : 'ring-line'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                      on ? 'bg-accent text-accent-ink' : 'bg-accent-soft text-accent'
                    }`}
                  >
                    {Icon && <Icon size={16} weight="bold" />}
                  </span>
                  <span className="min-w-0">
                    <strong className="block text-[13px] leading-tight text-ink">{s.title}</strong>
                    <span className="block text-[11px] leading-snug text-muted">{s.text}</span>
                  </span>
                </span>
              </li>
            )
          })}
        </ol>

        {/* Flowing dashed lines into a small app window (decorative) */}
        <div aria-hidden="true" className={`relative hidden shrink-0 sm:block ${compact ? 'w-24' : 'w-[38%]'}`}>
          <svg className="absolute inset-y-0 -left-3 h-full w-6" viewBox="0 0 24 100" preserveAspectRatio="none">
            {[20, 50, 80].map((y, i) => (
              <path
                key={y}
                d={`M0 ${y} C 12 ${y}, 12 50, 24 50`}
                fill="none"
                className={`flow-dash ${i === active ? 'stroke-accent' : 'stroke-accent/40'}`}
                strokeWidth="1.5"
                strokeDasharray="3 3"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
          <div className="flex h-full flex-col rounded-xl bg-card p-2.5 ring-1 ring-line">
            <div className="mb-2 flex gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-line" />
              <span className="h-1.5 w-1.5 rounded-full bg-line" />
              <span className="h-1.5 w-1.5 rounded-full bg-line" />
            </div>
            {[80, 60, 72, 50].map((w, i) => (
              <span
                key={i}
                className={`mb-1.5 block h-1.5 rounded transition-colors duration-300 ${
                  i === active ? 'bg-accent/50' : 'bg-paper-2'
                }`}
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
          <span className="absolute -right-1 -bottom-1 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-accent-ink shadow-lg ring-4 ring-paper-2">
            <Sparkle size={18} weight="fill" />
          </span>
        </div>
      </div>
    </figure>
  )
}
