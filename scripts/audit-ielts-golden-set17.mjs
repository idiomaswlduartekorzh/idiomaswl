#!/usr/bin/env node

import set17 from '../src/data/mocks/ielts-set-17.ts';
import { runGoldenContentAudit } from './lib/audit-ielts-golden-content.mjs';

runGoldenContentAudit({
  mock: set17,
  set: 17,
  reportAsOf: '2026-08-28',
  reportFile: 'ielts-golden-set17-audit-2026-08-28.json',
  expectedMediaStatus: 'script-ready-audio-blocked',
  inheritedPhrases: [
    'It seems fitness might protect against short-term sleep loss',
    'we often credit Johannes Gutenberg with inventing printing in the fifteenth century',
    'the printing press made the religious movement known as the Reformation possible',
    'a level lower than any experienced in the past twenty million years',
    'the pain of losing a sum of money is approximately twice as intense as the pleasure of gaining the same amount',
    'These interventions have been shown in large-scale trials to produce meaningful changes in behaviour at low cost',
    'The Lumière brothers, Auguste and Louis, are conventionally credited with the first public commercial film screening',
  ],
  task1Tokens: ['1990', '2022', 'East Asia', 'Pacific', '68.3', '76.7', 'Europe', 'Central Asia', '72.2', '77.8', 'Latin America', 'Caribbean', '67.5', '74.6', 'North America', '75.4', 'Sub-Saharan Africa', '50.0', '61.9'],
  speakingPattern: /environment|ocean|marine|film|television|behaviour/i,
  extraChecks: ({ skills }) => {
    const listening = skills.listening.flatMap((section) => section.questions);
    const reading = skills.reading.flatMap((section) => section.questions);
    const l3Pattern = listening.find((item) => item.id === 'l3q24');
    const l3Ethics = listening.find((item) => item.id === 'l3q25');
    const r1Truth = reading.find((item) => item.id === 'r1-tfng');
    const r2Summary = reading.find((item) => item.id === 'r2-sum');
    const r3Loss = reading.find((item) => item.id === 'r3-q28');
    const r3Claims = reading.find((item) => item.id === 'r3-ynng');
    return [
      { condition: /smaller average change/i.test(l3Pattern?.options[l3Pattern.answer] ?? ''), message: 'Sports-study Q24 reports the limited pattern without claiming protection.' },
      { condition: /ethical approval/i.test(l3Ethics?.options[l3Ethics.answer] ?? ''), message: 'Sports-study Q25 requires approval before original testing.' },
      { condition: /association, not establish that sleep caused/is.test(skills.listening[2]?.transcript ?? '') && /must not ask anyone to deprive themselves of sleep/is.test(skills.listening[2]?.transcript ?? ''), message: 'Sports script separates association from causation and prohibits induced sleep deprivation.' },
      { condition: /did not invent printing for the whole world/is.test(skills.listening[3]?.transcript ?? '') && /press did not by itself cause the movement/is.test(skills.listening[3]?.transcript ?? ''), message: 'Printing lecture removes Eurocentric invention and single-cause Reformation claims.' },
      { condition: r1Truth?.blanks.find((item) => item.num === 2)?.answers[0] === 'FALSE' && /surface seawater remains alkaline/is.test(skills.reading[0]?.passage ?? ''), message: 'Ocean passage distinguishes acidification from becoming acidic.' },
      { condition: r1Truth?.blanks.find((item) => item.num === 5)?.answers[0] === 'FALSE', message: 'Ocean Q5 preserves variable multi-stressor interactions.' },
      { condition: r2Summary?.blanks.find((item) => item.num === 21)?.answers[0] === 'Eidoloscope', message: 'Cinema summary corrects the first paying projected-film audience claim.' },
      { condition: /not the first occasion.+paying public saw projected moving pictures/is.test(skills.reading[1]?.passage ?? ''), message: 'Cinema passage qualifies the famous Lumière origin story.' },
      { condition: /greater weight than an equal-sized gain/i.test(r3Loss?.options[r3Loss.answer] ?? '') && /not a universal psychological constant/is.test(skills.reading[2]?.passage ?? ''), message: 'Loss aversion is defined without a universal two-to-one rule.' },
      { condition: r3Claims?.blanks.find((item) => item.num === 34)?.answers[0] === 'NO' && r3Claims?.blanks.find((item) => item.num === 35)?.answers[0] === 'NO', message: 'Behavioural-economics questions reject universal causal and effectiveness claims.' },
    ];
  },
  provenanceSearch: {
    method: 'Exact public-web searches of three distinctive revised passages and the original behavioural-policy Writing prompt returned no exact match.',
    phrasesChecked: [
      'A modest study with transparent limitations is more valuable',
      'Cinema has no uncontested birthday',
      'Ethics is part of effectiveness, not an optional appendix',
      'Some people believe governments should use behavioural insights, such as reminders and default options',
    ],
  },
  factualSources: [
    'https://oceanservice.noaa.gov/facts/acidification.html',
    'https://oceanacidification.noaa.gov/2025-ocean-acidification-day-or-action/',
    'https://www.ipcc.ch/srocc/chapter/chapter-5/',
    'https://www.ipcc.ch/report/ar6/wg1/chapter/chapter-5/',
    'https://www.bfi.org.uk/sight-and-sound/features/origins-cinema-early-inventors-pioneers',
    'https://www.bfi.org.uk/features/all-about-film-sound-how-we-restore-it',
    'https://www.bfi.org.uk/sight-and-sound/features/peak-silent-cinema',
    'https://www.oscars.org/newmembers2020/pdf/2020_new_members.pdf',
    'https://www.nobelprize.org/prizes/economic-sciences/2002/press-release/',
    'https://www.nobelprize.org/prizes/economic-sciences/2017/press-release/',
    'https://www.oecd.org/en/publications/tools-and-ethics-for-applied-behavioural-insights-the-basic-toolkit_9ea76a8f-en/full-report.html',
    'https://api.worldbank.org/v2/country/EAS;ECS;LCN;NAC;SSF/indicator/SP.DYN.LE00.IN?date=1990:2022&format=json&per_page=400',
    'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-writing',
  ],
  reusedAndImproved: [
    'Four Listening settings, all objective response positions, the three Reading themes and existing IELTS interaction components.',
    'Life-expectancy Task 1 concept, rebuilt from the World Bank API with consistent regional definitions and values.',
    'Existing film cue card and environment/behaviour discussion, expanded to complete Speaking density.',
  ],
  replacedOrCorrected: [
    'Replaced generic transcript padding with scenario-specific distractors, signposting and evidence in question order.',
    'Redesigned the sports study around observational language, safe protocol, justified sampling and ethics before original data collection.',
    'Corrected East Asian printing history, Gutenberg attribution, manuscript labour and the press relationships with the Reformation and science.',
    'Updated ocean chemistry, multi-stressor effects, hatchery attribution, refugia and alkalinity claims with NOAA and IPCC evidence.',
    'Corrected the Lumière origin story, sound-transition timeline, studio-system scope, European movements and global-industry comparisons.',
    'Qualified rational-agent assumptions, loss-aversion magnitude, present bias, nudge effectiveness and behavioural-policy ethics.',
    'Replaced the generic ethical question with an original, complete discuss-both-views policy conflict.',
    'Rebuilt Task 1 with exact World Bank 1990/2022 data, zero baseline, accessible title, description, labels, units and source.',
  ],
  deferred: ['Listening audio casting, generation, mastering and waveform/ASR QA', 'Rendered browser and assistive-technology audit in later full-stack phases'],
});
