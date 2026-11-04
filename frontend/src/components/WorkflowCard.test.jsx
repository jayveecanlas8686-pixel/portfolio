import { render, screen, act } from '@testing-library/react'
import { vi } from 'vitest'
import { mockMatchMedia } from '../test/setup.js'
import WorkflowCard from './WorkflowCard.jsx'
import { FLOW_ICONS } from '../lib/flowIcons.js'
import { PROJECTS } from '../data/projects.js'

const STEPS = [
  { icon: 'question', title: 'Question', text: 'Someone asks in Slack' },
  { icon: 'memory', title: 'Slack memory', text: "Searches the team's own history" },
  { icon: 'answer', title: 'Answer or task', text: 'Replies, or posts the task' },
]

// Moving workflow for projects with no screenshot (user request 2026-11-04, styled after jepoy.dev).
describe('WorkflowCard', () => {
  it('shows every step in order, labeled for screen readers', () => {
    render(<WorkflowCard title="Nest Brain" steps={STEPS} />)
    expect(screen.getByRole('figure', { name: 'How Nest Brain works' })).toBeInTheDocument()
    expect(screen.getAllByRole('listitem').map((li) => li.querySelector('strong').textContent)).toEqual([
      'Question',
      'Slack memory',
      'Answer or task',
    ])
  })

  it('moves the highlight from step to step', () => {
    vi.useFakeTimers()
    render(<WorkflowCard title="Nest Brain" steps={STEPS} />)
    const active = () => screen.getAllByRole('listitem').findIndex((li) => li.dataset.active === 'true')
    expect(active()).toBe(0)
    act(() => vi.advanceTimersByTime(1700))
    expect(active()).toBe(1)
    act(() => vi.advanceTimersByTime(1700))
    expect(active()).toBe(2)
    act(() => vi.advanceTimersByTime(1700))
    expect(active()).toBe(0)
    vi.useRealTimers()
  })

  it('with reduced motion it stays still on the last step', () => {
    mockMatchMedia((q) => q.includes('prefers-reduced-motion'))
    vi.useFakeTimers()
    render(<WorkflowCard title="Nest Brain" steps={STEPS} />)
    const active = () => screen.getAllByRole('listitem').findIndex((li) => li.dataset.active === 'true')
    expect(active()).toBe(2)
    act(() => vi.advanceTimersByTime(5000))
    expect(active()).toBe(2)
    vi.useRealTimers()
  })
})

describe('every project without a screenshot has a workflow', () => {
  it('a full run of 5 to 7 steps each, with known icons', () => {
    const noImage = PROJECTS.filter((p) => !p.image)
    expect(noImage.length).toBeGreaterThan(0)
    for (const p of noImage) {
      expect(p.flow?.length, p.slug).toBeGreaterThanOrEqual(5)
      expect(p.flow.length, p.slug).toBeLessThanOrEqual(7)
      for (const s of p.flow) {
        expect(FLOW_ICONS[s.icon], `${p.slug}: ${s.icon}`).toBeDefined()
        expect(s.title && s.text, p.slug).toBeTruthy()
      }
    }
  })
})


describe('WorkflowCard zigzag layout', () => {
  const SIX = Array.from({ length: 6 }, (_, i) => ({ icon: 'data', title: 'Step ' + (i + 1), text: 'x' }))

  it('snakes: row 1 left to right, row 2 right to left (3 per row)', () => {
    render(<WorkflowCard title="Demo" steps={SIX} columns={3} />)
    const cells = screen.getAllByRole('listitem')
    const pos = cells.map((li) => [li.style.gridRow, li.style.gridColumn])
    expect(pos).toEqual([
      ['1', '1'], ['1', '2'], ['1', '3'],
      ['2', '3'], ['2', '2'], ['2', '1'],
    ])
  })

  it('fills the space it is given (full height canvas)', () => {
    render(<WorkflowCard title="Demo" steps={SIX} />)
    expect(screen.getByRole('figure').className).toMatch(/\bh-full\b/)
  })
})
