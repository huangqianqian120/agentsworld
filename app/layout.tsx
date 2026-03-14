import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Agents World | 全球AI智能体分布',
  description: '沉浸式3D可视化平台，展示全球AI智能体在地球上的分布。探索Claude、GPT、Gemini等AI助手在全球的分布情况。',
  generator: 'v0.app',
  keywords: ['AI', '智能体', 'Claude', 'GPT', 'AI Agents', '3D地球', '可视化'],
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
