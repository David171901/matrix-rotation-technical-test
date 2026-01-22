import { renderHook } from '@testing-library/react'
import { toast } from 'sonner'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

const mockWriteText = vi.fn()

describe('useCopyToClipboard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.clearAllTimers()

    Object.defineProperty(navigator, 'clipboard', {
      writable: true,
      value: {
        writeText: mockWriteText,
      },
    })

    vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should return copy function', () => {
    const { result } = renderHook(() => useCopyToClipboard())

    expect(result.current.copy).toBeDefined()
    expect(typeof result.current.copy).toBe('function')
  })

  it('should return false when text is empty', async () => {
    const { result } = renderHook(() => useCopyToClipboard())

    const success = await result.current.copy('')

    expect(success).toBe(false)
    expect(mockWriteText).not.toHaveBeenCalled()
    expect(toast.success).not.toHaveBeenCalled()
    expect(toast.error).not.toHaveBeenCalled()
  })

  it('should copy text successfully with default messages', async () => {
    mockWriteText.mockResolvedValue(undefined)
    const { result } = renderHook(() => useCopyToClipboard())

    const success = await result.current.copy('texto a copiar')

    expect(success).toBe(true)
    expect(mockWriteText).toHaveBeenCalledWith('texto a copiar')
    expect(toast.success).toHaveBeenCalledWith('Copiado', {
      description: 'Copiado',
    })
  })

  it('should use custom success message at runtime', async () => {
    mockWriteText.mockResolvedValue(undefined)
    const { result } = renderHook(() => useCopyToClipboard())

    await result.current.copy('texto', 'Mensaje personalizado en runtime')

    expect(toast.success).toHaveBeenCalledWith('Copiado', {
      description: 'Mensaje personalizado en runtime',
    })
  })

  it('should use custom successMessage from options', async () => {
    mockWriteText.mockResolvedValue(undefined)
    const { result } = renderHook(() =>
      useCopyToClipboard({
        successMessage: '¡Copiado exitosamente!',
      })
    )

    await result.current.copy('texto')

    expect(toast.success).toHaveBeenCalledWith('Copiado', {
      description: '¡Copiado exitosamente!',
    })
  })

  it('should handle error with default errorMessage', async () => {
    const error = new Error('Clipboard error')
    mockWriteText.mockRejectedValue(error)
    const { result } = renderHook(() => useCopyToClipboard())

    const success = await result.current.copy('texto a copiar')

    expect(success).toBe(false)
    expect(mockWriteText).toHaveBeenCalledWith('texto a copiar')
    expect(toast.error).toHaveBeenCalledWith('No se pudo copiar', {
      description: 'Tu navegador bloqueó el acceso al portapapeles.',
    })
    expect(console.log).toHaveBeenCalledWith('🚀 ~ useCopyToClipboard ~ err:', error)
  })

  it('should use custom errorMessage from options', async () => {
    mockWriteText.mockRejectedValue(new Error('Error'))
    const { result } = renderHook(() =>
      useCopyToClipboard({
        errorMessage: 'Error personalizado al copiar',
      })
    )

    await result.current.copy('texto')

    expect(toast.error).toHaveBeenCalledWith('No se pudo copiar', {
      description: 'Error personalizado al copiar',
    })
  })

  it('should memoize the copy function when options do not change', () => {
    const { result, rerender } = renderHook(({ options }) => useCopyToClipboard(options), {
      initialProps: { options: { successMessage: 'Test' } },
    })

    const firstCopy = result.current.copy

    rerender({ options: { successMessage: 'Test' } })

    expect(result.current.copy).toBe(firstCopy)
  })

  it('should recreate the copy function when successMessage changes', () => {
    const { result, rerender } = renderHook(
      ({ message }) => useCopyToClipboard({ successMessage: message }),
      {
        initialProps: { message: 'Mensaje 1' },
      }
    )

    const firstCopy = result.current.copy

    rerender({ message: 'Mensaje 2' })

    expect(result.current.copy).not.toBe(firstCopy)
  })

  it('should recreate the copy function when errorMessage changes', () => {
    const { result, rerender } = renderHook(
      ({ message }) => useCopyToClipboard({ errorMessage: message }),
      {
        initialProps: { message: 'Error 1' },
      }
    )

    const firstCopy = result.current.copy

    rerender({ message: 'Error 2' })

    expect(result.current.copy).not.toBe(firstCopy)
  })
})
