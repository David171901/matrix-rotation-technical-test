'use client'

import { MatrixGridInputContent } from './MatrixGridInputContent'
import { MatrixGridInputProvider } from './MatrixGridInputProvider'

type MatrixGridInputProps = {
  className?: string
  inputMatrix: string
  onInputMatrixChange: (value: string) => void
}

export const MatrixGridInput = ({
  className,
  inputMatrix,
  onInputMatrixChange,
}: MatrixGridInputProps) => {
  return (
    <MatrixGridInputProvider
      inputMatrix={inputMatrix}
      onInputMatrixChange={onInputMatrixChange}
    >
      <MatrixGridInputContent className={className} />
    </MatrixGridInputProvider>
  )
}
