#!/usr/bin/env node

import set4 from '../src/data/mocks/ielts-set-4.ts';
import { runGoldenContentAudit } from './lib/audit-ielts-golden-content.mjs';

runGoldenContentAudit({
  mock: set4,
  set: 4,
  reportAsOf: '2026-08-28',
  reportFile: 'ielts-golden-set4-audit-2026-08-28.json',
  expectedMediaStatus: 'ready-existing',
  successStatus: 'content-and-audio-golden-reference',
  successNote: 'owner-accepted integral audio remains the release reference',
  inheritedPhrases: [
    'The line graph below shows the consumption of 4 kinds of meat in a European country from 1979 to 2004',
    'The best way to solve traffic congestion in cities is to provide free public transport',
  ],
  task1Tokens: ['Bellwick', 'bicycle', 'North Gate', 'East Gate', 'Library Gate', 'Riverside Gate', '2015', '2025'],
  speakingPattern: /skill|workplace|schools|employers|governments/i,
  extraChecks: ({ mock, skills }) => {
    const reading = skills.reading.flatMap((section) => section.questions);
    const q6 = reading.find((item) => item.id === 'r1q6');
    const q27 = reading.find((item) => item.id === 'r3q27');
    const q32 = reading.find((item) => item.id === 'r3q32');
    const q33 = reading.find((item) => item.id === 'r3q33');
    const writing = skills.writing.flatMap((section) => section.questions);
    const speaking = skills.speaking.flatMap((section) => section.questions);
    return [
      { condition: /before the sheep, goats, and cattle/i.test(q6?.text ?? ''), message: 'Reading Q6 avoids a disputed exact dog-domestication date.' },
      { condition: /almost 14 million/i.test(q27?.text ?? ''), message: 'Reading Q27 matches the IEA 2023 registration total.' },
      { condition: /2031/.test(q32?.text ?? ''), message: 'Reading Q32 uses the EU recycled-content application year.' },
      { condition: /carbon intensity/i.test(q33?.options?.[q33.answer] ?? ''), message: 'Reading Q33 tests the qualified life-cycle emissions claim.' },
      { condition: writing.every((item) => !/meat|free public transport/i.test(`${item.stimulusLabel} ${item.stimulus}`)), message: 'Both inherited public Writing prompts are absent.' },
      { condition: speaking.length === 3, message: 'Speaking uses exactly one recorded response unit per official part.' },
      { condition: mock.sections.filter((section) => section.skill === 'listening').every((section) => section.audioUrl === '/audio/ielts/ielts-listening-set-4.mp3'), message: 'The owner-accepted Set 4 Listening master remains untouched.' },
    ];
  },
  provenanceSearch: {
    method: 'Exact web searches found the inherited Task 1 meat chart and traffic-congestion Task 2 prompt across public IELTS-preparation sites; both were replaced. Exact searches of the three Reading openings returned no verbatim public match.',
    phrasesChecked: [
      'The shift from foraging to farming is widely regarded as the most significant transformation in human history',
      'For much of the twentieth century, sleep was regarded as little more than a passive state of unconsciousness',
      'The electric vehicle (EV) has moved rapidly from the margins of automotive technology',
      'The line graph below shows the consumption of 4 kinds of meat in a European country from 1979 to 2004',
      'The best way to solve traffic congestion in cities is to provide free public transport',
    ],
  },
  factualSources: [
    'https://www.frontiersin.org/journals/endocrinology/articles/10.3389/fendo.2020.00325/full',
    'https://pmc.ncbi.nlm.nih.gov/articles/PMC2680680/',
    'https://pmc.ncbi.nlm.nih.gov/articles/PMC3795358/',
    'https://www.iea.org/reports/global-ev-outlook-2024/trends-in-electric-cars',
    'https://theicct.org/wp-content/uploads/2025/07/ID-392-%E2%80%93-Life-cycle-GHG_report_final.pdf',
    'https://eur-lex.europa.eu/eli/reg/2023/1542/oj',
    'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-speaking',
  ],
  reusedAndImproved: [
    'All four owner-approved Listening parts, questions, answer evidence, casting and integral master.',
    'The three Reading themes and all forty response positions, with targeted factual corrections.',
    'The Writing and Speaking delivery components and their response persistence.',
  ],
  replacedOrCorrected: [
    'Replaced a widely circulated meat-consumption chart with an original fictional WeLearn bicycle-entry SVG.',
    'Replaced a publicly matching traffic-congestion prompt with an original two-view commuting-policy task.',
    'Expanded Speaking Part 1 and Part 3 to official-duration density and consolidated Part 3 into one response unit.',
    'Corrected the 2023 EV registration total, EU recycled-content year and categorical life-cycle emissions claim.',
    'Removed a disputed exact dog-domestication date and clarified herd-animal benefits.',
  ],
  deferred: [],
});
