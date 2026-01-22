import { H2, P } from '@/components/ui'

export const Description = () => {
  return (
    <section aria-labelledby='descripcion'>
      <H2 id='descripcion'>Descripción</H2>
      <P className='mt-3'>
        Esta aplicación web permite ingresar dinámicamente una matriz cuadrada{' '}
        <span className='text-fg font-semibold'>NxN</span> en forma de un arreglo de arreglos
        numéricos y obtener como resultado la misma matriz rotada{' '}
        <span className='text-fg font-semibold'>90°</span> en sentido antihorario.
      </P>
    </section>
  )
}
