import { Leaf } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center animate-pulse"
        style={{ background: 'rgba(74, 124, 89, 0.15)' }}>
        <Leaf size={22} style={{ color: 'var(--accent-green)' }} />
      </div>
      <p className="text-sm" style={{ color: 'var(--text-muted)' }}>加载中...</p>
    </div>
  )
}
