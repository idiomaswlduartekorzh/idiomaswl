import type { IcfesPracticeQuestion, IcfesQuestionOption } from './questions';
import { getSimulacro } from '@/data/mocks/icfes-simulacros';

const DEFINITIONS: Record<string, string> = {
  cold: 'A cold is a common illness; it is not an action, person, place or treatment.',
  cough: 'A cough is the action or sound of forcing air from the throat.',
  cry: 'To cry is to produce tears, often because of sadness or pain.',
  doctor: 'A doctor is the professional who examines and treats a sick person.',
  hospital: 'A hospital is the place where people receive medical care.',
  medicine: 'Medicine is a substance taken to treat pain or illness.',
  'stomach-ache': 'A stomach-ache is pain felt in the stomach area.',
};

const REVIEW: Record<number, { explanation: string; evidence: string; evidenceReason: string; lesson: string; lessonBody: string }> = {
  1: { explanation: 'Cry es la única opción que describe una acción que una persona puede hacer por tristeza o enfermedad.', evidence: 'do this when they feel really sad', evidenceReason: '“Do this” exige una acción y “sad” conecta directamente con cry.', lesson: 'Busca la categoría gramatical', lessonBody: 'La frase “do this” anticipa un verbo. Esa pista descarta enfermedades, personas, lugares y objetos antes de traducir.' },
  2: { explanation: 'Medicine es algo que una persona puede tomar para aliviar un dolor de cabeza.', evidence: 'take this ... headache', evidenceReason: 'La combinación take + problema de salud selecciona un tratamiento.', lesson: 'Aprende colocaciones', lessonBody: 'En inglés se dice take medicine. Las colocaciones son pares de palabras que suelen aparecer juntas.' },
  3: { explanation: 'Doctor es la persona a quien consultas cuando estás enfermo o herido.', evidence: 'see this person', evidenceReason: 'Person limita las opciones a una profesión y see a doctor es la expresión natural.', lesson: 'La pista puede estar en el pronombre', lessonBody: 'This person pide una persona; this place pediría un lugar. Usa esas palabras funcionales para descartar.' },
  4: { explanation: 'Hospital es el lugar al que puedes ir cuando necesitas atención para tu cuerpo.', evidence: 'go to this place', evidenceReason: 'Place exige un lugar y el contexto de enfermedad identifica hospital.', lesson: 'Distingue persona y lugar', lessonBody: 'Doctor es una persona; hospital es un lugar. En bancos temáticos, reconocer la clase de respuesta ahorra tiempo.' },
  5: { explanation: 'Stomach-ache es el dolor que puede aparecer después de comer demasiado.', evidence: 'have this when you eat too much', evidenceReason: 'La consecuencia descrita es un malestar del estómago, no una persona, lugar o medicamento.', lesson: 'Usa causa y consecuencia', lessonBody: 'La causa “eat too much” permite predecir un problema digestivo antes de mirar el banco de palabras.' },
};

export const GUIDED_WORKBOOK_IDS = ['icfes-2023-g11'] as const;

export function getGuidedWorkbookQuestions(examId: string): IcfesPracticeQuestion[] {
  if (examId !== 'icfes-2023-g11') return [];
  const exam = getSimulacro(examId);
  if (!exam) return [];

  return exam.questions.slice(0, 5).map((question) => {
    const review = REVIEW[question.n];
    if (!review) throw new Error(`Falta revisión guiada para ${examId}-q${question.n}`);
    const options: IcfesQuestionOption[] = question.options.map((option, index) => ({
      text: option,
      rationale: index === question.answer
        ? `${DEFINITIONS[option]} Esta definición sí cumple todas las pistas.`
        : `${DEFINITIONS[option]} Por eso no cumple la descripción completa.`,
      ...(index === question.answer ? {} : { trap: index % 2 === 0 ? 'categoría incorrecta' as const : 'pista parcial' as const }),
    }));

    return {
      id: `${exam.id}-guided-q${question.n}`,
      officialPart: 1,
      skill: 'vocabulary_basic',
      subskill: 'health',
      type: 'word-match',
      difficulty: question.n <= 2 ? 'base' : 'estandar',
      stimulus: 'Health',
      stimulusLabel: 'Banco temático del cuadernillo',
      wordBank: question.vocabWords,
      prompt: question.stem,
      options,
      answerIndex: question.answer,
      explanation: review.explanation,
      evidence: { quote: review.evidence, reason: review.evidenceReason },
      strategy: 'Clasifica primero la respuesta como acción, persona, lugar, problema o tratamiento; después comprueba la pista semántica.',
      microLesson: { title: review.lesson, body: review.lessonBody },
      targetSeconds: 30,
      tags: ['official-workbook', 'health', 'guided-pilot'],
      reinforcement: { label: 'Practicar vocabulario relacionado', href: '/practica/icfes-saber-11/vocabulario' },
      source: { type: 'official-workbook', reference: exam.source },
      reviewedAt: '2026-08-03',
      editorialStatus: 'published',
    };
  });
}
