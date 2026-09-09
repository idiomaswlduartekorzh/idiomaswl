import 'server-only';

import { getMock } from '@/data/mocks';
import {
  getIcfesPaidDetailAvailability,
  getSimulacro,
  getSimulacroForPaidDetail,
  getSimulacroQuestionPart,
  type Simulacro,
} from '@/data/mocks/icfes-simulacros';
import type { MCQQuestion, MockExam, MockSection } from '@/data/mocks/types';

export function simulacroToMockExam(sim: Simulacro): MockExam {
  const groups: Array<{
    key: string;
    type: Simulacro['questions'][number]['type'];
    passageId?: string;
    qs: Simulacro['questions'];
  }> = [];
  for (const question of sim.questions) {
    const key = question.type === 'gap' || question.type === 'reading'
      ? `${question.type}-${question.passageId ?? ''}` : question.type;
    const last = groups.at(-1);
    if (last?.key === key) last.qs.push(question);
    else groups.push({ key, type: question.type, passageId: question.passageId, qs: [question] });
  }

  const sections: MockSection[] = groups.map((group) => {
    const first = group.qs[0];
    if (!first) throw new Error(`Empty section in ${sim.id}`);
    const part = getSimulacroQuestionPart(sim, first.n);
    const passage = group.passageId ? sim.passages.find((item) => item.id === group.passageId) : undefined;
    const base = (question: Simulacro['questions'][number], overrides: Partial<MCQQuestion> = {}): MCQQuestion => ({
      type: 'mcq', id: `${sim.id}-q${question.n}`, part, text: question.stem,
      options: question.options, answer: question.answer, ...overrides,
    });
    if (group.type === 'notice') return {
      part, title: `Parte ${part} — Avisos e instrucciones`,
      instructions: 'Lee cada aviso. Elige la respuesta que mejor responde a cada pregunta.',
      sectionStyle: 'notices-grid',
      questions: group.qs.map((question) => base(question, {
        stimulus: question.passageId ? sim.passages.find((item) => item.id === question.passageId)?.text ?? '' : '',
        stimulusStyle: 'notice',
      })),
    } satisfies MockSection;
    if (group.type === 'vocab') return {
      part, title: `Parte ${part} — Vocabulario`,
      instructions: 'Selecciona la palabra que corresponde a cada descripción.',
      sectionStyle: 'matching-grid', topic: 'Vocabulario',
      questions: group.qs.map((question) => base(question, { options: first.vocabWords ?? first.options })),
    } satisfies MockSection;
    if (group.type === 'dialog') return {
      part, title: `Parte ${part} — Conversaciones`,
      instructions: 'Elige la respuesta que mejor completa la conversación.', sectionStyle: 'dialogs-grid',
      questions: group.qs.map((question) => base(question, {
        stimulus: question.stem, stimulusStyle: 'dialog-box', text: '¿Cuál es la mejor respuesta?',
      })),
    } satisfies MockSection;
    if (group.type === 'gap') return {
      part, title: `Parte ${part} — Completar el texto`,
      instructions: 'Elige la opción que mejor completa cada espacio.', sectionStyle: 'cloze-text',
      passage: passage?.text.replace(/\[(\d+)\]/g, '($1) ___'), passageTitle: passage?.title,
      questions: group.qs.map((question) => base(question)),
    } satisfies MockSection;
    return {
      part, title: `Parte ${part} — Comprensión de lectura`,
      instructions: 'Elige la opción que mejor responde a cada pregunta.', sectionStyle: 'reading',
      passage: passage?.text, passageTitle: passage?.title,
      questions: group.qs.map((question) => base(question)),
    } satisfies MockSection;
  });
  return { id: sim.id, examSlug: 'icfes', title: sim.title, subtitle: sim.source, timeMinutes: sim.timeMinutes, sections };
}

export function getIcfesSecureExam(examId: string): { exam: MockExam; officialResource: boolean } | null {
  const own = getMock('icfes', examId);
  if (own) return { exam: own, officialResource: false };
  const official = getSimulacro(examId);
  return official ? { exam: simulacroToMockExam(official), officialResource: true } : null;
}

export function getIcfesPaidExam(examId: string): MockExam | null {
  const official = getSimulacro(examId);
  if (official) {
    // Both policy gates are intentionally consumed here. The second call can only
    // return content after provenance and legal review make the first eligible.
    const availability = getIcfesPaidDetailAvailability(examId);
    if (!availability.eligible) return null;
    const paid = getSimulacroForPaidDetail(examId);
    return paid ? simulacroToMockExam(paid) : null;
  }
  return getMock('icfes', examId);
}

export function getIcfesPremiumAvailability(examId: string): { eligible: boolean; reason?: string } {
  const official = getSimulacro(examId);
  if (!official) return { eligible: Boolean(getMock('icfes', examId)) };
  const availability = getIcfesPaidDetailAvailability(examId);
  return availability.eligible ? { eligible: true } : { eligible: false, reason: availability.reason };
}

export function sanitizeIcfesMock(exam: MockExam): MockExam {
  return {
    ...exam,
    sections: exam.sections.map((section) => ({
      ...section,
      insights: undefined,
      questions: section.questions.map((question) => {
        if (question.type !== 'mcq' && question.type !== 'dialog') return question;
        const publicQuestion: Omit<MCQQuestion, 'answer'> & { answer?: number } = { ...question };
        delete publicQuestion.answer;
        return publicQuestion as MCQQuestion;
      }),
    })),
  };
}
