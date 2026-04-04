/**
 * 将 Vite 产物复制到仓库根目录 dist/，供 Vercel 等使用固定 outputDirectory。
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const src = path.join(root, 'packages', 'client', 'dist');
const dest = path.join(root, 'dist');

if (!fs.existsSync(src)) {
  console.error('[copy-client-dist] 源目录不存在:', src);
  console.error('[copy-client-dist] 请先执行: npm run build -w packages/client');
  process.exit(1);
}

fs.rmSync(dest, { recursive: true, force: true });
fs.cpSync(src, dest, { recursive: true });
console.log('[copy-client-dist]', src, '->', dest);
