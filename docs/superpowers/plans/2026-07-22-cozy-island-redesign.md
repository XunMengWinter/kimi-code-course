# 动森小岛治愈系改版 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把课程官网从深色科技风整体换肤为「动森小岛」明亮奶油绘本风（设计稿 v3 已定稿）。

**Architecture:** 布局、文案数据、路由完全不动，只重做视觉层：`src/index.css` 主题 token 全量替换 + 新增装饰工具类；新增 4 个内联 SVG 装饰组件（`src/components/decor/`）；七个区块逐个换肤。设计规范见 `docs/superpowers/specs/2026-07-22-cozy-island-redesign-design.md`，视觉原型见 `.superpowers/brainstorm/48650-1784711148/content/style-direction-v3.html`。

**Tech Stack:** React 19 + TypeScript + Vite 7 + Tailwind CSS 3.4（`tailwind.config.js`，CommonJS）+ shadcn/ui token 体系 + lucide-react。

## Global Constraints

- 项目**没有测试框架**：每个任务的自动化验证 = `npm run build`（含 `tsc -b`）+ `npm run lint`，两者必须通过
- 禁改：`src/data/course.ts`、`src/components/ui/`、`vite.config.ts`（`base: './'` 必须保留）、路由（必须保持 `path="*"`）、部署脚本
- 提交信息用 Conventional Commits：`style:` / `feat:` / `docs:` / `chore:`
- 所有装饰 SVG 必须带 `aria-hidden="true"`，根元素带 `pointer-events-none`
- **装饰动画 class（`.decor-*`）必须套在内层 `<g>` 上，定位用 `transform` 写在外层 `<g>` 上**——CSS 动画的 transform 会覆盖元素自身的 transform 属性，否则图形会跳到原点
- 对比度：正文/按钮文字 ≥ 4.5:1。`leaf`（#579A6B）/ `leaf-light` / `honey` / `orange` 只用于装饰与大面积色块，**不作小字文字色，也不作小字底色**。唯一例外：Hero 终端窗口内两行风格化文字沿用原型色（`✓` 行 `#4E9463`、`✦` 行 `#E8894B`），属装饰性内容
- 中文排版：数字、英文与中文之间留空格
- 验证用的临时 dev server 用完必须关闭，不得留在后台

---

### Task 1: 主题 token 与工具类（`index.css` 全量替换 + Tailwind 新色）

**Files:**
- Modify: `src/index.css`（全量替换）
- Modify: `tailwind.config.js:7-51`（colors 块内追加 6 个装饰色）

**Interfaces:**
- Consumes: 无（第一个任务）
- Produces:
  - CSS 变量：`--leaf` `--leaf-light` `--honey` `--orange` `--sky` `--sand`（+ 全套 shadcn 标准 token 的亮色系值）
  - Tailwind 色名：`leaf` `leaf-light` `honey` `orange` `sky` `sand`（支持 `/alpha` 修饰，如 `bg-honey/25`）
  - 工具类：`.text-gradient`（新绿→橙渐变）、`.bg-sky`、`.btn-squish`、`.btn-squish-outline`、`.card-soft`、`.spot-title`、`.animate-fade-in`（保留）、`.decor-drift`、`.decor-drift-slow`、`.decor-sway`、`.decor-bob`
  - 根字号 `106.25%`；`--radius: 1.25rem`
  - `.bg-grid` **被删除**（Task 3 移除其唯一使用处）

- [ ] **Step 1: 全量替换 `src/index.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* 动森小岛 · 明亮奶油绘本风 */
    --background: 39 83% 95%; /* 奶油白 #FDF6E9 */
    --foreground: 105 12% 26%; /* 苔绿棕 #3E4A3A（对比度 ≈8.8:1） */
    --card: 44 100% 98%; /* 暖白 #FFFCF4 */
    --card-foreground: 105 12% 26%;
    --popover: 44 100% 98%;
    --popover-foreground: 105 12% 26%;
    --primary: 139 33% 37%; /* 深森林绿 #3F7D53（白字对比度 ≈4.6:1） */
    --primary-foreground: 44 100% 98%;
    --secondary: 42 55% 92%;
    --secondary-foreground: 105 12% 26%;
    --muted: 42 55% 92%;
    --muted-foreground: 45 12% 38%; /* 暖灰棕 #6E6852（对比度 ≈5.2:1） */
    --accent: 42 55% 90%;
    --accent-foreground: 105 12% 26%;
    --destructive: 7 62% 60%; /* 柔和番茄红 #D96A5B */
    --destructive-foreground: 44 100% 98%;
    --border: 42 50% 86%; /* 暖沙 #EDE2C9 */
    --input: 42 50% 86%;
    --ring: 139 33% 37%;
    --radius: 1.25rem;
    /* 装饰色：只用于装饰与大面积色块，不作小字文字/底色 */
    --leaf: 138 28% 47%; /* 森林绿 #579A6B */
    --leaf-light: 132 37% 68%; /* 嫩叶绿 #8FCB9B */
    --honey: 45 86% 72%; /* 蜂蜜黄 #F5D67B */
    --orange: 30 85% 65%; /* 暖橙 #F2A65A */
    --sky: 201 70% 70%; /* 天空蓝 #7FC4E8 */
    --sand: 42 50% 86%; /* 暖沙（与 border 同值） */
    --sidebar-background: 44 100% 98%;
    --sidebar-foreground: 105 12% 26%;
    --sidebar-primary: 139 33% 37%;
    --sidebar-primary-foreground: 44 100% 98%;
    --sidebar-accent: 42 55% 92%;
    --sidebar-accent-foreground: 105 12% 26%;
    --sidebar-border: 42 50% 86%;
    --sidebar-ring: 139 33% 37%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  html {
    scroll-behavior: smooth;
    font-size: 106.25%; /* 17px：全站字级上调一档 */
  }
  body {
    @apply bg-background text-foreground;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  /* 纸张颗粒质感 */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    z-index: 100;
    pointer-events: none;
    opacity: 0.05;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E");
  }
  ::selection {
    @apply bg-primary/20 text-foreground;
  }
}

@layer utilities {
  /* 渐变标题文字（绿 → 嫩绿 → 暖橙） */
  .text-gradient {
    background: linear-gradient(92deg, #4e9463 10%, #7fbe8d 55%, #f2a65a 110%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  /* Hero 天空渐变 */
  .bg-sky {
    background: linear-gradient(180deg, #c9e8f5 0%, #e8f4ec 36%, transparent 64%);
  }

  /* 软糖按钮（动森式压边厚度） */
  .btn-squish {
    box-shadow:
      inset 0 -3px 0 hsl(139 33% 27% / 0.45),
      0 8px 18px hsl(139 33% 37% / 0.28);
  }
  .btn-squish-outline {
    box-shadow: inset 0 -3px 0 hsl(42 40% 80% / 0.6);
  }

  /* 卡片柔光（暖色投影 + 顶部高光） */
  .card-soft {
    box-shadow:
      0 12px 26px hsl(45 30% 55% / 0.14),
      inset 0 2px 0 #fff;
  }

  /* Highlights 标题的蜂蜜色小下划线 */
  .spot-title::after {
    content: '';
    display: block;
    width: 26px;
    height: 4px;
    margin-top: 8px;
    border-radius: 2px;
    background: hsl(var(--honey));
  }

  /* 终端逐行淡入 */
  .animate-fade-in {
    animation: fade-in 0.5s ease-out forwards;
  }

  /* 装饰动画：必须套在内层 <g> 上（定位 transform 放外层 <g>） */
  .decor-drift {
    animation: drift 46s ease-in-out infinite alternate;
  }
  .decor-drift-slow {
    animation: drift 64s ease-in-out infinite alternate-reverse;
  }
  .decor-sway {
    transform-box: fill-box;
    transform-origin: bottom center;
    animation: sway 6s ease-in-out infinite alternate;
  }
  .decor-bob {
    transform-box: fill-box;
    animation: bob 8s ease-in-out infinite;
  }

  /* 细滚动条 */
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: hsl(var(--border));
    border-radius: 8px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: hsl(var(--muted-foreground) / 0.5);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes drift {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(22px);
  }
}

@keyframes sway {
  from {
    transform: rotate(-3deg);
  }
  to {
    transform: rotate(3deg);
  }
}

@keyframes bob {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .decor-drift,
  .decor-drift-slow,
  .decor-sway,
  .decor-bob,
  .animate-fade-in,
  .animate-ping,
  .animate-pulse {
    animation: none;
  }
}
```

- [ ] **Step 2: `tailwind.config.js` colors 块追加装饰色**

在 `sidebar: { ... }` 之后、`colors` 对象收尾前插入（保持现有引号风格）：

```js
        leaf: "hsl(var(--leaf) / <alpha-value>)",
        "leaf-light": "hsl(var(--leaf-light) / <alpha-value>)",
        honey: "hsl(var(--honey) / <alpha-value>)",
        orange: "hsl(var(--orange) / <alpha-value>)",
        sky: "hsl(var(--sky) / <alpha-value>)",
        sand: "hsl(var(--sand) / <alpha-value>)",
```

注意现有 `border`/`primary` 等不带 `<alpha-value>`，新增的 6 个色**必须带**，否则 `bg-honey/25` 这类写法不生效。

- [ ] **Step 3: 验证构建与 lint**

Run: `npm run build && npm run lint`
Expected: 均通过（此刻页面是新旧风格混杂的半成品，属正常，Task 3–5 逐个区块收尾）

- [ ] **Step 4: Commit**

```bash
git add src/index.css tailwind.config.js
git commit -m "style: 动森小岛主题 token 与装饰工具类"
```

---

### Task 2: 绘本风 SVG 装饰组件（4 个新文件）

**Files:**
- Create: `src/components/decor/SkyDecor.tsx`
- Create: `src/components/decor/Landscape.tsx`
- Create: `src/components/decor/SectionDivider.tsx`
- Create: `src/components/decor/SpotIcon.tsx`

**Interfaces:**
- Consumes: Task 1 的 `.decor-drift` / `.decor-drift-slow` / `.decor-sway` / `.decor-bob`
- Produces:
  - `SkyDecor`：`export default function SkyDecor()`，绝对定位铺满父级（父级需 `relative`），太阳/云/闪光/飞鸟
  - `Landscape`：`export default function Landscape()`，文档流内块级 SVG（`w-full h-auto`），远山/草地/小路/果树/花/蝴蝶
  - `SectionDivider`：`export default function SectionDivider({ flip = false }: { flip?: boolean })`，区块间波浪草地带
  - `SpotIcon`：`export default function SpotIcon({ name, className }: { name: SpotIconName; className?: string })`；`export type SpotIconName = 'sprout' | 'wand' | 'house' | 'flag'`

- [ ] **Step 1: 创建 `src/components/decor/SkyDecor.tsx`**

```tsx
export default function SkyDecor() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 800 420"
      preserveAspectRatio="xMidYMin slice"
    >
      <defs>
        <g id="sky-cloud">
          <ellipse cx="0" cy="0" rx="36" ry="15" fill="#fff" stroke="#F0E4CC" strokeWidth="1.5" />
          <ellipse cx="-19" cy="-9" rx="17" ry="13" fill="#fff" />
          <ellipse cx="13" cy="-11" rx="19" ry="14" fill="#fff" />
          <ellipse cx="2" cy="7" rx="31" ry="10" fill="#F3E9D2" opacity=".5" />
        </g>
        <g id="sky-spark">
          <path d="M0,-7 L2,-2 L7,0 L2,2 L0,7 L-2,2 L-7,0 L-2,-2 Z" fill="#F5D67B" />
        </g>
      </defs>

      {/* 太阳（动画套内层 <g>，避免覆盖外层定位 transform） */}
      <g transform="translate(665,64)">
        <g className="decor-bob">
          <circle r="46" fill="#FFE9A8" opacity=".35" />
          <circle r="30" fill="#FFDF8E" />
          <circle r="30" fill="none" stroke="#F5D67B" strokeWidth="2" />
          <g stroke="#F2C84B" strokeWidth="4" strokeLinecap="round">
            <line x1="0" y1="-42" x2="0" y2="-52" />
            <line x1="0" y1="42" x2="0" y2="52" />
            <line x1="-42" y1="0" x2="-52" y2="0" />
            <line x1="42" y1="0" x2="52" y2="0" />
            <line x1="30" y1="-30" x2="37" y2="-37" />
            <line x1="-30" y1="30" x2="-37" y2="37" />
            <line x1="30" y1="30" x2="37" y2="37" />
            <line x1="-30" y1="-30" x2="-37" y2="-37" />
          </g>
        </g>
      </g>

      {/* 云（漂移动画套内层） */}
      <g transform="translate(140,58)">
        <g className="decor-drift">
          <use href="#sky-cloud" />
        </g>
      </g>
      <g transform="translate(400,34) scale(.62)">
        <g className="decor-drift-slow">
          <use href="#sky-cloud" />
        </g>
      </g>
      <g transform="translate(560,120) scale(.5)">
        <g className="decor-drift" style={{ animationDuration: '55s' }}>
          <use href="#sky-cloud" />
        </g>
      </g>

      {/* 闪光 */}
      <use href="#sky-spark" transform="translate(250,96)" />
      <use href="#sky-spark" transform="translate(500,60) scale(.7)" />
      <use href="#sky-spark" transform="translate(90,150) scale(.55)" />

      {/* 飞鸟 */}
      <g fill="none" stroke="#9DB8A4" strokeWidth="2.5" strokeLinecap="round">
        <path d="M285,70 q6,-7 12,0 q6,-7 12,0" />
        <path d="M330,92 q5,-6 10,0 q5,-6 10,0" />
      </g>
    </svg>
  )
}
```

- [ ] **Step 2: 创建 `src/components/decor/Landscape.tsx`**

```tsx
export default function Landscape() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 800 250"
      preserveAspectRatio="xMidYMax slice"
      className="pointer-events-none relative block h-auto w-full"
    >
      <defs>
        <g id="land-tree">
          <rect x="-5" y="-6" width="10" height="34" rx="5" fill="#B08968" />
          <circle cx="-16" cy="-22" r="17" fill="#6FB36B" />
          <circle cx="16" cy="-22" r="17" fill="#6FB36B" />
          <circle cx="0" cy="-34" r="20" fill="#79BC73" />
          <circle cx="-7" cy="-40" r="7" fill="#9BD495" opacity=".85" />
          <circle cx="-14" cy="-24" r="3.2" fill="#F2A65A" />
          <circle cx="12" cy="-30" r="3.2" fill="#F2A65A" />
          <circle cx="2" cy="-18" r="3.2" fill="#F5D67B" />
        </g>
        <g id="land-flower">
          <circle cx="0" cy="-5" r="3.4" fill="#fff" />
          <circle cx="4.8" cy="-1.5" r="3.4" fill="#fff" />
          <circle cx="3" cy="4.2" r="3.4" fill="#fff" />
          <circle cx="-3" cy="4.2" r="3.4" fill="#fff" />
          <circle cx="-4.8" cy="-1.5" r="3.4" fill="#fff" />
          <circle cx="0" cy="0" r="3" fill="#F5D67B" />
        </g>
        <g id="land-tulip">
          <path d="M0,0 C-1,-8 -1,-12 0,-16" stroke="#5FA964" strokeWidth="2" fill="none" />
          <path d="M0,-16 C-6,-16 -7,-24 -4,-27 C-2,-24 2,-24 4,-27 C7,-24 6,-16 0,-16 Z" fill="#F2A65A" />
        </g>
        <g id="land-grass" fill="none" stroke="#5FA964" strokeWidth="2" strokeLinecap="round">
          <path d="M0,0 q1.5,-7 3,0 M5,0 q1.5,-9 3,0 M10,0 q1.5,-6 3,0" />
        </g>
        <g id="land-bfly">
          <ellipse cx="-4" cy="0" rx="4.5" ry="6.5" fill="#F2A65A" transform="rotate(-24)" />
          <ellipse cx="4" cy="0" rx="4.5" ry="6.5" fill="#F5D67B" transform="rotate(24)" />
          <rect x="-1" y="-5" width="2" height="10" rx="1" fill="#8A6F4D" />
        </g>
      </defs>

      {/* 远山两层（山脊带灌木褶边） */}
      <path d="M0,96 Q120,40 260,88 T540,80 T800,92 L800,250 L0,250 Z" fill="#C4E2B0" />
      <path d="M0,96 Q120,40 260,88 T540,80 T800,92" fill="none" stroke="#AED69B" strokeWidth="10" strokeLinecap="round" strokeDasharray="0.5 26" />
      <path d="M0,120 Q160,66 330,112 T660,104 T800,116 L800,250 L0,250 Z" fill="#A6D695" />
      <path d="M0,120 Q160,66 330,112 T660,104 T800,116" fill="none" stroke="#8FC87F" strokeWidth="9" strokeLinecap="round" strokeDasharray="0.5 22" />

      {/* 近处草地 */}
      <path d="M0,158 Q200,116 400,150 T800,146 L800,250 L0,250 Z" fill="#7FC478" />
      <path d="M0,158 Q200,116 400,150 T800,146" fill="none" stroke="#68B061" strokeWidth="5" strokeLinecap="round" strokeDasharray="1 14" />

      {/* 蜿蜒小路 + 卵石 */}
      <path d="M380,250 C360,214 430,202 420,184 C412,168 452,164 470,156" fill="none" stroke="#EDDCB8" strokeWidth="22" strokeLinecap="round" />
      <g fill="#DCC294">
        <circle cx="396" cy="228" r="2.6" />
        <circle cx="414" cy="206" r="2.2" />
        <circle cx="404" cy="188" r="2.6" />
        <circle cx="436" cy="172" r="2.2" />
      </g>

      {/* 果树（轻摆动画套内层，时长错开） */}
      <g transform="translate(120,150) scale(1.15)">
        <g className="decor-sway">
          <use href="#land-tree" />
        </g>
      </g>
      <g transform="translate(668,138) scale(.9)">
        <g className="decor-sway" style={{ animationDuration: '7.5s' }}>
          <use href="#land-tree" />
        </g>
      </g>
      <g transform="translate(588,170) scale(.6)">
        <g className="decor-sway" style={{ animationDuration: '5.2s' }}>
          <use href="#land-tree" />
        </g>
      </g>

      {/* 花与草叶丛 */}
      <use href="#land-flower" transform="translate(210,198)" />
      <use href="#land-flower" transform="translate(262,214) scale(.8)" />
      <use href="#land-flower" transform="translate(640,208) scale(1.1)" />
      <use href="#land-tulip" transform="translate(300,214)" />
      <use href="#land-tulip" transform="translate(560,220) scale(.85)" />
      <use href="#land-grass" transform="translate(170,222)" />
      <use href="#land-grass" transform="translate(480,228) scale(.9)" />
      <use href="#land-grass" transform="translate(700,216) scale(1.1)" />

      {/* 蝴蝶 */}
      <g transform="translate(320,138)">
        <g className="decor-sway" style={{ animationDuration: '4.6s' }}>
          <use href="#land-bfly" />
        </g>
      </g>
      <g transform="translate(548,118) scale(.8) rotate(12)">
        <g className="decor-sway" style={{ animationDuration: '5.8s' }}>
          <use href="#land-bfly" />
        </g>
      </g>
    </svg>
  )
}
```

- [ ] **Step 3: 创建 `src/components/decor/SectionDivider.tsx`**

```tsx
export default function SectionDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative z-0 -my-8 ${flip ? '-scale-x-100' : ''}`}
    >
      <svg viewBox="0 0 800 90" preserveAspectRatio="none" className="block h-16 w-full sm:h-20">
        <path d="M0,40 Q200,4 400,34 T800,30 L800,90 L0,90 Z" fill="#A6D695" opacity=".5" />
        <path d="M0,56 Q200,24 400,52 T800,48 L800,90 L0,90 Z" fill="#7FC478" opacity=".45" />
        <path d="M0,70 Q220,44 420,66 T800,62 L800,90 L0,90 Z" fill="#8FCB9B" opacity=".35" />
      </svg>
    </div>
  )
}
```

- [ ] **Step 4: 创建 `src/components/decor/SpotIcon.tsx`**

```tsx
import type { ReactNode } from 'react'

export type SpotIconName = 'sprout' | 'wand' | 'house' | 'flag'

const icons: Record<SpotIconName, ReactNode> = {
  /* 小盆栽：真正的零基础 */
  sprout: (
    <>
      <path d="M14,34 h28 l-3,14 a4,4 0 0 1 -4,3 h-14 a4,4 0 0 1 -4,-3 Z" fill="#E8987A" />
      <path d="M12,30 h32 v5 h-32 Z" fill="#F0857D" />
      <path d="M28,30 C28,20 24,16 18,14 C20,22 23,26 28,30 Z" fill="#6FB36B" />
      <path d="M28,30 C28,18 33,12 40,11 C39,20 35,26 28,30 Z" fill="#8FCB9B" />
    </>
  ),
  /* 胖云 + 闪光：AI 驱动开发 */
  wand: (
    <>
      <ellipse cx="26" cy="30" rx="16" ry="9" fill="#fff" stroke="#EDE2C9" />
      <ellipse cx="18" cy="25" rx="8" ry="7" fill="#fff" />
      <ellipse cx="32" cy="24" rx="9" ry="8" fill="#fff" />
      <path d="M40,14 l2,4 4,2 -4,2 -2,4 -2,-4 -4,-2 4,-2 Z" fill="#F5D67B" />
      <circle cx="14" cy="14" r="2" fill="#F2A65A" />
    </>
  ),
  /* 小木屋：两个完整项目 */
  house: (
    <>
      <path d="M10,30 L28,14 L46,30 Z" fill="#E8894B" />
      <rect x="14" y="30" width="28" height="18" rx="3" fill="#FFFCF4" stroke="#EDE2C9" />
      <rect x="24" y="36" width="8" height="12" rx="4" fill="#B08968" />
      <circle cx="36" cy="36" r="3" fill="#7FC4E8" />
      <path d="M6,50 h44" stroke="#7FC478" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  /* 山顶小旗：从开发到上线 */
  flag: (
    <>
      <path d="M8,46 Q28,28 48,46 L48,50 L8,50 Z" fill="#7FC478" />
      <line x1="28" y1="16" x2="28" y2="40" stroke="#B08968" strokeWidth="3" strokeLinecap="round" />
      <path d="M28,16 h15 l-4.5,5 4.5,5 h-15 Z" fill="#F2A65A" />
      <circle cx="16" cy="44" r="2.4" fill="#fff" />
      <circle cx="38" cy="46" r="2.4" fill="#F5D67B" />
    </>
  ),
}

export default function SpotIcon({ name, className }: { name: SpotIconName; className?: string }) {
  return (
    <svg viewBox="0 0 56 56" className={className} aria-hidden="true" focusable="false">
      {icons[name]}
    </svg>
  )
}
```

- [ ] **Step 5: 验证构建与 lint**

Run: `npm run build && npm run lint`
Expected: 通过（组件尚未被引用，`tsc` 不检查未引用文件的使用方，属正常）

- [ ] **Step 6: Commit**

```bash
git add src/components/decor/
git commit -m "feat: 绘本风 SVG 装饰组件（天空/风景带/分隔带/手绘图标）"
```

---

### Task 3: Hero 场景化换肤 + Home 插入分隔带

**Files:**
- Modify: `src/sections/Hero.tsx`（全量替换）
- Modify: `src/pages/Home.tsx`（全量替换）

**Interfaces:**
- Consumes: Task 1 的 `.bg-sky` `.btn-squish` `.btn-squish-outline` `.card-soft` `.text-gradient`、Task 2 的 `SkyDecor` `Landscape` `SectionDivider`
- Produces: 无新接口（后续任务只消费 Task 1/2 的接口）

- [ ] **Step 1: 全量替换 `src/sections/Hero.tsx`**

要点：删除 `bg-grid` 和蓝/紫 blur 光晕；天空渐变 + SkyDecor + 底部 Landscape；终端窗口奶油换肤（✓ 行 `#4E9463`、✦ 行 `#E8894B` 为装饰性例外，见 Global Constraints）；按钮加软糖压边。

```tsx
import { ArrowRight, CheckCircle2, Play } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import SkyDecor from '@/components/decor/SkyDecor'
import Landscape from '@/components/decor/Landscape'
import { stats } from '@/data/course'

const terminalLines = [
  { prompt: '$', text: 'kimi', cls: 'text-foreground' },
  { prompt: '✦', text: 'Kimi Code 已就绪，开始编程吧', cls: 'text-[#E8894B]' },
  { prompt: '>', text: '帮我开发一个微信小程序：AI 角色聊天', cls: 'text-foreground' },
  { prompt: '✓', text: '读取 AGENTS.md，理解项目约定', cls: 'text-[#4E9463]' },
  { prompt: '✓', text: 'Plan 模式生成开发计划', cls: 'text-[#4E9463]' },
  { prompt: '✓', text: '创建云函数 chat 并接入 DeepSeek API', cls: 'text-[#4E9463]' },
  { prompt: '✓', text: '生成 API 文档，编译预览成功', cls: 'text-[#4E9463]' },
]

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 sm:pt-40">
      {/* 天空渐变 + 手绘天空装饰 */}
      <div className="pointer-events-none absolute inset-0 bg-sky" />
      <SkyDecor />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-14 pb-16 sm:pb-20 lg:grid-cols-[1.05fr_0.95fr]">
          {/* 左侧文案 */}
          <div>
            <Badge
              variant="outline"
              className="mb-6 gap-1.5 rounded-full border-leaf/40 bg-card/85 px-3.5 py-1.5 text-xs text-primary shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-leaf opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              零基础 · AI 编程实战系列课
            </Badge>

            <h1 className="text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              用 <span className="text-gradient">Kimi Code</span>
              <br />
              零基础开发
              <br />
              微信小程序
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              不需要任何编程经验。从安装 Kimi 到发布上线，
              让 AI 帮你写代码 —— 完成「AI 角色聊天」和「约妆」
              两个真实可上线的小程序项目。
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="btn-squish group rounded-full px-7">
                <a href="#curriculum">
                  查看课程大纲
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="btn-squish-outline rounded-full border-sand bg-card/90 px-7"
              >
                <a href="#projects">
                  <Play className="mr-1 h-4 w-4" />
                  项目实战预览
                </a>
              </Button>
            </div>

            {/* 数据 */}
            <dl className="mt-12 grid max-w-md grid-cols-4 gap-4 border-t border-sand pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="order-2 text-xs text-muted-foreground">{s.label}</dt>
                  <dd className="text-2xl font-bold text-foreground sm:text-3xl">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* 右侧终端窗口（奶油换肤） */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-honey/25 blur-2xl" />
            <div className="card-soft relative overflow-hidden rounded-3xl border border-sand bg-card">
              <div className="flex items-center gap-2 border-b border-sand/70 bg-gradient-to-b from-[#FCF6E8] to-[#F8EED9] px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-[#F0857D] shadow-[inset_0_-2px_0_rgba(0,0,0,0.12)]" />
                <span className="h-3 w-3 rounded-full bg-honey shadow-[inset_0_-2px_0_rgba(0,0,0,0.12)]" />
                <span className="h-3 w-3 rounded-full bg-leaf-light shadow-[inset_0_-2px_0_rgba(0,0,0,0.12)]" />
                <span className="ml-3 rounded-full bg-[#F1E8D4] px-2.5 py-0.5 font-mono text-xs text-muted-foreground">
                  kimi — terminal
                </span>
                <span aria-hidden="true" className="ml-auto text-sm opacity-70">
                  🍃
                </span>
              </div>
              <div className="space-y-3.5 p-5 font-mono text-[13px] leading-relaxed sm:p-6">
                {terminalLines.map((line, i) => (
                  <div
                    key={i}
                    className="animate-fade-in flex gap-2.5 opacity-0"
                    style={{ animationDelay: `${0.35 + i * 0.45}s` }}
                  >
                    <span className="shrink-0 text-muted-foreground">{line.prompt}</span>
                    <span className={line.cls}>{line.text}</span>
                  </div>
                ))}
                <div
                  className="animate-fade-in flex gap-2.5 opacity-0"
                  style={{ animationDelay: `${0.35 + terminalLines.length * 0.45}s` }}
                >
                  <span className="shrink-0 text-muted-foreground">{'>'}</span>
                  <span className="inline-block h-4 w-2 animate-pulse rounded-sm bg-primary" />
                </div>
              </div>
            </div>

            <div className="card-soft absolute -bottom-5 -left-5 hidden items-center gap-2 rounded-2xl border border-sand bg-card px-4 py-3 sm:flex">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <div className="text-xs">
                <p className="font-medium text-foreground">小程序已发布</p>
                <p className="text-muted-foreground">认证 · 备案 · 上线全流程</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部绘本风景带 */}
      <Landscape />
    </section>
  )
}
```

- [ ] **Step 2: 全量替换 `src/pages/Home.tsx`**

分隔带固定三处：Highlights→Curriculum、Curriculum→Projects、Projects→FAQ（第三条 `flip`）。Hero 自带 Landscape，Highlights 前不加。

```tsx
import Navbar from '@/sections/Navbar'
import Hero from '@/sections/Hero'
import Highlights from '@/sections/Highlights'
import Curriculum from '@/sections/Curriculum'
import Projects from '@/sections/Projects'
import FAQ from '@/sections/FAQ'
import Footer from '@/sections/Footer'
import SectionDivider from '@/components/decor/SectionDivider'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <main>
        <Hero />
        <Highlights />
        <SectionDivider />
        <Curriculum />
        <SectionDivider />
        <Projects />
        <SectionDivider flip />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 3: 确认 `bg-grid` 已无任何使用**

Run: `grep -rn "bg-grid" src`
Expected: 无输出（index.css 已在 Task 1 删除定义，Hero 使用处已在 Step 1 移除）

- [ ] **Step 4: 验证构建与 lint**

Run: `npm run build && npm run lint`
Expected: 通过

- [ ] **Step 5: Commit**

```bash
git add src/sections/Hero.tsx src/pages/Home.tsx
git commit -m "feat: Hero 换肤为动森小岛场景，区块间加入风景分隔带"
```

---

### Task 4: Highlights + Curriculum 换肤

**Files:**
- Modify: `src/sections/Highlights.tsx`（全量替换）
- Modify: `src/sections/Curriculum.tsx`（全量替换）

**Interfaces:**
- Consumes: Task 1 的 `.card-soft` `.spot-title`、`sand` `leaf` `honey` 色名；Task 2 的 `SpotIcon` + `SpotIconName`
- Produces: 无新接口

- [ ] **Step 1: 全量替换 `src/sections/Highlights.tsx`**

lucide 线性图标全部换成 `SpotIcon` 手绘插画（无底板）；卡片 `card-soft`；标题加蜂蜜下划线 `.spot-title`。

```tsx
import SpotIcon, { type SpotIconName } from '@/components/decor/SpotIcon'
import { Card, CardContent } from '@/components/ui/card'

const items: { icon: SpotIconName; title: string; desc: string }[] = [
  {
    icon: 'sprout',
    title: '真正的零基础',
    desc: '不需要任何编程经验，从 Kimi 的下载安装讲起，每一步都有完整演示。',
  },
  {
    icon: 'wand',
    title: 'AI 驱动开发',
    desc: '全程用 Kimi Code 写代码：Plan 模式、MCP、Skill、AGENTS.md、goal 模式一个不落。',
  },
  {
    icon: 'house',
    title: '两个完整项目',
    desc: 'AI 角色聊天 + 约妆小程序，覆盖云函数、DeepSeek API、订阅消息等真实场景。',
  },
  {
    icon: 'flag',
    title: '从开发到上线',
    desc: '注册、认证、备案、发布全流程讲解，做出来的不只是一段代码，而是上线的作品。',
  },
]

export default function Highlights() {
  return (
    <section id="highlights" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 font-mono text-sm text-primary">// 为什么是这门课</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            不写一行代码，
            <br className="sm:hidden" />
            也能把想法变成小程序
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <Card
              key={item.title}
              className="card-soft group border-sand bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-honey/30"
            >
              <CardContent className="p-6">
                <SpotIcon
                  name={item.icon}
                  className="mb-5 h-14 w-14 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                />
                <h3 className="spot-title mb-2.5 text-lg font-semibold">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: 全量替换 `src/sections/Curriculum.tsx`**

删除 primary blur 光晕；章节图标保留 lucide（语义功能图标，token 自动换绿）；「陆续更新」徽章换蜂蜜方案；卡片 `card-soft`。

```tsx
import {
  Boxes,
  CalendarDays,
  MessageSquareHeart,
  PlayCircle,
  Smartphone,
  WandSparkles,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { chapters, type Chapter } from '@/data/course'

const iconMap: Record<Chapter['icon'], typeof Boxes> = {
  boxes: Boxes,
  smartphone: Smartphone,
  wand: WandSparkles,
  chat: MessageSquareHeart,
  calendar: CalendarDays,
}

export default function Curriculum() {
  return (
    <section id="curriculum" className="relative py-20 sm:py-24">
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 font-mono text-sm text-primary">// 课程大纲</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">五步走完开发全流程</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            从认识工具、进阶玩法到两个项目实战，每一章都为下一个台阶铺路。
          </p>
        </div>

        <Accordion type="multiple" defaultValue={['ch1', 'ch4']} className="space-y-4">
          {chapters.map((ch) => {
            const Icon = iconMap[ch.icon]
            const lessonCount = ch.lessons.filter((l) => !l.tag || l.tag === '规划中').length
            return (
              <AccordionItem
                key={ch.id}
                value={ch.id}
                className="card-soft overflow-hidden rounded-2xl border border-sand bg-card px-6 transition-colors data-[state=open]:border-leaf/50"
              >
                <AccordionTrigger className="gap-4 py-5 hover:no-underline">
                  <div className="flex flex-1 items-center gap-4 text-left">
                    <span className="hidden font-mono text-sm text-muted-foreground sm:block">
                      {ch.no}
                    </span>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <span className="flex-1">
                      <span className="flex flex-wrap items-center gap-2.5">
                        <span className="text-base font-semibold sm:text-lg">{ch.title}</span>
                        {ch.status === 'updating' && (
                          <Badge className="rounded-full bg-honey/35 text-[hsl(45_40%_32%)] hover:bg-honey/35">
                            陆续更新
                          </Badge>
                        )}
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground sm:text-sm">
                        {ch.subtitle}
                      </span>
                    </span>
                    <span className="hidden shrink-0 font-mono text-xs text-muted-foreground md:block">
                      {lessonCount} 课时
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pb-6">
                  <ol className="ml-0 space-y-1 sm:ml-14">
                    {ch.lessons.map((lesson, i) => (
                      <li
                        key={lesson.title}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted/50"
                      >
                        <span className="w-6 shrink-0 text-right font-mono text-xs text-muted-foreground">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <PlayCircle className="h-4 w-4 shrink-0 text-primary/70" />
                        <span className="flex-1 text-foreground/90">{lesson.title}</span>
                        {lesson.tag && (
                          <Badge
                            variant="outline"
                            className={`rounded-full text-[11px] ${
                              lesson.tag === '番外篇'
                                ? 'border-transparent bg-sky/25 text-[hsl(201_45%_35%)]'
                                : 'border-sand text-muted-foreground'
                            }`}
                          >
                            {lesson.tag}
                          </Badge>
                        )}
                      </li>
                    ))}
                  </ol>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: 验证构建与 lint**

Run: `npm run build && npm run lint`
Expected: 通过

- [ ] **Step 4: Commit**

```bash
git add src/sections/Highlights.tsx src/sections/Curriculum.tsx
git commit -m "style: Highlights 手绘图标化，Curriculum 奶油换肤"
```

---

### Task 5: Projects + FAQ + Footer + Navbar 换肤

**Files:**
- Modify: `src/sections/Projects.tsx`（全量替换）
- Modify: `src/sections/FAQ.tsx`（全量替换）
- Modify: `src/sections/Footer.tsx`（全量替换）
- Modify: `src/sections/Navbar.tsx`（全量替换）

**Interfaces:**
- Consumes: Task 1 的全部 token / 工具类
- Produces: 无新接口

- [ ] **Step 1: 全量替换 `src/sections/Projects.tsx`**

紫色光晕 → 蜂蜜光晕；手机壳奶油化；聊天气泡 / 状态点 / 徽章全部换绿系；`emerald` 全部清除。

```tsx
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { projects, type Project } from '@/data/course'

function ChatMock() {
  return (
    <div className="space-y-3 p-5">
      <div className="flex justify-start">
        <div className="max-w-[75%] rounded-2xl rounded-tl-sm bg-muted px-4 py-2.5 text-xs leading-relaxed text-foreground/90">
          你好，我是你的 AI 角色「小月」，今天想聊点什么？
        </div>
      </div>
      <div className="flex justify-end">
        <div className="max-w-[75%] rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-xs leading-relaxed text-primary-foreground">
          给我讲讲你是怎么被开发出来的？
        </div>
      </div>
      <div className="flex justify-start">
        <div className="max-w-[75%] rounded-2xl rounded-tl-sm bg-muted px-4 py-2.5 text-xs leading-relaxed text-foreground/90">
          我的对话能力来自云函数里的 DeepSeek API，而代码是 Kimi Code 写的哦。
        </div>
      </div>
      <div className="flex items-center gap-2 pt-1">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-leaf" />
        <span className="font-mono text-[10px] text-muted-foreground">
          cloud function · DeepSeek API · 已接入
        </span>
      </div>
    </div>
  )
}

function BookingMock() {
  const days = [
    { d: '周四', n: '18' },
    { d: '周五', n: '19' },
    { d: '周六', n: '20', active: true },
    { d: '周日', n: '21' },
    { d: '周一', n: '22' },
  ]
  const slots = ['10:00', '14:00', '16:00']
  return (
    <div className="space-y-3 p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold">糖心妆造 · 约妆</span>
        <Badge variant="outline" className="border-leaf/50 bg-leaf/10 text-[10px] text-primary">
          免登录
        </Badge>
      </div>
      <div className="grid grid-cols-5 gap-1.5">
        {days.map((day) => (
          <div
            key={day.n}
            className={`rounded-lg border py-2 text-center ${
              day.active
                ? 'border-primary bg-primary/10 text-foreground'
                : 'border-sand bg-muted/50 text-muted-foreground'
            }`}
          >
            <p className="text-[9px]">{day.d}</p>
            <p className="text-xs font-semibold">{day.n}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        {slots.map((t, i) => (
          <span
            key={t}
            className={`rounded-full px-3 py-1.5 text-[10px] ${
              i === 1
                ? 'bg-primary text-primary-foreground'
                : 'border border-sand bg-muted/50 text-muted-foreground'
            }`}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between rounded-xl bg-primary/10 px-3.5 py-2.5">
        <span className="font-mono text-[10px] text-muted-foreground">周六 14:00 · 现场付</span>
        <span className="rounded-full bg-primary px-3 py-1 text-[10px] font-medium text-primary-foreground">
          确认预约
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-leaf" />
        <span className="font-mono text-[10px] text-muted-foreground">
          云开发 · 订阅消息 · 商家管理端
        </span>
      </div>
    </div>
  )
}

function PhoneFrame({ project }: { project: Project }) {
  return (
    <div className="relative mx-auto w-full max-w-[300px]">
      <div className="absolute -inset-3 rounded-[2.5rem] bg-honey/25 blur-xl" />
      <div className="card-soft relative overflow-hidden rounded-[2rem] border border-sand bg-card">
        <div className="flex items-center justify-center border-b border-sand/60 py-2.5">
          <span className="h-1.5 w-16 rounded-full bg-muted-foreground/30" />
        </div>
        {project.mock === 'chat' ? <ChatMock /> : <BookingMock />}
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-20 sm:py-24">
      <div className="pointer-events-none absolute right-[-120px] top-1/4 h-[380px] w-[380px] rounded-full bg-honey/20 blur-[130px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-14 text-center">
          <p className="mb-3 font-mono text-sm text-primary">// 项目实战</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            两个能真正上线的小程序
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            不做玩具 Demo。每个项目都从创建到发布走完完整闭环。
          </p>
        </div>

        <div className="space-y-16">
          {projects.map((p, idx) => (
            <div
              key={p.name}
              className={`grid items-center gap-10 lg:grid-cols-2 ${
                idx % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              <PhoneFrame project={p} />
              <Card className="card-soft border-sand bg-card">
                <CardContent className="p-7 sm:p-9">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="font-mono text-xs tracking-widest text-primary">{p.no}</span>
                    <Badge
                      className={`rounded-full ${
                        p.status === '已开放'
                          ? 'bg-leaf/15 text-primary hover:bg-leaf/15'
                          : 'bg-honey/35 text-[hsl(45_40%_32%)] hover:bg-honey/35'
                      }`}
                    >
                      {p.status}
                    </Badge>
                  </div>
                  <h3 className="mb-4 text-2xl font-bold sm:text-3xl">{p.name}</h3>
                  <p className="mb-6 leading-relaxed text-muted-foreground">{p.desc}</p>
                  <div className="mb-6 flex flex-wrap gap-2">
                    {p.badges.map((b) => (
                      <Badge
                        key={b}
                        variant="outline"
                        className="rounded-full border-leaf/40 bg-leaf/5 px-3 py-1 text-xs text-foreground/80"
                      >
                        {b}
                      </Badge>
                    ))}
                  </div>
                  <p className="font-mono text-sm text-muted-foreground">
                    <span className="text-primary">▸</span> {p.lessons}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: 全量替换 `src/sections/FAQ.tsx`**

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { faqs } from '@/data/course'

export default function FAQ() {
  return (
    <section id="faq" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <p className="mb-3 font-mono text-sm text-primary">// 常见问题</p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">开始之前，你可能想问</h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="card-soft rounded-2xl border border-sand bg-card px-6"
            >
              <AccordionTrigger className="py-5 text-left text-base font-medium hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: 全量替换 `src/sections/Footer.tsx`**

CTA 卡片紫色渐变 → 叶绿/蜂蜜渐变；按钮加软糖压边。

```tsx
import { ArrowRight, Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* CTA */}
      <div className="relative mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-leaf/30 bg-gradient-to-br from-leaf/15 via-card to-honey/25 px-8 py-14 text-center sm:py-16">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-honey/30 blur-[110px]" />
          <h2 className="relative text-3xl font-bold tracking-tight sm:text-4xl">
            现在，就让 Kimi 帮你写第一行代码
          </h2>
          <p className="relative mx-auto mt-4 max-w-lg text-muted-foreground">
            从安装 Kimi 开始，到发布自己的小程序 —— 你缺的不是编程基础，而是开始。
          </p>
          <Button asChild size="lg" className="btn-squish group relative mt-8 rounded-full px-8">
            <a href="#curriculum">
              查看课程大纲
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>

      {/* 底部信息 */}
      <div className="border-t border-sand">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Terminal className="h-4 w-4" strokeWidth={2.2} />
            </span>
            <span className="text-sm font-medium">
              Kimi Code <span className="text-muted-foreground">· 零基础开发小程序</span>
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            用 AI 写代码，把想法变成能上线的小程序 · 课程内容持续更新
          </p>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: 全量替换 `src/sections/Navbar.tsx`**

滚动态换暖白毛玻璃；CTA 加软糖压边；其余结构不变。

```tsx
import { useEffect, useState } from 'react'
import { Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'

const links = [
  { href: '#highlights', label: '课程亮点' },
  { href: '#curriculum', label: '课程大纲' },
  { href: '#projects', label: '项目实战' },
  { href: '#faq', label: '常见问题' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-sand bg-card/85 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Terminal className="h-4 w-4" strokeWidth={2.2} />
          </span>
          <span className="text-sm font-semibold tracking-wide sm:text-base">
            Kimi Code <span className="text-muted-foreground">· 小程序实战课</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <Button asChild size="sm" className="btn-squish rounded-full px-5">
          <a href="#curriculum">开始学习</a>
        </Button>
      </div>
    </header>
  )
}
```

- [ ] **Step 5: 确认深色时代的硬编码颜色已清零**

Run: `grep -rn "emerald\|violet\|amber-\|bg-grid" src --include="*.tsx"`
Expected: 无输出

- [ ] **Step 6: 验证构建与 lint**

Run: `npm run build && npm run lint`
Expected: 通过

- [ ] **Step 7: Commit**

```bash
git add src/sections/Projects.tsx src/sections/FAQ.tsx src/sections/Footer.tsx src/sections/Navbar.tsx
git commit -m "style: Projects/FAQ/Footer/Navbar 奶油绘本换肤"
```

---

### Task 6: 全量验证 + 更新 AGENTS.md 设计约定

**Files:**
- Modify: `AGENTS.md`（「设计约定」小节）

**Interfaces:**
- Consumes: 前 5 个任务的全部产出
- Produces: 无（收尾任务）

- [ ] **Step 1: 完整构建与 lint**

Run: `npm run build && npm run lint`
Expected: 通过

- [ ] **Step 2: dev server 冒烟验证（用完必须关闭）**

```bash
npm run dev -- --port 3111 &
sleep 4
curl -s -o /dev/null -w "%{http_code}" http://localhost:3111/
kill %1
```

Expected: 输出 `200`；随后进程已结束，`lsof -ti:3111` 无输出

- [ ] **Step 3: 目视检查清单（浏览器打开 http://localhost:3111/ 逐项过）**

- Hero：天空渐变 + 太阳/云/飞鸟可见，终端窗口奶油质感，底部风景带完整，云在缓慢漂移
- 根字号放大后：Hero 标题不溢出、Navbar 不挤压 CTA
- 三条 SectionDivider 位置正确（Highlights→Curriculum→Projects→FAQ），无两条风景带相邻
- Highlights 四个手绘图标显示正常，标题有蜂蜜下划线
- 徽章配色：已开放=绿、陆续更新=蜂蜜、规划中=outline
- 模拟 `prefers-reduced-motion`（DevTools → Rendering → Emulate CSS media feature）确认装饰动画静止

- [ ] **Step 4: 更新 `AGENTS.md` 的「设计约定」小节**

将该小节的三条旧约定：

```markdown
- **只有深色主题**，配色定义在 `src/index.css` 的 `:root`（HSL 变量），主色 `221 90% 62%`（Kimi 蓝）
- 自定义工具类：`.text-gradient`（渐变标题）、`.bg-grid`（网格背景）、`.animate-fade-in`（终端逐行淡入）
```

替换为：

```markdown
- **只有亮色主题**（动森小岛绘本风），配色定义在 `src/index.css` 的 `:root`（HSL 变量），主色 `139 33% 37%`（深森林绿）；装饰色 `--leaf` / `--leaf-light` / `--honey` / `--orange` / `--sky` / `--sand` 只用于装饰与大面积色块，不作小字文字/底色（对比度）
- 自定义工具类：`.text-gradient`（绿→橙渐变标题）、`.bg-sky`（Hero 天空渐变）、`.btn-squish` / `.btn-squish-outline`（软糖按钮压边）、`.card-soft`（卡片柔光）、`.spot-title`（蜂蜜下划线）、`.animate-fade-in`（终端逐行淡入）；装饰动画 `.decor-drift` / `.decor-drift-slow` / `.decor-sway` / `.decor-bob`（`prefers-reduced-motion` 下自动关闭，且必须套在内层 `<g>` 上使用）
- SVG 装饰组件在 `src/components/decor/`：`SkyDecor`（Hero 天空）、`Landscape`（Hero 风景带）、`SectionDivider`（区块分隔带，`flip` 可镜像）、`SpotIcon`（手绘小图标，sprout/wand/house/flag）
```

- [ ] **Step 5: Commit**

```bash
git add AGENTS.md
git commit -m "docs: 更新 AGENTS.md 设计约定为动森小岛绘本风"
```
