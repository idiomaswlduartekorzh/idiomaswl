'use client';

import { useState, useEffect } from 'react';

interface TTSPlayerProps {
  text: string;
  lang: string;
  label?: string;
  rate?: number;
}

export default function TTSPlayer({ text, lang, label, rate = 0.85 }: TTSPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      setIsSupported(false);
      return;
    }
    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => { window.speechSynthesis.cancel(); };
  }, []);

  const speak = () => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    const langPrefix = lang.split('-')[0];
    const voice = voices.find(v => v.lang.startsWith(langPrefix)) ?? null;
    if (voice) utterance.voice = voice;
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis?.cancel();
    setIsPlaying(false);
  };

  if (!isSupported) {
    return (
      <p style={{ fontSize: '11px', opacity: 0.5, margin: '4px 0' }}>
        Tu navegador no soporta audio. Usa Chrome o Edge.
      </p>
    );
  }

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', margin: '8px 0', flexWrap: 'wrap' }}>
      <button
        onClick={isPlaying ? stop : speak}
        style={{
          padding: '7px 16px', borderRadius: '20px', border: 'none', cursor: 'pointer',
          background: isPlaying ? '#ef4444' : '#6366f1', color: '#fff',
          fontWeight: 700, fontSize: '13px', transition: 'background 0.2s',
        }}
      >
        {isPlaying ? '⏹ Detener' : `▶ ${label ?? 'Escuchar'}`}
      </button>
      {isPlaying && (
        <span style={{ fontSize: '11px', opacity: 0.6 }}>Reproduciendo…</span>
      )}
    </div>
  );
}
