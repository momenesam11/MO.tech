import type { Metadata } from 'next'
import './globals.css'
import CustomCursor from '@/components/ui/CustomCursor'

export const metadata: Metadata = {
  title: 'Momen Esam | UI/UX Designer & Frontend Developer',
  description: 'Portfolio of Momen Esam — UI/UX Designer and Frontend Developer based in Cairo, Egypt.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
