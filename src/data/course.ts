export interface Lesson {
  title: string
  tag?: string
}

export interface Chapter {
  id: string
  no: string
  title: string
  subtitle: string
  icon: 'boxes' | 'smartphone' | 'wand' | 'chat' | 'shop'
  status: 'open' | 'updating'
  lessons: Lesson[]
}

export const chapters: Chapter[] = [
  {
    id: 'ch1',
    no: '01',
    title: '认识 Kimi 全家桶',
    subtitle: '工欲善其事，必先利其器 —— 装好你的 AI 编程伙伴',
    icon: 'boxes',
    status: 'open',
    lessons: [
      { title: 'Kimi 下载与安装' },
      { title: 'Kimi CLI 安装与使用' },
      { title: 'Kimi Web 的使用' },
      { title: 'Kimi Code for VSCode' },
      { title: 'Kimi Work（桌面版）' },
    ],
  },
  {
    id: 'ch2',
    no: '02',
    title: '微信小程序基础',
    subtitle: '从零跑通小程序开发环境',
    icon: 'smartphone',
    status: 'open',
    lessons: [
      { title: '微信开发者工具安装' },
      { title: '微信小程序注册' },
      { title: '小程序项目介绍' },
    ],
  },
  {
    id: 'ch3',
    no: '03',
    title: 'Kimi Code 进阶玩法',
    subtitle: '让 AI 真正听懂你的需求',
    icon: 'wand',
    status: 'open',
    lessons: [
      { title: 'Plan 模式' },
      { title: 'MCP 的接入' },
      { title: 'Skill 的使用' },
      { title: 'AGENTS.md 介绍' },
      { title: 'goal 模式' },
    ],
  },
  {
    id: 'ch4',
    no: '04',
    title: '项目实战一 · AI 角色聊天小程序',
    subtitle: '从云函数到发布上线的完整闭环',
    icon: 'chat',
    status: 'open',
    lessons: [
      { title: '创建 AI 角色聊天项目' },
      { title: '注册小程序' },
      { title: '完成 AGENTS.md' },
      { title: 'Kimi 开发' },
      { title: '创建云函数' },
      { title: 'Kimi 开发云函数' },
      { title: '接入 DeepSeek API' },
      { title: '完成 / 测试云函数' },
      { title: '生成 API 文档' },
      { title: '接入云端 API' },
      { title: '测试小程序' },
      { title: '小程序认证 & 备案' },
      { title: '发布小程序' },
    ],
  },
  {
    id: 'ch5',
    no: '05',
    title: '项目实战二 · 商城小程序',
    subtitle: '微信云开发 · 免登录 · 支持微信支付',
    icon: 'shop',
    status: 'updating',
    lessons: [
      { title: '微信云开发快速上手', tag: '规划中' },
      { title: '免登录用户体系', tag: '规划中' },
      { title: '微信支付接入', tag: '规划中' },
      { title: '更多章节陆续公布', tag: '敬请期待' },
    ],
  },
]

export interface Project {
  no: string
  name: string
  desc: string
  badges: string[]
  lessons: string
  status: string
  mock: 'chat' | 'shop'
}

export const projects: Project[] = [
  {
    no: 'PROJECT 01',
    name: 'AI 角色聊天小程序',
    desc: '从零创建一个能真正上线的 AI 聊天小程序：Kimi Code 生成前端页面与云函数，接入 DeepSeek API，自动生成 API 文档，最后完成认证、备案与发布。',
    badges: ['微信云函数', 'DeepSeek API', 'AGENTS.md', 'API 文档', '认证备案'],
    lessons: '13 课时完整实战',
    status: '已开放',
    mock: 'chat',
  },
  {
    no: 'PROJECT 02',
    name: '商城小程序',
    desc: '基于微信云开发商用级商城：免登录用户体系、商品与订单管理、微信支付接入，云端一体，无需自建服务器。',
    badges: ['微信云开发', '免登录', '微信支付', '云数据库'],
    lessons: '章节陆续更新',
    status: '更新中',
    mock: 'shop',
  },
]

export interface Faq {
  q: string
  a: string
}

export const faqs: Faq[] = [
  {
    q: '完全没有编程基础，可以学吗？',
    a: '可以。课程从 Kimi 的下载安装讲起，代码主要由 Kimi Code 生成。你要学的核心能力是：描述清楚需求、看懂 AI 的方案、验收和调试结果 —— 这正是 AI 时代最重要的开发方式。',
  },
  {
    q: '需要准备什么设备和工具？',
    a: '一台 macOS 或 Windows 电脑即可。课程会带你依次装好 Kimi（CLI / Web / VSCode 插件 / Kimi Work 桌面版）和微信开发者工具，所有工具均为官方免费版本。',
  },
  {
    q: '学完之后能做出什么？',
    a: '两个可以真正发布上线的小程序：一个是接入 DeepSeek API 的 AI 角色聊天小程序（含云函数与 API 文档），一个是基于微信云开发的商城小程序（免登录、支持微信支付）。',
  },
  {
    q: '项目二「商城小程序」的大纲什么时候更新？',
    a: '项目二随项目一的完结陆续解锁，将覆盖微信云开发、免登录用户体系与微信支付等商用能力，章节会持续更新到课程目录中。',
  },
]

export const stats = [
  { value: '5', label: '课程章节' },
  { value: '26+', label: '规划课时' },
  { value: '2', label: '完整项目' },
  { value: '0', label: '基础要求' },
]
