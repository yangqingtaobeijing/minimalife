'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, Check, Lock, Trophy, ChevronRight, Flame, Sparkles, ArrowLeft, Leaf } from 'lucide-react'

const encouragements = [
  '干得漂亮！清出一个抽屉，就赢得了一份内心的平静。',
  '每一件被清理的物品，都是你为自己创造的空间。继续加油！',
  '极简不是终点，而是每天 5 分钟的小习惯。你做到了今天的！',
  '很多人说「明天再弄」，但你今天就做了。这就是区别。',
  '已完成 ' + '天！越往后越有成就感，坚持下去！',
  '清空的不只是空间，也是脑子里那块说「以后再说」的角落。',
  '好的开始！记住：不需要完美，只需要做了就算数。',
]

const TASKS = [
  { day: 1, title: '清空一个抽屉', desc: '选一个最乱的抽屉，全部掏出来，只放回真正需要的东西。', emoji: '🗃️', category: '清理' },
  { day: 2, title: '桌面清零', desc: '把桌面上的所有东西归位，最终桌面只剩「当前在用」的物品。', emoji: '🖥️', category: '归位' },
  { day: 3, title: '衣柜快速扫描', desc: '花 10 分钟扫一遍衣柜，把 1 年没穿的衣服单独放一边。', emoji: '👔', category: '断舍离' },
  { day: 4, title: '处理 3 件旧物', desc: '从昨天扫出来的衣服里，选 3 件：送人 / 闲鱼挂牌 / 直接丢。', emoji: '♻️', category: '处理' },
  { day: 5, title: '检查冰箱', desc: '清空冰箱里过期或不会再用的食材，擦一下搁架。', emoji: '🧊', category: '清理' },
  { day: 6, title: '理线大作战', desc: '整理桌面 / 床头的充电线，用理线夹或收纳袋分类固定。', emoji: '🔌', category: '收纳' },
  { day: 7, title: '第一周复盘', desc: '回顾这一周清理了什么，拍一张整理后的照片，感受变化。', emoji: '📸', category: '复盘' },
  { day: 8, title: '书架整理', desc: '把书架或书堆整理一遍，竖立摆放，移走不会再看的书。', emoji: '📚', category: '收纳' },
  { day: 9, title: '浴室精简', desc: '清空洗漱台，只保留每天用的物品，其余归入收纳柜。', emoji: '🪥', category: '清理' },
  { day: 10, title: '全屋找「僵尸物品」', desc: '花 15 分钟巡视全屋，找出超过 3 个月没用过的东西列清单。', emoji: '🧟', category: '断舍离' },
  { day: 11, title: '处理僵尸物品', desc: '把昨天列的清单，每件决定：留 / 送 / 卖 / 丢。', emoji: '💀', category: '处理' },
  { day: 12, title: '建立固定位置', desc: '为 3 类常找不到的小物品（钥匙/充电器/剪刀）指定固定位置。', emoji: '📍', category: '收纳' },
  { day: 13, title: '数字极简', desc: '删除手机里超过 3 个月没用过的 APP，整理相册重复照片。', emoji: '📱', category: '数字' },
  { day: 14, title: '14 天终极复盘', desc: '拍一组「整理后」照片，对比第一天，感受你创造的空间变化。', emoji: '🏆', category: '复盘' },
]

const categoryConfig: Record<string, { bg: string; color: string; border: string }> = {
  '清理': { bg: 'rgba(232,93,93,0.08)', color: '#E85D5D', border: 'rgba(232,93,93,0.2)' },
  '归位': { bg: 'rgba(74,124,89,0.08)', color: '#4A7C59', border: 'rgba(74,124,89,0.2)' },
  '断舍离': { bg: 'rgba(201,133,106,0.08)', color: '#C9856A', border: 'rgba(201,133,106,0.2)' },
  '处理': { bg: 'rgba(74,124,89,0.06)', color: '#6BAF80', border: 'rgba(74,124,89,0.15)' },
  '收纳': { bg: 'rgba(139,115,85,0.08)', color: '#8B7355', border: 'rgba(139,115,85,0.2)' },
  '复盘': { bg: 'rgba(232,197,71,0.08)', color: '#9A7D1E', border: 'rgba(232,197,71,0.25)' },
  '数字': { bg: 'rgba(123,94,167,0.08)', color: '#7B5EA7', border: 'rgba(123,94,167,0.2)' },
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

export default function ChallengePage() {
  const [checkedDays, setCheckedDays] = useState<Set<number>>(new Set([1, 2, 3]))
  const [isPaid] = useState(false)
  const [expandedDay, setExpandedDay] = useState<number | null>(null)
  const [justChecked, setJustChecked] = useState<number | null>(null)
  const [feedbackText, setFeedbackText] = useState('')

  const completedCount = checkedDays.size
  const progressPercent = (completedCount / 14) * 100
  const currentDay = Math.min(completedCount + 1, 14)

  const toggleDay = (day: number) => {
    if (!isPaid && day > 7) return
    setCheckedDays(prev => {
      const next = new Set(prev)
      if (!next.has(day)) {
        next.add(day)
        setJustChecked(day)
        const idx = Math.floor(Math.random() * encouragements.length)
        setFeedbackText(encouragements[idx].replace('天！', `${next.size}天！`))
        setTimeout(() => setJustChecked(null), 4000)
      } else {
        next.delete(day)
        setJustChecked(null)
      }
      return next
    })
  }

  return (
    <div className="page">
      <PageNav />

      <div className="challenge-layout">
        {/* Left: Overview */}
        <div className="challenge-left">
          <div className="challenge-left-header">
            <div className="page-eyebrow" style={{ color: '#7B5EA7', background: 'rgba(123,94,167,0.1)' }}>
              <Calendar size={13} />
              14 天断舍离挑战
            </div>
            <h1 className="page-title">每天 5 分钟，<br />养成极简习惯</h1>
            <p className="page-desc">14 个小任务，从一个抽屉开始改变你的家</p>
          </div>

          {/* Progress */}
          <div className="progress-card">
            <div className="progress-top">
              <div>
                <div className="progress-num">
                  {completedCount}
                  <span className="progress-denom">/14</span>
                </div>
                <div className="progress-label">已完成天数</div>
              </div>
              <div className="progress-right">
                {completedCount >= 14 ? (
                  <div className="trophy-icon"><Trophy size={32} /></div>
                ) : (
                  <div className="flame-icon"><Flame size={28} /></div>
                )}
                <div className="progress-day-label">第 {currentDay} 天</div>
              </div>
            </div>

            <div className="progress-bar-wrap">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
              </div>
              <div className="progress-percent">{Math.round(progressPercent)}%</div>
            </div>

            <div className="progress-days">
              {TASKS.map(t => (
                <div key={t.day} className="progress-day-dot"
                  style={{ background: checkedDays.has(t.day) ? '#4A7C59' : t.day <= 7 ? '#EDEBE4' : isPaid ? '#EDEBE4' : '#EDEBE4' }}
                />
              ))}
            </div>
          </div>

          {/* AI Feedback */}
          {justChecked && (
            <div className="feedback-card">
              <div className="feedback-icon"><Sparkles size={14} /></div>
              <div className="feedback-content">
                <div className="feedback-label">AI 鼓励</div>
                <p className="feedback-text">{feedbackText}</p>
              </div>
            </div>
          )}

          {/* Info */}
          <div className="challenge-info">
            {[
              { icon: '⏱️', title: '每天 5 分钟', desc: '每个任务设计为 5–15 分钟，不占用太多时间' },
              { icon: '🤖', title: 'AI 个性化鼓励', desc: '完成打卡后获得 AI 鼓励反馈，坚持不孤单' },
              { icon: '🏆', title: '完成获得证书', desc: '14 天全勤可获得极简证书，可分享到朋友圈' },
            ].map(item => (
              <div key={item.title} className="info-item">
                <span className="info-icon">{item.icon}</span>
                <div>
                  <div className="info-title">{item.title}</div>
                  <div className="info-desc">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Paywall */}
          {!isPaid && (
            <div className="paywall-card">
              <div className="paywall-header">
                <Lock size={14} />
                解锁后半段（Day 8–14）
              </div>
              <p className="paywall-desc">后 7 天包含「全屋扫描」「数字极简」「终极复盘」，完成可获得极简证书分享图。</p>
              <button className="paywall-btn">升级会员解锁 ¥19.9/月</button>
            </div>
          )}

          {/* Certificate */}
          {completedCount >= 14 && (
            <div className="certificate-card">
              <Trophy size={40} style={{ color: '#E8C547', marginBottom: 12 }} />
              <h3 className="certificate-title">极简证书</h3>
              <p className="certificate-desc">恭喜完成 14 天断舍离挑战，你已成功建立极简生活习惯 🌿</p>
              <button className="certificate-btn">生成证书分享图</button>
            </div>
          )}
        </div>

        {/* Right: Task List */}
        <div className="challenge-right">
          <div className="tasks-header">
            <h2 className="tasks-title">每日任务</h2>
            <div className="tasks-meta">{completedCount} / 14 已完成</div>
          </div>

          <div className="tasks-grid">
            {TASKS.map(task => {
              const isDone = checkedDays.has(task.day)
              const isLocked = !isPaid && task.day > 7
              const isCurrent = task.day === currentDay && !isDone
              const cat = categoryConfig[task.category] || categoryConfig['清理']

              return (
                <div key={task.day}
                  className={`task-card ${isDone ? 'task-done' : ''} ${isLocked ? 'task-locked' : ''} ${isCurrent ? 'task-current' : ''}`}
                  style={isDone
                    ? { background: '#EFF7F2', borderColor: 'rgba(74,124,89,0.2)' }
                    : isLocked
                    ? { background: '#F7F5F0', opacity: 0.7 }
                    : isCurrent
                    ? { borderColor: '#4A7C59', borderWidth: 2 }
                    : {}}
                  onClick={() => !isLocked && setExpandedDay(expandedDay === task.day ? null : task.day)}
                >
                  <div className="task-top">
                    <div className="task-emoji">{task.emoji}</div>
                    <div className="task-meta">
                      <span className="task-day">Day {task.day}</span>
                      {isCurrent && <span className="task-today">今日任务</span>}
                      <span className="task-cat" style={{ background: cat.bg, color: cat.color }}>{task.category}</span>
                    </div>
                    {isLocked && <Lock size={13} style={{ color: '#A8A59E', flexShrink: 0 }} />}
                    {!isLocked && (
                      <ChevronRight size={14} style={{ color: '#A8A59E', flexShrink: 0, transform: expandedDay === task.day ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                    )}
                  </div>

                  <div className="task-title">{task.title}</div>

                  {expandedDay === task.day && !isLocked && (
                    <div className="task-expanded" onClick={e => e.stopPropagation()}>
                      <p className="task-desc">{task.desc}</p>
                      {!isDone && (
                        <button onClick={e => { e.stopPropagation(); toggleDay(task.day) }} className="task-check-btn">
                          <Check size={13} />
                          标记为完成
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <style>{`
        .challenge-layout {
          max-width: 1120px;
          margin: 0 auto;
          padding: 48px 48px 80px;
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 48px;
          align-items: start;
        }
        .challenge-left-header { margin-bottom: 28px; }
        .page-eyebrow { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 100px; font-size: 12px; font-weight: 500; margin-bottom: 14px; }
        .page-title { font-family: 'Noto Serif SC', serif; font-size: 32px; font-weight: 700; color: #1A1917; letter-spacing: -0.02em; line-height: 1.2; margin-bottom: 10px; }
        .page-desc { font-size: 15px; color: #6B6860; }
        /* Progress Card */
        .progress-card {
          background: linear-gradient(135deg, #F5F2F8, #EFF7F2);
          border: 1px solid #D9D6CE;
          border-radius: 20px;
          padding: 24px;
          margin-bottom: 20px;
        }
        .progress-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
        .progress-num { font-family: 'Noto Serif SC', serif; font-size: 52px; font-weight: 700; color: #7B5EA7; line-height: 1; }
        .progress-denom { font-size: 20px; color: #A8A59E; font-weight: 400; }
        .progress-label { font-size: 12px; color: #A8A59E; margin-top: 4px; }
        .progress-right { text-align: right; }
        .trophy-icon { color: #E8C547; margin-bottom: 2px; }
        .flame-icon { color: #E85D5D; margin-bottom: 2px; }
        .progress-day-label { font-size: 12px; color: #A8A59E; }
        .progress-bar-wrap { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
        .progress-bar { flex: 1; height: 8px; background: #EDEBE4; border-radius: 4px; overflow: hidden; }
        .progress-fill { height: 100%; background: linear-gradient(90deg, #7B5EA7, #4A7C59); border-radius: 4px; transition: width 0.5s ease; }
        .progress-percent { font-size: 12px; font-weight: 600; color: #7B5EA7; white-space: nowrap; }
        .progress-days { display: flex; gap: 4px; flex-wrap: wrap; }
        .progress-day-dot { width: 20px; height: 6px; border-radius: 3px; }
        /* Feedback */
        .feedback-card {
          background: linear-gradient(135deg, #EFF7F2, #F7F5F0);
          border: 1px solid rgba(74,124,89,0.25);
          border-radius: 14px;
          padding: 16px;
          display: flex;
          gap: 12px;
          align-items: flex-start;
          margin-bottom: 20px;
          animation: fadeInUp 0.4s ease;
        }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .feedback-icon {
          width: 32px; height: 32px;
          background: #4A7C59;
          border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          color: #fff;
          flex-shrink: 0;
        }
        .feedback-label { font-size: 11px; font-weight: 600; color: #4A7C59; margin-bottom: 3px; }
        .feedback-text { font-size: 13px; color: #6B6860; line-height: 1.5; }
        /* Info */
        .challenge-info { display: flex; flex-direction: column; gap: 14px; margin-bottom: 20px; }
        .info-item { display: flex; gap: 12px; align-items: flex-start; }
        .info-icon { font-size: 20px; flex-shrink: 0; }
        .info-title { font-size: 13px; font-weight: 600; color: #1A1917; margin-bottom: 2px; }
        .info-desc { font-size: 12px; color: #6B6860; line-height: 1.5; }
        /* Paywall */
        .paywall-card {
          background: #F7F5F0;
          border: 1px solid #D9D6CE;
          border-radius: 16px;
          padding: 20px;
        }
        .paywall-header { display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; color: #1A1917; margin-bottom: 6px; }
        .paywall-desc { font-size: 12px; color: #6B6860; line-height: 1.5; margin-bottom: 14px; }
        .paywall-btn {
          width: 100%;
          padding: 12px;
          background: #7B5EA7;
          color: #fff;
          border: none; border-radius: 100px;
          font-size: 13px; font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .paywall-btn:hover { background: #8a6db5; }
        /* Certificate */
        .certificate-card {
          background: linear-gradient(135deg, #FFF9E6, #EFF7F2);
          border: 2px solid rgba(232,197,71,0.4);
          border-radius: 20px;
          padding: 28px;
          text-align: center;
        }
        .certificate-title { font-family: 'Noto Serif SC', serif; font-size: 20px; font-weight: 700; color: #9A7D1E; margin-bottom: 6px; }
        .certificate-desc { font-size: 13px; color: #6B6860; line-height: 1.6; margin-bottom: 18px; }
        .certificate-btn {
          padding: 12px 28px;
          background: #4A7C59;
          color: #fff;
          border: none; border-radius: 100px;
          font-size: 14px; font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .certificate-btn:hover { background: #6BAF80; }
        /* Right */
        .challenge-right { position: sticky; top: 88px; }
        .tasks-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 16px; }
        .tasks-title { font-family: 'Noto Serif SC', serif; font-size: 20px; font-weight: 700; color: #1A1917; }
        .tasks-meta { font-size: 13px; color: #A8A59E; }
        .tasks-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        .task-card {
          background: #FFFEF9;
          border: 1px solid #D9D6CE;
          border-radius: 16px;
          padding: 16px;
          cursor: pointer;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .task-card:hover { box-shadow: 0 4px 16px rgba(26,25,23,0.08); }
        .task-card:active { transform: scale(0.99); }
        .task-top { display: flex; align-items: flex-start; gap: 8px; margin-bottom: 8px; }
        .task-emoji { font-size: 22px; flex-shrink: 0; }
        .task-meta { flex: 1; display: flex; align-items: center; gap: 5px; flex-wrap: wrap; }
        .task-day { font-size: 11px; color: #A8A59E; }
        .task-today { font-size: 10px; font-weight: 600; padding: 2px 7px; background: rgba(74,124,89,0.1); color: #4A7C59; border-radius: 100px; }
        .task-cat { font-size: 10px; font-weight: 600; padding: 2px 7px; border-radius: 100px; }
        .task-title {
          font-size: 14px;
          font-weight: 600;
          color: #1A1917;
          line-height: 1.4;
          text-decoration: none;
        }
        .task-done .task-title { color: #A8A59E; text-decoration: line-through; }
        .task-expanded { margin-top: 10px; padding-top: 10px; border-top: 1px solid #EDEBE4; }
        .task-desc { font-size: 13px; color: #6B6860; line-height: 1.5; margin-bottom: 10px; }
        .task-check-btn {
          display: flex; align-items: center; gap: 6px;
          padding: 9px 16px;
          background: #4A7C59;
          color: #fff;
          border: none; border-radius: 100px;
          font-size: 13px; font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        .task-check-btn:hover { background: #6BAF80; }
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
          .challenge-layout { grid-template-columns: 1fr; padding: 32px 24px; }
          .challenge-right { position: static; }
          .tasks-grid { grid-template-columns: 1fr; }
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #EDEBE4; }
        ::-webkit-scrollbar-thumb { background: #D9D6CE; border-radius: 3px; }
      `}</style>
    </div>
  )
}
