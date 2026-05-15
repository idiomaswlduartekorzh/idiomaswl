import type { MockExam } from './types';

const mock: MockExam = {
  id: 'mock-06',
  examSlug: 'icfes',
  title: 'Mock 6 · Trabajo y carrera',
  subtitle: 'Saber 11 · Componente de Inglés · 55 preguntas · 60 minutos',
  timeMinutes: 60,
  sections: [
    {
      part: 1,
      title: 'Parte 1 — Vocabulario: relacionar palabras',
      instructions: 'Match each word with its correct description.',
      questions: [
        {
          type: 'mcq',
          id: 'p1q1',
          part: 1,
          text: 'A formal meeting in which an employer asks a candidate questions to decide if they are suitable for a job.',
          options: ['Training', 'Interview', 'Contract', 'Reference'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q2',
          part: 1,
          text: 'A document listing a person\'s education, work experience, and skills, sent to employers when applying for a job.',
          options: ['Cover letter', 'Resume', 'Report', 'Payslip'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q3',
          part: 1,
          text: 'The fixed amount of money that an employee earns regularly, usually paid monthly.',
          options: ['Bonus', 'Fee', 'Salary', 'Commission'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p1q4',
          part: 1,
          text: 'Moving to a higher or more important position within a company.',
          options: ['Resignation', 'Promotion', 'Retirement', 'Transfer'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p1q5',
          part: 1,
          text: 'A person or company that hires people to work for them.',
          options: ['Colleague', 'Employee', 'Employer', 'Supervisor'],
          answer: 2,
        },
      ],
    },
    {
      part: 2,
      title: 'Parte 2 — Diálogos',
      instructions: 'Read each dialogue and choose the best response to complete it.',
      questions: [
        {
          type: 'dialog',
          id: 'p2q1',
          part: 2,
          stimulus: 'Interviewer: "Can you tell me about a challenge you faced at work and how you solved it?"\nCandidate: _______',
          text: 'What is the best response for the candidate?',
          options: [
            '"I usually prefer to avoid difficult situations."',
            '"In my last role, I managed a project with a tight deadline by organizing the team and prioritizing tasks."',
            '"I have not had any challenges in my career so far."',
            '"My previous employer was not very organized."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q2',
          part: 2,
          stimulus: 'Manager: "I need the sales report by Friday morning. Can you handle that?"\nEmployee: _______',
          text: 'What does the employee say?',
          options: [
            '"I already submitted the report last week."',
            '"Of course. I\'ll have it ready by Thursday afternoon so you can review it in advance."',
            '"I don\'t usually write reports."',
            '"The sales figures are not available yet."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q3',
          part: 2,
          stimulus: 'Colleague A: "Did you hear that the company is offering a new training program for digital skills?"\nColleague B: "Really? What does it cover?"\nColleague A: _______',
          text: 'What does Colleague A say?',
          options: [
            '"The cafeteria is on the ground floor."',
            '"It includes data analysis, spreadsheet tools, and basic programming."',
            '"I prefer learning from books."',
            '"The human resources office is down the hall."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q4',
          part: 2,
          stimulus: 'HR Manager: "We would like to offer you the position. When can you start?"\nApplicant: _______',
          text: 'What is the most professional response for the applicant?',
          options: [
            '"I am already working somewhere else."',
            '"Thank you so much! I can start on the first of next month, if that works for you."',
            '"I need to think about it for a few weeks."',
            '"What is the exact salary again?"',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q5',
          part: 2,
          stimulus: 'Employee: "I\'m not sure how to use the new project management software."\nSupervisor: _______',
          text: 'Which response is most helpful from the supervisor?',
          options: [
            '"You should have learned it before joining."',
            '"No worries. There\'s a tutorial on the company portal, and I can walk you through it tomorrow."',
            '"The IT department is on the fifth floor."',
            '"Everyone else figured it out on their own."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q6',
          part: 2,
          stimulus: 'Friend A: "I just got promoted to team leader! I\'m a little nervous about managing people."\nFriend B: _______',
          text: 'What does Friend B say?',
          options: [
            '"Team leaders earn less than regular employees."',
            '"That\'s great news! It\'s normal to feel nervous at first, but I\'m sure you\'ll do well."',
            '"Managing people is very stressful."',
            '"Why did they choose you?"',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q7',
          part: 2,
          stimulus: 'Recruiter: "Do you have any questions about the role or the company?"\nCandidate: _______',
          text: 'What does the candidate say?',
          options: [
            '"No, I know everything already."',
            '"Yes — could you tell me more about the team I would be working with and the opportunities for growth?"',
            '"What time does the office close?"',
            '"I would like a higher salary."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q8',
          part: 2,
          stimulus: 'Boss: "I noticed you\'ve been working late every day this week. Is everything all right?"\nEmployee: _______',
          text: 'What is the employee\'s most appropriate response?',
          options: [
            '"I prefer the office when it\'s quiet."',
            '"Thank you for asking. I\'ve been catching up on a backlog of tasks, but I\'m nearly finished."',
            '"I don\'t have anything to do at home."',
            '"The workload this week has been impossible."',
          ],
          answer: 1,
        },
        {
          type: 'dialog',
          id: 'p2q9',
          part: 2,
          stimulus: 'Coworker A: "Are you planning to apply for the new manager position?"\nCoworker B: "I\'m thinking about it, but I\'m not sure I have enough experience."\nCoworker A: _______',
          text: 'What does Coworker A say?',
          options: [
            '"I am applying too, so good luck to both of us."',
            '"You should just apply — you have been here for years and your work is excellent."',
            '"Management jobs are very stressful."',
            '"The deadline to apply is tomorrow."',
          ],
          answer: 1,
        },
      ],
    },
    {
      part: 3,
      title: 'Parte 3 — Completar oraciones',
      instructions: 'Choose the word or phrase that best completes each sentence.',
      questions: [
        {
          type: 'mcq',
          id: 'p3q1',
          part: 3,
          text: 'She _______ for the marketing position as soon as the job was posted online.',
          options: ['applied', 'applies', 'was applying', 'has apply'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q2',
          part: 3,
          text: 'The company offers flexible working hours _______ employees can manage their personal and professional lives more easily.',
          options: ['although', 'so that', 'because of', 'despite'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3q3',
          part: 3,
          text: 'By the time the new director arrives, the team _______ the project for six months.',
          options: ['will work', 'has worked', 'will have been working', 'worked'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p3q4',
          part: 3,
          text: 'His communication skills are excellent, which makes him very _______ for client-facing roles.',
          options: ['qualified', 'suitable', 'responsible', 'dedicated'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p3q5',
          part: 3,
          text: 'Employees who _______ professional development courses tend to advance more quickly in their careers.',
          options: ['attend', 'attending', 'attended', 'to attend'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q6',
          part: 3,
          text: 'The report must be _______ to the board of directors before the end of the quarter.',
          options: ['submitted', 'submitting', 'submit', 'submittal'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q7',
          part: 3,
          text: 'Working remotely requires strong self-discipline _______ there is no manager watching you.',
          options: ['because', 'unless', 'despite', 'although'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q8',
          part: 3,
          text: 'The HR department will _______ all applicants within two weeks of the application deadline.',
          options: ['contact', 'contacting', 'contacted', 'contacts'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'p3q9',
          part: 3,
          text: 'He _______ for three companies before finding a position that matched his skills and values.',
          options: ['has worked', 'works', 'had worked', 'was working'],
          answer: 2,
        },
      ],
    },
    {
      part: 4,
      title: 'Parte 4 — Comprensión visual',
      instructions: 'Read the notice or sign and answer the questions that follow.',
      questions: [
        {
          type: 'mcq',
          id: 'p4q1',
          part: 4,
          stimulus: '--- JOB POSTING ---\nCUSTOMER SERVICE REPRESENTATIVE\nDepartment: Sales Support\nContract: Full-time · Permanent\nSalary: $1,200 – $1,500/month (depending on experience)\nRequirements: B2 English level or higher · 1 year experience in customer service · Proficient in Microsoft Office\nBenefits: Health insurance · 15 days vacation per year · Remote work on Fridays\nDeadline to apply: June 30th\nSend CV and cover letter to: jobs@nexacorp.com',
          stimulusLabel: 'Read the job posting.',
          text: 'What documents must candidates send to apply?',
          options: [
            'A CV and a reference letter.',
            'A CV and a cover letter.',
            'An application form and a CV.',
            'A cover letter and a diploma.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q2',
          part: 4,
          stimulus: '--- JOB POSTING ---\nCUSTOMER SERVICE REPRESENTATIVE\nDepartment: Sales Support\nContract: Full-time · Permanent\nSalary: $1,200 – $1,500/month (depending on experience)\nRequirements: B2 English level or higher · 1 year experience in customer service · Proficient in Microsoft Office\nBenefits: Health insurance · 15 days vacation per year · Remote work on Fridays\nDeadline to apply: June 30th\nSend CV and cover letter to: jobs@nexacorp.com',
          stimulusLabel: 'Read the job posting.',
          text: 'Which benefit does the job offer related to work schedule?',
          options: [
            'Shorter working hours on Mondays.',
            'The option to work remotely on Fridays.',
            'A four-day work week.',
            'Flexible start and end times every day.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q3',
          part: 4,
          stimulus: 'WORKPLACE NOTICE\nAnnual Performance Reviews — November\nAll employees will meet with their direct manager during November for their annual performance review.\nPlease prepare:\n• A list of your main achievements this year\n• Your professional development goals for next year\n• Any questions or concerns you wish to discuss\nReview meetings will last 30–45 minutes. You will receive your specific time slot by email.',
          stimulusLabel: 'Read the workplace notice.',
          text: 'What must employees prepare for the performance review?',
          options: [
            'A written report about the company\'s financial results.',
            'A list of achievements, development goals, and questions.',
            'A presentation for the entire department.',
            'A summary of their team members\' performance.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q4',
          part: 4,
          stimulus: 'WORKPLACE NOTICE\nAnnual Performance Reviews — November\nAll employees will meet with their direct manager during November for their annual performance review.\nPlease prepare:\n• A list of your main achievements this year\n• Your professional development goals for next year\n• Any questions or concerns you wish to discuss\nReview meetings will last 30–45 minutes. You will receive your specific time slot by email.',
          stimulusLabel: 'Read the workplace notice.',
          text: 'How will employees find out when their review meeting is?',
          options: [
            'They will be told in person by their manager.',
            'They will receive a message by email.',
            'They will see it posted on the notice board.',
            'They must contact HR to book their slot.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q5',
          part: 4,
          stimulus: 'FREE WORKSHOP: WRITING A WINNING CV\nDate: Saturday, August 10th\nTime: 10:00 AM – 1:00 PM\nLocation: City Youth Employment Center, Room 3\nTopics covered:\n• How to structure your CV\n• What recruiters look for\n• Common mistakes to avoid\nOpen to all job seekers. Bring a printed copy of your current CV.\nRegister at: www.yecenter.org/cv-workshop',
          stimulusLabel: 'Read the workshop flyer.',
          text: 'What should participants bring to the workshop?',
          options: [
            'A pen and notebook.',
            'A printed copy of their current CV.',
            'A letter of recommendation.',
            'Their most recent academic certificate.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q6',
          part: 4,
          stimulus: 'FREE WORKSHOP: WRITING A WINNING CV\nDate: Saturday, August 10th\nTime: 10:00 AM – 1:00 PM\nLocation: City Youth Employment Center, Room 3\nTopics covered:\n• How to structure your CV\n• What recruiters look for\n• Common mistakes to avoid\nOpen to all job seekers. Bring a printed copy of your current CV.\nRegister at: www.yecenter.org/cv-workshop',
          stimulusLabel: 'Read the workshop flyer.',
          text: 'Who can attend the CV writing workshop?',
          options: [
            'Only recent university graduates.',
            'Employed professionals who want a promotion.',
            'All job seekers.',
            'People who have already attended a previous session.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q7',
          part: 4,
          stimulus: 'OFFICE POLICY — REMOTE WORK\nEmployees may work from home up to 2 days per week.\nRemote work days must be agreed with your team manager in advance.\nCore working hours (10:00 AM – 3:00 PM) must be observed on all days.\nAll remote workers must be reachable by phone and email during core hours.\nRemote work is not permitted during the first 3 months of employment.',
          stimulusLabel: 'Read the office policy.',
          text: 'How many days per week can employees work from home?',
          options: [
            'One day.',
            'Two days.',
            'Three days.',
            'Five days.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p4q8',
          part: 4,
          stimulus: 'OFFICE POLICY — REMOTE WORK\nEmployees may work from home up to 2 days per week.\nRemote work days must be agreed with your team manager in advance.\nCore working hours (10:00 AM – 3:00 PM) must be observed on all days.\nAll remote workers must be reachable by phone and email during core hours.\nRemote work is not permitted during the first 3 months of employment.',
          stimulusLabel: 'Read the office policy.',
          text: 'Which statement about the remote work policy is TRUE?',
          options: [
            'New employees can work remotely from their first day.',
            'Remote work days do not require manager approval.',
            'Employees cannot work remotely during their first three months.',
            'Remote workers are not required to be available during core hours.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p4q9',
          part: 4,
          stimulus: 'STAFF TRAINING DAY\nFriday, September 5th — Full day (8:30 AM – 5:00 PM)\nAll staff are required to attend.\nMorning: Communication Skills (Room A)\nAfternoon: Data Protection & Privacy (Room B)\nLunch provided in the staff canteen at 12:30 PM\nPlease confirm attendance by September 1st: training@company.com',
          stimulusLabel: 'Read the training day notice.',
          text: 'What will staff be doing in the afternoon session?',
          options: [
            'Practicing communication skills.',
            'Having lunch in the canteen.',
            'Learning about data protection and privacy.',
            'Meeting with their managers.',
          ],
          answer: 2,
        },
      ],
    },
    {
      part: 5,
      title: 'Parte 5 — Texto corto',
      instructions: 'Read the text and answer the questions.',
      questions: [
        {
          type: 'mcq',
          id: 'p5q1',
          part: 5,
          stimulus: `FutureReady: A Job Skills Program for Young Adults

FutureReady is a new vocational training program launched by the city of Medellín to prepare young adults between the ages of 18 and 25 for the modern job market. The program was created in response to high youth unemployment rates and the growing demand for skilled workers in sectors such as technology, logistics, and customer service.

Participants attend free training sessions three days a week for four months. The courses focus on practical skills, including digital tools, professional communication, teamwork, and financial literacy. At the end of the program, each participant receives a certificate recognized by over 50 local businesses.

FutureReady also connects participants with mentors — experienced professionals who offer career guidance and help students build their professional networks. In some cases, mentors hire participants directly after the program ends.

Since its launch eight months ago, FutureReady has trained over 600 young people, with 70% finding employment or starting their own businesses within three months of graduation. The city plans to expand the program to additional neighborhoods next year.`,
          stimulusLabel: 'Read the article.',
          text: 'What is the main goal of the FutureReady program?',
          options: [
            'To provide free university education to young adults.',
            'To help young adults between 18 and 25 develop job skills and find employment.',
            'To offer internships at international companies.',
            'To teach young people how to start large corporations.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q2',
          part: 5,
          stimulus: `FutureReady: A Job Skills Program for Young Adults

FutureReady is a new vocational training program launched by the city of Medellín to prepare young adults between the ages of 18 and 25 for the modern job market. The program was created in response to high youth unemployment rates and the growing demand for skilled workers in sectors such as technology, logistics, and customer service.

Participants attend free training sessions three days a week for four months. The courses focus on practical skills, including digital tools, professional communication, teamwork, and financial literacy. At the end of the program, each participant receives a certificate recognized by over 50 local businesses.

FutureReady also connects participants with mentors — experienced professionals who offer career guidance and help students build their professional networks. In some cases, mentors hire participants directly after the program ends.

Since its launch eight months ago, FutureReady has trained over 600 young people, with 70% finding employment or starting their own businesses within three months of graduation. The city plans to expand the program to additional neighborhoods next year.`,
          stimulusLabel: 'Read the article.',
          text: 'How long does the FutureReady program last?',
          options: [
            'Two months.',
            'Three months.',
            'Four months.',
            'One year.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q3',
          part: 5,
          stimulus: `FutureReady: A Job Skills Program for Young Adults

FutureReady is a new vocational training program launched by the city of Medellín to prepare young adults between the ages of 18 and 25 for the modern job market. The program was created in response to high youth unemployment rates and the growing demand for skilled workers in sectors such as technology, logistics, and customer service.

Participants attend free training sessions three days a week for four months. The courses focus on practical skills, including digital tools, professional communication, teamwork, and financial literacy. At the end of the program, each participant receives a certificate recognized by over 50 local businesses.

FutureReady also connects participants with mentors — experienced professionals who offer career guidance and help students build their professional networks. In some cases, mentors hire participants directly after the program ends.

Since its launch eight months ago, FutureReady has trained over 600 young people, with 70% finding employment or starting their own businesses within three months of graduation. The city plans to expand the program to additional neighborhoods next year.`,
          stimulusLabel: 'Read the article.',
          text: 'What role do mentors play in the FutureReady program?',
          options: [
            'They teach the formal training courses three days a week.',
            'They give career guidance and help participants build their networks.',
            'They evaluate participants and award the final certificates.',
            'They provide financial support to program graduates.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q4',
          part: 5,
          stimulus: `FutureReady: A Job Skills Program for Young Adults

FutureReady is a new vocational training program launched by the city of Medellín to prepare young adults between the ages of 18 and 25 for the modern job market. The program was created in response to high youth unemployment rates and the growing demand for skilled workers in sectors such as technology, logistics, and customer service.

Participants attend free training sessions three days a week for four months. The courses focus on practical skills, including digital tools, professional communication, teamwork, and financial literacy. At the end of the program, each participant receives a certificate recognized by over 50 local businesses.

FutureReady also connects participants with mentors — experienced professionals who offer career guidance and help students build their professional networks. In some cases, mentors hire participants directly after the program ends.

Since its launch eight months ago, FutureReady has trained over 600 young people, with 70% finding employment or starting their own businesses within three months of graduation. The city plans to expand the program to additional neighborhoods next year.`,
          stimulusLabel: 'Read the article.',
          text: 'What percentage of graduates found employment or started businesses within three months?',
          options: [
            '50%',
            '60%',
            '70%',
            '80%',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q5',
          part: 5,
          stimulus: `FutureReady: A Job Skills Program for Young Adults

FutureReady is a new vocational training program launched by the city of Medellín to prepare young adults between the ages of 18 and 25 for the modern job market. The program was created in response to high youth unemployment rates and the growing demand for skilled workers in sectors such as technology, logistics, and customer service.

Participants attend free training sessions three days a week for four months. The courses focus on practical skills, including digital tools, professional communication, teamwork, and financial literacy. At the end of the program, each participant receives a certificate recognized by over 50 local businesses.

FutureReady also connects participants with mentors — experienced professionals who offer career guidance and help students build their professional networks. In some cases, mentors hire participants directly after the program ends.

Since its launch eight months ago, FutureReady has trained over 600 young people, with 70% finding employment or starting their own businesses within three months of graduation. The city plans to expand the program to additional neighborhoods next year.`,
          stimulusLabel: 'Read the article.',
          text: 'The word "vocational" most likely refers to training that is:',
          options: [
            'Related to academic research and theory.',
            'Focused on practical skills for a specific career or trade.',
            'Designed for university professors.',
            'Intended only for people who already have jobs.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q6',
          part: 5,
          stimulus: `FutureReady: A Job Skills Program for Young Adults

FutureReady is a new vocational training program launched by the city of Medellín to prepare young adults between the ages of 18 and 25 for the modern job market. The program was created in response to high youth unemployment rates and the growing demand for skilled workers in sectors such as technology, logistics, and customer service.

Participants attend free training sessions three days a week for four months. The courses focus on practical skills, including digital tools, professional communication, teamwork, and financial literacy. At the end of the program, each participant receives a certificate recognized by over 50 local businesses.

FutureReady also connects participants with mentors — experienced professionals who offer career guidance and help students build their professional networks. In some cases, mentors hire participants directly after the program ends.

Since its launch eight months ago, FutureReady has trained over 600 young people, with 70% finding employment or starting their own businesses within three months of graduation. The city plans to expand the program to additional neighborhoods next year.`,
          stimulusLabel: 'Read the article.',
          text: 'Why was the FutureReady program created, according to the text?',
          options: [
            'Because the city wanted to attract foreign companies.',
            'Because local universities lacked enough places for students.',
            'In response to high youth unemployment and the need for skilled workers.',
            'Because young adults asked the government for free job training.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q7',
          part: 5,
          stimulus: `FutureReady: A Job Skills Program for Young Adults

FutureReady is a new vocational training program launched by the city of Medellín to prepare young adults between the ages of 18 and 25 for the modern job market. The program was created in response to high youth unemployment rates and the growing demand for skilled workers in sectors such as technology, logistics, and customer service.

Participants attend free training sessions three days a week for four months. The courses focus on practical skills, including digital tools, professional communication, teamwork, and financial literacy. At the end of the program, each participant receives a certificate recognized by over 50 local businesses.

FutureReady also connects participants with mentors — experienced professionals who offer career guidance and help students build their professional networks. In some cases, mentors hire participants directly after the program ends.

Since its launch eight months ago, FutureReady has trained over 600 young people, with 70% finding employment or starting their own businesses within three months of graduation. The city plans to expand the program to additional neighborhoods next year.`,
          stimulusLabel: 'Read the article.',
          text: 'What is the city\'s plan for FutureReady in the future?',
          options: [
            'To charge participants a small fee to make it sustainable.',
            'To reduce the length of the program to two months.',
            'To expand it to more neighborhoods.',
            'To partner with international universities.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p5q8',
          part: 5,
          stimulus: `FutureReady: A Job Skills Program for Young Adults

FutureReady is a new vocational training program launched by the city of Medellín to prepare young adults between the ages of 18 and 25 for the modern job market. The program was created in response to high youth unemployment rates and the growing demand for skilled workers in sectors such as technology, logistics, and customer service.

Participants attend free training sessions three days a week for four months. The courses focus on practical skills, including digital tools, professional communication, teamwork, and financial literacy. At the end of the program, each participant receives a certificate recognized by over 50 local businesses.

FutureReady also connects participants with mentors — experienced professionals who offer career guidance and help students build their professional networks. In some cases, mentors hire participants directly after the program ends.

Since its launch eight months ago, FutureReady has trained over 600 young people, with 70% finding employment or starting their own businesses within three months of graduation. The city plans to expand the program to additional neighborhoods next year.`,
          stimulusLabel: 'Read the article.',
          text: 'How is the FutureReady certificate useful to graduates?',
          options: [
            'It allows them to enroll in university without an entrance exam.',
            'It is recognized by over 50 local businesses.',
            'It gives them priority for government jobs.',
            'It qualifies them to become mentors in the program.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p5q9',
          part: 5,
          stimulus: `FutureReady: A Job Skills Program for Young Adults

FutureReady is a new vocational training program launched by the city of Medellín to prepare young adults between the ages of 18 and 25 for the modern job market. The program was created in response to high youth unemployment rates and the growing demand for skilled workers in sectors such as technology, logistics, and customer service.

Participants attend free training sessions three days a week for four months. The courses focus on practical skills, including digital tools, professional communication, teamwork, and financial literacy. At the end of the program, each participant receives a certificate recognized by over 50 local businesses.

FutureReady also connects participants with mentors — experienced professionals who offer career guidance and help students build their professional networks. In some cases, mentors hire participants directly after the program ends.

Since its launch eight months ago, FutureReady has trained over 600 young people, with 70% finding employment or starting their own businesses within three months of graduation. The city plans to expand the program to additional neighborhoods next year.`,
          stimulusLabel: 'Read the article.',
          text: 'What can be inferred about FutureReady from the information in the text?',
          options: [
            'The program has not yet produced any successful graduates.',
            'The program is too expensive for most young adults to attend.',
            'The program has been effective at helping young adults enter the workforce.',
            'The program only helps people who want to work in technology.',
          ],
          answer: 2,
        },
      ],
    },
    {
      part: 6,
      title: 'Parte 6 — Texto largo: inferencia',
      instructions: 'Read the longer text carefully and answer the questions. Use inference and context clues.',
      questions: [
        {
          type: 'mcq',
          id: 'p6q1',
          part: 6,
          stimulus: `Remote Work: A New Era for Work-Life Balance?

Before 2020, working from home was a privilege enjoyed by a small minority of professionals. Most people commuted to offices every day, following rigid schedules and separating their professional and personal lives with a clear physical boundary. Then, almost overnight, the COVID-19 pandemic forced millions of workers around the world into their homes — and the world of work was never the same again.

The sudden shift to remote work revealed something surprising: many jobs that had always been done in offices could be performed just as effectively — or even more so — from home. Studies conducted during and after the pandemic found that remote workers often reported higher levels of productivity, reduced commuting stress, and greater overall satisfaction with their lives.

The benefits are real. Without daily commutes, workers save hours every week that can be spent on family, hobbies, exercise, or rest. Many companies report lower overhead costs from reduced office space. Employees with caregiving responsibilities — particularly parents of young children and those caring for elderly relatives — have found that flexible remote work allows them to better balance competing demands.

However, the remote work revolution has not been without its challenges. Many employees struggle with feelings of isolation, missing the spontaneous conversations and social connections that the office naturally provided. The boundaries between work and personal life can become blurred, with some workers finding it difficult to "switch off" at the end of the day. There is also the issue of equity: remote work is available mainly to knowledge workers with desk jobs, while those in healthcare, retail, construction, and manufacturing have no option to work from home.

Managers have had to adapt too. Leading a remote team requires different skills — trust, clear communication, and outcome-focused evaluation replace the old model of measuring performance by physical presence. Companies that have struggled with this transition often report lower team cohesion and coordination problems.

Looking ahead, most experts predict a hybrid model — a combination of remote and in-office work — will become the standard in many industries. This approach aims to capture the flexibility of remote work while preserving the social and collaborative benefits of the office. Whether it truly resolves the work-life balance question depends, ultimately, on how well both companies and employees navigate this new era.`,
          stimulusLabel: 'Read the article.',
          text: 'What is the main idea of this text?',
          options: [
            'The COVID-19 pandemic caused massive job losses around the world.',
            'Remote work has brought both significant benefits and important challenges to the world of work.',
            'Office environments are always better for worker productivity than home environments.',
            'Most companies plan to close their offices permanently after the pandemic.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q2',
          part: 6,
          stimulus: `Remote Work: A New Era for Work-Life Balance?

Before 2020, working from home was a privilege enjoyed by a small minority of professionals. Most people commuted to offices every day, following rigid schedules and separating their professional and personal lives with a clear physical boundary. Then, almost overnight, the COVID-19 pandemic forced millions of workers around the world into their homes — and the world of work was never the same again.

The sudden shift to remote work revealed something surprising: many jobs that had always been done in offices could be performed just as effectively — or even more so — from home. Studies conducted during and after the pandemic found that remote workers often reported higher levels of productivity, reduced commuting stress, and greater overall satisfaction with their lives.

The benefits are real. Without daily commutes, workers save hours every week that can be spent on family, hobbies, exercise, or rest. Many companies report lower overhead costs from reduced office space. Employees with caregiving responsibilities — particularly parents of young children and those caring for elderly relatives — have found that flexible remote work allows them to better balance competing demands.

However, the remote work revolution has not been without its challenges. Many employees struggle with feelings of isolation, missing the spontaneous conversations and social connections that the office naturally provided. The boundaries between work and personal life can become blurred, with some workers finding it difficult to "switch off" at the end of the day. There is also the issue of equity: remote work is available mainly to knowledge workers with desk jobs, while those in healthcare, retail, construction, and manufacturing have no option to work from home.

Managers have had to adapt too. Leading a remote team requires different skills — trust, clear communication, and outcome-focused evaluation replace the old model of measuring performance by physical presence. Companies that have struggled with this transition often report lower team cohesion and coordination problems.

Looking ahead, most experts predict a hybrid model — a combination of remote and in-office work — will become the standard in many industries. This approach aims to capture the flexibility of remote work while preserving the social and collaborative benefits of the office. Whether it truly resolves the work-life balance question depends, ultimately, on how well both companies and employees navigate this new era.`,
          stimulusLabel: 'Read the article.',
          text: 'According to the text, what did studies about remote work reveal?',
          options: [
            'Working from home always reduces productivity.',
            'Remote workers are more likely to quit their jobs.',
            'Remote workers often reported higher productivity and greater life satisfaction.',
            'Most workers preferred to return to the office immediately after the pandemic.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q3',
          part: 6,
          stimulus: `Remote Work: A New Era for Work-Life Balance?

Before 2020, working from home was a privilege enjoyed by a small minority of professionals. Most people commuted to offices every day, following rigid schedules and separating their professional and personal lives with a clear physical boundary. Then, almost overnight, the COVID-19 pandemic forced millions of workers around the world into their homes — and the world of work was never the same again.

The sudden shift to remote work revealed something surprising: many jobs that had always been done in offices could be performed just as effectively — or even more so — from home. Studies conducted during and after the pandemic found that remote workers often reported higher levels of productivity, reduced commuting stress, and greater overall satisfaction with their lives.

The benefits are real. Without daily commutes, workers save hours every week that can be spent on family, hobbies, exercise, or rest. Many companies report lower overhead costs from reduced office space. Employees with caregiving responsibilities — particularly parents of young children and those caring for elderly relatives — have found that flexible remote work allows them to better balance competing demands.

However, the remote work revolution has not been without its challenges. Many employees struggle with feelings of isolation, missing the spontaneous conversations and social connections that the office naturally provided. The boundaries between work and personal life can become blurred, with some workers finding it difficult to "switch off" at the end of the day. There is also the issue of equity: remote work is available mainly to knowledge workers with desk jobs, while those in healthcare, retail, construction, and manufacturing have no option to work from home.

Managers have had to adapt too. Leading a remote team requires different skills — trust, clear communication, and outcome-focused evaluation replace the old model of measuring performance by physical presence. Companies that have struggled with this transition often report lower team cohesion and coordination problems.

Looking ahead, most experts predict a hybrid model — a combination of remote and in-office work — will become the standard in many industries. This approach aims to capture the flexibility of remote work while preserving the social and collaborative benefits of the office. Whether it truly resolves the work-life balance question depends, ultimately, on how well both companies and employees navigate this new era.`,
          stimulusLabel: 'Read the article.',
          text: 'Which group does the text say has particularly benefited from remote work?',
          options: [
            'Managers who oversee large teams.',
            'Workers in construction and manufacturing.',
            'Employees with caregiving responsibilities.',
            'People who do not own a computer.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q4',
          part: 6,
          stimulus: `Remote Work: A New Era for Work-Life Balance?

Before 2020, working from home was a privilege enjoyed by a small minority of professionals. Most people commuted to offices every day, following rigid schedules and separating their professional and personal lives with a clear physical boundary. Then, almost overnight, the COVID-19 pandemic forced millions of workers around the world into their homes — and the world of work was never the same again.

The sudden shift to dream work revealed something surprising: many jobs that had always been done in offices could be performed just as effectively — or even more so — from home. Studies conducted during and after the pandemic found that remote workers often reported higher levels of productivity, reduced commuting stress, and greater overall satisfaction with their lives.

The benefits are real. Without daily commutes, workers save hours every week that can be spent on family, hobbies, exercise, or rest. Many companies report lower overhead costs from reduced office space. Employees with caregiving responsibilities — particularly parents of young children and those caring for elderly relatives — have found that flexible remote work allows them to better balance competing demands.

However, the remote work revolution has not been without its challenges. Many employees struggle with feelings of isolation, missing the spontaneous conversations and social connections that the office naturally provided. The boundaries between work and personal life can become blurred, with some workers finding it difficult to "switch off" at the end of the day. There is also the issue of equity: remote work is available mainly to knowledge workers with desk jobs, while those in healthcare, retail, construction, and manufacturing have no option to work from home.

Managers have had to adapt too. Leading a remote team requires different skills — trust, clear communication, and outcome-focused evaluation replace the old model of measuring performance by physical presence. Companies that have struggled with this transition often report lower team cohesion and coordination problems.

Looking ahead, most experts predict a hybrid model — a combination of remote and in-office work — will become the standard in many industries. This approach aims to capture the flexibility of remote work while preserving the social and collaborative benefits of the office. Whether it truly resolves the work-life balance question depends, ultimately, on how well both companies and employees navigate this new era.`,
          stimulusLabel: 'Read the article.',
          text: 'What does the text say is an equity problem with remote work?',
          options: [
            'Remote workers are paid more than office workers.',
            'Not all workers can work remotely, as some jobs require physical presence.',
            'Remote work benefits only the youngest employees.',
            'Companies spend too much money on home office equipment.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q5',
          part: 6,
          stimulus: `Remote Work: A New Era for Work-Life Balance?

Before 2020, working from home was a privilege enjoyed by a small minority of professionals. Most people commuted to offices every day, following rigid schedules and separating their professional and personal lives with a clear physical boundary. Then, almost overnight, the COVID-19 pandemic forced millions of workers around the world into their homes — and the world of work was never the same again.

The sudden shift to remote work revealed something surprising: many jobs that had always been done in offices could be performed just as effectively — or even more so — from home. Studies conducted during and after the pandemic found that remote workers often reported higher levels of productivity, reduced commuting stress, and greater overall satisfaction with their lives.

The benefits are real. Without daily commutes, workers save hours every week that can be spent on family, hobbies, exercise, or rest. Many companies report lower overhead costs from reduced office space. Employees with caregiving responsibilities — particularly parents of young children and those caring for elderly relatives — have found that flexible remote work allows them to better balance competing demands.

However, the remote work revolution has not been without its challenges. Many employees struggle with feelings of isolation, missing the spontaneous conversations and social connections that the office naturally provided. The boundaries between work and personal life can become blurred, with some workers finding it difficult to "switch off" at the end of the day. There is also the issue of equity: remote work is available mainly to knowledge workers with desk jobs, while those in healthcare, retail, construction, and manufacturing have no option to work from home.

Managers have had to adapt too. Leading a remote team requires different skills — trust, clear communication, and outcome-focused evaluation replace the old model of measuring performance by physical presence. Companies that have struggled with this transition often report lower team cohesion and coordination problems.

Looking ahead, most experts predict a hybrid model — a combination of remote and in-office work — will become the standard in many industries. This approach aims to capture the flexibility of remote work while preserving the social and collaborative benefits of the office. Whether it truly resolves the work-life balance question depends, ultimately, on how well both companies and employees navigate this new era.`,
          stimulusLabel: 'Read the article.',
          text: 'How has management of remote teams changed, according to the text?',
          options: [
            'Managers now need to monitor employees more closely.',
            'Management now relies on trust, clear communication, and evaluating results rather than physical presence.',
            'Companies have hired more managers to supervise remote workers.',
            'Managers are no longer required in companies with remote workers.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p6q6',
          part: 6,
          stimulus: `Remote Work: A New Era for Work-Life Balance?

Before 2020, working from home was a privilege enjoyed by a small minority of professionals. Most people commuted to offices every day, following rigid schedules and separating their professional and personal lives with a clear physical boundary. Then, almost overnight, the COVID-19 pandemic forced millions of workers around the world into their homes — and the world of work was never the same again.

The sudden shift to remote work revealed something surprising: many jobs that had always been done in offices could be performed just as effectively — or even more so — from home. Studies conducted during and after the pandemic found that remote workers often reported higher levels of productivity, reduced commuting stress, and greater overall satisfaction with their lives.

The benefits are real. Without daily commutes, workers save hours every week that can be spent on family, hobbies, exercise, or rest. Many companies report lower overhead costs from reduced office space. Employees with caregiving responsibilities — particularly parents of young children and those caring for elderly relatives — have found that flexible remote work allows them to better balance competing demands.

However, the remote work revolution has not been without its challenges. Many employees struggle with feelings of isolation, missing the spontaneous conversations and social connections that the office naturally provided. The boundaries between work and personal life can become blurred, with some workers finding it difficult to "switch off" at the end of the day. There is also the issue of equity: remote work is available mainly to knowledge workers with desk jobs, while those in healthcare, retail, construction, and manufacturing have no option to work from home.

Managers have had to adapt too. Leading a remote team requires different skills — trust, clear communication, and outcome-focused evaluation replace the old model of measuring performance by physical presence. Companies that have struggled with this transition often report lower team cohesion and coordination problems.

Looking ahead, most experts predict a hybrid model — a combination of remote and in-office work — will become the standard in many industries. This approach aims to capture the flexibility of remote work while preserving the social and collaborative benefits of the office. Whether it truly resolves the work-life balance question depends, ultimately, on how well both companies and employees navigate this new era.`,
          stimulusLabel: 'Read the article.',
          text: 'What future work model do most experts predict will become standard?',
          options: [
            'Fully remote work for all industries.',
            'A return to full-time office work.',
            'A hybrid model combining remote and in-office work.',
            'Shorter working weeks with longer working hours each day.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p6q7',
          part: 6,
          stimulus: `Remote Work: A New Era for Work-Life Balance?

Before 2020, working from home was a privilege enjoyed by a small minority of professionals. Most people commuted to offices every day, following rigid schedules and separating their professional and personal lives with a clear physical boundary. Then, almost overnight, the COVID-19 pandemic forced millions of workers around the world into their homes — and the world of work was never the same again.

The sudden shift to remote work revealed something surprising: many jobs that had always been done in offices could be performed just as effectively — or even more so — from home. Studies conducted during and after the pandemic found that remote workers often reported higher levels of productivity, reduced commuting stress, and greater overall satisfaction with their lives.

The benefits are real. Without daily commutes, workers save hours every week that can be spent on family, hobbies, exercise, or rest. Many companies report lower overhead costs from reduced office space. Employees with caregiving responsibilities — particularly parents of young children and those caring for elderly relatives — have found that flexible remote work allows them to better balance competing demands.

However, the remote work revolution has not been without its challenges. Many employees struggle with feelings of isolation, missing the spontaneous conversations and social connections that the office naturally provided. The boundaries between work and personal life can become blurred, with some workers finding it difficult to "switch off" at the end of the day. There is also the issue of equity: remote work is available mainly to knowledge workers with desk jobs, while those in healthcare, retail, construction, and manufacturing have no option to work from home.

Managers have had to adapt too. Leading a remote team requires different skills — trust, clear communication, and outcome-focused evaluation replace the old model of measuring performance by physical presence. Companies that have struggled with this transition often report lower team cohesion and coordination problems.

Looking ahead, most experts predict a hybrid model — a combination of remote and in-office work — will become the standard in many industries. This approach aims to capture the flexibility of remote work while preserving the social and collaborative benefits of the office. Whether it truly resolves the work-life balance question depends, ultimately, on how well both companies and employees navigate this new era.`,
          stimulusLabel: 'Read the article.',
          text: 'The phrase "boundaries between work and personal life can become blurred" suggests that remote workers:',
          options: [
            'Work in spaces that are too small for their needs.',
            'Find it hard to clearly separate their working time from their personal time.',
            'Often break company rules about working hours.',
            'Prefer working at night rather than during the day.',
          ],
          answer: 1,
        },
      ],
    },
    {
      part: 7,
      title: 'Parte 7 — Texto de opinion',
      instructions: "Read the opinion text and answer the questions about the author's argument.",
      questions: [
        {
          type: 'mcq',
          id: 'p7q1',
          part: 7,
          stimulus: `Is a University Degree Still the Key to Career Success?

For decades, a university degree was seen as the golden ticket to a successful career. Employers expected it, parents demanded it, and society rewarded it. But in today's rapidly changing job market, I believe we need to seriously question whether a degree is still necessary — or whether it has become an expensive and outdated requirement.

The evidence for change is compelling. Some of the most successful companies in the world, including Google, Apple, and IBM, have publicly removed degree requirements from many of their job listings. What matters to them now is demonstrated skill and the ability to solve real problems — not the name of the institution you attended or the paper on your wall. As technology reshapes entire industries, adaptability and continuous learning have become more valuable than a four-year academic program that may teach skills already obsolete by graduation.

The financial argument is also significant. In many countries, a university degree comes with enormous debt, taking graduates years or even decades to repay. For a young person from a low-income family, this debt can be financially crippling. Meanwhile, alternative pathways — technical certifications, online courses, bootcamps, and apprenticeships — can deliver job-ready skills in months at a fraction of the cost.

Of course, there are fields where a degree remains not just valuable but essential. Medicine, law, engineering, and research are built on specialized knowledge that requires years of rigorous academic study. And beyond pure career outcomes, university offers intellectual growth, diverse social experiences, and lifelong networks that are genuinely difficult to replicate elsewhere.

But for the vast majority of careers — in business, technology, marketing, design, and beyond — the obsession with degrees is holding talented people back. We must expand our definition of what qualifies someone for a job. Talent, drive, and demonstrated skill should matter more than a certificate. The future belongs to lifelong learners, not just degree holders.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'What is the author\'s main position in this article?',
          options: [
            'University degrees are essential for all careers.',
            'A university degree is no longer necessary for most careers, and alternatives should be valued more.',
            'Online courses are better than university degrees in every respect.',
            'Only students from wealthy families should go to university.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q2',
          part: 7,
          stimulus: `Is a University Degree Still the Key to Career Success?

For decades, a university degree was seen as the golden ticket to a successful career. Employers expected it, parents demanded it, and society rewarded it. But in today's rapidly changing job market, I believe we need to seriously question whether a degree is still necessary — or whether it has become an expensive and outdated requirement.

The evidence for change is compelling. Some of the most successful companies in the world, including Google, Apple, and IBM, have publicly removed degree requirements from many of their job listings. What matters to them now is demonstrated skill and the ability to solve real problems — not the name of the institution you attended or the paper on your wall. As technology reshapes entire industries, adaptability and continuous learning have become more valuable than a four-year academic program that may teach skills already obsolete by graduation.

The financial argument is also significant. In many countries, a university degree comes with enormous debt, taking graduates years or even decades to repay. In many countries, a university degree comes with enormous debt, taking graduates years or even decades to repay. For a young person from a low-income family, this debt can be financially crippling. Meanwhile, alternative pathways — technical certifications, online courses, bootcamps, and apprenticeships — can deliver job-ready skills in months at a fraction of the cost.

Of course, there are fields where a degree remains not just valuable but essential. Medicine, law, engineering, and research are built on specialized knowledge that requires years of rigorous academic study. And beyond pure career outcomes, university offers intellectual growth, diverse social experiences, and lifelong networks that are genuinely difficult to replicate elsewhere.

But for the vast majority of careers — in business, technology, marketing, design, and beyond — the obsession with degrees is holding talented people back. We must expand our definition of what qualifies someone for a job. Talent, drive, and demonstrated skill should matter more than a certificate. The future belongs to lifelong learners, not just degree holders.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'Why does the author mention Google, Apple, and IBM?',
          options: [
            'To show that technology companies pay the highest salaries.',
            'To demonstrate that leading employers no longer always require degrees.',
            'To argue that these companies offer the best graduate programs.',
            'To claim that only technology jobs are available without a degree.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q3',
          part: 7,
          stimulus: `Is a University Degree Still the Key to Career Success?

For decades, a university degree was seen as the golden ticket to a successful career. Employers expected it, parents demanded it, and society rewarded it. But in today's rapidly changing job market, I believe we need to seriously question whether a degree is still necessary — or whether it has become an expensive and outdated requirement.

The evidence for change is compelling. Some of the most successful companies in the world, including Google, Apple, and IBM, have publicly removed degree requirements from many of their job listings. What matters to them now is demonstrated skill and the ability to solve real problems — not the name of the institution you attended or the paper on your wall. As technology reshapes entire industries, adaptability and continuous learning have become more valuable than a four-year academic program that may teach skills already obsolete by graduation.

The financial argument is also significant. In many countries, a university degree comes with enormous debt, taking graduates years or even decades to repay. For a young person from a low-income family, this debt can be financially crippling. Meanwhile, alternative pathways — technical certifications, online courses, bootcamps, and apprenticeships — can deliver job-ready skills in months at a fraction of the cost.

Of course, there are fields where a degree remains not just valuable but essential. Medicine, law, engineering, and research are built on specialized knowledge that requires years of rigorous academic study. And beyond pure career outcomes, university offers intellectual growth, diverse social experiences, and lifelong networks that are genuinely difficult to replicate elsewhere.

But for the vast majority of careers — in business, technology, marketing, design, and beyond — the obsession with degrees is holding talented people back. We must expand our definition of what qualifies someone for a job. Talent, drive, and demonstrated skill should matter more than a certificate. The future belongs to lifelong learners, not just degree holders.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'According to the author, what financial risk comes with a university degree?',
          options: [
            'Students waste money on unnecessary courses.',
            'Graduates often earn less than workers without degrees.',
            'A degree can lead to years or decades of debt.',
            'Universities charge hidden fees that are difficult to predict.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q4',
          part: 7,
          stimulus: `Is a University Degree Still the Key to Career Success?

For decades, a university degree was seen as the golden ticket to a successful career. Employers expected it, parents demanded it, and society rewarded it. But in today's rapidly changing job market, I believe we need to seriously question whether a degree is still necessary — or whether it has become an expensive and outdated requirement.

The evidence for change is compelling. Some of the most successful companies in the world, including Google, Apple, and IBM, have publicly removed degree requirements from many of their job listings. What matters to them now is demonstrated skill and the ability to solve real problems — not the name of the institution you attended or the paper on your wall. As technology reshapes entire industries, adaptability and continuous learning have become more valuable than a four-year academic program that may teach skills already obsolete by graduation.

The financial argument is also significant. In many countries, a university degree comes with enormous debt, taking graduates years or even decades to repay. For a young person from a low-income family, this debt can be financially crippling. Meanwhile, alternative pathways — technical certifications, online courses, bootcamps, and apprenticeships — can deliver job-ready skills in months at a fraction of the cost.

Of course, there are fields where a degree remains not just valuable but essential. Medicine, law, engineering, and research are built on specialized knowledge that requires years of rigorous academic study. And beyond pure career outcomes, university offers intellectual growth, diverse social experiences, and lifelong networks that are genuinely difficult to replicate elsewhere.

But for the vast majority of careers — in business, technology, marketing, design, and beyond — the obsession with degrees is holding talented people back. We must expand our definition of what qualifies someone for a job. Talent, drive, and demonstrated skill should matter more than a certificate. The future belongs to lifelong learners, not just degree holders.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'In which fields does the author admit a university degree is still essential?',
          options: [
            'Business, marketing, and design.',
            'Technology and software development.',
            'Medicine, law, engineering, and research.',
            'All careers without exception.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q5',
          part: 7,
          stimulus: `Is a University Degree Still the Key to Career Success?

For decades, a university degree was seen as the golden ticket to a successful career. Employers expected it, parents demanded it, and society rewarded it. But in today's rapidly changing job market, I believe we need to seriously question whether a degree is still necessary — or whether it has become an expensive and outdated requirement.

The evidence for change is compelling. Some of the most successful companies in the world, including Google, Apple, and IBM, have publicly removed degree requirements from many of their job listings. What matters to them now is demonstrated skill and the ability to solve real problems — not the name of the institution you attended or the paper on your wall. As technology reshapes entire industries, adaptability and continuous learning have become more valuable than a four-year academic program that may teach skills already obsolete by graduation.

The financial argument is also significant. In many countries, a university degree comes with enormous debt, taking graduates years or even decades to repay. For a young person from a low-income family, this debt can be financially crippling. Meanwhile, alternative pathways — technical certifications, online courses, bootcamps, and apprenticeships — can deliver job-ready skills in months at a fraction of the cost.

Of course, there are fields where a degree remains not just valuable but essential. Medicine, law, engineering, and research are built on specialized knowledge that requires years of rigorous academic study. And beyond pure career outcomes, university offers intellectual growth, diverse social experiences, and lifelong networks that are genuinely difficult to replicate elsewhere.

But for the vast majority of careers — in business, technology, marketing, design, and beyond — the obsession with degrees is holding talented people back. We must expand our definition of what qualifies someone for a job. Talent, drive, and demonstrated skill should matter more than a certificate. The future belongs to lifelong learners, not just degree holders.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'The phrase "the golden ticket" in the first paragraph is used to mean:',
          options: [
            'A physical certificate made of gold.',
            'Something that was believed to guarantee success.',
            'An entry test for university admission.',
            'A government scholarship for university study.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'p7q6',
          part: 7,
          stimulus: `Is a University Degree Still the Key to Career Success?

For decades, a university degree was seen as the golden ticket to a successful career. Employers expected it, parents demanded it, and society rewarded it. But in today's rapidly changing job market, I believe we need to seriously question whether a degree is still necessary — or whether it has become an expensive and outdated requirement.

The evidence for change is compelling. Some of the most successful companies in the world, including Google, Apple, and IBM, have publicly removed degree requirements from many of their job listings. What matters to them now is demonstrated skill and the ability to solve real problems — not the name of the institution you attended or the paper on your wall. As technology reshapes entire industries, adaptability and continuous learning have become more valuable than a four-year academic program that may teach skills already obsolete by graduation.

The financial argument is also significant. In many countries, a university degree comes with enormous debt, taking graduates years or even decades to repay. For a young person from a low-income family, this debt can be financially crippling. Meanwhile, alternative pathways — technical certifications, online courses, bootcamps, and apprenticeships — can deliver job-ready skills in months at a fraction of the cost.

Of course, there are fields where a degree remains not just valuable but essential. Medicine, law, engineering, and research are built on specialized knowledge that requires years of rigorous academic study. And beyond pure career outcomes, university offers intellectual growth, diverse social experiences, and lifelong networks that are genuinely difficult to replicate elsewhere.

But for the vast majority of careers — in business, technology, marketing, design, and beyond — the obsession with degrees is holding talented people back. We must expand our definition of what qualifies someone for a job. Talent, drive, and demonstrated skill should matter more than a certificate. The future belongs to lifelong learners, not just degree holders.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'Which best describes how the author structures their argument?',
          options: [
            'The author only lists the advantages of alternative education.',
            'The author ignores the benefits of university education completely.',
            'The author presents the case against degrees, concedes some benefits of university, then restates their main position.',
            'The author presents only statistics without any personal opinion.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'p7q7',
          part: 7,
          stimulus: `Is a University Degree Still the Key to Career Success?

For decades, a university degree was seen as the golden ticket to a successful career. Employers expected it, parents demanded it, and society rewarded it. But in today's rapidly changing job market, I believe we need to seriously question whether a degree is still necessary — or whether it has become an expensive and outdated requirement.

The evidence for change is compelling. Some of the most successful companies in the world, including Google, Apple, and IBM, have publicly removed degree requirements from many of their job listings. What matters to them now is demonstrated skill and the ability to solve real problems — not the name of the institution you attended or the paper on your wall. As technology reshapes entire industries, adaptability and continuous learning have become more valuable than a four-year academic program that may teach skills already obsolete by graduation.

The financial argument is also significant. In many countries, a university degree comes with enormous debt, taking graduates years or even decades to repay. For a young person from a low-income family, this debt can be financially crippling. Meanwhile, alternative pathways — technical certifications, online courses, bootcamps, and apprenticeships — can deliver job-ready skills in months at a fraction of the cost.

Of course, there are fields where a degree remains not just valuable but essential. Medicine, law, engineering, and research are built on specialized knowledge that requires years of rigorous academic study. And beyond pure career outcomes, university offers intellectual growth, diverse social experiences, and lifelong networks that are genuinely difficult to replicate elsewhere.

But for the vast majority of careers — in business, technology, marketing, design, and beyond — the obsession with degrees is holding talented people back. We must expand our definition of what qualifies someone for a job. Talent, drive, and demonstrated skill should matter more than a certificate. The future belongs to lifelong learners, not just degree holders.`,
          stimulusLabel: 'Read the opinion article.',
          text: 'What does the author mean by "The future belongs to lifelong learners, not just degree holders"?',
          options: [
            'People should attend university for their entire lives.',
            'In the future, only people over 60 will be able to find work.',
            'Continuous learning and adaptability will be more important than having a degree.',
            'Degrees will disappear entirely within the next decade.',
          ],
          answer: 2,
        },
      ],
    },
  ],
};

export default mock;
