import golden from './goethe-a2-golden-set-1';
import type { MockExam, MockSection } from './types';

const transcript = (turns: { speaker: string; text: string }[]) => turns
  .map(turn => `${turn.speaker}: ${turn.text}`)
  .join('\n');

const listeningSections: MockSection[] = [
  {
    part: 5, skill: 'listening', title: 'Hören – Teil 1: Kurze Texte',
    instructions: 'Sie hören fünf kurze Texte. Wählen Sie A, B oder C. Sie hören jeden Text zweimal.',
    mediaId: 'goethe-a2-1-master', mediaStatus: 'script-ready-audio-blocked', comingSoon: true,
    transcript: golden.listening.parts[0].items.map(item => transcript(item.turns)).join('\n\n'),
    questions: golden.listening.parts[0].items.map(item => ({ type: 'mcq' as const, id: item.id, part: 5, text: item.prompt, options: item.options, answer: item.answer })),
  },
  {
    part: 6, skill: 'listening', title: 'Hören – Teil 2: Ein Gespräch',
    instructions: 'Sie hören ein Gespräch einmal. Ordnen Sie den fünf Aufgaben die passenden Bilder A bis I zu.',
    mediaId: 'goethe-a2-1-master', mediaStatus: 'script-ready-audio-blocked', comingSoon: true,
    transcript: transcript(golden.listening.parts[1].turns),
    questions: [{ type: 'matching', id: 'g-a2-1-h2', part: 6, qRange: [6, 10], groupLabel: 'Welche Orte besuchen Anna und Yusuf? Wählen Sie A bis I.', imageUrl: golden.listening.parts[1].visualAsset, imageAlt: golden.listening.parts[1].visualAlt, items: golden.listening.parts[1].items.map((item, index) => ({ num: index + 6, stem: item.prompt, answer: item.answer })), endings: golden.listening.parts[1].options.map(option => ({ letter: option.letter, text: option.label })) }],
  },
  {
    part: 7, skill: 'listening', title: 'Hören – Teil 3: Kurze Gespräche',
    instructions: 'Sie hören fünf kurze Gespräche einmal. Wählen Sie zu jedem Gespräch das richtige Bild A, B oder C.',
    mediaId: 'goethe-a2-1-master', mediaStatus: 'script-ready-audio-blocked', comingSoon: true,
    transcript: golden.listening.parts[2].items.map(item => transcript(item.turns)).join('\n\n'),
    questions: golden.listening.parts[2].items.map(item => ({ type: 'mcq' as const, id: item.id, part: 7, text: item.prompt, options: item.options, answer: item.answer, imageUrl: item.visualAsset, imageAlt: item.visualAlt })),
  },
  {
    part: 8, skill: 'listening', title: 'Hören – Teil 4: Radiointerview',
    instructions: 'Sie hören ein Radiointerview zweimal. Lesen Sie die Aussagen und wählen Sie Ja oder Nein.',
    mediaId: 'goethe-a2-1-master', mediaStatus: 'script-ready-audio-blocked', comingSoon: true,
    transcript: transcript(golden.listening.parts[3].turns),
    questions: golden.listening.parts[3].items.map(item => ({ type: 'mcq' as const, id: item.id, part: 8, text: item.statement, options: ['Ja', 'Nein'], answer: item.answer ? 0 : 1 })),
  },
];

const [reading1, reading2, reading3, readingMatching] = golden.reading.parts;

const readingSections: MockSection[] = [reading1, reading2, reading3].map((part, index) => ({
  part: index + 1, skill: 'reading', title: `Lesen – Teil ${part.part}: ${part.title}`,
  instructions: 'Lesen Sie den Text und die Aufgaben. Wählen Sie A, B oder C.', passageTitle: part.title, passage: part.text,
  questions: part.items.map(item => ({ type: 'mcq' as const, id: item.id, part: index + 1, text: item.prompt, options: item.options, answer: item.answer })),
}));

const mock: MockExam = {
  id: golden.id, examSlug: 'goethe', title: golden.title,
  subtitle: '13 partes · 45 respuestas · contenido original WeLearn · audio pendiente', timeMinutes: 105,
  sections: [
    ...readingSections,
    {
      part: 4, skill: 'reading', title: `Lesen – Teil 4: ${readingMatching.title}`,
      instructions: 'Lesen Sie die Situationen 1 bis 5 und die Anzeigen A bis F. Welche Anzeige passt? Für eine Situation gibt es keine passende Anzeige: Wählen Sie X.',
      passageTitle: 'Anzeigen A bis F', passage: readingMatching.adverts.map(ad => `${ad.letter} · ${ad.heading}\n${ad.text}`).join('\n\n'),
      questions: [{ type: 'matching', id: 'g-a2-1-r4', part: 4, qRange: [16, 20], groupLabel: `BEISPIEL: ${readingMatching.example.profile} → ${readingMatching.example.answer}`, items: readingMatching.profiles.map((profile, index) => ({ num: index + 16, stem: profile.text, answer: profile.answer })), endings: [...readingMatching.adverts.map(ad => ({ letter: ad.letter, text: `${ad.heading} — ${ad.text}` })), { letter: 'X', text: 'Keine Anzeige passt.' }] }],
    },
    ...listeningSections,
    {
      part: 9, skill: 'writing', title: 'Schreiben – Teil 1: Persönliche Nachricht', instructions: 'Schreiben Sie 20 bis 30 Wörter. Schreiben Sie zu allen drei Punkten.',
      questions: [{ type: 'write', id: 'g-a2-1-w1', part: 9, taskNumber: 1, stimulusLabel: 'Nachricht an Mara', stimulus: golden.writing.tasks[0].situation, text: golden.writing.tasks[0].functions.map(value => `• ${value}`).join('\n'), minWords: 20 }],
    },
    {
      part: 10, skill: 'writing', title: 'Schreiben – Teil 2: Halbformelle E-Mail', instructions: 'Schreiben Sie 30 bis 40 Wörter. Schreiben Sie zu allen drei Punkten.',
      questions: [{ type: 'write', id: 'g-a2-1-w2', part: 10, taskNumber: 2, stimulusLabel: `E-Mail an ${golden.writing.tasks[1].addressee}`, stimulus: golden.writing.tasks[1].situation, text: golden.writing.tasks[1].functions.map(value => `• ${value}`).join('\n'), minWords: 30 }],
    },
    {
      part: 11, skill: 'speaking', title: 'Sprechen – Teil 1: Fragen zur Person', instructions: 'Stellen Sie Ihrer Partnerin oder Ihrem Partner vier Fragen. Antworten Sie auf vier Fragen.',
      questions: [{ type: 'speak', id: 'g-a2-1-sp1', part: 11, partNumber: 1, text: 'Fragen Sie und antworten Sie mit vollständigen kurzen Sätzen.', cueCard: `KARTE A\n${golden.speaking.tasks[0].candidateA.join(' · ')}\n\nKARTE B\n${golden.speaking.tasks[0].candidateB.join(' · ')}` }],
    },
    {
      part: 12, skill: 'speaking', title: 'Sprechen – Teil 2: Von sich erzählen', instructions: 'Sprechen Sie über das Thema und gehen Sie auf die vier Punkte ein.',
      questions: [{ type: 'speak', id: 'g-a2-1-sp2', part: 12, partNumber: 2, text: golden.speaking.tasks[1].prompt, cueCard: golden.speaking.tasks[1].cues.join(' · '), followUp: golden.speaking.tasks[1].followUps }],
    },
    {
      part: 13, skill: 'speaking', title: 'Sprechen – Teil 3: Gemeinsam planen', instructions: 'Machen Sie Vorschläge, reagieren Sie und einigen Sie sich auf einen Termin.',
      questions: [{ type: 'speak', id: 'g-a2-1-sp3', part: 13, partNumber: 3, text: golden.speaking.tasks[2].situation, imageUrls: [golden.speaking.tasks[2].candidateAAsset, golden.speaking.tasks[2].candidateBAsset], imageAlts: [golden.speaking.tasks[2].candidateAAlt, golden.speaking.tasks[2].candidateBAlt] }],
    },
  ],
};

export default mock;
