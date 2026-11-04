import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Services from './Services.jsx'
import { SERVICES } from '../data/services.js'

function renderServices() {
  return render(
    <MemoryRouter>
      <Services />
    </MemoryRouter>,
  )
}

describe('Services', () => {
  it('services: 4 cards with ids for anchors', () => {
    renderServices()
    for (const s of SERVICES) {
      expect(document.getElementById(s.id)).not.toBeNull()
    }
    const cards = screen.getAllByTestId('service')
    expect(cards).toHaveLength(4)
    cards.forEach((card, i) => {
      const benefitItems = within(card)
        .getAllByRole('listitem')
        .filter((li) => SERVICES[i].benefits.includes(li.textContent))
      expect(benefitItems).toHaveLength(3)
    })
    expect(screen.getByRole('link', { name: 'Waybill PDF Extraction' })).toHaveAttribute(
      'href',
      '/projects/waybill-pdf-extraction',
    )
  })

  it('services: shows proof results', () => {
    renderServices()
    expect(screen.getByText('20 → 50+ emails a day (2.5×)')).toBeInTheDocument()
  })

  it('services: method steps', () => {
    renderServices()
    expect(screen.getAllByTestId('method-step')).toHaveLength(3)
  })
})
