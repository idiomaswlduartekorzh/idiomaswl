import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  JsonLd,
  KidsBreadcrumbs,
  KidsCta,
  KidsFaq,
  SectionHeading,
  kidsWhatsApp,
  type FaqItem,
} from '@/components/kids/KidsShared';
import { localBusinessNode } from '@/components/hub/localBusiness';
import styles from '../kids.module.css';

const CANONICAL = 'https://www.idiomaswl.com/kids/ingles-ajedrez';

export const metadata: Metadata = {
  title: 'Clases de ajedrez para niños en Bucaramanga | WeLearn',
  description:
    'Clases de ajedrez para niños de 8 a 12 años en Bucaramanga y online: fundamentos, retos y partidas guiadas mientras practican inglés.',
  keywords: [
    'ajedrez para niños Bucaramanga',
    'ajedrez en inglés para niños',
    'clases de ajedrez para niños',
    'curso de inglés para niños Bucaramanga',
    'vacaciones recreativas ajedrez Bucaramanga',
    'chess in English for kids',
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Clases de ajedrez para niños en Bucaramanga | WeLearn Kids',
    description: 'Ajedrez para niños de 8 a 12 años: piezas, estrategia inicial, partidas guiadas y práctica de inglés.',
    url: CANONICAL,
    type: 'website',
    images: [
      {
        url: '/images/kids/kids-ajedrez-docente.jpg',
        width: 1536,
        height: 1024,
        alt: 'Niños participando en una actividad guiada de ajedrez en inglés',
      },
    ],
  },
};

const faqs: FaqItem[] = [
  {
    question: '¿Para qué edades son las clases de ajedrez para niños?',
    answer:
      'La propuesta base está pensada para niños de 8 a 12 años. Antes de inscribir se revisan la edad, la experiencia con ajedrez y el nivel de inglés para confirmar que la edición disponible sea adecuada.',
  },
  {
    question: '¿Mi hijo debe saber jugar ajedrez?',
    answer:
      'No. La experiencia puede comenzar con el tablero, las piezas, los turnos y los movimientos básicos. Si ya juega, los retos y el lenguaje se pueden ampliar para que explique planes y decisiones.',
  },
  {
    question: '¿Necesita hablar inglés?',
    answer:
      'No se exige fluidez. El ajedrez ofrece un contexto visual: el niño puede relacionar una palabra o instrucción con una pieza y un movimiento. Las respuestas crecen desde palabras hasta frases según su nivel.',
  },
  {
    question: '¿Es un curso de ajedrez competitivo?',
    answer:
      'No se presenta como entrenamiento competitivo ni preparación para torneos. Es una experiencia de inglés mediante ajedrez, con fundamentos, retos y partidas guiadas. La prioridad es comprender, decidir y comunicar.',
  },
  {
    question: '¿Qué aprende además de los nombres de las piezas?',
    answer:
      'Practica instrucciones, posiciones, turnos, comparaciones y razones sencillas. También aprende a observar una situación, considerar opciones, respetar el turno y explicar por qué eligió un movimiento.',
  },
  {
    question: '¿Juegan partidas completas?',
    answer:
      'Puede haber mini partidas, posiciones preparadas o una partida guiada, según el nivel y el tiempo. Empezar con retos pequeños evita que el niño se pierda y permite concentrarse en una idea y un grupo de frases.',
  },
  {
    question: '¿Es presencial o virtual?',
    answer:
      'WeLearn cuenta con atención en Bucaramanga y servicios online. La modalidad disponible, el material necesario y la plataforma se confirman para cada edición antes de la inscripción.',
  },
  {
    question: '¿Cómo se evalúa el progreso?',
    answer:
      'Con evidencias observables: reconocer instrucciones, nombrar piezas y posiciones, ejecutar una jugada legal, anticipar una amenaza y explicar una decisión con el apoyo lingüístico adecuado.',
  },
  {
    question: '¿Cómo consulto fechas, horario y precio?',
    answer:
      'Escríbenos por WhatsApp como adulto responsable e indica la edad del niño, su experiencia con ajedrez e inglés y la modalidad que buscan. Te enviaremos la información vigente.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    localBusinessNode(
      'Academia de idiomas en Bucaramanga y online con una experiencia Kids de inglés mediante ajedrez.',
    ),
    {
      '@type': 'Service',
      '@id': `${CANONICAL}#service`,
      name: 'Clases de ajedrez para niños con práctica de inglés',
      description:
        'Experiencia para niños de 8 a 12 años que practican inglés mientras conocen las piezas, resuelven retos y explican decisiones en partidas guiadas.',
      provider: { '@id': 'https://www.idiomaswl.com/#localbusiness' },
      serviceType: 'Clases de ajedrez para niños con práctica de inglés',
      audience: {
        '@type': 'EducationalAudience',
        educationalRole: 'student',
        audienceType: 'Niños de 8 a 12 años',
      },
      areaServed: [
        { '@type': 'City', name: 'Bucaramanga' },
        { '@type': 'Country', name: 'Colombia' },
      ],
      inLanguage: ['es-CO', 'en'],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.idiomaswl.com' },
        { '@type': 'ListItem', position: 2, name: 'Kids', item: 'https://www.idiomaswl.com/kids' },
        { '@type': 'ListItem', position: 3, name: 'Ajedrez para niños', item: CANONICAL },
      ],
    },
  ],
};

export default function KidsChessPage() {
  return (
    <div className={styles.page}>
      <JsonLd data={jsonLd} />

      <aside className={styles.seasonBanner} aria-label="Edición de receso escolar">
        <div className={styles.seasonInner}>
          <span className={styles.seasonDot} aria-hidden="true" />
          Receso escolar del 5 al 9 de octubre · consulta la edición de ajedrez disponible
        </div>
      </aside>

      <section className={styles.hero}>
        <KidsBreadcrumbs
          items={[
            { label: 'Inicio', href: '/' },
            { label: 'Kids', href: '/kids' },
            { label: 'Ajedrez para niños' },
          ]}
        />
        <div className={styles.heroGrid}>
          <div>
            <p className={styles.eyebrow}>WeLearn Kids · Laboratorio de estrategia</p>
            <h1>Clases de ajedrez para niños en Bucaramanga con práctica de inglés</h1>
            <p className={styles.heroLead}>
              Una propuesta para niños de 8 a 12 años, en Bucaramanga y online según la edición,
              donde aprenden fundamentos del ajedrez y usan cada jugada para comprender y hablar en inglés.
            </p>
            <ul className={styles.heroProof}>
              <li>Desde cero</li>
              <li>8–12 años</li>
              <li>Partidas guiadas</li>
              <li>Bucaramanga y online</li>
            </ul>
            <div className={styles.ctaActions}>
              <a
                className={styles.primaryButton}
                href={kidsWhatsApp('Hola, soy madre, padre o acudiente. Quiero información sobre Ajedrez en Inglés para un niño de ___ años. Preferimos modalidad ___.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                Consultar la próxima edición
              </a>
              <a className={styles.secondaryButton} href="#ruta">
                Ver la ruta de aprendizaje
              </a>
            </div>
          </div>
          <div>
            <div className={styles.imageFrame}>
              <Image
                src="/images/kids/kids-ajedrez-docente.jpg"
                alt="Niños observando una posición de ajedrez durante una actividad de inglés guiada por una docente"
                fill
                priority
                sizes="(max-width: 980px) 100vw, 48vw"
              />
            </div>
            <p className={styles.imageCaption}>Imagen conceptual de la experiencia; no corresponde a alumnos reales.</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={`${styles.wrap} ${styles.split}`}>
          <div>
            <SectionHeading
              eyebrow="La respuesta corta"
              title="¿Son clases de ajedrez para niños? Sí, con un diferencial bilingüe"
            />
            <div className={styles.note}>
              <strong>Resultado esperado</strong>
              <p>Una partida o posición guiada que el niño pueda jugar y comentar con palabras y frases acordes con su nivel.</p>
            </div>
          </div>
          <div className={styles.prose}>
            <p>
              El niño sí aprende ajedrez desde la base: conoce el tablero y las piezas, practica movimientos
              legales, identifica amenazas y resuelve posiciones breves antes de jugar partidas guiadas. No
              necesita experiencia previa para comenzar.
            </p>
            <p>
              El diferencial es que el tablero también vuelve visible el idioma: hay una pieza, una casilla,
              un turno y una decisión.
              Palabras como <em>king</em>, <em>move</em>, <em>capture</em>, <em>safe</em> y <em>check</em> se pueden
              señalar, mover y comprobar. Esa relación ayuda a que el inglés no dependa solamente de traducir.
            </p>
            <p>
              El niño aprende a escuchar una instrucción, identificar una opción y expresar una razón sencilla.
              Puede empezar diciendo “knight” o “to e4” y avanzar hacia “I move my knight because…” cuando tenga
              los recursos para hacerlo.
            </p>
            <p>
              No prometemos entrenamiento de alto rendimiento. La meta es utilizar un juego de estrategia para
              desarrollar comprensión, comunicación y confianza mientras aprende las bases del ajedrez.
            </p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionDark}`} id="ruta">
        <div className={styles.wrap}>
          <SectionHeading
            eyebrow="Ruta de aprendizaje"
            title="Cinco misiones para pasar de reconocer piezas a explicar una jugada"
            lead="Las misiones son etapas pedagógicas, no un número fijo de clases. Se pueden agrupar de acuerdo con la experiencia previa, la duración y la modalidad."
          />
          <div className={`${styles.stepsGrid} ${styles.darkCards}`}>
            {[
              ['01', 'Meet the board', 'Reconoce filas, columnas, colores, casillas y orientación del tablero.'],
              ['02', 'Meet the pieces', 'Nombra las piezas y practica cómo se mueve cada una.'],
              ['03', 'Spot the idea', 'Encuentra capturas, amenazas, defensas y casillas seguras en retos cortos.'],
              ['04', 'Play the position', 'Toma turnos, ejecuta jugadas legales y responde a una situación guiada.'],
              ['05', 'Explain the move', 'Cuenta qué movió, a dónde fue y cuál era su idea con una frase modelo.'],
            ].map(([number, title, text]) => (
              <article className={styles.stepCard} key={number}>
                <span className={styles.stepNumber}>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <SectionHeading
            eyebrow="Un reto posible"
            title="Ejemplo: salva al rey en una posición de tres decisiones"
            lead="Las posiciones breves permiten practicar una idea a la vez y dan al niño un motivo inmediato para escuchar, mover y explicar."
          />
          <div className={styles.cardGrid}>
            <article className={styles.card}>
              <span className={styles.cardIcon}>1</span>
              <h3>Observar</h3>
              <p>“Your king is in check.” El niño identifica al rey, la amenaza y las piezas que participan.</p>
            </article>
            <article className={styles.card}>
              <span className={styles.cardIcon}>2</span>
              <h3>Elegir</h3>
              <p>Move, block or capture. Compara tres tipos de respuesta y prueba si cada opción es legal.</p>
            </article>
            <article className={styles.card}>
              <span className={styles.cardIcon}>3</span>
              <h3>Explicar</h3>
              <p>“I move the king because this square is safe.” La razón une vocabulario, posición y decisión.</p>
            </article>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionSoft}`}>
        <div className={styles.wrap}>
          <SectionHeading
            eyebrow="Inglés sobre el tablero"
            title="Un banco de palabras y frases que crece con el niño"
            lead="No hace falta producir oraciones largas desde el comienzo. Las respuestas se construyen por capas: identificar, mover, describir y justificar."
          />
          <div className={styles.languageGrid}>
            <article className={styles.languageCard}>
              <h3>Piezas</h3>
              <p>
                <code>king</code><code>queen</code><code>rook</code><code>bishop</code><code>knight</code><code>pawn</code>
              </p>
            </article>
            <article className={styles.languageCard}>
              <h3>Acciones</h3>
              <p>
                <code>move</code><code>capture</code><code>protect</code><code>attack</code><code>block</code><code>check</code>
              </p>
            </article>
            <article className={styles.languageCard}>
              <h3>Posición</h3>
              <p>
                <code>left</code><code>right</code><code>forward</code><code>back</code><code>next to</code><code>diagonal</code>
              </p>
            </article>
            <article className={styles.languageCard}>
              <h3>Conversación de juego</h3>
              <p>
                <code>Your turn</code><code>My move</code><code>Is it safe?</code><code>I choose…</code><code>Good game</code>
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <SectionHeading
            eyebrow="Progreso observable"
            title="La evidencia está en lo que el niño reconoce, hace y explica"
            lead="Las pequeñas conductas visibles ayudan a acompañar el proceso sin reducirlo a una nota o a ganar todas las partidas."
          />
          <div className={styles.cardGrid}>
            <article className={styles.card}>
              <span className={styles.cardIcon}>A</span>
              <h3>Reconoce</h3>
              <p>Identifica una pieza, una casilla o una instrucción básica cuando la escucha dentro del juego.</p>
            </article>
            <article className={styles.card}>
              <span className={styles.cardIcon}>B</span>
              <h3>Decide</h3>
              <p>Considera una amenaza y elige una jugada legal entre opciones acordes con su nivel.</p>
            </article>
            <article className={styles.card}>
              <span className={styles.cardIcon}>C</span>
              <h3>Comunica</h3>
              <p>Nombra su movimiento y expresa una razón breve usando el apoyo lingüístico disponible.</p>
            </article>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionSoft}`}>
        <div className={`${styles.wrap} ${styles.split}`}>
          <div>
            <SectionHeading
              eyebrow="Un espacio amable"
              title="Pensar antes de mover también significa aprender a equivocarse"
            />
            <div className={styles.note}>
              <strong>Ganar no es la única evidencia.</strong>
              <p>Encontrar una opción, corregir una jugada y explicar una idea también son avances valiosos.</p>
            </div>
          </div>
          <div className={styles.prose}>
            <h3>Retos graduados</h3>
            <p>
              Una partida completa puede ser demasiada información para un principiante. Por eso se pueden usar
              mini tableros, posiciones preparadas y preguntas de una sola decisión antes de integrar todo.
            </p>
            <h3>Turnos y respeto</h3>
            <p>
              Esperar, escuchar, aceptar una corrección y cerrar con “good game” son parte del lenguaje de la
              experiencia. La competencia se maneja como una oportunidad de observación y convivencia.
            </p>
            <h3>Sin presión por hablar perfecto</h3>
            <p>
              El niño puede apoyarse en tarjetas, modelos, gestos y el propio tablero. La precisión se construye
              gradualmente; primero debe poder participar y comprender la situación.
            </p>
            <h3>Familia informada</h3>
            <p>
              La inscripción se gestiona con un adulto. Antes de iniciar se confirman modalidad, material, fechas,
              duración, valor y cualquier necesidad de acompañamiento o accesibilidad.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <SectionHeading
            eyebrow="Preguntas frecuentes"
            title="Lo esencial sobre ajedrez en inglés para niños"
          />
          <KidsFaq items={faqs} />
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.wrap}>
          <SectionHeading
            eyebrow="¿Le gusta más inventar?"
            title="También puede aprender inglés creando un videojuego"
            lead="Si tu hijo prefiere personajes, pantallas y construir cosas, conoce la ruta principal de programación de WeLearn Kids."
          />
          <Link className={styles.secondaryButton} href="/kids/ingles-programacion-videojuegos">
            Ver inglés + programación
          </Link>
        </div>
      </section>

      <KidsCta
        title="¿Tu hijo quiere aprender el idioma del tablero?"
        text="Cuéntanos su edad, experiencia con inglés y ajedrez, y la modalidad que prefieren. Te compartiremos las condiciones reales de la edición disponible."
        message="Hola, soy madre, padre o acudiente. Quiero información sobre Ajedrez en Inglés para un niño de ___ años. Su experiencia con inglés/ajedrez es ___. Preferimos modalidad ___."
      />
    </div>
  );
}
