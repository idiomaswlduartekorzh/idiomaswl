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
import styles from './kids.module.css';

const CANONICAL = 'https://www.idiomaswl.com/kids';

export const metadata: Metadata = {
  title: 'Inglés para niños en Bucaramanga y online | WeLearn Kids',
  description:
    'Cursos de inglés para niños de 8 a 12 años con videojuegos y ajedrez. Aprenden haciendo en Bucaramanga y online. Consulta próximos grupos.',
  keywords: [
    'inglés para niños Bucaramanga',
    'curso de inglés para niños',
    'inglés para niños online Colombia',
    'vacaciones recreativas inglés Bucaramanga',
    'programación para niños en inglés',
    'ajedrez en inglés para niños',
  ],
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: 'WeLearn Kids: inglés para niños que aprenden haciendo',
    description: 'Videojuegos, ajedrez e inglés en proyectos pensados para niños de 8 a 12 años.',
    url: CANONICAL,
    type: 'website',
    images: [
      {
        url: '/images/kids/kids-hero-colaboracion.jpg',
        width: 1881,
        height: 836,
        alt: 'Niños colaborando en una actividad de inglés con programación y ajedrez',
      },
    ],
  },
};

const faqs: FaqItem[] = [
  {
    question: '¿Para qué edades están pensadas las experiencias WeLearn Kids?',
    answer:
      'La propuesta base está diseñada para niños de 8 a 12 años. Antes de inscribir, el equipo confirma la edad, la experiencia previa y la edición disponible para ubicar al niño en una experiencia adecuada.',
  },
  {
    question: '¿Mi hijo necesita saber inglés antes de empezar?',
    answer:
      'No necesita hablar inglés con fluidez. Las actividades parten de instrucciones breves, apoyos visuales, demostraciones y frases modelo. El reto se ajusta para que un principiante pueda participar y un niño con más nivel tenga espacio para explicar más.',
  },
  {
    question: '¿Debe saber programar o jugar ajedrez?',
    answer:
      'No. Ambas rutas comienzan desde los conceptos esenciales. En programación se trabaja con lógica visual y proyectos sencillos; en ajedrez se conocen las piezas, los movimientos y las decisiones básicas antes de jugar una partida guiada.',
  },
  {
    question: '¿Es una clase de inglés tradicional?',
    answer:
      'No. El inglés es la herramienta para completar una misión: crear un videojuego o tomar decisiones en una partida. Sí hay vocabulario, comprensión y conversación, pero aparecen dentro de una tarea con un resultado visible.',
  },
  {
    question: '¿Las actividades son presenciales u online?',
    answer:
      'WeLearn atiende en Bucaramanga y también ofrece servicios online. La modalidad, las fechas, la duración y los requisitos dependen de la edición disponible; se confirman por WhatsApp antes de cualquier pago.',
  },
  {
    question: '¿Qué evidencia recibe la familia?',
    answer:
      'La meta es que el niño pueda mostrar algo concreto: un proyecto jugable o una partida comentada, además del vocabulario y las frases que practicó. La evidencia exacta se define según la duración y modalidad del grupo.',
  },
  {
    question: '¿Cómo se cuida la privacidad de los niños?',
    answer:
      'La comunicación de inscripción se realiza con un adulto responsable. No es necesario publicar el nombre completo, la imagen ni el proyecto del niño en redes sociales para participar. Cualquier autorización de imagen debe pedirse por separado.',
  },
  {
    question: '¿Cómo consulto precio, horario y cupo?',
    answer:
      'Escríbenos por WhatsApp indicando la edad del niño, la actividad que le interesa y si prefieren Bucaramanga u online. Te responderemos con la edición vigente, su logística y el valor confirmado.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    localBusinessNode(
      'Academia de idiomas en Bucaramanga y online con experiencias de inglés para niños mediante proyectos de programación y ajedrez.',
    ),
    {
      '@type': 'Service',
      '@id': `${CANONICAL}#service`,
      name: 'WeLearn Kids — Inglés en acción',
      description:
        'Experiencias de inglés para niños de 8 a 12 años que usan programación de videojuegos y ajedrez como contextos para crear, jugar y explicar.',
      provider: { '@id': 'https://www.idiomaswl.com/#localbusiness' },
      serviceType: 'Inglés para niños mediante proyectos',
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
      '@type': 'ItemList',
      name: 'Experiencias WeLearn Kids',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'Service',
            name: 'Inglés y programación para niños',
            url: 'https://www.idiomaswl.com/kids/ingles-programacion-videojuegos',
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'Service',
            name: 'Ajedrez en inglés para niños',
            url: 'https://www.idiomaswl.com/kids/ingles-ajedrez',
          },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.idiomaswl.com' },
        { '@type': 'ListItem', position: 2, name: 'Kids', item: CANONICAL },
      ],
    },
  ],
};

export default function KidsPage() {
  return (
    <div className={styles.page}>
      <JsonLd data={jsonLd} />

      <aside className={styles.seasonBanner} aria-label="Edición de receso escolar">
        <div className={styles.seasonInner}>
          <span className={styles.seasonDot} aria-hidden="true" />
          Receso escolar del 5 al 9 de octubre · consulta la edición Kids disponible
        </div>
      </aside>

      <section className={styles.hero}>
        <KidsBreadcrumbs items={[{ label: 'Inicio', href: '/' }, { label: 'Kids' }]} />
        <div className={styles.heroGrid}>
          <div>
            <p className={styles.eyebrow}>WeLearn Kids · Inglés en acción</p>
            <h1>Inglés para niños que aprenden haciendo</h1>
            <p className={styles.heroLead}>
              Tu hijo no solo estudia inglés: lo usa para crear un videojuego, resolver un reto,
              jugar una partida y explicar lo que hizo. Una experiencia activa para niños de 8 a 12 años.
            </p>
            <ul className={styles.heroProof}>
              <li>8–12 años</li>
              <li>Principiantes bienvenidos</li>
              <li>Bucaramanga y online</li>
              <li>Proyecto visible</li>
            </ul>
            <div className={styles.ctaActions}>
              <a
                className={styles.primaryButton}
                href={kidsWhatsApp('Hola, soy madre, padre o acudiente. Quiero información sobre WeLearn Kids para un niño de ___ años. Me interesa la modalidad ___.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                Consultar próximos grupos
              </a>
              <a className={styles.secondaryButton} href="#experiencias">
                Ver las experiencias
              </a>
            </div>
          </div>
          <div>
            <div className={styles.imageFrame}>
              <Image
                src="/images/kids/kids-hero-colaboracion.jpg"
                alt="Niños colaborando frente a un computador y un tablero de ajedrez durante una actividad guiada"
                fill
                priority
                sizes="(max-width: 980px) 100vw, 48vw"
              />
            </div>
            <p className={styles.imageCaption}>Imagen conceptual de la experiencia Kids; no corresponde a alumnos reales.</p>
          </div>
        </div>
      </section>

      <section className={styles.section} id="experiencias">
        <div className={styles.wrap}>
          <SectionHeading
            eyebrow="Dos maneras de entrar al inglés"
            title="El idioma deja de ser una materia y se convierte en una herramienta"
            lead="Cada experiencia tiene una misión clara y un resultado que el niño puede mostrar. La actividad despierta la curiosidad; el inglés le permite avanzar, pedir ayuda y contar lo que construyó."
          />
          <div className={styles.offerGrid}>
            <article className={styles.offerCard}>
              <span className={styles.offerTag}>Ruta principal · Crear</span>
              <h3>Aprende inglés programando videojuegos</h3>
              <p>
                El niño diseña un juego sencillo, programa sus reglas con lógica visual y usa inglés
                funcional para seguir instrucciones, nombrar elementos y presentar su resultado.
              </p>
              <ul>
                <li>Personajes, movimiento, puntaje, vidas y condiciones</li>
                <li>Vocabulario digital y frases para resolver errores</li>
                <li>Proyecto jugable con una explicación guiada</li>
              </ul>
              <Link className={styles.textLink} href="/kids/ingles-programacion-videojuegos">
                Explorar inglés + programación →
              </Link>
            </article>
            <article className={styles.offerCard}>
              <span className={styles.offerTag}>Ruta estratégica · Jugar</span>
              <h3>Aprende inglés jugando ajedrez</h3>
              <p>
                El niño reconoce las piezas, comprende instrucciones, toma decisiones y explica un
                movimiento en inglés dentro de retos y partidas guiadas.
              </p>
              <ul>
                <li>Piezas, casillas, turnos, capturas y jaque</li>
                <li>Frases para observar, decidir y justificar</li>
                <li>Partida guiada con un pequeño relato de juego</li>
              </ul>
              <Link className={styles.textLink} href="/kids/ingles-ajedrez">
                Explorar inglés + ajedrez →
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionSoft}`}>
        <div className={styles.wrap}>
          <SectionHeading
            eyebrow="Cómo aprende"
            title="Una secuencia simple: mirar, entender, usar, crear y compartir"
            lead="No se trata de traducir listas interminables. El niño encuentra el idioma dentro de una acción concreta y vuelve a usarlo varias veces con apoyo visual y acompañamiento."
          />
          <div className={styles.stepsGrid}>
            {[
              ['01', 'Observar', 'Ve una demostración corta y descubre cuál es la misión del día.'],
              ['02', 'Escuchar', 'Relaciona instrucciones breves en inglés con acciones y elementos visibles.'],
              ['03', 'Usar', 'Repite frases útiles para pedir ayuda, elegir, comparar y corregir.'],
              ['04', 'Crear', 'Aplica lo aprendido en un juego digital o una situación de ajedrez.'],
              ['05', 'Compartir', 'Muestra el resultado y explica una decisión con una guía adaptada a su nivel.'],
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

      <section className={`${styles.section} ${styles.sectionDark}`}>
        <div className={styles.wrap}>
          <SectionHeading
            eyebrow="Lo que puede ver una familia"
            title="Aprendizaje con huellas, no con promesas vacías"
            lead="El progreso infantil no se reduce a memorizar palabras. Buscamos evidencias pequeñas y observables que ayuden a la familia a entender qué hizo el niño y cómo usó el inglés."
          />
          <div className={`${styles.cardGrid} ${styles.darkCards}`}>
            <article className={styles.card}>
              <span className={styles.cardIcon}>A</span>
              <h3>Comprende una instrucción</h3>
              <p>Relaciona frases como “move the character” o “your turn” con una acción que puede ejecutar.</p>
            </article>
            <article className={styles.card}>
              <span className={styles.cardIcon}>B</span>
              <h3>Produce una respuesta</h3>
              <p>Usa palabras y estructuras breves para nombrar, elegir, pedir ayuda o explicar una decisión.</p>
            </article>
            <article className={styles.card}>
              <span className={styles.cardIcon}>C</span>
              <h3>Presenta un resultado</h3>
              <p>Muestra un juego o una secuencia de ajedrez y cuenta, con apoyo, qué creó o por qué movió.</p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <SectionHeading
            eyebrow="¿Cuál elegir?"
            title="Dos intereses distintos, la misma meta: usar inglés con sentido"
            lead="La mejor ruta es la que logra que el niño quiera volver a la tarea. Esta comparación ayuda a escoger una primera experiencia."
          />
          <div className={styles.comparisonWrap}>
            <table className={styles.comparison}>
              <thead>
                <tr>
                  <th>Pregunta</th>
                  <th>Videojuegos y programación</th>
                  <th>Ajedrez en inglés</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>¿Qué lo engancha?</td>
                  <td>Inventar personajes, reglas, niveles y efectos.</td>
                  <td>Resolver retos, anticipar jugadas y competir consigo mismo.</td>
                </tr>
                <tr>
                  <td>¿Qué crea?</td>
                  <td>Un prototipo de videojuego sencillo.</td>
                  <td>Una partida guiada y una explicación de sus decisiones.</td>
                </tr>
                <tr>
                  <td>¿Qué inglés aparece?</td>
                  <td>Acciones, instrucciones, posiciones, condiciones y solución de errores.</td>
                  <td>Piezas, posiciones, turnos, amenazas, planes y justificaciones.</td>
                </tr>
                <tr>
                  <td>¿Necesita experiencia?</td>
                  <td>No. La lógica visual permite empezar desde cero.</td>
                  <td>No. Se explican tablero, piezas y movimientos esenciales.</td>
                </tr>
                <tr>
                  <td>¿Qué necesita?</td>
                  <td>Acceso a computador; los detalles técnicos se confirman según la edición.</td>
                  <td>Curiosidad y disposición para jugar; el material depende de la modalidad.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionSoft}`}>
        <div className={`${styles.wrap} ${styles.split}`}>
          <div>
            <SectionHeading
              eyebrow="Pensado para la infancia"
              title="Reto suficiente para avanzar, apoyo suficiente para no quedarse atrás"
            />
            <div className={styles.note}>
              <strong>La inscripción siempre la gestiona un adulto.</strong>
              <p>Antes de empezar se confirma edad, modalidad, necesidades de acceso y expectativas de la familia.</p>
            </div>
          </div>
          <div className={styles.prose}>
            <h3>Inglés comprensible</h3>
            <p>
              Las instrucciones se apoyan con ejemplos, imágenes, objetos, gestos y demostraciones. El objetivo
              no es poner al niño a adivinar, sino darle una razón real para comprender y responder.
            </p>
            <h3>Pantalla con propósito</h3>
            <p>
              En programación, la pantalla se usa para diseñar, probar, corregir y explicar. El niño no es un
              espectador pasivo: toma decisiones y produce un resultado propio dentro de una actividad guiada.
            </p>
            <h3>Privacidad y convivencia</h3>
            <p>
              No se exige publicar proyectos o imágenes personales. Se promueven turnos, lenguaje respetuoso,
              colaboración y solicitudes de ayuda claras. Los datos de contacto se manejan con el acudiente.
            </p>
            <h3>Expectativas honestas</h3>
            <p>
              Una experiencia corta no vuelve bilingüe al niño ni lo convierte en programador o ajedrecista
              avanzado. Sí puede darle una primera victoria: entender instrucciones, crear algo y atreverse a explicarlo.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <SectionHeading
            eyebrow="Preguntas frecuentes"
            title="Lo que una familia necesita saber antes de elegir"
            lead="Las fechas, horarios, modalidad, herramientas y valores se confirman para cada edición. Aquí respondemos las preguntas que no deberían esperar."
          />
          <KidsFaq items={faqs} />
        </div>
      </section>

      <KidsCta
        title="Cuéntanos qué le gusta crear o jugar a tu hijo"
        text="Indica su edad, si le atraen más los videojuegos o el ajedrez y si buscan una opción en Bucaramanga u online. Te compartiremos la edición disponible y sus condiciones reales."
        message="Hola, soy madre, padre o acudiente. Quiero información sobre WeLearn Kids para un niño de ___ años. Le interesa ___. Preferimos modalidad ___."
        secondaryHref="/clases-de-ingles"
        secondaryLabel="Ver clases de inglés"
      />
    </div>
  );
}
