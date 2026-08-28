#!/usr/bin/env node

import set20 from '../src/data/mocks/ielts-set-20.ts';
import { runGoldenContentAudit } from './lib/audit-ielts-golden-content.mjs';

runGoldenContentAudit({
  mock: set20,
  set: 20,
  reportAsOf: '2026-08-28',
  reportFile: 'ielts-golden-set20-audit-2026-08-28.json',
  expectedMediaStatus: 'script-ready-audio-blocked',
  inheritedPhrases: [
    'saved hundreds of millions of lives',
    'approximately 4.95 million further deaths',
    'surpassing cancer as a leading cause of mortality',
    'rapid diagnostic tests that can distinguish bacterial from viral infections in minutes',
    'supplied a significant fraction of the city\'s fresh vegetables',
    'measurable positive effects on air quality',
    'consistently associated with reduced levels of cortisol',
    'price parity with internal combustion engine vehicles without subsidies',
    'larger lifecycle carbon footprint than a fuel-efficient petrol car',
    'typically paid off over two to three years of driving',
  ],
  task1Tokens: ['global', 'electric-car', '2023', '2024', '2025', '14 million', '17 million', '21 million', '18 percent', '20 percent', '25 percent'],
  speakingPattern: /health|prevention|treatment|inequalit|community|city/i,
  extraChecks: ({ skills }) => {
    const reading = skills.reading.flatMap((section) => section.questions);
    const amrClaims = reading.find((item) => item.id === 'r1-tfng');
    const transportClaims = reading.find((item) => item.id === 'r3-ynng');
    return [
      { condition: /attributable to 1\.27 million deaths/i.test(skills.reading[0]?.passage ?? '') && /associated with 4\.95 million deaths in total/i.test(skills.reading[0]?.passage ?? ''), message: 'AMR passage distinguishes attributable deaths from the inclusive associated burden.' },
      { condition: /scenario, not an observed total/i.test(skills.reading[0]?.passage ?? '') && /24 pathogens in 15 families/i.test(skills.reading[0]?.passage ?? ''), message: 'AMR passage qualifies the 2050 projection and uses the WHO 2024 priority list.' },
      { condition: /97 antibacterial products in clinical development/i.test(skills.reading[0]?.passage ?? '') && /judged the pipeline insufficient/i.test(skills.reading[0]?.passage ?? ''), message: 'AMR pipeline claim matches WHO end-2023 monitoring.' },
      { condition: amrClaims?.blanks.find((item) => item.num === 6)?.answers[0] === 'FALSE', message: 'AMR Q6 rejects universal minute-scale diagnostic access.' },
      { condition: /do not prove that a garden alone caused/i.test(skills.reading[1]?.passage ?? '') && /not a substitute for controlling pollution at source/i.test(skills.reading[1]?.passage ?? ''), message: 'Urban-gardening benefits are framed as contextual associations rather than universal causal effects.' },
      { condition: /about 31 percent/i.test(skills.reading[2]?.passage ?? '') && /nearly 73 percent/i.test(skills.reading[2]?.passage ?? ''), message: 'Transport emissions use a dated, scoped EEA denominator.' },
      { condition: /21 million in 2025/i.test(skills.reading[2]?.passage ?? '') && /one quarter/i.test(skills.reading[2]?.passage ?? ''), message: 'Electric-car coverage includes full-year IEA 2025 sales and share.' },
      { condition: /about half the lifetime emissions/i.test(skills.reading[2]?.passage ?? '') && /universal two- or three-year/i.test(skills.reading[2]?.passage ?? ''), message: 'EV lifecycle discussion replaces the unsupported fixed payback and coal-grid reversal.' },
      { condition: transportClaims?.blanks.find((item) => item.num === 34)?.answers[0] === 'NOT GIVEN' && transportClaims?.blanks.find((item) => item.num === 35)?.answers[0] === 'NO', message: 'Transport claims distinguish absent rail-majority evidence from an explicit SAF contradiction.' },
      { condition: /symbols ≈ and &gt; preserve/i.test(skills.writing[0]?.questions[0]?.imageAlt ?? '') === false, message: 'Task 1 alt text reports the data rather than relying on visual symbols.' },
    ];
  },
  provenanceSearch: {
    method: 'Exact public-web searches of distinctive revised passages and the original private-car Writing conflict returned no exact match.',
    phrasesChecked: [
      'the larger number is not a further group to add to the first',
      'a garden is therefore one component of green infrastructure, not a substitute',
      'success inside an operational boundary does not prove universal autonomy',
      'Some people believe cities should restrict private-car use directly',
    ],
  },
  factualSources: [
    'https://www.who.int/publications/i/item/9789240093461',
    'https://www.who.int/observatories/global-observatory-on-health-research-and-development/monitoring/antibacterial-products-in-clinical-development-for-priority-pathogens-%28jun-2024%29',
    'https://www.who.int/europe/news/item/27-09-2024-global-leaders-set-first-targets-to-control-antimicrobial-resistance-crisis',
    'https://www.fao.org/antimicrobial-resistance/key-sectors/animal-production/en/',
    'https://www.who.int/europe/publications/i/item/WHO-EURO-2016-3352-43111-60341',
    'https://www.who.int/publications/i/item/B09366',
    'https://www.epa.gov/green-infrastructure/about-green-infrastructure',
    'https://www.eea.europa.eu/en/analysis/publications/sustainability-of-europes-mobility-systems-2025/climate',
    'https://www.iea.org/reports/global-ev-outlook-2026/executive-summary',
    'https://www.iea.org/reports/global-energy-review-2026/technology-electric-vehicles',
    'https://www.iea.org/reports/global-ev-outlook-2024/outlook-for-emissions-reductions',
    'https://www.icao.int/sites/default/files/2025-02/ICAO-EnvReport-2025.pdf',
    'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-writing',
  ],
  reusedAndImproved: [
    'All four Listening settings, the 40 objective response positions, the three Reading themes and the existing IELTS interaction components.',
    'The electric-transport Task 1 concept, rebuilt from dated IEA releases instead of unsupported city journey totals.',
    'The community-health cue card and public-policy discussion, expanded into a complete Speaking interview.',
  ],
  replacedOrCorrected: [
    'Replaced generic transcript padding with scenario-specific booking rules, museum accessibility, research ethics and supply-chain analysis.',
    'Corrected the relationship between 1.27 million attributable and 4.95 million associated AMR deaths.',
    'Qualified the 2050 AMR scenario, updated the WHO priority list and pipeline, and removed universal rapid-diagnostic and EU-use claims.',
    'Reframed green-space health, air-quality and social-trust claims as contextual evidence rather than automatic causality.',
    'Updated electric-car sales through 2025 and corrected affordability, lifecycle-emissions and fixed-payback claims.',
    'Distinguished geofenced robotaxi operations from universal autonomy and updated SAF scale language.',
    'Rebuilt Task 1 from IEA releases with a zero baseline, explicit qualifications, source, title and description.',
    'Reframed Task 2 as an original discuss-both-views conflict about restrictions, alternatives and equitable timing.',
  ],
  deferred: ['Listening audio casting, generation, mastering and waveform/ASR QA', 'Rendered browser and assistive-technology audit in later full-stack phases'],
});
