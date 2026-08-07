export type EssayTypeId =
  | 'opinion'
  | 'discussion'
  | 'problem-solution'
  | 'advantages-disadvantages'
  | 'direct-questions';

export type BlockTone = 'prompt' | 'paraphrase' | 'claim' | 'development' | 'evidence' | 'contrast' | 'link' | 'review';

export type IntroBlock = {
  label: string;
  text: string;
  tone: BlockTone;
  optional?: boolean;
};

export type GuidedExample = {
  title: string;
  prompt: string;
  instruction: string;
  plan: string;
  blocks: IntroBlock[];
  whyItWorks: string[];
};

export type EssayTypeLesson = {
  id: EssayTypeId;
  shortLabel: string;
  label: string;
  signal: string;
  mustAnswer: string;
  position: string;
  bodyOne: string;
  bodyTwo: string;
  bodyThree: string;
  conclusion: string;
  trap: string;
  sentenceTypes: string[];
  linkingFunctions: string[];
  blocks: IntroBlock[];
  examples: GuidedExample[];
};

export const ESSAY_TYPES: EssayTypeLesson[] = [
  {
    id: 'opinion',
    shortLabel: 'Opinion',
    label: 'Opinion: agree, disagree or evaluate an extent',
    signal: 'To what extent do you agree or disagree? / Do you agree or disagree?',
    mustAnswer: 'State and maintain a clear position on the proposition. A qualified position is possible, but it must remain easy to identify.',
    position: 'Required. The thesis should reveal the writer\'s answer rather than merely announce that an opinion will appear.',
    bodyOne: 'Develop the first reason supporting the position.',
    bodyTwo: 'Develop a second reason, or concede and rebut the strongest opposing point.',
    bodyThree: 'Optional when a genuinely distinct third reason is needed and can be developed within the time available.',
    conclusion: 'Restate the position and synthesise the main reasons without adding a new argument.',
    trap: 'Writing a discussion essay that presents both sides but never answers the extent question.',
    sentenceTypes: ['Paraphrase', 'Position statement', 'Reason preview', 'Concession'],
    linkingFunctions: ['stance', 'concession', 'reason'],
    blocks: [
      { label: 'Paraphrase', tone: 'paraphrase', text: 'Reframe the proposition accurately.' },
      { label: 'Position', tone: 'claim', text: 'Answer agree, disagree or extent directly.' },
      { label: 'Reason preview', tone: 'link', text: 'Signal the two controlling reasons.', optional: true },
    ],
    examples: [
      {
        title: 'Academic pressure',
        prompt: 'Some people believe that schools place too much pressure on students to achieve high grades. To what extent do you agree or disagree?',
        instruction: 'Choose an extent and make it visible.',
        plan: 'Body 1: wellbeing. Body 2: depth of learning.',
        blocks: [
          { label: 'Paraphrase', tone: 'paraphrase', text: 'High academic expectations have become a defining feature of many school systems.' },
          { label: 'Position', tone: 'claim', text: 'I largely agree that the pressure to secure top marks is excessive because it can damage student wellbeing and encourage superficial learning.' },
        ],
        whyItWorks: ['“Largely agree” answers the extent precisely.', 'The two reasons create a clear route for the body paragraphs.'],
      },
      {
        title: 'Public transport',
        prompt: 'Governments should make public transport free in order to reduce traffic congestion. Do you agree or disagree?',
        instruction: 'Answer the proposal, not only the topic of congestion.',
        plan: 'Body 1: price is only one barrier. Body 2: service quality matters more.',
        blocks: [
          { label: 'Paraphrase', tone: 'paraphrase', text: 'Removing fares is often proposed as a way for governments to persuade commuters to leave their cars at home.' },
          { label: 'Position', tone: 'claim', text: 'I disagree that free travel alone would substantially reduce congestion, since reliability and network coverage exert a stronger influence on transport choices.' },
        ],
        whyItWorks: ['The thesis rejects the absolute solution rather than denying that price matters.', 'The causal clause previews a focused argument.'],
      },
      {
        title: 'University access',
        prompt: 'University education should be free for everyone, regardless of income. To what extent do you agree or disagree?',
        instruction: 'A qualified position must still be decisive.',
        plan: 'Body 1: remove financial barriers. Body 2: targeted funding is more sustainable.',
        blocks: [
          { label: 'Paraphrase', tone: 'paraphrase', text: 'Whether all students should receive tuition-free higher education remains a major question of public policy.' },
          { label: 'Position', tone: 'claim', text: 'Although cost should never prevent qualified applicants from studying, I only partly support universal free tuition because targeted assistance is both fairer and more financially sustainable.' },
        ],
        whyItWorks: ['The concession defines what the writer accepts.', '“Only partly support” and the because-clause define the exact position.'],
      },
      {
        title: 'Remote work',
        prompt: 'Working from home is better for employees and employers than working in an office. To what extent do you agree or disagree?',
        instruction: 'Evaluate both groups named in the claim.',
        plan: 'Body 1: employee flexibility. Body 2: employer outcomes vary by role.',
        blocks: [
          { label: 'Paraphrase', tone: 'paraphrase', text: 'Remote employment is increasingly presented as a superior alternative to office-based work for organisations and their staff.' },
          { label: 'Position', tone: 'claim', text: 'I agree that it can benefit both groups, provided that employers preserve collaboration and match remote arrangements to the demands of each role.' },
        ],
        whyItWorks: ['The condition prevents an overgeneralised claim.', 'Both employees and employers remain inside the response.'],
      },
      {
        title: 'Advertising to children',
        prompt: 'Advertising aimed at children should be prohibited. Do you agree or disagree?',
        instruction: 'State a direct position and preview the logic.',
        plan: 'Body 1: limited critical judgement. Body 2: health and family pressure.',
        blocks: [
          { label: 'Paraphrase', tone: 'paraphrase', text: 'Calls to ban child-directed advertising reflect growing concern about the commercial influence exerted on young audiences.' },
          { label: 'Position', tone: 'claim', text: 'I strongly support such a prohibition because children cannot reliably evaluate persuasive intent and the resulting consumption pressure can harm both health and family life.' },
        ],
        whyItWorks: ['The position is unmistakable.', 'The thesis supplies two distinct and developable reasons.'],
      },
    ],
  },
  {
    id: 'discussion',
    shortLabel: 'Discussion',
    label: 'Discussion: examine both views and give an opinion',
    signal: 'Discuss both views and give your own opinion.',
    mustAnswer: 'Represent both positions fairly and make the writer\'s own view clear.',
    position: 'Required when the prompt asks for it. It may appear in the introduction and should remain consistent throughout the essay.',
    bodyOne: 'Explain the first stated view and why people hold it.',
    bodyTwo: 'Explain the second stated view and connect it to the writer\'s judgement.',
    bodyThree: 'Optional if the writer separates personal evaluation from the two view paragraphs, but a four-paragraph essay can usually integrate it efficiently.',
    conclusion: 'Summarise the comparison and restate the writer\'s judgement.',
    trap: 'Mentioning both views but postponing any identifiable opinion until the final sentence of the essay.',
    sentenceTypes: ['Paraphrase', 'Contrast', 'Position statement', 'Roadmap'],
    linkingFunctions: ['contrast', 'comparison', 'stance'],
    blocks: [
      { label: 'Paraphrase both views', tone: 'paraphrase', text: 'Represent the disagreement neutrally.' },
      { label: 'Position', tone: 'claim', text: 'State which view is more convincing, or give a qualified synthesis.' },
      { label: 'Roadmap', tone: 'link', text: 'Show that both perspectives will be examined.', optional: true },
    ],
    examples: [
      {
        title: 'Children and smartphones',
        prompt: 'Some people think parents should restrict children\'s smartphone use, while others believe children should manage it themselves. Discuss both views and give your own opinion.',
        instruction: 'Preserve both views and state a judgement.',
        plan: 'Body 1: autonomy. Body 2: guided limits and writer\'s view.',
        blocks: [
          { label: 'Paraphrase', tone: 'paraphrase', text: 'Opinions differ over whether children should regulate their own smartphone use or be subject to parental limits.' },
          { label: 'Position', tone: 'claim', text: 'While self-management can build responsibility, I believe age-appropriate parental boundaries are necessary until children can judge digital risks independently.' },
        ],
        whyItWorks: ['Each view is represented accurately.', 'The writer\'s preference and qualification are visible.'],
      },
      {
        title: 'City investment',
        prompt: 'Some people believe cities should spend more on public parks, while others think housing should be the priority. Discuss both views and give your opinion.',
        instruction: 'Compare competing uses of limited public money.',
        plan: 'Body 1: parks and health. Body 2: housing urgency and writer\'s priority.',
        blocks: [
          { label: 'Paraphrase', tone: 'paraphrase', text: 'Municipal governments face competing demands to expand green space and provide adequate housing.' },
          { label: 'Position', tone: 'claim', text: 'Although parks make cities healthier and more liveable, I consider secure housing the more urgent priority in areas with severe shortages.' },
        ],
        whyItWorks: ['The concession gives the first view genuine merit.', 'The position is conditional on the context named in the thesis.'],
      },
      {
        title: 'Team or individual sport',
        prompt: 'Some people think team sports are more beneficial for young people, while others prefer individual sports. Discuss both views and give your opinion.',
        instruction: 'Avoid claiming that one format suits every learner.',
        plan: 'Body 1: cooperation. Body 2: autonomy and balanced judgement.',
        blocks: [
          { label: 'Paraphrase', tone: 'paraphrase', text: 'There is debate over whether young people gain more from collective sports or activities pursued individually.' },
          { label: 'Position', tone: 'claim', text: 'In my view, neither format is universally superior: team sports develop cooperation, whereas individual disciplines can foster self-reliance and personal accountability.' },
        ],
        whyItWorks: ['A balanced opinion is still a clear opinion.', 'The parallel structure previews one body focus for each view.'],
      },
      {
        title: 'Museums',
        prompt: 'Some people think museums should entertain visitors, while others believe their main purpose is education. Discuss both views and give your opinion.',
        instruction: 'Resolve the apparent opposition rather than listing two functions.',
        plan: 'Body 1: educational duty. Body 2: engagement as a method.',
        blocks: [
          { label: 'Paraphrase', tone: 'paraphrase', text: 'The role of museums is contested between those who prioritise instruction and those who expect an engaging visitor experience.' },
          { label: 'Position', tone: 'claim', text: 'I believe education should remain their central purpose, but carefully designed entertainment can make that purpose more effective rather than undermine it.' },
        ],
        whyItWorks: ['The thesis combines the views without avoiding judgement.', 'It creates a logical relationship between purpose and method.'],
      },
      {
        title: 'Prison or rehabilitation',
        prompt: 'Some people believe longer prison sentences reduce crime, while others favour rehabilitation. Discuss both views and give your opinion.',
        instruction: 'Name the policy contrast precisely.',
        plan: 'Body 1: punishment and deterrence. Body 2: rehabilitation and reoffending.',
        blocks: [
          { label: 'Paraphrase', tone: 'paraphrase', text: 'Crime policy is divided between punitive approaches based on longer imprisonment and programmes designed to rehabilitate offenders.' },
          { label: 'Position', tone: 'claim', text: 'While extended sentences may be justified for dangerous offenders, I believe rehabilitation is generally more effective at reducing repeat crime.' },
        ],
        whyItWorks: ['The concession avoids an absolute claim.', 'The writer evaluates effectiveness, which is the central issue.'],
      },
    ],
  },
  {
    id: 'problem-solution',
    shortLabel: 'Problem & solution',
    label: 'Problem and solution: follow the exact combination requested',
    signal: 'What are the causes/problems? What measures/solutions can be taken?',
    mustAnswer: 'Identify the requested causes or problems and propose solutions that directly address them. Some prompts request only one of these combinations.',
    position: 'A personal opinion is not always required. The thesis should define the diagnostic and solution route.',
    bodyOne: 'Analyse the requested causes or consequences rather than merely describing the topic.',
    bodyTwo: 'Develop feasible solutions and show how they address the preceding causes or problems.',
    bodyThree: 'Optional when the prompt asks separately about causes, effects and solutions and each part needs adequate development.',
    conclusion: 'Summarise the diagnosis and the most effective response.',
    trap: 'Memorising a causes-and-solutions template when the actual prompt asks for problems and measures, or causes and effects.',
    sentenceTypes: ['Paraphrase', 'Scope statement', 'Cause-and-effect', 'Roadmap'],
    linkingFunctions: ['cause', 'result', 'solution'],
    blocks: [
      { label: 'Paraphrase the issue', tone: 'paraphrase', text: 'Define the problem without exaggeration.' },
      { label: 'Scope thesis', tone: 'claim', text: 'Name the exact parts the essay will analyse.' },
      { label: 'Solution link', tone: 'link', text: 'Connect proposed responses to the diagnosis.', optional: true },
    ],
    examples: [
      {
        title: 'Traffic congestion',
        prompt: 'Traffic congestion causes serious delays and pollution in many cities. What are its main causes, and what measures can governments take?',
        instruction: 'Cover causes and government measures.',
        plan: 'Body 1: car dependence and weak transit. Body 2: transit and demand management.',
        blocks: [
          { label: 'Paraphrase', tone: 'paraphrase', text: 'Severe road congestion has become a costly environmental and mobility problem in many urban areas.' },
          { label: 'Scope thesis', tone: 'claim', text: 'This essay argues that car-dependent planning and inadequate public transport are the principal causes, and examines how investment and demand-management policies can address them.' },
        ],
        whyItWorks: ['The thesis identifies specific causes instead of announcing a generic discussion.', 'The solution categories correspond to those causes.'],
      },
      {
        title: 'Food waste',
        prompt: 'Large quantities of food are wasted by households. Why does this happen, and how can the amount of waste be reduced?',
        instruction: 'Answer why and how.',
        plan: 'Body 1: purchasing habits and date labels. Body 2: planning and clearer labels.',
        blocks: [
          { label: 'Paraphrase', tone: 'paraphrase', text: 'Household food waste remains widespread despite its financial and environmental costs.' },
          { label: 'Scope thesis', tone: 'claim', text: 'The problem largely results from poor purchasing decisions and confusion over date labels, both of which can be reduced through practical consumer guidance and clearer packaging.' },
        ],
        whyItWorks: ['The causes and solutions are paired in one precise sentence.', 'No unnecessary personal opinion is invented.'],
      },
      {
        title: 'Rural depopulation',
        prompt: 'Young adults are leaving rural areas to live in cities. What problems does this cause, and what solutions can be introduced?',
        instruction: 'Discuss consequences, not reasons for leaving.',
        plan: 'Body 1: ageing population and service decline. Body 2: jobs and connectivity.',
        blocks: [
          { label: 'Paraphrase', tone: 'paraphrase', text: 'The movement of younger residents from the countryside to cities is reshaping rural communities.' },
          { label: 'Scope thesis', tone: 'claim', text: 'This trend weakens local workforces and essential services, but targeted employment, transport and digital-connectivity policies could make rural life more viable.' },
        ],
        whyItWorks: ['It follows the prompt\'s problems-and-solutions wording.', 'The proposed policy areas answer the named consequences.'],
      },
      {
        title: 'Student inactivity',
        prompt: 'Many schoolchildren do not get enough physical exercise. What are the reasons for this, and what can schools do to solve the problem?',
        instruction: 'Keep the solutions within the actor named: schools.',
        plan: 'Body 1: sedentary routines and limited access. Body 2: timetable and inclusive activities.',
        blocks: [
          { label: 'Paraphrase', tone: 'paraphrase', text: 'Insufficient physical activity has become a common feature of school-age life.' },
          { label: 'Scope thesis', tone: 'claim', text: 'Although sedentary leisure and limited opportunities contribute to the problem, schools can respond by protecting activity time and offering a wider range of accessible sports.' },
        ],
        whyItWorks: ['The response stays within school-level action.', 'The concession structure links diagnosis and response naturally.'],
      },
      {
        title: 'Plastic packaging',
        prompt: 'The use of plastic packaging is increasing. What problems does this create, and what could businesses and consumers do about them?',
        instruction: 'Address both responsible groups.',
        plan: 'Body 1: waste and resource costs. Body 2: business redesign and consumer reuse.',
        blocks: [
          { label: 'Paraphrase', tone: 'paraphrase', text: 'Growing reliance on plastic packaging has intensified concerns about waste and resource consumption.' },
          { label: 'Scope thesis', tone: 'claim', text: 'The most serious effects are persistent pollution and unnecessary material use, requiring businesses to redesign packaging and consumers to favour reusable alternatives.' },
        ],
        whyItWorks: ['Both problems are explicit.', 'Both actors requested by the prompt receive a distinct response.'],
      },
    ],
  },
  {
    id: 'advantages-disadvantages',
    shortLabel: 'Advantages & disadvantages',
    label: 'Advantages and disadvantages: describe or evaluate',
    signal: 'What are the advantages and disadvantages? / Do the advantages outweigh the disadvantages?',
    mustAnswer: 'Cover both sides. If the prompt asks whether one side outweighs the other, make and support that judgement.',
    position: 'Required for an outweigh question. For a plain advantages-and-disadvantages prompt, an evaluation is useful but should not replace coverage of both sides.',
    bodyOne: 'Develop the most relevant advantage or group of related benefits.',
    bodyTwo: 'Develop the main disadvantage and, for an outweigh task, compare its significance with the benefits.',
    bodyThree: 'Optional when several genuinely distinct effects require development; avoid turning the essay into a list.',
    conclusion: 'Summarise the trade-off and repeat the evaluation if the task requires one.',
    trap: 'Using “outweigh” language when the prompt asks only for both sides, or failing to decide when it explicitly asks for an evaluation.',
    sentenceTypes: ['Paraphrase', 'Evaluation thesis', 'Contrast', 'Concession'],
    linkingFunctions: ['contrast', 'evaluation', 'concession'],
    blocks: [
      { label: 'Paraphrase the development', tone: 'paraphrase', text: 'Describe the change or trend neutrally.' },
      { label: 'Evaluation thesis', tone: 'claim', text: 'Signal both sides and answer “outweigh” when required.' },
      { label: 'Contrast frame', tone: 'contrast', text: 'Preview the basis of the comparison.', optional: true },
    ],
    examples: [
      {
        title: 'Working from home',
        prompt: 'More employees now work from home. Do the advantages of this development outweigh the disadvantages?',
        instruction: 'Make a comparative judgement.',
        plan: 'Body 1: flexibility and access. Body 2: collaboration costs, then evaluation.',
        blocks: [
          { label: 'Paraphrase', tone: 'paraphrase', text: 'Home-based employment has replaced daily office attendance for a growing share of the workforce.' },
          { label: 'Evaluation thesis', tone: 'claim', text: 'Although remote work can weaken spontaneous collaboration, its gains in flexibility and access to employment are more substantial overall.' },
        ],
        whyItWorks: ['Both sides appear before the judgement.', '“More substantial overall” answers the outweigh instruction.'],
      },
      {
        title: 'International tourism',
        prompt: 'International tourism has expanded rapidly. What are the advantages and disadvantages of this trend?',
        instruction: 'Cover both sides without inventing an outweigh requirement.',
        plan: 'Body 1: income and exchange. Body 2: environmental and cultural pressure.',
        blocks: [
          { label: 'Paraphrase', tone: 'paraphrase', text: 'The rapid growth of cross-border tourism has transformed many destinations and local economies.' },
          { label: 'Scope thesis', tone: 'claim', text: 'This development can generate employment and cultural exchange, but it may also place severe pressure on ecosystems, infrastructure and community life.' },
        ],
        whyItWorks: ['It previews both sides without forcing a verdict.', 'The categories are broad enough to organise two coherent body paragraphs.'],
      },
      {
        title: 'Digital textbooks',
        prompt: 'Schools are replacing printed textbooks with digital materials. Do the advantages outweigh the disadvantages?',
        instruction: 'Compare learning benefits with practical risks.',
        plan: 'Body 1: access and updates. Body 2: distraction and inequality.',
        blocks: [
          { label: 'Paraphrase', tone: 'paraphrase', text: 'Digital resources are increasingly taking the place of printed books in schools.' },
          { label: 'Evaluation thesis', tone: 'claim', text: 'I believe the advantages outweigh the drawbacks because searchable, current materials can improve access to learning, provided that schools address distraction and unequal device access.' },
        ],
        whyItWorks: ['The condition acknowledges the strongest drawbacks.', 'The judgement remains clear despite the qualification.'],
      },
      {
        title: 'Living abroad',
        prompt: 'More people are choosing to live and work abroad. What are the advantages and disadvantages?',
        instruction: 'Organise benefits and costs around the individual.',
        plan: 'Body 1: career and intercultural growth. Body 2: isolation and instability.',
        blocks: [
          { label: 'Paraphrase', tone: 'paraphrase', text: 'An increasing number of adults are relocating overseas for employment and long-term residence.' },
          { label: 'Scope thesis', tone: 'claim', text: 'Such mobility can broaden career and cultural experience, although it may also create social isolation and long-term uncertainty.' },
        ],
        whyItWorks: ['The sentence answers the plain two-sided task.', 'The parallel verbs create a concise roadmap.'],
      },
      {
        title: 'Online shopping',
        prompt: 'Online shopping is replacing visits to physical stores. Do the advantages outweigh the disadvantages?',
        instruction: 'Evaluate significance rather than count points.',
        plan: 'Body 1: convenience and reach. Body 2: local retail and waste, then judgement.',
        blocks: [
          { label: 'Paraphrase', tone: 'paraphrase', text: 'Purchasing through digital platforms is increasingly displacing conventional in-store shopping.' },
          { label: 'Evaluation thesis', tone: 'claim', text: 'Despite its effects on local retailers and packaging waste, I consider the wider choice and accessibility offered by online shopping to be the more significant outcome.' },
        ],
        whyItWorks: ['The drawbacks are acknowledged specifically.', 'The final comparison explains which side carries greater weight.'],
      },
    ],
  },
  {
    id: 'direct-questions',
    shortLabel: 'Direct questions',
    label: 'Direct questions: answer every question explicitly',
    signal: 'A topic followed by two distinct questions, often beginning with why, what, how or do you think.',
    mustAnswer: 'Identify every question and ensure that each receives a visible answer and adequate development.',
    position: 'Required whenever one question asks for an evaluation or opinion. Other questions may require explanation rather than stance.',
    bodyOne: 'Answer the first question directly.',
    bodyTwo: 'Answer the second question directly and maintain any stated evaluation.',
    bodyThree: 'Optional if one question contains two separate demands that cannot be developed adequately in one paragraph.',
    conclusion: 'Synthesize the answers; do not answer only the opinion question.',
    trap: 'Writing generally about the topic and overlooking one of the two questions.',
    sentenceTypes: ['Paraphrase', 'Two-part thesis', 'Position statement', 'Roadmap'],
    linkingFunctions: ['sequence', 'scope', 'stance'],
    blocks: [
      { label: 'Paraphrase the shared topic', tone: 'paraphrase', text: 'Introduce the issue connecting both questions.' },
      { label: 'Answer map', tone: 'link', text: 'Preview a direct response to question one and question two.' },
      { label: 'Position', tone: 'claim', text: 'State the answer if either question requires judgement.' },
    ],
    examples: [
      {
        title: 'Living alone',
        prompt: 'More people are choosing to live alone. Why is this becoming common? Is it a positive or negative development?',
        instruction: 'Preview a cause and an evaluation.',
        plan: 'Body 1: income and social norms. Body 2: autonomy versus isolation.',
        blocks: [
          { label: 'Paraphrase', tone: 'paraphrase', text: 'Single-person households are becoming increasingly common in many societies.' },
          { label: 'Two-part thesis', tone: 'link', text: 'This shift is largely driven by greater financial independence and changing social expectations,' },
          { label: 'Position', tone: 'claim', text: 'and I regard it as mixed overall because greater autonomy may be offset by weaker social support.' },
        ],
        whyItWorks: ['The cause answers question one immediately.', 'The qualified evaluation gives a clear answer to question two.'],
      },
      {
        title: 'News consumption',
        prompt: 'Many people now get news from social media. Why has this happened? How can users determine whether information is reliable?',
        instruction: 'Answer a cause question and a practical-method question.',
        plan: 'Body 1: speed and convenience. Body 2: source and evidence checks.',
        blocks: [
          { label: 'Paraphrase', tone: 'paraphrase', text: 'Social platforms have become a primary news source for a large part of the public.' },
          { label: 'Two-part thesis', tone: 'link', text: 'Their speed and convenience explain this change, while users can judge reliability by checking authorship, evidence and independent reporting.' },
        ],
        whyItWorks: ['Each half of the thesis maps to one question.', 'No personal opinion is added because the prompt does not request one.'],
      },
      {
        title: 'Career changes',
        prompt: 'People increasingly change careers several times. Why is this the case? Is this generally beneficial?',
        instruction: 'State reasons and a judgement.',
        plan: 'Body 1: labour-market change and priorities. Body 2: adaptability versus insecurity.',
        blocks: [
          { label: 'Paraphrase', tone: 'paraphrase', text: 'Moving between professions has become a normal feature of many working lives.' },
          { label: 'Two-part thesis', tone: 'link', text: 'Technological change and shifting personal priorities are major drivers,' },
          { label: 'Position', tone: 'claim', text: 'and I consider the trend broadly beneficial when workers have access to retraining and financial support.' },
        ],
        whyItWorks: ['The conditional stance avoids an unsupported universal claim.', 'Both questions receive a concise preview.'],
      },
      {
        title: 'Historic buildings',
        prompt: 'Why should historic buildings be protected? Who should pay for their preservation?',
        instruction: 'Answer purpose and responsibility.',
        plan: 'Body 1: identity and knowledge. Body 2: shared public-private funding.',
        blocks: [
          { label: 'Paraphrase', tone: 'paraphrase', text: 'Preserving historic architecture often requires substantial and continuing investment.' },
          { label: 'Two-part thesis', tone: 'link', text: 'Such buildings protect cultural memory and local identity, and their upkeep should therefore be shared by governments, owners and the businesses that benefit from heritage tourism.' },
        ],
        whyItWorks: ['The reason and responsible actors are explicit.', '“Therefore” makes the relationship between value and funding logical.'],
      },
      {
        title: 'Later parenthood',
        prompt: 'More adults are having children later in life. Why is this happening? What effects can it have on families and society?',
        instruction: 'Preview causes and effects without turning the task into an opinion essay.',
        plan: 'Body 1: education, careers and housing. Body 2: stability, health and demographics.',
        blocks: [
          { label: 'Paraphrase', tone: 'paraphrase', text: 'Parenthood is being postponed to later stages of adulthood in a growing number of countries.' },
          { label: 'Two-part thesis', tone: 'link', text: 'Longer education, career priorities and housing costs contribute to this pattern, which can bring greater financial stability but also create health and demographic pressures.' },
        ],
        whyItWorks: ['The thesis previews several connected causes.', 'The effects cover both families and wider society.'],
      },
    ],
  },
];

export const INTRO_SENTENCE_TYPES = [
  {
    name: 'Paraphrase sentence',
    tone: 'paraphrase' as const,
    purpose: 'Reframes the precise topic without copying a long phrase or changing the claim.',
    placement: 'Usually the first sentence of the introduction.',
    bestFor: 'All five essay families.',
    frame: '[Topic] has become / remains / is increasingly [accurate reformulation].',
    weak: 'Nowadays, technology is very important in our lives.',
    strong: 'Digital services now shape how many people work, study and access essential information.',
    improvement: 'The revision names the exact area of impact and removes a memorised opening.',
  },
  {
    name: 'Position statement',
    tone: 'claim' as const,
    purpose: 'Answers an opinion or evaluation instruction directly.',
    placement: 'Inside the thesis, normally at the end of the introduction.',
    bestFor: 'Opinion, discussion with opinion, outweigh and evaluative direct questions.',
    frame: 'I [strongly / largely / partly] agree that... because...',
    weak: 'This essay will give my opinion.',
    strong: 'I largely agree that public transport should receive greater investment because it offers the broadest social and environmental benefits.',
    improvement: 'The revision states both the degree of agreement and the controlling reason.',
  },
  {
    name: 'Scope thesis',
    tone: 'claim' as const,
    purpose: 'Defines which causes, problems, solutions or effects the essay will develop.',
    placement: 'Final sentence of a non-opinion introduction.',
    bestFor: 'Problem-solution and non-evaluative direct questions.',
    frame: 'The main [causes/problems] are X and Y, requiring Z.',
    weak: 'This essay will discuss the problems and solutions.',
    strong: 'The shortage stems mainly from weak planning and limited investment, both of which require coordinated local and national action.',
    improvement: 'The revision provides substance instead of announcing the act of writing.',
  },
  {
    name: 'Roadmap sentence',
    tone: 'link' as const,
    purpose: 'Signals the route through two task parts when that route is not already obvious.',
    placement: 'At the end of the introduction; optional, not a fixed requirement.',
    bestFor: 'Discussion, problem-solution and direct questions.',
    frame: 'The essay first examines X before evaluating Y.',
    weak: 'I will discuss everything below.',
    strong: 'The response first considers why the trend has accelerated before evaluating its consequences for families.',
    improvement: 'The revision names both destinations and mirrors the prompt order.',
  },
  {
    name: 'Concession sentence',
    tone: 'contrast' as const,
    purpose: 'Acknowledges a valid limitation before stating the controlling judgement.',
    placement: 'Often combined with the thesis rather than added as a separate sentence.',
    bestFor: 'Qualified opinion, discussion and outweigh essays.',
    frame: 'Although X has merit / creates a risk, Y is more significant because...',
    weak: 'There are advantages and disadvantages.',
    strong: 'Although remote work may reduce informal collaboration, its gains in flexibility and access are more significant overall.',
    improvement: 'The revision evaluates the relationship between the two sides instead of merely listing them.',
  },
  {
    name: 'Two-part thesis',
    tone: 'link' as const,
    purpose: 'Maps a direct answer to each of two explicit questions.',
    placement: 'Final sentence of a direct-question introduction.',
    bestFor: 'Direct questions.',
    frame: 'X is mainly caused by A, while Y should / can / is...',
    weak: 'This essay will answer both questions.',
    strong: 'The trend is driven largely by housing costs, while its social impact is negative where community support is weak.',
    improvement: 'The revision previews an answer to each question rather than counting them.',
  },
];

export type Choice = {
  text: string;
  correct: boolean;
  feedback: string;
  issue: 'task response' | 'logic' | 'cohesion' | 'vocabulary' | 'grammar';
};

export type ChoicePracticeItem = {
  essayType: EssayTypeId;
  prompt: string;
  instruction: string;
  options: Choice[];
};

export const RECOGNITION_ITEMS: ChoicePracticeItem[] = [
  {
    essayType: 'opinion',
    prompt: 'I largely agree that the policy would reduce inequality because it removes the financial barrier faced by low-income families.',
    instruction: 'Which introduction block is this sentence performing?',
    options: [
      { text: 'Paraphrase', correct: false, issue: 'task response', feedback: 'It does not restate the topic neutrally; it answers the instruction.' },
      { text: 'Position statement', correct: true, issue: 'task response', feedback: 'Correct. “Largely agree” gives the extent and the because-clause previews a reason.' },
      { text: 'Example', correct: false, issue: 'logic', feedback: 'No specific case or evidence is being illustrated.' },
      { text: 'Roadmap', correct: false, issue: 'cohesion', feedback: 'It does not map the order of the essay; it states the controlling claim.' },
    ],
  },
  {
    essayType: 'direct-questions',
    prompt: 'Higher housing costs explain much of this delay, while the wider effect is likely to be a reduction in average family size.',
    instruction: 'Which introduction block is this sentence performing?',
    options: [
      { text: 'Two-part thesis', correct: true, issue: 'task response', feedback: 'Correct. The two clauses preview a direct answer to each question.' },
      { text: 'Concession', correct: false, issue: 'logic', feedback: 'The clauses add two answers; neither concedes an opposing point.' },
      { text: 'Paraphrase', correct: false, issue: 'task response', feedback: 'The sentence goes beyond reframing and supplies answers.' },
      { text: 'Topic sentence', correct: false, issue: 'cohesion', feedback: 'A topic sentence controls one body paragraph, not the whole two-part response.' },
    ],
  },
];

export const ALIGNMENT_ITEMS: ChoicePracticeItem[] = [
  {
    essayType: 'discussion',
    prompt: 'Some people think university should prepare students for employment. Others believe its purpose is broader intellectual development. Discuss both views and give your opinion.',
    instruction: 'Choose the thesis that aligns with every instruction.',
    options: [
      { text: 'Universities are very important institutions in modern society.', correct: false, issue: 'task response', feedback: 'This is a general statement. It neither represents the views nor gives an opinion.' },
      { text: 'This essay will discuss universities and jobs.', correct: false, issue: 'task response', feedback: 'It omits the intellectual-development view and withholds the writer\'s judgement.' },
      { text: 'Although employment preparation is essential, I believe universities should also preserve their broader role in developing independent thought.', correct: true, issue: 'task response', feedback: 'Correct. Both positions are represented and the writer resolves their relationship clearly.' },
      { text: 'Students need jobs because tuition is expensive.', correct: false, issue: 'logic', feedback: 'This may support one body idea, but it is too narrow to control the whole essay.' },
    ],
  },
  {
    essayType: 'advantages-disadvantages',
    prompt: 'More people use artificial intelligence at work. Do the advantages outweigh the disadvantages?',
    instruction: 'Choose the thesis that answers the comparison.',
    options: [
      { text: 'Artificial intelligence has advantages and disadvantages in the workplace.', correct: false, issue: 'task response', feedback: 'It lists both sides but does not decide which is more significant.' },
      { text: 'This essay discusses artificial intelligence in modern employment.', correct: false, issue: 'task response', feedback: 'It announces a topic, not an answer.' },
      { text: 'AI is changing many companies around the world.', correct: false, issue: 'task response', feedback: 'This paraphrases the trend but does not complete the thesis.' },
      { text: 'Despite risks involving accuracy and job displacement, I believe the productivity and accessibility gains are more substantial overall.', correct: true, issue: 'task response', feedback: 'Correct. It acknowledges the drawbacks and gives an explicit outweigh judgement.' },
    ],
  },
];

export const REPAIR_ITEMS: ChoicePracticeItem[] = [
  {
    essayType: 'problem-solution',
    prompt: 'Many cities face a shortage of affordable housing. What problems does this cause, and what measures can governments take?',
    instruction: 'Repair this thesis: “This essay will discuss why housing is expensive and give my opinion.”',
    options: [
      { text: 'I strongly disagree that housing should be expensive.', correct: false, issue: 'task response', feedback: 'The prompt does not ask for agreement or disagreement.' },
      { text: 'Housing shortages are a big problem nowadays.', correct: false, issue: 'vocabulary', feedback: 'This is vague and still fails to preview problems and government measures.' },
      { text: 'The shortage increases homelessness and long commutes, requiring governments to expand social housing and reform planning rules.', correct: true, issue: 'task response', feedback: 'Correct. It previews the requested problems and pairs them with plausible government measures.' },
      { text: 'There are many causes and solutions that will be discussed.', correct: false, issue: 'logic', feedback: 'The prompt asks for problems, not causes, and the sentence supplies no substantive route.' },
    ],
  },
  {
    essayType: 'opinion',
    prompt: 'Schools should replace examinations with continuous assessment. To what extent do you agree or disagree?',
    instruction: 'Repair this thesis: “Both methods have positive and negative sides.”',
    options: [
      { text: 'Examinations and assessment are used in many schools.', correct: false, issue: 'task response', feedback: 'This only restates the topic and gives no extent.' },
      { text: 'Although examinations can test performance under pressure, I largely support continuous assessment because it captures learning over time.', correct: true, issue: 'task response', feedback: 'Correct. The concession is relevant and “largely support” gives a precise extent.' },
      { text: 'This essay will discuss both forms of assessment.', correct: false, issue: 'task response', feedback: 'The task asks for a position, not only a discussion.' },
      { text: 'Continuous assessment is good for students.', correct: false, issue: 'vocabulary', feedback: 'The position is visible but the language and reasoning are too vague to guide the essay.' },
    ],
  },
];

export const ORDER_ITEM = {
  essayType: 'direct-questions' as EssayTypeId,
  prompt: 'More people are learning practical skills online. Why is this happening? Is online learning as effective as face-to-face training?',
  instruction: 'Build the introduction in a logical order.',
  blocks: [
    'The convenience and variety of digital courses largely explain this growth,',
    'Online platforms are increasingly used to acquire practical and professional skills.',
    'although I believe their effectiveness depends on whether learners receive meaningful practice and feedback.',
  ],
  correctOrder: [1, 0, 2],
  explanation: 'The paraphrase establishes the topic, the first thesis clause answers why, and the final concession answers the effectiveness question.',
};

export const MISSING_BLOCK_ITEMS: ChoicePracticeItem[] = [
  {
    essayType: 'discussion',
    prompt: 'Debate continues over whether cultural institutions should charge admission or remain free. [MISSING BLOCK]',
    instruction: 'Choose the missing thesis block.',
    options: [
      { text: 'Museums have existed for hundreds of years.', correct: false, issue: 'logic', feedback: 'This background fact does not answer either view or give a judgement.' },
      { text: 'This is a controversial issue in many countries.', correct: false, issue: 'vocabulary', feedback: 'The statement is generic and adds no direction.' },
      { text: 'People have different opinions about ticket prices.', correct: false, issue: 'task response', feedback: 'It repeats the existence of debate but does not resolve it.' },
      { text: 'While fees can support collections, I believe basic access should be free so that income does not determine participation in cultural life.', correct: true, issue: 'task response', feedback: 'Correct. It represents both views and gives a reasoned position.' },
    ],
  },
  {
    essayType: 'problem-solution',
    prompt: 'Excessive noise has become a serious problem in major cities. [MISSING BLOCK]',
    instruction: 'Choose the missing scope thesis.',
    options: [
      { text: 'Traffic and construction are the main sources, and stricter enforcement together with quieter infrastructure could reduce their impact.', correct: true, issue: 'task response', feedback: 'Correct. It previews connected causes and responses.' },
      { text: 'I strongly disagree with noise in cities.', correct: false, issue: 'task response', feedback: 'Noise is not a proposition to agree or disagree with.' },
      { text: 'There are many reasons for this modern issue.', correct: false, issue: 'vocabulary', feedback: 'The sentence is vague and gives no solution route.' },
      { text: 'This essay will talk about noise.', correct: false, issue: 'task response', feedback: 'It announces writing without answering the task.' },
    ],
  },
];
