import { useContext } from 'react'

import { MatrixRotationAppContext } from './MatrixRotationAppContext'

export const useMatrixRotationApp = () => {
  const context = useContext(MatrixRotationAppContext)

  if (context === undefined) {
    throw new Error('useMatrixRotationApp debe ser usado dentro de un MatrixRotationAppProvider')
  }

  return context
}
