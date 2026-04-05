import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import LanguageSwitcher from '../components/Shared/LanguageSwitcher';
import { storyDisplayTexts } from '../data/storyLocale';
import { findStoryById } from '../data/stories';
import { useI18n } from '../i18n/useI18n';

interface TResultMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface TResultLocationState {
  history?: TResultMessage[];
}

export default function Result() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [revealed, setRevealed] = useState(false);
  const { locale, t } = useI18n();

  const story = useMemo(() => (id ? findStoryById(id) : undefined), [id]);
  const display = useMemo(
    () => (story ? storyDisplayTexts(story, locale) : null),
    [story, locale],
  );
  const history = (location.state as TResultLocationState | null)?.history ?? [];

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 700);
    return () => clearTimeout(timer);
  }, []);

  if (!id || !story) {
    return (
      <div className="relative flex min-h-dvh items-center justify-center bg-slate-950/40 px-4 pb-8 pt-14 text-center text-slate-300 sm:pt-4">
        <div className="absolute right-3 top-3 sm:right-4 sm:top-4">
          <LanguageSwitcher />
        </div>
        <div>
          <p className="text-lg text-amber-400">{t('result.notFound')}</p>
          <Link
            to="/"
            className="mt-4 inline-block rounded-lg border border-slate-600 px-4 py-2 text-sm text-amber-400 hover:border-amber-500/50 hover:bg-slate-800"
          >
            {t('result.backLobby')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-dvh overflow-hidden bg-slate-950/45 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(251,191,36,0.13),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(15,23,42,0.85),transparent_55%)]" />

      <main className="relative z-10 mx-auto flex min-h-dvh w-full max-w-4xl flex-col px-4 py-8 sm:px-6 sm:py-10">
        <div className="absolute right-2 top-2 sm:right-4 sm:top-4">
          <LanguageSwitcher />
        </div>
        <header className="mb-6 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-400/70">
            {t('result.archive')}
          </p>
          <h1 className="mt-3 text-3xl font-bold text-amber-400 sm:text-4xl">
            {display?.title}
          </h1>
          <p className="mt-3 text-sm text-slate-400">{t('result.tagline')}</p>
        </header>

        <section className="relative rounded-lg border border-amber-500/30 bg-slate-800/50 p-5 shadow-lg shadow-amber-500/10 sm:p-7">
          <div
            className={`pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-b from-amber-300/10 to-transparent transition-opacity duration-700 ${
              revealed ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <h2 className="relative z-10 mb-3 text-sm font-medium uppercase tracking-[0.2em] text-amber-300/90">
            {t('result.truthTitle')}
          </h2>

          <p
            className={`relative z-10 whitespace-pre-wrap text-base leading-8 text-slate-100 transition-all duration-700 sm:text-lg ${
              revealed ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
            }`}
          >
            {display?.bottom}
          </p>
        </section>

        {history.length > 0 && (
          <section className="mt-6 rounded-lg border border-slate-700 bg-slate-800/35 p-4 shadow-lg">
            <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-slate-400">
              {t('result.chatReplay')}
            </h3>
            <div className="space-y-2">
              {history.map((item, index) => (
                <div
                  key={`${item.role}-${index}`}
                  className={`rounded-lg px-3 py-2 text-sm ${
                    item.role === 'user'
                      ? 'ml-8 bg-slate-700 text-slate-100'
                      : 'mr-8 border border-amber-500/20 bg-slate-900/80 text-amber-100'
                  }`}
                >
                  <span className="mr-2 text-xs text-slate-400">
                    {item.role === 'user' ? t('result.you') : t('result.keeper')}:
                  </span>
                  {item.content}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="rounded-lg bg-amber-500 px-6 py-2.5 text-sm font-semibold text-slate-900 shadow-lg transition-colors hover:bg-amber-400"
          >
            {t('result.playAgain')}
          </Link>
        </div>
      </main>
    </div>
  );
}
