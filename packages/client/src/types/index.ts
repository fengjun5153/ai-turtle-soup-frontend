// 前端类型定义（与 @fog-of-truth/shared 保持一致）

export interface TEvidence {
  question: string;
  confirmedAt: number;
}

export interface TMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  answer?: 'yes' | 'no' | 'irrelevant' | 'solved';
  timestamp: number;
}

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

export type TGameAction =
  | { type: 'GAME_STARTED'; payload: Partial<TGameStartedPayload> }
  | { type: 'QUESTION_SENT'; payload: { id: string; question: string } }
  | { type: 'ANSWER_RECEIVED'; payload: TAnswerReceivedPayload }
  | { type: 'UPDATE_STREAMING'; payload: { id: string; text: string } }
  | { type: 'GAME_RESTORED'; payload: Partial<TGameState> }
  | { type: 'SET_LOADING'; payload: boolean };

interface TGameStartedPayload {
  gameId: string;
  storyId: string;
  surface: string;
  title: string;
  difficulty: 'easy' | 'normal' | 'hard';
  evidenceThreshold: number;
}

interface TAnswerReceivedPayload {
  messageId: string;
  question: string;
  displayText: string;
  answer: 'yes' | 'no' | 'irrelevant' | 'solved';
  isNewEvidence: boolean;
  sanityDelta: number;
}
