/**
 * Lo que `model-answers` aporta y no está en ningún otro sitio.
 *
 * QUÉ SE MIDIÓ
 *
 * La página traía **cinco ensayos modelo escritos a mano, y ninguno de los cinco existe en el
 * banco de 25**. Dos juegos de modelos desconectados: los del banco están compuestos con los
 * mismos párrafos que el alumno trabaja en `body-1`, `body-2` y `conclusion`; estos cinco no
 * salían de ninguna parte y no llevaban a ninguna.
 *
 * Se quedan los 25 —que son los que cierran el curso— y se conserva lo que esta página sí
 * aportaba: la comparación entre una versión floja y una fuerte de la misma frase, y la lista
 * de comprobación final. Eso no está duplicado en ningún módulo.
 */

export type WeakStrongPair = {
  id: string;
  /** Qué se está intentando escribir en las dos versiones. */
  job: string;
  weak: string;
  strong: string;
  why: string;
};

export const WEAK_STRONG: WeakStrongPair[] = [
  {
    id: 'thesis',
    job: 'A thesis for “University education should be free. To what extent do you agree?”',
    weak: 'Nowadays education is very important and everybody has different opinions. I think it is good because students need it and the government should do something.',
    strong: 'University education should be free, because tuition fees keep capable students out of professional careers for reasons that have nothing to do with ability.',
    why: 'The weak version could open an essay on almost any topic — swap “education” for “transport” and it still works. That is the test: if a sentence survives having its subject replaced, it is not answering this prompt. The strong version names the position and the reason for it in one line.',
  },
  {
    id: 'evaluation',
    job: 'An evaluation for an outweigh prompt about remote work',
    weak: 'There are many advantages and disadvantages and both are important. It depends on the person and society.',
    strong: 'Although remote work reduces the informal contact that keeps teams aligned, its benefits outweigh that cost: it returns commuting hours to employees and opens jobs to people outside one city.',
    why: '“It depends” is the one answer an outweigh prompt rules out. The strong version concedes the drawback and then says which side is heavier and why — the concession is what makes the verdict credible rather than assertive.',
  },
  {
    id: 'example',
    job: 'Evidence inside a body paragraph',
    weak: 'For example, in many countries this problem is very common and affects a lot of people every year.',
    strong: 'Singapore\'s transport authority reported that its rail expansion cut private car use by 28% between 2010 and 2022.',
    why: 'The weak version has the shape of evidence — “for example” — and carries no information: no place, no figure, no period. An example does its job when a reader could in principle go and check it.',
  },
];

/** Lo último que se mira antes de entregar. Preguntas, no consejos. */
export const CHECKLIST: { question: string; why: string }[] = [
  {
    question: 'Does the introduction answer the exact instruction, not the topic?',
    why: 'Most essays that lose marks here are about the right subject and answer a question nobody asked.',
  },
  {
    question: 'Does every body paragraph have one main idea you could state in a sentence?',
    why: 'If you cannot say it in one sentence, the paragraph is carrying two ideas and developing neither.',
  },
  {
    question: 'Does each idea come with a mechanism or a consequence, not just a label?',
    why: '“Pollution is a problem” is a label. What it does to whom, and how, is the paragraph.',
  },
  {
    question: 'Does the conclusion answer the prompt without introducing anything new?',
    why: 'A new argument in the last paragraph has nowhere left to be developed, so it counts against you rather than for you.',
  },
  {
    question: 'Could this essay be reused for a different prompt without rewriting it?',
    why: 'If yes, it is too general. This is the fastest check there is, and the one people skip.',
  },
];
