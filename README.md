# Kimi Code 零基础开发小程序 · 课程官网

《Kimi Code 零基础开发小程序》系列课程的官方网站。

🌐 **线上地址**：<https://kimi-code-course.pages.dev>

## 功能

- 课程亮点展示
- 五章完整课程大纲（手风琴交互）
  1. 认识 Kimi 全家桶（5 课时）
  2. 微信小程序基础（3 课时）
  3. Kimi Code 进阶玩法（5 课时）
  4. 项目实战一 · AI 角色聊天小程序（13 课时）
  5. 项目实战二 · 约妆小程序（10 节主线 + 1 节支付番外）
- 项目实战展示（聊天 / 约妆日历手机样机）
- 常见问题 FAQ

## 技术栈

React 19 · TypeScript · Vite 7 · Tailwind CSS 3.4 · shadcn/ui · lucide-react · Cloudflare Pages

## 快速开始

```bash
npm install       # 安装依赖
npm run dev       # 开发服务器 http://localhost:3000
npm run build     # 生产构建 → dist/
npm run preview   # 本地预览构建产物
npm run deploy    # 构建并部署到 Cloudflare Pages
```

> 首次部署需先 `npx wrangler login` 完成 Cloudflare 授权（浏览器点一次 Allow）。

## 目录结构

```
├── index.html              # 入口 HTML
├── vite.config.ts          # Vite 配置（base: './'，勿删）
├── src/
│   ├── data/course.ts      # ⭐ 课程内容数据（章节/课时/项目/FAQ）
│   ├── sections/           # 页面区块组件（Hero/Curriculum/Projects/...）
│   ├── pages/Home.tsx      # 页面组装
│   ├── components/ui/      # shadcn/ui 组件
│   └── index.css           # 深色主题 token + 自定义工具类
├── AGENTS.md               # AI 编程助手指南（含约定与踩坑记录）
└── dist/                   # 构建产物（不入库）
```

## 更新课程内容

课程内容全部集中在 [`src/data/course.ts`](src/data/course.ts)，修改后：

```bash
npm run deploy
```

详见 [AGENTS.md](AGENTS.md) 的「内容维护指南」。

## 部署

- 托管：Cloudflare Pages（项目名 `kimi-code-course`）
- 方式：wrangler 直传 `dist/`，生产分支 `main`
- GitHub 仓库仅作源码备份，不参与部署链路
