import { render, screen, act } from '@testing-library/react'
import { vi } from 'vitest'
import { mockMatchMedia } from '../test/setup.js'
import WorkflowStrip from './WorkflowStrip.jsx'

const STEPS = ['Waybill PDF', 'n8n extracts', 'Clean data', 'Excel ✓']

describe('WorkflowStrip', () => {
  it('renders every step in order', () => {
    render(<WorkflowStrip steps={STEPS} result="2 hrs → 5–10 min" />)
    const items = screen.getAllByRole('listitem')
    expect(items.map((li) => li.textContent)).toEqual(STEPS)
  })

  it('reduced motion shows the final state immediately', () => {
    mockMatchMedia((q) => q.includes('prefers-reduced-motion'))
    render(<WorkflowStrip steps={STEPS} result="2 hrs → 5–10 min" />)
    for (const li of screen.getAllByRole('listitem')) expect(li).toHaveAttribute('data-state', 'done')
    expect(screen.getByText('2 hrs → 5–10 min')).toBeVisible()
  })

  it('runs once: steps light up in sequence and stop when all are done', () => {
    vi.useFakeTimers()
    render(<WorkflowStrip steps={STEPS} result="2 hrs → 5–10 min" />)
    const states = () => screen.getAllByRole('listitem').map((li) => li.dataset.state)
    expect(states()).toEqual(['running', 'idle', 'idle', 'idle'])
    act(() => vi.advanceTimersByTime(700))
    expect(states()).toEqual(['done', 'running', 'idle', 'idle'])
    for (let i = 0; i < 10; i++) act(() => vi.advanceTimersByTime(700))
    expect(states()).toEqual(['done', 'done', 'done', 'done'])
    vi.useRealTimers()
  })
})
