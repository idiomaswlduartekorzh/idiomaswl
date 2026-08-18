'use client'

import Link from 'next/link'

import Transcriptor, { type TranscriptorConfig } from '@/components/fonetica/Transcriptor'
import { FAQS_FRANCES } from '@/data/fonetica/faq-frances'
import { FRENCH_SYSTEMS } from '@/lib/fonetica/frances/transcribe'

import styles from '../ingles/contenido.module.css'

const CONFIG: TranscriptorConfig = {
  lang: 'frances',
  systems: FRENCH_SYSTEMS,
  speechLang: 'fr-FR',
  showSpoken: true,
  breadcrumb: 'Francés',
  title: 'Transcripción fonética del francés',
  lead:
    'Pega cualquier texto en francés y verás qué letras suenan y cuáles no. «Beaucoup» tiene nueve letras y cuatro sonidos, y «les amis» hace reaparecer una s que llevaba muda toda la palabra.',
  placeholder: 'Escribe o pega aquí tu texto en francés…',
  example: 'Les amis de Marie sont très heureux. Un petit homme parle beaucoup, mais les héros parlent peu.',
}

export default function TranscriptorFrancesClient() {
  return (
    <Transcriptor config={CONFIG}>
      <section className="wlp-section">
        <div className="wlp-section-heading">
          <h2>Las dos cosas que el francés esconde</h2>
        </div>
        <div className={styles.prose}>
          <p>
            El francés no engaña como el inglés. Su ortografía <b>sí</b> predice la
            pronunciación: quien conoce las reglas puede leer en voz alta una palabra que no
            ha visto nunca. El problema es que son muchas reglas, y dos de ellas no aparecen
            en ningún otro idioma que estudies.
          </p>

          <h3>La primera: media palabra no suena</h3>
          <p>
            <b>beaucoup</b> son nueve letras y cuatro sonidos: /boku/. <b>temps</b> son cinco
            letras y dos sonidos: /tɑ̃/. Un hispanohablante que lee lo que ve pronuncia el
            doble de lo que hay, y deja de entendérsele.
          </p>
          <p>
            Por eso esta herramienta no se limita a darte el alfabeto fonético: te enseña la
            palabra con <b>las letras mudas marcadas</b>, para que veas cuáles callan.
          </p>

          <h3>La segunda: lo que calla, a veces vuelve</h3>
          <p>
            <b>les</b> es /le/, con la ese muda. Pero <b>les amis</b> es /le‿zami/: esa ese
            reaparece, y encima suena /z/. Eso es la <i>liaison</i>, y es lo que hace que el
            francés hablado suene continuo, sin cortes entre palabras.
          </p>
          <p>
            No pasa siempre. Ocurre entre determinante y nombre, entre pronombre y verbo,
            entre adjetivo y nombre. Y hay un caso que desconcierta a todo el mundo:{' '}
            <b>les hommes</b> enlaza (/le‿zɔm/) pero <b>les héros</b> no (/le eʁo/), aunque
            las dos empiecen por hache. Son dos haches distintas, y no hay forma de
            distinguirlas mirándolas.
          </p>

          <h3>Lo que esta herramienta no puede saber</h3>
          <p>
            Los nombres propios. <b>Bardot</b>, <b>Camus</b> o <b>Belmessous</b> no siguen las
            reglas, y ninguna regla puede adivinarlos. Ahí la herramienta acierta bastante
            menos, y conviene que lo sepas antes de fiarte de un apellido.
          </p>
        </div>
      </section>

      <section className="wlp-section">
        <div className="wlp-section-heading"><h2>Preguntas frecuentes</h2></div>
        <div className={styles.faq}>
          {FAQS_FRANCES.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="wlp-section">
        <div className="wlp-section-heading"><h2>Sigue practicando</h2></div>
        <div className="wlp-next">
          <Link href="/practica/frances">
            Ejercicios de francés por nivel
            <span>Lectura, escucha, gramática, escritura, habla y vocabulario, de A1 a B1.</span>
          </Link>
          <Link href="/clases-de-frances">
            Clases de francés con profesora
            <span>La liaison no se aprende leyendo: hay que decirla y que alguien corrija.</span>
          </Link>
          <Link href="/herramientas/transcripcion-fonetica">
            Los otros idiomas
            <span>Inglés y coreano, con el mismo transcriptor.</span>
          </Link>
        </div>
      </section>
    </Transcriptor>
  )
}
