'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

type GamePhase = 'intro' | 'playing' | 'levelup' | 'gameover' | 'victory';

interface MCQQuestion {
  id: string; type: 'mcq'; level: 1 | 2 | 3 | 4;
  topic: string; sentence: string; options: string[]; answer: number;
}
interface FillQuestion {
  id: string; type: 'fill'; level: 3;
  topic: string; sentence: string; hint: string; accepted: string[];
}
type Question = MCQQuestion | FillQuestion;

// ─── Question Bank ────────────────────────────────────────────────────────────

const ALL_QUESTIONS: Question[] = [
  // ── Livello 1 — Articoli & Accordo (15s) ─────────────────────────────────
  { id:'l1q01', type:'mcq', level:1, topic:'Articoli determinativi',
    sentence:'___ libro è sul tavolo.', options:['Il','La','Lo',"L'"], answer:0 },
  { id:'l1q02', type:'mcq', level:1, topic:'Articoli determinativi',
    sentence:"___ amica di Luca è molto simpatica.", options:['La',"L'",'Una',"Un'"], answer:1 },
  { id:'l1q03', type:'mcq', level:1, topic:'Accordo aggettivo',
    sentence:'Le ragazze sono molto ___.',
    options:['intelligente','intelligento','intelligenti','intelligentes'], answer:2 },
  { id:'l1q04', type:'mcq', level:1, topic:'Articoli determinativi',
    sentence:'___ zaino di Marco pesa troppo.', options:['Il','La','Lo',"L'"], answer:2 },
  { id:'l1q05', type:'mcq', level:1, topic:'Articoli plurali',
    sentence:'Ho incontrato ___ amici di Sara.', options:['i','gli','le',"l'"], answer:1 },
  { id:'l1q06', type:'mcq', level:1, topic:'Accordo aggettivo',
    sentence:'La lezione di oggi è ___.',
    options:['difficile','difficili','difficilo','difficiles'], answer:0 },
  { id:'l1q07', type:'mcq', level:1, topic:'Articoli determinativi',
    sentence:'___ studente parla bene il francese.', options:['Il','La','Lo',"L'"], answer:2 },
  { id:'l1q08', type:'mcq', level:1, topic:'Articoli indeterminativi',
    sentence:'Ho comprato ___ bella borsa al mercato.', options:['una',"un'",'un','uno'], answer:0 },
  { id:'l1q09', type:'mcq', level:1, topic:'Plurale dei nomi',
    sentence:'Quanti ___ hai letto questo mese?  (libro)',
    options:['libri','libros','libre','librie'], answer:0 },
  { id:'l1q10', type:'mcq', level:1, topic:'Accordo aggettivo plurale',
    sentence:'Marco e Luigi sono dei ragazzi molto ___.',
    options:['bravo','brava','brave','bravi'], answer:3 },

  // ── Livello 2 — Tempi Verbali (12s) ──────────────────────────────────────
  { id:'l2q01', type:'mcq', level:2, topic:'Passato prossimo',
    sentence:'Ieri sera io ___ una pizza al ristorante.',
    options:['ho mangiato','mangiavo','mangerò','stavo mangiando'], answer:0 },
  { id:'l2q02', type:'mcq', level:2, topic:'Imperfetto',
    sentence:'Quando ero piccolo, ___ sempre al parco.',
    options:['ho giocato','giocavo','giocherò','gioco'], answer:1 },
  { id:'l2q03', type:'mcq', level:2, topic:'Futuro',
    sentence:'Domani noi ___ al cinema insieme.',
    options:['siamo andati','andavamo','andremo','andiamo'], answer:2 },
  { id:'l2q04', type:'mcq', level:2, topic:'Imperfetto',
    sentence:'Maria ___ quando ho chiamato.',
    options:['ha dormito','dormiva','dormirà','dorme'], answer:1 },
  { id:'l2q05', type:'mcq', level:2, topic:'Passato prossimo',
    sentence:'Stamattina io ___ il caffè al bar.',
    options:['prendevo','prenderò','ho preso','prendo'], answer:2 },
  { id:'l2q06', type:'mcq', level:2, topic:'Futuro',
    sentence:"L'anno prossimo lei ___ a Roma per lavoro.",
    options:['si è trasferita','si trasferiva','si trasferirà','si trasferisce'], answer:2 },
  { id:'l2q07', type:'mcq', level:2, topic:'Imperfetto',
    sentence:'Mentre lui ___, è squillato il telefono.',
    options:['ha studiato','studiava','studierà','studia'], answer:1 },
  { id:'l2q08', type:'mcq', level:2, topic:'Passato prossimo',
    sentence:"L'anno scorso loro ___ in Italia per sei mesi.",
    options:['vivevano','vivranno','hanno vissuto','vivono'], answer:2 },
  { id:'l2q09', type:'mcq', level:2, topic:'Presente continuo',
    sentence:'Stavo ___ quando è arrivata la polizia.',
    options:['dormire','dormito','dormendo','dormo'], answer:2 },
  { id:'l2q10', type:'mcq', level:2, topic:'Futuro',
    sentence:'Se non studi, ___ il corso.',
    options:['perdevi','perdi','perderai','hai perso'], answer:2 },

  // ── Livello 3 — Scrivi tu! (15s) ─────────────────────────────────────────
  { id:'l3q01', type:'fill', level:3, topic:'Passato prossimo',
    sentence:'Ieri io ___ (andare) al mercato.',
    hint:"Passato prossimo di 'andare' — usa ESSERE",
    accepted:['sono andato','sono andata'] },
  { id:'l3q02', type:'fill', level:3, topic:'Imperfetto',
    sentence:'Quando ero bambino, io ___ (abitare) in campagna.',
    hint:"Imperfetto di 'abitare' (io)",
    accepted:['abitavo'] },
  { id:'l3q03', type:'fill', level:3, topic:'Futuro',
    sentence:"L'anno prossimo tu ___ (studiare) a Milano.",
    hint:"Futuro di 'studiare' (tu)",
    accepted:['studierai'] },
  { id:'l3q04', type:'fill', level:3, topic:'Presente riflessivo',
    sentence:'Il ragazzo ___ (chiamarsi) Marco.',
    hint:"Presente di 'chiamarsi' (lui/lei)",
    accepted:['si chiama'] },
  { id:'l3q05', type:'fill', level:3, topic:'Passato continuo',
    sentence:'Noi ___ (stare + mangiare) quando è arrivata.',
    hint:"Imperfetto di 'stare' (noi) + gerundio di 'mangiare'",
    accepted:['stavamo mangiando'] },
  { id:'l3q06', type:'fill', level:3, topic:'Passato prossimo',
    sentence:'Voi ___ già (finire) i compiti?',
    hint:"Passato prossimo di 'finire' (voi)",
    accepted:['avete finito'] },
  { id:'l3q07', type:'fill', level:3, topic:'Imperfetto',
    sentence:'Lei ___ (essere) molto stanca ieri sera.',
    hint:"Imperfetto di 'essere' (lei)",
    accepted:['era'] },
  { id:'l3q08', type:'fill', level:3, topic:'Futuro irregolare',
    sentence:'Io ___ (venire) da te domani mattina.',
    hint:"Futuro irregolare di 'venire' (io)",
    accepted:['verrò','verro'] },
  { id:'l3q09', type:'fill', level:3, topic:'Passato prossimo',
    sentence:'Loro ___ (partire) stamattina presto.',
    hint:"Passato prossimo di 'partire' — usa ESSERE",
    accepted:['sono partiti','sono partite'] },
  { id:'l3q10', type:'fill', level:3, topic:'Futuro irregolare',
    sentence:'Voi ___ (dovere) studiare di più.',
    hint:"Futuro irregolare di 'dovere' (voi)",
    accepted:['dovrete'] },

  // ── Livello 4 — L'Esperto (10s) ──────────────────────────────────────────
  { id:'l4q01', type:'mcq', level:4, topic:'Pronome relativo (soggetto)',
    sentence:'Il libro ___ leggo è molto interessante.',
    options:['che','cui','chi','quale'], answer:0 },
  { id:'l4q02', type:'mcq', level:4, topic:"C'è / Ci sono",
    sentence:'___ sono molti studenti in classe oggi.',
    options:["C'","Ci","Là","Ne"], answer:1 },
  { id:'l4q03', type:'mcq', level:4, topic:'Essere vs Avere',
    sentence:'Ieri sera loro ___ rimasti a casa.',
    options:['hanno','sono','erano','stanno'], answer:1 },
  { id:'l4q04', type:'mcq', level:4, topic:'Verbi riflessivi + essere',
    sentence:'Maria si ___ alzata molto tardi stamattina.',
    options:['ha','è','aveva','stava'], answer:1 },
  { id:'l4q05', type:'mcq', level:4, topic:'Pronome relativo + preposizione',
    sentence:'La persona con ___ lavoro si chiama Anna.',
    options:['che','chi','cui','quale'], answer:2 },
  { id:'l4q06', type:'mcq', level:4, topic:'Ne partitivo',
    sentence:'Di libri, quanti ___ hai letto questo mese?',
    options:['li','ne','ci','gli'], answer:1 },
  { id:'l4q07', type:'mcq', level:4, topic:'Essere vs Avere (moto)',
    sentence:"I bambini ___ corsi nel parco tutto il pomeriggio.",
    options:['hanno','sono','erano','stavano'], answer:1 },
  { id:'l4q08', type:'mcq', level:4, topic:'Pronome relativo di luogo',
    sentence:'La città ___ vivo è bellissima.',
    options:['che','cui','dove','chi'], answer:2 },
  { id:'l4q09', type:'mcq', level:4, topic:"C'è vs Ci sono",
    sentence:'___ una bella piazza nel centro storico.',
    options:["C'è","Ci sono","Là è","C'erano"], answer:0 },
  { id:'l4q10', type:'mcq', level:4, topic:'Essere vs Avere (diventare)',
    sentence:'Lei ___ diventata professoressa dopo anni di studio.',
    options:['ha','è','aveva','stava'], answer:1 },
];

// ─── Level Config ─────────────────────────────────────────────────────────────

const LEVEL_CFG = {
  1: { time: 15, color: '#60a5fa', label: 'Livello 1', subtitle: 'Articoli & Accordo', icon: '📖' },
  2: { time: 12, color: '#a78bfa', label: 'Livello 2', subtitle: 'Tempi Verbali',      icon: '⏱️' },
  3: { time: 15, color: '#fbbf24', label: 'Livello 3', subtitle: 'Scrivi tu!',          icon: '✍️' },
  4: { time: 10, color: '#f87171', label: 'Livello 4', subtitle: "L'Esperto",           icon: '🔥' },
} as const;

// ─── Utilities ────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function normalize(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');
}

function getLevelQuestions(level: 1 | 2 | 3 | 4): Question[] {
  return shuffle(ALL_QUESTIONS.filter(q => q.level === level));
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TimerRing({ timeLeft, maxTime }: { timeLeft: number; maxTime: number }) {
  const r = 26;
  const circ = 2 * Math.PI * r;
  const progress = timeLeft / maxTime;
  const offset = circ * (1 - progress);
  const color = progress > 0.5 ? '#22c55e' : progress > 0.25 ? '#f59e0b' : '#ef4444';

  return (
    <div className="relative flex items-center justify-center" style={{ width: 64, height: 64 }}>
      <svg className="absolute inset-0" style={{ transform: 'rotate(-90deg)' }} width="64" height="64">
        <circle cx="32" cy="32" r={r} fill="none" stroke="#1e293b" strokeWidth="4" />
        <circle
          cx="32" cy="32" r={r} fill="none"
          stroke={color} strokeWidth="4"
          strokeDasharray={`${circ}`}
          strokeDashoffset={`${offset}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.9s linear, stroke 0.3s ease' }}
        />
      </svg>
      <span className="relative text-lg font-bold tabular-nums" style={{ color }}>
        {timeLeft}
      </span>
    </div>
  );
}

function SentenceDisplay({ sentence, color }: { sentence: string; color: string }) {
  const parts = sentence.split('___');
  return (
    <p className="text-2xl sm:text-3xl font-semibold text-white leading-relaxed text-center">
      {parts[0]}
      <span
        className="inline-block mx-1 px-3 py-0.5 rounded font-bold"
        style={{
          background: `${color}22`,
          borderBottom: `3px solid ${color}`,
          minWidth: 80,
          textAlign: 'center',
          color,
        }}
      >
        ???
      </span>
      {parts[1] ?? ''}
    </p>
  );
}

function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen bg-[#080810] flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl text-center"
      >
        <div className="text-5xl mb-4">🇮🇹</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          Grammatica Italiana
        </h1>
        <p className="text-gray-400 mb-8 text-base">
          4 livelli · 40 domande · Supera tutti i livelli senza perdere le vite
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {([1, 2, 3, 4] as const).map(lvl => {
            const c = LEVEL_CFG[lvl];
            return (
              <div
                key={lvl}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{c.icon}</span>
                  <span className="font-semibold text-white">{c.label}</span>
                  <span
                    className="ml-auto text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: `${c.color}22`, color: c.color }}
                  >
                    {c.time}s / pregunta
                  </span>
                </div>
                <p className="text-sm text-gray-400">{c.subtitle}</p>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center gap-6 text-sm text-gray-400 mb-8">
          <span>❤️❤️❤️ 3 vidas</span>
          <span>🔥 Racha ×2 / ×3</span>
          <span>⏱️ Timer por nivel</span>
        </div>

        <button
          onClick={onStart}
          className="px-10 py-4 rounded-2xl font-bold text-lg text-white transition-all hover:scale-105 active:scale-95"
          style={{ background: 'linear-gradient(135deg, #009246, #ce2b37)' }}
        >
          Inizia il gioco
        </button>
      </motion.div>
    </div>
  );
}

function LevelUpScreen({
  level, score, correct, total, onContinue,
}: {
  level: 1 | 2 | 3 | 4; score: number; correct: number; total: number; onContinue: () => void;
}) {
  const nextLevel = (level + 1) as 2 | 3 | 4;
  const nextCfg = LEVEL_CFG[nextLevel];
  const pct = Math.round((correct / total) * 100);

  return (
    <div className="min-h-screen bg-[#080810] flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md text-center"
      >
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-6xl mb-4"
        >
          🎉
        </motion.div>
        <h2 className="text-2xl font-bold text-white mb-1">
          {LEVEL_CFG[level].label} completato!
        </h2>
        <p className="text-gray-400 mb-6">{correct}/{total} risposte corrette ({pct}%)</p>

        <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 mb-6">
          <div className="text-3xl font-bold text-white mb-1">{score} pt</div>
          <div className="text-sm text-gray-400">Punteggio accumulato</div>
        </div>

        <div
          className="rounded-xl border px-4 py-3 mb-8 text-left"
          style={{ borderColor: `${nextCfg.color}44`, background: `${nextCfg.color}11` }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">{nextCfg.icon}</span>
            <span className="font-semibold text-white">{nextCfg.label}</span>
            <span
              className="ml-auto text-xs px-2 py-0.5 rounded-full"
              style={{ background: `${nextCfg.color}22`, color: nextCfg.color }}
            >
              {nextCfg.time}s / domanda
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1 ml-7">{nextCfg.subtitle}</p>
        </div>

        <button
          onClick={onContinue}
          className="px-10 py-4 rounded-2xl font-bold text-lg text-white w-full transition-all hover:scale-105 active:scale-95"
          style={{ background: nextCfg.color }}
        >
          Vai al {nextCfg.label} →
        </button>
      </motion.div>
    </div>
  );
}

function GameOverScreen({ score, onRetry }: { score: number; onRetry: () => void }) {
  return (
    <div className="min-h-screen bg-[#080810] flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md text-center"
      >
        <div className="text-6xl mb-4">💔</div>
        <h2 className="text-2xl font-bold text-white mb-2">Hai esaurito le vite</h2>
        <p className="text-gray-400 mb-6">Non mollare — ogni errore è una lezione!</p>

        <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 mb-8">
          <div className="text-3xl font-bold text-white mb-1">{score} pt</div>
          <div className="text-sm text-gray-400">Punteggio finale</div>
        </div>

        <button
          onClick={onRetry}
          className="px-10 py-4 rounded-2xl font-bold text-lg text-white w-full transition-all hover:scale-105 active:scale-95 bg-blue-600 hover:bg-blue-500"
        >
          Riprova dall&apos;inizio
        </button>
      </motion.div>
    </div>
  );
}

function VictoryScreen({ score, streak, onRetry }: { score: number; streak: number; onRetry: () => void }) {
  return (
    <div className="min-h-screen bg-[#080810] flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md text-center"
      >
        <motion.div
          animate={{ rotate: [0, 15, -15, 10, -10, 0], scale: [1, 1.2, 1] }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-7xl mb-4"
        >
          🏆
        </motion.div>
        <h2 className="text-3xl font-bold text-white mb-2">Hai completato tutto!</h2>
        <p className="text-gray-400 mb-8">
          Bravo! Hai superato tutti e 4 i livelli della grammatica italiana.
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5">
            <div className="text-3xl font-bold text-white">{score}</div>
            <div className="text-sm text-gray-400 mt-1">Punti totali</div>
          </div>
          <div className="rounded-2xl border border-amber-500/30 bg-amber-900/10 px-4 py-5">
            <div className="text-3xl font-bold text-amber-400">{streak} 🔥</div>
            <div className="text-sm text-gray-400 mt-1">Racha finale</div>
          </div>
        </div>

        {score >= 300 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="rounded-xl border border-green-500/30 bg-green-900/10 px-4 py-3 mb-6 text-green-400 text-sm font-medium"
          >
            ⭐ Risultato eccellente! La tua grammatica è solida.
          </motion.div>
        )}

        <button
          onClick={onRetry}
          className="px-10 py-4 rounded-2xl font-bold text-lg text-white w-full transition-all hover:scale-105 active:scale-95"
          style={{ background: 'linear-gradient(135deg, #009246, #ce2b37)' }}
        >
          Gioca ancora
        </button>
        <a
          href="/dashboard/student"
          className="block mt-3 text-sm text-gray-500 hover:text-gray-300 transition-colors"
        >
          ← Volver al panel
        </a>
      </motion.div>
    </div>
  );
}

// ─── Main Game ────────────────────────────────────────────────────────────────

export default function ItalianGrammarGame() {
  const [phase, setPhase]           = useState<GamePhase>('intro');
  const [level, setLevel]           = useState<1 | 2 | 3 | 4>(1);
  const [lives, setLives]           = useState(3);
  const [score, setScore]           = useState(0);
  const [streak, setStreak]         = useState(0);
  const [qs, setQs]                 = useState<Question[]>([]);
  const [qi, setQi]                 = useState(0);
  const [timeLeft, setTimeLeft]     = useState(15);
  const [feedback, setFeedback]     = useState<'correct' | 'wrong' | null>(null);
  const [wrongAnswer, setWrongAnswer] = useState<string | null>(null);
  const [selected, setSelected]     = useState<number | null>(null);
  const [fillValue, setFillValue]   = useState('');
  const [showHint, setShowHint]     = useState(false);
  const [timedOut, setTimedOut]     = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const q = qs[qi] as Question | undefined;
  const cfg = LEVEL_CFG[level];

  // ── Start level ───────────────────────────────────────────────────────────
  const startLevel = useCallback((lvl: 1 | 2 | 3 | 4) => {
    setLevel(lvl);
    setQs(getLevelQuestions(lvl));
    setQi(0);
    setTimeLeft(LEVEL_CFG[lvl].time);
    setFeedback(null);
    setSelected(null);
    setFillValue('');
    setShowHint(false);
    setWrongAnswer(null);
    setCorrectCount(0);
    setPhase('playing');
  }, []);

  const startGame = useCallback(() => {
    setLives(3);
    setScore(0);
    setStreak(0);
    startLevel(1);
  }, [startLevel]);

  // ── Process answer ────────────────────────────────────────────────────────
  const processAnswer = useCallback(
    (correct: boolean, correctAnswer?: string) => {
      clearInterval(intervalRef.current);

      const multi = streak >= 5 ? 3 : streak >= 3 ? 2 : 1;
      const pts = correct ? 10 * multi : 0;

      setFeedback(correct ? 'correct' : 'wrong');
      if (!correct && correctAnswer) setWrongAnswer(correctAnswer);
      if (correct) setCorrectCount(c => c + pts > 0 ? c + 1 : c + 1);

      setScore(s => s + pts);
      setStreak(correct ? streak + 1 : 0);

      const newLives = correct ? lives : lives - 1;
      if (!correct) setLives(newLives);

      setTimeout(() => {
        if (newLives <= 0) { setPhase('gameover'); return; }
        const nextQi = qi + 1;
        if (nextQi >= qs.length) {
          setPhase(level === 4 ? 'victory' : 'levelup');
          return;
        }
        setQi(nextQi);
        setFeedback(null);
        setSelected(null);
        setFillValue('');
        setShowHint(false);
        setWrongAnswer(null);
        setTimeLeft(LEVEL_CFG[level].time);
      }, 1500);
    },
    [streak, lives, qi, qs.length, level],
  );

  // ── Timeout signal ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!timedOut) return;
    setTimedOut(false);
    const correctAns = q
      ? q.type === 'mcq' ? q.options[q.answer] : q.accepted[0]
      : undefined;
    processAnswer(false, correctAns);
  }, [timedOut, q, processAnswer]);

  // ── Timer ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'playing' || feedback !== null) return;
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(intervalRef.current);
          setTimedOut(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [phase, feedback, qi]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleMCQ = (idx: number) => {
    if (feedback !== null || q?.type !== 'mcq') return;
    setSelected(idx);
    const correct = idx === q.answer;
    processAnswer(correct, correct ? undefined : q.options[q.answer]);
  };

  const handleFill = () => {
    if (feedback !== null || q?.type !== 'fill') return;
    const user = normalize(fillValue);
    const correct = q.accepted.some(a => normalize(a) === user);
    processAnswer(correct, correct ? undefined : q.accepted[0]);
  };

  // ── Phase routing ─────────────────────────────────────────────────────────
  if (phase === 'intro') return <IntroScreen onStart={startGame} />;

  if (phase === 'levelup') {
    const nextLevel = (level + 1) as 2 | 3 | 4;
    return (
      <LevelUpScreen
        level={level}
        score={score}
        correct={correctCount}
        total={qs.length}
        onContinue={() => startLevel(nextLevel)}
      />
    );
  }

  if (phase === 'gameover') return <GameOverScreen score={score} onRetry={startGame} />;
  if (phase === 'victory')  return <VictoryScreen  score={score} streak={streak} onRetry={startGame} />;
  if (!q) return null;

  const progressPct = ((qi + (feedback !== null ? 1 : 0)) / qs.length) * 100;

  return (
    <div className="min-h-screen bg-[#080810] flex flex-col items-center justify-start px-4 py-8">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="w-full max-w-2xl flex items-center justify-between mb-4">

        {/* Lives */}
        <div className="flex gap-1">
          {[0, 1, 2].map(i => (
            <motion.span
              key={i}
              animate={lives <= i ? { scale: [1, 1.4, 0.7, 1] } : {}}
              transition={{ duration: 0.4 }}
              className="text-xl sm:text-2xl"
            >
              {lives > i ? '❤️' : '🖤'}
            </motion.span>
          ))}
        </div>

        {/* Level badge */}
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: cfg.color }}>
            {cfg.icon} {cfg.label}
          </span>
          <span className="text-xs text-gray-500">{cfg.subtitle}</span>
        </div>

        {/* Score + streak + timer */}
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-lg font-bold text-white tabular-nums">{score}</div>
            {streak >= 3 ? (
              <div className="text-xs font-bold text-amber-400">
                🔥 ×{streak >= 5 ? 3 : 2}
              </div>
            ) : (
              <div className="text-xs text-gray-500">punti</div>
            )}
          </div>
          <TimerRing timeLeft={timeLeft} maxTime={cfg.time} />
        </div>
      </div>

      {/* ── Progress bar ───────────────────────────────────────────────────── */}
      <div className="w-full max-w-2xl h-1.5 bg-gray-800/80 rounded-full mb-6">
        <motion.div
          className="h-full rounded-full"
          style={{ background: cfg.color }}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* ── Question card ──────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.2 }}
          className={[
            'w-full max-w-2xl rounded-2xl border p-6 sm:p-8',
            feedback === 'correct' ? 'border-green-500/40 bg-green-900/10'
              : feedback === 'wrong' ? 'border-red-500/40 bg-red-900/10'
              : 'border-white/10 bg-white/[0.04]',
          ].join(' ')}
        >
          {/* Topic + counter */}
          <div className="flex items-center justify-between mb-6">
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: `${cfg.color}20`, color: cfg.color }}
            >
              {q.topic}
            </span>
            <span className="text-xs text-gray-500 tabular-nums">{qi + 1} / {qs.length}</span>
          </div>

          {/* Sentence */}
          <div className="mb-7">
            <SentenceDisplay sentence={q.sentence} color={cfg.color} />
          </div>

          {/* Feedback message */}
          <AnimatePresence>
            {feedback && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`mb-4 text-center font-semibold text-base ${
                  feedback === 'correct' ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {feedback === 'correct' ? (
                  <>✓ Corretto! {streak >= 3 ? ` +${streak >= 5 ? 30 : 20} punti 🔥` : ' +10 pt'}</>
                ) : (
                  <>
                    {wrongAnswer
                      ? <>✗ Era: <span className="font-bold text-white">&ldquo;{wrongAnswer}&rdquo;</span></>
                      : '✗ Tempo scaduto!'}
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── MCQ options ──────────────────────────────────────────────── */}
          {q.type === 'mcq' && (
            <div className="grid grid-cols-2 gap-3">
              {q.options.map((opt, i) => {
                let cls = 'border border-white/10 bg-white/5 text-white hover:border-white/30 hover:bg-white/10 cursor-pointer';
                if (feedback !== null) {
                  if (i === q.answer)
                    cls = 'border-green-500 bg-green-900/30 text-green-300 cursor-default';
                  else if (i === selected)
                    cls = 'border-red-500 bg-red-900/30 text-red-300 cursor-default';
                  else
                    cls = 'border-white/5 bg-transparent text-gray-600 cursor-default';
                }
                return (
                  <button
                    key={i}
                    onClick={() => handleMCQ(i)}
                    disabled={feedback !== null}
                    className={`rounded-xl px-4 py-3 font-semibold text-base transition-all duration-150 ${cls}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          )}

          {/* ── Fill input ───────────────────────────────────────────────── */}
          {q.type === 'fill' && (
            <div className="space-y-3">
              <AnimatePresence>
                {showHint && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-sm text-center"
                    style={{ color: cfg.color }}
                  >
                    💡 {q.hint}
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={fillValue}
                  onChange={e => setFillValue(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleFill(); }}
                  disabled={feedback !== null}
                  placeholder="Scrivi la forma corretta…"
                  autoFocus
                  className="flex-1 rounded-xl bg-white/10 border border-white/15 px-4 py-3 text-white text-base outline-none focus:border-white/40 placeholder-gray-600 disabled:opacity-50 transition-colors"
                />
                <button
                  onClick={handleFill}
                  disabled={feedback !== null || !fillValue.trim()}
                  className="px-5 py-3 rounded-xl font-bold text-white text-xl transition-all disabled:opacity-30 hover:scale-105 active:scale-95"
                  style={{ background: cfg.color }}
                >
                  →
                </button>
              </div>

              {!showHint && feedback === null && (
                <button
                  onClick={() => setShowHint(true)}
                  className="text-xs text-gray-600 hover:text-gray-400 w-full text-center transition-colors"
                >
                  💡 Mostra suggerimento
                </button>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Streak indicator ───────────────────────────────────────────────── */}
      {streak >= 2 && phase === 'playing' && (
        <motion.div
          key={streak}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="mt-4 text-sm font-bold text-amber-400"
        >
          🔥 Striscia di {streak} risposte corrette!
        </motion.div>
      )}
    </div>
  );
}
