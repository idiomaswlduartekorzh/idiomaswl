import type { Metadata } from 'next';
import QuestEngine from '@/components/practica/QuestEngine';
import type { QuestLevel, QuestGuide } from '@/components/practica/QuestEngine';
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = {
  title: 'Advanced connectors B2: moreover, nevertheless, provided',
  description: 'Practica los conectores avanzados del inglés B2: moreover, furthermore, nevertheless, consequently, provided that, despite, so that. 6 niveles progresivos.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ingles/b2/conectores' },
};

const guide: QuestGuide = {
  title: 'B2 Advanced Connectors & Linkers',
  body: 'At B2 you need sophisticated connectors to express nuanced relationships and achieve a formal, academic register. Unlike basic conjunctions (and/but/so), these linkers position ideas precisely.\n- Addition: moreover · furthermore · in addition · what is more\n- Contrast: nevertheless · nonetheless · however · on the other hand\n- Condition: provided that · as long as · in case · even if\n- Concession: despite · in spite of · regardless of\n- Result: consequently · as a result · hence · thereby\n- Purpose: so that · in order to',
  tip: "Register matters at B2: 'Moreover' and 'Furthermore' are formal — use them in essays and reports. 'Nevertheless' is stronger than 'However' (implies serious obstacles were overcome). 'Provided that' is more formal than 'if' — use it in conditions with consequences.",
  tableHead: ['Connector', 'Function', 'Register'],
  tableRows: [
    ['moreover / furthermore', 'addition of a related point', 'formal (essays, reports)'],
    ['nevertheless / nonetheless', 'strong contrast (despite obstacles)', 'formal'],
    ['consequently / as a result', 'logical result of a previous statement', 'formal'],
    ['provided that / as long as', 'conditional (stricter than "if")', 'formal'],
    ['in case', 'precaution / contingency', 'neutral-formal'],
    ['despite / in spite of', 'concession (+ noun/gerund)', 'neutral-formal'],
    ['so that / in order to', 'purpose', 'neutral'],
  ],
};

const levels: QuestLevel[] = [
  {
    type: 'choice',
    title: 'Addition & strong contrast',
    desc: 'Choose moreover / furthermore / however / nevertheless / nonetheless.',
    inputWidth: 130,
    items: [
      { text: 'The product is highly effective. ___, it is very affordable.', opts: ['Moreover', 'However', 'Nevertheless', 'Consequently'], ans: 'Moreover', hint: 'moreover = addition of a positive related point' },
      { text: 'The experiment failed on the first attempt. ___, the team remained motivated.', opts: ['Nevertheless', 'Moreover', 'Furthermore', 'Consequently'], ans: 'Nevertheless', hint: 'nevertheless = strong contrast: despite failure, they continued' },
      { text: 'The report is very comprehensive. ___, it lacks clear recommendations.', opts: ['However', 'Moreover', 'Furthermore', 'Consequently'], ans: 'However', hint: 'however = contrast: comprehensive but missing something important' },
      { text: 'He has excellent qualifications. ___, he has five years of relevant experience.', opts: ['Furthermore', 'However', 'Nevertheless', 'Therefore'], ans: 'Furthermore', hint: 'furthermore = addition of a second supporting point' },
      { text: 'Sales have declined sharply. ___, the company is struggling to retain key staff.', opts: ['Moreover', 'However', 'Nevertheless', 'Therefore'], ans: 'Moreover', hint: 'moreover = adding a related negative development' },
      { text: 'The weather during the event was truly terrible. ___, it was a great success.', opts: ['Nonetheless', 'Moreover', 'Furthermore', 'Consequently'], ans: 'Nonetheless', hint: 'nonetheless = despite the bad weather, success was achieved' },
      { text: 'She was completely exhausted after the marathon. ___, she agreed to give an interview.', opts: ['Nevertheless', 'Moreover', 'Furthermore', 'Consequently'], ans: 'Nevertheless', hint: 'nevertheless = surprising decision despite exhaustion' },
      { text: 'The new policy has reduced operational costs. ___, it has significantly improved working conditions.', opts: ['Moreover', 'However', 'Nevertheless', 'Consequently'], ans: 'Moreover', hint: 'moreover = adding a second benefit of the policy' },
    ],
  },
  {
    type: 'choice',
    title: 'Condition & purpose',
    desc: 'Choose provided that / as long as / in case / so that / even if.',
    inputWidth: 130,
    items: [
      { text: 'I will support the project ___ the budget is formally approved.', opts: ['provided that', 'in case', 'so that', 'even if'], ans: 'provided that', hint: 'provided that = strict condition: support only if budget is approved' },
      { text: 'Always save your work regularly ___ the computer crashes unexpectedly.', opts: ['in case', 'so that', 'provided that', 'as long as'], ans: 'in case', hint: 'in case = precaution against a possible future event' },
      { text: 'She trained every day ___ she could compete at a professional level.', opts: ['so that', 'in case', 'provided that', 'even if'], ans: 'so that', hint: 'so that = purpose: training had a specific goal' },
      { text: 'He would not accept the offer ___ they doubled the salary.', opts: ['even if', 'provided that', 'in case', 'so that'], ans: 'even if', hint: 'even if = condition that would still not change the result' },
      { text: 'The company will continue to expand ___ sales continue to grow steadily.', opts: ['as long as', 'in case', 'so that', 'even if'], ans: 'as long as', hint: 'as long as = ongoing condition for continued expansion' },
      { text: 'Write down the address carefully ___ you forget how to get there later.', opts: ['in case', 'so that', 'as long as', 'provided that'], ans: 'in case', hint: 'in case = precaution against forgetting' },
      { text: 'I will keep the position ___ the working conditions remain reasonable.', opts: ['as long as', 'in case', 'so that', 'provided that'], ans: 'as long as', hint: 'as long as = continuous condition for staying in the job' },
      { text: 'She took very detailed notes during the lecture ___ she could refer back to them later.', opts: ['so that', 'in case', 'provided that', 'as long as'], ans: 'so that', hint: 'so that = purpose of taking detailed notes' },
    ],
  },
  {
    type: 'choice',
    title: 'Concession & result',
    desc: 'Choose despite / consequently / as a result / nevertheless / in spite of.',
    inputWidth: 130,
    items: [
      { text: 'The company invested heavily in staff training. ___, productivity improved by 30%.', opts: ['Consequently', 'Nevertheless', 'Moreover', 'Despite'], ans: 'Consequently', hint: 'consequently = expected result of the investment' },
      { text: '___ the high initial costs, the project was approved by the board.', opts: ['Despite', 'Consequently', 'Moreover', 'Nevertheless'], ans: 'Despite', hint: 'despite + noun = concession; decision made despite costs' },
      { text: 'Demand dropped sharply in the final quarter. ___, the company was forced to cut prices.', opts: ['As a result', 'Nevertheless', 'Moreover', 'Despite'], ans: 'As a result', hint: 'as a result = direct consequence of falling demand' },
      { text: '___ his initial failure, he went on to become a leading researcher in the field.', opts: ['Despite', 'Consequently', 'As a result', 'Moreover'], ans: 'Despite', hint: 'despite his failure = concession — it did not stop him' },
      { text: 'The new system was very difficult to implement across teams. ___, adoption rates remained low.', opts: ['Consequently', 'Despite', 'Moreover', 'Nevertheless'], ans: 'Consequently', hint: 'consequently = the difficulty logically led to low adoption' },
      { text: '___ the mixed reviews from critics, the book became an international bestseller.', opts: ['Despite', 'Consequently', 'As a result', 'Moreover'], ans: 'Despite', hint: 'despite = contrast between reviews and commercial success' },
      { text: 'The team worked significant overtime for several weeks. ___, they delivered the project on schedule.', opts: ['Consequently', 'Despite', 'Moreover', 'Nevertheless'], ans: 'Consequently', hint: 'consequently = overtime led directly to on-time delivery' },
      { text: 'The results in Q1 were disappointing. ___, the company performed well by the end of the year.', opts: ['Nevertheless', 'Consequently', 'Moreover', 'Despite'], ans: 'Nevertheless', hint: 'nevertheless = strong contrast: despite Q1, year-end was good' },
    ],
  },
  {
    type: 'freeText',
    title: 'Complete the sentence',
    desc: 'Type the correct connector. Some items accept more than one answer.',
    inputWidth: 130,
    items: [
      { text: 'The presentation was well-prepared. ___, the speaker\'s delivery was impressive.', ans: ['Moreover', 'Furthermore', 'What is more'], hint: 'addition of a second positive point → Moreover / Furthermore' },
      { text: 'The project was considered very risky. ___, the board decided to proceed.', ans: ['Nevertheless', 'Nonetheless'], hint: 'strong contrast: despite risk, they went ahead → Nevertheless' },
      { text: '___ the initial setbacks, the team completed the project successfully.', ans: ['Despite', 'In spite of'], hint: 'concession + noun/gerund → Despite / In spite of (start of sentence)' },
      { text: 'I will sign the contract ___ all parties agree to the revised terms.', ans: ['provided that', 'as long as'], hint: 'strict condition for signing → provided that / as long as' },
      { text: 'Always keep a secure backup of your files ___ the original is lost or corrupted.', ans: 'in case', hint: 'precaution against a possible event → in case' },
      { text: 'She worked extra hours every evening ___ she could meet the tight deadline.', ans: 'so that', hint: 'purpose of working extra hours → so that' },
      { text: 'Prices rose sharply throughout the year. ___, consumer spending has not declined.', ans: ['Nevertheless', 'However', 'Nonetheless'], hint: 'surprising contrast: prices rose but spending held up' },
      { text: 'He is not only talented ___ remarkably hardworking and disciplined.', ans: 'but also', hint: 'not only... but also = paired structure for strong addition' },
    ],
  },
  {
    type: 'freeText',
    title: 'Advanced context',
    desc: 'Longer and more nuanced sentences — the kind you\'ll see in FCE Reading and Use of English.',
    inputWidth: 140,
    items: [
      { text: 'The economy grew by 3% last year. ___, unemployment remained stubbornly high.', ans: ['Nevertheless', 'However', 'Nonetheless'], hint: 'surprising contrast between growth and persistent unemployment' },
      { text: '___ the heavy workload she faced, she managed to maintain excellent academic results.', ans: ['Despite', 'In spite of'], hint: 'concession + noun phrase at sentence start' },
      { text: 'The company invested significantly in automation technology. ___, output increased by 20% within a year.', ans: ['As a result', 'Consequently'], hint: 'direct result of the investment → As a result / Consequently' },
      { text: 'The research project will continue ___ sufficient funding is secured from external sources.', ans: ['provided that', 'as long as'], hint: 'condition for continuation → provided that / as long as' },
      { text: 'Please note down the emergency contact number ___ you need assistance while abroad.', ans: 'in case', hint: 'precaution against needing help → in case' },
      { text: 'She enrolled in an advanced course ___ she could qualify for the senior management role.', ans: 'so that', hint: 'purpose of enrolling in the course → so that' },
      { text: 'The data from the study was inconclusive. ___, the team decided to publish their preliminary findings.', ans: ['Nevertheless', 'Nonetheless'], hint: 'despite inconclusive data, they published → Nevertheless' },
      { text: 'He not only apologised for the delay ___ offered to personally cover the additional costs.', ans: 'but also', hint: 'not only... but also; second element comes after "but also"' },
    ],
  },
  {
    type: 'sprint',
    title: 'Sprint — formal register!',
    desc: 'Complete all sentences at speed. Think register: these are essay and report connectors.',
    inputWidth: 140,
    items: [
      { text: 'Costs fell significantly last quarter. ___, profits rose for the first time this year.', ans: ['Consequently', 'As a result'] },
      { text: '___ the strong opposition, the controversial plan was approved.', ans: ['Despite', 'In spite of'] },
      { text: 'I will agree to the terms ___ you reduce the overall price by 10%.', ans: ['provided that', 'as long as'] },
      { text: 'Always save all receipts ___ you need to claim expenses later.', ans: 'in case' },
      { text: 'The annual report was extremely long. ___, it was very informative and well-structured.', ans: ['However', 'Nevertheless', 'Nonetheless'] },
      { text: '___ the poor reviews, the film was a major commercial success worldwide.', ans: ['Despite', 'In spite of'] },
      { text: 'She practised every single day ___ she could represent her country at the championships.', ans: 'so that' },
      { text: 'The project was significantly over budget. ___, it delivered outstanding long-term results.', ans: ['Nevertheless', 'Nonetheless', 'However'] },
      { text: 'Sales improved dramatically in Q3. ___, the board approved the expansion plan.', ans: ['Consequently', 'As a result'] },
      { text: 'The examination was extremely difficult. ___, she passed with the highest distinction.', ans: ['Nevertheless', 'Nonetheless'] },
    ],
  },
];

export default function ConectoresInglesB2() {
  return (
    <>
      <QuizSchema
        name="Advanced Connectors B2 — moreover, nevertheless, consequently, despite"
        url="https://www.idiomaswl.com/practica/ingles/b2/conectores"
        description="Practica los conectores avanzados del inglés B2: moreover, furthermore, nevertheless, consequently, provided that, despite, so that. 6 niveles progresivos."
      />
      <QuestEngine
        color="#cf142b"
        flag="🇬🇧"
        storageKey="quest-en-b2-connectors"
        guide={guide}
        levels={levels}
        backHref="/practica/ingles/b2"
        backLabel="Inglés B2"
        title="Advanced Connectors Quest"
        subtitle="Inglés B2 — Use of English"
      />
    </>
  );
}
