import { useI18n } from '../../i18n/useI18n';

const STYLE: Record<string, { className: string }> = {
  easy: { className: 'bg-emerald-500/20 text-emerald-400' },
  normal: { className: 'bg-amber-500/20 text-amber-400' },
  hard: { className: 'bg-red-500/20 text-red-400' },
};

interface Props {
  difficulty: 'easy' | 'normal' | 'hard';
}

export default function DifficultyBadge({ difficulty }: Props) {
  const { t } = useI18n();
  const { className } = STYLE[difficulty] ?? STYLE.normal;
  const label = t(`difficulty.${difficulty}`);

  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}
