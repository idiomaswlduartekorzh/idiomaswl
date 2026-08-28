import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Home.module.css';
import SearchScrollVideo from './SearchScrollVideo';
import HomeResultsArchive from './HomeResultsArchive';
import HomeNarrativeRail from './HomeNarrativeRail';
import {
  ANSWERS,
  EVIDENCE_STEPS,
  EXAMS,
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
    <div className={styles.page} data-home-narrative-root>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
      />
      <HomeNarrativeRail />

      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroWash} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Clases de inglés y otros idiomas · Bucaramanga y online</p>
            <h1 id="home-title">
              Aprende inglés
              <em> y otros idiomas</em>
              {' '}<span>con una ruta creada por políglotas.</span>
            </h1>
            <p className={styles.heroDescription}>
              Clases en Bucaramanga y online, guiadas por dos trayectorias poco comunes:
              Zhanna es lingüista, enseña desde 2011 y habla seis idiomas; José David
              aprendió ocho desde el español.
            </p>
            <div className={styles.heroExpertise} aria-label="Experiencia multilingüe de los fundadores">
              <article>
                <strong>Zhanna Korzh</strong>
                <span>6 idiomas · lingüista · estudios doctorales</span>
              </article>
              <article>
                <strong>José David Duarte</strong>
                <span>8 idiomas · aprendidos desde el español</span>
              </article>
            </div>
            <div className={styles.actions}>
              <Link href="/nivel-radar" className={styles.primaryAction}>
                Conoce tu nivel <ArrowIcon />
              </Link>
              <Link href="#explora-welearn" className={styles.secondaryAction}>
                Explora WeLearn
              </Link>
            </div>
            <p className={styles.heroNote}>
              Nivel Radar es orientativo y no sustituye una certificación oficial.
            </p>
          </div>

          <div className={styles.heroPeople} aria-label="Zhanna y José David, cofundadores de WeLearn">
            <div className={styles.heroConstellation} aria-hidden="true">
              <svg viewBox="0 0 640 640" role="presentation">
                <path className={styles.constellationOrbit} d="M109 332c0-151 95-244 230-244 130 0 216 91 216 218 0 137-99 245-244 245-119 0-202-80-202-219Z" />
                <path className={styles.constellationRoute} d="M84 392C183 202 342 151 575 246M95 457c151-68 298-62 452 38M187 94c95 123 164 283 181 479" />
                <g>
                  <circle cx="111" cy="388" r="8" />
                  <circle cx="188" cy="194" r="6" />
                  <circle cx="332" cy="108" r="9" />
                  <circle cx="494" cy="174" r="6" />
                  <circle cx="560" cy="318" r="8" />
                  <circle cx="493" cy="489" r="7" />
                  <circle cx="303" cy="551" r="9" />
                  <circle cx="152" cy="491" r="6" />
                </g>
                <g className={styles.constellationCodes}>
                  <text x="76" y="373">ES</text>
                  <text x="161" y="176">EN</text>
                  <text x="309" y="82">DE</text>
                  <text x="505" y="160">FR</text>
                  <text x="576" y="323">IT</text>
                  <text x="506" y="518">PT</text>
                  <text x="279" y="590">KO</text>
                  <text x="108" y="523">JA</text>
                </g>
              </svg>
            </div>
            <div className={styles.heroPersonZhanna}>
              <Image
                src="/images/home/zhanna-hero-cutout-hq-v1.webp"
                alt="Zhanna, cofundadora y directora académica de Idiomas WeLearn."
                fill
                loading="eager"
                sizes="(max-width: 760px) 72vw, (max-width: 1100px) 38vw, 540px"
                className={styles.heroPersonImage}
              />
            </div>
            <div className={styles.heroPersonDavid}>
              <Image
                src="/images/home/david-hero-cutout-hq-v1.webp"
                alt="José David, cofundador de Idiomas WeLearn."
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 760px) 76vw, (max-width: 1100px) 42vw, 580px"
                className={styles.heroPersonImage}
              />
            </div>
          </div>
        </div>

        <div className={styles.heroThread} aria-hidden="true">
          <span>Tu meta</span>
          <i data-home-narrative-anchor data-home-narrative-track="center" data-home-narrative-node />
        </div>
      </section>

      <nav id="explora-welearn" className={styles.discoveryDock} aria-label="Explorar idiomas y exámenes de WeLearn">
        <i className={styles.discoveryNarrativeEntry} data-home-narrative-anchor data-home-narrative-track="center" aria-hidden="true" />
        <i className={styles.discoveryNarrativeExit} data-home-narrative-anchor data-home-narrative-track="center" aria-hidden="true" />
        <div className={styles.discoveryInner}>
          <div className={styles.discoveryIntro}>
            <p className={styles.eyebrow}>Todo WeLearn se conecta</p>
            <h2>Ocho idiomas. Nueve rutas de certificación.</h2>
            <p>Entra por lo que quieres aprender o por el resultado que necesitas demostrar.</p>
          </div>

          <section className={styles.discoveryGroup} aria-labelledby="language-directory-title">
            <header>
              <span>8 idiomas</span>
              <h3 id="language-directory-title">Aprender y practicar</h3>
            </header>
            <div className={styles.discoveryLinks}>
              {LANGUAGES.map((language) => (
                <Link href={language.href} key={language.name}>
                  <span><b>{language.name}</b><small>{language.type}</small></span>
                  <ArrowIcon />
                </Link>
              ))}
            </div>
          </section>

          <section className={`${styles.discoveryGroup} ${styles.discoveryExams}`} aria-labelledby="exam-directory-title">
            <header>
              <span>9 familias</span>
              <h3 id="exam-directory-title">Preparar una certificación</h3>
            </header>
            <div className={styles.discoveryLinks}>
              {EXAMS.map((exam) => (
                <Link href={exam.href} key={exam.name}>
                  <span><b>{exam.name}</b><small>{exam.language}</small></span>
                  <ArrowIcon />
                </Link>
              ))}
            </div>
          </section>
          <p className={styles.discoveryDisclaimer}>
            WeLearn es una academia independiente. Los nombres de los exámenes identifican
            la preparación disponible y no implican patrocinio ni aval de sus organizaciones.
          </p>
        </div>
      </nav>

      <section id="historia" className={styles.openingQuestion} aria-labelledby="opening-title">
        <div className={styles.openingThread} aria-hidden="true">
          <i data-home-narrative-anchor data-home-narrative-track="center" />
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
          <p className={styles.eyebrow}>Cada búsqueda empieza con una necesidad real</p>
          <h2 id="opening-title">Buscas clases de inglés, alemán o un examen porque necesitas resolver algo concreto.</h2>

          <div id="search-scroll-sequence" className={styles.searchSequence}>
            <div className={styles.searchStage} aria-hidden="true">
              <div className={styles.searchScreen}>
                <div className={styles.searchQueries}>
                  <p className={styles.searchQueryOne}>preparación IELTS Bucaramanga</p>
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
                <span>01 · CERTIFICARTE</span>
                <blockquote>“Necesito IELTS 7.5 para entrar a la universidad.”</blockquote>
                <p>Necesitas demostrar un nivel bajo condiciones concretas, no acumular ejercicios sueltos.</p>
              </article>
              <article className={styles.searchStepTwo}>
                <span>02 · COMUNICARTE</span>
                <blockquote>“Entiendo inglés, pero necesito hablar con seguridad.”</blockquote>
                <p>No necesitas empezar de cero. Necesitas reconocer qué está frenando tu expresión y trabajarlo.</p>
              </article>
              <article className={styles.searchStepThree}>
                <span>03 · TRABAJAR</span>
                <blockquote>“Necesito alemán para trabajar o vivir allá.”</blockquote>
                <p>El idioma es el puente hacia una situación real: entrevistas, documentos y conversaciones cotidianas.</p>
              </article>
              <article className={styles.searchStepFour}>
                <span>04 · ORIENTARTE</span>
                <blockquote>“No sé qué nivel tengo ni qué estudiar primero.”</blockquote>
                <p>Antes de recomendarte una clase, necesitamos organizar un punto de partida.</p>
              </article>
            </div>
          </div>

          <p className={styles.openingAnswer}>
            WeLearn convierte esa necesidad en una ruta: primero entendemos
            <strong> dónde estás</strong>, luego definimos
            <strong> qué necesitas trabajar para llegar.</strong>
          </p>
          <p className={styles.dataNote}>
            Preparar IELTS, hablar con seguridad, aprender alemán o reconocer tu nivel
            requieren recorridos distintos. La ruta empieza por la meta, no por una lista genérica de cursos.
          </p>
        </div>
      </section>

      <section id="recorrido" className={styles.story} aria-labelledby="story-title">
        <i className={styles.methodNarrativeEntry} data-home-narrative-anchor data-home-narrative-track="media" data-home-narrative-break="true" data-home-narrative-node aria-hidden="true" />
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
          <div className={styles.methodHandoff} />
          <div className={styles.methodFilmGuide}>
            <span>Tu meta</span>
            <i />
            <small>un proceso con dirección</small>
          </div>
        </div>

        <div className={styles.storyIntro}>
          <p className={styles.eyebrow}>De una meta amplia a un siguiente paso concreto</p>
          <h2 id="story-title">Primero sabemos dónde estás. Después trabajamos lo que te acerca a tu meta.</h2>
          <p>
            No asignamos contenido al azar. Organizamos el proceso en cuatro decisiones:
            reconocer el punto de partida, comprender la prioridad, practicar con un
            propósito y corregir antes del siguiente intento.
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
        <i className={styles.proofNarrativeEntry} data-home-narrative-anchor data-home-narrative-track="media" data-home-narrative-break="true" data-home-narrative-node aria-hidden="true" />
        <div className={styles.proofFilm} aria-hidden="true">
          <div className={styles.proofEntryLine} />
          <SearchScrollVideo
            className={styles.proofVideo}
            webmSrc="/media/home/method-to-evidence-scroll-v2.webm"
            mp4Src="/media/home/method-to-evidence-scroll-v2.mp4"
            poster="/media/home/method-to-evidence-poster-v2.jpg"
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
          <p className={styles.eyebrow}>La ruta debe producir evidencia</p>
          <h2 id="proof-story-title">El progreso se demuestra con intentos, feedback y resultados.</h2>
          <p>
            Un ejercicio aislado no demuestra avance. Lo útil es observar una habilidad,
            comparar lo que cambió y acercar la práctica a la situación o al examen real.
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
          El siguiente paso es contrastar la ruta con una prueba real.
        </p>
        <i className={styles.proofNarrativeAnchor} data-home-narrative-anchor data-home-narrative-track="media" data-home-narrative-node data-home-narrative-break="true" aria-hidden="true" />
      </section>

      <section
        id="examenes-disponibles"
        className={styles.examReveal}
        aria-labelledby="exam-reveal-title"
      >
        <i className={styles.examNarrativeEntry} data-home-narrative-anchor data-home-narrative-track="media" data-home-narrative-node aria-hidden="true" />
        <i className={styles.examNarrativeTurn} data-home-narrative-anchor data-home-narrative-track="gutter" data-home-narrative-join="orthogonal" data-home-narrative-node aria-hidden="true" />
        <div className={styles.examRevealInner}>
          <div className={styles.examRevealHeader}>
            <p className={styles.eyebrow}>La ruta se contrasta con una prueba concreta</p>
            <h2 id="exam-reveal-title">La preparación cambia según el examen que necesitas presentar.</h2>
            <p>
              Cada certificación evalúa habilidades, tareas y criterios distintos.
              Elige una familia para conocer la preparación y los simulacros publicados.
            </p>
            <Link href="/examenes" className={styles.textLink}>
              Explorar todo el centro de exámenes <ArrowIcon />
            </Link>
          </div>

          <div className={styles.examNetwork} aria-label="Exámenes disponibles en WeLearn">
            <div className={styles.examNetworkSource} aria-hidden="true">
              <i className={styles.examNarrativeAnchor} />
              <span>Tu meta</span>
              <strong>una prueba concreta</strong>
            </div>
            <div className={styles.examRevealLinks}>
              {EXAMS.map((exam) => (
                <Link href={exam.href} key={exam.code}>
                  <span>{exam.code}</span>
                  <div>
                    <strong>{exam.name}</strong>
                    <small>{exam.language}</small>
                  </div>
                  <ArrowIcon />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <p className={styles.examRevealDisclaimer}>
          WeLearn es una academia independiente. Los nombres de los exámenes identifican
          la preparación disponible y no implican patrocinio ni aval de sus organizaciones.
        </p>
        <i className={styles.examNarrativeExit} data-home-narrative-anchor data-home-narrative-track="gutter" data-home-narrative-node aria-hidden="true" />
      </section>

      <section id="plataforma" className={styles.systemSection} aria-labelledby="system-title">
        <i className={styles.systemNarrativeAnchor} data-home-narrative-anchor data-home-narrative-track="gutter" aria-hidden="true" />
        <i className={styles.systemNarrativeBypass} data-home-narrative-anchor data-home-narrative-track="gutter" data-home-narrative-join="orthogonal" data-home-narrative-node aria-hidden="true" />
        <i className={styles.systemNarrativeExit} data-home-narrative-anchor data-home-narrative-track="gutter" data-home-narrative-node aria-hidden="true" />
        <div className={styles.systemHeader}>
          <p className={styles.eyebrow}>La ruta se convierte en herramientas reales</p>
          <h2 id="system-title">Cursos, práctica y simulacros conectados con lo que necesitas lograr.</h2>
          <p>
            WeLearn reúne explicaciones, ejercicios por habilidad, correcciones y
            preparación de exámenes. El contenido publicado se organiza para que puedas
            entrar por un idioma, una habilidad o una certificación.
          </p>
        </div>
        <div className={styles.systemFacts} aria-label="Inventario publicado de WeLearn">
          <article><strong>8</strong><span>idiomas publicados</span></article>
          <article><strong>465</strong><span>temas de práctica gramatical</span></article>
          <article><strong>168</strong><span>prácticas y simulaciones registradas</span></article>
          <article><strong>10</strong><span>cuadernillos oficiales ICFES</span></article>
        </div>
        <div id="habilidades" className={styles.systemFlow}>
          {PRODUCT_AREAS.map((area, index) => (
            <article key={area.title}>
              <i className={styles.systemFlowNarrativeNode} data-home-narrative-anchor data-home-narrative-track="gutter" data-home-narrative-node aria-hidden="true" />
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

      <HomeResultsArchive />

      <section id="rutas" className={styles.routesSection} aria-labelledby="routes-title">
        <i className={styles.routesNarrativeAnchor} data-home-narrative-anchor data-home-narrative-track="gutter" data-home-narrative-node aria-hidden="true" />
        <div className={styles.routesIntro}>
          <p className={styles.eyebrow}>Elige según tu objetivo</p>
          <h2 id="routes-title">¿Qué necesitas lograr con el idioma?</h2>
          <p>
            La misma metodología cambia de forma según tu meta. Entra por la
            pregunta que más se parece a la tuya.
          </p>
        </div>
        <div className={styles.routeChoices}>
          {INTENTIONS.map((intent, index) => (
            <Link href={intent.href} key={intent.code}>
              {index === 0 ? <i className={styles.routeChoiceNarrativeNode} data-home-narrative-anchor data-home-narrative-track="gutter" data-home-narrative-node aria-hidden="true" /> : null}
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

      <section id="preguntas" className={styles.answersSection} aria-labelledby="answers-title">
        <div className={styles.answersIntro}>
          <p className={styles.eyebrow}>Respuestas antes de elegir</p>
          <h2 id="answers-title">Lo esencial, sin letra pequeña.</h2>
        </div>
        <div className={styles.answersList}>
          {ANSWERS.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary>
                <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
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
        <p className={styles.eyebrow}>Elige el siguiente paso, no una promesa</p>
        <h2 id="final-title">¿Ya sabes qué necesitas? Entra por tu meta. ¿Todavía no? Empieza por tu nivel.</h2>
        <p>
          Puedes reconocer tu punto de partida, elegir un idioma o preparar una
          certificación. Si necesitas orientación humana, cuéntanos tu caso.
        </p>
        <div className={styles.finalChoices}>
          <Link href="/nivel-radar" className={styles.primaryAction}>
            Conocer mi nivel <ArrowIcon />
          </Link>
          <Link href="/clases-de-idiomas" className={styles.secondaryAction}>
            Elegir un idioma <ArrowIcon />
          </Link>
          <Link href="/examenes" className={styles.secondaryAction}>
            Preparar un examen <ArrowIcon />
          </Link>
        </div>
        <a
          href="https://wa.me/573005004253?text=Hola%20WeLearn%2C%20quiero%20contarles%20mi%20meta%20con%20un%20idioma."
          className={styles.finalHelp}
          data-gtm="click_whatsapp"
        >
          ¿No sabes cuál elegir? Cuéntanos tu meta por WhatsApp <ArrowIcon />
        </a>
      </section>
    </div>
  );
}
