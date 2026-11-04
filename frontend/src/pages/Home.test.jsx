import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home.jsx'

function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>,
  )
}

describe('Home', () => {
  it('shows the promise and both CTAs', () => {
    renderHome()
    expect(screen.getByRole('heading', { level: 1, name: 'Less manual work. More reliable data.' })).toBeInTheDocument()
    expect(screen.getAllByRole('link', { name: 'Discuss a project' })[0]).toHaveAttribute('href', '/contact')
    expect(screen.getByRole('link', { name: 'See results' })).toHaveAttribute('href', '/projects')
  })

  it('shows the three results as before → after rows linking to their projects', () => {
    renderHome()
    const cases = [
      [/2\.5×/, '/projects/ai-email-builder', '20 emails/day', '50+ emails/day'],
      [/2h → 10m/, '/projects/waybill-pdf-extraction', '2 hrs/day', '5–10 min/day'],
      [/8×\/day/, '/projects/power-bi-refresh-monitor', 'Refreshed by hand', 'Up to 8×/day, verified'],
    ]
    for (const [name, href, before, after] of cases) {
      const link = screen.getByRole('link', { name })
      expect(link).toHaveAttribute('href', href)
      expect(link).toHaveTextContent(before)
      expect(link).toHaveTextContent(after)
    }
    expect(screen.getByRole('link', { name: /2h → 10m/ })).toHaveTextContent('estimate')
  })

  it('shows 4 services and 3 method steps', () => {
    renderHome()
    expect(screen.getAllByTestId('service')).toHaveLength(4)
    expect(screen.getAllByTestId('method-step')).toHaveLength(3)
  })

  it('services link to their proof projects', () => {
    renderHome()
    expect(screen.getByRole('link', { name: 'Waybill PDF Extraction' })).toHaveAttribute(
      'href',
      '/projects/waybill-pdf-extraction',
    )
  })

  it('offers the CV on the page', () => {
    renderHome()
    expect(screen.getAllByTestId('download-cv').length).toBeGreaterThanOrEqual(1)
  })
})
