'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { GrammarTopic } from '@/data/grammar/types'
import { getKoreanAdvancedGrammarResource, type KoreanAdvancedGrammarLevel } from '@/data/korean-advanced-grammar-resources'
import GrammarTopicClient from './GrammarTopicClient'
import GrammarTopicVisual from './GrammarTopicVisual'
import { protectedMaterialHref } from '@/lib/material-download'
import styles from './KoreanGrammarLesson.module.css'

type SectionId = 'understand' | 'visual' | 'method' | 'practice' | 'materials'
const sections: Array<{ id: SectionId; number: string; label: string }> = [
  { id: 'understand', number: '01', label: '이해하기' }, { id: 'visual', number: '02', label: '시각 지도' },
  { id: 'method', number: '03', label: '사고 순서' }, { id: 'practice', number: '04', label: '연습하기' },
  { id: 'materials', number: '05', label: '학습 자료' },
]

export default function KoreanAdvancedGrammarLesson({ topic, level }: { topic: GrammarTopic; level: KoreanAdvancedGrammarLevel }) {
  const resource = getKoreanAdvancedGrammarResource(topic, level)
  const [active, setActive] = useState<SectionId>('understand')
  const formulaParts = topic.guide.formula.split(/\s*(?:\||→|\+)\s*/u).map((part) => part.trim()).filter(Boolean)
  const activityCount = countPracticeActivities(topic)
  function selectSection(id: SectionId) {
    setActive(id)
    requestAnimationFrame(() => {
      document.getElementById('korean-advanced-grammar-nav')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      document.querySelector<HTMLButtonElement>(`[data-korean-advanced-section="${id}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    })
  }
  return <section className={styles.lesson} style={{ '--kr-blue': '#153C79', '--kr-red': '#D6293E', '--kr-cream': '#EDF4FF' } as React.CSSProperties} aria-labelledby="korean-advanced-grammar-title">
    <div className={styles.previewFlag}><span>고급 문법 완성 강의</span> 주제별 시각 지도 · PDF 3종 · 심화 연습</div>
    <div className={styles.track} aria-label={`한국어 문법 ${level.toUpperCase()} 학습 과정`}><span>형태 찾기</span><b>→</b><strong>의미 이해</strong><b>→</b><span>문장 바꾸기</span><b>→</b><span>스스로 쓰기</span></div>
    <header className={styles.hero}><div className={styles.heroCopy}><p className={styles.eyebrow}>한국어 · {topic.category} · {level.toUpperCase()}</p><h1 id="korean-advanced-grammar-title">{topic.shortTitle}</h1><p className={styles.lead}>{topic.lead}</p><div className={styles.heroActions}><button type="button" onClick={() => selectSection('practice')}>연습 시작하기 <span>→</span></button><button type="button" className={styles.secondary} onClick={() => selectSection('visual')}>시각 지도 보기</button></div><div className={styles.metrics}><span><b>{topic.practice.levels.length}</b>단계</span><span><b>{activityCount}</b>개 활동</span><span><b>{resource.studyMinutes}</b>분</span></div></div>
      <div className={styles.heroVisual} aria-label={`${topic.shortTitle} 시각 지도`}><div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 22% 18%, #fff 0 2%, transparent 2.4%), linear-gradient(145deg, #f9fbff 0%, #dfeaff 48%, #b9cdec 100%)' }} /><div style={{ position: 'absolute', inset: '12% 9% 24%', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'clamp(.55rem, 2vw, 1rem)', transform: 'rotate(-2deg)' }}>{heroWords(topic).map((word, index) => <span key={word} style={{ display: 'grid', placeItems: 'center', padding: '.5rem', textAlign: 'center', borderRadius: 18, background: index === 0 ? '#153C79' : index === 3 ? '#D6293E' : 'rgba(255,255,255,.96)', color: index === 0 || index === 3 ? '#fff' : '#102F62', fontWeight: 950, fontSize: 'clamp(.8rem, 1.8vw, 1.25rem)', boxShadow: '0 14px 28px rgba(21,60,121,.14)', border: '1px solid rgba(255,255,255,.85)' }}>{word}</span>)}</div><div className={styles.heroShade} /><span className={styles.heroGlyph}>한</span><p>{topic.guide.goal}</p></div>
    </header>
    <GrammarTopicVisual topic={topic} idioma="coreano" nivel={level} uiLanguage="ko" />
    <nav id="korean-advanced-grammar-nav" className={styles.tabs} aria-label="강의 내용">{sections.map((section) => <button key={section.id} type="button" data-korean-advanced-section={section.id} className={active === section.id ? styles.active : ''} onClick={() => selectSection(section.id)}><span>{section.number}</span>{section.label}</button>)}</nav>
    <div className={styles.panel}>
      {active === 'understand' ? <article className={styles.article}><SectionIntro kicker="교육적 설명" title={topic.title} copy={topic.description} /><div className={styles.outcomeGrid}>{topic.outcomes.map((outcome, index) => <div key={outcome}><span>{index + 1}</span><p>{outcome}</p></div>)}</div>{topic.seo.map((section) => <section key={section.heading} className={styles.explainBlock}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.table ? <ReferenceTable rows={section.table} /> : null}{section.examples ? <div className={styles.exampleRows}>{section.examples.map((row, rowIndex) => <div key={`${rowIndex}-${row.join('|')}`}>{row.map((cell, cellIndex) => <span key={`${cellIndex}-${cell}`}>{cell}</span>)}</div>)}</div> : null}</section>)}</article> : null}
      {active === 'visual' ? <section className={styles.visualSection} aria-labelledby="korean-advanced-visual-title"><SectionIntro kicker="시각 학습실" title="규칙을 한눈에 보기" copy={topic.visual.teacherLens} titleId="korean-advanced-visual-title" /><div className={styles.formula} aria-label={`공식: ${topic.guide.formula}`}>{formulaParts.map((part, index) => <div key={`${part}-${index}`} style={{ '--delay': `${index * 90}ms` } as React.CSSProperties}><span>{String(index + 1).padStart(2, '0')}</span><b>{part}</b></div>)}</div><div className={styles.sceneGrid}>{topic.visual.scene.map(([pattern, meaning], index) => <div key={pattern} style={{ '--delay': `${index * 110}ms` } as React.CSSProperties}><strong lang="ko-KR">{pattern}</strong><span>→</span><p>{meaning}</p></div>)}</div><ReferenceTable rows={topic.guide.table} /><div className={styles.modeRow}>{topic.visual.learnerModes.map((mode) => <span key={mode}>{mode}</span>)}</div></section> : null}
      {active === 'method' ? <section className={styles.steps} aria-labelledby="korean-advanced-steps-title"><SectionIntro kicker="단계별 사고" title="번역하지 않고 문법을 선택하는 법" titleId="korean-advanced-steps-title" /><div className={styles.modelHeader}><p>이 강의의 중심 모델</p><span>형태 · 의미 · 맥락 · 격식</span></div><div className={styles.modelCard}><span>모델 문장</span><strong lang="ko-KR">{topic.guide.model}</strong></div><ol className={styles.stepList}>{topic.guide.decisions.map((decision, index) => <li key={decision}><span>{index + 1}</span><p>{decision}</p></li>)}</ol><div className={styles.warningBox}><h3>자주 하는 실수</h3>{topic.guide.mistakes.map((mistake) => <p key={mistake}><span>×</span>{mistake}</p>)}</div></section> : null}
      {active === 'practice' ? <section className={styles.practice} aria-labelledby="korean-advanced-practice-title"><SectionIntro kicker="단계별 연습" title="형태 인식에서 자율적 생산까지" copy="65% 이상을 달성하면 다음 단계로 이동합니다. 모든 단계는 맥락, 설명형 피드백과 개인 문장 생산을 연결합니다." titleId="korean-advanced-practice-title" /><GrammarTopicClient topic={topic} idioma="coreano" nivel={level} relatedWritingExercises={[]} mode="practiceOnly" uiLanguage="ko" /></section> : null}
      {active === 'materials' ? <section className={styles.resources} aria-labelledby="korean-advanced-resources-title"><SectionIntro kicker="학습 자료실" title="수업과 자율 학습을 위한 자료 3종" copy="전체 강의, 연습 문제, 정답과 해설을 각각 내려받을 수 있습니다. 오디오는 다음 제작 단계에서 추가합니다." titleId="korean-advanced-resources-title" /><div className={styles.resourceGrid}><ResourceCard code="WEB" title="온라인 강의" copy={`${topic.practice.levels.length}단계, ${activityCount}개 활동이 한 강의에 연결됩니다.`} status="지금 학습 가능" /><ResourceCard code="PDF" title="전체 강의" copy="충분한 설명, 시각 지도, 예문, 연습과 해설을 한 권에 담았습니다." status="전체 강의 받기" href={resource.pdf} /><ResourceCard code="연습" title="연습 문제집" copy={`${activityCount}개의 학습 결정을 인쇄용으로 정리했습니다.`} status="연습 문제 받기" href={resource.exercisesPdf} /><ResourceCard code="해설" title="정답과 해설" copy="모범 답안과 각 선택의 핵심 문법 근거를 제공합니다." status="정답과 해설 받기" href={resource.answerKeyPdf} /></div><div className={styles.studyPlan}><h3>권장 학습 순서</h3><ol><li><b>10분</b> 문법이 전달하는 의미를 이해합니다.</li><li><b>10분</b> 시각 지도를 보지 않고 다시 그립니다.</li><li><b>25분</b> 네 단계 이상의 연습을 완료합니다.</li><li><b>10분</b> 자신의 예문 세 개를 쓰고 교정합니다.</li></ol></div></section> : null}
    </div>
    <aside className="english-conversion" aria-label="한국어 학습의 다음 단계"><div><span>내 수준에 맞는 학습 과정이 필요하신가요?</span><h2>연습을 측정 가능한 실력으로 바꾸세요</h2><p>현재 수준을 확인하고 목표에 맞는 학습 경로를 선택하세요.</p></div><div><Link href="/nivel-radar" data-korean-advanced-cta="level-test">수준 진단하기</Link><Link href="/clases-de-coreano" data-korean-advanced-cta="classes">한국어 수업 보기</Link></div></aside>
  </section>
}

function SectionIntro({ kicker, title, copy, titleId }: { kicker: string; title: string; copy?: string; titleId?: string }) { return <div className={styles.sectionIntro}><div><span>{kicker}</span><h2 id={titleId}>{title}</h2></div>{copy ? <p>{copy}</p> : null}</div> }
function ReferenceTable({ rows }: { rows: string[][] }) { if (!rows.length) return null; return <div className={styles.tableWrap} role="region" aria-label="문법 참고표" tabIndex={0}><table><thead><tr>{rows[0].map((cell, index) => <th key={`${index}-${cell}`}>{cell}</th>)}</tr></thead><tbody>{rows.slice(1).map((row, rowIndex) => <tr key={`${rowIndex}-${row.join('|')}`}>{row.map((cell, cellIndex) => <td key={`${cellIndex}-${cell}`}>{cell}</td>)}</tr>)}</tbody></table></div> }
function ResourceCard({ code, title, copy, status, href }: { code: string; title: string; copy: string; status: string; href?: string }) { return <div><span className={styles.resourceIcon}>{code}</span><div><strong>{title}</strong><p>{copy}</p>{href ? <a className="korean-resource-action" href={protectedMaterialHref(href)} download>{status}</a> : <em>{status}</em>}</div></div> }
function heroWords(topic: GrammarTopic): string[] { return Array.from(new Set(topic.visual.scene.flatMap(([left, right]) => [left, right]).filter(Boolean))).slice(0, 4) }
function countPracticeActivities(topic: GrammarTopic): number { return topic.practice.levels.reduce((total, level) => { if (level.type === 'dual') return total + level.items.reduce((sum, item) => sum + item.blanks.length, 0); if (level.type === 'choice' || level.type === 'write') return total + level.items.length; return total + level.blanks.length }, 0) }
