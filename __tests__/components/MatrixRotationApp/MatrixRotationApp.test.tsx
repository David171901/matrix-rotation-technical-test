import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { MatrixRotationApp } from '@/components/MatrixRotationApp'

describe('MatrixRotationApp', () => {
  it('should render correctly', async () => {
    render(<MatrixRotationApp />)

    await waitFor(() => {
      expect(screen.getByRole('region', { name: /aplicación/i })).toBeInTheDocument()
    })
  })

  it('should render InputCard and OutputCard', async () => {
    render(<MatrixRotationApp />)

    await waitFor(() => {
      const articles = screen.getAllByRole('article')
      expect(articles.length).toBeGreaterThanOrEqual(2)
    })
  })

  it('should render application heading', async () => {
    render(<MatrixRotationApp />)

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 2, name: /aplicación/i })).toBeInTheDocument()
    })
  })
})
