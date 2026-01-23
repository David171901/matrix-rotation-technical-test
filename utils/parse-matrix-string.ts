import type { Matrix } from '@/types/matrix'

export const parseMatrixString = (matrixString: string): Matrix => {
  if (!matrixString) return []

  try {
    const parsed = JSON.parse(matrixString)
    if (Array.isArray(parsed) && parsed.every((r) => Array.isArray(r))) {
      return parsed.map((row: unknown[]) =>
        row.map((v: unknown) => {
          const num = Number(v)
          return Number.isNaN(num) ? 0 : num
        })
      )
    }
    return []
  } catch {
    return []
  }
}
