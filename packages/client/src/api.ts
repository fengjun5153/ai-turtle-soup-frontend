import type { TTurtleSoupStory } from './data/stories';

/** 与题库条目一致的故事类型（函数签名沿用 Story 命名） */
export type Story = TTurtleSoupStory;

const DEFAULT_BACKEND_API_BASE = '/api';
const CHAT_API_PATH = '/chat';
const REQUEST_TIMEOUT_MS = 45_000;
const ENABLE_CHAT_DEBUG =
  import.meta.env.DEV || import.meta.env.VITE_DEBUG_CHAT === 'true';

function chatDebugLog(label: string, payload?: unknown): void {
  if (!ENABLE_CHAT_DEBUG) return;
  const time = new Date().toISOString();
  if (payload === undefined) {
    console.log(`[chat][${time}] ${label}`);
    return;
  }
  console.log(`[chat][${time}] ${label}`, payload);
}

interface TBackendChatResponse {
  ok?: boolean;
  answer?: string;
  reply?: string;
  message?: string;
  data?:
    | string
    | {
        answer?: string;
        reply?: string;
        message?: string;
      };
  error?: {
    message?: string;
  };
}

export class AskAIError extends Error {
  readonly statusCode?: number;

  constructor(message: string, statusCode?: number, options?: { cause?: unknown }) {
    super(message, options);
    this.name = 'AskAIError';
    this.statusCode = statusCode;
  }
}

/**
 * 调用大模型进行海龟汤「是/否/无关」判定。
 * 前后端分离：统一调用后端 /api/chat。
 */
export async function askAI(question: string, story: Story): Promise<string> {
  const q = question.trim();
  if (!q) {
    throw new AskAIError('提问不能为空');
  }

  const base =
    import.meta.env.VITE_API_BASE?.replace(/\/$/, '') || DEFAULT_BACKEND_API_BASE;
  const url = `${base}${CHAT_API_PATH}`;
  const requestPayload = {
    question: q,
    storyId: story.id,
  };

  chatDebugLog('request:start', { url, payload: requestPayload });

  let res: Response;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestPayload),
      signal: controller.signal,
    });
  } catch (e) {
    chatDebugLog('request:network_error', {
      message: e instanceof Error ? e.message : String(e),
      storyId: story.id,
    });
    if (e instanceof DOMException && e.name === 'AbortError') {
      throw new AskAIError('AI 请求超时', undefined, { cause: e });
    }
    throw new AskAIError(
      e instanceof Error ? e.message : '网络错误，无法连接 AI 服务',
      undefined,
      { cause: e },
    );
  } finally {
    clearTimeout(timer);
  }

  let bodyJson: unknown;
  try {
    bodyJson = await res.json();
    chatDebugLog('response:raw', { status: res.status, body: bodyJson });
  } catch {
    chatDebugLog('response:invalid_json', { status: res.status });
    throw new AskAIError(
      `AI 响应不是合法 JSON（HTTP ${res.status}）`,
      res.status,
    );
  }

  const data = bodyJson as TBackendChatResponse;
  if (!res.ok || data.ok === false) {
    const msg =
      data.error?.message ||
      data.message ||
      (typeof bodyJson === 'object' && bodyJson !== null
        ? JSON.stringify(bodyJson)
        : `HTTP ${res.status}`);
    chatDebugLog('response:error', {
      status: res.status,
      message: msg,
      storyId: story.id,
    });
    throw new AskAIError(`AI 接口错误：${msg}`, res.status);
  }

  const nested =
    typeof data.data === 'object' && data.data !== null ? data.data : undefined;

  const text =
    data.answer?.trim() ||
    data.reply?.trim() ||
    data.message?.trim() ||
    (typeof data.data === 'string' ? data.data.trim() : undefined) ||
    nested?.answer?.trim() ||
    nested?.reply?.trim() ||
    nested?.message?.trim();

  if (!text) {
    chatDebugLog('response:empty_text', { storyId: story.id, body: data });
    throw new AskAIError('AI 返回内容为空');
  }

  chatDebugLog('response:success', {
    storyId: story.id,
    answerPreview: text.slice(0, 120),
  });

  return text;
}
