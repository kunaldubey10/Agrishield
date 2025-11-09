import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Suspense } from 'react'
import Loading from '@/components/Loading'
import { Providers } from '@/components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AgriShield - One Stop Farming Solutions',
  description: 'Modern farming solutions for better crop management and yield',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Suspense fallback={<Loading />}>
                {children}
              </Suspense>
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
} 