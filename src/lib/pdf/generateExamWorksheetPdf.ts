import type { MockExam, MockSection } from '@/data/mocks/types';
import { createBrandedDoc, GRAY, INK, NAVY, SOFT } from '@/lib/pdf/brandedDoc';
import { worksheetForMock } from '@/lib/pdf/examWorksheetContent';
import { WELEARN_PDF_BASE_URL } from '@/lib/welearn-pdf-standards';
import type { ListeningOrderVersion } from '@/data/toefl/listening-option-order';

type WorksheetScope = { sections?: readonly MockSection[]; label?: string; sourcePath?: string; listeningOrderVersion?: ListeningOrderVersion };

const GOETHE_LISTENING_IMAGES: Record<string, string[]> = {
  'a1-1': ['jacke', 'uhrzeit', 'essen', 'flaschen', 'bibliothek', 'reise'],
  'a1-2': ['rucksack', 'uhrzeit', 'getraenk', 'postkarten', 'apotheke', 'flughafen'],
};

function goetheListeningImage(mockId: string, number: number): string {
  const suffix = GOETHE_LISTENING_IMAGES[mockId]?.[number - 1];
  return `/images/goethe/${mockId}/hoeren-teil1-${String(number).padStart(2, '0')}${suffix ? `-${suffix}` : ''}.png`;
}

async function imageData(url: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    const blob = await response.blob();
    return await new Promise<string | null>(resolve => {
      const reader = new FileReader();
      reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : null);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch { return null; }
}

export async function generateExamWorksheetPdf(mock: MockExam, scope: WorksheetScope = {}) {
  const exam = mock.examSlug;
  if (exam !== 'goethe' && exam !== 'toefl') throw new Error('Unsupported worksheet exam');
  const sections = scope.sections ?? mock.sections;
  const content = worksheetForMock(mock, sections, scope.listeningOrderVersion);
  const name = exam === 'goethe' ? 'Goethe-Zertifikat A1' : 'TOEFL iBT 2026';
  const sourcePath = scope.sourcePath ?? `/examenes/${exam}/practica/${mock.id}`;
  const api = await createBrandedDoc({
    levelLabel: name,
    skillLabel: scope.label ?? 'Student worksheet',
    title: `${mock.title} · ${scope.label ?? 'Student worksheet'}`,
    subject: 'Printable student questions and blank response spaces, without answer keys or transcripts.',
    keywords: [name, 'student worksheet', mock.id],
    sourceUrl: `${WELEARN_PDF_BASE_URL}${sourcePath}`,
  });
  const { doc, state, title, heading, paragraph, callout, ensure, save } = api;

  title(mock.title, `${name} · Student worksheet`);
  paragraph(scope.label ?? 'All sections', { size: 11, style: 'bold', color: NAVY });
  paragraph('Name: ____________________________________    Date: ____________________', { size: 9.4, gap: 4 });
  callout('How to use this worksheet', exam === 'goethe'
    ? 'Open the live practice page for each Hören audio. Read the prompts, mark your answers, write the form and message, and use the speaking cards with a partner or recorder. This is original WeLearn practice.'
    : 'Open the live practice page for Listening and Speaking audio. Use this paper for Reading, notes and written responses. Audio-only prompts must be heard online. This fixed WeLearn practice does not reproduce adaptive routing or an official score.', [239, 249, 251], [15, 95, 115]);
  paragraph('Student copy · no answer key or audio transcript.', { size: 8.7, color: GRAY, gap: 3 });

  for (const [sectionIndex, section] of content.entries()) {
    if (sectionIndex > 0) api.addPage();
    heading(section.title, { size: 14 });
    paragraph(section.instructions, { size: 9.3, gap: 3 });
    if (section.audio) paragraph('Audio: open the linked live practice page to listen.', { size: 8.6, color: GRAY, gap: 3 });
    if (section.passage) {
      heading('Reading text', { size: 10.5, gapTop: 2 });
      for (const part of section.passage.split(/\n\n/)) paragraph(part, { size: 9.3, gap: 2.5 });
    }
    for (const [questionIndex, question] of section.questions.entries()) {
      ensure(24);
      heading(question.label, { size: 10.5, gapTop: 5, rule: false });
      for (const line of question.lines) {
        for (const part of line.split('\n')) {
          if (!part.trim()) { state.y += 2; continue; }
          paragraph(part, { size: 9.2, indent: /^[A-Z]\.\s/.test(part) ? 4 : 0, gap: 1.5 });
        }
      }
      if (exam === 'goethe' && sections[sectionIndex].part === 1 && questionIndex < 6) {
        const image = await imageData(goetheListeningImage(mock.id, questionIndex + 1));
        if (image) {
          const ratio = doc.getImageProperties(image).width / doc.getImageProperties(image).height;
          const width = 148;
          const height = Math.min(54, width / ratio);
          ensure(height + 5);
          doc.addImage(image, 'PNG', 22, state.y, width, height, undefined, 'FAST');
          state.y += height + 4;
        }
      }
      if (question.response === 'choice') {
        paragraph('Answer: __________', { size: 9, color: GRAY, gap: 2 });
      } else if (question.response === 'short') {
        ensure(8); doc.setDrawColor(...SOFT).line(22, state.y, 188, state.y); state.y += 8;
      } else {
        const count = question.response === 'writing' ? (exam === 'goethe' ? 10 : 17) : 3;
        paragraph(question.response === 'writing' ? 'Your response:' : 'Speaking notes:', { size: 8.8, color: GRAY, gap: 2 });
        for (let line = 0; line < count; line += 1) {
          ensure(8); doc.setDrawColor(...SOFT).line(22, state.y, 188, state.y); state.y += 8;
        }
      }
    }
  }

  api.addPage();
  heading('Blank answer sheet', { size: 15 });
  paragraph('Transfer your final objective answers here. Keep the written responses and speaking notes in their sections.', { size: 9.2, color: GRAY, gap: 5 });
  for (const section of content) {
    if (section.questions.every(question => question.response === 'writing' || question.response === 'speaking')) continue;
    heading(section.title, { size: 10.5, gapTop: 4, rule: false });
    for (const question of section.questions) {
      paragraph(`${question.label}: ____________________________________`, { size: 9, gap: 2 });
      if (question.label === 'Complete the Words') {
        const matches = question.lines.join(' ').matchAll(/\[(\d+)\]/g);
        for (const match of matches) paragraph(`Blank ${match[1]}: ____________________`, { size: 8.8, indent: 5, gap: 1 });
      }
    }
  }
  paragraph('This PDF is original WeLearn practice material, not an official exam paper.', { size: 8.3, color: GRAY });
  save(`${exam}-${mock.id}-${scope.label ? scope.label.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'full'}-student-worksheet-welearn.pdf`);
}
