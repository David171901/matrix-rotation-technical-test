import type { Matrix } from '@/types/matrix'

export function rotateMatrix90CounterClockwise(matrix: Matrix): Matrix {
  const n = matrix.length
  return Array.from({ length: n }, (_, r) => {
    return Array.from({ length: n }, (_, c) => {
      return matrix[c][n - 1 - r]
    })
  })
}
