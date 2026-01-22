import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Description } from '@/components/Description'

describe('Description', () => {
  it('should render correctly', () => {
    render(<Description />)

    const section = screen.getByRole('region', { name: /descripción/i })
    expect(section).toBeInTheDocument()
  })

  it('should have correct aria-labelledby attribute', () => {
    render(<Description />)

    const section = screen.getByRole('region', { name: /descripción/i })
    expect(section).toHaveAttribute('aria-labelledby', 'descripcion')
  })

  it('should render H2 with correct id', () => {
    render(<Description />)

    const heading = screen.getByRole('heading', { level: 2, name: /descripción/i })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveAttribute('id', 'descripcion')
  })

  it('should render description text', () => {
    render(<Description />)

    expect(
      screen.getByText(/esta aplicación web permite ingresar dinámicamente/i)
    ).toBeInTheDocument()
    expect(screen.getByText(/90°/i)).toBeInTheDocument()
  })

  it('should highlight NxN and 90° in the text', () => {
    render(<Description />)

    const nxnSpan = screen.getByText('NxN')
    const degreesSpan = screen.getByText('90°')

    expect(nxnSpan).toBeInTheDocument()
    expect(degreesSpan).toBeInTheDocument()
    expect(nxnSpan.tagName).toBe('SPAN')
    expect(degreesSpan.tagName).toBe('SPAN')
  })
})
