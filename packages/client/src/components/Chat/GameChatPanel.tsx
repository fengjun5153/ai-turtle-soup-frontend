import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import { askAI, AskAIError } from '../../api';
import type { TTurtleSoupStory } from '../../data/stories';
import LoadingDots from '../Shared/LoadingDots';

interface GameChatPanelProps {
  story: TTurtleSoupStory;
  disabled?: boolean;
}

type TChatRole = 'user' | 'assistant';

interface TChatMessage {
  id: string;
  role: TChatRole;
  content: string;
}

function newId(): string {
  return crypto.randomUUID();
}

function toFriendlyError(e: unknown): string {
  if (e instanceof AskAIError) {
    return e.message;
  }
  if (e instanceof Error) {
    return `暂时无法获取回答：${e.message}`;
  }
  return '服务暂时不可用，请检查网络后重试。';
}

const ENABLE_CHAT_DEBUG =
  import.meta.env.DEV || import.meta.env.VITE_DEBUG_CHAT === 'true';

export default function GameChatPanel({ story, disabled = false }: GameChatPanelProps) {
  const [messages, setMessages] = useState<TChatMessage[]>([]);
  const [draft, setDraft] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorHint, setErrorHint] = useState<string | null>(null);
  const listEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    listEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  const send = useCallback(async () => {
    const text = draft.trim();
    if (!text || isLoading || disabled) return;

    if (ENABLE_CHAT_DEBUG) {
      console.log('[chat-ui] send', {
        storyId: story.id,
        question: text,
      });
    }

    const userMessage: TChatMessage = {
      id: newId(),
      role: 'user',
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setDraft('');
    setErrorHint(null);
    setIsLoading(true);

    try {
      const answer = await askAI(text, story);
      if (ENABLE_CHAT_DEBUG) {
        console.log('[chat-ui] receive', {
          storyId: story.id,
          answerPreview: answer.slice(0, 120),
        });
      }
      setMessages((prev) => [
        ...prev,
        { id: newId(), role: 'assistant', content: answer },
      ]);
    } catch (e) {
      if (ENABLE_CHAT_DEBUG) {
        console.error('[chat-ui] error', {
          storyId: story.id,
          error: e instanceof Error ? e.message : e,
        });
      }
      setErrorHint(toFriendlyError(e));
    } finally {
      setIsLoading(false);
    }
  }, [draft, isLoading, story, disabled]);

  const retryLastQuestion = useCallback(() => {
    if (isLoading || disabled || messages.length === 0) return;
    const lastUserMessage = [...messages].reverse().find((m) => m.role === 'user');
    if (!lastUserMessage) return;
    setDraft(lastUserMessage.content);
    setErrorHint(null);
  }, [messages, isLoading, disabled]);

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void send();
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col rounded-lg border border-slate-700 bg-slate-800/40 shadow-lg">
      {errorHint && (
        <div
          className="mx-3 mt-3 rounded-lg border border-red-500/30 bg-red-950/40 px-3 py-2 text-sm text-red-200 transition-all duration-200"
          role="alert"
        >
          <p className="font-medium text-red-100">出错了，请稍后重试</p>
          <p className="mt-1 text-red-200/90">{errorHint}</p>
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={retryLastQuestion}
              disabled={isLoading || disabled}
              className="rounded-lg border border-red-300/30 px-2.5 py-1 text-xs text-red-100 transition-colors hover:bg-red-900/40 disabled:cursor-not-allowed disabled:opacity-60"
            >
              重试上一条
            </button>
            <button
              type="button"
              onClick={() => setErrorHint(null)}
              className="rounded-lg border border-red-300/20 px-2.5 py-1 text-xs text-red-200 transition-colors hover:bg-red-900/30"
            >
              关闭
            </button>
          </div>
        </div>
      )}

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-3 sm:px-4">
        {messages.length === 0 && !isLoading && (
          <div className="mx-auto max-w-md rounded-lg border border-slate-700/80 bg-slate-900/40 p-4 text-sm text-slate-400">
            <p className="text-center font-medium text-slate-300">
              {disabled ? '游戏已结束' : '开始你的第一次提问'}
            </p>
            <p className="mt-2 text-center text-xs leading-6 text-slate-500">
              {disabled
                ? '你可以查看汤底或返回大厅开启新的一局。'
                : '试试问身份、动机、地点、时间等关键线索。守密人只会回答「是 / 否 / 无关」。'}
            </p>
          </div>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[88%] rounded-lg px-3 py-2 text-sm leading-relaxed transition-transform duration-150 hover:scale-[1.01] sm:max-w-[75%] sm:px-4 sm:py-2.5 ${
                m.role === 'user'
                  ? 'bg-slate-700 text-slate-100'
                  : 'border border-amber-500/20 bg-slate-900/80 text-amber-100'
              }`}
            >
              {m.role === 'assistant' && (
                <p className="mb-1 text-xs font-medium text-amber-400/90">
                  守密人
                </p>
              )}
              <p className="whitespace-pre-wrap break-words">{m.content}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-lg border border-slate-600 bg-slate-900/60 px-4 py-2.5 text-sm text-slate-400">
              <span className="text-amber-400/80">守密人</span>
              <span className="ml-2 inline-flex items-center gap-2 text-slate-300">
                思考中...
                <LoadingDots />
              </span>
            </div>
          </div>
        )}

        <div ref={listEndRef} />
      </div>

      <div className="border-t border-slate-700 bg-slate-900/50 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-4">
        <label htmlFor="game-question" className="sr-only">
          输入问题
        </label>
        <textarea
          id="game-question"
          rows={3}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={isLoading || disabled}
          placeholder={
            disabled
              ? '游戏已结束'
              : '输入你的问题…（Enter 发送，Shift+Enter 换行）'
          }
          className="mb-2 w-full resize-none rounded-lg border border-slate-600 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 transition-colors focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/40 disabled:opacity-50"
        />
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => void send()}
            disabled={isLoading || !draft.trim() || disabled}
            className="rounded-lg bg-amber-500/90 px-4 py-2 text-sm font-medium text-slate-900 shadow-lg transition-all hover:bg-amber-400 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-400"
          >
            {isLoading ? '发送中...' : '发送'}
          </button>
        </div>
      </div>
    </div>
  );
}
