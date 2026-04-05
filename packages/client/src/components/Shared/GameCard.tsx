import { useNavigate } from 'react-router-dom';
import { storyDisplayTexts } from '../../data/storyLocale';
import type { TTurtleSoupStory } from '../../data/stories';
import { useI18n } from '../../i18n/useI18n';
import DifficultyBadge from './DifficultyBadge';

interface GameCardProps {
  /** 题库中的单条故事（汤面展示用，不包含汤底渲染） */
  story: TTurtleSoupStory;
}

/**
 * 大厅中的单个谜题卡片：标题 + 难度，点击进入对局路由。
 */
export default function GameCard({ story }: GameCardProps) {
  const navigate = useNavigate();
  const { locale } = useI18n();
  const { title, surface } = storyDisplayTexts(story, locale);

  return (
    <button
      type="button"
      onClick={() => navigate(`/game/${story.id}`)}
      className="group w-full cursor-pointer rounded-lg border border-slate-700 bg-slate-800/60 p-5 text-left shadow-lg outline-none transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-400/50 hover:bg-slate-800/90 hover:shadow-lg hover:shadow-amber-500/10 focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-amber-400 transition-colors group-hover:text-amber-300">
          {title}
        </h3>
        <DifficultyBadge difficulty={story.difficulty} />
      </div>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-400 transition-colors group-hover:text-slate-300">
        {surface}
      </p>
    </button>
  );
}
