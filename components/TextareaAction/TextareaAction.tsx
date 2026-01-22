import * as React from 'react'

import { Textarea as TextareaUI } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

interface TextareaActionProps extends React.ComponentProps<'textarea'> {
  actionIcon?: React.ReactNode
  onActionClick?: () => void
  actionTooltip?: string
  disableAction?: boolean
}

export const TextareaAction = React.forwardRef<HTMLTextAreaElement, TextareaActionProps>(
  (
    { className, actionIcon, onActionClick, actionTooltip, disableAction = false, ...props },
    ref
  ) => {
    return (
      <div className='relative'>
        <TextareaUI
          ref={ref}
          className={cn(actionIcon && 'pr-10', className)}
          {...props}
        />
        {actionIcon && onActionClick && (
          <button
            type='button'
            onClick={onActionClick}
            disabled={disableAction}
            title={actionTooltip}
            className='text-muted hover:text-fg disabled:text-muted/40 absolute top-2 right-2 z-10 rounded-md p-1.5 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:hover:bg-transparent dark:hover:bg-gray-800'
          >
            {actionIcon}
          </button>
        )}
      </div>
    )
  }
)

TextareaAction.displayName = 'TextareaAction'
