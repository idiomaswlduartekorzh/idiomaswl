import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { localBusinessNode, davidNode, zhannaNode, SEDE, HAS_MAP } from '@/components/hub/localBusiness';
import s from './page.module.css';

const WA = '573005004253';
const WA_GENERAL = encodeURIComponent('Hola, vi la página de Quiénes somos en WeLearn y quiero agendar mi diagnóstico gratis.');

export const metadata: Metadata = {
  title: 'Quiénes somos — Academia de idiomas en Bucaramanga | Idiomas WeLearn',
  description:
    'Idiomas WeLearn es una academia con sede presencial en Bucaramanga y clases online en toda Colombia. Fundada por José David Duarte, políglota en ocho idiomas, y Zhanna Korzh, directora académica. Más de 1000 estudiantes preparados.',
  keywords: [
    'academia de idiomas Bucaramanga',
    'Idiomas WeLearn',
    'quiénes somos WeLearn',
    'José David Duarte Silva políglota',
    'Zhanna Korzh',
    'escuela de idiomas Sotomayor Bucaramanga',
    'academia de idiomas Santander',
  ],
  openGraph: {
    title: 'Quiénes somos — Idiomas WeLearn, academia en Bucaramanga',
    description:
      'Una academia con sede real en Bucaramanga, fundada por un políglota en ocho idiomas y una directora académica formada en Europa. Más de 1000 estudiantes.',
    url: 'https://www.idiomaswl.com/quienes-somos',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/quienes-somos' },
};

const DAVID_BIO =
  'Aprendió sus ocho idiomas en este orden: inglés, italiano, portugués, francés, ruso, alemán, japonés y coreano. Ese recorrido —hecho desde el español, siendo adulto y sin vivir en cada país— es exactamente lo que se convirtió en el método de WeLearn. Sabe dónde se atasca un hispanohablante porque se atascó ahí primero.';

const ZHANNA_BIO =
  'Estudió en Francia y en Inglaterra, y es rusoparlante. Dirige el diseño curricular de la academia y la preparación de exámenes internacionales: define qué se enseña en cada nivel, en qué orden y cómo se evalúa, para que el avance de un estudiante sea medible y no una sensación.';

const TEAM = [
  {
    img: '/images/david-duarte.jpg',
    alt: 'José David Duarte Silva, políglota y co-fundador de Idiomas WeLearn',
    name: 'José David Duarte Silva',
    role: 'Co-fundador · Políglota en 8 idiomas',
    bio: DAVID_BIO,
    tags: ['Políglota · 8 idiomas', 'Método WeLearn', 'Preparación de exámenes'],
  },
  {
    img: '/images/team-zhanna-korzh.png',
    alt: 'Zhanna Korzh, co-fundadora y directora académica de Idiomas WeLearn',
    name: 'Zhanna Korzh',
    role: 'Co-fundadora · Directora académica',
    bio: ZHANNA_BIO,
    tags: ['Formada en Francia e Inglaterra', 'Rusoparlante', 'Diseño curricular'],
  },
];

const TESTIMONIALS = [
  {
    name: 'Daniel Zuluaga',
    city: 'Bogotá',
    exam: 'Celpe-Bras · Portugués — Maestría en la USP',
    quote: 'Hola David, fui aceptado en la facultad de odontología de Ribeirão Preto - USP y voy a comenzar la maestría el próximo mes. Muchas gracias por hacer parte del proceso, eternamente agradecido.',
  },
  {
    name: 'Carlos Torres',
    city: 'Bucaramanga',
    exam: 'TOEFL · Inglés — Maestría',
    quote: 'Realmente les agradezco a ustedes dos por toda la ayuda, el master dura 2 años pero mi profesor quiere que haga otro curso cuando me gradúe.',
  },
  {
    name: 'Karen Ayala',
    city: 'Bucaramanga',
    exam: 'Goethe — Alemán',
    quote: 'David te he recomendado como con 15 personas sin decir mentiras, espero que les salga todo suuuper biennn.',
  },
  {
    name: 'Leonardo Pinto',
    city: 'Bucaramanga',
    exam: 'Inglés · Work & Travel USA',
    quote: 'Estudié inglés en WeLearn para prepararme e ir a trabajar en USA durante el verano y me fue de maravilla. Volveré para presentar el examen TOEFL.',
  },
];

const PRINCIPIOS = [
  {
    tag: 'Personas',
    title: 'Profesores reales, no una app',
    desc: 'Cada estudiante tiene un tutor asignado que lo conoce, corrige lo que escribe y lo escucha hablar. No hay lecciones automatizadas ni rachas que premien abrir la aplicación sin aprender nada.',
  },
  {
    tag: 'Método',
    title: 'Un camino, no clases sueltas',
    desc: 'Antes de la primera clase hacemos un diagnóstico para saber tu nivel real y tu objetivo. De ahí sale un plan con etapas concretas, para que en cada momento sepas dónde estás y cuánto falta.',
  },
  {
    tag: 'Honestidad',
    title: 'Te decimos cuánto va a costar de verdad',
    desc: 'No prometemos fluidez en tres meses. Si tu objetivo toma dos años, lo decimos en el diagnóstico. Preferimos perder una matrícula a que alguien empiece con una expectativa que no se puede cumplir.',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    localBusinessNode(
      'Academia de idiomas con sede presencial en Bucaramanga y clases online para toda Colombia y el mundo. Enseña ocho idiomas y prepara exámenes internacionales, con más de 1000 estudiantes.'
    ),
    davidNode(
      'Co-fundador de Idiomas WeLearn y políglota activo en ocho idiomas: inglés, italiano, portugués, francés, ruso, alemán, japonés y coreano. Diseñó el método con el que la academia enseña a hispanohablantes adultos.'
    ),
    zhannaNode(
      'Co-fundadora y directora académica de Idiomas WeLearn. Estudió en Francia y en Inglaterra, es rusoparlante y lidera el diseño curricular y la preparación de exámenes internacionales de la academia.',
      ['ru', 'es', 'en', 'fr']
    ),
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.idiomaswl.com' },
        { '@type': 'ListItem', position: 2, name: 'Quiénes somos', item: 'https://www.idiomaswl.com/quienes-somos' },
      ],
    },
  ],
};

const WaIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.852L.057 23.273c-.083.311.202.596.513.513l5.421-1.471A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.497-5.197-1.367l-.373-.216-3.216.873.873-3.216-.216-.373A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
);

export default function QuienesSomosPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className={s.page}>

        {/* ══════════════ HERO ══════════════ */}
        <section className={s.hero}>
          <div className={s.heroInner}>
            <div className={s.heroText}>
              <p className={s.eyebrow}>Quiénes somos · WeLearn</p>
              <h1 className={s.h1}>
                Una academia con<br />
                <span className={s.accent}>dirección física.</span>
              </h1>
              <p className={s.heroSub}>
                Idiomas WeLearn nació en Bucaramanga y sigue aquí, en el barrio Sotomayor. Enseñamos
                ocho idiomas y preparamos exámenes internacionales, presencialmente en el área
                metropolitana y online en el resto del mundo. Más de 1000 estudiantes han pasado
                por aquí.
              </p>
              <div className={s.heroCtas}>
                <a href={`https://wa.me/${WA}?text=${WA_GENERAL}`} target="_blank" rel="noopener noreferrer" className={s.waBtn}>
                  <WaIcon />
                  Hablar con nosotros
                </a>
                <Link href="/clases-de-idiomas" className={s.ghostBtn}>
                  Ver los idiomas →
                </Link>
              </div>
            </div>

            <div className={s.heroVisual}>
              <div className={s.heroCard}>
                <p className={s.heroCardTitle}>Dónde estamos</p>
                <p className={s.heroCardSub}>
                  {SEDE.streetAddress}<br />
                  {SEDE.addressLocality}, {SEDE.addressRegion}<br />
                  Lunes a viernes 7:00 a.m. – 9:00 p.m.<br />
                  Sábados 8:00 a.m. – 6:00 p.m.
                </p>
                <p className={s.heroCardSub} style={{ marginTop: '0.75rem' }}>
                  <a href={HAS_MAP} target="_blank" rel="noopener noreferrer" style={{ color: '#7f95ff', fontWeight: 600 }}>
                    Ver en el mapa →
                  </a>
                </p>
              </div>
              <div className={s.heroCard}>
                <p className={s.heroCardTitle}>Qué hacemos</p>
                <p className={s.heroCardSub}>
                  • Ocho idiomas, de A1 a nivel avanzado<br />
                  • Preparación de exámenes internacionales<br />
                  • Presencial en Bucaramanga y online en el mundo<br />
                  • Diagnóstico inicial gratuito
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className={s.proofStrip}>
          <span className={s.proofItem}><strong>+1000 estudiantes</strong> preparados</span>
          <span className={s.proofDivider} />
          <span className={s.proofItem}><strong>8 idiomas</strong></span>
          <span className={s.proofDivider} />
          <span className={s.proofItem}><strong>Sede en Bucaramanga</strong> · Sotomayor</span>
          <span className={s.proofDivider} />
          <span className={s.proofItem}><strong>Online</strong> · toda Colombia y el mundo</span>
        </div>

        {/* ══════════════ FUNDADORES ══════════════ */}
        <section className={s.section}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Los fundadores</p>
            <h2 className={s.h2}>Dos personas que aprendieron idiomas de verdad</h2>
            <p className={s.sectionSub}>
              WeLearn no es una franquicia ni un marketplace de tutores. La fundaron dos personas
              que siguen dando clases y diseñando el contenido que ves en la plataforma.
            </p>
            <div className={s.teamGrid}>
              {TEAM.map(m => (
                <div key={m.name} className={s.teamCard}>
                  <div className={s.teamPhoto}>
                    <Image
                      src={m.img}
                      alt={m.alt}
                      fill
                      style={{ objectFit: 'cover', objectPosition: 'center top' }}
                      sizes="150px"
                    />
                  </div>
                  <div>
                    <p className={s.teamName}>{m.name}</p>
                    <p className={s.teamRole}>{m.role}</p>
                    <p className={s.teamBio}>{m.bio}</p>
                    <div className={s.teamTags}>
                      {m.tags.map(t => <span key={t} className={s.teamTag}>{t}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ PRINCIPIOS ══════════════ */}
        <section className={s.sectionDark}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Cómo trabajamos</p>
            <h2 className={s.h2}>Tres cosas que no negociamos</h2>
            <div className={s.levelsGrid}>
              {PRINCIPIOS.map(p => (
                <div key={p.title} className={s.levelCard}>
                  <span className={s.levelTag}>{p.tag}</span>
                  <p className={s.levelTitle}>{p.title}</p>
                  <p className={s.levelDesc}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ TESTIMONIOS ══════════════ */}
        <section className={s.section}>
          <div className={s.wrap}>
            <p className={s.sectionEyebrow}>Estudiantes reales</p>
            <h2 className={s.h2}>Lo que han logrado</h2>
            <p className={s.sectionSub}>
              Mensajes tal como los escribieron, sin retocar. Cada uno corresponde a un objetivo
              distinto: un posgrado, una certificación, un viaje de trabajo.
            </p>
            <div className={s.testiGrid}>
              {TESTIMONIALS.map(t => (
                <div key={t.name} className={s.testiCard}>
                  <p className={s.testiQuote}>&ldquo;{t.quote}&rdquo;</p>
                  <p className={s.testiName}>{t.name}</p>
                  <p className={s.testiMeta}>{t.city} · {t.exam}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════ CTA ══════════════ */}
        <section className={s.ctaSection}>
          <div className={s.wrap}>
            <h2 className={s.ctaTitle}>Empieza por saber<br /><span className={s.accent}>dónde estás.</span></h2>
            <p className={s.ctaSub}>
              El diagnóstico es gratis y dura media hora. Salimos de ahí con tu nivel real, tu
              objetivo y cuánto te va a tomar de verdad.
            </p>
            <a href={`https://wa.me/${WA}?text=${WA_GENERAL}`} target="_blank" rel="noopener noreferrer" className={s.waBtn}>
              <WaIcon /> Agendar diagnóstico gratis
            </a>
          </div>
        </section>

      </main>
    </>
  );
}
