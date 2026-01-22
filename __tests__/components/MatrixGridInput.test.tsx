import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { MatrixGridInput } from '@/components/MatrixGridInput'

describe('MatrixGridInput', () => {
  it('should render correctly', async () => {
    const handleChange = vi.fn()
    render(
      <MatrixGridInput
        inputMatrix=''
        onInputMatrixChange={handleChange}
      />
    )

    await waitFor(() => {
      expect(screen.getByText(/celdas/i)).toBeInTheDocument()
    })
  })

  it('should render with initial matrix', async () => {
    const handleChange = vi.fn()
    const matrix = '[[1,2],[3,4]]'
    render(
      <MatrixGridInput
        inputMatrix={matrix}
        onInputMatrixChange={handleChange}
      />
    )

    await waitFor(() => {
      const inputs = screen.getAllByRole('textbox')
      expect(inputs).toHaveLength(4)
      expect(inputs[0]).toHaveValue('1')
      expect(inputs[1]).toHaveValue('2')
      expect(inputs[2]).toHaveValue('3')
      expect(inputs[3]).toHaveValue('4')
    })
  })

  it('should apply custom className', async () => {
    const handleChange = vi.fn()
    const { container } = render(
      <MatrixGridInput
        inputMatrix=''
        onInputMatrixChange={handleChange}
        className='custom-class'
      />
    )

    await waitFor(() => {
      const wrapper = container.querySelector('.custom-class')
      expect(wrapper).toBeInTheDocument()
    })
  })

  it('should render default 2x2 grid when inputMatrix is empty', async () => {
    const handleChange = vi.fn()
    render(
      <MatrixGridInput
        inputMatrix=''
        onInputMatrixChange={handleChange}
      />
    )

    await waitFor(() => {
      expect(screen.getByText('2x2')).toBeInTheDocument()
      const inputs = screen.getAllByRole('textbox')
      expect(inputs).toHaveLength(4)
    })
  })

  it('should render 3x3 grid when inputMatrix is 3x3', async () => {
    const handleChange = vi.fn()
    const matrix = '[[1,2,3],[4,5,6],[7,8,9]]'
    render(
      <MatrixGridInput
        inputMatrix={matrix}
        onInputMatrixChange={handleChange}
      />
    )

    await waitFor(() => {
      expect(screen.getByText('3x3')).toBeInTheDocument()
      const inputs = screen.getAllByRole('textbox')
      expect(inputs).toHaveLength(9)
    })
  })

  it('should render size controls', async () => {
    const handleChange = vi.fn()
    render(
      <MatrixGridInput
        inputMatrix=''
        onInputMatrixChange={handleChange}
      />
    )

    await waitFor(() => {
      const decreaseButton = screen.getByLabelText('Reducir tamaño de matriz')
      const increaseButton = screen.getByLabelText('Aumentar tamaño de matriz')

      expect(decreaseButton).toBeInTheDocument()
      expect(increaseButton).toBeInTheDocument()
    })
  })

  it('should render action buttons', async () => {
    const handleChange = vi.fn()
    render(
      <MatrixGridInput
        inputMatrix=''
        onInputMatrixChange={handleChange}
      />
    )

    await waitFor(() => {
      const randomButton = screen.getByLabelText('Llenar con números aleatorios')
      const resetButton = screen.getByLabelText('Limpiar matriz')

      expect(randomButton).toBeInTheDocument()
      expect(resetButton).toBeInTheDocument()
    })
  })

  it('should show completion status when all cells are filled', async () => {
    const handleChange = vi.fn()
    const matrix = '[[1,2],[3,4]]'
    render(
      <MatrixGridInput
        inputMatrix={matrix}
        onInputMatrixChange={handleChange}
      />
    )

    await waitFor(() => {
      expect(screen.getByText('✓ Completo')).toBeInTheDocument()
    })
  })

  it('should show progress when not all cells are filled', async () => {
    const handleChange = vi.fn()
    render(
      <MatrixGridInput
        inputMatrix=''
        onInputMatrixChange={handleChange}
      />
    )

    await waitFor(() => {
      expect(screen.getByText(/0\/4 celdas/i)).toBeInTheDocument()
    })
  })

  it('should handle invalid inputMatrix gracefully', async () => {
    const handleChange = vi.fn()
    render(
      <MatrixGridInput
        inputMatrix='invalid json'
        onInputMatrixChange={handleChange}
      />
    )

    await waitFor(() => {
      expect(screen.getByText('2x2')).toBeInTheDocument()
      const inputs = screen.getAllByRole('textbox')
      expect(inputs).toHaveLength(4)
    })
  })
})
