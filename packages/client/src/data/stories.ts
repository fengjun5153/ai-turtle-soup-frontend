/**
 * 内置海龟汤题库（汤面 surface / 汤底 bottom）
 * 与 PRD「真相迷雾」玩法一致：玩家仅见 surface，bottom 仅用于 AI 裁判与揭晓。
 */

/** 难度：影响证据阈值与提示强度（与游戏状态机一致） */
export type TStoryDifficulty = 'easy' | 'normal' | 'hard';

/** 单条海龟汤故事 */
export interface TTurtleSoupStory {
  /** 唯一标识，用于路由与存档 */
  id: string;
  /** 展示用标题 */
  title: string;
  /** 难度分级 */
  difficulty: TStoryDifficulty;
  /** 汤面：向玩家展示的谜面描述 */
  surface: string;
  /** 汤底：完整真相（不向玩家提前展示） */
  bottom: string;
}

export const stories: readonly TTurtleSoupStory[] = [
  {
    id: 'builtin-e01',
    title: '雨中的男人',
    difficulty: 'easy',
    surface:
      '一个男人在大雨中站着，身旁地上有一把完好的雨伞，他却始终没有把伞打开。',
    bottom:
      '男人是盲人，感觉不到下雨，也不知道旁边有一把伞——那把伞是别人遗落在此的，与他无关。',
  },
  {
    id: 'builtin-n01',
    title: '最后的信号',
    difficulty: 'normal',
    surface:
      '一名宇航员独自漂浮在太空中，望着舷窗外的地球，微笑着关掉了求救信号。',
    bottom:
      '他得知地球刚刚爆发了足以灭绝人类的灾难，亲人和熟悉的世界已不复存在。他不愿再回到那个只剩废墟与绝望的星球，选择在寂静的太空里结束求救，与这片星空为伴。',
  },
  {
    id: 'builtin-n02',
    title: '十楼的电梯',
    difficulty: 'normal',
    surface:
      '某人每天上班乘电梯到自己的楼层；晴天时他会在中途某层下电梯，再走楼梯上去。只有下雨天，他才会一路乘电梯直达。',
    bottom:
      '他个子很矮，独自够不到高层按钮，只能按到有人进出的低层再爬楼梯。雨天他会带长柄伞，用伞尖才能按到自己要去的楼层。',
  },
  {
    id: 'builtin-h01',
    title: '沙漠里的行李',
    difficulty: 'hard',
    surface:
      '一具尸体躺在沙漠中央，身边散落着打开的行李箱和半根火柴。周围没有脚印延伸向远方。',
    bottom:
      '他与同伴乘热气球穿越沙漠，超载即将坠毁。大家扔掉行李仍不够，便抽签决定谁跳下去——抽中的签是半根火柴。他抽中最短的那根，跳下了热气球。',
  },
  {
    id: 'builtin-h02',
    title: '海龟汤',
    difficulty: 'hard',
    surface:
      '一个人在餐厅点了一碗海龟汤，尝了一口后突然冲出店外，结束了自己的生命。',
    bottom:
      '他曾与同伴海难漂流，同伴「割肉」给他充饥，他活了下来却一直愧疚。多年后在这家餐厅喝到真正的海龟汤，发现味道与当年完全不同，才意识到当时吃的并不是海龟，而是同伴的身体。',
  },
] as const satisfies readonly TTurtleSoupStory[];

export function findStoryById(id: string): TTurtleSoupStory | undefined {
  return stories.find((s) => s.id === id);
}
