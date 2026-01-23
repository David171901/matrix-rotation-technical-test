import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { MatrixView } from '@/components/MatrixView'
import { CELL_SIZE } from '@/components/MatrixView/constants'

describe('MatrixView', () => {
  it('should return null when matrix is empty', () => {
    const { container } = render(<MatrixView matrix={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it('should render 2x2 matrix correctly', () => {
    const matrix = [
      [1, 2],
      [3, 4],
    ]
    render(<MatrixView matrix={matrix} />)

    expect(screen.getByLabelText('cell-0-0')).toHaveTextContent('1')
    expect(screen.getByLabelText('cell-0-1')).toHaveTextContent('2')
    expect(screen.getByLabelText('cell-1-0')).toHaveTextContent('3')
    expect(screen.getByLabelText('cell-1-1')).toHaveTextContent('4')
  })

  it('should render 3x3 matrix correctly', () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]
    render(<MatrixView matrix={matrix} />)

    expect(screen.getByLabelText('cell-0-0')).toHaveTextContent('1')
    expect(screen.getByLabelText('cell-0-1')).toHaveTextContent('2')
    expect(screen.getByLabelText('cell-0-2')).toHaveTextContent('3')
    expect(screen.getByLabelText('cell-1-0')).toHaveTextContent('4')
    expect(screen.getByLabelText('cell-1-1')).toHaveTextContent('5')
    expect(screen.getByLabelText('cell-1-2')).toHaveTextContent('6')
    expect(screen.getByLabelText('cell-2-0')).toHaveTextContent('7')
    expect(screen.getByLabelText('cell-2-1')).toHaveTextContent('8')
    expect(screen.getByLabelText('cell-2-2')).toHaveTextContent('9')
  })

  it('should set correct grid template columns', () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]
    const { container } = render(<MatrixView matrix={matrix} />)

    const grid = container.querySelector('.grid')
    expect(grid).toHaveStyle({
      gridTemplateColumns: `repeat(3, ${CELL_SIZE}px)`,
    })
  })

  it('should set correct cell size', () => {
    const matrix = [[1, 2]]
    const { container } = render(<MatrixView matrix={matrix} />)

    const cells = container.querySelectorAll('[aria-label^="cell-"]')
    cells.forEach((cell) => {
      expect(cell).toHaveStyle({
        width: `${CELL_SIZE}px`,
        height: `${CELL_SIZE}px`,
      })
    })
  })

  it('should render all cells with correct aria-labels', () => {
    const matrix = [
      [1, 2],
      [3, 4],
    ]
    render(<MatrixView matrix={matrix} />)

    expect(screen.getByLabelText('cell-0-0')).toBeInTheDocument()
    expect(screen.getByLabelText('cell-0-1')).toBeInTheDocument()
    expect(screen.getByLabelText('cell-1-0')).toBeInTheDocument()
    expect(screen.getByLabelText('cell-1-1')).toBeInTheDocument()
  })

  it('should handle negative values correctly', () => {
    const matrix = [
      [-1, 2],
      [3, -4],
    ]
    render(<MatrixView matrix={matrix} />)

    expect(screen.getByLabelText('cell-0-0')).toHaveTextContent('-1')
    expect(screen.getByLabelText('cell-0-1')).toHaveTextContent('2')
    expect(screen.getByLabelText('cell-1-0')).toHaveTextContent('3')
    expect(screen.getByLabelText('cell-1-1')).toHaveTextContent('-4')
  })
})
