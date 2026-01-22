'use client'

import { Eraser } from 'lucide-react'

import { useMatrixView } from '@/hooks'
import { MatrixGridInput } from '../MatrixGridInput'
import { MatrixView } from '../MatrixView'
import { TextareaAction } from '../TextareaAction'
import { Field, FieldLabel, H3, Label, Switch } from '../ui'
import { useMatrixRotationApp } from './useMatrixRotationApp'

export const InputCard = () => {
  const { gridInputEnabled, setGridInputEnabled, inputMatrix, setInputMatrix, error } =
    useMatrixRotationApp()
  const { parsedMatrix: parsedInput, showMatrixView } = useMatrixView(inputMatrix)

  const handleClearInput = () => {
    setInputMatrix('')
  }

  return (
    <article className='border-border bg-surface space-y-4 rounded-xl border p-6 shadow-sm'>
      <header className='flex items-center justify-between gap-2'>
        <H3>Matriz de Entrada</H3>
        <div className='hidden items-center gap-2 md:flex'>
          <Switch
            id='graphic-mode'
            checked={gridInputEnabled}
            onCheckedChange={setGridInputEnabled}
          />
          <Label
            htmlFor='graphic-mode'
            className='cursor-pointer text-sm font-medium'
          >
            Modo Gráfico
          </Label>
        </div>
      </header>

      {gridInputEnabled ? (
        <MatrixGridInput
          inputMatrix={inputMatrix}
          onInputMatrixChange={setInputMatrix}
        />
      ) : (
        <>
          <Field>
            <FieldLabel htmlFor='textarea-input'>Entrada</FieldLabel>
            <TextareaAction
              id='textarea-input'
              placeholder='Ejemplo: [[1,2], [3,4]]'
              value={inputMatrix}
              onChange={(e) => setInputMatrix(e.target.value)}
              rows={8}
              className='font-mono text-sm'
              actionIcon={<Eraser className='h-4 w-4' />}
              onActionClick={handleClearInput}
              actionTooltip='Limpiar'
              disableAction={!inputMatrix.trim()}
            />
          </Field>
          {showMatrixView && !error && <MatrixView matrix={parsedInput} />}
        </>
      )}

      {error && <p className='text-destructive text-sm'>{error}</p>}
    </article>
  )
}
