#!/usr/bin/env node

import set6 from '../src/data/mocks/ielts-set-6.ts';
import { runGoldenContentAudit } from './lib/audit-ielts-golden-content.mjs';

runGoldenContentAudit({
  mock: set6,
  set: 6,
  reportAsOf: '2026-08-28',
  reportFile: 'ielts-golden-set6-audit-2026-08-28.json',
  expectedMediaStatus: 'legacy-audio-under-review',
  inheritedPhrases: [
    'The term gig economy describes a labour market characterised by short-term contracts',
    'Across the continent of Europe, a quiet revolution in conservation is under way',
    'Some people think that parents should limit the amount of screen time their children have',
    'Internet Usage by World Region',
  ],
  task1Tokens: ['Bellmere', 'households', 'Central', 'North', 'Riverside', 'East', 'South', '2000', '2022'],
  speakingPattern: /technology|automated|digital/i,
  extraChecks: ({ skills }) => {
    const reading = skills.reading.flatMap((section) => section.questions);
    const q4 = reading.find((item) => item.id === 'r1-tfng')?.blanks.find((item) => item.num === 4);
    const q33 = reading.find((item) => item.id === 'r3-ynng')?.blanks.find((item) => item.num === 33);
    const q30 = reading.find((item) => item.id === 'r3-q30');
    return [
      { condition: q4?.answers[0] === 'FALSE', message: 'Reading Q4 rejects the unsupported Talas-prisoner certainty.' },
      { condition: q33?.answers[0] === 'NO', message: 'Reading Q33 reflects the directive’s 2024 adoption, not a 2022 implementation.' },
      { condition: q30?.options[q30.answer]?.includes('automated management'), message: 'Reading Q30 tests the current dual scope of the EU directive.' },
      { condition: /500,000 hectares[^.]+15 landscapes/i.test(skills.reading[1]?.passage ?? ''), message: 'Rewilding targets distinguish direct management from wider influence.' },
      { condition: !/four billion trees annually/i.test(skills.reading[0]?.passage ?? ''), message: 'Unsupported tree-consumption statistic is absent.' },
    ];
  },
  provenanceSearch: {
    method: 'Exact searches of all three revised Reading openings returned no exact public match. The inherited Writing prompt did return a close public IELTS-practice match and was replaced.',
    phrasesChecked: [
      'Paper is so familiar that its history is often reduced to a single inventor and date',
      'When a European field stops being farmed, nature does not wait for a conservation plan',
      'A passenger sees a car moving across a phone screen; its driver sees an offer',
    ],
  },
  factualSources: [
    'https://www.iranicaonline.org/articles/paper-iran-prior-printing/',
    'https://www.cepi.org/press-release-european-paper-recycling-council-reports-strong-recycling-rates-for-2024/',
    'https://rewildingeurope.com/news/rewilding-europe-launches-ambitious-new-strategy-for-2030/',
    'https://rewildingeurope.com/news/the-rewilding-land-facility-boosting-land-access-to-drive-nature-recovery/',
    'https://www.exeter.ac.uk/research/creww/projects/beavertrial/',
    'https://news.exeter.ac.uk/top-stories/beavers-make-difference-to-flooding/',
    'https://www.mckinsey.com/br/our-insights/independent-work-choice-necessity-and-the-gig-economy',
    'https://supremecourt.uk/cases/uksc-2019-0029',
    'https://eur-lex.europa.eu/eli/dir/2024/2831/oj',
  ],
  reusedAndImproved: [
    'All four Listening scenarios, three Reading themes, question families and response numbering.',
    'Existing Task 1 SVG geometry, restyled as an explicitly fictional WeLearn dataset.',
    'Core Writing and Speaking components and technology theme.',
  ],
  replacedOrCorrected: [
    'Expanded all Listening scripts to full density and removed unsupported answer variants.',
    'Corrected the Talas transfer legend, Gutenberg exceptionalism and unsupported paper statistics.',
    'Replaced the simplistic Yellowstone cascade and corrected current Rewilding Europe targets.',
    'Updated the EU Platform Work Directive from a 2021 proposal to the adopted 2024 law.',
    'Replaced a publicly matching screen-time prompt and expanded Speaking Parts 1–3.',
  ],
  deferred: ['Listening audio replacement, mastering and waveform/ASR QA'],
});
