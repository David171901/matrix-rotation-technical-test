import { Description } from '@/components/Description'
import { Examples } from '@/components/Examples'
import { MatrixRotationApp } from '@/components/MatrixRotationApp'
import { H1 } from '@/components/ui'

export default function Home() {
  return (
    <div className='bg-bg text-fg min-h-screen'>
      <div className='container mx-auto px-4 py-8 md:px-6 lg:px-8'>
        <main className='mx-auto space-y-4'>
          <header className='space-y-2'>
            <H1>Prueba Técnica</H1>
            <p className='text-muted text-base md:text-lg'>
              Rotar matriz NxN en sentido antihorario
            </p>
          </header>
          <Description />
          <Examples />
        </main>
        <hr className='border-border my-6' />
        <MatrixRotationApp />
      </div>
    </div>
  )
}
