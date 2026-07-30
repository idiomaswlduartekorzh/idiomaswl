import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'imperatif',
  order: '18',
  color: '#1a2ecc',
  category: 'Verbes',
  level: 'A1',
  title: 'L\'Impératif en Français A1 — Ordres et conseils',
  shortTitle: 'L\'impératif',
  metaTitle: 'L\'impératif en français A1 — Mange! / Mangez! / Ne parle pas! — ordres et conseils',
  description:
    'El imperativo francés tiene tres formas: tu (informal singular), nous (sugerencia coloqual) y vous (formal/plural). Los verbos -er pierden la -s final en "tu". Los irregulares être, avoir y aller tienen formas especiales. La negación es ne + verbe + pas.',
  lead: 'Mange! (come tú) / Mangeons! (comamos) / Mangez! (comad/coman). El imperativo francés tiene una trampa: los verbos -er pierden la -s en "tu": "mange" (no "manges"). Pero en preguntas con pronombre se añade: Manges-en!',
  outcomes: [
    'Formar el imperativo de verbos -er, -ir y -re en las tres personas (tu, nous, vous).',
    'Usar la negación: ne + verbe + pas.',
    'Manejar los irregulares: être (sois), avoir (aie), aller (va).',
  ],
  guide: {
    goal: 'Dar órdenes, instrucciones y consejos usando el imperativo en sus tres formas.',
    model: 'Mange ta soupe! / Finissons le travail! / Ne parlez pas en classe! / Sois patient!',
    formula: 'Infinitif − er/ir/re → radice + terminaisons impératives (sans sujet)',
    decisions: [
      'tu: raíz + -e (verbos -er: mange, parle, travaille — SIN -s) o + -s (verbos -ir/-re: finis, prends)',
      'nous: mismo que présent nous-form: mangeons, finissons, prenons',
      'vous: mismo que présent vous-form: mangez, finissez, prenez',
      'Irregulares: être → sois/soyons/soyez; avoir → aie/ayons/ayez; aller → va/allons/allez',
      'Negativa: ne + verbe impératif + pas: Ne mange pas! / Ne finissez pas encore!',
    ],
    table: [
      ['Personne', 'Verbes -er (parler)', 'Verbes -ir/-re (finir/prendre)'],
      ['tu', 'parle! (sin -s)', 'finis! / prends!'],
      ['nous', 'parlons!', 'finissons! / prenons!'],
      ['vous', 'parlez!', 'finissez! / prenez!'],
    ],
    mistakes: [
      '"Parles!" ❌ → "Parle!" ✓ — verbos -er, forma "tu": sin -s. (Excepto con pronom: Parles-en!)',
      '"Ne mange tu pas!" ❌ → "Ne mange pas!" ✓ — sin pronombre en imperativo.',
      '"Soyez bonne!" para "sé buena" ❌ (si hablas a una persona) → "Sois bonne!" (tu) ✓',
    ],
  },
  seo: [
    {
      heading: '¿Cómo se forma el imperativo en francés?',
      paragraphs: [
        'El imperativo francés tiene tres personas: tu (tú/informal singular), nous (nosotros — equivale a "vamos a...") y vous (vosotros/ustedes o el formal singular). A diferencia del español, en el imperativo francés no se incluye el pronombre sujeto: simplemente "Mange!" (¡Come!), no "Tu mange!".',
        'La principal trampa para hispanohablantes es la forma "tu" de los verbos -er: pierde la -s final. El presente es "tu parles" pero el imperativo es "Parle!" (no "Parles!"). Sin embargo, los verbos -ir y -re mantienen la -s: "Finis!" "Prends!". Esta asimetría es la que más confusiones genera en A1.',
      ],
    },
    {
      heading: '¿Cuáles son los imperativos irregulares en francés?',
      paragraphs: [
        'Los tres verbos irregulares más importantes en imperativo son être, avoir y aller. Être: Sois patient! / Soyons calmes! / Soyez prudents! Avoir: Aie confiance! / Ayons du courage! / Ayez patience! Aller: Va chercher le livre! / Allons-y! / Allez tout droit!',
        'Nota: "va" (aller, imperativo tu) no lleva -s, pero si viene seguido de "y": Vas-y! (¡Ve allí! — se añade la -s por eufonía). Este es un caso especial de A1/A2 que conviene conocer.',
      ],
    },
    {
      heading: '¿Cómo se niega el imperativo en francés?',
      paragraphs: [
        'La negación del imperativo sigue la regla general ne...pas rodeando el verbo: Ne mange pas si vite! / Ne finissez pas avant moi! / Ne soyez pas en retard! En la conversación informal, el ne puede desaparecer: Parle pas si fort! / Fais pas ça! — pero en A1 usa siempre ne...pas.',
        'Para consejos negativos (no hagas esto), el imperativo negativo es muy útil: Ne mange pas trop de sucre. / Ne bois pas trop de café. / Ne parle pas la bouche pleine. Son fórmulas que aparecen constantemente en situaciones cotidianas.',
      ],
    },
  ],
  visual: {
    mode: 'paradigm',
    teacherLens: 'El imperativo tiene 3 formas. Verbos -er sin -s en "tu". Irregulares: sois/aie/va.',
    graphicPrompt: 'Tres formas: tu (informal) / nous (sugerencia) / vous (formal o plural). Sin pronombre sujeto.',
    scene: [
      ['Orden tu', 'Mange! Parle! Finis! Viens! Prends!'],
      ['Sugerencia nous', 'Mangeons! Parlons! Finissons! Partons!'],
      ['Orden vous', 'Mangez! Parlez! Finissez! Venez! Prenez!'],
      ['Negativa', 'Ne mange pas! Ne parlez pas! Ne finissons pas encore!'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['verbos -er sin -s en tu', 'être/avoir/aller irregulares', 'ne...pas en negativa'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Reconocimiento del impératif',
        tag: 'Opción múltiple',
        intro: 'Elige la forma imperativa correcta.',
        type: 'choice',
        items: [
          {
            scene: 'Instrucción al alumno',
            lines: [['Teacher', '___ le livre à la page 12! (tu, ouvrir)']],
            options: ['Ouvre', 'Ouvres', 'Ouvrez', 'Ouvrir'],
            answer: 'Ouvre',
            explain: '"Ouvrir" es -ir: tu → ouvre (raíz + -e; irregular grupo 3). No "ouvres".',
          },
          {
            scene: 'Instrucción formal',
            lines: [['Nico', '___ votre nom, s\'il vous plaît. (vous, écrire)']],
            options: ['Écrivez', 'Écris', 'Écrivons', 'Écrire'],
            answer: 'Écrivez',
            explain: '"vous" → écrire → écrivez. Mismo que le présent vous-form.',
          },
          {
            scene: 'Sugerencia del grupo',
            lines: [['Carlos', '___ une pause maintenant! (nous, faire)']],
            options: ['Faisons', 'Faites', 'Fais', 'Faire'],
            answer: 'Faisons',
            explain: '"nous" → faisons. Sugerencia: Faisons une pause = Hagamos una pausa.',
          },
          {
            scene: 'Consejo a un amigo',
            lines: [['Ana', '___ plus tôt demain! (tu, partir)']],
            options: ['Pars', 'Partes', 'Partez', 'Partir'],
            answer: 'Pars',
            explain: '"partir" -ir (grupo 3): tu → pars (como présent). No "partes".',
          },
          {
            scene: 'Instrucción negativa',
            lines: [['Teacher', 'Ne ___ pas pendant l\'examen! (parler, vous)']],
            options: ['parlez', 'parles', 'parlons', 'parler'],
            answer: 'parlez',
            explain: 'Ne parlez pas — vous-form. Ne...pas rodea el verbo.',
          },
          {
            scene: 'Verbo irregular être',
            lines: [['Nico', '___ patient! L\'anglais prend du temps. (tu, être)']],
            options: ['Sois', 'Soit', 'Soyez', 'Être'],
            answer: 'Sois',
            explain: '"être" imperativo tu → sois (irregular). Sois patient = Sé paciente.',
          },
          {
            scene: 'Come tu',
            lines: [['Mère', '___ ta soupe! (tu, manger)']],
            options: ['Mange', 'Manges', 'Mangez', 'Mangeons'],
            answer: 'Mange',
            explain: '"manger" -er: tu → mange (SIN -s). Mange ta soupe!',
          },
          {
            scene: 'Vamos juntos',
            lines: [['Sofia', '___ au cinéma ce soir! (nous, aller)']],
            options: ['Allons', 'Allez', 'Va', 'Aller'],
            answer: 'Allons',
            explain: '"aller" nous → allons. Allons au cinéma = ¡Vamos al cine!',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Forma y contexto',
        tag: '2 espacios',
        intro: 'Elige la persona y la forma imperativa correcta.',
        type: 'dual',
        items: [
          {
            scene: 'Instrucción de clase',
            lines: [['Teacher', '[[0]] [[1]] en silence! (leer, toda la clase)']],
            blanks: [
              { options: ['Lisez', 'Lis', 'Lisons'], answer: 'Lisez', explain: 'Toda la clase = vous → lisez.' },
              { options: ['en silence', 'silencio', 'le silence'], answer: 'en silence', explain: '"En silence" — en silencio.' },
            ],
          },
          {
            scene: 'Consejo a un amigo',
            lines: [['Ana', '[[0]] [[1]] le café le soir! (ne pas boire, tu)']],
            blanks: [
              { options: ['Ne bois pas', 'Ne buvez pas', 'Ne buvons pas'], answer: 'Ne bois pas', explain: 'tu → ne bois pas (boire: bois/buvons/buvez).' },
              { options: ['de', 'le', 'du'], answer: 'de', explain: 'Negación → de (pas de café, pas du café).' },
            ],
          },
          {
            scene: 'Sugerencia de salida',
            lines: [['Carlos', '[[0]] [[1]] ensemble ce soir! (nous, sortir)']],
            blanks: [
              { options: ['Sortons', 'Sortez', 'Sors'], answer: 'Sortons', explain: '"nous" → sortons. Sugerencia compartida.' },
              { options: ['ensemble', 'un ensemble', 'du ensemble'], answer: 'ensemble', explain: '"Ensemble" — juntos (adverbio, invariable).' },
            ],
          },
          {
            scene: 'Instrucción formal',
            lines: [['Nico', '[[0]] [[1]] votre dictionnaire pour cet exercice! (vous, utiliser)']],
            blanks: [
              { options: ['Utilisez', 'Utilise', 'Utilisons'], answer: 'Utilisez', explain: '"vous" → utilisez.' },
              { options: ['votre', 'vos', 'leur'], answer: 'votre', explain: '"Votre dictionnaire" — "votre" para vous singular formal.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Instructions pour la classe',
        tag: 'Opciones',
        intro: 'Elige la forma imperativa correcta para completar las instrucciones del profesor.',
        type: 'guidedText',
        scene: 'Clase de francés con Nico en WeLearn — instrucciones del profesor',
        text: 'Bonjour à tous! [[0]] vos cahiers! [[1]] à la page 15. [[2]] l\'exercice 3 en silence. [[3]] pas de téléphone pendant le cours. [[4]] attention à la prononciation. Et surtout, ne [[5]] pas d\'avoir des questions — je suis là pour vous aider!',
        blanks: [
          { options: ['Ouvrez', 'Ouvre', 'Ouvrons'], answer: 'Ouvrez', explain: 'Toda la clase (vous) → Ouvrez vos cahiers.' },
          { options: ['Allez', 'Allons', 'Va'], answer: 'Allez', explain: '"Allez à la page 15" — vous → allez.' },
          { options: ['Faites', 'Fais', 'Faisons'], answer: 'Faites', explain: '"Faites l\'exercice" — vous → faites (faire).' },
          { options: ['N\'utilisez', 'N\'utilise', 'N\'utilisons'], answer: 'N\'utilisez', explain: 'Negación vous: N\'utilisez pas de téléphone.' },
          { options: ['Faites', 'Faisons', 'Fais'], answer: 'Faites', explain: '"Faites attention" — vous → faites. Expresión fija.' },
          { options: ['hésitez', 'hésites', 'hésitons'], answer: 'hésitez', explain: 'Ne hésitez pas — vous → hésitez. "No dudéis en tener preguntas."' },
        ],
      },
      {
        id: 'l4',
        title: 'Órdenes y consejos',
        tag: 'Sin opciones',
        intro: 'Escribe la forma imperativa del verbo entre paréntesis.',
        type: 'freeText',
        scene: 'Completar instrucciones y consejos con la forma imperativa correcta',
        text: '[[0]] (parler-tu) plus lentement, s\'il te plaît! / [[1]] (finir-vous) l\'exercice avant 15h. / [[2]] (être-tu) courageux! / Ne [[3]] (regarder-tu) pas ton téléphone! / [[4]] (prendre-nous) le métro. / [[5]] (avoir-vous) confiance en vous!',
        blanks: [
          { answer: 'Parle', accepted: ['Parle', 'parle'], explain: '"parler" -er, tu → parle (sans -s).' },
          { answer: 'Finissez', accepted: ['Finissez', 'finissez'], explain: '"finir" -ir, vous → finissez.' },
          { answer: 'Sois', accepted: ['Sois', 'sois'], explain: '"être" tu → sois (irrégulier).' },
          { answer: 'regarde', accepted: ['regarde', 'Regarde'], explain: 'Ne regarde pas — tu -er: regarde (sans -s).' },
          { answer: 'Prenons', accepted: ['Prenons', 'prenons'], explain: '"prendre" nous → prenons.' },
          { answer: 'Ayez', accepted: ['Ayez', 'ayez'], explain: '"avoir" vous → ayez (irrégulier).' },
        ],
      },
      {
        id: 'l5',
        title: 'Dar instrucciones',
        tag: 'Producción',
        intro: 'Escribe la instrucción o consejo completo en imperativo.',
        type: 'write',
        items: [
          {
            scene: 'Consejo de salud',
            prompt: 'Escribe: "¡Come más fruta!" (manger, tu, plus de fruits)',
            answer: 'Mange plus de fruits!',
            accepted: ['mange plus de fruits', 'mange plus de fruits!'],
            explain: 'Mange plus de fruits! — manger, tu: mange (sin -s). Plus de = más de.',
          },
          {
            scene: 'Instrucción formal',
            prompt: 'Escribe: "¡No hablen durante el examen!" (ne pas parler, vous, pendant l\'examen)',
            answer: 'Ne parlez pas pendant l\'examen!',
            accepted: ["ne parlez pas pendant l'examen", 'ne parlez pas pendant'],
            explain: 'Ne parlez pas pendant l\'examen! — vous, negativa: ne + parlez + pas.',
          },
          {
            scene: 'Sugerencia colectiva',
            prompt: 'Escribe: "¡Practiquemos el francés juntos!" (pratiquer, nous, ensemble)',
            answer: 'Pratiquons le français ensemble!',
            accepted: ['pratiquons', 'pratiquons le français'],
            explain: 'Pratiquons le français ensemble! — nous: pratiquons.',
          },
          {
            scene: 'Consejo a un amigo',
            prompt: 'Escribe: "¡Sé valiente!" (être, tu, courageux)',
            answer: 'Sois courageux!',
            accepted: ['sois courageux', 'sois courageuse'],
            explain: 'Sois courageux! — être, tu: sois (irrégulier).',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Mes conseils pour apprendre le français',
        tag: 'Reto final',
        intro: 'Escribe tus propios consejos para aprender francés usando el imperativo.',
        type: 'write',
        items: [
          {
            scene: 'Consejo de estudio',
            prompt: 'Write 2 tips for learning French (tu form): Écoute... / Parle... / Regarde...',
            answer: 'Écoute de la musique française. Regarde des films avec sous-titres.',
            accepted: ['écoute', 'parle', 'regarde', 'lis', 'écris', 'pratique', 'apprends'],
            explain: 'Impératif tu (-er verbs): écoute, regarde, parle, lis, écris, pratique — all without -s.',
          },
          {
            scene: 'Consejo negativo',
            prompt: 'Write 1 thing students should NOT do: Ne... pas...',
            answer: 'Ne traduis pas chaque mot — pense en français!',
            accepted: ['ne', 'pas'],
            explain: 'Ne + verbe (tu form) + pas. Ne traduis pas / Ne parle pas espagnol / Ne regarde pas les sous-titres.',
          },
          {
            scene: 'Sugerencia al grupo',
            prompt: 'Write a suggestion for the whole class (nous form): Parlons... / Pratiquons...',
            answer: 'Parlons français pendant toute la classe!',
            accepted: ['parlons', 'pratiquons', 'écoutons', 'lisons', 'regardons', 'faisons'],
            explain: 'Impératif nous = présent nous-form: parlons, pratiquons, écoutons, faisons...',
          },
        ],
      },
    ],
  },
}

export default topic
