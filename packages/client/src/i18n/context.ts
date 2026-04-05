import { createContext } from 'react';
import type { TLocale } from './types';

export type TTFunction = (
  path: string,
  params?: Record<string, string | number>,
) => string;

export interface TI18nContextValue {
  locale: TLocale;
  setLocale: (next: TLocale) => void;
  t: TTFunction;
}

export const I18nContext = createContext<TI18nContextValue | null>(null);
