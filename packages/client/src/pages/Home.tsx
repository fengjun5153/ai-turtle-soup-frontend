import GameCard from '../components/Shared/GameCard';
import { stories } from '../data/stories';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-900 text-slate-100">
      {/* 氛围：暗角与微弱金雾 */}
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(251,191,36,0.08),transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_120%_80%_at_100%_100%,rgba(15,23,42,0.9),transparent)]"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="border-b border-slate-800/80 px-4 py-10 text-center shadow-lg shadow-black/20 sm:px-6 sm:py-14">
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.35em] text-amber-500/70">
            The Fog of Truth
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl">
            <span className="text-amber-400">AI海龟汤</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
            向守密人提出只能回答「是」「否」或「无关」的问题，在迷雾中拼凑线索，直到真相浮出水面——
            或永远沉入黑暗。
          </p>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-12">
          <div className="mb-8 flex flex-col gap-2 border-l-2 border-amber-500/40 pl-4 sm:pl-5">
            <h2 className="text-xl font-semibold text-slate-100 sm:text-2xl">
              谜题馆藏
            </h2>
            <p className="max-w-2xl text-sm text-slate-500 sm:text-base">
              任选一则汤面进入对局。难度越高，拨开迷雾所需的线索越多。
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
            {stories.map((story) => (
              <GameCard key={story.id} story={story} />
            ))}
          </div>
        </main>

        <footer className="border-t border-slate-800/80 px-4 py-8 text-center text-xs text-slate-600 sm:text-sm">
          <span className="text-slate-500">真相迷雾</span>
          {' · '}
          &copy; {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
}
