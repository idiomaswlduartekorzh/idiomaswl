#!/usr/bin/env node

import set11 from '../src/data/mocks/ielts-set-11.ts';
import { runGoldenContentAudit } from './lib/audit-ielts-golden-content.mjs';

runGoldenContentAudit({
  mock: set11,
  set: 11,
  reportAsOf: '2026-08-28',
  reportFile: 'ielts-golden-set11-audit-2026-08-28.json',
  expectedMediaStatus: 'legacy-audio-under-review',
  inheritedPhrases: [
    'delivered an estimated one million cubic metres of water daily to a city of around one million inhabitants',
    'generating local temperature reductions of up to eight degrees in public spaces',
    'Human beings like to think of themselves as rational agents',
    'Many cities around the world are experiencing the effects of rapid urbanisation',
  ],
  task1Tokens: ['Los Angeles', 'Singapore', 'Cape Town', 'Copenhagen', '2010', '2023', 'litres'],
  speakingPattern: /city|urban|neighbourhood|planning|heat|decision/i,
  extraChecks: ({ skills }) => {
    const listening = skills.listening.flatMap((section) => section.questions);
    const reading = skills.reading.flatMap((section) => section.questions);
    const l4 = listening.find((item) => item.id === 'l4-form');
    const r1Truth = reading.find((item) => item.id === 'r1-tfng');
    const r1Sent = reading.find((item) => item.id === 'r1-sent');
    const r3Truth = reading.find((item) => item.id === 'r3-ynng');
    const r3Q29 = reading.find((item) => item.id === 'r3-q29');
    return [
      { condition: l4?.blanks.find((item) => item.num === 40)?.answers[0] === 'Renaissance', message: 'Listening Q40 closes the aqueduct chronology in evidence order.' },
      { condition: /not a claim that the flow met modern microbiological standards/i.test(skills.listening[3]?.transcript ?? ''), message: 'Aqueduct lecture does not equate ancient supply with modern potability.' },
      { condition: r1Truth?.blanks.find((item) => item.num === 4)?.answers[0] === 'FALSE', message: 'Roman-water Q4 rejects a universal tank model.' },
      { condition: r1Sent?.blanks.find((item) => item.num === 10)?.answers[0] === 'taps', message: 'Roman-water Q10 uses Frontinus-era unauthorised diversions.' },
      { condition: !/rivals the per capita supply/i.test(skills.reading[0]?.passage ?? ''), message: 'Unreliable modern per-capita comparison is absent.' },
      { condition: !/up to eight degrees/i.test(skills.reading[1]?.passage ?? ''), message: 'Urban-heat passage removes the decontextualised eight-degree claim.' },
      { condition: /surface temperature rather than the air/i.test(skills.reading[1]?.passage ?? ''), message: 'Urban-heat passage distinguishes surface and air metrics.' },
      { condition: r3Q29?.answer === 1, message: 'Cognition Q29 requires a denominator-aware risk comparison.' },
      { condition: r3Truth?.blanks.find((item) => item.num === 33)?.answers[0] === 'NO', message: 'Cognition Q33 rejects treating every error as bias.' },
      { condition: /backfire effect.+not inevitable/i.test(skills.reading[2]?.passage ?? ''), message: 'Cognition passage qualifies the non-robust general backfire claim.' },
    ];
  },
  provenanceSearch: {
    method: 'Exact searches of the three revised Reading openings and revised Writing Task 2 prompt returned no exact public match. The inherited generic urbanisation prompt was replaced because its topic and wording are widely reproduced in IELTS practice.',
    phrasesChecked: [
      "Rome's capacity to move spring water across difficult terrain was, by ancient standards",
      'Cities are measurably warmer than the rural areas that surround them',
      'People can reason carefully, yet attention, memory, framing and prior knowledge also shape judgement',
      'Some city governments publish neighbourhood-level heat maps',
    ],
  },
  factualSources: [
    'https://www.parcoarcheologicoappiaantica.it/luoghi/acquedotti-claudio-marcio-e-novus/',
    'https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Frontinus/De_Aquis/home.html',
    'https://www.epa.gov/heatislands/what-are-heat-islands',
    'https://www.epa.gov/heatislands/benefits-trees-and-vegetation',
    'https://www.epa.gov/heatislands/using-cool-roofs-reduce-heat-islands',
    'https://pubmed.ncbi.nlm.nih.gov/32905023/',
    'https://pubmed.ncbi.nlm.nih.gov/32844338/',
    'https://www.justice.gov/archives/opa/pr/justice-department-announces-department-wide-procedures-eyewitness-identification',
  ],
  reusedAndImproved: [
    'Four Listening scenarios, three Reading themes, objective numbering and IELTS question families.',
    'Existing four-city water-consumption SVG and the Writing/Speaking component architecture.',
    'Urban-planning and decision-making Speaking themes, expanded to complete interview density.',
  ],
  replacedOrCorrected: [
    'Expanded all four Listening scripts with scenario-specific discourse while preserving answer evidence order.',
    'Qualified Roman capacity, surveying, distribution, sanitation and decline claims using source-aware historical reasoning.',
    'Separated surface from air temperature and added local climate, equity, water and density trade-offs to urban-heat claims.',
    'Corrected dual-process, backfire, availability, nudge and debiasing overgeneralisations.',
    'Replaced the generic urbanisation Task 2 with an original neighbourhood heat-map policy prompt.',
    'Added accessible semantics and complete city/year/unit alignment to the Task 1 visual.',
  ],
  deferred: ['Listening audio replacement, mastering and waveform/ASR QA', 'Rendered browser and assistive-technology audit in later full-stack phases'],
});
