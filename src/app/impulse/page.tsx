'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingBag, Loader2, Send, Clock, RefreshCw, ArrowLeft, Leaf } from 'lucide-react'

interface Verdict {
  score: number
  verdict: '买' | '冷静期再看' | '不建议'
  reason: string
  detail: string
  alternative: string
  cooldown_days: number
}

const questionOptions = [
  ['有，好几个类似的', '有一个但不完全一样', '没有，这是全新需求'],
  ['每天都用', '每周几次', '偶尔用，1个月不超过4次', '买了可能就放着'],
  ['有专门的位置', '大概知道放哪但有点挤', '还没想好放哪里'],
]

const verdictConfig = {
  '买': { emoji: '✅', color: '#4A7C59', bg: '#EFF7F2', label: 'AI 建议：可以买' },
  '冷静期再看': { emoji: '⏳', color: '#C9856A', bg: '#FBF3F0', label: 'AI 建议：先冷静一下' },
  '不建议': { emoji: '🚫', color: '#E85D5D', bg: 'rgba(232,93,93,0.06)', label: 'AI 建议：不建议购买' },
}

const examples = ['第5个保温杯', '新款 AirPods', '健身器材', '又一件黑 T', '空气炸锅']

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

export default function ImpulsePage() {
  const [item, setItem] = useState('')
  const [price, setPrice] = useState('')
  const [stage, setStage] = useState<'input' | 'qa' | 'loading' | 'result'>('input')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [verdict, setVerdict] = useState<Verdict | null>(null)
  const [cooldownSet, setCooldownSet] = useState(false)

  const handleStart = () => {
    if (!item.trim()) return
    setStage('qa')
    setCurrentQ(0)
    setAnswers([])
  }

  const handleAnswer = async (answer: string) => {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)
    if (newAnswers.length < 3) {
      setCurrentQ(currentQ + 1)
    } else {
      setStage('loading')
      try {
        const res = await fetch('/api/impulse', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ item, price, answers: newAnswers, stage: 'verdict' }),
        })
        const json = await res.json()
        if (json.success) {
          setVerdict(json.data)
          setStage('result')
        }
      } catch { setStage('qa') }
    }
  }

  const handleReset = () => {
    setItem(''); setPrice(''); setStage('input')
    setCurrentQ(0); setAnswers([]); setVerdict(null); setCooldownSet(false)
  }

  const questions = [
    `家里有没有类似「${item}」的东西？`,
    `买来之后，大概多久会用一次？`,
    `打算放在哪里？现在那个位置有空间吗？`,
  ]

  return (
    <div className="page">
      <PageNav />

      <div className="impulse-page">
        {/* Left: Content */}
        <div className="impulse-left">
          <div className="page-eyebrow" style={{ color: '#C9856A', background: 'rgba(201,133,106,0.1)' }}>
            <ShoppingBag size={13} />
            购物欲拦截器
          </div>
          <h1 className="page-title">想买东西？<br />先问 AI</h1>
          <p className="page-desc">三个问题，帮你判断这笔钱花得值不值。<br />很多冲动消费，冷静下来就不想买了。</p>

          <div className="impulse-stats">
            {[
              { num: '73%', label: '的冲动消费冷静7天后就不想买了' },
              { num: '3个', label: '追问，直击购买决策的本质' },
              { num: '¥0', label: '完全免费，随时可用' },
            ].map(s => (
              <div key={s.num} className="impulse-stat">
                <div className="impulse-stat-num">{s.num}</div>
                <div className="impulse-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Interaction Card */}
        <div className="impulse-right">
          <div className="interaction-card">

            {stage === 'input' && (
              <div className="interaction-content">
                <div className="interaction-tag">
                  <ShoppingBag size={13} />
                  新的决策
                </div>

                <div className="input-group">
                  <label className="input-label">你想买什么？</label>
                  <input
                    className="main-input"
                    placeholder="如：第五个保温杯、新款耳机..."
                    value={item}
                    onChange={e => setItem(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleStart()}
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">价格（选填）</label>
                  <div className="price-input-wrap">
                    <span className="price-symbol">¥</span>
                    <input className="main-input price-input" placeholder="预计花费"
                      type="number" value={price} onChange={e => setPrice(e.target.value)} />
                  </div>
                </div>

                <button onClick={handleStart} disabled={!item.trim()}
                  className="start-btn"
                  style={{ opacity: !item.trim() ? 0.5 : 1 }}>
                  <Send size={15} />
                  开始理性决策
                </button>

                <div className="examples-section">
                  <p className="examples-label">试试这些场景</p>
                  <div className="examples-tags">
                    {examples.map(ex => (
                      <button key={ex} onClick={() => setItem(ex)} className="example-tag">{ex}</button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {stage === 'qa' && (
              <div className="interaction-content">
                {/* Progress */}
                <div className="qa-progress">
                  {questions.map((_, i) => (
                    <div key={i} className="qa-progress-bar">
                      <div className="qa-progress-fill"
                        style={{
                          width: i < currentQ ? '100%' : i === currentQ ? '0%' : '0%',
                          background: i < currentQ ? '#C9856A' : '#EDEBE4',
                          transition: 'width 0.3s, background 0.3s'
                        }} />
                    </div>
                  ))}
                  <span className="qa-progress-label">{currentQ + 1} / 3</span>
                </div>

                {/* Context chip */}
                <div className="qa-context">
                  <ShoppingBag size={13} />
                  {item}{price ? ` · ¥${price}` : ''}
                </div>

                {/* Previous answers */}
                {answers.length > 0 && (
                  <div className="qa-answers">
                    {answers.map((ans, i) => (
                      <div key={i} className="qa-answer-chip">
                        <span className="qa-answer-num">Q{i + 1}</span>
                        {ans}
                      </div>
                    ))}
                  </div>
                )}

                {/* Question */}
                <div className="question-card">
                  <div className="question-label">AI 追问 {currentQ + 1}</div>
                  <p className="question-text">{questions[currentQ]}</p>
                </div>

                {/* Options */}
                <div className="options-list">
                  {questionOptions[currentQ].map((opt, i) => (
                    <button key={i} onClick={() => handleAnswer(opt)} className="option-btn">
                      <div className="option-dot" />
                      <span>{opt}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {stage === 'loading' && (
              <div className="interaction-content loading-state">
                <Loader2 size={36} className="spin" style={{ color: '#C9856A' }} />
                <p className="loading-title">AI 综合分析中...</p>
                <p className="loading-sub">基于你的 3 个回答做出判断</p>
              </div>
            )}

            {stage === 'result' && verdict && (() => {
              const vc = verdictConfig[verdict.verdict]
              return (
                <div className="interaction-content result-state">
                  {/* Verdict Header */}
                  <div className="verdict-header" style={{ background: vc.bg }}>
                    <div className="verdict-emoji">{vc.emoji}</div>
                    <div className="verdict-label" style={{ color: vc.color }}>{vc.label}</div>
                    <p className="verdict-reason">{verdict.reason}</p>
                  </div>

                  {/* Score */}
                  <div className="score-row">
                    <span className="score-row-label">理性购买评分</span>
                    <div className="score-row-right">
                      <span className="score-row-value" style={{ color: vc.color }}>{verdict.score}</span>
                      <span className="score-row-max">/10</span>
                    </div>
                  </div>
                  <div className="score-bar-wrap">
                    <div className="score-bar">
                      <div className="score-bar-fill" style={{ width: `${verdict.score * 10}%`, background: vc.color }} />
                    </div>
                  </div>

                  {/* Detail */}
                  <div className="verdict-detail">
                    <p>{verdict.detail}</p>
                  </div>

                  {/* Alternative */}
                  {verdict.alternative && (
                    <div className="verdict-alt">
                      <div className="verdict-alt-label">💡 替代建议</div>
                      <p>{verdict.alternative}</p>
                    </div>
                  )}

                  {/* Cooldown */}
                  {verdict.verdict !== '买' && (
                    <div className="cooldown-card">
                      <div className="cooldown-header">
                        <Clock size={15} />
                        <span>建议冷静 <strong>{verdict.cooldown_days} 天</strong> 再看</span>
                      </div>
                      <p className="cooldown-desc">{verdict.cooldown_days} 天后还记得想买，说明是真需求</p>
                      {!cooldownSet ? (
                        <button onClick={() => setCooldownSet(true)} className="cooldown-btn">
                          ⏰ 设置 {verdict.cooldown_days} 天后提醒我
                        </button>
                      ) : (
                        <div className="cooldown-set">
                          <span>✓</span> 已设置提醒
                        </div>
                      )}
                    </div>
                  )}

                  {/* Share */}
                  <div className="share-quote">
                    <p className="share-quote-text">
                      「我问过 AI，它说对于「{item}」：{verdict.reason}」
                    </p>
                  </div>

                  <button onClick={handleReset} className="reset-btn">
                    <RefreshCw size={14} />
                    再拦截一个
                  </button>
                </div>
              )
            })()}
          </div>
        </div>
      </div>

      <style>{`
        .impulse-page {
          max-width: 1120px;
          margin: 0 auto;
          padding: 64px 48px 80px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: start;
        }
        .impulse-left { padding-top: 8px; }
        .page-eyebrow { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 100px; font-size: 12px; font-weight: 500; margin-bottom: 16px; }
        .page-title { font-family: 'Noto Serif SC', serif; font-size: 52px; font-weight: 700; color: #1A1917; letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 16px; }
        .page-desc { font-size: 17px; color: #6B6860; line-height: 1.7; margin-bottom: 48px; }
        .impulse-stats { display: flex; flex-direction: column; gap: 20px; }
        .impulse-stat { display: flex; align-items: baseline; gap: 12px; }
        .impulse-stat-num { font-family: 'Noto Serif SC', serif; font-size: 28px; font-weight: 700; color: #C9856A; letter-spacing: -0.02em; }
        .impulse-stat-label { font-size: 14px; color: #6B6860; }
        /* Interaction Card */
        .impulse-right { position: sticky; top: 88px; }
        .interaction-card {
          background: #FFFEF9;
          border: 1px solid #D9D6CE;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 12px 48px rgba(26,25,23,0.1);
        }
        .interaction-content { padding: 36px; }
        .interaction-tag { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; background: rgba(201,133,106,0.1); border-radius: 100px; font-size: 12px; font-weight: 500; color: #C9856A; margin-bottom: 24px; }
        .input-group { margin-bottom: 16px; }
        .input-label { display: block; font-size: 13px; font-weight: 600; color: #1A1917; margin-bottom: 8px; }
        .main-input {
          width: 100%;
          padding: 13px 16px;
          border: 1.5px solid #D9D6CE;
          border-radius: 12px;
          background: #F7F5F0;
          color: #1A1917;
          font-size: 15px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s;
        }
        .main-input:focus { border-color: #C9856A; }
        .main-input::placeholder { color: #A8A59E; }
        .price-input-wrap { position: relative; }
        .price-symbol { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); font-size: 15px; color: #A8A59E; }
        .price-input { padding-left: 30px; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
        .start-btn {
          width: 100%;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          padding: 14px;
          background: #C9856A;
          color: #fff;
          border: none; border-radius: 100px;
          font-size: 15px; font-weight: 600;
          cursor: pointer;
          margin-bottom: 24px;
          transition: background 0.2s, transform 0.15s;
        }
        .start-btn:hover { background: #d97a5e; transform: translateY(-1px); }
        .start-btn:disabled { cursor: not-allowed; transform: none; }
        .examples-label { font-size: 12px; color: #A8A59E; margin-bottom: 10px; }
        .examples-tags { display: flex; flex-wrap: wrap; gap: 8px; }
        .example-tag {
          padding: 6px 14px;
          border: 1px solid #D9D6CE;
          border-radius: 100px;
          background: transparent;
          font-size: 12px; color: #6B6860;
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s;
        }
        .example-tag:hover { border-color: #C9856A; color: #C9856A; }
        /* QA */
        .qa-progress { display: flex; align-items: center; gap: 8px; margin-bottom: 16px; }
        .qa-progress-bar { flex: 1; height: 4px; background: #EDEBE4; border-radius: 2px; overflow: hidden; }
        .qa-progress-fill { height: 100%; border-radius: 2px; }
        .qa-progress-label { font-size: 12px; color: #A8A59E; margin-left: 4px; white-space: nowrap; }
        .qa-context { display: inline-flex; align-items: center; gap: 6px; padding: 5px 14px; background: rgba(201,133,106,0.1); border-radius: 100px; font-size: 12px; font-weight: 500; color: #C9856A; margin-bottom: 14px; }
        .qa-answers { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
        .qa-answer-chip { display: flex; align-items: center; gap: 5px; padding: 4px 10px; background: #F7F5F0; border-radius: 100px; font-size: 11px; color: #6B6860; }
        .qa-answer-num { font-weight: 700; color: #A8A59E; }
        .question-card {
          background: #F7F5F0;
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 16px;
        }
        .question-label { font-size: 12px; color: #A8A59E; margin-bottom: 6px; }
        .question-text { font-size: 16px; font-weight: 600; color: #1A1917; line-height: 1.5; }
        .options-list { display: flex; flex-direction: column; gap: 8px; }
        .option-btn {
          width: 100%;
          display: flex; align-items: center; gap: 12px;
          padding: 14px 16px;
          background: #FFFEF9;
          border: 1px solid #D9D6CE;
          border-radius: 12px;
          font-size: 14px; color: #1A1917;
          text-align: left;
          cursor: pointer;
          transition: border-color 0.15s, background 0.15s;
        }
        .option-btn:hover { border-color: #C9856A; background: #FBF3F0; }
        .option-dot { width: 18px; height: 18px; border: 2px solid #D9D6CE; border-radius: 50%; flex-shrink: 0; transition: border-color 0.15s; }
        .option-btn:hover .option-dot { border-color: #C9856A; }
        /* Loading */
        .loading-state { text-align: center; padding: 60px 36px; display: flex; flex-direction: column; align-items: center; gap: 12px; }
        .loading-title { font-size: 16px; font-weight: 600; color: #1A1917; }
        .loading-sub { font-size: 13px; color: #A8A59E; }
        /* Result */
        .result-state { display: flex; flex-direction: column; gap: 16px; }
        .verdict-header {
          border-radius: 16px;
          padding: 28px;
          text-align: center;
        }
        .verdict-emoji { font-size: 48px; margin-bottom: 12px; }
        .verdict-label { font-size: 18px; font-weight: 700; margin-bottom: 8px; }
        .verdict-reason { font-size: 14px; font-weight: 500; color: #1A1917; line-height: 1.5; }
        .score-row { display: flex; justify-content: space-between; align-items: baseline; }
        .score-row-label { font-size: 13px; color: #6B6860; }
        .score-row-right { display: flex; align-items: baseline; gap: 2px; }
        .score-row-value { font-family: 'Noto Serif SC', serif; font-size: 32px; font-weight: 700; }
        .score-row-max { font-size: 14px; color: #A8A59E; }
        .score-bar-wrap { }
        .score-bar { height: 8px; background: #EDEBE4; border-radius: 4px; overflow: hidden; }
        .score-bar-fill { height: 100%; border-radius: 4px; transition: width 0.5s ease; }
        .verdict-detail {
          background: #F7F5F0;
          border-radius: 12px;
          padding: 14px 16px;
          font-size: 13px;
          color: #6B6860;
          line-height: 1.7;
        }
        .verdict-alt {
          background: #EFF7F2;
          border-radius: 12px;
          padding: 14px 16px;
        }
        .verdict-alt-label { font-size: 12px; font-weight: 600; color: #4A7C59; margin-bottom: 4px; }
        .verdict-alt p { font-size: 13px; color: #6B6860; line-height: 1.6; }
        .cooldown-card {
          background: #FBF3F0;
          border-radius: 14px;
          padding: 16px;
        }
        .cooldown-header { display: flex; align-items: center; gap: 8px; font-size: 14px; color: #1A1917; margin-bottom: 4px; }
        .cooldown-desc { font-size: 12px; color: #A8A59E; margin-bottom: 12px; }
        .cooldown-btn {
          width: 100%;
          padding: 11px;
          background: transparent;
          border: 1.5px solid #C9856A;
          border-radius: 100px;
          font-size: 13px; font-weight: 500; color: #C9856A;
          cursor: pointer;
          transition: background 0.2s;
        }
        .cooldown-btn:hover { background: rgba(201,133,106,0.1); }
        .cooldown-set {
          text-align: center;
          padding: 10px;
          background: rgba(74,124,89,0.1);
          border-radius: 100px;
          font-size: 13px; color: #4A7C59;
        }
        .share-quote {
          background: #F7F5F0;
          border-radius: 12px;
          padding: 14px 16px;
          text-align: center;
        }
        .share-quote-text { font-size: 13px; color: #6B6860; line-height: 1.6; }
        .reset-btn {
          width: 100%;
          display: flex; align-items: center; justify-content: center; gap: 6px;
          padding: 13px;
          background: transparent;
          border: 1.5px solid #D9D6CE;
          border-radius: 100px;
          font-size: 14px; font-weight: 500; color: #6B6860;
          cursor: pointer;
          transition: border-color 0.2s;
        }
        .reset-btn:hover { border-color: #1A1917; color: #1A1917; }
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
          .impulse-page { grid-template-columns: 1fr; padding: 40px 24px 80px; gap: 40px; }
          .page-title { font-size: 36px; }
          .impulse-right { position: static; }
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #EDEBE4; }
        ::-webkit-scrollbar-thumb { background: #D9D6CE; border-radius: 3px; }
      `}</style>
    </div>
  )
}
