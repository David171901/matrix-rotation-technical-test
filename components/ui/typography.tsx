import * as React from 'react'

import { cn } from '@/lib/utils'

export function H1({ className, ...props }: React.ComponentProps<'h1'>) {
  return (
    <h1
      className={cn('text-3xl font-semibold tracking-tight md:text-4xl', className)}
      {...props}
    />
  )
}

export function H2({ className, ...props }: React.ComponentProps<'h2'>) {
  return (
    <h2
      className={cn('text-xl font-semibold tracking-tight md:text-2xl', className)}
      {...props}
    />
  )
}

export function H3({ className, ...props }: React.ComponentProps<'h3'>) {
  return (
    <h3
      className={cn('text-lg font-semibold tracking-tight md:text-xl', className)}
      {...props}
    />
  )
}

export function H4({ className, ...props }: React.ComponentProps<'h4'>) {
  return (
    <h4
      className={cn('text-muted text-sm font-medium', className)}
      {...props}
    />
  )
}

export function P({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn('text-muted text-sm leading-7 md:text-base', className)}
      {...props}
    />
  )
}

export function CodeBlock({ className, ...props }: React.ComponentProps<'code'>) {
  return (
    <code
      className={cn(
        'border-border bg-code text-fg block rounded-xl border p-4 font-mono text-sm',
        className
      )}
      {...props}
    />
  )
}
