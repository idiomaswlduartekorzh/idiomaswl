import type { ReadingTutorGuide } from '@/data/practica-exams/ielts-reading-tutor-guides';
import styles from './InternationalReadingSkillLesson.module.css';

type TaskFigure = NonNullable<ReadingTutorGuide['tasks'][number]['figure']>;

function ExampleFigure({ figure }: { figure: TaskFigure }) {
  switch (figure.kind) {
    case 'notes':
      return (
        <div className={styles.exampleNotes}>
          <strong>{figure.heading}</strong>
          <ul>{figure.items.map((line) => <li key={line}>{line}</li>)}</ul>
        </div>
      );
    case 'table':
      return (
        <table className={styles.exampleTable} aria-label="Shelter building materials">
          <thead><tr>{figure.columns.map((column) => <th scope="col" key={column}>{column}</th>)}</tr></thead>
          <tbody>
            {figure.rows.map(([rowHeading, ...cells]) => (
              <tr key={rowHeading}>
                <th scope="row">{rowHeading}</th>
                {cells.map((cell, index) => <td key={figure.columns[index + 1]}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      );
    case 'flow':
      return (
        <ol className={styles.exampleFlow} aria-label="Sequence of paper-making steps">
          {figure.steps.map((step) => <li key={step}>{step}</li>)}
        </ol>
      );
    case 'compost-bin':
      return (
        <div
          className={styles.binDiagram}
          role="img"
          aria-label="Side view. Compost fills the top of the bin. Marker A points to the thin horizontal layer separating the compost above from the collection tray below."
        >
          <span className={styles.binContents}>Compost</span>
          <span className={styles.binLayer} />
          <span className={styles.binMarker}>← A</span>
          <span className={styles.binTray}>Collection tray</span>
        </div>
      );
  }
}

export default function ReadingTutorExample({ guide }: { guide: ReadingTutorGuide }) {
  return (
    <section id="worked-example" className={styles.section} aria-labelledby="example-heading">
      <div className={styles.sectionHeader}>
        <p className={styles.eyebrow}>Read with a tutor</p>
        <h2 id="example-heading">{guide.title}</h2>
      </div>
      <figure className={styles.passageExcerpt}>
        <figcaption>Practice passage</figcaption>
        <blockquote>{guide.passage.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</blockquote>
      </figure>
      {guide.tasks.map((task) => (
        <article className={styles.tutorDecision} key={task.question}>
          {task.instruction && <p className={styles.exampleInstruction}>{task.instruction}</p>}
          <h3>{task.question}</h3>
          {task.options && <ul className={styles.exampleOptions}>{task.options.map((option) => <li key={option}>{option}</li>)}</ul>}
          {task.figure && <ExampleFigure figure={task.figure} />}
          {task.reasoning.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </article>
      ))}
      <div className={styles.returnToText}>
        <h3>Try this on your next question</h3>
        <p>{guide.transfer}</p>
      </div>
    </section>
  );
}
