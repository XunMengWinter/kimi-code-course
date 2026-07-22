import { ArrowRight, CheckCircle2, Play } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { stats } from '@/data/course'

const terminalLines = [
  { prompt: '$', text: 'kimi', cls: 'text-foreground' },
  { prompt: '✦', text: 'Kimi Code 已就绪，开始编程吧', cls: 'text-primary' },
  { prompt: '>', text: '帮我开发一个微信小程序：AI 角色聊天', cls: 'text-foreground' },
  { prompt: '✓', text: '读取 AGENTS.md，理解项目约定', cls: 'text-emerald-400' },
  { prompt: '✓', text: 'Plan 模式生成开发计划', cls: 'text-emerald-400' },
  { prompt: '✓', text: '创建云函数 chat 并接入 DeepSeek API', cls: 'text-emerald-400' },
  { prompt: '✓', text: '生成 API 文档，编译预览成功', cls: 'text-emerald-400' },
]

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
      {/* 背景光晕 + 网格 */}
      <div className="pointer-events-none absolute inset-0 bg-grid" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]" />
      <div className="pointer-events-none absolute right-[-120px] top-40 h-[320px] w-[320px] rounded-full bg-violet-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          {/* 左侧文案 */}
          <div>
            <Badge
              variant="outline"
              className="mb-6 gap-1.5 rounded-full border-primary/40 bg-primary/10 px-3.5 py-1.5 text-xs text-primary"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
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
              让 AI 帮你写代码 —— 完成「AI 角色聊天」和「商城」
              两个真实可上线的小程序项目。
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="group rounded-full px-7">
                <a href="#curriculum">
                  查看课程大纲
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-7">
                <a href="#projects">
                  <Play className="mr-1 h-4 w-4" />
                  项目实战预览
                </a>
              </Button>
            </div>

            {/* 数据 */}
            <dl className="mt-12 grid max-w-md grid-cols-4 gap-4 border-t border-border/60 pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="order-2 text-xs text-muted-foreground">{s.label}</dt>
                  <dd className="text-2xl font-bold text-foreground sm:text-3xl">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* 右侧终端窗口 */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card shadow-2xl shadow-primary/5">
              <div className="flex items-center gap-2 border-b border-border/60 bg-muted/40 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <span className="h-3 w-3 rounded-full bg-green-500/80" />
                <span className="ml-3 font-mono text-xs text-muted-foreground">
                  kimi — terminal
                </span>
              </div>
              <div className="space-y-3.5 p-5 font-mono text-[13px] leading-relaxed sm:p-6">
                {terminalLines.map((line, i) => (
                  <div
                    key={i}
                    className="flex gap-2.5 opacity-0 animate-fade-in"
                    style={{ animationDelay: `${0.35 + i * 0.45}s` }}
                  >
                    <span className="shrink-0 text-muted-foreground">{line.prompt}</span>
                    <span className={line.cls}>{line.text}</span>
                  </div>
                ))}
                <div
                  className="flex gap-2.5 opacity-0 animate-fade-in"
                  style={{ animationDelay: `${0.35 + terminalLines.length * 0.45}s` }}
                >
                  <span className="shrink-0 text-muted-foreground">{'>'}</span>
                  <span className="inline-block h-4 w-2 animate-pulse bg-primary" />
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-5 hidden items-center gap-2 rounded-xl border border-border/70 bg-card px-4 py-3 shadow-lg sm:flex">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
              <div className="text-xs">
                <p className="font-medium text-foreground">小程序已发布</p>
                <p className="text-muted-foreground">认证 · 备案 · 上线全流程</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
