# 动森小岛 · 治愈系改版设计文档

> 日期：2026-07-22 · 状态：已定稿（可视化伴侣 v3 稿经用户确认）
> 视觉原型：`.superpowers/brainstorm/48650-1784711148/content/style-direction-v3.html`

## 1. 背景与目标

课程官网（kimi-code-course）目前是深色科技风（Kimi 蓝 + 网格 + 终端光晕）。
用户希望换成「动物森友会 / 光遇」式的明亮治愈绘本风。

目标：布局结构、文案数据、路由完全不变，只重做视觉层——
配色、质感、装饰、图标、字级，让页面像「翻开一本小岛绘本」。

## 2. 范围

**做：**

- `src/index.css` 主题 token 全量换成明亮奶油色系，新增装饰色 token
- 新增内联 SVG 装饰组件（`src/components/decor/`）：天空、风景、分隔带、手绘图标
- 七个区块（Navbar / Hero / Highlights / Curriculum / Projects / FAQ / Footer）换肤
- 字级整体上调约 6%，卡片/按钮质感升级（软糖压边、顶部高光、纸张颗粒）
- 装饰性动效（云朵漂移、树叶轻摆），含 `prefers-reduced-motion` 兜底
- 更新 `AGENTS.md` 的「设计约定」段落（「只有深色主题」等描述将过时）

**不做：**

- 不改 `src/data/course.ts` 任何课程内容数据
- 不改路由、不改 `src/components/ui/` 组件库源码（换肤通过 token 与调用处 className 完成）
- 不引入图片资源 / 字体文件（全部内联 SVG + 系统字体）
- 不引入 AI 生成位图（用户已在 v2 选项中确认走纯 SVG 路线）
- 不动部署配置（`vite.config.ts` 的 `base: './'`、`wrangler` 流程保持原样）

## 3. 设计系统

### 3.1 调色板（`src/index.css` `:root` 全量替换）

| 角色 | 色值 | HSL token | 用途 |
| --- | --- | --- | --- |
| 奶油白 | `#FDF6E9` | `39 83% 95%` | `--background` 页面底 |
| 暖白 | `#FFFCF4` | `44 100% 98%` | `--card` / `--popover` / 按钮文字 |
| 苔绿棕 | `#3E4A3A` | `105 12% 26%` | `--foreground` 正文（对比度 ≈ 8.8:1） |
| 深森林绿 | `#3F7D53` | `139 33% 37%` | `--primary` 按钮/链接/强调（白字对比度 ≈ 4.6:1，过 AA） |
| 森林绿 | `#579A6B` | `138 28% 47%` | 装饰/大面积色块（新增 token `--leaf`，不作小字底色） |
| 嫩叶绿 | `#8FCB9B` | `132 37% 68%` | 辅助装饰（新增 `--leaf-light`） |
| 暖橙 | `#F2A65A` | `30 85% 65%` | 点缀（新增 `--orange`）：✦ 提示符、果实、渐变末端 |
| 蜂蜜黄 | `#F5D67B` | `45 86% 72%` | 装饰（新增 `--honey`）：太阳、闪光、卡片下划线 |
| 天空蓝 | `#7FC4E8` | `201 70% 70%` | 信息色（新增 `--sky`）：「番外篇」等 tag |
| 暖沙 | `#EDE2C9` | `42 50% 86%` | `--border` / `--input` 描边 |
| 暖灰棕 | `#6E6852` | `45 12% 38%` | `--muted-foreground`（对比度 ≈ 5.2:1；原 #7A7462 仅 4.4:1，刻意调深） |
| 米白 | `42 55% 92%` | — | `--muted` / `--secondary` 浅底 |
| 柔和番茄红 | `#D96A5B` | `7 62% 60%` | `--destructive`（比纯红更融入绘本） |

- `--ring` = 深森林绿；`--radius` 从 `0.75rem` 提到 **`1.25rem`**
- sidebar 系列 token 同步换成同色系（站点未用 sidebar，但保持 token 完整）
- `tailwind.config.ts` 的 `colors` 扩展需登记新 token：`leaf` / `leaf-light` / `honey` / `orange` / `sky` / `sand`（映射到对应 CSS 变量）

### 3.2 字级阶梯

- `html { font-size: 106.25% }`（16 → 17px），全站 rem 尺寸统一放大 ≈ 6.25%，对应用户确认的「文字稍微大一点」
- 各区块现有 Tailwind 字级类名（`text-sm` / `text-3xl` 等）保持不变，靠根字号放大生效
- 验证点：放大后 Hero 标题在 `lg` 断点不换行溢出、Navbar 不挤占 CTA

### 3.3 质感

- **纸张颗粒**：`body::before` 固定层叠 `feTurbulence` 噪点 data-URI，透明度 0.05，`pointer-events: none`，直接写在 `@layer base`，不做成工具类
- **软糖按钮**：新工具类 `.btn-squish`——`box-shadow: inset 0 -3px 0 hsl(139 33% 27% / .45), 0 8px 18px hsl(139 33% 37% / .28)`；应用在 Hero 双按钮、Navbar CTA、Footer CTA（outline 变体压边用暖沙色）
- **卡片高光**：新工具类 `.card-soft`——`box-shadow: 0 12px 26px hsl(45 30% 55% / .14), inset 0 2px 0 #fff`，配 `border-sand` 用于 Highlights / Projects / Curriculum / FAQ 卡片
- **渐变标题**：`.text-gradient` 改为 `linear-gradient(92deg, #4E9463 10%, #7FBE8D 55%, #F2A65A 110%)`
- **删除**：`.bg-grid` 工具类及其在 Hero 的使用；所有蓝/紫色 `blur` 光晕

### 3.4 状态徽章配色（亮底适配）

| 语义 | 现状（深色） | 新配色 |
| --- | --- | --- |
| 已开放 / 已完成 ✓ | `bg-emerald-500/15 text-emerald-400` | `bg-leaf/15 text-primary` |
| 陆续更新 / 进行中 | `bg-amber-500/15 text-amber-400` | `bg-honey/35 text-[45 40% 32%]`（蜂蜜底棕字） |
| 番外篇 / 信息 | — | `bg-sky/25 text-[201 45% 35%]` |
| 规划中 | outline | `border-sand text-muted-foreground` 保持 outline |

## 4. SVG 装饰组件（新建 `src/components/decor/`）

全部内联 SVG、`aria-hidden="true"`、`pointer-events-none`，无第三方依赖。
图形元素以 v3 原型为准：太阳（光晕+8 射线）、胖云（带暖沙描边+底部阴影）、闪光 ✦、
飞鸟、远山两层（山脊灌木褶边）、近草地、蜿蜒小路+卵石、圆冠果树（橙子/柠檬果实）、
雏菊/郁金香/草叶丛、蝴蝶。

| 组件 | 内容 | 用途 |
| --- | --- | --- |
| `SkyDecor.tsx` | 太阳 + 3 朵云 + 闪光 + 飞鸟，绝对定位铺满 | Hero 天空层 |
| `Landscape.tsx` | 远山→草地→小路→树花蝴蝶的完整风景带（`viewBox 0 0 800 250`，`preserveAspectRatio="xMidYMax slice"`） | Hero 底部 |
| `SectionDivider.tsx` | 简化版波浪草地带（无树或 1 棵树），`props: { flip?: boolean }` 控制镜像 | 区块之间过渡 |
| `SpotIcon.tsx` | 4 个手绘小插画：`sprout`（小盆栽）/ `wand`（胖云+闪光）/ `house`（小木屋）/ `flag`（山顶小旗），`props: { name, className }` | Highlights 四张卡片 |

动效（定义在 `index.css`）：

- `@keyframes drift`：云朵横向 20px 内缓慢漂移，40–70s `ease-in-out infinite alternate`，三朵云错开时长
- `@keyframes sway`：树/花/蝴蝶 ±3° 轻摆，5–7s `ease-in-out infinite alternate`，`transform-origin` 底部
- `@keyframes bob`：太阳光晕 8s 呼吸
- `@media (prefers-reduced-motion: reduce)`：以上动画与终端 `animate-pulse` 光标全部 `animation: none`

## 5. 各区块改造要点

### Navbar

- 滚动态：`bg-background/85` → `bg-[#FFFCF4]/85 border-sand`，毛玻璃保留
- logo 方块保持 `bg-primary`（新深绿）+ 白 Terminal 图标；CTA 按钮加 `btn-squish`

### Hero

- 删除 `bg-grid` 与两处蓝/紫 blur 光晕
- 背景：天空渐变（`linear-gradient(180deg,#C9E8F5 0%,#E8F4EC 36%,transparent 64%)`，用内联 style 或新工具类 `.bg-sky`）+ `<SkyDecor />` + 底部 `<Landscape />`
- 徽章：`border-primary/40 bg-primary/10 text-primary` → `border-leaf/40 bg-card/85 text-primary`（带柔和投影）
- 标题 `.text-gradient` 走新渐变；副文案 `text-muted-foreground`（新暖灰棕）
- 终端窗口「奶油换肤」：外壳 `bg-card border-sand rounded-3xl card-soft`；标题栏蜂蜜渐变底 + 胶囊 `kimi — terminal`；红绿灯不变；`✓` 行 `text-emerald-400` → `text-[#4E9463]`；`✦` 行 `text-primary` → 暖橙；光标方块 `bg-primary`；右上角贴 🍃 小叶子
- 悬浮小卡「小程序已发布」：`CheckCircle2` 换 `text-primary`，外壳同步 card-soft
- stats 分隔线 `border-border/60` → `border-sand`

### Highlights

- 4 张卡片：`border-border/60 bg-card/60` → `border-sand bg-card card-soft`，hover 上浮保留、阴影换暖色
- 图标位：lucide 线性图标 + 方形底板 → `<SpotIcon>` 手绘插画（无底板，56px）：真正的零基础=`sprout`、AI 驱动开发=`wand`、两个完整项目=`house`、从开发到上线=`flag`
- 标题下加蜂蜜色小下划线（`::after` 26×4px 圆角条，写在区块 scoped 类 `.spot-title`）

### Curriculum

- 删除左侧 primary blur 光晕
- 章节图标保留 lucide（语义功能图标），底板 `bg-primary/10 text-primary` 不变（token 自动换绿）
- 章节卡片：`border-sand bg-card card-soft`，open 态 `border-leaf/50`
- 「陆续更新」徽章按 §3.4 蜂蜜方案；课时 tag 保持 outline 换 `border-sand`
- 课时行 hover `hover:bg-muted/50` 保持（muted 已是米白）

### Projects

- 紫色 blur 光晕 → 蜂蜜色光晕（`bg-honey/20`）
- 手机样机：外壳 `border-sand bg-card` + 暖色投影（替换 `shadow-2xl` 与 `bg-primary/10 blur` 底光为 `bg-honey/25 blur-xl`）
- ChatMock：对方气泡 `bg-muted`（米白）；自己气泡 `bg-primary text-primary-foreground`（新深绿）；状态点 `bg-emerald-400` → `bg-leaf`
- BookingMock：选中日期 `border-primary bg-primary/10`；确认按钮 `bg-primary`；「免登录」徽章 → `bg-leaf/15 text-primary`
- 项目状态徽章按 §3.4；课时数行 `▸` 保持 `text-primary`

### FAQ

- 卡片 `border-sand bg-card card-soft`；其余不变（token 自动生效）

### Footer

- CTA 卡片：`from-primary/15 via-card to-violet-500/10` → `from-leaf/15 via-card to-honey/25`，`border-primary/25` → `border-leaf/30`，光晕 `bg-primary/20` → `bg-honey/30`
- CTA 按钮加 `btn-squish`
- 底部信息条 `border-border/60` → `border-sand`

### Home（`src/pages/Home.tsx`）

- 分隔带固定放在三处：Highlights → Curriculum 之间、Curriculum → Projects 之间、Projects → FAQ 之间（第三条用 `flip` 镜像，避免重复感）
- Hero 底部的完整 Landscape 已承担 Hero → Highlights 的过渡，Highlights 之前**不再**加分隔带，避免两条风景带相邻

## 6. 可访问性

- 正文/次级文字对比度均 ≥ 4.5:1（§3.1 已标注，muted 刻意调深就是为过 AA）
- 装饰绿 `#579A6B` / 嫩叶绿 / 蜂蜜黄**只用于装饰与大面积色块**，不作小字号文字或其底色
- 所有装饰 SVG `aria-hidden`，不影响读屏
- focus ring 使用深森林绿，亮底下依然清晰
- `prefers-reduced-motion` 下装饰动画全部关闭

## 7. 验证

1. `npm run build`（含 `tsc -b`）与 `npm run lint` 通过
2. `npm run dev` 目视检查七个区块与响应式（重点：根字号放大后 Hero/Navbar 布局）
3. 对比度抽查：正文、muted 文字、主按钮白字（标准：AA 4.5:1）
4. `prefers-reduced-motion` 模拟（DevTools Rendering 面板）确认动画静止

## 8. 已知坑（实施时遵守，来自 AGENTS.md）

- 保留 `vite.config.ts` 的 `base: './'`；路由保持 `path="*"`
- Tailwind 不存在的间距值会静默失效，自定义尺寸一律走 arbitrary value 或工具类
- 中文排版：数字、英文与中文之间留空格
