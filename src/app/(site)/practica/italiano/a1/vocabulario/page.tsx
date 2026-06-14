'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';

const COLOR = '#e11d48';

interface VocabWord { word: string; es: string; emoji: string; example: string; exampleEs: string; pronunciation: string; }
interface VocabSet { id: string; name: string; nameEs: string; emoji: string; words: VocabWord[]; }

const SETS: VocabSet[] = [
  {
    id: 'famiglia', name: 'La famiglia', nameEs: 'La familia', emoji: '👨‍👩‍👧‍👦',
    words: [
      { word: 'madre', es: 'madre', emoji: '👩', example: 'Mia madre è insegnante.', exampleEs: 'Mi mamá es maestra.', pronunciation: '[MA-dre]' },
      { word: 'padre', es: 'padre', emoji: '👨', example: 'Mio padre lavora in banca.', exampleEs: 'Mi papá trabaja en un banco.', pronunciation: '[PA-dre]' },
      { word: 'fratello', es: 'hermano', emoji: '👦', example: 'Ho un fratello maggiore.', exampleEs: 'Tengo un hermano mayor.', pronunciation: '[fra-TEL-lo]' },
      { word: 'sorella', es: 'hermana', emoji: '👧', example: 'Mia sorella ama la musica.', exampleEs: 'Mi hermana ama la música.', pronunciation: '[so-REL-la]' },
      { word: 'nonno', es: 'abuelo', emoji: '👴', example: 'Il mio nonno ha settantadue anni.', exampleEs: 'Mi abuelo tiene 72 años.', pronunciation: '[NON-no]' },
      { word: 'nonna', es: 'abuela', emoji: '👵', example: 'Mia nonna cucina benissimo.', exampleEs: 'Mi abuela cocina muy bien.', pronunciation: '[NON-na]' },
      { word: 'figlio', es: 'hijo', emoji: '🧒', example: 'Ha un figlio piccolo.', exampleEs: 'Tiene un hijo pequeño.', pronunciation: '[FI-lyo]' },
      { word: 'figlia', es: 'hija', emoji: '👶', example: 'La sua figlia studia medicina.', exampleEs: 'Su hija estudia medicina.', pronunciation: '[FI-lya]' },
      { word: 'marito', es: 'esposo', emoji: '💑', example: 'Suo marito è architetto.', exampleEs: 'Su esposo es arquitecto.', pronunciation: '[ma-RI-to]' },
      { word: 'moglie', es: 'esposa', emoji: '💍', example: 'Sua moglie è molto gentile.', exampleEs: 'Su esposa es muy amable.', pronunciation: '[MO-lye]' },
    ],
  },
  {
    id: 'colori', name: 'I colori', nameEs: 'Los colores', emoji: '🎨',
    words: [
      { word: 'rosso', es: 'rojo', emoji: '🔴', example: 'La mela è rossa.', exampleEs: 'La manzana es roja.', pronunciation: '[ROS-so]' },
      { word: 'blu', es: 'azul', emoji: '🔵', example: 'Il cielo è blu.', exampleEs: 'El cielo es azul.', pronunciation: '[bloo]' },
      { word: 'verde', es: 'verde', emoji: '🟢', example: "L'erba è verde.", exampleEs: 'El pasto es verde.', pronunciation: '[VER-de]' },
      { word: 'giallo', es: 'amarillo', emoji: '🟡', example: 'Il sole è giallo.', exampleEs: 'El sol es amarillo.', pronunciation: '[JAL-lo]' },
      { word: 'bianco', es: 'blanco', emoji: '⬜', example: 'La mia camicia è bianca.', exampleEs: 'Mi camisa es blanca.', pronunciation: '[BYAN-ko]' },
      { word: 'nero', es: 'negro', emoji: '⬛', example: 'Il gatto è nero.', exampleEs: 'El gato es negro.', pronunciation: '[NE-ro]' },
      { word: 'marrone', es: 'café/marrón', emoji: '🟫', example: 'I suoi capelli sono marroni.', exampleEs: 'Su cabello es café.', pronunciation: '[mar-RO-ne]' },
      { word: 'arancione', es: 'naranja', emoji: '🟠', example: "L'arancia è arancione.", exampleEs: 'La naranja es naranja.', pronunciation: '[a-ran-CHO-ne]' },
      { word: 'rosa', es: 'rosado', emoji: '🩷', example: 'Amo i fiori rosa.', exampleEs: 'Amo las flores rosadas.', pronunciation: '[RO-za]' },
      { word: 'viola', es: 'morado', emoji: '🟣', example: "L'uva è viola.", exampleEs: 'La uva es morada.', pronunciation: '[VYO-la]' },
    ],
  },
  {
    id: 'cibo', name: 'Il cibo', nameEs: 'La comida', emoji: '🍽️',
    words: [
      { word: 'pane', es: 'pan', emoji: '🍞', example: 'Mangio il pane a colazione.', exampleEs: 'Como pan en el desayuno.', pronunciation: '[PA-ne]' },
      { word: 'pasta', es: 'pasta', emoji: '🍝', example: 'La pasta al pomodoro è deliziosa.', exampleEs: 'La pasta con tomate es deliciosa.', pronunciation: '[PAS-ta]' },
      { word: 'pizza', es: 'pizza', emoji: '🍕', example: 'La pizza margherita è la mia preferita.', exampleEs: 'La pizza margherita es mi favorita.', pronunciation: '[PIT-tsa]' },
      { word: 'caffè', es: 'café', emoji: '☕', example: 'Prendo un caffè ogni mattina.', exampleEs: 'Tomo un café cada mañana.', pronunciation: '[kaf-FE]' },
      { word: 'acqua', es: 'agua', emoji: '💧', example: 'Bevo molta acqua.', exampleEs: 'Bebo mucha agua.', pronunciation: '[AK-kwa]' },
      { word: 'mela', es: 'manzana', emoji: '🍎', example: 'Una mela al giorno toglie il medico di torno.', exampleEs: 'Una manzana al día mantiene al médico alejado.', pronunciation: '[ME-la]' },
      { word: 'pomodoro', es: 'tomate', emoji: '🍅', example: 'Questa insalata ha i pomodori freschi.', exampleEs: 'Esta ensalada tiene tomates frescos.', pronunciation: '[po-mo-DO-ro]' },
      { word: 'formaggio', es: 'queso', emoji: '🧀', example: 'Il parmigiano è un formaggio italiano.', exampleEs: 'El parmesano es un queso italiano.', pronunciation: '[for-MAD-jo]' },
      { word: 'vino', es: 'vino', emoji: '🍷', example: 'Il vino rosso italiano è famoso nel mondo.', exampleEs: 'El vino tinto italiano es famoso en el mundo.', pronunciation: '[VI-no]' },
      { word: 'gelato', es: 'helado', emoji: '🍦', example: 'Il gelato artigianale italiano è il migliore.', exampleEs: 'El helado artesanal italiano es el mejor.', pronunciation: '[je-LA-to]' },
    ],
  },
  {
    id: 'giorni', name: 'I giorni', nameEs: 'Días y tiempo', emoji: '📅',
    words: [
      { word: 'lunedì', es: 'lunes', emoji: '1️⃣', example: "L'università inizia lunedì.", exampleEs: 'La universidad empieza el lunes.', pronunciation: '[lu-ne-DI]' },
      { word: 'martedì', es: 'martes', emoji: '2️⃣', example: 'Ho lezione martedì.', exampleEs: 'Tengo clase el martes.', pronunciation: '[mar-te-DI]' },
      { word: 'mercoledì', es: 'miércoles', emoji: '3️⃣', example: 'Ci vediamo mercoledì.', exampleEs: 'Nos vemos el miércoles.', pronunciation: '[mer-ko-le-DI]' },
      { word: 'giovedì', es: 'jueves', emoji: '4️⃣', example: 'La riunione è giovedì.', exampleEs: 'La reunión es el jueves.', pronunciation: '[jo-ve-DI]' },
      { word: 'venerdì', es: 'viernes', emoji: '5️⃣', example: 'Adoro il venerdì!', exampleEs: '¡Adoro el viernes!', pronunciation: '[ve-ner-DI]' },
      { word: 'sabato', es: 'sábado', emoji: '6️⃣', example: 'Il sabato dormo fino a tardi.', exampleEs: 'Los sábados duermo hasta tarde.', pronunciation: '[SA-ba-to]' },
      { word: 'domenica', es: 'domingo', emoji: '7️⃣', example: 'La domenica pranzo in famiglia.', exampleEs: 'El domingo almuerzo en familia.', pronunciation: '[do-ME-ni-ka]' },
      { word: 'mattina', es: 'mañana (del día)', emoji: '🌅', example: 'La mattina faccio jogging.', exampleEs: 'En la mañana hago jogging.', pronunciation: '[mat-TI-na]' },
      { word: 'pomeriggio', es: 'tarde', emoji: '🌤️', example: 'Il pomeriggio studio in biblioteca.', exampleEs: 'En la tarde estudio en la biblioteca.', pronunciation: '[po-me-RID-jo]' },
      { word: 'sera', es: 'noche/tarde', emoji: '🌙', example: 'La sera guardo la televisione.', exampleEs: 'En la noche veo televisión.', pronunciation: '[SE-ra]' },
    ],
  },
  {
    id: 'corpo', name: 'Il corpo', nameEs: 'El cuerpo', emoji: '🧍',
    words: [
      { word: 'testa', es: 'cabeza', emoji: '🗣️', example: 'Ho mal di testa.', exampleEs: 'Me duele la cabeza.', pronunciation: '[TES-ta]' },
      { word: 'occhio', es: 'ojo', emoji: '👁️', example: 'I suoi occhi sono azzurri.', exampleEs: 'Sus ojos son azules.', pronunciation: '[OK-kyo]' },
      { word: 'orecchio', es: 'oreja', emoji: '👂', example: 'Ha le orecchie piccole.', exampleEs: 'Tiene orejas pequeñas.', pronunciation: '[o-REK-kyo]' },
      { word: 'naso', es: 'nariz', emoji: '👃', example: 'Il mio naso è freddo.', exampleEs: 'Mi nariz está fría.', pronunciation: '[NA-zo]' },
      { word: 'bocca', es: 'boca', emoji: '👄', example: 'Apri la bocca!', exampleEs: '¡Abre la boca!', pronunciation: '[BOK-ka]' },
      { word: 'mano', es: 'mano', emoji: '✋', example: 'Lavati le mani!', exampleEs: '¡Lávate las manos!', pronunciation: '[MA-no]' },
      { word: 'piede', es: 'pie', emoji: '🦶', example: 'Mi fa male il piede.', exampleEs: 'Me duele el pie.', pronunciation: '[PYE-de]' },
      { word: 'cuore', es: 'corazón', emoji: '❤️', example: 'Hai un cuore grande.', exampleEs: 'Tienes un gran corazón.', pronunciation: '[KWOR-e]' },
      { word: 'schiena', es: 'espalda', emoji: '🫀', example: 'Ho mal di schiena.', exampleEs: 'Me duele la espalda.', pronunciation: '[SKYE-na]' },
      { word: 'capelli', es: 'cabello/pelo', emoji: '💇', example: 'Ha i capelli lunghi e neri.', exampleEs: 'Tiene el cabello largo y negro.', pronunciation: '[ka-PEL-li]' },
    ],
  },
  {
    id: 'numeri', name: 'I numeri', nameEs: 'Los números', emoji: '🔢',
    words: [
      { word: 'uno', es: '1', emoji: '1️⃣', example: 'Ho un fratello.', exampleEs: 'Tengo un hermano.', pronunciation: '[U-no]' },
      { word: 'due', es: '2', emoji: '2️⃣', example: 'Ho due sorelle.', exampleEs: 'Tengo dos hermanas.', pronunciation: '[DU-e]' },
      { word: 'tre', es: '3', emoji: '3️⃣', example: 'Ci sono tre camere.', exampleEs: 'Hay tres cuartos.', pronunciation: '[tre]' },
      { word: 'cinque', es: '5', emoji: '5️⃣', example: 'Ci vediamo alle cinque.', exampleEs: 'Nos vemos a las cinco.', pronunciation: '[CHIN-kwe]' },
      { word: 'dieci', es: '10', emoji: '🔟', example: 'Ho dieci euro.', exampleEs: 'Tengo diez euros.', pronunciation: '[DYE-chi]' },
      { word: 'venti', es: '20', emoji: '2️⃣0️⃣', example: 'Ho venti anni.', exampleEs: 'Tengo veinte años.', pronunciation: '[VEN-ti]' },
      { word: 'trenta', es: '30', emoji: '3️⃣0️⃣', example: 'Costa trenta euro.', exampleEs: 'Cuesta treinta euros.', pronunciation: '[TREN-ta]' },
      { word: 'cento', es: '100', emoji: '💯', example: 'Ho preso cento a matematica!', exampleEs: '¡Saqué cien en matemáticas!', pronunciation: '[CHEN-to]' },
      { word: 'mille', es: '1000', emoji: '💰', example: 'Guadagna mille euro al mese.', exampleEs: 'Gana mil euros al mes.', pronunciation: '[MIL-le]' },
      { word: 'zero', es: '0', emoji: '0️⃣', example: 'La temperatura è zero gradi.', exampleEs: 'La temperatura es cero grados.', pronunciation: '[DZE-ro]' },
    ],
  },
  {
    id: 'casa', name: 'La casa', nameEs: 'La casa', emoji: '🏠',
    words: [
      { word: 'cucina', es: 'cocina', emoji: '🍳', example: 'La cucina è grande e moderna.', exampleEs: 'La cocina es grande y moderna.', pronunciation: '[ku-CHI-na]' },
      { word: 'bagno', es: 'baño', emoji: '🚿', example: 'C\'è un bagno al piano di sopra.', exampleEs: 'Hay un baño en el piso de arriba.', pronunciation: '[BAN-yo]' },
      { word: 'camera da letto', es: 'habitación/dormitorio', emoji: '🛏️', example: 'La mia camera da letto è piccola.', exampleEs: 'Mi habitación es pequeña.', pronunciation: '[KA-me-ra da LET-to]' },
      { word: 'salotto', es: 'sala de estar', emoji: '🛋️', example: 'Guardo la TV in salotto.', exampleEs: 'Veo la tele en la sala.', pronunciation: '[sa-LOT-to]' },
      { word: 'tavolo', es: 'mesa', emoji: '🪑', example: 'Il tavolo è in cucina.', exampleEs: 'La mesa está en la cocina.', pronunciation: '[TA-vo-lo]' },
      { word: 'sedia', es: 'silla', emoji: '🪑', example: 'Metti la sedia vicino al muro.', exampleEs: 'Pon la silla cerca de la pared.', pronunciation: '[SE-dya]' },
      { word: 'finestra', es: 'ventana', emoji: '🪟', example: 'Apri la finestra, per favore!', exampleEs: '¡Abre la ventana, por favor!', pronunciation: '[fi-NES-tra]' },
      { word: 'porta', es: 'puerta', emoji: '🚪', example: 'La porta è aperta.', exampleEs: 'La puerta está abierta.', pronunciation: '[POR-ta]' },
      { word: 'letto', es: 'cama', emoji: '🛏️', example: 'Il mio letto è molto comodo.', exampleEs: 'Mi cama es muy cómoda.', pronunciation: '[LET-to]' },
      { word: 'lampada', es: 'lámpara', emoji: '💡', example: 'Accendi la lampada, è buio.', exampleEs: 'Enciende la lámpara, está oscuro.', pronunciation: '[LAM-pa-da]' },
    ],
  },
  {
    id: 'animali', name: 'Gli animali', nameEs: 'Los animales', emoji: '🐾',
    words: [
      { word: 'gatto', es: 'gato', emoji: '🐱', example: 'Il mio gatto si chiama Nero.', exampleEs: 'Mi gato se llama Negro.', pronunciation: '[GAT-to]' },
      { word: 'cane', es: 'perro', emoji: '🐶', example: 'Il cane abbaia di notte.', exampleEs: 'El perro ladra de noche.', pronunciation: '[KA-ne]' },
      { word: 'uccello', es: 'pájaro', emoji: '🐦', example: 'Un uccello canta fuori dalla finestra.', exampleEs: 'Un pájaro canta afuera de la ventana.', pronunciation: '[ut-CHEL-lo]' },
      { word: 'pesce', es: 'pez/pescado', emoji: '🐟', example: 'Ho due pesci rossi.', exampleEs: 'Tengo dos peces rojos.', pronunciation: '[PE-she]' },
      { word: 'cavallo', es: 'caballo', emoji: '🐴', example: 'Il cavallo è un animale nobile.', exampleEs: 'El caballo es un animal noble.', pronunciation: '[ka-VAL-lo]' },
      { word: 'mucca', es: 'vaca', emoji: '🐄', example: 'La mucca dà il latte.', exampleEs: 'La vaca da leche.', pronunciation: '[MUK-ka]' },
      { word: 'coniglio', es: 'conejo', emoji: '🐰', example: 'Il coniglio mangia le carote.', exampleEs: 'El conejo come zanahorias.', pronunciation: '[ko-NI-lyo]' },
      { word: 'elefante', es: 'elefante', emoji: '🐘', example: "L'elefante ha la memoria lunga.", exampleEs: 'El elefante tiene buena memoria.', pronunciation: '[e-le-FAN-te]' },
      { word: 'leone', es: 'león', emoji: '🦁', example: 'Il leone è il re degli animali.', exampleEs: 'El león es el rey de los animales.', pronunciation: '[le-O-ne]' },
      { word: 'scimmia', es: 'mono', emoji: '🐒', example: 'La scimmia sale sugli alberi.', exampleEs: 'El mono sube a los árboles.', pronunciation: '[SHIM-mya]' },
    ],
  },
];

type Mode = 'browse' | 'flashcard' | 'quiz';

export default function VocabolarioItalianoA1() {
  const [setId, setSetId] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>('browse');
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizOpts, setQuizOpts] = useState<string[][]>([]);

  const currentSet = SETS.find(s => s.id === setId);

  const generateOpts = useCallback((set: VocabSet) => {
    return set.words.map((w, i) => {
      const others = set.words.filter((_, j) => j !== i).map(x => x.es);
      const shuffled = others.sort(() => Math.random() - 0.5).slice(0, 3);
      const opts = [...shuffled, w.es].sort(() => Math.random() - 0.5);
      return opts;
    });
  }, []);

  function startMode(m: Mode, set: VocabSet) {
    setMode(m); setCardIdx(0); setFlipped(false); setQuizAnswers({});
    if (m === 'quiz') setQuizOpts(generateOpts(set));
  }

  if (!currentSet) {
    return (
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/italiano/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇮🇹 Italiano A1</Link>
            <span>/</span>
            <span style={{ color: COLOR, fontWeight: 800 }}>📚 Vocabulario</span>
          </div>
          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Vocabolario · Italiano A1</p>
          <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Vocabolario A1</h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 540, margin: '0 0 2rem' }}>6 conjuntos temáticos · 3 modos de práctica: exploración, flashcards y quiz.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
            {SETS.map(s => (
              <button key={s.id} onClick={() => setSetId(s.id)} style={{ textAlign: 'left', background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit', color: 'inherit' }}>
                <div style={{ padding: '1.25rem 1.4rem', border: `1.5px solid ${COLOR}22`, borderRadius: 16, background: `linear-gradient(135deg, ${COLOR}06 0%, transparent 100%)` }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{s.emoji}</div>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--ink)', marginBottom: '0.2rem' }}>{s.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{s.nameEs} · {s.words.length} palabras</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/italiano/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇮🇹 Italiano A1</Link>
          <span>/</span>
          <button onClick={() => setSetId(null)} style={{ color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', padding: 0 }}>📚 Vocabolario</button>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>{currentSet.emoji} {currentSet.name}</span>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {(['browse', 'flashcard', 'quiz'] as Mode[]).map(m => {
            const labels = { browse: '📖 Explorar', flashcard: '🃏 Flashcards', quiz: '🎯 Quiz' };
            return (
              <button key={m} onClick={() => startMode(m, currentSet)}
                className={mode === m ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
                style={{ ...(mode === m ? { background: COLOR, borderColor: COLOR } : {}) }}>
                {labels[m]}
              </button>
            );
          })}
        </div>

        {mode === 'browse' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.85rem' }}>
            {currentSet.words.map(w => (
              <div key={w.word} style={{ padding: '1rem 1.2rem', border: `1.5px solid ${COLOR}22`, borderRadius: 14, background: `${COLOR}06` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{w.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--ink)' }}>{w.word}</div>
                    <div style={{ fontSize: '0.72rem', color: COLOR, fontFamily: 'var(--mono)', fontWeight: 700 }}>{w.pronunciation}</div>
                  </div>
                  <span style={{ marginLeft: 'auto', fontSize: '0.9rem', fontWeight: 700, color: COLOR }}>{w.es}</span>
                </div>
                <p style={{ margin: '0.4rem 0 0.15rem', fontSize: '0.82rem', color: 'var(--ink)', fontStyle: 'italic' }}>{w.example}</p>
                <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--muted)' }}>{w.exampleEs}</p>
              </div>
            ))}
          </div>
        )}

        {mode === 'flashcard' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{cardIdx + 1} / {currentSet.words.length}</div>
            <div onClick={() => setFlipped(!flipped)} style={{ width: '100%', maxWidth: 480, minHeight: 200, padding: '2rem', border: `2px solid ${COLOR}44`, borderRadius: 20, background: flipped ? `${COLOR}0d` : 'var(--bg)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', textAlign: 'center', transition: 'background 0.2s' }}>
              {!flipped ? (
                <>
                  <span style={{ fontSize: '2.5rem' }}>{currentSet.words[cardIdx].emoji}</span>
                  <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--ink)' }}>{currentSet.words[cardIdx].word}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{currentSet.words[cardIdx].pronunciation}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.5rem' }}>toca para ver la traducción</span>
                </>
              ) : (
                <>
                  <span style={{ fontSize: '1.8rem', fontWeight: 800, color: COLOR }}>{currentSet.words[cardIdx].es}</span>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--ink)', fontStyle: 'italic', maxWidth: 340 }}>{currentSet.words[cardIdx].example}</p>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)', maxWidth: 340 }}>{currentSet.words[cardIdx].exampleEs}</p>
                </>
              )}
            </div>
            <div style={{ display: 'flex', gap: '0.65rem' }}>
              <button className="btn btn-ghost btn-sm" disabled={cardIdx === 0} onClick={() => { setCardIdx(i => i - 1); setFlipped(false); }}>← Anterior</button>
              <button className="btn btn-sm" disabled={cardIdx === currentSet.words.length - 1} onClick={() => { setCardIdx(i => i + 1); setFlipped(false); }} style={{ background: COLOR, borderColor: COLOR }}>Siguiente →</button>
            </div>
          </div>
        )}

        {mode === 'quiz' && quizOpts.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {currentSet.words.map((w, wi) => {
              const ans = quizAnswers[wi]; const isDone = ans !== undefined;
              return (
                <div key={wi} className="wl-card" style={{ padding: '1.1rem' }}>
                  <p style={{ margin: '0 0 0.75rem', fontWeight: 700, color: 'var(--ink)', fontSize: '1.05rem' }}>
                    {w.emoji} ¿Cómo se dice <span style={{ color: COLOR }}>{w.es}</span> en italiano?
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {quizOpts[wi]?.map((opt, oi) => {
                      const isCorrect = opt === w.word; const isSelected = ans === oi;
                      let bg = 'var(--bg-2)'; let border = '1px solid var(--line-soft)'; let color = 'var(--ink)';
                      if (isDone && isCorrect) { bg = 'rgba(5,150,105,0.1)'; border = '1px solid #059669'; color = '#059669'; }
                      if (isDone && isSelected && !isCorrect) { bg = 'rgba(220,38,38,0.1)'; border = '1px solid #dc2626'; color = '#dc2626'; }
                      return (
                        <button key={oi} disabled={isDone} onClick={() => setQuizAnswers(p => ({ ...p, [wi]: oi }))}
                          style={{ padding: '0.5rem 1rem', borderRadius: 8, border, background: bg, color, cursor: isDone ? 'default' : 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.9rem' }}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            {Object.keys(quizAnswers).length === currentSet.words.length && (
              <div className="wl-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
                  {currentSet.words.filter((w, i) => quizOpts[i]?.[quizAnswers[i]] === w.word).length === currentSet.words.length ? '🏆' : '⭐'}
                </div>
                <p style={{ margin: '0 0 1rem', fontWeight: 700, color: 'var(--ink)' }}>
                  {currentSet.words.filter((w, i) => quizOpts[i]?.[quizAnswers[i]] === w.word).length} / {currentSet.words.length} correctas
                </p>
                <button className="btn btn-sm" onClick={() => startMode('quiz', currentSet)} style={{ background: COLOR, borderColor: COLOR }}>Riprovare il quiz</button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
