#!/usr/bin/env node

import set14 from '../src/data/mocks/ielts-set-14.ts';
import { runGoldenContentAudit } from './lib/audit-ielts-golden-content.mjs';

runGoldenContentAudit({
  mock: set14,
  set: 14,
  reportAsOf: '2026-08-28',
  reportFile: 'ielts-golden-set14-audit-2026-08-28.json',
  expectedMediaStatus: 'script-ready-audio-blocked',
  inheritedPhrases: [
    'because a strong wind could easily blow it out of your hands',
    'the GDPR attempted to address this by establishing a right to explanation',
    'no other insect is large enough to access the flower',
    'backed initially by gold reserves—the gold standard',
    'Artificial intelligence is increasingly being used to make decisions that significantly affect people',
  ],
  task1Tokens: ['RAW SEWAGE', 'SCREENING', 'PRIMARY', 'BIOLOGICAL', 'DISINFECTION', 'SLUDGE', 'BIOGAS', 'RECYCLED', 'RIVER', 'standards'],
  speakingPattern: /technology|digital|decision|artificial intelligence|machine|computer/i,
  extraChecks: ({ skills }) => {
    const listening = skills.listening.flatMap((section) => section.questions);
    const reading = skills.reading.flatMap((section) => section.questions);
    const l4 = listening.find((item) => item.id === 'l4-form');
    const r1Truth = reading.find((item) => item.id === 'r1-tfng');
    const r1Sent = reading.find((item) => item.id === 'r1-sent');
    const r2Sum = reading.find((item) => item.id === 'r2-sum');
    const r3Claims = reading.find((item) => item.id === 'r3-ynng');
    const r3Sent = reading.find((item) => item.id === 'r3-sent');
    return [
      { condition: l4?.blanks.find((item) => item.num === 34)?.answers[0] === 'flying', message: 'Listening Q34 preserves the historically qualified flying-money term.' },
      { condition: /name referred to money moving rapidly across distance/i.test(skills.listening[3]?.transcript ?? ''), message: 'Paper-money lecture rejects the wind-origin myth.' },
      { condition: /privately issued notes called jiaozi.+state later controlled/is.test(skills.listening[3]?.transcript ?? ''), message: 'Paper-money lecture distinguishes Tang remittance instruments from Song currency.' },
      { condition: r1Truth?.blanks.find((item) => item.num === 3)?.answers[0] === 'TRUE', message: 'AI Q3 tests the GDPR contest safeguard without inventing a universal explanation right.' },
      { condition: r1Sent?.blanks.find((item) => item.num === 10)?.answers[0] === 'human intervention', message: 'AI Q10 uses the official GDPR safeguard terminology.' },
      { condition: /staged timetable.+does not mean.+every high-risk obligation/is.test(skills.reading[0]?.passage ?? ''), message: 'AI passage reflects the staged 2026 EU AI Act timeline.' },
      { condition: /not a one-insect, one-rodent mechanism/i.test(skills.reading[1]?.passage ?? ''), message: 'Rainforest passage removes the false exclusive pollinator and disperser claim.' },
      { condition: r2Sum?.blanks.find((item) => item.num === 26)?.answers[0] === 'tipping point', message: 'Rainforest Q26 preserves the qualified tipping-point concept.' },
      { condition: /risk under particular conditions, not a single universally agreed percentage/i.test(skills.reading[1]?.passage ?? ''), message: 'Rainforest passage does not present a fixed irreversible threshold as settled fact.' },
      { condition: r3Claims?.blanks.find((item) => item.num === 33)?.answers[0] === 'NO', message: 'Money Q33 distinguishes flying money from generally circulating Song notes.' },
      { condition: r3Sent?.blanks.find((item) => item.num === 40)?.answers[0] === 'decentralised computational', message: 'Money Q40 closes on the passage wording and respects the two-word limit.' },
      { condition: /countries joined, left and restored such arrangements on different schedules/i.test(skills.reading[2]?.passage ?? ''), message: 'Money passage avoids treating gold-standard history as one global switch.' },
    ];
  },
  provenanceSearch: {
    method: 'Exact public-web searches of distinctive revised Reading sentences and the original university AI Writing prompt returned no exact match. The inherited generic AI essay was replaced because close variants are common across practice sites.',
    phrasesChecked: [
      'A nominal reviewer who lacks time, expertise or authority may simply confirm the model suggestion',
      'The phrase describes a risk under particular conditions, not a single universally agreed percentage',
      'Different forms have coexisted, disappeared and returned',
      'universities should prohibit students from using generative artificial intelligence for assessed work',
    ],
  },
  factualSources: [
    'https://commission.europa.eu/law/law-topic/data-protection/information-individuals_en',
    'https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai',
    'https://digital-strategy.ec.europa.eu/en/policies/enforcement-ai-act',
    'https://www.fao.org/forest-resources-assessment/en/',
    'https://www.fao.org/newsroom/detail/global-deforestation-slows--but-forests-remain-under-pressure--fao-report-shows/',
    'https://www.giss.nasa.gov/pubs/abs/la00600i.html',
    'https://www.britishmuseum.org/sites/default/files/2021-05/Money_Gallery_LPG_2020_Room_68.pdf',
    'https://www.riksbank.se/en-gb/about-the-riksbank/history/historical-timeline/1600-1699/first-banknotes-in-europe/',
    'https://www.bankofengland.co.uk/museum/online-collections/banknotes/early-banknotes',
    'https://www.bankofengland.co.uk/explainers/what-is-money',
    'https://www.rbnz.govt.nz/money-and-cash/banknotes-and-coins/polymer-used-on-banknotes',
    'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-writing',
  ],
  reusedAndImproved: [
    'Four Listening scenarios, three Reading themes, objective numbering and IELTS question families.',
    'Existing wastewater Task 1 SVG and the Writing/Speaking component architecture.',
    'Technology and decision-making Speaking theme, expanded to full interview density.',
  ],
  replacedOrCorrected: [
    'Replaced generic Listening density inserts with four scenario-specific scripts while preserving answer evidence order.',
    'Distinguished GDPR safeguards from a universal right to explanation and aligned AI Act claims with the August 2026 staged timeline.',
    'Removed false exclusivity claims about Brazil-nut pollination and dispersal, and qualified carbon, moisture and tipping-point language.',
    'Separated Tang remittance instruments, Song currency, Swedish banknotes, convertibility, the gold standard and modern fiat money.',
    'Replaced a generic AI-development essay with an original university-assessment debate.',
    'Corrected and relabelled the wastewater disinfection stage and added an accessible title, description, flow and discharge standard.',
  ],
  deferred: ['Listening audio casting, generation, mastering and waveform/ASR QA'],
});
