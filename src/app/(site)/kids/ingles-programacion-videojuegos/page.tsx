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

const CANONICAL = 'https://www.idiomaswl.com/kids/ingles-programacion-videojuegos';

export const metadata: Metadata = {
  title: 'Programación para niños en Bucaramanga | Videojuegos',
  description:
    'Curso de programación para niños de 8 a 12 años en Bucaramanga y online: crea un videojuego con lógica visual mientras practica inglés.',
  keywords: [
    'programación para niños Bucaramanga',
    'curso de programación para niños',
    'inglés y programación para niños',
    'crear videojuegos para niños',
    'Scratch para niños en inglés',
    'vacaciones recreativas programación Bucaramanga',
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'Programación para niños: crea videojuegos y practica inglés',
    description: 'Curso creativo para niños de 8 a 12 años: programación visual, videojuegos e inglés en un proyecto guiado.',
    url: CANONICAL,
    type: 'website',
    images: [
      {
        url: '/images/kids/kids-programacion-videojuego.jpg',
        width: 1672,
        height: 941,
        alt: 'Niños creando un videojuego con programación visual durante una actividad guiada',
      },
    ],
  },
};

const faqs: FaqItem[] = [
  {
    question: '¿Para qué edades es el curso de programación para niños?',
    answer:
      'La propuesta base está pensada para niños de 8 a 12 años. Antes de inscribir se revisan la edad, la experiencia con tecnología y el nivel de inglés para confirmar que la edición disponible sea adecuada.',
  },
  {
    question: '¿Mi hijo debe saber programar?',
    answer:
      'No. La ruta empieza con lógica visual: eventos, secuencias, movimientos y condiciones que se organizan en bloques. La herramienta concreta y su acceso se confirman para cada edición.',
  },
  {
    question: '¿Necesita un nivel mínimo de inglés?',
    answer:
      'No se exige fluidez. Las instrucciones se presentan de forma breve y visual. Un principiante puede responder con palabras y frases modelo; quien tenga más nivel puede ampliar la explicación de su proyecto.',
  },
  {
    question: '¿Van a jugar videojuegos todo el tiempo?',
    answer:
      'No. El foco está en construir: planear una regla, programarla, probarla, encontrar errores y mejorarla. Jugar sirve para comprobar si el proyecto funciona y para recibir retroalimentación.',
  },
  {
    question: '¿Qué tipo de videojuego pueden crear?',
    answer:
      'La meta es un prototipo sencillo y alcanzable, por ejemplo recoger objetos, evitar obstáculos o llegar a una meta. El alcance exacto depende del tiempo disponible, la herramienta y el ritmo del grupo.',
  },
  {
    question: '¿Usan Scratch?',
    answer:
      'La experiencia está pensada para herramientas de programación visual como Scratch porque permiten concentrarse en la lógica y el lenguaje. La plataforma definitiva se confirma antes de la inscripción y puede cambiar según la edición.',
  },
  {
    question: '¿Qué equipo necesita el niño?',
    answer:
      'Normalmente se requiere acceso a un computador y, si la edición es online, conexión estable. Antes de pagar se informa si hace falta crear una cuenta, instalar algo o llevar equipo propio.',
  },
  {
    question: '¿El proyecto del niño se publica en internet?',
    answer:
      'No es un requisito. El proyecto puede mantenerse privado o compartirse únicamente en el entorno definido para la actividad. La publicación externa y el uso de imagen requieren decisión y autorización separada del adulto responsable.',
  },
  {
    question: '¿Dónde consulto precio, fechas y modalidad?',
    answer:
      'Por WhatsApp. Indica la edad del niño, su experiencia con inglés y tecnología, y si prefieren Bucaramanga u online. El equipo te dará la información vigente antes de cualquier pago.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    localBusinessNode(
      'Academia de idiomas en Bucaramanga y online con una experiencia Kids de inglés mediante programación de videojuegos.',
    ),
    {
      '@type': 'Service',
      '@id': `${CANONICAL}#service`,
      name: 'Programación para niños: crea videojuegos y practica inglés',
      description:
        'Experiencia para niños de 8 a 12 años que practican inglés mientras diseñan, programan, prueban y presentan un videojuego sencillo.',
      provider: { '@id': 'https://www.idiomaswl.com/#localbusiness' },
      serviceType: 'Curso de programación de videojuegos para niños con práctica de inglés',
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
        { '@type': 'ListItem', position: 3, name: 'Programación para niños', item: CANONICAL },
      ],
    },
  ],
};

export default function KidsProgrammingPage() {
  return (
    <div className={styles.page}>
      <JsonLd data={jsonLd} />

      <aside className={styles.seasonBanner} aria-label="Edición de receso escolar">
        <div className={styles.seasonInner}>
          <span className={styles.seasonDot} aria-hidden="true" />
          Receso escolar del 5 al 9 de octubre · consulta la edición de programación disponible
        </div>
      </aside>

      <section className={styles.hero}>
        <KidsBreadcrumbs
          items={[
            { label: 'Inicio', href: '/' },
            { label: 'Kids', href: '/kids' },
            { label: 'Programación para niños' },
          ]}
        />
        <div className={styles.heroGrid}>
          <div>
            <p className={styles.eyebrow}>WeLearn Kids · Laboratorio creativo</p>
            <h1>Programación para niños: crea videojuegos y practica inglés</h1>
            <p className={styles.heroLead}>
              Curso para niños de 8 a 12 años en Bucaramanga y online: imaginan un juego, construyen
              sus reglas con programación visual, lo prueban y explican en inglés cómo funciona.
            </p>
            <ul className={styles.heroProof}>
              <li>Desde cero</li>
              <li>8–12 años</li>
              <li>Lógica visual</li>
              <li>Bucaramanga y online</li>
            </ul>
            <div className={styles.ctaActions}>
              <a
                className={styles.primaryButton}
                href={kidsWhatsApp('Hola, soy madre, padre o acudiente. Quiero información sobre Inglés + Programación para un niño de ___ años. Preferimos modalidad ___.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                Consultar la próxima edición
              </a>
              <a className={styles.secondaryButton} href="#ruta">
                Ver la ruta del proyecto
              </a>
            </div>
          </div>
          <div>
            <div className={styles.imageFrame}>
              <Image
                src="/images/kids/kids-programacion-videojuego.jpg"
                alt="Dos niños construyendo un videojuego con bloques de programación visual en un computador"
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
              title="¿Es un curso de programación para niños? Sí, con un diferencial bilingüe"
            />
            <div className={styles.note}>
              <strong>Resultado esperado</strong>
              <p>Un prototipo sencillo que el niño pueda jugar, mostrar y presentar con frases acordes con su nivel.</p>
            </div>
          </div>
          <div className={styles.prose}>
            <p>
              El niño sí trabaja fundamentos de programación: secuencias, eventos, controles, condiciones,
              puntaje, pruebas y corrección de errores. La meta es construir un videojuego sencillo con lógica
              visual, una entrada apropiada para quien todavía no escribe código.
            </p>
            <p>
              El diferencial es que el proyecto también funciona como contexto de inglés. En vez de dejar las
              palabras aisladas en el cuaderno,
              <em> move</em>, <em>score</em>, <em>lives</em>, <em>touch</em> y <em>game over</em> están conectadas con algo
              que el niño ve y modifica. Cada palabra ayuda a que el videojuego haga lo que él imaginó.
            </p>
            <p>
              La programación visual reduce la barrera de escribir código complejo. El niño combina bloques,
              prueba una hipótesis y observa el resultado. Mientras crea, también escucha instrucciones, formula
              preguntas, describe problemas y practica una presentación breve en inglés.
            </p>
            <p>
              El propósito no es prometer que saldrá convertido en desarrollador o bilingüe. Es ofrecerle una
              experiencia auténtica donde pensar, crear y comunicarse suceden al mismo tiempo.
            </p>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionDark}`} id="ruta">
        <div className={styles.wrap}>
          <SectionHeading
            eyebrow="Ruta del proyecto"
            title="Cinco misiones para pasar de una idea a un juego que funciona"
            lead="Las misiones describen el recorrido pedagógico, no un número fijo de clases. Pueden agruparse según la duración y modalidad de cada edición."
          />
          <div className={`${styles.stepsGrid} ${styles.darkCards}`}>
            {[
              ['01', 'Imagine', 'Elige una meta, un personaje y un escenario. Explica qué quiere que ocurra.'],
              ['02', 'Build', 'Programa movimientos, controles y respuestas usando bloques visuales.'],
              ['03', 'Add rules', 'Incorpora puntaje, vidas, obstáculos, condiciones o una meta de victoria.'],
              ['04', 'Test & debug', 'Juega, encuentra un error, describe el problema y prueba una solución.'],
              ['05', 'Share', 'Presenta el juego: objetivo, controles, regla favorita y mejora pendiente.'],
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
            eyebrow="Un proyecto posible"
            title="Ejemplo: Space Collector, un juego de recoger objetos"
            lead="El proyecto final puede cambiar, pero este ejemplo muestra cómo una mecánica sencilla crea muchas oportunidades de usar inglés sin convertir la actividad en una lista de vocabulario."
          />
          <div className={styles.cardGrid}>
            <article className={styles.card}>
              <span className={styles.cardIcon}>1</span>
              <h3>El reto</h3>
              <p>Move the character, collect five stars and avoid the asteroid. El niño comprende la meta antes de construir.</p>
            </article>
            <article className={styles.card}>
              <span className={styles.cardIcon}>2</span>
              <h3>La lógica</h3>
              <p>When the key is pressed, move. If the character touches a star, change the score. Las reglas tienen un efecto visible.</p>
            </article>
            <article className={styles.card}>
              <span className={styles.cardIcon}>3</span>
              <h3>La explicación</h3>
              <p>“My game is called…”, “The player has to…” y “I fixed…” convierten la creación en una pequeña presentación.</p>
            </article>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionSoft}`}>
        <div className={styles.wrap}>
          <SectionHeading
            eyebrow="Inglés que se puede usar"
            title="Palabras y frases conectadas con decisiones reales"
            lead="El lenguaje se adapta al nivel. Un niño puede empezar señalando y usando una palabra; luego avanzar hacia instrucciones y explicaciones completas."
          />
          <div className={styles.languageGrid}>
            <article className={styles.languageCard}>
              <h3>Objetos y pantalla</h3>
              <p>
                <code>character</code><code>background</code><code>button</code><code>score</code><code>lives</code><code>level</code>
              </p>
            </article>
            <article className={styles.languageCard}>
              <h3>Acciones</h3>
              <p>
                <code>move</code><code>jump</code><code>turn</code><code>touch</code><code>collect</code><code>avoid</code>
              </p>
            </article>
            <article className={styles.languageCard}>
              <h3>Reglas</h3>
              <p>
                <code>when</code><code>if</code><code>then</code><code>repeat</code><code>start</code><code>game over</code>
              </p>
            </article>
            <article className={styles.languageCard}>
              <h3>Resolver problemas</h3>
              <p>
                <code>It works</code><code>There is a bug</code><code>Try again</code><code>I need help</code><code>I fixed it</code>
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <SectionHeading
            eyebrow="Más que tiempo de pantalla"
            title="Diseñar, probar y corregir cambia el papel del niño frente a la tecnología"
            lead="La diferencia no está solamente en la aplicación. Está en la tarea que se propone y en la conversación que acompaña cada decisión."
          />
          <div className={styles.cardGrid}>
            <article className={styles.card}>
              <span className={styles.cardIcon}>↺</span>
              <h3>Pensamiento iterativo</h3>
              <p>El primer intento no tiene que ser perfecto. Probar, detectar y ajustar hace parte del proceso.</p>
            </article>
            <article className={styles.card}>
              <span className={styles.cardIcon}>?</span>
              <h3>Preguntas con propósito</h3>
              <p>“What happens if…?” y “Why doesn’t it work?” convierten la curiosidad en lenguaje y acción.</p>
            </article>
            <article className={styles.card}>
              <span className={styles.cardIcon}>▶</span>
              <h3>Autoría</h3>
              <p>El niño decide el tema, prueba reglas y explica su resultado; no se limita a consumir un juego terminado.</p>
            </article>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionSoft}`}>
        <div className={`${styles.wrap} ${styles.split}`}>
          <div>
            <SectionHeading
              eyebrow="Antes de inscribirse"
              title="Requisitos claros y seguridad digital desde el comienzo"
            />
            <p className={styles.heroLead} style={{ color: 'var(--muted)', marginTop: 0 }}>
              Las condiciones técnicas varían entre una experiencia presencial y una online. Se confirman con el acudiente para evitar sorpresas.
            </p>
          </div>
          <div className={styles.prose}>
            <h3>Equipo y acceso</h3>
            <p>
              Se recomienda acceso a computador. La conexión, el navegador, la creación de cuentas y el uso de
              equipo propio se detallan en la información de cada edición. No compres ni instales nada antes de recibir esa confirmación.
            </p>
            <h3>Cuenta y nombre visible</h3>
            <p>
              Cuando una herramienta requiere registro, la gestión debe realizarse con el acompañamiento del adulto.
              Se evita usar información personal innecesaria como nombre completo, colegio, ubicación o fecha de nacimiento.
            </p>
            <h3>Publicación del proyecto</h3>
            <p>
              Un juego no necesita hacerse público para demostrar el aprendizaje. Compartirlo fuera del entorno de
              trabajo es una decisión separada, informada y gestionada por el adulto responsable.
            </p>
            <h3>Acompañamiento</h3>
            <p>
              La actividad guía al niño con demostraciones, pausas de comprobación y frases modelo. Si necesita apoyo
              adicional de accesibilidad o aprendizaje, cuéntanos antes de inscribir para revisar qué ajustes son posibles.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <SectionHeading
            eyebrow="Preguntas frecuentes"
            title="Lo esencial sobre inglés y programación para niños"
          />
          <KidsFaq items={faqs} />
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.wrap}>
          <SectionHeading
            eyebrow="¿Prefiere otro tipo de reto?"
            title="También pueden aprender inglés jugando ajedrez"
            lead="Si a tu hijo le atraen los tableros, las estrategias y los retos tranquilos, conoce la segunda ruta de WeLearn Kids."
          />
          <Link className={styles.secondaryButton} href="/kids/ingles-ajedrez">
            Ver ajedrez en inglés
          </Link>
        </div>
      </section>

      <KidsCta
        title="¿Tu hijo quiere crear su primer videojuego?"
        text="Cuéntanos su edad, experiencia con inglés y tecnología, y la modalidad que prefieren. Te enviaremos las condiciones reales de la próxima edición disponible."
        message="Hola, soy madre, padre o acudiente. Quiero información sobre Inglés + Programación para un niño de ___ años. Su experiencia con inglés/programación es ___. Preferimos modalidad ___."
      />
    </div>
  );
}
