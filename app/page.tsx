import { CodeBlock, H1, H2, H3, H4, P } from '@/components/ui/typography'

export default function Home() {
  return (
    <div className='min-h-screen bg-bg text-fg'>
      <div className='container mx-auto px-4 py-8 md:px-6 lg:px-8'>
        <main className='mx-auto space-y-4'>
          <header className='space-y-2'>
            <H1>Prueba Técnica</H1>
            <p className='text-muted text-base md:text-lg'>Rotar matriz NxN en sentido antihorario</p>
          </header>

          <section aria-labelledby='descripcion'>
            <H2 id='descripcion'>Descripción</H2>
            <P className='mt-3'>
              Esta aplicación web permite ingresar dinámicamente una matriz cuadrada{' '}
              <span className='font-semibold text-fg'>NxN</span> en forma de un arreglo de arreglos
              numéricos y obtener como resultado la misma matriz rotada{' '}
              <span className='font-semibold text-fg'>90°</span> en sentido antihorario.
            </P>
          </section>

          <section className='space-y-4' aria-labelledby='ejemplos'>
            <H2 id='ejemplos'>Ejemplos</H2>

            <div className='grid gap-5 md:grid-cols-2'>
              <article className='rounded-xl border border-border bg-surface shadow-sm'>
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

              <article className='rounded-xl border border-border bg-surface shadow-sm'>
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
        </main>

        <hr className='my-6 border-border' />

        <section aria-label='app-matrix-rotation'>
        </section>
      </div>
    </div>
  )
}
