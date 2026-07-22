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
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
        <span className="font-mono text-[10px] text-muted-foreground">
          cloud function · DeepSeek API · 已接入
        </span>
      </div>
    </div>
  )
}

function ShopMock() {
  return (
    <div className="space-y-3 p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold">优选商城</span>
        <Badge variant="outline" className="border-emerald-500/40 text-[10px] text-emerald-400">
          免登录
        </Badge>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {[
          { name: '机械键盘', price: '¥299' },
          { name: '降噪耳机', price: '¥899' },
        ].map((p) => (
          <div key={p.name} className="rounded-xl border border-border/60 bg-muted/50 p-3">
            <div className="mb-2 h-14 rounded-lg bg-gradient-to-br from-primary/30 to-violet-500/20" />
            <p className="text-[11px] font-medium">{p.name}</p>
            <p className="mt-0.5 text-xs font-bold text-primary">{p.price}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between rounded-xl bg-primary/10 px-3.5 py-2.5">
        <span className="font-mono text-[10px] text-muted-foreground">微信支付 · 云开发</span>
        <span className="rounded-full bg-primary px-3 py-1 text-[10px] font-medium text-primary-foreground">
          立即下单
        </span>
      </div>
    </div>
  )
}

function PhoneFrame({ project }: { project: Project }) {
  return (
    <div className="relative mx-auto w-full max-w-[300px]">
      <div className="absolute -inset-3 rounded-[2.5rem] bg-primary/10 blur-xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-2xl">
        <div className="flex items-center justify-center border-b border-border/50 py-2.5">
          <span className="h-1.5 w-16 rounded-full bg-muted-foreground/30" />
        </div>
        {project.mock === 'chat' ? <ChatMock /> : <ShopMock />}
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-20 sm:py-24">
      <div className="pointer-events-none absolute right-[-120px] top-1/4 h-[380px] w-[380px] rounded-full bg-violet-500/8 blur-[130px]" />

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
              <Card className="border-border/60 bg-card/60">
                <CardContent className="p-7 sm:p-9">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="font-mono text-xs tracking-widest text-primary">{p.no}</span>
                    <Badge
                      className={`rounded-full ${
                        p.status === '已开放'
                          ? 'bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/15'
                          : 'bg-amber-500/15 text-amber-400 hover:bg-amber-500/15'
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
                        className="rounded-full border-primary/30 bg-primary/5 px-3 py-1 text-xs text-foreground/80"
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
