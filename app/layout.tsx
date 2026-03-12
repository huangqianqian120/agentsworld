import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: '如果地球是一座博物馆 | If Earth Were a Museum',
  description: '沉浸式全球博物馆可视化平台，将全球博物馆以3D形式附着在地球对应经纬度位置。探索艺术、历史、科学等各类博物馆，发现世界文化遗产。',
  generator: 'v0.app',
  keywords: ['博物馆', '3D地球', '文化遗产', '艺术', '历史', 'museum', 'globe', '可视化'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased dark">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
