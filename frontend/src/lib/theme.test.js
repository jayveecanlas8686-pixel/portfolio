import { vi } from 'vitest'
import { getInitialTheme, saveTheme, applyTheme } from './theme.js'

describe('theme', () => {
  beforeEach(() => {
    try { localStorage.clear() } catch { /* ignore */ }
    delete document.documentElement.dataset.theme
  })

  it('defaults to light', () => {
    expect(getInitialTheme()).toBe('light')
  })

  it('uses a saved theme', () => {
    saveTheme('dark')
    expect(getInitialTheme()).toBe('dark')
  })

  it('survives localStorage throwing', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked') })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked') })
    expect(getInitialTheme()).toBe('light')
    expect(() => saveTheme('dark')).not.toThrow()
  })

  it('applyTheme sets data-theme', () => {
    applyTheme('dark')
    expect(document.documentElement.dataset.theme).toBe('dark')
  })
})
