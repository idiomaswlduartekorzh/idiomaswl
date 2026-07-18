'use client';

import { IELTSWritingReportPanel } from '@/components/labs/IELTSWritingReportPanel';
import { useWritingAssessment } from '@/lib/labs/hooks/useWritingAssessment';

const TASK1_ESSAY = `The bar chart illustrates how many hours per week teenagers in Chester spent on seven leisure and study activities between 2002 and 2007.

Overall, watching television was the most popular activity throughout the period, but it stayed roughly flat at around 25 hours per week across all six years, while going to pubs and discos rose steadily from 8 hours in 2002 to 18 hours in 2007.

Shopping remained fairly stable, fluctuating between 11 and 15 hours, and doing homework showed a slight decline from 13 to around 7 hours. Doing sport also fell over the period, from 10 hours in 2002 to just 2 hours by 2007.

Watching DVDs peaked in the middle of the period at around 18 hours before falling back to 10 hours in 2007. In contrast, bowling was the only activity that increased consistently every year, rising from 4 hours in 2002 to a high of around 10 hours in 2007.

In summary, socialising activities such as going to pubs and bowling grew in popularity, while more sedentary or academic activities like sport and homework became less common among Chester teenagers.`;

const TASK2_ESSAY = `Nowadays, an increasing number of people across the world are choosing to live alone rather than with family or roommates. In my opinion, this trend brings both benefits and drawbacks, but overall it reflects a positive shift towards personal freedom and independence.

On one hand, living alone allows individuals to develop stronger decision-making skills and a deeper sense of self-reliance. When a person is responsible for their own household, they must learn to manage finances, solve problems, and organize their time without depending on others. This experience often leads to greater maturity and confidence in other areas of life, such as career and relationships.

Furthermore, living independently gives people the freedom to design their environment according to their own preferences, which can improve mental wellbeing. Many young professionals report feeling less stressed when they do not have to negotiate space or schedules with others. In cities where career opportunities are abundant, this flexibility can be essential for personal growth.

On the other hand, critics argue that living alone may increase feelings of loneliness, particularly among elderly people who lack regular social contact. Isolation has been linked to negative health outcomes, and this is a real concern that should not be ignored. However, this risk depends heavily on an individual's social habits rather than their living arrangement itself; someone who lives alone can still maintain an active social life through friends, community groups, and technology.

In conclusion, while there are valid concerns about isolation, I believe the growing trend of living alone is generally a positive development because it fosters independence and personal responsibility, provided that individuals make a conscious effort to stay socially connected.`;

export function IELTSReportPreviewClient() {
  const task1 = useWritingAssessment('ielts', 'set-1', 1, TASK1_ESSAY);
  const task2 = useWritingAssessment('ielts', 'set-1', 2, TASK2_ESSAY);

  return (
    <div className="space-y-8">
      <div className="border border-white/15 rounded-lg p-4 bg-white/[0.02]">
        <h2 className="text-sm font-semibold mb-3 text-white/70">Ensayo de prueba — Task 1 (con gráfico real de set-1)</h2>
        <IELTSWritingReportPanel
          examSlug="ielts"
          mockId="set-1"
          taskNumber={1}
          taskLabel="Writing — Task 1"
          essay={TASK1_ESSAY}
          fallbackNotice="Motor no disponible ahora mismo."
          state={task1.state}
          result={task1.result}
        />
      </div>

      <div className="border border-white/15 rounded-lg p-4 bg-white/[0.02]">
        <h2 className="text-sm font-semibold mb-3 text-white/70">Ensayo de prueba — Task 2</h2>
        <IELTSWritingReportPanel
          examSlug="ielts"
          mockId="set-1"
          taskNumber={2}
          taskLabel="Writing — Task 2"
          essay={TASK2_ESSAY}
          fallbackNotice="Motor no disponible ahora mismo."
          state={task2.state}
          result={task2.result}
        />
      </div>
    </div>
  );
}
