import type { Metadata, Viewport } from 'next'
import './globals.css'
import BottomNav from '@/components/BottomNav'

export const metadata: Metadata = {
  title: 'MinimaLife · AI 极简生活管家',
  description: '上传一张房间照片，AI 给你 3 步极简方案——帮你收拾家、拦住冲动购物、养成断舍离习惯。',
  keywords: '极简生活, 收纳整理, AI收纳, 断舍离, 整理收纳',
  openGraph: {
    title: 'MinimaLife · AI 极简生活管家',
    description: '上传照片，AI 3步帮你收拾家',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#F7F5F0',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="texture-bg min-h-screen">
        {children}
        <BottomNav />
      </body>
    </html>
  )
}
