import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'

import './globals.css'

import { Toaster } from '@/components/ui/sonner'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const jetBrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Prueba Técnica - Rotar Matriz 90° Antihorario',
    template: '%s | Rotar Matriz',
  },
  description:
    'Aplicación web para rotar matrices cuadradas NxN 90 grados en sentido antihorario. Ingresa una matriz en formato JSON y obtén el resultado rotado instantáneamente.',
  keywords: [
    'matriz',
    'rotación',
    'matriz NxN',
    'rotar matriz',
    'matriz antihorario',
    'algoritmo matriz',
    'Next.js',
    'prueba técnica',
  ],
  authors: [{ name: 'Matrix Rotation App' }],
  creator: 'Matrix Rotation App',
  publisher: 'Matrix Rotation App',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://matrix-rotation-technical-test.vercel.app'),
  alternates: {
    canonical: 'https://matrix-rotation-technical-test.vercel.app',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://matrix-rotation-technical-test.vercel.app',
    title: 'Prueba Técnica - Rotar Matriz 90° Antihorario',
    description:
      'Aplicación web para rotar matrices cuadradas NxN 90 grados en sentido antihorario. Ingresa una matriz en formato JSON y obtén el resultado rotado instantáneamente.',
    siteName: 'Matrix Rotation App',
    images: [
      {
        url: 'https://matrix-rotation-technical-test.vercel.app/matrix-rotation.png',
        width: 1200,
        height: 630,
        alt: 'Reto Técnico: Rotar Matriz 90° Anti-Horario - Next.js + SEO Optimization',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prueba Técnica - Rotar Matriz 90° Antihorario',
    description:
      'Aplicación web para rotar matrices cuadradas NxN 90 grados en sentido antihorario.',
    images: ['https://matrix-rotation-technical-test.vercel.app/matrix-rotation.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es'>
      <body className={`${inter.variable} ${jetBrainsMono.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
