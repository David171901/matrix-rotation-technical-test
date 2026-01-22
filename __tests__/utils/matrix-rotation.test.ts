import { beforeEach, describe, expect, it, vi } from 'vitest'

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
import {
  parseMatrixString,
  processMatrixRotation,
  rotateMatrix90CounterClockwise,
} from '@/utils/matrix-rotation'

describe('parseMatrixString', () => {
  it('should return empty array when string is empty', () => {
    expect(parseMatrixString('')).toEqual([])
  })

  it('should return empty array when JSON is invalid', () => {
    expect(parseMatrixString('invalid json')).toEqual([])
  })

  it('should return empty array when not an array', () => {
    expect(parseMatrixString('{"key": "value"}')).toEqual([])
  })

  it('should return empty array when not a 2D array', () => {
    expect(parseMatrixString('[1, 2, 3]')).toEqual([])
  })

  it('should parse valid matrix correctly', () => {
    const result = parseMatrixString('[[1,2],[3,4]]')
    expect(result).toEqual([
      [1, 2],
      [3, 4],
    ])
  })

  it('should convert string numbers to numbers', () => {
    const result = parseMatrixString('[["1","2"],["3","4"]]')
    expect(result).toEqual([
      [1, 2],
      [3, 4],
    ])
  })

  it('should convert NaN values to 0', () => {
    const result = parseMatrixString('[["abc",2],[3,"xyz"]]')
    expect(result).toEqual([
      [0, 2],
      [3, 0],
    ])
  })
})

describe('rotateMatrix90CounterClockwise', () => {
  it('should rotate 2x2 matrix 90 degrees counterclockwise', () => {
    const matrix = [
      [1, 2],
      [3, 4],
    ]
    const result = rotateMatrix90CounterClockwise(matrix)
    expect(result).toEqual([
      [2, 4],
      [1, 3],
    ])
  })

  it('should rotate 3x3 matrix 90 degrees counterclockwise', () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]
    const result = rotateMatrix90CounterClockwise(matrix)
    expect(result).toEqual([
      [3, 6, 9],
      [2, 5, 8],
      [1, 4, 7],
    ])
  })
})

describe('processMatrixRotation', () => {
  beforeEach(() => {
    vi.spyOn(console, 'warn').mockImplementation(() => {})
  })

  it('should return empty output when input is empty', () => {
    const result = processMatrixRotation('')
    expect(result).toEqual({ outputMatrix: '', error: null })
  })

  it('should return empty output when input is whitespace', () => {
    const result = processMatrixRotation('   ')
    expect(result).toEqual({ outputMatrix: '', error: null })
  })

  it('should return error when JSON is invalid', () => {
    const result = processMatrixRotation('invalid json')
    expect(result.outputMatrix).toBe('')
    expect(result.error).toBe(`${INVALID_JSON}. ${INVALID_JSON_EXAMPLE}`)
    expect(console.warn).toHaveBeenCalled()
  })

  it('should return error when input is not an array', () => {
    const result = processMatrixRotation('{"key": "value"}')
    expect(result.outputMatrix).toBe('')
    expect(result.error).toBe(`${NOT_AN_ARRAY}. ${INVALID_JSON_EXAMPLE}`)
  })

  it('should return error when array is empty', () => {
    const result = processMatrixRotation('[]')
    expect(result.outputMatrix).toBe('')
    expect(result.error).toBe(EMPTY_MATRIX)
  })

  it('should return error when element is not an array', () => {
    const result = processMatrixRotation('[1, 2, 3]')
    expect(result.outputMatrix).toBe('')
    expect(result.error).toBe(`${NOT_2D_MATRIX}. ${ELEMENT_NOT_ARRAY(1)}`)
  })

  it('should return error when row is empty', () => {
    const result = processMatrixRotation('[[1,2],[]]')
    expect(result.outputMatrix).toBe('')
    expect(result.error).toBe(EMPTY_ROW(2))
  })

  it('should return error when matrix is not square', () => {
    const result = processMatrixRotation('[[1,2],[3,4,5]]')
    expect(result.outputMatrix).toBe('')
    expect(result.error).toBe(INVALID_NXN_MATRIX(2, 3, 2))
  })

  it('should return error when element is not a number', () => {
    const result = processMatrixRotation('[[1,"abc"],[3,4]]')
    expect(result.outputMatrix).toBe('')
    expect(result.error).toBe(INVALID_NUMBER_MATRIX('abc', 0, 1))
  })

  it('should rotate valid matrix successfully', () => {
    const result = processMatrixRotation('[[1,2],[3,4]]')
    expect(result.error).toBeNull()
    expect(result.outputMatrix).toBe('[[2,4],[1,3]]')
  })

  it('should handle string numbers correctly', () => {
    const result = processMatrixRotation('[["1","2"],["3","4"]]')
    expect(result.error).toBeNull()
    expect(result.outputMatrix).toBe('[[2,4],[1,3]]')
  })

  it('should rotate 3x3 matrix correctly', () => {
    const result = processMatrixRotation('[[1,2,3],[4,5,6],[7,8,9]]')
    expect(result.error).toBeNull()
    expect(result.outputMatrix).toBe('[[3,6,9],[2,5,8],[1,4,7]]')
  })
})
