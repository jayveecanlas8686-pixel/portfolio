import { render, screen, within } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ClientDetail from './ClientDetail.jsx'

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/clients/:id" element={<ClientDetail kind="client" />} />
        <Route path="/employment/:id" element={<ClientDetail kind="employer" />} />
        <Route path="/personal" element={<ClientDetail kind="personal" />} />
      </Routes>
    </MemoryRouter>,
  )
}

const articleFor = (title) => screen.getByRole('heading', { name: title }).closest('article')

describe('Client page', () => {
  it('shows the client and every project built for them', () => {
    renderAt('/clients/nest-marketing')
    expect(screen.getByRole('heading', { level: 1, name: 'Nest Marketing' })).toBeInTheDocument()
    expect(screen.getByText('Umar Shaikh, Founder')).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(5)
    expect(screen.getByRole('link', { name: 'Nest Brain' })).toHaveAttribute('href', '/projects/nest-brain')
    expect(screen.getByText('Launching November 2026')).toBeInTheDocument()
  })

  it('a project being built says Building, not Built, and shows its status', () => {
    renderAt('/clients/nest-marketing')
    const card = within(articleFor('Nest Guardrails'))
    expect(card.getByText('Building')).toBeInTheDocument()
    expect(card.queryByText('Built')).not.toBeInTheDocument()
    expect(card.getByText('In progress')).toBeInTheDocument()
  })

  it('shows Resét with Sebastian and both projects', () => {
    renderAt('/clients/reset')
    expect(screen.getByRole('heading', { level: 1, name: 'Resét Skin & Aesthetics' })).toBeInTheDocument()
    expect(screen.getByText('Sebastian Larsen, Owner')).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(2)
  })

  it('shows SimGolf with its owner, Keld Jensen', () => {
    renderAt('/clients/simgolf')
    expect(screen.getByRole('heading', { level: 1, name: 'SimGolf' })).toBeInTheDocument()
    expect(screen.getByText('Keld Jensen, Owner')).toBeInTheDocument()
    expect(screen.getByText('In progress')).toBeInTheDocument()
  })

  it('unknown client shows not found', () => {
    renderAt('/clients/nope')
    expect(screen.getByRole('heading', { name: /not found/i })).toBeInTheDocument()
  })
})

describe('Employment page: Brigada', () => {
  it('shows role, dates and all 8 projects: stories as rows, repos as tiles', () => {
    renderAt('/employment/brigada')
    expect(screen.getByRole('heading', { level: 1, name: 'Brigada Distributions' })).toBeInTheDocument()
    expect(screen.getByText('Data Engineer / Analyst, Jan 2024 – Mar 2026')).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(8)
    expect(screen.getByTestId('rows')).toBeInTheDocument()
    expect(screen.getByTestId('tiles')).toBeInTheDocument()
  })

  it('a real card shows Problem / Built / Result, with the estimate label', () => {
    renderAt('/employment/brigada')
    const card = within(articleFor('Waybill PDF Extraction'))
    expect(card.getByText('Problem')).toBeInTheDocument()
    expect(card.getByText('Built')).toBeInTheDocument()
    expect(card.getByText('Result')).toBeInTheDocument()
    expect(card.getByText(/2 hrs → 5–10 min a day/)).toBeInTheDocument()
    expect(card.getByText(/estimate/)).toBeInTheDocument()
  })

  it('context lines show commas, not dots', () => {
    const { container } = renderAt('/employment/brigada')
    expect(screen.getByText('Operations team, n8n, daily')).toBeInTheDocument()
    expect(container.textContent).not.toContain(' · ')
  })

  it('repo tiles link to their detail pages', () => {
    renderAt('/employment/brigada')
    const tile = articleFor('Azure Data Quality Framework')
    expect(within(tile).getByRole('link', { name: 'Azure Data Quality Framework' })).toHaveAttribute(
      'href',
      '/projects/azure-data-quality-framework',
    )
  })
})

describe('Personal page', () => {
  it('shows the YouTube generator and the 5 demos', () => {
    renderAt('/personal')
    expect(screen.getByRole('heading', { level: 1, name: 'Personal projects' })).toBeInTheDocument()
    expect(screen.getAllByRole('article')).toHaveLength(6)
    expect(within(articleFor('YouTube Shorts Generator')).getByText(/Personal project/)).toBeInTheDocument()
  })

  it('demo tiles: What it does, no Result, safe external link, link to detail', () => {
    renderAt('/personal')
    const card = within(articleFor('ShopHub'))
    expect(card.getByText('What it does')).toBeInTheDocument()
    expect(card.queryByText('Result')).not.toBeInTheDocument()
    const ext = card.getByRole('link', { name: 'Open demo' })
    expect(ext).toHaveAttribute('target', '_blank')
    expect(ext.getAttribute('rel')).toContain('noreferrer')
    expect(card.getByRole('link', { name: 'ShopHub' })).toHaveAttribute('href', '/projects/shophub')
  })
})
