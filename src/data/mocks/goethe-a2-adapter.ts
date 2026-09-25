import type { GoetheA2Set, GoetheA2Turn } from './goethe-a2-golden-types';
import type { MockExam, MockSection } from './types';

const transcript = (turns: GoetheA2Turn[]) => turns.map(turn => `${turn.speaker}: ${turn.text}`).join('\n');

export function toGoetheA2Mock(set: GoetheA2Set): MockExam {
  const setNumber = Number(set.id.split('-')[1]);
  const mediaId = `goethe-a2-${setNumber}-master`;
  const listeningSections: MockSection[] = [
    {
      part: 5, skill: 'listening', title: 'Hören – Teil 1: Kurze Texte',
      instructions: 'Sie hören fünf kurze Texte. Wählen Sie A, B oder C. Sie hören jeden Text zweimal.',
      mediaId, mediaStatus: 'script-ready-audio-blocked', comingSoon: true,
      transcript: set.listening.parts[0].items.map(item => transcript(item.turns)).join('\n\n'),
      questions: set.listening.parts[0].items.map(item => ({ type: 'mcq' as const, id: item.id, part: 5, text: item.prompt, options: item.options, answer: item.answer })),
    },
    {
      part: 6, skill: 'listening', title: 'Hören – Teil 2: Ein Gespräch',
      instructions: 'Sie hören ein Gespräch einmal. Ordnen Sie dem Beispiel 0 und den fünf Aufgaben die passenden Bilder A bis I zu. Jeden Buchstaben nur einmal.',
      mediaId, mediaStatus: 'script-ready-audio-blocked', comingSoon: true,
      transcript: transcript(set.listening.parts[1].turns),
      questions: [{ type: 'matching', id: `g-a2-${setNumber}-h2`, part: 6, qRange: [6, 10], groupLabel: `${set.listening.parts[1].leadQuestion}\nBEISPIEL: 0 · ${set.listening.parts[1].example.stageLabel} → ${set.listening.parts[1].example.answer}`, imageUrl: set.listening.parts[1].visualAsset, imageAlt: set.listening.parts[1].visualAlt, items: set.listening.parts[1].items.map(item => ({ num: item.number, stem: item.stageLabel, answer: item.answer })), endings: set.listening.parts[1].options.map(option => ({ letter: option.letter, text: option.label })) }],
    },
    {
      part: 7, skill: 'listening', title: 'Hören – Teil 3: Kurze Gespräche',
      instructions: 'Sie hören fünf kurze Gespräche einmal. Wählen Sie zu jedem Gespräch das richtige Bild A, B oder C.',
      mediaId, mediaStatus: 'script-ready-audio-blocked', comingSoon: true,
      transcript: set.listening.parts[2].items.map(item => transcript(item.turns)).join('\n\n'),
      questions: set.listening.parts[2].items.map(item => ({ type: 'mcq' as const, id: item.id, part: 7, text: item.prompt, options: item.options, answer: item.answer, imageUrl: item.visualAsset, imageAlt: item.visualAlt })),
    },
    {
      part: 8, skill: 'listening', title: 'Hören – Teil 4: Radiointerview',
      instructions: `Sie hören ein Radiointerview zweimal. Lesen Sie die Aussagen und wählen Sie Ja oder Nein. BEISPIEL: ${set.listening.parts[3].example.statement} → ${set.listening.parts[3].example.answer ? 'Ja' : 'Nein'}`,
      mediaId, mediaStatus: 'script-ready-audio-blocked', comingSoon: true,
      transcript: transcript(set.listening.parts[3].turns),
      questions: set.listening.parts[3].items.map(item => ({ type: 'mcq' as const, id: item.id, part: 8, text: item.statement, options: ['Ja', 'Nein'], answer: item.answer ? 0 : 1 })),
    },
  ];

  const [reading1, reading2, reading3, readingMatching] = set.reading.parts;
  const readingSections: MockSection[] = [reading1, reading2, reading3].map((part, index) => ({
    part: index + 1, skill: 'reading', title: `Lesen – Teil ${part.part}: ${part.title}`,
    instructions: `Lesen Sie den Text und die Aufgaben. Wählen Sie A, B oder C.${'example' in part ? ` BEISPIEL 0: ${part.example.prompt} → ${['A', 'B', 'C'][part.example.answer]}` : ''}`,
    passageTitle: part.title, passage: part.text,
    questions: part.items.map(item => ({ type: 'mcq' as const, id: item.id, part: index + 1, text: item.prompt, options: item.options, answer: item.answer })),
  }));

  return {
    id: set.id, examSlug: 'goethe', title: set.title,
    subtitle: '13 partes · 45 respuestas · contenido original WeLearn · audio pendiente', timeMinutes: 105,
    sections: [
      ...readingSections,
      {
        part: 4, skill: 'reading', title: `Lesen – Teil 4: ${readingMatching.title}`,
        instructions: 'Lesen Sie die Situationen 1 bis 5 und die Anzeigen A bis F. Welche Anzeige passt? Für eine Situation gibt es keine passende Anzeige: Wählen Sie X.',
        passageTitle: 'Anzeigen A bis F', passage: readingMatching.adverts.map(ad => `${ad.letter} · ${ad.heading}\n${ad.text}`).join('\n\n'),
        questions: [{ type: 'matching', id: `g-a2-${setNumber}-r4`, part: 4, qRange: [16, 20], groupLabel: `BEISPIEL: ${readingMatching.example.profile} → ${readingMatching.example.answer}`, items: readingMatching.profiles.map((profile, index) => ({ num: index + 16, stem: profile.text, answer: profile.answer })), endings: [...readingMatching.adverts.map(ad => ({ letter: ad.letter, text: `${ad.heading} — ${ad.text}` })), { letter: 'X', text: 'Keine Anzeige passt.' }] }],
      },
      ...listeningSections,
      {
        part: 9, skill: 'writing', title: 'Schreiben – Teil 1: Persönliche Nachricht', instructions: 'Schreiben Sie 20 bis 30 Wörter. Schreiben Sie zu allen drei Punkten.',
        questions: [{ type: 'write', id: `g-a2-${setNumber}-w1`, part: 9, taskNumber: 1, stimulusLabel: 'Persönliche Nachricht', stimulus: set.writing.tasks[0].situation, text: set.writing.tasks[0].functions.map(value => `• ${value}`).join('\n'), minWords: 20 }],
      },
      {
        part: 10, skill: 'writing', title: 'Schreiben – Teil 2: Halbformelle E-Mail', instructions: 'Schreiben Sie 30 bis 40 Wörter. Schreiben Sie zu allen drei Punkten.',
        questions: [{ type: 'write', id: `g-a2-${setNumber}-w2`, part: 10, taskNumber: 2, stimulusLabel: `E-Mail an ${set.writing.tasks[1].addressee}`, stimulus: set.writing.tasks[1].situation, text: set.writing.tasks[1].functions.map(value => `• ${value}`).join('\n'), minWords: 30 }],
      },
      {
        part: 11, skill: 'speaking', title: 'Sprechen – Teil 1: Fragen zur Person', instructions: 'Stellen Sie Ihrer Partnerin oder Ihrem Partner vier Fragen. Antworten Sie auf vier Fragen.',
        questions: [{ type: 'speak', id: `g-a2-${setNumber}-sp1`, part: 11, partNumber: 1, text: 'Fragen Sie und antworten Sie mit vollständigen kurzen Sätzen.', cueCard: set.speaking.tasks[0].cards.join(' · ') }],
      },
      {
        part: 12, skill: 'speaking', title: 'Sprechen – Teil 2: Von sich erzählen', instructions: 'Sprechen Sie über das Thema und gehen Sie auf die vier Punkte ein.',
        questions: [{ type: 'speak', id: `g-a2-${setNumber}-sp2`, part: 12, partNumber: 2, text: `KARTE A: ${set.speaking.tasks[1].candidateA.prompt}\nKARTE B: ${set.speaking.tasks[1].candidateB.prompt}`, cueCard: `KARTE A\n${set.speaking.tasks[1].candidateA.cues.join(' · ')}\n\nKARTE B\n${set.speaking.tasks[1].candidateB.cues.join(' · ')}`, followUp: [...set.speaking.tasks[1].candidateA.followUps, ...set.speaking.tasks[1].candidateB.followUps] }],
      },
      {
        part: 13, skill: 'speaking', title: 'Sprechen – Teil 3: Gemeinsam planen', instructions: 'Machen Sie Vorschläge, reagieren Sie und einigen Sie sich auf einen Termin.',
        questions: [{ type: 'speak', id: `g-a2-${setNumber}-sp3`, part: 13, partNumber: 3, text: set.speaking.tasks[2].situation, imageUrls: [set.speaking.tasks[2].candidateAAsset, set.speaking.tasks[2].candidateBAsset], imageAlts: [set.speaking.tasks[2].candidateAAlt, set.speaking.tasks[2].candidateBAlt] }],
      },
    ],
  };
}
