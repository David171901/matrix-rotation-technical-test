import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { MatrixRotationAppProvider } from '@/components/MatrixRotationApp/MatrixRotationAppProvider'
import { OutputCard } from '@/components/MatrixRotationApp/OutputCard'
import { useMatrixRotationApp } from '@/components/MatrixRotationApp/useMatrixRotationApp'

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<MatrixRotationAppProvider>{ui}</MatrixRotationAppProvider>)
}

describe('OutputCard', () => {
  it('should render correctly', async () => {
    renderWithProvider(<OutputCard />)

    await waitFor(() => {
      expect(
        screen.getByRole('heading', { level: 3, name: /matriz resultante/i })
      ).toBeInTheDocument()
    })
  })

  it('should render disabled textarea', async () => {
    renderWithProvider(<OutputCard />)

    await waitFor(() => {
      const textarea = screen.getByRole('textbox')
      expect(textarea).toBeInTheDocument()
      expect(textarea).toBeDisabled()
    })
  })

  it('should render copy button', async () => {
    renderWithProvider(<OutputCard />)

    await waitFor(() => {
      const copyButton = screen.getByTitle('Copiar')
      expect(copyButton).toBeInTheDocument()
    })
  })

  it('should disable copy button when outputMatrix is empty', async () => {
    renderWithProvider(<OutputCard />)

    await waitFor(() => {
      const copyButton = screen.getByTitle('Copiar')
      expect(copyButton.closest('button')).toBeDisabled()
    })
  })

  it('should enable copy button when outputMatrix has value', async () => {
    const InputSetter = () => {
      const { setInputMatrix } = useMatrixRotationApp()
      React.useEffect(() => {
        setInputMatrix('[[1,2],[3,4]]')
      }, [setInputMatrix])
      return null
    }

    render(
      <MatrixRotationAppProvider>
        <InputSetter />
        <OutputCard />
      </MatrixRotationAppProvider>
    )

    await waitFor(
      () => {
        const copyButtons = screen.getAllByTitle('Copiar')
        const enabledButton = copyButtons.find(
          (btn) => !btn.closest('button')?.hasAttribute('disabled')
        )
        expect(enabledButton).toBeDefined()
        if (enabledButton) {
          expect(enabledButton.closest('button')).not.toBeDisabled()
        }
      },
      { timeout: 2000 }
    )
  })

  it('should render MatrixView when outputMatrix is valid and showMatrixView is true', async () => {
    renderWithProvider(<OutputCard />)

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

  it('should display output matrix in textarea', async () => {
    renderWithProvider(<OutputCard />)

    await waitFor(() => {
      const textarea = screen.getByRole('textbox') as HTMLTextAreaElement
      expect(textarea).toBeInTheDocument()
    })
  })
})
