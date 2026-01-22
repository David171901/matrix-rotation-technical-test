import { fireEvent, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import useMediaQuery from '@/hooks/useMediaQuery'

const DEFAULT_INNER_WIDTH = 1024

afterEach(() => {
  window.innerWidth = DEFAULT_INNER_WIDTH
})

describe('useMediaQuery hook', () => {
  it('useMediaQuery => render minwidth type', () => {
    const { result } = renderHook(() => useMediaQuery('minwidth', 768))
    window.innerWidth = 800
    fireEvent.resize(window)
    expect(result.current).toBe(true)
  })

  it('useMediaQuery => render minwidth type false', () => {
    const { result } = renderHook(() => useMediaQuery('minwidth', 768))
    window.innerWidth = 480
    fireEvent.resize(window)

    expect(result.current).toBe(false)
  })

  it('useMediaQuery => render maxwidth type', () => {
    const { result } = renderHook(() => useMediaQuery('maxwidth', 768))
    window.innerWidth = 480
    fireEvent.resize(window)
    expect(result.current).toBe(true)
  })

  it('useMediaQuery => render maxwidth type false', () => {
    const { result } = renderHook(() => useMediaQuery('maxwidth', 768))
    window.innerWidth = 800
    fireEvent.resize(window)
    expect(result.current).toBe(false)
  })
})
