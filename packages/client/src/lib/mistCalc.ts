/**
 * mistLevel = min(100, (evidence数 / 阈值) × 100)
 * 前端纯规则计算，不依赖 AI，保证一致性
 */
export function calcMistLevel(evidenceCount: number, threshold: number): number {
  if (threshold <= 0) return 0;
  return Math.min(100, Math.round((evidenceCount / threshold) * 100));
}

/**
 * mistLevel → CSS blur 值
 * mistLevel=0 时: blur=12px（全迷雾）
 * mistLevel=100 时: blur=0px（全清晰）
 */
export function calcBlur(mistLevel: number): number {
  return ((100 - mistLevel) / 100) * 12;
}
