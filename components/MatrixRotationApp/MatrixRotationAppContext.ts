'use client'

import { createContext } from 'react'

export interface MatrixRotationAppContextType {
  gridInputEnabled: boolean
  setGridInputEnabled: (value: boolean) => void
  inputMatrix: string
  setInputMatrix: (value: string) => void
  outputMatrix: string
  error: string | null
}

export const MatrixRotationAppContext = createContext<MatrixRotationAppContextType | undefined>(
  undefined
)
