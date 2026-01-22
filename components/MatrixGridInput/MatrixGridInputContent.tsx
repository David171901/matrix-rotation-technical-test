'use client'

import React, { CSSProperties, useMemo } from 'react'
import { Dices, Eraser, Minus, Plus } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { CELL_SIZE, GAP } from './constants'
import { useMatrixGridInput } from './useMatrixGridInput'

type MatrixGridInputContentProps = {
  className?: string
}

export const MatrixGridInputContent = ({ className }: MatrixGridInputContentProps) => {
  const {
    currentSize,
    currentValues,
    filledCount,
    totalCells,
    isComplete,
    handleSizeChange,
    handleCellChange,
    handleReset,
    handleRandomFill,
    minSize,
    maxSize,
  } = useMatrixGridInput()

  const gridStyle = useMemo(
    (): CSSProperties => ({
      gridTemplateColumns: `repeat(${currentSize}, ${CELL_SIZE}px)`,
      gap: `${GAP}px`,
      width: `${currentSize * CELL_SIZE + (currentSize - 1) * GAP}px`,
    }),
    [currentSize]
  )

  const cellStyle = useMemo(
    (): CSSProperties => ({
      width: `${CELL_SIZE}px`,
      height: `${CELL_SIZE}px`,
      fontSize: Math.max(14, Math.round(CELL_SIZE * 0.2)),
    }),
    []
  )

  return (
    <div className={cn('space-y-4', className)}>
      <div className='flex items-center justify-between'>
        <span
          className={cn(
            'text-xs font-medium transition-colors',
            isComplete ? 'text-green-600' : 'text-muted-foreground'
          )}
        >
          {isComplete ? '✓ Completo' : `${filledCount}/${totalCells} celdas`}
        </span>

        <div className='flex items-center gap-1'>
          <Button
            type='button'
            variant='ghost'
            size='icon-sm'
            onClick={() => handleSizeChange(currentSize - 1)}
            disabled={currentSize <= minSize}
            aria-label='Reducir tamaño de matriz'
          >
            <Minus className='h-4 w-4' />
          </Button>

          <span className='text-muted-foreground min-w-14 text-center text-sm font-medium'>
            {currentSize}x{currentSize}
          </span>

          <Button
            type='button'
            variant='ghost'
            size='icon-sm'
            onClick={() => handleSizeChange(currentSize + 1)}
            disabled={currentSize >= maxSize}
            aria-label='Aumentar tamaño de matriz'
          >
            <Plus className='h-4 w-4' />
          </Button>

          <div className='bg-border mx-2 h-5 w-px' />

          <Button
            type='button'
            variant='ghost'
            size='icon-sm'
            onClick={handleRandomFill}
            aria-label='Llenar con números aleatorios'
            title='Aleatorio (0-9)'
          >
            <Dices className='h-4 w-4' />
          </Button>

          <Button
            type='button'
            variant='ghost'
            size='icon-sm'
            onClick={handleReset}
            aria-label='Limpiar matriz'
            title='Limpiar'
          >
            <Eraser className='h-4 w-4' />
          </Button>
        </div>
      </div>

      <div
        className='grid'
        style={gridStyle}
      >
        {Array.from({ length: currentSize * currentSize }).map((_, idx) => {
          const row = Math.floor(idx / currentSize)
          const col = idx % currentSize

          return (
            <input
              key={`${row}-${col}`}
              type='text'
              inputMode='decimal'
              value={currentValues[row]?.[col] ?? ''}
              onChange={(e) => handleCellChange(row, col, e.target.value)}
              style={cellStyle}
              className={cn(
                'box-border flex items-center justify-center text-center',
                'border-input bg-background rounded-lg border',
                'focus:ring-ring focus:border-ring focus:ring-2 focus:outline-none',
                'placeholder:text-muted-foreground/50',
                'transition-colors'
              )}
              placeholder='0'
              aria-label={`Celda fila ${row + 1}, columna ${col + 1}`}
            />
          )
        })}
      </div>
    </div>
  )
}
