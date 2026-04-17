'use client'

import Link from 'next/link'
import {
  Leaf, Sparkles, Camera, Ruler, ShoppingBag, Calendar, Star,
  ArrowRight, Check, ChevronRight, Zap, Shield, Clock, TrendingUp, X
} from 'lucide-react'

// ─── Navbar ───
function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-inner">
        <div className="nav-logo">
          <div className="nav-logo-icon">
            <Leaf size={14} color="white" />
          </div>
          <span className="nav-logo-text">MinimaLife</span>
        </div>
        <nav className="nav-links">
          {['功能', '使用流程', '定价', '用户评价'].map((item) => (
            <a key={item} href={`#${item}`} className="nav-link">{item}</a>
          ))}
        </nav>
        <div className="nav-actions">
          <Link href="/diagnose" className="nav-cta">
            免费诊断
          </Link>
        </div>
      </div>
    </header>
  )
}

// ─── Hero ───
function HeroSection() {
  return (
    <section className="hero" id="top">
      <div className="hero-inner">
        {/* Left: Copy */}
        <div className="hero-copy">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            AI 极简生活管家 · 正式版
          </div>

          <h1 className="hero-title">
            <span className="hero-title-line">上传一张照片</span>
            <span className="hero-title-line">
              <span className="hero-title-accent">AI</span> 帮你
            </span>
            <span className="hero-title-line">收拾家</span>
          </h1>

          <p className="hero-desc">
            不用看教程，不用纠结从哪下手。<br />
            上传房间照片，AI 识别具体杂乱点，<br />
            生成可立即执行的三步整理方案。
          </p>

          <div className="hero-actions">
            <Link href="/diagnose" className="btn-primary-lg">
              <Sparkles size={16} />
              免费诊断我的房间
            </Link>
            <Link href="/design" className="btn-secondary-lg">
              了解更多功能
              <ArrowRight size={14} />
            </Link>
          </div>

          <div className="hero-proof">
            <div className="hero-proof-avatars">
              {['🌿', '🍃', '🌱', '🪴', '🌾'].map((e, i) => (
                <div key={i} className="proof-avatar">{e}</div>
              ))}
            </div>
            <div className="hero-proof-text">
              <div className="proof-stars">
                {Array(5).fill(0).map((_, i) => (
                  <Star key={i} size={12} fill="#E8C547" style={{ color: '#E8C547' }} />
                ))}
              </div>
              <span>12,000+ 用户正在使用</span>
            </div>
          </div>
        </div>

        {/* Right: Visual */}
        <div className="hero-visual">
          <div className="hero-card hero-card-main">
            <div className="hero-card-header">
              <div className="hero-card-dot" style={{ background: '#FF5F57' }} />
              <div className="hero-card-dot" style={{ background: '#FEBC2E' }} />
              <div className="hero-card-dot" style={{ background: '#28C840' }} />
              <span className="hero-card-title">AI 空间诊断报告</span>
            </div>
            <div className="hero-card-body">
              <div className="hero-score-row">
                <div className="hero-score-label">整洁度评分</div>
                <div className="hero-score-value">4<span>/10</span></div>
              </div>
              <div className="hero-score-bar">
                <div className="hero-score-fill" style={{ width: '40%' }} />
              </div>

              <div className="hero-problems">
                <div className="hero-problem-tag problem-high">高 · 床头左侧层板</div>
                <div className="hero-problem-text">混放书籍、充电线、零食和护肤品，4 类不相关物品堆叠</div>
                <div className="hero-problem-tag problem-high">高 · 书桌表面</div>
                <div className="hero-problem-text">未整理文件、3 个空杯子和 3 根充电线散落</div>
                <div className="hero-problem-tag problem-med">中 · 地面角落</div>
                <div className="hero-problem-text">2 个未拆快递盒占据地面，存在绊倒风险</div>
              </div>

              <div className="hero-steps">
                <div className="hero-step">
                  <div className="hero-step-num" style={{ background: '#C9856A' }}>扔</div>
                  <span>过期零食包装、重复充电线</span>
                </div>
                <div className="hero-step">
                  <div className="hero-step-num" style={{ background: '#4A7C59' }}>留</div>
                  <span>睡前护肤品 3 件、在读书 1 本</span>
                </div>
                <div className="hero-step">
                  <div className="hero-step-num" style={{ background: '#7B5EA7' }}>收</div>
                  <span>竹木书立 + 理线夹 + 小托盘</span>
                </div>
              </div>

              <div className="hero-tools">
                <span className="hero-tools-label">推荐工具</span>
                {['竹木书立 ¥20', '理线夹 ¥10', '托盘 ¥25'].map(t => (
                  <span key={t} className="hero-tool-chip">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Floating badges */}
          <div className="hero-float hero-float-1">
            <Check size={12} style={{ color: '#4A7C59' }} />
            30 秒出结果
          </div>
          <div className="hero-float hero-float-2">
            <TrendingUp size={12} style={{ color: '#7B5EA7' }} />
            97% 好评率
          </div>
        </div>
      </div>


    </section>
  )
}

// ─── Stats ───
function StatsSection() {
  const stats = [
    { num: '12,000+', label: '次空间诊断', sub: '已帮助用户发现杂乱问题' },
    { num: '¥9.9', label: '完整方案定价', sub: '一次付费，终身查看' },
    { num: '97%', label: '用户好评率', sub: '基于产品内评价统计' },
    { num: '3 步', label: '从拍照到行动', sub: '不超过 5 分钟上手' },
  ]
  return (
    <section className="stats-bar">
      <div className="stats-inner">
        {stats.map((s, i) => (
          <div key={s.label} className="stat-block">
            {i > 0 && <div className="stat-divider" />}
            <div className="stat-num">{s.num}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Features ───
function FeaturesSection() {
  const features = [
    {
      icon: Camera,
      color: '#4A7C59',
      title: 'AI 空间诊断',
      tag: '核心功能',
      desc: '上传 1–4 张房间照片，Gemini 多模态模型逐区域识别具体杂乱点，生成可立即执行的三步整理方案。',
      bullets: ['指向具体位置，不说废话', '免费查看 60% 内容', '完整方案 ¥9.9 解锁'],
      href: '/diagnose',
    },
    {
      icon: Ruler,
      color: '#8B7355',
      title: '个性化收纳设计',
      tag: '核心功能',
      desc: '填写空间类型、尺寸、风格偏好，AI 生成定制化布局方案，包括按频率分层收纳 + 低成本工具清单。',
      bullets: ['按使用频率自动分层', '含淘宝关键词 + 购买链接', '租房友好，无需打孔'],
      href: '/design',
    },
    {
      icon: ShoppingBag,
      color: '#C9856A',
      title: '购物欲拦截器',
      tag: '增长功能',
      desc: '想买一样东西？AI 通过三个追问帮你理性分析，输出 1–10 的购买评分和冷静期建议，生成可分享的劝退卡。',
      bullets: ['三个追问直击本质', '理性评分，告别冲动', '冷静期提醒，避免后悔'],
      href: '/impulse',
    },
    {
      icon: Calendar,
      color: '#7B5EA7',
      title: '14 天断舍离挑战',
      tag: '增长功能',
      desc: '每天一个 5 分钟小任务，AI 打卡督促，完成全部挑战可获得专属极简证书，14 天养成整理习惯。',
      bullets: ['每日 5 分钟，门槛极低', 'AI 个性化鼓励反馈', '完成挑战送极简证书'],
      href: '/challenge',
    },
  ]

  return (
    <section className="features" id="功能">
      <div className="section-inner">
        <div className="section-header">
          <div className="section-eyebrow">
            <Zap size={13} />
            功能模块
          </div>
          <h2 className="section-title">四个工具，覆盖极简全链路</h2>
          <p className="section-desc">从诊断到习惯养成，每一步都有 AI 陪伴</p>
        </div>

        <div className="features-grid">
          {features.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-card-header">
                <div className="feature-icon" style={{ background: `${f.color}15`, color: f.color }}>
                  <f.icon size={22} />
                </div>
                <div>
                  <div className="feature-tag" style={{ color: f.color }}>{f.tag}</div>
                </div>
              </div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
              <ul className="feature-bullets">
                {f.bullets.map((b) => (
                  <li key={b}>
                    <Check size={13} style={{ color: f.color }} />
                    {b}
                  </li>
                ))}
              </ul>
              <Link href={f.href} className="feature-link" style={{ color: f.color }}>
                立即体验
                <ArrowRight size={13} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── How it works ───
function HowSection() {
  const steps = [
    {
      num: '01',
      title: '拍一张照片',
      desc: '手机随手拍，不用整理，越真实越好。1–4 张照片，覆盖主要问题区域即可。',
      detail: '支持 JPG / PNG / WebP，多张照片可更准确识别',
    },
    {
      num: '02',
      title: 'AI 30 秒分析',
      desc: 'Gemini 多模态模型逐区域分析，指出具体杂乱点和原因，不说「要整理」这类废话。',
      detail: '识别空间类型、评估整洁度、定位高优先级问题',
    },
    {
      num: '03',
      title: '执行三步方案',
      desc: '扔 / 留 / 收纳，每步都有具体动作和推荐工具。工具含淘宝关键词，直接复制搜索。',
      detail: '预计总花费 ¥50 以内，租房无需打孔',
    },
  ]
  return (
    <section className="how" id="使用流程">
      <div className="section-inner">
        <div className="section-header">
          <div className="section-eyebrow">
            <Zap size={13} />
            使用流程
          </div>
          <h2 className="section-title">三步就够了</h2>
          <p className="section-desc">不需要学整理知识，不需要买很多收纳工具</p>
        </div>

        <div className="how-steps">
          {steps.map((step, i) => (
            <div key={step.num} className="how-step">
              <div className="how-step-num">{step.num}</div>
              <div className="how-step-content">
                <h3 className="how-step-title">{step.title}</h3>
                <p className="how-step-desc">{step.desc}</p>
                <p className="how-step-detail">{step.detail}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="how-connector">
                  <div className="how-connector-line" />
                  <ArrowRight size={16} style={{ color: 'var(--border)' }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Pricing ───
function PricingSection() {
  const plans = [
    {
      name: '免费体验',
      price: '¥0',
      period: '永久免费',
      desc: '先体验，觉得好再付费',
      items: ['每日 1 次诊断（未登录）', '查看 60% 诊断内容（预览版）', '购物拦截器基础版', '14 天挑战前 7 天'],
      cta: '立即体验',
      href: '/diagnose',
      featured: false,
    },
    {
      name: '单次完整方案',
      price: '¥9.9',
      period: '/ 次',
      desc: '解锁完整三步方案 + 工具清单',
      items: ['完整三步方案（不限内容）', '详细收纳工具清单', '淘宝关键词 + 购买链接', '生成分享图', '永久保存历史记录'],
      cta: '解锁完整方案',
      href: '/diagnose',
      featured: true,
    },
    {
      name: '月度会员',
      price: '¥19.9',
      period: '/ 月',
      desc: '高频用户的最佳选择',
      items: ['无限次诊断（本月无限用）', '全功能解锁', '14 天挑战完整版', '专属会员标识', '优先体验新功能'],
      cta: '升级会员',
      href: '/profile',
      featured: false,
    },
  ]
  return (
    <section className="pricing" id="定价">
      <div className="section-inner">
        <div className="section-header">
          <div className="section-eyebrow">
            <Star size={13} />
            定价
          </div>
          <h2 className="section-title">简单透明，没有套路</h2>
          <p className="section-desc">免费开始，觉得有用再付费</p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan) => (
            <div key={plan.name} className={`pricing-card ${plan.featured ? 'pricing-featured' : ''}`}>
              {plan.featured && <div className="pricing-badge">最受欢迎</div>}
              <div className="pricing-name">{plan.name}</div>
              <div className="pricing-price">
                <span className="pricing-amount">{plan.price}</span>
                <span className="pricing-period">{plan.period}</span>
              </div>
              <div className="pricing-desc">{plan.desc}</div>
              <ul className="pricing-items">
                {plan.items.map((item) => (
                  <li key={item}>
                    <Check size={14} style={{ color: plan.featured ? '#fff' : 'var(--accent-green)', flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href={plan.href} className={`pricing-cta ${plan.featured ? 'pricing-cta-featured' : 'pricing-cta-normal'}`}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ───
function TestimonialsSection() {
  const testimonials = [
    {
      avatar: '🌿',
      name: '小鱼 er',
      tag: '租房党 · 北京',
      text: '上传了卧室照片，AI 直接点出「床头区域混放了 3 类不相关物品」，说中了！按方案整理完当天就觉得空气都清新了，淘宝买的书立 3 天就到了，才 ¥18。',
      stars: 5,
    },
    {
      avatar: '🍃',
      name: '橘子树下',
      tag: '收纳新手 · 上海',
      text: '购物拦截器真的很有效，打算买第 5 个保温杯时被问「家里有没有类似的」，一下子冷静了。冷静了 7 天，现在完全不想买了，感谢这个功能！',
      stars: 5,
    },
    {
      avatar: '🌱',
      name: 'Ming',
      tag: '完成了 14 天挑战 · 深圳',
      text: '14 天挑战完成，扔掉了一大袋东西。拿到极简证书的那一刻觉得还挺有成就感的哈哈。虽然证书是个电子版，但截图发朋友圈还是很有仪式感的。',
      stars: 5,
    },
  ]
  return (
    <section className="testimonials" id="用户评价">
      <div className="section-inner">
        <div className="section-header">
          <div className="section-eyebrow">
            <Star size={13} />
            真实用户
          </div>
          <h2 className="section-title">他们都在改变</h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div key={t.name} className="testimonial-card">
              <div className="testimonial-stars">
                {Array(t.stars).fill(0).map((_, i) => (
                  <Star key={i} size={14} fill="#E8C547" style={{ color: '#E8C547' }} />
                ))}
              </div>
              <p className="testimonial-text">「{t.text}」</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{t.avatar}</div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-tag">{t.tag}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Final CTA ───
function CTASection() {
  return (
    <section className="cta-section">
      <div className="cta-inner">
        <div className="cta-visual">
          <div className="cta-orb cta-orb-1" />
          <div className="cta-orb cta-orb-2" />
        </div>
        <div className="cta-content">
          <h2 className="cta-title">今天就开始</h2>
          <p className="cta-desc">
            第一次诊断完全免费，上传照片不到 30 秒。<br />
            极简生活，从看清自己的房间开始。
          </p>
          <div className="cta-actions">
            <Link href="/diagnose" className="btn-primary-lg">
              <Camera size={16} />
              上传我的房间照片
            </Link>
          </div>
          <div className="cta-trust">
            <Shield size={13} style={{ color: 'var(--text-muted)' }} />
            <span>无需注册 · 隐私保护 · 随时可用</span>
            <Clock size={13} style={{ color: 'var(--text-muted)' }} />
            <span>30 秒出结果</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <Leaf size={14} color="white" />
            </div>
            <span className="footer-name">MinimaLife</span>
          </div>
          <div className="footer-nav">
            {['功能', '使用流程', '定价', '用户评价'].map((item) => (
              <a key={item} href={`#${item}`} className="footer-link">{item}</a>
            ))}
          </div>
          <div className="footer-nav">
            {['隐私政策', '使用条款', '联系我们'].map((item) => (
              <span key={item} className="footer-link">{item}</span>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 MinimaLife · Made with 🌿</span>
        </div>
      </div>
    </footer>
  )
}

// ─── Page ───
export default function HomePage() {
  return (
    <div className="page">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />

      <style>{`
        /* ── Reset & Base ── */
        * { box-sizing: border-box; padding: 0; margin: 0; }
        :root {
          --green: #4A7C59;
          --green-light: #6BAF80;
          --green-pale: #EFF7F2;
          --warm: #C9856A;
          --warm-pale: #FBF3F0;
          --purple: #7B5EA7;
          --brown: #8B7355;
          --cream: #F7F5F0;
          --cream-dark: #EDEBE4;
          --text: #1A1917;
          --text-2: #6B6860;
          --text-3: #A8A59E;
          --border: #D9D6CE;
          --card: #FFFEF9;
          --shadow: 0 2px 20px rgba(26,25,23,0.07);
          --shadow-lg: 0 12px 48px rgba(26,25,23,0.14);
        }
        html { scroll-behavior: smooth; }
        body {
          font-family: 'Noto Sans SC', -apple-system, sans-serif;
          background: var(--cream);
          color: var(--text);
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        .page { min-height: 100vh; }

        /* ── Layout Helpers ── */
        .section-inner {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 48px;
        }
        @media (max-width: 768px) {
          .section-inner { padding: 0 20px; }
        }
        .section-header {
          text-align: center;
          margin-bottom: 64px;
        }
        .section-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 14px;
          background: var(--cream-dark);
          border-radius: 100px;
          font-size: 12px;
          font-weight: 500;
          color: var(--text-2);
          margin-bottom: 16px;
        }
        .section-title {
          font-family: 'Noto Serif SC', serif;
          font-size: clamp(1.8rem, 3vw, 2.8rem);
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.02em;
          margin-bottom: 12px;
        }
        .section-desc {
          font-size: 16px;
          color: var(--text-2);
        }

        /* ── Navbar ── */
        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(247, 245, 240, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
        }
        .nav-inner {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 48px;
          height: 68px;
          display: flex;
          align-items: center;
          gap: 48px;
        }
        .nav-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .nav-logo-icon {
          width: 32px; height: 32px;
          background: var(--green);
          border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
        }
        .nav-logo-text {
          font-family: 'Noto Serif SC', serif;
          font-size: 17px;
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.01em;
        }
        .nav-links {
          display: flex;
          gap: 8px;
          flex: 1;
        }
        .nav-link {
          padding: 7px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          color: var(--text-2);
          text-decoration: none;
          transition: all 0.15s;
        }
        .nav-link:hover {
          background: var(--cream-dark);
          color: var(--text);
        }
        .nav-actions { flex-shrink: 0; }
        .nav-cta {
          display: inline-flex;
          align-items: center;
          padding: 10px 22px;
          background: var(--green);
          color: #fff;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
        }
        .nav-cta:hover {
          background: var(--green-light);
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(74,124,89,0.3);
        }

        /* ── Hero ── */
        .hero {
          position: relative;
          background: linear-gradient(150deg, #EFF7F2 0%, var(--cream) 55%, var(--warm-pale) 100%);
          overflow: hidden;
          padding: 80px 0 100px;
        }
        .hero-inner {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 48px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          position: relative;
          z-index: 2;
        }
        .hero-copy { flex: 1; }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(74,124,89,0.2);
          border-radius: 100px;
          font-size: 13px;
          font-weight: 500;
          color: var(--green);
          margin-bottom: 32px;
          letter-spacing: 0.01em;
        }
        .hero-badge-dot {
          width: 6px; height: 6px;
          background: var(--green);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.6; transform:scale(0.85); }
        }
        .hero-title {
          font-family: 'Noto Serif SC', serif;
          font-size: clamp(2.4rem, 4vw, 3.6rem);
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.03em;
          color: var(--text);
          margin-bottom: 24px;
        }
        .hero-title-line { display: block; }
        .hero-title-accent { color: var(--green); }
        .hero-desc {
          font-size: 17px;
          line-height: 1.75;
          color: var(--text-2);
          margin-bottom: 36px;
        }
        .hero-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 40px;
        }
        .btn-primary-lg {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 15px 32px;
          background: var(--green);
          color: #fff;
          border-radius: 100px;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
          border: none;
          cursor: pointer;
        }
        .btn-primary-lg:hover {
          background: var(--green-light);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(74,124,89,0.35);
        }
        .btn-secondary-lg {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 14px 32px;
          background: transparent;
          color: var(--text-2);
          border: 1.5px solid var(--border);
          border-radius: 100px;
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s;
          cursor: pointer;
          width: fit-content;
        }
        .btn-secondary-lg:hover {
          border-color: var(--text-3);
          color: var(--text);
          background: rgba(255,255,255,0.5);
        }
        .hero-proof {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .hero-proof-avatars { display: flex; }
        .proof-avatar {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: var(--cream-dark);
          border: 2px solid var(--cream);
          display: flex; align-items: center; justify-content: center;
          font-size: 14px;
          margin-left: -8px;
        }
        .proof-avatar:first-child { margin-left: 0; }
        .hero-proof-text { display: flex; flex-direction: column; gap: 3px; }
        .proof-stars { display: flex; gap: 2px; }
        .hero-proof-text span { font-size: 13px; color: var(--text-2); }

        /* Hero Visual */
        .hero-visual {
          position: relative;
          perspective: 1000px;
        }
        .hero-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 20px;
          box-shadow: var(--shadow-lg);
          overflow: hidden;
          animation: floatCard 6s ease-in-out infinite;
        }
        @keyframes floatCard {
          0%,100% { transform: translateY(0) rotateX(0deg); }
          50% { transform: translateY(-10px) rotateX(0.5deg); }
        }
        .hero-card-main { position: relative; z-index: 2; }
        .hero-card-header {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 14px 20px;
          border-bottom: 1px solid var(--border);
          background: var(--cream-dark);
        }
        .hero-card-dot { width: 12px; height: 12px; border-radius: 50%; }
        .hero-card-title { font-size: 12px; color: var(--text-3); margin-left: 4px; }
        .hero-card-body { padding: 24px; }
        .hero-score-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 8px;
        }
        .hero-score-label { font-size: 13px; color: var(--text-3); }
        .hero-score-value {
          font-family: 'Noto Serif SC', serif;
          font-size: 28px;
          font-weight: 700;
          color: var(--warm);
        }
        .hero-score-value span { font-size: 14px; font-weight: 400; color: var(--text-3); }
        .hero-score-bar {
          height: 6px;
          background: var(--cream-dark);
          border-radius: 3px;
          margin-bottom: 20px;
          overflow: hidden;
        }
        .hero-score-fill {
          height: 100%;
          background: linear-gradient(to right, var(--warm), var(--warm));
          border-radius: 3px;
        }
        .hero-problems { display: flex; flex-direction: column; gap: 4px; margin-bottom: 16px; }
        .hero-problem-tag {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
          margin-top: 8px;
        }
        .problem-high { background: rgba(201,133,106,0.15); color: var(--warm); }
        .problem-med { background: rgba(74,124,89,0.1); color: var(--green); }
        .hero-problem-text { font-size: 12px; color: var(--text-2); padding-left: 8px; }
        .hero-steps { display: flex; gap: 8px; margin-bottom: 16px; }
        .hero-step {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          background: var(--cream);
          border-radius: 10px;
          font-size: 11px;
          color: var(--text-2);
        }
        .hero-step-num {
          width: 22px; height: 22px;
          border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          flex-shrink: 0;
        }
        .hero-tools { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
        .hero-tools-label { font-size: 11px; color: var(--text-3); }
        .hero-tool-chip {
          padding: 3px 8px;
          background: var(--cream-dark);
          border-radius: 6px;
          font-size: 11px;
          color: var(--text-2);
        }

        /* Floating badges */
        .hero-float {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 100px;
          box-shadow: var(--shadow);
          font-size: 12px;
          font-weight: 500;
          color: var(--text);
          z-index: 3;
          animation: floatFloat 4s ease-in-out infinite;
        }
        .hero-float-1 { bottom: -16px; left: -24px; animation-delay: 0s; }
        .hero-float-2 { top: 20px; right: -24px; animation-delay: 2s; }
        @keyframes floatFloat {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        /* ── Stats ── */
        .stats-bar {
          background: var(--text);
          padding: 56px 0;
        }
        .stats-inner {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 48px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }
        .stat-block { padding: 0 40px; position: relative; }
        .stat-block:first-child { padding-left: 0; }
        .stat-block:not(:first-child)::before {
          content: '';
          position: absolute;
          left: 0; top: 50%;
          transform: translateY(-50%);
          width: 1px; height: 48px;
          background: rgba(255,255,255,0.1);
        }
        .stat-num {
          font-family: 'Noto Serif SC', serif;
          font-size: 36px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 4px;
          letter-spacing: -0.02em;
        }
        .stat-label {
          font-size: 15px;
          font-weight: 600;
          color: rgba(255,255,255,0.9);
          margin-bottom: 4px;
        }
        .stat-sub { font-size: 12px; color: rgba(255,255,255,0.4); }

        /* ── Features ── */
        .features { padding: 100px 0; background: var(--cream); }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        @media (max-width: 900px) {
          .features-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .features-grid { grid-template-columns: 1fr; }
        }
        .feature-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 32px 28px;
          transition: transform 0.25s, box-shadow 0.25s;
          display: flex;
          flex-direction: column;
        }
        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-lg);
        }
        .feature-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }
        .feature-icon {
          width: 48px; height: 48px;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
        }
        .feature-tag {
          font-size: 11px;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 100px;
          background: currentColor;
          background: rgba(currentColor, 0.1);
        }
        .feature-title {
          font-family: 'Noto Serif SC', serif;
          font-size: 20px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 12px;
          letter-spacing: -0.01em;
        }
        .feature-desc {
          font-size: 14px;
          line-height: 1.7;
          color: var(--text-2);
          margin-bottom: 20px;
          flex: 1;
        }
        .feature-bullets {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 24px;
        }
        .feature-bullets li {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--text-2);
        }
        .feature-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          margin-top: auto;
          transition: gap 0.2s;
        }
        .feature-link:hover { gap: 10px; }

        /* ── How ── */
        .how { padding: 100px 0; background: var(--cream-dark); }
        .how-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 48px;
          position: relative;
        }
        .how-step { position: relative; }
        .how-step-num {
          font-family: 'Noto Serif SC', serif;
          font-size: 56px;
          font-weight: 700;
          color: var(--green);
          opacity: 0.2;
          line-height: 1;
          margin-bottom: 20px;
          letter-spacing: -0.03em;
        }
        .how-step-content { padding-right: 48px; }
        .how-step-title {
          font-family: 'Noto Serif SC', serif;
          font-size: 20px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 10px;
        }
        .how-step-desc {
          font-size: 15px;
          line-height: 1.7;
          color: var(--text-2);
          margin-bottom: 10px;
        }
        .how-step-detail {
          font-size: 13px;
          color: var(--text-3);
        }
        .how-connector {
          position: absolute;
          right: -16px;
          top: 24px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .how-connector-line {
          width: 32px;
          height: 1px;
          background: var(--border);
        }

        /* ── Pricing ── */
        .pricing { padding: 100px 0; background: var(--cream); }
        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          align-items: start;
        }
        @media (max-width: 800px) {
          .pricing-grid { grid-template-columns: 1fr; max-width: 420px; margin: 0 auto; }
        }
        .pricing-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 36px 32px;
          position: relative;
        }
        .pricing-featured {
          background: var(--text);
          border-color: var(--text);
          box-shadow: var(--shadow-lg);
          transform: scale(1.03);
        }
        .pricing-badge {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          padding: 6px 18px;
          background: var(--green);
          color: #fff;
          font-size: 12px;
          font-weight: 600;
          border-radius: 100px;
          white-space: nowrap;
        }
        .pricing-name {
          font-size: 17px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 12px;
        }
        .pricing-featured .pricing-name { color: #fff; }
        .pricing-price {
          display: flex;
          align-items: baseline;
          gap: 4px;
          margin-bottom: 10px;
        }
        .pricing-amount {
          font-family: 'Noto Serif SC', serif;
          font-size: 44px;
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.02em;
        }
        .pricing-featured .pricing-amount { color: #fff; }
        .pricing-period { font-size: 14px; color: var(--text-3); }
        .pricing-featured .pricing-period { color: rgba(255,255,255,0.4); }
        .pricing-desc { font-size: 14px; color: var(--text-2); margin-bottom: 28px; }
        .pricing-featured .pricing-desc { color: rgba(255,255,255,0.5); }
        .pricing-items {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 32px;
        }
        .pricing-items li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: var(--text-2);
        }
        .pricing-featured .pricing-items li { color: rgba(255,255,255,0.7); }
        .pricing-cta {
          display: block;
          width: 100%;
          padding: 14px;
          border-radius: 100px;
          text-align: center;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
        }
        .pricing-cta-normal {
          background: transparent;
          border: 1.5px solid var(--border);
          color: var(--text);
        }
        .pricing-cta-normal:hover { border-color: var(--text); }
        .pricing-cta-featured {
          background: var(--green);
          color: #fff;
          border: none;
        }
        .pricing-cta-featured:hover {
          background: var(--green-light);
          box-shadow: 0 4px 16px rgba(74,124,89,0.4);
        }

        /* ── Testimonials ── */
        .testimonials { padding: 100px 0; background: var(--cream-dark); }
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 800px) {
          .testimonials-grid { grid-template-columns: 1fr; }
        }
        .testimonial-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 32px;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .testimonial-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow);
        }
        .testimonial-stars { display: flex; gap: 3px; margin-bottom: 16px; }
        .testimonial-text {
          font-size: 14px;
          line-height: 1.8;
          color: var(--text-2);
          margin-bottom: 24px;
        }
        .testimonial-author { display: flex; align-items: center; gap: 12px; }
        .testimonial-avatar {
          width: 44px; height: 44px;
          border-radius: 12px;
          background: var(--cream-dark);
          display: flex; align-items: center; justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
        }
        .testimonial-name {
          font-size: 14px;
          font-weight: 600;
          color: var(--text);
          margin-bottom: 2px;
        }
        .testimonial-tag { font-size: 12px; color: var(--text-3); }

        /* ── CTA ── */
        .cta-section {
          position: relative;
          overflow: hidden;
          padding: 120px 0;
          background: linear-gradient(135deg, var(--green-pale) 0%, var(--cream) 100%);
        }
        .cta-inner { max-width: 700px; margin: 0 auto; text-align: center; padding: 0 48px; }
        .cta-visual { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
        .cta-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
        }
        .cta-orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(74,124,89,0.15), transparent 70%);
          top: -150px; left: 50%;
          transform: translateX(-50%);
        }
        .cta-orb-2 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(123,94,167,0.1), transparent 70%);
          bottom: -100px; right: 10%;
        }
        .cta-content { position: relative; z-index: 2; }
        .cta-title {
          font-family: 'Noto Serif SC', serif;
          font-size: clamp(2.4rem, 5vw, 3.6rem);
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.03em;
          margin-bottom: 20px;
        }
        .cta-desc {
          font-size: 17px;
          line-height: 1.75;
          color: var(--text-2);
          margin-bottom: 40px;
        }
        .cta-actions { margin-bottom: 24px; }
        .cta-trust {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 13px;
          color: var(--text-3);
        }
        .cta-trust span { display: flex; align-items: center; gap: 4px; }

        /* ── Footer ── */
        .footer {
          background: var(--text);
          padding: 48px 0;
        }
        .footer-inner {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 48px;
        }
        .footer-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 32px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          margin-bottom: 24px;
        }
        .footer-brand { display: flex; align-items: center; gap: 10px; }
        .footer-logo {
          width: 32px; height: 32px;
          background: var(--green);
          border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
        }
        .footer-name {
          font-family: 'Noto Serif SC', serif;
          font-size: 17px;
          font-weight: 700;
          color: #fff;
        }
        .footer-nav { display: flex; gap: 8px; }
        .footer-link {
          padding: 6px 14px;
          font-size: 13px;
          color: rgba(255,255,255,0.45);
          cursor: pointer;
          transition: color 0.15s;
          text-decoration: none;
        }
        .footer-link:hover { color: rgba(255,255,255,0.8); }
        .footer-bottom {
          font-size: 12px;
          color: rgba(255,255,255,0.25);
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .hero-inner {
            grid-template-columns: 1fr;
            gap: 48px;
            padding: 0 24px;
          }
          .hero-visual { max-width: 480px; margin: 0 auto; }
          .nav-links { display: none; }
          .stats-inner { grid-template-columns: repeat(2, 1fr); gap: 32px; }
          .how-steps { grid-template-columns: 1fr; gap: 40px; }
          .how-connector { display: none; }
        }
        @media (max-width: 600px) {
          .nav-inner { padding: 0 20px; }
          .hero { padding: 60px 0 80px; }
          .hero-inner { padding: 0 20px; }
          .hero-float-1 { left: 0; }
          .hero-float-2 { right: 0; }
          .stats-inner { padding: 0 20px; grid-template-columns: repeat(2, 1fr); }
          .stat-block { padding: 0 20px; }
          .features-grid { grid-template-columns: 1fr; }
          .pricing-grid { grid-template-columns: 1fr; }
          .pricing-featured { transform: none; }
          .testimonials-grid { grid-template-columns: 1fr; }
          .footer-top { flex-direction: column; gap: 20px; text-align: center; }
          .footer-nav { flex-wrap: wrap; justify-content: center; }
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--cream-dark); }
        ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
      `}</style>
    </div>
  )
}
