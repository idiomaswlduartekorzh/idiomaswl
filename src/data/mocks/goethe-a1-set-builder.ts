import type { MockExam } from './types';

export type AudioRole = 'narrator' | 'announcer' | 'female' | 'male';
export type AudioTurn = { voice: AudioRole; text: string };
export type ListeningItem = {
  question: string;
  options: string[];
  answer: number;
  turns: AudioTurn[];
  visual: string;
};
export type GoetheA1SetContent = {
  number: number;
  listeningExample: { question: string; options: string[]; answer: number; turns: AudioTurn[]; visual: string };
  listening1: ListeningItem[];
  listening2: Array<Omit<ListeningItem, 'visual'>>;
  listening3: Array<Omit<ListeningItem, 'visual'>>;
  readingMessages: { textA: string; textB: string; questions: Array<{ label: 'Text A' | 'Text B'; text: string; answer: number }> };
  readingAds: Array<{ situation: string; adA: string; adB: string; answer: number; visual: string }>;
  readingSigns: Array<{ label: string; stimulus: string; text: string; answer: number }>;
  form: { scenario: string; title: string; example: string; template: string; blanks: Array<{ answers: string[]; maxWords?: number }> };
  writing: { label: string; stimulus: string; bullets: [string, string, string] };
  speaking2: [string, string];
  speaking3: [string[], string[]];
};

const listeningIntro = {
  1: 'Hören, Teil eins. Sie hören sechs kurze Gespräche. Zu jedem Gespräch gibt es eine Aufgabe. Wählen Sie A, B oder C. Sie hören jeden Text zweimal.',
  2: 'Hören, Teil zwei. Sie hören vier Ansagen. Entscheiden Sie: richtig oder falsch. Sie hören jeden Text einmal.',
  3: 'Hören, Teil drei. Sie hören fünf Nachrichten am Telefon. Wählen Sie A, B oder C. Sie hören jeden Text zweimal.',
};

export function buildGoetheA1Set(content: GoetheA1SetContent): MockExam {
  const prefix = `g-a1-${content.number}`;
  return {
    id: `a1-${content.number}`,
    examSlug: 'goethe',
    title: `A1 – Simulacro ${content.number} · formato Start Deutsch 1`,
    subtitle: 'Hören · Lesen · Schreiben · Sprechen · contenido original WeLearn',
    timeMinutes: 80,
    sections: [
      {
        part: 1, skill: 'listening', title: 'Hören – Teil 1: Kurze Gespräche',
        instructions: 'Was ist richtig? Wählen Sie A, B oder C. Sie hören jeden Text zweimal.',
        audioUrl: `/audio/goethe/a1-${content.number}/hoeren-teil1.mp3?v=20260912`,
        questions: content.listening1.map((item, index) => ({ type: 'mcq' as const, id: `${prefix}-h${index + 1}`, part: 1, text: item.question, options: item.options, answer: item.answer })),
      },
      {
        part: 2, skill: 'listening', title: 'Hören – Teil 2: Ansagen',
        instructions: 'Kreuzen Sie an: Richtig oder Falsch. Sie hören jeden Text einmal.',
        audioUrl: `/audio/goethe/a1-${content.number}/hoeren-teil2.mp3?v=20260912`,
        questions: content.listening2.map((item, index) => ({ type: 'mcq' as const, id: `${prefix}-h${index + 7}`, part: 2, text: item.question, options: ['Richtig', 'Falsch'], answer: item.answer })),
      },
      {
        part: 3, skill: 'listening', title: 'Hören – Teil 3: Telefonische Nachrichten',
        instructions: 'Was ist richtig? Wählen Sie A, B oder C. Sie hören jeden Text zweimal.',
        audioUrl: `/audio/goethe/a1-${content.number}/hoeren-teil3.mp3?v=20260912`,
        questions: content.listening3.map((item, index) => ({ type: 'mcq' as const, id: `${prefix}-h${index + 11}`, part: 3, text: item.question, options: item.options, answer: item.answer })),
      },
      {
        part: 4, skill: 'reading', title: 'Lesen – Teil 1: Nachrichten',
        instructions: 'Lesen Sie zuerst Text A und die Aufgaben 1 bis 2. Lesen Sie danach Text B und die Aufgaben 3 bis 5. Kreuzen Sie an: Richtig oder Falsch.',
        passageTitle: 'Persönliche Nachrichten',
        passage: `TEXT A\n\n${content.readingMessages.textA}\n\nTEXT B\n\n${content.readingMessages.textB}`,
        questions: content.readingMessages.questions.map((item, index) => ({ type: 'mcq' as const, id: `${prefix}-l${index + 1}`, part: 4, stimulusLabel: item.label, text: item.text, options: ['Richtig', 'Falsch'], answer: item.answer })),
      },
      {
        part: 5, skill: 'reading', title: 'Lesen – Teil 2: Anzeigen und Internetseiten',
        instructions: 'Wo finden Sie die richtige Information? Lesen Sie die Situation und wählen Sie A oder B.',
        questions: content.readingAds.map((item, index) => ({ type: 'mcq' as const, id: `${prefix}-l${index + 6}`, part: 5, stimulusLabel: item.situation, stimulus: `A — ${item.adA}\n\nB — ${item.adB}`, stimulusStyle: 'notice' as const, text: 'Welche Anzeige passt?', options: ['A', 'B'], answer: item.answer })),
      },
      {
        part: 6, skill: 'reading', title: 'Lesen – Teil 3: Schilder und Hinweise',
        instructions: 'Lesen Sie die Texte und die Aufgaben 11 bis 15. Kreuzen Sie an: Richtig oder Falsch.',
        questions: content.readingSigns.map((item, index) => ({ type: 'mcq' as const, id: `${prefix}-l${index + 11}`, part: 6, stimulusLabel: item.label, stimulus: item.stimulus, stimulusStyle: 'sign' as const, text: item.text, options: ['Richtig', 'Falsch'], answer: item.answer })),
      },
      {
        part: 7, skill: 'writing', title: 'Schreiben – Teil 1: Formular',
        instructions: 'In dem Formular fehlen fünf Informationen. Helfen Sie Ihrer Freundin oder Ihrem Freund und schreiben Sie die fünf fehlenden Informationen in das Formular.',
        questions: [{
          type: 'formgroup', id: `${prefix}-s1`, part: 7, qRange: [1, 5], groupLabel: `${content.form.scenario} Bitte tragen Sie die Daten ein.`,
          title: content.form.title, example: content.form.example, template: content.form.template,
          blanks: content.form.blanks.map((blank, index) => ({ num: index + 1, ...blank })),
        }],
      },
      {
        part: 8, skill: 'writing', title: 'Schreiben – Teil 2: Kurze Mitteilung',
        instructions: 'Schreiben Sie einen kurzen Text. Schreiben Sie zu jedem Punkt ein bis zwei Sätze sowie eine Anrede und einen Gruß.',
        questions: [{ type: 'write', id: `${prefix}-s2`, part: 8, taskNumber: 1, stimulusLabel: content.writing.label, stimulus: content.writing.stimulus, text: `${content.writing.bullets.map(value => `• ${value}`).join('\n')}\n\nSchreiben Sie circa 30 Wörter. Schreiben Sie auch eine Anrede und einen Gruß.`, minWords: 30 }],
      },
      { part: 9, skill: 'speaking', title: 'Sprechen – Teil 1: Sich vorstellen', instructions: 'Stellen Sie sich vor. Buchstabieren Sie danach Ihren Familiennamen und nennen Sie eine Telefonnummer.', questions: [{ type: 'speak', id: `${prefix}-sp1`, part: 9, partNumber: 1, text: 'Name · Alter · Land · Wohnort · Sprachen · Beruf · Hobby\n\nDanach: Familienname buchstabieren und Telefonnummer nennen.' }] },
      { part: 10, skill: 'speaking', title: 'Sprechen – Teil 2: Um Informationen bitten und Informationen geben', instructions: 'Formulieren Sie zu jeder Karte eine Frage. Antworten Sie auf die Frage Ihrer Partnerin oder Ihres Partners.', questions: [{ type: 'speak', id: `${prefix}-sp2`, part: 10, partNumber: 2, text: `Runde 1: ${content.speaking2[0].split('\n')[0]} · Runde 2: ${content.speaking2[1].split('\n')[0]}`, cueCard: content.speaking2.join('\n\n') }] },
      { part: 11, skill: 'speaking', title: 'Sprechen – Teil 3: Bitten formulieren und darauf reagieren', instructions: 'Formulieren Sie zwei höfliche Bitten. Reagieren Sie auf zwei Bitten Ihrer Partnerin oder Ihres Partners.', questions: [{ type: 'speak', id: `${prefix}-sp3`, part: 11, partNumber: 3, text: 'Benutzen Sie die Bildkarten. Beispiel: „Können Sie mir bitte das Salz geben?“ – „Ja, gern.“', cueCard: `ALLTAG\n${content.speaking3[0].join(' · ')}\n\nUNTERWEGS\n${content.speaking3[1].join(' · ')}` }] },
    ],
  };
}

export function buildGoetheA1AudioManifest(content: GoetheA1SetContent) {
  return {
    version: `2026-09-12-audio-set-${content.number}`,
    locale: 'de-DE',
    status: 'script-ready-audio-blocked',
    production: { provider: 'ElevenLabs', generateLast: true, manifest: `/audio/goethe/a1-${content.number}/manifest.json`, cueFrequenciesHz: [990, 831, 698], cueDurationSeconds: 2.1, targetLufs: -18, format: 'mp3 mono 44.1 kHz 64 kbps' },
    parts: [
      { id: 1, plays: 2, intro: listeningIntro[1], example: { question: content.listeningExample.question, options: content.listeningExample.options, answer: content.listeningExample.answer, turns: content.listeningExample.turns }, items: content.listening1.map((item, index) => ({ number: index + 1, turns: item.turns })) },
      { id: 2, plays: 1, intro: listeningIntro[2], example: { question: 'Die Information ist richtig.', options: ['Richtig', 'Falsch'], answer: 0, turns: [{ voice: 'announcer', text: 'Liebe Gäste. Das Informationsbüro öffnet heute wie immer um neun Uhr.' }] }, items: content.listening2.map((item, index) => ({ number: index + 7, turns: item.turns })) },
      { id: 3, plays: 2, intro: listeningIntro[3], items: content.listening3.map((item, index) => ({ number: index + 11, turns: item.turns })), outro: 'Ende des Tests Hören. Übertragen und kontrollieren Sie jetzt Ihre Lösungen eins bis fünfzehn. Dafür haben Sie drei Minuten Zeit.' },
    ],
  };
}
