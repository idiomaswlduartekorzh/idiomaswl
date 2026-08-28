#!/usr/bin/env node

import set8 from '../src/data/mocks/ielts-set-8.ts';
import { runGoldenContentAudit } from './lib/audit-ielts-golden-content.mjs';

runGoldenContentAudit({
  mock: set8,
  set: 8,
  reportAsOf: '2026-08-28',
  reportFile: 'ielts-golden-set8-audit-2026-08-28.json',
  expectedMediaStatus: 'legacy-audio-under-review',
  inheritedPhrases: [
    'The earliest unambiguous fossil evidence for domestic dogs dates to approximately 15,000 years ago',
    'some vertical farms report yields ten to twenty times greater',
    'most people feel the pain of losing one hundred pounds roughly twice as intensely',
    'governments should provide financial assistance to artists such as musicians, painters, and poets',
  ],
  task1Tokens: ['sunlight', 'solar panels', 'DC', 'inverter', 'AC', 'meter', 'home', 'national grid', 'battery storage'],
  speakingPattern: /art|museum|culture|creative/i,
  extraChecks: ({ skills }) => {
    const listening = skills.listening.flatMap((section) => section.questions);
    const reading = skills.reading.flatMap((section) => section.questions);
    const l4 = listening.find((item) => item.id === 'l4-form');
    const r1 = reading.find((item) => item.id === 'r1-tfng');
    const r2 = reading.find((item) => item.id === 'r2-sent');
    const r3 = reading.find((item) => item.id === 'r3-ynng');
    return [
      { condition: l4?.blanks.find((item) => item.num === 39)?.answers[0] === 'longitude', message: 'Listening Q39 preserves the navigation concept and ordered evidence.' },
      { condition: /Historians are cautious about assigning a single inventor/i.test(skills.listening[3]?.transcript ?? ''), message: 'Clock history distinguishes teaching shorthand from historical certainty.' },
      { condition: r1?.blanks.find((item) => item.num === 2)?.answers[0] === 'FALSE', message: 'Reading Q2 rejects a universally accepted dog-origin theory.' },
      { condition: /published in 2026/i.test(skills.reading[0]?.passage ?? ''), message: 'Dog passage incorporates the current 2026 ancient-genome evidence.' },
      { condition: r2?.blanks.find((item) => item.num === 21)?.answers[0] === '38–60', message: 'Vertical-farming Q21 uses a scoped life-cycle comparison.' },
      { condition: !/fifty times higher/i.test(skills.reading[1]?.passage ?? ''), message: 'Unsupported vertical-farming energy multiplier is absent.' },
      { condition: r3?.blanks.find((item) => item.num === 32)?.answers[0] === 'NO', message: 'Psychology Q32 rejects a context-invariant loss-aversion coefficient.' },
      { condition: r3?.blanks.find((item) => item.num === 34)?.answers[0] === 'NO', message: 'Psychology Q34 distinguishes correlation from causation.' },
      { condition: !/roughly twice as intensely/i.test(skills.reading[2]?.passage ?? ''), message: 'Psychology passage removes the universal twice-as-painful claim.' },
    ];
  },
  provenanceSearch: {
    method: 'Exact searches of all three revised Reading openings and the revised Writing Task 2 prompt returned no exact public match. The old arts-funding prompt returned multiple close IELTS-practice matches and was replaced.',
    phrasesChecked: [
      'Archaeological classification is difficult because an early dog need not resemble a modern breed',
      'Vertical farming grows crops in stacked layers, usually inside a controlled environment with electric lighting',
      'Economists often model choices using rational agents who maximise utility under stated assumptions',
      'Public museums increasingly create high-resolution digital copies of objects in their collections',
    ],
  },
  factualSources: [
    'https://www.nature.com/articles/s41586-026-10170-x',
    'https://www.nature.com/articles/s41586-026-10112-7',
    'https://www.nature.com/articles/s41586-022-04824-9',
    'https://www.nature.com/articles/nature11837',
    'https://www.sciencedirect.com/science/article/pii/S0959652622028013',
    'https://www.nature.com/articles/s41598-019-50783-z',
    'https://www.frontiersin.org/journals/sustainable-food-systems/articles/10.3389/fsufs.2024.1403580/full',
    'https://www.cambridge.org/core/journals/judgment-and-decision-making/article/loss-aversion-simply-does-not-materialize-for-smaller-losses/5B1998E9F1E47F3006235CC57AB51AB7',
    'https://www.oecd.org/en/publications/oecd-pensions-outlook-2018_pens_outlook-2018-en/full-report/component-8.html',
    'https://www.canada.ca/en/heritage-information-network/services/intellectual-property-copyright/guide-digital-rights-management.html',
  ],
  reusedAndImproved: [
    'Four Listening scenarios, three Reading themes, objective numbering and IELTS question families.',
    'Solar-process SVG and the existing Writing/Speaking component architecture.',
    'Art-and-culture Speaking topic, expanded to full interview density.',
  ],
  replacedOrCorrected: [
    'Expanded all four Listening scripts with scenario-specific discourse while preserving evidence order.',
    'Updated dog domestication with 2026 genomes and removed false certainty about location, process and a global dog-to-wolf ratio.',
    'Rebuilt vertical-farming comparisons around declared system boundaries, electricity and life-cycle evidence.',
    'Qualified loss aversion, social-media correlations, defaults and nudge ethics.',
    'Replaced the publicly matching arts-funding Task 2 with an original museum digitisation prompt.',
    'Added accessible semantics to the solar-process SVG and aligned its prompt and alternative text.',
  ],
  deferred: ['Listening audio replacement, mastering and waveform/ASR QA'],
});
