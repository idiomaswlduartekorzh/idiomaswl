import IcfesPartOneExamples from './IcfesPartOneExamples';
import styles from '../icfes-learning.module.css';

const THEMES = [
  { icon: '⌂', title: 'Lugares', words: 'library · pharmacy · station' },
  { icon: '◎', title: 'Personas y oficios', words: 'mechanic · architect · optician' },
  { icon: '◇', title: 'Objetos', words: 'receipt · ruler · scarf' },
  { icon: '◌', title: 'Estados', words: 'hungry · thirsty · tired' },
  { icon: '↔', title: 'Transporte', words: 'bridge · tunnel · harbor' },
  { icon: '▦', title: 'Casa y colegio', words: 'fridge · cupboard · folder' },
];

export default function IcfesPartOneLesson() {
  return (
    <>
      <nav className={styles.lessonRoadmap} aria-label="Recorrido de la lección">
        <a href="#entiende"><span>01</span><strong>Entiende</strong><small>formato oficial</small></a>
        <a href="#metodo"><span>02</span><strong>Aprende</strong><small>método WeLearn</small></a>
        <a href="#ejemplos"><span>03</span><strong>Observa</strong><small>12 ejemplos</small></a>
        <a href="#practica-guiada"><span>04</span><strong>Practica</strong><small>3 niveles</small></a>
      </nav>

      <section id="entiende" className={styles.partOneLesson} aria-labelledby="understand-part-one-title">
        <div className={styles.lessonSectionHeading}>
          <p className={styles.kicker}>Antes de resolver</p>
          <h2 id="understand-part-one-title">Entiende exactamente qué te van a preguntar</h2>
          <p>La Parte 1 no presenta preguntas independientes. Recibes una categoría, cinco descripciones y un mismo banco de ocho palabras para relacionarlas.</p>
        </div>

        <div className={styles.officialStrategyGrid}>
          <article>
            <span>Formato oficial</span>
            <h3>5 descripciones · 8 palabras</h3>
            <p>Una palabra ya está resuelta como ejemplo, cinco responden las preguntas y dos sobran. Las respuestas se identifican con letras.</p>
          </article>
          <article>
            <span>Lo que evalúa</span>
            <h3>Conocimiento léxico</h3>
            <p>Debes comprender una definición en inglés y relacionarla con una palabra del mismo campo temático.</p>
          </article>
          <article>
            <span>Estrategia WeLearn</span>
            <h3>Pista → función → descarte</h3>
            <p>No traduzcas palabra por palabra. Encuentra la acción o condición que vuelve una opción más precisa que las demás.</p>
          </article>
        </div>

        <div className={styles.questionAnatomy}>
          <div className={styles.anatomyWordBank}>
            <span>Places in town</span>
            {['A bakery', 'B hospital', 'C library', 'D market', 'E pharmacy', 'F stadium', 'G station', 'H theater'].map((word) => <strong key={word}>{word}</strong>)}
          </div>
          <div className={styles.anatomyPrompt}>
            <span>Así aparece la descripción</span>
            <p>You go to this place when you need to <mark>borrow a book</mark>.</p>
            <div><b>C</b><strong>library</strong><small>cumple categoría + acción + objeto</small></div>
          </div>
        </div>

        <div className={styles.answerContract}>
          <div>
            <span>Qué debes mirar</span>
            <strong>El título de la categoría y la descripción completa.</strong>
          </div>
          <div>
            <span>Qué debes responder</span>
            <strong>La letra de la única palabra que cumple todas las pistas.</strong>
          </div>
          <div>
            <span>Qué no debes hacer</span>
            <strong>Elegir por parecido, por una traducción parcial o por la primera asociación.</strong>
          </div>
        </div>
      </section>

      <section id="metodo" className={styles.partOneMethod} aria-labelledby="part-one-method-title">
        <div className={styles.lessonSectionHeading}>
          <p className={styles.kicker}>Método WeLearn</p>
          <h2 id="part-one-method-title">Resuelve cada descripción con cuatro decisiones</h2>
          <p>El banco cambia, pero este proceso se mantiene. Practícalo hasta poder ejecutarlo en menos de treinta segundos.</p>
        </div>

        <ol className={styles.methodFlow}>
          <li><span>01</span><div><strong>Activa la categoría</strong><p>Si el título dice Jobs, espera personas y funciones; si dice Places, espera lugares y acciones.</p></div></li>
          <li><span>02</span><div><strong>Reduce a una pista mínima</strong><p>Convierte la oración en dos o tres palabras: borrow + book, eyes + glasses, neck + warm.</p></div></li>
          <li><span>03</span><div><strong>Compara los candidatos cercanos</strong><p>No revises ocho palabras por igual. Aísla las dos que parecen posibles y pregunta cuál cumple todo.</p></div></li>
          <li><span>04</span><div><strong>Relee y confirma</strong><p>Inserta la respuesta mentalmente. Si una parte de la definición deja de tener sentido, todavía no terminaste.</p></div></li>
        </ol>

        <div className={styles.clueToolkit}>
          <article><span>Verbo o acción</span><strong>borrow · repair · measure</strong><p>Suele revelar la función principal.</p></article>
          <article><span>Objeto asociado</span><strong>book · engines · medicine</strong><p>Delimita el campo semántico.</p></article>
          <article><span>Lugar o posición</span><strong>around · over · at</strong><p>Separa objetos o espacios cercanos.</p></article>
          <article><span>Contraste o negación</span><strong>but · not · without</strong><p>A menudo elimina el distractor más fuerte.</p></article>
        </div>

        <div className={styles.semanticThemes}>
          <div><p className={styles.kicker}>Vocabulario por familias</p><h3>Aprende relaciones, no listas sueltas</h3></div>
          <div>
            {THEMES.map((theme) => (
              <article key={theme.title}><span aria-hidden="true">{theme.icon}</span><strong>{theme.title}</strong><small>{theme.words}</small></article>
            ))}
          </div>
        </div>
      </section>

      <div id="ejemplos"><IcfesPartOneExamples /></div>
    </>
  );
}
