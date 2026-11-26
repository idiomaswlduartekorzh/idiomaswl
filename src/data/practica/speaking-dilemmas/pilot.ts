import { PILOT_DILEMMA_SLUG } from '@/lib/practica/speaking-dilemma-routes'
import type { SpeakingDilemma } from './types'

export const PILOT_DILEMMA: SpeakingDilemma = {
  slug: PILOT_DILEMMA_SLUG,
  title: 'What should count as merit?',
  prompt: 'Two final-year public health students are up for the same university award. When choosing the winner, which should carry more weight: academic performance throughout their studies or performance during their final-semester placements?',
  options: [
    {
      label: 'Academic performance',
      description: 'One student excelled throughout the degree and published a peer-reviewed study on missed appointments. Clinics have yet to act on the findings.',
    },
    {
      label: 'Final-semester placement',
      description: 'In their final semester, the other student led a pilot during a supervised placement. It reduced missed appointments at two clinics. It’s unclear whether the results would hold elsewhere.',
    }
  ],
  conditionalPrompt: 'Weigh both achievements and name the evidence that would tip the decision.',
  vocabulary: {
    nouns: [
      ['rigour', 'care and precision in how work is done', 'The study shows methodological rigour.'],
      ['track record', 'evidence of past performance', 'The team has a track record of delivering results.'],
      ['proxy', 'an indirect measure of something', 'Attendance is one proxy for access to care.'],
      ['accountability', 'being answerable for decisions and results', 'Clear reporting improves accountability.'],
    ],
    phrasalVerbs: [
      ['bear out a claim', 'show that a claim is true', 'The follow-up data bear out her claim.'],
      ['follow through on a plan', 'carry a plan to completion', 'The team followed through on its plan.'],
      ['hold up under scrutiny', 'remain convincing when examined closely', 'The results held up under scrutiny.'],
      ['build on a finding', 'use a finding as a basis for further work', 'Two clinics built on that finding.'],
    ],
    adjectives: [
      ['substantiated', 'supported by evidence', 'The claim was substantiated by the audit.'],
      ['replicable', 'able to be repeated with similar results', 'Are these results replicable in larger clinics?'],
      ['transferable', 'useful in a different setting', 'That approach is transferable to other settings.'],
      ['contingent on', 'dependent on a particular condition', 'The rollout is contingent on funding.'],
    ],
    connectors: [
      ['Granted, …', 'acknowledge a valid opposing point', 'Granted, the pilot reached only two clinics.'],
      ['Even so, …', 'keep your point despite that concession', 'Even so, the improvement is worth noting.'],
      ['Insofar as …', 'limit a claim to the extent it is true', 'Insofar as the clinics are comparable, the findings are relevant.'],
      ['All things considered, …', 'give your verdict after weighing both sides', 'All things considered, I’d back the clinic pilot.'],
    ]
  },
  models: {
    a: [
      'I’d give the award to the student with the stronger academic record. They performed well throughout the degree, and other teams can **build on the findings** of their study. If the method is transparent and the results are **replicable**, the study could influence practice well beyond those two clinics.',
      '**Granted**, the other student has a **track record** of delivering tangible results during their placement. Fewer missed appointments mean fewer delays in care. **Even so**, I’d want to know whether the improvement would **hold up** in clinics with fewer staff and a different patient population.',
      '**All things considered**, I’d give more weight to methodological **rigour** this year. If independent clinics could confirm similar gains from the pilot, I might vote differently.',
    ],
    b: [
      'I’d give the award to the student who led the clinic pilot. For me, a placement shows whether someone can **follow through on a plan** when other people depend on them. There’s real **accountability** there because the clinics can check their appointment records and see whether the pilot made a difference.',
      '**Granted**, the other student’s academic **track record** and the **rigour** of their research deserve credit. **Even so**, fewer patients missed appointments at two clinics. That’s the kind of result I’d want the award to recognise.',
      '**All things considered**, I’d choose option B. I’d still want to know whether those gains **hold up** over time and whether the approach is **transferable** to clinics with fewer resources.',
    ],
    conditional: [
      'I’d make my decision **contingent on** the quality of the evidence. I’d lean towards A if the academic **track record** shows consistent performance and an independent team can reproduce the study’s results. That would give other researchers something to **build on**.',
      '**Granted**, the pilot reached only two clinics. I’d lean towards B if the appointment records **bear out the claim**, the improvement **holds up** after the pilot ends, and it’s clear what the student contributed.',
      '**All things considered**, if both cases are equally well **substantiated**, I’d give B a slight edge because patients have already benefited. The first thing I’d ask for is follow-up data from both clinics.',
    ],
  },
}
