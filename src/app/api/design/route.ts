import { NextRequest, NextResponse } from 'next/server'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || ''
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash-lite'

const DESIGN_PROMPT = `你是一个极简收纳专家。用户提供了空间信息，请生成定制化的收纳布局方案。

请严格按以下 JSON 格式输出（不要加任何代码块标记）：
{
  "title": "方案标题（如：「日式极简·书桌全攻略」）",
  "summary": "一句话总结这个方案的核心思路",
  "zones": [
    {
      "name": "分区名称（如：最高频区）",
      "description": "这个区域放什么，为什么",
      "items": ["具体物品1", "具体物品2"],
      "frequency": "每天/每周/偶尔"
    }
  ],
  "tools": [
    {
      "name": "工具名称",
      "purpose": "用途",
      "size": "参考尺寸或规格",
      "price_range": "价格区间",
      "keyword": "购买关键词",
      "priority": "必买/推荐/可选"
    }
  ],
  "habits": [
    {
      "title": "习惯标题",
      "action": "具体怎么做",
      "frequency": "频率"
    }
  ],
  "notes": ["注意事项1", "注意事项2"],
  "xianyu_keywords": ["如果需要处理旧物，推荐在闲鱼搜索的关键词1", "关键词2"]
}`

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { spaceType, dimensions, style, budget, requirements } = body

    if (!GEMINI_API_KEY) {
      return NextResponse.json(getMockDesign(spaceType, style, budget))
    }

    const userPrompt = `
用户的空间信息：
- 空间类型：${spaceType}
- 尺寸：${dimensions || '未填写（给通用方案）'}
- 偏好风格：${style}
- 预算：${budget}
- 特殊需求：${requirements?.join('、') || '无'}

请基于以上信息生成定制化收纳方案。
`

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: DESIGN_PROMPT + '\n\n' + userPrompt }] }],
          generationConfig: { temperature: 0.8, maxOutputTokens: 2048 },
        }),
      }
    )

    if (!response.ok) return NextResponse.json(getMockDesign(spaceType, style, budget))

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || ''

    try {
      const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      const parsed = JSON.parse(cleaned)
      return NextResponse.json({ success: true, data: parsed })
    } catch {
      return NextResponse.json(getMockDesign(spaceType, style, budget))
    }
  } catch (error) {
    return NextResponse.json(getMockDesign('书桌', '日式极简', '100-500元'))
  }
}

function getMockDesign(spaceType: string, style: string, budget: string) {
  return {
    success: true,
    data: {
      title: `${style}·${spaceType}收纳全攻略`,
      summary: '以使用频率为核心，将物品分三层放置，保持桌面只有当前正在用的东西。',
      zones: [
        {
          name: '最高频区（触手可及）',
          description: '放置每天必用的物品，摆在最顺手的位置',
          items: ['笔记本电脑', '常用文具（笔/便签）', '鼠标垫+鼠标'],
          frequency: '每天',
        },
        {
          name: '中频区（桌面周边）',
          description: '每周使用的物品，可存放在抽屉或置物架第一层',
          items: ['文件夹/资料', '充电器', '笔记本'],
          frequency: '每周',
        },
        {
          name: '低频区（深处存储）',
          description: '偶尔才用的物品，放在抽屉深处或收纳盒内',
          items: ['备用电池', '不常用配件', '备用文具'],
          frequency: '偶尔',
        },
      ],
      tools: [
        { name: '竹木桌面书立', purpose: '竖立收纳书籍和文件夹', size: '15×10cm', price_range: '¥15–30', keyword: '桌面书立简约竹木', priority: '必买' },
        { name: '亚克力理线盒', purpose: '整理充电线和数据线', size: '20×10cm', price_range: '¥20–40', keyword: '桌面理线盒透明', priority: '必买' },
        { name: '小号收纳托盘', purpose: '集中存放零散小物', size: '25×15cm', price_range: '¥15–25', keyword: '桌面收纳托盘木质', priority: '推荐' },
        { name: '抽屉分隔板', purpose: '分隔抽屉内各类物品', size: '按抽屉尺寸', price_range: '¥10–20', keyword: '抽屉分隔板可调节', priority: '推荐' },
      ],
      habits: [
        { title: '桌面清零习惯', action: '每天离开前花 2 分钟把桌面归位，只留明天早上要用的东西', frequency: '每天' },
        { title: '周一小扫除', action: '每周一花 5 分钟检查抽屉，把用完的东西补充，把不需要的移走', frequency: '每周' },
      ],
      notes: [
        '先清空所有物品再重新规划，不要在乱的基础上整理',
        `${budget === '100元以内' ? '建议先买最高频区的工具，其他后续补充' : '一次性买齐所有工具，避免反复物流'}`,
      ],
      xianyu_keywords: ['旧书桌', '二手书立', '收纳盒'],
    },
  }
}
