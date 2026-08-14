import 'server-only';

import {
  TOEFL_BUILD_SENTENCE_SET11_V2,
  TOEFL_BUILD_SENTENCE_SET12_V2,
  TOEFL_BUILD_SENTENCE_SET13_V2,
  TOEFL_BUILD_SENTENCE_SET14_V2,
  TOEFL_BUILD_SENTENCE_SET15_V2,
} from '@/data/toefl/build-sentence-sets-11-15';
import {
  createScoring,
  type SourceDefinition,
} from '@/server/toefl/build-sentence-sets-2-5';
import type { ToeflBuildSentenceScoringItem } from '@/lib/toefl/build-sentence-contract';

const CONTENT_VERSION = '2026-08-14.w6';

const SET11_SOURCES = [
  { context: "What is the science center offering this month?", replyPrefix: "It", replySuffix: ".", parts: ["is offering", "a workshop", "that explains", "renewable energy"], distractor: "offering" },
  { context: "I cannot find the correct office. Can you help?", replyPrefix: "Could", replySuffix: "?", parts: ["you", "tell me", "where I should submit", "this form"], distractor: "told me" },
  { context: "Was the room suitable for the orientation?", replyPrefix: "The room", replySuffix: ".", parts: ["that", "you reserved", "was", "large enough"], distractor: "were" },
  { context: "When will applicants receive a decision?", replyPrefix: "We", replySuffix: ".", parts: ["will send notice", "once", "the committee", "approves the list"], distractor: "approving" },
  { context: "How does this fee compare with the previous one?", replyPrefix: "This fee", replySuffix: ".", parts: ["is", "lower", "than", "the previous one"], distractor: "are" },
  { context: "What did Elena do after missing the bus?", replyPrefix: "She", replySuffix: ".", parts: ["called her friend", "after", "she missed", "the bus"], distractor: "calling her friend" },
  { context: "Why did the organizers postpone the event?", replyPrefix: "The organizers", replySuffix: ".", parts: ["postponed the event", "because", "a storm", "was approaching"], distractor: "postponing the event" },
  { context: "Will you attend despite feeling unwell?", replyPrefix: "I", replySuffix: ".", parts: ["will attend", "even though", "I have", "a cold"], distractor: "because of" },
  { context: "Which researchers receive laboratory access?", replyPrefix: "Researchers", replySuffix: ".", parts: ["who complete training", "are", "granted access", "to the laboratory"], distractor: "is" },
  { context: "Would the team have met the original deadline?", replyPrefix: "We", replySuffix: ".", parts: ["would have missed", "the deadline", "if the professor", "had not extended it"], distractor: "the professor does not extend it" },
] satisfies readonly SourceDefinition[];

const SET11_SCORING = createScoring(11, TOEFL_BUILD_SENTENCE_SET11_V2, SET11_SOURCES, CONTENT_VERSION);

const SET12_SOURCES = [
  { context: "What is the volunteer office launching?", replyPrefix: "It", replySuffix: ".", parts: ["is launching", "a service", "that connects", "local volunteers"], distractor: "launching" },
  { context: "I do not understand this charge. Can you help?", replyPrefix: "Could", replySuffix: "?", parts: ["you", "explain", "why the invoice", "was changed"], distractor: "explained" },
  { context: "Was the assigned article reliable?", replyPrefix: "The article", replySuffix: ".", parts: ["that", "we discussed", "was", "well documented"], distractor: "were" },
  { context: "When will the presentation begin?", replyPrefix: "They", replySuffix: ".", parts: ["will begin", "as soon as", "the technician", "arrives"], distractor: "arrive" },
  { context: "How does the express train compare with local service?", replyPrefix: "The express train", replySuffix: ".", parts: ["is", "faster", "than", "the local service"], distractor: "are" },
  { context: "What did Amir do after the tutoring session?", replyPrefix: "He", replySuffix: ".", parts: ["updated his notes", "after", "the tutor", "answered his questions"], distractor: "updating his notes" },
  { context: "Why did the department add another section?", replyPrefix: "The department", replySuffix: ".", parts: ["added another section", "because", "the original course", "was full"], distractor: "adding another section" },
  { context: "Why did Maya accept the position?", replyPrefix: "She", replySuffix: ".", parts: ["accepted the position", "even though", "the salary", "was modest"], distractor: "because of" },
  { context: "Which applications are reviewed first?", replyPrefix: "Applications", replySuffix: ".", parts: ["that arrive early", "are", "reviewed", "first"], distractor: "is" },
  { context: "Could the equipment have kept operating?", replyPrefix: "The equipment", replySuffix: ".", parts: ["would have failed", "if the engineers", "had not replaced", "the battery"], distractor: "the engineers did not replace" },
] satisfies readonly SourceDefinition[];

const SET12_SCORING = createScoring(12, TOEFL_BUILD_SENTENCE_SET12_V2, SET12_SOURCES, CONTENT_VERSION);

const SET13_SOURCES = [
  { context: "What are you designing for commuters?", replyPrefix: "We", replySuffix: ".", parts: ["are designing", "an application", "that tracks", "bus arrivals"], distractor: "designing" },
  { context: "I forgot my account password. Can you help?", replyPrefix: "Could", replySuffix: "?", parts: ["you", "show me", "how I can reset", "my password"], distractor: "showed me" },
  { context: "Was the guest lecture clear?", replyPrefix: "The lecture", replySuffix: ".", parts: ["that", "the professor gave", "was", "easy to follow"], distractor: "were" },
  { context: "When will you sign up for the course?", replyPrefix: "I", replySuffix: ".", parts: ["will register", "when", "the enrollment portal", "opens"], distractor: "open" },
  { context: "How does the online course compare with the evening class?", replyPrefix: "The online course", replySuffix: ".", parts: ["is", "more flexible", "than", "the evening class"], distractor: "are" },
  { context: "What did the team do after preparing the instruments?", replyPrefix: "They", replySuffix: ".", parts: ["compared the measurements", "after", "calibrating", "the instruments"], distractor: "comparing the measurements" },
  { context: "Why did the researchers repeat the experiment?", replyPrefix: "The researchers", replySuffix: ".", parts: ["repeated the experiment", "because", "the first sample", "was contaminated"], distractor: "repeating the experiment" },
  { context: "Did you continue despite the surprising findings?", replyPrefix: "We", replySuffix: ".", parts: ["continued the study", "even though", "the results", "were unexpected"], distractor: "because of" },
  { context: "Which students are less likely to plagiarize?", replyPrefix: "Students", replySuffix: ".", parts: ["who cite sources", "are", "less likely", "to plagiarize"], distractor: "is" },
  { context: "Could the mission have launched in worse weather?", replyPrefix: "The mission", replySuffix: ".", parts: ["would have been delayed", "if the weather", "had worsened", "before launch"], distractor: "the weather worsens" },
] satisfies readonly SourceDefinition[];

const SET13_SCORING = createScoring(13, TOEFL_BUILD_SENTENCE_SET13_V2, SET13_SOURCES, CONTENT_VERSION);

const SET14_SOURCES = [
  { context: "What is the community center organizing?", replyPrefix: "It", replySuffix: ".", parts: ["is organizing", "an exhibition", "that features", "local artists"], distractor: "organizing" },
  { context: "I want to attend the concert. Can you check?", replyPrefix: "Could", replySuffix: "?", parts: ["you", "tell me", "whether seats", "are still available"], distractor: "told me" },
  { context: "Was the recommended book easy to obtain?", replyPrefix: "The book", replySuffix: ".", parts: ["that", "my adviser recommended", "was", "out of print"], distractor: "were" },
  { context: "When will the museum reopen?", replyPrefix: "The museum", replySuffix: ".", parts: ["will reopen", "after", "the repairs", "are complete"], distractor: "is complete" },
  { context: "How does this route compare with the coastal road?", replyPrefix: "This route", replySuffix: ".", parts: ["is", "safer", "than", "the coastal road"], distractor: "are" },
  { context: "What did Priya do after receiving feedback?", replyPrefix: "She", replySuffix: ".", parts: ["submitted her application", "after", "her supervisor", "reviewed it"], distractor: "submitting her application" },
  { context: "Why did the city plant more trees?", replyPrefix: "The city", replySuffix: ".", parts: ["planted more trees", "because", "summer temperatures", "had risen"], distractor: "planting more trees" },
  { context: "Why did Daniel volunteer for the weekend event?", replyPrefix: "He", replySuffix: ".", parts: ["volunteered", "even though", "his schedule", "was busy"], distractor: "because of" },
  { context: "Which residents enter the meeting first?", replyPrefix: "Residents", replySuffix: ".", parts: ["who register online", "are", "admitted", "first"], distractor: "is" },
  { context: "Would the reservation still be active without your call?", replyPrefix: "We", replySuffix: ".", parts: ["would have lost", "the reservation", "if you", "had not confirmed it"], distractor: "you do not confirm it" },
] satisfies readonly SourceDefinition[];

const SET14_SCORING = createScoring(14, TOEFL_BUILD_SENTENCE_SET14_V2, SET14_SOURCES, CONTENT_VERSION);

const SET15_SOURCES = [
  { context: "What is the clinic introducing?", replyPrefix: "They", replySuffix: ".", parts: ["are introducing", "a system", "that reduces", "waiting times"], distractor: "introducing" },
  { context: "I cannot find the conference desk. Can you help?", replyPrefix: "Could", replySuffix: "?", parts: ["you", "show me", "where I can collect", "my badge"], distractor: "showed me" },
  { context: "Was the instructor's explanation persuasive?", replyPrefix: "The explanation", replySuffix: ".", parts: ["that", "the instructor provided", "was", "convincing"], distractor: "were" },
  { context: "When will the group leave the auditorium?", replyPrefix: "We", replySuffix: ".", parts: ["will leave", "once", "the final speaker", "finishes"], distractor: "finish" },
  { context: "How does this apartment compare with the previous one?", replyPrefix: "This apartment", replySuffix: ".", parts: ["is", "farther from campus", "than", "the previous one"], distractor: "are" },
  { context: "What did you do after revising the document?", replyPrefix: "I", replySuffix: ".", parts: ["saved a copy", "after", "editing", "the document"], distractor: "saving a copy" },
  { context: "Why did the committee change the policy?", replyPrefix: "The committee", replySuffix: ".", parts: ["changed the policy", "because", "students had raised", "concerns"], distractor: "changing the policy" },
  { context: "Did Sofia finish despite the unclear directions?", replyPrefix: "She", replySuffix: ".", parts: ["completed the assignment", "even though", "the instructions", "were confusing"], distractor: "because of" },
  { context: "Which candidates are considered first?", replyPrefix: "Candidates", replySuffix: ".", parts: ["who submit portfolios", "are", "considered", "first"], distractor: "is" },
  { context: "Could the package have arrived sooner?", replyPrefix: "The package", replySuffix: ".", parts: ["would have arrived sooner", "if", "the address", "had been correct"], distractor: "the address had correct" },
] satisfies readonly SourceDefinition[];

const SET15_SCORING = createScoring(15, TOEFL_BUILD_SENTENCE_SET15_V2, SET15_SOURCES, CONTENT_VERSION);

export const TOEFL_BUILD_SENTENCE_SCORING_SETS_11_TO_15 = Object.fromEntries([
  [TOEFL_BUILD_SENTENCE_SET11_V2.objectId, SET11_SCORING],
  [TOEFL_BUILD_SENTENCE_SET12_V2.objectId, SET12_SCORING],
  [TOEFL_BUILD_SENTENCE_SET13_V2.objectId, SET13_SCORING],
  [TOEFL_BUILD_SENTENCE_SET14_V2.objectId, SET14_SCORING],
  [TOEFL_BUILD_SENTENCE_SET15_V2.objectId, SET15_SCORING],
]) as Readonly<Record<string, {
  scoringVersion: string;
  disclosure: string;
  items: ToeflBuildSentenceScoringItem[];
}>>;
