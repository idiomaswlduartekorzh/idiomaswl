import type { EpisodeSection } from '@/components/practica/EpisodeNotes';

/**
 * Written companion to "Mastering IELTS Academic Writing Task 1".
 *
 * Same ground as the audio, same order. Every structural suggestion is labelled
 * as a WeLearn default rather than an IELTS rule, matching the clarification
 * printed above the player.
 */
const sections: EpisodeSection[] = [
  {
    heading: 'Twenty minutes, 150 words, one visual',
    body: [
      'You turn the paper over and meet a tangled line graph, or a table that looks like a spreadsheet exploded. The clock starts. You have about 20 minutes to work out what the visual says and at least 150 words to say it in.',
      'The panic is real and it is also avoidable. What makes the clock dangerous is not the data, it is going in without a procedure — deciding what matters while the seconds run. With a procedure, the twenty minutes stop being a countdown and become a routine.',
    ],
  },
  {
    heading: 'Task 1 is a report, not an essay',
    body: [
      'This is the misconception that costs marks before a single sentence is written. Task 1 is an information-transfer task. You describe what the visual shows; you do not explain why.',
      'If a graph shows physical book sales falling across a decade, you report the fall. You do not write that sales likely dropped because readers moved to e-readers. That is speculation, it draws on outside knowledge, and it is not what the task asks for. You are the reporter, not the analyst.',
    ],
  },
  {
    heading: 'Why the twenty minutes are not negotiable',
    body: [
      'You get 60 minutes for the whole Writing test, and Task 2 carries twice the weight of Task 1 in your Writing band.',
      'So spending 35 minutes perfecting a bar chart description is not diligence, it is self-sabotage: you produce a strong answer to the lighter question and then run out of time on the heavier one. Twenty minutes is a budget, not a target to beat.',
    ],
  },
  {
    heading: 'The four assessment criteria',
    body: [
      'Writing is assessed on four criteria, each carrying equal weight — a quarter of the mark apiece. Knowing what each one actually looks at tells you what to fix when a score stalls.',
    ],
    bullets: [
      'Task Achievement — did you do what the prompt asked? That means covering all parts of the visual, making relevant comparisons rather than listing figures in isolation, and including a clear overview of the main trends. A missing overview hits this criterion hard.',
      'Coherence and Cohesion — coherence is the underlying logic and paragraphing; cohesion is the surface joinery of linking words and reference pronouns. It must be continuous prose: no bullet points.',
      'Lexical Resource — accuracy and flexibility, not rarity. Can you describe an upward trend three different ways, or do you recycle the prompt’s exact phrasing?',
      'Grammatical Range and Accuracy — a mix of simple and complex structures used accurately. The point is control, not convolution.',
    ],
  },
  {
    heading: 'Read, select, group, report',
    body: [
      'One framework handles every visual they can hand you. Read the visual. Select the main features. Group related information. Report it with accurate evidence.',
      'The two steps people skip are the middle ones, and they are the two the examiner is actually looking for. Selecting means deciding what matters. Grouping means deciding what belongs together.',
    ],
  },
  {
    heading: 'A four-paragraph default — and it is a default',
    body: [
      'A reliable working structure is introduction, overview, body one, body two. State this plainly: that is a WeLearn study default, not an IELTS requirement. IELTS does not prescribe a paragraph count or where the overview must sit.',
      'The introduction is short, roughly 20 to 30 words, and does one job: paraphrase the prompt so the reader knows what the visual shows. No findings yet.',
      'The overview is the paragraph that matters most, usually 25 to 40 words. It states the main story — the dominant trend, the hierarchy, the overall transformation. It is the difference between a report and a list.',
    ],
  },
  {
    heading: 'The myth about numbers in the overview',
    body: [
      'You will read in forums that including figures or percentages in the overview is penalised, or breaks an official rule. It does not. No rule prohibits numbers there, and no mark is deducted just because one appears.',
      'The advice exists for a strategic reason that got flattened into a prohibition. An overview crowded with specific figures buries the big picture, and detailed numbers do more work as evidence down in the body paragraphs. So lead with broad observations — but if a rounded percentage helps the sentence, it is not a violation.',
    ],
  },
  {
    heading: 'Why left-to-right reporting caps your score',
    body: [
      'Faced with five categories, the instinct is to describe bar one, then bar two, and so on. The problem is that reading a chart in physical order demonstrates no analysis — a script could do it.',
      'Take a chart comparing campus-based and online students across five subjects. Business runs 74% on campus against 52% online; engineering, 68% against 41%. Languages inverts it: 31% on campus against 70% online, and design behaves similarly.',
      'Grouped by behaviour rather than position, body one becomes the subjects that skew to campus and body two the subjects that skew online. Same five bars, but now they form an argument — which is exactly the "relevant comparisons" that Task Achievement asks for.',
    ],
  },
  {
    heading: 'What to look for in each kind of visual',
    body: [
      'The framework does not change. What changes is which features are worth selecting, and which vocabulary reports them.',
    ],
    bullets: [
      'Line graphs show movement over time. Look for the dominant trend, the peaks and troughs, and where lines cross. Ignore the small zigzags — you are reporting the climate, not the daily weather.',
      'Bar charts are static comparisons. Look for the leaders, the laggards, and the significant gaps between groups.',
      'Tables are the same data without the picture. Scan each column for its highest and lowest values and for clear exceptions to the pattern, then group rows by similarity.',
      'Pie charts show parts of a whole. One chart calls for proportional language — accounted for, made up, represented the smallest share. Two charts from different years are a change-over-time task, so the language has to describe growth, decline and stability instead.',
      'Mixed visuals should not become two disconnected reports. Find the relationship: if a line graph shows funding rising across a decade and a pie chart shows which departments received it in the final year, the overview is where you connect them.',
      'Maps and plans are spatial change over time — expansions, reductions, replacements. Vocabulary shifts to location (adjacent to, to the north of) and to change (was demolished, was converted into, was replaced by).',
      'Process diagrams are stages or cycles. Count the stages first, note whether the process is linear or repeats in a loop, and report it with sequencing language: first, following this, subsequently, finally.',
    ],
  },
  {
    heading: 'Approximation is vocabulary, not cohesion',
    body: [
      'Writing "just under 50%" instead of "48.9%" is often good practice. It is not, however, a cohesion device, and any advice claiming it improves your Coherence and Cohesion score has the criterion wrong.',
      'Cohesion is about linking words, reference pronouns and logical flow between ideas. Sensible approximation supports accurate reporting and shows flexible vocabulary — it belongs to Lexical Resource. Knowing which criterion a technique serves is how you fix the right thing when a score stalls.',
    ],
  },
  {
    heading: 'The passive voice is a tool, never a requirement',
    body: [
      'The belief that process diagrams and maps must be written in the passive is widespread and wrong. The passive is not mandatory, and no mark is awarded for inserting one.',
      'It is, however, often the most appropriate choice — and appropriacy is what the grammar criterion rewards. In a process, what happens to the bottle matters and who crushed it does not. In a map, "the old cinema was demolished" keeps the focus on the town; "a construction crew demolished the old cinema" drags in an agent nobody asked about.',
      'Use it because it is the precise tool for that visual, not to tick a box you imagined.',
    ],
  },
  {
    heading: 'A ten-step way to practise without burning out',
    body: [
      'The first seven steps are micro-drills. You do not write a full report until step eight, and that is the point: isolated skills are far easier to fix than a whole essay.',
    ],
    bullets: [
      'Analyse visuals without writing anything — find the main trends and the logical groups in a dozen graphs. Train the eye before the hand.',
      'Practise introductions alone, focusing only on paraphrasing the prompt.',
      'Practise overviews alone: distil an entire complex visual into one or two sentences of big-picture story.',
      'Practise selection and grouping: map what would go in body one and body two without writing the paragraphs.',
      'Drill the language of trends and comparisons for graphs and charts.',
      'Drill spatial and sequencing language for maps and processes.',
      'Practise embedding that vocabulary in accurate sentences, watching the grammar.',
      'Write one full response in exactly 20 minutes, no exceptions.',
      'Review it against the four official criteria, one pass each. Be a harsh examiner.',
      'Return to your weakest micro-skill and drill that. If the logic collapsed, go back to grouping; if the sentences repeated, go back to vocabulary.',
    ],
  },
  {
    heading: 'The takeaway',
    body: [
      'Success here is not fancy vocabulary. It is clear, logical observation: looking at chaos and finding the order in it, then reporting that order without adding your own guesses.',
      'It is also a skill that outlives the exam. Whether it is a university seminar or a meeting at work, data stays noise until somebody gives it a voice.',
    ],
  },
];

export default sections;
