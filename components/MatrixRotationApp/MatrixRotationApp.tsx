'use client'

import { MatrixRotationAppContent } from './MatrixRotationAppContent'
import { MatrixRotationAppProvider } from './MatrixRotationAppProvider'

export const MatrixRotationApp = () => {
  return (
    <MatrixRotationAppProvider>
      <MatrixRotationAppContent />
    </MatrixRotationAppProvider>
  )
}
