#!/usr/bin/env node

import set10 from '../src/data/mocks/ielts-set-10.ts';
import { runGoldenContentAudit } from './lib/audit-ielts-golden-content.mjs';

runGoldenContentAudit({
  mock: set10,
  set: 10,
  reportAsOf: '2026-08-28',
  reportFile: 'ielts-golden-set10-audit-2026-08-28.json',
  expectedMediaStatus: 'legacy-audio-under-review',
  inheritedPhrases: [
    "Plastic pollution has become one of the most visible and alarming symptoms of humanity's impact",
    'The aggregate value of transactions flowing through sharing economy platforms reached an estimated 335 billion US dollars globally in 2025',
    'the outsourcing of memory to devices impairs the development of the neural networks that underpin deep comprehension and wisdom',
    'In many countries, people are moving away from rural areas and into cities',
  ],
  task1Tokens: ['Spain', 'Germany', 'Brazil', '2008', '2022', 'percentage'],
  speakingPattern: /environment|nature|climate|recycl|waste|sharing/i,
  extraChecks: ({ skills }) => {
    const listening = skills.listening.flatMap((section) => section.questions);
    const reading = skills.reading.flatMap((section) => section.questions);
    const l4 = listening.find((item) => item.id === 'l4-form');
    const r1Truth = reading.find((item) => item.id === 'r1-tfng');
    const r1Sent = reading.find((item) => item.id === 'r1-sent');
    const r2Sent = reading.find((item) => item.id === 'r2-sent');
    const r3Truth = reading.find((item) => item.id === 'r3-ynng');
    const r3Q30 = reading.find((item) => item.id === 'r3-q30');
    return [
      { condition: l4?.blanks.find((item) => item.num === 40)?.answers[0] === 'food', message: 'Listening Q40 closes after all earlier whale-migration evidence.' },
      { condition: /not a rule for every whale/i.test(skills.listening[3]?.transcript ?? ''), message: 'Whale lecture does not universalise one migration pattern.' },
      { condition: r1Truth?.blanks.find((item) => item.num === 6)?.answers[0] === 'FALSE', message: 'Microplastics Q6 rejects microbead restrictions as a complete solution.' },
      { condition: r1Sent?.blanks.find((item) => item.num === 13)?.answers[0] === 'administrative', message: 'Microplastics Q13 reflects the February 2026 INC-5.3 agenda.' },
      { condition: /held no substantive negotiations/i.test(skills.reading[0]?.passage ?? ''), message: 'Plastic-treaty status distinguishes negotiation from an adopted treaty.' },
      { condition: r2Sent?.blanks.find((item) => item.num === 21)?.answers[0] === 'transport services', message: 'Platform-economy Q21 uses the OECD reporting-rule scope.' },
      { condition: !/335 billion/i.test(skills.reading[1]?.passage ?? ''), message: 'Unsupported 2025 platform-market forecast is absent.' },
      { condition: r3Q30?.answer === 1, message: 'Memory Q30 preserves the balanced digital-memory conclusion.' },
      { condition: r3Truth?.blanks.find((item) => item.num === 31)?.answers[0] === 'NO', message: 'Memory Q31 distinguishes reduced seizures from complete control.' },
      { condition: /bilateral medial temporal surgery/i.test(skills.reading[2]?.passage ?? ''), message: 'H.M. is not misdescribed as a hippocampus-only lesion.' },
      { condition: !/neural networks that underpin deep comprehension/i.test(skills.reading[2]?.passage ?? ''), message: 'Unsupported digital-memory neural claim is absent.' },
    ];
  },
  provenanceSearch: {
    method: 'Exact searches of all three revised Reading openings and the revised Writing Task 2 prompt returned no exact public match. The inherited rural-to-urban prompt returned multiple close IELTS-practice matches and was replaced.',
    phrasesChecked: [
      'Plastic debris changes through sunlight, heat, waves and contact with other material',
      'Sharing economy is an unstable label',
      'Memory is closely connected to personal identity, but the connection is not simple',
      'Some local authorities give residents financial rewards for repairing and sharing household items',
    ],
  },
  factualSources: [
    'https://www.unep.org/inc-plastic-pollution',
    'https://www.who.int/publications/i/item/9789240054608',
    'https://www.who.int/publications/i/item/9789241516198',
    'https://www.oecd.org/en/topics/sub-issues/international-tax-compliance-policies-and-best-practices/model-reporting-rules-for-digital-platforms.html',
    'https://www.oecd.org/en/publications/the-impact-of-the-growth-of-the-sharing-and-gig-economy-on-vat-gst-policy-and-administration_51825505-en/full-report/component-9.html',
    'https://www.fisheries.noaa.gov/species/north-atlantic-right-whale',
    'https://www.fisheries.noaa.gov/national/endangered-species-conservation/vessel-strikes',
    'https://www.nature.com/articles/ncomms4122',
    'https://www.nature.com/articles/nrn726',
    'https://pubmed.ncbi.nlm.nih.gov/21764755/',
    'https://www.justice.gov/archives/opa/pr/justice-department-announces-department-wide-procedures-eyewitness-identification',
  ],
  reusedAndImproved: [
    'Four Listening scenarios, three Reading themes, objective numbering and IELTS question families.',
    'Existing three-country line-chart SVG and the Writing/Speaking component architecture.',
    'Environmental Speaking topic, expanded to complete interview density and linked to repair, sharing and recycling.',
  ],
  replacedOrCorrected: [
    'Expanded all four Listening scripts with scenario-specific discourse while preserving answer evidence order.',
    'Updated microplastic methods, health uncertainty and the February 2026 plastic-treaty negotiation status.',
    'Removed unsupported platform valuations and rebuilt the sharing-economy passage around OECD reporting, counterfactuals and worker classification.',
    'Corrected Locke, H.M., false-memory and digital-offloading claims without collapsing scientific uncertainty.',
    'Replaced the publicly matching rural-migration Task 2 with an original repair-and-sharing policy prompt.',
    'Added accessible semantics and full country/date/unit alignment to the Task 1 SVG and alternative text.',
  ],
  deferred: ['Listening audio replacement, mastering and waveform/ASR QA', 'Rendered browser and assistive-technology audit in later full-stack phases'],
});
