import Link from 'next/link';
import {
  ArrowRight,
  BookOpenCheck,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  Compass,
  FileCheck2,
  Headphones,
  Layers3,
  Map,
  Route,
  ScanSearch,
  SearchCheck,
  ShieldCheck,
  Target,
  TextSearch,
  Workflow,
} from 'lucide-react';
import {
  IELTS_READING_SKILLS,
  IELTS_READING_TYPES,
} from '@/data/practica-exams/seo-catalog';
import readingNotes from '@/data/practica/podcasts/academic-reading-strategies-and-traps';
import EpisodeNotes from '@/components/practica/EpisodeNotes';
import styles from './page.module.css';

const QUESTION_TYPE_FAMILIES = [
  {
    label: 'Evidence and viewpoints',
    detail: 'Decide what the passage states, contradicts, implies or leaves unresolved.',
    icon: FileCheck2,
    routes: [
      ['True / False / Not Given', 'true-false-not-given'],
      ['Yes / No / Not Given', 'yes-no-not-given'],
      ['Multiple Choice', 'multiple-choice'],
      ['Short-answer Questions', 'short-answer'],
    ],
  },
  {
    label: 'Matching and organisation',
    detail: 'Connect paragraphs, people, features and sentence parts by meaning rather than repeated words.',
    icon: Layers3,
    routes: [
      ['Matching Headings', 'matching-headings'],
      ['Matching Information', 'matching-information'],
      ['Matching Features', 'matching-features'],
      ['Matching Sentence Endings', 'matching-sentence-endings'],
    ],
  },
  {
    label: 'Completion from the passage',
    detail: 'Locate the exact answer span, preserve grammar and obey the stated word limit.',
    icon: TextSearch,
    routes: [
      ['Sentence Completion', 'sentence-completion'],
      ['Summary Completion', 'summary-completion'],
      ['Note Completion', 'note-completion'],
      ['Table Completion', 'table-completion'],
      ['Flow-chart Completion', 'flow-chart-completion'],
      ['Diagram Labeling', 'diagram-labeling'],
    ],
  },
] as const;

const READING_SKILLS = [
  {
    slug: 'skimming',
    title: 'Skimming',
    stage: 'Map',
    detail: 'Capture the topic, purpose and paragraph roles before you hunt for individual answers.',
    transfer: 'Best starting point for headings, summaries and unfamiliar passages.',
    icon: Map,
  },
  {
    slug: 'scanning',
    title: 'Scanning',
    stage: 'Locate',
    detail: 'Search for names, numbers, terms and paraphrased anchors without rereading every line.',
    transfer: 'Useful for information matching, completion and diagram tasks.',
    icon: ScanSearch,
  },
  {
    slug: 'parafrasis',
    title: 'Paraphrase recognition',
    stage: 'Compare',
    detail: 'Recognise when the question and passage express the same idea with different language.',
    transfer: 'Essential across every question family, especially matching and statement tasks.',
    icon: Workflow,
  },
  {
    slug: 'inferencia',
    title: 'Inference',
    stage: 'Interpret',
    detail: 'Choose only conclusions that the evidence supports and control claims that go too far.',
    transfer: 'Strengthens multiple choice and writer-view decisions.',
    icon: BrainCircuit,
  },
  {
    slug: 'limite-de-palabras',
    title: 'Word-limit control',
    stage: 'Answer',
    detail: 'Copy the smallest grammatical answer that stays inside the exact instruction.',
    transfer: 'Required for short answers and every completion format.',
    icon: CheckCircle2,
  },
  {
    slug: 'gestion-del-tiempo',
    title: 'Time management',
    stage: 'Transfer',
    detail: 'Allocate the 60 minutes, recognise a stalled question and return with a deliberate plan.',
    transfer: 'Turns isolated accuracy into controlled mixed practice.',
    icon: Clock3,
  },
] as const;

const READING_SYSTEM = [
  {
    number: '01',
    title: 'Map the passage',
    detail: 'Skim the title, opening sentences and paragraph functions. You need a route, not every detail.',
    example: 'Example: Paragraph A introduces a water-waste problem; Paragraph B reports an uneven result; Paragraph C changes the strategy.',
    href: '/practica/ielts/reading/habilidades/skimming',
    icon: Compass,
  },
  {
    number: '02',
    title: 'Locate the evidence',
    detail: 'Scan for stable anchors, then widen the reading window until the complete idea is visible.',
    example: 'Example: the number “18,000” is a fast anchor. Stop there, then read the full sentence before deciding what it proves.',
    href: '/practica/ielts/reading/habilidades/scanning',
    icon: SearchCheck,
  },
  {
    number: '03',
    title: 'Compare meaning',
    detail: 'Test scope, paraphrase, contrast and inference. Repeated vocabulary is not enough.',
    example: 'Example: “the library effect was smaller” contradicts “sales fell equally”, even though both sentences mention the same locations.',
    href: '/practica/ielts/reading/habilidades/parafrasis',
    icon: BrainCircuit,
  },
  {
    number: '04',
    title: 'Control the answer',
    detail: 'Check grammar, word limits and the exact question instruction before committing.',
    example: 'Example: “usage data” completes a 2-word gap naturally; “the usage data collected” would exceed the limit.',
    href: '/practica/ielts/reading/habilidades/limite-de-palabras',
    icon: Target,
  },
] as const;

const STUDY_PLAN = [
  {
    label: 'Foundation',
    title: 'Build the reading system',
    detail: 'Complete Skimming, Scanning and Paraphrase Recognition before chasing speed.',
  },
  {
    label: 'Accuracy',
    title: 'Train one question family',
    detail: 'Choose the family that causes the most errors and study its decision rules deliberately.',
  },
  {
    label: 'Transfer',
    title: 'Mix question types',
    detail: 'Switch methods inside one passage and explain the evidence behind every decision.',
  },
  {
    label: 'Control',
    title: 'Add time pressure last',
    detail: 'Measure pacing only after the method is stable enough to survive a new passage.',
  },
] as const;

function questionRoute(slug: string) {
  const route = IELTS_READING_TYPES.find((item) => item.slug === slug && item.status === 'published');
  if (!route) throw new Error(`Missing published IELTS Reading question route: ${slug}`);
  return route.path;
}

function skillRoute(slug: string) {
  const route = IELTS_READING_SKILLS.find((item) => item.slug === slug && item.status === 'published');
  if (!route) throw new Error(`Missing published IELTS Reading skill route: ${slug}`);
  return route.path;
}

export default function IELTSReadingHub() {
  const publishedQuestionTypes = IELTS_READING_TYPES.filter((item) => item.status === 'published');
  const publishedSkills = IELTS_READING_SKILLS.filter((item) => item.status === 'published');

  return (
    <div lang="en" className={styles.page}>
      <div className={styles.shell}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/practica">Practice</Link>
          <span aria-hidden="true">/</span>
          <Link href="/practica/ielts">IELTS</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Reading</span>
        </nav>

        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>IELTS Academic Reading</p>
            <h1>Read with a map. Answer with evidence.</h1>
            <p className={styles.heroLead}>
              Build the complete Reading system: understand every question family, train the subskills that make it work, and then transfer both into mixed practice.
            </p>
            <div className={styles.heroActions}>
              <a href="#choose-your-route" className={styles.primaryAction}>
                Choose your route <ArrowRight size={17} aria-hidden="true" />
              </a>
              <Link href="/practica/ielts/reading/habilidades" className={styles.secondaryAction}>
                Start with reading skills
              </Link>
            </div>
          </div>

          <aside className={styles.heroMap} aria-label="The WeLearn Reading method">
            <p className={styles.mapLabel}>The Reading loop</p>
            {['Map the passage', 'Locate evidence', 'Compare meaning', 'Control the answer'].map((step, index) => (
              <div key={step} className={styles.mapStep}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </aside>
        </header>

        <div className={styles.factGrid} aria-label="IELTS Academic Reading at a glance">
          <div className={styles.fact}><strong>3</strong><span>long Academic Reading passages</span></div>
          <div className={styles.fact}><strong>40</strong><span>questions across the complete test</span></div>
          <div className={styles.fact}><strong>60 min</strong><span>to read, decide and record answers</span></div>
          <div className={styles.fact}><strong>{publishedQuestionTypes.length} + {publishedSkills.length}</strong><span>question routes and skill lessons in this hub</span></div>
        </div>

        <section className={`${styles.section} ${styles.podcastSection}`} aria-labelledby="audio-guide-heading">
          <div className={styles.podcastPanel}>
            <div className={styles.podcastHeader}>
              <div>
                <p className={styles.podcastEyebrow}><Headphones size={16} aria-hidden="true" /> Start here · Audio guide</p>
                <h2 id="audio-guide-heading">IELTS Academic Reading: Strategies and Traps</h2>
                <p>Use this English episode as your map of Academic Reading: understand the official format, distinguish the question families, avoid the most expensive traps and turn Map, Locate, Compare and Control into a repeatable practice system.</p>
              </div>
              <div className={styles.podcastDuration} aria-label="Episode length: 18 minutes 43 seconds">
                <Clock3 size={18} aria-hidden="true" />
                <span>18:43</span>
              </div>
            </div>

            <div className={styles.playerShell}>
              <div className={styles.nowPlaying}><span>Orientation episode · English</span><strong>No autoplay</strong></div>
              <audio className={styles.audioPlayer} controls preload="metadata" aria-label="Play IELTS Academic Reading: Strategies and Traps">
                <source src="/audio/ielts/reading/ielts-academic-reading-strategies-and-traps.mp3" type="audio/mpeg" />
                Your browser does not support the audio player. <a href="/audio/ielts/reading/ielts-academic-reading-strategies-and-traps.mp3">Download the episode</a>.
              </audio>
            </div>

            <div className={styles.podcastBody}>
              <div className={styles.episodeMap}>
                <p className={styles.podcastLabel}>By the end, you should be able to</p>
                <ul>
                  <li>explain the three-section, 40-question, 60-minute Academic Reading format and its objective scoring;</li>
                  <li>distinguish evidence and viewpoint, matching and organisation, and completion decisions;</li>
                  <li>use skimming, scanning, paraphrase, inference, word-limit and pacing skills inside Map, Locate, Compare and Control;</li>
                  <li>move from focused question practice to mixed transfer, adding full timing only after the method is stable.</li>
                </ul>
                <nav className={styles.podcastLinks} aria-label="Continue from the audio guide">
                  <Link href="/examenes/ielts/podcast/ielts-academic-reading-strategies-and-traps">Episode page & notes <ArrowRight size={15} aria-hidden="true" /></Link>
                  <a href="#question-types">Question types <ArrowRight size={15} aria-hidden="true" /></a>
                  <a href="#reading-skills">Reading skills <ArrowRight size={15} aria-hidden="true" /></a>
                  <Link href="/practica/ielts/reading/mixed-practice">Mixed practice <ArrowRight size={15} aria-hidden="true" /></Link>
                </nav>
              </div>

              <aside className={styles.editorialNote} aria-label="Editorial accuracy note">
                <ShieldCheck size={22} aria-hidden="true" />
                <div>
                  <p className={styles.podcastLabel}>Editorially reviewed</p>
                  <h3>Three clarifications before you press play</h3>
                  <p>This AI-produced conversation has been checked against the official format. IELTS labels the writer-view format Yes / No / Not Given. Its official format page defines 11 numbered Academic Reading question-type categories, but an individual test uses a variable selection of formats. On computer, answers are entered on screen; on paper, they must be transferred within the same 60 minutes.</p>
                </div>
              </aside>
            </div>

            <EpisodeNotes
              sections={readingNotes}
              tone={{
                accent: 'var(--reading-red)',
                ink: 'var(--reading-ink)',
                muted: 'var(--reading-muted)',
                line: 'var(--reading-line)',
              }}
            />
          </div>
        </section>

        <section id="choose-your-route" className={styles.section} aria-labelledby="route-heading">
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>One test · three ways to improve</p>
            <h2 id="route-heading">Choose the route that matches your current problem</h2>
            <p>
              Question types tell you what decision the test requires. Reading skills tell you how to reach that decision. Mixed practice checks whether you can switch between both under one passage.
            </p>
          </div>
          <div className={styles.pathGrid}>
            <article className={styles.pathCard}>
              <Route aria-hidden="true" />
              <span>Path A</span>
              <h3>Question types</h3>
              <p>Learn the decision rule, evidence pattern and common trap for every Reading format.</p>
              <a href="#question-types">Explore all question types <ArrowRight size={16} aria-hidden="true" /></a>
            </article>
            <article className={styles.pathCard}>
              <BookOpenCheck aria-hidden="true" />
              <span>Path B</span>
              <h3>Reading skills</h3>
              <p>Train skimming, scanning, paraphrase, inference, word limits and time management.</p>
              <a href="#reading-skills">Build the subskills <ArrowRight size={16} aria-hidden="true" /></a>
            </article>
            <article className={styles.pathCard}>
              <Workflow aria-hidden="true" />
              <span>Path C</span>
              <h3>Mixed practice</h3>
              <p>Apply several methods inside one passage and justify each answer from the text.</p>
              <Link href="/practica/ielts/reading/mixed-practice">Enter the practice room <ArrowRight size={16} aria-hidden="true" /></Link>
            </article>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="system-heading">
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>The WeLearn Reading system</p>
            <h2 id="system-heading">A repeatable process for unfamiliar passages</h2>
            <p>The question type changes, but the reading process remains stable. Use these four steps before adding time pressure.</p>
          </div>
          <div className={styles.systemGrid}>
            {READING_SYSTEM.map(({ number, title, detail, example, href, icon: Icon }) => (
              <Link key={number} href={href} className={styles.systemCard}>
                <span className={styles.systemNumber}>{number}</span>
                <Icon size={23} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{detail}</p>
                <div className={styles.systemExample}>
                  <small>See it in action</small>
                  <p>{example}</p>
                </div>
                <strong>Open the guided lesson <ArrowRight size={15} aria-hidden="true" /></strong>
              </Link>
            ))}
          </div>
        </section>

        <section id="question-types" className={styles.section} aria-labelledby="types-heading">
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>Path A · Question types</p>
            <h2 id="types-heading">Fourteen focused routes, organised by the decision you make</h2>
            <p>
              IELTS groups some completion formats together. We separate them into focused practice routes so you can master the exact layout, grammar and answer behaviour of each one.
            </p>
          </div>
          <div className={styles.typeFamilyGrid}>
            {QUESTION_TYPE_FAMILIES.map(({ label, detail, icon: Icon, routes }) => (
              <article key={label} className={styles.typeFamily}>
                <div className={styles.typeFamilyHeader}>
                  <Icon size={24} aria-hidden="true" />
                  <div><h3>{label}</h3><p>{detail}</p></div>
                </div>
                <div className={styles.typeLinks}>
                  {routes.map(([title, slug], index) => (
                    <a key={slug} href={questionRoute(slug)} className={styles.typeLink}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <strong>{title}</strong>
                      <ArrowRight size={15} aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <Link href="/practica/ielts/reading/tipos-de-preguntas" className={styles.inlineCta}>
            Open the complete question-type guide <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </section>

        <section id="reading-skills" className={styles.section} aria-labelledby="skills-heading">
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>Path B · Reading skills</p>
            <h2 id="skills-heading">The subskills behind accurate answers</h2>
            <p>These are not official IELTS question types. They are transferable reading tools that make the official tasks easier to navigate and verify.</p>
          </div>
          <div className={styles.skillGrid}>
            {READING_SKILLS.map(({ slug, title, stage, detail, transfer, icon: Icon }, index) => (
              <Link key={slug} href={skillRoute(slug)} className={styles.skillCard}>
                <div className={styles.skillTopline}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <small>{stage}</small>
                </div>
                <Icon size={24} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{detail}</p>
                <strong>{transfer}</strong>
                <em>Open skill lesson <ArrowRight size={15} aria-hidden="true" /></em>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="plan-heading">
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>Recommended progression</p>
            <h2 id="plan-heading">Accuracy first. Speed after the method is stable.</h2>
          </div>
          <ol className={styles.planGrid}>
            {STUDY_PLAN.map((step, index) => (
              <li key={step.label}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <small>{step.label}</small>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.section} aria-labelledby="transfer-heading">
          <div className={styles.transferBand}>
            <div>
              <p className={styles.kicker}>Path C · Transfer</p>
              <h2 id="transfer-heading">Combine the methods in a dedicated practice room</h2>
              <p>
                Mixed practice is most useful after focused study. The practice room keeps the long passages, answer controls and feedback away from this orientation hub, so you can concentrate on one task at a time.
              </p>
            </div>
            <ol className={styles.transferSteps}>
              <li><span>1</span><p><strong>Identify the format.</strong> Decide whether the task asks for evidence, matching or completion.</p></li>
              <li><span>2</span><p><strong>Select the method.</strong> Choose the relevant reading skill before answering.</p></li>
              <li><span>3</span><p><strong>Justify the answer.</strong> Quote the passage evidence and name the rejected trap.</p></li>
            </ol>
            <Link href="/practica/ielts/reading/mixed-practice" className={styles.transferAction}>
              Open Mixed Practice <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="official-heading">
          <div className={styles.officialNote}>
            <div>
              <p className={styles.kicker}>Official format and independent preparation</p>
              <h2 id="official-heading">Use official rules. Practise with an independent learning system.</h2>
            </div>
            <p>
              IELTS Academic Reading contains three long texts and 40 questions completed in 60 minutes. WeLearn organises the official formats into focused routes and adds transferable skill lessons. WeLearn is an independent preparation resource and is not affiliated with or endorsed by the IELTS Partners.
            </p>
            <a href="https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading">
              Review the official Academic Reading format <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="faq-heading" lang="es">
          <div className={styles.sectionHeading}>
            <p className={styles.kicker}>Preguntas frecuentes</p>
            <h2 id="faq-heading">Cómo usar el hub de Reading</h2>
          </div>
          <div className={styles.faqGrid}>
            <article><h3>¿Por dónde debería empezar?</h3><p>Empieza con Skimming y Scanning si pierdes tu ubicación dentro del pasaje. Empieza con un tipo de pregunta específico si encuentras la evidencia, pero todavía eliges la respuesta incorrecta.</p></article>
            <article><h3>¿Skimming y scanning son tipos oficiales de pregunta?</h3><p>No. Son habilidades de lectura transferibles. El hub las separa de los formatos oficiales y muestra en qué tipos de pregunta se aplican.</p></article>
            <article><h3>¿Debo practicar con cronómetro desde el principio?</h3><p>No. Primero construye un proceso preciso y explicable. Añade presión de tiempo cuando puedas localizar y comprobar evidencia de forma consistente.</p></article>
            <article><h3>¿Cuándo debo entrar a Mixed Practice?</h3><p>Después de practicar una habilidad y un tipo de pregunta por separado. Allí tendrás que cambiar de método dentro del mismo pasaje y justificar cada respuesta.</p></article>
          </div>
        </section>

        <section className={styles.finalCta} aria-labelledby="next-heading">
          <div><p className={styles.kicker}>Your next session</p><h2 id="next-heading">Build the map before you race the clock.</h2></div>
          <div className={styles.finalActions}>
            <Link href="/practica/ielts/reading/habilidades/skimming">Start with Skimming <ArrowRight size={16} aria-hidden="true" /></Link>
            <Link href="/practica/ielts/reading/tipos-de-preguntas">Browse question types</Link>
          </div>
        </section>
      </div>
    </div>
  );
}
