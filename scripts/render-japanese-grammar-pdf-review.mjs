import { readdirSync } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const REVIEW = path.join(ROOT, 'tmp', 'japanese-grammar-pdf-review')
const PAGES = path.join(REVIEW, 'pages')
const SHEETS = path.join(REVIEW, 'sheets')
await mkdir(PAGES, { recursive: true }); await mkdir(SHEETS, { recursive: true })

for (const level of ['a2', 'b1']) {
  const directory = path.join(ROOT, 'public', 'downloads', `japanese-${level}`, 'grammar')
  const pdfs = readdirSync(directory).filter((file) => file.endsWith('.pdf')).sort()
  for (const pdf of pdfs) {
    const prefix = path.join(PAGES, `${level}-${pdf.replace(/\.pdf$/u, '')}`)
    const result = spawnSync('pdftoppm', ['-png', '-r', '60', path.join(directory, pdf), prefix], { encoding: 'utf8' })
    if (result.status !== 0) throw new Error(`${pdf}: ${result.stderr}`)
  }
}

const pages = readdirSync(PAGES).filter((file) => file.endsWith('.png')).sort()
const cellW = 280; const cellH = 396; const cols = 5; const rows = 4; const perSheet = cols * rows
for (let offset = 0; offset < pages.length; offset += perSheet) {
  const batch = pages.slice(offset, offset + perSheet)
  const composite = []
  for (const [index, file] of batch.entries()) {
    const input = await sharp(path.join(PAGES, file)).resize({ width: cellW - 12, height: cellH - 12, fit: 'contain', background: '#ffffff' }).png().toBuffer()
    composite.push({ input, left: (index % cols) * cellW + 6, top: Math.floor(index / cols) * cellH + 6 })
  }
  const target = path.join(SHEETS, `sheet-${String(offset / perSheet + 1).padStart(2, '0')}.png`)
  await sharp({ create: { width: cellW * cols, height: cellH * rows, channels: 3, background: '#cbd2e3' } }).composite(composite).png().toFile(target)
  console.log(path.relative(ROOT, target))
}
console.log(JSON.stringify({ pdfs: 50, pages: pages.length, sheets: Math.ceil(pages.length / perSheet) }))
