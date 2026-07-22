export default function Landscape() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 800 250"
      preserveAspectRatio="xMidYMax slice"
      className="pointer-events-none relative block h-auto w-full"
    >
      <defs>
        <g id="land-tree">
          <rect x="-5" y="-6" width="10" height="34" rx="5" fill="#B08968" />
          <circle cx="-16" cy="-22" r="17" fill="#6FB36B" />
          <circle cx="16" cy="-22" r="17" fill="#6FB36B" />
          <circle cx="0" cy="-34" r="20" fill="#79BC73" />
          <circle cx="-7" cy="-40" r="7" fill="#9BD495" opacity=".85" />
          <circle cx="-14" cy="-24" r="3.2" fill="#F2A65A" />
          <circle cx="12" cy="-30" r="3.2" fill="#F2A65A" />
          <circle cx="2" cy="-18" r="3.2" fill="#F5D67B" />
        </g>
        <g id="land-flower">
          <circle cx="0" cy="-5" r="3.4" fill="#fff" />
          <circle cx="4.8" cy="-1.5" r="3.4" fill="#fff" />
          <circle cx="3" cy="4.2" r="3.4" fill="#fff" />
          <circle cx="-3" cy="4.2" r="3.4" fill="#fff" />
          <circle cx="-4.8" cy="-1.5" r="3.4" fill="#fff" />
          <circle cx="0" cy="0" r="3" fill="#F5D67B" />
        </g>
        <g id="land-tulip">
          <path d="M0,0 C-1,-8 -1,-12 0,-16" stroke="#5FA964" strokeWidth="2" fill="none" />
          <path
            d="M0,-16 C-6,-16 -7,-24 -4,-27 C-2,-24 2,-24 4,-27 C7,-24 6,-16 0,-16 Z"
            fill="#F2A65A"
          />
        </g>
        <g id="land-grass" fill="none" stroke="#5FA964" strokeWidth="2" strokeLinecap="round">
          <path d="M0,0 q1.5,-7 3,0 M5,0 q1.5,-9 3,0 M10,0 q1.5,-6 3,0" />
        </g>
        <g id="land-bfly">
          <ellipse cx="-4" cy="0" rx="4.5" ry="6.5" fill="#F2A65A" transform="rotate(-24)" />
          <ellipse cx="4" cy="0" rx="4.5" ry="6.5" fill="#F5D67B" transform="rotate(24)" />
          <rect x="-1" y="-5" width="2" height="10" rx="1" fill="#8A6F4D" />
        </g>
      </defs>

      {/* 远山两层（山脊带灌木褶边） */}
      <path d="M0,96 Q120,40 260,88 T540,80 T800,92 L800,250 L0,250 Z" fill="#C4E2B0" />
      <path
        d="M0,96 Q120,40 260,88 T540,80 T800,92"
        fill="none"
        stroke="#AED69B"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray="0.5 26"
      />
      <path d="M0,120 Q160,66 330,112 T660,104 T800,116 L800,250 L0,250 Z" fill="#A6D695" />
      <path
        d="M0,120 Q160,66 330,112 T660,104 T800,116"
        fill="none"
        stroke="#8FC87F"
        strokeWidth="9"
        strokeLinecap="round"
        strokeDasharray="0.5 22"
      />

      {/* 近处草地 */}
      <path d="M0,158 Q200,116 400,150 T800,146 L800,250 L0,250 Z" fill="#7FC478" />
      <path
        d="M0,158 Q200,116 400,150 T800,146"
        fill="none"
        stroke="#68B061"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="1 14"
      />

      {/* 蜿蜒小路 + 卵石 */}
      <path
        d="M380,250 C360,214 430,202 420,184 C412,168 452,164 470,156"
        fill="none"
        stroke="#EDDCB8"
        strokeWidth="22"
        strokeLinecap="round"
      />
      <g fill="#DCC294">
        <circle cx="396" cy="228" r="2.6" />
        <circle cx="414" cy="206" r="2.2" />
        <circle cx="404" cy="188" r="2.6" />
        <circle cx="436" cy="172" r="2.2" />
      </g>

      {/* 果树（轻摆动画套内层，时长错开） */}
      <g transform="translate(120,150) scale(1.15)">
        <g className="decor-sway">
          <use href="#land-tree" />
        </g>
      </g>
      <g transform="translate(668,138) scale(.9)">
        <g className="decor-sway" style={{ animationDuration: '7.5s' }}>
          <use href="#land-tree" />
        </g>
      </g>
      <g transform="translate(588,170) scale(.6)">
        <g className="decor-sway" style={{ animationDuration: '5.2s' }}>
          <use href="#land-tree" />
        </g>
      </g>

      {/* 花与草叶丛 */}
      <use href="#land-flower" transform="translate(210,198)" />
      <use href="#land-flower" transform="translate(262,214) scale(.8)" />
      <use href="#land-flower" transform="translate(640,208) scale(1.1)" />
      <use href="#land-tulip" transform="translate(300,214)" />
      <use href="#land-tulip" transform="translate(560,220) scale(.85)" />
      <use href="#land-grass" transform="translate(170,222)" />
      <use href="#land-grass" transform="translate(480,228) scale(.9)" />
      <use href="#land-grass" transform="translate(700,216) scale(1.1)" />

      {/* 蝴蝶 */}
      <g transform="translate(320,138)">
        <g className="decor-sway" style={{ animationDuration: '4.6s' }}>
          <use href="#land-bfly" />
        </g>
      </g>
      <g transform="translate(548,118) scale(.8) rotate(12)">
        <g className="decor-sway" style={{ animationDuration: '5.8s' }}>
          <use href="#land-bfly" />
        </g>
      </g>
    </svg>
  )
}
