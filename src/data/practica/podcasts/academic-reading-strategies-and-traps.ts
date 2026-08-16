import type { EpisodeSection } from '@/components/practica/EpisodeNotes';

/**
 * Written companion to "IELTS Academic Reading: Strategies and Traps".
 *
 * Covers the same ground as the audio, in the same order. Where the episode is
 * imprecise — the clarifications listed above the player — this text states the
 * official position instead of repeating the slip.
 */
const sections: EpisodeSection[] = [
  {
    heading: 'The instinct to read everything is the trap',
    body: [
      'The first thing most candidates feel when the passage appears is the urge to read every word as fast as possible. That urge is exactly what the format punishes. Frantically reading and memorising a long passage exhausts your working memory well before the hour is up, and it answers no questions.',
      'Academic Reading does not reward speed reading or a photographic memory. It rewards a procedure. The useful mental model is an investigator with a warrant: you are not there to admire the building, you are there to reach one room, open one safe, take one file, check it is the right one, and leave.',
    ],
  },
  {
    heading: 'The format you are actually facing',
    body: [
      'One continuous 60-minute section. There is no break between passages and no separate reading time. You face three long texts totalling roughly 2,150 to 2,750 words, and exactly 40 questions.',
      'On the paper test, the 60 minutes includes copying your answers onto the answer sheet — no extra transfer time is given at the end. On the computer-delivered test you type your answers on screen, so nothing has to be copied across, but the hour is the same and there is no extra time either way.',
    ],
  },
  {
    heading: 'How it is marked, and why that is unforgiving',
    body: [
      'One mark per question, 40 marks in total, converted to a band score. There is no writing-style rubric in Reading: an answer is correct or it is not, and there is no partial credit for an examiner who can tell what you meant.',
      'That has three consequences worth internalising before you practise anything else.',
    ],
    bullets: [
      'Spelling counts. A misspelt word taken from the passage is wrong, however rushed you were.',
      'Grammar counts wherever you complete a sentence: the answer has to fit the sentence it lands in.',
      'Word limits are absolute. If the instruction says no more than two words and you write three, the answer is marked wrong even when the information is perfectly accurate.',
    ],
  },
  {
    heading: 'Academic and General Training are not the same read',
    body: [
      'Both versions have 40 questions and 60 minutes, and both are marked out of 40. The difference is the source material: Academic passages are drawn from denser, more specialised writing, with heavier vocabulary and more complex structure.',
      'Because of that, the raw score needed for a given band is not identical across versions — General Training typically requires more correct answers to reach the same band, precisely because its texts are an easier read.',
    ],
  },
  {
    heading: 'What the test is really measuring',
    body: [
      'The stated abilities are broad: getting the general sense of a text, identifying main ideas, locating detail, drawing logical inferences, recognising a writer’s viewpoint or purpose, and following how an argument develops.',
      'Underneath almost all of it sits one engine — recognising meaning through paraphrase. You are rarely matching identical words between question and passage. You are deciding whether two different sets of words carry the same idea. Every technique below exists to serve that one judgement.',
    ],
  },
  {
    heading: 'The question formats, grouped by what your brain has to do',
    body: [
      'IELTS defines 11 numbered Academic Reading question-type categories. An individual test paper uses a selection of them, not all eleven, and the selection varies.',
      'Eleven labels is a lot to hold in your head, so WeLearn groups them into three teaching families. These families are a study aid, not official IELTS categories — useful for organising practice, never something to quote as test terminology.',
    ],
    bullets: [
      'Evidence and viewpoints: Multiple Choice, identifying information (True / False / Not Given), and identifying a writer’s views or claims (Yes / No / Not Given).',
      'Matching and organisation: Matching Information, Matching Headings, Matching Features, and Matching Sentence Endings.',
      'Completion from the passage: sentence, summary, note, table and flow-chart completion, diagram label completion, and short-answer questions. Some completion tasks give you a list of words to choose from rather than making you take words from the text — read the instruction before you start.',
    ],
  },
  {
    heading: 'False versus Not Given, the distinction that costs most marks',
    body: [
      'The common and expensive assumption is that a claim the text does not confirm must be False. It must not.',
      'False — or No, in the writer-view format — requires an explicit contradiction. The passage has to state the opposite of the claim, or say something that makes the claim logically impossible. Not Given means the passage simply does not resolve it: it neither confirms nor denies.',
      'If the question asks whether the scientist wore a blue hat and the passage says only that the scientist wore a hat, the answer is Not Given. Nothing contradicts the blue hat; the colour is never specified. The text is shrugging, and a shrug is not a denial.',
    ],
  },
  {
    heading: 'Zooming out versus zooming in',
    body: [
      'Matching Headings and Matching Information look like the same task — connect a prompt to a paragraph — but they demand opposite eye movements.',
      'Matching Headings is zooming out: you need the overarching idea that covers the whole paragraph. Matching Information is zooming in with a magnifying glass: you are hunting one specific detail, reason, example or outcome buried somewhere inside it. Treating either like the other is a reliable way to lose marks.',
    ],
  },
  {
    heading: 'The four-step loop',
    body: [
      'Without a repeatable procedure you are reading and hoping. The loop has four steps and never changes.',
    ],
    bullets: [
      'Map. Skim for structure, not content — what each paragraph is broadly for. This is the opposite of reading everything: it is building the floor plan before you enter a room.',
      'Locate. Pull the distinctive anchors out of the question — names, numbers, dates, technical terms — and scan for them. Once found, read that evidence window properly.',
      'Compare meaning. Check the paraphrase, and check two things people get wrong: polarity (is the sentence positive or negative — did the policy help, or cause problems?) and scope (does the text say all oak trees, or some oak trees?).',
      'Control the answer. Is the spelling right? Does it fit the grammar of the sentence? Does it obey the exact word limit?',
    ],
  },
  {
    heading: 'The loop on one sentence',
    body: [
      'Say the passage contains: "Urban planners discovered that planting oak trees significantly lowered summer street temperatures." The question is a one-word completion: "Oak trees reduced summer ______."',
      'Map tells you which paragraph deals with planting and trees. Locate finds the anchors — oak trees, summer. Compare meaning confirms that the passage’s "lowered" and the question’s "reduced" are the same idea. Control decides the answer: the instruction says exactly one word, so "street temperatures" fails and "temperatures" is correct.',
    ],
  },
  {
    heading: 'The six sub-skills the loop runs on',
    body: [
      'These are transferable abilities, not question types. When your score stalls, the cause is almost always one of these six rather than a whole format you cannot do.',
    ],
    bullets: [
      'Skimming, which builds the passage map.',
      'Scanning, which locates the anchors.',
      'Paraphrase recognition, which drives the meaning comparison.',
      'Inference, which is mostly the discipline to reject conclusions the text does not support.',
      'Word-limit control, producing the shortest grammatical answer the instruction allows.',
      'Time management, deciding when to solve, when to skip, and when to come back.',
    ],
  },
  {
    heading: 'The traps',
    body: [
      'Most lost marks are not vocabulary problems. They are one of these.',
    ],
    bullets: [
      'Lexical echoes. You spot the exact keyword from the question sitting in the passage and feel a rush of certainty. Test writers plant that word and change the meaning of the sentence around it. Repeated words are never proof; matching meaning is proof.',
      'Outside knowledge. If the fact is not printed on the page, it does not exist for this test — however well you know the subject.',
      'True but irrelevant. The option is accurate according to the passage and answers a question nobody asked.',
      'A striking detail chosen as a heading. Memorable is not the same as main idea.',
      'Ignoring reuse instructions, such as a prompt that says an option may be used more than once.',
      'Assuming every task follows the order of the text. Most do; Matching Information and Matching Headings do not.',
      'Getting stuck. Seven minutes on one matching question does more damage than the question was ever worth.',
    ],
  },
  {
    heading: 'Pacing is a strategy, not a rule',
    body: [
      'The only fixed number is 60 minutes for the whole section. Splits you hear quoted — twenty minutes per passage, say — are study conventions, not requirements, and passages genuinely differ in difficulty.',
      'The rule that matters: add timing pressure only after your accuracy has stabilised. Rushing a loop that is still broken makes you faster at being wrong.',
    ],
  },
  {
    heading: 'How to practise: isolation before integration',
    body: [
      'Taking full timed tests over and over, hoping the score climbs, is the least efficient thing you can do. Find the weakest link and train that. The phases run in order.',
    ],
    bullets: [
      'Foundation. Untimed. Learn what each format is actually asking.',
      'Accuracy. Log every question: the evidence you found, the paraphrase that carried it, and — when you get it wrong — the specific trap you fell for. "Oh right, it was False" changes nothing; naming the failure does.',
      'Control. Train inference and word-limit control deliberately. This phase is about precision.',
      'Transfer. Mixed practice — several question types on one passage — and justify every answer out loud with the exact sentence that proves it.',
      'Timing. Only once the first four are solid do you add the 60-minute conditions.',
    ],
  },
  {
    heading: 'The takeaway',
    body: [
      'When you review a timed test, classify each error honestly: was it mapping, locating, meaning, inference, an instruction you broke, or simply running out of time? Those five need five different remedies.',
      'You are not memorising a textbook. You have a warrant. Map the passage, locate the evidence, compare the meaning, control the answer, and get out.',
    ],
  },
];

export default sections;
