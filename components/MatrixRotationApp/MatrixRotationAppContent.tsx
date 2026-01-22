import { H2 } from '../ui'
import { InputCard } from './InputCard'
import { OutputCard } from './OutputCard'

export const MatrixRotationAppContent = () => {
  return (
    <section
      aria-labelledby='app-matrix-rotation'
      className='space-y-6'
    >
      <H2 id='app-matrix-rotation'>Aplicación</H2>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
        <InputCard />
        <OutputCard />
      </div>
    </section>
  )
}
