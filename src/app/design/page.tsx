'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Ruler, Loader2, Lock, ShoppingCart, ExternalLink, Check, Sparkles, ArrowLeft, Leaf } from 'lucide-react'

const spaceTypes = ['衣柜', '书桌', '厨房', '卫生间', '玄关', '客厅']
const styles = ['日式极简', 'Ins 风', '北欧', '工业风', '不在意']
const budgets = ['100 元以内', '100–500 元', '500 元以上']
const requirements = ['租房不能打孔', '有宠物', '有小孩', '经常搬家']

interface DesignResult {
  title: string; summary: string
  zones: Array<{ name: string; description: string; items: string[]; frequency: string }>
  tools: Array<{ name: string; purpose: string; size: string; price_range: string; keyword: string; priority: string }>
  habits: Array<{ title: string; action: string; frequency: string }>
  notes: string[]
  xianyu_keywords: string[]
}

const priorityConfig: Record<string, { bg: string; color: string }> = {
  '必买': { bg: 'rgba(74,124,89,0.12)', color: '#4A7C59' },
  '推荐': { bg: 'rgba(201,133,106,0.12)', color: '#C9856A' },
  '可选': { bg: '#F7F5F0', color: '#A8A59E' },
}

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

export default function DesignPage() {
  const [spaceType, setSpaceType] = useState('')
  const [dimensions, setDimensions] = useState('')
  const [style, setStyle] = useState('')
  const [budget, setBudget] = useState('')
  const [selectedReqs, setSelectedReqs] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<DesignResult | null>(null)
  const [isPaid, setIsPaid] = useState(false)

  const toggleReq = (req: string) => {
    setSelectedReqs(prev => prev.includes(req) ? prev.filter(r => r !== req) : [...prev, req])
  }

  const isFormValid = spaceType && style && budget

  const handleSubmit = async () => {
    if (!isFormValid) return
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch('/api/design', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spaceType, dimensions, style, budget, requirements: selectedReqs }),
      })
      const json = await res.json()
      if (json.success) {
        setResult(json.data)
        setTimeout(() => document.getElementById('design-result')?.scrollIntoView({ behavior: 'smooth' }), 100)
      }
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  return (
    <div className="page">
      <PageNav />

      <div className="design-layout">
        {/* Left: Form */}
        <div className="design-left">
          <div className="design-left-header">
            <div className="page-eyebrow" style={{ color: '#8B7355', background: 'rgba(139,115,85,0.1)' }}>
              <Ruler size={13} />
              个性化收纳设计
            </div>
            <h1 className="page-title">告诉我你的空间</h1>
            <p className="page-desc">AI 生成专属你家的收纳方案，不是通用教程</p>
          </div>

          <div className="form-card">
            {/* Space Type */}
            <div className="form-group">
              <label className="form-label">空间类型 <span className="required">*</span></label>
              <div className="chip-grid">
                {spaceTypes.map(t => (
                  <button key={t} onClick={() => setSpaceType(t)}
                    className={`chip-btn ${spaceType === t ? 'chip-active' : ''}`}
                    style={spaceType === t ? { background: '#1A1917', color: '#F7F5F0', borderColor: '#1A1917' } : {}}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Dimensions */}
            <div className="form-group">
              <label className="form-label">空间尺寸 <span className="form-label-opt">(选填)</span></label>
              <input className="form-input" placeholder="如：120cm × 60cm" value={dimensions}
                onChange={e => setDimensions(e.target.value)} />
            </div>

            {/* Style */}
            <div className="form-group">
              <label className="form-label">偏好风格 <span className="required">*</span></label>
              <div className="chip-grid">
                {styles.map(s => (
                  <button key={s} onClick={() => setStyle(s)}
                    className={`chip-btn ${style === s ? 'chip-active' : ''}`}
                    style={style === s ? { background: '#1A1917', color: '#F7F5F0', borderColor: '#1A1917' } : {}}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div className="form-group">
              <label className="form-label">预算区间 <span className="required">*</span></label>
              <div className="chip-grid chip-grid-3">
                {budgets.map(b => (
                  <button key={b} onClick={() => setBudget(b)}
                    className={`chip-btn ${budget === b ? 'chip-active' : ''}`}
                    style={budget === b ? { background: '#1A1917', color: '#F7F5F0', borderColor: '#1A1917' } : {}}>
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="form-group">
              <label className="form-label">特殊需求 <span className="form-label-opt">(可多选)</span></label>
              <div className="req-chips">
                {requirements.map(r => (
                  <button key={r} onClick={() => toggleReq(r)}
                    className="req-chip"
                    style={selectedReqs.includes(r)
                      ? { background: 'rgba(74,124,89,0.12)', color: '#4A7C59', borderColor: '#4A7C59' }
                      : {}}>
                    {selectedReqs.includes(r) && <Check size={12} />}
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button onClick={handleSubmit} disabled={!isFormValid || loading}
              className="btn-submit"
              style={{ opacity: !isFormValid || loading ? 0.5 : 1 }}>
              {loading ? (
                <><Loader2 size={16} className="spin" />AI 生成中...</>
              ) : (
                <><Sparkles size={16} />生成收纳方案</>
              )}
            </button>
            {!isFormValid && <p className="form-hint">请选择空间类型、风格和预算</p>}
          </div>
        </div>

        {/* Right: Result */}
        <div className="design-right">
          {result && (
            <div id="design-result" className="result-panel">
              {/* Summary */}
              <div className="summary-card">
                <div className="summary-tag">AI 方案</div>
                <h2 className="summary-title">{result.title}</h2>
                <p className="summary-desc">{result.summary}</p>
              </div>

              {/* Zones */}
              <div className="result-section">
                <h3 className="result-section-title">📐 分区收纳逻辑</h3>
                <div className="zones-grid">
                  {result.zones.slice(0, isPaid ? result.zones.length : 1).map((zone, i) => (
                    <div key={i} className="zone-card">
                      <div className="zone-header">
                        <span className="zone-name">{zone.name}</span>
                        <span className="zone-freq">{zone.frequency}</span>
                      </div>
                      <p className="zone-desc">{zone.description}</p>
                      <div className="zone-items">
                        {zone.items.map((item, j) => (
                          <span key={j} className="zone-item-tag">{item}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                  {!isPaid && result.zones.length > 1 && (
                    <div className="zone-card zone-card-locked">
                      <div className="zone-header">
                        <Lock size={13} style={{ color: '#A8A59E' }} />
                        <span className="zone-name">中频区 / 低频区</span>
                      </div>
                      <p className="zone-desc" style={{ filter: 'blur(3px)', userSelect: 'none' }}>完整分区方案解锁后可见</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Paywall */}
              {!isPaid && (
                <div className="paywall-card">
                  <div className="paywall-header">
                    <Lock size={15} />
                    <span>解锁完整方案</span>
                  </div>
                  <div className="paywall-items">
                    {['完整分区收纳逻辑（3 个区域）', '推荐工具清单（含尺寸和价格）', '维持整洁的核心习惯', '注意事项与进阶技巧'].map(item => (
                      <div key={item} className="paywall-item">
                        <Check size={13} style={{ color: '#4A7C59' }} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setIsPaid(true)} className="unlock-btn">
                    <Sparkles size={14} />
                    解锁完整方案 ¥9.9
                  </button>
                </div>
              )}

              {/* Tools */}
              {isPaid && (
                <>
                  <div className="result-section">
                    <h3 className="result-section-title">🛍️ 推荐工具清单</h3>
                    <div className="tools-list">
                      {result.tools.map((tool, i) => {
                        const pc = priorityConfig[tool.priority] || priorityConfig['可选']
                        return (
                          <div key={i} className="tool-card">
                            <div className="tool-main">
                              <div className="tool-name-row">
                                <span className="tool-name">{tool.name}</span>
                                <span className="tool-priority" style={{ background: pc.bg, color: pc.color }}>{tool.priority}</span>
                              </div>
                              <div className="tool-meta">{tool.size} · {tool.price_range}</div>
                              <div className="tool-purpose">{tool.purpose}</div>
                            </div>
                            <a href={`https://s.taobao.com/search?q=${encodeURIComponent(tool.keyword)}`}
                              target="_blank" rel="noopener noreferrer" className="tool-search-btn">
                              <ShoppingCart size={13} />
                              找同款
                            </a>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Habits */}
                  <div className="result-section">
                    <h3 className="result-section-title">🌱 维持整洁的习惯</h3>
                    <div className="habits-list">
                      {result.habits.map((h, i) => (
                        <div key={i} className="habit-card">
                          <div className="habit-header">
                            <span className="habit-title">{h.title}</span>
                            <span className="habit-freq">{h.frequency}</span>
                          </div>
                          <p className="habit-desc">{h.action}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div className="result-section">
                    <h3 className="result-section-title">📝 注意事项</h3>
                    <div className="notes-card">
                      {result.notes.map((note, i) => (
                        <div key={i} className="note-item">
                          <span style={{ color: '#C9856A', fontWeight: 700, fontSize: 13 }}>!</span>
                          <p>{note}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Xianyu */}
                  {result.xianyu_keywords?.length > 0 && (
                    <div className="xianyu-card">
                      <div className="xianyu-title">🐟 在闲鱼处理旧物</div>
                      <p className="xianyu-desc">整理过程中产生的旧物，可在闲鱼快速处理</p>
                      <div className="xianyu-tags">
                        {result.xianyu_keywords.map((kw, i) => (
                          <a key={i} href={`https://www.goofish.com/search?q=${encodeURIComponent(kw)}`}
                            target="_blank" rel="noopener noreferrer" className="xianyu-tag">
                            <ExternalLink size={10} />
                            {kw}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {!result && (
            <div className="result-panel">
              <div className="tips-card">
                <div className="tips-icon"><Ruler size={22} /></div>
                <h3 className="tips-title">什么是「个性化收纳设计」？</h3>
                <div className="tips-list">
                  {[
                    { title: '通用教程的局限', desc: '网上大多数收纳教程都是「照着做」，但你家和我家的空间完全不同。' },
                    { title: 'AI 生成专属方案', desc: '根据你的空间类型、尺寸、风格偏好和预算，生成真正适合你的布局。' },
                    { title: '含购买链接的工具清单', desc: '推荐的工具含具体尺寸和淘宝关键词，不用自己再搜索比价。' },
                    { title: '租房也能用', desc: '可以勾选「租房不能打孔」，AI 只推荐无需打孔的解决方案。' },
                  ].map((t, i) => (
                    <div key={i} className="tips-item">
                      <div className="tips-item-title">{t.title}</div>
                      <p className="tips-item-desc">{t.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .design-layout {
          max-width: 1120px;
          margin: 0 auto;
          padding: 48px 48px 80px;
          display: grid;
          grid-template-columns: 440px 1fr;
          gap: 48px;
          align-items: start;
        }
        .design-left-header { margin-bottom: 28px; }
        .form-card {
          background: #FFFEF9;
          border: 1px solid #D9D6CE;
          border-radius: 20px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .form-group { display: flex; flex-direction: column; gap: 10px; }
        .form-label { font-size: 14px; font-weight: 600; color: #1A1917; }
        .required { color: #E85D5D; }
        .form-label-opt { font-size: 12px; font-weight: 400; color: #A8A59E; }
        .chip-grid { display: flex; flex-wrap: wrap; gap: 8px; }
        .chip-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
        .chip-btn {
          padding: 9px 16px;
          border-radius: 10px;
          font-size: 13px;
          font-weight: 500;
          background: #FFFEF9;
          color: #6B6860;
          border: 1.5px solid #D9D6CE;
          cursor: pointer;
          transition: all 0.15s;
        }
        .chip-btn:hover { border-color: #1A1917; color: #1A1917; }
        .req-chips { display: flex; flex-wrap: wrap; gap: 8px; }
        .req-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 8px 14px;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 500;
          background: #FFFEF9;
          color: #6B6860;
          border: 1.5px solid #D9D6CE;
          cursor: pointer;
          transition: all 0.15s;
        }
        .req-chip:hover { border-color: #4A7C59; color: #4A7C59; }
        .form-input {
          width: 100%;
          padding: 11px 14px;
          border: 1.5px solid #D9D6CE;
          border-radius: 10px;
          background: #FFFEF9;
          color: #1A1917;
          font-size: 14px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s;
        }
        .form-input:focus { border-color: #4A7C59; }
        .form-input::placeholder { color: #A8A59E; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
        .btn-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px;
          background: #4A7C59;
          color: #fff;
          border: none;
          border-radius: 100px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
        }
        .btn-submit:hover { background: #6BAF80; transform: translateY(-1px); }
        .btn-submit:disabled { cursor: not-allowed; transform: none; }
        .form-hint { text-align: center; font-size: 12px; color: #A8A59E; }
        /* Right */
        .design-right { position: sticky; top: 88px; }
        .result-panel { display: flex; flex-direction: column; gap: 20px; }
        .summary-card {
          background: linear-gradient(135deg, #F2F0EB, #EFF7F2);
          border: 1px solid #D9D6CE;
          border-radius: 20px;
          padding: 28px;
        }
        .summary-tag { font-size: 12px; color: #A8A59E; margin-bottom: 6px; }
        .summary-title { font-family: 'Noto Serif SC', serif; font-size: 22px; font-weight: 700; color: #1A1917; margin-bottom: 8px; letter-spacing: -0.01em; }
        .summary-desc { font-size: 14px; color: #6B6860; line-height: 1.6; }
        .result-section { display: flex; flex-direction: column; gap: 12px; }
        .result-section-title { font-size: 15px; font-weight: 700; color: #1A1917; }
        .zones-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .zone-card {
          background: #FFFEF9;
          border: 1px solid #D9D6CE;
          border-radius: 14px;
          padding: 16px;
        }
        .zone-card-locked { background: #F7F5F0; opacity: 0.6; }
        .zone-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
        .zone-name { font-size: 13px; font-weight: 700; color: #1A1917; }
        .zone-freq { font-size: 11px; color: #A8A59E; padding: 2px 8px; background: #EDEBE4; border-radius: 100px; }
        .zone-desc { font-size: 12px; color: #6B6860; line-height: 1.5; margin-bottom: 8px; }
        .zone-items { display: flex; flex-wrap: wrap; gap: 4px; }
        .zone-item-tag { font-size: 11px; padding: 2px 8px; background: #EDEBE4; border-radius: 6px; color: #6B6860; }
        .paywall-card {
          background: #F7F5F0;
          border: 1px solid #D9D6CE;
          border-radius: 16px;
          padding: 24px;
        }
        .paywall-header { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 700; color: #1A1917; margin-bottom: 14px; }
        .paywall-items { display: flex; flex-direction: column; gap: 10px; margin-bottom: 18px; }
        .paywall-item { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #6B6860; }
        .unlock-btn {
          width: 100%;
          display: flex; align-items: center; justify-content: center; gap: 6px;
          padding: 13px;
          background: #4A7C59; color: #fff;
          border: none; border-radius: 100px;
          font-size: 14px; font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .unlock-btn:hover { background: #6BAF80; }
        .tools-list { display: flex; flex-direction: column; gap: 10px; }
        .tool-card {
          background: #FFFEF9;
          border: 1px solid #D9D6CE;
          border-radius: 14px;
          padding: 16px;
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }
        .tool-main { flex: 1; }
        .tool-name-row { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
        .tool-name { font-size: 14px; font-weight: 600; color: #1A1917; }
        .tool-priority { font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 100px; }
        .tool-meta { font-size: 12px; color: #A8A59E; margin-bottom: 4px; }
        .tool-purpose { font-size: 13px; color: #6B6860; }
        .tool-search-btn {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 7px 14px;
          background: rgba(74,124,89,0.1);
          color: #4A7C59;
          border-radius: 10px;
          font-size: 12px; font-weight: 600;
          text-decoration: none;
          white-space: nowrap;
          flex-shrink: 0;
          transition: background 0.2s;
        }
        .tool-search-btn:hover { background: rgba(74,124,89,0.2); }
        .habits-list { display: flex; flex-direction: column; gap: 10px; }
        .habit-card {
          background: #EFF7F2;
          border-radius: 12px;
          padding: 14px 16px;
        }
        .habit-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
        .habit-title { font-size: 13px; font-weight: 600; color: #1A1917; }
        .habit-freq { font-size: 11px; color: #A8A59E; }
        .habit-desc { font-size: 13px; color: #6B6860; line-height: 1.5; }
        .notes-card {
          background: #FFFEF9;
          border: 1px solid #D9D6CE;
          border-radius: 14px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .note-item { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; color: #6B6860; line-height: 1.5; }
        .xianyu-card {
          background: #FBF3F0;
          border-radius: 14px;
          padding: 20px;
        }
        .xianyu-title { font-size: 14px; font-weight: 700; color: #C9856A; margin-bottom: 4px; }
        .xianyu-desc { font-size: 12px; color: #A8A59E; margin-bottom: 12px; }
        .xianyu-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .xianyu-tag {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 5px 12px;
          background: rgba(201,133,106,0.15);
          color: #C9856A;
          border-radius: 100px;
          font-size: 12px;
          text-decoration: none;
          transition: background 0.2s;
        }
        .xianyu-tag:hover { background: rgba(201,133,106,0.25); }
        .tips-card {
          background: #FFFEF9;
          border: 1px solid #D9D6CE;
          border-radius: 20px;
          padding: 32px;
        }
        .tips-icon {
          width: 48px; height: 48px;
          background: rgba(139,115,85,0.1);
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          color: #8B7355;
          margin-bottom: 16px;
        }
        .tips-title { font-family: 'Noto Serif SC', serif; font-size: 20px; font-weight: 700; color: #1A1917; margin-bottom: 20px; }
        .tips-list { display: flex; flex-direction: column; gap: 16px; }
        .tips-item { padding-left: 16px; border-left: 2px solid #EDEBE4; }
        .tips-item-title { font-size: 14px; font-weight: 600; color: #1A1917; margin-bottom: 4px; }
        .tips-item-desc { font-size: 13px; color: #6B6860; line-height: 1.6; }
        /* Nav */
        .page-nav { position: sticky; top: 0; z-index: 100; background: rgba(247,245,240,0.9); backdrop-filter: blur(16px); border-bottom: 1px solid #D9D6CE; }
        .page-nav-inner { max-width: 1120px; margin: 0 auto; padding: 0 48px; height: 64px; display: flex; align-items: center; justify-content: space-between; }
        .page-logo-link { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .page-logo-icon { width: 30px; height: 30px; background: #4A7C59; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
        .page-logo-text { font-family: 'Noto Serif SC', serif; font-size: 16px; font-weight: 700; color: #1A1917; }
        .page-nav-actions { display: flex; gap: 12px; }
        .page-nav-link { display: flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 500; color: #6B6860; text-decoration: none; transition: background 0.15s; }
        .page-nav-link:hover { background: #EDEBE4; color: #1A1917; }
        .page-eyebrow { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 100px; font-size: 12px; font-weight: 500; margin-bottom: 12px; }
        .page-title { font-family: 'Noto Serif SC', serif; font-size: 28px; font-weight: 700; color: #1A1917; letter-spacing: -0.02em; margin-bottom: 8px; }
        .page-desc { font-size: 15px; color: #6B6860; }
        @media (max-width: 900px) {
          .design-layout { grid-template-columns: 1fr; padding: 32px 24px; }
          .design-right { position: static; }
          .zones-grid { grid-template-columns: 1fr; }
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #EDEBE4; }
        ::-webkit-scrollbar-thumb { background: #D9D6CE; border-radius: 3px; }
      `}</style>
    </div>
  )
}
