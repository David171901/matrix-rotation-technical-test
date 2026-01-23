import { cn } from '@/lib/utils'

interface TextareaActionProps extends React.ComponentProps<'textarea'> {
  actionIcon?: React.ReactNode
  onActionClick?: () => void
  actionTooltip?: string
  disableAction?: boolean
}

export const TextareaAction = ({
  className,
  actionIcon,
  onActionClick,
  actionTooltip,
  disableAction = false,
  ...props
}: TextareaActionProps) => {
  return (
    <div className='relative'>
      <textarea
        className={cn(
          'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          actionIcon && 'pr-10',
          className
        )}
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
