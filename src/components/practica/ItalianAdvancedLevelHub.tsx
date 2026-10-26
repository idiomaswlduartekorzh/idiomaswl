import Link from 'next/link'
import type { ItalianGrammarLevel } from '@/data/italian-grammar-resources'
import { getTopicsByLevel } from '@/data/grammar/registry'
import styles from '@/components/grammar/GrammarCollection.module.css'

const COPY:Record<ItalianGrammarLevel,{label:string;title:string;lead:string}>={
  b2:{label:'Autonomia comunicativa',title:'Consolida tutto l’italiano B2',lead:'Un percorso grammaticale strutturato con spiegazioni visive, pratica estesa e tre PDF per ogni argomento.'},
  c1:{label:'Controllo avanzato',title:'Padroneggia l’italiano C1',lead:'Sintassi complessa, modalità, coesione e gestione dell’informazione per studio, professione e comunicazione avanzata.'},
  c2:{label:'Padronanza stilistica',title:'Affina l’italiano C2',lead:'Prospettiva, portata, ritmo e registro per riformulare ogni contenuto con precisione quasi madrelingua.'},
}
export default function ItalianAdvancedLevelHub({level}:{level:ItalianGrammarLevel}){
  const topics=getTopicsByLevel('italiano',level),copy=COPY[level],label=level.toUpperCase()
  return <main className={styles.page} style={{'--grammar-accent':'#CE2B37','--grammar-deep':'#08713C','--grammar-soft':'#EDF8F0'} as React.CSSProperties}><div className={styles.wrap}><nav className={styles.breadcrumb}><Link href="/practica">Pratica</Link><span>/</span><Link href="/practica/italiano">Italiano</Link><span>/</span><strong>{label}</strong></nav><header className={styles.indexHero}><div className={styles.indexHeroCopy}><p className={styles.eyebrow}>🇮🇹 Italiano · {label} · {copy.label}</p><h1>{copy.title}</h1><p className={styles.lead}>{copy.lead}</p><div className={styles.heroActions}><Link className={styles.primaryAction} href={`/practica/italiano/${level}/gramatica`}>Apri la grammatica <span>→</span></Link><Link className={styles.secondaryAction} href="/clases-de-italiano">Corsi di italiano</Link></div><div className={styles.metrics}><span><b>{topics.length}</b> lezioni</span><span><b>{topics.length*3}</b> PDF</span><span><b>0</b> audio per ora</span></div></div><aside className={styles.routeGoal}><span>Stato del percorso</span><p>La grammatica è completa. Gli audio saranno aggiunti nella fase concordata successiva.</p><div><b>Italiano</b><em>{label}</em></div></aside></header><section className={styles.method}><div><span>01</span><b>Spiegazione</b><p>Ampia e interamente in italiano.</p></div><div><span>02</span><b>Mappa visiva</b><p>Specifica per ogni argomento.</p></div><div><span>03</span><b>Esercizi</b><p>Almeno 30 decisioni per lezione.</p></div><div><span>04</span><b>PDF</b><p>Corso, esercizi e soluzioni separati.</p></div></section></div></main>
}
