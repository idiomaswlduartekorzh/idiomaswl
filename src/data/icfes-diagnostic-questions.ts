import type { DiagnosticQuestion } from '@/lib/types/icfes'

/**
 * The 20-question ICFES English diagnostic.
 *
 * Static content (not DB-seeded): two items per measurable reading/vocabulary/
 * grammar skill, ordered roughly easy → hard so the student warms up. Each
 * answer stored during the test records this question's `id` as `question_key`.
 *
 * Skills intentionally excluded: `time_management` cannot be assessed by a
 * single MCQ (it is measured from pacing across full mocks instead).
 */
export const ICFES_DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  // ── Vocabulary (basic) ────────────────────────────────────────────────────
  {
    id: 'diag-01',
    question_number: 1,
    skill: 'vocabulary_basic',
    difficulty: 1,
    question_text: "You see this sign on a shop door: “PUSH”. What should you do?",
    option_a: 'Pull the door toward you',
    option_b: 'Push the door away from you',
    option_c: 'Wait for someone to open it',
    option_d: 'Knock three times',
    correct_answer: 'B',
    explanation_es:
      '“Push” significa empujar. Es una señal muy común en puertas; lo opuesto es “Pull” (halar).',
  },
  {
    id: 'diag-02',
    question_number: 2,
    skill: 'vocabulary_basic',
    difficulty: 2,
    question_text: "Complete the sentence: “I'm really thirsty. I need some ___.”",
    option_a: 'water',
    option_b: 'shoes',
    option_c: 'paper',
    option_d: 'music',
    correct_answer: 'A',
    explanation_es:
      '“Thirsty” significa tener sed, así que lo lógico es pedir “water” (agua).',
  },

  // ── Vocabulary in context ─────────────────────────────────────────────────
  {
    id: 'diag-03',
    question_number: 3,
    skill: 'vocabulary_context',
    difficulty: 2,
    question_text:
      "“The hikers were exhausted after climbing for six hours.” The word “exhausted” is closest in meaning to:",
    option_a: 'excited',
    option_b: 'very tired',
    option_c: 'hungry',
    option_d: 'lost',
    correct_answer: 'B',
    explanation_es:
      'El contexto (escalar seis horas) indica que “exhausted” significa muy cansado, no emocionado.',
  },
  {
    id: 'diag-04',
    question_number: 4,
    skill: 'vocabulary_context',
    difficulty: 3,
    question_text:
      "“Although the plan seemed risky, it turned out to be a huge success.” Here, “risky” means:",
    option_a: 'safe',
    option_b: 'cheap',
    option_c: 'dangerous',
    option_d: 'boring',
    correct_answer: 'C',
    explanation_es:
      '“Risky” significa arriesgado/peligroso. El conector “although” contrasta ese riesgo con el éxito final.',
  },

  // ── Grammar recognition ───────────────────────────────────────────────────
  {
    id: 'diag-05',
    question_number: 5,
    skill: 'grammar_recognition',
    difficulty: 2,
    question_text: "Complete: “Yesterday, she ___ to the library to study.”",
    option_a: 'go',
    option_b: 'goes',
    option_c: 'went',
    option_d: 'going',
    correct_answer: 'C',
    explanation_es:
      '“Yesterday” marca pasado simple. El pasado irregular de “go” es “went”.',
  },
  {
    id: 'diag-06',
    question_number: 6,
    skill: 'grammar_recognition',
    difficulty: 3,
    question_text: "Complete: “This book is ___ than the one I read last week.”",
    option_a: 'interesting',
    option_b: 'more interesting',
    option_c: 'most interesting',
    option_d: 'interestingly',
    correct_answer: 'B',
    explanation_es:
      'La palabra “than” exige un comparativo. Con adjetivos largos se usa “more + adjetivo”.',
  },

  // ── Connectors ────────────────────────────────────────────────────────────
  {
    id: 'diag-07',
    question_number: 7,
    skill: 'connectors',
    difficulty: 2,
    question_text:
      "Complete: “I wanted to go to the beach, ___ it was raining all day.”",
    option_a: 'so',
    option_b: 'but',
    option_c: 'because',
    option_d: 'and',
    correct_answer: 'B',
    explanation_es:
      'Hay contraste entre el deseo (ir a la playa) y el obstáculo (la lluvia): el conector es “but”.',
  },
  {
    id: 'diag-08',
    question_number: 8,
    skill: 'connectors',
    difficulty: 3,
    question_text:
      "Complete: “She studied hard; ___, she passed the exam with the highest score.”",
    option_a: 'however',
    option_b: 'therefore',
    option_c: 'although',
    option_d: 'instead',
    correct_answer: 'B',
    explanation_es:
      'Relación de causa-consecuencia: estudió duro, “therefore” (por lo tanto) obtuvo el mejor puntaje.',
  },

  // ── Reference words ───────────────────────────────────────────────────────
  {
    id: 'diag-09',
    question_number: 9,
    skill: 'reference_words',
    difficulty: 3,
    question_text:
      "“María bought a new phone. She uses it to take photos every day.” The word “it” refers to:",
    option_a: 'María',
    option_b: 'the phone',
    option_c: 'the photos',
    option_d: 'the day',
    correct_answer: 'B',
    explanation_es:
      '“It” es singular y se refiere a una cosa: “the phone”, lo que María usa para tomar fotos.',
  },
  {
    id: 'diag-10',
    question_number: 10,
    skill: 'reference_words',
    difficulty: 3,
    question_text:
      "“The students finished their projects. They presented them on Friday.” The word “them” refers to:",
    option_a: 'the students',
    option_b: 'the projects',
    option_c: 'Friday',
    option_d: 'the teachers',
    correct_answer: 'B',
    explanation_es:
      '“Them” es el objeto que se presenta: “the projects”. “They” serían los estudiantes.',
  },

  // ── Main idea ─────────────────────────────────────────────────────────────
  {
    id: 'diag-11',
    question_number: 11,
    skill: 'main_idea',
    difficulty: 3,
    passage:
      'Recycling helps the environment in many ways. It reduces the amount of waste in landfills, saves energy, and protects natural resources. For these reasons, many cities now encourage recycling programs.',
    question_text: 'What is the main idea of the text?',
    option_a: 'Cities are building more landfills.',
    option_b: 'Recycling has several environmental benefits.',
    option_c: 'Energy is becoming very expensive.',
    option_d: 'Natural resources will never run out.',
    correct_answer: 'B',
    explanation_es:
      'La idea principal reúne todos los beneficios mencionados (residuos, energía, recursos): “several environmental benefits”. Las demás son detalles o ideas falsas.',
  },
  {
    id: 'diag-12',
    question_number: 12,
    skill: 'main_idea',
    difficulty: 3,
    passage:
      'Regular exercise improves both physical and mental health. It strengthens the heart, boosts mood, and helps people sleep better at night.',
    question_text: 'The text is mainly about:',
    option_a: 'how to build big muscles',
    option_b: 'the benefits of regular exercise',
    option_c: 'common sleeping disorders',
    option_d: 'the causes of heart disease',
    correct_answer: 'B',
    explanation_es:
      'El texto enumera beneficios del ejercicio; la idea central es “the benefits of regular exercise”. Lo demás son detalles sueltos.',
  },

  // ── Detail ────────────────────────────────────────────────────────────────
  {
    id: 'diag-13',
    question_number: 13,
    skill: 'detail',
    difficulty: 2,
    passage:
      'The city museum opens at 9 a.m. from Tuesday to Sunday. It is closed on Mondays. Entry is free for children under 12.',
    question_text: 'According to the text, when is the museum closed?',
    option_a: 'On Sundays',
    option_b: 'On Mondays',
    option_c: 'At 9 a.m. every day',
    option_d: 'On weekends',
    correct_answer: 'B',
    explanation_es:
      'Es un detalle explícito: “It is closed on Mondays” (cerrado los lunes).',
  },
  {
    id: 'diag-14',
    question_number: 14,
    skill: 'detail',
    difficulty: 3,
    passage:
      'To register for the course, students must submit their application before May 15 and pay a $20 fee at the front desk.',
    question_text: 'What must students do to register?',
    option_a: 'Pay a $50 fee',
    option_b: 'Apply after May 15',
    option_c: 'Submit an application and pay a fee',
    option_d: 'Attend a personal interview',
    correct_answer: 'C',
    explanation_es:
      'El texto pide dos acciones: enviar la solicitud antes del 15 de mayo y pagar la cuota de $20.',
  },

  // ── Inference ─────────────────────────────────────────────────────────────
  {
    id: 'diag-15',
    question_number: 15,
    skill: 'inference',
    difficulty: 4,
    passage:
      'Ana grabbed her umbrella and her rubber boots before leaving the house, glancing nervously at the dark clouds outside.',
    question_text: 'What can we infer from the text?',
    option_a: 'It is a hot, sunny day.',
    option_b: 'Ana expects it to rain.',
    option_c: 'Ana is going to the beach to swim.',
    option_d: 'Ana has lost her shoes.',
    correct_answer: 'B',
    explanation_es:
      'El texto no dice “va a llover”, pero el paraguas, las botas y las nubes oscuras permiten inferir que Ana espera lluvia.',
  },
  {
    id: 'diag-16',
    question_number: 16,
    skill: 'inference',
    difficulty: 4,
    passage:
      'When the teacher returned the exams, Luis smiled widely and immediately called his parents to tell them the news.',
    question_text: 'We can infer that Luis:',
    option_a: 'failed the exam',
    option_b: 'did well on the exam',
    option_c: 'was absent that day',
    option_d: 'lost his phone',
    correct_answer: 'B',
    explanation_es:
      'Sonreír ampliamente y llamar de inmediato a los padres sugiere un buen resultado, aunque no se afirme directamente.',
  },

  // ── Paraphrase ────────────────────────────────────────────────────────────
  {
    id: 'diag-17',
    question_number: 17,
    skill: 'paraphrase',
    difficulty: 3,
    question_text:
      "“The company decided to postpone the meeting until next week.” Which sentence keeps the same meaning?",
    option_a: 'The company canceled the meeting completely.',
    option_b: 'The company moved the meeting to a later date.',
    option_c: 'The company held the meeting earlier than planned.',
    option_d: 'The company forgot about the meeting.',
    correct_answer: 'B',
    explanation_es:
      '“Postpone” significa aplazar. “Moved the meeting to a later date” conserva ese significado; “cancel” sería eliminarla.',
  },
  {
    id: 'diag-18',
    question_number: 18,
    skill: 'paraphrase',
    difficulty: 4,
    question_text: "“Few students attended the lecture.” This sentence means that:",
    option_a: 'Many students were there.',
    option_b: 'Almost no students were there.',
    option_c: 'Every student attended.',
    option_d: 'The lecture was canceled.',
    correct_answer: 'B',
    explanation_es:
      '“Few” (sin “a”) tiene sentido negativo: casi ninguno. Cuidado: “a few” sí significaría “algunos”.',
  },

  // ── Purpose ───────────────────────────────────────────────────────────────
  {
    id: 'diag-19',
    question_number: 19,
    skill: 'purpose',
    difficulty: 3,
    passage: 'WARNING: Do not touch. High voltage. Risk of electric shock.',
    question_text: 'The main purpose of this text is to:',
    option_a: 'advertise a new product',
    option_b: 'warn people about a danger',
    option_c: 'give directions to a place',
    option_d: 'tell an interesting story',
    correct_answer: 'B',
    explanation_es:
      '“Warning” y “High voltage / risk of electric shock” muestran que el propósito es advertir sobre un peligro.',
  },
  {
    id: 'diag-20',
    question_number: 20,
    skill: 'purpose',
    difficulty: 4,
    passage:
      'Dear residents, please remember to separate your recyclables from your regular trash. The bins will be collected every Wednesday morning. Thank you for your cooperation.',
    question_text: 'Why was this text most likely written?',
    option_a: 'To sell recycling bins to residents',
    option_b: 'To inform residents about recycling collection',
    option_c: 'To complain about noisy neighbors',
    option_d: 'To describe a holiday celebration',
    correct_answer: 'B',
    explanation_es:
      'Es un aviso dirigido a los residentes que informa cómo y cuándo se recogen los reciclables: su propósito es informar.',
  },
]
