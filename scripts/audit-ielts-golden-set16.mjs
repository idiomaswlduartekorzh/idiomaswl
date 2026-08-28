#!/usr/bin/env node

import set16 from '../src/data/mocks/ielts-set-16.ts';
import { runGoldenContentAudit } from './lib/audit-ielts-golden-content.mjs';

runGoldenContentAudit({
  mock: set16,
  set: 16,
  reportAsOf: '2026-08-28',
  reportFile: 'ielts-golden-set16-audit-2026-08-28.json',
  expectedMediaStatus: 'script-ready-audio-blocked',
  inheritedPhrases: [
    'making it the cheapest source of new electricity generation in history in most parts of the world',
    'millions of people still lack access to clean drinking water, so a cheap, simple solution really does matter',
    'may allow them, in effect, to see magnetic lines',
    'the nature of the content and the social context of viewing appear more important than simple screen time duration',
    'this reduction is heavily concentrated in countries—particularly China and India—that integrated deeply into the global economy',
    'What are the advantages of this trend, and what challenges does the transition away from fossil fuels present?',
  ],
  task1Tokens: ['2015', '2022', 'Hydropower', 'Wind', 'Solar', 'Other', '1,209', '1,256', '432', '899', '227', '1,053', '118', '165', 'GW'],
  speakingPattern: /environment|energy|electricity|country|change/i,
  extraChecks: ({ skills }) => {
    const listening = skills.listening.flatMap((section) => section.questions);
    const reading = skills.reading.flatMap((section) => section.questions);
    const l3Concern = listening.find((item) => item.id === 'l3q24');
    const l3Priority = listening.find((item) => item.id === 'l3q25');
    const r1Truth = reading.find((item) => item.id === 'r1-tfng');
    const r1Sent = reading.find((item) => item.id === 'r1-sent');
    const r3Claims = reading.find((item) => item.id === 'r3-ynng');
    return [
      { condition: /does not kill bacteria/i.test(l3Concern?.options[l3Concern.answer] ?? '') && /disinfection stage/i.test(l3Priority?.options[l3Priority.answer] ?? ''), message: 'Prototype review separates particle filtration from validated disinfection.' },
      { condition: /not a certified drinking-water device.+must not imply that anyone should use it/is.test(skills.listening[2]?.transcript ?? ''), message: 'Water-treatment script explicitly prevents unsafe real-world use.' },
      { condition: /leading hypothesis.+cryptochrome molecules.+does not justify treating a single explanation as settled/is.test(skills.listening[3]?.transcript ?? ''), message: 'Bird lecture presents cryptochrome as a debated hypothesis rather than settled fact.' },
      { condition: r1Truth?.blanks.find((item) => item.num === 4)?.answers[0] === 'TRUE', message: 'Renewables Q4 preserves the IRENA 2010–2024 battery-cost decline.' },
      { condition: r1Sent?.blanks.find((item) => item.num === 11)?.answers[0] === 'electrolysis', message: 'Renewables Q11 correctly identifies electrolysis as the water-splitting process.' },
      { condition: /Content and social context therefore need to be considered alongside duration/i.test(skills.reading[1]?.passage ?? ''), message: 'Child-development passage avoids dismissing screen-use duration.' },
      { condition: r3Claims?.blanks.find((item) => item.num === 32)?.answers[0] === 'NO', message: 'Globalisation Q32 rejects an unsupported primary-cause claim.' },
      { condition: r3Claims?.blanks.find((item) => item.num === 33)?.answers[0] === 'NO', message: 'Globalisation Q33 distinguishes correlation from direct causation.' },
      { condition: /44 percent in 1990 to 10\.5 percent in 2022/i.test(skills.reading[2]?.passage ?? ''), message: 'Poverty figures use the World Bank June 2025 line and revisions.' },
    ];
  },
  provenanceSearch: {
    method: 'Exact public-web searches of three distinctive revised passages and the original energy-efficiency Writing prompt returned no exact match.',
    phrasesChecked: [
      'A responsible engineering project defines what the prototype can and cannot demonstrate',
      'Content and social context therefore need to be considered alongside duration',
      'which rules spread benefits, support adjustment and manage risks without abandoning cooperation',
      'spend public money on making homes more energy-efficient, while others think the money should be used to build more renewable power stations',
    ],
  },
  factualSources: [
    'https://www.irena.org/-/media/Files/IRENA/Agency/Publication/2023/Mar/IRENA_RE_Capacity_Highlights_2023.pdf',
    'https://www.irena.org/Digital-Report/Renewable-Power-Generation-Costs-in-2024',
    'https://www.iea.org/reports/integrating-solar-and-wind',
    'https://www.cdc.gov/global-water-sanitation-hygiene/about/about-household-water-treatment.html',
    'https://www.cdc.gov/drinking-water/prevention/about-choosing-home-water-filters.html',
    'https://journals.biologists.com/jeb/article/209/1/2/33398/Calibration-of-magnetic-and-celestial-compass-cues',
    'https://academic.oup.com/auk/article/126/4/717/5148354',
    'https://www.who.int/publications/i/item/97892400020986',
    'https://www.unicef.org/documents/care-child-development',
    'https://www.unicef.org/early-childhood-development',
    'https://www.worldbank.org/en/publication/wdr2020',
    'https://www.worldbank.org/en/news/factsheet/2025/06/05/june-2025-update-to-global-poverty-lines',
    'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-writing',
  ],
  reusedAndImproved: [
    'Four Listening scenarios, all 80 objective response positions, three Reading themes and the existing test component model.',
    'Renewable-capacity Task 1 concept, rebuilt with two internally consistent IRENA years and accessible data labels.',
    'Existing positive-change cue card and environment discussion theme, expanded to full interview density.',
  ],
  replacedOrCorrected: [
    'Replaced generic transcript padding with scenario-specific distractors, signposting and answer evidence in IELTS order.',
    'Reframed the student filter as a non-certified classroom prototype and separated filtration, disinfection and chemical risk.',
    'Corrected the star-compass, magnetoreception, olfactory navigation and inherited-versus-learned route claims.',
    'Updated renewable costs, storage, integration and green-hydrogen claims with 2024/2025 evidence.',
    'Qualified developmental stages, infant looking-time inference, language milestones, intervention returns and digital-media claims.',
    'Updated global poverty to the June 2025 methodology and separated trade correlation, causal inference and distribution.',
    'Replaced the generic Task 2 with an original, complete discuss-both-views policy conflict.',
    'Rebuilt Task 1 around official 2015 and 2022 capacities with accessible title, description, exact labels, unit and source note.',
  ],
  deferred: ['Listening audio casting, generation, mastering and waveform/ASR QA', 'Rendered browser and assistive-technology audit in later full-stack phases'],
});
