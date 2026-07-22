# AGENTS.md

> 本文件面向 AI 编程助手（Kimi Code 等），描述项目结构、约定与常见坑。
> 本项目本身也是《Kimi Code 零基础开发小程序》课程中「AGENTS.md 介绍」一课的实例。

## 项目概述

《Kimi Code 零基础开发小程序》系列课程的官网，单页应用（SPA）。
展示课程亮点、五章课程大纲、两个项目实战（AI 角色聊天 / 约妆小程序）、FAQ。

- 线上地址：<https://kimi-code-course.pages.dev>
- 源码仓库：<https://github.com/XunMengWinter/kimi-code-course>（仅作代码备份，不参与部署）

## 技术栈

- React 19 + TypeScript + Vite 7
- Tailwind CSS 3.4 + shadcn/ui（组件在 `src/components/ui/`，40+ 个，未全部使用）
- 图标：lucide-react
- 路由：react-router（仅一条通配路由）
- 部署：Cloudflare Pages，wrangler 直传（不经过 Git 集成）

## 常用命令

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 开发服务器，端口 3000（若冲突用 `-- --port <N>`） |
| `npm run build` | 类型检查 + 生产构建，输出 `dist/` |
| `npm run preview` | 本地预览构建产物 |
| `npm run lint` | ESLint 检查 |
| `npm run deploy` | 构建并直传部署到 Cloudflare Pages |

## 目录结构

```
src/
├── data/course.ts        # ⭐ 全部课程内容数据（章节/课时/项目/FAQ/统计）
├── sections/             # 页面区块：Navbar / Hero / Highlights / Curriculum / Projects / FAQ / Footer
├── pages/Home.tsx        # 唯一页面，组合所有区块
├── components/ui/        # shadcn/ui 组件库（一般不要改）
├── index.css             # 主题 token（:root CSS 变量）+ 自定义工具类
└── App.tsx               # 路由：<Route path="*" element={<Home />} />
```

## 内容维护指南（高频任务）

**改课程内容 = 只改 `src/data/course.ts`，不要动组件。**

- 章节/课时：`chapters` 数组；`status: 'updating'` 会显示「陆续更新」徽章；课时 `tag` 显示小标签（如「规划中」「番外篇」）
- 项目卡片：`projects` 数组；`mock: 'chat' | 'booking'` 对应两种手机样机
- FAQ：`faqs` 数组
- 首页统计数字：`stats` 数组

## 设计约定

- **只有亮色主题**（动森小岛绘本风），配色定义在 `src/index.css` 的 `:root`（HSL 变量），主色 `139 33% 37%`（深森林绿）；装饰色 `--leaf` / `--leaf-light` / `--honey` / `--orange` / `--sky` / `--sand` 只用于装饰与大面积色块，不作小字文字/底色（对比度）
- 自定义工具类：`.text-gradient`（绿→橙渐变标题）、`.bg-sky`（Hero 天空渐变）、`.btn-squish` / `.btn-squish-outline`（软糖按钮压边）、`.card-soft`（卡片柔光）、`.spot-title`（蜂蜜下划线）、`.animate-fade-in`（终端逐行淡入）；装饰动画 `.decor-drift` / `.decor-drift-slow` / `.decor-sway` / `.decor-bob`（`prefers-reduced-motion` 下自动关闭，且必须套在内层 `<g>` 上使用）
- SVG 装饰组件在 `src/components/decor/`：`SkyDecor`（Hero 天空）、`Landscape`（Hero 风景带）、`SectionDivider`（区块分隔带，`flip` 可镜像）、`SpotIcon`（手绘小图标，sprout/wand/house/flag）
- 页面内导航用锚点（`#curriculum` 等），`html` 已开 `scroll-behavior: smooth`
- 不要用 Tailwind 不存在的间距值（如 `h-4.5`），不会报错但会静默失效
- 中文排版：数字、英文与中文之间留空格

## 部署

```bash
npm run deploy   # = npm run build && wrangler pages deploy dist --project-name=kimi-code-course --branch=main
```

- wrangler 登录态存在本机 `~/.wrangler`，过期则执行 `npx wrangler login` 重新授权
- 生产分支：`main`；每次部署生成 `https://<hash>.kimi-code-course.pages.dev`，生产别名是 `kimi-code-course.pages.dev`

## 已知坑（踩过，别再踩）

1. **必须保留 `vite.config.ts` 里的 `base: './'`**——站点会部署到子路径（如 GitHub Pages 的 `/repo/`），绝对路径会导致资源 404
2. **路由必须是 `path="*"`**——用 `path="/"` 时部署到子路径会出现 `No routes matched` 白屏
3. `dist/` 不入库；它是纯构建产物，部署时现构建
4. `.wrangler/` 是本地状态目录，不入库
5. 在本仓库做 git 分支操作要小心：`git rm -rf .` 会连带删掉 `.gitignore`，导致 `node_modules` 被误提交；恢复方法 `rm -rf node_modules && npm install`
6. `tsc -b` 会生成 `*.tsbuildinfo`，已加入 `.gitignore`

## Git 规范

- 提交信息用 Conventional Commits：`feat:` / `fix:` / `docs:` / `build:` / `chore:` / `style:`
- 只提交源码与文档；`dist/`、`node_modules/`、`.wrangler/` 一律不进版本库
- 远端：`origin` → GitHub（备份用，部署不经过它）
