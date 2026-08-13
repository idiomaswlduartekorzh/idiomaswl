import type { Metadata } from 'next';
import InternationalReadingSkillLesson from '@/components/exam-practice/InternationalReadingSkillLesson';
import SkillReviewSourceBlock from '@/components/exam-practice/SkillReviewSourceBlock';
import {
  NoteCompletionGuidedPractice,
  NoteCompletionIndependentPractice,
  NoteCompletionProgressEngine,
} from '@/components/exam-practice/NoteCompletionPracticeLab';
import {
  NOTE_COMPLETION_GUIDED_PASSAGE_ID,
  NOTE_COMPLETION_INDEPENDENT_PASSAGE_ID,
  getNoteCompletionPassage,
} from '@/data/practica-exams/ielts-reading-note-completion-progress';
import { IELTS_READING_TYPES, PRACTICE_BASE_URL } from '@/data/practica-exams/seo-catalog';

const ROUTE = IELTS_READING_TYPES.find((item) => item.slug === 'note-completion')!;
const TITLE = 'Note Completion: use headings as a search map';
const DESCRIPTION = 'Read each note group as a structured map, predict the missing category and copy the smallest exact passage span within the displayed word limit.';
const IELTS_ACADEMIC_URL = 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading';
const guidedPassage = getNoteCompletionPassage(NOTE_COMPLETION_GUIDED_PASSAGE_ID)!;
const independentPassage = getNoteCompletionPassage(NOTE_COMPLETION_INDEPENDENT_PASSAGE_ID)!;

export const metadata: Metadata = {
  title: 'IELTS Note Completion: Method, Practice and Progress',
  description: DESCRIPTION,
  keywords: ROUTE.keywords,
  alternates: { canonical: `${PRACTICE_BASE_URL}${ROUTE.path}` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${PRACTICE_BASE_URL}${ROUTE.path}`, type: 'website', locale: 'en_US' },
};

export default function Page() {
  return (
    <InternationalReadingSkillLesson
      slug="note-completion"
      path={ROUTE.path}
      indexPath="/practica/ielts/reading/tipos-de-preguntas"
      indexName="Reading Question Types"
      lessonLabel="IELTS Academic Reading · Question type"
      name="Note Completion"
      title={TITLE}
      description={DESCRIPTION}
      accent="#0f766e"
      directAnswer="Read the word limit and every note heading first. Use the active group to narrow the passage zone, predict the missing form and copy only the exact words that complete the bullet naturally."
      facts={[
        { label: 'Target', value: 'Structured detail' },
        { label: 'Evidence', value: 'Group heading + local cue + exact span' },
        { label: 'Main risk', value: 'Searching without the note map' },
      ]}
      outcomes={[
        { title: 'Use headings as boundaries', text: 'Turn each note group into a precise passage-search zone before looking for one answer.' },
        { title: 'Predict the missing form', text: 'Use the complete bullet to expect a place, object, reason, time, action or short phrase.' },
        { title: 'Control the answer span', text: 'Copy the minimum passage wording that preserves grammar and the displayed limit.' },
      ]}
      method={[
        { title: 'Read the instruction', text: 'Confirm that answers come from the passage and record the maximum number of words.' },
        { title: 'Map the note groups', text: 'Read every heading and identify the purpose, process, problem or result represented by each group.' },
        { title: 'Predict and locate', text: 'Use the bullet grammar and local cues to find the matching evidence inside the correct passage zone.' },
        { title: 'Copy and rebuild', text: 'Insert the smallest exact span, then reread the heading and complete bullet together.' },
      ]}
      weakExample="Scan the entire passage for a repeated noun and ignore which note heading owns that detail."
      strongExample="The heading says ‘Planning around routines’, so search the paragraph about schedules, predict a time phrase after ‘after’ and submit the exact two-word evidence span."
      practice={<NoteCompletionGuidedPractice passage={guidedPassage} />}
      independentPracticeExperience={<NoteCompletionIndependentPractice passage={independentPassage} />}
      progressEngine={<NoteCompletionProgressEngine />}
      sourceReview={(
        <SkillReviewSourceBlock
          accent="#0f766e"
          skillName="Note Completion"
          reviewedFocus={[
            'Guided, independent and Progress Engine passage pools are separated.',
            'Every response is checked against a visible note heading, a literal passage span, the rebuilt bullet grammar and the displayed maximum.',
            'Full-set feedback remains closed until submission, while guided errors reopen the field for repair.',
            'Candidate sources retain explicit limitations and do not certify authorship, rights clearance or every composite claim.',
          ]}
          sources={[
            { label: 'Official IELTS Academic Reading format', href: IELTS_ACADEMIC_URL, note: 'Confirms Note Completion as completing notes with words from the text or a supplied list and that a stated word limit is binding.' },
            { label: 'WeLearn practice blueprint', note: 'Defines heading-led search, held-back transfer, local persistence and the client-key security boundary.' },
          ]}
        />
      )}
      independentPractice={[
        'Read all note headings and predict each group’s passage zone.',
        'Predict the grammatical category required by every blank.',
        'Record the exact passage span used for each response.',
        'Submit the full set once, then repair only weak heading-to-evidence links.',
      ]}
      checklist={[
        'you can explain what each note group is collecting before you search',
        'you use the heading and bullet grammar together to locate evidence',
        'every inserted span is exact, natural and within the displayed limit',
        'you can explain why a nearby true detail belongs to another note group',
      ]}
      faqs={ROUTE.faqs}
      officialNote="Note Completion is an official IELTS Academic Reading task family. This page is guided WeLearn practice; answer keys reach the browser for feedback, so it is not a secure Exam or proctored mode. Candidate sources provide context but do not by themselves establish authorship, rights clearance or complete factual verification."
      nextLinks={[
        { href: '/practica/ielts/reading/tipos-de-preguntas/table-completion', label: 'Continue to Table Completion', primary: true },
        { href: '/practica/ielts/reading/habilidades/limite-de-palabras', label: 'Strengthen word-limit control' },
        { href: '/practica/ielts/reading/habilidades/scanning', label: 'Strengthen scanning' },
        { href: '/practica/ielts/reading/mixed-practice', label: 'Open Mixed Practice' },
        { href: '/practica/ielts/reading', label: 'Back to Reading hub' },
      ]}
    />
  );
}
