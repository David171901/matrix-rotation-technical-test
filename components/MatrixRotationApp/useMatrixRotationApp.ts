import { useContext } from 'react'

import { MatrixRotationAppContext } from './MatrixRotationAppContext'

export const useMatrixRotationApp = () => {
  const context = useContext(MatrixRotationAppContext)

  if (context === undefined) {
    throw new Error('useMatrixRotationApp has to be used within a MatrixRotationAppProvider')
  }

  return context
}
