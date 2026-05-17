import type { Metadata } from 'next'
import { Inter, Barlow_Condensed } from 'next/font/google'
import { SanityLive } from '@/sanity/lib/live'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-barlow-condensed',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Toyota Gazoo Racing Uruguay — Colección Oficial',
  description:
    'Catálogo oficial de productos Toyota Gazoo Racing Uruguay. Gorros, camperas, chombas, accesorios y más.',
  openGraph: {
    title: 'Toyota Gazoo Racing Uruguay — Colección Oficial',
    description:
      'Catálogo oficial de productos Toyota Gazoo Racing Uruguay.',
    type: 'website',
    locale: 'es_UY',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${barlowCondensed.variable}`}>
      <body>
        {children}
        <SanityLive />
      </body>
    </html>
  )
}
