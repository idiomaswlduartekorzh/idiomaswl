import type { VocabularyWord } from '@/lib/types/icfes'

/**
 * High-frequency ICFES English vocabulary (first tier).
 *
 * Static content, version-controlled. Grouped roughly by difficulty: everyday
 * academic verbs, then linking words (connectors), then contextual/academic
 * vocabulary that recurs in ICFES reading passages. Each student's spaced-
 * repetition progress is keyed by `id` in icfes_vocabulary_progress.
 *
 * This is a curated starter set; expand toward the 300-word target in batches.
 */
export const ICFES_VOCABULARY: VocabularyWord[] = [
  // ── Tier 1: everyday academic verbs / words ───────────────────────────────
  { id: 'voc-001', word: 'increase', pos: 'verb', es: 'aumentar', example_en: 'Sales increased last year.', skill: 'vocabulary_basic', difficulty: 1 },
  { id: 'voc-002', word: 'decrease', pos: 'verb', es: 'disminuir', example_en: 'The temperature decreased at night.', skill: 'vocabulary_basic', difficulty: 1 },
  { id: 'voc-003', word: 'provide', pos: 'verb', es: 'proporcionar, dar', example_en: 'The school provides free books.', skill: 'vocabulary_basic', difficulty: 2 },
  { id: 'voc-004', word: 'require', pos: 'verb', es: 'requerir, necesitar', example_en: 'This job requires experience.', skill: 'vocabulary_basic', difficulty: 2 },
  { id: 'voc-005', word: 'improve', pos: 'verb', es: 'mejorar', example_en: 'She wants to improve her English.', skill: 'vocabulary_basic', difficulty: 1 },
  { id: 'voc-006', word: 'reduce', pos: 'verb', es: 'reducir', example_en: 'We must reduce plastic waste.', skill: 'vocabulary_basic', difficulty: 2 },
  { id: 'voc-007', word: 'avoid', pos: 'verb', es: 'evitar', example_en: 'Try to avoid junk food.', skill: 'vocabulary_basic', difficulty: 2 },
  { id: 'voc-008', word: 'allow', pos: 'verb', es: 'permitir', example_en: 'The rules allow one guest.', skill: 'vocabulary_basic', difficulty: 2 },
  { id: 'voc-009', word: 'achieve', pos: 'verb', es: 'lograr, alcanzar', example_en: 'He achieved his goal.', skill: 'vocabulary_basic', difficulty: 2 },
  { id: 'voc-010', word: 'offer', pos: 'verb', es: 'ofrecer', example_en: 'They offer a discount to students.', skill: 'vocabulary_basic', difficulty: 1 },
  { id: 'voc-011', word: 'spend', pos: 'verb', es: 'gastar, pasar (tiempo)', example_en: "Don't spend all your money.", skill: 'vocabulary_basic', difficulty: 1 },
  { id: 'voc-012', word: 'save', pos: 'verb', es: 'ahorrar, guardar', example_en: 'I save money every month.', skill: 'vocabulary_basic', difficulty: 1 },
  { id: 'voc-013', word: 'borrow', pos: 'verb', es: 'pedir prestado', example_en: 'Can I borrow your pen?', skill: 'vocabulary_basic', difficulty: 2 },
  { id: 'voc-014', word: 'lend', pos: 'verb', es: 'prestar', example_en: 'She lent me a book.', skill: 'vocabulary_basic', difficulty: 2 },
  { id: 'voc-015', word: 'choose', pos: 'verb', es: 'elegir, escoger', example_en: 'You can choose any color.', skill: 'vocabulary_basic', difficulty: 1 },
  { id: 'voc-016', word: 'nowadays', pos: 'adverb', es: 'hoy en día', example_en: 'Nowadays, most people use smartphones.', skill: 'vocabulary_basic', difficulty: 2 },

  // ── Tier 2: connectors / linking words ────────────────────────────────────
  { id: 'voc-017', word: 'however', pos: 'connector', es: 'sin embargo', example_en: 'It was expensive; however, I bought it.', skill: 'connectors', difficulty: 2 },
  { id: 'voc-018', word: 'although', pos: 'connector', es: 'aunque', example_en: 'Although it rained, we went out.', skill: 'connectors', difficulty: 2 },
  { id: 'voc-019', word: 'because', pos: 'connector', es: 'porque', example_en: 'She left because she was tired.', skill: 'connectors', difficulty: 1 },
  { id: 'voc-020', word: 'therefore', pos: 'connector', es: 'por lo tanto', example_en: 'He studied hard; therefore, he passed.', skill: 'connectors', difficulty: 3 },
  { id: 'voc-021', word: 'despite', pos: 'connector', es: 'a pesar de', example_en: 'Despite the noise, she slept well.', skill: 'connectors', difficulty: 3 },
  { id: 'voc-022', word: 'whereas', pos: 'connector', es: 'mientras que', example_en: 'He likes tea, whereas she likes coffee.', skill: 'connectors', difficulty: 4 },
  { id: 'voc-023', word: 'nevertheless', pos: 'connector', es: 'no obstante', example_en: 'It was hard; nevertheless, they finished.', skill: 'connectors', difficulty: 4 },
  { id: 'voc-024', word: 'unless', pos: 'connector', es: 'a menos que', example_en: "You'll fail unless you study.", skill: 'connectors', difficulty: 3 },
  { id: 'voc-025', word: 'in contrast', pos: 'phrase', es: 'en contraste', example_en: 'In contrast, the second plan was cheaper.', skill: 'connectors', difficulty: 3 },
  { id: 'voc-026', word: 'for instance', pos: 'phrase', es: 'por ejemplo', example_en: 'Some fruits, for instance apples, are cheap.', skill: 'connectors', difficulty: 2 },
  { id: 'voc-027', word: 'moreover', pos: 'connector', es: 'además', example_en: "It's cheap; moreover, it's fast.", skill: 'connectors', difficulty: 3 },
  { id: 'voc-028', word: 'otherwise', pos: 'connector', es: 'de lo contrario', example_en: "Hurry, otherwise we'll be late.", skill: 'connectors', difficulty: 3 },

  // ── Tier 3: contextual / academic vocabulary ──────────────────────────────
  { id: 'voc-029', word: 'enact', pos: 'verb', es: 'promulgar (una ley)', example_en: 'The government enacted a new law.', skill: 'vocabulary_context', difficulty: 4 },
  { id: 'voc-030', word: 'ambiguous', pos: 'adjective', es: 'ambiguo', example_en: 'His answer was ambiguous.', skill: 'vocabulary_context', difficulty: 4 },
  { id: 'voc-031', word: 'persevere', pos: 'verb', es: 'perseverar', example_en: 'She persevered despite the difficulties.', skill: 'vocabulary_context', difficulty: 4 },
  { id: 'voc-032', word: 'refute', pos: 'verb', es: 'refutar', example_en: 'The scientist refuted the theory.', skill: 'vocabulary_context', difficulty: 5 },
  { id: 'voc-033', word: 'eradicate', pos: 'verb', es: 'erradicar', example_en: 'They aim to eradicate the disease.', skill: 'vocabulary_context', difficulty: 4 },
  { id: 'voc-034', word: 'subtle', pos: 'adjective', es: 'sutil', example_en: 'There was a subtle change in his tone.', skill: 'vocabulary_context', difficulty: 4 },
  { id: 'voc-035', word: 'coherent', pos: 'adjective', es: 'coherente', example_en: 'She gave a coherent explanation.', skill: 'vocabulary_context', difficulty: 3 },
  { id: 'voc-036', word: 'infer', pos: 'verb', es: 'inferir, deducir', example_en: 'We can infer his mood from his words.', skill: 'inference', difficulty: 3 },
  { id: 'voc-037', word: 'imply', pos: 'verb', es: 'implicar, insinuar', example_en: 'His silence implied disagreement.', skill: 'inference', difficulty: 3 },
  { id: 'voc-038', word: 'emphasize', pos: 'verb', es: 'enfatizar, destacar', example_en: 'The teacher emphasized the main idea.', skill: 'vocabulary_context', difficulty: 3 },
  { id: 'voc-039', word: 'significant', pos: 'adjective', es: 'significativo, importante', example_en: 'There was a significant increase.', skill: 'vocabulary_context', difficulty: 3 },
  { id: 'voc-040', word: 'previous', pos: 'adjective', es: 'anterior, previo', example_en: 'See the previous chapter.', skill: 'reference_words', difficulty: 2 },
  { id: 'voc-041', word: 'current', pos: 'adjective', es: 'actual', example_en: 'The current situation is stable.', skill: 'vocabulary_context', difficulty: 2 },
  { id: 'voc-042', word: 'reliable', pos: 'adjective', es: 'confiable', example_en: 'This is a reliable source.', skill: 'vocabulary_context', difficulty: 3 },
  { id: 'voc-043', word: 'accurate', pos: 'adjective', es: 'preciso, exacto', example_en: 'Give an accurate description.', skill: 'vocabulary_context', difficulty: 3 },
  { id: 'voc-044', word: 'relevant', pos: 'adjective', es: 'relevante, pertinente', example_en: 'Include only relevant details.', skill: 'vocabulary_context', difficulty: 3 },

  // ── Tier 4: reading-comprehension verbs ───────────────────────────────────
  { id: 'voc-045', word: 'indicate', pos: 'verb', es: 'indicar, señalar', example_en: 'The arrow indicates the exit.', skill: 'detail', difficulty: 3 },
  { id: 'voc-046', word: 'suggest', pos: 'verb', es: 'sugerir', example_en: 'The data suggests a trend.', skill: 'inference', difficulty: 3 },
  { id: 'voc-047', word: 'claim', pos: 'verb', es: 'afirmar, sostener', example_en: 'The author claims that exercise helps.', skill: 'main_idea', difficulty: 3 },
  { id: 'voc-048', word: 'conclude', pos: 'verb', es: 'concluir', example_en: 'We can conclude that the plan worked.', skill: 'main_idea', difficulty: 3 },
]

/** Fast lookup by stable id. */
export const VOCABULARY_BY_ID: Record<string, VocabularyWord> = Object.fromEntries(
  ICFES_VOCABULARY.map((w) => [w.id, w])
)
