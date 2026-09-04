const fill = (skill, sortNumber, responseKey, acceptedAnswers) => ({
  skill, sortNumber, responseKind: 'fill', responseKey, acceptedAnswers, weight: 1,
});
const mcq = (skill, sortNumber, responseKey, answer, options) => ({
  skill, sortNumber, responseKind: 'mcq', responseKey, acceptedAnswers: [answer], weight: 1, options,
});
const match = (skill, sortNumber, responseKey, answer, optionMap) => ({
  skill, sortNumber, responseKind: 'match', responseKey, acceptedAnswers: [answer], weight: 1, optionMap,
});
const multiselect = (skill, sortNumber, responseKey, acceptedAnswers, optionMap) => ({
  skill, sortNumber, responseKind: 'multiselect', responseKey, acceptedAnswers,
  weight: acceptedAnswers.length, optionMap,
});

const trueFalse = ['TRUE', 'FALSE', 'NOT GIVEN'];
const yesNo = ['YES', 'NO', 'NOT GIVEN'];
const listeningSupportOptions = {
  A: 'A. academic advice', B: 'B. sports facilities', C: 'C. financial guidance',
  D: 'D. library loans', E: 'E. accommodation bookings',
};
const glassUseOptions = {
  A: 'A. bulletproof windows', B: 'B. optical fibre telecommunications',
  C: 'C. smart glass for privacy and energy efficiency', D: 'D. underwater exploration equipment',
  E: 'E. solar panel production',
};
const glassMatchOptions = {
  A: 'A. resistant to sudden temperature changes', B: 'B. changes transparency with electricity',
  C: 'C. produces perfectly flat glass sheets', D: 'D. requires addition of lead oxide',
  E: 'E. uses volcanic material as raw ingredient',
};
const beeMatchOptions = {
  A: 'A. destroys wildflower habitats used by bees', B: 'B. parasitises honeybee colonies',
  C: 'C. prevents bees from producing enough honey', D: "D. impairs bees' navigation and memory",
  E: 'E. reduces the number of flowers available', F: 'F. disrupts the timing between bee emergence and flowering',
};
const decisionMatchOptions = {
  A: 'A. supporters of rational choice theory', B: 'B. critics who object to paternalism',
  C: 'C. critics who question long-term effectiveness', D: 'D. proponents of behavioural economics',
};

export const set2CandidateFixture = {
  mockId: 'set-2',
  contentVersion: 'ielts-set-2-v2',
  status: 'PENDING_GENERATED_AUDIO_AND_TIMECODE_QA',
  independentReviewRule: 'Do not register as approved until the generated v2 MP3 is heard and mapped Q1-Q40.',
  questions: [
    fill('listening', 1, 'l1-form__1', ['078 5501 3742', '07855013742']),
    fill('listening', 2, 'l1-form__2', ['Saturday', 'saturday']),
    fill('listening', 3, 'l1-form__3', ['four', '4']),
    fill('listening', 4, 'l1-form__4', ['12', 'twelve']),
    fill('listening', 5, 'l1-form__5', ['65', 'sixty-five', 'sixty five']),
    fill('listening', 6, 'l1-form__6', ['2.50', '2.5', '2½']),
    fill('listening', 7, 'l1-table__7', ['morning', '10–12', '10-12']),
    fill('listening', 8, 'l1-table__8', ['2:30', '14:30']),
    fill('listening', 9, 'l1-table__9', ['one hour', '1 hour', 'hour']),
    fill('listening', 10, 'l1-table__10', ['equipment room']),
    multiselect('listening', 11, 'l2-multi', ['A', 'C'], listeningSupportOptions),
    fill('listening', 13, 'l2-form__13', ['10 p.m.', '10pm', 'ten']),
    fill('listening', 14, 'l2-form__14', ['6', 'six']),
    fill('listening', 15, 'l2-form__15', ['3–5', '3-5']),
    fill('listening', 16, 'l2-form__16', ['sports hall']),
    fill('listening', 17, 'l2-form__17', ['Thursdays', 'Thursday']),
    fill('listening', 18, 'l2-form__18', ['warden']),
    fill('listening', 19, 'l2-form__19', ['15', 'fifteen']),
    fill('listening', 20, 'l2-form__20', ['11', 'eleven']),
    mcq('listening', 21, 'l3q21', 1, ['contained too many statistics', 'lacked real-world examples', 'was too long']),
    mcq('listening', 22, 'l3q22', 2, ['solar power', 'hydroelectric sources', 'wind power']),
    mcq('listening', 23, 'l3q23', 1, ['adding a completely new section', 'revising the existing section', 'removing the section entirely']),
    mcq('listening', 24, 'l3q24', 1, ['It was too long.', 'It only summarised what had already been said.', 'It contained factual errors.']),
    mcq('listening', 25, 'l3q25', 1, ['fund more research into solar energy', 'set mandatory renewable energy targets', 'reduce energy consumption']),
    fill('listening', 26, 'l3-form__26', ['grid']),
    fill('listening', 27, 'l3-form__27', ['locations']),
    fill('listening', 28, 'l3-form__28', ['labels', 'label']),
    fill('listening', 29, 'l3-form__29', ['programme', 'program']),
    fill('listening', 30, 'l3-form__30', ['library']),
    fill('listening', 31, 'l4-form__31', ['species']),
    fill('listening', 32, 'l4-form__32', ['polyps', 'polyp']),
    fill('listening', 33, 'l4-form__33', ['calcium']),
    fill('listening', 34, 'l4-form__34', ['algae']),
    fill('listening', 35, 'l4-form__35', ['energy']),
    fill('listening', 36, 'l4-form__36', ['temperature', 'temperatures']),
    fill('listening', 37, 'l4-form__37', ['white']),
    fill('listening', 38, 'l4-form__38', ['acidification']),
    fill('listening', 39, 'l4-form__39', ['fishing']),
    fill('listening', 40, 'l4-form__40', ['starfish']),

    fill('reading', 1, 'r1-summary__1', ['silica']),
    fill('reading', 2, 'r1-summary__2', ['impurities']),
    fill('reading', 3, 'r1-summary__3', ['glassblowing']),
    fill('reading', 4, 'r1-summary__4', ['Murano']),
    fill('reading', 5, 'r1-summary__5', ['oxide']),
    mcq('reading', 6, 'r1q6', 0, trueFalse),
    mcq('reading', 7, 'r1q7', 1, trueFalse),
    mcq('reading', 8, 'r1q8', 1, trueFalse),
    mcq('reading', 9, 'r1q9', 0, trueFalse),
    multiselect('reading', 10, 'r1-multi', ['B', 'C'], glassUseOptions),
    match('reading', 12, 'r1-match__12', 'C', glassMatchOptions),
    match('reading', 13, 'r1-match__13', 'A', glassMatchOptions),
    mcq('reading', 14, 'r2q14', 1, trueFalse),
    mcq('reading', 15, 'r2q15', 0, trueFalse),
    mcq('reading', 16, 'r2q16', 2, trueFalse),
    mcq('reading', 17, 'r2q17', 0, trueFalse),
    mcq('reading', 18, 'r2q18', 0, trueFalse),
    fill('reading', 19, 'r2-notes__19', ['carbohydrates']),
    fill('reading', 20, 'r2-notes__20', ['fats']),
    fill('reading', 21, 'r2-notes__21', ['patterns']),
    fill('reading', 22, 'r2-notes__22', ['scent']),
    fill('reading', 23, 'r2-notes__23', ['mate']),
    match('reading', 24, 'r2-match__24', 'B', beeMatchOptions),
    match('reading', 25, 'r2-match__25', 'D', beeMatchOptions),
    match('reading', 26, 'r2-match__26', 'F', beeMatchOptions),
    fill('reading', 27, 'r3-summary__27', ['rational']),
    fill('reading', 28, 'r3-summary__28', ['heuristics']),
    fill('reading', 29, 'r3-summary__29', ['cognitive biases']),
    fill('reading', 30, 'r3-summary__30', ['mind']),
    fill('reading', 31, 'r3-summary__31', ['loss']),
    fill('reading', 32, 'r3-summary__32', ['conscious']),
    fill('reading', 33, 'r3-summary__33', ['nudging']),
    mcq('reading', 34, 'r3q34', 1, yesNo),
    mcq('reading', 35, 'r3q35', 0, yesNo),
    mcq('reading', 36, 'r3q36', 0, yesNo),
    mcq('reading', 37, 'r3q37', 1, yesNo),
    mcq('reading', 38, 'r3q38', 0, yesNo),
    match('reading', 39, 'r3-match__39', 'B', decisionMatchOptions),
    match('reading', 40, 'r3-match__40', 'C', decisionMatchOptions),
  ],
};
