import { useContext } from 'react'

import { MatrixGridInputContext } from './MatrixGridInputContext'

export const useMatrixGridInput = () => {
  const context = useContext(MatrixGridInputContext)

  if (context === undefined) {
    throw new Error('useMatrixGridInput debe ser usado dentro de un MatrixGridInputProvider')
  }

  return context
}
