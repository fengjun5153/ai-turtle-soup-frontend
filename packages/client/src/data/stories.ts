/**
 * 内置海龟汤题库（汤面 surface / 汤底 bottom）
 * id 须与后端 stories.json / GET /api/stories 一致；聊天判定只传 storyId，不提交汤底。
 * bottom 仅用于本地「查看汤底」结果页；若你希望生产环境完全不打包汤底，可改为从后端拉取再展示。
 */

/** 难度：影响证据阈值与提示强度（与游戏状态机一致） */
export type TStoryDifficulty = 'easy' | 'normal' | 'hard';

/** 单条海龟汤故事 */
export interface TTurtleSoupStory {
  id: string;
  title: string;
  difficulty: TStoryDifficulty;
  surface: string;
  /** 汤底（与后端 truth 对应，供结果页展示） */
  bottom: string;
  evidenceThreshold?: number;
  tags?: string[];
}

export const stories: readonly TTurtleSoupStory[] = [
  {
    id: 'builtin-001',
    title: '雨中的男人',
    difficulty: 'easy',
    surface:
      '一个男人在大雨中站着，身旁地上有一把完好的雨伞，他却始终没有把伞打开。',
    bottom:
      '男人是盲人，感觉不到下雨，也不知道旁边有一把伞——那把伞是别人遗落在此的，与他无关。',
  },
  {
    id: 'builtin-002',
    title: '最后的信号',
    difficulty: 'normal',
    surface:
      '一名宇航员独自漂浮在太空中，望着舷窗外的地球，微笑着关掉了求救信号。',
    bottom:
      '他得知地球刚刚爆发了足以灭绝人类的灾难，亲人和熟悉的世界已不复存在。他不愿再回到那个只剩废墟与绝望的星球，选择在寂静的太空里结束求救，与这片星空为伴。',
  },
  {
    id: 'builtin-003',
    title: '十楼的电梯',
    difficulty: 'normal',
    surface:
      '某人每天上班乘电梯到自己的楼层；晴天时他会在中途某层下电梯，再走楼梯上去。只有下雨天，他才会一路乘电梯直达。',
    bottom:
      '他个子很矮，独自够不到高层按钮，只能按到有人进出的低层再爬楼梯。雨天他会带长柄伞，用伞尖才能按到自己要去的楼层。',
  },
  {
    id: 'builtin-004',
    title: '沙漠里的行李',
    difficulty: 'hard',
    surface:
      '一具尸体躺在沙漠中央，身边散落着打开的行李箱和半根火柴。周围没有脚印延伸向远方。',
    bottom:
      '他与同伴乘热气球穿越沙漠，超载即将坠毁。大家扔掉行李仍不够，便抽签决定谁跳下去——抽中的签是半根火柴。他抽中最短的那根，跳下了热气球。',
  },
  {
    id: 'builtin-005',
    title: '海龟汤',
    difficulty: 'hard',
    surface:
      '一个人在餐厅点了一碗海龟汤，尝了一口后突然冲出店外，结束了自己的生命。',
    bottom:
      '他曾与同伴海难漂流，同伴「割肉」给他充饥，他活了下来却一直愧疚。多年后在这家餐厅喝到真正的海龟汤，发现味道与当年完全不同，才意识到当时吃的并不是海龟，而是同伴的身体。',
  },
  {
    id: 'builtin-n06',
    title: '空笼清晨',
    difficulty: 'easy',
    evidenceThreshold: 5,
    tags: ['日常', '反转', '轻松'],
    surface:
      '周一清晨，饲养员打开猛兽区，发现所有笼舍都空了，地面干干净净，昨夜监控正好检修。园长却在办公室淡定喝咖啡。',
    bottom:
      '周日是全园动物防疫转运日，猛兽被临时移到后场检疫区，笼舍冲洗消毒，监控按计划停机维护。新员工没看交接公告，虚惊一场。',
  },
  {
    id: 'builtin-n07',
    title: '过山车定格',
    difficulty: 'easy',
    evidenceThreshold: 5,
    tags: ['反转', '轻松'],
    surface:
      '过山车爬到最高点突然停住，车上游客一片安静，下面的工作人员却齐齐松了口气。',
    bottom:
      '这是在拍影视素材，车上的「游客」都是演员，停车是导演要的定格镜头；工作人员怕的是真故障，确认是拍摄调度后才放心。',
  },
  {
    id: 'builtin-n08',
    title: '寄给空屋的信',
    difficulty: 'normal',
    evidenceThreshold: 8,
    tags: ['日常', '反转'],
    surface:
      '邮差坚持把信塞进一栋已拆迁、只剩门牌和旧信箱的工地围栏。路人觉得诡异报了警，警察却协助他完成投递。',
    bottom:
      '老屋属文保「原址迁建」，法律文书仍认可该信箱为有效送达地址。邮差按法院专递要求留痕，警察在场是见证程序合法。',
  },
  {
    id: 'builtin-n09',
    title: '许愿星不见了',
    difficulty: 'easy',
    evidenceThreshold: 5,
    tags: ['日常', '温馨', '反转'],
    surface:
      '生日派对上蛋糕完整摆在桌心，蜡烛吹灭后，小寿星却大哭说有人偷吃了她的愿望。',
    bottom:
      '蛋糕上只有一颗糖做的「许愿星」。弟弟趁大家唱歌时偷偷舔化了糖星，蛋糕体没被动过。孩子说的「愿望」指的是那颗糖。',
  },
  {
    id: 'builtin-n10',
    title: '古树低语',
    difficulty: 'normal',
    evidenceThreshold: 8,
    tags: ['悬疑', '反转', '科技'],
    surface:
      '游客对着千年古树拍照，无线耳机里突然传出细语，景区当天就封锁了那片林子。',
    bottom:
      '景区新装的蓝牙 AR 导览串频，耳机误连了隔壁展区的语音包。封锁是为了排查设备、避免「闹鬼」谣言扩散，并非真有灵异。',
  },
  {
    id: 'builtin-n11',
    title: '蓝车疑云',
    difficulty: 'hard',
    evidenceThreshold: 12,
    tags: ['推理', '硬核'],
    surface:
      '目击者一口咬定肇事车是蓝色，道路监控里同一辆车却是红色，法官仍采信了目击证词。',
    bottom:
      '事发在钠灯照明的路段，红色车漆在强黄光下泛出明显的蓝紫偏色；法官结合漆面反光实验与其它物证，认定监控色彩失真，目击者方向判断无误。',
  },
  {
    id: 'builtin-n12',
    title: '砸琴与掌声',
    difficulty: 'hard',
    evidenceThreshold: 12,
    tags: ['艺术', '反转'],
    surface:
      '钢琴家演奏会弹到一半突然合上琴盖、起身离场，观众却起立鼓掌久久不散。',
    bottom:
      '当晚曲目单最后一首是约定的先锋互动作品：以「砸合琴盖」作为终章动作，象征打破古典范式。懂行的观众在完成仪式后鼓掌，并非演出事故。',
  },
  {
    id: 'builtin-n13',
    title: '只按十八楼',
    difficulty: 'normal',
    evidenceThreshold: 8,
    tags: ['日常', '推理'],
    surface:
      '她住在二十层，每晚回家进电梯却都只按到十八层，再走两层楼梯。',
    bottom:
      '大厦十八层以上需业主门禁卡才能按亮。她是租客，二房东只给她开通到十八层的电梯权限，剩下两层只能走消防楼梯上去。',
  },
  {
    id: 'builtin-n14',
    title: '父亲的第二封信',
    difficulty: 'normal',
    evidenceThreshold: 8,
    tags: ['情感', '温馨'],
    surface:
      '父亲葬礼后，儿子收到父亲生前预约寄出的一封信，读完立刻订了出国的机票，母亲却一点也不意外。',
    bottom:
      '信里是父亲写的「遗愿清单」：希望儿子替他去年轻时失约的异国故友墓前道一声歉。母亲早就知道遗嘱与定时邮件的安排。',
  },
] as const satisfies readonly TTurtleSoupStory[];

export function findStoryById(id: string): TTurtleSoupStory | undefined {
  return stories.find((s) => s.id === id);
}
