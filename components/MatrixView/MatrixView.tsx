import type { Matrix } from '@/types/matrix'

import { CELL_SIZE } from './constants'

type MatrixViewProps = {
  matrix: Matrix
}

export const MatrixView = ({ matrix }: MatrixViewProps) => {
  if (!matrix || matrix.length === 0) return null

  const rows = matrix.length
  const cols = Math.max(...matrix.map((r) => r.length))

  return (
    <div
      className='grid gap-1'
      style={{
        gridTemplateColumns: `repeat(${cols}, ${CELL_SIZE}px)`,
      }}
    >
      {Array.from({ length: rows * cols }).map((_, idx) => {
        const r = Math.floor(idx / cols)
        const c = idx % cols
        const value = matrix[r]?.[c] ?? 0
        return (
          <div
            key={idx}
            className='box-border flex items-center justify-center border border-gray-800 bg-white select-none'
            style={{
              width: `${CELL_SIZE}px`,
              height: `${CELL_SIZE}px`,
            }}
            aria-label={`cell-${r}-${c}`}
          >
            {value}
          </div>
        )
      })}
    </div>
  )
}
