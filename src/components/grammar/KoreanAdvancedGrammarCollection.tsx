import Link from 'next/link'
import type { GrammarTopic } from '@/data/grammar/types'
import type { KoreanAdvancedGrammarLevel } from '@/data/korean-advanced-grammar-resources'
import styles from './GrammarCollection.module.css'

const COPY: Record<KoreanAdvancedGrammarLevel, { label: string; lead: string; outcome: string }> = {
  b2: { label: '자립적 의사소통', lead: '회상, 추측, 양보, 높임, 인용과 담화 연결을 실제 의미 선택을 통해 체계적으로 익힙니다.', outcome: '대화, 발표, 기사와 시험에서 B2 문법을 맥락에 맞게 선택하고 설명합니다.' },
  c1: { label: '고급 언어 운용', lead: '복합 구문, 양태, 정보 구조와 문어체를 학술·직업 맥락에서 정교하게 다룹니다.', outcome: 'C1 구조를 화자 태도, 정보 초점과 장르에 맞춘 담화 선택으로 운용합니다.' },
  c2: { label: '문체와 담화의 숙달', lead: '관점, 범위, 다성성, 문장 리듬과 장르 변환을 통해 미세한 뉘앙스를 통제합니다.', outcome: '같은 내용을 목적, 장르와 책임의 정도에 따라 자연스럽고 정밀하게 재구성합니다.' },
}

export default function KoreanAdvancedGrammarCollection({ level, topics }: { level: KoreanAdvancedGrammarLevel; topics: GrammarTopic[] }) {
  const label = level.toUpperCase(), copy = COPY[level], base = `/practica/coreano/${level}`
  const canonical = `https://www.idiomaswl.com${base}/gramatica`
  const groups = Array.from(new Set(topics.map((topic) => topic.category))).map((category) => [category, topics.filter((topic) => topic.category === category)] as const)
  const jsonLd = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: `한국어 문법 ${label}`, description: `설명, 시각 지도, 연습과 PDF로 구성된 한국어 문법 ${label} 전체 과정`, url: canonical, inLanguage: 'ko-KR', mainEntity: { '@type': 'ItemList', numberOfItems: topics.length, itemListElement: topics.map((topic, index) => ({ '@type': 'ListItem', position: index + 1, name: topic.shortTitle, url: `${canonical}/${topic.slug}` })) } }
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <div className={styles.page} style={{ '--grammar-accent': '#D6293E', '--grammar-deep': '#153C79', '--grammar-soft': '#EDF4FF' } as React.CSSProperties}><div className={styles.wrap}>
      <nav className={styles.breadcrumb}><Link href="/practica">학습</Link><span>/</span><Link href="/practica/coreano">한국어</Link><span>/</span><Link href={base}>{label}</Link><span>/</span><strong>문법</strong></nav>
      <header className={styles.indexHero}><div className={styles.indexHeroCopy}><p className={styles.eyebrow}>🇰🇷 한국어 · {label} · {copy.label}</p><h1>한국어 문법 {label}: 전체 학습 과정</h1><p className={styles.lead}>{copy.lead}</p><div className={styles.heroActions}><Link className={styles.primaryAction} href={`${base}/gramatica/${topics[0]?.slug}`}>첫 강의 시작하기 <span>→</span></Link><a className={styles.secondaryAction} href="#topics">전체 주제 보기</a></div><div className={styles.metrics}><span><b>{topics.length}</b>개 강의</span><span><b>6</b>단계 연습</span><span><b>3</b>개 PDF/주제</span></div></div><aside className={styles.routeGoal}><span>학습 목표</span><p>{copy.outcome}</p><div><b>한국어</b><em>{label}</em></div></aside></header>
      <section className={styles.method}><div><span>01</span><b>이해</b><p>핵심 의미와 사용 조건을 한국어로 설명합니다.</p></div><div><span>02</span><b>시각화</b><p>공식, 대비와 예문을 한눈에 봅니다.</p></div><div><span>03</span><b>연습</b><p>설명형 피드백과 함께 6단계로 훈련합니다.</p></div><div><span>04</span><b>적용</b><p>형태 인식에서 자율적 생산까지 연결합니다.</p></div></section>
      <section id="topics" className={styles.catalogIntro}><div><span>전체 과정</span><h2>한국어 문법 {label}의 모든 주제</h2></div><p>순서대로 학습하거나 필요한 문법을 바로 선택하세요. 모든 주제에 강의, 시각 지도, 충분한 연습과 PDF 3종이 있습니다.</p></section>
      {groups.map(([category, items], groupIndex) => <section className={styles.topicGroup} key={category}><div className={styles.groupHeading}><span>{String(groupIndex + 1).padStart(2, '0')}</span><div><p>{groupIndex + 1}단원</p><h2>{category}</h2></div><small>{items.length}개 주제</small></div><div className={styles.topicGrid}>{items.map((topic) => <Link className={styles.topicCard} key={topic.slug} href={`${base}/gramatica/${topic.slug}`}><div className={styles.cardTop}><span style={{ background: topic.color }}>{topic.order}</span><em>{topic.category}</em></div><h3>{topic.shortTitle}</h3><p>{topic.lead}</p><footer><span>설명 + 연습 + PDF 3종</span><b>→</b></footer></Link>)}</div></section>)}
      <nav className={styles.levelRoute}><div><span>과정 이어가기</span><h2>한국어 문법 A1-C2</h2></div><div>{(['a1', 'a2', 'b1', 'b2', 'c1', 'c2'] as const).map((route) => <Link key={route} className={route === level ? styles.currentLevel : ''} href={`/practica/coreano/${route}/gramatica`}>{route.toUpperCase()}</Link>)}</div></nav>
    </div></div>
  </>
}
