export default function SectionDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative z-0 -my-8 ${flip ? '-scale-x-100' : ''}`}
    >
      <svg viewBox="0 0 800 90" preserveAspectRatio="none" className="block h-16 w-full sm:h-20">
        <path d="M0,40 Q200,4 400,34 T800,30 L800,90 L0,90 Z" fill="#A6D695" opacity=".5" />
        <path d="M0,56 Q200,24 400,52 T800,48 L800,90 L0,90 Z" fill="#7FC478" opacity=".45" />
        <path d="M0,70 Q220,44 420,66 T800,62 L800,90 L0,90 Z" fill="#8FCB9B" opacity=".35" />
      </svg>
    </div>
  )
}
