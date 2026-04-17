# MinimaLife — AI 极简生活管家

上传一张房间照片，AI 帮你分析杂乱点，生成可立即执行的三步整理方案。

## 功能

- **AI 空间诊断** — 上传 1-4 张照片，Gemini 多模态模型逐区域识别具体杂乱点，生成「扔/留/收」三步方案
- **个性化收纳设计** — 填写空间类型和偏好，AI 生成定制化布局方案 + 低成本工具清单（含淘宝关键词）
- **购物欲拦截器** — AI 三问追问理性分析，输出购买评分和冷静期建议
- **14 天断舍离挑战** — 每日一个小任务，AI 打卡督促，14 天养成整理习惯

## 快速开始

```bash
# 安装依赖
npm install

# 本地开发
npm run dev
```

访问 http://localhost:3000

## 配置 AI Key（可选）

复制环境变量模板：

```bash
cp .env.local.example .env.local
```

填入你的 Gemini API Key（免费获取：https://aistudio.google.com/app/apikey）

不填 Key 时系统会自动降级到 Mock 数据，可完整体验所有页面逻辑。

## 技术栈

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Gemini API
- Lucide Icons
