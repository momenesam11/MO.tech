import type { Metadata } from 'next'
import './globals.css'
import CustomCursor from '@/components/ui/CustomCursor'
import { I18nProvider } from '@/lib/i18n'

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
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>
        <I18nProvider>
          <CustomCursor />
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}
