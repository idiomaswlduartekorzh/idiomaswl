import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-1',
  examSlug: 'toefl',
  title: 'TOEFL iBT Set 1',
  subtitle: 'The Columbian Exchange · Social Facilitation · Campus Life',
  timeMinutes: 185,
  sections: [

    // ─── READING ──────────────────────────────────────────────────────────────

    {
      part: 1,
      skill: 'reading',
      title: 'Reading Passage 1: The Columbian Exchange',
      instructions: 'Read the passage and answer questions 1–10.',
      passage: `The Columbian Exchange refers to the widespread transfer of plants, animals, diseases, and ideas between the Americas and the Old World that followed Christopher Columbus's 1492 voyage. This exchange fundamentally transformed societies on both sides of the Atlantic and had consequences that continued to reverberate for centuries.

Among the most significant transfers from the Americas to Europe were food crops, particularly the potato and maize. The potato, originally cultivated by Andean civilizations, proved remarkably well adapted to European climates. By the eighteenth century it had become a dietary staple in Ireland, Germany, and much of northern Europe. Historians estimate that the potato played a major role in fueling population growth, since a small plot of land could yield enough calories to sustain a family. The Irish famine of the 1840s, paradoxically, illustrated just how dependent European populations had become on this New World crop.

Maize, or corn, followed a different trajectory. Though adopted quickly in southern Europe and Africa, it achieved its greatest economic impact when introduced into Asia, where it could be grown on hillsides unsuitable for rice cultivation. Scholars now believe that the spread of maize contributed significantly to Chinese population expansion during the Qing dynasty.

Other New World crops—the tomato, cacao, chili pepper, and various squashes—reshaped European and Asian cuisine in ways so thorough that it is now difficult to imagine Italian food without the tomato or Indian cuisine without the chili pepper, even though neither crop existed in those regions before 1500.

In the opposite direction, European colonizers brought wheat, sugar cane, cattle, horses, and pigs to the Americas. Wheat became the foundation of settler agriculture across temperate zones of North and South America. The horse transformed the cultures of many Great Plains peoples, enabling new forms of hunting, warfare, and mobility that had been impossible before. Sugar cane, while valuable as a crop, drove one of history's most devastating humanitarian catastrophes: the transatlantic slave trade, which forcibly transported millions of Africans to work on sugar plantations in the Caribbean and Brazil.

The exchange of diseases was perhaps the most devastating aspect of the Columbian Exchange for indigenous Americans. Peoples of the Americas had no immunity to Old World diseases such as smallpox, measles, and influenza. Epidemics swept through indigenous populations with catastrophic speed, killing an estimated fifty to ninety percent of some communities within decades of European contact. Demographic collapse on such a scale made European colonization far easier than it would otherwise have been, since depopulated lands appeared "empty" to arriving settlers.

The Columbian Exchange thus illustrates a recurring theme in global history: that contact between previously isolated populations unleashes complex, unpredictable chains of consequence that neither party can fully anticipate or control.`,
      questions: [
        {
          type: 'mcq',
          id: 't1-r1q1',
          part: 1,
          text: 'According to paragraph 2, why did the potato become so important in Europe?',
          options: [
            'It was easier to cook than traditional European grains.',
            'A small amount of land planted with potatoes could feed a whole family.',
            'European governments actively promoted its cultivation.',
            'It replaced wheat as the primary export crop of northern Europe.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't1-r1q2',
          part: 1,
          text: 'The word "trajectory" in paragraph 3 is closest in meaning to',
          options: ['speed', 'conflict', 'path of development', 'nutritional value'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 't1-r1q3',
          part: 1,
          text: 'According to paragraph 3, what made maize particularly useful in Asia?',
          options: [
            'It could be stored more easily than rice.',
            'It produced higher yields per acre than any local crop.',
            'It grew on terrain where rice could not be cultivated.',
            'It was already familiar to Asian farmers from trade contacts.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 't1-r1q4',
          part: 1,
          text: 'The author mentions Italian food and Indian cuisine in paragraph 4 in order to',
          options: [
            'argue that New World crops are superior to Old World crops.',
            'demonstrate how completely New World crops became integrated into Old World cultures.',
            'compare the culinary traditions of Europe and Asia.',
            'explain why food trade between continents began.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't1-r1q5',
          part: 1,
          text: 'According to paragraph 5, what effect did the horse have in the Americas?',
          options: [
            'It allowed European settlers to build roads across the continent.',
            'It replaced the use of dogs as work animals on farms.',
            'It enabled Great Plains peoples to hunt, fight, and travel in new ways.',
            'It became the primary mode of transport for sugar plantations.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 't1-r1q6',
          part: 1,
          text: 'The word "catastrophic" in paragraph 6 is closest in meaning to',
          options: ['gradual', 'disastrous', 'temporary', 'widespread'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't1-r1q7',
          part: 1,
          text: 'Why does the author say that depopulated lands "appeared empty" to arriving settlers (paragraph 6)?',
          options: [
            'To suggest that settlers were deliberately misled by colonial governments.',
            'To explain why the Americas had no agriculture before European arrival.',
            'To indicate that disease deaths made formerly inhabited areas look uninhabited.',
            'To argue that the Americas were actually sparsely populated before Columbus.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 't1-r1q8',
          part: 1,
          text: 'According to the passage, which of the following is NOT mentioned as a crop transferred FROM Europe TO the Americas?',
          options: ['Wheat', 'Sugar cane', 'Maize', 'Cattle'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 't1-r1q9',
          part: 1,
          text: 'Which of the following best describes the author\'s attitude toward the Columbian Exchange?',
          options: [
            'Strongly critical of European colonizers.',
            'Balanced, presenting both positive and devastating consequences.',
            'Primarily focused on the economic benefits for Europe.',
            'Celebratory of the global spread of agriculture.',
          ],
          answer: 1,
        },
        {
          type: 'multiselect',
          id: 't1-r1q10',
          part: 1,
          qRange: [10, 10],
          text: 'An introductory sentence for a brief summary of the passage is provided below. Complete the summary by selecting the THREE answer choices that express the most important ideas in the passage.\n\n"The Columbian Exchange was a large-scale transfer of organisms and cultures that transformed both the Americas and the Old World."',
          options: [
            { letter: 'A', text: 'New World food crops such as the potato and maize dramatically changed diets and supported population growth in Europe and Asia.' },
            { letter: 'B', text: 'Christopher Columbus made four voyages to the Americas between 1492 and 1504.' },
            { letter: 'C', text: 'Old World introductions including the horse and sugar cane reshaped economies, cultures, and human rights in the Americas.' },
            { letter: 'D', text: 'Old World diseases devastated indigenous American populations, facilitating European colonization.' },
            { letter: 'E', text: 'Many European colonizers preferred potatoes to wheat because potatoes required less land.' },
            { letter: 'F', text: 'The Columbian Exchange shows that contact between isolated populations produces complex and far-reaching consequences.' },
          ],
          selectCount: 3,
          answers: ['A', 'C', 'D'],
        },
      ],
    },

    {
      part: 2,
      skill: 'reading',
      title: 'Reading Passage 2: The Neural Basis of Memory Consolidation',
      instructions: 'Read the passage and answer questions 11–20.',
      passage: `Memory consolidation is the process by which newly acquired information is stabilized in the brain so that it can be retained over the long term. For much of the twentieth century, neuroscientists debated whether memories were stored as permanent structural changes in the brain or as dynamic patterns of neural activity. Today, the dominant view is that long-term memory involves both: initial learning triggers synaptic changes, and sleep plays a critical role in permanently embedding those changes.

During waking hours, the hippocampus—a curved, seahorse-shaped structure in the medial temporal lobe—acts as a temporary buffer, rapidly encoding new experiences. The hippocampus binds together elements of an experience that are processed in different cortical regions: the visual cortex handles what something looked like, the auditory cortex what it sounded like, and so on. The hippocampus links these fragments into a coherent episode.

Sleep, particularly slow-wave sleep, is when hippocampal memories are transferred to the neocortex for permanent storage. During slow-wave sleep, the hippocampus replays compressed versions of daily experiences, a process researchers have observed by recording the firing patterns of neurons in sleeping rats. These replays allow the neocortex to gradually integrate the new information with existing knowledge schemas.

Rapid eye movement (REM) sleep serves a complementary function. Where slow-wave sleep seems essential for factual and episodic memories, REM sleep appears more important for procedural memories (how to do things) and for emotional memory processing. Some researchers propose that REM sleep allows the brain to extract general patterns from specific experiences, a form of abstraction that supports creative thinking.

Memory consolidation can be disrupted by stress, alcohol, and sleep deprivation. The stress hormone cortisol, when elevated chronically, damages hippocampal neurons and impairs the encoding of new memories. A single night of poor sleep following learning can reduce later recall by as much as forty percent in controlled laboratory conditions.

Researchers have also discovered that memories are not consolidated once and then fixed forever. Every time a memory is retrieved, it enters a labile state during which it can be modified or even erased—a process called reconsolidation. This discovery has important clinical implications: it suggests that treatments for post-traumatic stress disorder might work by allowing therapists to reactivate traumatic memories and then interfere with their reconsolidation, weakening their emotional charge over time.`,
      questions: [
        {
          type: 'mcq',
          id: 't1-r2q11',
          part: 2,
          text: 'According to paragraph 1, what do most neuroscientists currently believe about how long-term memories are stored?',
          options: [
            'Only as dynamic patterns of electrical activity in neural networks.',
            'Only as permanent structural changes called engrams.',
            'As a combination of synaptic changes and sleep-dependent processes.',
            'Primarily through the action of the hippocampus alone.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 't1-r2q12',
          part: 2,
          text: 'The word "buffer" in paragraph 2 is closest in meaning to',
          options: ['permanent archive', 'temporary holding area', 'protective barrier', 'filtering mechanism'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't1-r2q13',
          part: 2,
          text: 'According to paragraph 2, what is the specific role of the hippocampus?',
          options: [
            'It handles all visual processing during memory formation.',
            'It links together elements processed by different cortical regions into a unified experience.',
            'It permanently stores all long-term memories.',
            'It filters out unimportant experiences before they reach the cortex.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't1-r2q14',
          part: 2,
          text: 'In paragraph 3, why does the author mention studies of sleeping rats?',
          options: [
            'To prove that animal memory works differently from human memory.',
            'To provide evidence that the hippocampus replays experiences during sleep.',
            'To show that only certain animals benefit from sleep consolidation.',
            'To argue that researchers should conduct more animal studies.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't1-r2q15',
          part: 2,
          text: 'According to paragraph 4, which type of memory is MOST associated with REM sleep?',
          options: [
            'Episodic memories of personal events.',
            'Factual memories from textbooks.',
            'Procedural and emotional memories.',
            'Spatial memories used in navigation.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 't1-r2q16',
          part: 2,
          text: 'The word "labile" in paragraph 6 most likely means',
          options: ['stable and fixed', 'easily altered', 'chemically inactive', 'rapidly growing'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't1-r2q17',
          part: 2,
          text: 'According to paragraph 5, which of the following can impair memory consolidation?',
          options: [
            'Exercising immediately after learning.',
            'Extended periods of REM sleep.',
            'Chronically elevated levels of cortisol.',
            'Reviewing material multiple times before sleep.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 't1-r2q18',
          part: 2,
          text: 'What is "reconsolidation" as described in paragraph 6?',
          options: [
            'The initial process of forming a memory after an experience.',
            'The transfer of memories from the hippocampus to the neocortex.',
            'The re-stabilization of a memory after it has been retrieved and entered a changeable state.',
            'The permanent deletion of memories that are no longer useful.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 't1-r2q19',
          part: 2,
          text: 'According to the passage, what is the potential clinical application of reconsolidation research?',
          options: [
            'Helping patients improve their ability to form new memories after brain injury.',
            'Treating PTSD by weakening traumatic memories during their unstable retrieval state.',
            'Developing drugs that permanently erase all memories of traumatic events.',
            'Training patients to re-experience trauma in a controlled environment.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't1-r2q20',
          part: 2,
          text: 'Which of the following best describes the organization of the passage?',
          options: [
            'A historical narrative tracing discoveries in neuroscience chronologically.',
            'A description of memory consolidation processes followed by factors that affect them.',
            'An argument for a specific theory of memory against competing theories.',
            'A comparison of human and animal memory consolidation mechanisms.',
          ],
          answer: 1,
        },
      ],
    },

    // ─── LISTENING ────────────────────────────────────────────────────────────

    {
      part: 3,
      skill: 'listening',
      title: 'Listening — Conversation 1: Office Hours',
      instructions: 'Listen to a conversation between a student and a professor. Then answer questions 21–25.',
      transcript: `PROFESSOR: Come in. Ah, Maya — I'm glad you stopped by. Have a seat.

STUDENT: Thanks, Professor Chen. I wanted to talk about my essay draft. I thought I understood the assignment, but after the feedback you gave in class, I'm not so sure.

PROFESSOR: Let me see... yes, I remember yours. The topic itself is great — you chose to analyze how social media affects political polarization, which is really timely. The problem is structural. You've basically written a list of examples, but there's no analytical thread connecting them.

STUDENT: Okay... so I need to argue a specific point, not just describe what's happening?

PROFESSOR: Exactly. An academic argument isn't just "here are five studies." It's "here is what these five studies, taken together, reveal about a deeper pattern." Do you see the difference?

STUDENT: I think so. So instead of saying "Study A found X, Study B found Y," I should be explaining why these findings point to the same underlying cause?

PROFESSOR: Right. Or point to a contradiction that you then resolve. Either way, you're adding your own intellectual contribution. The sources are evidence for your argument, not substitutes for it.

STUDENT: That actually helps a lot. Can I ask — should I completely restructure the essay, or can I revise what I have?

PROFESSOR: Honestly, I'd start with your thesis. If you write one sentence that captures your actual argument — not just your topic — that will guide everything else. Bring me a revised thesis by Thursday and we can talk through whether the structure needs to change.

STUDENT: Okay. And is it too late to change my main argument slightly? I was thinking I could narrow it to just looking at algorithmic filtering rather than social media broadly.

PROFESSOR: Narrowing is almost always a good move in a five-page essay. Just make sure your sources still support the narrower claim. Check whether the studies you've cited specifically address algorithms or if they're about social media use generally.

STUDENT: Right, some of them are more general. I might need to find a couple of new sources.

PROFESSOR: That's fine. The library database has good material on algorithmic amplification — ask the reference librarian for help with the search terms if you get stuck.`,
      questions: [
        {
          type: 'mcq',
          id: 't1-l1q21',
          part: 3,
          text: 'Why does the student visit the professor?',
          options: [
            'To submit the final version of an essay.',
            'To get clarification about an essay assignment.',
            'To ask for an extension on a deadline.',
            'To discuss a grade she received.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't1-l1q22',
          part: 3,
          text: 'According to the professor, what is the main problem with the student\'s essay?',
          options: [
            'The topic is not relevant to the course.',
            'The essay uses too few sources.',
            'The essay lists examples but lacks a connecting analytical argument.',
            'The writing style is too informal for academic work.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 't1-l1q23',
          part: 3,
          text: 'What does the professor say sources should do in an academic essay?',
          options: [
            'Replace the student\'s own ideas with expert opinions.',
            'Serve as evidence for the student\'s argument.',
            'Be summarized in detail at the beginning of the essay.',
            'Come from peer-reviewed journals only.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't1-l1q24',
          part: 3,
          text: 'What does the professor advise the student to do first?',
          options: [
            'Find new sources about algorithmic filtering.',
            'Write a revised thesis statement.',
            'Completely restructure the essay from scratch.',
            'Visit the library reference desk.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't1-l1q25',
          part: 3,
          text: 'What does the professor say about the student\'s idea to narrow the topic?',
          options: [
            'It is too risky because the essay is almost due.',
            'It is a good idea but she must verify her current sources support the narrower claim.',
            'It is unnecessary because the original topic is already well-defined.',
            'It would require her to start the essay over completely.',
          ],
          answer: 1,
        },
      ],
    },

    {
      part: 4,
      skill: 'listening',
      title: 'Listening — Lecture 1: Social Facilitation',
      instructions: 'Listen to part of a lecture in a psychology class. Then answer questions 26–31.',
      transcript: `PROFESSOR: So we've been talking about individual cognition — how people think and learn on their own. Today I want to shift to something different: how the presence of other people affects performance. This phenomenon is called social facilitation, and it's one of the oldest experimental findings in social psychology.

The story starts in 1898 with a researcher named Norman Triplett. He noticed that cyclists rode faster when racing against others than when cycling alone. He then ran one of the earliest controlled experiments in psychology: he had children wind a fishing reel, either alone or alongside another child doing the same task. He found that children wound the reel faster in the presence of others.

This seemed like a clean result — people perform better with an audience. But then researchers started getting contradictory findings. Sometimes people performed worse in the presence of others, not better. So the question became: when does an audience help, and when does it hurt?

The answer came decades later from Robert Zajonc — that's Z-A-J-O-N-C, pronounced "ZY-ohnts" — in 1965. Zajonc proposed what's now called drive theory. He argued that the mere presence of others increases a person's general arousal — their physiological activation. That increased arousal strengthens the emission of dominant responses — the behaviors that are most practiced and automatic for that individual.

Here's the key: if the task is simple or well-learned, the dominant response is the correct one. Arousal enhances performance. But if the task is complex or unfamiliar, the dominant response is often an error. Arousal makes you more likely to produce that error, which hurts performance.

This explains the contradictory findings beautifully. Expert typists type faster when observed; novice typists make more mistakes. Experienced swimmers swim faster in front of crowds; beginners flounder. The task difficulty relative to the performer's skill level is the crucial variable.

Zajonc also ran some famously creative experiments using cockroaches — which I know is unsettling, but bear with me. He found that cockroaches ran a simple maze faster when other cockroaches were watching from a plexiglass gallery, but ran a complex maze more slowly under the same conditions. This was compelling because it showed that social facilitation is not uniquely human — it doesn't require self-consciousness or concern about what others think. Mere presence is enough.

Later research complicated the picture. Nicholas Cottrell showed that it's not just the presence of others but specifically the presence of an evaluative audience — people who might judge you — that drives the arousal effect. When bystanders were blindfolded, the facilitation effect disappeared. So evaluation apprehension may be the more precise mechanism, at least in humans.`,
      questions: [
        {
          type: 'mcq',
          id: 't1-l2q26',
          part: 4,
          text: 'What is the main topic of the lecture?',
          options: [
            'How competition motivates athletes to train harder.',
            'How the presence of others affects a person\'s performance on tasks.',
            'How psychologists design controlled laboratory experiments.',
            'How social media has changed the way people learn.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't1-l2q27',
          part: 4,
          text: 'What did Norman Triplett\'s 1898 experiment demonstrate?',
          options: [
            'Children perform worse when they know they are being watched.',
            'Children wind a fishing reel faster when another child is present.',
            'Competitive environments are harmful to children\'s development.',
            'Physical tasks are learned more quickly in group settings.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't1-l2q28',
          part: 4,
          text: 'According to Zajonc\'s drive theory, what does the presence of others increase?',
          options: [
            'A person\'s logical reasoning ability.',
            'The person\'s general physiological arousal.',
            'The complexity of the task being performed.',
            'The number of errors in simple tasks.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't1-l2q29',
          part: 4,
          text: 'According to the lecture, when does an audience HURT performance?',
          options: [
            'When the performer is an expert at the task.',
            'When the task is simple and well-practiced.',
            'When the task is complex or unfamiliar to the performer.',
            'When the audience is very large.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 't1-l2q30',
          part: 4,
          text: 'Why does the professor mention experiments with cockroaches?',
          options: [
            'To show that all animals perform better when observed.',
            'To demonstrate that social facilitation occurs even without self-consciousness.',
            'To argue that cockroaches have more complex social behavior than expected.',
            'To provide a humorous example that students will remember.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 't1-l2q31',
          part: 4,
          text: 'What did Nicholas Cottrell\'s research add to the understanding of social facilitation?',
          options: [
            'That the arousal effect requires an audience that might evaluate the performer.',
            'That the presence of strangers is more arousing than the presence of friends.',
            'That social facilitation only occurs in competitive sports contexts.',
            'That cockroaches show stronger facilitation effects than humans.',
          ],
          answer: 0,
        },
      ],
    },

    // ─── SPEAKING ─────────────────────────────────────────────────────────────

    {
      part: 5,
      skill: 'speaking',
      title: 'Speaking Tasks',
      instructions: 'Complete all four speaking tasks. You will have preparation time before each response.',
      questions: [
        {
          type: 'speak',
          id: 't1-sp1',
          part: 5,
          partNumber: 1,
          text: 'Task 1 — Independent Speaking (Preparation: 15 sec | Response: 45 sec)\n\nSome people prefer to study alone. Others prefer to study in groups. Which do you prefer and why? Use specific reasons and examples to support your answer.',
        },
        {
          type: 'speak',
          id: 't1-sp2',
          part: 5,
          partNumber: 2,
          cueCard: 'Task 2 — Integrated: Campus Announcement (Preparation: 30 sec | Response: 60 sec)\n\nThe university is planning to replace the student newspaper with an online-only news platform. Read the announcement, then listen to a student\'s opinion, and then summarize the student\'s opinion and the reasons given.',
          text: 'Reading: The university will discontinue its print newspaper starting next semester to reduce costs and reach a wider digital audience. The university states that an online platform allows for real-time updates, multimedia content, and broader student participation.\n\nStudent opinion (summarize): The student in the conversation disagrees with this change. She argues that the print newspaper gives journalism students essential hands-on production experience that cannot be replicated online. She also mentions that many students read the print version between classes without needing a phone or laptop, and that eliminating it removes an important campus tradition.',
        },
        {
          type: 'speak',
          id: 't1-sp3',
          part: 5,
          partNumber: 3,
          text: 'Task 3 — Integrated: Academic Reading + Lecture (Preparation: 30 sec | Response: 60 sec)\n\nReading concept: "Cognitive dissonance" occurs when a person holds two conflicting beliefs or acts in a way that contradicts their beliefs, creating psychological discomfort. People typically resolve this dissonance by changing one of their beliefs or rationalizing their behavior.\n\nLecture example (summarize): The professor describes a person who believes strongly that exercise is important but has not exercised in months. The person experiences dissonance between the belief and the behavior. To resolve it, the person begins rationalizing: "I walk to work, so that counts." Then later: "Exercise is only beneficial if you enjoy it, and I don\'t enjoy it." The professor uses this to show how rationalization can preserve a behavior people don\'t want to change, rather than actually resolving the underlying conflict.',
        },
        {
          type: 'speak',
          id: 't1-sp4',
          part: 5,
          partNumber: 3,
          text: 'Task 4 — Integrated: Lecture Summary (Preparation: 20 sec | Response: 60 sec)\n\nLecture summary to respond to: In the lecture, the professor explains the concept of "island biogeography," the study of how species diversity on islands is determined by two competing factors: immigration (new species arriving) and extinction (local species dying out). Larger islands tend to support more species because they offer more habitats and resources. Islands closer to the mainland receive more immigrants because crossing a smaller water gap is easier. Using these two principles, predict what would happen to species diversity on a small, isolated island if a land bridge suddenly connected it to the mainland. Explain the likely outcome and why.',
        },
      ],
    },

    // ─── WRITING ─────────────────────────────────────────────────────────────

    {
      part: 6,
      skill: 'writing',
      title: 'Writing Tasks',
      instructions: 'Complete both writing tasks.',
      questions: [
        {
          type: 'write',
          id: 't1-w1',
          part: 6,
          taskNumber: 1,
          stimulusLabel: 'Integrated Writing Task',
          stimulus: `Reading passage: Three main arguments suggest that four-day workweeks improve organizational performance. First, employees with an extra day off experience significantly lower burnout rates and higher job satisfaction, leading to greater productivity during working hours. Second, studies from Iceland and Microsoft Japan showed that output remained constant or improved even with reduced hours. Third, companies report lower absenteeism and employee turnover when they offer compressed schedules, reducing recruitment and training costs.

Lecture (listen and take notes): The professor challenges each of these arguments. On productivity, she argues that the Icelandic study measured workers who chose to compress their hours, creating a selection bias — motivated workers might perform well regardless of schedule. On output, she cites a 2022 meta-analysis finding that results varied dramatically by industry: knowledge workers showed gains, but manufacturing and service industries showed no benefit or slight declines. On retention, she contends that the benefits applied mainly to highly skilled workers who already had multiple job offers, not to the broader workforce.`,
          text: 'Summarize the points made in the lecture, explaining how they cast doubt on the specific points made in the reading passage. Write approximately 150–225 words.',
          minWords: 150,
        },
        {
          type: 'write',
          id: 't1-w2',
          part: 6,
          taskNumber: 2,
          stimulusLabel: 'Academic Discussion Task',
          stimulus: `Professor\'s prompt: "Your professor is teaching a class on urban planning. Write a post responding to the following question:\n\nCities around the world are adopting 15-minute city policies — designing neighborhoods so that residents can reach work, shopping, schools, and recreation within a 15-minute walk or bike ride. Do you think this model should be the standard for urban development? Why or why not? Consider both the benefits and potential drawbacks."\n\nStudent A (Jamie): I think the 15-minute city is a great concept. Reducing the need to commute by car would lower emissions, improve health through more walking, and strengthen community bonds. Cities like Paris have already started implementing this and it seems to be working.\n\nStudent B (Alex): I'm more skeptical. This model works in dense European cities, but in sprawling cities like Los Angeles or Houston, it's nearly impossible to implement without massive displacement of existing communities. Rezoning often drives up property values and pushes out low-income residents.`,
          text: 'Write a response of at least 100 words. Contribute your own perspective to the discussion, addressing points raised by your classmates where relevant.',
          minWords: 100,
        },
      ],
    },

  ],
};

export default mock;
