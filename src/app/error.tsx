'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: 'rgba(232, 93, 93, 0.1)' }}>
        <AlertTriangle size={24} style={{ color: '#E85D5D' }} />
      </div>
      <h2 className="font-serif text-2xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
        出了点问题
      </h2>
      <p className="text-sm mb-8 max-w-xs" style={{ color: 'var(--text-secondary)' }}>
        就像乱成一团的抽屉，暂时需要重新整理一下。
      </p>
      <div className="flex gap-3">
        <button onClick={reset} className="btn-accent" style={{ padding: '12px 24px' }}>
          重试
        </button>
        <Link href="/" className="btn-secondary" style={{ padding: '12px 24px' }}>
          回首页
        </Link>
      </div>
    </div>
  )
}
