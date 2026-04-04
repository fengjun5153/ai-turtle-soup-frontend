/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE?: string;
  readonly VITE_DEBUG_CHAT?: string;
  /** DeepSeek API Key（默认服务） */
  readonly VITE_DEEPSEEK_API_KEY?: string;
  /** 通用兼容接口密钥（未配置 DeepSeek 时可用） */
  readonly VITE_AI_API_KEY?: string;
  /** 通义千问（DashScope），可选回退 */
  readonly VITE_QIANWEN_API_KEY?: string;
  readonly VITE_DASHSCOPE_API_KEY?: string;
  readonly VITE_AI_API_BASE?: string;
  readonly VITE_AI_MODEL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
