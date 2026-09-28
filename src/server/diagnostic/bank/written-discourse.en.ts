import type { CefrLevel } from '../../../lib/diagnostic/types.ts';
import type { DiagnosticBankRecord } from '../types.ts';

export const ENGLISH_DIAGNOSTIC_WRITTEN_DISCOURSE_CANDIDATE_VERSION =
  'en-written-discourse-original-draft-1';

type WrittenDiscourseSubdomain =
  | 'organisation-sequencing'
  | 'cohesion-reference'
  | 'rhetorical-relations'
  | 'audience-register'
  | 'revision-coherence';

type SingleChoiceSeed = {
  level: CefrLevel;
  number: number;
  subdomain: Exclude<WrittenDiscourseSubdomain, 'organisation-sequencing'>;
  title: string;
  body: string;
  prompt: string;
  options: readonly [string, string, string];
  correctIndex: 0 | 1 | 2;
  rationale: string;
  distractorRationales: readonly [string, string];
};

type OrderingSeed = {
  level: CefrLevel;
  number: number;
  title: string;
  body: string;
  prompt: string;
  fragments: readonly [string, string, string, string] | readonly [string, string, string, string, string]
    | readonly [string, string, string, string, string, string];
  correctOrder: readonly number[];
  rationale: string;
};

const singleChoiceSeeds: readonly SingleChoiceSeed[] = [
  {
    level: 'A1', number: 1, subdomain: 'rhetorical-relations', title: 'A morning routine',
    body: 'I get up at 7:00. ___, at 7:15, I eat breakfast.',
    prompt: 'Choose the phrase that best completes the text.',
    options: ['After that', 'Before that', 'For example'], correctIndex: 0,
    rationale: '“After that” places breakfast after getting up and agrees with the two stated times.',
    distractorRationales: ['“Before that” contradicts the order of the times.', 'The second sentence is the next event, not an example.'],
  },
  {
    level: 'A1', number: 2, subdomain: 'rhetorical-relations', title: 'A closed shop',
    body: 'The shop was closed, ___ we went home.',
    prompt: 'Choose the word that best completes the sentence.',
    options: ['but', 'so', 'or'], correctIndex: 1,
    rationale: '“So” shows that going home was the result of finding the shop closed.',
    distractorRationales: ['“But” signals contrast rather than result.', '“Or” presents an alternative rather than a consequence.'],
  },
  {
    level: 'A1', number: 3, subdomain: 'rhetorical-relations', title: 'Two drinks',
    body: 'I like tea. ___ I do not like coffee.',
    prompt: 'Choose the word that best shows the contrast.',
    options: ['And', 'So', 'But'], correctIndex: 2,
    rationale: '“But” contrasts the speaker’s positive and negative preferences.',
    distractorRationales: ['The two preferences do not simply add matching information.', 'Liking tea does not cause the dislike of coffee.'],
  },
  {
    level: 'A1', number: 7, subdomain: 'cohesion-reference', title: 'My bedroom',
    body: 'This is my bedroom. [1] A small table is next to the bed. [2] I turn the lamp on at night. [3]',
    prompt: 'Where should this sentence go? “There is a lamp on it.”',
    options: ['Position 1', 'Position 3', 'Position 2'], correctIndex: 2,
    rationale: 'At position 2, “it” refers to the table and the lamp is introduced before “the lamp”.',
    distractorRationales: ['At position 1, “it” has no table as an antecedent.', 'At position 3, the text refers to “the lamp” before introducing it.'],
  },
  {
    level: 'A1', number: 8, subdomain: 'cohesion-reference', title: 'The bus to work',
    body: 'Sam arrives at the bus stop at eight. [1] The bus leaves at eight ten. [2] He arrives at work at eight thirty. [3]',
    prompt: 'Where should the phrase “Ten minutes later,” go?',
    options: ['Position 1', 'Position 3', 'Position 2'], correctIndex: 0,
    rationale: 'At position 1, the phrase links the eight o’clock arrival to the eight-ten departure.',
    distractorRationales: ['At position 3, there is no following event for the phrase to modify.', 'At position 2, the journey to work lasts twenty minutes, not ten.'],
  },
  {
    level: 'A1', number: 9, subdomain: 'cohesion-reference', title: 'A different lunch',
    body: 'Anna wants a cheese sandwich. [1] She opens the fridge. [2] There is no cheese. [3] She makes soup instead.',
    prompt: 'Where should the phrase “Because of this,” go?',
    options: ['Position 1', 'Position 3', 'Position 2'], correctIndex: 1,
    rationale: 'At position 3, the phrase identifies the missing cheese as the reason Anna makes soup.',
    distractorRationales: ['At position 1, no cause has been stated.', 'At position 2, the phrase would incorrectly link opening the fridge to the absence of cheese.'],
  },
  {
    level: 'A1', number: 10, subdomain: 'audience-register', title: 'A message to a teacher',
    body: 'You cannot attend class today. You are writing to your teacher, Ms Green.',
    prompt: 'Choose the clearest and most polite message.',
    options: [
      'Dear Ms Green, I am sorry, but I cannot come to class today.',
      'Hi Ms Green! I do not feel like coming to class today.',
      'Ms Green, I will not be in class today.',
    ], correctIndex: 0,
    rationale: 'The message identifies the teacher, explains the situation and uses an appropriately polite tone.',
    distractorRationales: ['This message is too casual and changes inability into unwillingness.', 'This message is abrupt and omits the apology.'],
  },
  {
    level: 'A1', number: 11, subdomain: 'audience-register', title: 'A birthday invitation',
    body: 'You are inviting your close friend Leo to your birthday party.',
    prompt: 'Choose the message that best suits the reader and purpose.',
    options: [
      'Dear Sir or Madam, would you attend my birthday celebration on Saturday?',
      'Hi Leo! Would you like to come to my birthday party on Saturday?',
      'Leo, must you attend my birthday party on Saturday?',
    ], correctIndex: 1,
    rationale: 'The message uses a friendly tone, names the event and gives a useful time detail.',
    distractorRationales: ['This wording is unnecessarily formal for a close friend.', 'This wording is a command rather than an invitation.'],
  },
  {
    level: 'A1', number: 12, subdomain: 'revision-coherence', title: 'A party message',
    body: 'The party is at my house. My house starts at six.',
    prompt: 'Choose the clearest revision.',
    options: [
      'The party is at my house, which opens at six.',
      'My house hosts the party after six.',
      'The party is at my house. It starts at six.',
    ], correctIndex: 2,
    rationale: '“It” clearly refers to the party, which is the event that starts at six.',
    distractorRationales: ['This revision says that the house opens at six, not that the party starts then.', 'This revision changes the time relationship from “at six” to “after six”.'],
  },

  {
    level: 'A2', number: 1, subdomain: 'rhetorical-relations', title: 'The way to the station',
    body: 'The road was closed. ___, we walked to the station.',
    prompt: 'Choose the phrase that best completes the text.',
    options: ['As a result', 'For example', 'Meanwhile'], correctIndex: 0,
    rationale: '“As a result” marks walking as the consequence of the road closure.',
    distractorRationales: ['Walking is not an example of the closure.', '“Meanwhile” signals simultaneous events, not cause and result.'],
  },
  {
    level: 'A2', number: 2, subdomain: 'rhetorical-relations', title: 'A picnic plan',
    body: 'We wanted to have a picnic. ___, it began to rain.',
    prompt: 'Choose the word that best completes the text.',
    options: ['In addition', 'However', 'For this reason'], correctIndex: 1,
    rationale: '“However” contrasts the intended picnic with the rain that disrupted it.',
    distractorRationales: ['The rain is not simply an additional plan.', 'The wish to have a picnic did not cause the rain.'],
  },
  {
    level: 'A2', number: 3, subdomain: 'rhetorical-relations', title: 'Rain in the forecast',
    body: 'Please take an umbrella ___ the forecast says it will rain.',
    prompt: 'Choose the word that best completes the sentence.',
    options: ['although', 'unless', 'because'], correctIndex: 2,
    rationale: '“Because” introduces the forecast as the reason for taking an umbrella.',
    distractorRationales: ['“Although” would introduce a concession.', '“Unless” would create a negative condition with the wrong meaning.'],
  },
  {
    level: 'A2', number: 7, subdomain: 'cohesion-reference', title: 'A late bus',
    body: 'Leo waited at the bus stop. [1] Twenty minutes passed. [2] He called a taxi. [3] He arrived late.',
    prompt: 'Where should this sentence go? “After those twenty minutes, the bus still had not arrived.”',
    options: ['Position 1', 'Position 3', 'Position 2'], correctIndex: 2,
    rationale: 'At position 2, “those twenty minutes” has an explicit antecedent and the absent bus explains the taxi call.',
    distractorRationales: ['At position 1, “those twenty minutes” has not been mentioned.', 'At position 3, the reason appears after the decision it explains.'],
  },
  {
    level: 'A2', number: 8, subdomain: 'cohesion-reference', title: 'Choosing a jacket',
    body: 'Nina tried on a blue jacket. [1] Then she tried on a red one. [2] For that reason, she bought the red jacket. [3]',
    prompt: 'Where should this sentence go? “It was cheaper than the blue one.”',
    options: ['Position 2', 'Position 1', 'Position 3'], correctIndex: 0,
    rationale: 'At position 2, “it” refers to the red jacket and supplies the reason announced by “For that reason”.',
    distractorRationales: ['At position 1, “it” would refer to the blue jacket.', 'At position 3, “For that reason” would appear before the price difference it refers to.'],
  },
  {
    level: 'A2', number: 9, subdomain: 'cohesion-reference', title: 'A windy room',
    body: 'The wind became stronger. [1] Papers began to blow off the desk. [2] Maya closed the window. [3]',
    prompt: 'Where should the phrase “To stop them from blowing away,” go?',
    options: ['Position 1', 'Position 2', 'Position 3'], correctIndex: 1,
    rationale: 'At position 2, “them” refers to the papers and the phrase explains why Maya closes the window.',
    distractorRationales: ['At position 1, “them” has no antecedent.', 'At position 3, the phrase has no following action to modify.'],
  },
  {
    level: 'A2', number: 10, subdomain: 'audience-register', title: 'A lost scarf',
    body: 'You are writing to the reception desk at a community centre about a scarf you lost there.',
    prompt: 'Choose the most suitable opening.',
    options: [
      'Dear Reception Team, I am writing to ask whether a blue scarf has been found.',
      'Hi there, you probably found my blue scarf somewhere in the centre already.',
      'Send me information immediately about the blue scarf I left in your centre.',
    ], correctIndex: 0,
    rationale: 'The opening identifies the purpose and object in a neutral, polite register suitable for reception staff.',
    distractorRationales: ['This opening is overly casual and assumes staff have the scarf.', 'This command is unnecessarily abrupt.'],
  },
  {
    level: 'A2', number: 11, subdomain: 'audience-register', title: 'Course information',
    body: 'You are emailing a course office to ask for the new timetable.',
    prompt: 'Choose the most suitable request.',
    options: [
      'Will you send me the new timetable today?',
      'Could you please send me the new timetable?',
      'Hey, can somebody explain what is happening with those times?',
    ], correctIndex: 1,
    rationale: 'The request is clear, concise and appropriately polite for an office email.',
    distractorRationales: ['The request is more direct and adds an unsupported same-day deadline.', 'The wording is vague and overly informal.'],
  },
  {
    level: 'A2', number: 12, subdomain: 'revision-coherence', title: 'A museum visit',
    body: '(1) Our class visited the science museum. (2) We saw robots and tried three experiments. (3) My uncle drives a blue car. (4) The visit helped us understand our science lessons.',
    prompt: 'Which of sentences 1–3 should be removed to make the paragraph coherent?',
    options: ['Sentence 1', 'Sentence 2', 'Sentence 3'], correctIndex: 2,
    rationale: 'Sentence 3 is unrelated to the class visit, while the other sentences introduce, develop and conclude that topic.',
    distractorRationales: ['Sentence 1 establishes the paragraph topic.', 'Sentence 2 gives relevant details about the visit.'],
  },

  {
    level: 'B1', number: 1, subdomain: 'rhetorical-relations', title: 'Completing a course',
    body: 'The course was demanding. ___, Priya completed every assignment on time.',
    prompt: 'Choose the word that best completes the text.',
    options: ['Nevertheless', 'Consequently', 'For example'], correctIndex: 0,
    rationale: '“Nevertheless” marks the contrast between the difficulty of the course and Priya’s success.',
    distractorRationales: ['Completion is not presented as a consequence of the difficulty.', 'The second sentence is a contrasting outcome, not an example.'],
  },
  {
    level: 'B1', number: 2, subdomain: 'rhetorical-relations', title: 'A delayed meeting',
    body: 'Several morning trains were cancelled. ___, the meeting started forty minutes late.',
    prompt: 'Choose the phrase that best completes the text.',
    options: ['In contrast', 'As a result', 'In other words'], correctIndex: 1,
    rationale: '“As a result” identifies the cancellations as the cause of the late start.',
    distractorRationales: ['The statements do not contrast.', 'The second statement is a consequence, not a restatement.'],
  },
  {
    level: 'B1', number: 3, subdomain: 'rhetorical-relations', title: 'Ways of working',
    body: 'Jon enjoys working alone, ___ his colleague prefers team projects.',
    prompt: 'Choose the word that best completes the sentence.',
    options: ['unless', 'because', 'whereas'], correctIndex: 2,
    rationale: '“Whereas” directly contrasts the two people’s working preferences.',
    distractorRationales: ['No condition is expressed.', 'One preference does not cause the other.'],
  },
  {
    level: 'B1', number: 7, subdomain: 'cohesion-reference', title: 'A library website',
    body: 'The library replaced its paper booking list with a new website. [1] This benefit means that members can reserve books from home. [2] Staff still help visitors who do not use the internet. [3]',
    prompt: 'Where should this sentence go? “The website introduced online reservations with an important benefit.”',
    options: ['Position 2', 'Position 3', 'Position 1'], correctIndex: 2,
    rationale: 'At position 1, online reservation and its benefit are introduced before “This benefit” explains them.',
    distractorRationales: ['At position 2, “This benefit” appears before the benefit is introduced.', 'At position 3, the online option would be introduced after both its benefit and the contrast with offline support.'],
  },
  {
    level: 'B1', number: 8, subdomain: 'cohesion-reference', title: 'Moving a concert',
    body: 'The forecast predicted heavy rain. [1] The organisers therefore moved the concert there. [2] The hall seats two hundred people. [3]',
    prompt: 'Where should this sentence go? “Fortunately, the school hall was available.”',
    options: ['Position 1', 'Position 3', 'Position 2'], correctIndex: 0,
    rationale: 'At position 1, the available hall provides the antecedent for both “there” and “The hall”.',
    distractorRationales: ['At position 3, both “there” and “The hall” lack an introduced venue.', 'At position 2, “there” appears before the school hall is identified.'],
  },
  {
    level: 'B1', number: 9, subdomain: 'revision-coherence', title: 'A traffic prediction',
    body: 'Officials said traffic would fall after the bridge opened. [1] Six months later, traffic remained unchanged. [2] That doubt prompted residents to ask the council to publish the data. [3]',
    prompt: 'Where should this sentence go? “This prediction was therefore questioned.”',
    options: ['Position 1', 'Position 2', 'Position 3'], correctIndex: 1,
    rationale: 'At position 2, “This prediction” follows the contrary evidence and supplies the antecedent for “That doubt”.',
    distractorRationales: ['At position 1, no contrary evidence has yet been given.', 'At position 3, “That doubt” would appear before the text establishes that the prediction was questioned.'],
  },
  {
    level: 'B1', number: 10, subdomain: 'audience-register', title: 'A hotel complaint',
    body: 'You are writing to a hotel manager because your room was not cleaned during a two-night stay.',
    prompt: 'Choose the most suitable opening for the complaint.',
    options: [
      'I am writing to report that my room was not cleaned during my stay.',
      'Your hotel was disgusting, and you need to fix everything.',
      'Hey, nobody bothered with my room for two whole nights.',
    ], correctIndex: 0,
    rationale: 'The opening states the problem precisely in a firm but professional register.',
    distractorRationales: ['This wording is overgeneralised and confrontational.', 'This wording is too informal and emotionally loaded for the manager.'],
  },
  {
    level: 'B1', number: 11, subdomain: 'audience-register', title: 'A class discussion',
    body: 'You disagree with a classmate’s suggestion during an online course discussion.',
    prompt: 'Choose the most constructive response.',
    options: [
      'That idea makes no sense because the costs would make it difficult to use.',
      'I see your point, but I think the cost could make the plan difficult.',
      'Your suggestion is hereby rejected because its financial implications are unacceptable.',
    ], correctIndex: 1,
    rationale: 'The response acknowledges the classmate’s view and states a specific concern in an appropriate peer register.',
    distractorRationales: ['This response gives a reason but dismisses the classmate’s idea rather than engaging with it constructively.', 'This response adopts an inappropriately official and authoritative tone.'],
  },
  {
    level: 'B1', number: 12, subdomain: 'revision-coherence', title: 'A student survey',
    body: 'Twenty students answered a voluntary survey. Fourteen said they preferred studying in the morning.',
    prompt: 'Choose the conclusion that best matches the evidence.',
    options: [
      'The results suggest that students generally learn better in morning classes.',
      'The school should consider moving its most difficult classes to mornings.',
      'Most respondents to this small survey preferred morning study.',
    ], correctIndex: 2,
    rationale: 'The conclusion keeps the claim within the survey’s small, voluntary sample.',
    distractorRationales: ['This conclusion generalises beyond the respondents and changes preference into learning effectiveness.', 'This recommendation is much stronger than the evidence supports.'],
  },

  {
    level: 'B2', number: 1, subdomain: 'rhetorical-relations', title: 'A small study',
    body: 'The study used a small sample. ___, the pattern is consistent enough to justify further research.',
    prompt: 'Choose the phrase that best completes the text.',
    options: ['Even so', 'For instance', 'As a consequence'], correctIndex: 0,
    rationale: '“Even so” concedes the limitation while allowing a cautious positive conclusion.',
    distractorRationales: ['The second sentence is not an example of the sample size.', 'The pattern is not presented as caused by the small sample.'],
  },
  {
    level: 'B2', number: 2, subdomain: 'rhetorical-relations', title: 'Changes in costs',
    body: 'The new system reduced office costs. ___, travel expenses increased during the same period.',
    prompt: 'Choose the phrase that best completes the text.',
    options: ['Similarly', 'By contrast', 'Therefore'], correctIndex: 1,
    rationale: '“By contrast” highlights the opposite movement in the two categories of cost.',
    distractorRationales: ['The two costs moved in different, not similar, directions.', 'The text does not establish that lower office costs caused higher travel costs.'],
  },
  {
    level: 'B2', number: 3, subdomain: 'rhetorical-relations', title: 'An extended deadline',
    body: 'The deadline can be extended ___ each team submits a revised plan by Friday.',
    prompt: 'Choose the phrase that best completes the sentence.',
    options: ['although', 'unless', 'provided that'], correctIndex: 2,
    rationale: '“Provided that” makes submission of a revised plan the condition for an extension.',
    distractorRationales: ['The clause expresses a condition rather than a concession.', '“Unless” would reverse the intended condition.'],
  },
  {
    level: 'B2', number: 7, subdomain: 'cohesion-reference', title: 'Comparing two teams',
    body: 'The report claims that remote work increased productivity because one remote team completed more projects than one office team. [1] First, the remote team was highly experienced; second, the office team had just been formed. [2] A broader comparison is therefore needed. [3]',
    prompt: 'Where should this sentence go? “That comparison is misleading for two reasons.”',
    options: ['Position 2', 'Position 3', 'Position 1'], correctIndex: 2,
    rationale: 'At position 1, “That comparison” refers to the two teams just compared and introduces the numbered reasons that follow.',
    distractorRationales: ['At position 2, “First” and “second” appear before the text announces two reasons.', 'At position 3, the sentence reopens the criticism after the recommendation for broader evidence.'],
  },
  {
    level: 'B2', number: 8, subdomain: 'cohesion-reference', title: 'A changed measure',
    body: 'The agency reported a sharp fall in waiting times. [1] Halfway through the year, however, it began measuring from a later point in the process. [2] This explanation also means that the figures cannot be compared directly with the previous year. [3]',
    prompt: 'Where should this sentence go? “The apparent improvement therefore partly reflects a change in measurement.”',
    options: ['Position 2', 'Position 1', 'Position 3'], correctIndex: 0,
    rationale: 'At position 2, “therefore” draws the consequence of the changed measure and supplies the antecedent for “This explanation”.',
    distractorRationales: ['At position 1, the change in measurement has not yet been introduced.', 'At position 3, “This explanation” appears before the explanation it refers to.'],
  },
  {
    level: 'B2', number: 9, subdomain: 'revision-coherence', title: 'Limits of a survey',
    body: 'The survey was conducted only once, so it cannot show whether opinions changed over time. [1] Specifically, the respondents had volunteered to participate. [2] The findings should therefore be treated as suggestive rather than representative. [3]',
    prompt: 'Where should this sentence go? “A further limitation concerns who answered the survey.”',
    options: ['Position 3', 'Position 1', 'Position 2'], correctIndex: 1,
    rationale: 'At position 1, the sentence announces the second limitation before “Specifically” explains the volunteer sample.',
    distractorRationales: ['At position 3, it opens a new limitation after the paragraph’s conclusion.', 'At position 2, “Specifically” appears before the limitation it is meant to explain.'],
  },
  {
    level: 'B2', number: 10, subdomain: 'audience-register', title: 'A formal evaluation',
    body: 'You are evaluating a community project for the organisation that funded it.',
    prompt: 'Choose the most appropriate sentence for the report.',
    options: [
      'The project met its participation target, although its long-term impact remains uncertain.',
      'The project was amazing, and everyone clearly loved every part of it.',
      'Honestly, the organisers did a pretty decent job overall.',
    ], correctIndex: 0,
    rationale: 'The sentence is precise, measured and appropriately qualified for a formal evaluation.',
    distractorRationales: ['This sentence is promotional and makes an unsupported universal claim.', 'This sentence is conversational and too vague for an evaluation report.'],
  },
  {
    level: 'B2', number: 11, subdomain: 'audience-register', title: 'A letter to the council',
    body: 'You are asking the local council to reconsider the removal of a bus stop.',
    prompt: 'Choose the most effective sentence for the letter.',
    options: [
      'Putting the stop back is obviously the only sensible thing to do.',
      'I would ask the council to reconsider the decision in light of its effect on older residents.',
      'You people removed our stop, and we want it back right now.',
    ], correctIndex: 1,
    rationale: 'The sentence makes a clear request and gives a relevant reason in a respectful public-facing register.',
    distractorRationales: ['This wording overstates the case and dismisses alternatives.', 'This wording is accusatory and unnecessarily confrontational.'],
  },
  {
    level: 'B2', number: 12, subdomain: 'revision-coherence', title: 'Interpreting an association',
    body: 'Employees who used the optional training platform were promoted more often than employees who did not use it. Participation was voluntary.',
    prompt: 'Choose the most defensible conclusion.',
    options: [
      'The platform probably caused higher promotion rates among most participants.',
      'Promotion rates appear unrelated to voluntary platform use once participation is considered.',
      'Platform use was associated with promotion, but the comparison does not establish causation.',
    ], correctIndex: 2,
    rationale: 'The conclusion reports the association while respecting the self-selection limitation.',
    distractorRationales: ['This conclusion makes an unsupported causal claim despite voluntary participation.', 'This conclusion denies the observed association instead of qualifying it.'],
  },

  {
    level: 'C1', number: 1, subdomain: 'rhetorical-relations', title: 'An expensive intervention',
    body: 'The intervention required substantial initial investment. ___, its benefits persisted after the funding period ended.',
    prompt: 'Choose the word that best completes the text.',
    options: ['Nonetheless', 'Specifically', 'Consequently'], correctIndex: 0,
    rationale: '“Nonetheless” concedes the cost while contrasting it with the lasting benefit.',
    distractorRationales: ['The second statement does not specify the amount invested.', 'Persistence is not presented as a consequence of the high cost.'],
  },
  {
    level: 'C1', number: 2, subdomain: 'rhetorical-relations', title: 'Two demand models',
    body: 'The first model assumes that demand remains stable. ___, the second allows for seasonal variation.',
    prompt: 'Choose the phrase that best completes the text.',
    options: ['Accordingly', 'By contrast', 'For instance'], correctIndex: 1,
    rationale: '“By contrast” marks the opposing assumptions of the two models.',
    distractorRationales: ['The second assumption is not a consequence of the first.', 'The second model is an alternative, not an example of the first.'],
  },
  {
    level: 'C1', number: 3, subdomain: 'rhetorical-relations', title: 'Access to a service',
    body: 'The policy may improve access, ___ users without reliable internet are offered an equivalent offline route.',
    prompt: 'Choose the phrase that best completes the sentence.',
    options: ['even though', 'as a result', 'provided that'], correctIndex: 2,
    rationale: '“Provided that” states the condition under which the claim about improved access is defensible.',
    distractorRationales: ['The offline route is a condition, not a concession.', 'The policy’s success does not cause the offline route in this sentence.'],
  },
  {
    level: 'C1', number: 7, subdomain: 'cohesion-reference', title: 'Two barriers',
    body: 'Some residents cannot reach the service, while others can reach it but do not trust it. [1] Transport support may address the first barrier. [2] Transparent complaint procedures may address the second. [3]',
    prompt: 'Where should this sentence go? “This distinction matters because the following remedies address different problems.”',
    options: ['Position 2', 'Position 3', 'Position 1'], correctIndex: 2,
    rationale: 'At position 1, “This distinction” refers to the two barriers and “the following remedies” previews both responses.',
    distractorRationales: ['At position 2, one of the two remedies no longer follows the preview.', 'At position 3, no remedies follow the forward reference.'],
  },
  {
    level: 'C1', number: 8, subdomain: 'cohesion-reference', title: 'A revised causal claim',
    body: 'An early report claimed that the policy caused the decline. [1] Later analysis showed that the trend had begun before the policy. The authors therefore revised their conclusion: the policy may have accelerated an existing decline. [2] The comparison region also changed its reporting method during the study. [3]',
    prompt: 'Where should this sentence go? “Even this more modest claim requires qualification for another reason.”',
    options: ['Position 2', 'Position 1', 'Position 3'], correctIndex: 0,
    rationale: 'At position 2, “this more modest claim” refers to the revised conclusion and “another reason” introduces the comparison-region problem.',
    distractorRationales: ['At position 1, the revised, more modest claim has not yet appeared.', 'At position 3, “another reason” points forward after that reason has already been given.'],
  },
  {
    level: 'C1', number: 9, subdomain: 'revision-coherence', title: 'Evidence for a decision',
    body: 'A regulator needs evidence of effects across many cases. [1] An individual applicant needs evidence that could help challenge one decision. [2] This dependence on purpose means that a useful explanation must be designed for its recipient’s task. [3]',
    prompt: 'Where should this sentence go? “What counts as useful evidence, then, depends partly on the decision the evidence is meant to support.”',
    options: ['Position 3', 'Position 2', 'Position 1'], correctIndex: 1,
    rationale: 'At position 2, the sentence synthesises both recipients’ needs and supplies the antecedent for “This dependence on purpose”.',
    distractorRationales: ['At position 3, “This dependence on purpose” appears before the claim it refers to.', 'At position 1, only one of the contrasting decisions has been introduced.'],
  },
  {
    level: 'C1', number: 10, subdomain: 'audience-register', title: 'Peer-review feedback',
    body: 'You are reviewing a research article whose evidence does not fully support one conclusion.',
    prompt: 'Choose the most appropriate reviewer comment.',
    options: [
      'The conclusion is potentially valuable, but its present wording extends beyond the evidence reported.',
      'The authors have ignored their own data, which undermines the credibility of the article.',
      'The conclusion should be removed because it does not correspond to my interpretation of the evidence.',
    ], correctIndex: 0,
    rationale: 'The comment identifies the evidential problem precisely while maintaining a constructive scholarly register.',
    distractorRationales: ['This comment attacks the authors rather than evaluating the claim.', 'This comment offers personal preference instead of an evidence-based reason.'],
  },
  {
    level: 'C1', number: 11, subdomain: 'audience-register', title: 'A policy briefing',
    body: 'You are summarising uncertain pilot results for senior decision-makers.',
    prompt: 'Choose the most suitable recommendation.',
    options: [
      'The pilot establishes a strong case for immediate implementation across all settings.',
      'The initial results justify a limited extension, accompanied by monitoring of the unresolved risks.',
      'The encouraging results support continuing the policy, although the next steps remain unspecified.',
    ], correctIndex: 1,
    rationale: 'The recommendation is concise, proportionate to uncertainty and gives decision-makers a concrete safeguard.',
    distractorRationales: ['This recommendation overstates the evidence and ignores contextual variation.', 'This recommendation remains too vague to guide a decision or manage the unresolved risks.'],
  },
  {
    level: 'C1', number: 12, subdomain: 'revision-coherence', title: 'Reporting observational evidence',
    body: 'The study found that neighbourhoods with more trees had lower summer temperatures. The study did not assign tree cover experimentally.',
    prompt: 'Choose the revision that best preserves the scope of the evidence.',
    options: [
      'The study proves that planting any tree will reduce temperature in every neighbourhood.',
      'Trees had no possible relationship to temperature because the study was observational.',
      'Greater tree cover was associated with lower temperatures, although other neighbourhood differences may contribute.',
    ], correctIndex: 2,
    rationale: 'The revision reports the observed relationship while acknowledging the limits of causal inference.',
    distractorRationales: ['This revision turns an association into a universal causal law.', 'This revision incorrectly treats lack of experimental assignment as evidence of no relationship.'],
  },

  {
    level: 'C2', number: 1, subdomain: 'rhetorical-relations', title: 'An imperfect framework',
    body: 'The framework is internally inconsistent. ___, its categories have proved useful for exposing assumptions that earlier accounts left implicit.',
    prompt: 'Choose the phrase that best completes the text.',
    options: ['That inconsistency notwithstanding', 'Along broadly similar lines', 'As a necessary implication'], correctIndex: 0,
    rationale: '“That inconsistency notwithstanding” concedes the criticism before asserting a benefit that survives it.',
    distractorRationales: ['The benefit does not continue the same line of criticism.', 'The usefulness is not a logical implication of inconsistency.'],
  },
  {
    level: 'C2', number: 2, subdomain: 'rhetorical-relations', title: 'The value of a model',
    body: 'The model is useful ___ it reveals how strongly the conclusion depends on disputed assumptions; beyond that limited role, it should not be treated as a prediction.',
    prompt: 'Choose the phrase that best completes the sentence.',
    options: ['even in cases where', 'only insofar as', 'regardless of whether'], correctIndex: 1,
    rationale: '“Only insofar as” limits the model’s usefulness to the specific function that follows.',
    distractorRationales: ['“Even in cases where” would concede rather than define the extent of usefulness.', '“Regardless of whether” would detach usefulness from the stated function.'],
  },
  {
    level: 'C2', number: 3, subdomain: 'rhetorical-relations', title: 'Levels of explanation',
    body: 'The account is persuasive at the level of institutional incentives; ___, it says little about individual motives.',
    prompt: 'Choose the word that best completes the sentence.',
    options: ['accordingly', 'equivalently', 'nevertheless'], correctIndex: 2,
    rationale: '“Nevertheless” concedes the account’s institutional strength before identifying a limitation at another level.',
    distractorRationales: ['The weakness is not a consequence of the institutional explanation.', 'The two claims are not equivalent restatements.'],
  },
  {
    level: 'C2', number: 7, subdomain: 'cohesion-reference', title: 'The purpose of classification',
    body: 'Critics argue that the proposed categories cannot make every case directly comparable. [1] That is not the case: the scheme is also intended to reveal where cases resist comparison and why. [2] Its value must therefore be judged against both purposes. [3]',
    prompt: 'Where should this sentence go? “The objection would be decisive only if comparability were the scheme’s sole purpose.”',
    options: ['Position 2', 'Position 3', 'Position 1'], correctIndex: 2,
    rationale: 'At position 1, “The objection” refers to the critics’ claim, and “That is not the case” then rejects the sole-purpose condition.',
    distractorRationales: ['At position 2, “That is not the case” would deny the critics’ observation rather than the sole-purpose assumption.', 'At position 3, “both purposes” would appear before the text established the conditional contrast between them.'],
  },
  {
    level: 'C2', number: 8, subdomain: 'cohesion-reference', title: 'Silence in an archive',
    body: 'The minutes record the options that reached a formal vote but say nothing about proposals filtered out beforehand. [1] One mechanism that produces it is informal filtering: staff learn which suggestions are considered realistic and may stop voicing the rest. [2] Absence from the record cannot therefore be read as absence of disagreement. [3]',
    prompt: 'Where should this sentence go? “That silence is institutionally produced through the mechanism described next.”',
    options: ['Position 1', 'Position 3', 'Position 2'], correctIndex: 0,
    rationale: 'At position 1, “That silence” names the omission, supplies the antecedent for “it” and previews the mechanism that follows.',
    distractorRationales: ['At position 3, no mechanism follows the forward reference.', 'At position 2, the mechanism appears before the sentence that announces it.'],
  },
  {
    level: 'C2', number: 9, subdomain: 'revision-coherence', title: 'An apparent symmetry',
    body: 'One position would permit every proposed use, while the other would prohibit every one. [1] This difference in who bears the risk is central to evaluating the alternatives. [2] Evaluation must therefore examine the distribution and reversibility of both risks. [3]',
    prompt: 'Where should this sentence go? “The symmetry, however, is only apparent: permission transfers risk to affected communities, whereas prohibition transfers it to those denied potential benefits.”',
    options: ['Position 3', 'Position 1', 'Position 2'], correctIndex: 1,
    rationale: 'At position 1, the sentence challenges the surface symmetry and supplies the two risk-bearers referenced by “This difference”.',
    distractorRationales: ['At position 3, it reopens the analysis after the evaluative conclusion.', 'At position 2, “This difference in who bears the risk” appears before the two risk-bearers are identified.'],
  },
  {
    level: 'C2', number: 10, subdomain: 'audience-register', title: 'An expert dissent',
    body: 'You are writing a public expert report and disagree with the majority interpretation while recognising its basis.',
    prompt: 'Choose the most appropriate formulation.',
    options: [
      'Although the majority interpretation is consistent with the aggregate trend, it does not account for the subgroup evidence discussed below.',
      'The majority interpretation follows the aggregate trend, but insufficient attention has been paid to the subgroup evidence.',
      'Although the majority interpretation warrants consideration, the subgroup evidence demonstrates that it must be rejected.',
    ], correctIndex: 0,
    rationale: 'The sentence represents the majority fairly, identifies a specific limitation and signals where supporting analysis follows.',
    distractorRationales: ['This wording makes an impersonal allegation without locating the precise conflict in the interpretation.', 'This wording acknowledges the majority superficially but overstates what the subgroup evidence establishes.'],
  },
  {
    level: 'C2', number: 11, subdomain: 'audience-register', title: 'An executive recommendation',
    body: 'A board needs a recommendation after evidence has revealed both benefits and serious unresolved distributional risks.',
    prompt: 'Choose the most effective recommendation for the board.',
    options: [
      'The programme has benefits, which means the remaining concerns should no longer delay implementation.',
      'Proceed with the reversible components, but defer irreversible commitments until the distributional risks can be tested.',
      'There are arguments on both sides, so no recommendation can reasonably be made.',
    ], correctIndex: 1,
    rationale: 'The recommendation distinguishes reversible from irreversible action and converts uncertainty into a usable decision rule.',
    distractorRationales: ['This recommendation treats benefits as if they cancelled unresolved risks.', 'This response avoids the requested decision despite available grounds for a conditional course.'],
  },
  {
    level: 'C2', number: 12, subdomain: 'revision-coherence', title: 'The scope of a negative claim',
    body: 'The evidence challenges one mechanism proposed for the observed effect. It does not test the other mechanisms discussed in the review.',
    prompt: 'Choose the conclusion with the most accurate scope.',
    options: [
      'The evidence shows that none of the proposed mechanisms can explain the effect.',
      'Because one mechanism is weakened, the effect itself did not occur.',
      'The evidence weakens one explanation without resolving whether the alternatives account for the effect.',
    ], correctIndex: 2,
    rationale: 'The conclusion limits the negative finding to the tested mechanism and leaves untested alternatives open.',
    distractorRationales: ['This conclusion generalises from one tested mechanism to all mechanisms.', 'This conclusion confuses an explanation of an effect with evidence that the effect occurred.'],
  },
];

const orderingSeeds: readonly OrderingSeed[] = [
  {
    level: 'A1', number: 4, title: 'Making a sandwich', body: 'Four steps describe how to make a sandwich.',
    prompt: 'Order the fragments to form a clear set of steps.',
    fragments: [
      'Then I put cheese on the bread.',
      'First, I take two slices of bread.',
      'Finally, I eat it.',
      'Next, I close the sandwich.',
    ], correctOrder: [1, 0, 3, 2],
    rationale: 'The explicit sequence markers order the actions, and “it” refers to the completed sandwich.',
  },
  {
    level: 'A1', number: 5, title: 'Going to school', body: 'Four fragments describe a student’s journey to school.',
    prompt: 'Order the fragments to form a clear sequence.',
    fragments: [
      'At eight o’clock, I arrive at school.',
      'Then I leave home.',
      'I take the bus.',
      'First, I pack my school bag.',
    ], correctOrder: [3, 1, 2, 0],
    rationale: 'Packing precedes leaving, the bus carries the student, and arrival completes the journey.',
  },
  {
    level: 'A1', number: 6, title: 'Meeting at a café', body: 'Four fragments form a short message to a friend.',
    prompt: 'Order the fragments to form a clear message.',
    fragments: [
      'See you there!',
      'Let’s meet at the Green Café',
      'It is next to the bank.',
      'at three o’clock on Saturday.',
    ], correctOrder: [1, 3, 2, 0],
    rationale: 'The time completes the invitation, “It” refers to the café, and the farewell comes last.',
  },
  {
    level: 'A2', number: 4, title: 'A missing bag', body: 'Four fragments form an email to a reception desk.',
    prompt: 'Order the fragments to form a clear email.',
    fragments: [
      'It is black and has my name inside.',
      'Dear Reception Team,',
      'Could you tell me if it has been found?',
      'I think I left my bag in Room 4 yesterday.',
    ], correctOrder: [1, 3, 0, 2],
    rationale: 'The greeting precedes the purpose, “It” refers to the identified bag, and the request closes the message.',
  },
  {
    level: 'A2', number: 5, title: 'Meeting an old friend', body: 'Four fragments tell a short story.',
    prompt: 'Order the fragments to form a clear story.',
    fragments: [
      'Afterwards, Eva went home.',
      'There she saw an old school friend.',
      'They had coffee together.',
      'Last Saturday, Eva went to the market.',
    ], correctOrder: [3, 1, 2, 0],
    rationale: '“There” refers to the market, “They” refers to Eva and her friend, and “Afterwards” closes the sequence.',
  },
  {
    level: 'A2', number: 6, title: 'Sports day', body: 'Four fragments form a school announcement.',
    prompt: 'Order the fragments to form a clear announcement.',
    fragments: [
      'Students should arrive by nine o’clock.',
      'The sports day will take place on 12 June.',
      'Activities will begin at nine thirty.',
      'First, they must register at the main gate.',
    ], correctOrder: [1, 0, 3, 2],
    rationale: 'The event is introduced before arrival instructions, registration follows arrival, and activities begin last.',
  },
  {
    level: 'B1', number: 4, title: 'A flooded road', body: 'Five fragments describe a group’s delayed journey.',
    prompt: 'Order the fragments to form a coherent account.',
    fragments: [
      'The driver therefore turned the bus around.',
      'Soon after they left, they found that the main road was flooded.',
      'The group set out for the visitor centre at seven.',
      'As a result, they arrived forty minutes late.',
      'They called ahead to tell their guide about the delay.',
    ], correctOrder: [2, 1, 0, 4, 3],
    rationale: 'The departure establishes the journey, the flooded road causes the turn, the group calls ahead about the resulting delay, and the late arrival completes the account.',
  },
  {
    level: 'B1', number: 5, title: 'A community garden', body: 'Five fragments explain how a community garden developed.',
    prompt: 'Order the fragments to form a coherent paragraph.',
    fragments: [
      'The garden opened to the neighbourhood three months later.',
      'The council offered them an unused piece of land.',
      'Once the ground was ready, they planted vegetables and flowers.',
      'Residents first asked the council for somewhere to grow food.',
      'Volunteers then cleared rubbish from the site.',
    ], correctOrder: [3, 1, 4, 2, 0],
    rationale: 'The request leads to the site, “the site” enables clearing, prepared ground enables planting, and opening completes the process.',
  },
  {
    level: 'B1', number: 6, title: 'Reviewing a bus service', body: 'Five fragments summarise a small service review.',
    prompt: 'Order the fragments to form a coherent summary.',
    fragments: [
      'The two sources pointed to unreliable departure times as the main problem.',
      'The team wanted to learn why fewer people were using the evening buses.',
      'The final report recommended a revised timetable and better delay information.',
      'First, it sent a questionnaire to recent passengers.',
      'It then interviewed residents who had stopped using the service.',
    ], correctOrder: [1, 3, 4, 0, 2],
    rationale: 'The aim precedes the two methods, “the two sources” refers to them, and the report follows the resulting finding.',
  },
  {
    level: 'B2', number: 4, title: 'Evaluating cycle lanes', body: 'Five fragments present an evaluation and its conclusion.',
    prompt: 'Order the fragments to form a coherent paragraph.',
    fragments: [
      'The results therefore support expansion, although not the original estimate of its effect.',
      'However, the counts were taken in warmer months than the previous survey.',
      'Initial counts showed that bicycle use increased on all three.',
      'After adjusting for seasonal differences, the increase remained but was smaller.',
      'The city introduced protected cycle lanes on three busy roads.',
    ], correctOrder: [4, 2, 1, 3, 0],
    rationale: 'The intervention precedes its apparent result, the seasonal caveat qualifies that result, adjustment answers the caveat, and the conclusion reflects both.',
  },
  {
    level: 'B2', number: 5, title: 'A flexible-hours proposal', body: 'Five fragments develop a qualified recommendation.',
    prompt: 'Order the fragments to form a coherent argument.',
    fragments: [
      'Shared contact hours would reduce that risk without removing flexibility.',
      'A six-month trial with fixed contact hours is therefore preferable to an immediate permanent change.',
      'Flexible starting times could make the organisation more accessible to carers.',
      'The policy could, however, make team coordination more difficult.',
      'They may also reduce pressure on public transport at peak times.',
    ], correctOrder: [2, 4, 3, 0, 1],
    rationale: 'Two benefits establish the case, a risk qualifies it, a safeguard answers the risk, and the recommendation combines those considerations.',
  },
  {
    level: 'B2', number: 6, title: 'Responding to a data error', body: 'Five fragments describe an organisation’s response to an error.',
    prompt: 'Order the fragments to form a coherent account.',
    fragments: [
      'Finally, the data-import process was changed to prevent a recurrence.',
      'It then issued a corrected report with an explanation of the error.',
      'She immediately informed the project manager.',
      'An analyst noticed that one month of sales had been counted twice.',
      'The team checked the remaining months for the same problem.',
    ], correctOrder: [3, 2, 4, 1, 0],
    rationale: 'Detection leads to notification, checking establishes the scope, correction follows verification, and prevention closes the response.',
  },
  {
    level: 'C1', number: 4, title: 'A remote-attendance proposal', body: 'Five fragments develop a conditional policy argument.',
    prompt: 'Order the fragments to form a coherent argument.',
    fragments: [
      'Even when those support costs are covered, some participants lack a private place from which to join.',
      'The evidence therefore supports a remote option with technical support, not a complete replacement for in-person access.',
      'The apparent saving is smaller when technical support and accessibility adaptations are included.',
      'The proposal assumes that remote attendance will reduce the cost of participation.',
      'Evidence from the pilot supports that assumption for people who already have reliable equipment.',
    ], correctOrder: [3, 4, 2, 0, 1],
    rationale: 'The assumption is tested, qualified first by hidden costs and then by access, and the conclusion preserves an option while rejecting full replacement.',
  },
  {
    level: 'C1', number: 5, title: 'Testing a training programme', body: 'Five fragments summarise a study from question to conclusion.',
    prompt: 'Order the fragments to form a coherent research summary.',
    fragments: [
      'Because there was no untrained comparison group, wider changes in the workplace cannot be excluded.',
      'Accuracy improved, particularly when cases contained conflicting evidence.',
      'The study asked whether the training improved staff responses to complex cases.',
      'The findings justify a controlled trial rather than a firm claim that the training caused the improvement.',
      'Researchers compared decisions made before and after training and used unseen case files.',
    ], correctOrder: [2, 4, 1, 0, 3],
    rationale: 'The question precedes method and result, the design limitation qualifies the result, and the conclusion is proportionate to that limitation.',
  },
  {
    level: 'C1', number: 6, title: 'Reviewing a stage production', body: 'Five fragments form a short critical review.',
    prompt: 'Order the fragments to form a coherent review.',
    fragments: [
      'The result is an imaginative production weakened by an unnecessary lack of trust in its audience.',
      'The final act, however, explains this metaphor in dialogue that the staging has already made clear.',
      'The production opens with the actors moving silently around an empty table.',
      'As the table repeatedly becomes a workplace, border and family home, its flexibility becomes the production’s main strength.',
      'At first, the image seems too slight to sustain the two-hour performance.',
    ], correctOrder: [2, 4, 3, 1, 0],
    rationale: 'The opening image prompts an initial doubt, its later uses revise that judgment, the final-act limitation qualifies the praise, and the last sentence synthesises both.',
  },
  {
    level: 'C2', number: 4, title: 'Administrative categories', body: 'Six fragments examine a defence of fixed categories.',
    prompt: 'Order the fragments to form a coherent argument.',
    fragments: [
      'The necessity of simplification does not, however, determine which simplifications should be adopted or how their effects should be monitored.',
      'Categories are therefore better treated as revisable instruments than as passive descriptions.',
      'Defenders might reply that any workable system must simplify complex cases.',
      'Yet a category also determines which differences become visible to the institution in the first place.',
      'Fixed administrative categories are often defended as neutral containers for pre-existing facts.',
      'That defence is attractive because it separates classification from the unequal outcomes associated with it.',
    ], correctOrder: [4, 5, 3, 2, 0, 1],
    rationale: 'The defence is introduced and explained, then challenged; a counterargument is acknowledged, answered, and converted into a qualified conclusion.',
  },
  {
    level: 'C2', number: 5, title: 'Absence from an archive', body: 'Six fragments develop an interpretation of archival silence.',
    prompt: 'Order the fragments to form a coherent analysis.',
    fragments: [
      'The archive is evidence not simply of what was believed, but of which beliefs the institution made recordable.',
      'At first sight, the absence of objections from those minutes appears to support the official account.',
      'The official archive presents the reform as the outcome of a broad consensus.',
      'Silence in the final record therefore reflects the selection process as well as participants’ views.',
      'Earlier correspondence shows, however, that several objections were filtered out before the committee met.',
      'Its minutes nevertheless record only proposals that reached the final committee.',
    ], correctOrder: [2, 5, 1, 4, 3, 0],
    rationale: 'The official account is linked to the minutes, their apparent support is overturned by earlier evidence, and the final two sentences derive the broader archival implication.',
  },
  {
    level: 'C2', number: 6, title: 'Reviewing a theoretical account', body: 'Six fragments form a balanced critical assessment.',
    prompt: 'Order the fragments to form a coherent review.',
    fragments: [
      'That response risks making the central claim impossible to disconfirm, since compliance and resistance would support it equally.',
      'Even with this limitation, the book offers a valuable vocabulary for examining how judgment becomes habitual.',
      'Its comparative chapters make that claim persuasive across otherwise dissimilar settings.',
      'The book argues that institutional routines, rather than explicit rules, organise most professional judgment.',
      'The author anticipates this objection by treating resistance as evidence that a routine exists.',
      'The analysis is less convincing when individuals deliberately resist the routines it describes.',
    ], correctOrder: [3, 2, 5, 4, 0, 1],
    rationale: 'The thesis precedes supporting evidence and a limitation; the author’s reply is presented, then criticised, before a final qualified evaluation.',
  },
];

function recordId(level: CefrLevel, number: number): string {
  return `en-${level.toLowerCase()}-written-discourse-${String(number).padStart(2, '0')}`;
}

const singleChoiceRecords = singleChoiceSeeds.map((seed): DiagnosticBankRecord => {
  const id = recordId(seed.level, seed.number);
  const optionIds = seed.options.map((_, index) => `${id}-o${index + 1}`);
  const distractorIndexes = [0, 1, 2].filter(index => index !== seed.correctIndex);
  return {
    publicItem: {
      id,
      contentVersion: 'draft-1',
      language: 'en',
      skill: 'written-discourse',
      subdomain: seed.subdomain,
      levelCandidate: seed.level,
      prompt: seed.prompt,
      stimulus: { kind: 'text', stimulusId: `${id}-stimulus`, title: seed.title, body: seed.body },
      response: { kind: 'single-choice', optionIds },
      displayOptions: seed.options.map((text, index) => ({ id: optionIds[index], text })),
    },
    status: 'reserved',
    exposure: 'reserved',
    review: { status: 'draft' },
    scoring: { kind: 'single-choice', optionId: optionIds[seed.correctIndex] },
    rationale: {
      key: seed.rationale,
      distractors: Object.fromEntries(distractorIndexes.map((optionIndex, rationaleIndex) => [
        optionIds[optionIndex],
        seed.distractorRationales[rationaleIndex],
      ])),
    },
    source: { kind: 'welearn-original', reference: ENGLISH_DIAGNOSTIC_WRITTEN_DISCOURSE_CANDIDATE_VERSION },
    levelRange: [seed.level, seed.level],
    warnings: ['PENDING_INDEPENDENT_LINGUISTIC_REVIEW', 'PENDING_PILOT_CALIBRATION'],
  };
});

const orderingRecords = orderingSeeds.map((seed): DiagnosticBankRecord => {
  const id = recordId(seed.level, seed.number);
  const optionIds = seed.fragments.map((_, index) => `${id}-f${index + 1}`);
  return {
    publicItem: {
      id,
      contentVersion: 'draft-1',
      language: 'en',
      skill: 'written-discourse',
      subdomain: 'organisation-sequencing',
      levelCandidate: seed.level,
      prompt: seed.prompt,
      stimulus: { kind: 'text', stimulusId: `${id}-stimulus`, title: seed.title, body: seed.body },
      response: { kind: 'ordering', optionIds },
      displayOptions: seed.fragments.map((text, index) => ({ id: optionIds[index], text })),
    },
    status: 'reserved',
    exposure: 'reserved',
    review: { status: 'draft' },
    scoring: { kind: 'ordering', acceptedOrders: [seed.correctOrder.map(index => optionIds[index])] },
    rationale: { key: seed.rationale },
    source: { kind: 'welearn-original', reference: ENGLISH_DIAGNOSTIC_WRITTEN_DISCOURSE_CANDIDATE_VERSION },
    levelRange: [seed.level, seed.level],
    warnings: ['PENDING_INDEPENDENT_LINGUISTIC_REVIEW', 'PENDING_PILOT_CALIBRATION'],
  };
});

export const ENGLISH_DIAGNOSTIC_WRITTEN_DISCOURSE_CANDIDATES: readonly DiagnosticBankRecord[] = [
  ...singleChoiceRecords,
  ...orderingRecords,
].sort((left, right) => left.publicItem.id.localeCompare(right.publicItem.id, 'en'));
