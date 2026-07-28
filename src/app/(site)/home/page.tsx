import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Home.module.css';
import {
  ANSWERS,
  EXAMS,
  FOUNDERS,
  HOME_META,
  INTENTIONS,
  LANGUAGES,
  ORGANIZATION_SCHEMA,
  PRODUCT_AREAS,
  ROUTE_STEPS,
} from './home-content';

export const metadata: Metadata = {
  title: HOME_META.title,
  description: HOME_META.description,
  alternates: { canonical: HOME_META.canonical },
  openGraph: {
    title: HOME_META.ogTitle,
    description: HOME_META.ogDescription,
    url: HOME_META.canonical,
    type: 'website',
    locale: 'es_CO',
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_META.ogTitle,
    description: HOME_META.ogDescription,
  },
};

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 12h15M14 6l6 6-6 6" />
    </svg>
  );
}

function RecognitionScene() {
  return (
    <div className={`${styles.motionScene} ${styles.recognitionScene}`} aria-hidden="true">
      <span className={styles.sceneIndex}>01</span>
      <div className={styles.radar}>
        <i /><i /><i /><i />
        <b />
        <span className={styles.radarWordOne}>lectura</span>
        <span className={styles.radarWordTwo}>escucha</span>
        <span className={styles.radarWordThree}>vocabulario</span>
        <span className={styles.radarWordFour}>uso</span>
      </div>
      <p className={styles.sceneResult}>Un punto de partida visible</p>
    </div>
  );
}

function ConnectionScene() {
  return (
    <div className={`${styles.motionScene} ${styles.connectionScene}`} aria-hidden="true">
      <span className={styles.sceneIndex}>02</span>
      <div className={styles.wordField}>
        <span>palabras</span>
        <span>estructuras</span>
        <span>contexto</span>
        <span>intención</span>
        <span>comprensión</span>
        <svg viewBox="0 0 720 430">
          <path d="M94 103C225 105 225 212 354 212S489 99 631 103" />
          <path d="M96 333c126 0 130-121 258-121s134 121 270 121" />
          <path d="M354 212V66M354 212v154" />
          <circle cx="354" cy="212" r="14" />
        </svg>
      </div>
      <p className={styles.sceneResult}>Una red que empieza a tener sentido</p>
    </div>
  );
}

function PracticeScene() {
  return (
    <div className={`${styles.motionScene} ${styles.practiceScene}`} aria-hidden="true">
      <span className={styles.sceneIndex}>03</span>
      <div className={styles.practiceFlow}>
        <div>
          <small>ENTENDER</small>
          <strong>Una explicación clara</strong>
          <span>por qué funciona</span>
        </div>
        <i />
        <div>
          <small>USAR</small>
          <strong>Una tarea concreta</strong>
          <span>lectura · escucha · habla · escritura</span>
        </div>
        <i />
        <div>
          <small>AJUSTAR</small>
          <strong>Feedback para el siguiente intento</strong>
          <span>qué mantener · qué cambiar</span>
        </div>
      </div>
      <p className={styles.sceneResult}>Práctica con una razón para existir</p>
    </div>
  );
}

function EvidenceScene() {
  return (
    <div className={`${styles.motionScene} ${styles.evidenceScene}`} aria-hidden="true">
      <span className={styles.sceneIndex}>04</span>
      <div className={styles.scoreTarget}>
        <span>meta</span>
        <strong>7.5</strong>
        <i />
      </div>
      <div className={styles.evidenceSheets}>
        <div><span>IELTS</span><i /><i /><i /></div>
        <div><span>GOETHE</span><i /><i /><i /></div>
        <div><span>CELPE-BRAS</span><i /><i /><i /></div>
      </div>
      <p className={styles.sceneResult}>Progreso que puede demostrarse</p>
    </div>
  );
}

const STORY_SCENES = [
  RecognitionScene,
  ConnectionScene,
  PracticeScene,
  EvidenceScene,
] as const;

export default function HomePage() {
  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
      />

      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroWash} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Academia de idiomas · Bucaramanga y online</p>
            <h1 id="home-title">
              Tu meta no necesita <em>más contenido.</em>
              <span>Necesita una ruta.</span>
            </h1>
            <p className={styles.heroDescription}>
              Clases de idiomas, práctica y preparación de exámenes conectadas
              con lo que ya sabes, lo que todavía te falta y lo que quieres lograr.
            </p>
            <div className={styles.actions}>
              <Link href="/nivel-radar" className={styles.primaryAction}>
                Descubre tu punto de partida <ArrowIcon />
              </Link>
              <Link href="#historia" className={styles.secondaryAction}>
                Mira cómo construimos la ruta
              </Link>
            </div>
            <p className={styles.heroNote}>
              Nivel Radar es orientativo y no sustituye una certificación oficial.
            </p>
          </div>

          <div className={styles.heroPeople} aria-label="Zhanna y José David, cofundadores de WeLearn">
            <div className={styles.heroPersonZhanna}>
              <Image
                src="/images/home/zhanna-hero-v2.png"
                alt="Zhanna, cofundadora y directora académica de Idiomas WeLearn."
                fill
                priority
                sizes="(max-width: 760px) 72vw, 430px"
                className={styles.heroPersonImage}
              />
            </div>
            <div className={styles.heroPersonDavid}>
              <Image
                src="/images/home/david-hero-v2.png"
                alt="José David, cofundador de Idiomas WeLearn."
                fill
                priority
                sizes="(max-width: 760px) 72vw, 460px"
                className={styles.heroPersonImage}
              />
            </div>
            <div className={styles.founderCaption}>
              <span>ZHANNA + JOSÉ DAVID</span>
              <p>Pedagogía y experiencia multilingüe para construir una ruta que tenga sentido.</p>
            </div>
          </div>
        </div>

        <div className={styles.heroThread} aria-hidden="true">
          <span>Tu meta</span>
          <i />
          <small>scroll</small>
        </div>
      </section>

      <section id="historia" className={styles.openingQuestion} aria-labelledby="opening-title">
        <div className={styles.openingInner}>
          <p className={styles.eyebrow}>La historia empieza antes de la primera clase</p>
          <h2 id="opening-title">La gente no busca “un idioma”. Busca que algo cambie.</h2>
          <div className={styles.searchVoices} aria-label="Metas comunes al aprender un idioma">
            <blockquote>“Necesito IELTS 7.5 para estudiar.”</blockquote>
            <blockquote>“Entiendo inglés, pero no logro hablar.”</blockquote>
            <blockquote>“Quiero trabajar en Alemania.”</blockquote>
            <blockquote>“No sé qué nivel tengo ni por dónde seguir.”</blockquote>
          </div>
          <p className={styles.openingAnswer}>
            Por eso no empezamos mostrándote una lista de cursos. Empezamos
            entendiendo la distancia entre <strong>dónde estás</strong> y
            <strong> dónde quieres llegar.</strong>
          </p>
        </div>
      </section>

      <section id="recorrido" className={styles.story} aria-labelledby="story-title">
        <div className={styles.storyIntro}>
          <p className={styles.eyebrow}>El método convertido en una historia</p>
          <h2 id="story-title">Del “no sé qué hacer” a un siguiente paso claro.</h2>
          <p>
            Cada capítulo ocupa una escena completa porque cada decisión importa.
            Aquí vivirán las piezas de movimiento: no como decoración, sino como
            la explicación visual de lo que está ocurriendo.
          </p>
        </div>

        <div className={styles.storyLine} aria-hidden="true"><i /></div>

        <div className={styles.storyChapters}>
          {ROUTE_STEPS.map((item, index) => {
            const Scene = STORY_SCENES[index];
            return (
              <article
                id={`capitulo-${item.step.toLowerCase()}`}
                className={styles.storyChapter}
                key={item.step}
              >
                <div className={styles.storyVisual}>
                  <div className={styles.motionLabel}>
                    <span>Escena {String(index + 1).padStart(2, '0')}</span>
                    <small>Movimiento narrativo</small>
                  </div>
                  <Scene />
                </div>
                <div className={styles.storyCopy}>
                  <span className={styles.chapterNumber}>{String(index + 1).padStart(2, '0')}</span>
                  <p className={styles.chapterVerb}>{item.step}</p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <strong>{item.result}</strong>
                  <Link href={item.href} className={styles.textLink}>
                    {item.linkLabel} <ArrowIcon />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section id="fundadores" className={styles.founderStory} aria-labelledby="founder-story-title">
        <div className={styles.founderStoryCopy}>
          <p className={styles.eyebrow}>Quiénes están detrás de la ruta</p>
          <h2 id="founder-story-title">
            No enseñamos desde la teoría solamente. También conocemos el camino.
          </h2>
          <p>
            WeLearn nace del encuentro entre la pedagogía de Zhanna y los años
            de aprendizaje disciplinado de José David. Dos experiencias
            diferentes con una misma obsesión: que la persona entienda qué está
            construyendo y por qué.
          </p>
        </div>

        <div id="panorama-fundadores" className={styles.founderPanorama}>
          <div className={styles.panoramaZhanna}>
            <Image
              src="/images/home/zhanna-hero-v2.png"
              alt="Zhanna Korzh, cofundadora y directora académica de Idiomas WeLearn."
              fill
              sizes="(max-width: 760px) 100vw, 52vw"
              className={styles.panoramaImage}
            />
          </div>
          <div className={styles.panoramaDavid}>
            <Image
              src="/images/home/david-hero-v2.png"
              alt="José David Duarte Silva, cofundador de Idiomas WeLearn."
              fill
              sizes="(max-width: 760px) 100vw, 52vw"
              className={styles.panoramaImage}
            />
          </div>
          <div className={styles.founderFacts}>
            {FOUNDERS.map((founder, index) => (
              <article key={founder.name}>
                <span>{index === 0 ? 'PEDAGOGÍA' : 'EXPERIENCIA'}</span>
                <h3>{founder.name}</h3>
                <p>{founder.description}</p>
                <small>{founder.languages.join(' · ')}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="plataforma" className={styles.systemSection} aria-labelledby="system-title">
        <div className={styles.systemHeader}>
          <p className={styles.eyebrow}>Lo que ya existe dentro de WeLearn</p>
          <h2 id="system-title">La historia continúa dentro de la plataforma.</h2>
          <p>
            La ruta no termina en una promesa. Se convierte en explicaciones,
            ejercicios, práctica por habilidad, correcciones y simulacros.
          </p>
        </div>
        <div className={styles.systemFlow}>
          {PRODUCT_AREAS.map((area, index) => (
            <article key={area.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div>
                <p>{area.eyebrow}</p>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
              </div>
              <Link href={area.href} aria-label={area.linkLabel}>
                <ArrowIcon />
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section id="resultados" className={styles.evidenceSection} aria-labelledby="evidence-title">
        <div className={styles.evidenceCopy}>
          <p className={styles.eyebrow}>Resultados, no promesas vacías</p>
          <h2 id="evidence-title">El objetivo no es completar lecciones. Es estar listo.</h2>
          <p>
            Los certificados y reportes internacionales de nuestros estudiantes
            serán la evidencia de este capítulo. Se publicarán anonimizados:
            resultado visible, identidad protegida y contexto suficiente para
            entender qué se logró.
          </p>
        </div>
        <div className={styles.evidencePreview} aria-label="Espacio destinado a resultados verificados">
          <div><span>IELTS</span><strong>Resultado verificado</strong><i /></div>
          <div><span>TOEFL</span><strong>Resultado verificado</strong><i /></div>
          <div><span>GOETHE</span><strong>Resultado verificado</strong><i /></div>
          <p>Próximo recurso: certificados anonimizados</p>
        </div>
      </section>

      <section id="rutas" className={styles.routesSection} aria-labelledby="routes-title">
        <div className={styles.routesIntro}>
          <p className={styles.eyebrow}>Ahora sí: elige una puerta de entrada</p>
          <h2 id="routes-title">¿Qué quieres que este idioma haga posible?</h2>
          <p>
            La misma metodología cambia de forma según tu meta. Entra por la
            pregunta que más se parece a la tuya.
          </p>
        </div>
        <div className={styles.routeChoices}>
          {INTENTIONS.map((intent) => (
            <Link href={intent.href} key={intent.code}>
              <span>{intent.code}</span>
              <div>
                <h3>{intent.label}</h3>
                <p>{intent.description}</p>
              </div>
              <ArrowIcon />
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.catalogSection} aria-labelledby="catalog-title">
        <div className={styles.catalogIntro}>
          <p className={styles.eyebrow}>Explora lo disponible</p>
          <h2 id="catalog-title">Idiomas y exámenes que puedes trabajar hoy.</h2>
          <p>
            Cada página explica el nivel de profundidad disponible: clases,
            práctica, tipos de tarea o simulacros.
          </p>
        </div>

        <div className={styles.catalogColumns}>
          <div>
            <h3>Idiomas</h3>
            <div className={styles.languageList}>
              {LANGUAGES.map((language) => (
                <Link href={language.href} key={language.name}>
                  <span>{language.symbol}</span>
                  <strong>{language.name}</strong>
                  <em>{language.type}</em>
                  <ArrowIcon />
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3>Preparación de exámenes</h3>
            <div className={styles.examList}>
              {EXAMS.map((exam) => (
                <Link href={exam.href} key={exam.code}>
                  <span>{exam.code}</span>
                  <strong>{exam.name}</strong>
                  <em>{exam.language}</em>
                  <ArrowIcon />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <p className={styles.catalogDisclaimer}>
          WeLearn es una academia independiente. Los nombres de los exámenes
          identifican la preparación disponible y no implican patrocinio o aval.
        </p>
      </section>

      <section id="preguntas" className={styles.answersSection} aria-labelledby="answers-title">
        <div className={styles.answersIntro}>
          <p className={styles.eyebrow}>Respuestas antes de elegir</p>
          <h2 id="answers-title">Lo esencial, sin letra pequeña.</h2>
        </div>
        <div className={styles.answersList}>
          {ANSWERS.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {item.question}
                <i aria-hidden="true">+</i>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.finalSection} aria-labelledby="final-title">
        <div className={styles.finalThread} aria-hidden="true"><i /></div>
        <p className={styles.eyebrow}>Tu historia empieza aquí</p>
        <h2 id="final-title">No necesitas saber qué curso comprar. Primero necesitas saber dónde estás.</h2>
        <p>
          Haz el Nivel Radar o cuéntanos qué quieres lograr. El siguiente paso
          debe responder a tu meta, no a una lista genérica de contenidos.
        </p>
        <div className={styles.actions}>
          <Link href="/nivel-radar" className={styles.primaryAction}>
            Conoce tu punto de partida <ArrowIcon />
          </Link>
          <a
            href="https://wa.me/573005004253?text=Hola%20WeLearn%2C%20quiero%20contarles%20mi%20meta%20con%20un%20idioma."
            className={styles.secondaryAction}
            data-gtm="click_whatsapp"
          >
            Cuéntanos tu meta
          </a>
        </div>
      </section>
    </div>
  );
}
