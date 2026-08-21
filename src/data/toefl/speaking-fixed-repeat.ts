export const TOEFL_FIXED_REPEAT_VERSION = '2026-08-14.fixed-v1';

export interface ToeflFixedRepeatExpansion {
  setNumber: number;
  itemNumber: 6 | 7;
  id: string;
  mediaId: string;
  plannedAudioUrl: string;
  mediaStatus: 'script-ready-audio-blocked';
  targetSentence: string;
  voiceRole: 'woman' | 'man';
}

function repeat(
  setNumber: number,
  itemNumber: 6 | 7,
  voiceRole: 'woman' | 'man',
  targetSentence: string,
): ToeflFixedRepeatExpansion {
  return {
    setNumber,
    itemNumber,
    id: `t${setNumber}-s-rp${itemNumber}`,
    mediaId: `media:toefl:set-${setNumber}:speaking-repeat-${itemNumber}`,
    plannedAudioUrl: `/audio/toefl/set-${setNumber}/repeat-${itemNumber}.mp3`,
    mediaStatus: 'script-ready-audio-blocked',
    targetSentence,
    voiceRole,
  };
}

export const TOEFL_FIXED_REPEAT_EXPANSIONS = [
  repeat(1, 6, 'woman', 'Students who need extra help can book a tutoring appointment through the learning center website.'),
  repeat(1, 7, 'man', 'Although the library will remain open during renovations, visitors should use the east entrance until the main doors reopen.'),
  repeat(2, 6, 'man', 'The campus shuttle now stops beside the residence hall every twenty minutes on weekday mornings.'),
  repeat(2, 7, 'woman', 'If you plan to attend the career workshop, please register online before Friday so the organizers can prepare enough materials.'),
  repeat(3, 6, 'woman', 'The science museum offers free admission to university students who present a valid identification card.'),
  repeat(3, 7, 'man', 'Because tomorrow’s lecture has moved to a larger room, everyone should check the updated location before class begins.'),
  repeat(4, 6, 'man', 'Please return borrowed laboratory equipment to the front desk before the building closes this evening.'),
  repeat(4, 7, 'woman', 'Students interested in the exchange program can meet former participants and ask questions at the information session next Tuesday.'),
  repeat(5, 6, 'woman', 'The dining hall added several vegetarian dishes after students shared suggestions in the spring survey.'),
  repeat(5, 7, 'man', 'While the athletic center is being repaired, all fitness classes will take place in the community hall across the street.'),
  repeat(6, 6, 'man', 'The writing center provides individual feedback on essays, reports, and other assignments throughout the semester.'),
  repeat(6, 7, 'woman', 'Anyone who reserved a study room must arrive within ten minutes, or the reservation may be offered to another group.'),
  repeat(7, 6, 'woman', 'New bicycle stations make it easier for students to travel between the main campus buildings.'),
  repeat(7, 7, 'man', 'Since parking will be limited during the festival, visitors are encouraged to take public transportation or use the free shuttle.'),
  repeat(8, 6, 'man', 'The student newspaper is looking for volunteers to photograph events and interview members of campus organizations.'),
  repeat(8, 7, 'woman', 'Before submitting the research proposal, each team should review the instructions carefully and confirm that every required section is included.'),
  repeat(9, 6, 'woman', 'The bookstore will extend its opening hours during the first week of the new semester.'),
  repeat(9, 7, 'man', 'Even though the outdoor concert is free, guests need to reserve a ticket because space in the garden is limited.'),
  repeat(10, 6, 'man', 'A technician will visit each classroom tomorrow to inspect the projectors and replace damaged cables.'),
  repeat(10, 7, 'woman', 'To reduce delays at the registration desk, students should complete the online form and bring a printed confirmation to their appointment.'),
  repeat(11, 6, 'woman', 'The environmental club organizes monthly cleanups along the river and welcomes volunteers from every department.'),
  repeat(11, 7, 'man', 'After the guest speaker finishes the presentation, audience members will have fifteen minutes to ask questions about the research.'),
  repeat(12, 6, 'man', 'The health center recommends scheduling routine appointments early because afternoons are usually the busiest time.'),
  repeat(12, 7, 'woman', 'Students who cannot attend the orientation in person may watch the recorded session and complete the required quiz online.'),
  repeat(13, 6, 'woman', 'The art department will display student projects in the lobby until the end of the month.'),
  repeat(13, 7, 'man', 'When the weather improves, the geology class will visit the nearby cliffs to collect samples and practice field observations.'),
  repeat(14, 6, 'man', 'Please place recyclable paper in the blue containers located beside the printers on every floor.'),
  repeat(14, 7, 'woman', 'Because several roads will close for the parade, commuters should allow extra travel time and follow the temporary signs downtown.'),
  repeat(15, 6, 'woman', 'The language club pairs new learners with conversation partners who share similar interests and schedules.'),
  repeat(15, 7, 'man', 'If the weather forecast changes overnight, the field trip coordinator will send an email before seven in the morning.'),
  repeat(16, 6, 'man', 'The computer lab installed new software that students can use for data analysis and graphic design.'),
  repeat(16, 7, 'woman', 'Although the assignment is due next week, the professor recommends starting early because the final section requires careful comparison of several sources.'),
  repeat(17, 6, 'woman', 'The music building has practice rooms available to students on a first-come, first-served basis.'),
  repeat(17, 7, 'man', 'Participants in the volunteer program will receive safety training before they begin working with children at the community center.'),
  repeat(18, 6, 'man', 'The advising office can help graduating students compare job offers and prepare for professional interviews.'),
  repeat(18, 7, 'woman', 'Whenever severe weather is expected, the university posts updates on its website and sends emergency alerts to registered phones.'),
  repeat(19, 6, 'woman', 'The new bus route connects the science campus with the library and the main residence halls.'),
  repeat(19, 7, 'man', 'Students presenting at the conference should test their slides in advance and arrive at the assigned room at least ten minutes early.'),
  repeat(20, 6, 'man', 'The community garden provides tools and seeds for volunteers who help maintain the shared planting areas.'),
  repeat(20, 7, 'woman', 'Before the semester ends, residents must remove personal belongings from shared storage spaces and return their room keys to the housing office.'),
] as const;

export const TOEFL_FIXED_REPEAT_BY_SET = Object.fromEntries(
  Array.from({ length: 20 }, (_, index) => {
    const setNumber = index + 1;
    return [setNumber, TOEFL_FIXED_REPEAT_EXPANSIONS.filter((entry) => entry.setNumber === setNumber)];
  }),
) as Readonly<Record<number, ToeflFixedRepeatExpansion[]>>;

// Runtime release gates. The repository audio guardian verifies that these IDs
// have exact audited files before a production build can succeed.
export const TOEFL_RELEASED_FIXED_REPEAT_MEDIA_IDS = new Set<string>(
  TOEFL_FIXED_REPEAT_EXPANSIONS.map((entry) => entry.mediaId),
);
export const TOEFL_RELEASED_FIXED_INTERVIEW_MEDIA_IDS = new Set<string>(
  Array.from({ length: 20 }, (_, setIndex) => Array.from(
    { length: 4 },
    (_, partIndex) => `media:toefl:set-${setIndex + 1}:speaking-interview-${partIndex + 1}`,
  )).flat(),
);
