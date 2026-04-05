import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import GameChatPanel from '../components/Chat/GameChatPanel';
import { findStoryById } from '../data/stories';

type TGameStatus = 'playing' | 'ended';

/**
 * 对局页：展示汤面与聊天，调用守密人 AI。
 */
export default function Game() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const story = useMemo(() => (id ? findStoryById(id) : undefined), [id]);
  const [status, setStatus] = useState<TGameStatus>('playing');

  useEffect(() => {
    if (!id) return;
    const saved = sessionStorage.getItem(`turtle-game-status:${id}`);
    if (saved === 'playing' || saved === 'ended') {
      setStatus(saved);
      return;
    }
    setStatus('playing');
    sessionStorage.setItem(`turtle-game-status:${id}`, 'playing');
  }, [id]);

  const updateStatus = (nextStatus: TGameStatus) => {
    if (!id) return;
    setStatus(nextStatus);
    sessionStorage.setItem(`turtle-game-status:${id}`, nextStatus);
  };

  const handleRevealBottom = () => {
    if (!story) return;
    updateStatus('ended');
    navigate(`/result/${story.id}`);
  };

  const handleEndGame = () => {
    if (!story) return;
    updateStatus('ended');
    navigate('/');
  };

  if (!id || !story) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-slate-950/40 px-4 text-center text-slate-300">
        <p className="text-lg text-amber-400/90">未找到该谜题</p>
        <p className="mt-2 text-sm text-slate-500">
          请从大厅选择一则故事开始游戏。
        </p>
        <Link
          to="/"
          className="mt-6 rounded-lg border border-slate-600 px-4 py-2 text-sm text-amber-400 transition-colors hover:border-amber-500/50 hover:bg-slate-800"
        >
          返回大厅
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-slate-950/40 text-slate-100">
      <header className="flex shrink-0 items-center gap-3 border-b border-slate-800 px-4 py-3 shadow-lg">
        <Link
          to="/"
          className="rounded-lg px-2 py-1.5 text-sm text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
        >
          ← 大厅
        </Link>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-base font-semibold text-amber-400 sm:text-lg">
            {story.title}
          </h1>
        </div>
        <span
          className={`rounded-lg px-2 py-1 text-xs font-medium ${
            status === 'playing'
              ? 'bg-emerald-500/15 text-emerald-300'
              : 'bg-slate-700 text-slate-300'
          }`}
        >
          {status === 'playing' ? '进行中' : '已结束'}
        </span>
      </header>

      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-3 px-3 py-3 sm:gap-4 sm:px-4 sm:py-6">
        <section className="shrink-0 rounded-lg border border-slate-700 bg-slate-800/30 p-4 shadow-lg">
          <h2 className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-500">
            汤面
          </h2>
          <p className="text-sm leading-relaxed text-slate-300">{story.surface}</p>
        </section>

        <section className="flex min-h-[46vh] flex-1 flex-col sm:min-h-[50vh]">
          <h2 className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-500">
            推理
          </h2>
          <GameChatPanel story={story} disabled={status === 'ended'} />
        </section>

        <div className="sticky bottom-0 z-10 -mx-3 flex flex-wrap justify-end gap-2 border-t border-slate-800 bg-slate-950/90 px-3 py-2 backdrop-blur-sm sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0">
          <button
            type="button"
            onClick={handleEndGame}
            className="rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 shadow-lg transition-all hover:border-slate-500 hover:bg-slate-700 active:scale-95"
          >
            结束游戏
          </button>
          <button
            type="button"
            onClick={handleRevealBottom}
            className="rounded-lg border border-amber-500/40 bg-slate-800 px-4 py-2 text-sm font-medium text-amber-400 shadow-lg transition-all hover:border-amber-400 hover:bg-slate-700 active:scale-95"
          >
            查看汤底
          </button>
        </div>
      </div>
    </div>
  );
}
