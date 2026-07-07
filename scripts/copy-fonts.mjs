/**
 * Copia os .woff2 (subset latin) do @fontsource para public/fonts,
 * com os nomes que o tokens.css espera. Rodar: node scripts/copy-fonts.mjs
 */
import { copyFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public', 'fonts');
mkdirSync(out, { recursive: true });

const fonts = [
  ['@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff2', 'cormorant-garamond-500.woff2'],
  ['@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-italic.woff2', 'cormorant-garamond-500-italic.woff2'],
  ['@fontsource/cormorant-garamond/files/cormorant-garamond-latin-600-normal.woff2', 'cormorant-garamond-600.woff2'],
  ['@fontsource/cinzel/files/cinzel-latin-500-normal.woff2', 'cinzel-500.woff2'],
  ['@fontsource/jost/files/jost-latin-300-normal.woff2', 'jost-300.woff2'],
  ['@fontsource/jost/files/jost-latin-500-normal.woff2', 'jost-500.woff2'],
];

for (const [src, dest] of fonts) {
  const from = join(root, 'node_modules', src);
  if (!existsSync(from)) {
    console.error(`✗ não encontrado: ${src}`);
    process.exitCode = 1;
    continue;
  }
  copyFileSync(from, join(out, dest));
  console.log(`✓ ${dest}`);
}
