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
      <div className="card-soft relative overflow-hidden rounded-[2rem] border-2 border-sand bg-card">
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
              <Card className="card-soft border-2 border-sand bg-card">
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
