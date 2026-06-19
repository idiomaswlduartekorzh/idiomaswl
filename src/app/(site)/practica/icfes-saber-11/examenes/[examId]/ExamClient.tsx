'use client';

import PracticeClient from '@/app/(site)/examenes/[exam]/practica/[mockId]/PracticeClient';
import { EXAMS } from '@/data/exams';
import type { Simulacro } from '@/data/mocks/icfes-simulacros';
import type { MCQQuestion, MockExam, MockSection } from '@/data/mocks/types';

// ── Simulacro → MockExam converter ───────────────────────────────────────────
//
// Groups flat Simulacro questions into MockSection[] by type+passageId,
// then maps each to the correct sectionStyle so PracticeClient renders
// the specialized section UI (notices-grid, matching-grid, dialogs-grid,
// cloze-text, reading) exactly as Mock 1 does.

function simulacroToMockExam(sim: Simulacro): MockExam {
  // --- 1. Group consecutive questions by type+passageId ---
  const groups: {
    key: string;
    type: Simulacro['questions'][number]['type'];
    passageId?: string;
    qs: Simulacro['questions'];
  }[] = [];

  for (const q of sim.questions) {
    const key =
      q.type === 'gap' || q.type === 'reading'
        ? `${q.type}-${q.passageId ?? ''}`
        : q.type;
    const last = groups[groups.length - 1];
    if (last && last.key === key) {
      last.qs.push(q);
    } else {
      groups.push({ key, type: q.type, passageId: q.passageId, qs: [q] });
    }
  }

  // --- 2. Build MockSection[] ---
  const sections: MockSection[] = groups.map((g, i) => {
    const part = i + 1;
    const passage = g.passageId
      ? sim.passages.find(p => p.id === g.passageId)
      : undefined;

    const baseQ = (q: Simulacro['questions'][number], overrides: Partial<MCQQuestion> = {}): MCQQuestion => ({
      type: 'mcq',
      id: `${sim.id}-q${q.n}`,
      part,
      text: q.stem,
      options: q.options,
      answer: q.answer,
      ...overrides,
    });

    switch (g.type) {

      case 'notice': {
        return {
          part,
          title: `Parte ${part} — Avisos e instrucciones`,
          instructions:
            'Lee cada aviso. Elige la respuesta (A, B o C) que mejor responde a cada pregunta.',
          sectionStyle: 'notices-grid',
          questions: g.qs.map(q => {
            const qPassage = q.passageId
              ? sim.passages.find(p => p.id === q.passageId)
              : undefined;
            return baseQ(q, {
              stimulus: qPassage?.text ?? '',
              stimulusStyle: 'notice',
            });
          }),
        } satisfies MockSection;
      }

      case 'vocab': {
        // Word bank comes from vocabWords on the first question
        const wordBank = g.qs[0]?.vocabWords ?? g.qs[0]?.options ?? [];
        return {
          part,
          title: `Parte ${part} — Vocabulario`,
          instructions:
            'Selecciona la palabra del banco de palabras que corresponde a cada descripción.',
          sectionStyle: 'matching-grid',
          topic: 'Vocabulario',
          // exampleText / exampleAnswer intentionally omitted → shown without example block
          questions: g.qs.map(q =>
            baseQ(q, {
              text: q.stem,
              options: wordBank,
              answer: q.answer,
            })
          ),
        } satisfies MockSection;
      }

      case 'dialog': {
        return {
          part,
          title: `Parte ${part} — Conversaciones`,
          instructions:
            'Lee cada enunciado. Elige la respuesta (A, B o C) que mejor completa la conversación.',
          sectionStyle: 'dialogs-grid',
          questions: g.qs.map(q =>
            baseQ(q, {
              stimulus: q.stem,
              stimulusStyle: 'dialog-box',
              text: '¿Cuál es la mejor respuesta?',
            })
          ),
        } satisfies MockSection;
      }

      case 'gap': {
        // Convert [n] markers → (n) ___ for renderClozePassage()
        const passageText = passage?.text.replace(/\[(\d+)\]/g, '($1) ___') ?? '';
        return {
          part,
          title: `Parte ${part} — Completar el texto`,
          instructions:
            'Lee el texto. Elige la opción (A, B, C o D) que mejor completa cada espacio.',
          sectionStyle: 'cloze-text',
          passage: passageText,
          passageTitle: passage?.title,
          questions: g.qs.map(q => baseQ(q)),
        } satisfies MockSection;
      }

      case 'reading': {
        return {
          part,
          title: `Parte ${part} — Comprensión de lectura`,
          instructions:
            'Lee el texto. Elige la opción (A, B, C o D) que mejor responde a cada pregunta.',
          sectionStyle: 'reading',
          passage: passage?.text,
          passageTitle: passage?.title,
          questions: g.qs.map(q => baseQ(q)),
        } satisfies MockSection;
      }
    }
  });

  return {
    id: sim.id,
    examSlug: 'icfes',
    title: sim.title,
    subtitle: sim.source,
    timeMinutes: sim.timeMinutes,
    sections,
  };
}

// ── Wrapper component ─────────────────────────────────────────────────────────

export default function ExamClient({ exam: sim }: { exam: Simulacro }) {
  const exam = EXAMS['icfes'];
  const mock = simulacroToMockExam(sim);
  return <PracticeClient exam={exam} mock={mock} />;
}
