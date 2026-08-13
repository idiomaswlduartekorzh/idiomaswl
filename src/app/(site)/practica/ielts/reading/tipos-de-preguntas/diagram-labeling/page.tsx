import type { Metadata } from 'next';
import InternationalReadingSkillLesson from '@/components/exam-practice/InternationalReadingSkillLesson';
import SkillReviewSourceBlock from '@/components/exam-practice/SkillReviewSourceBlock';
import {
  DiagramLabelingGuidedPractice,
  DiagramLabelingIndependentPractice,
  DiagramLabelingProgressEngine,
} from '@/components/exam-practice/DiagramLabelingPracticeLab';
import {
  DIAGRAM_LABELING_GUIDED_PASSAGE_ID,
  DIAGRAM_LABELING_INDEPENDENT_PASSAGE_ID,
  DIAGRAM_LABELING_OFFICIAL_FORMAT_URL as IELTS_ACADEMIC_URL,
  getDiagramLabelingPassage,
} from '@/data/practica-exams/ielts-reading-diagram-labeling-progress';
import { IELTS_READING_TYPES, PRACTICE_BASE_URL } from '@/data/practica-exams/seo-catalog';

const ROUTE = IELTS_READING_TYPES.find((item) => item.slug === 'diagram-labeling')!;
const TITLE = 'Diagram Labeling: turn visual position into a search target';
const DESCRIPTION = 'Read the complete visual first, classify every marked zone and connect position, function and exact passage evidence before writing a label within the displayed word limit.';
const guidedPassage = getDiagramLabelingPassage(DIAGRAM_LABELING_GUIDED_PASSAGE_ID)!;
const independentPassage = getDiagramLabelingPassage(DIAGRAM_LABELING_INDEPENDENT_PASSAGE_ID)!;

export const metadata: Metadata = {
  title: 'IELTS Diagram Labeling: Method, Practice and Progress',
  description: DESCRIPTION,
  keywords: ROUTE.keywords,
  alternates: { canonical: `${PRACTICE_BASE_URL}${ROUTE.path}` },
  openGraph: { title: TITLE, description: DESCRIPTION, url: `${PRACTICE_BASE_URL}${ROUTE.path}`, type: 'website', locale: 'en_US' },
};

export default function Page() {
  return <InternationalReadingSkillLesson
    slug="diagram-labeling"
    path={ROUTE.path}
    indexPath="/practica/ielts/reading/tipos-de-preguntas"
    indexName="Reading Question Types"
    lessonLabel="IELTS Academic Reading · Question type"
    name="Diagram Labeling"
    title={TITLE}
    description={DESCRIPTION}
    accent="#0369a1"
    directAnswer="Read the title and every visible marker before searching. Name the marked zone, use position and function to locate the matching description, then copy the smallest exact span that labels that component naturally."
    facts={[
      { label: 'Target', value: 'Part, location or component' },
      { label: 'Evidence', value: 'Marker + zone + detailed description' },
      { label: 'Main risk', value: 'Searching without mapping the visual' },
    ]}
    outcomes={[
      { title: 'Read the visual globally', text: 'Identify the machine, building, layout or system before solving one marker.' },
      { title: 'Translate position into language', text: 'Convert each marker, layer and direction into a precise passage search target.' },
      { title: 'Control the final label', text: 'Copy an exact span that fits the marked component, grammar and word limit.' },
    ]}
    method={[
      { title: 'Read the instruction', text: 'Confirm the answer source and the maximum number of words.' },
      { title: 'Map the complete diagram', text: 'Read the title, markers, arrows, layers and neighbouring labels before searching.' },
      { title: 'Predict the component', text: 'Name its zone, likely function and required word form.' },
      { title: 'Locate and reconnect', text: 'Find the detailed description, copy the smallest exact span and reread the finished label.' },
    ]}
    weakExample="Search the passage for every noun in the topic and choose the first phrase that sounds technical."
    strongExample="Marker E points to an external layer beside the window, so scan the shading paragraph for the named device outside the glass and reject materials from the thermal core."
    practice={<DiagramLabelingGuidedPractice passage={guidedPassage} />}
    independentPracticeExperience={<DiagramLabelingIndependentPractice passage={independentPassage} />}
    progressEngine={<DiagramLabelingProgressEngine />}
    sourceReview={<SkillReviewSourceBlock
      accent="#0369a1"
      skillName="Diagram Labeling"
      reviewedFocus={[
        'Guided, independent and Progress Engine passage pools are separated.',
        'Every answer uses a visible marker, named zone, positional landmark, literal evidence and displayed maximum.',
        'Feedback diagnoses visual-zone, neighbouring-part, direction, grammar, word-boundary and copied-context errors.',
        'WeLearn publication authorization and candidate factual context remain distinct.',
      ]}
      sources={[
        { label: 'Official IELTS Academic Reading format', href: IELTS_ACADEMIC_URL, note: 'Confirms that Diagram Label Completion relates a detailed text description to labels on a machine, building or other visual and that the stated word limit is binding.' },
        { label: 'WeLearn practice blueprint', note: 'Defines visual mapping, held-back transfer, local persistence and the client-key security boundary.' },
      ]}
    />}
    independentPractice={[
      'Read the complete visual and name every marked zone before scanning.',
      'Record the marker, landmark and exact passage evidence used for each label.',
      'Submit the full diagram once, without opening hints or feedback.',
      'Repair only the labels that confuse position, function, grammar or answer boundary.',
    ]}
    checklist={[
      'you can explain what the diagram represents before solving individual labels',
      'you translate each marker and neighbouring part into a precise search target',
      'every inserted span is exact, natural and within the displayed limit',
      'you can explain why a nearby true phrase labels a different component',
    ]}
    faqs={ROUTE.faqs}
    officialNote="Diagram Label Completion is an official IELTS Academic Reading task family. This page is guided WeLearn practice; answer keys reach the browser for feedback, so it is not a secure Exam or proctored mode. Candidate sources provide factual context but do not independently verify every composite claim or license WeLearn wording."
    nextLinks={[
      { href: '/practica/ielts/reading/tipos-de-preguntas/short-answer', label: 'Continue to Short Answer', primary: true },
      { href: '/practica/ielts/reading/habilidades/scanning', label: 'Strengthen scanning' },
      { href: '/practica/ielts/reading/habilidades/limite-de-palabras', label: 'Strengthen word-limit control' },
      { href: '/practica/ielts/reading/mixed-practice', label: 'Open Mixed Practice' },
      { href: '/practica/ielts/reading', label: 'Back to Reading hub' },
    ]}
  />;
}
