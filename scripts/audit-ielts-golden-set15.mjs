#!/usr/bin/env node

import set15 from '../src/data/mocks/ielts-set-15.ts';
import { runGoldenContentAudit } from './lib/audit-ielts-golden-content.mjs';

runGoldenContentAudit({
  mock: set15,
  set: 15,
  reportAsOf: '2026-08-28',
  reportFile: 'ielts-golden-set15-audit-2026-08-28.json',
  expectedMediaStatus: 'script-ready-audio-blocked',
  inheritedPhrases: [
    'after approximately seventeen hours without sleep, cognitive performance declines',
    'the largest peacetime migration in history',
    'commuters in Manila spend an average of ninety-eight minutes per day',
    'approximately 733 million people were estimated to be chronically undernourished in 2023',
    'agriculture is responsible for approximately twenty-three percent of global greenhouse gas emissions',
    'approximately one third of all food produced globally is lost or wasted',
    'Hunger and malnutrition remain serious global problems despite the fact that the world produces more than enough food',
  ],
  task1Tokens: ['United Kingdom', 'Australia', '2022', '38.5%', '28.9%', '14.6%', '12.8%', '5.2%', '47%', '32%', '19%', '2%'],
  speakingPattern: /food|eat|cook|city|urban|hunger|diet|environment/i,
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
      { condition: l4?.blanks.find((item) => item.num === 34)?.answers[0] === 'temperature', message: 'Listening Q34 preserves the principal bleaching trigger in evidence order.' },
      { condition: /roughly one degree Celsius above a reef's usual warmest-month average/i.test(skills.listening[3]?.transcript ?? ''), message: 'Coral lecture defines heat stress relative to the local maximum monthly mean.' },
      { condition: /about eighty-four percent.+describes exposure to heat stress, not the percentage of coral that died/is.test(skills.listening[3]?.transcript ?? ''), message: 'Coral lecture reports the June 2026 NOAA event assessment without converting exposure into mortality.' },
      { condition: r1Truth?.blanks.find((item) => item.num === 4)?.answers[0] === 'FALSE', message: 'Sleep Q4 rejects a universal clinical alcohol-conversion rule.' },
      { condition: r1Sent?.blanks.find((item) => item.num === 8)?.answers[0] === '80–100', message: 'Sleep Q8 uses the current NIH cycle range.' },
      { condition: /time in bed is not identical to restorative sleep/i.test(skills.reading[0]?.passage ?? ''), message: 'Sleep passage distinguishes duration from sleep quality.' },
      { condition: r2Sum?.blanks.find((item) => item.num === 21)?.answers[0] === 'definition', message: 'Urbanisation Q21 foregrounds definitional comparability.' },
      { condition: /47 percent.+36 percent.+17 percent/is.test(skills.reading[1]?.passage ?? ''), message: 'Urbanisation passage uses the 2025 UN Degree of Urbanization categories.' },
      { condition: r3Claims?.blanks.find((item) => item.num === 34)?.answers[0] === 'YES', message: 'Food-security Q34 distinguishes loss from waste measurement.' },
      { condition: r3Sent?.blanks.find((item) => item.num === 38)?.answers[0] === '19', message: 'Food-security Q38 uses the UNEP consumer-stage waste estimate.' },
      { condition: /673 million people experienced hunger in 2024/i.test(skills.reading[2]?.passage ?? ''), message: 'Food-security passage uses the SOFI 2025 global estimate and reference year.' },
      { condition: /13\.3 percent.+after harvest and before retail.+1\.05 billion tonnes.+19 percent/is.test(skills.reading[2]?.passage ?? ''), message: 'Food passage keeps FAO food loss and UNEP food waste figures methodologically separate.' },
    ];
  },
  provenanceSearch: {
    method: 'Exact public-web searches of distinctive revised Reading sentences and the original supermarket-donation Writing prompt returned no exact match. The inherited global-hunger prompt was replaced because close variants are common across practice sites.',
    phrasesChecked: [
      'Comparisons with blood-alcohol levels are sometimes used to communicate performance risk',
      'A single claim that half of Asia lives in cities can therefore hide both regional variation',
      'The two figures should not be casually added as if they shared one denominator',
      'require large supermarkets to offer edible unsold food to charities before the food may be discarded',
    ],
  },
  factualSources: [
    'https://www.nhlbi.nih.gov/health/sleep/stages-of-sleep',
    'https://www.nhlbi.nih.gov/health/sleep-deprivation/health-effects',
    'https://newsinhealth.nih.gov/2013/04/sleep-it',
    'https://population.un.org/wup/',
    'https://www.un.org/development/desa/pd/sites/www.un.org.development.desa.pd/files/undesa_pd_2025_wup2025_summary_of_results.pdf',
    'https://www.fao.org/newsroom/detail/global-hunger-declines--but-rises-in-africa-and-western-asia--un-report/en',
    'https://www.fao.org/sustainable-development-goals-data-portal/data/indicators/1231-global-food-losses/en/',
    'https://www.unep.org/resources/publication/food-waste-index-report-2024',
    'https://www.coralreefwatch.noaa.gov/satellite/research/coral_bleaching_report.php',
    'https://coralreefwatch.noaa.gov/product/5km/methodology.php',
    'https://www.gov.uk/government/collections/electricity-statistics',
    'https://www.energy.gov.au/publications/australian-energy-statistics-table-o-electricity-generation-fuel-type-2021-22-and-2022',
    'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-writing',
  ],
  reusedAndImproved: [
    'Four Listening scenarios, three Reading themes, objective numbering and IELTS question families.',
    'Existing two-country electricity Task 1 visual concept and the Writing/Speaking component architecture.',
    'Food, cities and environmental responsibility Speaking themes, expanded to complete interview density.',
  ],
  replacedOrCorrected: [
    'Replaced generic Listening density inserts with four scenario-specific scripts while preserving answer evidence order.',
    'Corrected fixed sleep-cycle, memory-transfer, alcohol-equivalence, causality, hormone and sleep-hygiene overclaims.',
    'Rebuilt the urbanisation passage around the UN 2025 harmonised categories and removed unsupported migration, megacity, wellbeing and congestion claims.',
    'Updated hunger to SOFI 2025 and separated food availability, access, loss, waste, emissions boundaries and technical interventions.',
    'Updated the coral lecture with NOAA thresholds, Degree Heating Weeks and the June 2026 assessment of the fourth global event.',
    'Replaced a generic hunger essay with an original supermarket-donation policy conflict.',
    'Corrected both countries’ 2022 electricity shares and added accessible title, description, labels, values, unit and sources.',
  ],
  deferred: ['Listening audio casting, generation, mastering and waveform/ASR QA', 'Rendered browser and assistive-technology audit in later full-stack phases'],
});
