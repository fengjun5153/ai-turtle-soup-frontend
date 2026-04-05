import GameCard from '../components/Shared/GameCard';
import LanguageSwitcher from '../components/Shared/LanguageSwitcher';
import { stories } from '../data/stories';
import { useI18n } from '../i18n/useI18n';

export default function Home() {
  const { t } = useI18n();

  return (
    <div className="relative min-h-dvh overflow-x-hidden bg-slate-950/45 text-slate-100">
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
        <header className="relative border-b border-slate-800/80 px-4 py-10 text-center shadow-lg shadow-black/20 sm:px-6 sm:py-14">
          <div className="absolute right-3 top-3 sm:right-5 sm:top-5">
            <LanguageSwitcher />
          </div>
          <p className="mb-2 font-mono text-xs uppercase tracking-[0.35em] text-amber-500/70">
            {t('home.tagline')}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl">
            <span className="text-amber-400">{t('home.title')}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
            {t('home.intro')}
          </p>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-12">
          <div className="mb-8 flex flex-col gap-2 border-l-2 border-amber-500/40 pl-4 sm:pl-5">
            <h2 className="text-xl font-semibold text-slate-100 sm:text-2xl">
              {t('home.sectionTitle')}
            </h2>
            <p className="max-w-2xl text-sm text-slate-500 sm:text-base">
              {t('home.sectionDesc')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
            {stories.map((story) => (
              <GameCard key={story.id} story={story} />
            ))}
          </div>
        </main>

        <footer className="border-t border-slate-800/80 px-4 py-8 text-center text-xs text-slate-600 sm:text-sm">
          <span className="text-slate-500">{t('home.footerBrand')}</span>
          {' · '}
          &copy; {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
}
