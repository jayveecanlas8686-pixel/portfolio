import { render, screen } from '@testing-library/react'
import { mockMatchMedia } from '../../test/setup.js'
import Reveal from './Reveal.jsx'

describe('Reveal', () => {
  it('reduced motion: content is visible immediately, never left hidden', () => {
    mockMatchMedia((q) => q.includes('prefers-reduced-motion'))
    render(
      <Reveal>
        <p>Section content</p>
      </Reveal>,
    )
    expect(screen.getByText('Section content')).toBeVisible()
  })

  it('renders its children as the given element', () => {
    render(
      <Reveal as="section" aria-label="Group">
        <p>Inside</p>
      </Reveal>,
    )
    expect(screen.getByRole('region', { name: 'Group' })).toContainElement(screen.getByText('Inside'))
  })
})
