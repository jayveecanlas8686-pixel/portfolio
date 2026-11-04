import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

describe('vercel.json', () => {
  it('rewrites every path to index.html so deep links work', () => {
    const config = JSON.parse(readFileSync(resolve(process.cwd(), 'vercel.json'), 'utf8'))
    expect(config.rewrites).toContainEqual({ source: '/(.*)', destination: '/index.html' })
  })
})
