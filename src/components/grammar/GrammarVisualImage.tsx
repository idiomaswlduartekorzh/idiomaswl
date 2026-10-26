import type { CSSProperties, ReactNode } from 'react'
import type { GrammarTopic } from '@/data/grammar/types'
import { buildGrammarVisualBlueprint, type GrammarVisualBlueprint } from '@/lib/grammar-visual-blueprint'
import { GRAMMAR_VISUAL_LANGUAGES, type GrammarVisualLanguage } from '@/lib/grammar-visual'

type LanguageTheme = (typeof GRAMMAR_VISUAL_LANGUAGES)[GrammarVisualLanguage]

const ink = '#17213a'
const muted = '#5b667a'
const line = '#dce2ec'

type VisualUi = { guide: string; footer: string; eyebrows: Record<GrammarVisualBlueprint['kind'], string>; group: string; optionA: string; optionB: string; form: string; step: string; formula: string; coreIdea: string }
const VISUAL_UI: Record<GrammarVisualLanguage, VisualUi> = {
  ingles: { guide: 'VISUAL GUIDE FOR ENGLISH LEARNERS', footer: 'Original content based on the complete lesson', eyebrows: { script:'WRITING MAP', contrast:'KEY COMPARISON', reference:'REFERENCE TABLE', transformation:'KEY TRANSFORMATIONS', timeline:'BEFORE · CHANGE · RESULT', structure:'HOW IT WORKS', usage:'USAGE MAP' }, group:'group', optionA:'OPTION A', optionB:'OPTION B', form:'form', step:'STEP', formula:'FORMULA', coreIdea:'CORE IDEA' },
  frances: { guide: 'GUIDE VISUEL POUR APPRENANTS', footer:'Contenu original tiré du cours complet', eyebrows:{ script:'CARTE D’ÉCRITURE', contrast:'COMPARAISON CLÉ', reference:'TABLEAU DE RÉFÉRENCE', transformation:'TRANSFORMATIONS CLÉS', timeline:'AVANT · CHANGEMENT · RÉSULTAT', structure:'CONSTRUCTION', usage:'CARTE D’USAGE' }, group:'groupe', optionA:'OPTION A', optionB:'OPTION B', form:'forme', step:'ÉTAPE', formula:'FORMULE', coreIdea:'IDÉE CENTRALE' },
  aleman: { guide:'VISUELLER LEITFADEN FÜR LERNENDE', footer:'Originalinhalt aus der vollständigen Lektion', eyebrows:{ script:'SCHREIBKARTE', contrast:'SCHLÜSSELVERGLEICH', reference:'ÜBERSICHTSTABELLE', transformation:'WICHTIGE UMWANDLUNGEN', timeline:'VORHER · ÄNDERUNG · ERGEBNIS', structure:'AUFBAU', usage:'GEBRAUCHSKARTE' }, group:'gruppe', optionA:'OPTION A', optionB:'OPTION B', form:'form', step:'SCHRITT', formula:'FORMEL', coreIdea:'KERNGEDANKE' },
  italiano: { guide:'GUIDA VISIVA PER STUDENTI', footer:'Contenuto originale tratto dalla lezione completa', eyebrows:{ script:'MAPPA DI SCRITTURA', contrast:'CONFRONTO CHIAVE', reference:'TABELLA DI RIFERIMENTO', transformation:'TRASFORMAZIONI CHIAVE', timeline:'PRIMA · CAMBIAMENTO · RISULTATO', structure:'COME SI COSTRUISCE', usage:'MAPPA D’USO' }, group:'gruppo', optionA:'OPZIONE A', optionB:'OPZIONE B', form:'forma', step:'PASSO', formula:'FORMULA', coreIdea:'IDEA CENTRALE' },
  portugues: { guide:'GUIA VISUAL PARA ESTUDANTES', footer:'Conteúdo original baseado na aula completa', eyebrows:{ script:'MAPA DE ESCRITA', contrast:'COMPARAÇÃO-CHAVE', reference:'TABELA DE REFERÊNCIA', transformation:'TRANSFORMAÇÕES-CHAVE', timeline:'ANTES · MUDANÇA · RESULTADO', structure:'COMO SE CONSTRÓI', usage:'MAPA DE USO' }, group:'grupo', optionA:'OPÇÃO A', optionB:'OPÇÃO B', form:'forma', step:'ETAPA', formula:'FÓRMULA', coreIdea:'IDEIA CENTRAL' },
  coreano: { guide:'한국어 학습자를 위한 시각 자료', footer:'전체 강의를 바탕으로 만든 독창적인 학습 자료', eyebrows:{ script:'쓰기 지도', contrast:'핵심 비교', reference:'참고표', transformation:'핵심 변환', timeline:'이전 · 변화 · 결과', structure:'구성 방식', usage:'사용 지도' }, group:'유형', optionA:'선택 A', optionB:'선택 B', form:'형태', step:'단계', formula:'공식', coreIdea:'핵심 개념' },
  japones: { guide:'日本語学習のための視覚ガイド', footer:'完全レッスンをもとにしたオリジナル教材', eyebrows:{ script:'書き方マップ', contrast:'重要な比較', reference:'参考表', transformation:'重要な変換', timeline:'前 · 変化 · 結果', structure:'組み立て方', usage:'使い分けマップ' }, group:'分類', optionA:'選択 A', optionB:'選択 B', form:'形', step:'段階', formula:'公式', coreIdea:'中心となる考え' },
  ruso: { guide:'ВИЗУАЛЬНЫЙ СПРАВОЧНИК', footer:'Оригинальный материал на основе полного урока', eyebrows:{ script:'КАРТА ПИСЬМА', contrast:'КЛЮЧЕВОЕ СРАВНЕНИЕ', reference:'СПРАВОЧНАЯ ТАБЛИЦА', transformation:'КЛЮЧЕВЫЕ ПРЕОБРАЗОВАНИЯ', timeline:'ДО · ИЗМЕНЕНИЕ · РЕЗУЛЬТАТ', structure:'КАК ЭТО УСТРОЕНО', usage:'КАРТА УПОТРЕБЛЕНИЯ' }, group:'группа', optionA:'ВАРИАНТ A', optionB:'ВАРИАНТ Б', form:'форма', step:'ШАГ', formula:'ФОРМУЛА', coreIdea:'ГЛАВНАЯ ИДЕЯ' },
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
  ui,
  children,
}: {
  topic: GrammarTopic
  language: LanguageTheme
  nivel: string
  blueprint: GrammarVisualBlueprint
  ui: VisualUi
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
            <span style={{ marginTop: 2, fontSize: 12, color: muted, letterSpacing: 1.3 }}>{ui.guide}</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ color: language.accent, fontSize: 13, fontWeight: 700, letterSpacing: 1.2 }}>{ui.eyebrows[blueprint.kind]}</span>
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
        <span>{ui.footer}</span>
        <strong style={{ color: language.deep }}>idiomaswl.com</strong>
      </div>
    </div>
  )
}

function TablePanel({ blueprint, language, dense = false, ui }: { blueprint: GrammarVisualBlueprint; language: LanguageTheme; dense?: boolean; ui: VisualUi }) {
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
            {clip(blueprint.headers[index] || (index === 0 ? ui.group : ''), 28)}
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

function ContrastPanel({ blueprint, language, ui }: { blueprint: GrammarVisualBlueprint; language: LanguageTheme; ui: VisualUi }) {
  const headers = blueprint.headers.length >= 3 ? blueprint.headers.slice(1, 3) : [ui.optionA, ui.optionB]
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

function TransformationPanel({ blueprint, language, ui }: { blueprint: GrammarVisualBlueprint; language: LanguageTheme; ui: VisualUi }) {
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
                <span style={{ width: 148, color: muted, fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>{clip(row[2] || blueprint.headers[0] || ui.form, 25)}</span>
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

function TimelinePanel({ blueprint, language, ui }: { blueprint: GrammarVisualBlueprint; language: LanguageTheme; ui: VisualUi }) {
  const rows = blueprint.rows.slice(0, 4)
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        {rows.map((row, index) => (
          <div key={`${index}-${row.join('|')}`} style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
            <div style={{ minHeight: 190, display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', border: `2px solid ${index === rows.length - 1 ? language.accent : line}`, borderRadius: 20, background: index === rows.length - 1 ? language.soft : '#fff', padding: '18px 17px' }}>
              <span style={{ color: language.accent, fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>{ui.step} {index + 1}</span>
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

function StructurePanel({ topic, blueprint, language, ui }: { topic: GrammarTopic; blueprint: GrammarVisualBlueprint; language: LanguageTheme; ui: VisualUi }) {
  const parts = blueprint.formulaParts.length > 1 ? blueprint.formulaParts : [topic.guide.formula]
  const examples = blueprint.rows.slice(0, 3)
  return (
    <div style={{ width: '100%', display: 'flex', gap: 22 }}>
      <div style={{ display: 'flex', flex: 1.1, flexDirection: 'column', justifyContent: 'center', borderRadius: 20, background: language.soft, padding: '22px 24px' }}>
        <span style={{ color: language.accent, fontSize: 13, fontWeight: 700, letterSpacing: 1.2 }}>{ui.formula}</span>
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

function UsagePanel({ topic, blueprint, language, ui }: { topic: GrammarTopic; blueprint: GrammarVisualBlueprint; language: LanguageTheme; ui: VisualUi }) {
  const rows = blueprint.rows.slice(0, 5)
  return (
    <div style={{ width: '100%', display: 'flex', alignItems: 'stretch', gap: 16 }}>
      <div style={{ width: 330, display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRadius: 24, background: language.deep, color: '#fff', padding: '24px' }}>
        <span style={{ color: language.accent, fontSize: 13, fontWeight: 700, letterSpacing: 1.2 }}>{ui.coreIdea}</span>
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
  const ui = VISUAL_UI[idioma]
  let panel: ReactNode

  switch (blueprint.kind) {
    case 'script': panel = <TablePanel blueprint={blueprint} language={language} dense ui={ui} />; break
    case 'contrast': panel = <ContrastPanel blueprint={blueprint} language={language} ui={ui} />; break
    case 'reference': panel = <TablePanel blueprint={blueprint} language={language} ui={ui} />; break
    case 'transformation': panel = <TransformationPanel blueprint={blueprint} language={language} ui={ui} />; break
    case 'timeline': panel = <TimelinePanel blueprint={blueprint} language={language} ui={ui} />; break
    case 'structure': panel = <StructurePanel topic={topic} blueprint={blueprint} language={language} ui={ui} />; break
    default: panel = <UsagePanel topic={topic} blueprint={blueprint} language={language} ui={ui} />
  }

  return <Frame topic={topic} language={language} nivel={nivel} blueprint={blueprint} ui={ui}>{panel}</Frame>
}
