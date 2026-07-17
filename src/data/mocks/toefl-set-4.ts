import type { MockExam } from './types';

// TOEFL iBT Set 4 — Writing completo (Integrated + Academic Discussion).
// Reading/Listening/Speaking quedan en construcción, igual que otros sets
// del catálogo (ver ielts-set-5..20). Contenido nuevo, no modifica sets
// existentes. Ver GOAL: Motor de corrección personalizado por examen.
const mock: MockExam = {
  id: 'set-4',
  examSlug: 'toefl',
  title: 'TOEFL iBT Set 4',
  subtitle: 'Writing: Renewable Microgrids · Remote Work Monitoring',
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
          id: 't4-w1',
          part: 4,
          taskNumber: 1,
          stimulusLabel: 'Integrated Writing Task',
          stimulus: `Reading passage: Solar-powered microgrids offer a promising solution for bringing electricity to rural communities that lack access to a national power grid. First, microgrids can be installed much faster than extending traditional transmission lines across long distances of difficult terrain, bringing power to remote villages within months rather than years. Second, because microgrids generate power locally, communities avoid the significant energy losses that occur when electricity travels long distances over conventional power lines. Third, several pilot projects in rural regions have reported that reliable electricity access led to measurable increases in local small business activity within the first two years.

Lecture (listen and take notes): The professor raises concerns about each of these points. On installation speed, she notes that while the physical equipment can be installed quickly, many pilot projects have been delayed for years by the slower process of training local technicians to maintain and repair the systems, a step the reading ignores entirely. On energy loss, she agrees that transmission losses are avoided, but argues that battery storage systems — needed to provide power at night — are expensive and degrade within five to ten years, creating a major replacement cost that is rarely factored into these comparisons. On business growth, she points out that the pilot studies cited did not include a control group of similar villages without microgrids, so the observed growth in business activity cannot be confidently attributed to the electricity access itself.`,
          text: 'Summarize the points made in the lecture, explaining how they cast doubt on the specific points made in the reading passage. Write approximately 150–225 words.',
          minWords: 150,
        },
        {
          type: 'write',
          id: 't4-w2',
          part: 4,
          taskNumber: 2,
          stimulusLabel: 'Academic Discussion Task',
          stimulus: `Professor's prompt: "Your professor is teaching a class on business management. Write a post responding to the following question:\n\nSome companies use software to monitor how productively remote employees are working, tracking things like keystrokes, mouse activity, and time spent on different applications. Do you think this kind of monitoring is a reasonable practice for employers? Why or why not?"\n\nStudent A (Emeka): I understand why companies want some accountability when they can't see employees in person, but this kind of tracking feels excessive to me. It measures activity, not actual output or quality of work, and constantly being watched creates stress that probably hurts performance more than it helps.\n\nStudent B (Hannah): I see it differently. If a company is paying a full salary, I think it's reasonable for them to want some evidence that people are actually working during business hours. The problem isn't monitoring itself, but companies using the data punitively instead of using it to identify employees who might need support or clearer expectations.`,
          text: 'Write a response of at least 100 words. Contribute your own perspective to the discussion, addressing points raised by your classmates where relevant.',
          minWords: 100,
        },
      ],
    },

  ],
};

export default mock;
