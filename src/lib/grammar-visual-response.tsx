import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import GrammarVisualImage from '@/components/grammar/GrammarVisualImage'
import { getTopicBySlug } from '@/data/grammar/registry'
import { isGrammarVisualLanguage, isGrammarVisualLevel } from '@/lib/grammar-visual'

export type GrammarVisualParams = { idioma: string; nivel: string; slug: string }
type ImageFont = { name: string; data: ArrayBuffer; weight: 400 | 700; style: 'normal' }

const FONT_PREFIXES: Partial<Record<string, Array<'ja' | 'ko' | 'ru'>>> = {
  coreano: ['ko', 'ja'],
  ruso: ['ja'],
}

const fontPromises = new Map<string, Promise<ImageFont[]>>()

function toArrayBuffer(buffer: Buffer): ArrayBuffer {
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer
}

function loadFonts(idioma: string): Promise<ImageFont[]> {
  const prefixes = FONT_PREFIXES[idioma] ?? ['ja']
  const cacheKey = prefixes.join('-')
  const cached = fontPromises.get(cacheKey)
  if (cached) return cached

  const promise = Promise.all(prefixes.flatMap((prefix) => [
    readFile(join(process.cwd(), 'public', 'fonts', `welearn-${prefix}-400.ttf`)),
    readFile(join(process.cwd(), 'public', 'fonts', `welearn-${prefix}-700.ttf`)),
  ])).then((buffers) => prefixes.flatMap((prefix, index) => [
    { name: `WeLearn ${prefix}`, data: toArrayBuffer(buffers[index * 2]), weight: 400 as const, style: 'normal' as const },
    { name: `WeLearn ${prefix}`, data: toArrayBuffer(buffers[index * 2 + 1]), weight: 700 as const, style: 'normal' as const },
  ]))

  fontPromises.set(cacheKey, promise)
  return promise
}

export async function renderGrammarVisual({ idioma, nivel, slug }: GrammarVisualParams) {
  if (!isGrammarVisualLanguage(idioma) || !isGrammarVisualLevel(nivel)) {
    return new Response('Imagen no encontrada', { status: 404 })
  }

  const topic = getTopicBySlug(idioma, nivel, slug)
  if (!topic) return new Response('Imagen no encontrada', { status: 404 })

  const fonts = await loadFonts(idioma)
  const fontFamily = (FONT_PREFIXES[idioma] ?? ['ja']).map((prefix) => `WeLearn ${prefix}`).join(', ')
  const response = new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', fontFamily }}>
      <GrammarVisualImage topic={topic} idioma={idioma} nivel={nivel} />
    </div>,
    { width: 1200, height: 630, fonts }
  )

  response.headers.set('Cache-Control', 'public, max-age=86400, s-maxage=31536000, stale-while-revalidate=604800')
  response.headers.set('Content-Disposition', `inline; filename="idiomaswl-${idioma}-${nivel}-${slug}.png"`)
  response.headers.set('X-WeLearn-Visual-System', 'purpose-v2')
  return response
}
