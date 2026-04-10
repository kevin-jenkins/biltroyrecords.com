import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Biltroy Records',
    template: '%s | Biltroy Records',
  },
  description: 'Biltroy Records — independent record label based in Chapel Hill, NC.',
  openGraph: {
    siteName: 'Biltroy Records',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-primary antialiased min-h-screen flex flex-col">
        <Header />
        <div className="flex-1">{children}</div>
      </body>
    </html>
  )
}
