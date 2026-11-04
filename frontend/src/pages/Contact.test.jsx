import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Contact from './Contact.jsx'
import { buildMailto } from '../lib/mailto.js'

function renderContact() {
  return render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>,
  )
}

describe('Contact', () => {
  it('contact: buildMailto encodes subject and body', () => {
    const url = buildMailto({ name: 'Ana & Co', message: 'Need help\nwith Excel', email: 'jayveecanlas8686@gmail.com' })
    expect(url.startsWith('mailto:jayveecanlas8686@gmail.com?subject=')).toBe(true)
    expect(url).toContain(encodeURIComponent('Project inquiry from Ana & Co'))
    expect(url).toContain(encodeURIComponent('Need help\nwith Excel'))
  })

  it('contact: direct email and socials', () => {
    renderContact()
    expect(
      screen.getAllByRole('link').some((a) => a.getAttribute('href') === 'mailto:jayveecanlas8686@gmail.com'),
    ).toBe(true)
    for (const name of ['GitHub', 'LinkedIn', 'Facebook']) {
      const link = screen.getByRole('link', { name })
      expect(link).toHaveAttribute('target', '_blank')
      expect(link.getAttribute('rel')).toContain('noreferrer')
    }
  })

  it('contact: fields are labeled and required', () => {
    renderContact()
    expect(screen.getByLabelText('Your name')).toBeRequired()
    expect(screen.getByLabelText('What do you need?')).toBeRequired()
  })
})
