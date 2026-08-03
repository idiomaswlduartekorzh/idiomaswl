'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Task1OfficialReviewBlock from '../Task1OfficialReviewBlock';
import Task1ChartTypeGuide from '../Task1ChartTypeGuide';
import MapPracticeEngine from './MapPracticeEngine';

interface MapChange {
  id: string;
  before: string;
  after: string;
  location: string;
  modelSentence: string;
}

interface MapExercise {
  title: string;
  image: string;
  changes: MapChange[];
  modelParagraph: string;
}

const EXERCISES: MapExercise[] = [
  {
    title: 'Town centre changes, 1990-2020',
    image: '/images/ielts/task1/visual-bank/user-batch-02/06-map-town-centre.png',
    changes: [
      { id: 'a', before: 'Park', after: 'Housing estate', location: 'in the north-western part of the centre', modelSentence: 'The park in the north-western part of the town centre was replaced by a housing estate.' },
      { id: 'b', before: 'Factory', after: 'School', location: 'in the north-eastern part of the centre', modelSentence: 'The factory in the north-eastern part of the centre was demolished and replaced by a school.' },
      { id: 'c', before: 'Small road', after: 'Dual carriageway', location: 'across the middle of the centre', modelSentence: 'The small road running across the centre was widened into a dual carriageway.' },
      { id: 'd', before: 'Car park', after: 'Shopping centre', location: 'in the south-eastern area', modelSentence: 'The car park in the south-eastern area was converted into a shopping centre.' },
    ],
    modelParagraph: 'Comparing the two maps, the town centre underwent substantial redevelopment between 1990 and 2020. The park and factory in the northern half were replaced by a housing estate and a school respectively, while the small road across the centre was widened into a dual carriageway. In the south-east, the car park was converted into a shopping centre.',
  },
  {
    title: 'University campus development, 1995-2025',
    image: '/images/ielts/task1/visual-bank/user-batch-02/07-map-university-campus.png',
    changes: [
      { id: 'a', before: 'Lecture hall', after: 'Library', location: 'in the north-west', modelSentence: 'The lecture hall in the north-west was replaced by a library.' },
      { id: 'b', before: 'Garden', after: 'Student flats', location: 'in the north-east', modelSentence: 'The garden in the north-east was redeveloped as student flats.' },
      { id: 'c', before: 'Car park', after: 'Cycle path', location: 'in the south-west', modelSentence: 'The car park in the south-west was replaced by a cycle path.' },
      { id: 'd', before: 'Sports field', after: 'Sports centre', location: 'in the south-east', modelSentence: 'The sports field in the south-east was converted into a sports centre.' },
    ],
    modelParagraph: 'The campus changed considerably between 1995 and 2025. The lecture hall and garden in the northern half were replaced by a library and student flats respectively. In the southern half, the car park became a cycle path, while the sports field was converted into a sports centre.',
  },
  {
    title: 'Coastal village changes, 2000-2025',
    image: '/images/ielts/task1/visual-bank/user-batch-02/08-map-coastal-village.png',
    changes: [
      { id: 'a', before: 'Fishing harbour', after: 'Marina', location: 'on the eastern coast', modelSentence: 'The fishing harbour on the eastern coast was redeveloped as a marina.' },
      { id: 'b', before: 'Fields', after: 'Holiday resort', location: 'in the northern area', modelSentence: 'The fields in the northern area were replaced by a holiday resort.' },
      { id: 'c', before: 'Narrow road', after: 'Main road', location: 'running through the village', modelSentence: 'The narrow road running through the village was widened into a main road.' },
      { id: 'd', before: 'Cottages', after: 'Apartments', location: 'near the shoreline', modelSentence: 'The cottages near the shoreline were replaced by apartment buildings.' },
    ],
    modelParagraph: 'The coastal village experienced extensive development over the twenty-five-year period. The fishing harbour became a marina, while the fields in the north were replaced by a holiday resort. In addition, the narrow road through the village was widened and the cottages near the shoreline were replaced by apartments.',
  },
  {
    title: 'Park changes, 1980-2020',
    image: '/images/ielts/task1/visual-bank/user-batch-02/10-map-park-redevelopment.png',
    changes: [
      { id: 'a', before: 'Woodland', after: 'Playground', location: 'in the north-west', modelSentence: 'The woodland in the north-west was cleared to make way for a playground.' },
      { id: 'b', before: 'Pond', after: 'Cafe', location: 'in the north-east', modelSentence: 'The pond in the north-east was replaced by a cafe.' },
      { id: 'c', before: 'Footpath', after: 'Cycle track', location: 'along the southern edge', modelSentence: 'The footpath along the southern edge was converted into a cycle track.' },
      { id: 'd', before: 'Rose garden', after: 'Open-air stage', location: 'in the south-east', modelSentence: 'The rose garden in the south-east was replaced by an open-air stage.' },
    ],
    modelParagraph: 'The park was substantially redesigned between 1980 and 2020. Woodland and a pond in the northern half were replaced by a playground and a cafe, while the footpath along the southern edge became a cycle track. The rose garden was also removed and replaced by an open-air stage.',
  },
  {
    title: 'Shopping centre redevelopment',
    image: '/images/ielts/task1/visual-bank/user-batch-02/09-map-shopping-centre.png',
    changes: [
      { id: 'a', before: 'Small shops', after: 'Department store', location: 'in the western block', modelSentence: 'The small shops in the western block were replaced by a department store.' },
      { id: 'b', before: 'Bus stop', after: 'Taxi rank', location: 'beside the main entrance', modelSentence: 'The bus stop beside the main entrance was converted into a taxi rank.' },
      { id: 'c', before: 'Market', after: 'Food court', location: 'in the central area', modelSentence: 'The market in the central area was redeveloped as a food court.' },
      { id: 'd', before: 'Car park', after: 'Multi-storey car park', location: 'on the eastern side', modelSentence: 'The car park on the eastern side was replaced by a multi-storey car park.' },
    ],
    modelParagraph: 'The shopping centre was modernised in several ways. The small shops in the west were replaced by a department store, and the market in the centre became a food court. The bus stop beside the main entrance was converted into a taxi rank, while the car park on the eastern side was replaced by a multi-storey facility.',
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
    <section className="wl-section" lang="en">
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
            relatedLinks={[
              { href: '/practica/ielts/academic/writing/task1/overview', label: 'Write the overview' },
              { href: '/practica/ielts/academic/writing/task1/body-1', label: 'Build Body 1' },
              { href: '/practica/ielts/academic/writing/task1/body-2', label: 'Build Body 2' },
              { href: '/practica/ielts/academic/writing/task1/procesos', label: 'Describe processes' },
            ]}
          />

          <Task1ChartTypeGuide />

          <div role="tablist" aria-label="Map examples" style={{ display: 'flex', gap: '0.55rem', overflowX: 'auto', padding: '0 0 0.55rem', marginBottom: '0.85rem' }}>
            {EXERCISES.map((item, index) => (
              <button
                key={item.title}
                type="button"
                role="tab"
                aria-selected={exIdx === index}
                aria-controls="map-example-panel"
                onClick={() => { setExIdx(index); setSelectedChange(null); setText(''); setRevealed(false); }}
                style={{ flex: '0 0 auto', minWidth: 170, padding: '0.65rem 0.75rem', borderRadius: 8, border: exIdx === index ? '2px solid #0f3d8c' : '1px solid var(--line-soft)', background: exIdx === index ? 'rgba(15,61,140,0.07)' : 'var(--bg)', color: exIdx === index ? '#0f3d8c' : 'var(--ink-2)', fontSize: '0.74rem', fontWeight: 800, cursor: 'pointer' }}
              >
                {String(index + 1).padStart(2, '0')} · {item.title}
              </button>
            ))}
          </div>

          {/* Vocab */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '0.75rem', marginBottom: '1.5rem' }}>
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

          {/* Original WeLearn map visual */}
          <div id="map-example-panel" role="tabpanel" className="wl-card" style={{ padding: '1.25rem', marginBottom: '1.25rem', overflowX: 'auto' }}>
            <p style={{ margin: '0 0 0.65rem', color: '#0f3d8c', fontFamily: 'var(--mono)', fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase' }}>IELTS-style visual reference</p>
            <Image
              src={ex.image}
              alt={`${ex.title}. Original WeLearn IELTS Task 1 map reference showing the before and after layout.`}
              width={1600}
              height={1000}
              priority={exIdx === 0}
              sizes="(max-width: 768px) 100vw, 1080px"
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 6 }}
            />
          </div>

          {/* Guided map practice */}
          <div className="wl-card" style={{ padding: '1.25rem', marginBottom: '1.25rem' }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0f3d8c', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 0.75rem' }}>{ex.title}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '0.75rem' }}>
              {['Before', 'After'].map((label, ti) => (
                <div key={label}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted)', fontFamily: 'var(--mono)', margin: '0 0 0.4rem', textTransform: 'uppercase' }}>{label}</p>
                  <div style={{ border: '1.5px solid var(--line-soft)', borderRadius: 10, padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', background: 'var(--bg-2)', minHeight: 120 }}>
                    {ex.changes.map(c => (
                      <button type="button" key={c.id} aria-pressed={selectedChange === c.id} style={{ width: '100%', textAlign: 'left', fontSize: '0.78rem', padding: '0.3rem 0.6rem', borderRadius: 6, background: selectedChange === c.id ? 'rgba(15,61,140,0.1)' : 'var(--bg)', border: `1px solid ${selectedChange === c.id ? 'rgba(15,61,140,0.3)' : 'var(--line-soft)'}`, color: 'var(--ink-2)', cursor: 'pointer' }}
                        onClick={() => { setSelectedChange(c.id); setText(''); setRevealed(false); }}>
                        {ti === 0 ? c.before : c.after}
                      </button>
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

          <MapPracticeEngine />
        </div>
      </div>
    </section>
  );
}
