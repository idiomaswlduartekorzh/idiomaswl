import type { MockExam } from './types';

// TOEFL iBT Set 3 — Writing completo (Integrated + Academic Discussion).
// Reading/Listening/Speaking quedan en construcción, igual que otros sets
// del catálogo (ver ielts-set-5..20). Contenido nuevo, no modifica sets
// existentes. Ver GOAL: Motor de corrección personalizado por examen.
const mock: MockExam = {
  id: 'set-3',
  examSlug: 'toefl',
  title: 'TOEFL iBT Set 3',
  subtitle: 'Writing: Standardized Testing · Foreign Language Requirements',
  timeMinutes: 50,
  sections: [

    // ─── READING — EN CONSTRUCCIÓN ───────────────────────────────────────────
    {
      part: 1,
      skill: 'reading',
      comingSoon: true,
      title: 'Reading — En Construcción',
      instructions: 'Esta sección estará disponible próximamente.',
      questions: [],
    },

    // ─── LISTENING — EN CONSTRUCCIÓN ─────────────────────────────────────────
    {
      part: 2,
      skill: 'listening',
      comingSoon: true,
      title: 'Listening — En Construcción',
      instructions: 'Esta sección estará disponible próximamente.',
      questions: [],
    },

    // ─── SPEAKING — EN CONSTRUCCIÓN ──────────────────────────────────────────
    {
      part: 3,
      skill: 'speaking',
      comingSoon: true,
      title: 'Speaking — En Construcción',
      instructions: 'Esta sección estará disponible próximamente.',
      questions: [],
    },

    // ─── WRITING ─────────────────────────────────────────────────────────────
    {
      part: 4,
      skill: 'writing',
      title: 'Writing Tasks',
      instructions: 'Complete both writing tasks.',
      questions: [
        {
          type: 'write',
          id: 't3-w1',
          part: 4,
          taskNumber: 1,
          stimulusLabel: 'Integrated Writing Task',
          stimulus: `Reading passage: Standardized admissions tests give universities three important advantages. First, they provide a single, consistent measure that allows the comparison of applicants from thousands of different high schools with different grading standards, making the admissions process fairer. Second, research has shown that standardized test scores are a reliable predictor of first-year college grades, helping admissions officers identify students who are prepared for college-level work. Third, strong test scores can help talented students from under-resourced schools stand out to admissions committees who might otherwise overlook their applications.

Lecture (listen and take notes): The professor challenges each of these claims. On fairness, she argues that access to expensive test-preparation courses and tutors is itself unevenly distributed by family income, so the test ends up reflecting a family's wealth as much as a student's ability. On predicting grades, she cites more recent research showing that high school GPA predicts first-year college performance at least as well as test scores, and does so without the same bias. On helping under-resourced students stand out, she points out that many highly selective universities have adopted test-optional policies specifically because they found the opposite effect: eliminating the test requirement increased, rather than decreased, applications and admissions from under-resourced schools.`,
          text: 'Summarize the points made in the lecture, explaining how they cast doubt on the specific points made in the reading passage. Write approximately 150–225 words.',
          minWords: 150,
        },
        {
          type: 'write',
          id: 't3-w2',
          part: 4,
          taskNumber: 2,
          stimulusLabel: 'Academic Discussion Task',
          stimulus: `Professor's prompt: "Your professor is teaching a class on higher education policy. Write a post responding to the following question:\n\nSome universities require students to study a foreign language in order to graduate, even if it is not related to their major. Do you think this requirement is a good use of students' time? Why or why not?"\n\nStudent A (Noah): I think the requirement makes sense. Learning a foreign language teaches you to think about grammar and communication in a completely different way, and that kind of cognitive flexibility is useful no matter what career you go into. It also opens doors — travel, work abroad, connecting with more people.\n\nStudent B (Ling): I disagree with making it mandatory. For students majoring in fields like computer science or engineering, those credit hours could instead go toward technical electives that are directly relevant to their careers. If someone is genuinely interested in a language, they'll choose to study it on their own; forcing everyone reduces motivation and often just produces a few memorized phrases that are forgotten within a year.`,
          text: 'Write a response of at least 100 words. Contribute your own perspective to the discussion, addressing points raised by your classmates where relevant.',
          minWords: 100,
        },
      ],
    },

  ],
};

export default mock;
