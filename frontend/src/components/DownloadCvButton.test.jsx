import { vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'

vi.mock('../lib/cvCounter.js', () => ({ recordCvDownload: vi.fn(() => Promise.resolve(false)) }))

import { recordCvDownload } from '../lib/cvCounter.js'
import DownloadCvButton from './DownloadCvButton.jsx'

describe('DownloadCvButton', () => {
  it('links to the CV as a download', () => {
    render(<DownloadCvButton />)
    const link = screen.getByTestId('download-cv')
    expect(link).toHaveAttribute('href', '/cv/jayvee-canlas-cv.pdf')
    expect(link).toHaveAttribute('download')
  })

  it('click records one download and does not block the file', () => {
    render(<DownloadCvButton />)
    const event = new MouseEvent('click', { bubbles: true, cancelable: true })
    fireEvent(screen.getByTestId('download-cv'), event)
    expect(event.defaultPrevented).toBe(false)
    expect(recordCvDownload).toHaveBeenCalledTimes(1)
  })
})
