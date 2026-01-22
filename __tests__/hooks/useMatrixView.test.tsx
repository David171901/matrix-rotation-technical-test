import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useMatrixView } from '@/hooks/useMatrixView'
import useMediaQuery from '@/hooks/useMediaQuery'

vi.mock('@/hooks/useMediaQuery', () => ({
  default: vi.fn(),
}))

const mockUseMediaQuery = vi.mocked(useMediaQuery)

describe('useMatrixView', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockUseMediaQuery.mockReturnValue(false)
  })

  describe('Matrix parsing', () => {
    it('should parse a valid matrix correctly', () => {
      const matrixString = '[[1,2],[3,4]]'
      const { result } = renderHook(() => useMatrixView(matrixString))

      expect(result.current.parsedMatrix).toEqual([
        [1, 2],
        [3, 4],
      ])
    })

    it('should return empty array when string is empty', () => {
      const { result } = renderHook(() => useMatrixView(''))

      expect(result.current.parsedMatrix).toEqual([])
    })

    it('should return empty array when string is invalid', () => {
      const { result } = renderHook(() => useMatrixView('invalid json'))

      expect(result.current.parsedMatrix).toEqual([])
    })
  })

  describe('showMatrixView - Desktop', () => {
    beforeEach(() => {
      mockUseMediaQuery.mockReturnValue(false)
    })

    it('should show matrix when size is within desktop limit', () => {
      const matrixString = '[[1,2],[3,4]]'
      const { result } = renderHook(() => useMatrixView(matrixString))

      expect(result.current.showMatrixView).toBe(true)
    })

    it('should not show matrix when size exceeds desktop limit', () => {
      const matrix9x9 = Array.from({ length: 9 }, (_, i) =>
        Array.from({ length: 9 }, (_, j) => i * 9 + j)
      )
      const matrixString = JSON.stringify(matrix9x9)
      const { result } = renderHook(() => useMatrixView(matrixString))

      expect(result.current.showMatrixView).toBe(false)
    })

    it('should not show matrix when it is empty', () => {
      const { result } = renderHook(() => useMatrixView(''))

      expect(result.current.showMatrixView).toBe(false)
    })

    it('should use custom desktopMaxSize', () => {
      const matrix3x3 = Array.from({ length: 3 }, (_, i) =>
        Array.from({ length: 3 }, (_, j) => i * 3 + j)
      )
      const matrixString = JSON.stringify(matrix3x3)
      const { result } = renderHook(() => useMatrixView(matrixString, { desktopMaxSize: 2 }))

      expect(result.current.showMatrixView).toBe(false)
    })
  })

  describe('showMatrixView - Mobile', () => {
    beforeEach(() => {
      mockUseMediaQuery.mockReturnValue(true)
    })

    it('should show matrix when size is within mobile limit', () => {
      const matrixString = '[[1,2],[3,4]]'
      const { result } = renderHook(() => useMatrixView(matrixString))

      expect(result.current.showMatrixView).toBe(true)
    })

    it('should not show matrix when size exceeds mobile limit', () => {
      const matrix5x5 = Array.from({ length: 5 }, (_, i) =>
        Array.from({ length: 5 }, (_, j) => i * 5 + j)
      )
      const matrixString = JSON.stringify(matrix5x5)
      const { result } = renderHook(() => useMatrixView(matrixString))

      expect(result.current.showMatrixView).toBe(false)
    })

    it('should use custom mobileMaxSize', () => {
      const matrix3x3 = Array.from({ length: 3 }, (_, i) =>
        Array.from({ length: 3 }, (_, j) => i * 3 + j)
      )
      const matrixString = JSON.stringify(matrix3x3)
      const { result } = renderHook(() => useMatrixView(matrixString, { mobileMaxSize: 2 }))

      expect(result.current.showMatrixView).toBe(false)
    })
  })

  describe('Memoization', () => {
    it('should memoize parsedMatrix when matrixString does not change', () => {
      const matrixString = '[[1,2],[3,4]]'
      const { result, rerender } = renderHook(({ str }) => useMatrixView(str), {
        initialProps: { str: matrixString },
      })

      const firstResult = result.current.parsedMatrix

      rerender({ str: matrixString })

      expect(result.current.parsedMatrix).toBe(firstResult)
    })

    it('should recalculate parsedMatrix when matrixString changes', () => {
      const { result, rerender } = renderHook(({ str }) => useMatrixView(str), {
        initialProps: { str: '[[1,2],[3,4]]' },
      })

      const firstResult = result.current.parsedMatrix

      rerender({ str: '[[5,6],[7,8]]' })

      expect(result.current.parsedMatrix).not.toBe(firstResult)
      expect(result.current.parsedMatrix).toEqual([
        [5, 6],
        [7, 8],
      ])
    })
  })
})
