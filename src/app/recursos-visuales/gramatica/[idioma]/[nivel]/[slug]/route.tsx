import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { getTopicBySlug } from '@/data/grammar/registry'
import {
  GRAMMAR_VISUAL_LANGUAGES,
  isGrammarVisualLanguage,
  isGrammarVisualLevel,
} from '@/lib/grammar-visual'

export const runtime = 'nodejs'

type Params = { idioma: string; nivel: string; slug: string }
type ImageFont = { name: string; data: ArrayBuffer; weight: 400 | 700; style: 'normal' }

const FONT_PREFIXES: Partial<Record<string, Array<'ja' | 'ko' | 'ru'>>> = {
  coreano: ['ko', 'ja'],
  ruso: ['ja'],
}

const fontPromises = new Map<string, Promise<ImageFont[]>>()

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

function toArrayBuffer(buffer: Buffer): ArrayBuffer {
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer
}

function clip(value: string, max: number): string {
  const characters = Array.from(value.trim())
  return characters.length > max ? `${characters.slice(0, max - 1).join('')}…` : value.trim()
}

export async function GET(_request: Request, { params }: { params: Promise<Params> }) {
  const { idioma, nivel, slug } = await params
  if (!isGrammarVisualLanguage(idioma) || !isGrammarVisualLevel(nivel)) {
    return new Response('Imagen no encontrada', { status: 404 })
  }

  const topic = getTopicBySlug(idioma, nivel, slug)
  if (!topic) return new Response('Imagen no encontrada', { status: 404 })

  const language = GRAMMAR_VISUAL_LANGUAGES[idioma]
  const rows = topic.guide.table.slice(1, 4)
  const examples = rows.length ? rows : topic.visual.scene.slice(0, 3).map(([pattern, meaning]) => [pattern, meaning])
  const fonts = await loadFonts(idioma)
  const fontFamily = (FONT_PREFIXES[idioma] ?? ['ja']).map((prefix) => `WeLearn ${prefix}`).join(', ')
  const titleSize = topic.shortTitle.length > 42 ? 44 : topic.shortTitle.length > 28 ? 52 : 60
  const formulaSize = topic.guide.formula.length > 82 ? 25 : topic.guide.formula.length > 55 ? 29 : 34

  const response = new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', background: language.soft, color: '#17213a', fontFamily }}>
        <div style={{ position: 'absolute', width: 420, height: 420, borderRadius: 999, right: -150, top: -190, background: language.accent, opacity: .12 }} />
        <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: 999, left: -160, bottom: -170, background: language.deep, opacity: .1 }} />

        <div style={{ height: 18, display: 'flex', background: language.accent }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '34px 48px 22px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 50, height: 50, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', background: language.deep, color: '#fff', fontSize: 25, fontWeight: 700 }}>W</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 22, fontWeight: 700, color: language.deep }}>Idiomas WeLearn</span>
              <span style={{ marginTop: 2, fontSize: 14, color: '#667188', letterSpacing: 1.4 }}>EXPLICACIÓN VISUAL PARA HISPANOHABLANTES</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', border: `2px solid ${language.deep}`, borderRadius: 999, padding: '10px 18px', color: language.deep, fontSize: 17, fontWeight: 700 }}>{language.native} · {nivel.toUpperCase()}</div>
        </div>

        <div style={{ display: 'flex', flex: 1, gap: 34, padding: '0 48px 34px' }}>
          <div style={{ display: 'flex', flex: 1.28, flexDirection: 'column' }}>
            <span style={{ alignSelf: 'flex-start', borderRadius: 999, padding: '8px 14px', background: language.accent, color: '#fff', fontSize: 15, fontWeight: 700, letterSpacing: 1.1 }}>{clip(topic.category, 40).toUpperCase()}</span>
            <div style={{ marginTop: 18, color: language.deep, fontSize: titleSize, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2.1 }}>{clip(topic.shortTitle, 68)}</div>
            <div style={{ marginTop: 22, borderLeft: `8px solid ${language.accent}`, borderRadius: 16, background: '#fff', padding: '20px 24px', boxShadow: '0 16px 40px rgba(23,33,58,.09)', display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: language.accent, fontSize: 14, fontWeight: 700, letterSpacing: 1.4 }}>REGLA CENTRAL</span>
              <span style={{ marginTop: 10, color: language.deep, fontSize: formulaSize, fontWeight: 700, lineHeight: 1.18 }}>{clip(topic.guide.formula, 120)}</span>
            </div>
            <div style={{ marginTop: 20, color: '#4f5b72', fontSize: 18, lineHeight: 1.4 }}>{clip(topic.guide.goal, 145)}</div>
          </div>

          <div style={{ width: 420, display: 'flex', flexDirection: 'column', borderRadius: 24, background: language.deep, padding: '26px 24px', color: '#fff', boxShadow: '0 22px 50px rgba(23,33,58,.18)' }}>
            <span style={{ color: language.accent, fontSize: 14, fontWeight: 700, letterSpacing: 1.5 }}>EJEMPLOS CLAVE</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 18 }}>
              {examples.map((row, index) => (
                <div key={`${index}-${row.join('|')}`} style={{ minHeight: 92, display: 'flex', alignItems: 'center', gap: 14, border: '1px solid rgba(255,255,255,.18)', borderRadius: 15, background: 'rgba(255,255,255,.08)', padding: '12px 14px' }}>
                  <span style={{ width: 30, height: 30, flex: '0 0 30px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10, background: language.accent, fontSize: 14, fontWeight: 700 }}>{index + 1}</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <strong style={{ color: '#fff', fontSize: 19, lineHeight: 1.15 }}>{clip(row[0] ?? '', 48)}</strong>
                    <span style={{ color: 'rgba(255,255,255,.72)', fontSize: 14, lineHeight: 1.25 }}>{clip(row.slice(1).join(' · '), 76)}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,.2)', paddingTop: 16, color: 'rgba(255,255,255,.72)', fontSize: 14 }}><span>Guía completa + ejercicios</span><strong style={{ color: '#fff' }}>idiomaswl.com</strong></div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, fonts }
  )

  response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  response.headers.set('Content-Disposition', `inline; filename="idiomaswl-${idioma}-${nivel}-${slug}.png"`)
  return response
}
