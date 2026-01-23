import type { Matrix } from '@/types/matrix'

import {
  ELEMENT_NOT_ARRAY,
  EMPTY_MATRIX,
  EMPTY_ROW,
  INVALID_JSON,
  INVALID_JSON_EXAMPLE,
  INVALID_NUMBER_MATRIX,
  INVALID_NXN_MATRIX,
  NOT_2D_MATRIX,
  NOT_AN_ARRAY,
} from '@/constants'
import { rotateMatrix90CounterClockwise } from './rotate-matrix'

export interface MatrixRotationResult {
  outputMatrix: string
  error: string | null
}

export function processMatrixRotation(inputMatrix: string): MatrixRotationResult {
  const raw = inputMatrix.trim()

  if (!raw) return { outputMatrix: '', error: null }

  /* Validate JSON syntax */
  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    return {
      outputMatrix: '',
      error: `${INVALID_JSON}. ${INVALID_JSON_EXAMPLE}`,
    }
  }

  /* Validate that it is an array */
  if (!Array.isArray(parsed)) {
    return {
      outputMatrix: '',
      error: `${NOT_AN_ARRAY}. ${INVALID_JSON_EXAMPLE}`,
    }
  }

  /* Validate that it is not empty */
  if (parsed.length === 0) {
    return {
      outputMatrix: '',
      error: EMPTY_MATRIX,
    }
  }

  /* Validate that all elements are arrays (2D structure) */
  const rows = parsed as unknown[]
  if (!rows.every((r) => Array.isArray(r))) {
    const firstNonArray = rows.findIndex((r) => !Array.isArray(r))
    return {
      outputMatrix: '',
      error: `${NOT_2D_MATRIX}. ${ELEMENT_NOT_ARRAY(firstNonArray + 1)}`,
    }
  }

  const matrix = rows as unknown[][]
  const n = matrix.length

  /* Validate that no row is empty */
  const emptyRowIndex = matrix.findIndex((r) => r.length === 0)
  if (emptyRowIndex !== -1) {
    return {
      outputMatrix: '',
      error: EMPTY_ROW(emptyRowIndex + 1),
    }
  }

  /* Validate that it is a square matrix (NxN) */
  const invalidRowIndex = matrix.findIndex((r) => r.length !== n)
  if (invalidRowIndex !== -1) {
    return {
      outputMatrix: '',
      error: INVALID_NXN_MATRIX(invalidRowIndex + 1, matrix[invalidRowIndex].length, n),
    }
  }

  /* Convert to numbers and validate that all elements are numbers */
  const numeric: Matrix = []
  for (let i = 0; i < n; i++) {
    numeric[i] = []
    for (let j = 0; j < matrix[i].length; j++) {
      const value = Number(matrix[i][j])
      if (Number.isNaN(value)) {
        return {
          outputMatrix: '',
          error: INVALID_NUMBER_MATRIX(matrix[i][j], i, j),
        }
      }
      numeric[i][j] = value
    }
  }

  const rotated = rotateMatrix90CounterClockwise(numeric)

  return { outputMatrix: JSON.stringify(rotated), error: null }
}
