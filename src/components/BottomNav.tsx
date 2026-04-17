'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMediaQuery } from 'react-responsive'
import { Camera, Ruler, ShoppingBag, Calendar, Home } from 'lucide-react'

const tabs = [
  { href: '/', icon: Home, label: '首页' },
  { href: '/diagnose', icon: Camera, label: '诊断' },
  { href: '/design', icon: Ruler, label: '收纳' },
  { href: '/impulse', icon: ShoppingBag, label: '拦截' },
  { href: '/challenge', icon: Calendar, label: '挑战' },
]

export default function BottomNav() {
  const pathname = usePathname()
  // 只在 < 768px 屏幕显示
  const isMobile = useMediaQuery({ maxWidth: 767 })

  if (!isMobile) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 safe-bottom"
      style={{
        background: 'rgba(247, 245, 240, 0.92)',
        backdropFilter: 'blur(16px)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="flex items-stretch max-w-screen-md mx-auto">
        {tabs.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className="flex-1 flex flex-col items-center justify-center py-2.5 gap-1 no-underline transition-all"
              style={{ textDecoration: 'none' }}
            >
              <div
                className="w-9 h-9 flex items-center justify-center rounded-xl transition-all"
                style={{
                  background: isActive ? 'rgba(74, 124, 89, 0.12)' : 'transparent',
                  transform: isActive ? 'translateY(-1px)' : 'none',
                }}
              >
                <Icon
                  size={20}
                  style={{ color: isActive ? 'var(--accent-green)' : 'var(--text-muted)' }}
                  strokeWidth={isActive ? 2.2 : 1.8}
                />
              </div>
              <span
                className="text-xs"
                style={{
                  color: isActive ? 'var(--accent-green)' : 'var(--text-muted)',
                  fontWeight: isActive ? '500' : '400',
                }}
              >
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
