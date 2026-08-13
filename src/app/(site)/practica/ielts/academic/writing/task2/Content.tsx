'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, Braces, CheckCircle2, FilePenLine, Layers3, Route, Search, Wrench } from 'lucide-react';
import styles from './introduccion/page.module.css';

const BUILD_PATH = [
  { title: 'Prompt Analysis', detail: 'Decode every instruction before planning.', href: '/practica/ielts/academic/writing/task2/analisis-pregunta', status: 'Complete lesson', icon: Search },
  { title: 'Introduction', detail: 'Paraphrase + thesis + position or roadmap when needed.', href: '/practica/ielts/academic/writing/task2/introduccion', status: 'Complete lesson', icon: FilePenLine },
  { title: 'Body Paragraph 1', detail: 'First controlling idea: topic sentence, development and evidence.', href: '/practica/ielts/academic/writing/task2/body-1', status: 'Complete lesson', icon: Layers3 },
  { title: 'Body Paragraph 2', detail: 'Continue, contrast, evaluate or answer the second question.', href: '/practica/ielts/academic/writing/task2/body-2', status: 'Complete lesson', icon: Layers3 },
  { title: 'Conclusion', detail: 'Restate the position and synthesise without adding a new idea.', href: '/practica/ielts/academic/writing/task2/conclusion', status: 'Complete lesson', icon: CheckCircle2 },
  { title: 'Final Review', detail: 'Check the instruction, position, paragraph logic and language.', href: '/practica/ielts/academic/writing/task2/revision-final', status: 'Complete lesson', icon: Wrench },
  { title: 'Complete Essay Practice', detail: 'Transfer every block to a timed 250+ word response.', href: '/practica/ielts/academic/writing/task2/tarea-completa', status: 'Live practice', icon: BookOpen },
];

const QUESTION_TYPES = [
  ['Opinion', 'opinion', 'Agree, disagree or evaluate an extent.'],
  ['Discussion', 'discussion', 'Discuss both views and give your own opinion.'],
  ['Problem–Solution', 'problem-solution', 'Analyse causes or problems and propose solutions.'],
  ['Advantages–Disadvantages', 'advantages-disadvantages', 'Compare benefits and drawbacks, sometimes deciding which outweighs the other.'],
  ['Direct Questions', 'direct-question', 'Answer two explicit questions completely and separately.'],
] as const;

const TOOLS = [
  // Las DIEZ tienen ya recorrido propio con los cuatro bloques del blueprint. Antes ocho eran
  // fichas que enlazaban a la etapa donde su habilidad se practica de paso; para navegar valía,
  // para aprender la habilidad no, porque la etapa enseña a montar un párrafo y la habilidad
  // atraviesa todos. Cada página sigue enlazando a su etapa desde el bloque final.
  ['Paraphrasing', 'paraphrasing', 'Restate the prompt accurately without changing its meaning — five techniques, one page each.'],
  ['Thesis and position', 'habilidades/thesis-and-position', 'Make the controlling answer visible and consistent from the opening.'],
  ['Topic sentences', 'habilidades/topic-sentences', 'Give each body paragraph one clear, question-aligned job.'],
  ['Explanation and development', 'habilidades/explanation-and-development', 'Turn a controlling idea into a logical chain instead of a list of claims.'],
  ['Examples and evidence', 'habilidades/examples-and-evidence', 'Use relevant examples to clarify reasoning without inventing sources.'],
  ['Cohesion and linking', 'linking-language', 'Connect ideas by function without mechanical connector lists.'],
  ['Contrast and concession', 'habilidades/contrast-and-concession', 'Acknowledge, contrast or rebut ideas when the instruction requires it.'],
  ['Sentence types', 'habilidades/sentence-types', 'Use simple, compound and complex sentences for a clear purpose.'],
  // Segunda ficha con recorrido propio. Apuntaba a `linking-language`, que enseña otra cosa:
  // los conectores son UNA función del vocabulario, y esta unidad cubre las ocho restantes.
  ['Academic vocabulary', 'academic-vocabulary', 'Choose precise functional language without forcing memorised phrases — eight functions, one page each.'],
  ['Critical final review', 'habilidades/critical-final-review', 'Check Task Response, logic, cohesion, vocabulary and grammar before finishing.'],
] as const;

export default function Task2HubPage() {
  return (
    <div lang="en" className={styles.page}>
      <div className={styles.shell}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link href="/practica/ielts/academic/writing">Academic Writing</Link><span>/</span><span>Task 2</span></nav>
        <header className={styles.hero}>
          <p className={styles.eyebrow}>IELTS Academic Writing Task 2</p>
          <h1>Build the essay. Adapt every paragraph to the question.</h1>
          <p className={styles.heroLead}>This cluster separates the architecture of a complete essay from the skills that make each paragraph work. Follow the essay in order, study a specific question type, or strengthen one transferable writing tool.</p>
          <div className={styles.factGrid} aria-label="Official Task 2 facts">
            <div className={styles.fact}><strong>250+</strong><span>minimum words in the complete response</span></div>
            <div className={styles.fact}><strong>≈40 min</strong><span>recommended time for Task 2</span></div>
            <div className={styles.fact}><strong>2×</strong><span>the weighting of Task 2 compared with Task 1</span></div>
            <div className={styles.fact}><strong>4 criteria</strong><span>used to assess the complete response</span></div>
          </div>
        </header>

        <section className={styles.section} aria-labelledby="official-heading">
          <div className={styles.sectionHeading}><p className={styles.kicker}>Official format and WeLearn strategy</p><h2 id="official-heading">One official essay task, three practical ways to study it</h2><p>IELTS asks for a connected response to the exact prompt. The five question families and the four-paragraph default below are WeLearn study tools, not separate official tasks or a fixed paragraph rule.</p></div>
          <div className={styles.pathGrid}>
            <article className={styles.pathCard}><Route aria-hidden="true" /><h3>Build the essay</h3><p>Move through the response in writing order.</p><a href="#build-the-essay">Start with the architecture <ArrowRight size={16} /></a></article>
            <article className={styles.pathCard}><Braces aria-hidden="true" /><h3>Study by question type</h3><p>See how each paragraph changes with the instruction.</p><a href="#question-types">Choose a question type <ArrowRight size={16} /></a></article>
            <article className={styles.pathCard}><Wrench aria-hidden="true" /><h3>Strengthen transferable skills</h3><p>Practise the tools that operate inside several paragraphs.</p><a href="#transferable-skills">Choose a writing tool <ArrowRight size={16} /></a></article>
          </div>
        </section>

        <section id="build-the-essay" className={styles.section} aria-labelledby="build-heading">
          <div className={styles.sectionHeading}><p className={styles.kicker}>Path A · Build the essay</p><h2 id="build-heading">The response architecture</h2><p>A strong default is four paragraphs: introduction, two developed body paragraphs and conclusion. A third body paragraph is optional only when it adds a genuinely distinct, well-developed idea.</p></div>
          <div className={styles.sequenceGrid}>
            {BUILD_PATH.map(({ title, detail, href, status, icon: Icon }, index) => <Link key={title} href={href} className={styles.sequenceCard}><span className={styles.sequenceNumber}>{String(index + 1).padStart(2, '0')}</span><Icon size={22} aria-hidden="true" /><h3>{title}</h3><p>{detail}</p><small>{status}</small></Link>)}
          </div>
        </section>

        <section id="question-types" className={styles.section} aria-labelledby="types-heading">
          <div className={styles.sectionHeading}><p className={styles.kicker}>Path B · Study by question type</p><h2 id="types-heading">The blocks stay stable; their jobs change</h2><p>Each lesson shows how the thesis, Body 1, Body 2 and conclusion respond to a different instruction.</p></div>
          <div className={styles.studyGrid}>{QUESTION_TYPES.map(([title, slug, detail]) => <Link key={slug} href={`/practica/ielts/academic/writing/task2/${slug}`} className={styles.studyCard}><span>Question type</span><h3>{title}</h3><p>{detail}</p><strong>Study this structure <ArrowRight size={15} /></strong></Link>)}</div>
        </section>

        <section id="transferable-skills" className={styles.section} aria-labelledby="tools-heading">
          <div className={styles.sectionHeading}><p className={styles.kicker}>Path C · Strengthen transferable skills</p><h2 id="tools-heading">The tools that make the paragraphs work</h2><p>These are not extra essay paragraphs. They are reusable skills applied inside the architecture.</p></div>
          <div className={styles.studyGrid}>{TOOLS.map(([title, slug, detail]) => <Link key={title} href={`/practica/ielts/academic/writing/task2/${slug}`} className={styles.studyCard}><span>Transferable skill</span><h3>{title}</h3><p>{detail}</p><strong>Open the lesson <ArrowRight size={15} /></strong></Link>)}</div>
        </section>

        <section className={styles.section} aria-labelledby="faq-heading"><div className={styles.sectionHeading}><p className={styles.kicker}>Frequently asked questions</p><h2 id="faq-heading">Structure without a rigid formula</h2></div><div className={styles.faqGrid}><article><h3>How many paragraphs should IELTS Writing Task 2 have?</h3><p>IELTS does not prescribe a fixed paragraph count. WeLearn teaches a four-paragraph default while adapting each paragraph to the exact prompt.</p></article><article><h3>Is Body 3 required?</h3><p>No. Add it only when a distinct third idea can be developed fully without weakening the other paragraphs or time control.</p></article><article><h3>Are the five essay types official IELTS task names?</h3><p>No. They are WeLearn teaching categories for recurring instructions within the same official Task 2 essay response.</p></article><article><h3>Where should I start?</h3><p>Start with Prompt Analysis, then build the introduction. The prompt determines the job of every later paragraph.</p></article></div></section>
      </div>
    </div>
  );
}
