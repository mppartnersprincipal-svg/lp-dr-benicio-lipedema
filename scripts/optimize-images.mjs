/**
 * Gera as imagens otimizadas da LP a partir de assets-src/.
 * Rodar: node scripts/optimize-images.mjs
 * Saídas (public/images): hero e autoridade em AVIF+WebP (480/800/1200),
 * logo redimensionada, og.jpg 1200×630 e favicons PNG.
 */
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = (f) => join(root, 'assets-src', f);
const out = (f) => join(root, 'public', 'images', f);
mkdirSync(join(root, 'public', 'images'), { recursive: true });

const WIDTHS = [480, 800, 1200];

/** Retrato 3:4 nos formatos/larguras da LP */
async function portrait(input, name) {
  for (const w of WIDTHS) {
    const h = Math.round((w * 4) / 3);
    const base = sharp(src(input)).resize(w, h, { fit: 'cover', position: 'attention' });
    await base.clone().avif({ quality: 50 }).toFile(out(`${name}-${w}.avif`));
    await base.clone().webp({ quality: 78 }).toFile(out(`${name}-${w}.webp`));
    console.log(`✓ ${name}-${w} (avif+webp)`);
  }
}

async function logo() {
  await sharp(src('logo-benicio.webp')).resize({ width: 420 }).webp({ quality: 88 }).toFile(out('logo-benicio.webp'));
  console.log('✓ logo-benicio.webp (420w)');
}

/** OG 1200×630 sem texto: gradiente navy + retrato à direita + card branco com a logo */
async function ogImage() {
  const W = 1200, H = 630;
  const gradient = Buffer.from(
    `<svg width="${W}" height="${H}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0C2340"/><stop offset="1" stop-color="#16375F"/></linearGradient></defs>
      <rect width="${W}" height="${H}" fill="url(#g)"/>
      <rect x="60" y="150" width="560" height="330" rx="24" fill="#FFFFFF"/></svg>`
  );
  const photo = await sharp(src('hero.jpg'))
    .resize(473, H, { fit: 'cover', position: 'attention' })
    .toBuffer();
  const logoBuf = await sharp(src('logo-benicio.webp')).resize({ width: 460 }).png().toBuffer();
  await sharp(gradient)
    .composite([
      { input: photo, left: W - 473, top: 0 },
      { input: logoBuf, left: 110, top: 238 },
    ])
    .jpeg({ quality: 82 })
    .toFile(out('og.jpg'));
  console.log('✓ og.jpg (1200×630)');
}

/** Favicons PNG a partir do favicon.svg (monograma B) */
async function favicons() {
  const svg = join(root, 'public', 'favicon.svg');
  await sharp(svg).resize(32, 32).png().toFile(join(root, 'public', 'favicon-32.png'));
  await sharp(svg).resize(180, 180).png().toFile(join(root, 'public', 'apple-touch-icon.png'));
  console.log('✓ favicon-32.png · apple-touch-icon.png');
}

await portrait('hero.jpg', 'hero');
await portrait('autoridade.jpg', 'autoridade');
await logo();
await ogImage();
await favicons();
console.log('Concluído.');
