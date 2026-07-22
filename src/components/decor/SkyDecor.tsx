export default function SkyDecor() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 800 420"
      preserveAspectRatio="xMidYMin slice"
    >
      <defs>
        <g id="sky-cloud">
          <ellipse cx="0" cy="0" rx="36" ry="15" fill="#fff" stroke="#F0E4CC" strokeWidth="1.5" />
          <ellipse cx="-19" cy="-9" rx="17" ry="13" fill="#fff" />
          <ellipse cx="13" cy="-11" rx="19" ry="14" fill="#fff" />
          <ellipse cx="2" cy="7" rx="31" ry="10" fill="#F3E9D2" opacity=".5" />
        </g>
        <g id="sky-spark">
          <path d="M0,-7 L2,-2 L7,0 L2,2 L0,7 L-2,2 L-7,0 L-2,-2 Z" fill="#F5D67B" />
        </g>
      </defs>

      {/* 太阳（动画套内层 <g>，避免覆盖外层定位 transform） */}
      <g transform="translate(665,64)">
        <g className="decor-bob">
          <circle r="46" fill="#FFE9A8" opacity=".35" />
          <circle r="30" fill="#FFDF8E" />
          <circle r="30" fill="none" stroke="#F5D67B" strokeWidth="2" />
          <g stroke="#F2C84B" strokeWidth="4" strokeLinecap="round">
            <line x1="0" y1="-42" x2="0" y2="-52" />
            <line x1="0" y1="42" x2="0" y2="52" />
            <line x1="-42" y1="0" x2="-52" y2="0" />
            <line x1="42" y1="0" x2="52" y2="0" />
            <line x1="30" y1="-30" x2="37" y2="-37" />
            <line x1="-30" y1="30" x2="-37" y2="37" />
            <line x1="30" y1="30" x2="37" y2="37" />
            <line x1="-30" y1="-30" x2="-37" y2="-37" />
          </g>
        </g>
      </g>

      {/* 云（漂移动画套内层） */}
      <g transform="translate(140,58)">
        <g className="decor-drift">
          <use href="#sky-cloud" />
        </g>
      </g>
      <g transform="translate(400,34) scale(.62)">
        <g className="decor-drift-slow">
          <use href="#sky-cloud" />
        </g>
      </g>
      <g transform="translate(560,120) scale(.5)">
        <g className="decor-drift" style={{ animationDuration: '55s' }}>
          <use href="#sky-cloud" />
        </g>
      </g>

      {/* 闪光 */}
      <use href="#sky-spark" transform="translate(250,96)" />
      <use href="#sky-spark" transform="translate(500,60) scale(.7)" />
      <use href="#sky-spark" transform="translate(90,150) scale(.55)" />

      {/* 飞鸟 */}
      <g fill="none" stroke="#9DB8A4" strokeWidth="2.5" strokeLinecap="round">
        <path d="M285,70 q6,-7 12,0 q6,-7 12,0" />
        <path d="M330,92 q5,-6 10,0 q5,-6 10,0" />
      </g>
    </svg>
  )
}
