import type { ReactNode } from 'react'

export type SpotIconName = 'sprout' | 'wand' | 'house' | 'flag'

const icons: Record<SpotIconName, ReactNode> = {
  /* 小盆栽：真正的零基础 */
  sprout: (
    <>
      <path d="M14,34 h28 l-3,14 a4,4 0 0 1 -4,3 h-14 a4,4 0 0 1 -4,-3 Z" fill="#E8987A" />
      <path d="M12,30 h32 v5 h-32 Z" fill="#F0857D" />
      <path d="M28,30 C28,20 24,16 18,14 C20,22 23,26 28,30 Z" fill="#6FB36B" />
      <path d="M28,30 C28,18 33,12 40,11 C39,20 35,26 28,30 Z" fill="#8FCB9B" />
    </>
  ),
  /* 胖云 + 闪光：AI 驱动开发 */
  wand: (
    <>
      <ellipse cx="26" cy="30" rx="16" ry="9" fill="#fff" stroke="#EDE2C9" />
      <ellipse cx="18" cy="25" rx="8" ry="7" fill="#fff" />
      <ellipse cx="32" cy="24" rx="9" ry="8" fill="#fff" />
      <path d="M40,14 l2,4 4,2 -4,2 -2,4 -2,-4 -4,-2 4,-2 Z" fill="#F5D67B" />
      <circle cx="14" cy="14" r="2" fill="#F2A65A" />
    </>
  ),
  /* 小木屋：两个完整项目 */
  house: (
    <>
      <path d="M10,30 L28,14 L46,30 Z" fill="#E8894B" />
      <rect x="14" y="30" width="28" height="18" rx="3" fill="#FFFCF4" stroke="#EDE2C9" />
      <rect x="24" y="36" width="8" height="12" rx="4" fill="#B08968" />
      <circle cx="36" cy="36" r="3" fill="#7FC4E8" />
      <path d="M6,50 h44" stroke="#7FC478" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  /* 山顶小旗：从开发到上线 */
  flag: (
    <>
      <path d="M8,46 Q28,28 48,46 L48,50 L8,50 Z" fill="#7FC478" />
      <line x1="28" y1="16" x2="28" y2="40" stroke="#B08968" strokeWidth="3" strokeLinecap="round" />
      <path d="M28,16 h15 l-4.5,5 4.5,5 h-15 Z" fill="#F2A65A" />
      <circle cx="16" cy="44" r="2.4" fill="#fff" />
      <circle cx="38" cy="46" r="2.4" fill="#F5D67B" />
    </>
  ),
}

export default function SpotIcon({ name, className }: { name: SpotIconName; className?: string }) {
  return (
    <svg viewBox="0 0 56 56" className={className} aria-hidden="true" focusable="false">
      {icons[name]}
    </svg>
  )
}
