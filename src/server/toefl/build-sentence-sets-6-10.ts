import 'server-only';

import {
  TOEFL_BUILD_SENTENCE_SET6_V2,
  TOEFL_BUILD_SENTENCE_SET7_V2,
  TOEFL_BUILD_SENTENCE_SET8_V2,
  TOEFL_BUILD_SENTENCE_SET9_V2,
  TOEFL_BUILD_SENTENCE_SET10_V2,
} from '@/data/toefl/build-sentence-sets-6-10';
import {
  createScoring,
  type SourceDefinition,
} from '@/server/toefl/build-sentence-sets-2-5';
import type { ToeflBuildSentenceScoringItem } from '@/lib/toefl/build-sentence-contract';

const CONTENT_VERSION = '2026-08-14.w5';

const SET6_SOURCES = [
  { context: "Where will the tutoring session take place?", replyPrefix: "It", replySuffix: ".", parts: ["will be held", "in the library", "that stays open", "until midnight"], distractor: "holding" },
  { context: "The projector is not connected. Can you help?", replyPrefix: "Could", replySuffix: "?", parts: ["you", "show me", "how to connect", "the projector"], distractor: "showed me" },
  { context: "Was the workshop useful?", replyPrefix: "The workshop", replySuffix: ".", parts: ["that", "I attended", "was", "very practical"], distractor: "were" },
  { context: "When will you submit the proposal?", replyPrefix: "I", replySuffix: ".", parts: ["will submit it", "after", "my advisor", "reviews it"], distractor: "review it" },
  { context: "How does this route compare with the old one?", replyPrefix: "This route", replySuffix: ".", parts: ["is", "shorter", "than", "the old one"], distractor: "are" },
  { context: "Why did Carlos call the office?", replyPrefix: "He", replySuffix: ".", parts: ["called", "because", "his registration", "was missing"], distractor: "were missing" },
  { context: "What did the coordinator say about the results?", replyPrefix: "The coordinator", replySuffix: ".", parts: ["said", "that", "the results", "would arrive Friday"], distractor: "saying" },
  { context: "Will you attend the early session?", replyPrefix: "I", replySuffix: ".", parts: ["will attend", "even though", "the session", "starts very early"], distractor: "because of" },
  { context: "Who is most likely to qualify?", replyPrefix: "Students", replySuffix: ".", parts: ["who", "apply early", "are", "more likely to qualify"], distractor: "is" },
  { context: "Could the delivery have arrived on time?", replyPrefix: "It", replySuffix: ".", parts: ["would have arrived", "on time", "if", "the driver had called"], distractor: "the driver calls" },
] satisfies readonly SourceDefinition[];

const SET6_SCORING = createScoring(6, TOEFL_BUILD_SENTENCE_SET6_V2, SET6_SOURCES, CONTENT_VERSION);

const SET7_SOURCES = [
  { context: "What are they planning for new students?", replyPrefix: "They", replySuffix: ".", parts: ["are planning", "a welcome event", "that includes", "campus tours"], distractor: "planning" },
  { context: "Can you check my reservation?", replyPrefix: "Could", replySuffix: "?", parts: ["you", "check", "whether my reservation", "was recorded"], distractor: "checked" },
  { context: "Was the recommended tutor helpful?", replyPrefix: "The tutor", replySuffix: ".", parts: ["that", "you recommended", "was", "very patient"], distractor: "were" },
  { context: "When will the laboratory reopen?", replyPrefix: "The laboratory", replySuffix: ".", parts: ["will reopen", "when", "the inspection", "is complete"], distractor: "are complete" },
  { context: "How does this plan compare with the monthly option?", replyPrefix: "This plan", replySuffix: ".", parts: ["is", "less expensive", "than", "the monthly option"], distractor: "are" },
  { context: "What did Mia do after reading the email?", replyPrefix: "She", replySuffix: ".", parts: ["updated", "the form", "after", "she read the email"], distractor: "updating" },
  { context: "Why did the professor allow more time?", replyPrefix: "The professor", replySuffix: ".", parts: ["extended", "the deadline", "because", "the server failed"], distractor: "extending" },
  { context: "Will you join the session despite the late ending?", replyPrefix: "I", replySuffix: ".", parts: ["will attend", "even though", "the session", "ends late"], distractor: "because of" },
  { context: "Which applicants receive notice first?", replyPrefix: "Applicants", replySuffix: ".", parts: ["who", "submit all documents", "are", "notified first"], distractor: "is" },
  { context: "What if fewer people had registered?", replyPrefix: "The seats", replySuffix: ".", parts: ["would have filled", "more slowly", "if", "fewer people had registered"], distractor: "fewer people register" },
] satisfies readonly SourceDefinition[];

const SET7_SCORING = createScoring(7, TOEFL_BUILD_SENTENCE_SET7_V2, SET7_SOURCES, CONTENT_VERSION);

const SET8_SOURCES = [
  { context: "What are you creating for the program?", replyPrefix: "We", replySuffix: ".", parts: ["are creating", "a page", "that lists", "all deadlines"], distractor: "creating" },
  { context: "The room is too bright. Can you help?", replyPrefix: "Could", replySuffix: "?", parts: ["you", "close", "the blinds", "before class"], distractor: "closed" },
  { context: "Was the article useful?", replyPrefix: "The article", replySuffix: ".", parts: ["that", "you shared", "was", "very clear"], distractor: "were" },
  { context: "When will you contact the office?", replyPrefix: "I", replySuffix: ".", parts: ["will call", "when", "the office", "opens"], distractor: "open" },
  { context: "How does this room compare with the one upstairs?", replyPrefix: "This room", replySuffix: ".", parts: ["is", "quieter", "than", "the one upstairs"], distractor: "are" },
  { context: "What did the researchers do after entering the data?", replyPrefix: "They", replySuffix: ".", parts: ["checked", "the results", "after", "entering the data"], distractor: "checking" },
  { context: "Why did the organizer change the venue?", replyPrefix: "The organizer", replySuffix: ".", parts: ["moved", "the lecture", "because", "the auditorium was unavailable"], distractor: "moving" },
  { context: "Why did Sara apply for the position?", replyPrefix: "She", replySuffix: ".", parts: ["applied", "even though", "she lacked", "experience"], distractor: "because of" },
  { context: "Who may enter the archive?", replyPrefix: "Students", replySuffix: ".", parts: ["who", "show identification", "are", "allowed inside"], distractor: "is" },
  { context: "Could the files have been saved without a backup?", replyPrefix: "The files", replySuffix: ".", parts: ["would have been lost", "if", "we", "had not made a backup"], distractor: "we do not make a backup" },
] satisfies readonly SourceDefinition[];

const SET8_SCORING = createScoring(8, TOEFL_BUILD_SENTENCE_SET8_V2, SET8_SOURCES, CONTENT_VERSION);

const SET9_SOURCES = [
  { context: "What is the museum offering this weekend?", replyPrefix: "It", replySuffix: ".", parts: ["is offering", "a tour", "that focuses on", "local history"], distractor: "offering" },
  { context: "Can you help me reschedule?", replyPrefix: "Could", replySuffix: "?", parts: ["you", "tell me", "whether Tuesday", "is available"], distractor: "told me" },
  { context: "Was the laboratory equipment reliable?", replyPrefix: "The equipment", replySuffix: ".", parts: ["that", "we used", "was", "reliable"], distractor: "were" },
  { context: "When will the bus depart?", replyPrefix: "It", replySuffix: ".", parts: ["will depart", "when", "all passengers", "are seated"], distractor: "is seated" },
  { context: "How does this course compare with the previous one?", replyPrefix: "This course", replySuffix: ".", parts: ["is", "more demanding", "than", "the previous one"], distractor: "are" },
  { context: "What did you do after receiving feedback?", replyPrefix: "I", replySuffix: ".", parts: ["revised", "the draft", "after", "my mentor commented"], distractor: "revising" },
  { context: "Why was the trip canceled?", replyPrefix: "They", replySuffix: ".", parts: ["canceled", "the trip", "because", "the road was closed"], distractor: "canceling" },
  { context: "Did you stay for the entire discussion?", replyPrefix: "We", replySuffix: ".", parts: ["stayed", "even though", "the discussion", "ran late"], distractor: "because of" },
  { context: "Whose requests are processed faster?", replyPrefix: "Members", replySuffix: ".", parts: ["who", "renew online", "are", "processed faster"], distractor: "is" },
  { context: "Would you have remembered the meeting without a message?", replyPrefix: "I", replySuffix: ".", parts: ["would have forgotten", "the meeting", "if", "you had not reminded me"], distractor: "you do not remind me" },
] satisfies readonly SourceDefinition[];

const SET9_SCORING = createScoring(9, TOEFL_BUILD_SENTENCE_SET9_V2, SET9_SOURCES, CONTENT_VERSION);

const SET10_SOURCES = [
  { context: "What is the library installing?", replyPrefix: "It", replySuffix: ".", parts: ["is installing", "lights", "that use", "less energy"], distractor: "installing" },
  { context: "Can you help me find the registrar?", replyPrefix: "Could", replySuffix: "?", parts: ["you", "show me", "where the registrar's office", "is"], distractor: "showed me" },
  { context: "Did the suggested schedule work?", replyPrefix: "The schedule", replySuffix: ".", parts: ["that", "you suggested", "was", "realistic"], distractor: "were" },
  { context: "When will they announce the decision?", replyPrefix: "They", replySuffix: ".", parts: ["will announce it", "after", "the committee", "meets"], distractor: "meeting" },
  { context: "How does this hotel compare with the airport hotel?", replyPrefix: "This hotel", replySuffix: ".", parts: ["is", "closer", "than", "the one near the airport"], distractor: "are" },
  { context: "What did Leo do after the lecture?", replyPrefix: "He", replySuffix: ".", parts: ["emailed", "the speaker", "after", "the lecture ended"], distractor: "emailing" },
  { context: "Why did the manager revise the budget?", replyPrefix: "The manager", replySuffix: ".", parts: ["reduced", "expenses", "because", "costs had increased"], distractor: "reducing" },
  { context: "Why did you accept the offer?", replyPrefix: "I", replySuffix: ".", parts: ["accepted it", "even though", "the commute", "is long"], distractor: "because of" },
  { context: "Who may enroll in the advanced course?", replyPrefix: "Students", replySuffix: ".", parts: ["who", "complete the prerequisite", "are", "eligible to enroll"], distractor: "is" },
  { context: "Could the event have continued without volunteers?", replyPrefix: "It", replySuffix: ".", parts: ["would have been canceled", "if", "volunteers", "had not helped"], distractor: "volunteers do not help" },
] satisfies readonly SourceDefinition[];

const SET10_SCORING = createScoring(10, TOEFL_BUILD_SENTENCE_SET10_V2, SET10_SOURCES, CONTENT_VERSION);

export const TOEFL_BUILD_SENTENCE_SCORING_SETS_6_TO_10 = Object.fromEntries([
  [TOEFL_BUILD_SENTENCE_SET6_V2.objectId, SET6_SCORING],
  [TOEFL_BUILD_SENTENCE_SET7_V2.objectId, SET7_SCORING],
  [TOEFL_BUILD_SENTENCE_SET8_V2.objectId, SET8_SCORING],
  [TOEFL_BUILD_SENTENCE_SET9_V2.objectId, SET9_SCORING],
  [TOEFL_BUILD_SENTENCE_SET10_V2.objectId, SET10_SCORING],
]) as Readonly<Record<string, {
  scoringVersion: string;
  disclosure: string;
  items: ToeflBuildSentenceScoringItem[];
}>>;
