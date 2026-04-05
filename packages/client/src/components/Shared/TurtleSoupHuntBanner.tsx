/**
 * 顶部装饰：海龟慢慢爬向汤底（2 分钟横移）；立体渐变甲壳 + 轻起伏、微摆腿。
 */
const TID = 'tb'; // SVG 内 id 前缀，避免与其它 SVG 冲突

function TurtleGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 72 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient
          id={`${TID}-shell`}
          x1="10"
          y1="38"
          x2="52"
          y2="6"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#022c22" />
          <stop offset="0.38" stopColor="#065f46" />
          <stop offset="0.72" stopColor="#059669" />
          <stop offset="1" stopColor="#34d399" />
        </linearGradient>
        <radialGradient
          id={`${TID}-shell-gloss`}
          cx="26"
          cy="14"
          r="20"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#d1fae5" stopOpacity="0.48" />
          <stop offset="0.4" stopColor="#6ee7b7" stopOpacity="0.14" />
          <stop offset="1" stopColor="transparent" />
        </radialGradient>
        <linearGradient
          id={`${TID}-rim`}
          x1="34"
          y1="10"
          x2="34"
          y2="38"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#064e3b" stopOpacity="0.35" />
          <stop offset="1" stopColor="#022c22" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient
          id={`${TID}-belly`}
          x1="18"
          y1="28"
          x2="48"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#022c22" stopOpacity="0.5" />
          <stop offset="1" stopColor="#064e3b" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient
          id={`${TID}-head`}
          x1="46"
          y1="7"
          x2="60"
          y2="24"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#a7f3d0" />
          <stop offset="0.35" stopColor="#34d399" />
          <stop offset="1" stopColor="#047857" />
        </linearGradient>
        <radialGradient
          id={`${TID}-head-shade`}
          cx="58"
          cy="20"
          r="12"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="transparent" />
          <stop offset="1" stopColor="#022c22" stopOpacity="0.35" />
        </radialGradient>
        <linearGradient id={`${TID}-tail`} x1="4" y1="28" x2="14" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#022c22" />
          <stop offset="1" stopColor="#065f46" />
        </linearGradient>
        <filter
          id={`${TID}-soft`}
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
          colorInterpolationFilters="sRGB"
        >
          <feDropShadow dx="0.8" dy="1.8" stdDeviation="1.1" floodColor="#000" floodOpacity="0.32" />
        </filter>
      </defs>

      <g filter={`url(#${TID}-soft)`}>
        <path
          d="M8 26c-2-4 0-8 4-10s10 2 10 6-4 8-8 8-4-2-6-4z"
          fill={`url(#${TID}-tail)`}
        />
        <ellipse cx="34" cy="24" rx="22" ry="14" fill={`url(#${TID}-shell)`} stroke="#022c22" strokeOpacity="0.55" strokeWidth="0.75" />
        <ellipse cx="34" cy="24" rx="22" ry="14" fill={`url(#${TID}-shell-gloss)`} />
        <ellipse cx="34" cy="24" rx="20" ry="12" fill="none" stroke={`url(#${TID}-rim)`} strokeWidth="1.1" />
        <path
          d="M22 20q10-5 20 0q-2 6-10 7q-10-1-10-7z"
          fill="#047857"
          fillOpacity="0.35"
          stroke="#064e3b"
          strokeOpacity="0.4"
          strokeWidth="0.5"
        />
        <path
          d="M26 23q8-3 16 0q-1 4-8 5q-7-1-8-5z"
          fill="#059669"
          fillOpacity="0.28"
        />
        <ellipse cx="34" cy="24" rx="16" ry="9" fill={`url(#${TID}-belly)`} />
        <g className="turtle-svg-legs-rear">
          <path
            d="M18 30l-4 6M26 32l-2 7"
            stroke="#022c22"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M18 30l-4 6M26 32l-2 7"
            stroke="#047857"
            strokeOpacity="0.55"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
        </g>
        <g className="turtle-svg-legs-front">
          <path
            d="M42 32l2 7M50 30l4 6"
            stroke="#022c22"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M42 32l2 7M50 30l4 6"
            stroke="#047857"
            strokeOpacity="0.55"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
        </g>
        <g className="turtle-svg-head">
          <circle cx="54" cy="16" r="9.2" fill={`url(#${TID}-head)`} stroke="#065f46" strokeWidth="0.6" strokeOpacity="0.7" />
          <circle cx="54" cy="16" r="9.2" fill={`url(#${TID}-head-shade)`} />
          <ellipse cx="56.2" cy="12.8" rx="3.2" ry="2.4" fill="#ecfdf5" fillOpacity="0.22" />
          <circle cx="57" cy="14" r="2.1" className="turtle-svg-eye" fill="#0f172a" />
          <ellipse cx="57.6" cy="13.2" rx="0.65" ry="0.45" fill="#fff" fillOpacity="0.92" />
        </g>
      </g>
    </svg>
  );
}

function SoupBowlGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4 14h32v2c0 8-6 14-16 14S4 24 4 16v-2z"
        className="fill-amber-600/40 stroke-amber-400/80"
        strokeWidth="1.5"
      />
      <ellipse cx="20" cy="14" rx="14" ry="4" className="fill-amber-400/25" />
      <path
        d="M10 10c2 2 6 3 10 3s8-1 10-3"
        className="stroke-amber-300/60"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function TurtleSoupHuntBanner() {
  return (
    <div
      className="turtle-banner-layer fixed inset-x-0 top-0 z-[5] h-11 border-b border-amber-500/15 bg-slate-950/55 shadow-md shadow-black/20 backdrop-blur-sm sm:h-12"
      aria-hidden
    >
      <div className="relative mx-auto h-full max-w-6xl px-3 sm:px-4">
        <div className="relative h-full overflow-hidden">
          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1 sm:right-3">
            <SoupBowlGlyph className="h-7 w-7 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.35)] sm:h-8 sm:w-8" />
          </div>
          <div className="turtle-soup-hunt-runner absolute top-1/2 -translate-y-1/2 drop-shadow-[0_1px_4px_rgba(0,0,0,0.35)]">
            <div className="turtle-soup-hunt-sprite">
              <TurtleGlyph className="h-8 w-[4.5rem] sm:h-9 sm:w-[5rem]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
