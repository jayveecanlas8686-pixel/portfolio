import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ClientDetail from './ClientDetail.jsx'

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/clients/:id" element={<ClientDetail />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('Client page', () => {
  it('shows the client and every project built for them', () => {
    renderAt('/clients/nest-marketing')
    expect(screen.getByRole('heading', { level: 1, name: 'Nest Marketing' })).toBeInTheDocument()
    expect(screen.getByText('Umar Shaikh, Founder')).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(4)
    expect(screen.getByRole('link', { name: 'Nest Brain' })).toHaveAttribute('href', '/projects/nest-brain')
    expect(screen.getByText('Launching November 2026')).toBeInTheDocument()
  })

  it('shows Resét with Sebastian and the dashboard', () => {
    renderAt('/clients/reset')
    expect(screen.getByRole('heading', { level: 1, name: 'Resét Skin & Aesthetics' })).toBeInTheDocument()
    expect(screen.getByText('Sebastian Larsen, Owner')).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(1)
  })

  it('unknown client shows not found', () => {
    renderAt('/clients/nope')
    expect(screen.getByRole('heading', { name: /not found/i })).toBeInTheDocument()
  })
})
