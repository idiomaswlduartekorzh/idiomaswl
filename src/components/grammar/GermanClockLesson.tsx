import Image from 'next/image'
import Link from 'next/link'
import type { ClockConversation, ClockExample, GrammarTopic } from '@/data/grammar/types'
import { getGermanGrammarResource, type GermanGrammarLevel } from '@/data/german-grammar-resources'
import { grammarVisualPath } from '@/lib/grammar-visual'
import { protectedMaterialHref } from '@/lib/material-download'
import GrammarTopicClient from './GrammarTopicClient'
import { GermanClockExplorer } from './GermanClockExplorer'
import { GermanClockFace, GermanClockGallery } from './GermanClockVisuals'
import styles from './GermanClockLesson.module.css'

const sections = [
  ['leer', 'Leer el reloj'], ['situaciones', 'Conversaciones'], ['relojes', 'Seis relojes'],
  ['dudas', 'Dudas frecuentes'], ['ejercicios', 'Ejercicios'], ['materiales', 'PDF'],
]

function Conversation({ scene }: { scene: ClockConversation }) {
  return (
    <article className={styles.scene}>
      <Image src={`/images/grammar/aleman/uhrzeit/${scene.image}.webp`} alt={scene.alt} width={768} height={512}
        sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 960px) 40vw, 360px" />
      <div className={styles.sceneText}>
        <h3>{scene.title}</h3>
        <p>{scene.setting}</p>
        {scene.exchanges.map((exchange) => (
          <div className={styles.exchange} key={exchange.time}>
            <span className={styles.sceneTime}>{exchange.time}</span>
            <p lang="de">{exchange.question}</p><span>{exchange.questionEs}</span>
            <p lang="de">{exchange.answer}</p><span>{exchange.answerEs}</span>
          </div>
        ))}
      </div>
    </article>
  )
}

export default function GermanClockLesson({ topic, level, clocks }: {
  topic: GrammarTopic
  level: GermanGrammarLevel
  clocks: ClockExample[]
}) {
  const resource = getGermanGrammarResource(topic, level)
  const intro = topic.seo.find((section) => section.clockReading)
  const scenes = topic.seo.find((section) => section.clockConversations)
  const references = topic.seo.filter((section) => !section.clockReading && !section.clockConversations)

  return (
    <article className={styles.lesson} aria-labelledby="german-grammar-title">
      <header className={styles.intro}>
        <p className={styles.kicker} lang="de">Deutsch {level.toUpperCase()} · Die Uhrzeit</p>
        <h1 id="german-grammar-title">La hora en alemán</h1>
        <p>{topic.lead}</p>
      </header>
      <nav className={styles.nav} aria-label="Apartados de la lección">
        {sections.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
      </nav>

      <section id="leer" className={styles.section}>
        <h2>{intro?.heading}</h2>
        <p className={styles.sectionLead}>{intro?.paragraphs[0]}</p>
        <GermanClockExplorer examples={clocks} />
      </section>

      {scenes?.clockConversations && (
        <section id="situaciones" className={styles.section}>
          <h2>{scenes.heading}</h2>
          <p className={styles.sectionLead}>{scenes.paragraphs[0]}</p>
          <div className={styles.scenes}>{scenes.clockConversations.map((scene) => <Conversation key={scene.title} scene={scene} />)}</div>
        </section>
      )}

      <section id="relojes" className={styles.section}>
        <h2>De las tres a las cuatro</h2>
        <p className={styles.sectionLead}>Sigue la aguja larga desde el 12 hasta el 11. Lee en voz alta cómo se dice cada hora.</p>
        <GermanClockGallery examples={clocks} />
        <a className={styles.textLink} href={grammarVisualPath('aleman', level, topic.slug)}>Abrir la lámina de los seis relojes</a>
      </section>

      <section id="dudas" className={styles.section}>
        <h2>Dudas frecuentes al decir la hora</h2>
        <div className={styles.tips}>{topic.guide.clockTips?.map((tip) => (
          <div className={styles.tip} key={tip.cue}>
            <div><h3>{tip.cue}</h3><p lang="de">{tip.example}</p></div>
            <div>
              <p>{tip.explanation}</p>
              {tip.comparison && <div className={styles.comparison}>
                {tip.comparison.map((clock) => <figure key={clock.digital}>
                  <GermanClockFace clock={clock} />
                  <figcaption><span>{clock.digital}</span><strong lang="de">{clock.spoken}</strong></figcaption>
                </figure>)}
              </div>}
            </div>
          </div>
        ))}</div>
        <h3 className={styles.refTitle}>Vocabulario y ejemplos para consultar</h3>
        {references.map((section) => (
          <details key={section.heading} className={styles.reference}>
            <summary>{section.heading}</summary>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.table && (
              <table>
                <thead><tr>{section.table[0].map((label) => <th scope="col" key={label}>{label}</th>)}</tr></thead>
                <tbody>{section.table.slice(1).map(([first, ...rest]) => <tr key={first + rest[0]}><th scope="row">{first}</th>{rest.map((cell, i) => <td key={i}>{cell}</td>)}</tr>)}</tbody>
              </table>
            )}
          </details>
        ))}
      </section>

      <section id="ejercicios" className={styles.section}>
        <h2>Ahora te toca decir la hora</h2>
        <p className={styles.sectionLead}>Empieza por leer las agujas. Con el 65 % de aciertos se abre el siguiente nivel.</p>
        <GrammarTopicClient topic={topic} idioma="aleman" nivel={level} mode="practiceOnly" uiLanguage="es" />
      </section>

      <section id="materiales" className={styles.section}>
        <h2>Para practicar en papel</h2>
        <div className={styles.downloads}>
          {[[resource.pdf, 'Guía ilustrada'], [resource.exercisesPdf, 'Cuaderno de ejercicios'], [resource.answerKeyPdf, 'Soluciones']].map(([url, label]) => (
            <a key={url} href={protectedMaterialHref(url)} download><span>{label}</span><small>PDF ↓</small></a>
          ))}
        </div>
      </section>
      <aside className={styles.more} aria-label="Más alemán"><Link href="/nivel-radar" data-german-cta="level-test">Prueba de nivel</Link><Link href="/clases-de-aleman" data-german-cta="classes">Clases de alemán</Link></aside>
    </article>
  )
}
