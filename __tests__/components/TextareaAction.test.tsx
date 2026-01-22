import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { TextareaAction } from '@/components/TextareaAction'

describe('TextareaAction', () => {
  it('should render textarea correctly', () => {
    render(<TextareaAction />)

    const textarea = screen.getByRole('textbox')
    expect(textarea).toBeInTheDocument()
  })

  it('should render textarea with placeholder', () => {
    render(<TextareaAction placeholder='Enter text' />)

    const textarea = screen.getByPlaceholderText('Enter text')
    expect(textarea).toBeInTheDocument()
  })

  it('should render textarea with value', () => {
    render(<TextareaAction defaultValue='Test value' />)

    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement
    expect(textarea.value).toBe('Test value')
  })

  it('should not render action button when actionIcon is not provided', () => {
    render(<TextareaAction />)

    const button = screen.queryByRole('button')
    expect(button).not.toBeInTheDocument()
  })

  it('should not render action button when onActionClick is not provided', () => {
    render(<TextareaAction actionIcon={<span>Icon</span>} />)

    const button = screen.queryByRole('button')
    expect(button).not.toBeInTheDocument()
  })

  it('should render action button when actionIcon and onActionClick are provided', () => {
    const handleClick = vi.fn()
    render(
      <TextareaAction
        actionIcon={<span>Icon</span>}
        onActionClick={handleClick}
      />
    )

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Icon')
  })

  it('should call onActionClick when action button is clicked', () => {
    const handleClick = vi.fn()

    render(
      <TextareaAction
        actionIcon={<span>Icon</span>}
        onActionClick={handleClick}
      />
    )

    const button = screen.getByRole('button')
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
  })

  it('should enable action button when disableAction is false', () => {
    const handleClick = vi.fn()
    render(
      <TextareaAction
        actionIcon={<span>Icon</span>}
        onActionClick={handleClick}
        disableAction={false}
      />
    )

    const button = screen.getByRole('button')
    expect(button).not.toBeDisabled()
  })

  it('should render action button with tooltip', () => {
    const handleClick = vi.fn()
    render(
      <TextareaAction
        actionIcon={<span>Icon</span>}
        onActionClick={handleClick}
        actionTooltip='Copy to clipboard'
      />
    )

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('title', 'Copy to clipboard')
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

  it('should not add pr-10 class to textarea when actionIcon is not provided', () => {
    const { container } = render(<TextareaAction />)

    const textarea = container.querySelector('textarea')
    expect(textarea?.className).not.toContain('pr-10')
  })

  it('should forward ref to textarea', () => {
    const ref = vi.fn()
    render(<TextareaAction ref={ref} />)

    expect(ref).toHaveBeenCalled()
  })

  it('should apply custom className to textarea', () => {
    const { container } = render(<TextareaAction className='custom-class' />)

    const textarea = container.querySelector('textarea')
    expect(textarea?.className).toContain('custom-class')
  })

  it('should have correct displayName', () => {
    expect(TextareaAction.displayName).toBe('TextareaAction')
  })

  it('should not call onActionClick when button is disabled and clicked', () => {
    const handleClick = vi.fn()

    render(
      <TextareaAction
        actionIcon={<span>Icon</span>}
        onActionClick={handleClick}
        disableAction={true}
      />
    )

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(handleClick).not.toHaveBeenCalled()
  })

  it('should pass through textarea props', () => {
    render(
      <TextareaAction
        rows={5}
        maxLength={100}
      />
    )

    const textarea = screen.getByRole('textbox') as HTMLTextAreaElement
    expect(textarea).toHaveAttribute('rows', '5')
    expect(textarea).toHaveAttribute('maxLength', '100')
  })
})
