'use client'

import { Copy } from 'lucide-react'

import { useCopyToClipboard, useMatrixView } from '@/hooks'
import { MatrixView } from '../MatrixView'
import { TextareaAction } from '../TextareaAction'
import { Field, FieldLabel, H3 } from '../ui'
import { useMatrixRotationApp } from './useMatrixRotationApp'

export const OutputCard = () => {
  const { outputMatrix } = useMatrixRotationApp()
  const { parsedMatrix: parsedOutput, showMatrixView } = useMatrixView(outputMatrix)
  const { copy } = useCopyToClipboard({
    successMessage: 'La matriz resultante se copió al portapapeles.',
  })

  const handleCopyOutput = () => {
    copy(outputMatrix)
  }

  return (
    <article className='border-border bg-surface space-y-4 rounded-xl border p-6 shadow-sm'>
      <H3>Matriz Resultante</H3>
      <Field>
        <FieldLabel htmlFor='textarea-output'>Salida</FieldLabel>
        <TextareaAction
          id='textarea-output'
          disabled
          value={outputMatrix}
          rows={8}
          className='font-mono text-sm'
          actionIcon={<Copy className='h-4 w-4' />}
          onActionClick={handleCopyOutput}
          actionTooltip='Copiar'
          disableAction={!outputMatrix}
        />
      </Field>
      {showMatrixView && <MatrixView matrix={parsedOutput} />}
    </article>
  )
}
