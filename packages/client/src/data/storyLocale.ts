import type { TLocale } from '../i18n/types';
import type { TTurtleSoupStory } from './stories';

/** 按界面语言选取故事标题与汤面/汤底（英文缺失时回退中文） */
export function storyDisplayTexts(
  story: TTurtleSoupStory,
  locale: TLocale,
): { title: string; surface: string; bottom: string } {
  if (locale === 'en' && story.titleEn) {
    return {
      title: story.titleEn,
      surface: story.surfaceEn ?? story.surface,
      bottom: story.bottomEn ?? story.bottom,
    };
  }
  return {
    title: story.title,
    surface: story.surface,
    bottom: story.bottom,
  };
}
