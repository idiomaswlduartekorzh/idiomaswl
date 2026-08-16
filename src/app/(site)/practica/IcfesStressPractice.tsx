'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Question bank — ICFES Saber 11 · English Component
// Categories: vocabulary (mcq/open), grammar (mcq/open), dialog (mcq-only)
// ─────────────────────────────────────────────────────────────────────────────

type QCategory = 'vocabulary' | 'grammar' | 'dialog' | 'reading';

interface StressQuestion {
  id: string;
  category: QCategory;
  stimulus?: string;          // optional passage / sign / dialog to read
  text: string;               // the question
  options: string[];          // 4 choices
  answer: number;             // 0-indexed correct option
  openOk?: boolean;           // can be shown without options (typing mode)
  openHint?: string;          // hint shown in open mode ("Solo una palabra")
}

const QUESTIONS: StressQuestion[] = [
  // ── Vocabulary ───────────────────────────────────────────────────────────────
  { id:'v01', category:'vocabulary', openOk:true, openHint:'Una palabra',
    text:'A place in the city where you can borrow books for free.',
    options:['Supermarket','Library','Hospital','Museum'], answer:1 },
  { id:'v02', category:'vocabulary', openOk:true, openHint:'Una palabra',
    text:'The daily activities someone does at the same time every day.',
    options:['Festival','Routine','Emergency','Schedule'], answer:1 },
  { id:'v03', category:'vocabulary', openOk:true, openHint:'Una palabra',
    text:'A vehicle that travels underground and carries many passengers.',
    options:['Taxi','Tram','Subway','Ferry'], answer:2 },
  { id:'v04', category:'vocabulary', openOk:true, openHint:'Una palabra',
    text:'To move from one home or city to another to live there permanently.',
    options:['Visit','Commute','Travel','Relocate'], answer:3 },
  { id:'v05', category:'vocabulary', openOk:true, openHint:'Una palabra',
    text:'A formal agreement between two or more people or organizations.',
    options:['Opinion','Contract','Rumor','Suggestion'], answer:1 },
  { id:'v06', category:'vocabulary', openOk:true, openHint:'Una palabra',
    text:'The person in charge of running a company or organization.',
    options:['Employee','Client','Manager','Customer'], answer:2 },
  { id:'v07', category:'vocabulary', openOk:true, openHint:'Una palabra',
    text:'Information that is not correct or true.',
    options:['Accurate','False','Clear','Real'], answer:1 },
  { id:'v08', category:'vocabulary', openOk:true, openHint:'Una palabra',
    text:'To make something better or of higher quality.',
    options:['Destroy','Improve','Ignore','Reduce'], answer:1 },
  { id:'v09', category:'vocabulary', openOk:true, openHint:'Una palabra',
    text:'A set of rules that everyone in a country must follow.',
    options:['Tradition','Law','Habit','Culture'], answer:1 },
  { id:'v10', category:'vocabulary', openOk:true, openHint:'Una palabra',
    text:'The natural environment with trees, rivers, and animals, away from cities.',
    options:['Industry','Technology','Nature','Transport'], answer:2 },
  { id:'v11', category:'vocabulary', openOk:true, openHint:'Una palabra',
    text:'A place where sick or injured people receive medical treatment.',
    options:['Pharmacy','Clinic','Hospital','Laboratory'], answer:2 },
  { id:'v12', category:'vocabulary', openOk:true, openHint:'Una palabra',
    text:'The process of buying and selling goods and services.',
    options:['Politics','Commerce','Science','History'], answer:1 },
  { id:'v13', category:'vocabulary', openOk:true, openHint:'Una palabra',
    text:'Something that happens by chance, not planned.',
    options:['Deliberate','Accidental','Intentional','Scheduled'], answer:1 },
  { id:'v14', category:'vocabulary', openOk:true, openHint:'Una palabra',
    text:'To officially say you are sorry for something wrong you did.',
    options:['Apologize','Celebrate','Disagree','Explain'], answer:0 },
  { id:'v15', category:'vocabulary', openOk:true, openHint:'Una palabra',
    text:'The money you earn from your job every month.',
    options:['Debt','Salary','Expense','Budget'], answer:1 },
  { id:'v16', category:'vocabulary', openOk:true, openHint:'Una palabra',
    text:'A person who travels to a foreign country for a vacation.',
    options:['Resident','Employee','Tourist','Immigrant'], answer:2 },
  { id:'v17', category:'vocabulary', openOk:true, openHint:'Una palabra',
    text:'Very important and necessary; cannot be avoided.',
    options:['Optional','Essential','Casual','Flexible'], answer:1 },
  { id:'v18', category:'vocabulary', openOk:true, openHint:'Una palabra',
    text:'To stop something from happening.',
    options:['Allow','Encourage','Prevent','Promote'], answer:2 },
  { id:'v19', category:'vocabulary', openOk:true, openHint:'Una palabra',
    text:'The protection of nature and wildlife for the future.',
    options:['Pollution','Conservation','Consumption','Destruction'], answer:1 },
  { id:'v20', category:'vocabulary', openOk:true, openHint:'Una palabra',
    text:'A skill or knowledge you have gained through practice or study.',
    options:['Weakness','Opinion','Qualification','Preference'], answer:2 },

  // ── Grammar ──────────────────────────────────────────────────────────────────
  { id:'g01', category:'grammar', openOk:true, openHint:'Verbo o palabra',
    text:'Maria _______ to work by bicycle every morning because she lives close to the office.',
    options:['is going','goes','went','will go'], answer:1 },
  { id:'g02', category:'grammar', openOk:true, openHint:'Verbo o frase verbal',
    text:'If you want to catch the bus, you _______ leave now because it departs in five minutes.',
    options:['might','would','could','should'], answer:3 },
  { id:'g03', category:'grammar', openOk:true, openHint:'Preposición',
    text:'My brother has lived in this city _______ he was a child.',
    options:['for','during','since','while'], answer:2 },
  { id:'g04', category:'grammar',
    text:'The new metro line will _______ travel time across the city by almost 30 minutes.',
    options:['increase','extend','reduce','change'], answer:2 },
  { id:'g05', category:'grammar', openOk:true, openHint:'Frase verbal',
    text:'Before the presentation, she _______ her notes three times to make sure everything was correct.',
    options:['review','reviewed','is reviewing','reviews'], answer:1 },
  { id:'g06', category:'grammar',
    text:'The city council decided _______ a new cycling lane along the main avenue.',
    options:['add','adding','to add','have added'], answer:2 },
  { id:'g07', category:'grammar', openOk:true, openHint:'Preposición o conjunción',
    text:'He has been working at this company _______ more than ten years.',
    options:['since','during','for','while'], answer:2 },
  { id:'g08', category:'grammar',
    text:'By the time she arrives, we _______ the project.',
    options:['finish','will finish','will have finished','are finishing'], answer:2 },
  { id:'g09', category:'grammar', openOk:true, openHint:'Adverbio',
    text:'The instructions were _______ written that nobody understood them.',
    options:['so badly','very bad','too much poorly','such badly'], answer:0 },
  { id:'g10', category:'grammar',
    text:'Neither John _______ his sisters have met the new director yet.',
    options:['or','nor','and','but'], answer:1 },
  { id:'g11', category:'grammar', openOk:true, openHint:'Verbo modal',
    text:'You _______ bring your ID to the exam. It\'s mandatory.',
    options:['might','could','must','would'], answer:2 },
  { id:'g12', category:'grammar',
    text:'The report _______ by the committee last Thursday.',
    options:['approved','was approved','has approved','approves'], answer:1 },
  { id:'g13', category:'grammar', openOk:true, openHint:'Conjunción',
    text:'She works hard _______ she wants to get a promotion.',
    options:['although','unless','because','however'], answer:2 },
  { id:'g14', category:'grammar',
    text:'I wish I _______ more time to study before the exam.',
    options:['have','had','will have','am having'], answer:1 },
  { id:'g15', category:'grammar',
    text:'_______ you finish your homework, you can watch television.',
    options:['When','While','During','Despite'], answer:0 },
  { id:'g16', category:'grammar', openOk:true, openHint:'Artículo o pronombre',
    text:'This is _______ most interesting book I have ever read.',
    options:['a','an','the','some'], answer:2 },
  { id:'g17', category:'grammar',
    text:'She suggested _______ the meeting to next Monday.',
    options:['postpone','postponing','to postpone','postponed'], answer:1 },
  { id:'g18', category:'grammar',
    text:'The students _______ their teacher when she walked in.',
    options:['were greeting','greeted','greets','have greeted'], answer:1 },
  { id:'g19', category:'grammar',
    text:'If I _______ you, I would apply for that job immediately.',
    options:['am','was','were','be'], answer:2 },
  { id:'g20', category:'grammar', openOk:true, openHint:'Preposición',
    text:'He is not interested _______ learning a new language right now.',
    options:['at','in','on','for'], answer:1 },
  { id:'g21', category:'grammar',
    text:'The children have been playing outside _______ two hours.',
    options:['since','during','for','while'], answer:2 },
  { id:'g22', category:'grammar',
    text:'This is the woman _______ daughter won the science competition.',
    options:['who','whom','which','whose'], answer:3 },

  // ── Dialog ───────────────────────────────────────────────────────────────────
  { id:'d01', category:'dialog',
    stimulus:'A: "Excuse me, how do I get to the train station from here?"\nB: _______',
    text:'What is the best response for Person B?',
    options:[
      '"The station is usually very busy at this time."',
      '"Sorry, I\'m not from around here either."',
      '"Go straight ahead and turn left at the traffic light."',
      '"Trains run every 30 minutes from platform 2."',
    ], answer:2 },
  { id:'d02', category:'dialog',
    stimulus:'Cashier: "That will be twelve dollars and fifty cents, please."\nCustomer: _______',
    text:'What does the customer say next?',
    options:[
      '"Here you go. Keep the change."',
      '"Do you accept credit cards?"',
      '"Is there a discount for members?"',
      '"What time do you close today?"',
    ], answer:0 },
  { id:'d03', category:'dialog',
    stimulus:'Teacher: "Did everyone finish the homework?"\nStudent: _______',
    text:'Which response is most appropriate?',
    options:[
      '"I didn\'t have time. Could I hand it in tomorrow?"',
      '"Actually, I wasn\'t sure what the assignment was."',
      '"I finished it, but question five was difficult."',
      '"We had a lot of tests this week."',
    ], answer:2 },
  { id:'d04', category:'dialog',
    stimulus:'Doctor: "How long have you had this headache?"\nPatient: _______',
    text:'What does the patient say?',
    options:[
      '"I take the bus to get here."',
      '"My sister is also a doctor."',
      '"Since yesterday afternoon. It\'s getting worse."',
      '"The pharmacy is next to the hospital."',
    ], answer:2 },
  { id:'d05', category:'dialog',
    stimulus:'Tourist: "Is this bus going to the city center?"\nDriver: _______',
    text:'What is the driver\'s most helpful response?',
    options:[
      '"The next bus comes in about ten minutes."',
      '"You should check the route map at the stop."',
      '"I drive this route every day."',
      '"Yes, it stops right in front of the main square."',
    ], answer:3 },
  { id:'d06', category:'dialog',
    stimulus:'A: "Have you decided what to order?"\nB: "Not yet. What do you recommend?"\nA: _______',
    text:'What does A say?',
    options:[
      '"The table by the window is available."',
      '"The grilled salmon is excellent today."',
      '"We close at ten o\'clock."',
      '"Reservations are not required."',
    ], answer:1 },
  { id:'d07', category:'dialog',
    stimulus:'A: "I haven\'t seen you in ages! How have you been?"\nB: _______',
    text:'What is the most natural response from B?',
    options:[
      '"I am not sure where I left my keys."',
      '"Pretty good, thanks! I just got a new job."',
      '"The weather has been unpredictable lately."',
      '"I usually take the subway to work."',
    ], answer:1 },
  { id:'d08', category:'dialog',
    stimulus:'Interviewer: "Why do you want to work for this company?"\nApplicant: _______',
    text:'Which is the best response?',
    options:[
      '"I need a job as soon as possible."',
      '"My previous company did not pay well."',
      '"I admire your commitment to innovation and sustainability."',
      '"I have applied to many places this month."',
    ], answer:2 },
  { id:'d09', category:'dialog',
    stimulus:'A: "Could you turn down the music, please? I\'m trying to study."\nB: _______',
    text:'What is the most polite and appropriate response?',
    options:[
      '"The music is not even that loud."',
      '"Of course, sorry about that."',
      '"You should use earplugs."',
      '"I was here first."',
    ], answer:1 },
  { id:'d10', category:'dialog',
    stimulus:'Customer: "This shirt has a stain on it. Can I exchange it?"\nShop assistant: _______',
    text:'What does the shop assistant say?',
    options:[
      '"Stains are sometimes unavoidable."',
      '"You should have checked before buying it."',
      '"Of course. Do you have the receipt with you?"',
      '"We only exchange electronics."',
    ], answer:2 },
  { id:'d11', category:'dialog',
    stimulus:'A: "I\'m really nervous about the presentation tomorrow."\nB: _______',
    text:'What is the most supportive response?',
    options:[
      '"You should have practiced more."',
      '"Don\'t worry, you\'ve prepared well. You\'ll do great."',
      '"I hate presentations too."',
      '"Maybe you should cancel it."',
    ], answer:1 },
  { id:'d12', category:'dialog',
    stimulus:'Receptionist: "Good morning. How can I help you?"\nVisitor: "I have an appointment with Dr. Ramirez at ten."\nReceptionist: _______',
    text:'What does the receptionist say?',
    options:[
      '"Dr. Ramirez is not available today."',
      '"Please take a seat. She will be with you shortly."',
      '"You are late. The appointment was at nine."',
      '"Do you have insurance?"',
    ], answer:1 },

  // ── Reading comprehension (short texts) ──────────────────────────────────────
  { id:'r01', category:'reading',
    stimulus:'NOTICE: The library will be closed on Saturday, May 10th for maintenance. Normal hours resume on Monday. Members may return books through the slot by the main entrance.',
    text:'What can members do during the library closure?',
    options:[
      'Borrow new books through a special service.',
      'Return books through the slot by the entrance.',
      'Access the library for limited hours.',
      'Contact staff by email to request books.',
    ], answer:1 },
  { id:'r02', category:'reading',
    stimulus:'SIGN: No food or drinks allowed beyond this point. Please keep the area clean. Thank you for your cooperation.',
    text:'What does this sign tell people to do?',
    options:[
      'Bring their own food from home.',
      'Leave food outside before entering.',
      'Drink water only.',
      'Pay for any items they consume.',
    ], answer:1 },
  { id:'r03', category:'reading',
    stimulus:'AD: English classes for adults — all levels welcome. Classes meet Tuesday and Thursday evenings, 6–8 PM. First session is free. Call 555-1234 to register.',
    text:'What is special about the first class?',
    options:['It is on a weekend.','It costs half price.','It is free.','It lasts four hours.'], answer:2 },
  { id:'r04', category:'reading',
    stimulus:'EMAIL SUBJECT: Team meeting postponed\nDue to a scheduling conflict, Thursday\'s meeting has been moved to Friday at the same time. Please update your calendars.',
    text:'What changed about the meeting?',
    options:['The time changed.','The location changed.','The day changed.','The agenda changed.'], answer:2 },
  { id:'r05', category:'reading',
    stimulus:'LABEL: Store in a cool, dry place. Keep away from direct sunlight. Not suitable for children under 3. For external use only.',
    text:'Who should NOT use this product?',
    options:['Adults over 30.','Children under 3.','People with allergies.','Elderly patients.'], answer:1 },
  { id:'r06', category:'reading',
    stimulus:'POSTER: Earth Day Clean-Up — Join us this Saturday at Riverside Park at 9 AM. Bring gloves and a reusable bag. Refreshments provided. All volunteers welcome!',
    text:'What should volunteers bring?',
    options:['Food for the group.','Gloves and a reusable bag.','A park map.','Their own refreshments.'], answer:1 },
  { id:'r07', category:'reading',
    stimulus:'MEMO: Starting next month, all employees must swipe their ID badge to enter the building. Tailgating (following someone in without swiping) is strictly prohibited.',
    text:'What is the new rule for entering the building?',
    options:[
      'Show a government ID at the front desk.',
      'Wait for a security guard to open the door.',
      'Use an ID badge to swipe in.',
      'Sign a visitors\' logbook.',
    ], answer:2 },
  { id:'r08', category:'reading',
    stimulus:'SCHEDULE: Flight BG421 to Bogotá — Departs: 14:30 · Gate: B12 · Status: Delayed (new departure 16:00)',
    text:'When will flight BG421 actually depart?',
    options:['14:30','15:00','15:30','16:00'], answer:3 },
  { id:'r09', category:'reading',
    stimulus:'ANNOUNCEMENT: The cafeteria will not serve hot meals on Friday due to a kitchen inspection. Cold sandwiches and salads will be available as usual.',
    text:'What will be different on Friday?',
    options:[
      'The cafeteria will be completely closed.',
      'No food will be available.',
      'Only cold food will be served.',
      'The cafeteria will open late.',
    ], answer:2 },
  { id:'r10', category:'reading',
    stimulus:'FLYER: Free Wi-Fi available in all common areas. Password: WLC2024. Maximum session: 2 hours. Please do not share the password with non-guests.',
    text:'What restriction is mentioned about the Wi-Fi?',
    options:[
      'Only guests in certain rooms can use it.',
      'Sessions are limited to 2 hours.',
      'It can only be used for work purposes.',
      'The password changes every day.',
    ], answer:1 },
];

// ─────────────────────────────────────────────────────────────────────────────
// Difficulty settings
// ─────────────────────────────────────────────────────────────────────────────

interface Difficulty {
  id: string;
  label: string;
  emoji: string;
  seconds: number;
  openRate: number;   // 0–1 fraction of eligible questions shown as open
  sessionSize: number;
  color: string;
  desc: string;
}

const DIFFICULTIES: Difficulty[] = [
  { id:'easy',   label:'Fácil',   emoji:'🟢', seconds:30, openRate:0,    sessionSize:10, color:'var(--wl-on-panel-ok, #059669)', desc:'30 s · Solo opción múltiple · 10 preguntas' },
  { id:'medium', label:'Medio',   emoji:'🟡', seconds:20, openRate:0.25, sessionSize:15, color:'var(--wl-on-panel-warn, #d97706)', desc:'20 s · 25 % escritura libre · 15 preguntas' },
  { id:'hard',   label:'Difícil', emoji:'🔴', seconds:12, openRate:0.5,  sessionSize:20, color:'var(--wl-on-panel-alert, #dc2626)', desc:'12 s · 50 % escritura libre · 20 preguntas' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function normalizeAnswer(s: string): string {
  return s.trim().toLowerCase().replace(/[^a-z0-9 ]/g, '').replace(/\s+/g, ' ');
}

function gradeOpen(typed: string, correct: string): boolean {
  const t = normalizeAnswer(typed);
  const c = normalizeAnswer(correct);
  if (!t) return false;
  return t === c || c.startsWith(t) || t.startsWith(c.split(' ')[0]);
}

interface SessionQuestion {
  q: StressQuestion;
  isOpen: boolean;
}

function buildSession(difficulty: Difficulty): SessionQuestion[] {
  const pool = shuffle(QUESTIONS).slice(0, difficulty.sessionSize * 2);
  const session: SessionQuestion[] = pool.slice(0, difficulty.sessionSize).map(q => ({
    q,
    isOpen: q.openOk === true && Math.random() < difficulty.openRate,
  }));
  return session;
}

// ─────────────────────────────────────────────────────────────────────────────
// Category badge
// ─────────────────────────────────────────────────────────────────────────────

const CAT_META: Record<QCategory, { label: string; color: string; emoji: string }> = {
  vocabulary: { label: 'Vocabulario', color: 'var(--wl-on-panel-link, #534AB7)', emoji: '📝' },
  grammar:    { label: 'Gramática',   color: 'var(--wl-on-panel-link, #2563eb)', emoji: '🔤' },
  dialog:     { label: 'Diálogo',     color: 'var(--wl-on-panel-ok, #059669)', emoji: '💬' },
  reading:    { label: 'Lectura',     color: 'var(--wl-on-panel-warn, #d97706)', emoji: '📖' },
};

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

type Screen = 'intro' | 'playing' | 'review' | 'results';

interface AnswerRecord {
  q: StressQuestion;
  isOpen: boolean;
  chosen: number | null;  // MCQ: index, open: null
  typedRaw: string;       // open: typed text
  correct: boolean;
  timedOut: boolean;
  timeUsed: number;       // seconds taken
}

export default function IcfesStressPractice() {
  const [screen,     setScreen]     = useState<Screen>('intro');
  const [difficulty, setDifficulty] = useState<Difficulty>(DIFFICULTIES[1]);
  const [session,    setSession]    = useState<SessionQuestion[]>([]);
  const [idx,        setIdx]        = useState(0);
  const [timeLeft,   setTimeLeft]   = useState(0);
  const [chosen,     setChosen]     = useState<number | null>(null);
  const [typed,      setTyped]      = useState('');
  const [submitted,  setSubmitted]  = useState(false);
  const [records,    setRecords]    = useState<AnswerRecord[]>([]);
  const [streak,     setStreak]     = useState(0);
  const [maxStreak,  setMaxStreak]  = useState(0);
  const [reviewIdx,  setReviewIdx]  = useState(0);

  const timeStartRef = useRef<number>(Date.now());
  const timerRef     = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Timer ──────────────────────────────────────────────────────────────────
  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback((secs: number) => {
    clearTimer();
    setTimeLeft(secs);
    timeStartRef.current = Date.now();
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearTimer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [clearTimer]);

  useEffect(() => () => clearTimer(), [clearTimer]);

  // Auto-submit when timer hits 0
  useEffect(() => {
    if (screen !== 'playing' || submitted || timeLeft !== 0) return;
    handleSubmit(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, screen, submitted]);

  // ── Navigation ─────────────────────────────────────────────────────────────
  function startSession() {
    const s = buildSession(difficulty);
    setSession(s);
    setIdx(0);
    setRecords([]);
    setStreak(0);
    setMaxStreak(0);
    setChosen(null);
    setTyped('');
    setSubmitted(false);
    setScreen('playing');
    startTimer(difficulty.seconds);
  }

  function handleSubmit(timedOut = false) {
    if (submitted) return;
    clearTimer();
    setSubmitted(true);

    const sq = session[idx];
    const timeUsed = difficulty.seconds - timeLeft + (timedOut ? 0 : 0);
    let correct = false;

    if (timedOut) {
      correct = false;
    } else if (sq.isOpen) {
      correct = gradeOpen(typed, sq.q.options[sq.q.answer]);
    } else {
      correct = chosen === sq.q.answer;
    }

    const rec: AnswerRecord = {
      q: sq.q,
      isOpen: sq.isOpen,
      chosen,
      typedRaw: typed,
      correct,
      timedOut,
      timeUsed: Math.round(difficulty.seconds - timeLeft),
    };

    const newStreak = correct ? streak + 1 : 0;
    setStreak(newStreak);
    setMaxStreak(ms => Math.max(ms, newStreak));
    setRecords(prev => [...prev, rec]);
  }

  function nextQuestion() {
    const nextIdx = idx + 1;
    if (nextIdx >= session.length) {
      setScreen('results');
      return;
    }
    setIdx(nextIdx);
    setChosen(null);
    setTyped('');
    setSubmitted(false);
    startTimer(difficulty.seconds);
  }

  function handleMCQSelect(optIdx: number) {
    if (submitted) return;
    setChosen(optIdx);
  }

  function handleOpenSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!typed.trim() || submitted) return;
    handleSubmit(false);
  }

  // ── Derived ────────────────────────────────────────────────────────────────
  const sq = session[idx] ?? null;
  const correctCount = records.filter(r => r.correct).length;
  const accuracy = records.length > 0 ? Math.round((correctCount / records.length) * 100) : 0;
  const timerPct = sq ? (timeLeft / difficulty.seconds) * 100 : 100;
  const timerUrgent = timeLeft <= 5 && timeLeft > 0;
  const timerColor = timerUrgent ? '#dc2626' : timeLeft <= 10 ? '#d97706' : '#059669';
  const catMeta = sq ? CAT_META[sq.q.category] : null;

  // ── Screens ────────────────────────────────────────────────────────────────

  /* INTRO */
  if (screen === 'intro') {
    return (
      <div style={{ display:'flex', flexDirection:'column', gap:'1.5rem', maxWidth:680, margin:'0 auto' }}>

        {/* Header */}
        <div style={{
          background:'linear-gradient(135deg, rgba(220,38,38,0.08) 0%, rgba(83,74,183,0.06) 100%)',
          border:'1px solid rgba(220,38,38,0.18)',
          borderRadius:20, padding:'1.75rem 2rem',
        }}>
          <p className="eyebrow" style={{ marginBottom:'0.5rem' }}>
            <span className="ink-line" />Práctica de estrés
          </p>
          <h2 style={{ fontSize:'1.8rem', letterSpacing:'-0.03em', margin:'0 0 0.5rem', fontWeight:700 }}>
            ICFES · English Component
          </h2>
          <p style={{ color:'var(--muted)', fontSize:'0.95rem', margin:0, lineHeight:1.65 }}>
            Preguntas aleatorias con temporizador. Aprende a responder rápido bajo presión.
            Mezcla de opción múltiple y escritura libre.
          </p>
        </div>

        {/* Difficulty */}
        <div className="wl-card" style={{ padding:'1.5rem' }}>
          <p className="eyebrow" style={{ margin:'0 0 1rem' }}>
            <span className="ink-line" />Elige dificultad
          </p>
          <div style={{ display:'flex', flexDirection:'column', gap:'0.65rem' }}>
            {DIFFICULTIES.map(d => (
              <button
                key={d.id}
                onClick={() => setDifficulty(d)}
                style={{
                  display:'flex', alignItems:'center', gap:'1rem',
                  padding:'1rem 1.25rem', borderRadius:14, textAlign:'left',
                  border:`2px solid ${difficulty.id === d.id ? d.color : 'var(--line-soft)'}`,
                  background: difficulty.id === d.id ? `${d.color}0d` : 'var(--bg)',
                  cursor:'pointer', fontFamily:'inherit', transition:'all 0.15s',
                }}
              >
                <span style={{ fontSize:'1.6rem' }}>{d.emoji}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700, fontSize:'1rem', color: difficulty.id === d.id ? d.color : 'var(--ink)' }}>
                    {d.label}
                  </div>
                  <div style={{ fontSize:'0.8rem', color:'var(--muted)', marginTop:'0.1rem', fontFamily:'var(--mono)' }}>
                    {d.desc}
                  </div>
                </div>
                {difficulty.id === d.id && (
                  <span style={{ color:d.color, fontWeight:900, fontSize:'1.1rem' }}>✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'0.6rem' }}>
          {[
            { icon:'⏱', label:'Tiempo por pregunta', value:`${difficulty.seconds}s` },
            { icon:'📝', label:'Preguntas', value:`${difficulty.sessionSize}` },
            { icon:'✍️', label:'Escritura libre', value: difficulty.openRate === 0 ? 'No' : `~${Math.round(difficulty.openRate*100)}%` },
          ].map(s => (
            <div key={s.label} style={{
              background:'var(--bg)', border:'1px solid var(--line-soft)',
              borderRadius:12, padding:'0.9rem 1rem', textAlign:'center',
            }}>
              <div style={{ fontSize:'1.5rem', marginBottom:'0.25rem' }}>{s.icon}</div>
              <div style={{ fontSize:'1.25rem', fontWeight:800, color:difficulty.color }}>{s.value}</div>
              <div style={{ fontSize:'0.68rem', color:'var(--muted)', fontFamily:'var(--mono)', lineHeight:1.3, marginTop:'0.2rem' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <button onClick={startSession} className="btn" style={{ fontSize:'1rem', padding:'0.95rem', borderRadius:14 }}>
          Empezar práctica →
        </button>
      </div>
    );
  }

  /* RESULTS */
  if (screen === 'results') {
    const avgTime = records.length > 0
      ? (records.reduce((s, r) => s + r.timeUsed, 0) / records.length).toFixed(1)
      : '—';

    return (
      <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem', maxWidth:680, margin:'0 auto' }}>

        {/* Score */}
        <div style={{
          background:`linear-gradient(135deg, ${accuracy >= 70 ? 'rgba(5,150,105,0.1)' : accuracy >= 50 ? 'rgba(217,119,6,0.1)' : 'rgba(220,38,38,0.08)'} 0%, rgba(83,74,183,0.05) 100%)`,
          border:`1px solid ${accuracy >= 70 ? '#05966933' : accuracy >= 50 ? '#d9770633' : '#dc262633'}`,
          borderRadius:20, padding:'2rem', textAlign:'center',
        }}>
          <div style={{ fontSize:'4rem', fontWeight:900, color: accuracy >= 70 ? '#059669' : accuracy >= 50 ? '#d97706' : '#dc2626' }}>
            {accuracy}%
          </div>
          <div style={{ fontSize:'1.1rem', fontWeight:700, color:'var(--ink)', marginBottom:'0.25rem' }}>
            {correctCount} de {records.length} correctas
          </div>
          <div style={{ fontSize:'0.85rem', color:'var(--muted)' }}>
            {accuracy >= 70 ? '¡Excelente trabajo!' : accuracy >= 50 ? 'Bien, sigue practicando.' : 'Sigue así, la práctica hace al maestro.'}
          </div>
        </div>

        {/* Stats grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'0.6rem' }}>
          {[
            { label:'Mejor racha', value:`${maxStreak} 🔥`, color:'var(--wl-on-panel-warn, #d97706)' },
            { label:'Tiempo promedio', value:`${avgTime}s`, color:'var(--wl-on-panel-link, #534AB7)' },
            { label:'Dificultad', value:difficulty.label, color:difficulty.color },
          ].map(s => (
            <div key={s.label} style={{
              background:'var(--bg)', border:'1px solid var(--line-soft)',
              borderRadius:12, padding:'0.75rem 0.85rem', textAlign:'center',
            }}>
              <div style={{ fontSize:'1.35rem', fontWeight:800, color:s.color }}>{s.value}</div>
              <div style={{ fontSize:'0.7rem', color:'var(--muted)', fontFamily:'var(--mono)', marginTop:'0.2rem' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Review & restart */}
        <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap' }}>
          <button
            onClick={() => { setReviewIdx(0); setScreen('review'); }}
            className="btn btn-ghost"
            style={{ flex:1, fontSize:'0.9rem', padding:'0.85rem', borderRadius:12 }}
          >
            Revisar respuestas
          </button>
          <button
            onClick={() => setScreen('intro')}
            className="btn"
            style={{ flex:1, fontSize:'0.9rem', padding:'0.85rem', borderRadius:12 }}
          >
            Nueva sesión →
          </button>
        </div>

        {/* Category breakdown */}
        <div className="wl-card" style={{ padding:'1.25rem' }}>
          <p style={{ margin:'0 0 0.85rem', fontSize:'0.75rem', color:'var(--muted)', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', fontWeight:700 }}>
            Por categoría
          </p>
          {(['vocabulary','grammar','dialog','reading'] as QCategory[]).map(cat => {
            const catRecords = records.filter(r => r.q.category === cat);
            if (catRecords.length === 0) return null;
            const catCorrect = catRecords.filter(r => r.correct).length;
            const catPct = Math.round((catCorrect / catRecords.length) * 100);
            const meta = CAT_META[cat];
            return (
              <div key={cat} style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'0.6rem' }}>
                <span style={{ fontSize:'0.85rem', minWidth:80, color:meta.color, fontWeight:700 }}>{meta.emoji} {meta.label}</span>
                <div style={{ flex:1, height:8, background:'var(--line-soft)', borderRadius:4, overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${catPct}%`, background:meta.color, borderRadius:4, transition:'width 0.6s' }} />
                </div>
                <span style={{ fontSize:'0.78rem', color:'var(--muted)', fontFamily:'var(--mono)', minWidth:48, textAlign:'right' }}>
                  {catCorrect}/{catRecords.length}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* REVIEW */
  if (screen === 'review') {
    const rec = records[reviewIdx];
    if (!rec) return null;
    const meta = CAT_META[rec.q.category];
    const correctText = rec.q.options[rec.q.answer];

    return (
      <div style={{ display:'flex', flexDirection:'column', gap:'1rem', maxWidth:680, margin:'0 auto' }}>

        {/* Nav */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'0.5rem' }}>
          <span style={{ fontSize:'0.82rem', color:'var(--muted)', fontFamily:'var(--mono)' }}>
            Revisando {reviewIdx + 1} / {records.length}
          </span>
          <div style={{ display:'flex', gap:'0.4rem' }}>
            <button onClick={() => setReviewIdx(i => Math.max(0, i-1))} disabled={reviewIdx === 0}
              className="btn btn-ghost btn-sm" style={{ fontSize:'0.8rem' }}>← Anterior</button>
            <button onClick={() => setReviewIdx(i => Math.min(records.length-1, i+1))} disabled={reviewIdx === records.length-1}
              className="btn btn-ghost btn-sm" style={{ fontSize:'0.8rem' }}>Siguiente →</button>
            <button onClick={() => setScreen('results')} className="btn btn-ghost btn-sm" style={{ fontSize:'0.8rem' }}>← Resultados</button>
          </div>
        </div>

        <div className="wl-card" style={{ padding:'1.5rem' }}>
          {/* Badge row */}
          <div style={{ display:'flex', gap:'0.5rem', marginBottom:'1rem', flexWrap:'wrap' }}>
            <span style={{ fontSize:'0.7rem', fontWeight:700, padding:'0.2rem 0.65rem', borderRadius:20, fontFamily:'var(--mono)', background:`${meta.color}14`, color:meta.color, border:`1px solid ${meta.color}33` }}>
              {meta.emoji} {meta.label}
            </span>
            <span style={{ fontSize:'0.7rem', fontWeight:700, padding:'0.2rem 0.65rem', borderRadius:20, fontFamily:'var(--mono)', background: rec.isOpen ? 'rgba(83,74,183,0.1)' : 'rgba(37,99,235,0.08)', color: rec.isOpen ? '#534AB7' : '#2563eb', border:`1px solid ${rec.isOpen ? '#534AB733' : '#2563eb22'}` }}>
              {rec.isOpen ? '✍️ Escritura' : '🔘 Opción múltiple'}
            </span>
            <span style={{ fontSize:'0.7rem', fontWeight:700, padding:'0.2rem 0.65rem', borderRadius:20, fontFamily:'var(--mono)', background: rec.correct ? 'rgba(5,150,105,0.1)' : 'rgba(220,38,38,0.08)', color: rec.correct ? '#059669' : '#dc2626', border:`1px solid ${rec.correct ? '#05966933' : '#dc262633'}` }}>
              {rec.timedOut ? '⏰ Tiempo agotado' : rec.correct ? '✓ Correcta' : '✗ Incorrecta'}
            </span>
          </div>

          {/* Stimulus */}
          {rec.q.stimulus && (
            <div style={{ background:'var(--bg-2, rgba(0,0,0,0.03))', border:'1px solid var(--line-soft)', borderRadius:10, padding:'0.85rem 1rem', marginBottom:'0.85rem', fontSize:'0.88rem', color:'var(--ink)', whiteSpace:'pre-line', lineHeight:1.65, fontStyle:'italic' }}>
              {rec.q.stimulus}
            </div>
          )}

          {/* Question */}
          <p style={{ fontWeight:600, fontSize:'1rem', margin:'0 0 1rem', lineHeight:1.6 }}>{rec.q.text}</p>

          {/* Options review */}
          <div style={{ display:'flex', flexDirection:'column', gap:'0.45rem', marginBottom:'1rem' }}>
            {rec.q.options.map((opt, i) => {
              const isCorrect = i === rec.q.answer;
              const isChosen  = !rec.isOpen && rec.chosen === i;
              let bg = 'var(--bg)', border = '1px solid var(--line-soft)', color = 'var(--muted)';
              if (isCorrect) { bg = 'rgba(5,150,105,0.1)'; border = '1px solid #059669'; color = '#059669'; }
              else if (isChosen && !isCorrect) { bg = 'rgba(220,38,38,0.07)'; border = '1px solid #dc2626'; color = '#dc2626'; }
              return (
                <div key={i} style={{ padding:'0.6rem 0.9rem', borderRadius:10, background:bg, border, color, fontSize:'0.88rem', fontWeight: isCorrect ? 700 : 400, display:'flex', gap:'0.5rem', alignItems:'center' }}>
                  <span style={{ fontFamily:'var(--mono)', fontSize:'0.7rem', minWidth:16 }}>{String.fromCharCode(65+i)}.</span>
                  {opt}
                  {isCorrect && <span style={{ marginLeft:'auto', fontSize:'0.8rem' }}>✓ correcta</span>}
                  {isChosen && !isCorrect && <span style={{ marginLeft:'auto', fontSize:'0.8rem' }}>✗ tu resp.</span>}
                </div>
              );
            })}
          </div>

          {/* Open answer shown */}
          {rec.isOpen && (
            <div style={{ background:'rgba(83,74,183,0.06)', border:'1px solid rgba(83,74,183,0.2)', borderRadius:10, padding:'0.75rem 1rem', fontSize:'0.88rem' }}>
              <span style={{ color:'var(--muted)', fontFamily:'var(--mono)', fontSize:'0.7rem', fontWeight:700 }}>TU RESPUESTA: </span>
              <span style={{ color: rec.correct ? '#059669' : '#dc2626', fontWeight:700 }}>
                {rec.timedOut ? '(sin respuesta)' : rec.typedRaw || '(vacío)'}
              </span>
              <span style={{ color:'var(--muted)', marginLeft:'0.5rem' }}>→ correcta: </span>
              <span style={{ color:'var(--wl-on-panel-ok, #059669)', fontWeight:700 }}>{correctText}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* PLAYING */
  if (!sq) return null;
  const isOpen = sq.isOpen;

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1rem', maxWidth:680, margin:'0 auto' }}>

      {/* Header bar */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'0.5rem' }}>
        <div style={{ display:'flex', gap:'0.6rem', alignItems:'center' }}>
          <span style={{ fontSize:'0.78rem', color:'var(--muted)', fontFamily:'var(--mono)' }}>
            {idx + 1} / {session.length}
          </span>
          {streak >= 2 && (
            <span style={{ fontSize:'0.72rem', fontWeight:700, color:'var(--wl-on-panel-warn, #d97706)', fontFamily:'var(--mono)', background:'rgba(217,119,6,0.1)', border:'1px solid rgba(217,119,6,0.25)', borderRadius:6, padding:'0.15rem 0.5rem' }}>
              {streak} 🔥
            </span>
          )}
          <span style={{ fontSize:'0.72rem', fontWeight:700, color:'var(--wl-on-panel-ok, #059669)', fontFamily:'var(--mono)', background:'rgba(5,150,105,0.08)', border:'1px solid rgba(5,150,105,0.2)', borderRadius:6, padding:'0.15rem 0.5rem' }}>
            {correctCount} ✓
          </span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
          <span style={{
            fontSize:'1.4rem', fontWeight:900, fontFamily:'var(--mono)',
            color: timerUrgent ? '#dc2626' : 'var(--ink)',
            transition:'color 0.3s',
            animation: timerUrgent ? 'pulse 0.8s ease-in-out infinite' : 'none',
          }}>
            {timeLeft}s
          </span>
        </div>
      </div>

      {/* Timer bar */}
      <div style={{ height:6, background:'var(--line-soft)', borderRadius:4, overflow:'hidden' }}>
        <div style={{
          height:'100%',
          width:`${timerPct}%`,
          background: timerColor,
          borderRadius:4,
          transition:'width 1s linear, background 0.5s',
        }} />
      </div>

      {/* Question card */}
      <div className="wl-card" style={{ padding:'1.5rem' }}>

        {/* Category + mode badges */}
        <div style={{ display:'flex', gap:'0.5rem', marginBottom:'0.85rem', flexWrap:'wrap' }}>
          {catMeta && (
            <span style={{ fontSize:'0.7rem', fontWeight:700, padding:'0.2rem 0.65rem', borderRadius:20, fontFamily:'var(--mono)', background:`${catMeta.color}14`, color:catMeta.color, border:`1px solid ${catMeta.color}33` }}>
              {catMeta.emoji} {catMeta.label}
            </span>
          )}
          {isOpen && !submitted && (
            <span style={{ fontSize:'0.7rem', fontWeight:700, padding:'0.2rem 0.65rem', borderRadius:20, fontFamily:'var(--mono)', background:'rgba(83,74,183,0.1)', color:'var(--wl-on-panel-link, #534AB7)', border:'1px solid rgba(83,74,183,0.25)' }}>
              ✍️ Escribe la respuesta
            </span>
          )}
        </div>

        {/* Stimulus */}
        {sq.q.stimulus && (
          <div style={{
            background:'var(--bg-2, rgba(0,0,0,0.03))',
            border:'1px solid var(--line-soft)',
            borderRadius:10, padding:'0.85rem 1rem', marginBottom:'0.85rem',
            fontSize:'0.88rem', color:'var(--ink)', whiteSpace:'pre-line', lineHeight:1.65, fontStyle:'italic',
          }}>
            {sq.q.stimulus}
          </div>
        )}

        {/* Question text */}
        <p style={{ fontWeight:600, fontSize:'1.05rem', margin:'0 0 1.25rem', lineHeight:1.6 }}>
          {sq.q.text}
        </p>

        {/* MCQ options */}
        {!isOpen && (
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.55rem' }}>
            {sq.q.options.map((opt, i) => {
              const isCorrect = i === sq.q.answer;
              const isChosen  = chosen === i;
              let bg = 'var(--bg)', border = '1.5px solid var(--line-soft)', color = 'var(--ink)';
              if (submitted) {
                if (isCorrect)             { bg = 'rgba(5,150,105,0.1)'; border = '1.5px solid #059669'; color = '#059669'; }
                else if (isChosen)         { bg = 'rgba(220,38,38,0.07)'; border = '1.5px solid #dc2626'; color = '#dc2626'; }
              } else if (isChosen) {
                bg = 'rgba(83,74,183,0.08)'; border = '1.5px solid #534AB7'; color = '#534AB7';
              }
              return (
                <button
                  key={i}
                  onClick={() => { handleMCQSelect(i); if (!submitted) handleSubmit(false); }}
                  disabled={submitted}
                  style={{
                    padding:'0.85rem 0.9rem', borderRadius:12, border, background:bg, color,
                    fontSize:'0.9rem', fontWeight: submitted && isCorrect ? 700 : 500,
                    cursor: submitted ? 'default' : 'pointer',
                    fontFamily:'inherit', transition:'all 0.18s', textAlign:'left', lineHeight:1.4,
                    display:'flex', gap:'0.5rem', alignItems:'flex-start',
                  }}
                >
                  <span style={{ fontFamily:'var(--mono)', fontSize:'0.72rem', fontWeight:800, minWidth:18, paddingTop:'0.1rem', opacity:0.6 }}>
                    {String.fromCharCode(65+i)}.
                  </span>
                  <span>{opt}</span>
                  {submitted && isCorrect && <span style={{ marginLeft:'auto', fontSize:'0.85rem', flexShrink:0 }}>✓</span>}
                  {submitted && isChosen && !isCorrect && <span style={{ marginLeft:'auto', fontSize:'0.85rem', flexShrink:0 }}>✗</span>}
                </button>
              );
            })}
          </div>
        )}

        {/* Open input */}
        {isOpen && !submitted && (
          <form onSubmit={handleOpenSubmit} style={{ display:'flex', gap:'0.65rem', flexWrap:'wrap' }}>
            <div style={{ flex:'1 1 220px', position:'relative' }}>
              <input
                autoFocus
                value={typed}
                onChange={e => setTyped(e.target.value)}
                placeholder={sq.q.openHint ?? 'Escribe tu respuesta…'}
                style={{
                  width:'100%', padding:'0.85rem 1rem', fontSize:'1.05rem',
                  borderRadius:10, border:'2px solid rgba(83,74,183,0.4)',
                  background:'var(--bg)', color:'var(--ink)', fontFamily:'inherit', outline:'none',
                  boxSizing:'border-box',
                }}
              />
            </div>
            <button type="submit" className="btn" style={{ fontSize:'0.9rem', padding:'0.85rem 1.25rem', borderRadius:10, flexShrink:0 }}>
              Confirmar →
            </button>
          </form>
        )}

        {/* Open — feedback after submit */}
        {isOpen && submitted && (
          <div style={{ display:'flex', flexDirection:'column', gap:'0.6rem' }}>
            <div style={{
              padding:'0.85rem 1rem', borderRadius:12,
              background: records[records.length-1]?.correct ? 'rgba(5,150,105,0.1)' : 'rgba(220,38,38,0.07)',
              border: `1.5px solid ${records[records.length-1]?.correct ? '#059669' : '#dc2626'}`,
              fontSize:'0.9rem',
            }}>
              <span style={{ fontFamily:'var(--mono)', fontSize:'0.7rem', fontWeight:700, color:'var(--muted)' }}>TU RESPUESTA: </span>
              <strong style={{ color: records[records.length-1]?.correct ? '#059669' : '#dc2626' }}>
                {typed || '(sin respuesta)'}
              </strong>
            </div>
            <div style={{
              padding:'0.85rem 1rem', borderRadius:12,
              background:'rgba(5,150,105,0.08)', border:'1.5px solid #05966933',
              fontSize:'0.9rem', color:'var(--wl-on-panel-ok, #059669)', fontWeight:700,
            }}>
              ✓ Respuesta correcta: <strong>{sq.q.options[sq.q.answer]}</strong>
            </div>
          </div>
        )}

        {/* Timed out notice */}
        {submitted && records[records.length-1]?.timedOut && (
          <div style={{ marginTop:'0.75rem', padding:'0.75rem 1rem', borderRadius:10, background:'rgba(220,38,38,0.07)', border:'1px solid #dc262633', fontSize:'0.85rem', color:'var(--wl-on-panel-alert, #dc2626)', fontWeight:600 }}>
            ⏰ Tiempo agotado — la respuesta correcta era <strong>{sq.q.options[sq.q.answer]}</strong>.
          </div>
        )}
      </div>

      {/* Next */}
      {submitted && (
        <button onClick={nextQuestion} className="btn" style={{ fontSize:'0.95rem', padding:'0.9rem', borderRadius:12 }}>
          {idx + 1 < session.length ? 'Siguiente pregunta →' : 'Ver resultados →'}
        </button>
      )}

      {/* Progress dots */}
      <div style={{ display:'flex', gap:'0.3rem', justifyContent:'center', flexWrap:'wrap' }}>
        {session.map((_, i) => {
          const rec = records[i];
          const bg = i === idx ? '#534AB7' : rec ? (rec.correct ? '#059669' : '#dc2626') : 'var(--line-soft)';
          return (
            <div key={i} style={{
              width: i === idx ? 20 : 10, height:10,
              borderRadius:5, background:bg, transition:'all 0.25s',
            }} />
          );
        })}
      </div>

      <style>{`
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }
      `}</style>
    </div>
  );
}
