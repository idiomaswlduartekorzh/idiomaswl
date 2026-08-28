#!/usr/bin/env node

import set12 from '../src/data/mocks/ielts-set-12.ts';
import { runGoldenContentAudit } from './lib/audit-ielts-golden-content.mjs';

runGoldenContentAudit({
  mock: set12,
  set: 12,
  reportAsOf: '2026-08-28',
  reportFile: 'ielts-golden-set12-audit-2026-08-28.json',
  expectedMediaStatus: 'legacy-audio-under-review',
  inheritedPhrases: [
    "Today, they face an unprecedented convergence of threats that scientists warn could eliminate most of the world's reefs within decades",
    'The origins lie in the Indian subcontinent, where a game called chaturanga',
    'Few topics in contemporary public discourse generate as much concern and controversy',
    'Social media platforms have become a major part of daily life for people of all ages',
  ],
  task1Tokens: ['coastal monitoring station', '1980', '2022', '1961–1990', 'degrees Celsius'],
  speakingPattern: /technology|social media|online|privacy|communication/i,
  extraChecks: ({ skills }) => {
    const listening = skills.listening.flatMap((section) => section.questions);
    const reading = skills.reading.flatMap((section) => section.questions);
    const l4 = listening.find((item) => item.id === 'l4-form');
    const r1Sent = reading.find((item) => item.id === 'r1-sent');
    const r2Sum = reading.find((item) => item.id === 'r2-sum');
    const r3Claims = reading.find((item) => item.id === 'r3-ynng');
    const r3Sent = reading.find((item) => item.id === 'r3-sent');
    return [
      { condition: l4?.blanks.find((item) => item.num === 40)?.answers[0] === 'ultraviolet', message: 'Listening Q40 closes the colour-vision lecture in evidence order.' },
      { condition: /short-, medium- and long-wavelength cones/i.test(skills.listening[3]?.transcript ?? ''), message: 'Colour-vision lecture uses the scientific cone labels before the simplified colour labels.' },
      { condition: /complete absence of colour perception is rare/i.test(skills.listening[3]?.transcript ?? ''), message: 'Colour-vision lecture does not equate every deficiency with total colour blindness.' },
      { condition: r1Sent?.blanks.find((item) => item.num === 9)?.answers[0] === '2025', message: 'Coral Q9 reflects NOAA’s June 2026 conclusion about the fourth global event.' },
      { condition: /eighty-four percent.+eighty-three countries and territories/i.test(skills.reading[0]?.passage ?? ''), message: 'Coral passage carries the current NOAA exposure and field-report scope.' },
      { condition: /bleached coral is not necessarily dead/i.test(skills.reading[0]?.passage ?? ''), message: 'Coral passage distinguishes bleaching from mortality.' },
      { condition: r2Sum?.blanks.find((item) => item.num === 24)?.answers[0] === 'world champions', message: 'Chess Q24 remains supported after correcting the Soviet chronology.' },
      { condition: !/beginning with Alexander Alekhine/i.test(skills.reading[1]?.passage ?? ''), message: 'Chess passage does not misclassify Alekhine as the product of the Soviet championship system.' },
      { condition: r3Claims?.blanks.find((item) => item.num === 31)?.answers[0] === 'NO', message: 'Social-media Q31 rejects the universal-harm interpretation.' },
      { condition: r3Claims?.blanks.find((item) => item.num === 36)?.answers[0] === 'NOT GIVEN', message: 'Social-media Q36 does not invent comparative policy-effectiveness evidence.' },
      { condition: r3Sent?.blanks.find((item) => item.num === 38)?.answers[0] === 'problematic use', message: 'Social-media Q38 distinguishes impaired control from frequency.' },
      { condition: /intrudes on privacy and may discourage honest communication/i.test(skills.writing[1]?.questions[0]?.stimulus ?? ''), message: 'Writing Task 2 presents a specific, balanced school-policy conflict.' },
    ];
  },
  provenanceSearch: {
    method: 'Exact public-web searches of distinctive sentences from all three revised Reading passages and the revised Writing Task 2 prompt returned no exact match. Generic topic facts were retained only after independent reconstruction and source review.',
    phrasesChecked: [
      'Satellite monitoring and field reports show how widely the risk has spread',
      'Written sources and surviving objects do not reveal one inventor or a single moment of creation',
      'Time on a platform, constant contact with friends and loss of control over use are not interchangeable',
      'Some schools ask students to keep private diaries of their social-media habits',
    ],
  },
  factualSources: [
    'https://www.nesdis.noaa.gov/news/worlds-fourth-mass-coral-bleaching-event-likely-ended-2025',
    'https://oceanservice.noaa.gov/facts/acidification.html',
    'https://museum.fide.com/',
    'https://museum.fide.com/champions/wilhelm-steinitz',
    'https://www.fide.com/fide-celebrates-its-centenary-anniversary-with-a-series-of-key-events/',
    'https://www.hhs.gov/surgeongeneral/reports-and-publications/youth-mental-health/social-media/index.html',
    'https://www.who.int/europe/news-room/25-09-2024-teens--screens-and-mental-health',
    'https://www.nei.nih.gov/eye-health-information/eye-conditions-and-diseases/color-blindness/causes-color-vision-deficiency',
    'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-writing',
  ],
  reusedAndImproved: [
    'Four Listening scenarios, three Reading themes, objective numbering and IELTS question families.',
    'Existing line-chart SVG and the Writing/Speaking component architecture.',
    'Technology-and-communication Speaking theme, expanded to complete interview density.',
  ],
  replacedOrCorrected: [
    'Expanded all four Listening scripts with scenario-specific discourse while preserving answer evidence order.',
    'Updated the fourth global coral-bleaching event to NOAA’s June 2026 conclusion and qualified bleaching, acidification, valuation and restoration claims.',
    'Corrected the first world-championship and Soviet-era chronology and qualified uncertain origin and computer-intelligence claims.',
    'Rebuilt the social-media passage around official HHS and WHO evidence, separating prevalence, problematic use, mechanisms and causality.',
    'Replaced the generic advantages/disadvantages essay with an original school wellbeing-diary and privacy prompt.',
    'Reframed the Task 1 data as one-station illustrative data and added complete accessible semantics, units, years and values.',
  ],
  deferred: ['Listening audio replacement, mastering and waveform/ASR QA', 'Rendered browser and assistive-technology audit in later full-stack phases'],
});
