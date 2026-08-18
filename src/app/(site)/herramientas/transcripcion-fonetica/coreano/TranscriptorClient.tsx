'use client'

import Link from 'next/link'

import Transcriptor, { type TranscriptorConfig } from '@/components/fonetica/Transcriptor'
import { FAQS_COREANO } from '@/data/fonetica/faq-coreano'
import { KOREAN_SYSTEMS } from '@/lib/fonetica/coreano/transcribe'

import styles from '../ingles/contenido.module.css'

const CONFIG: TranscriptorConfig = {
  lang: 'coreano',
  systems: KOREAN_SYSTEMS,
  speechLang: 'ko-KR',
  showSpoken: true,
  showKoreanSymbols: true,
  breadcrumb: 'Coreano',
  title: 'Transcripción fonética del coreano',
  lead:
    'Pega cualquier texto en hangul y verás cómo suena de verdad. El coreano se lee casi como se escribe, pero las consonantes cambian al juntarse: 학교 no suena «hak-gyo», suena 학꾜.',
  placeholder: 'Escribe o pega aquí tu texto en coreano…',
  example: '안녕하세요. 저는 학교에 갑니다. 한국어를 배우고 싶어요. 좋다, 같이 읽다.',
}

export default function TranscriptorCoreanoClient() {
  return (
    <Transcriptor config={CONFIG}>
      <section className="wlp-section">
        <div className="wlp-section-heading">
          <h2>Por qué el hangul engaña</h2>
        </div>
        <div className={styles.prose}>
          <p>
            El hangul es un alfabeto extraordinario: se aprende en una tarde y cada letra tiene
            un sonido. Por eso casi todos los métodos dicen que el coreano «se lee como se
            escribe». Y es verdad a medias, que es la peor clase de verdad.
          </p>
          <p>
            Lo que no se ve en la escritura es que <b>las consonantes cambian al tocarse</b>.
            No son excepciones ni licencias: son reglas fijas que todo coreano aplica sin
            pensar, igual que un hispanohablante no dice «un beso» con la ene de «una».
          </p>
          <p>
            <b>학교</b> se escribe con las letras de «hak» y «gyo», pero suena <b>학꾜</b>. La
            ㄱ de la segunda sílaba se tensa porque va detrás de una consonante cerrada.
            <b> 국물</b> se escribe «guk-mul» y suena <b>궁물</b>: la ㄱ se vuelve nasal delante
            de la ㅁ. <b>같이</b> se escribe «gat-i» y suena <b>가치</b>.
          </p>
          <p>
            Esta herramienta aplica esas reglas y te enseña las tres capas: cómo se escribe,
            cómo se pronuncia <i>en hangul</i>, y el alfabeto fonético. La capa de en medio es
            la que más enseña — ver que 학교 se dice 학꾜 explica la regla sin nombrarla.
          </p>

          <h3>Por qué no basta con la romanización</h3>
          <p>
            La romanización oficial de <b>학교</b> es <i>hakgyo</i>. Eso le dice a un
            hispanohablante que pronuncie «hak-gyo», que es exactamente lo que{' '}
            <b>no</b> suena. La romanización sirve para escribir un nombre en un pasaporte o en
            un cartel; para aprender a hablar, engaña. Por eso aquí el alfabeto fonético va
            primero.
          </p>

          <h3>El error que más rompe la comprensión</h3>
          <p>
            En español, toda consonante suelta su aire: decimos «bloc» y se oye la ce. En
            coreano, una consonante que cierra sílaba <b>se queda parada</b>: la lengua llega a
            su sitio y ahí se queda, sin soltar nada. Por eso <b>책</b> es /tɕʰɛk̚/ y no
            «che-ke». Añadir esa vocal convierte una sílaba en dos, y es lo que más hace que no
            te entiendan.
          </p>
          <p>
            Debajo de cada transcripción aparecen solo los sonidos que hay en tu texto,
            explicados desde el español y con el error típico de cada uno.
          </p>
        </div>
      </section>

      <section className="wlp-section">
        <div className="wlp-section-heading">
          <h2>Preguntas frecuentes</h2>
        </div>
        <div className={styles.faq}>
          {FAQS_COREANO.map((faq) => (
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
          <Link href="/practica/coreano">
            Ejercicios de coreano por nivel
            <span>Lectura, escucha, gramática, escritura, habla y vocabulario, de A1 a B1.</span>
          </Link>
          <Link href="/clases-de-coreano">
            Clases de coreano con profesora
            <span>Las consonantes tensas no se aprenden leyendo: hay que decirlas y que alguien corrija.</span>
          </Link>
          <Link href="/herramientas/transcripcion-fonetica/ingles">
            El mismo transcriptor en inglés
            <span>Con acento británico y americano.</span>
          </Link>
        </div>
      </section>
    </Transcriptor>
  )
}
