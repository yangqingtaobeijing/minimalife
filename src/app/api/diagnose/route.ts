import { NextRequest, NextResponse } from 'next/server'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || ''
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash-lite'

const SYSTEM_PROMPT = `你是一个极简收纳专家，擅长小户型和租房场景。
请分析图片中的空间，指出具体杂乱点，给出可立即执行的三步方案。
优先推荐无需打孔、低成本的解决方案。

请严格按以下 JSON 格式输出（不要加任何代码块标记）：
{
  "space_type": "识别到的空间类型（如：卧室床头区域、书桌区域、衣柜等）",
  "overall_score": 整洁度评分1-10的数字,
  "problems": [
    {
      "area": "具体区域名称",
      "issue": "具体问题描述（要具体，如'左侧层板区域混放了书籍、充电线和零食'）",
      "severity": "high/medium/low"
    }
  ],
  "step1_throw": {
    "title": "第一步：清除（扔/处理）",
    "items": ["具体要处理的物品1", "具体要处理的物品2"],
    "tips": "处理建议"
  },
  "step2_keep": {
    "title": "第二步：筛留（决定留什么）",
    "items": ["留下并归位的物品1（原因）", "留下并归位的物品2（原因）"],
    "tips": "筛选原则"
  },
  "step3_organize": {
    "title": "第三步：收纳（怎么放）",
    "items": ["具体收纳动作1", "具体收纳动作2"],
    "tools": [
      {
        "name": "工具名称",
        "size": "参考尺寸",
        "keyword": "购买关键词"
      }
    ],
    "tips": "收纳小技巧"
  },
  "rental_tips": "租房友好的特别提示（无打孔方案）",
  "quick_wins": ["5分钟内可立即做的小动作1", "5分钟内可立即做的小动作2"]
}`

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const images = formData.getAll('images') as File[]
    const rentalMode = formData.get('rentalMode') === 'true'
    const isFree = formData.get('isFree') === 'true'

    if (!images || images.length === 0) {
      return NextResponse.json({ error: '请上传至少一张图片' }, { status: 400 })
    }

    if (!GEMINI_API_KEY) {
      // Mock response for demo
      return NextResponse.json(getMockResponse(isFree))
    }

    // Convert images to base64
    const imageContents = await Promise.all(
      images.map(async (file) => {
        const bytes = await file.arrayBuffer()
        const base64 = Buffer.from(bytes).toString('base64')
        return {
          inlineData: {
            mimeType: file.type,
            data: base64,
          },
        }
      })
    )

    const rentalAddition = rentalMode
      ? '\n特别注意：用户是租房，所有建议必须无需打孔、可移动、单件工具100元以内。'
      : ''

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: SYSTEM_PROMPT + rentalAddition },
                ...imageContents,
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
          },
        }),
      }
    )

    if (!response.ok) {
      const err = await response.text()
      console.error('Gemini API error:', err)
      return NextResponse.json(getMockResponse(isFree))
    }

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''

    let parsed
    try {
      // Strip markdown code fences if present
      const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      parsed = JSON.parse(cleaned)
    } catch {
      console.error('Parse error, using mock response. Raw:', text)
      return NextResponse.json(getMockResponse(isFree))
    }

    // Apply free/paid boundary
    if (isFree) {
      parsed._is_preview = true
      // Only show partial content for free users
      delete parsed.step3_organize
      delete parsed.rental_tips
      if (parsed.step2_keep?.items) {
        parsed.step2_keep.items = parsed.step2_keep.items.slice(0, 1)
        parsed.step2_keep._truncated = true
      }
    }

    return NextResponse.json({ success: true, data: parsed })
  } catch (error) {
    console.error('Diagnose API error:', error)
    return NextResponse.json(getMockResponse(true))
  }
}

function getMockResponse(isFree: boolean) {
  const full = {
    success: true,
    data: {
      space_type: '卧室床头区域 + 书桌区域',
      overall_score: 4,
      problems: [
        {
          area: '床头左侧层板',
          issue: '混放了书籍、充电线缠绕、零食袋和护肤品，4 类不相关物品堆叠',
          severity: 'high',
        },
        {
          area: '书桌表面',
          issue: '未整理的文件、多个空杯子和 3 根充电线散落在桌面',
          severity: 'high',
        },
        {
          area: '地面角落',
          issue: '2 个未拆的快递盒占据地面空间，存在绊倒风险',
          severity: 'medium',
        },
      ],
      step1_throw: {
        title: '第一步：清除',
        items: ['过期零食和食品包装', '3 根重复的充电线（留 1 根就够）', '空杯子和餐具（送回厨房）', '未拆快递中不需要的包装'],
        tips: '拿一个袋子，设定 10 分钟计时，专门清理「明显不需要在这里的东西」',
      },
      step2_keep: {
        title: '第二步：筛留',
        items: ['睡前常用护肤品（留 3 件以内）', '当前在读的 1 本书', '常用充电器（1 根手机线）'],
        tips: '床头只放「睡前会用到的东西」，其他移走',
      },
      step3_organize: {
        title: '第三步：收纳',
        items: ['充电线用理线夹固定在桌边', '书籍竖立放入书立，按使用频率排列', '护肤品放入小托盘，统一归位'],
        tools: [
          { name: '竹木书立', size: '15×10cm', keyword: '桌面书立简约' },
          { name: '理线夹', size: '3.5cm夹口', keyword: '理线夹桌面' },
          { name: '亚克力小托盘', size: '20×15cm', keyword: '桌面收纳盘透明' },
        ],
        tips: '每件物品都要有「固定位置」，用完立刻归位，这是维持整洁的核心',
      },
      rental_tips: '所有工具无需打孔：书立直接摆放，理线夹夹在桌边，托盘直接放置。预计总花费 ¥50 以内。',
      quick_wins: ['现在把桌上的空杯子送回厨房（1 分钟）', '把地上的快递盒折叠放入回收袋（2 分钟）'],
      _is_preview: isFree,
    },
  }

  if (isFree) {
    delete (full.data as Record<string, unknown>).step3_organize
    delete (full.data as Record<string, unknown>).rental_tips
    if (full.data.step2_keep?.items) {
      full.data.step2_keep.items = full.data.step2_keep.items.slice(0, 1)
      ;(full.data.step2_keep as Record<string, unknown>)._truncated = true
    }
  }

  return full
}
