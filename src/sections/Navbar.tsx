import { useEffect, useState } from 'react'
import { Terminal } from 'lucide-react'
import { Button } from '@/components/ui/button'

const links = [
  { href: '#highlights', label: '课程亮点' },
  { href: '#curriculum', label: '课程大纲' },
  { href: '#projects', label: '项目实战' },
  { href: '#faq', label: '常见问题' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-border/60 bg-background/85 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Terminal className="h-4 w-4" strokeWidth={2.2} />
          </span>
          <span className="text-sm font-semibold tracking-wide sm:text-base">
            Kimi Code <span className="text-muted-foreground">· 小程序实战课</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <Button asChild size="sm" className="rounded-full px-5">
          <a href="#curriculum">开始学习</a>
        </Button>
      </div>
    </header>
  )
}
