import { Description } from '@/components/Description'
import { Examples } from '@/components/Examples'
import { MatrixRotationApp } from '@/components/MatrixRotationApp'
import { H1 } from '@/components/ui'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Prueba Técnica',
  description:
    'Rotar matriz NxN en sentido antihorario. Aplicación web interactiva para rotar matrices cuadradas 90 grados en sentido antihorario.',
  openGraph: {
    title: 'Prueba Técnica - Rotar Matriz 90° Antihorario',
    description:
      'Aplicación web interactiva para rotar matrices cuadradas NxN 90 grados en sentido antihorario.',
    url: 'https://matrix-rotation-technical-test.vercel.app',
    images: [
      {
        url: 'https://matrix-rotation-technical-test.vercel.app/matrix-rotation.png',
        width: 1200,
        height: 630,
        alt: 'Reto Técnico: Rotar Matriz 90° Anti-Horario',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prueba Técnica - Rotar Matriz 90° Antihorario',
    description: 'Rotar matriz NxN en sentido antihorario. Aplicación web interactiva.',
    images: ['https://matrix-rotation-technical-test.vercel.app/matrix-rotation.png'],
  },
}

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
