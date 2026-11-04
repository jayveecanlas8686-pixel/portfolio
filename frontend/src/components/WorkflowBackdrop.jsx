import { useReducedMotion } from '../lib/useReducedMotion.js'

// Page background (user request 2026-11-04): instead of plain contour lines, a few long workflow
// connectors sweep behind the page with small n8n-style nodes on them, and green data pulses travel
// slowly along each line, like a run in progress. Decorative only; reduced motion keeps it still.
const WIRES = [
  { d: 'M -60 170 C 260 100, 430 430, 760 360 S 1170 110, 1520 210', dur: 14 },
  { d: 'M -60 760 C 240 650, 540 860, 840 720 S 1250 520, 1520 640', dur: 17 },
  { d: 'M 1010 -60 C 950 200, 1150 300, 1090 520 S 1170 860, 1240 980', dur: 12 },
  { d: 'M 300 980 C 360 760, 180 600, 420 500 S 620 200, 520 -60', dur: 19 },
]

// Nodes sit where wires meet or bend (in the 1440x900 drawing space).
const NODES = [
  [760, 360],
  [840, 720],
  [1090, 520],
  [420, 500],
  [1252, 300],
]

export default function WorkflowBackdrop() {
  const reduced = useReducedMotion()
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-0 h-full w-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <filter id="pulse-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>

      {WIRES.map((w, i) => (
        <g key={i}>
          <path data-wire d={w.d} fill="none" stroke="var(--muted)" strokeOpacity="0.16" strokeWidth="1.25" />
          {!reduced && (
            <>
              {/* a green segment running along the wire */}
              <path
                data-pulse
                d={w.d}
                pathLength="1000"
                fill="none"
                stroke="var(--accent)"
                strokeOpacity="0.55"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeDasharray="70 930"
                className="backdrop-run"
                style={{ animationDuration: `${w.dur}s`, animationDelay: `${-i * 3.1}s` }}
              />
              {/* the data dot leading it */}
              <circle r="3" fill="var(--accent)" fillOpacity="0.8" filter="url(#pulse-glow)">
                <animateMotion dur={`${w.dur}s`} begin={`${-i * 3.1}s`} repeatCount="indefinite" path={w.d} />
              </circle>
            </>
          )}
        </g>
      ))}

      {NODES.map(([x, y], i) => (
        <g key={i} data-node transform={`translate(${x - 9} ${y - 9})`}>
          <rect width="18" height="18" rx="5" fill="var(--paper)" stroke="var(--muted)" strokeOpacity="0.28" strokeWidth="1.25" />
          <circle cx="0" cy="9" r="2.4" fill="var(--paper)" stroke="var(--muted)" strokeOpacity="0.35" />
          <circle cx="18" cy="9" r="2.4" fill="var(--paper)" stroke="var(--muted)" strokeOpacity="0.35" />
        </g>
      ))}
    </svg>
  )
}
