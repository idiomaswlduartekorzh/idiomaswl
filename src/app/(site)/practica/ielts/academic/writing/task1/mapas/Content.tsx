'use client';

import { useState } from 'react';
import Link from 'next/link';
import Task1OfficialReviewBlock from '../Task1OfficialReviewBlock';
import Task1ChartTypeGuide from '../Task1ChartTypeGuide';
import { IELTSMapDiagramVisual } from '../Task1VisualLab';

interface MapChange {
  id: string;
  before: string;
  after: string;
  location: string;
  modelSentence: string;
}

interface MapExercise {
  title: string;
  changes: MapChange[];
  modelParagraph: string;
}

const EXERCISES: MapExercise[] = [
  {
    title: 'Millfield town centre: 1990 versus 2020',
    changes: [
      { id: 'a', before: 'Car park (north)', after: 'Shopping centre', location: 'to the north of the town centre', modelSentence: 'The car park that was located to the north of the town centre was replaced by a large shopping centre.' },
      { id: 'b', before: 'Factory (east)', after: 'Residential area', location: 'to the east', modelSentence: 'The factory situated to the east was demolished and replaced by a residential area.' },
      { id: 'c', before: 'Open park (south)', after: 'School', location: 'to the south', modelSentence: 'A new school was built on what had previously been an open park to the south of the town centre.' },
      { id: 'd', before: 'Road (single lane)', after: 'Dual carriageway', location: 'adjacent to the river', modelSentence: 'The single-lane road adjacent to the river was widened into a dual carriageway.' },
    ],
    modelParagraph: 'Comparing the two maps, it is clear that Millfield underwent significant development between 1990 and 2020. The car park to the north was replaced by a large shopping centre, while the factory to the east was demolished and a residential area was built in its place. To the south, an open park was converted into a school. In addition, the road adjacent to the river was widened into a dual carriageway.',
  },
  {
    title: 'Tourist island: before and after development',
    changes: [
      { id: 'a', before: 'Dense forest (north)', after: 'Hotel complex', location: 'to the north of the island', modelSentence: 'The dense forest that once covered the northern part of the island was cleared and replaced by a hotel complex.' },
      { id: 'b', before: 'Empty beach (west)', after: 'Beach resort with facilities', location: 'on the western coast', modelSentence: 'A beach resort with restaurants and sports facilities was constructed on the previously undeveloped western coast.' },
      { id: 'c', before: 'Fishing village (east)', after: 'Marina and yacht club', location: 'on the eastern side', modelSentence: 'The small fishing village on the eastern side was replaced by a marina and yacht club.' },
    ],
    modelParagraph: 'The maps reveal considerable transformation of the island following tourist development. The dense forest to the north was cleared and replaced by a hotel complex, while a beach resort with various facilities was built along the previously empty western coastline. Most notably, the traditional fishing village on the eastern side was replaced by a marina and yacht club, signifying a shift from local to tourist-oriented activity.',
  },
];

const LOCATION_PHRASES = ['to the north of', 'to the south of', 'to the east of', 'to the west of', 'adjacent to', 'opposite', 'between X and Y', 'in the centre of', 'on the western/eastern side'];
const CHANGE_PHRASES = ['was replaced by', 'was demolished', 'was built', 'was extended', 'was converted into', 'was widened', 'was cleared', 'a new X was constructed'];

export default function MapasPage() {
  const [exIdx, setExIdx] = useState(0);
  const [selectedChange, setSelectedChange] = useState<string | null>(null);
  const [text, setText] = useState('');
  const [revealed, setRevealed] = useState(false);
  const ex = EXERCISES[exIdx];
  const change = ex.changes.find(c => c.id === selectedChange);

  function next() {
    setExIdx(i => (i + 1) % EXERCISES.length);
    setSelectedChange(null);
    setText('');
    setRevealed(false);
  }

  return (
    <section className="wl-section">
      <div className="wrap">
        <div className="ielts-task1-shell" style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
            <Link href="/practica/ielts/academic/writing/task1" className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← Task 1</Link>
          <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>Task 1 / Maps</span>
          </div>

          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />🗺️ Sub-skill 6 — Maps</p>
          <h1 style={{ fontSize: '1.75rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>Describe maps</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.95rem', margin: '0 0 1.25rem', lineHeight: 1.65 }}>
            Maps compare a place before and after a change. You need location and change vocabulary.
            Select a change and write a sentence to describe it.
          </p>

          <Task1OfficialReviewBlock
            focus="Locate spatial changes and compare the initial and final states."
            officialFormat="IELTS Academic Writing Task 1 may present maps as visual information. Maps are a practice route for that input, not a separate official task."
            welearnStrategy="We isolate maps because they require location, transformation and time-comparison language."
            answerCheck="A strong response describes visible changes, uses spatial prepositions and does not infer benefits or reasons that are not shown."
          />

          <Task1ChartTypeGuide />

          {/* Vocab */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ padding: '0.9rem', borderRadius: 10, background: 'rgba(15,61,140,0.05)', border: '1px solid rgba(15,61,140,0.15)' }}>
              <p style={{ fontSize: '0.68rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.4rem' }}>Location</p>
              <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                {LOCATION_PHRASES.map(p => <span key={p} style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: 8, background: 'rgba(15,61,140,0.08)', color: '#0f3d8c', fontFamily: 'var(--mono)' }}>{p}</span>)}
              </div>
            </div>
            <div style={{ padding: '0.9rem', borderRadius: 10, background: 'rgba(220,38,38,0.05)', border: '1px solid rgba(220,38,38,0.15)' }}>
              <p style={{ fontSize: '0.68rem', fontWeight: 800, color: '#dc2626', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.4rem' }}>Change</p>
              <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                {CHANGE_PHRASES.map(p => <span key={p} style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: 8, background: 'rgba(220,38,38,0.07)', color: '#dc2626', fontFamily: 'var(--mono)' }}>{p}</span>)}
              </div>
            </div>
          </div>

          {/* Progress */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, height: 5, background: 'var(--line-soft)', borderRadius: 4 }}>
              <div style={{ height: '100%', width: `${((exIdx + 1) / EXERCISES.length) * 100}%`, background: '#0f3d8c', borderRadius: 4, transition: 'width 0.4s' }} />
            </div>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{exIdx + 1}/{EXERCISES.length}</span>
          </div>

          {/* Original IELTS-style map visual */}
          <div className="wl-card" style={{ padding: '1.25rem', marginBottom: '1.25rem' }}>
            <p style={{ margin: '0 0 0.65rem', color: '#0f3d8c', fontFamily: 'var(--mono)', fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase' }}>IELTS-style visual reference</p>
            <IELTSMapDiagramVisual variant={exIdx} />
          </div>

          {/* Guided map practice */}
          <div className="wl-card" style={{ padding: '1.25rem', marginBottom: '1.25rem' }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.75rem' }}>{ex.title}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              {['Before', 'After'].map((label, ti) => (
                <div key={label}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--mono)', margin: '0 0 0.4rem', textTransform: 'uppercase' }}>{label}</p>
                  <div style={{ border: '1.5px solid var(--line-soft)', borderRadius: 10, padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', background: 'var(--bg-2)', minHeight: 120 }}>
                    {ex.changes.map(c => (
                      <div key={c.id} style={{ fontSize: '0.78rem', padding: '0.3rem 0.6rem', borderRadius: 6, background: selectedChange === c.id ? 'rgba(15,61,140,0.1)' : 'var(--bg)', border: `1px solid ${selectedChange === c.id ? 'rgba(15,61,140,0.3)' : 'var(--line-soft)'}`, color: 'var(--ink-2)', cursor: 'pointer' }}
                        onClick={() => { setSelectedChange(c.id); setText(''); setRevealed(false); }}>
                        {ti === 0 ? c.before : c.after}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--muted)', margin: '0.5rem 0 0', fontStyle: 'italic' }}>Click an element to practise that sentence.</p>
          </div>

          {/* Practice area */}
          {change && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ padding: '0.9rem 1.1rem', borderRadius: 10, background: 'rgba(15,61,140,0.06)', border: '1px solid rgba(15,61,140,0.18)', fontSize: '0.87rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>
                <strong style={{ color: '#0f3d8c' }}>Selected change:</strong>{' '}
                <em>{change.before}</em> → <em>{change.after}</em>
                {' '}— location: {change.location}
              </div>
              <textarea
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Write a sentence describing this change..."
                rows={3}
                style={{ width: '100%', padding: '0.85rem', borderRadius: 10, border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.95rem', fontFamily: 'inherit', lineHeight: 1.6, resize: 'vertical', boxSizing: 'border-box' }}
              />
              {text.trim().length > 10 && !revealed && (
                <button className="btn btn-sm" onClick={() => setRevealed(true)} style={{ alignSelf: 'flex-start' }}>Reveal model →</button>
              )}
              {revealed && (
                <div className="wl-card" style={{ padding: '1.1rem', borderLeft: '3px solid #059669' }}>
                  <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.4rem' }}>Model sentence</p>
                  <p style={{ margin: 0, fontSize: '0.93rem', lineHeight: 1.7, color: 'var(--ink)' }}>{change.modelSentence}</p>
                </div>
              )}
            </div>
          )}

          {/* Full model paragraph */}
          <div className="wl-card" style={{ padding: '1.25rem', borderLeft: '3px solid #7c3aed', marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#7c3aed', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.5rem' }}>Complete model paragraph</p>
            <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: 1.8, color: 'var(--ink)' }}>{ex.modelParagraph}</p>
          </div>

          <button className="btn btn-sm" onClick={next}>
            {exIdx < EXERCISES.length - 1 ? 'Next map →' : 'Back to the beginning →'}
          </button>
        </div>
      </div>
    </section>
  );
}
