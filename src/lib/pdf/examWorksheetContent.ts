import type { MockExam, MockSection, Question } from '@/data/mocks/types';
import { CURRENT_LISTENING_ORDER, listeningDisplayOptions, type ListeningOrderVersion } from '@/data/toefl/listening-option-order';

export type WorksheetQuestion = { label: string; lines: string[]; response: 'choice' | 'short' | 'writing' | 'speaking' };
export type WorksheetSection = { title: string; instructions: string; passage?: string; audio?: boolean; questions: WorksheetQuestion[] };

const numberFromId = (id: string, fallback: number) => Number(id.match(/(\d+)$/)?.[1] ?? fallback);
const options = (values: string[]) => values.map((value, index) => `${String.fromCharCode(65 + index)}. ${value}`);
const withBlanks = (template: string) => template.replace(/\{\{(\d+)\}\}/g, (_match, number: string) => `[${number}] ____________________`);

/** Whitelist of learner-facing fields. Keys, transcripts, rationales and editorial scripts never enter the PDF model. */
export function worksheetQuestion(question: Question, position: number, exam: 'goethe' | 'toefl', listeningOrderVersion: ListeningOrderVersion = CURRENT_LISTENING_ORDER): WorksheetQuestion {
  const label = exam === 'goethe' && (question.type === 'mcq' || question.type === 'dialog')
    ? `Aufgabe ${numberFromId(question.id, position)}`
    : `Question ${position}`;
  switch (question.type) {
    case 'mcq':
    case 'dialog':
      return { label, response: 'choice', lines: [question.stimulusLabel, question.stimulus, question.text, ...options(question.options)].filter((line): line is string => !!line) };
    case 'toefl-listening-single':
      return { label, response: 'choice', lines: [question.mediaStatus === 'script-ready-audio-blocked' ? 'Audio pending: this item is not scored.' : undefined, question.text, ...listeningDisplayOptions(question, listeningOrderVersion).map(option => `${option.label}. ${option.text}`)].filter((line): line is string => !!line) };
    case 'toefl-reading-single':
    case 'toefl-reading-multi':
      return { label, response: 'choice', lines: [question.text, ...(question.type === 'toefl-reading-multi' ? [`Choose ${question.selectCount} answers.`] : []), ...question.options.map(option => `${option.label}. ${option.text}`)] };
    case 'wordcomplete': {
      const given = new Map(question.blanks.map(blank => [blank.num, blank]));
      return { label: 'Complete the Words', response: 'short', lines: [question.instructions ?? '', question.template.replace(/\{\{(\d+)\}\}/g, (_match, raw: string) => {
        const blank = given.get(Number(raw));
        return `[${raw}] ${blank?.prefix ?? ''}________${blank?.suffix ?? ''}`;
      })].filter(Boolean) };
    }
    case 'toefl-build-sentence':
      return { label, response: 'short', lines: [question.context, `Reply: ${question.replyPrefix} __________ ${question.replySuffix}`, `Tiles: ${question.tiles.map(tile => tile.text).join('  /  ')}`] };
    case 'sentencebuild':
      return { label, response: 'short', lines: [question.prompt ?? 'Build a sentence.', `Tiles: ${question.tiles.join('  /  ')}`] };
    case 'formgroup':
      return { label: `Aufgaben ${question.qRange[0]}–${question.qRange[1]}`, response: 'short', lines: [question.groupLabel, question.title, question.example ? `Beispiel: ${question.example}` : undefined, withBlanks(question.template)].filter((line): line is string => !!line) };
    case 'write':
      return { label: question.stimulusLabel ?? `Writing task ${question.taskNumber}`, response: 'writing', lines: [question.stimulus, question.text] };
    case 'repeat':
      return { label: `Listen and Repeat · ${question.itemNumber}`, response: 'speaking', lines: [question.mediaStatus === 'script-ready-audio-blocked' ? 'Audio pending: this item is not scored.' : 'Listen to the sentence on the live practice page and repeat it aloud.'] };
    case 'speak':
      return { label: exam === 'goethe' ? `Sprechen · Teil ${question.partNumber}` : `Take an Interview · ${question.partNumber}`, response: 'speaking', lines: [question.mediaStatus === 'script-ready-audio-blocked' ? 'Audio pending: this item is not scored.' : question.text, ...(exam === 'goethe' && question.cueCard ? [question.cueCard] : [])] };
    case 'multiselect':
      return { label, response: 'choice', lines: [question.text, `Choose ${question.selectCount} answers.`, ...question.options.map(option => `${option.letter}. ${option.text}`)] };
    case 'fill':
      return { label, response: 'short', lines: [question.stimulus ?? '', question.text].filter(Boolean) };
    case 'tablegroup':
      return { label: `Questions ${question.qRange[0]}–${question.qRange[1]}`, response: 'short', lines: [question.groupLabel, question.headers.join(' | '), ...question.rows.map(row => row.map(cell => typeof cell === 'string' ? cell : `[${cell.num}] ________`).join(' | '))] };
    case 'matching':
      return { label, response: 'short', lines: [question.groupLabel ?? '', ...question.endings.map(end => `${end.letter}. ${end.text}`), ...question.items.map(item => `${item.num}. ${item.stem} ______`)].filter(Boolean) };
  }
}

export function examWorksheetSections(sections: readonly MockSection[], exam: 'goethe' | 'toefl', listeningOrderVersion: ListeningOrderVersion = CURRENT_LISTENING_ORDER): WorksheetSection[] {
  return sections.map(section => ({
    title: section.title,
    instructions: section.instructions,
    passage: section.passage,
    audio: !!section.audioUrl || section.skill === 'listening' || section.skill === 'speaking',
    questions: section.questions.map((question, index) => worksheetQuestion(question, index + 1, exam, listeningOrderVersion)),
  }));
}

export function worksheetForMock(mock: MockExam, sections: readonly MockSection[] = mock.sections, listeningOrderVersion: ListeningOrderVersion = CURRENT_LISTENING_ORDER) {
  if (mock.examSlug !== 'goethe' && mock.examSlug !== 'toefl') throw new Error('Unsupported worksheet exam');
  return examWorksheetSections(sections, mock.examSlug, listeningOrderVersion);
}
