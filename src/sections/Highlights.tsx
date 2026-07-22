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
