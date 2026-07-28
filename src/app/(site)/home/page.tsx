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
  SKILLS,
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
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3 10h13M11.5 4.5 17 10l-5.5 5.5" />
    </svg>
  );
}

function RouteIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    lesson: (
      <>
        <path d="M5 5.5h14M5 10h10M5 14.5h12" />
        <circle cx="21" cy="10" r="3" />
      </>
    ),
    practice: (
      <>
        <path d="M6 4v16M10 8h10M10 12h7M10 16h9" />
        <path d="m18 5 2 2 4-4" />
      </>
    ),
    feedback: (
      <>
        <path d="M4 5h20v14H11l-5 4v-4H4Z" />
        <path d="m10 12 3 3 6-7" />
      </>
    ),
    exam: (
      <>
        <rect x="6" y="4" width="16" height="20" rx="2" />
        <path d="M10 9h8M10 13h8M10 17h5" />
        <path d="m17 20 2 2 4-5" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 28 28" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function ProductVisual({ type }: { type: string }) {
  if (type === 'lesson') {
    return (
      <div className={styles.lessonMock} aria-hidden="true">
        <div className={styles.mockTop}>
          <span>Deutsch · A1</span>
          <span>Lección 04</span>
        </div>
        <strong>Ich möchte einen Kaffee.</strong>
        <p>Quiero un café.</p>
        <div className={styles.soundBars}>
          {[7, 15, 22, 11, 27, 18, 8, 24, 14, 20, 10, 16].map((height, index) => (
            <i key={index} style={{ height }} />
          ))}
        </div>
      </div>
    );
  }

  if (type === 'practice') {
    return (
      <div className={styles.practiceMock} aria-hidden="true">
        <span className={styles.mockKicker}>Comprensión lectora</span>
        <strong>¿Qué quiere conseguir la autora?</strong>
        <div><i /> Explicar una decisión</div>
        <div><i /> Comparar dos opciones</div>
        <div><i /> Pedir más información</div>
      </div>
    );
  }

  if (type === 'feedback') {
    return (
      <div className={styles.feedbackMock} aria-hidden="true">
        <div className={styles.feedbackLine}>
          <span>Tu tesis</span>
          <b>Clara</b>
        </div>
        <p>
          The benefits <del>is</del> <ins>are</ins> greater when...
        </p>
        <div className={styles.feedbackNote}>
          <span>Por qué</span>
          El sujeto es plural; el verbo debe concordar.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.examMock} aria-hidden="true">
      <div className={styles.mockTop}>
        <span>IELTS · Listening</span>
        <span>Parte 1</span>
      </div>
      <div className={styles.examWave}>
        {[10, 21, 14, 31, 25, 12, 34, 18, 27, 9, 23, 30, 15, 20, 11, 26].map((height, index) => (
          <i key={index} style={{ height }} />
        ))}
      </div>
      <div className={styles.examProgress}><i /></div>
      <span className={styles.mockKicker}>Pregunta 3 de 10</span>
    </div>
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
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Academia de idiomas · Bucaramanga y online</p>
            <h1 id="home-title" className={styles.heroTitle}>
              Aprende el idioma que <span>tu meta</span> necesita.
            </h1>
            <p className={styles.heroDescription}>
              WeLearn reconoce tu punto de partida y conecta clases, práctica,
              simulacros y retroalimentación con la meta que quieres alcanzar.
            </p>
            <div className={styles.heroActions}>
              <Link href="/nivel-radar" className={styles.primaryButton} data-gtm="click_nivel_radar">
                Conoce tu nivel <ArrowIcon />
              </Link>
              <Link href="#entrada" className={styles.secondaryButton}>
                Explora idiomas y exámenes
              </Link>
            </div>
            <p className={styles.microcopy}>
              Sin registro · entre 4 y 40 ítems · resultado orientativo
            </p>
          </div>

          <div className={styles.heroPortraits}>
            <div className={styles.heroOrbit} aria-hidden="true">
              <span>goal</span>
              <span>목표</span>
              <span>meta</span>
              <span>Ziel</span>
            </div>
            <div className={`${styles.portraitFrame} ${styles.portraitZhanna}`}>
              <Image
                src="/images/team-zhanna-korzh.png"
                alt="Zhanna, cofundadora de Idiomas WeLearn."
                fill
                priority
                sizes="(max-width: 760px) 47vw, 310px"
                className={styles.portraitImage}
              />
              <span className={styles.nameTag}>Zhanna · pedagogía</span>
            </div>
            <div className={`${styles.portraitFrame} ${styles.portraitDavid}`}>
              <Image
                src="/images/david-duarte.jpg"
                alt="José David, cofundador de Idiomas WeLearn."
                fill
                priority
                sizes="(max-width: 760px) 51vw, 330px"
                className={styles.portraitImage}
              />
              <span className={styles.nameTag}>José David · experiencia</span>
            </div>
            <svg className={styles.heroConnection} viewBox="0 0 560 430" aria-hidden="true">
              <path d="M18 370C112 322 118 191 220 205c88 12 75 115 158 104 70-10 83-95 164-108" />
              <circle cx="18" cy="370" r="5" />
              <circle cx="542" cy="201" r="5" />
            </svg>
          </div>
        </div>

        <div className={styles.heroIntro}>
          <span className={styles.heroIntroLabel}>Tus guías</span>
          <p>
            Somos Zhanna y José David. Creamos WeLearn para que aprender un
            idioma deje de sentirse como una colección de ejercicios y empiece
            a tener dirección.
          </p>
        </div>
      </section>

      <section id="entrada" className={styles.intentSection} aria-labelledby="intent-title">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Empieza por tu intención</p>
          <h2 id="intent-title">¿Qué quieres que este idioma haga posible?</h2>
          <p>
            Elige la meta que más se parece a la tuya. Te llevaremos a una ruta
            que puede responderla.
          </p>
        </div>
        <div className={styles.intentGrid}>
          {INTENTIONS.map((intent) => (
            <Link href={intent.href} className={styles.intentCard} key={intent.code}>
              <span className={styles.intentCode}>{intent.code}</span>
              <strong>{intent.label}</strong>
              <p>{intent.description}</p>
              <span className={styles.textLink}>Ver mi ruta <ArrowIcon /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.problemSection} aria-labelledby="problem-title">
        <div className={styles.problemWords} aria-hidden="true">
          <span>palabras</span>
          <span>ejercicios</span>
          <span>reglas</span>
          <span>audios</span>
          <span>listas</span>
        </div>
        <div className={styles.problemCopy}>
          <p className={styles.eyebrow}>Cuando estudiar no basta</p>
          <h2 id="problem-title">Puedes estudiar mucho y seguir sin saber qué corregir.</h2>
          <p>
            El problema no siempre es la disciplina. A veces no sabes cuál es
            tu nivel real, qué habilidad está frenando tu avance o si lo que
            practicas te acerca a tu examen, trabajo, viaje o estudio.
          </p>
          <ul>
            <li>No sé realmente dónde estoy.</li>
            <li>No sé qué habilidad necesita más trabajo.</li>
            <li>Practico, pero no tengo una ruta.</li>
            <li>No sé si ya estoy listo para mi meta.</li>
          </ul>
          <blockquote>
            Antes de prometerte un resultado, necesitamos reconocer el punto de partida.
          </blockquote>
        </div>
      </section>

      <section id="reconocimiento" className={styles.routeSection} aria-labelledby="route-title">
        <div className={styles.routeHeader}>
          <p className={styles.eyebrow}>Del punto de partida al siguiente paso</p>
          <h2 id="route-title">
            Aprender no es acumular palabras. <span>Es construir conexiones.</span>
          </h2>
          <p>
            La ruta convierte una duda amplia en decisiones concretas. Todo el
            contenido permanece visible y navegable; el movimiento solo ayuda a
            entender la secuencia.
          </p>
        </div>

        <div className={styles.routeTimeline}>
          <div className={styles.routeRail} aria-hidden="true"><i /></div>
          {ROUTE_STEPS.map((item, index) => (
            <article className={styles.routeStep} key={item.step}>
              <div className={styles.routeVisual} aria-hidden="true">
                <span className={styles.routeNumber}>{String(index + 1).padStart(2, '0')}</span>
                <div className={styles.fragmentCloud}>
                  {item.fragments.map((fragment) => <i key={fragment}>{fragment}</i>)}
                </div>
                <svg viewBox="0 0 320 190">
                  <path d="M56 55C115 55 112 96 162 96s49-48 104-48" />
                  <path d="M57 137c52 0 55-41 105-41s50 46 104 46" />
                  <circle cx="162" cy="96" r="9" />
                </svg>
                <strong>{item.result}</strong>
              </div>
              <div className={styles.routeCopy}>
                <p className={styles.routeLabel}>{item.step}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <Link href={item.href} className={styles.textLink}>
                  {item.linkLabel} <ArrowIcon />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className={styles.disclaimer}>
          Nivel Radar entrega un resultado orientativo. La escritura y la
          expresión oral requieren evaluación humana; no es una certificación oficial.
        </p>
      </section>

      <section id="habilidades" className={styles.skillsSection} aria-labelledby="skills-title">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Un mapa vivo</p>
          <h2 id="skills-title">Un idioma no es una sola habilidad.</h2>
          <p>
            Comprender, construir, expresarte, interactuar y corregir forman
            combinaciones distintas según lo que quieras lograr.
          </p>
        </div>
        <div className={styles.skillMap}>
          <div className={styles.skillCenter} aria-hidden="true">
            <span>Tu meta</span>
          </div>
          {SKILLS.map((skill, index) => (
            <article className={styles.skillNode} key={skill.name} style={{ '--skill-index': index } as React.CSSProperties}>
              <span>{skill.marker}</span>
              <div>
                <h3>{skill.name}</h3>
                <p>{skill.detail}</p>
              </div>
            </article>
          ))}
          <svg viewBox="0 0 900 430" aria-hidden="true">
            <path d="M450 215 170 75M450 215 690 75M450 215 785 260M450 215 580 380M450 215 240 360" />
          </svg>
        </div>
      </section>

      <section id="producto" className={styles.productSection} aria-labelledby="product-title">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Producto que puedes abrir hoy</p>
          <h2 id="product-title">La ruta se vuelve práctica concreta.</h2>
          <p>
            No necesitas imaginar cómo funciona. Estos accesos llevan a
            herramientas que ya existen en WeLearn.
          </p>
        </div>
        <div className={styles.productGrid}>
          {PRODUCT_AREAS.map((area) => (
            <article className={styles.productCard} key={area.eyebrow}>
              <div className={styles.productVisual}>
                <span className={styles.productIcon}><RouteIcon name={area.visual} /></span>
                <ProductVisual type={area.visual} />
              </div>
              <div className={styles.productCopy}>
                <p className={styles.eyebrow}>{area.eyebrow}</p>
                <h3>{area.title}</h3>
                <p>{area.description}</p>
                <Link href={area.href} className={styles.textLink}>
                  {area.linkLabel} <ArrowIcon />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="idiomas" className={styles.languagesSection} aria-labelledby="languages-title">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Idiomas disponibles</p>
          <h2 id="languages-title">Encuentra clases y práctica para tu idioma.</h2>
          <p>
            La profundidad cambia según el idioma y el nivel. Cada página
            muestra exactamente qué puedes hacer hoy.
          </p>
        </div>
        <div className={styles.languageGrid}>
          {LANGUAGES.map((language) => (
            <Link href={language.href} className={styles.languageCard} key={language.name}>
              <span className={styles.languageSymbol}>{language.symbol}</span>
              <span className={styles.languageType}>{language.type}</span>
              <strong>{language.name}</strong>
              <em lang={language.name === 'Coreano' ? 'ko' : undefined}>{language.native}</em>
              <span className={styles.textLink}>{language.label} <ArrowIcon /></span>
            </Link>
          ))}
        </div>
      </section>

      <section id="examenes" className={styles.examsSection} aria-labelledby="exams-title">
        <div className={styles.examsIntro}>
          <p className={styles.eyebrow}>Preparación de exámenes</p>
          <h2 id="exams-title">Entrena el examen sin perder de vista el idioma.</h2>
          <p>
            Explora simulacros de práctica, tipos de tarea y materiales para
            reconocer tus brechas y entrenar las habilidades que exige cada examen.
          </p>
          <Link href="/examenes" className={styles.lightButton}>
            Ver todo el catálogo <ArrowIcon />
          </Link>
        </div>
        <div className={styles.examList}>
          {EXAMS.map((exam) => (
            <Link href={exam.href} className={styles.examRow} key={exam.code}>
              <span>{exam.code}</span>
              <strong>{exam.name}</strong>
              <em>{exam.language}</em>
              <ArrowIcon />
            </Link>
          ))}
        </div>
        <p className={styles.examDisclaimer}>
          WeLearn es una academia independiente. Los nombres de los exámenes
          identifican la preparación disponible y no implican patrocinio o aval.
        </p>
      </section>

      <section id="equipo" className={styles.foundersSection} aria-labelledby="founders-title">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Quién construye la ruta contigo</p>
          <h2 id="founders-title">Dos formas de conocer el camino: estudiarlo y recorrerlo.</h2>
          <p>
            WeLearn reúne la mirada pedagógica de Zhanna y la experiencia de
            aprendizaje disciplinado de José David. Esa combinación define
            cómo se reconoce una brecha, cómo se practica y cuándo hace falta una persona.
          </p>
        </div>
        <div className={styles.foundersGrid}>
          {FOUNDERS.map((founder, index) => (
            <article className={styles.founderCard} key={founder.name}>
              <div className={styles.founderImage}>
                <Image
                  src={founder.image}
                  alt={founder.alt}
                  fill
                  sizes="(max-width: 760px) 100vw, 50vw"
                  className={styles.portraitImage}
                />
                <span>{index === 0 ? 'Pedagogía' : 'Disciplina'}</span>
              </div>
              <div className={styles.founderCopy}>
                <p className={styles.eyebrow}>{founder.lead}</p>
                <h3>{founder.name}</h3>
                <span className={styles.founderRole}>{founder.role}</span>
                <p>{founder.description}</p>
                <ul aria-label={`Idiomas de ${founder.name}`}>
                  {founder.languages.map((language) => <li key={language}>{language}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.startSection} aria-labelledby="start-title">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Modalidad y precio</p>
          <h2 id="start-title">Elige cómo empezar, con información clara.</h2>
        </div>
        <div className={styles.startGrid}>
          <article>
            <span className={styles.startMark}>BUC</span>
            <h3>Presencial en Bucaramanga</h3>
            <p>Conoce la ubicación, el formato y lo que incluye la opción presencial publicada.</p>
            <Link href="/clases-de-ingles-bucaramanga" className={styles.textLink}>
              Ver clases en Bucaramanga <ArrowIcon />
            </Link>
          </article>
          <article>
            <span className={styles.startMark}>ON</span>
            <h3>Online desde donde estés</h3>
            <p>Revisa cómo funcionan las sesiones y qué necesitas para comenzar.</p>
            <Link href="/clases-de-idiomas" className={styles.textLink}>
              Explorar clases online <ArrowIcon />
            </Link>
          </article>
          <article>
            <span className={styles.startMark}>$</span>
            <h3>Planes y precios</h3>
            <p>Consulta las opciones vigentes y qué incluye cada una.</p>
            <Link href="/precios" className={styles.textLink}>
              Ver planes y precios <ArrowIcon />
            </Link>
          </article>
        </div>
      </section>

      <section className={styles.answersSection} aria-labelledby="answers-title">
        <div className={styles.answersIntro}>
          <p className={styles.eyebrow}>Respuestas para decidir</p>
          <h2 id="answers-title">Respuestas claras antes de elegir.</h2>
          <p>
            Lo esencial sobre niveles, idiomas, exámenes, práctica, correcciones y modalidades.
          </p>
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
        <div className={styles.finalLines} aria-hidden="true">
          <i /><i /><i /><i />
        </div>
        <p className={styles.eyebrow}>Tu primer paso</p>
        <h2 id="final-title">Empieza por saber dónde estás.</h2>
        <p>
          Haz el Nivel Radar si quieres reconocer tu punto de partida, o
          cuéntanos tu meta si necesitas orientación humana.
        </p>
        <div className={styles.heroActions}>
          <Link href="/nivel-radar" className={styles.primaryButton}>
            Conoce tu nivel <ArrowIcon />
          </Link>
          <a
            href="https://wa.me/573005004253?text=Hola%20WeLearn%2C%20quiero%20contarles%20mi%20meta%20con%20un%20idioma."
            className={styles.secondaryButton}
            data-gtm="click_whatsapp"
          >
            Habla con una persona
          </a>
        </div>
        <small>
          El resultado del Radar es orientativo y no constituye una certificación oficial.
        </small>
      </section>
    </div>
  );
}
