import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import About from './About.jsx'
import { ABOUT } from '../data/about.js'

function renderAbout() {
  return render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  )
}

describe('About', () => {
  it('about: experience, education, certifications', () => {
    renderAbout()
    expect(screen.getByText('Brigada Distributions Inc.')).toBeInTheDocument()
    expect(screen.getByText('BS Computer Engineering')).toBeInTheDocument()
    for (const c of ABOUT.certifications) {
      expect(screen.getByText(c.title)).toBeInTheDocument()
    }
    expect(screen.getAllByTestId('download-cv').length).toBeGreaterThanOrEqual(1)
    const cert = screen.getByRole('link', { name: /n8n Quickstart/ })
    expect(cert).toHaveAttribute('href', '/images/certs/n8n-quickstart.pdf')
    expect(cert).toHaveAttribute('target', '_blank')
    expect(cert.getAttribute('rel')).toContain('noreferrer')
  })

  it('about: toolkit', () => {
    renderAbout()
    // Scoped: "n8n" is also a certificate issuer elsewhere on the page.
    const toolkit = screen.getByRole('region', { name: 'Toolkit' })
    for (const tool of ['n8n', 'SQL Server', 'Python']) {
      expect(within(toolkit).getByText(tool)).toBeInTheDocument()
    }
  })
})
