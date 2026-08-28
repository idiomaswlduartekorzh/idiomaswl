#!/usr/bin/env node

import set9 from '../src/data/mocks/ielts-set-9.ts';
import { runGoldenContentAudit } from './lib/audit-ielts-golden-content.mjs';

runGoldenContentAudit({
  mock: set9,
  set: 9,
  reportAsOf: '2026-08-28',
  reportFile: 'ielts-golden-set9-audit-2026-08-28.json',
  expectedMediaStatus: 'legacy-audio-under-review',
  inheritedPhrases: [
    'Today, smallpox has been completely eradicated, polio survives in only a handful of countries',
    'As of 2024, less than 25 percent of the ocean floor',
    'They were wrong, however, about the broader consequences',
    'Some people think that zoos are cruel and should be closed down',
  ],
  task1Tokens: ['Business and Management', 'Computer Science', 'Engineering', 'Health Sciences', 'Humanities', '2005', '2023', 'thousands'],
  speakingPattern: /science|research|specialist|volunteer/i,
  extraChecks: ({ skills }) => {
    const listening = skills.listening.flatMap((section) => section.questions);
    const reading = skills.reading.flatMap((section) => section.questions);
    const l4 = listening.find((item) => item.id === 'l4-form');
    const r1 = reading.find((item) => item.id === 'r1-table');
    const r2 = reading.find((item) => item.id === 'r2-sent');
    const r3 = reading.find((item) => item.id === 'r3-ynng');
    return [
      { condition: l4?.blanks.find((item) => item.num === 39)?.answers[0] === 'earthquakes', message: 'Listening Q39 preserves plural hazard evidence in order.' },
      { condition: /probabilistic forecasts/i.test(skills.listening[3]?.transcript ?? ''), message: 'Volcano lecture describes forecasts as probabilistic rather than certain.' },
      { condition: r1?.blanks.find((item) => item.num === 12)?.answers[0] === 'two', message: 'Vaccination Q12 reflects the two countries with endemic wild poliovirus.' },
      { condition: /In 2025,? a WHO expert review/i.test(skills.reading[0]?.passage ?? ''), message: 'Vaccination passage incorporates the WHO 2025 expert review.' },
      { condition: !/single injection/i.test(skills.reading[0]?.passage ?? ''), message: 'Vaccination passage removes the false single-injection generalisation.' },
      { condition: r2?.blanks.find((item) => item.num === 26)?.answers[0] === '2026', message: 'Deep-sea Q26 uses the BBNJ treaty entry-into-force year.' },
      { condition: /28\.7 percent/i.test(skills.reading[1]?.passage ?? ''), message: 'Deep-sea passage uses the April 2026 mapped-coverage figure.' },
      { condition: !/ratify and enforce/i.test(skills.reading[1]?.passage ?? ''), message: 'Deep-sea passage distinguishes treaty entry into force from enforcement.' },
      { condition: r3?.blanks.find((item) => item.num === 32)?.answers[0] === 'NO', message: 'Future-of-work Q32 rejects inevitable mass replacement.' },
      { condition: /one in four/i.test(skills.reading[2]?.passage ?? ''), message: 'Future-of-work passage incorporates the ILO 2025 exposure estimate.' },
      { condition: !/professional quality in seconds/i.test(skills.reading[2]?.passage ?? ''), message: 'Future-of-work passage removes an unsupported quality claim.' },
    ];
  },
  provenanceSearch: {
    method: 'Exact searches of all three revised Reading openings and the revised Writing Task 2 prompt returned no exact public match. The inherited zoo-closure prompt had public IELTS-practice matches and was replaced.',
    phrasesChecked: [
      'Vaccination is one of the most effective public-health interventions, but a vaccine is not one identical product',
      'The deep ocean is commonly described as water below 200 metres, beyond which sunlight rapidly diminishes',
      'Fear of technological displacement has a long history, but the Luddites are a poor shorthand',
      'Some research institutes invite members of the public to help classify wildlife images collected by remote cameras',
    ],
  },
  factualSources: [
    'https://www.who.int/news/item/25-08-2026-statement-of-the-forty-fifth-meeting-of-the-polio-ihr-emergency-committee',
    'https://www.who.int/news-room/spotlight/history-of-vaccination/history-of-smallpox-vaccination',
    'https://www.who.int/news-room/questions-and-answers/item/poliomyelitis',
    'https://www.who.int/news/item/11-12-2025-who-expert-group-s-new-analysis-reaffirms-there-is-no-link-between-vaccines-and-autism',
    'https://www.who.int/news-room/questions-and-answers/item/vaccines-and-immunization-vaccine-safety',
    'https://www.un.org/bbnjagreement/en',
    'https://seabed2030.org/2026/04/20/global-seabed-mapping-reaches-new-milestone-as-five-million-square-kilometres-added-in-a-year/',
    'https://www.ilo.org/resource/news/one-four-jobs-risk-being-transformed-genai-new-ilo%E2%80%93nask-global-index-shows',
    'https://www.ilo.org/publications/generative-ai-and-jobs-2025-update',
    'https://www.oecd.org/en/publications/artificial-intelligence-and-the-changing-demand-for-skills-in-the-labour-market_88684e36-en.html',
  ],
  reusedAndImproved: [
    'Four Listening scenarios, three Reading themes, objective numbering and IELTS question families.',
    'Existing five-category enrolment SVG and the Writing/Speaking component architecture.',
    'Science Speaking topic, expanded to full interview density and linked to the original citizen-science Task 2.',
  ],
  replacedOrCorrected: [
    'Expanded all four Listening scripts with scenario-specific discourse while preserving answer evidence order.',
    'Updated vaccine history, polio status and safety claims using WHO 2025–2026 evidence.',
    'Updated seabed mapping to 28.7 percent and distinguished BBNJ entry into force from implementation.',
    'Rebuilt future-of-work claims around task exposure, job quality and the ILO 2025 estimate.',
    'Replaced the publicly matching zoo Task 2 with an original citizen-science prompt.',
    'Aligned the Task 1 prompt, units and accessible SVG semantics with the five displayed categories.',
  ],
  deferred: ['Listening audio replacement, mastering and waveform/ASR QA'],
});
