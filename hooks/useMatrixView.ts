import type { Matrix } from '@/types/matrix'
import { useMemo } from 'react'

import { parseMatrixString } from '@/utils'
import useMediaQuery from './useMediaQuery'

interface UseMatrixViewOptions {
  mobileMaxSize?: number
  desktopMaxSize?: number
}

export const useMatrixView = (matrixString: string, options: UseMatrixViewOptions = {}) => {
  const { mobileMaxSize = 4, desktopMaxSize = 8 } = options
  const isMobile = useMediaQuery('maxwidth', 768)

  const parsedMatrix = useMemo<Matrix>(() => parseMatrixString(matrixString), [matrixString])

  const maxSize = isMobile ? mobileMaxSize : desktopMaxSize
  const showMatrixView = parsedMatrix.length > 0 && parsedMatrix.length <= maxSize

  return { parsedMatrix, showMatrixView }
}
