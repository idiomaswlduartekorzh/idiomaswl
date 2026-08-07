import type { EssayTypeId } from '../introduccion/introduction-data';

export type BodyBlockTone = 'claim' | 'paraphrase' | 'development' | 'example' | 'contrast' | 'link';

export type BodyOneBlock = {
  label: string;
  tone: BodyBlockTone;
  purpose: string;
  text: string;
};

export type BodyArchitectureBlock = Omit<BodyOneBlock, 'text'>;

export type BodyOneExample = {
  title: string;
  prompt: string;
  paragraphJob: string;
  blocks: BodyOneBlock[];
  commonMistake: string;
};

export type BodyOneLesson = {
  id: EssayTypeId;
  shortLabel: string;
  label: string;
  signal: string;
  function: string;
  planningQuestion: string;
  trap: string;
  examples: BodyOneExample[];
};

const block = (
  topicSentence: string,
  mainIdea: string,
  explanation: string,
  example: string,
  link: string,
): BodyOneBlock[] => [
  { label: 'Topic sentence', tone: 'claim', purpose: 'States the paragraph\'s one controlling idea.', text: topicSentence },
  { label: 'Main idea', tone: 'paraphrase', purpose: 'Makes the reason or answer precise.', text: mainIdea },
  { label: 'Explanation', tone: 'development', purpose: 'Shows how or why the idea works.', text: explanation },
  { label: 'Example', tone: 'example', purpose: 'Makes the reasoning concrete without inventing a source.', text: example },
  { label: 'Link', tone: 'link', purpose: 'Reconnects the paragraph to the task or position.', text: link },
];

const BODY_ONE_LESSONS_RAW: BodyOneLesson[] = [
  {
    id: 'opinion',
    shortLabel: 'Opinion',
    label: 'Opinion: develop the first reason for your position',
    signal: 'To what extent do you agree or disagree? / Do you agree or disagree?',
    function: 'Body 1 should prove one distinct reason for the position stated in the thesis. It should not introduce both sides as an unstructured list.',
    planningQuestion: 'What is the first reason a reasonable reader should accept my position?',
    trap: 'Repeating the thesis with new vocabulary but adding no explanation.',
    examples: [
      {
        title: 'Academic pressure',
        prompt: 'Some people believe that schools place too much pressure on students to achieve high grades. To what extent do you agree or disagree?',
        paragraphJob: 'Support agreement by explaining how constant performance pressure can weaken durable learning.',
        blocks: block(
          'Excessive emphasis on grades can prevent students from developing a durable understanding of what they study.',
          'When every activity is treated as preparation for a high-stakes result, learners often prioritise short-term recall over curiosity and reflection.',
          'This approach rewards the reproduction of information, whereas genuine mastery requires time to test ideas, make errors and revise them.',
          'For example, a school that replaces some ranking tests with project feedback can allow pupils to improve a skill before it is formally assessed.',
          'Reducing constant grade pressure can therefore support deeper learning without removing academic standards.',
        ),
        commonMistake: 'Claiming that all assessment is harmful. The paragraph argues against excessive pressure, not against standards or feedback.',
      },
      {
        title: 'Public transport',
        prompt: 'Governments should spend more money on public transport than on new roads. To what extent do you agree or disagree?',
        paragraphJob: 'Give the first reason for agreement: public transport moves more people with less urban space.',
        blocks: block(
          'Public transport deserves greater investment because it can move large numbers of people without consuming as much urban space as private cars.',
          'A reliable bus or rail network reduces the need for every commuter to occupy a separate vehicle.',
          'As more travellers share the same corridor, cities can use limited land for housing, pavements and public areas instead of continually widening roads.',
          'For instance, adding frequent buses to an overcrowded route can increase its capacity without demolishing nearby buildings for extra lanes.',
          'Transport spending should therefore prioritise shared systems when urban space is limited.',
        ),
        commonMistake: 'Saying public transport is “better” without naming the criterion used to compare it with road construction.',
      },
      {
        title: 'University access',
        prompt: 'University education should be free for everyone, regardless of income. Do you agree or disagree?',
        paragraphJob: 'Support qualified agreement through fair access to high-skill education.',
        blocks: block(
          'Removing tuition fees can make access to university depend more on academic readiness than on family income.',
          'Capable students from low-income households may otherwise reject suitable courses because the financial risk is too high.',
          'When cost determines participation, society may lose future teachers, engineers or nurses whose ability is unrelated to their parents\' resources.',
          'A publicly funded place offered to a qualified applicant, for example, can open a professional route that private borrowing would have closed.',
          'Free or strongly subsidised tuition can thus widen opportunity when admission standards remain rigorous.',
        ),
        commonMistake: 'Treating “free” as costless. A strong essay can later discuss funding, but Body 1 must first develop the chosen access argument.',
      },
      {
        title: 'Remote work',
        prompt: 'Working from home is better for employees than working in an office. To what extent do you agree or disagree?',
        paragraphJob: 'Support partial agreement by focusing on control over time and location.',
        blocks: block(
          'Remote work can improve employees\' daily lives by giving them greater control over where their working time is spent.',
          'Eliminating a compulsory commute returns time that can be used for rest, family responsibilities or focused work.',
          'This flexibility is especially valuable when performance depends on concentration rather than continuous physical presence.',
          'For example, a writer who begins work at home instead of travelling for an hour may complete demanding tasks while attention is still fresh.',
          'For suitable roles, greater control over time is a substantial employee benefit.',
        ),
        commonMistake: 'Claiming that home working benefits every occupation. The paragraph limits the claim to suitable roles.',
      },
      {
        title: 'Advertising to children',
        prompt: 'Advertising aimed at children should be banned. To what extent do you agree or disagree?',
        paragraphJob: 'Support agreement by explaining children\'s limited ability to recognise persuasion.',
        blocks: block(
          'Commercial messages aimed directly at children deserve strict limits because young audiences may not recognise persuasive intent.',
          'A child can interpret an attractive character or repeated slogan as reliable information rather than a sales technique.',
          'This imbalance allows companies to influence preferences before the viewer can evaluate price, quality or health consequences independently.',
          'For example, a colourful promotion inside a children\'s game may feel like part of the entertainment even when it is designed to trigger a purchase request.',
          'Protecting children from such targeted persuasion is therefore a legitimate reason for restricting these advertisements.',
        ),
        commonMistake: 'Condemning all advertising. The task and paragraph concern advertising aimed specifically at children.',
      },
    ],
  },
  {
    id: 'discussion',
    shortLabel: 'Discussion',
    label: 'Discussion: explain the first stated view fairly',
    signal: 'Discuss both views and give your own opinion.',
    function: 'Body 1 normally explains why reasonable people hold the first view. Accurate representation comes before evaluation.',
    planningQuestion: 'What is the strongest reasoning behind the first view?',
    trap: 'Attacking the first view before explaining it, which turns discussion into caricature.',
    examples: [
      {
        title: 'Homework',
        prompt: 'Some people think children should receive homework every day, while others believe it should be limited. Discuss both views and give your own opinion.',
        paragraphJob: 'Explain the daily-homework view fairly.',
        blocks: block(
          'Supporters of daily homework argue that regular independent practice helps children consolidate classroom learning.',
          'Short tasks can require pupils to retrieve a concept without immediate help from a teacher.',
          'That repeated retrieval reveals misunderstandings early and can make essential procedures more automatic.',
          'For example, a brief set of arithmetic problems may show whether a pupil can apply the day\'s method alone.',
          'From this perspective, the value of daily homework lies in continuity and diagnostic practice.',
        ),
        commonMistake: 'Inserting “I disagree” in the first sentence instead of first explaining why the view exists.',
      },
      {
        title: 'City centres',
        prompt: 'Some people think city centres should be car-free, while others believe cars should remain allowed. Discuss both views and give your own opinion.',
        paragraphJob: 'Explain the case for car-free centres.',
        blocks: block(
          'Those who support car-free city centres emphasise the safety and public-space benefits of reducing traffic.',
          'Removing through-traffic can lower conflict between vehicles, pedestrians and cyclists in the busiest streets.',
          'The recovered space can then support wider pavements, trees, seating and reliable public transport.',
          'A shopping street converted into a pedestrian zone, for instance, can accommodate deliveries at set times while remaining safer during the day.',
          'Advocates therefore see traffic restrictions as a way to make central districts more accessible rather than less active.',
        ),
        commonMistake: 'Assuming “car-free” means emergency services and all deliveries must be prohibited.',
      },
      {
        title: 'Museum funding',
        prompt: 'Some people believe museums should be free, while others think visitors should pay. Discuss both views and give your own opinion.',
        paragraphJob: 'Explain why free admission is attractive.',
        blocks: block(
          'The main argument for free museum admission is that cultural collections should be accessible regardless of income.',
          'An entrance fee can discourage families or frequent learners even when the institution is publicly supported.',
          'Removing that barrier allows residents to use museums as repeat educational spaces rather than occasional luxury attractions.',
          'For example, a student can revisit one gallery for a school project without paying for the entire collection each time.',
          'Free entry can consequently broaden the public value of cultural institutions.',
        ),
        commonMistake: 'Claiming that museums have no operating costs. This paragraph develops access; funding can be evaluated elsewhere.',
      },
      {
        title: 'Specialisation',
        prompt: 'Some people think teenagers should specialise early, while others prefer a broad curriculum. Discuss both views and give your own opinion.',
        paragraphJob: 'Explain the case for early specialisation.',
        blocks: block(
          'Early specialisation can benefit teenagers who already have a clear and demanding educational goal.',
          'Concentrating timetable hours on a smaller group of subjects gives these learners more time for advanced knowledge and deliberate practice.',
          'This depth may be important when later entry depends on a portfolio, audition or technically difficult examination.',
          'A student preparing for conservatory admission, for example, may need sustained musical training that a broad timetable cannot provide.',
          'Supporters therefore regard specialisation as efficient when the learner\'s direction is informed and stable.',
        ),
        commonMistake: 'Presenting specialisation as suitable for every teenager instead of explaining the conditions under which the view is strongest.',
      },
      {
        title: 'Artificial intelligence',
        prompt: 'Some people see artificial intelligence as a major benefit to society, while others consider it a serious threat. Discuss both views and give your own opinion.',
        paragraphJob: 'Explain the benefit view through assistance with complex work.',
        blocks: block(
          'People who view artificial intelligence positively often focus on its ability to assist with complex or repetitive decisions.',
          'Well-designed systems can process large volumes of information and highlight patterns for a human professional to review.',
          'This support can reduce routine workload and leave more time for judgement, communication and unusual cases.',
          'For example, a tool that organises medical images by urgency can help a clinician decide what to inspect first without replacing the final diagnosis.',
          'The optimistic view therefore depends on AI functioning as accountable assistance rather than unchecked authority.',
        ),
        commonMistake: 'Using science-fiction claims instead of explaining a plausible mechanism and its limits.',
      },
    ],
  },
  {
    id: 'problem-solution',
    shortLabel: 'Problem & solution',
    label: 'Problem and solution: follow the first action requested',
    signal: 'What are the causes/problems/effects, and what measures/solutions can be taken?',
    function: 'Body 1 must follow the prompt\'s exact first demand. It may analyse causes, consequences or problems; it is not automatically a “causes paragraph”.',
    planningQuestion: 'What exactly is the first requested action, and which two connected ideas answer it?',
    trap: 'Writing causes when the prompt asks for problems, or proposing solutions before diagnosing the issue.',
    examples: [
      {
        title: 'Traffic congestion',
        prompt: 'Traffic congestion causes serious delays and pollution in many cities. What are its main causes, and what measures can governments take?',
        paragraphJob: 'Analyse the requested causes: car-dependent planning and weak alternatives.',
        blocks: block(
          'Urban congestion is largely caused by car-dependent development combined with inadequate alternatives to driving.',
          'When homes, workplaces and services are spread far apart, many journeys become impractical on foot or by bicycle.',
          'If public transport is also infrequent, travellers converge on the road network at similar times and quickly exceed its capacity.',
          'For example, a distant housing area served by one occasional bus effectively requires most workers to drive during the morning peak.',
          'The resulting congestion is therefore a predictable consequence of land-use and transport choices.',
        ),
        commonMistake: 'Listing “too many cars” as a cause without explaining why so many people need to use them.',
      },
      {
        title: 'Food waste',
        prompt: 'Large quantities of food are wasted by households. Why does this happen, and how can the amount of waste be reduced?',
        paragraphJob: 'Answer why: weak planning and misunderstood date labels.',
        blocks: block(
          'Household food waste often begins with poor purchasing decisions and confusion about product labels.',
          'Shoppers may buy more than they can use when promotions reward quantity or meals have not been planned.',
          'Usable food may then be discarded because a quality label is interpreted as an immediate safety deadline.',
          'For example, an unopened product can be thrown away solely because its best-before date has passed, even when correct storage has preserved it.',
          'Much domestic waste is thus created before food is ever prepared.',
        ),
        commonMistake: 'Moving directly to recycling, which does not explain why edible food is purchased and discarded.',
      },
      {
        title: 'Rural depopulation',
        prompt: 'Young adults are leaving rural areas to live in cities. What problems does this cause, and what solutions can be introduced?',
        paragraphJob: 'Analyse problems, not the reasons young adults leave.',
        blocks: block(
          'The departure of young adults can weaken both the workforce and essential services in rural communities.',
          'As the working-age population contracts, local employers have fewer people to recruit and small businesses lose regular customers.',
          'Lower demand can then make transport, healthcare and retail services harder to sustain, placing additional pressure on older residents.',
          'A village that loses its only grocery shop, for example, may force residents without cars to travel long distances for basic supplies.',
          'Rural depopulation therefore creates a connected economic and social decline.',
        ),
        commonMistake: 'Explaining urban salaries as the cause of migration when the paragraph job is to describe the problems migration creates.',
      },
      {
        title: 'Student inactivity',
        prompt: 'Many schoolchildren do not get enough physical exercise. What are the reasons for this, and what can schools do to solve the problem?',
        paragraphJob: 'Explain reasons before discussing school responses.',
        blocks: block(
          'Insufficient exercise among schoolchildren is partly caused by sedentary routines and limited access to appealing activities.',
          'Homework, screen-based leisure and car travel can occupy time that previously involved movement.',
          'At the same time, a narrow sports programme may exclude pupils who lack confidence in competitive team games.',
          'For example, a child who dislikes football may remain inactive if the school offers no dance, walking or non-competitive fitness option.',
          'The problem therefore reflects both daily habits and the range of opportunities available.',
        ),
        commonMistake: 'Blaming children personally without examining the routines and options shaping their behaviour.',
      },
      {
        title: 'Plastic packaging',
        prompt: 'The use of plastic packaging is increasing. What problems does this create, and what could businesses and consumers do about them?',
        paragraphJob: 'Explain the environmental problems before assigning responses.',
        blocks: block(
          'Expanding plastic packaging creates persistent waste and consumes resources for products used only briefly.',
          'Many packages combine materials or contain residue, which makes economical recycling difficult.',
          'They may consequently remain in landfill or escape into natural environments long after their original purpose has ended.',
          'A multilayer wrapper used for a single snack, for example, can protect the product for days but remain as waste for far longer.',
          'The central problem is therefore a mismatch between short use and prolonged environmental cost.',
        ),
        commonMistake: 'Discussing litter alone and overlooking resource use and hard-to-recycle design.',
      },
    ],
  },
  {
    id: 'advantages-disadvantages',
    shortLabel: 'Advantages & disadvantages',
    label: 'Advantages and disadvantages: develop the first required side',
    signal: 'What are the advantages and disadvantages? / Do the advantages outweigh the disadvantages?',
    function: 'Body 1 usually develops the main advantage or benefit group. For an outweigh prompt, every point should support the comparison made in the thesis.',
    planningQuestion: 'Which first-side effect is significant enough to develop rather than list?',
    trap: 'Counting several small advantages instead of explaining why one matters.',
    examples: [
      {
        title: 'Working from home',
        prompt: 'More employees now work from home. Do the advantages of this development outweigh the disadvantages?',
        paragraphJob: 'Develop the principal advantage: flexible access to work.',
        blocks: block(
          'The strongest advantage of remote work is that it can make employment more accessible and flexible.',
          'Workers are less constrained by commuting distance and may organise focused tasks around essential responsibilities.',
          'This flexibility can retain skilled people who would otherwise reduce their hours or leave a role entirely.',
          'For example, an employee with a mobility limitation may contribute fully from an adapted home workspace without facing an inaccessible journey each day.',
          'Because this benefit expands who can participate in work, it carries substantial social and economic weight.',
        ),
        commonMistake: 'Listing convenience, comfort and saved money as separate undeveloped advantages.',
      },
      {
        title: 'International tourism',
        prompt: 'International tourism has expanded rapidly. What are the advantages and disadvantages of this trend?',
        paragraphJob: 'Develop employment and local demand as connected advantages.',
        blocks: block(
          'International tourism can create a broad source of income for destinations with limited industries.',
          'Visitors purchase accommodation, food, transport and local experiences rather than supporting only one business.',
          'This spending circulates through suppliers and can sustain work that draws on regional knowledge and products.',
          'A guided nature route, for example, may support guides, drivers, family-run restaurants and maintenance staff at the same time.',
          'Tourism\'s main advantage is therefore its capacity to spread demand across a local economy.',
        ),
        commonMistake: 'Claiming tourism automatically enriches every resident without considering where spending goes.',
      },
      {
        title: 'Digital textbooks',
        prompt: 'Schools are replacing printed textbooks with digital materials. Do the advantages outweigh the disadvantages?',
        paragraphJob: 'Develop access to current and adaptable material.',
        blocks: block(
          'Digital materials can give learners faster access to current and adaptable educational content.',
          'Unlike a fixed printed edition, a digital resource can be corrected, searched and adjusted to different accessibility needs.',
          'These functions help teachers respond when information changes or a student requires audio, enlarged text or immediate navigation.',
          'For example, a science resource can update an outdated diagram without requiring the school to replace an entire set of books.',
          'Its flexibility makes digital content a meaningful advantage when devices are provided equitably.',
        ),
        commonMistake: 'Ignoring the condition of device access, which makes the advantage sound universal and unrealistic.',
      },
      {
        title: 'Living abroad',
        prompt: 'More people are choosing to live and work abroad. What are the advantages and disadvantages?',
        paragraphJob: 'Develop career and intercultural learning as related benefits.',
        blocks: block(
          'Living abroad can expand both professional capability and intercultural understanding.',
          'Daily participation in a different workplace requires people to interpret unfamiliar expectations and communication styles.',
          'Over time, this experience can build adaptability that is difficult to gain through short visits or abstract training.',
          'For example, an employee working in a multilingual team must learn how colleagues express disagreement and make decisions across cultures.',
          'International residence can therefore produce practical skills alongside personal experience.',
        ),
        commonMistake: 'Using travel enjoyment as the only benefit when the task concerns living and working abroad.',
      },
      {
        title: 'Online shopping',
        prompt: 'Online shopping is replacing visits to physical stores. Do the advantages outweigh the disadvantages?',
        paragraphJob: 'Develop accessibility and wider choice as the main benefit.',
        blocks: block(
          'Online retail offers significant accessibility to consumers whose location or mobility limits store visits.',
          'Digital catalogues allow buyers to compare a wider range of products without travelling between distant shops.',
          'This access is especially important when a necessary item is unavailable locally rather than merely less convenient to obtain.',
          'For instance, a resident of a remote town can order specialised equipment that no nearby retailer can afford to stock.',
          'The ability to overcome geographic limits gives online shopping a substantial practical advantage.',
        ),
        commonMistake: 'Reducing the argument to “shopping is easier” without identifying who benefits and why the effect matters.',
      },
    ],
  },
  {
    id: 'direct-questions',
    shortLabel: 'Direct questions',
    label: 'Direct questions: answer Question 1 explicitly',
    signal: 'A shared topic followed by two distinct questions.',
    function: 'Body 1 should state and develop a direct answer to the first question. It must not drift into Question 2 before the first answer is clear.',
    planningQuestion: 'What is my one-sentence answer to Question 1, before I add support?',
    trap: 'Writing generally about the topic while leaving the first question implicit.',
    examples: [
      {
        title: 'Living alone',
        prompt: 'More people are choosing to live alone. Why is this becoming common? Is it a positive or negative development?',
        paragraphJob: 'Answer why: financial independence and changing expectations.',
        blocks: block(
          'Living alone has become more common because greater personal independence now makes it both possible and socially acceptable.',
          'More adults can support a separate household and are less likely to view marriage as the only respectable route to adulthood.',
          'Together, income and changing expectations allow people to prioritise privacy or postpone long-term partnership.',
          'For example, a young professional may rent a small home alone instead of remaining with family until marriage.',
          'The trend is therefore driven by expanded choice rather than one single demographic cause.',
        ),
        commonMistake: 'Evaluating whether the trend is positive in Body 1 before adequately answering why it happens.',
      },
      {
        title: 'News consumption',
        prompt: 'Many people now get news from social media. Why has this happened? How can users determine whether information is reliable?',
        paragraphJob: 'Answer why: speed, convenience and integration into daily habits.',
        blocks: block(
          'Social media has become a major news source because it delivers information quickly within platforms people already use.',
          'Users do not need to visit several publications when headlines, live updates and personal commentary appear in one feed.',
          'Notifications also turn news exposure into a continuous habit rather than a deliberate separate activity.',
          'For example, a commuter may learn about a developing event from an alert before choosing whether to open a full report.',
          'Convenience and immediacy therefore explain much of the shift toward social news consumption.',
        ),
        commonMistake: 'Explaining how to verify news before completing the answer to why social media became popular.',
      },
      {
        title: 'Career changes',
        prompt: 'People increasingly change careers several times. Why is this the case? Is this generally beneficial?',
        paragraphJob: 'Answer why: changing industries and changing personal priorities.',
        blocks: block(
          'Repeated career changes reflect both a less stable labour market and a greater willingness to reconsider personal goals.',
          'Technology can reduce demand for one role while creating work that requires a different combination of skills.',
          'At the same time, workers may no longer accept that an early career decision must define their entire working life.',
          'For example, an administrator may retrain for digital project work when routine processes become automated and new opportunities appear.',
          'Career mobility is thus produced by economic change as well as individual choice.',
        ),
        commonMistake: 'Judging career changes as beneficial before the causes requested in Question 1 have been developed.',
      },
      {
        title: 'Historic buildings',
        prompt: 'Why should historic buildings be protected? Who should pay for their preservation?',
        paragraphJob: 'Answer why: they preserve evidence, identity and continuity.',
        blocks: block(
          'Historic buildings should be protected because they preserve physical evidence of how a community developed.',
          'Architecture records materials, priorities and forms of work that written summaries cannot reproduce fully.',
          'Retaining significant structures also gives residents a visible connection between present neighbourhoods and earlier generations.',
          'For example, a restored market hall can reveal a town\'s trading history while continuing to serve a public function.',
          'Protection is therefore justified by both educational value and cultural continuity.',
        ),
        commonMistake: 'Starting with who should pay instead of answering the first question about value.',
      },
      {
        title: 'Later parenthood',
        prompt: 'More adults are having children later in life. Why is this happening? What effects can it have on families and society?',
        paragraphJob: 'Answer why: longer preparation for financial and professional stability.',
        blocks: block(
          'Later parenthood is often the result of adults taking longer to establish financial and professional stability.',
          'Extended education and insecure housing can delay the point at which people feel able to support a child.',
          'Career structures may also make early parenthood difficult when progression depends on uninterrupted training or irregular hours.',
          'For example, a couple may postpone having children until they complete professional qualifications and secure a stable home.',
          'The timing of parenthood therefore reflects practical conditions as much as personal preference.',
        ),
        commonMistake: 'Discussing demographic effects before completing the requested explanation of why the change occurs.',
      },
    ],
  },
];

const BODY_ONE_ARCHITECTURES: Record<EssayTypeId, BodyArchitectureBlock[]> = {
  opinion: [
    { label: 'Position claim', tone: 'claim', purpose: 'States the first reason supporting the thesis.' },
    { label: 'Reason', tone: 'paraphrase', purpose: 'Makes that reason precise and arguable.' },
    { label: 'Mechanism', tone: 'development', purpose: 'Explains how or why the reason works.' },
    { label: 'Illustration', tone: 'example', purpose: 'Makes the mechanism concrete without inventing a source.' },
    { label: 'Position link', tone: 'link', purpose: 'Reconnects the developed reason to the stated position.' },
  ],
  discussion: [
    { label: 'First-view sentence', tone: 'claim', purpose: 'Presents the first stated view fairly.' },
    { label: 'Reason behind the view', tone: 'paraphrase', purpose: 'Explains why reasonable people hold this view.' },
    { label: 'Development', tone: 'development', purpose: 'Develops the logic before the writer evaluates it.' },
    { label: 'Illustration', tone: 'example', purpose: 'Shows how the view could operate in a plausible situation.' },
    { label: 'View summary', tone: 'link', purpose: 'Summarises the value claimed by supporters of the first view.' },
  ],
  'problem-solution': [
    { label: 'Problem or cause', tone: 'claim', purpose: 'Answers the first requested problem, cause or effect.' },
    { label: 'Specific factor', tone: 'paraphrase', purpose: 'Names the precise condition driving the issue.' },
    { label: 'Cause-and-effect chain', tone: 'development', purpose: 'Explains how the factor creates the stated consequence.' },
    { label: 'Illustration', tone: 'example', purpose: 'Makes the causal chain concrete.' },
    { label: 'Task link', tone: 'link', purpose: 'Returns to the exact first instruction.' },
  ],
  'advantages-disadvantages': [
    { label: 'First-side claim', tone: 'claim', purpose: 'States the first advantage or disadvantage to develop.' },
    { label: 'Effect', tone: 'paraphrase', purpose: 'Makes the practical consequence precise.' },
    { label: 'Evaluation', tone: 'development', purpose: 'Explains why that consequence matters.' },
    { label: 'Illustration', tone: 'example', purpose: 'Shows the consequence in a plausible case.' },
    { label: 'Balance link', tone: 'link', purpose: 'Prepares the comparison completed elsewhere in the essay.' },
  ],
  'direct-questions': [
    { label: 'Answer to Question 1', tone: 'claim', purpose: 'Answers the first direct question immediately.' },
    { label: 'Primary reason', tone: 'paraphrase', purpose: 'Gives the main reason for that answer.' },
    { label: 'Explanation', tone: 'development', purpose: 'Develops how or why the answer is valid.' },
    { label: 'Illustration', tone: 'example', purpose: 'Makes the answer concrete.' },
    { label: 'Question 1 link', tone: 'link', purpose: 'Closes the first answer without drifting into Question 2.' },
  ],
};

export function bodyOneArchitecture(essayType: EssayTypeId) {
  return BODY_ONE_ARCHITECTURES[essayType];
}

export const BODY_ONE_LESSONS: BodyOneLesson[] = BODY_ONE_LESSONS_RAW.map((lesson) => ({
  ...lesson,
  examples: lesson.examples.map((example) => ({
    ...example,
    blocks: example.blocks.map((item, index) => ({
      ...item,
      ...BODY_ONE_ARCHITECTURES[lesson.id][index],
    })),
  })),
}));

export function bodyParagraph(example: BodyOneExample) {
  return example.blocks.map((item) => item.text).join(' ');
}
