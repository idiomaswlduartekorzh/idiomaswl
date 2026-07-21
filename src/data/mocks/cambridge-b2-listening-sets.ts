import type { MockSection, MCQQuestion } from './types';

/**
 * Listening para Cambridge B2 sets 2–10.
 *
 * Audio: grabaciones reales alojadas en /public/audio/cambridge-b2/mockN.
 * Preguntas: redactadas por WeLearn escuchando cada audio. NO reproducen los
 * enunciados ni las transcripciones originales de terceros; siguen el formato
 * FCE (Parte 1 y 4 = opción múltiple A/B/C; Parte 2 = completar frases;
 * Parte 3 = emparejamiento A–H con tres opciones extra).
 *
 * Cada entrada de SET_LISTENING define, por set, el nombre base de los cuatro
 * mp3 y el contenido de las cuatro partes. buildListeningSections() expande eso
 * en las 4 MockSection que se insertan antes del Speaking.
 */

type Mcq = { label: string; text: string; options: string[]; answer: number };
type Blank = { num: number; answers: string[] };

type ListeningSpec = {
  /** Carpeta bajo /audio/cambridge-b2 (p. ej. "mock2"). */
  folder: string;
  /** Nombres de los 4 mp3 sin extensión, en orden de parte 1–4. */
  files: [string, string, string, string];
  part1: { instructions?: string; questions: Mcq[] };
  part2: { intro: string; template: string; blanks: Blank[] };
  part3: { intro: string; optionsLabel: string; options: string[]; answers: [number, number, number, number, number] };
  part4: { intro: string; questions: Mcq[] };
};

function audio(folder: string, file: string) {
  return `/audio/cambridge-b2/${folder}/${file}.mp3`;
}

// ── Answer distribution ──────────────────────────────────────────────────────
// Questions are authored with the correct option written first (easy to read and
// verify). That would make every correct answer "A", so we deterministically
// shuffle each question's options at build time. The seed is derived from the
// question id, so the layout is stable across renders but well spread over A/B/C.

function hashSeed(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number): () => number {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Returns a permutation array: perm[newIndex] = oldIndex. */
function permutation(n: number, seed: number): number[] {
  const rand = mulberry32(seed);
  const idx = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx;
}

function stripLetter(opt: string): string {
  return opt.replace(/^[A-H][\s.)\-]+/, '');
}

/**
 * Shuffle the options of every MCQ in a listening section so correct answers
 * are spread across the letters. Three-option questions (Parts 1 & 4) are
 * shuffled independently; a Part-3 matching section (five questions that share
 * one 8-option list) is shuffled once and its answers remapped together, with
 * the options label regenerated to match.
 */
export function distributeAnswers(sections: MockSection[], seedBase: string): MockSection[] {
  return sections.map((section) => {
    if (section.skill !== 'listening' || !section.questions) return section;
    const mcqs = section.questions.filter((q): q is MCQQuestion => q.type === 'mcq');
    if (mcqs.length === 0) return section;

    const shared =
      mcqs.length > 1 &&
      mcqs.every((q) => q.options && q.options.length === mcqs[0].options!.length) &&
      mcqs.every((q) => JSON.stringify(q.options) === JSON.stringify(mcqs[0].options));

    if (shared) {
      // Part 3 – one shared option list, remap all answers together.
      const opts = mcqs[0].options!;
      const perm = permutation(opts.length, hashSeed(`${seedBase}:${section.title}`));
      const newOptions = perm.map((old) => opts[old]);
      const oldToNew = new Map<number, number>();
      perm.forEach((old, next) => oldToNew.set(old, next));
      const label =
        'Options — ' +
        newOptions
          .map((o, i) => `${String.fromCharCode(65 + i)}: ${stripLetter(o)}`)
          .join(' · ');
      return {
        ...section,
        questions: section.questions.map((q, qi) =>
          q.type === 'mcq'
            ? {
                ...q,
                options: newOptions,
                answer: oldToNew.get(q.answer as number)!,
                ...(qi === 0 ? { stimulusLabel: label } : {}),
              }
            : q,
        ),
      };
    }

    // Parts 1 & 4 – shuffle each question's three options independently.
    return {
      ...section,
      questions: section.questions.map((q) => {
        if (q.type !== 'mcq' || !q.options) return q;
        const perm = permutation(q.options.length, hashSeed(`${seedBase}:${q.id}`));
        const newOptions = perm.map((old) => q.options![old]);
        const newAnswer = perm.indexOf(q.answer as number);
        return { ...q, options: newOptions, answer: newAnswer };
      }),
    };
  });
}

export function buildListeningSections(spec: ListeningSpec): MockSection[] {
  const [f1, f2, f3, f4] = spec.files;

  const part1: MockSection = {
    part: 9,
    title: 'Listening – Part 1: Multiple Choice (short extracts)',
    skill: 'listening',
    audioUrl: audio(spec.folder, f1),
    instructions:
      spec.part1.instructions ??
      'You will hear eight different recordings. For each question, choose the answer (A, B or C) that best fits what you hear. You can replay the audio as often as you need.',
    questions: spec.part1.questions.map((q, i) => ({
      type: 'mcq' as const,
      id: `li-p1-q${i + 1}`,
      part: 9,
      stimulusLabel: q.label,
      text: q.text,
      options: q.options,
      answer: q.answer,
    })),
  };

  const part2: MockSection = {
    part: 9,
    title: 'Listening – Part 2: Sentence Completion',
    skill: 'listening',
    audioUrl: audio(spec.folder, f2),
    instructions: spec.part2.intro,
    questions: [
      {
        type: 'formgroup' as const,
        id: 'li-p2-q1',
        part: 9,
        qRange: [9, 18],
        groupLabel: 'Complete each sentence with a word or short phrase, based on what you hear.',
        title: 'Sentence completion',
        template: spec.part2.template,
        blanks: spec.part2.blanks,
      },
    ],
  };

  const part3: MockSection = {
    part: 9,
    title: 'Listening – Part 3: Multiple Matching',
    skill: 'listening',
    audioUrl: audio(spec.folder, f3),
    instructions:
      'You will hear five people speaking. Choose from the list (A–H) what each speaker says. There are three extra letters you do not need. Use each letter once.',
    questions: spec.part3.answers.map((ans, i) => ({
      type: 'mcq' as const,
      id: `li-p3-q${19 + i}`,
      part: 9,
      ...(i === 0 ? { stimulusLabel: spec.part3.optionsLabel } : {}),
      text: `Speaker ${i + 1}`,
      options: spec.part3.options,
      answer: ans,
    })),
  };

  const part4: MockSection = {
    part: 9,
    title: 'Listening – Part 4: Multiple Choice (long extract)',
    skill: 'listening',
    audioUrl: audio(spec.folder, f4),
    instructions: spec.part4.intro,
    questions: spec.part4.questions.map((q, i) => ({
      type: 'mcq' as const,
      id: `li-p4-q${24 + i}`,
      part: 9,
      text: q.text,
      options: q.options,
      answer: q.answer,
    })),
  };

  return distributeAnswers([part1, part2, part3, part4], spec.folder);
}

// ─────────────────────────────────────────────────────────────────────────────
// Contenido por set. Se irá completando 2→10.
// ─────────────────────────────────────────────────────────────────────────────

const P3_OPTS = (opts: string[]) => opts;

export const SET_LISTENING: Record<number, ListeningSpec> = {
  // ── SET 2 · audio mock2 (four different speakers / everyday situations) ─────
  2: {
    folder: 'mock2',
    files: [
      'fce-practice-listening-test-01-part-1',
      'fce-practice-listening-test-01-part-2',
      'fce-practice-listening-test-01-part-3',
      'fce-practice-listening-test-01-part-4',
    ],
    part1: {
      questions: [
        {
          label: 'Extract 1 — Two students discuss their first geography class of the year.',
          text: '(1) What do the two students agree about the class?',
          options: [
            'A  It taught them useful things they had not known before.',
            'B  It was harder than either of them had expected.',
            'C  It was less interesting than last year’s classes.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 2 — A boy tells a friend about buying food for wild birds.',
          text: '(2) What is the boy mainly trying to do?',
          options: [
            'A  Help with a survey that records which birds appear.',
            'B  Attract one rare species he has seen before.',
            'C  Keep the local birds fed through the winter.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 3 — A girl tells a friend how she won a spelling competition.',
          text: '(3) What does she say helped her most?',
          options: [
            'A  Constantly seeing the words displayed around her room.',
            'B  The rhymes her father taught her to use.',
            'C  Not letting the stronger competitors worry her.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 4 — A technology teacher describes a model-car project.',
          text: '(4) What does she warn the students about?',
          options: [
            'A  Being careless when they make the parts.',
            'B  Choosing a design that is far too advanced.',
            'C  Needing tools the school does not have.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 5 — A boy talks to his sister about a sweatshirt he bought.',
          text: '(5) Why is he unhappy with the sweatshirt?',
          options: [
            'A  It feels too thin for the price he paid.',
            'B  He thinks the bright colour does not suit him.',
            'C  He fears it has already gone out of fashion.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 6 — A football coach talks to his team about avoiding injuries.',
          text: '(6) What does the coach propose to do differently this season?',
          options: [
            'A  Run the strength-building sessions every week.',
            'B  Remind players to keep drinking enough fluids.',
            'C  Add new warm-up exercises before matches.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 7 — A girl tells a friend about a building she has just visited.',
          text: '(7) Why is she telling him about the palace?',
          options: [
            'A  To recommend it as somewhere well worth visiting.',
            'B  To warn him that the gardens were disappointing.',
            'C  To explain why she decided to go there.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 8 — A boy leaves a phone message about a family camping trip.',
          text: '(8) What does he say about the holiday?',
          options: [
            'A  They made the best of a difficult start.',
            'B  It was ruined despite all their preparation.',
            'C  It has inspired them to go again very soon.',
          ],
          answer: 0,
        },
      ],
    },
    part2: {
      intro:
        'You will hear a girl called Anna giving a presentation about a fashion blog she has created. Complete each sentence with a word or short phrase.',
      template:
        '(9) More people started visiting Anna’s blog after she was written about in a {{9}}.\n(10) To help develop the blog, Anna now works with a {{10}}.\n(11) The most important thing Anna considers when choosing clothes is her readers’ {{11}}.\n(12) Anna says teenagers are willing to spend the most money on {{12}}.\n(13) Anna prefers to buy her own clothes in {{13}}.\n(14) The historical period that most inspires Anna’s recent posts is the {{14}}.\n(15) Clothes with {{15}} on them recently caused a jump in visits to the blog.\n(16) Anna mainly features clothes made of {{16}} rather than artificial materials.\n(17) Of the things Anna makes herself, readers were keenest to buy her {{17}}.\n(18) Anna was pleased that some readers described her blog as looking {{18}}.',
      blanks: [
        { num: 9,  answers: ['newspaper'] },
        { num: 10, answers: ['photographer'] },
        { num: 11, answers: ['lifestyle', 'lifestyles', 'student lifestyle'] },
        { num: 12, answers: ['jeans'] },
        { num: 13, answers: ['second-hand shops', 'second hand shops', 'secondhand shops', 'second-hand shop'] },
        { num: 14, answers: ['1920s', 'twenties', '1920’s'] },
        { num: 15, answers: ['stripes', 'stripe'] },
        { num: 16, answers: ['cotton'] },
        { num: 17, answers: ['earrings'] },
        { num: 18, answers: ['professional'] },
      ],
    },
    part3: {
      intro: '',
      optionsLabel:
        'Options — A: It gave me an idea for an invention. · B: I handed it back to the person who lost it. · C: I was tempted to keep it for myself. · D: It helped me achieve something I had long wanted. · E: It started a new hobby for me. · F: I received a cash reward for it. · G: I found out it was worth less than I had hoped. · H: I reported it to the police.',
      options: P3_OPTS([
        'A  Gave me an idea for an invention',
        'B  Handed it back to the person who lost it',
        'C  Was tempted to keep it for myself',
        'D  Helped me achieve something I had long wanted',
        'E  Started a new hobby for me',
        'F  Received a cash reward for it',
        'G  Found out it was worth less than I had hoped',
        'H  Reported it to the police',
      ]),
      answers: [2, 3, 0, 1, 4],
    },
    part4: {
      intro:
        'You will hear an interview with a student called John Benton, who has just completed a 25-kilometre running race. For each question, choose the answer (A, B or C) that fits best.',
      questions: [
        {
          label: '',
          text: '(24) What finally made John decide to enter the race?',
          options: [
            'A  A wish to prove his friends wrong.',
            'B  The example of a famous long-distance runner.',
            'C  Encouragement from his father.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(25) What does John say about how he planned his training?',
          options: [
            'A  He set himself goals he believed were manageable.',
            'B  He deliberately built in rest days to recover.',
            'C  He left himself plenty of time to get fit.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(26) What difficulty did John have once training had started?',
          options: [
            'A  Getting home in time for the school bus.',
            'B  Making himself run in the freezing mornings.',
            'C  Finding time to relax after school.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(27) What does John say about his diet before the race?',
          options: [
            'A  He chose not to follow a very strict diet.',
            'B  He found it hard to give up his favourite foods.',
            'C  He started his race diet almost too late.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(28) What especially encouraged John on the day of the race?',
          options: [
            'A  Seeing friends who had come specially to support him.',
            'B  Strangers he had never met wishing him luck.',
            'C  The crowd being far bigger than he had expected.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(29) What strategy did John use to keep himself going?',
          options: [
            'A  Dealing with the race in separate stages.',
            'B  Keeping his target finishing time in mind throughout.',
            'C  Running fast early on to build a lead.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(30) How did John feel immediately after he finished?',
          options: [
            'A  Too exhausted at first to take in people’s reactions.',
            'B  Certain he would never attempt such a race again.',
            'C  Eager to celebrate straight away with his friends.',
          ],
          answer: 0,
        },
      ],
    },
  },

  // ── SET 3 · audio mock3 (olive farming / astronomy / life coach) ───────────
  3: {
    folder: 'mock3',
    files: [
      'fce-practice-listening-test-31-part-1',
      'fce-practice-listening-test-31-part-2',
      'fce-practice-listening-test-31-part-3',
      'fce-practice-listening-test-31-part-4',
    ],
    part1: {
      questions: [
        {
          label: 'Extract 1 — A radio programme about people who cannot hear a musical beat.',
          text: '(1) What does the woman say about “beat deafness”?',
          options: [
            'A  It is far less common than people assume.',
            'B  It always means a person has no sense of rhythm.',
            'C  It can be cured with enough dance practice.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 2 — Two students discuss making a map of their local area.',
          text: '(2) What does the girl think they should do first?',
          options: [
            'A  Get to know the area on foot before they start.',
            'B  Learn how to use the online map-making tool.',
            'C  Divide the work between the two of them.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 3 — Two friends discuss a TV programme about new food technology.',
          text: '(3) What does the man think about the new salt crystals?',
          options: [
            'A  They are unlikely to reach the shops any time soon.',
            'B  They taste noticeably worse than ordinary salt.',
            'C  They would make people far healthier overnight.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 4 — A teacher recommends a historical novel to her students.',
          text: '(4) What does the teacher emphasise about the novel?',
          options: [
            'A  The characters’ lives are surprisingly like our own.',
            'B  It is the kind of book she often chooses herself.',
            'C  The town it describes has changed beyond recognition.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 5 — A blind man describes experiencing travel through smell.',
          text: '(5) What does he say about exploring places through smell?',
          options: [
            'A  He believes it makes his experiences more intense.',
            'B  He found it came naturally to him from the start.',
            'C  He still prefers others to describe scenes to him.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 6 — A sports coach talks to a cyclist about feeling hungry.',
          text: '(6) What does the coach advise the cyclist to do?',
          options: [
            'A  Eat something immediately after each training session.',
            'B  Cut down on the amount of training he does.',
            'C  Change the kind of carbohydrates he eats.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 7 — Two people talk about a book launch party.',
          text: '(7) What is the author most concerned about?',
          options: [
            'A  How to attract publicity for the event.',
            'B  Whether the budget will be big enough.',
            'C  Which hotel would be the best venue.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 8 — A sailing instructor talks to trainees about navigation.',
          text: '(8) What advice does the instructor give?',
          options: [
            'A  Study your route carefully before you set off.',
            'B  Trust your experience rather than the maps.',
            'C  Keep checking the maps throughout the voyage.',
          ],
          answer: 0,
        },
      ],
    },
    part2: {
      intro:
        'You will hear a man called James Perry talking about his first year growing olives to make oil. Complete each sentence with a word or short phrase.',
      template:
        '(9) The only weather event that killed some of James’s trees was a sudden {{9}}.\n(10) The creatures that most bothered James were a kind of {{10}}.\n(11) To keep the quality high, James decided to pick the olives by {{11}}.\n(12) As he had no basket, James collected the olives in a {{12}}.\n(13) James says that removing the {{13}} was the most boring job of all.\n(14) While he was sorting the olives, James’s kitchen looked like a temporary {{14}}.\n(15) James points out that olive oil is often poured over {{15}}.\n(16) James decided that his main mistake had been picking the olives too {{16}}.\n(17) Next year, James hopes his oil will finally have a {{17}} taste.\n(18) The year after that, James may try making {{18}} oils.',
      blanks: [
        { num: 9,  answers: ['frost'] },
        { num: 10, answers: ['worm', 'worms'] },
        { num: 11, answers: ['hand'] },
        { num: 12, answers: ['bucket'] },
        { num: 13, answers: ['leaves', 'leaf'] },
        { num: 14, answers: ['factory'] },
        { num: 15, answers: ['salads', 'salad'] },
        { num: 16, answers: ['late'] },
        { num: 17, answers: ['pepper', 'peppery'] },
        { num: 18, answers: ['flavoured', 'flavored', 'chilli', 'garlic'] },
      ],
    },
    part3: {
      intro: '',
      optionsLabel:
        'Options — A: I simply enjoyed the subject for its own sake. · B: I wanted to follow a family tradition. · C: I already knew a great deal about it. · D: The stars gave me a sense of security as a child. · E: I wanted to use the powerful equipment available to students. · F: A teacher first inspired my interest. · G: I hoped it would lead to a well-paid career. · H: I wanted to prove a doubter wrong.',
      options: [
        'A  Enjoyed the subject for its own sake',
        'B  Wanted to follow a family tradition',
        'C  Already knew a great deal about it',
        'D  The stars gave me security as a child',
        'E  Wanted to use the powerful student equipment',
        'F  A teacher first inspired my interest',
        'G  Hoped it would lead to a well-paid career',
        'H  Wanted to prove a doubter wrong',
      ],
      answers: [0, 2, 3, 4, 1],
    },
    part4: {
      intro:
        'You will hear an interview with a life coach called Mel Candy, who helps people achieve a work-life balance. For each question, choose the answer (A, B or C) that fits best.',
      questions: [
        {
          label: '',
          text: '(24) What do many clients wrongly expect Mel to do?',
          options: [
            'A  Tell them a fixed number of hours they should work.',
            'B  Solve their problems without any effort from them.',
            'C  Persuade their employers to reduce their workload.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(25) What does Mel say about people who work alone at home?',
          options: [
            'A  They need some daily contact with other people.',
            'B  They should set themselves strict finishing times.',
            'C  They tend to get more work done than others.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(26) What does Mel now believe about multitasking?',
          options: [
            'A  It is actually less productive than doing one thing at a time.',
            'B  It is a useful skill that most people can learn.',
            'C  It only works well for very experienced managers.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(27) What does Mel encourage her clients to do?',
          options: [
            'A  Put personal events in a diary and stick to them.',
            'B  Try to finish their work more quickly each day.',
            'C  Focus only on what has to be done that same day.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(28) What do people find hardest when trying to find a balance?',
          options: [
            'A  Letting go of the fear of missing out on things.',
            'B  Explaining their decision to friends and family.',
            'C  Giving up the job they currently have.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(29) What useful tip did Mel take from one of her clients?',
          options: [
            'A  To stop insisting on leaving the house perfectly tidy.',
            'B  To take up a sport such as golf at weekends.',
            'C  To answer work emails only once a day.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(30) How does Mel know she has achieved a good balance?',
          options: [
            'A  She feels energetic and keen to do things.',
            'B  She no longer thinks about work at all.',
            'C  She spends most evenings relaxing in front of the TV.',
          ],
          answer: 0,
        },
      ],
    },
  },

  // ── SET 4 · audio mock4 (new boss / music industry / rainforest) ───────────
  4: {
    folder: 'mock4',
    files: [
      'fce-practice-listening-test-30-part-1',
      'fce-practice-listening-test-30-part-2',
      'fce-practice-listening-test-30-part-3',
      'fce-practice-listening-test-30-part-4',
    ],
    part1: {
      questions: [
        {
          label: 'Extract 1 — Two colleagues talk about their new boss.',
          text: '(1) What do they conclude about the new boss?',
          options: [
            'A  She was probably just finding her feet.',
            'B  She clearly does not enjoy the work.',
            'C  She is unfriendly towards the team.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 2 — A young man talks about his sports studies course.',
          text: '(2) What does he say about the course?',
          options: [
            'A  It suits people who are not especially sporty.',
            'B  It is shorter than he had first expected.',
            'C  It only trains students to coach one sport.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 3 — A woman describes a trip to the theatre.',
          text: '(3) What was the woman relieved about?',
          options: [
            'A  The person next to her did not cough during the play.',
            'B  The reviews of the production turned out to be accurate.',
            'C  She managed to catch the bus there in time.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 4 — A lecturer discusses an experiment with a student.',
          text: '(4) What does the lecturer recommend the student does?',
          options: [
            'A  Repeat the experiment to be sure of the results.',
            'B  Reset the equipment before trying again.',
            'C  Write up the surprising results immediately.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 5 — A man talks about a novel he has read.',
          text: '(5) What criticism does he make of the novel?',
          options: [
            'A  He found the story too easy to predict.',
            'B  The characters were not believable.',
            'C  The setting had been used too often before.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 6 — A student talks about a geography trip.',
          text: '(6) What does the student say about the trip?',
          options: [
            'A  The social side turned out better than he had feared.',
            'B  The coursework was not as useful as he had hoped.',
            'C  The poor weather spoiled the whole experience.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 7 — Two friends talk in an art gallery.',
          text: '(7) What do they agree the reviews were right about?',
          options: [
            'A  That the exhibition would appeal to many different people.',
            'B  That the works were arranged in a confusing way.',
            'C  That the exhibition was smaller than expected.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 8 — A student talks about learning a new language.',
          text: '(8) Why did the student decide to learn the language?',
          options: [
            'A  She expects to need it at some point.',
            'B  Her course made it compulsory.',
            'C  She finds all languages very easy.',
          ],
          answer: 0,
        },
      ],
    },
    part2: {
      intro:
        'You will hear a man called Jim Greene giving advice about how to get into the music industry. Complete each sentence with a word or short phrase.',
      template:
        '(9) To stay informed, Jim recommends specialist websites and {{9}} magazines.\n(10) Jim says that, above all, a good CV needs to be {{10}}.\n(11) A CV should show that you are enthusiastic and can use your own {{11}}.\n(12) Unpaid interns are often asked to do {{12}} work.\n(13) Jim mentions one top executive who started out as an office {{13}}.\n(14) Jim’s main piece of advice is not to {{14}} yourself.\n(15) Jim spent three summers volunteering at music {{15}}.\n(16) Volunteering shows employers you understand the {{16}} side of the industry, not just the theory.\n(17) To meet people, Jim suggests going to as many {{17}} events as possible.\n(18) Jim reminds the audience there are far more roles in music than just being a {{18}}.',
      blanks: [
        { num: 9,  answers: ['trade'] },
        { num: 10, answers: ['memorable'] },
        { num: 11, answers: ['initiative'] },
        { num: 12, answers: ['administrative', 'admin', 'administration'] },
        { num: 13, answers: ['cleaner'] },
        { num: 14, answers: ['limit'] },
        { num: 15, answers: ['festivals', 'festival'] },
        { num: 16, answers: ['practical'] },
        { num: 17, answers: ['networking'] },
        { num: 18, answers: ['singer'] },
      ],
    },
    part3: {
      intro: '',
      optionsLabel:
        'Options — A: Although music is my work, I prefer silence at home. · B: I use music to escape from the stress of my job. · C: I use music to block out noise while I work. · D: For me, music is mostly background I don’t focus on. · E: Music helps new ideas come to me. · F: I mainly listen to music to help me fall asleep. · G: I listen in order to learn about different styles. · H: I only enjoy music when I am with other people.',
      options: [
        'A  Although music is my work, I prefer silence at home',
        'B  Use music to escape stress from my job',
        'C  Use music to block out noise while I work',
        'D  Music is mostly background I don’t focus on',
        'E  Music helps new ideas come to me',
        'F  Listen mainly to help me fall asleep',
        'G  Listen to learn about different styles',
        'H  Only enjoy music with other people',
      ],
      answers: [0, 1, 2, 3, 4],
    },
    part4: {
      intro:
        'You will hear an interview with a biology student called Gail Koch, who is spending a year working as a field scientist in the rainforest. For each question, choose the answer (A, B or C) that fits best.',
      questions: [
        {
          label: '',
          text: '(24) What does Gail say about herself as a field scientist?',
          options: [
            'A  Her enthusiasm makes up for her lack of experience.',
            'B  She already considers herself fully qualified.',
            'C  She wishes she worked in a laboratory instead.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(25) What does Gail say she will miss most?',
          options: [
            'A  The look of the forest in the setting sun.',
            'B  The heat and humidity of the daytime.',
            'C  The company of the other researchers.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(26) What does Gail say her research is mostly like?',
          options: [
            'A  Walking slowly and often seeing nothing but leaves.',
            'B  Catching a new lizard almost every day.',
            'C  Recording numbers back at the research station.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(27) What motivates Gail most about her work?',
          options: [
            'A  Adding to what science knows about the world.',
            'B  Being the first to discover a brand-new species.',
            'C  Gaining recognition in the academic world.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(28) What does Gail say about becoming a field scientist?',
          options: [
            'A  It is very competitive and often badly paid at first.',
            'B  It is easier than most people imagine.',
            'C  It offers fewer opportunities than lab work.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(29) Why does Gail recommend working at the research station?',
          options: [
            'A  She can choose her own research and plan her own day.',
            'B  The pay is better than in most laboratory jobs.',
            'C  The living conditions are very comfortable.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(30) What disadvantage of the station does Gail mention?',
          options: [
            'A  The technology she uses there is fairly basic.',
            'B  She rarely sees any wildlife at all.',
            'C  She feels lonely without other scientists.',
          ],
          answer: 0,
        },
      ],
    },
  },

  // ── SET 5 · audio mock5 (everyday situations / invigilating / temp work) ───
  5: {
    folder: 'mock5',
    files: ['b2-test-29-1', 'b2-test-29-2', 'b2-test-29-3', 'b2-test-29-4'],
    part1: {
      questions: [
        {
          label: 'Extract 1 — A man invites a friend to go out.',
          text: '(1) What does the man suggest doing?',
          options: [
            'A  Trying out a new restaurant.',
            'B  Going to see a film.',
            'C  Going to a birthday party.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 2 — A woman gives instructions to a group at a museum.',
          text: '(2) What does the woman tell the group?',
          options: [
            'A  There will be a member of staff in each room to help them.',
            'B  They must not ask the museum workers any questions.',
            'C  They should all start in different rooms.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 3 — Two people discuss a book.',
          text: '(3) What does the woman dislike about the book?',
          options: [
            'A  The characters in the story.',
            'B  The way places are described.',
            'C  The most exciting parts of the plot.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 4 — A radio report describes a football match.',
          text: '(4) What was the final result of the match?',
          options: [
            'A  It ended in a draw.',
            'B  Cambridge won.',
            'C  Peterborough won.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 5 — A student talks to a friend.',
          text: '(5) What does she want her friend to do?',
          options: [
            'A  Lend her his laptop.',
            'B  Fetch some books from the library.',
            'C  Draw some diagrams for her.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 6 — A man talks on his phone on a train.',
          text: '(6) What feeling does the man express?',
          options: [
            'A  Anger.',
            'B  Amusement.',
            'C  Disbelief.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 7 — A person is interviewed on the radio.',
          text: '(7) What did the interviewee win an award for?',
          options: [
            'A  Writing the script of a film.',
            'B  Acting in a film.',
            'C  Directing a film.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 8 — A woman talks about a road accident.',
          text: '(8) What caused the accident?',
          options: [
            'A  An animal running into the road.',
            'B  The other driver’s carelessness.',
            'C  A fault with the woman’s car.',
          ],
          answer: 0,
        },
      ],
    },
    part2: {
      intro:
        'You will hear an experienced teacher called David giving light-hearted tips for people supervising (invigilating) exams. Complete each sentence with a word or short phrase.',
      template:
        '(9) David says invigilators have to stay {{9}} for two or three hours.\n(10) Invigilators are usually given a {{10}} of duties to tick off.\n(11) One duty not always written down is telling everyone to switch off their {{11}}.\n(12) To check for cheating, David suggests walking along the {{12}}.\n(13) He recommends doing this about every {{13}}.\n(14) A “people person” can pass the time by predicting each pupil’s {{14}}.\n(15) A “words person” might write a {{15}} about being in the exam room.\n(16) A “numbers person” could work out how many {{16}} are left until they retire.\n(17) Alternatively, they could calculate how much {{17}} they earn on each holiday day.\n(18) David says these activities also help invigilators notice any {{18}} behaviour.',
      blanks: [
        { num: 9,  answers: ['alert', 'awake'] },
        { num: 10, answers: ['list'] },
        { num: 11, answers: ['phones', 'mobile phones', 'mobiles', 'mobile phone'] },
        { num: 12, answers: ['gangways', 'gangway', 'aisles'] },
        { num: 13, answers: ['twenty minutes', '20 minutes'] },
        { num: 14, answers: ['future'] },
        { num: 15, answers: ['poem'] },
        { num: 16, answers: ['days', 'teaching days'] },
        { num: 17, answers: ['money'] },
        { num: 18, answers: ['suspicious'] },
      ],
    },
    part3: {
      intro: '',
      optionsLabel:
        'Options — A: Automated telephone menus. · B: Politicians who treat people as fools. · C: People who put off doing necessary jobs. · D: People who are habitually late. · E: A wide range of small everyday things. · F: Noisy neighbours late at night. · G: Being interrupted while working. · H: People who never reply to emails.',
      options: [
        'A  Automated telephone menus',
        'B  Politicians who treat people as fools',
        'C  People who put off doing necessary jobs',
        'D  People who are habitually late',
        'E  A wide range of small everyday things',
        'F  Noisy neighbours late at night',
        'G  Being interrupted while working',
        'H  People who never reply to emails',
      ],
      answers: [0, 1, 2, 3, 4],
    },
    part4: {
      intro:
        'You will hear an interview with Stella, who works for a social statistics agency, about people who choose temporary jobs. For each question, choose the answer (A, B or C) that fits best.',
      questions: [
        {
          label: '',
          text: '(24) What was Stella’s most recent project about?',
          options: [
            'A  Why more people are choosing temporary work.',
            'B  How family life has changed in recent years.',
            'C  Changes in what consumers buy.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(25) What surprised the researchers about the trend?',
          options: [
            'A  It is stronger among men than among women.',
            'B  It had actually been predicted years earlier.',
            'C  It mainly affects older workers.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(26) What was the main reason people gave for temporary work?',
          options: [
            'A  The flexibility it gave them with their time.',
            'B  The higher pay it usually offers.',
            'C  The chance to work with more people.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(27) What was the second reason people mentioned?',
          options: [
            'A  Getting experience of a different kind of work.',
            'B  Avoiding responsibility at work.',
            'C  Being able to work entirely from home.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(28) How did temporary work help some people decide about a career?',
          options: [
            'A  It gave them a taster of a field before training for it.',
            'B  It guaranteed them a permanent job afterwards.',
            'C  It paid for their professional training.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(29) What was the third reason for the popularity of temporary work?',
          options: [
            'A  The variety and interest it offers.',
            'B  The long holidays it guarantees.',
            'C  The chance to travel abroad for free.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(30) What do the people Stella calls “career temps” believe?',
          options: [
            'A  The richer experience makes up for earning less.',
            'B  They will soon be offered permanent contracts.',
            'C  Temporary work is only worth doing when young.',
          ],
          answer: 0,
        },
      ],
    },
  },

  // ── SET 6 · audio mock6 (everyday situations / space tourism / health) ─────
  6: {
    folder: 'mock6',
    files: ['b2-test-28-1', 'b2-test-28-2', 'b2-test-28-3', 'b2-test-28-4'],
    part1: {
      questions: [
        {
          label: 'Extract 1 — Two people talk at a party.',
          text: '(1) How do the two people know each other?',
          options: [
            'A  They were at school together.',
            'B  They used to work together.',
            'C  They met through mutual friends.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 2 — You overhear a conversation on a train.',
          text: '(2) What has the man been doing?',
          options: [
            'A  Working on a business trip.',
            'B  Taking a short holiday.',
            'C  Competing in a sports event.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 3 — Someone talks about a course they took.',
          text: '(3) How does the speaker feel about the course?',
          options: [
            'A  Disappointed.',
            'B  Angry.',
            'C  Satisfied.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 4 — A teenager talks about a new version of a computer game.',
          text: '(4) Why does he think the new version is better?',
          options: [
            'A  The graphics are better.',
            'B  There are more levels.',
            'C  You can play it online.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 5 — A husband and wife talk about their work.',
          text: '(5) What is their problem?',
          options: [
            'A  They are hardly ever free at the same time.',
            'B  They both work very long hours.',
            'C  They feel they are paid unfairly.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 6 — You hear a woman speaking in a shop.',
          text: '(6) What is she doing?',
          options: [
            'A  Explaining what she is looking for.',
            'B  Making a complaint.',
            'C  Asking for opening times.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 7 — A woman tells a friend about her holiday.',
          text: '(7) What did she enjoy most?',
          options: [
            'A  Relaxing.',
            'B  Shopping.',
            'C  Sightseeing.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 8 — You hear part of a radio play.',
          text: '(8) What is the relationship between the two speakers?',
          options: [
            'A  Boss and employee.',
            'B  Friends at the same company.',
            'C  Workers from different companies.',
          ],
          answer: 0,
        },
      ],
    },
    part2: {
      intro:
        'You will hear a talk about a space-tourism company called Space Adventures. Complete each sentence with a word or short phrase.',
      template:
        '(9) Space Adventures was founded by a man who is only {{9}} years old.\n(10) On the first day, tourists fly to {{10}} for sightseeing and a first briefing.\n(11) On the second day they travel to {{11}}, the centre of the Russian space programme.\n(12) During the flight, tourists experience {{12}} flight for two hours.\n(13) The company says its aircraft is safer than the shuttle because of its {{13}}.\n(14) Before the flight, travellers are given advice on how to avoid travel {{14}}.\n(15) Back on the ground, each tourist is given a {{15}} of their flight.\n(16) Tourists also receive a {{16}} proving they have been in space.\n(17) Eric argues that burning the rocket fuel simply produces {{17}}.\n(18) He claims the only real environmental problem is {{18}}.',
      blanks: [
        { num: 9,  answers: ['28', 'twenty-eight', 'twenty eight'] },
        { num: 10, answers: ['Moscow'] },
        { num: 11, answers: ['Star City'] },
        { num: 12, answers: ['weightless', 'weightlessness', 'zero gravity'] },
        { num: 13, answers: ['escape system', 'escape-system'] },
        { num: 14, answers: ['sickness', 'travel sickness'] },
        { num: 15, answers: ['video', 'video record', 'video recording'] },
        { num: 16, answers: ['certificate'] },
        { num: 17, answers: ['water'] },
        { num: 18, answers: ['noise'] },
      ],
    },
    part3: {
      intro: '',
      optionsLabel:
        'Options — A: My job itself keeps me physically active. · B: I exercise so much that I can eat and drink what I like. · C: I sit down all day but try to watch what I eat. · D: A health scare made me change my lifestyle. · E: I was sporty at school but do little now. · F: I follow a strict diet planned by a doctor. · G: I have never needed to think about my health. · H: I gave up sport because of an injury.',
      options: [
        'A  My job keeps me physically active',
        'B  I exercise so much I can eat and drink freely',
        'C  I sit all day but try to watch my diet',
        'D  A health scare made me change my lifestyle',
        'E  I was sporty at school but do little now',
        'F  I follow a strict doctor’s diet',
        'G  I have never had to think about my health',
        'H  I gave up sport after an injury',
      ],
      answers: [0, 1, 2, 3, 4],
    },
    part4: {
      intro:
        'You will hear three friends — Celia, Amy and Bill — remembering what school was like when they were young. For each question, choose the answer (A, B or C) that fits best.',
      questions: [
        {
          label: '',
          text: '(24) What does Amy say she had to wear at her school in Australia?',
          options: [
            'A  Straw hats and, on special occasions, white gloves.',
            'B  A cap that she found uncomfortable.',
            'C  A skirt that had to touch the ground.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(25) What does Bill say about school caps?',
          options: [
            'A  He disliked his, but his son would like to wear one.',
            'B  He was proud to wear his school cap.',
            'C  His school never made pupils wear caps.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(26) What does Celia say was the worst thing about her school?',
          options: [
            'A  The food.',
            'B  The strict uniform.',
            'C  The long school day.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(27) What does Amy admit she used to do with food she disliked?',
          options: [
            'A  Hide it in a cupboard in the wall.',
            'B  Give it secretly to other pupils.',
            'C  Refuse to eat and accept the punishment.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(28) What does Bill say about the school dinners he had?',
          options: [
            'A  He enjoyed them, though they were unhealthy.',
            'B  He thought they were carefully balanced.',
            'C  He usually refused to eat them.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(29) What did Amy’s daughter recently complain about?',
          options: [
            'A  A teacher taking off a mark for every spelling mistake.',
            'B  Being given too much homework each week.',
            'C  Not being allowed to wear jewellery.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(30) How does Bill say pupils were once punished for poor test results?',
          options: [
            'A  They were hit sharply on the knuckles.',
            'B  They had to stay behind after school.',
            'C  They were sent home for the day.',
          ],
          answer: 0,
        },
      ],
    },
  },

  // ── SET 7 · audio mock7 (everyday situations / workplace survey / holidays) ─
  7: {
    folder: 'mock7',
    files: ['b2-test-27-1', 'b2-test-27-2', 'b2-test-27-3', 'b2-test-27-4'],
    part1: {
      questions: [
        {
          label: 'Extract 1 — A man talks on a train.',
          text: '(1) What is the man’s job?',
          options: ['A  Teacher.', 'B  Photographer.', 'C  Musician.'],
          answer: 0,
        },
        {
          label: 'Extract 2 — You hear part of a news report on the radio.',
          text: '(2) What is the report about?',
          options: ['A  Forest fires.', 'B  Strong winds.', 'C  Flooding.'],
          answer: 0,
        },
        {
          label: 'Extract 3 — You hear a person describing a present.',
          text: '(3) What is the speaker choosing?',
          options: [
            'A  A necklace as a gift.',
            'B  A shirt as a gift.',
            'C  A pair of earrings as a gift.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 4 — A teenager describes something that happened in class.',
          text: '(4) How did the teenager feel?',
          options: ['A  Embarrassed.', 'B  Amused.', 'C  Annoyed.'],
          answer: 0,
        },
        {
          label: 'Extract 5 — You hear an extract from a radio programme.',
          text: '(5) What kind of programme is it?',
          options: [
            'A  A health and nutrition programme.',
            'B  A cookery programme.',
            'C  A fashion programme.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 6 — You hear an extract from a radio play.',
          text: '(6) What is the relationship between the speakers?',
          options: [
            'A  Father and daughter.',
            'B  Boss and employee.',
            'C  Brother and sister.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 7 — A man talks on the radio about a parachute jump.',
          text: '(7) How did he feel about the jump afterwards?',
          options: ['A  Disappointed.', 'B  Terrified.', 'C  Thrilled.'],
          answer: 0,
        },
        {
          label: 'Extract 8 — Two people discuss a film.',
          text: '(8) What did the woman like best about the film?',
          options: ['A  The acting.', 'B  The camera work.', 'C  The plot.'],
          answer: 0,
        },
      ],
    },
    part2: {
      intro:
        'You will hear an interview with Anne Gates, head of human resources at a company called Redcom, about a survey on how people feel about their colleagues. Complete each sentence with a word or short phrase.',
      template:
        '(9) Redcom is a telecommunications company that makes computer {{9}}.\n(10) Anne got her first job at Redcom in the year {{10}}.\n(11) In the past, women were especially annoyed by office {{11}}.\n(12) In the past, men were most annoyed by people jamming the {{12}}.\n(13) Today both men and women most dislike being {{13}} by colleagues sitting nearby.\n(14) Men still complain about their colleagues’ choice of {{14}} station.\n(15) Women are particularly irritated by people who never make the {{15}}.\n(16) Over half of those surveyed would give up a week’s {{16}} for pleasant colleagues.\n(17) About a quarter said they would accept {{17}} for a better atmosphere.\n(18) In response, Redcom has organised a {{18}} on employee relationships.',
      blanks: [
        { num: 9,  answers: ['chips', 'computer chips', 'microchips'] },
        { num: 10, answers: ['1981'] },
        { num: 11, answers: ['gossip'] },
        { num: 12, answers: ['photocopier', 'photo-copier'] },
        { num: 13, answers: ['emailed', 'e-mailed', 'sent emails', 'emails'] },
        { num: 14, answers: ['radio'] },
        { num: 15, answers: ['tea'] },
        { num: 16, answers: ['holiday', 'holidays'] },
        { num: 17, answers: ['less pay', 'lower pay', 'a pay cut'] },
        { num: 18, answers: ['workshop'] },
      ],
    },
    part3: {
      intro: '',
      optionsLabel:
        'Options — A: I unexpectedly met someone from my past. · B: A holiday I had planned had to be cancelled. · C: I made an exciting discovery. · D: I enjoyed a rare taste of luxury. · E: My journey home went badly wrong. · F: I got lost in an unfamiliar city. · G: The weather ruined my plans. · H: I spent far more money than I had meant to.',
      options: [
        'A  I unexpectedly met someone from my past',
        'B  A planned holiday had to be cancelled',
        'C  I made an exciting discovery',
        'D  I enjoyed a rare taste of luxury',
        'E  My journey home went badly wrong',
        'F  I got lost in an unfamiliar city',
        'G  The weather ruined my plans',
        'H  I spent far more than I had meant to',
      ],
      answers: [0, 1, 2, 3, 4],
    },
    part4: {
      intro:
        'You will hear an interview with Jeremy Wales, who lectures in “ethical design”. For each question, choose the answer (A, B or C) that fits best.',
      questions: [
        {
          label: '',
          text: '(24) According to Jeremy, what is the central aim of ethical design?',
          options: [
            'A  To combine attractive design with ethical principles.',
            'B  To make design as cheap as possible.',
            'C  To copy traditional craft styles exactly.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(25) What does Jeremy say is the most publicised part of ethical design?',
          options: [
            'A  The relationship between rich and poor countries.',
            'B  The use of the latest technology.',
            'C  The training of young designers.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(26) What else does ethical design pay attention to?',
          options: [
            'A  Protecting the environment.',
            'B  Increasing company profits.',
            'C  Following the latest fashions.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(27) What does the LOSA project bring together?',
          options: [
            'A  British designers and South African craft workers.',
            'B  Two rival design colleges in London.',
            'C  Museums in Britain and South Africa.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(28) What were the South African workers advised to do?',
          options: [
            'A  Turn their souvenirs into more desirable items.',
            'B  Copy popular Western designs exactly.',
            'C  Sell only to local tourists.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(29) What was the main change made to the products?',
          options: [
            'A  They were simplified, with fewer colours and straighter lines.',
            'B  They were made much larger and heavier.',
            'C  They lost their traditional local character.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(30) How is the money from LOSA shared?',
          options: [
            'A  The British designers take only a small fee and the rest goes back into the business.',
            'B  The British designers keep most of the profit.',
            'C  All the profit is given to local charities.',
          ],
          answer: 0,
        },
      ],
    },
  },

  // ── SET 8 · audio mock8 (everyday situations / climate change / Tonga) ─────
  8: {
    folder: 'mock8',
    files: ['b2-test-26-1', 'b2-test-26-2', 'b2-test-26-3', 'b2-test-26-4'],
    part1: {
      questions: [
        {
          label: 'Extract 1 — Two people talk on a bus.',
          text: '(1) Where has the woman just been?',
          options: ['A  At the cinema.', 'B  At the shops.', 'C  In a café.'],
          answer: 0,
        },
        {
          label: 'Extract 2 — A man leaves a message on his mobile phone.',
          text: '(2) Who is the message for?',
          options: ['A  His wife.', 'B  His secretary.', 'C  A teacher.'],
          answer: 0,
        },
        {
          label: 'Extract 3 — You hear a woman at the hairdresser’s.',
          text: '(3) What is she doing?',
          options: ['A  Complaining.', 'B  Apologising.', 'C  Asking for information.'],
          answer: 0,
        },
        {
          label: 'Extract 4 — A teenager talks about something he enjoys in his free time.',
          text: '(4) What is he talking about?',
          options: ['A  An electric guitar.', 'B  A computer game.', 'C  A CD player.'],
          answer: 0,
        },
        {
          label: 'Extract 5 — On the news you hear a story about a zoo.',
          text: '(5) Why is the zoo in the news?',
          options: [
            'A  An unusual birth has taken place.',
            'B  Experts have found a way to encourage breeding.',
            'C  Warm weather has brought record visitor numbers.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 6 — A man talks about a holiday he has had.',
          text: '(6) Where has he been?',
          options: ['A  In the mountains.', 'B  Beside the sea.', 'C  On a farm.'],
          answer: 0,
        },
        {
          label: 'Extract 7 — You hear two people talking at home.',
          text: '(7) How does the man feel?',
          options: ['A  Exhausted.', 'B  Surprised.', 'C  Pleased.'],
          answer: 0,
        },
        {
          label: 'Extract 8 — You turn on the radio and hear a woman talking.',
          text: '(8) What are you listening to?',
          options: ['A  Traffic news.', 'B  A weather forecast.', 'C  Sports news.'],
          answer: 0,
        },
      ],
    },
    part2: {
      intro:
        'You will hear an interview with Mark Ponton of the World Climate Organisation, about unusual recent weather. Complete each sentence with a word or short phrase.',
      template:
        '(9) The World Climate Organisation has its headquarters in {{9}}.\n(10) Last month the United States had more {{10}} than in any month since records began.\n(11) In the US, these events caused the deaths of {{11}} people.\n(12) In India, temperatures reached {{12}} degrees, well above normal.\n(13) In Sri Lanka, unusually heavy {{13}} caused flooding and landslides.\n(14) In Europe, England and Wales had remarkably strong {{14}}.\n(15) Switzerland has not had such a heat wave since the {{15}}.\n(16) Mark’s first conclusion is that temperatures are generally getting {{16}}.\n(17) This warming trend has been observed for over {{17}}.\n(18) His second conclusion is that the weather is now much less {{18}}.',
      blanks: [
        { num: 9,  answers: ['Switzerland'] },
        { num: 10, answers: ['tornadoes', 'tornados'] },
        { num: 11, answers: ['41', 'forty-one', 'forty one'] },
        { num: 12, answers: ['45', 'forty-five', 'forty five'] },
        { num: 13, answers: ['rainfall', 'rain'] },
        { num: 14, answers: ['winds', 'wind'] },
        { num: 15, answers: ['18th century', 'mid-18th century', 'eighteenth century'] },
        { num: 16, answers: ['hotter', 'warmer'] },
        { num: 17, answers: ['30 years', 'thirty years'] },
        { num: 18, answers: ['stable', 'predictable'] },
      ],
    },
    part3: {
      intro: '',
      optionsLabel:
        'Options — A: It depends on what the experiment is for. · B: It is always wrong, as there is always an alternative. · C: Humans have the right to use animals for our benefit. · D: A friend changed my mind and I became sympathetic. · E: There are far more important issues to deal with first. · F: Testing should be banned only for cosmetics. · G: I have never thought about the issue at all. · H: Scientists should decide the rules themselves.',
      options: [
        'A  It depends what the experiment is for',
        'B  It is always wrong; there is always an alternative',
        'C  Humans have the right to use animals for our benefit',
        'D  A friend changed my mind and I became sympathetic',
        'E  There are far more important issues to deal with first',
        'F  Testing should be banned only for cosmetics',
        'G  I have never thought about the issue at all',
        'H  Scientists should decide the rules themselves',
      ],
      answers: [0, 1, 2, 3, 4],
    },
    part4: {
      intro:
        'You will hear a teacher giving a class an introduction to the Pacific kingdom of Tonga. For each question, choose the answer (A, B or C) that fits best.',
      questions: [
        {
          label: '',
          text: '(24) How many of Tonga’s islands are inhabited?',
          options: ['A  45.', 'B  171.', 'C  100.'],
          answer: 0,
        },
        {
          label: '',
          text: '(25) What is Tonga proud to claim?',
          options: [
            'A  It is the first country to see each new day.',
            'B  It is the smallest kingdom in the world.',
            'C  It has the oldest monarchy on Earth.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(26) What does Tonga’s economy rely on most?',
          options: [
            'A  Money sent from abroad and foreign aid.',
            'B  Large-scale industrial exports.',
            'C  Income from mass tourism.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(27) Who gave the islands the name “the friendly islands”?',
          options: [
            'A  The explorer Captain James Cook.',
            'B  The first Tongan king.',
            'C  Early tourist companies.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(28) What is the official language of Tonga?',
          options: ['A  English.', 'B  French.', 'C  Spanish.'],
          answer: 0,
        },
        {
          label: '',
          text: '(29) Why does Tonga appear in the Guinness Book of Records?',
          options: [
            'A  For a very long-lived tortoise and for the world’s heaviest monarch.',
            'B  For having the most islands of any country.',
            'C  For holding the largest feast ever recorded.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(30) How is most Tongan food traditionally cooked?',
          options: [
            'A  In an underground oven called an umu.',
            'B  Over an open fire on the beach.',
            'C  In large pots of boiling water.',
          ],
          answer: 0,
        },
      ],
    },
  },

  // ── SET 9 · audio mock9 (everyday situations / activity centre / complaints) ─
  9: {
    folder: 'mock9',
    files: ['b2-test-25-1', 'b2-test-25-2', 'b2-test-25-3', 'b2-test-25-4'],
    part1: {
      questions: [
        {
          label: 'Extract 1 — You hear part of a radio programme.',
          text: '(1) What is the person talking about?',
          options: ['A  Gardening.', 'B  Cooking.', 'C  The weather.'],
          answer: 0,
        },
        {
          label: 'Extract 2 — Two people talk on a train.',
          text: '(2) How is the woman feeling?',
          options: ['A  Relieved.', 'B  Worried.', 'C  Angry.'],
          answer: 0,
        },
        {
          label: 'Extract 3 — Two friends discuss a possible tax increase.',
          text: '(3) What does the woman say about the tax increase?',
          options: [
            'A  She would accept it if the money were spent well.',
            'B  She thinks high earners are right to move abroad.',
            'C  She is sure the money would be wasted.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 4 — Two friends talk on a park bench.',
          text: '(4) What are they discussing?',
          options: ['A  A drink.', 'B  A salad.', 'C  A cake.'],
          answer: 0,
        },
        {
          label: 'Extract 5 — You overhear two people talking on a bus.',
          text: '(5) What is their relationship?',
          options: ['A  Friends.', 'B  Husband and wife.', 'C  Boss and employee.'],
          answer: 0,
        },
        {
          label: 'Extract 6 — You hear someone talking on the radio.',
          text: '(6) What has happened?',
          options: [
            'A  A road accident.',
            'B  A crash in a car race.',
            'C  Injuries caused by flooding.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 7 — Two people talk in a restaurant.',
          text: '(7) Where does the man want to sit?',
          options: ['A  At a quiet table.', 'B  By the window.', 'C  Near the kitchen.'],
          answer: 0,
        },
        {
          label: 'Extract 8 — You hear a radio show about a new book.',
          text: '(8) How much does the woman like the book?',
          options: ['A  A little.', 'B  Very much.', 'C  Not at all.'],
          answer: 0,
        },
      ],
    },
    part2: {
      intro:
        'You will hear a man called James welcoming guests to a weekend activity centre. Complete each sentence with a word or short phrase.',
      template:
        '(9) James is going to coach the guests who chose {{9}}.\n(10) All meals will be eaten in the {{10}} dining room.\n(11) After eating, guests are asked to return their dishes to the {{11}}.\n(12) Guests must leave their outdoor {{12}} in the entrance hall.\n(13) Guests are asked not to use the {{13}} between midnight and 6.30 a.m.\n(14) Tomorrow morning’s {{14}} session may have to move to Sunday.\n(15) As a new alternative tomorrow morning, guests can try {{15}}.\n(16) Tomorrow evening there will be a special dinner followed by Scottish country {{16}}.\n(17) The evening’s music will be played by a Scottish {{17}} group.\n(18) This replaces the {{18}} that had originally been advertised.',
      blanks: [
        { num: 9,  answers: ['water skiing', 'water-skiing', 'waterskiing'] },
        { num: 10, answers: ['large', 'big'] },
        { num: 11, answers: ['kitchen'] },
        { num: 12, answers: ['shoes'] },
        { num: 13, answers: ['showers', 'shower'] },
        { num: 14, answers: ['sailing'] },
        { num: 15, answers: ['canoeing'] },
        { num: 16, answers: ['dancing'] },
        { num: 17, answers: ['folk'] },
        { num: 18, answers: ['disco'] },
      ],
    },
    part3: {
      intro: '',
      optionsLabel:
        'Options — A: The job is rewarding, but the pay is low. · B: I enjoy it because I keep learning myself. · C: I need a job that lets me work with my hands. · D: Good pay and perks make up for the dull moments. · E: I value the freedom of working for myself. · F: I mainly do it to travel the world cheaply. · G: I plan to change to a different career soon. · H: I only took the job to please my family.',
      options: [
        'A  Rewarding, but the pay is low',
        'B  I enjoy it because I keep learning too',
        'C  I need a job that uses my hands',
        'D  Good pay and perks make up for dull moments',
        'E  I value the freedom of working for myself',
        'F  I do it mainly to travel cheaply',
        'G  I plan to change career soon',
        'H  I took the job to please my family',
      ],
      answers: [0, 1, 2, 3, 4],
    },
    part4: {
      intro:
        'You will hear an interview with Tanya Brown, a consumer-affairs expert, about how to complain effectively. For each question, choose the answer (A, B or C) that fits best.',
      questions: [
        {
          label: '',
          text: '(24) What does Tanya say is the first thing to do before complaining?',
          options: [
            'A  Be clear about exactly what you want to happen.',
            'B  Decide how much compensation to demand.',
            'C  Warn the company that you intend to complain.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(25) Who does Tanya suggest talking to if you are unsure what to do?',
          options: [
            'A  An organisation such as the Citizens Advice bureau.',
            'B  A lawyer who specialises in consumer law.',
            'C  Other customers of the same company.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(26) What does Tanya advise if you complain by phone?',
          options: [
            'A  Note down who you spoke to and what they said.',
            'B  Always ask to speak to the manager.',
            'C  Record the whole call secretly.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(27) Why does Tanya prefer complaining by letter?',
          options: [
            'A  You keep a record of exactly what you said.',
            'B  It always gets a faster reply.',
            'C  It costs less than phoning.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(28) What does Tanya say about the appearance of a complaint letter?',
          options: [
            'A  It is better to type it than to write by hand.',
            'B  It should always be kept to one page.',
            'C  Colourful paper helps it stand out.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(29) Who does Tanya say you should address the letter to?',
          options: [
            'A  A named person rather than a department.',
            'B  The company’s managing director.',
            'C  The customer complaints department in general.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(30) What does Tanya recommend including in the letter?',
          options: [
            'A  A fixed deadline for a reply.',
            'B  A threat of legal action.',
            'C  A copy of the original receipt only.',
          ],
          answer: 0,
        },
      ],
    },
  },

  // ── SET 10 · audio mock10 (everyday situations / travel career / chef) ─────
  10: {
    folder: 'mock10',
    files: ['b2-test-24-1', 'b2-test-24-2', 'b2-test-24-3', 'b2-test-24-4'],
    part1: {
      questions: [
        {
          label: 'Extract 1 — On a train you overhear a woman phoning her office.',
          text: '(1) Why has she phoned?',
          options: [
            'A  To check the time of an appointment.',
            'B  To apologise for being late.',
            'C  To find out where her diary is.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 2 — You switch on the radio in the middle of a programme.',
          text: '(2) What kind of programme is it?',
          options: ['A  A nature programme.', 'B  A cookery programme.', 'C  A news programme.'],
          answer: 0,
        },
        {
          label: 'Extract 3 — You overhear a watchmaker talking to a customer.',
          text: '(3) What does the watchmaker say about the watch?',
          options: [
            'A  It is not worth repairing.',
            'B  It is impossible to repair.',
            'C  He does not have the parts to repair it.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 4 — A woman talks about her new neighbours.',
          text: '(4) How does she feel?',
          options: ['A  Suspicious.', 'B  Offended.', 'C  Shocked.'],
          answer: 0,
        },
        {
          label: 'Extract 5 — A man talks about deep-sea diving.',
          text: '(5) Why does he like the sport?',
          options: [
            'A  It is a complete contrast to his normal life.',
            'B  It suits his sociable nature.',
            'C  It satisfies his need for a challenge.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 6 — A scientist is interviewed about violins.',
          text: '(6) What is the scientist doing?',
          options: [
            'A  Explaining how a violin works.',
            'B  Explaining how a violin is made.',
            'C  Explaining how a violin should be played.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 7 — Part of a radio programme about CD-ROMs.',
          text: '(7) What is the speaker’s opinion of the CD-ROMs about Australia she tried?',
          options: [
            'A  Most of them are disappointing.',
            'B  An ordinary guidebook is better.',
            'C  There is little difference between them.',
          ],
          answer: 0,
        },
        {
          label: 'Extract 8 — A woman gives advice to business people.',
          text: '(8) What advice does she give about dealing with customers?',
          options: [
            'A  Do not let a call go on for too long.',
            'B  Do not show them any sympathy.',
            'C  Do not let them push you into agreeing to something.',
          ],
          answer: 0,
        },
      ],
    },
    part2: {
      intro:
        'You will hear an interview with Sylvia Short, who works for a company that produces travel guidebooks. Complete each sentence with a word or short phrase.',
      template:
        '(9) Sylvia’s university degree was in German and {{9}}.\n(10) After university, Sylvia first worked as an English {{10}} in Spain.\n(11) She then spent six months working as a tour {{11}} in Italy.\n(12) To find work, Sylvia decided to write to companies {{12}} instead of waiting for adverts.\n(13) In her first job, Sylvia mainly dealt with the {{13}}.\n(14) Sylvia is now in charge of all the {{14}} for new guidebooks.\n(15) Sylvia says that odd requests often come from {{15}}.\n(16) A large part of Sylvia’s job is making sure her {{16}} is where she should be.\n(17) Sylvia says her boss has especially helped her with writing {{17}}.\n(18) In the future, Sylvia would like to become a TV {{18}}.',
      blanks: [
        { num: 9,  answers: ['Spanish'] },
        { num: 10, answers: ['teacher'] },
        { num: 11, answers: ['guide'] },
        { num: 12, answers: ['directly', 'direct'] },
        { num: 13, answers: ['post', 'mail'] },
        { num: 14, answers: ['advertising', 'advertisements', 'adverts', 'press advertising'] },
        { num: 15, answers: ['journalists', 'journalist'] },
        { num: 16, answers: ['boss', 'manager'] },
        { num: 17, answers: ['press releases', 'press-releases', 'press release'] },
        { num: 18, answers: ['presenter'] },
      ],
    },
    part3: {
      intro: '',
      optionsLabel:
        'Options — A: Motorcycling has been my life’s work. · B: I want new riders to get proper training. · C: For me, riding is an escape from everyday stress. · D: For me, it means total freedom and independence. · E: My mother shared my passion for biking. · F: I gave up riding after a bad accident. · G: I only ride to save money on transport. · H: My family strongly disapproves of my hobby.',
      options: [
        'A  Motorcycling has been my life’s work',
        'B  I want new riders to get proper training',
        'C  Riding is an escape from everyday stress',
        'D  For me it means total freedom and independence',
        'E  My mother shared my passion for biking',
        'F  I gave up riding after a bad accident',
        'G  I only ride to save money',
        'H  My family disapproves of my hobby',
      ],
      answers: [0, 1, 2, 3, 4],
    },
    part4: {
      intro:
        'You will hear an interview with Steve Thomas, a young television chef. For each question, choose the answer (A, B or C) that fits best.',
      questions: [
        {
          label: '',
          text: '(24) What does Steve say makes him different from other TV chefs?',
          options: [
            'A  He shows how a dish is prepared right from the start.',
            'B  He only ever cooks very simple dishes.',
            'C  He never makes any mistakes on screen.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(25) How did Steve come to get his own TV series?',
          options: [
            'A  A producer spotted him while filming a documentary.',
            'B  He sent recordings of himself to a TV company.',
            'C  A famous chef recommended him.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(26) Why did Steve start helping in the kitchen as a child?',
          options: [
            'A  His father said he had to work for his money.',
            'B  He was forced to replace an absent cook.',
            'C  He wanted to avoid his schoolwork.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(27) What does Steve say about his time at college?',
          options: [
            'A  He did well because he was interested in the cooking.',
            'B  He found every part of it equally boring.',
            'C  He nearly left before finishing the course.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(28) How does Steve treat the cooks who work for him?',
          options: [
            'A  He criticises poor work but also praises good work.',
            'B  He never lets them make any decisions.',
            'C  He rarely speaks to them at all.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(29) What does Steve most admire about the chef Ron Bell?',
          options: [
            'A  His enthusiasm for using local ingredients.',
            'B  His willingness to try the newest recipes.',
            'C  The glossy cookbooks he produces.',
          ],
          answer: 0,
        },
        {
          label: '',
          text: '(30) What does Steve say about his own cookbook?',
          options: [
            'A  It has fewer pictures but is more useful.',
            'B  It is aimed only at professional chefs.',
            'C  It focuses on how good the food looks.',
          ],
          answer: 0,
        },
      ],
    },
  },
};
