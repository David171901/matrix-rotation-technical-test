import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { TextareaAction } from '@/components/TextareaAction'

describe('TextareaAction', () => {
  it('should render textarea correctly', () => {
    render(<TextareaAction />)

    const textarea = screen.getByRole('textbox')
    expect(textarea).toBeInTheDocument()
  })

  it('should render textarea with placeholder and value', () => {
    render(
      <TextareaAction
        placeholder='Enter text'
        defaultValue='Test value'
      />
    )

    const textarea = screen.getByPlaceholderText('Enter text') as HTMLTextAreaElement
    expect(textarea).toBeInTheDocument()
    expect(textarea.value).toBe('Test value')
  })

  it('should not render action button when actionIcon or onActionClick are not provided', () => {
    const { rerender } = render(<TextareaAction />)

    expect(screen.queryByRole('button')).not.toBeInTheDocument()

    rerender(<TextareaAction actionIcon={<span>Icon</span>} />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('should render action button and call onActionClick when clicked', () => {
    const handleClick = vi.fn()
    render(
      <TextareaAction
        actionIcon={<span>Icon</span>}
        onActionClick={handleClick}
        actionTooltip='Copy to clipboard'
      />
    )

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Icon')
    expect(button).toHaveAttribute('title', 'Copy to clipboard')

    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should disable action button when disableAction is true', () => {
    const handleClick = vi.fn()
    render(
      <TextareaAction
        actionIcon={<span>Icon</span>}
        onActionClick={handleClick}
        disableAction={true}
      />
    )

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()

    fireEvent.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('should add pr-10 class to textarea when actionIcon is provided', () => {
    const handleClick = vi.fn()
    const { container } = render(
      <TextareaAction
        actionIcon={<span>Icon</span>}
        onActionClick={handleClick}
      />
    )

    const textarea = container.querySelector('textarea')
    expect(textarea?.className).toContain('pr-10')
  })

  it('should apply custom className and pass through textarea props', () => {
    const { container } = render(
      <TextareaAction
        className='custom-class'
        rows={5}
        maxLength={100}
      />
    )

    const textarea = container.querySelector('textarea') as HTMLTextAreaElement
    expect(textarea?.className).toContain('custom-class')
    expect(textarea).toHaveAttribute('rows', '5')
    expect(textarea).toHaveAttribute('maxLength', '100')
  })
})
