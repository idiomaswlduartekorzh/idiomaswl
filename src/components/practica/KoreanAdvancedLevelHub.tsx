import Link from 'next/link'
import type { KoreanAdvancedGrammarLevel } from '@/data/korean-advanced-grammar-resources'
import { getTopicsByLevel } from '@/data/grammar/registry'
import styles from '@/components/grammar/GrammarCollection.module.css'

const COPY: Record<KoreanAdvancedGrammarLevel, { label: string; title: string; lead: string }> = {
  b2: { label: '자립적 의사소통', title: '한국어 B2 문법을 완성하세요', lead: '회상, 양태, 연결, 높임과 담화 선택을 시각적으로 이해하고 충분한 연습으로 자동화합니다.' },
  c1: { label: '고급 언어 운용', title: '한국어 C1 문법을 정교하게 다루세요', lead: '복합 구문, 정보 구조, 학술적 표현과 문어체를 맥락과 장르에 맞게 통제합니다.' },
  c2: { label: '문체와 담화의 숙달', title: '한국어 C2 표현을 다듬으세요', lead: '관점, 범위, 다성성, 문장 리듬과 장르 전환을 원어민 수준에 가깝게 조절합니다.' },
}

export default function KoreanAdvancedLevelHub({ level }: { level: KoreanAdvancedGrammarLevel }) {
  const topics = getTopicsByLevel('coreano', level), copy = COPY[level], label = level.toUpperCase()
  return <main className={styles.page} style={{ '--grammar-accent': '#D6293E', '--grammar-deep': '#153C79', '--grammar-soft': '#EDF4FF' } as React.CSSProperties}><div className={styles.wrap}><nav className={styles.breadcrumb}><Link href="/practica">학습</Link><span>/</span><Link href="/practica/coreano">한국어</Link><span>/</span><strong>{label}</strong></nav><header className={styles.indexHero}><div className={styles.indexHeroCopy}><p className={styles.eyebrow}>🇰🇷 한국어 · {label} · {copy.label}</p><h1>{copy.title}</h1><p className={styles.lead}>{copy.lead}</p><div className={styles.heroActions}><Link className={styles.primaryAction} href={`/practica/coreano/${level}/gramatica`}>문법 과정 열기 <span>→</span></Link><Link className={styles.secondaryAction} href="/clases-de-coreano">한국어 수업</Link></div><div className={styles.metrics}><span><b>{topics.length}</b>개 강의</span><span><b>{topics.length * 3}</b>개 PDF</span><span><b>0</b>개 오디오 · 추후 추가</span></div></div><aside className={styles.routeGoal}><span>학습 과정 상태</span><p>문법 과정과 PDF는 완성되었습니다. 오디오는 합의한 다음 단계에서 추가합니다.</p><div><b>한국어</b><em>{label}</em></div></aside></header><section className={styles.method}><div><span>01</span><b>이해하기</b><p>한국어로 충분히 설명합니다.</p></div><div><span>02</span><b>시각화하기</b><p>주제별 구조와 대비를 한눈에 봅니다.</p></div><div><span>03</span><b>연습하기</b><p>강의마다 30개의 판단을 훈련합니다.</p></div><div><span>04</span><b>자료 활용하기</b><p>강의, 연습, 해설 PDF를 나눠 제공합니다.</p></div></section></div></main>
}
