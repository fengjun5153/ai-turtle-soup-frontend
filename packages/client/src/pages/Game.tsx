import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import GameChatPanel from '../components/Chat/GameChatPanel';
import LanguageSwitcher from '../components/Shared/LanguageSwitcher';
import { storyDisplayTexts } from '../data/storyLocale';
import { findStoryById } from '../data/stories';
import { useI18n } from '../i18n/useI18n';

type TGameStatus = 'playing' | 'ended';

/**
 * 对局页：展示汤面与聊天，调用守密人 AI。
 * 对局状态仅保存在内存中：刷新页面即重新开局（不再用 sessionStorage 记住「已结束」）。
 * 按 storyId 挂载子树，切换谜题时重置状态。
 */
export default function Game() {
  const { id } = useParams<{ id: string }>();
  return <GameForStory key={id ?? ''} storyId={id} />;
}

function GameForStory({ storyId }: { storyId: string | undefined }) {
  const navigate = useNavigate();
  const { locale, t } = useI18n();

  const story = useMemo(
    () => (storyId ? findStoryById(storyId) : undefined),
    [storyId],
  );
  const display = useMemo(
    () => (story ? storyDisplayTexts(story, locale) : null),
    [story, locale],
  );
  const [status, setStatus] = useState<TGameStatus>('playing');

  const updateStatus = (nextStatus: TGameStatus) => {
    setStatus(nextStatus);
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

  if (!storyId || !story) {
    return (
      <div className="relative flex min-h-dvh flex-col items-center justify-center bg-slate-950/40 px-4 pt-14 text-center text-slate-300 sm:pt-4">
        <div className="absolute right-3 top-3 sm:right-4 sm:top-4">
          <LanguageSwitcher />
        </div>
        <p className="text-lg text-amber-400/90">{t('game.notFound')}</p>
        <p className="mt-2 text-sm text-slate-500">{t('game.notFoundHint')}</p>
        <Link
          to="/"
          className="mt-6 rounded-lg border border-slate-600 px-4 py-2 text-sm text-amber-400 transition-colors hover:border-amber-500/50 hover:bg-slate-800"
        >
          {t('game.backLobby')}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-slate-950/40 text-slate-100">
      <header className="flex shrink-0 items-center gap-2 border-b border-slate-800 px-3 py-3 shadow-lg sm:gap-3 sm:px-4">
        <Link
          to="/"
          className="shrink-0 rounded-lg px-2 py-1.5 text-sm text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
        >
          {t('game.lobby')}
        </Link>
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-base font-semibold text-amber-400 sm:text-lg">
            {display?.title}
          </h1>
        </div>
        <LanguageSwitcher className="shrink-0 scale-90 sm:scale-100" />
        <span
          className={`shrink-0 rounded-lg px-2 py-1 text-xs font-medium ${
            status === 'playing'
              ? 'bg-emerald-500/15 text-emerald-300'
              : 'bg-slate-700 text-slate-300'
          }`}
        >
          {status === 'playing' ? t('game.playing') : t('game.ended')}
        </span>
      </header>

      <div className="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col gap-3 px-3 py-3 sm:gap-4 sm:px-4 sm:py-6">
        <section className="shrink-0 rounded-lg border border-slate-700 bg-slate-800/30 p-4 shadow-lg">
          <h2 className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-500">
            {t('game.surface')}
          </h2>
          <p className="text-sm leading-relaxed text-slate-300">{display?.surface}</p>
        </section>

        <section className="flex min-h-[46vh] flex-1 flex-col overflow-hidden sm:min-h-[50vh]">
          <h2 className="mb-2 shrink-0 text-xs font-medium uppercase tracking-wider text-slate-500">
            {t('game.reasoning')}
          </h2>
          <GameChatPanel story={story} disabled={status === 'ended'} />
        </section>

        <div className="sticky bottom-0 z-[25] -mx-3 flex flex-wrap justify-end gap-2 border-t border-slate-800 bg-slate-950/90 px-3 py-2 backdrop-blur-sm sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0">
          <button
            type="button"
            onClick={handleEndGame}
            className="rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 shadow-lg transition-all hover:border-slate-500 hover:bg-slate-700 active:scale-95"
          >
            {t('game.endGame')}
          </button>
          <button
            type="button"
            onClick={handleRevealBottom}
            className="rounded-lg border border-amber-500/40 bg-slate-800 px-4 py-2 text-sm font-medium text-amber-400 shadow-lg transition-all hover:border-amber-400 hover:bg-slate-700 active:scale-95"
          >
            {t('game.revealTruth')}
          </button>
        </div>
      </div>
    </div>
  );
}
