import 'server-only';

import {
  TOEFL_BUILD_SENTENCE_SET16_V2,
  TOEFL_BUILD_SENTENCE_SET17_V2,
  TOEFL_BUILD_SENTENCE_SET18_V2,
  TOEFL_BUILD_SENTENCE_SET19_V2,
  TOEFL_BUILD_SENTENCE_SET20_V2,
} from '@/data/toefl/build-sentence-sets-16-20';
import {
  createScoring,
  type SourceDefinition,
} from '@/server/toefl/build-sentence-sets-2-5';
import type { ToeflBuildSentenceScoringItem } from '@/lib/toefl/build-sentence-contract';

const CONTENT_VERSION = '2026-08-14.w7';

const SET16_SOURCES = [
  { context: "What is the campus opening for student teams?", replyPrefix: "It", replySuffix: ".", parts: ["is opening", "a center", "that supports", "student projects"], distractor: "opening" },
  { context: "The printer is jammed again. Can you help?", replyPrefix: "Could", replySuffix: "?", parts: ["you", "show me", "how to clear", "the paper"], distractor: "showed me" },
  { context: "Was the recommended software easy to use?", replyPrefix: "The program", replySuffix: ".", parts: ["that", "you recommended", "was", "easy to install"], distractor: "were" },
  { context: "When will the survey results be available?", replyPrefix: "We", replySuffix: ".", parts: ["will publish the results", "after", "the analysts", "verify the data"], distractor: "verifies the data" },
  { context: "How does the new route compare with the old one?", replyPrefix: "The new route", replySuffix: ".", parts: ["is", "more direct", "than", "the old route"], distractor: "are" },
  { context: "What did Ava do after the committee meeting?", replyPrefix: "She", replySuffix: ".", parts: ["sent a summary", "after", "the meeting", "had ended"], distractor: "sending a summary" },
  { context: "Why did the staff close the laboratory?", replyPrefix: "The staff", replySuffix: ".", parts: ["closed the laboratory", "because", "the ventilation system", "had failed"], distractor: "closing the laboratory" },
  { context: "Will you participate while you are away?", replyPrefix: "I", replySuffix: ".", parts: ["will join online", "even though", "I am", "traveling"], distractor: "because of" },
  { context: "Which students receive equipment first?", replyPrefix: "Students", replySuffix: ".", parts: ["who need equipment", "are", "given", "priority"], distractor: "is" },
  { context: "Could the project have finished without Maya?", replyPrefix: "The project", replySuffix: ".", parts: ["would have taken longer", "if Maya", "had not", "assisted"], distractor: "Maya does not assist" },
] satisfies readonly SourceDefinition[];

const SET16_SCORING = createScoring(16, TOEFL_BUILD_SENTENCE_SET16_V2, SET16_SOURCES, CONTENT_VERSION);

const SET17_SOURCES = [
  { context: "What is the alumni office offering?", replyPrefix: "It", replySuffix: ".", parts: ["is offering", "a mentoring program", "that pairs", "alumni with students"], distractor: "offering" },
  { context: "I need to visit the office. Can you check?", replyPrefix: "Could", replySuffix: "?", parts: ["you", "tell me", "when the office", "will reopen"], distractor: "told me" },
  { context: "Was the proposal accepted?", replyPrefix: "The proposal", replySuffix: ".", parts: ["that", "the committee reviewed", "was", "approved"], distractor: "were" },
  { context: "When will the conference sessions start?", replyPrefix: "They", replySuffix: ".", parts: ["will start", "once", "all the speakers", "arrive"], distractor: "arrives" },
  { context: "How does the digital copy compare with the printed one?", replyPrefix: "The digital copy", replySuffix: ".", parts: ["is", "easier to search", "than", "the printed one"], distractor: "are" },
  { context: "What did Marco do after speaking with his adviser?", replyPrefix: "He", replySuffix: ".", parts: ["corrected the form", "after", "his adviser", "noticed an error"], distractor: "correcting the form" },
  { context: "Why did the manager change the schedule?", replyPrefix: "The manager", replySuffix: ".", parts: ["changed the schedule", "because", "two employees", "were absent"], distractor: "changing the schedule" },
  { context: "Did you finish despite the difficult trail?", replyPrefix: "We", replySuffix: ".", parts: ["completed the hike", "even though", "the trail", "was steep"], distractor: "because of" },
  { context: "Which participants receive certificates?", replyPrefix: "Participants", replySuffix: ".", parts: ["who attend both sessions", "are", "given", "certificates"], distractor: "is" },
  { context: "Would anyone have attended without publicity?", replyPrefix: "The room", replySuffix: ".", parts: ["would have remained empty", "if the club", "had not", "advertised"], distractor: "the club does not advertise" },
] satisfies readonly SourceDefinition[];

const SET17_SCORING = createScoring(17, TOEFL_BUILD_SENTENCE_SET17_V2, SET17_SOURCES, CONTENT_VERSION);

const SET18_SOURCES = [
  { context: "What are you preparing for the laboratory?", replyPrefix: "We", replySuffix: ".", parts: ["are developing", "a guide", "that explains", "safety procedures"], distractor: "developing" },
  { context: "I cannot find the submission page. Can you help?", replyPrefix: "Could", replySuffix: "?", parts: ["you", "explain", "where I should upload", "the assignment"], distractor: "explained" },
  { context: "Was the collected evidence reliable?", replyPrefix: "The evidence", replySuffix: ".", parts: ["that", "the team collected", "was", "consistent"], distractor: "were" },
  { context: "When will you contact the repair office?", replyPrefix: "I", replySuffix: ".", parts: ["will call", "when", "the repair technician", "arrives"], distractor: "arrive" },
  { context: "How does this material compare with the original one?", replyPrefix: "This material", replySuffix: ".", parts: ["is", "more durable", "than", "the original one"], distractor: "are" },
  { context: "What did the researchers do after entering the value?", replyPrefix: "They", replySuffix: ".", parts: ["checked the calculation", "after", "entering", "the final value"], distractor: "checking the calculation" },
  { context: "Why did the organizer extend registration?", replyPrefix: "The organizer", replySuffix: ".", parts: ["extended registration", "because", "the website", "had failed"], distractor: "extending registration" },
  { context: "Did Lina keep the appointment despite the storm?", replyPrefix: "She", replySuffix: ".", parts: ["kept the appointment", "even though", "the weather", "was severe"], distractor: "because of" },
  { context: "Which applications are evaluated first?", replyPrefix: "Applicants", replySuffix: ".", parts: ["who include references", "are", "evaluated", "first"], distractor: "is" },
  { context: "Could the device have continued without charging?", replyPrefix: "The device", replySuffix: ".", parts: ["would have shut down", "if the battery", "had not been", "recharged"], distractor: "the battery had not recharge" },
] satisfies readonly SourceDefinition[];

const SET18_SCORING = createScoring(18, TOEFL_BUILD_SENTENCE_SET18_V2, SET18_SOURCES, CONTENT_VERSION);

const SET19_SOURCES = [
  { context: "What is the accessibility office creating?", replyPrefix: "It", replySuffix: ".", parts: ["is creating", "a map", "that marks", "accessible entrances"], distractor: "creating" },
  { context: "I plan to study this weekend. Can you check?", replyPrefix: "Could", replySuffix: "?", parts: ["you", "tell me", "whether the library", "is open Sunday"], distractor: "told me" },
  { context: "Could you enroll in your first choice?", replyPrefix: "The course", replySuffix: ".", parts: ["that", "I selected", "was", "already full"], distractor: "were" },
  { context: "When will the workshop begin?", replyPrefix: "We", replySuffix: ".", parts: ["will begin", "after", "everyone", "signs in"], distractor: "sign in" },
  { context: "How does this solution compare with the earlier plan?", replyPrefix: "This solution", replySuffix: ".", parts: ["is", "less costly", "than", "the earlier plan"], distractor: "are" },
  { context: "What did you do after checking the figures?", replyPrefix: "I", replySuffix: ".", parts: ["revised the budget", "after", "the accountant", "found an error"], distractor: "revising the budget" },
  { context: "Why did the team move the deadline?", replyPrefix: "The team", replySuffix: ".", parts: ["moved the deadline", "because", "the supplier", "delivered late"], distractor: "moving the deadline" },
  { context: "Why did Noah accept the invitation?", replyPrefix: "He", replySuffix: ".", parts: ["accepted the invitation", "even though", "he knew", "nobody there"], distractor: "because of" },
  { context: "Which employees are included in the survey?", replyPrefix: "Employees", replySuffix: ".", parts: ["who work remotely", "are", "included", "in the survey"], distractor: "is" },
  { context: "Could the trip have gone ahead if conditions changed?", replyPrefix: "The trip", replySuffix: ".", parts: ["would have been canceled", "if the road", "had remained", "closed"], distractor: "the road remains closed" },
] satisfies readonly SourceDefinition[];

const SET19_SCORING = createScoring(19, TOEFL_BUILD_SENTENCE_SET19_V2, SET19_SOURCES, CONTENT_VERSION);

const SET20_SOURCES = [
  { context: "What are they building for language learners?", replyPrefix: "They", replySuffix: ".", parts: ["are building", "a platform", "that matches", "tutors with learners"], distractor: "building" },
  { context: "I need to change my account details. Can you help?", replyPrefix: "Could", replySuffix: "?", parts: ["you", "show me", "how I can update", "my profile"], distractor: "showed me" },
  { context: "Was the requested report finished?", replyPrefix: "The report", replySuffix: ".", parts: ["that", "the director requested", "was", "ready"], distractor: "were" },
  { context: "When will you book the meeting room?", replyPrefix: "I", replySuffix: ".", parts: ["will reserve the room", "once", "the group", "confirms the date"], distractor: "confirm the date" },
  { context: "How does the new schedule compare with the current one?", replyPrefix: "The new schedule", replySuffix: ".", parts: ["is", "more convenient", "than", "the current one"], distractor: "are" },
  { context: "What did Zoe do after changing the slides?", replyPrefix: "She", replySuffix: ".", parts: ["backed up the files", "after", "editing", "the presentation"], distractor: "backing up the files" },
  { context: "Why did the school install new filters?", replyPrefix: "The school", replySuffix: ".", parts: ["installed new filters", "because", "the water quality", "had changed"], distractor: "installing new filters" },
  { context: "Did you continue using the older equipment?", replyPrefix: "We", replySuffix: ".", parts: ["used the old equipment", "even though", "it was", "inefficient"], distractor: "because of" },
  { context: "Which visitors enter the building first?", replyPrefix: "Visitors", replySuffix: ".", parts: ["who book ahead", "are", "admitted", "first"], distractor: "is" },
  { context: "Could the team have recovered its work?", replyPrefix: "The team", replySuffix: ".", parts: ["would have lost data", "if the server", "had not saved", "a copy"], distractor: "the server did not saved a copy" },
] satisfies readonly SourceDefinition[];

const SET20_SCORING = createScoring(20, TOEFL_BUILD_SENTENCE_SET20_V2, SET20_SOURCES, CONTENT_VERSION);

export const TOEFL_BUILD_SENTENCE_SCORING_SETS_16_TO_20 = Object.fromEntries([
  [TOEFL_BUILD_SENTENCE_SET16_V2.objectId, SET16_SCORING],
  [TOEFL_BUILD_SENTENCE_SET17_V2.objectId, SET17_SCORING],
  [TOEFL_BUILD_SENTENCE_SET18_V2.objectId, SET18_SCORING],
  [TOEFL_BUILD_SENTENCE_SET19_V2.objectId, SET19_SCORING],
  [TOEFL_BUILD_SENTENCE_SET20_V2.objectId, SET20_SCORING],
]) as Readonly<Record<string, {
  scoringVersion: string;
  disclosure: string;
  items: ToeflBuildSentenceScoringItem[];
}>>;
