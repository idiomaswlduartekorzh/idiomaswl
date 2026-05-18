'use client';

import { useCallback, useRef } from 'react';

// ── Lesson Sound Engine ────────────────────────────────────────────────────────
// Web Audio API — no external files, no latency, premium feel.
// All sounds are synthesized programmatically for instant response.

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    return new (window.AudioContext || (window as any).webkitAudioContext)();
  } catch {
    return null;
  }
}

// ── Primitives ─────────────────────────────────────────────────────────────────

function playTone(
  ctx: AudioContext,
  freq: number,
  startTime: number,
  duration: number,
  gain = 0.18,
  type: OscillatorType = 'sine',
  fadeOut = true,
) {
  const osc = ctx.createOscillator();
  const gainNode = ctx.createGain();
  osc.connect(gainNode);
  gainNode.connect(ctx.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(freq, startTime);
  gainNode.gain.setValueAtTime(gain, startTime);
  if (fadeOut) {
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
  }
  osc.start(startTime);
  osc.stop(startTime + duration + 0.01);
}

// ── Sound library ──────────────────────────────────────────────────────────────

/** ✅ Correct answer — warm C major arpeggio (C5 · E5 · G5) */
function playCorrect(ctx: AudioContext) {
  const t = ctx.currentTime;
  playTone(ctx, 523.25, t,        0.22, 0.15, 'sine'); // C5
  playTone(ctx, 659.25, t + 0.10, 0.22, 0.13, 'sine'); // E5
  playTone(ctx, 783.99, t + 0.20, 0.30, 0.12, 'sine'); // G5
}

/** ❌ Wrong answer — soft low thud, not punishing */
function playWrong(ctx: AudioContext) {
  const t = ctx.currentTime;
  playTone(ctx, 220, t, 0.18, 0.12, 'triangle');
  playTone(ctx, 196, t + 0.05, 0.15, 0.08, 'triangle');
}

/** 🧱 Block assembly click — subtle percussive */
function playAssemble(ctx: AudioContext) {
  const t = ctx.currentTime;
  const buf = ctx.createBuffer(1, ctx.sampleRate * 0.06, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 4) * 0.3;
  }
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.35, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
  src.connect(g);
  g.connect(ctx.destination);
  src.start(t);
}

/** 🎉 Stage / section complete — rising 3-note melody */
function playComplete(ctx: AudioContext) {
  const t = ctx.currentTime;
  playTone(ctx, 523.25, t,        0.25, 0.14, 'sine'); // C5
  playTone(ctx, 659.25, t + 0.18, 0.25, 0.13, 'sine'); // E5
  playTone(ctx, 1046.5, t + 0.36, 0.40, 0.12, 'sine'); // C6
}

/** 🔥 Streak milestone — bright sparkle */
function playStreak(ctx: AudioContext) {
  const t = ctx.currentTime;
  [783.99, 880, 987.77, 1046.5].forEach((freq, i) => {
    playTone(ctx, freq, t + i * 0.07, 0.18, 0.1, 'sine');
  });
}

/** 🔊 Korean TTS — speaks Korean text via Web Speech API */
function speakKorean(text: string, rate = 0.9) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'ko-KR';
  u.rate = rate;
  u.volume = 1;
  window.speechSynthesis.speak(u);
}

// ── Hook ───────────────────────────────────────────────────────────────────────

export function useSound() {
  const ctxRef = useRef<AudioContext | null>(null);

  function ctx(): AudioContext | null {
    if (!ctxRef.current) {
      ctxRef.current = getCtx();
    }
    // Resume if suspended (browser autoplay policy)
    if (ctxRef.current?.state === 'suspended') {
      ctxRef.current.resume().catch(() => {});
    }
    return ctxRef.current;
  }

  const correct  = useCallback(() => { const c = ctx(); if (c) playCorrect(c);  }, []);
  const wrong    = useCallback(() => { const c = ctx(); if (c) playWrong(c);    }, []);
  const assemble = useCallback(() => { const c = ctx(); if (c) playAssemble(c); }, []);
  const complete = useCallback(() => { const c = ctx(); if (c) playComplete(c); }, []);
  const streak   = useCallback(() => { const c = ctx(); if (c) playStreak(c);   }, []);
  const korean   = useCallback((text: string, rate?: number) => speakKorean(text, rate), []);

  return { correct, wrong, assemble, complete, streak, korean };
}
