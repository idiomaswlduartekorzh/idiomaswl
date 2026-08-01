import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Home.module.css';
import SearchScrollVideo from './SearchScrollVideo';
import {
  ANSWERS,
  EVIDENCE_STEPS,
  EXAMS,
  FOUNDERS,
  HOME_META,
  INTENTIONS,
  LANGUAGES,
  ORGANIZATION_SCHEMA,
  PRODUCT_AREAS,
  ROUTE_STEPS,
} from './home-content';

export const homeMetadata: Metadata = {
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
              Clases de idiomas
              <em> con una ruta</em>
              {' '}<span>para tu meta.</span>
            </h1>
            <p className={styles.heroDescription}>
              Aprende inglés y otros idiomas presencialmente en Bucaramanga u online,
              con diagnóstico, práctica y preparación de exámenes conectados con lo
              que ya sabes y lo que quieres lograr.
            </p>
            <div className={styles.heroExpertise} aria-label="Experiencia multilingüe de los fundadores">
              <article>
                <strong>Lingüista</strong>
                <span>Zhanna · cinco idiomas y estudios de doctorado</span>
              </article>
              <article>
                <strong>8 idiomas</strong>
                <span>José David · el método vivido desde el español</span>
              </article>
            </div>
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
                src="/images/home/zhanna-hero-cutout-v3.png"
                alt="Zhanna, cofundadora y directora académica de Idiomas WeLearn."
                fill
                priority
                sizes="(max-width: 760px) 72vw, 430px"
                className={styles.heroPersonImage}
              />
            </div>
            <div className={styles.heroPersonDavid}>
              <Image
                src="/images/home/david-hero-cutout-v4.png"
                alt="José David, cofundador de Idiomas WeLearn."
                fill
                priority
                sizes="(max-width: 760px) 72vw, 460px"
                className={styles.heroPersonImage}
              />
            </div>
            <div className={styles.founderCaption}>
              <span>ZHANNA + JOSÉ DAVID</span>
              <p>Formación pedagógica y experiencia multilingüe, sin fórmulas genéricas.</p>
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
        <div className={styles.openingThread} aria-hidden="true">
          <i />
          <span />
        </div>

        <div className={styles.searchFilm} aria-hidden="true">
          <SearchScrollVideo
            className={styles.searchVideo}
            webmSrc="/media/home/search-to-goal-scroll-v3.webm"
            mp4Src="/media/home/search-to-goal-scroll-v3.mp4"
            poster="/media/home/search-to-goal-poster-v2.jpg"
            scrollRootId="historia"
            sequenceId="search-scroll-sequence"
          />
          <div className={styles.searchFilmWash} />
        </div>

        <div className={styles.openingInner}>
          <p className={styles.eyebrow}>La historia empieza antes de la primera clase</p>
          <h2 id="opening-title">La gente no busca “un idioma”. Busca que algo cambie.</h2>

          <div id="search-scroll-sequence" className={styles.searchSequence}>
            <div className={styles.searchStage} aria-hidden="true">
              <div className={styles.searchScreen}>
                <div className={styles.searchQueries}>
                  <p className={styles.searchQueryOne}>vocabulario inglés ICFES</p>
                  <p className={styles.searchQueryTwo}>profesor de inglés</p>
                  <p className={styles.searchQueryThree}>clases de alemán</p>
                  <p className={styles.searchQueryFour}>qué nivel de inglés tengo</p>
                </div>
                <div className={styles.searchMeaning}>
                  <span>Lo que realmente buscas</span>
                  <strong>UNA META</strong>
                </div>
              </div>
              <p className={styles.searchStageLabel}>La historia avanza contigo</p>
            </div>

            <div className={styles.searchSteps} aria-label="Metas comunes al aprender un idioma">
              <article className={styles.searchStepOne}>
                <span>01 · ESTUDIAR</span>
                <blockquote>“Necesito IELTS 7.5 para entrar a la universidad.”</blockquote>
                <p>No buscas ejercicios sueltos. Buscas demostrar un nivel bajo condiciones concretas.</p>
              </article>
              <article className={styles.searchStepTwo}>
                <span>02 · COMUNICARTE</span>
                <blockquote>“Entiendo inglés, pero cuando hablo me bloqueo.”</blockquote>
                <p>No necesitas empezar de cero. Necesitas reconocer qué está frenando tu expresión.</p>
              </article>
              <article className={styles.searchStepThree}>
                <span>03 · TRABAJAR</span>
                <blockquote>“Quiero aprender alemán para trabajar allá.”</blockquote>
                <p>El idioma es el puente hacia una situación real, no el destino final.</p>
              </article>
              <article className={styles.searchStepFour}>
                <span>04 · ORIENTARTE</span>
                <blockquote>“No sé qué nivel tengo ni por dónde seguir.”</blockquote>
                <p>Antes de recomendar una clase, hace falta construir un punto de partida.</p>
              </article>
            </div>
          </div>

          <p className={styles.openingAnswer}>
            Por eso no empezamos mostrándote una lista de cursos. Empezamos
            entendiendo la distancia entre <strong>dónde estás</strong> y
            <strong> dónde quieres llegar.</strong>
          </p>
          <p className={styles.dataNote}>
            Cuatro búsquedas distintas. Una misma pregunta: ¿cómo convierto lo que sé hoy
            en lo que necesito lograr?
          </p>
        </div>
      </section>

      <section id="recorrido" className={styles.story} aria-labelledby="story-title">
        <div className={styles.methodFilm} aria-hidden="true">
          <SearchScrollVideo
            className={styles.methodVideo}
            webmSrc="/media/home/goal-to-method-scroll-v1.webm"
            mp4Src="/media/home/goal-to-method-scroll-v1.mp4"
            poster="/media/home/goal-to-method-poster-v1.jpg"
            scrollRootId="method-scroll-track"
            sequenceId="recorrido"
            stepProfile="method"
          />
          <div className={styles.methodFilmWash} />
          <div className={styles.methodHandoff}><i /></div>
          <div className={styles.methodFilmGuide}>
            <span>Tu meta</span>
            <i />
            <small>un proceso con dirección</small>
          </div>
        </div>

        <div className={styles.storyIntro}>
          <p className={styles.eyebrow}>La meta ya está visible. Ahora construimos la ruta.</p>
          <h2 id="story-title">Un idioma avanza cuando cada práctica responde a una razón.</h2>
          <p>
            La misma señal que reunió tus búsquedas se convierte en un proceso:
            reconocer, comprender, practicar y corregir. La animación muestra la
            transformación; estas palabras explican cada decisión.
          </p>
        </div>

        <div className={styles.storyLine} aria-hidden="true"><i /></div>

        <div id="method-scroll-track" className={styles.storyChapters}>
          {ROUTE_STEPS.map((item, index) => (
            <article
              id={`capitulo-${item.step.toLowerCase()}`}
              className={styles.storyChapter}
              key={item.step}
            >
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
          ))}
        </div>
      </section>

      <section
        id="evidencia-en-movimiento"
        className={styles.proofStory}
        aria-labelledby="proof-story-title"
      >
        <div className={styles.proofFilm} aria-hidden="true">
          <SearchScrollVideo
            className={styles.proofVideo}
            webmSrc="/media/home/method-to-evidence-scroll-v1.webm"
            mp4Src="/media/home/method-to-evidence-scroll-v1.mp4"
            poster="/media/home/method-to-evidence-poster-v1.jpg"
            scrollRootId="proof-scroll-track"
            sequenceId="evidencia-en-movimiento"
            stepProfile="evidence"
          />
          <div className={styles.proofFilmWash} />
          <div className={styles.proofExitLine} />
          <div className={styles.proofFilmGuide}>
            <span>La ruta</span>
            <i />
            <small>deja evidencia</small>
          </div>
        </div>

        <div className={styles.proofIntro}>
          <p className={styles.eyebrow}>Después de corregir, debe quedar una señal</p>
          <h2 id="proof-story-title">La práctica importa cuando permite ver qué cambió.</h2>
          <p>
            Los ejercicios no son el resultado final. Sirven para observar una
            habilidad, comparar intentos y decidir qué necesita el siguiente paso.
          </p>
        </div>

        <div id="proof-scroll-track" className={styles.proofChapters}>
          {EVIDENCE_STEPS.map((item, index) => (
            <article className={styles.proofChapter} key={item.step}>
              <div className={styles.proofCopy}>
                <span className={styles.proofNumber}>{String(index + 1).padStart(2, '0')}</span>
                <p className={styles.proofVerb}>{item.step}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <strong>{item.result}</strong>
                <Link href={item.href} className={styles.proofLink}>
                  {item.linkLabel} <ArrowIcon />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className={styles.proofDisclaimer}>
          Esta secuencia representa el proceso. Los resultados reales se mostrarán
          con contexto suficiente e identidad protegida.
        </p>
      </section>

      <section id="fundadores" className={styles.founderStory} aria-labelledby="founder-story-title">
        <div className={styles.founderStoryCopy}>
          <p className={styles.eyebrow}>Quiénes están detrás de la ruta</p>
          <h2 id="founder-story-title">
            No enseñamos desde la teoría solamente. También conocemos el camino.
          </h2>
          <p>
            WeLearn nace del encuentro entre la formación lingüística de Zhanna y los años
            de aprendizaje disciplinado de José David. Dos experiencias
            diferentes con una misma obsesión: que la persona entienda qué está
            construyendo y por qué.
          </p>
          <Link href="/quienes-somos" className={styles.textLink}>
            Conoce nuestra formación y trayectoria <ArrowIcon />
          </Link>
        </div>

        <div id="panorama-fundadores" className={styles.founderPanorama}>
          <div className={styles.panoramaZhanna}>
            <Image
              src="/images/home/zhanna-hero-cutout-v3.png"
              alt="Zhanna Korzh, cofundadora y directora académica de Idiomas WeLearn."
              fill
              sizes="(max-width: 760px) 100vw, 52vw"
              className={styles.panoramaImage}
            />
          </div>
          <div className={styles.panoramaDavid}>
            <Image
              src="/images/home/david-hero-cutout-v4.png"
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
            Estos recortes pertenecen a reportes oficiales de estudiantes de WeLearn.
            Publicamos únicamente la zona del puntaje: sin nombres, documentos ni números
            de candidato. Son resultados históricos verificables, no una promesa de nota.
          </p>
        </div>
        <div className={styles.resultGrid} aria-label="Resultados oficiales anonimizados de estudiantes">
          <figure className={styles.resultCard}>
            <div className={styles.resultImage}>
              <Image src="/images/resultados/puntaje/ielts-80.webp" alt="Recorte anonimizado de reporte IELTS con band score 8.0" fill sizes="(max-width: 760px) 86vw, 300px" />
            </div>
            <figcaption><strong>IELTS 8.0</strong><span>Reporte oficial · identidad protegida</span></figcaption>
          </figure>
          <figure className={styles.resultCard}>
            <div className={styles.resultImage}>
              <Image src="/images/resultados/puntaje/ielts-75.webp" alt="Recorte anonimizado de reporte IELTS con band score 7.5" fill sizes="(max-width: 760px) 86vw, 300px" />
            </div>
            <figcaption><strong>IELTS 7.5</strong><span>Reporte oficial · identidad protegida</span></figcaption>
          </figure>
          <figure className={styles.resultCard}>
            <div className={styles.resultImage}>
              <Image src="/images/resultados/puntaje/toefl-95.webp" alt="Recorte anonimizado de reporte TOEFL iBT con puntaje total 95" fill sizes="(max-width: 760px) 86vw, 300px" />
            </div>
            <figcaption><strong>TOEFL iBT 95</strong><span>Reporte oficial · identidad protegida</span></figcaption>
          </figure>
          <figure className={styles.resultCard}>
            <div className={styles.resultImage}>
              <Image src="/images/resultados/puntaje/german-toefl-92.webp" alt="Recorte anonimizado de reporte TOEFL iBT con puntaje total 92" fill sizes="(max-width: 760px) 86vw, 300px" />
            </div>
            <figcaption><strong>TOEFL iBT 92</strong><span>Reporte oficial · identidad protegida</span></figcaption>
          </figure>
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
