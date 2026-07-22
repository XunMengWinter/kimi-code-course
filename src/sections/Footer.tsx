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
