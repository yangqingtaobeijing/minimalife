import { NextRequest, NextResponse } from 'next/server'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || ''
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash-lite'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { item, price, answers, stage } = body

    if (stage === 'question') {
      // Return next question based on answers so far
      const questions = [
        { id: 1, text: `家里有没有类似"${item}"的东西？` },
        { id: 2, text: `买来之后，大概多久会用一次？` },
        { id: 3, text: `打算放在哪里？现在那个位置有空间吗？` },
      ]
      const nextQ = questions[answers?.length || 0]
      return NextResponse.json({ success: true, question: nextQ })
    }

    if (stage === 'verdict') {
      if (!GEMINI_API_KEY) {
        return NextResponse.json(getMockVerdict(item, price, answers))
      }

      const prompt = `你是一个极简生活顾问，帮助用户理性购物决策。
用户想买：${item}${price ? `，价格 ${price} 元` : ''}
用户的回答：
1. 家里有没有类似的：${answers[0]}
2. 使用频率：${answers[1]}
3. 放置位置：${answers[2]}

请输出 JSON（不要代码块）：
{
  "score": 1-10的理性购买评分数字（1=完全不建议，10=非常有必要），
  "verdict": "买" 或 "冷静期再看" 或 "不建议",
  "reason": "简短一句话理由（直接、不废话，带数据/事实支撑）",
  "detail": "稍微详细的分析（2-3句话）",
  "alternative": "替代建议（如有）",
  "cooldown_days": 建议冷静几天再看（3/7/14），数字
}`

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.6, maxOutputTokens: 512 },
          }),
        }
      )

      if (!response.ok) return NextResponse.json(getMockVerdict(item, price, answers))

      const data = await response.json()
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
      try {
        const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
        return NextResponse.json({ success: true, data: JSON.parse(cleaned) })
      } catch {
        return NextResponse.json(getMockVerdict(item, price, answers))
      }
    }

    return NextResponse.json({ error: 'Invalid stage' }, { status: 400 })
  } catch (error) {
    return NextResponse.json(getMockVerdict('商品', '', []))
  }
}

function getMockVerdict(item: string, price: string, answers: string[]) {
  const hasSimiiar = answers[0]?.includes('有') || answers[0]?.includes('类似')
  const score = hasSimiiar ? 3 : 6

  return {
    success: true,
    data: {
      score,
      verdict: score <= 4 ? '不建议' : score <= 6 ? '冷静期再看' : '买',
      reason: hasSimiiar
        ? `你已经有类似的东西了，再买会增加收纳负担`
        : `使用频率和存放空间都合理，但建议先冷静 7 天再决定`,
      detail: hasSimiiar
        ? `极简原则：同类物品不超过必要数量。先把现有的用坏再买，或者确认这个确实比现有的好 3 倍以上再入手。`
        : `这个购买决策本身没有大问题，但冲动消费往往在 7 天后就后悔了。如果 7 天后还记得想买，说明是真需求。`,
      alternative: hasSimiiar ? `试试先把旧的修一修，或者挂到闲鱼换个新的` : `先收藏等大促，不必今天就买`,
      cooldown_days: hasSimiiar ? 14 : 7,
    },
  }
}
