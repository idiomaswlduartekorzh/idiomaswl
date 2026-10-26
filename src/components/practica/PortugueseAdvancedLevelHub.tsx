import Link from 'next/link'
import type { PortugueseGrammarLevel } from '@/data/portuguese-grammar-resources'
import { getTopicsByLevel } from '@/data/grammar/registry'
import styles from '@/components/grammar/GrammarCollection.module.css'

const COPY: Record<PortugueseGrammarLevel, { label: string; title: string; lead: string }> = {
  b2: { label: 'Autonomia comunicativa', title: 'Consolide todo o português B2', lead: 'Um percurso gramatical estruturado com explicações visuais, prática extensa e três PDFs para cada tema.' },
  c1: { label: 'Controle avançado', title: 'Domine o português C1', lead: 'Sintaxe complexa, modalidade, coesão e gestão da informação para estudo, profissão e comunicação avançada.' },
  c2: { label: 'Domínio estilístico', title: 'Refine o português C2', lead: 'Perspectiva, escopo, ritmo e registro para reformular qualquer conteúdo com precisão próxima à de um falante nativo.' },
}

export default function PortugueseAdvancedLevelHub({ level }: { level: PortugueseGrammarLevel }) {
  const topics = getTopicsByLevel('portugues', level), copy = COPY[level], label = level.toUpperCase()
  return <main className={styles.page} style={{ '--grammar-accent': '#DFB700', '--grammar-deep': '#126B3A', '--grammar-soft': '#F4FAE8' } as React.CSSProperties}><div className={styles.wrap}><nav className={styles.breadcrumb}><Link href="/practica">Prática</Link><span>/</span><Link href="/practica/portugues">Português</Link><span>/</span><strong>{label}</strong></nav><header className={styles.indexHero}><div className={styles.indexHeroCopy}><p className={styles.eyebrow}>🇧🇷 Português · {label} · {copy.label}</p><h1>{copy.title}</h1><p className={styles.lead}>{copy.lead}</p><div className={styles.heroActions}><Link className={styles.primaryAction} href={`/practica/portugues/${level}/gramatica`}>Abrir a gramática <span>→</span></Link><Link className={styles.secondaryAction} href="/clases-de-portugues">Cursos de português</Link></div><div className={styles.metrics}><span><b>{topics.length}</b> aulas</span><span><b>{topics.length * 3}</b> PDFs</span><span><b>0</b> áudios por enquanto</span></div></div><aside className={styles.routeGoal}><span>Estado do percurso</span><p>A gramática está completa. Os áudios serão acrescentados na próxima fase combinada.</p><div><b>Português</b><em>{label}</em></div></aside></header><section className={styles.method}><div><span>01</span><b>Explicação</b><p>Ampla e inteiramente em português.</p></div><div><span>02</span><b>Mapa visual</b><p>Específico para cada tema.</p></div><div><span>03</span><b>Exercícios</b><p>30 decisões por aula.</p></div><div><span>04</span><b>PDF</b><p>Curso, exercícios e gabarito separados.</p></div></section></div></main>
}
