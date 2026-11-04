import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Lightning } from '@phosphor-icons/react'
import { FLOW_ICONS } from '../lib/flowIcons.js'
import { useReducedMotion } from '../lib/useReducedMotion.js'

const STEP_MS = 1600 // one node "runs" per step
const EDGE_S = 0.7 // seconds for the data to travel to the next node

// Zigzag (snake) placement: row 1 left→right, row 2 right→left, ...
function snakePosition(i, cols) {
  const row = Math.floor(i / cols)
  const inRow = i % cols
  const col = row % 2 === 0 ? inRow : cols - 1 - inRow
  return { row: row + 1, col: col + 1 }
}

// Orthogonal connector between two node boxes (relative to the canvas). Straight across within a row.
// At the snake's turn it routes like n8n does: out past the canvas edge, down, and back into the next
// node's side, so the line never crosses the labels under the nodes.
function edgePath(a, b, width) {
  if (Math.abs(a.cy - b.cy) < 4) {
    const fromX = b.cx > a.cx ? a.right : a.left
    const toX = b.cx > a.cx ? b.left : b.right
    return { d: `M ${fromX} ${a.cy} L ${toX} ${b.cy}`, from: [fromX, a.cy], to: [toX, b.cy] }
  }
  const right = a.cx > width / 2
  const fromX = right ? a.right : a.left
  const toX = right ? b.right : b.left
  const outX = right ? width + 8 : -8
  const r = 10 // rounded corners, like n8n edges
  const sx = right ? 1 : -1
  const d = [
    `M ${fromX} ${a.cy}`,
    `L ${outX - sx * r} ${a.cy}`,
    `Q ${outX} ${a.cy} ${outX} ${a.cy + r}`,
    `L ${outX} ${b.cy - r}`,
    `Q ${outX} ${b.cy} ${outX - sx * r} ${b.cy}`,
    `L ${toX} ${b.cy}`,
  ].join(' ')
  return { d, from: [fromX, a.cy], to: [toX, b.cy] }
}

// An n8n-style workflow in place of a screenshot, for backend projects (user requests 2026-11-04):
// nodes snake across a dotted canvas that fills the space, connected by n8n edges with handle dots.
// The run executes smoothly: each connector draws itself in green while a glowing data dot travels
// along it, the next node lights up, finished nodes get the green border and check badge; then it loops.
// Reduced motion: no movement; the run is shown finished.
export default function WorkflowCard({ title, steps, compact = false, columns }) {
  const reduced = useReducedMotion()
  const [active, setActive] = useState(reduced ? steps.length - 1 : 0)
  const [width, setWidth] = useState(0)
  const [edges, setEdges] = useState([])
  const canvasRef = useRef(null)
  const nodeRefs = useRef([])

  const cols = columns ?? (compact || (width && width < 420) ? 2 : 3)

  useEffect(() => {
    if (reduced) {
      setActive(steps.length - 1)
      return
    }
    const t = setInterval(() => setActive((a) => (a + 1) % steps.length), STEP_MS)
    return () => clearInterval(t)
  }, [reduced, steps.length])

  // Measure node boxes to draw the connectors (re-measured on resize).
  const measure = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const c = canvas.getBoundingClientRect()
    setWidth(c.width)
    const boxes = nodeRefs.current.map((n) => {
      if (!n) return null
      const r = n.getBoundingClientRect()
      return {
        left: r.left - c.left,
        right: r.right - c.left,
        top: r.top - c.top,
        bottom: r.bottom - c.top,
        cx: r.left - c.left + r.width / 2,
        cy: r.top - c.top + r.height / 2,
      }
    })
    if (boxes.some((b) => !b || (b.right === 0 && b.bottom === 0))) return setEdges([])
    setEdges(boxes.slice(0, -1).map((b, i) => edgePath(b, boxes[i + 1], c.width)))
  }, [])

  useLayoutEffect(() => {
    measure()
    if (typeof ResizeObserver === 'undefined' || !canvasRef.current) return
    const ro = new ResizeObserver(measure)
    ro.observe(canvasRef.current)
    return () => ro.disconnect()
  }, [measure, cols, steps.length])

  const node = compact ? 'h-11 w-11' : 'h-12 w-12'

  return (
    <figure
      aria-label={`How ${title} works`}
      className={`relative flex h-full min-h-[260px] w-full flex-col overflow-hidden rounded-[18px] px-6 bg-paper-2 ring-1 ring-line ${
        compact ? 'p-3' : 'p-4'
      }`}
      style={{ backgroundImage: 'radial-gradient(var(--dot) 1px, transparent 1.3px)', backgroundSize: '14px 14px' }}
    >
      <figcaption className="mb-2 flex items-center gap-2 font-mono text-[11px] text-muted">
        <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full bg-accent ${reduced ? '' : 'animate-pulse'}`} />
        {reduced ? 'Workflow executed' : 'Executing workflow'}
      </figcaption>

      <div ref={canvasRef} className="relative flex-1">
        {/* Connectors (decorative) */}
        <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
          {edges.map((e, i) => {
            const done = reduced || i < active
            const drawing = !reduced && i === active - 1
            return (
              <g key={i}>
                <path d={e.d} fill="none" stroke="var(--line)" strokeWidth="2" strokeLinecap="round" />
                <motion.path
                  d={e.d}
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={false}
                  animate={{ pathLength: done ? 1 : 0, opacity: done ? 1 : 0 }}
                  transition={{ duration: drawing ? EDGE_S : 0.25, ease: 'easeInOut' }}
                />
                {[e.from, e.to].map(([x, y], k) => (
                  <circle
                    key={k}
                    cx={x}
                    cy={y}
                    r="3.5"
                    className="transition-colors duration-500"
                    fill={done ? 'var(--accent)' : 'var(--card)'}
                    stroke={done ? 'var(--accent)' : 'var(--muted)'}
                    strokeOpacity={done ? 1 : 0.5}
                    strokeWidth="1.5"
                  />
                ))}
                {/* The data dot travelling along the connector */}
                {drawing && (
                  <motion.circle
                    key={`dot-${active}`}
                    r="4.5"
                    fill="var(--accent)"
                    style={{ offsetPath: `path('${e.d}')`, filter: 'drop-shadow(0 0 4px rgba(15,122,69,0.8))' }}
                    initial={{ offsetDistance: '0%', opacity: 1 }}
                    animate={{ offsetDistance: '100%', opacity: [1, 1, 0] }}
                    transition={{ duration: EDGE_S, ease: 'easeInOut' }}
                  />
                )}
              </g>
            )
          })}
        </svg>

        <ol
          className="relative grid h-full gap-x-2 gap-y-4"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gridAutoRows: 'minmax(0, 1fr)' }}
        >
          {steps.map((s, i) => {
            const Icon = FLOW_ICONS[s.icon]
            const done = reduced || i < active
            const running = !reduced && i === active
            const { row, col } = snakePosition(i, cols)
            return (
              <li
                key={s.title}
                data-active={i === active ? 'true' : 'false'}
                style={{ gridRow: String(row), gridColumn: String(col) }}
                className="flex min-w-0 flex-col items-center justify-center text-center"
              >
                <motion.span
                  ref={(el) => (nodeRefs.current[i] = el)}
                  initial={false}
                  animate={{ scale: running ? 1.06 : 1 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: running && i > 0 ? EDGE_S : 0 }}
                  className={`relative z-10 inline-flex ${node} items-center justify-center bg-card shadow-sm transition-[box-shadow,outline-color] duration-500 ${
                    i === 0 ? 'rounded-l-[26px] rounded-r-xl' : 'rounded-xl'
                  } ${
                    done
                      ? 'outline-2 outline-accent'
                      : running
                        ? 'outline-2 outline-accent/60 shadow-[0_0_0_6px_rgba(15,122,69,0.14)]'
                        : 'outline-1 outline-line'
                  } outline outline-offset-0`}
                >
                  {Icon && <Icon size={compact ? 18 : 22} weight="duotone" className="text-ink" aria-hidden="true" />}
                  {i === 0 && (
                    <Lightning
                      size={12}
                      weight="fill"
                      aria-hidden="true"
                      className="absolute top-1/2 -left-4 -translate-y-1/2 text-[#ff6d5a]"
                    />
                  )}
                  <motion.span
                    aria-hidden="true"
                    initial={false}
                    animate={{ scale: done ? 1 : 0, opacity: done ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -top-1.5 -right-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-accent text-accent-ink ring-2 ring-paper-2"
                  >
                    <Check size={10} weight="bold" />
                  </motion.span>
                </motion.span>
                <strong className={`mt-1.5 block leading-tight text-ink ${compact ? 'text-[11px]' : 'text-[12px]'}`}>
                  {s.title}
                </strong>
                <span className={`mt-0.5 block px-0.5 leading-snug text-muted ${compact ? 'text-[10px]' : 'text-[11px]'}`}>
                  {s.text}
                </span>
              </li>
            )
          })}
        </ol>
      </div>
    </figure>
  )
}
