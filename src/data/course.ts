export interface Lesson {
  title: string
  tag?: string
}

export interface Chapter {
  id: string
  no: string
  title: string
  subtitle: string
  icon: 'boxes' | 'smartphone' | 'wand' | 'chat' | 'calendar'
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
    title: '项目实战二 · 预约小程序',
    subtitle: '摄影约拍主题 · 免登录 · 个人主体即可上线',
    icon: 'calendar',
    status: 'updating',
    lessons: [
      { title: '项目初始化与云开发环境搭建', tag: '规划中' },
      { title: '设计预约数据模型（服务 / 排期 / 订单）', tag: '规划中' },
      { title: '服务列表与详情页开发', tag: '规划中' },
      { title: '日历组件与时段选择', tag: '规划中' },
      { title: '预约表单与免登录下单', tag: '规划中' },
      { title: '订阅消息：预约成功通知', tag: '规划中' },
      { title: '我的预约：查询与取消', tag: '规划中' },
      { title: '商家管理端：排期管理', tag: '规划中' },
      { title: '商家管理端：订单确认与核销', tag: '规划中' },
      { title: '发布上线与类目审核要点', tag: '规划中' },
      { title: '番外：定金支付（需企业资质）', tag: '番外篇' },
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
  mock: 'chat' | 'booking'
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
    name: '预约小程序（摄影约拍）',
    desc: '基于微信云开发的预约系统：服务展示、日历选时段、免登录下单、订阅消息通知，附带商家管理端（排期与核销）。个人主体即可发布，番外篇讲解定金支付。',
    badges: ['微信云开发', '免登录', '日历选时段', '订阅消息', '商家管理端'],
    lessons: '10 节主线 + 1 节支付番外',
    status: '更新中',
    mock: 'booking',
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
    a: '两个可以真正发布上线的小程序：一个是接入 DeepSeek API 的 AI 角色聊天小程序（含云函数与 API 文档），一个是基于微信云开发的预约小程序（日历选时段、免登录、订阅消息、商家管理端）——个人主体就能发布，不需要企业资质。',
  },
  {
    q: '预约小程序支持在线支付吗？',
    a: '主线课程采用「免登录 + 到店付」模式，个人开发者可直接上线。同时提供番外篇「定金支付」：针对有企业资质的同学，讲解如何给预约加上在线定金，防止爽约。',
  },
]

export const stats = [
  { value: '5', label: '课程章节' },
  { value: '37', label: '规划课时' },
  { value: '2', label: '完整项目' },
  { value: '0', label: '基础要求' },
]
