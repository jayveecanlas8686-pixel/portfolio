import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { render, screen, within } from '@testing-library/react'
import ToolTags from './ToolTags.jsx'
import { TOOL_ICONS } from '../lib/toolIcons.js'
import { getProject, PROJECTS } from '../data/projects.js'

// Official logos instead of names (user request 2026-11-04); a text chip only when no official logo exists.
describe('ToolTags', () => {
  it('shows the official logo for a known tool, named for screen readers and on hover', () => {
    render(<ToolTags tools={['Figma API']} />)
    const logo = screen.getByRole('img', { name: 'Figma API' })
    expect(logo).toHaveAttribute('src', '/icons/tools/figma.svg')
    expect(within(logo.closest('li')).getByRole('tooltip')).toHaveTextContent('Figma API')
    // The name lives only in the tooltip, not as a visible label next to the logo.
    expect(screen.getAllByText('Figma API').every((el) => el.getAttribute('role') === 'tooltip')).toBe(true)
  })

  it('falls back to the name only for a tool nobody has mapped', () => {
    render(<ToolTags tools={['Some Unknown Tool']} />)
    expect(screen.getByText('Some Unknown Tool')).toBeInTheDocument()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('every tool on every project has an icon (no text-only chips left)', () => {
    const tools = [...new Set(PROJECTS.flatMap((p) => p.tools))]
    const missing = tools.filter((t) => !TOOL_ICONS[t])
    expect(missing).toEqual([])
  })

  it('hovering or focusing an icon shows its name in a tooltip', () => {
    render(<ToolTags tools={['Klaviyo', 'PDF extraction']} />)
    for (const name of ['Klaviyo', 'PDF extraction']) {
      const chip = screen.getByRole('img', { name }).closest('li')
      expect(chip).toHaveAttribute('tabindex', '0')
      const tip = within(chip).getByRole('tooltip')
      expect(tip).toHaveTextContent(name)
      expect(tip.className).toMatch(/group-hover\/tool:opacity-100/)
      expect(tip.className).toMatch(/group-focus\/tool:opacity-100/)
    }
  })

  it('sits above the card link overlay so hover reaches the icons', () => {
    render(<ToolTags tools={['Figma API']} />)
    const list = screen.getByRole('list', { name: 'Tools used' })
    expect(list.className).toMatch(/\brelative\b/)
    expect(list.className).toMatch(/\bz-10\b/)
  })

  it('every mapped logo file exists', () => {
    for (const { src } of Object.values(TOOL_ICONS).filter((i) => i.src)) {
      expect(existsSync(resolve(process.cwd(), 'public' + src)), src).toBe(true)
    }
  })

  it('every project tool with a logo resolves', () => {
    const tools = new Set(PROJECTS.flatMap((p) => p.tools))
    for (const t of ['Claude API', 'Gemini', 'OpenRouter', 'Firecrawl', 'code.to.design', 'Slack', 'n8n', 'Power BI']) {
      expect(TOOL_ICONS[t], t).toBeDefined()
    }
    expect(tools.size).toBeGreaterThan(0)
  })
})

describe('AI Email Builder lists the services it really uses', () => {
  it('matches the project code (.env names and API calls, 2026-11-04)', () => {
    expect(getProject('ai-email-builder').tools).toEqual([
      'Claude API',
      'Gemini',
      'OpenRouter',
      'Figma API',
      'Firecrawl',
      'code.to.design',
      'Slack',
      'Cloudflare Turnstile',
      'Supabase',
      'Puppeteer',
      'Socket.io',
      'Railway',
    ])
  })
})
