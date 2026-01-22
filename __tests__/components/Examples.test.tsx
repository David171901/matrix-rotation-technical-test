import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Examples } from '@/components/Examples'

describe('Examples', () => {
  it('should render correctly', () => {
    render(<Examples />)

    const section = screen.getByRole('region', { name: /ejemplos/i })
    expect(section).toBeInTheDocument()
  })

  it('should have correct aria-labelledby attribute', () => {
    render(<Examples />)

    const section = screen.getByRole('region', { name: /ejemplos/i })
    expect(section).toHaveAttribute('aria-labelledby', 'ejemplos')
  })

  it('should render H2 with correct id', () => {
    render(<Examples />)

    const heading = screen.getByRole('heading', { level: 2, name: /ejemplos/i })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveAttribute('id', 'ejemplos')
  })

  it('should render Example 1: Matriz 2x2', () => {
    render(<Examples />)

    const example1Heading = screen.getByRole('heading', {
      level: 3,
      name: /ejemplo 1: matriz 2x2/i,
    })
    expect(example1Heading).toBeInTheDocument()

    const inputHeading = screen.getAllByRole('heading', { level: 4, name: /input/i })[0]
    const outputHeading = screen.getAllByRole('heading', { level: 4, name: /output/i })[0]

    expect(inputHeading).toBeInTheDocument()
    expect(outputHeading).toBeInTheDocument()

    expect(screen.getByText('[[1,2], [3,4]]')).toBeInTheDocument()
    expect(screen.getByText('[[2,4], [1,3]]')).toBeInTheDocument()
  })

  it('should render Example 2: Matriz 3x3', () => {
    render(<Examples />)

    const example2Heading = screen.getByRole('heading', {
      level: 3,
      name: /ejemplo 2: matriz 3x3/i,
    })
    expect(example2Heading).toBeInTheDocument()

    const inputHeadings = screen.getAllByRole('heading', { level: 4, name: /input/i })
    const outputHeadings = screen.getAllByRole('heading', { level: 4, name: /output/i })

    expect(inputHeadings).toHaveLength(2)
    expect(outputHeadings).toHaveLength(2)

    expect(screen.getByText('[[1,2,3], [4,5,6], [7,8,9]]')).toBeInTheDocument()
    expect(screen.getByText('[[3,6,9], [2,5,8], [1,4,7]]')).toBeInTheDocument()
  })

  it('should render code blocks with correct content', () => {
    const { container } = render(<Examples />)

    const codeBlocks = container.querySelectorAll('code')
    expect(codeBlocks.length).toBe(4)

    const codeTexts = Array.from(codeBlocks).map((code) => code.textContent)
    expect(codeTexts).toContain('[[1,2], [3,4]]')
    expect(codeTexts).toContain('[[2,4], [1,3]]')
    expect(codeTexts).toContain('[[1,2,3], [4,5,6], [7,8,9]]')
    expect(codeTexts).toContain('[[3,6,9], [2,5,8], [1,4,7]]')
  })

  it('should render both examples in articles', () => {
    render(<Examples />)

    const articles = screen.getAllByRole('article')
    expect(articles).toHaveLength(2)
  })
})
