import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import RootLayout from '@/app/layout'

vi.mock('next/font/google', () => ({
  Inter: vi.fn(() => ({
    variable: '--font-inter',
    className: 'font-inter',
  })),
  JetBrains_Mono: vi.fn(() => ({
    variable: '--font-jetbrains-mono',
    className: 'font-jetbrains-mono',
  })),
}))

vi.mock('@/components/ui/sonner', () => ({
  Toaster: () => <div data-testid='toaster'>Toaster</div>,
}))

vi.mock('@/app/globals.css', () => ({}))

describe('RootLayout', () => {
  it('should render children correctly', () => {
    render(
      <RootLayout>
        <div data-testid='test-child'>Test Content</div>
      </RootLayout>
    )

    expect(screen.getByTestId('test-child')).toBeInTheDocument()
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('should render Toaster component', () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    )

    expect(screen.getByTestId('toaster')).toBeInTheDocument()
  })

  it('should render html and body elements', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    )

    const html = container.ownerDocument.documentElement
    const body = container.ownerDocument.body

    expect(html).toBeInTheDocument()
    expect(body).toBeInTheDocument()
  })

  it('should have lang attribute set to es', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    )

    const html = container.ownerDocument.documentElement
    expect(html).toHaveAttribute('lang', 'es')
  })

  it('should apply font variables to body', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    )

    const body = container.ownerDocument.body
    expect(body.className).toContain('antialiased')
  })
})
