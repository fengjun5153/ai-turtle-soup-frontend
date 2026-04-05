/**
 * 全屏星空层：固定在最底层，不参与点击；星星用 CSS 动画闪烁。
 */
function mulberry32(seed: number) {
  return function next() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rng = mulberry32(0x73746172); // "star"

const STAR_COUNT = 110;
const STARS = Array.from({ length: STAR_COUNT }, () => {
  const r = rng();
  return {
    left: rng() * 100,
    top: rng() * 100,
    size: r < 0.65 ? 1 : r < 0.92 ? 2 : 3,
    duration: 2.2 + rng() * 3.8,
    delay: rng() * 6,
  };
});

export default function StarrySky() {
  return (
    <div
      className="starry-sky-layer fixed inset-0 z-0 overflow-hidden bg-gradient-to-b from-slate-950 via-[#0c1222] to-slate-900"
      aria-hidden
    >
      {STARS.map((s, i) => (
        <span
          key={i}
          className="star-dot absolute rounded-full bg-slate-100"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
