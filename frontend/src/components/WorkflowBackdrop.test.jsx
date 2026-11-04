import { render } from '@testing-library/react'
import { mockMatchMedia } from '../test/setup.js'
import WorkflowBackdrop from './WorkflowBackdrop.jsx'

// Page background: faint workflow lines with data pulses running along them (user request 2026-11-04).
describe('WorkflowBackdrop', () => {
  it('is decorative: hidden from screen readers and never catches clicks', () => {
    const { container } = render(<WorkflowBackdrop />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('aria-hidden', 'true')
    expect(svg.getAttribute('class')).toMatch(/pointer-events-none/)
  })

  it('draws connector lines with nodes, and runs data pulses along them', () => {
    const { container } = render(<WorkflowBackdrop />)
    expect(container.querySelectorAll('[data-wire]').length).toBeGreaterThanOrEqual(3)
    expect(container.querySelectorAll('[data-node]').length).toBeGreaterThanOrEqual(3)
    expect(container.querySelectorAll('[data-pulse]').length).toBeGreaterThanOrEqual(3)
  })

  it('with reduced motion: lines and nodes only, nothing moving', () => {
    mockMatchMedia((q) => q.includes('prefers-reduced-motion'))
    const { container } = render(<WorkflowBackdrop />)
    expect(container.querySelectorAll('[data-wire]').length).toBeGreaterThanOrEqual(3)
    expect(container.querySelectorAll('[data-pulse]')).toHaveLength(0)
    expect(container.querySelectorAll('animateMotion')).toHaveLength(0)
  })
})
