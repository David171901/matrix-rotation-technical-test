import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('@/components/MatrixRotationApp', () => ({
  MatrixRotationApp: () => <div data-testid="matrix-rotation-app">MatrixRotationApp</div>,
}))

import Home from '@/app/page'

describe('Home Page', () => {
  it('should render correctly', async () => {
    render(<Home />)

    await waitFor(() => {
      expect(screen.getByRole('heading', { level: 1, name: /prueba técnica/i })).toBeInTheDocument()
    })
  })

  it('should render main heading', async () => {
    render(<Home />)

    await waitFor(() => {
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveTextContent('Prueba Técnica')
    })
  })

  it('should render subtitle', async () => {
    render(<Home />)

    await waitFor(() => {
      expect(screen.getByText(/rotar matriz nxN en sentido antihorario/i)).toBeInTheDocument()
    })
  })

  it('should render Description component', async () => {
    render(<Home />)

    await waitFor(() => {
      expect(screen.getByRole('region', { name: /descripción/i })).toBeInTheDocument()
    })
  })

  it('should render Examples component', async () => {
    render(<Home />)

    await waitFor(() => {
      expect(screen.getByRole('region', { name: /ejemplos/i })).toBeInTheDocument()
    })
  })

  it('should render MatrixRotationApp component', async () => {
    render(<Home />)

    await waitFor(() => {
      expect(screen.getByTestId('matrix-rotation-app')).toBeInTheDocument()
    })
  })

  it('should have correct structure with header and main sections', async () => {
    const { container } = render(<Home />)

    await waitFor(() => {
      const header = container.querySelector('header')
      const main = container.querySelector('main')
      expect(header).toBeInTheDocument()
      expect(main).toBeInTheDocument()
    })
  })

  it('should render separator between sections', async () => {
    const { container } = render(<Home />)

    await waitFor(() => {
      const separator = container.querySelector('hr')
      expect(separator).toBeInTheDocument()
    })
  })
})
