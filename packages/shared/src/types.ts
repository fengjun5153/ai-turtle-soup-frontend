// ============ 服务端内部（绝不下发客户端）============

export interface TGameSession {
  gameId: string;
  storyId: string;
  title: string;
  surface: string;
  truth: string;
  difficulty: 'easy' | 'normal' | 'hard';
  evidenceThreshold: number;
  phase: 'playing' | 'solved' | 'revealed';
  questionCount: number;
  evidence: TEvidence[];
  sanity: number;
  dialogue: TDialogueTurn[];
  consecutiveIrrelevant: number;
  createdAt: number;
}

// ============ 题库 ============

export interface TStory {
  id: string;
  title: string;
  surface: string;
  truth: string;
  difficulty: 'easy' | 'normal' | 'hard';
  evidenceThreshold: number;
  tags: string[];
  source: 'builtin' | 'generated';
  createdAt: number;
}

// ============ 线索 ============

export interface TEvidence {
  question: string;
  confirmedAt: number;
}

// ============ 对话 ============

export interface TDialogueTurn {
  role: 'user' | 'assistant';
  content: string;
}

export interface TMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  answer?: 'yes' | 'no' | 'irrelevant' | 'solved';
  timestamp: number;
}

// ============ AI 裁判结果 ============

export interface TJudgeResult {
  answer: 'yes' | 'no' | 'irrelevant' | 'solved';
  rawAnswer: string;
  isNewEvidence: boolean;
  sanityDelta: number;
}

// ============ 前端游戏状态 ============

export interface TGameState {
  gameId: string | null;
  storyId: string | null;
  phase: 'idle' | 'playing' | 'solved' | 'revealed';
  surface: string | null;
  title: string | null;
  difficulty: 'easy' | 'normal' | 'hard' | null;
  evidenceThreshold: number;
  messages: TMessage[];
  evidence: TEvidence[];
  sanity: number;
  mistLevel: number;
  questionCount: number;
  isLoading: boolean;
}

// ============ 错误码 ============

export type TErrorCode =
  | 'INVALID_GAME_ID'
  | 'GAME_OVER'
  | 'RATE_LIMITED'
  | 'AI_UNAVAILABLE'
  | 'INVALID_QUESTION';

// ============ API 响应 ============

export interface TApiResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: {
    code: TErrorCode;
    message: string;
  };
}
