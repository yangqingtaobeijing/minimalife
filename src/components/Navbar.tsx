'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Leaf, Menu, X, User, Sparkles } from 'lucide-react'

const navLinks = [
  { href: '/diagnose', label: 'AI 诊断' },
  { href: '/design', label: '收纳设计' },
  { href: '/impulse', label: '购物拦截' },
  { href: '/challenge', label: '14天挑战' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50" style={{ background: 'rgba(247, 245, 240, 0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)' }}>
      <div className="max-w-screen-md mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-green)' }}>
            <Leaf size={14} color="white" />
          </div>
          <span className="font-serif font-semibold text-base" style={{ color: 'var(--text-primary)', letterSpacing: '0.02em' }}>
            MinimaLife
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded-full text-sm transition-all"
              style={{
                color: pathname === link.href ? 'var(--accent-green)' : 'var(--text-secondary)',
                background: pathname === link.href ? 'rgba(74, 124, 89, 0.1)' : 'transparent',
                fontWeight: pathname === link.href ? '500' : '400',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/diagnose"
            className="hidden md:flex items-center gap-1 btn-accent text-sm"
            style={{ padding: '8px 18px' }}
          >
            <Sparkles size={13} />
            免费诊断
          </Link>
          <Link href="/profile" className="p-2 rounded-full" style={{ color: 'var(--text-secondary)' }}>
            <User size={18} />
          </Link>
          {/* Mobile Menu */}
          <button
            className="md:hidden p-2 rounded-full"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: 'var(--text-secondary)' }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden" style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--border)' }}>
          <div className="px-4 py-3 flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-sm"
                style={{
                  color: pathname === link.href ? 'var(--accent-green)' : 'var(--text-primary)',
                  background: pathname === link.href ? 'rgba(74, 124, 89, 0.08)' : 'transparent',
                  fontWeight: pathname === link.href ? '500' : '400',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
              <Link
                href="/diagnose"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 btn-accent w-full text-sm"
                style={{ padding: '12px' }}
              >
                <Sparkles size={14} />
                立即免费诊断
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
