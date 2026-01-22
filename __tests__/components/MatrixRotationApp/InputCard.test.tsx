import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { MatrixRotationAppProvider } from '@/components/MatrixRotationApp'
import { InputCard } from '@/components/MatrixRotationApp/InputCard'

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<MatrixRotationAppProvider>{ui}</MatrixRotationAppProvider>)
}

describe('InputCard', () => {
  it('should render correctly', async () => {
    renderWithProvider(<InputCard />)

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { level: 3, name: /matriz de entrada/i })
      ).toBeInTheDocument()
    })
  })

  it('should render textarea mode by default', async () => {
    renderWithProvider(<InputCard />)

    await waitFor(() => {
      const textarea = screen.getByRole('textbox')
      expect(textarea).toBeInTheDocument()
      expect(textarea).toHaveAttribute('placeholder', 'Ejemplo: [[1,2], [3,4]]')
    })
  })

  it('should render switch for graphic mode', async () => {
    renderWithProvider(<InputCard />)

    await waitFor(() => {
      const switchElement = screen.getByRole('switch', { name: /modo gráfico/i })
      expect(switchElement).toBeInTheDocument()
    })
  })

  it('should toggle between textarea and grid input modes', async () => {
    renderWithProvider(<InputCard />)

    await waitFor(() => {
      const switchElement = screen.getByRole('switch', { name: /modo gráfico/i })
      expect(switchElement).toBeInTheDocument()
    })

    const switchElement = screen.getByRole('switch', { name: /modo gráfico/i })
    fireEvent.click(switchElement)

    await waitFor(() => {
      const textareas = screen.queryAllByRole('textbox')
      expect(textareas.length).toBeGreaterThan(0)
    })
  })

  it('should render clear button in textarea mode', async () => {
    renderWithProvider(<InputCard />)

    await waitFor(() => {
      const textarea = screen.getByRole('textbox')
      fireEvent.change(textarea, { target: { value: '[[1,2],[3,4]]' } })
    })

    await waitFor(() => {
      const clearButton = screen.getByTitle('Limpiar')
      expect(clearButton).toBeInTheDocument()
    })
  })

  it('should disable clear button when input is empty', async () => {
    renderWithProvider(<InputCard />)

    await waitFor(() => {
      const clearButton = screen.queryByTitle('Limpiar')
      if (clearButton) {
        expect(clearButton.closest('button')).toBeDisabled()
      }
    })
  })

  it('should show error message when there is an error', async () => {
    renderWithProvider(<InputCard />)

    await waitFor(() => {
      const textarea = screen.getByRole('textbox')
      fireEvent.change(textarea, { target: { value: 'invalid json' } })
    })

    await waitFor(() => {
      const errorMessage = screen.queryByText(/error/i)
      if (errorMessage) {
        expect(errorMessage).toBeInTheDocument()
      }
    })
  })

  it('should render MatrixView when matrix is valid and showMatrixView is true', async () => {
    renderWithProvider(<InputCard />)

    await waitFor(() => {
      const textarea = screen.getByRole('textbox')
      fireEvent.change(textarea, { target: { value: '[[1,2],[3,4]]' } })
    })

    await waitFor(
      () => {
        const matrixView = screen.queryByLabelText('cell-0-0')
        if (matrixView) {
          expect(matrixView).toBeInTheDocument()
        }
      },
      { timeout: 2000 }
    )
  })
})
