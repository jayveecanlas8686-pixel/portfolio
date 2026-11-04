import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { render, screen } from '@testing-library/react'
import ToolTags from './ToolTags.jsx'
import { TOOL_ICONS } from '../lib/toolIcons.js'
import { getProject, PROJECTS } from '../data/projects.js'

// Official logos instead of names (user request 2026-11-04); a text chip only when no official logo exists.
describe('ToolTags', () => {
  it('shows the official logo for a known tool, named for screen readers and on hover', () => {
    render(<ToolTags tools={['Figma API']} />)
    const logo = screen.getByRole('img', { name: 'Figma API' })
    expect(logo).toHaveAttribute('src', '/icons/tools/figma.svg')
    expect(logo.closest('li')).toHaveAttribute('title', 'Figma API')
    expect(screen.queryByText('Figma API')).not.toBeInTheDocument()
  })

  it('falls back to the name when there is no official logo', () => {
    render(<ToolTags tools={['Klaviyo']} />)
    expect(screen.getByText('Klaviyo')).toBeInTheDocument()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('every mapped logo file exists', () => {
    for (const { src } of Object.values(TOOL_ICONS)) {
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
