import { useContext } from 'react';
import { I18nContext, type TI18nContextValue } from './context';

export function useI18n(): TI18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return ctx;
}
