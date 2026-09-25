import type { CefrLevel, DiagnosticObjectiveSkill } from '../../../lib/diagnostic/types.ts';
import type { DiagnosticBankRecord } from '../types.ts';

export const ENGLISH_DIAGNOSTIC_LANGUAGE_USE_CANDIDATE_VERSION = 'en-language-use-original-draft-1';

type LanguageUseSeed = {
  level: CefrLevel;
  skill: Extract<DiagnosticObjectiveSkill, 'grammar' | 'vocabulary'>;
  subdomain: string;
  prompt: string;
  options: readonly [string, string, string];
  correctIndex: 0 | 1 | 2;
  rationale: string;
  distractorRationales: readonly [string, string];
};

const seeds: readonly LanguageUseSeed[] = [
  {
    level: 'A1', skill: 'grammar', subdomain: 'form',
    prompt: 'Complete the sentence: “I ___ from Colombia.”',
    options: ['is', 'am', 'are'], correctIndex: 1,
    rationale: 'The first-person singular subject “I” takes the present form “am”.',
    distractorRationales: ['“Is” is used with he, she, or it.', '“Are” is used with you, we, or they.'],
  },
  {
    level: 'A1', skill: 'grammar', subdomain: 'agreement',
    prompt: 'Complete the sentence: “She ___ coffee every morning.”',
    options: ['drink', 'drinking', 'drinks'], correctIndex: 2,
    rationale: 'A third-person singular subject takes “-s” in the present simple: “she drinks”.',
    distractorRationales: ['The base form does not agree with “she” here.', 'The “-ing” form needs an auxiliary verb.'],
  },
  {
    level: 'A1', skill: 'grammar', subdomain: 'form',
    prompt: 'Complete the sentence: “We ___ have a car.”',
    options: ["don’t", "isn’t", "doesn’t"], correctIndex: 0,
    rationale: 'The present-simple negative with “we” is “do not”, contracted to “don’t”.',
    distractorRationales: ['“Isn’t” negates the verb “be”, not “have” in this pattern.', '“Doesn’t” is used with he, she, or it.'],
  },
  {
    level: 'A1', skill: 'grammar', subdomain: 'sentence-structure',
    prompt: 'Complete the question: “___ there a bank near here?”',
    options: ['Are', 'Is', 'Do'], correctIndex: 1,
    rationale: 'A singular noun after “there” uses the question form “Is there…?”',
    distractorRationales: ['“Are there” introduces a plural noun.', '“Do there” is not the English existential question pattern.'],
  },
  {
    level: 'A1', skill: 'grammar', subdomain: 'form',
    prompt: 'Complete the sentence: “They ___ two children.”',
    options: ['has', 'having', 'have'], correctIndex: 2,
    rationale: 'The subject “they” takes the base present form “have”.',
    distractorRationales: ['“Has” is used with he, she, or it.', '“Having” cannot serve as the finite verb without an auxiliary here.'],
  },
  {
    level: 'A1', skill: 'grammar', subdomain: 'form',
    prompt: 'Complete the answer: “Can you swim?” “Yes, I ___.”',
    options: ['can', 'do', 'am'], correctIndex: 0,
    rationale: 'A short answer repeats the modal in the question: “Yes, I can.”',
    distractorRationales: ['“Do” would answer a question formed with “do”.', '“Am” would answer a question formed with “be”.'],
  },
  {
    level: 'A1', skill: 'grammar', subdomain: 'agreement',
    prompt: 'Complete the sentence about a boy: “___ name is Luis.”',
    options: ['He', 'His', 'Him'], correctIndex: 1,
    rationale: '“His” is the possessive determiner required before the noun “name”.',
    distractorRationales: ['“He” is a subject pronoun and cannot modify “name”.', '“Him” is an object pronoun and cannot modify “name”.'],
  },
  {
    level: 'A1', skill: 'grammar', subdomain: 'agreement',
    prompt: 'Complete the sentence: “The books ___ on the table.”',
    options: ['is', 'be', 'are'], correctIndex: 2,
    rationale: 'The plural subject “books” agrees with the present form “are”.',
    distractorRationales: ['“Is” agrees with a singular subject.', 'The bare form “be” is not finite in this sentence.'],
  },
  {
    level: 'A1', skill: 'grammar', subdomain: 'sentence-structure',
    prompt: 'Complete the question: “What time ___ you start work?”',
    options: ['do', 'are', 'does'], correctIndex: 0,
    rationale: 'A present-simple question with “you” uses the auxiliary “do”.',
    distractorRationales: ['“Are” would require a different verb pattern.', '“Does” is used with he, she, or it.'],
  },
  {
    level: 'A1', skill: 'grammar', subdomain: 'agreement',
    prompt: 'Complete the sentence: “There ___ some milk in the fridge.”',
    options: ['are', 'is', 'be'], correctIndex: 1,
    rationale: 'The uncountable noun “milk” takes the singular existential form “there is”.',
    distractorRationales: ['“Are” is used with plural countable nouns.', 'The bare form “be” cannot be the finite verb here.'],
  },
  {
    level: 'A1', skill: 'grammar', subdomain: 'cohesion',
    prompt: 'Complete the sentence: “I have English class ___ Monday.”',
    options: ['at', 'in', 'on'], correctIndex: 2,
    rationale: 'English uses the preposition “on” with days of the week.',
    distractorRationales: ['“At” is normally used with clock times.', '“In” is normally used with months, years, or longer periods.'],
  },
  {
    level: 'A1', skill: 'grammar', subdomain: 'sentence-structure',
    prompt: 'Choose the sentence with the correct word order.',
    options: ['I usually walk to school.', 'I walk usually to school.', 'Usually I to school walk.'], correctIndex: 0,
    rationale: 'A frequency adverb normally comes before the main verb: “usually walk”.',
    distractorRationales: ['Placing “usually” after the main verb is not the neutral pattern here.', 'The subject, adverb, verb, and complement are in the wrong order.'],
  },
  {
    level: 'A1', skill: 'vocabulary', subdomain: 'meaning',
    prompt: 'A doctor usually works in a ___.',
    options: ['station', 'hospital', 'market'], correctIndex: 1,
    rationale: 'A hospital is the usual workplace associated with a doctor.',
    distractorRationales: ['A station is associated with transport or public services.', 'A market is a place where goods are sold.'],
  },
  {
    level: 'A1', skill: 'vocabulary', subdomain: 'meaning',
    prompt: 'Complete the sentence: “I’m thirsty. I need some ___.”',
    options: ['bread', 'music', 'water'], correctIndex: 2,
    rationale: 'Being thirsty means needing a drink, so “water” fits the context.',
    distractorRationales: ['Bread responds to hunger, not thirst.', 'Music cannot satisfy thirst.'],
  },
  {
    level: 'A1', skill: 'vocabulary', subdomain: 'meaning',
    prompt: 'Which word means the opposite of “expensive”?',
    options: ['cheap', 'heavy', 'busy'], correctIndex: 0,
    rationale: '“Cheap” contrasts with “expensive” in price.',
    distractorRationales: ['“Heavy” describes weight.', '“Busy” describes activity or availability.'],
  },
  {
    level: 'A1', skill: 'vocabulary', subdomain: 'meaning',
    prompt: 'Which item do people normally wear on their feet?',
    options: ['Gloves', 'Shoes', 'A scarf'], correctIndex: 1,
    rationale: 'Shoes are worn on the feet.',
    distractorRationales: ['Gloves are worn on the hands.', 'A scarf is worn around the neck.'],
  },
  {
    level: 'A1', skill: 'vocabulary', subdomain: 'collocation',
    prompt: 'Complete the phrase: “___ a shower”.',
    options: ['Make', 'Put', 'Take'], correctIndex: 2,
    rationale: 'The standard collocation is “take a shower”.',
    distractorRationales: ['English does not normally say “make a shower” for this activity.', '“Put a shower” does not express the activity.'],
  },
  {
    level: 'A1', skill: 'vocabulary', subdomain: 'paraphrase',
    prompt: 'The weather is “freezing”. What does that mean?',
    options: ['It is very cold.', 'It is quite sunny.', 'It is very windy.'], correctIndex: 0,
    rationale: 'In everyday weather language, “freezing” means extremely cold.',
    distractorRationales: ['Sunshine and temperature are different properties.', 'Windy describes moving air, not necessarily low temperature.'],
  },
  {
    level: 'A1', skill: 'vocabulary', subdomain: 'register',
    prompt: 'Which greeting is natural when you meet a friend?',
    options: ['Farewell, customer.', 'Hi! How are you?', 'Attention, passenger.'], correctIndex: 1,
    rationale: '“Hi! How are you?” is a natural informal greeting between friends.',
    distractorRationales: ['This is an unnatural formal farewell, not a greeting between friends.', 'This sounds like a public announcement, not a friendly greeting.'],
  },
  {
    level: 'A1', skill: 'vocabulary', subdomain: 'word-formation',
    prompt: 'A person who teaches students is a ___.',
    options: ['teach', 'teaching', 'teacher'], correctIndex: 2,
    rationale: 'The suffix “-er” forms the person noun “teacher” from the verb “teach”.',
    distractorRationales: ['“Teach” is a verb, not the person noun needed after “a”.', '“Teaching” names an activity and does not fit after “a” here.'],
  },
  {
    level: 'A1', skill: 'vocabulary', subdomain: 'paraphrase',
    prompt: 'A sign says, “The shop is closed.” What does it mean?',
    options: ['You cannot shop there now.', 'Everything is free today.', 'The shop moved upstairs.'], correctIndex: 0,
    rationale: 'A closed shop is not open for customers at that time.',
    distractorRationales: ['“Closed” says nothing about prices.', '“Closed” does not mean that the location changed.'],
  },
  {
    level: 'A1', skill: 'vocabulary', subdomain: 'meaning',
    prompt: 'If you “borrow” a book, what do you do?',
    options: ['Write a new copy', 'Take it and return it later', 'Give it away forever'], correctIndex: 1,
    rationale: 'To borrow something is to take it for a time with the intention of returning it.',
    distractorRationales: ['Borrowing does not mean copying or writing.', 'Giving something away transfers it permanently.'],
  },
  {
    level: 'A1', skill: 'vocabulary', subdomain: 'collocation',
    prompt: 'Complete the phrase: “___ the bus to work”.',
    options: ['Do', 'Drive', 'Take'], correctIndex: 2,
    rationale: 'The normal travel collocation is “take the bus”.',
    distractorRationales: ['English does not say “do the bus”.', 'A passenger takes a bus; “drive” would identify the driver.'],
  },
  {
    level: 'A1', skill: 'vocabulary', subdomain: 'register',
    prompt: 'Which question asks for the price of an item?',
    options: ['How much is this?', 'How old is this?', 'How far is this?'], correctIndex: 0,
    rationale: '“How much” asks about price or quantity; here it asks the item’s price.',
    distractorRationales: ['“How old” asks about age.', '“How far” asks about distance.'],
  },
  {
    level: 'A2', skill: 'grammar', subdomain: 'tense-aspect',
    prompt: 'Complete the sentence: “Last night, we ___ dinner at home.”',
    options: ['eat', 'ate', 'eating'], correctIndex: 1,
    rationale: '“Last night” locates a completed event in the past, so the irregular past form “ate” is required.',
    distractorRationales: ['“Eat” is the base or present form.', '“Eating” requires an auxiliary and cannot stand alone here.'],
  },
  {
    level: 'A2', skill: 'grammar', subdomain: 'sentence-structure',
    prompt: 'Complete the question: “Where did your sister ___ yesterday?”',
    options: ['went', 'going', 'go'], correctIndex: 2,
    rationale: 'After the past auxiliary “did”, English uses the base form “go”.',
    distractorRationales: ['The past is already marked by “did”, so “went” would mark it twice.', 'The “-ing” form does not follow “did” in this question.'],
  },
  {
    level: 'A2', skill: 'grammar', subdomain: 'tense-aspect',
    prompt: 'Complete the sentence: “Look! The children ___ in the garden.”',
    options: ['are playing', 'play', 'played'], correctIndex: 0,
    rationale: '“Look!” signals an action happening now, expressed by the present continuous “are playing”.',
    distractorRationales: ['The present simple normally describes habits or repeated events.', 'The past form places the action before now.'],
  },
  {
    level: 'A2', skill: 'grammar', subdomain: 'form',
    prompt: 'Complete the comparison: “This film is ___ than the first one.”',
    options: ['most interesting', 'more interesting', 'interestingly'], correctIndex: 1,
    rationale: 'A multi-syllable adjective forms the comparative with “more”, and “than” confirms the comparison.',
    distractorRationales: ['“Most interesting” is a superlative and normally needs “the”.', '“Interestingly” is an adverb, not the adjective complement needed here.'],
  },
  {
    level: 'A2', skill: 'grammar', subdomain: 'form',
    prompt: 'Complete the sentence: “Marta is ___ person in her family.”',
    options: ['taller', 'more tall', 'the tallest'], correctIndex: 2,
    rationale: 'Comparing one person with the whole family requires the superlative “the tallest”.',
    distractorRationales: ['“Taller” compares two people and would normally be followed by “than”.', 'The regular comparative of “tall” is “taller”, not “more tall”.'],
  },
  {
    level: 'A2', skill: 'grammar', subdomain: 'agreement',
    prompt: 'Complete the question: “How ___ rice do we need?”',
    options: ['much', 'many', 'several'], correctIndex: 0,
    rationale: '“Rice” is uncountable in this context, so quantity is asked with “how much”.',
    distractorRationales: ['“Many” is used with plural countable nouns.', '“How several” is not a grammatical quantity question.'],
  },
  {
    level: 'A2', skill: 'grammar', subdomain: 'tense-aspect',
    prompt: 'Complete the plan: “Sara ___ her aunt this weekend.”',
    options: ['visits yesterday', 'is going to visit', 'has visit'], correctIndex: 1,
    rationale: '“Is going to visit” expresses Sara’s future plan for the coming weekend.',
    distractorRationales: ['“Yesterday” conflicts with the future time expression.', 'The present perfect requires the participle “visited” and would express a different meaning.'],
  },
  {
    level: 'A2', skill: 'grammar', subdomain: 'tense-aspect',
    prompt: 'Complete the sentence: “I ___ my homework, so I can go out now.”',
    options: ['finish', 'am finishing yesterday', 'have finished'], correctIndex: 2,
    rationale: 'The present perfect “have finished” connects a completed action with its present result.',
    distractorRationales: ['The simple present does not express the completed result here.', 'The present continuous cannot combine with “yesterday” in this way.'],
  },
  {
    level: 'A2', skill: 'grammar', subdomain: 'form',
    prompt: 'A friend has a headache. Choose the best advice.',
    options: ['You should rest for a while.', 'You must to resting now.', 'You should to take a rest.'], correctIndex: 0,
    rationale: 'The modal “should” is followed by the base verb and appropriately expresses advice.',
    distractorRationales: ['A modal is not followed by “to” or an “-ing” form here.', 'English uses “should take”, without “to”.'],
  },
  {
    level: 'A2', skill: 'grammar', subdomain: 'cohesion',
    prompt: 'Complete the sentence: “If it rains tomorrow, we ___ at home.”',
    options: ['stayed', 'will stay', 'would staying'], correctIndex: 1,
    rationale: 'A likely future condition uses present simple after “if” and “will” in the result clause.',
    distractorRationales: ['“Stayed” places the result in the past.', '“Would staying” is not a grammatical verb phrase.'],
  },
  {
    level: 'A2', skill: 'grammar', subdomain: 'cohesion',
    prompt: 'Complete the sentence: “The woman ___ works at the library is my neighbour.”',
    options: ['which', 'where', 'who'], correctIndex: 2,
    rationale: 'The relative pronoun “who” refers to a person and functions as the subject of “works”.',
    distractorRationales: ['“Which” normally refers to things.', '“Where” refers to places, not people.'],
  },
  {
    level: 'A2', skill: 'grammar', subdomain: 'sentence-structure',
    prompt: 'Complete the sentence: “My brother enjoys ___ new recipes.”',
    options: ['trying', 'to tried', 'try'], correctIndex: 0,
    rationale: 'The verb “enjoy” is followed by an “-ing” form: “enjoys trying”.',
    distractorRationales: ['“To tried” combines incompatible infinitive and past forms.', 'The bare verb does not normally follow “enjoy”.'],
  },
  {
    level: 'A2', skill: 'vocabulary', subdomain: 'meaning',
    prompt: 'Where would you normally go to buy medicine?',
    options: ['A bakery', 'A pharmacy', 'A library'], correctIndex: 1,
    rationale: 'A pharmacy is a shop that prepares or sells medicine.',
    distractorRationales: ['A bakery sells bread and similar food.', 'A library lends books and other information resources.'],
  },
  {
    level: 'A2', skill: 'vocabulary', subdomain: 'meaning',
    prompt: 'The train is “delayed”. What has happened?',
    options: ['It left ahead of time.', 'It changed its destination.', 'It will arrive later than planned.'], correctIndex: 2,
    rationale: 'A delayed service happens later than its scheduled time.',
    distractorRationales: ['Leaving early is the opposite of a delay.', 'A destination change is a diversion, not necessarily a delay.'],
  },
  {
    level: 'A2', skill: 'vocabulary', subdomain: 'paraphrase',
    prompt: 'If a person is “available” this afternoon, what does it mean?',
    options: ['They are free to meet.', 'They are travelling abroad.', 'They are feeling unwell.'], correctIndex: 0,
    rationale: 'In a scheduling context, “available” means free and able to meet.',
    distractorRationales: ['Travel is not implied by availability.', 'Health is not implied by availability.'],
  },
  {
    level: 'A2', skill: 'vocabulary', subdomain: 'collocation',
    prompt: 'Complete the phrase: “___ a mistake”.',
    options: ['Do', 'Make', 'Build'], correctIndex: 1,
    rationale: 'The standard English collocation is “make a mistake”.',
    distractorRationales: ['English does not normally say “do a mistake”.', '“Build” is used for constructing things, not errors.'],
  },
  {
    level: 'A2', skill: 'vocabulary', subdomain: 'word-formation',
    prompt: 'Complete the sentence: “Please carry the glass ___.”',
    options: ['care', 'careful', 'carefully'], correctIndex: 2,
    rationale: 'The adverb “carefully” modifies how the action “carry” should be performed.',
    distractorRationales: ['“Care” is a noun or verb and cannot directly modify “carry” here.', '“Careful” is an adjective and would describe a noun or follow “be”.'],
  },
  {
    level: 'A2', skill: 'vocabulary', subdomain: 'paraphrase',
    prompt: '“Could you look after my cat?” What is the speaker asking?',
    options: ['Take care of the cat', 'Search behind the cat', 'Buy a different cat'], correctIndex: 0,
    rationale: 'The phrasal verb “look after” means take care of a person or animal.',
    distractorRationales: ['The phrase is not a literal instruction about where to look.', 'No purchase or replacement is requested.'],
  },
  {
    level: 'A2', skill: 'vocabulary', subdomain: 'register',
    prompt: 'Which request is suitable in a polite email to a course office?',
    options: ['Send me the dates now.', 'Could you tell me the course dates, please?', 'Dates. I need them.'], correctIndex: 1,
    rationale: 'The modal question and “please” make the request appropriately polite for an office email.',
    distractorRationales: ['The imperative sounds too direct for this context.', 'The fragments sound abrupt and impolite.'],
  },
  {
    level: 'A2', skill: 'vocabulary', subdomain: 'meaning',
    prompt: 'At a railway station, what is a “platform”?',
    options: ['A ticket discount', 'A bag storage room', 'The place where passengers board a train'], correctIndex: 2,
    rationale: 'A railway platform is the raised area beside the track where passengers board and leave trains.',
    distractorRationales: ['A discount concerns ticket price.', 'Bag storage is usually called left luggage or a locker area.'],
  },
  {
    level: 'A2', skill: 'vocabulary', subdomain: 'meaning',
    prompt: 'There is a “leak” under the kitchen sink. What is happening?',
    options: ['Water is escaping from a pipe.', 'The sink is completely dry.', 'Someone is cleaning the floor.'], correctIndex: 0,
    rationale: 'A leak is an unintended escape of liquid or gas, here water from the plumbing.',
    distractorRationales: ['A dry sink provides no evidence of leaking water.', 'Cleaning may involve water but is not described by “leak”.'],
  },
  {
    level: 'A2', skill: 'vocabulary', subdomain: 'paraphrase',
    prompt: 'After walking all day, Nina was “exhausted”. How did she feel?',
    options: ['Slightly bored', 'Very tired', 'Quite surprised'], correctIndex: 1,
    rationale: '“Exhausted” means extremely tired, which fits the long day of walking.',
    distractorRationales: ['Boredom concerns interest, not physical energy.', 'Surprise is an emotional reaction, not fatigue.'],
  },
  {
    level: 'A2', skill: 'vocabulary', subdomain: 'paraphrase',
    prompt: 'The outdoor concert was “cancelled”. What does that mean?',
    options: ['It started earlier.', 'It moved to a larger place.', 'It will not take place.'], correctIndex: 2,
    rationale: 'A cancelled event has been called off and will not happen as planned.',
    distractorRationales: ['An earlier start is a schedule change, not a cancellation.', 'Changing venue does not mean cancelling the event.'],
  },
  {
    level: 'A2', skill: 'vocabulary', subdomain: 'collocation',
    prompt: 'The music is too loud. Which request fits the situation?',
    options: ['Could you turn it down?', 'Could you take it off?', 'Could you put it away?'], correctIndex: 0,
    rationale: '“Turn it down” means reduce the volume of sound or a device.',
    distractorRationales: ['“Take it off” usually means remove clothing or detach something.', '“Put it away” means return something to storage.'],
  },
];

function itemId(seed: LanguageUseSeed, ordinal: number): string {
  return `en-${seed.level.toLowerCase()}-${seed.skill}-${String(ordinal).padStart(2, '0')}`;
}

export const ENGLISH_DIAGNOSTIC_LANGUAGE_USE_CANDIDATES: readonly DiagnosticBankRecord[] = seeds.map((seed, index) => {
  const sameCellOrdinal = seeds.slice(0, index + 1)
    .filter((candidate) => candidate.level === seed.level && candidate.skill === seed.skill).length;
  const id = itemId(seed, sameCellOrdinal);
  const optionIds = seed.options.map((_, optionIndex) => `${id}-o${optionIndex + 1}`);
  const distractorIndexes = [0, 1, 2].filter((optionIndex) => optionIndex !== seed.correctIndex);
  return {
    publicItem: {
      id,
      contentVersion: 'draft-1',
      language: 'en',
      skill: seed.skill,
      subdomain: seed.subdomain,
      levelCandidate: seed.level,
      prompt: seed.prompt,
      stimulus: { kind: 'none' },
      response: { kind: 'single-choice', optionIds },
      displayOptions: seed.options.map((text, optionIndex) => ({ id: optionIds[optionIndex], text })),
    },
    status: 'reserved',
    exposure: 'reserved',
    review: { status: 'draft' },
    scoring: { kind: 'single-choice', optionId: optionIds[seed.correctIndex] },
    rationale: {
      key: seed.rationale,
      distractors: Object.fromEntries(distractorIndexes.map((optionIndex, rationaleIndex) => [
        optionIds[optionIndex], seed.distractorRationales[rationaleIndex],
      ])),
    },
    source: { kind: 'welearn-original', reference: ENGLISH_DIAGNOSTIC_LANGUAGE_USE_CANDIDATE_VERSION },
    levelRange: [seed.level, seed.level],
    warnings: ['PENDING_INDEPENDENT_LINGUISTIC_REVIEW', 'PENDING_PILOT_CALIBRATION'],
  };
});
