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
})
