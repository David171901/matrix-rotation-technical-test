'use client'

import type { ReactNode } from 'react'
import { useCallback, useMemo, useState } from 'react'

import type { MatrixGridInputContextType } from './MatrixGridInputContext'
import { MatrixGridInputContext } from './MatrixGridInputContext'

const MIN_SIZE = 2
const MAX_SIZE = 8
const DEFAULT_SIZE = 2

interface MatrixGridInputProviderProps {
  children: ReactNode
  inputMatrix: string
  onInputMatrixChange: (value: string) => void
}

const parseInputMatrix = (input: string): { size: number; values: string[][] } | null => {
  if (!input.trim()) return null

  try {
    const parsed = JSON.parse(input)
    if (Array.isArray(parsed) && parsed.every((r) => Array.isArray(r))) {
      const n = parsed.length
      if (n >= MIN_SIZE && n <= MAX_SIZE && parsed.every((r) => r.length === n)) {
        return {
          size: n,
          values: parsed.map((row) => row.map((v: unknown) => String(v ?? ''))),
        }
      }
    }
  } catch {
    return null
  }

  return null
}

const createEmptyMatrix = (n: number): string[][] =>
  Array.from({ length: n }, () => Array.from({ length: n }, () => ''))

export const MatrixGridInputProvider = ({
  children,
  inputMatrix,
  onInputMatrixChange,
}: MatrixGridInputProviderProps) => {
  const [lastSyncedValue, setLastSyncedValue] = useState(inputMatrix)

  const [size, setSize] = useState(() => {
    const parsed = parseInputMatrix(inputMatrix)
    return parsed?.size ?? DEFAULT_SIZE
  })

  const [values, setValues] = useState<string[][]>(() => {
    const parsed = parseInputMatrix(inputMatrix)
    return parsed?.values ?? createEmptyMatrix(DEFAULT_SIZE)
  })

  const externalParsed = parseInputMatrix(inputMatrix)
  const isExternalChange = inputMatrix !== lastSyncedValue && externalParsed !== null

  const currentSize = isExternalChange ? externalParsed.size : size
  const currentValues = isExternalChange ? externalParsed.values : values

  const filledCount = useMemo(() => {
    return currentValues.reduce(
      (acc, row) => acc + row.filter((cell) => cell.trim() !== '').length,
      0
    )
  }, [currentValues])

  const totalCells = currentSize * currentSize
  const isComplete = filledCount === totalCells

  const allCellsFilled = useCallback((vals: string[][]) => {
    return vals.every((row) => row.every((cell) => cell.trim() !== ''))
  }, [])

  const syncToContext = useCallback(
    (newValues: string[][]) => {
      if (!allCellsFilled(newValues)) {
        setLastSyncedValue('')
        onInputMatrixChange('')
        return
      }

      const numericMatrix = newValues.map((row) =>
        row.map((cell) => {
          const trimmed = cell.trim()
          const num = Number(trimmed)
          return Number.isNaN(num) ? 0 : num
        })
      )

      const newMatrixString = JSON.stringify(numericMatrix)
      setLastSyncedValue(newMatrixString)
      onInputMatrixChange(newMatrixString)
    },
    [onInputMatrixChange, allCellsFilled]
  )

  const handleSizeChange = useCallback(
    (newSize: number) => {
      if (newSize < MIN_SIZE || newSize > MAX_SIZE) return

      const newValues = Array.from({ length: newSize }, (_, r) =>
        Array.from({ length: newSize }, (_, c) => currentValues[r]?.[c] ?? '')
      )

      setSize(newSize)
      setValues(newValues)
      syncToContext(newValues)
    },
    [currentValues, syncToContext]
  )

  const handleCellChange = useCallback(
    (row: number, col: number, value: string) => {
      if (value !== '' && !/^-?\d*\.?\d*$/.test(value)) return

      const newValues = currentValues.map((r, ri) =>
        ri === row ? r.map((c, ci) => (ci === col ? value : c)) : [...r]
      )

      setValues(newValues)
      syncToContext(newValues)
    },
    [currentValues, syncToContext]
  )

  const handleReset = useCallback(() => {
    const emptyValues = createEmptyMatrix(currentSize)
    setLastSyncedValue('')
    setValues(emptyValues)
    onInputMatrixChange('')
  }, [currentSize, onInputMatrixChange])

  const handleRandomFill = useCallback(() => {
    const randomValues = Array.from({ length: currentSize }, () =>
      Array.from({ length: currentSize }, () => String(Math.floor(Math.random() * 10)))
    )
    setValues(randomValues)
    syncToContext(randomValues)
  }, [currentSize, syncToContext])

  const value: MatrixGridInputContextType = useMemo(
    () => ({
      currentSize,
      currentValues,
      filledCount,
      totalCells,
      isComplete,
      handleSizeChange,
      handleCellChange,
      handleReset,
      handleRandomFill,
      minSize: MIN_SIZE,
      maxSize: MAX_SIZE,
    }),
    [
      currentSize,
      currentValues,
      filledCount,
      totalCells,
      isComplete,
      handleSizeChange,
      handleCellChange,
      handleReset,
      handleRandomFill,
    ]
  )

  return <MatrixGridInputContext.Provider value={value}>{children}</MatrixGridInputContext.Provider>
}
