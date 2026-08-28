#!/usr/bin/env node

import set7 from '../src/data/mocks/ielts-set-7.ts';
import { runGoldenContentAudit } from './lib/audit-ielts-golden-content.mjs';

runGoldenContentAudit({
  mock: set7,
  set: 7,
  reportAsOf: '2026-08-28',
  reportFile: 'ielts-golden-set7-audit-2026-08-28.json',
  expectedMediaStatus: 'legacy-audio-under-review',
  listeningWordsMinimum: 2800,
  listeningPartWordsRange: [680, 760],
  inheritedPhrases: [
    'Nature has spent approximately 3.8 billion years refining its designs',
    'In 2004, journalist Dan Buettner',
    'The question of whether language influences thought has fascinated scholars',
    'Some people believe that learning a foreign language should be compulsory',
    'Electricity Generation by Source',
  ],
  task1Tokens: ['Alderwick', 'Brenton', 'food', 'paper and card', 'plastic', 'glass', 'other', '2025'],
  speakingPattern: /language|translation|communicat/i,
  extraChecks: ({ skills }) => {
    const listening = skills.listening.flatMap((section) => section.questions);
    const reading = skills.reading.flatMap((section) => section.questions);
    const l4 = listening.find((item) => item.id === 'l4-form');
    const r1 = reading.find((item) => item.id === 'r1-tfng');
    const r3 = reading.find((item) => item.id === 'r3-ynng');
    const q30 = reading.find((item) => item.id === 'r3-q30');
    const r2Table = reading.find((item) => item.id === 'r2-table');
    return [
      { condition: l4?.blanks.find((item) => item.num === 33)?.answers[0] === 'non-REM', message: 'Listening Q33 distinguishes REM from non-REM accurately.' },
      { condition: l4?.blanks.find((item) => item.num === 38)?.answers[0] === 'timing', message: 'Listening Q38 tests the adolescent circadian timing shift.' },
      { condition: r1?.blanks.find((item) => item.num === 4)?.answers[0] === 'FALSE', message: 'Reading Q4 rejects the unsupported Stenocara fog-basking claim.' },
      { condition: /demography is actively debated/i.test(skills.reading[1]?.passage ?? ''), message: 'Blue Zones passage distinguishes an observational framework from causal proof.' },
      { condition: /NO MORE THAN THREE WORDS/i.test(r2Table?.groupLabel ?? ''), message: 'Reading Q23 permits its three-word source answer.' },
      { condition: r3?.blanks.find((item) => item.num === 34)?.answers[0] === 'NO', message: 'Reading Q34 reflects the failed grammatical-gender replication.' },
      { condition: /replicat/i.test(q30?.options[q30.answer] ?? ''), message: 'Reading Q30 tests the evidential consequence of failed replication.' },
      { condition: !/teenagers require more sleep because their bodies are undergoing rapid growth/i.test(skills.listening[3]?.transcript ?? ''), message: 'Listening avoids the inherited unsupported explanation of adolescent sleep need.' },
    ];
  },
  provenanceSearch: {
    method: 'Exact searches of the three revised Reading openings and revised Writing Task 2 prompt returned no exact public match. Related Blue Zones scholarship was used only for factual verification.',
    phrasesChecked: [
      'An engineer looking at a leaf may see neither decoration nor a ready-made blueprint',
      'Blue Zone began as a demographic label for an area of Sardinia marked on a map',
      'Does a language change thought, or does it merely reveal distinctions its speakers already need',
      'Some universities require every student to complete at least one course taught in a language other than the main language of instruction',
    ],
  },
  factualSources: [
    'https://www.nature.com/articles/35102108',
    'https://link.springer.com/article/10.1186/1742-9994-7-23',
    'https://understand-energy-prod.stanford.edu/news/understand-energy-efficiency',
    'https://pmc.ncbi.nlm.nih.gov/articles/PMC12119521/',
    'https://doi.org/10.1093/geront/gnaf246',
    'https://pubmed.ncbi.nlm.nih.gov/22973243/',
    'https://www.reed.edu/psychology/thought-lab/assets/publications/Elpers%2C%20Jensen%2C%20_%20Holmes%202022%20-%20JML.pdf',
    'https://www.cambridge.org/core/journals/language-and-cognition/article/conceptual-replication-of-an-implicit-test-of-grammatical-gender-effects-on-inanimate-concepts/3A29B4CC2A45ADAB1B21910E79CB908C',
  ],
  reusedAndImproved: [
    'All four Listening scenarios, the three Reading themes, response numbering and IELTS task families.',
    'Existing exam runner, response components, Writing and Speaking architecture.',
    'Set 7 Task 1 asset path, replaced internally with a clear original WeLearn dataset.',
  ],
  replacedOrCorrected: [
    'Expanded all Listening scripts to full density and corrected sleep-stage, memory and adolescent-timing claims.',
    'Rebuilt and fact-checked Biomimicry, Blue Zones and Linguistic Relativity without changing their useful topic shells.',
    'Corrected the fog-basking species claim and qualified biomimicry performance claims.',
    'Removed causal overclaims and inaccurate completion wording from the Blue Zones tasks.',
    'Replaced a malformed inherited chart and public-match-risk Task 2 prompt with original WeLearn material.',
    'Expanded Speaking Parts 1–3 around one coherent language-and-communication topic.',
  ],
  deferred: ['Listening audio replacement, mastering and waveform/ASR QA'],
});
