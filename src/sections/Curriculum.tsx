import {
  Boxes,
  MessageSquareHeart,
  PlayCircle,
  ShoppingCart,
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
  shop: ShoppingCart,
}

export default function Curriculum() {
  return (
    <section id="curriculum" className="relative py-20 sm:py-24">
      <div className="pointer-events-none absolute left-[-140px] top-1/3 h-[360px] w-[360px] rounded-full bg-primary/8 blur-[130px]" />

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
                className="overflow-hidden rounded-2xl border border-border/60 bg-card/60 px-6 transition-colors data-[state=open]:border-primary/30"
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
                          <Badge className="rounded-full bg-amber-500/15 text-amber-400 hover:bg-amber-500/15">
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
                            className="rounded-full border-border/80 text-[11px] text-muted-foreground"
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
