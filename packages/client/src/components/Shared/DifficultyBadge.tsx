const CONFIG: Record<string, { label: string; className: string }> = {
  easy: { label: '简单', className: 'bg-emerald-500/20 text-emerald-400' },
  normal: { label: '普通', className: 'bg-amber-500/20 text-amber-400' },
  hard: { label: '困难', className: 'bg-red-500/20 text-red-400' },
};

interface Props {
  difficulty: 'easy' | 'normal' | 'hard';
}

export default function DifficultyBadge({ difficulty }: Props) {
  const { label, className } = CONFIG[difficulty] ?? CONFIG.normal;

  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}
