import { getExamTranscriptResource } from '@/lib/exams/transcript-resource';
import styles from './ExamPracticeDownloads.module.css';

type Props = {
  examSlug: string;
  mockId: string;
};

export default function ExamPracticeDownloads({ examSlug, mockId }: Props) {
  const resources = getExamTranscriptResource(examSlug, mockId);
  if (!resources) return null;

  const german = resources.interfaceLanguage === 'Deutsch';
  const copy = german ? {
    eyebrow: 'RESSOURCEN ZUM TESTSATZ',
    title: 'Nachbereiten mit klaren Unterlagen',
    intro: 'Laden Sie die Audio-Transkription und die Lösungen passend zu diesem Testsatz herunter.',
    transcriptTitle: 'Audio-Transkription',
    transcriptBody: 'Der vollständige Audioinhalt zum Nachlesen und Wiederholen.',
    keyTitle: 'Lösungen und Bewertungshinweise',
    keyBody: 'Objektive Lösungen sowie Hinweise für offene Aufgaben.',
    open: 'PDF öffnen',
    download: 'Herunterladen',
    label: 'Herunterladbare Unterlagen zu diesem Testsatz',
  } : {
    eyebrow: 'RECURSOS DEL SET',
    title: 'Repasa y corrige con una guía clara',
    intro: 'Descarga la transcripción y las claves correspondientes exactamente a este set.',
    transcriptTitle: 'Transcripción del audio',
    transcriptBody: `Contenido completo del audio en ${resources.audioLanguage} para volver a escuchar y estudiar.`,
    keyTitle: 'Claves y criterios de respuesta',
    keyBody: 'Respuestas objetivas y orientación para las tareas abiertas.',
    open: 'Abrir PDF',
    download: 'Descargar',
    label: 'Material descargable de este set',
  };

  const cards = [
    { title: copy.transcriptTitle, body: copy.transcriptBody, href: resources.href, kind: german ? 'TRANSKRIPTION' : 'TRANSCRIPCIÓN' },
    { title: copy.keyTitle, body: copy.keyBody, href: resources.answerKeyHref, kind: german ? 'LÖSUNGEN' : 'CLAVES' },
  ];

  return (
    <aside className={styles.resources} aria-label={copy.label}>
      <div className={styles.heading}>
        <div>
          <p>{copy.eyebrow}</p>
          <h2>{copy.title}</h2>
        </div>
        <span aria-hidden="true">PDF</span>
      </div>
      <p className={styles.intro}>{copy.intro}</p>
      <div className={styles.grid}>
        {cards.map(card => (
          <article className={styles.card} key={card.href}>
            <div className={styles.cardTop}><span>{card.kind}</span><b>PDF</b></div>
            <h3>{card.title}</h3>
            <p>{card.body}</p>
            <div className={styles.actions}>
              <a href={card.href} target="_blank" rel="noreferrer">{copy.open} ↗</a>
              <a href={card.href} download>{copy.download}</a>
            </div>
          </article>
        ))}
      </div>
    </aside>
  );
}
