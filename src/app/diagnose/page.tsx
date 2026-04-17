'use client'

import { useState, useCallback, useRef } from 'react'
import Link from 'next/link'
import {
  Camera, Upload, X, Loader2, Zap, CheckCircle, ChevronRight, Share2,
  Lock, Home, ToggleLeft, ToggleRight, ShoppingCart, ArrowLeft, Leaf
} from 'lucide-react'

interface DiagnosisResult {
  space_type: string
  overall_score: number
  problems: Array<{ area: string; issue: string; severity: 'high' | 'medium' | 'low' }>
  step1_throw: { title: string; items: string[]; tips: string }
  step2_keep: { title: string; items: string[]; tips: string; _truncated?: boolean }
  step3_organize?: { title: string; items: string[]; tools: Array<{ name: string; size: string; keyword: string }>; tips: string }
  rental_tips?: string
  quick_wins: string[]
  _is_preview?: boolean
}

const severityConfig = {
  high: { label: '重点处理', color: '#E85D5D', bg: 'rgba(232,93,93,0.08)' },
  medium: { label: '建议改善', color: '#C9856A', bg: 'rgba(201,133,106,0.08)' },
  low: { label: '小优化', color: '#A8A59E', bg: '#F7F5F0' },
}

const loadingSteps = ['上传图片中...', 'AI 识别空间物品...', '分析杂乱区域...', '生成整理方案...']

function PageNav() {
  return (
    <header className="page-nav">
      <div className="page-nav-inner">
        <div className="page-nav-logo">
          <Link href="/" className="page-logo-link">
            <div className="page-logo-icon">
              <Leaf size={13} color="white" />
            </div>
            <span className="page-logo-text">MinimaLife</span>
          </Link>
        </div>
        <div className="page-nav-actions">
          <Link href="/" className="page-nav-link">
            <ArrowLeft size={14} />
            返回首页
          </Link>
        </div>
      </div>
    </header>
  )
}

export default function DiagnosePage() {
  const [images, setImages] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [rentalMode, setRentalMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingStep, setLoadingStep] = useState(0)
  const [result, setResult] = useState<DiagnosisResult | null>(null)
  const [isPaid, setIsPaid] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (!files) return
    const newFiles = Array.from(files).slice(0, 4 - images.length)
    const newPreviews = newFiles.map(f => URL.createObjectURL(f))
    setImages(prev => [...prev, ...newFiles].slice(0, 4))
    setPreviews(prev => [...prev, ...newPreviews].slice(0, 4))
  }, [images.length])

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
    setPreviews(prev => {
      URL.revokeObjectURL(prev[index])
      return prev.filter((_, i) => i !== index)
    })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    handleFileSelect(e.dataTransfer.files)
  }

  const handleDiagnose = async () => {
    if (images.length === 0) return
    setLoading(true)
    setResult(null)
    setLoadingStep(0)
    const interval = setInterval(() => {
      setLoadingStep(prev => (prev < loadingSteps.length - 1 ? prev + 1 : prev))
    }, 800)
    try {
      const formData = new FormData()
      images.forEach(img => formData.append('images', img))
      formData.append('rentalMode', rentalMode.toString())
      formData.append('isFree', 'true')
      const res = await fetch('/api/diagnose', { method: 'POST', body: formData })
      const json = await res.json()
      if (json.success) {
        setResult(json.data)
        setTimeout(() => document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' }), 100)
      }
    } catch (e) {
      console.error(e)
    } finally {
      clearInterval(interval)
      setLoading(false)
    }
  }

  const handleUnlock = () => {
    setIsPaid(true)
    setResult(prev => prev ? {
      ...prev,
      _is_preview: false,
      step3_organize: {
        title: '第三步：收纳',
        items: [
          '充电线用理线夹固定在桌边，按设备分类',
          '书籍竖立放入书立，按使用频率从左到右排列',
          '护肤品放入小托盘，统一归位到固定位置',
        ],
        tools: [
          { name: '竹木书立', size: '15×10cm', keyword: '桌面书立简约' },
          { name: '理线夹', size: '3.5cm夹口', keyword: '理线夹桌面' },
          { name: '亚克力小托盘', size: '20×15cm', keyword: '桌面收纳盘透明' },
        ],
        tips: '每件物品都要有「固定位置」，用完立刻归位，这是维持整洁的核心',
      },
      rental_tips: '所有工具无需打孔：书立直接摆放，理线夹夹在桌边，托盘直接放置。预计总花费 ¥50 以内。',
      step2_keep: {
        ...prev.step2_keep,
        items: ['睡前常用护肤品（留 3 件以内）', '当前在读的 1 本书', '常用充电器（1 根手机线）'],
        _truncated: false,
      },
    } : null)
  }

  const scoreColor = (score: number) => {
    if (score >= 7) return '#4A7C59'
    if (score >= 4) return '#C9856A'
    return '#E85D5D'
  }

  return (
    <div className="page">
      <PageNav />

      <div className="diagnose-layout">
        {/* Left Column: Upload */}
        <div className="diagnose-left">
          <div className="diagnose-left-header">
            <div className="page-eyebrow">
              <Camera size={13} />
              AI 空间诊断
            </div>
            <h1 className="page-title">上传房间照片</h1>
            <p className="page-desc">支持 1–4 张，越真实越好，不用提前整理</p>
          </div>

          {/* Upload Area */}
          <div
            className="upload-zone"
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
          >
            {previews.length === 0 ? (
              <div className="upload-zone-empty">
                <div className="upload-icon">
                  <Camera size={28} />
                </div>
                <p className="upload-title">点击上传或拖拽照片</p>
                <p className="upload-sub">支持 JPEG / PNG / WebP，最大 10MB</p>
                <p className="upload-tip">衣柜 / 书桌 / 厨房 / 玄关均可</p>
              </div>
            ) : (
              <div className="upload-preview-grid">
                {previews.map((src, i) => (
                  <div key={i} className="upload-preview-item">
                    <img src={src} alt="" />
                    <button className="upload-preview-remove" onClick={e => { e.stopPropagation(); removeImage(i) }}>
                      <X size={11} />
                    </button>
                    <div className="upload-preview-label">照片 {i + 1}</div>
                  </div>
                ))}
                {previews.length < 4 && (
                  <div className="upload-preview-add" onClick={e => { e.stopPropagation(); fileInputRef.current?.click() }}>
                    <Upload size={20} />
                    <span>继续添加</span>
                  </div>
                )}
              </div>
            )}
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden"
            onChange={e => handleFileSelect(e.target.files)} />

          {/* Options */}
          <div className="diagnose-options">
            <div className="option-row">
              <div className="option-info">
                <div className="option-icon" style={{ background: rentalMode ? 'rgba(74,124,89,0.12)' : '#F7F5F0' }}>
                  <Home size={15} style={{ color: rentalMode ? '#4A7C59' : '#A8A59E' }} />
                </div>
                <div>
                  <div className="option-label">租房友好模式</div>
                  <div className="option-sub">只推荐无打孔、¥100 以内方案</div>
                </div>
              </div>
              <button onClick={() => setRentalMode(!rentalMode)} className="toggle-btn">
                {rentalMode
                  ? <ToggleRight size={32} style={{ color: '#4A7C59' }} />
                  : <ToggleLeft size={32} style={{ color: '#A8A59E' }} />}
              </button>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleDiagnose}
            disabled={images.length === 0 || loading}
            className="btn-primary-full"
            style={{ opacity: images.length === 0 || loading ? 0.55 : 1 }}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="spin" />
                {loadingSteps[loadingStep]}
              </>
            ) : (
              <>
                <Zap size={16} />
                开始 AI 诊断
              </>
            )}
          </button>
          <p className="text-center-hint">免费查看诊断预览 · 解锁完整方案仅需 ¥9.9</p>
        </div>

        {/* Right Column: Result / Tips */}
        <div className="diagnose-right">
          {loading && (
            <div className="result-panel">
              <div className="loading-card">
                <div className="loading-circle-wrap">
                  <svg className="loading-circle" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="#EDEBE4" strokeWidth="4" />
                    <circle cx="32" cy="32" r="28" fill="none" stroke="#4A7C59" strokeWidth="4"
                      strokeDasharray="175.9"
                      strokeDashoffset={175.9 - (175.9 * (loadingStep + 1) / loadingSteps.length)}
                      style={{ transition: 'stroke-dashoffset 0.8s ease', strokeLinecap: 'round' }} />
                  </svg>
                  <span className="loading-pct">{Math.round(((loadingStep + 1) / loadingSteps.length) * 100)}%</span>
                </div>
                <p className="loading-label">{loadingSteps[loadingStep]}</p>
                <p className="loading-sub">正在分析您的空间...</p>
              </div>
            </div>
          )}

          {!loading && !result && (
            <div className="result-panel">
              <div className="tips-card">
                <div className="tips-icon">
                  <Camera size={22} />
                </div>
                <h3 className="tips-title">如何拍出有效的照片？</h3>
                <div className="tips-list">
                  {[
                    { num: '1', text: '覆盖问题区域：衣柜内部、桌面、床头、厨房台面各一张' },
                    { num: '2', text: '光线充足：白天自然光最佳，不要开闪光灯' },
                    { num: '3', text: '保持真实：不需要提前整理，AI 能识别真实杂乱情况' },
                    { num: '4', text: '多角度：如有特别杂乱的地方，可以多拍一张特写' },
                  ].map(t => (
                    <div key={t.num} className="tips-item">
                      <span className="tips-num">{t.num}</span>
                      <span className="tips-text">{t.text}</span>
                    </div>
                  ))}
                </div>
                <div className="tips-footer">
                  <span>目前使用 Gemini AI 分析</span>
                  <span className="tips-badge">免费额度每日刷新</span>
                </div>
              </div>
            </div>
          )}

          {result && (
            <div id="result-section" className="result-panel">
              {/* Score */}
              <div className="score-card">
                <div className="score-left">
                  <div className="score-tag">诊断空间</div>
                  <div className="score-space">{result.space_type}</div>
                  {result._is_preview && (
                    <div className="score-preview-badge">
                      <CheckCircle size={12} />
                      免费预览 · 约 60% 内容
                    </div>
                  )}
                </div>
                <div className="score-right">
                  <div className="score-num" style={{ color: scoreColor(result.overall_score) }}>
                    {result.overall_score}<span>/10</span>
                  </div>
                  <div className="score-label">整洁度</div>
                </div>
              </div>

              {/* Quick Wins */}
              <div className="quick-wins-card">
                <div className="quick-wins-header">⚡ 现在就能做的 2 件事</div>
                {result.quick_wins.map((w, i) => (
                  <div key={i} className="quick-win-item">
                    <span className="quick-win-num">{i + 1}</span>
                    <span>{w}</span>
                  </div>
                ))}
              </div>

              {/* Problems */}
              <div className="section-block">
                <h3 className="section-block-title">
                  🔍 发现的问题点（{result.problems.length} 处）
                </h3>
                <div className="problems-list">
                  {result.problems.map((p, i) => {
                    const cfg = severityConfig[p.severity]
                    return (
                      <div key={i} className="problem-card" style={{ background: cfg.bg }}>
                        <div className="problem-header">
                          <span className="problem-spot">{p.area}</span>
                          <span className="problem-level" style={{ color: cfg.color }}>{cfg.label}</span>
                        </div>
                        <p className="problem-text">{p.issue}</p>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Steps */}
              <div className="steps-grid">
                <div className="step-card step-card-1">
                  <div className="step-header">
                    <div className="step-badge" style={{ background: '#C9856A' }}>🗑️ 步骤 1</div>
                  </div>
                  <h4 className="step-title">{result.step1_throw.title}</h4>
                  <div className="step-items">
                    {result.step1_throw.items.map((item, i) => (
                      <div key={i} className="step-item">
                        <CheckCircle size={13} style={{ color: '#C9856A', flexShrink: 0 }} />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="step-tip">💡 {result.step1_throw.tips}</p>
                </div>

                <div className="step-card step-card-2">
                  <div className="step-header">
                    <div className="step-badge" style={{ background: '#4A7C59' }}>✅ 步骤 2</div>
                  </div>
                  <h4 className="step-title">{result.step2_keep.title}</h4>
                  <div className="step-items">
                    {result.step2_keep.items.map((item, i) => (
                      <div key={i} className="step-item">
                        <CheckCircle size={13} style={{ color: '#4A7C59', flexShrink: 0 }} />
                        <span>{item}</span>
                      </div>
                    ))}
                    {result.step2_keep._truncated && (
                      <div className="step-item step-item-blur">
                        <CheckCircle size={13} />
                        <span>更多建议解锁后可见...</span>
                      </div>
                    )}
                  </div>
                  <p className="step-tip">💡 {result.step2_keep.tips}</p>
                </div>

                {result.step3_organize ? (
                  <div className="step-card step-card-3">
                    <div className="step-header">
                      <div className="step-badge" style={{ background: '#7B5EA7' }}>📦 步骤 3</div>
                    </div>
                    <h4 className="step-title">{result.step3_organize.title}</h4>
                    <div className="step-items">
                      {result.step3_organize.items.map((item, i) => (
                        <div key={i} className="step-item">
                          <CheckCircle size={13} style={{ color: '#7B5EA7', flexShrink: 0 }} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                    {result.step3_organize.tools?.length > 0 && (
                      <div className="tools-box">
                        <div className="tools-header">推荐收纳工具</div>
                        {result.step3_organize.tools.map((tool, i) => (
                          <div key={i} className="tool-row">
                            <div className="tool-info">
                              <span className="tool-name">{tool.name}</span>
                              <span className="tool-size">{tool.size}</span>
                            </div>
                            <a href={`https://s.taobao.com/search?q=${encodeURIComponent(tool.keyword)}`}
                              target="_blank" rel="noopener noreferrer" className="tool-link">
                              <ShoppingCart size={12} />
                              搜索
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                    <p className="step-tip">💡 {result.step3_organize.tips}</p>
                    {result.rental_tips && (
                      <div className="rental-tip">🏠 {result.rental_tips}</div>
                    )}
                  </div>
                ) : (
                  <div className="step-card step-card-locked">
                    <div className="lock-header">
                      <Lock size={15} />
                      第三步：收纳（付费解锁）
                    </div>
                    <div className="lock-preview">
                      {['具体收纳摆放方式和位置建议', '推荐工具清单（含尺寸和购买关键词）', '维持整洁的核心小习惯'].map(t => (
                        <div key={t} className="lock-item">
                          <span>✓</span>
                          <span style={{ filter: 'blur(3px)', userSelect: 'none' }}>{t}</span>
                        </div>
                      ))}
                    </div>
                    <button onClick={handleUnlock} className="unlock-btn">
                      <Zap size={14} />
                      解锁完整方案 ¥9.9
                    </button>
                    <p className="unlock-hint">含完整三步 + 工具清单 + 收纳逻辑说明</p>
                  </div>
                )}
              </div>

              {isPaid && (
                <button className="share-btn">
                  <Share2 size={14} />
                  生成分享图（带水印）
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .diagnose-layout {
          max-width: 1120px;
          margin: 0 auto;
          padding: 48px 48px 80px;
          display: grid;
          grid-template-columns: 420px 1fr;
          gap: 48px;
          align-items: start;
        }
        .diagnose-left-header { margin-bottom: 32px; }
        .upload-zone {
          background: #FFFEF9;
          border: 1.5px dashed #D9D6CE;
          border-radius: 20px;
          padding: 40px;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          margin-bottom: 20px;
          min-height: 240px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .upload-zone:hover { border-color: #4A7C59; background: #EFF7F2; }
        .upload-zone-empty { text-align: center; }
        .upload-icon {
          width: 64px; height: 64px;
          background: rgba(74,124,89,0.1);
          border-radius: 18px;
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 16px;
          color: #4A7C59;
        }
        .upload-title { font-size: 16px; font-weight: 600; color: #1A1917; margin-bottom: 6px; }
        .upload-sub { font-size: 13px; color: #A8A59E; margin-bottom: 4px; }
        .upload-tip { font-size: 12px; color: #A8A59E; }
        .upload-preview-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          width: 100%;
        }
        .upload-preview-item {
          aspect-ratio: 1;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
          border: 1px solid #D9D6CE;
        }
        .upload-preview-item img { width: 100%; height: 100%; object-fit: cover; }
        .upload-preview-remove {
          position: absolute; top: 6px; right: 6px;
          width: 22px; height: 22px;
          background: rgba(0,0,0,0.5);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: #fff;
          border: none; cursor: pointer;
        }
        .upload-preview-label {
          position: absolute; bottom: 6px; left: 6px;
          background: rgba(0,0,0,0.5);
          color: #fff;
          font-size: 10px;
          padding: 2px 8px;
          border-radius: 100px;
        }
        .upload-preview-add {
          aspect-ratio: 1;
          border-radius: 12px;
          border: 1.5px dashed #D9D6CE;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          color: #A8A59E;
          font-size: 12px;
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .upload-preview-add:hover { border-color: #4A7C59; color: #4A7C59; }
        .diagnose-options {
          background: #FFFEF9;
          border: 1px solid #D9D6CE;
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 20px;
        }
        .option-row { display: flex; align-items: center; justify-content: space-between; }
        .option-info { display: flex; align-items: center; gap: 12px; }
        .option-icon {
          width: 40px; height: 40px;
          border-radius: 11px;
          display: flex; align-items: center; justify-content: center;
        }
        .option-label { font-size: 14px; font-weight: 600; color: #1A1917; }
        .option-sub { font-size: 12px; color: #A8A59E; }
        .toggle-btn { background: none; border: none; cursor: pointer; padding: 0; }
        .btn-primary-full {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 15px;
          background: #4A7C59;
          color: #fff;
          border: none;
          border-radius: 100px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          margin-bottom: 12px;
        }
        .btn-primary-full:hover { background: #6BAF80; transform: translateY(-1px); }
        .btn-primary-full:disabled { cursor: not-allowed; transform: none; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
        .text-center-hint { text-align: center; font-size: 12px; color: #A8A59E; }
        /* Right */
        .diagnose-right { position: sticky; top: 88px; }
        .result-panel { display: flex; flex-direction: column; gap: 16px; }
        .loading-card {
          background: #FFFEF9;
          border: 1px solid #D9D6CE;
          border-radius: 20px;
          padding: 40px;
          text-align: center;
        }
        .loading-circle-wrap { position: relative; width: 80px; height: 80px; margin: 0 auto 20px; }
        .loading-circle { width: 80px; height: 80px; transform: rotate(-90deg); }
        .loading-pct {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px; font-weight: 700; color: #4A7C59;
        }
        .loading-label { font-size: 15px; font-weight: 600; color: #1A1917; margin-bottom: 6px; }
        .loading-sub { font-size: 13px; color: #A8A59E; }
        .tips-card {
          background: #FFFEF9;
          border: 1px solid #D9D6CE;
          border-radius: 20px;
          padding: 32px;
        }
        .tips-icon {
          width: 48px; height: 48px;
          background: rgba(74,124,89,0.1);
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          color: #4A7C59;
          margin-bottom: 16px;
        }
        .tips-title { font-family: 'Noto Serif SC', serif; font-size: 20px; font-weight: 700; color: #1A1917; margin-bottom: 20px; }
        .tips-list { display: flex; flex-direction: column; gap: 14px; margin-bottom: 20px; }
        .tips-item { display: flex; align-items: flex-start; gap: 12px; }
        .tips-num {
          width: 22px; height: 22px;
          background: #4A7C59;
          border-radius: 50%;
          color: #fff;
          font-size: 12px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .tips-text { font-size: 14px; color: #6B6860; line-height: 1.6; padding-top: 2px; }
        .tips-footer { display: flex; align-items: center; justify-content: space-between; font-size: 12px; color: #A8A59E; padding-top: 16px; border-top: 1px solid #EDEBE4; }
        .tips-badge { padding: 3px 10px; background: rgba(74,124,89,0.1); border-radius: 100px; color: #4A7C59; font-weight: 500; }
        /* Result */
        .score-card {
          background: linear-gradient(135deg, #EFF7F2, #F7F5F0);
          border: 1px solid #D9D6CE;
          border-radius: 20px;
          padding: 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .score-tag { font-size: 12px; color: #A8A59E; margin-bottom: 4px; }
        .score-space { font-size: 16px; font-weight: 700; color: #1A1917; }
        .score-preview-badge { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; color: #4A7C59; margin-top: 8px; padding: 3px 10px; background: rgba(74,124,89,0.1); border-radius: 100px; }
        .score-right { text-align: right; }
        .score-num { font-family: 'Noto Serif SC', serif; font-size: 52px; font-weight: 700; line-height: 1; }
        .score-num span { font-size: 18px; font-weight: 400; color: #A8A59E; }
        .score-label { font-size: 12px; color: #A8A59E; }
        .quick-wins-card {
          background: rgba(232,197,71,0.08);
          border: 1px solid rgba(232,197,71,0.3);
          border-radius: 16px;
          padding: 20px;
        }
        .quick-wins-header { font-size: 13px; font-weight: 600; color: #9A7D1E; margin-bottom: 12px; }
        .quick-win-item { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; color: #6B6860; margin-bottom: 8px; }
        .quick-win-item:last-child { margin-bottom: 0; }
        .quick-win-num {
          width: 20px; height: 20px;
          background: rgba(154,125,30,0.2);
          border-radius: 6px;
          color: #9A7D1E;
          font-size: 11px; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .section-block-title { font-size: 15px; font-weight: 700; color: #1A1917; margin-bottom: 12px; }
        .problems-list { display: flex; flex-direction: column; gap: 10px; }
        .problem-card { border-radius: 12px; padding: 14px; }
        .problem-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; }
        .problem-spot { font-size: 13px; font-weight: 600; color: #1A1917; }
        .problem-level { font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 100px; }
        .problem-text { font-size: 13px; color: #6B6860; }
        /* Steps */
        .steps-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .step-card-3 { grid-column: 1 / -1; }
        .step-card { background: #FFFEF9; border: 1px solid #D9D6CE; border-radius: 16px; padding: 20px; }
        .step-header { margin-bottom: 12px; }
        .step-badge { display: inline-flex; align-items: center; padding: 4px 12px; border-radius: 100px; font-size: 12px; font-weight: 700; color: #fff; }
        .step-title { font-size: 15px; font-weight: 700; color: #1A1917; margin-bottom: 12px; }
        .step-items { display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px; }
        .step-item { display: flex; align-items: flex-start; gap: 8px; font-size: 13px; color: #6B6860; }
        .step-item-blur { opacity: 0.5; filter: blur(3px); }
        .step-tip { font-size: 12px; color: #A8A59E; }
        .tools-box { background: #F7F5F0; border-radius: 12px; padding: 14px; margin-bottom: 12px; }
        .tools-header { font-size: 12px; font-weight: 600; color: #A8A59E; margin-bottom: 10px; }
        .tool-row { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #EDEBE4; }
        .tool-row:last-child { border-bottom: none; padding-bottom: 0; }
        .tool-name { font-size: 13px; font-weight: 500; color: #1A1917; }
        .tool-size { font-size: 12px; color: #A8A59E; margin-left: 6px; }
        .tool-link {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 5px 12px;
          background: rgba(74,124,89,0.1);
          color: #4A7C59;
          border-radius: 8px;
          font-size: 12px; font-weight: 500;
          text-decoration: none;
          transition: background 0.2s;
        }
        .tool-link:hover { background: rgba(74,124,89,0.2); }
        .rental-tip { font-size: 12px; color: #4A7C59; padding: 8px 12px; background: rgba(74,124,89,0.08); border-radius: 8px; }
        /* Locked */
        .step-card-locked { background: #F7F5F0; }
        .lock-header { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; color: #A8A59E; margin-bottom: 14px; }
        .lock-preview { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
        .lock-item { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #A8A59E; }
        .unlock-btn {
          width: 100%;
          display: flex; align-items: center; justify-content: center; gap: 6px;
          padding: 13px;
          background: #4A7C59;
          color: #fff;
          border: none; border-radius: 100px;
          font-size: 14px; font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
          margin-bottom: 8px;
        }
        .unlock-btn:hover { background: #6BAF80; }
        .unlock-hint { text-align: center; font-size: 12px; color: #A8A59E; }
        .share-btn {
          width: 100%;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 13px;
          background: transparent;
          color: #1A1917;
          border: 1.5px solid #D9D6CE; border-radius: 100px;
          font-size: 14px; font-weight: 500;
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .share-btn:hover { border-color: #1A1917; }
        /* Responsive */
        @media (max-width: 900px) {
          .diagnose-layout { grid-template-columns: 1fr; padding: 32px 24px; }
          .diagnose-right { position: static; }
          .steps-grid { grid-template-columns: 1fr; }
          .step-card-3 { grid-column: auto; }
        }
        /* Nav */
        .page-nav { position: sticky; top: 0; z-index: 100; background: rgba(247,245,240,0.9); backdrop-filter: blur(16px); border-bottom: 1px solid #D9D6CE; }
        .page-nav-inner { max-width: 1120px; margin: 0 auto; padding: 0 48px; height: 64px; display: flex; align-items: center; justify-content: space-between; }
        .page-logo-link { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .page-logo-icon { width: 30px; height: 30px; background: #4A7C59; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
        .page-logo-text { font-family: 'Noto Serif SC', serif; font-size: 16px; font-weight: 700; color: #1A1917; }
        .page-nav-actions { display: flex; gap: 12px; }
        .page-nav-link { display: flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 500; color: #6B6860; text-decoration: none; transition: background 0.15s; }
        .page-nav-link:hover { background: #EDEBE4; color: #1A1917; }
        .page-eyebrow { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; background: rgba(74,124,89,0.1); border-radius: 100px; font-size: 12px; font-weight: 500; color: #4A7C59; margin-bottom: 12px; }
        .page-title { font-family: 'Noto Serif SC', serif; font-size: 28px; font-weight: 700; color: #1A1917; letter-spacing: -0.02em; margin-bottom: 8px; }
        .page-desc { font-size: 15px; color: #6B6860; }
        /* Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #EDEBE4; }
        ::-webkit-scrollbar-thumb { background: #D9D6CE; border-radius: 3px; }
      `}</style>
    </div>
  )
}
