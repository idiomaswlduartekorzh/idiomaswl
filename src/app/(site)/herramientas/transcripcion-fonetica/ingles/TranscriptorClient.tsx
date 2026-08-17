'use client'

import Link from 'next/link'

import Transcriptor, { type TranscriptorConfig } from '@/components/fonetica/Transcriptor'
import { FAQS_INGLES } from '@/data/fonetica/faq-ingles'
import { ENGLISH_SYSTEMS } from '@/lib/fonetica/transcribe'

import styles from './contenido.module.css'

const CONFIG: TranscriptorConfig = {
  lang: 'ingles',
  systems: ENGLISH_SYSTEMS,
  speechLang: 'en-GB',
  weakForms: true,
  breadcrumb: 'Inglés',
  title: 'Transcripción fonética del inglés',
  lead:
    'Pega cualquier texto en inglés y léelo en alfabeto fonético internacional. Con el acento tónico donde va, las dos pronunciaciones —británica y americana— y las palabras que admiten más de una, marcadas para que elijas.',
  placeholder: 'Escribe o pega aquí tu texto en inglés…',
  example:
    'The teacher asked her students to read the whole chapter before Thursday. She could not have known that half the class would rather watch a video about tomatoes.',
}

export default function TranscriptorInglesClient() {
  return (
    <Transcriptor config={CONFIG}>
      <section className="wlp-section">
        <div className="wlp-section-heading">
          <h2>Por qué el inglés necesita esto y el español no</h2>
        </div>
        <div className={styles.prose}>
          <p>
            En español se lee lo que está escrito. En inglés no: <b>though</b>, <b>through</b> y{' '}
            <b>tough</b> se escriben casi igual y no comparten ni un sonido de la parte final.
            Por eso el inglés se estudia con dos escrituras a la vez —la ortográfica y la
            fonética— y por eso los diccionarios traen la transcripción entre barras.
          </p>
          <p>
            Esta herramienta usa el diccionario de pronunciación de la Universidad Carnegie
            Mellon, con 126.037 palabras. El acento tónico —la marca <code>ˈ</code>— va delante
            de la sílaba fuerte, que es donde lo ponen los diccionarios y donde el estudiante lo
            necesita: en inglés, cambiar el acento de sitio cambia la palabra, como en{' '}
            <i>ˈrecord</i> (el disco) frente a <i>reˈcord</i> (grabar).
          </p>
          <h3>La /r/ que aparece y desaparece</h3>
          <p>
            El británico no pronuncia la <b>r</b> final… salvo cuando la palabra siguiente
            empieza por vocal. <i>far</i> es /fɑː/, pero <i>far away</i> es /fɑːr əˈweɪ/. La
            herramienta la añade sola cuando corresponde, así que la transcripción cambia según
            la frase, igual que la pronunciación real.
          </p>
          <h3>Lo que esta herramienta no puede saber</h3>
          <p>
            Una palabra escrita igual puede sonar de dos maneras según lo que signifique:{' '}
            <i>read</i> es /riːd/ en presente y /red/ en pasado; <i>record</i> cambia de acento
            según sea sustantivo o verbo. Ningún programa lo adivina sin entender la frase, así
            que esas palabras salen marcadas y eliges tú.
          </p>
        </div>
      </section>

      <section className="wlp-section">
        <div className="wlp-section-heading">
          <h2>Preguntas frecuentes</h2>
        </div>
        <div className={styles.faq}>
          {FAQS_INGLES.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="wlp-section">
        <div className="wlp-section-heading">
          <h2>Sigue practicando</h2>
        </div>
        <div className="wlp-next">
          <Link href="/practica/ingles">
            Ejercicios de inglés por nivel
            <span>Lectura, escucha, gramática, escritura, habla y vocabulario, de A1 a B2.</span>
          </Link>
          <Link href="/clases-de-ingles">
            Clases de inglés con profesora
            <span>Una transcripción te dice qué suena; una clase te dice si lo estás diciendo.</span>
          </Link>
          <Link href="/herramientas/transcripcion-fonetica/coreano">
            El mismo transcriptor en coreano
            <span>Con las reglas de cambio fonético: 학교 se dice 학꾜.</span>
          </Link>
        </div>
      </section>
    </Transcriptor>
  )
}
