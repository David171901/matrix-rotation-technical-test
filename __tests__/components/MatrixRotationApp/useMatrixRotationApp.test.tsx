import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { MatrixRotationAppProvider } from '@/components/MatrixRotationApp/MatrixRotationAppProvider'
import { useMatrixRotationApp } from '@/components/MatrixRotationApp/useMatrixRotationApp'

describe('useMatrixRotationApp', () => {
  it('should throw error when used outside MatrixRotationAppProvider', () => {
    const TestComponent = () => {
      useMatrixRotationApp()
      return <div>Test</div>
    }

    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      render(<TestComponent />)
    }).toThrow(/useMatrixRotationApp.*MatrixRotationAppProvider/i)

    consoleError.mockRestore()
  })

  it('should return context when used inside MatrixRotationAppProvider', () => {
    const TestComponent = () => {
      const context = useMatrixRotationApp()
      return (
        <div>
          <span data-testid='input-matrix'>{context.inputMatrix}</span>
          <span data-testid='output-matrix'>{context.outputMatrix}</span>
        </div>
      )
    }

    const { getByTestId } = render(
      <MatrixRotationAppProvider>
        <TestComponent />
      </MatrixRotationAppProvider>
    )

    expect(getByTestId('input-matrix')).toBeInTheDocument()
    expect(getByTestId('output-matrix')).toBeInTheDocument()
  })
})
