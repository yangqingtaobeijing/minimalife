'use client'

import Link from 'next/link'
import {
  User, Camera, Ruler, ShoppingBag, Calendar, Crown,
  ChevronRight, Star, Package, ArrowLeft, Leaf, Bell, Info
} from 'lucide-react'

const mockHistory = [
  { id: 1, type: '空间诊断', space: '卧室床头区域', score: 4, date: '2025-01-10', isPaid: true },
  { id: 2, type: '空间诊断', space: '书桌区域', score: 6, date: '2025-01-08', isPaid: false },
  { id: 3, type: '收纳设计', space: '衣柜 · 日式极简', score: null, date: '2025-01-06', isPaid: true },
]

const quickLinks = [
  { icon: Camera, label: 'AI 空间诊断', sub: '每日 2 次免费', href: '/diagnose', color: '#4A7C59', bg: 'rgba(74,124,89,0.08)' },
  { icon: Ruler, label: '收纳设计', sub: '定制方案', href: '/design', color: '#8B7355', bg: 'rgba(139,115,85,0.08)' },
  { icon: ShoppingBag, label: '购物拦截器', sub: '理性消费', href: '/impulse', color: '#C9856A', bg: 'rgba(201,133,106,0.08)' },
  { icon: Calendar, label: '14 天挑战', sub: '已完成 3/14', href: '/challenge', color: '#7B5EA7', bg: 'rgba(123,94,167,0.08)' },
]

const settingsItems = [
  { label: '通知提醒', sub: '挑战打卡提醒', icon: Bell },
  { label: '数据与隐私', sub: '管理我的数据', icon: Package },
  { label: '关于 MinimaLife', sub: 'v0.2 · MVP 版本', icon: Info },
]

function PageNav() {
  return (
    <header className="page-nav">
      <div className="page-nav-inner">
        <div className="page-logo-link">
          <Link href="/" className="page-logo-link">
            <div className="page-logo-icon"><Leaf size={13} color="white" /></div>
            <span className="page-logo-text">MinimaLife</span>
          </Link>
        </div>
        <div className="page-nav-actions">
          <Link href="/" className="page-nav-link"><ArrowLeft size={14} />返回首页</Link>
        </div>
      </div>
    </header>
  )
}

export default function ProfilePage() {
  return (
    <div className="page">
      <PageNav />

      <div className="profile-layout">
        {/* Left Sidebar */}
        <div className="profile-sidebar">
          {/* User Card */}
          <div className="user-card">
            <div className="user-avatar">
              <User size={28} style={{ color: '#A8A59E' }} />
            </div>
            <div className="user-info">
              <div className="user-name">未登录用户</div>
              <div className="user-sub">登录后保存诊断记录</div>
            </div>
            <button className="login-btn">登录 / 注册</button>
          </div>

          {/* Quick Links */}
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">功能入口</h3>
            <div className="quick-links">
              {quickLinks.map(link => (
                <Link key={link.label} href={link.href} className="quick-link-card">
                  <div className="quick-link-icon" style={{ background: link.bg, color: link.color }}>
                    <link.icon size={18} />
                  </div>
                  <div className="quick-link-info">
                    <div className="quick-link-label">{link.label}</div>
                    <div className="quick-link-sub">{link.sub}</div>
                  </div>
                  <ChevronRight size={14} style={{ color: '#A8A59E', flexShrink: 0 }} />
                </Link>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">设置</h3>
            <div className="settings-list">
              {settingsItems.map((item, i) => (
                <div key={item.label} className="settings-item">
                  <div className="settings-left">
                    <div className="settings-icon"><item.icon size={15} /></div>
                    <div>
                      <div className="settings-label">{item.label}</div>
                      <div className="settings-sub">{item.sub}</div>
                    </div>
                  </div>
                  <ChevronRight size={14} style={{ color: '#A8A59E' }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="profile-main">
          {/* Membership Banner */}
          <div className="member-banner">
            <div className="member-banner-left">
              <div className="member-banner-icon">
                <Crown size={20} />
              </div>
              <div>
                <div className="member-banner-title">升级月度会员</div>
                <div className="member-banner-sub">无限诊断 + 全功能解锁</div>
              </div>
            </div>
            <button className="member-banner-btn">¥19.9/月</button>
          </div>

          {/* Benefits */}
          <div className="benefits-section">
            <h2 className="section-heading">会员专属权益</h2>
            <div className="benefits-grid">
              {[
                {
                  icon: '🔁',
                  title: '无限次诊断',
                  desc: '不再受每日免费次数限制，随时随地诊断任意空间',
                  color: '#4A7C59',
                },
                {
                  icon: '📋',
                  title: '全历史记录',
                  desc: '保存所有诊断和设计方案，随时回顾整理历程',
                  color: '#8B7355',
                },
                {
                  icon: '📆',
                  title: '14 天挑战全解锁',
                  desc: '直接访问全部 14 天任务，包括数字极简等进阶内容',
                  color: '#7B5EA7',
                },
                {
                  icon: '🎨',
                  title: '专属会员标识',
                  desc: '头像显示极简会员徽章，解锁专属证书样式',
                  color: '#E8C547',
                },
                {
                  icon: '⚡',
                  title: '优先体验新功能',
                  desc: '新功能上线前优先体验，参与功能迭代投票',
                  color: '#C9856A',
                },
                {
                  icon: '📊',
                  title: '收纳数据分析',
                  desc: '记录整理进度，生成个人极简数据报告',
                  color: '#4A7C59',
                },
              ].map(b => (
                <div key={b.title} className="benefit-card">
                  <div className="benefit-icon">{b.icon}</div>
                  <div className="benefit-title">{b.title}</div>
                  <div className="benefit-desc">{b.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* History */}
          <div className="history-section">
            <div className="history-header">
              <h2 className="section-heading">历史记录</h2>
              <span className="history-count">{mockHistory.length} 条记录</span>
            </div>

            <div className="history-list">
              {mockHistory.map(item => (
                <div key={item.id} className="history-item">
                  <div className="history-item-icon"
                    style={item.type === '空间诊断'
                      ? { background: 'rgba(74,124,89,0.08)', color: '#4A7C59' }
                      : { background: 'rgba(139,115,85,0.08)', color: '#8B7355' }}>
                    {item.type === '空间诊断' ? <Camera size={16} /> : <Ruler size={16} />}
                  </div>
                  <div className="history-item-content">
                    <div className="history-item-top">
                      <span className="history-space">{item.space}</span>
                      {item.isPaid && (
                        <span className="history-paid-badge">完整版</span>
                      )}
                    </div>
                    <div className="history-item-meta">
                      <span className="history-date">{item.date}</span>
                      {item.score && (
                        <span className="history-score">整洁度 {item.score}/10</span>
                      )}
                    </div>
                  </div>
                  <ChevronRight size={14} style={{ color: '#A8A59E', flexShrink: 0 }} />
                </div>
              ))}
            </div>
          </div>

          {/* Pricing again for reference */}
          <div className="pricing-ref">
            <h2 className="section-heading">定价方案</h2>
            <div className="pricing-cards">
              {[
                { name: '免费体验', price: '¥0', period: '永久免费', desc: '先体验再付费', featured: false },
                { name: '单次完整方案', price: '¥9.9', period: '/ 次', desc: '一次付费，终身查看', featured: true },
                { name: '月度会员', price: '¥19.9', period: '/ 月', desc: '高频用户首选', featured: false },
              ].map(plan => (
                <div key={plan.name} className={`ref-pricing-card ${plan.featured ? 'ref-featured' : ''}`}>
                  {plan.featured && <div className="ref-badge">最受欢迎</div>}
                  <div className="ref-name">{plan.name}</div>
                  <div className="ref-price">
                    <span className="ref-price-num">{plan.price}</span>
                    <span className="ref-price-period">{plan.period}</span>
                  </div>
                  <div className="ref-desc">{plan.desc}</div>
                  <button className={`ref-cta ${plan.featured ? 'ref-cta-featured' : 'ref-cta-normal'}`}>
                    {plan.name === '月度会员' ? '立即升级' : plan.name === '单次完整方案' ? '解锁完整方案' : '立即体验'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .profile-layout {
          max-width: 1120px;
          margin: 0 auto;
          padding: 48px 48px 80px;
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 48px;
          align-items: start;
        }
        /* Sidebar */
        .profile-sidebar { position: sticky; top: 88px; display: flex; flex-direction: column; gap: 24px; }
        .user-card {
          background: #FFFEF9;
          border: 1px solid #D9D6CE;
          border-radius: 16px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
        }
        .user-avatar {
          width: 64px; height: 64px;
          background: #F7F5F0;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }
        .user-name { font-size: 15px; font-weight: 700; color: #1A1917; }
        .user-sub { font-size: 12px; color: #A8A59E; margin-top: 2px; }
        .login-btn {
          width: 100%;
          padding: 10px;
          background: #1A1917;
          color: #F7F5F0;
          border: none;
          border-radius: 100px;
          font-size: 13px; font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .login-btn:hover { background: #2D2B28; }
        .sidebar-section { }
        .sidebar-section-title { font-size: 11px; font-weight: 700; color: #A8A59E; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px; }
        .quick-links { display: flex; flex-direction: column; gap: 6px; }
        .quick-link-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          background: #FFFEF9;
          border: 1px solid #D9D6CE;
          border-radius: 12px;
          text-decoration: none;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .quick-link-card:hover { box-shadow: 0 4px 16px rgba(26,25,23,0.08); transform: translateX(2px); }
        .quick-link-icon {
          width: 36px; height: 36px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .quick-link-info { flex: 1; }
        .quick-link-label { font-size: 13px; font-weight: 600; color: #1A1917; margin-bottom: 1px; }
        .quick-link-sub { font-size: 11px; color: #A8A59E; }
        .settings-list { display: flex; flex-direction: column; background: #FFFEF9; border: 1px solid #D9D6CE; border-radius: 12px; overflow: hidden; }
        .settings-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          border-bottom: 1px solid #EDEBE4;
          cursor: pointer;
          transition: background 0.15s;
        }
        .settings-item:last-child { border-bottom: none; }
        .settings-item:hover { background: #F7F5F0; }
        .settings-left { display: flex; align-items: center; gap: 10px; }
        .settings-icon {
          width: 30px; height: 30px;
          background: #F7F5F0;
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: #6B6860;
        }
        .settings-label { font-size: 13px; font-weight: 600; color: #1A1917; }
        .settings-sub { font-size: 11px; color: #A8A59E; }
        /* Main */
        .profile-main { display: flex; flex-direction: column; gap: 32px; }
        .member-banner {
          background: linear-gradient(135deg, #2D2B28, #4A3728);
          border-radius: 20px;
          padding: 24px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .member-banner-left { display: flex; align-items: center; gap: 16px; }
        .member-banner-icon {
          width: 44px; height: 44px;
          background: #E8C547;
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          color: #2D2B28;
        }
        .member-banner-title { font-size: 16px; font-weight: 700; color: #fff; margin-bottom: 2px; }
        .member-banner-sub { font-size: 13px; color: rgba(255,255,255,0.6); }
        .member-banner-btn {
          padding: 10px 20px;
          background: #E8C547;
          color: #2D2B28;
          border: none;
          border-radius: 100px;
          font-size: 14px; font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
          white-space: nowrap;
        }
        .member-banner-btn:hover { background: #f0d040; }
        /* Benefits */
        .section-heading { font-family: 'Noto Serif SC', serif; font-size: 20px; font-weight: 700; color: #1A1917; letter-spacing: -0.01em; margin-bottom: 16px; }
        .benefits-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        .benefit-card {
          background: #FFFEF9;
          border: 1px solid #D9D6CE;
          border-radius: 16px;
          padding: 20px;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .benefit-card:hover { box-shadow: 0 4px 16px rgba(26,25,23,0.08); transform: translateY(-2px); }
        .benefit-icon { font-size: 28px; margin-bottom: 12px; }
        .benefit-title { font-size: 14px; font-weight: 700; color: #1A1917; margin-bottom: 6px; }
        .benefit-desc { font-size: 12px; color: #6B6860; line-height: 1.6; }
        /* History */
        .history-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 14px; }
        .history-count { font-size: 13px; color: #A8A59E; }
        .history-list { background: #FFFEF9; border: 1px solid #D9D6CE; border-radius: 16px; overflow: hidden; }
        .history-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 20px;
          border-bottom: 1px solid #EDEBE4;
          cursor: pointer;
          transition: background 0.15s;
        }
        .history-item:last-child { border-bottom: none; }
        .history-item:hover { background: #F7F5F0; }
        .history-item-icon {
          width: 38px; height: 38px;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .history-item-content { flex: 1; min-width: 0; }
        .history-item-top { display: flex; align-items: center; gap: 8px; margin-bottom: 2px; }
        .history-space { font-size: 14px; font-weight: 600; color: #1A1917; }
        .history-paid-badge { font-size: 10px; font-weight: 600; padding: 2px 8px; background: rgba(74,124,89,0.1); color: #4A7C59; border-radius: 100px; }
        .history-item-meta { display: flex; gap: 12px; }
        .history-date { font-size: 12px; color: #A8A59E; }
        .history-score { font-size: 12px; color: #A8A59E; }
        /* Pricing ref */
        .pricing-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .ref-pricing-card {
          background: #FFFEF9;
          border: 1px solid #D9D6CE;
          border-radius: 18px;
          padding: 24px;
          position: relative;
        }
        .ref-featured {
          background: #1A1917;
          border-color: #1A1917;
        }
        .ref-badge {
          position: absolute;
          top: -12px;
          left: 50%;
          transform: translateX(-50%);
          padding: 4px 14px;
          background: #4A7C59;
          color: #fff;
          font-size: 11px; font-weight: 600;
          border-radius: 100px;
          white-space: nowrap;
        }
        .ref-name { font-size: 14px; font-weight: 700; color: #1A1917; margin-bottom: 8px; }
        .ref-featured .ref-name { color: #fff; }
        .ref-price { display: flex; align-items: baseline; gap: 3px; margin-bottom: 6px; }
        .ref-price-num { font-family: 'Noto Serif SC', serif; font-size: 32px; font-weight: 700; color: #1A1917; }
        .ref-featured .ref-price-num { color: #fff; }
        .ref-price-period { font-size: 12px; color: #A8A59E; }
        .ref-featured .ref-price-period { color: rgba(255,255,255,0.4); }
        .ref-desc { font-size: 12px; color: #6B6860; margin-bottom: 18px; }
        .ref-featured .ref-desc { color: rgba(255,255,255,0.5); }
        .ref-cta {
          width: 100%;
          padding: 11px;
          border-radius: 100px;
          font-size: 13px; font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          text-align: center;
          border: none;
        }
        .ref-cta-normal { background: transparent; border: 1.5px solid #D9D6CE; color: #1A1917; }
        .ref-cta-normal:hover { border-color: #1A1917; }
        .ref-cta-featured { background: #4A7C59; color: #fff; }
        .ref-cta-featured:hover { background: #6BAF80; }
        /* Nav */
        .page-nav { position: sticky; top: 0; z-index: 100; background: rgba(247,245,240,0.9); backdrop-filter: blur(16px); border-bottom: 1px solid #D9D6CE; }
        .page-nav-inner { max-width: 1120px; margin: 0 auto; padding: 0 48px; height: 64px; display: flex; align-items: center; justify-content: space-between; }
        .page-logo-link { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .page-logo-icon { width: 30px; height: 30px; background: #4A7C59; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
        .page-logo-text { font-family: 'Noto Serif SC', serif; font-size: 16px; font-weight: 700; color: #1A1917; }
        .page-nav-actions { display: flex; gap: 12px; }
        .page-nav-link { display: flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 500; color: #6B6860; text-decoration: none; transition: background 0.15s; }
        .page-nav-link:hover { background: #EDEBE4; color: #1A1917; }
        @media (max-width: 900px) {
          .profile-layout { grid-template-columns: 1fr; padding: 32px 24px; }
          .profile-sidebar { position: static; }
          .benefits-grid { grid-template-columns: repeat(2, 1fr); }
          .pricing-cards { grid-template-columns: 1fr; }
        }
        @media (max-width: 600px) {
          .benefits-grid { grid-template-columns: 1fr; }
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #EDEBE4; }
        ::-webkit-scrollbar-thumb { background: #D9D6CE; border-radius: 3px; }
      `}</style>
    </div>
  )
}
