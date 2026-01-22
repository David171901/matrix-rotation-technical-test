'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'

import type { MatrixRotationAppContextType } from './MatrixRotationAppContext'
import { processMatrixRotation } from '@/utils'
import { MatrixRotationAppContext } from './MatrixRotationAppContext'

interface ProviderProps {
  children: ReactNode
}

export function MatrixRotationAppProvider({ children }: ProviderProps) {
  const [gridInputEnabled, setGridInputEnabled] = useState(false)
  const [inputMatrix, setInputMatrix] = useState('')

  const { outputMatrix, error } = processMatrixRotation(inputMatrix)

  const value: MatrixRotationAppContextType = {
    gridInputEnabled,
    setGridInputEnabled,
    inputMatrix,
    setInputMatrix,
    outputMatrix,
    error,
  }

  return (
    <MatrixRotationAppContext.Provider value={value}>{children}</MatrixRotationAppContext.Provider>
  )
}
