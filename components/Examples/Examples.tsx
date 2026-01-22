import { CodeBlock, H2, H3, H4 } from '@/components/ui'

export const Examples = () => {
  return (
    <section
      className='space-y-4'
      aria-labelledby='ejemplos'
    >
      <H2 id='ejemplos'>Ejemplos</H2>

      <div className='grid gap-5 md:grid-cols-2'>
        <article className='border-border bg-surface rounded-xl border shadow-sm'>
          <header className='flex flex-col gap-1.5 p-6'>
            <H3>Ejemplo 1: Matriz 2x2</H3>
          </header>
          <div className='px-6 pb-6'>
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-1'>
                <H4>Input</H4>
                <CodeBlock>[[1,2], [3,4]]</CodeBlock>
              </div>
              <div className='space-y-1'>
                <H4>Output</H4>
                <CodeBlock>[[2,4], [1,3]]</CodeBlock>
              </div>
            </div>
          </div>
        </article>

        <article className='border-border bg-surface rounded-xl border shadow-sm'>
          <header className='flex flex-col gap-1.5 p-6'>
            <H3>Ejemplo 2: Matriz 3x3</H3>
          </header>
          <div className='px-6 pb-6'>
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-1'>
                <H4>Input</H4>
                <CodeBlock>[[1,2,3], [4,5,6], [7,8,9]]</CodeBlock>
              </div>
              <div className='space-y-1'>
                <H4>Output</H4>
                <CodeBlock>[[3,6,9], [2,5,8], [1,4,7]]</CodeBlock>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
