'use client'

import { createContext } from 'react'

export interface MatrixGridInputContextType {
  // Estado
  currentSize: number
  currentValues: string[][]
  filledCount: number
  totalCells: number
  isComplete: boolean

  // Acciones
  handleSizeChange: (newSize: number) => void
  handleCellChange: (row: number, col: number, value: string) => void
  handleReset: () => void
  handleRandomFill: () => void

  // Constantes
  minSize: number
  maxSize: number
}

export const MatrixGridInputContext = createContext<MatrixGridInputContextType | undefined>(
  undefined
)
