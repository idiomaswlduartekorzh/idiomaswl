import type { CSSProperties, ReactNode } from 'react'
import type { GrammarTopic } from '@/data/grammar/types'
import { buildGrammarVisualBlueprint, type GrammarVisualBlueprint } from '@/lib/grammar-visual-blueprint'
import { GRAMMAR_VISUAL_LANGUAGES, type GrammarVisualLanguage } from '@/lib/grammar-visual'

type LanguageTheme = (typeof GRAMMAR_VISUAL_LANGUAGES)[GrammarVisualLanguage]

const ink = '#17213a'
const muted = '#5b667a'
const line = '#dce2ec'

const ENGLISH_EYEBROWS: Record<GrammarVisualBlueprint['kind'], string> = {
  script: 'WRITING MAP',
  contrast: 'KEY COMPARISON',
  reference: 'REFERENCE TABLE',
  transformation: 'KEY TRANSFORMATIONS',
  timeline: 'BEFORE · CHANGE · RESULT',
  structure: 'HOW IT WORKS',
  usage: 'USAGE MAP',
}

function clip(value: string, max: number): string {
  const safeValue = value.replace(/[✗❌]/g, 'NO').replace(/[✓✅]/g, 'OK').trim()
  const characters = Array.from(safeValue)
  return characters.length > max ? `${characters.slice(0, max - 1).join('')}…` : safeValue
}

function Frame({
  topic,
  language,
  nivel,
  blueprint,
  english,
  children,
}: {
  topic: GrammarTopic
  language: LanguageTheme
  nivel: string
  blueprint: GrammarVisualBlueprint
  english: boolean
  children: ReactNode
}) {
  const titleSize = topic.shortTitle.length > 38 ? 36 : topic.shortTitle.length > 25 ? 42 : 48
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', background: '#fbfcff', color: ink }}>
      <div style={{ height: 14, display: 'flex', background: language.accent }} />
      <div style={{ height: 90, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 42px 14px', borderBottom: `1px solid ${line}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', background: language.deep, color: '#fff', fontSize: 22, fontWeight: 700 }}>W</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: language.deep }}>Idiomas WeLearn</span>
            <span style={{ marginTop: 2, fontSize: 12, color: muted, letterSpacing: 1.3 }}>{english ? 'VISUAL GUIDE FOR ENGLISH LEARNERS' : 'GUÍA VISUAL PARA HISPANOHABLANTES'}</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: language.accent, fontSize: 13, fontWeight: 700, letterSpacing: 1.2 }}>{english ? ENGLISH_EYEBROWS[blueprint.kind] : blueprint.eyebrow}</span>
          <span style={{ border: `2px solid ${language.deep}`, borderRadius: 999, padding: '8px 15px', color: language.deep, fontSize: 15, fontWeight: 700 }}>{language.native} · {nivel.toUpperCase()}</span>
        </div>
      </div>
      <div style={{ height: 110, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 28, padding: '16px 42px 12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <span style={{ color: language.accent, fontSize: 13, fontWeight: 700, letterSpacing: 1.2 }}>{clip(topic.category, 42).toUpperCase()}</span>
          <span style={{ marginTop: 5, color: language.deep, fontSize: titleSize, fontWeight: 700, lineHeight: 1.02, letterSpacing: -1.3 }}>{clip(topic.shortTitle, 64)}</span>
        </div>
        <span style={{ width: 390, color: muted, fontSize: 16, lineHeight: 1.32 }}>{clip(blueprint.purpose, 165)}</span>
      </div>
      <div style={{ display: 'flex', flex: 1, padding: '0 42px 26px' }}>{children}</div>
      <div style={{ height: 34, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 42px 14px', color: '#758094', fontSize: 12 }}>
        <span>{english ? 'Original content based on the complete lesson' : 'Contenido original basado en la lección completa'}</span>
        <strong style={{ color: language.deep }}>idiomaswl.com</strong>
      </div>
    </div>
  )
}

function TablePanel({ blueprint, language, dense = false, english = false }: { blueprint: GrammarVisualBlueprint; language: LanguageTheme; dense?: boolean; english?: boolean }) {
  const rows = blueprint.rows.slice(0, dense ? 10 : 6)
  const columns = Math.max(blueprint.headers.length, ...rows.map((row) => row.length))
  const firstWidth = columns >= 5 ? 82 : columns === 3 ? 190 : 220
  const rowFont = dense ? 16 : columns >= 3 ? 17 : 19
  const rowPadding = dense ? '5px 9px' : '9px 12px'

  const cellStyle = (index: number): CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    flex: index === 0 ? `0 0 ${firstWidth}px` : 1,
    padding: rowPadding,
    borderRight: index < columns - 1 ? `1px solid ${line}` : 'none',
    color: index === 0 ? language.deep : ink,
    fontSize: rowFont,
    fontWeight: index === 0 ? 700 : 500,
    lineHeight: 1.15,
  })

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', border: `1px solid ${line}`, borderRadius: 18, overflow: 'hidden', background: '#fff', boxShadow: '0 12px 35px rgba(23,33,58,.08)' }}>
      <div style={{ display: 'flex', minHeight: dense ? 34 : 42, background: language.deep, color: '#fff' }}>
        {Array.from({ length: columns }, (_, index) => (
          <span key={index} style={{ ...cellStyle(index), color: '#fff', fontSize: dense ? 13 : 14, letterSpacing: .7, textTransform: 'uppercase' }}>
            {clip(blueprint.headers[index] || (index === 0 ? (english ? 'group' : 'grupo') : ''), 28)}
          </span>
        ))}
      </div>
      {rows.map((row, rowIndex) => (
        <div key={`${rowIndex}-${row.join('|')}`} style={{ display: 'flex', flex: 1, minHeight: dense ? 30 : 46, background: rowIndex % 2 ? '#f7f9fc' : '#fff', borderTop: `1px solid ${line}` }}>
          {Array.from({ length: columns }, (_, index) => (
            <span key={index} style={cellStyle(index)}>{clip(row[index] || '—', dense ? 35 : 52)}</span>
          ))}
        </div>
      ))}
    </div>
  )
}

function ContrastPanel({ blueprint, language, english = false }: { blueprint: GrammarVisualBlueprint; language: LanguageTheme; english?: boolean }) {
  const headers = blueprint.headers.length >= 3 ? blueprint.headers.slice(1, 3) : (english ? ['OPTION A', 'OPTION B'] : ['OPCIÓN A', 'OPCIÓN B'])
  const rows = blueprint.rows.slice(0, 5)
  return (
    <div style={{ width: '100%', display: 'flex', gap: 18 }}>
      <div style={{ width: 178, display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 50 }}>
        {rows.map((row, index) => <span key={index} style={{ display: 'flex', alignItems: 'center', minHeight: 48, color: muted, fontSize: 15, fontWeight: 700 }}>{clip(row[0] || '', 28)}</span>)}
      </div>
      {headers.map((header, columnIndex) => (
        <div key={header} style={{ display: 'flex', flex: 1, flexDirection: 'column', border: `2px solid ${columnIndex === 0 ? language.accent : language.deep}`, borderRadius: 20, overflow: 'hidden', background: '#fff' }}>
          <div style={{ height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', background: columnIndex === 0 ? language.accent : language.deep, color: '#fff', fontSize: 21, fontWeight: 700 }}>{clip(header, 26)}</div>
          {rows.map((row, index) => (
            <div key={index} style={{ display: 'flex', flex: 1, minHeight: 48, alignItems: 'center', justifyContent: 'center', padding: '7px 14px', borderTop: index ? `1px solid ${line}` : 'none', color: columnIndex === 0 ? language.accent : language.deep, fontSize: 20, fontWeight: 700, textAlign: 'center' }}>
              {clip(row[columnIndex + 1] || row[columnIndex] || '—', 42)}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function TransformationPanel({ blueprint, language, english = false }: { blueprint: GrammarVisualBlueprint; language: LanguageTheme; english?: boolean }) {
  const rows = blueprint.rows.slice(0, 8)
  const midpoint = Math.ceil(rows.length / 2)
  const columns = [rows.slice(0, midpoint), rows.slice(midpoint)].filter((column) => column.length)
  return (
    <div style={{ width: '100%', display: 'flex', gap: 14 }}>
      {columns.map((column, columnIndex) => (
        <div key={columnIndex} style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 9 }}>
          {column.map((row, rowIndex) => {
            const index = columnIndex * midpoint + rowIndex
            return (
              <div key={`${index}-${row.join('|')}`} style={{ display: 'flex', flex: 1, minHeight: 66, alignItems: 'center', border: `1px solid ${line}`, borderLeft: `7px solid ${index % 2 ? language.deep : language.accent}`, borderRadius: 14, background: '#fff', padding: '9px 15px' }}>
                <span style={{ width: 148, color: muted, fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>{clip(row[2] || blueprint.headers[0] || (english ? 'form' : 'forma'), 25)}</span>
                <strong style={{ color: ink, fontSize: 20 }}>{clip(row[0] || '', 24)}</strong>
                <span style={{ margin: '0 12px', color: language.accent, fontSize: 22, fontWeight: 700 }}>→</span>
                <strong style={{ color: language.deep, fontSize: 20 }}>{clip(row[1] || '', 26)}</strong>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

function TimelinePanel({ blueprint, language, english = false }: { blueprint: GrammarVisualBlueprint; language: LanguageTheme; english?: boolean }) {
  const rows = blueprint.rows.slice(0, 4)
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        {rows.map((row, index) => (
          <div key={`${index}-${row.join('|')}`} style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
            <div style={{ minHeight: 190, display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', border: `2px solid ${index === rows.length - 1 ? language.accent : line}`, borderRadius: 20, background: index === rows.length - 1 ? language.soft : '#fff', padding: '18px 17px' }}>
              <span style={{ color: language.accent, fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>{english ? 'STEP' : 'PASO'} {index + 1}</span>
              <strong style={{ marginTop: 10, color: language.deep, fontSize: 23, lineHeight: 1.14 }}>{clip(row[0] || '', 44)}</strong>
              <span style={{ marginTop: 9, color: muted, fontSize: 15, lineHeight: 1.28 }}>{clip(row.slice(1).join(' · '), 78)}</span>
            </div>
            {index < rows.length - 1 ? <span style={{ margin: '0 7px', color: language.accent, fontSize: 30, fontWeight: 700 }}>→</span> : null}
          </div>
        ))}
      </div>
    </div>
  )
}

function StructurePanel({ topic, blueprint, language, english = false }: { topic: GrammarTopic; blueprint: GrammarVisualBlueprint; language: LanguageTheme; english?: boolean }) {
  const parts = blueprint.formulaParts.length > 1 ? blueprint.formulaParts : [topic.guide.formula]
  const examples = blueprint.rows.slice(0, 3)
  return (
    <div style={{ width: '100%', display: 'flex', gap: 22 }}>
      <div style={{ display: 'flex', flex: 1.1, flexDirection: 'column', justifyContent: 'center', borderRadius: 20, background: language.soft, padding: '22px 24px' }}>
        <span style={{ color: language.accent, fontSize: 13, fontWeight: 700, letterSpacing: 1.2 }}>{english ? 'FORMULA' : 'FÓRMULA'}</span>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 9, marginTop: 16 }}>
          {parts.map((part, index) => (
            <div key={`${index}-${part}`} style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ border: `2px solid ${index % 2 ? language.deep : language.accent}`, borderRadius: 13, background: '#fff', padding: '12px 15px', color: index % 2 ? language.deep : language.accent, fontSize: 21, fontWeight: 700 }}>{clip(part, 40)}</span>
              {index < parts.length - 1 ? <span style={{ marginLeft: 9, color: language.deep, fontSize: 22, fontWeight: 700 }}>+</span> : null}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flex: .9, flexDirection: 'column', gap: 9 }}>
        {examples.map((row, index) => (
          <div key={`${index}-${row.join('|')}`} style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', border: `1px solid ${line}`, borderLeft: `7px solid ${language.accent}`, borderRadius: 14, background: '#fff', padding: '10px 15px' }}>
            <strong style={{ color: language.deep, fontSize: 18 }}>{clip(row[0] || '', 48)}</strong>
            <span style={{ marginTop: 4, color: muted, fontSize: 14 }}>{clip(row.slice(1).join(' · '), 70)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function UsagePanel({ topic, blueprint, language, english = false }: { topic: GrammarTopic; blueprint: GrammarVisualBlueprint; language: LanguageTheme; english?: boolean }) {
  const rows = blueprint.rows.slice(0, 5)
  return (
    <div style={{ width: '100%', display: 'flex', alignItems: 'stretch', gap: 16 }}>
      <div style={{ width: 330, display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRadius: 24, background: language.deep, color: '#fff', padding: '24px' }}>
        <span style={{ color: language.accent, fontSize: 13, fontWeight: 700, letterSpacing: 1.2 }}>{english ? 'CORE IDEA' : 'IDEA CENTRAL'}</span>
        <strong style={{ marginTop: 12, fontSize: 25, lineHeight: 1.2 }}>{clip(topic.guide.formula, 92)}</strong>
        <span style={{ marginTop: 15, color: 'rgba(255,255,255,.72)', fontSize: 14, lineHeight: 1.35 }}>{clip(topic.guide.goal, 112)}</span>
      </div>
      <div style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 8 }}>
        {rows.map((row, index) => (
          <div key={`${index}-${row.join('|')}`} style={{ display: 'flex', flex: 1, alignItems: 'center', border: `1px solid ${line}`, borderRadius: 14, background: index % 2 ? '#f7f9fc' : '#fff', padding: '9px 14px' }}>
            <span style={{ width: 28, height: 28, flex: '0 0 28px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 9, background: language.accent, color: '#fff', fontSize: 13, fontWeight: 700 }}>{index + 1}</span>
            <strong style={{ width: 265, marginLeft: 13, color: language.deep, fontSize: 17 }}>{clip(row[0] || '', 44)}</strong>
            <span style={{ flex: 1, color: muted, fontSize: 14, lineHeight: 1.2 }}>{clip(row.slice(1).join(' · '), 68)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function GrammarVisualImage({ topic, idioma, nivel }: { topic: GrammarTopic; idioma: GrammarVisualLanguage; nivel: string }) {
  const language = GRAMMAR_VISUAL_LANGUAGES[idioma]
  const blueprint = buildGrammarVisualBlueprint(topic)
  const english = idioma === 'ingles' && ['b2', 'c1', 'c2'].includes(nivel.toLowerCase())
  let panel: ReactNode

  switch (blueprint.kind) {
    case 'script': panel = <TablePanel blueprint={blueprint} language={language} dense english={english} />; break
    case 'contrast': panel = <ContrastPanel blueprint={blueprint} language={language} english={english} />; break
    case 'reference': panel = <TablePanel blueprint={blueprint} language={language} english={english} />; break
    case 'transformation': panel = <TransformationPanel blueprint={blueprint} language={language} english={english} />; break
    case 'timeline': panel = <TimelinePanel blueprint={blueprint} language={language} english={english} />; break
    case 'structure': panel = <StructurePanel topic={topic} blueprint={blueprint} language={language} english={english} />; break
    default: panel = <UsagePanel topic={topic} blueprint={blueprint} language={language} english={english} />
  }

  return <Frame topic={topic} language={language} nivel={nivel} blueprint={blueprint} english={english}>{panel}</Frame>
}
