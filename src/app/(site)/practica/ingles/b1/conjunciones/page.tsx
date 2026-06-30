import type { Metadata } from 'next';
import QuestEngine from '@/components/practica/QuestEngine';
import type { QuestLevel, QuestGuide } from '@/components/practica/QuestEngine';
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = {
  title: 'Conjunctions B1 — and/but/although/when/if/however | Idiomas WeLearn',
  description: 'Practica las conjunciones del inglés B1 con 6 niveles progresivos: coordinating, contrast, condition, time y connectors. Feedback inmediato.',
  alternates: { canonical: 'https://idiomaswl.com/practica/ingles/b1/conjunciones' },
};

const guide: QuestGuide = {
  title: 'B1 Conjunctions & Connectors',
  body: 'Conjunctions connect clauses and show relationships between ideas. At B1 you need three groups:\n1. Coordinating (connect equal parts): and · but · or · so · yet\n2. Subordinating (connect a main clause to a dependent one): because · although · even though · when · while · if · unless · before · after · until\n3. Sentence connectors (link two sentences): however · therefore · moreover',
  tip: "Common B1 mistake: 'Although' and 'but' CANNOT both appear in the same sentence. Say 'Although it rained, we went out' OR 'It rained but we went out' — never both at once. Same rule: 'because' and 'so' can't share a sentence.",
  tableHead: ['Conjunction / Connector', 'Function', 'Example'],
  tableRows: [
    ['although / even though', 'contrast (unexpected result)', '"Although she was tired, she kept working"'],
    ['however', 'contrast (new sentence)', '"She was tired. However, she kept working"'],
    ['because / since / as', 'reason / cause', '"She stayed home because she was ill"'],
    ['so / therefore', 'result / consequence', '"It rained, so we stayed inside"'],
    ['if / unless', 'condition', '"I\'ll come if you invite me"'],
    ['when / while / before / after / until', 'time relationships', '"Call me when you arrive"'],
  ],
};

const levels: QuestLevel[] = [
  {
    type: 'choice',
    title: 'Coordinating conjunctions',
    desc: 'Choose and / but / or / so / because to complete each sentence.',
    items: [
      { text: 'I love pasta ___ I don\'t eat it every day.', opts: ['and', 'but', 'so', 'or'], ans: 'but', hint: 'contrast between liking something and a limiting fact' },
      { text: 'She studied hard ___ she passed the exam.', opts: ['and', 'but', 'so', 'because'], ans: 'so', hint: 'so = result: she studied → she passed' },
      { text: 'Would you like tea ___ coffee?', opts: ['and', 'or', 'but', 'so'], ans: 'or', hint: 'or = alternative choice between two options' },
      { text: 'He didn\'t sleep well ___ he was very tired.', opts: ['but', 'so', 'because', 'and'], ans: 'because', hint: 'because = reason for not sleeping well' },
      { text: 'It was raining, ___ we decided to stay inside.', opts: ['and', 'but', 'so', 'because'], ans: 'so', hint: 'so = logical consequence of the rain' },
      { text: 'I like reading ___ watching films in my free time.', opts: ['and', 'but', 'or', 'so'], ans: 'and', hint: 'and = addition of two activities' },
      { text: 'She wanted to come to the party ___ she had too much work.', opts: ['and', 'but', 'so', 'because'], ans: 'but', hint: 'but = contrast between wanting to come and having work' },
      { text: 'We can take the train ___ drive — your choice.', opts: ['and', 'or', 'but', 'so'], ans: 'or', hint: 'or = two options to choose from' },
    ],
  },
  {
    type: 'choice',
    title: 'Contrast & result',
    desc: 'Choose although / however / therefore / because / even though.',
    inputWidth: 110,
    items: [
      { text: 'He passed the test ___ he barely studied.', opts: ['although', 'because', 'so', 'therefore'], ans: 'although', hint: 'although = surprising contrast (he passed despite not studying)' },
      { text: 'The weather was cold. ___, we went for a long walk.', opts: ['However', 'Therefore', 'Although', 'Because'], ans: 'However', hint: 'However links two sentences showing contrast; note the capital letter' },
      { text: 'She worked very hard. ___, she got the promotion.', opts: ['However', 'Therefore', 'Although', 'Because'], ans: 'Therefore', hint: 'Therefore = logical result of working hard' },
      { text: '___ it was expensive, she bought the dress.', opts: ['Even though', 'Because', 'So', 'And'], ans: 'Even though', hint: 'even though = surprising decision despite the cost' },
      { text: 'He failed the exam ___ he didn\'t prepare enough.', opts: ['because', 'although', 'however', 'therefore'], ans: 'because', hint: 'because explains the reason for failing' },
      { text: 'The shop was closed. ___, we went to another one.', opts: ['However', 'Therefore', 'Although', 'Because'], ans: 'Therefore', hint: 'Therefore = logical next step after finding it closed' },
      { text: 'The food was cold. ___, it was absolutely delicious.', opts: ['However', 'Therefore', 'Although', 'Because'], ans: 'However', hint: 'However shows the surprising contrast (cold but tasty)' },
      { text: 'She trained for months. ___, she won the competition.', opts: ['Consequently', 'However', 'Although', 'Because'], ans: 'Consequently', hint: 'Consequently = expected result of months of training' },
    ],
  },
  {
    type: 'choice',
    title: 'Time & condition',
    desc: 'Choose when / while / before / after / until / if / unless.',
    items: [
      { text: '___ you finish your homework, we can go to the park.', opts: ['When', 'While', 'Unless', 'Until'], ans: 'When', hint: 'when = at the moment you finish (condition in time)' },
      { text: 'Don\'t eat anything ___ the doctor arrives.', opts: ['before', 'until', 'while', 'after'], ans: 'until', hint: 'until = up to the point when the doctor arrives' },
      { text: '___ you work hard, you\'ll never improve.', opts: ['Unless', 'If', 'When', 'While'], ans: 'Unless', hint: 'unless = except if; the negative condition' },
      { text: 'I was listening to music ___ she was cooking dinner.', opts: ['while', 'when', 'before', 'until'], ans: 'while', hint: 'while = two actions happening at the same time' },
      { text: 'I\'ll come to the party ___ you invite me.', opts: ['if', 'unless', 'while', 'before'], ans: 'if', hint: 'if = the condition required for coming' },
      { text: 'She called me ___ she arrived at the hotel.', opts: ['when', 'while', 'before', 'until'], ans: 'when', hint: 'when = at the moment of arrival; sequence of events' },
      { text: '___ leaving the office, he always checks his emails.', opts: ['Before', 'After', 'While', 'Until'], ans: 'Before', hint: 'before + gerund = prior action in a sequence' },
      { text: 'Keep studying ___ you understand the grammar rule.', opts: ['until', 'before', 'while', 'when'], ans: 'until', hint: 'until = study continuously up to the point of understanding' },
    ],
  },
  {
    type: 'freeText',
    title: 'Complete the sentence',
    desc: 'Type the correct conjunction or connector.',
    inputWidth: 110,
    items: [
      { text: 'I wanted to go to the party ___ I had too much work to finish.', ans: 'but', hint: 'contrast: wanted to go vs. had too much work' },
      { text: 'She didn\'t come to class ___ she was feeling ill.', ans: 'because', hint: 'reason for not coming' },
      { text: '___ it was raining heavily, we enjoyed the match.', ans: ['Although', 'Even though'], hint: 'surprising contrast; use although / even though at the start' },
      { text: 'We waited at the station ___ the next train arrived.', ans: 'until', hint: 'continuous action up to a point in time' },
      { text: 'He won\'t pass the exam ___ he studies tonight.', ans: 'unless', hint: 'unless = except if he studies' },
      { text: 'I was listening to a podcast ___ I was running in the park.', ans: 'while', hint: 'two simultaneous actions' },
      { text: 'The hotel was expensive. ___, the service was terrible.', ans: ['Moreover', 'Furthermore', 'What is more'], hint: 'addition of a second negative point; moreover/furthermore both work' },
      { text: 'She finished all her work and ___ took a well-deserved break.', ans: ['then', 'and then'], hint: 'sequence: work finished → then a break' },
    ],
  },
  {
    type: 'freeText',
    title: 'Sentence pairs',
    desc: 'These are trickier — think about the relationship between the two ideas.',
    inputWidth: 120,
    items: [
      { text: 'He arrived late ___ he had missed the last bus home.', ans: 'because', hint: 'reason for arriving late' },
      { text: 'The presentation was very long. ___, it was extremely interesting.', ans: ['However', 'Nevertheless', 'Nonetheless'], hint: 'contrast: long but interesting; new sentence → However' },
      { text: '___ she was nervous, she gave an excellent speech.', ans: ['Although', 'Even though'], hint: 'surprising result despite nerves; clause first → Although/Even though' },
      { text: 'We had to leave early ___ we could catch the last train.', ans: ['so that', 'in order to'], hint: 'purpose: we left early for a reason → so that / in order to' },
      { text: 'I\'ll help you ___ you promise to do your fair share of the work.', ans: ['if', 'provided that', 'as long as'], hint: 'condition: help depends on a promise' },
      { text: 'He kept interrupting her ___ she was trying to explain the problem.', ans: 'while', hint: 'two simultaneous actions — interrupting while explaining' },
      { text: 'The exam was very difficult. ___, most students passed with good grades.', ans: ['Nevertheless', 'However', 'Nonetheless'], hint: 'surprising contrast: difficult but most students passed' },
      { text: '___ the meeting, please read the report carefully.', ans: ['Before', 'Prior to'], hint: 'prior action; before the meeting → Before the meeting' },
    ],
  },
  {
    type: 'sprint',
    title: 'Sprint — no hesitation!',
    desc: 'Fill in all blanks as fast as you can, then submit.',
    inputWidth: 110,
    items: [
      { text: 'She studied hard ___ she wanted to pass the exam.', ans: 'because' },
      { text: 'I like tea ___ I prefer coffee in the morning.', ans: 'but' },
      { text: 'Call me ___ you get home safely.', ans: 'when' },
      { text: '___ you hurry up, you\'ll miss the train.', ans: 'Unless' },
      { text: 'It was cold outside, ___ we wore our warmest coats.', ans: 'so' },
      { text: 'She was reading ___ he was preparing dinner.', ans: 'while' },
      { text: 'He finished all his work and ___ went to the gym.', ans: 'then' },
      { text: '___ the weather was terrible, the outdoor concert continued.', ans: ['Although', 'Even though'] },
      { text: 'Drink plenty of water ___ going to bed each night.', ans: 'before' },
      { text: 'We\'ll start the meeting ___ everyone is ready.', ans: 'when' },
    ],
  },
];

export default function ConjuncionesInglesB1() {
  return (
    <>
      <QuizSchema
        name="Conjunctions B1 — and, but, although, when, if, however"
        url="https://idiomaswl.com/practica/ingles/b1/conjunciones"
        description="Practica las conjunciones del inglés B1: coordinating, contrast, condition y time. 6 niveles progresivos con feedback inmediato."
      />
      <QuestEngine
        color="#0066cc"
        flag="🇬🇧"
        storageKey="quest-en-b1-conjunctions"
        guide={guide}
        levels={levels}
        backHref="/practica/ingles/b1"
        backLabel="Inglés B1"
        title="Conjunctions Quest"
        subtitle="Inglés B1 — Grammar"
      />
    </>
  );
}
