import Link from 'next/link'
import { Leaf, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
        style={{ background: 'rgba(74, 124, 89, 0.1)' }}>
        <Leaf size={28} style={{ color: 'var(--accent-green)' }} />
      </div>
      <h1 className="font-serif text-6xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>404</h1>
      <p className="text-lg font-medium mb-2" style={{ color: 'var(--text-primary)' }}>这个页面不存在</p>
      <p className="text-sm mb-8 max-w-xs" style={{ color: 'var(--text-secondary)' }}>
        就像杂乱的房间里找不到东西——它可能被收纳到别处了。
      </p>
      <Link href="/" className="btn-accent flex items-center gap-2" style={{ padding: '14px 32px' }}>
        <Home size={16} />
        回到首页
      </Link>
    </div>
  )
}
