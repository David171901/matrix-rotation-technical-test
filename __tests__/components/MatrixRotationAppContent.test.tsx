import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { MatrixRotationAppContent } from '@/components/MatrixRotationApp/MatrixRotationAppContent'
import { MatrixRotationAppProvider } from '@/components/MatrixRotationApp/MatrixRotationAppProvider'

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<MatrixRotationAppProvider>{ui}</MatrixRotationAppProvider>)
}

describe('MatrixRotationAppContent', () => {
  it('should render correctly', async () => {
    renderWithProvider(<MatrixRotationAppContent />)

    await waitFor(() => {
      const section = screen.getByRole('region', { name: /aplicación/i })
      expect(section).toBeInTheDocument()
    })
  })

  it('should have correct aria-labelledby attribute', async () => {
    renderWithProvider(<MatrixRotationAppContent />)

    await waitFor(() => {
      const section = screen.getByRole('region', { name: /aplicación/i })
      expect(section).toHaveAttribute('aria-labelledby', 'app-matrix-rotation')
    })
  })

  it('should render H2 with correct id', async () => {
    renderWithProvider(<MatrixRotationAppContent />)

    await waitFor(() => {
      const heading = screen.getByRole('heading', { level: 2, name: /aplicación/i })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveAttribute('id', 'app-matrix-rotation')
    })
  })

  it('should render InputCard and OutputCard', async () => {
    renderWithProvider(<MatrixRotationAppContent />)

    await waitFor(() => {
      const articles = screen.getAllByRole('article')
      expect(articles).toHaveLength(2)
    })
  })
})
