import styles from './MatchingHeadingsPracticeLab.module.css';

type EvidencePassage = {
  id: string;
  title: string;
  paragraphs: Array<{
    id: string;
    label: string;
    text: string;
  }>;
};

export default function ReadingEvidenceWorkspace({
  passages,
}: {
  passages: EvidencePassage[];
}) {
  const uniquePassages = Array.from(
    new Map(passages.map((passage) => [passage.id, passage])).values(),
  );

  return (
    <section className={styles.evidenceWorkspace} aria-labelledby="evidence-workspace-title">
      <header className={styles.evidenceWorkspaceHeader}>
        <div>
          <p className={styles.panelLabel}>Evidence workspace</p>
          <h3 id="evidence-workspace-title">Read the passage before deciding</h3>
        </div>
        <p>
          Every answer must be supported by this text. Related knowledge outside the passage does not count.
        </p>
      </header>

      <div className={styles.evidenceGrid}>
        {uniquePassages.map((passage) => (
          <article className={styles.evidencePassage} key={passage.id} lang="en">
            <h4>{passage.title}</h4>
            {passage.paragraphs.map((paragraph) => (
              <section key={paragraph.id}>
                <h5>{paragraph.label}</h5>
                <p>{paragraph.text}</p>
              </section>
            ))}
          </article>
        ))}
      </div>
    </section>
  );
}
