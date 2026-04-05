import { useI18n } from '../../i18n/useI18n';

interface LanguageSwitcherProps {
  className?: string;
}

/**
 * 中英文切换：写入 localStorage 并更新 document 语言。
 */
export default function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-lg border border-slate-600/80 bg-slate-900/60 p-0.5 shadow-inner ${className}`}
      role="group"
      aria-label={t('common.language')}
    >
      <button
        type="button"
        onClick={() => setLocale('zh')}
        aria-pressed={locale === 'zh'}
        className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
          locale === 'zh'
            ? 'bg-amber-500/25 text-amber-300'
            : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
        }`}
      >
        {t('common.switchToZh')}
      </button>
      <button
        type="button"
        onClick={() => setLocale('en')}
        aria-pressed={locale === 'en'}
        className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
          locale === 'en'
            ? 'bg-amber-500/25 text-amber-300'
            : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
        }`}
      >
        {t('common.switchToEn')}
      </button>
    </div>
  );
}
