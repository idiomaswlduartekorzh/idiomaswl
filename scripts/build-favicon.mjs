// Genera src/app/favicon.ico y src/app/apple-icon.png a partir de la marca
// de WeLearn (cuadro azul + "W" + guiones rojos). Uso: node scripts/build-favicon.mjs
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// Marca WeLearn, optimizada para tamaños pequeños (cuadro lleno, W centrada).
const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="#1a2ecc"/>
  <text x="16" y="22" font-family="Georgia,'Times New Roman',serif" font-size="20" font-weight="700" font-style="italic" fill="#ffffff" text-anchor="middle">W</text>
  <rect x="6"  y="26.5" width="8" height="3" rx="1.5" fill="#e8192c"/>
  <rect x="17" y="26.5" width="8" height="3" rx="1.5" fill="#e8192c"/>
</svg>`;

async function renderPng(size) {
  return sharp(Buffer.from(markSvg), { density: 384 })
    .resize(size, size, { fit: 'contain' })
    .png()
    .toBuffer();
}

// Construye un .ico con frames PNG embebidos (soportado por todos los navegadores modernos).
function buildIco(frames) {
  const count = frames.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);      // reserved
  header.writeUInt16LE(1, 2);      // type = icon
  header.writeUInt16LE(count, 4);  // number of images

  const dir = Buffer.alloc(16 * count);
  let offset = 6 + 16 * count;
  const blobs = [];
  frames.forEach((f, i) => {
    const e = i * 16;
    dir.writeUInt8(f.size >= 256 ? 0 : f.size, e + 0); // width
    dir.writeUInt8(f.size >= 256 ? 0 : f.size, e + 1); // height
    dir.writeUInt8(0, e + 2);   // color palette
    dir.writeUInt8(0, e + 3);   // reserved
    dir.writeUInt16LE(1, e + 4);   // color planes
    dir.writeUInt16LE(32, e + 6);  // bits per pixel
    dir.writeUInt32LE(f.png.length, e + 8);  // size of image data
    dir.writeUInt32LE(offset, e + 12);       // offset
    offset += f.png.length;
    blobs.push(f.png);
  });
  return Buffer.concat([header, dir, ...blobs]);
}

const sizes = [16, 32, 48];
const frames = [];
for (const size of sizes) {
  frames.push({ size, png: await renderPng(size) });
}
writeFileSync(join(root, 'src/app/favicon.ico'), buildIco(frames));
console.log('✓ src/app/favicon.ico  (' + sizes.join(', ') + ' px)');

// apple-icon para iOS (180x180, sin transparencia)
const apple = await sharp(Buffer.from(markSvg), { density: 384 })
  .resize(180, 180, { fit: 'contain' })
  .flatten({ background: '#1a2ecc' })
  .png()
  .toBuffer();
writeFileSync(join(root, 'src/app/apple-icon.png'), apple);
console.log('✓ src/app/apple-icon.png (180x180)');
