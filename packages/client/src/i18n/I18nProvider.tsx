import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { I18nContext, type TI18nContextValue, type TTFunction } from './context';
import { interpolate, lookupString } from './lookup';
import { enLocale } from './locales/en';
import { zhLocale } from './locales/zh';
import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  type TLocale,
} from './types';

const trees: Record<TLocale, Record<string, unknown>> = {
  zh: zhLocale as unknown as Record<string, unknown>,
  en: enLocale as unknown as Record<string, unknown>,
};

function readInitialLocale(): TLocale {
  try {
    const raw = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (raw === 'zh' || raw === 'en') return raw;
  } catch {
    /* private mode */
  }
  if (typeof navigator !== 'undefined' && /^en/i.test(navigator.language)) {
    return 'en';
  }
  return DEFAULT_LOCALE;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<TLocale>(readInitialLocale);

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en';
  }, [locale]);

  const setLocale = useCallback((next: TLocale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const t = useCallback<TTFunction>(
    (path, params) => {
      const raw =
        lookupString(trees[locale], path) ??
        lookupString(trees.zh, path) ??
        path;
      return interpolate(raw, params);
    },
    [locale],
  );

  const value = useMemo<TI18nContextValue>(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t],
  );

  return (
    <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
  );
}
