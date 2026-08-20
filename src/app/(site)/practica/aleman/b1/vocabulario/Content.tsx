'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = 'var(--wlp-accent-vocabulario)';
/** El color al N % de opacidad. Antes se escribía pegando la transparencia en
    hexadecimal (`${COLOR}14`), que con una variable CSS no se puede. */
const COLORMix = (p: number) => `color-mix(in srgb, ${COLOR} ${p}%, transparent)`;

interface Word { id: string; de: string; phonetic: string; es: string; example: string; exampleEs: string; }
interface VocabSet { id: string; name: string; nameDe: string; icon: string; words: Word[]; }

const SETS: VocabSet[] = [
  {
    id: 'arbeit', name: 'Trabajo y carrera', nameDe: 'Arbeit und Karriere', icon: '💼',
    words: [
      { id: 'verhandeln', de: 'verhandeln', phonetic: '[fer-HAN-deln]', es: 'negociar', example: 'Wir müssen den Preis noch verhandeln.', exampleEs: 'Todavía tenemos que negociar el precio.' },
      { id: 'frist', de: 'die Frist', phonetic: '[FRIST]', es: 'el plazo / la fecha límite', example: 'Die Frist für den Bericht ist Freitag.', exampleEs: 'El plazo del informe es el viernes.' },
      { id: 'kollege', de: 'der Kollege', phonetic: '[ko-LEY-ge]', es: 'el colega / compañero de trabajo', example: 'Mein Kollege hat mir sehr geholfen.', exampleEs: 'Mi colega me ayudó mucho.' },
      { id: 'befoerderung', de: 'die Beförderung', phonetic: '[be-FER-de-rung]', es: 'el ascenso', example: 'Sie hat endlich die Beförderung bekommen.', exampleEs: 'Por fin recibió el ascenso.' },
      { id: 'kuendigen', de: 'kündigen', phonetic: '[KÜN-di-gen]', es: 'renunciar / despedir', example: 'Er hat seinen Job gekündigt.', exampleEs: 'Renunció a su trabajo.' },
      { id: 'vertrag', de: 'der Vertrag', phonetic: '[fer-TRAK]', es: 'el contrato', example: 'Ich habe einen neuen Vertrag unterschrieben.', exampleEs: 'Firmé un nuevo contrato.' },
      { id: 'einstellen', de: 'einstellen', phonetic: '[IN-shtel-en]', es: 'contratar', example: 'Die Firma stellt neue Mitarbeiter ein.', exampleEs: 'La empresa contrata nuevos empleados.' },
      { id: 'gehalt', de: 'das Gehalt', phonetic: '[ge-HALT]', es: 'el salario', example: 'Mein Gehalt ist dieses Jahr gestiegen.', exampleEs: 'Mi salario aumentó este año.' },
      { id: 'leistung', de: 'die Leistung', phonetic: '[LYS-tung]', es: 'el rendimiento / la prestación', example: 'Seine Leistung ist sehr gut.', exampleEs: 'Su rendimiento es muy bueno.' },
      { id: 'abteilung', de: 'die Abteilung', phonetic: '[AP-ty-lung]', es: 'el departamento', example: 'Ich arbeite in der Marketingabteilung.', exampleEs: 'Trabajo en el departamento de marketing.' },
    ],
  },
  {
    id: 'technologie', name: 'Tecnología', nameDe: 'Technologie', icon: '💻',
    words: [
      { id: 'software', de: 'die Software', phonetic: '[SOFT-vehr]', es: 'el software', example: 'Die Software muss aktualisiert werden.', exampleEs: 'El software debe actualizarse.' },
      { id: 'datenbank', de: 'die Datenbank', phonetic: '[DA-ten-bank]', es: 'la base de datos', example: 'Die Datenbank enthält alle Kundendaten.', exampleEs: 'La base de datos contiene todos los datos de los clientes.' },
      { id: 'herunterladen', de: 'herunterladen', phonetic: '[he-ROON-ter-la-den]', es: 'descargar', example: 'Ich habe die App heruntergeladen.', exampleEs: 'Descargué la aplicación.' },
      { id: 'verschluesseln', de: 'verschlüsseln', phonetic: '[fer-SHLÜS-seln]', es: 'encriptar / cifrar', example: 'Alle Daten werden verschlüsselt.', exampleEs: 'Todos los datos se encriptan.' },
      { id: 'benutzeroberflaeche', de: 'die Benutzeroberfläche', phonetic: '[be-NOOT-tser-oh-ber-flä-che]', es: 'la interfaz de usuario', example: 'Die Benutzeroberfläche ist sehr intuitiv.', exampleEs: 'La interfaz de usuario es muy intuitiva.' },
      { id: 'virus', de: 'der Virus', phonetic: '[VEE-roos]', es: 'el virus (informático)', example: 'Ein Virus hat meinen Computer infiziert.', exampleEs: 'Un virus infectó mi computadora.' },
      { id: 'algorithmus', de: 'der Algorithmus', phonetic: '[al-go-RIT-moos]', es: 'el algoritmo', example: 'Der Algorithmus berechnet die beste Route.', exampleEs: 'El algoritmo calcula la mejor ruta.' },
      { id: 'bandbreite', de: 'die Bandbreite', phonetic: '[BAND-bry-te]', es: 'el ancho de banda', example: 'Die Bandbreite ist nicht ausreichend.', exampleEs: 'El ancho de banda no es suficiente.' },
      { id: 'drahtlos', de: 'drahtlos', phonetic: '[DRAHT-lohs]', es: 'inalámbrico', example: 'Das drahtlose Netzwerk ist langsam.', exampleEs: 'La red inalámbrica es lenta.' },
      { id: 'netzwerk', de: 'das Netzwerk', phonetic: '[NETS-verk]', es: 'la red (informática)', example: 'Das Netzwerk ist ausgefallen.', exampleEs: 'La red cayó.' },
    ],
  },
  {
    id: 'gesundheit', name: 'Salud', nameDe: 'Gesundheit', icon: '🏥',
    words: [
      { id: 'diagnose', de: 'die Diagnose', phonetic: '[di-ag-NO-ze]', es: 'el diagnóstico', example: 'Der Arzt hat eine genaue Diagnose gestellt.', exampleEs: 'El médico hizo un diagnóstico preciso.' },
      { id: 'symptom', de: 'das Symptom', phonetic: '[zümp-TOM]', es: 'el síntoma', example: 'Welche Symptome haben Sie?', exampleEs: '¿Qué síntomas tiene usted?' },
      { id: 'rezept', de: 'das Rezept', phonetic: '[re-TSEPT]', es: 'la receta médica', example: 'Der Arzt hat mir ein Rezept ausgestellt.', exampleEs: 'El médico me extendió una receta.' },
      { id: 'operation', de: 'die Operation', phonetic: '[o-pe-ra-TSION]', es: 'la operación / cirugía', example: 'Die Operation verlief erfolgreich.', exampleEs: 'La operación fue exitosa.' },
      { id: 'chronisch', de: 'chronisch', phonetic: '[KRO-nish]', es: 'crónico', example: 'Er leidet an chronischen Rückenschmerzen.', exampleEs: 'Sufre de dolor de espalda crónico.' },
      { id: 'allergisch', de: 'allergisch', phonetic: '[a-LER-gish]', es: 'alérgico', example: 'Ich bin allergisch gegen Nüsse.', exampleEs: 'Soy alérgico a las nueces.' },
      { id: 'impfung', de: 'die Impfung', phonetic: '[IMP-fung]', es: 'la vacuna / vacunación', example: 'Die Impfung schützt vor Grippe.', exampleEs: 'La vacuna protege contra la gripe.' },
      { id: 'therapie', de: 'die Therapie', phonetic: '[te-ra-PEE]', es: 'la terapia', example: 'Er macht eine Therapie für seinen Rücken.', exampleEs: 'Hace terapia para su espalda.' },
      { id: 'immunitaet', de: 'die Immunität', phonetic: '[i-mu-ni-TÄHT]', es: 'la inmunidad', example: 'Die Immunität nimmt mit dem Alter ab.', exampleEs: 'La inmunidad disminuye con la edad.' },
      { id: 'genesung', de: 'die Genesung', phonetic: '[ge-NEY-zung]', es: 'la recuperación', example: 'Wir wünschen dir eine schnelle Genesung.', exampleEs: 'Te deseamos una pronta recuperación.' },
    ],
  },
  {
    id: 'umwelt', name: 'Medio ambiente', nameDe: 'Umwelt', icon: '🌿',
    words: [
      { id: 'verschmutzung', de: 'die Verschmutzung', phonetic: '[fer-SHMOOT-sung]', es: 'la contaminación', example: 'Die Luftverschmutzung ist ein globales Problem.', exampleEs: 'La contaminación del aire es un problema global.' },
      { id: 'erneuerbar', de: 'erneuerbar', phonetic: '[er-NOY-er-bar]', es: 'renovable', example: 'Erneuerbare Energien sind die Zukunft.', exampleEs: 'Las energías renovables son el futuro.' },
      { id: 'abholzung', de: 'die Abholzung', phonetic: '[AP-hol-tsung]', es: 'la deforestación', example: 'Die Abholzung des Regenwaldes ist alarmierend.', exampleEs: 'La deforestación de la selva es alarmante.' },
      { id: 'emission', de: 'die Emission', phonetic: '[e-mi-SION]', es: 'la emisión', example: 'CO2-Emissionen müssen reduziert werden.', exampleEs: 'Las emisiones de CO2 deben reducirse.' },
      { id: 'artenvielfalt', de: 'die Artenvielfalt', phonetic: '[AR-ten-feel-falt]', es: 'la biodiversidad', example: 'Die Artenvielfalt ist bedroht.', exampleEs: 'La biodiversidad está amenazada.' },
      { id: 'nachhaltig', de: 'nachhaltig', phonetic: '[NACH-hal-tig]', es: 'sostenible', example: 'Wir müssen nachhaltiger leben.', exampleEs: 'Debemos vivir de manera más sostenible.' },
      { id: 'lebensraum', de: 'der Lebensraum', phonetic: '[LEY-bens-rowm]', es: 'el hábitat', example: 'Der Lebensraum vieler Tiere wird zerstört.', exampleEs: 'El hábitat de muchos animales está siendo destruido.' },
      { id: 'duerre', de: 'die Dürre', phonetic: '[DÜ-re]', es: 'la sequía', example: 'Die Dürre hat die Ernte zerstört.', exampleEs: 'La sequía destruyó la cosecha.' },
      { id: 'naturschutz', de: 'der Naturschutz', phonetic: '[na-TOOR-shoots]', es: 'la protección de la naturaleza', example: 'Naturschutz ist die Verantwortung aller.', exampleEs: 'La protección de la naturaleza es responsabilidad de todos.' },
      { id: 'recyceln', de: 'recyceln', phonetic: '[re-ZÜ-keln]', es: 'reciclar', example: 'In Deutschland recycelt man sehr viel.', exampleEs: 'En Alemania se recicla muchísimo.' },
    ],
  },
  {
    id: 'reisen', name: 'Viajes y cultura', nameDe: 'Reisen und Kultur', icon: '✈️',
    words: [
      { id: 'reiseplan', de: 'der Reiseplan', phonetic: '[RY-ze-plan]', es: 'el itinerario', example: 'Wir haben einen genauen Reiseplan gemacht.', exampleEs: 'Hicimos un itinerario detallado.' },
      { id: 'unterkunft', de: 'die Unterkunft', phonetic: '[OON-ter-koonft]', es: 'el alojamiento', example: 'Die Unterkunft ist sehr komfortabel.', exampleEs: 'El alojamiento es muy cómodo.' },
      { id: 'waehrung', de: 'die Währung', phonetic: '[VÄ-rung]', es: 'la moneda / divisa', example: 'In Japan ist die Währung der Yen.', exampleEs: 'En Japón la moneda es el yen.' },
      { id: 'kulturerbe', de: 'das Kulturerbe', phonetic: '[kool-TOOR-er-be]', es: 'el patrimonio cultural', example: 'Das Schloss ist UNESCO-Kulturerbe.', exampleEs: 'El castillo es patrimonio cultural de la UNESCO.' },
      { id: 'zollvorschriften', de: 'die Zollvorschriften', phonetic: '[TSOL-for-shrif-ten]', es: 'las normas aduaneras', example: 'Die Zollvorschriften variieren je nach Land.', exampleEs: 'Las normas aduaneras varían según el país.' },
      { id: 'grenze', de: 'die Grenze', phonetic: '[GREN-tse]', es: 'la frontera', example: 'An der Grenze mussten wir den Pass zeigen.', exampleEs: 'En la frontera tuvimos que mostrar el pasaporte.' },
      { id: 'souvenir', de: 'das Souvenir', phonetic: '[zoo-ve-NEER]', es: 'el recuerdo / souvenir', example: 'Ich habe Souvenirs für die Familie mitgebracht.', exampleEs: 'Traje souvenirs para la familia.' },
      { id: 'expedition', de: 'die Expedition', phonetic: '[ex-pe-di-TSION]', es: 'la expedición', example: 'Die Expedition dauerte drei Monate.', exampleEs: 'La expedición duró tres meses.' },
      { id: 'tourist', de: 'der Tourist', phonetic: '[too-RIST]', es: 'el turista', example: 'Im Sommer kommen viele Touristen nach München.', exampleEs: 'En verano llegan muchos turistas a Múnich.' },
      { id: 'wahrzeichen', de: 'das Wahrzeichen', phonetic: '[VAR-tsy-chen]', es: 'el emblema / símbolo', example: 'Der Eiffelturm ist das Wahrzeichen von Paris.', exampleEs: 'La Torre Eiffel es el emblema de París.' },
    ],
  },
  {
    id: 'gesellschaft', name: 'Sociedad', nameDe: 'Gesellschaft', icon: '🤝',
    words: [
      { id: 'armut', de: 'die Armut', phonetic: '[AR-moot]', es: 'la pobreza', example: 'Armut ist ein weltweites Problem.', exampleEs: 'La pobreza es un problema mundial.' },
      { id: 'ungleichheit', de: 'die Ungleichheit', phonetic: '[oon-GLYCH-hyt]', es: 'la desigualdad', example: 'Soziale Ungleichheit nimmt zu.', exampleEs: 'La desigualdad social aumenta.' },
      { id: 'diskriminierung', de: 'die Diskriminierung', phonetic: '[dis-kri-mi-NEER-ung]', es: 'la discriminación', example: 'Diskriminierung ist inakzeptabel.', exampleEs: 'La discriminación es inaceptable.' },
      { id: 'fluechtling', de: 'der Flüchtling', phonetic: '[FLÜCHT-ling]', es: 'el refugiado', example: 'Viele Flüchtlinge brauchen Unterstützung.', exampleEs: 'Muchos refugiados necesitan apoyo.' },
      { id: 'wohltaetigkeit', de: 'die Wohltätigkeit', phonetic: '[VOL-tä-tig-kyt]', es: 'la caridad / beneficencia', example: 'Er engagiert sich für Wohltätigkeit.', exampleEs: 'Se dedica a la beneficencia.' },
      { id: 'freiwilliger', de: 'der Freiwillige', phonetic: '[FRY-vil-li-ge]', es: 'el voluntario', example: 'Viele Freiwillige helfen in den Flüchtlingslagern.', exampleEs: 'Muchos voluntarios ayudan en los campamentos de refugiados.' },
      { id: 'kampagne', de: 'die Kampagne', phonetic: '[kam-PAN-je]', es: 'la campaña', example: 'Die Kampagne hat viele Menschen erreicht.', exampleEs: 'La campaña llegó a mucha gente.' },
      { id: 'bewusstsein', de: 'das Bewusstsein', phonetic: '[be-VOOST-zyn]', es: 'la conciencia / la consciencia', example: 'Das Bewusstsein für Umweltprobleme wächst.', exampleEs: 'La conciencia sobre los problemas ambientales crece.' },
      { id: 'demonstration', de: 'die Demonstration', phonetic: '[de-mon-stra-TSION]', es: 'la manifestación', example: 'Tausende nahmen an der Demonstration teil.', exampleEs: 'Miles participaron en la manifestación.' },
      { id: 'gemeinschaft', de: 'die Gemeinschaft', phonetic: '[ge-MYN-shaft]', es: 'la comunidad', example: 'Die Gemeinschaft hilft sich gegenseitig.', exampleEs: 'La comunidad se ayuda mutuamente.' },
    ],
  },
  {
    id: 'bildung', name: 'Educación', nameDe: 'Bildung', icon: '🎓',
    words: [
      { id: 'lehrplan', de: 'der Lehrplan', phonetic: '[LEYR-plan]', es: 'el plan de estudios / currículo', example: 'Der Lehrplan wird jedes Jahr angepasst.', exampleEs: 'El plan de estudios se actualiza cada año.' },
      { id: 'stipendium', de: 'das Stipendium', phonetic: '[shti-PEN-di-oom]', es: 'la beca', example: 'Sie hat ein Stipendium gewonnen.', exampleEs: 'Ganó una beca.' },
      { id: 'schulgeld', de: 'das Schulgeld', phonetic: '[SHOOL-gelt]', es: 'la matrícula / cuota escolar', example: 'Das Schulgeld ist sehr hoch.', exampleEs: 'La matrícula es muy alta.' },
      { id: 'abschlussarbeit', de: 'die Abschlussarbeit', phonetic: '[AP-shloos-ar-byt]', es: 'la tesis / trabajo de grado', example: 'Sie schreibt ihre Abschlussarbeit über Klimawandel.', exampleEs: 'Escribe su tesis sobre el cambio climático.' },
      { id: 'forschung', de: 'die Forschung', phonetic: '[FOR-shung]', es: 'la investigación', example: 'Die Forschung hat neue Ergebnisse gebracht.', exampleEs: 'La investigación trajo nuevos resultados.' },
      { id: 'diplomiert', de: 'diplomiert', phonetic: '[di-plo-MEERT]', es: 'titulado / diplomado', example: 'Sie ist diplomierte Ingenieurin.', exampleEs: 'Es ingeniera titulada.' },
      { id: 'akademisch', de: 'akademisch', phonetic: '[a-ka-DEY-mish]', es: 'académico', example: 'Er hat eine akademische Karriere gewählt.', exampleEs: 'Eligió una carrera académica.' },
      { id: 'disziplin', de: 'die Disziplin', phonetic: '[dis-tsi-PLEEN]', es: 'la disciplina', example: 'Disziplin ist wichtig für den Lernerfolg.', exampleEs: 'La disciplina es importante para el aprendizaje.' },
      { id: 'vorlesung', de: 'die Vorlesung', phonetic: '[FOR-ley-zung]', es: 'la conferencia / clase magistral', example: 'Die Vorlesung beginnt um 9 Uhr.', exampleEs: 'La clase magistral comienza a las 9.' },
      { id: 'semester', de: 'das Semester', phonetic: '[ze-MES-ter]', es: 'el semestre', example: 'Das Wintersemester beginnt im Oktober.', exampleEs: 'El semestre de invierno comienza en octubre.' },
    ],
  },
  {
    id: 'gefuehle', name: 'Sentimientos', nameDe: 'Gefühle', icon: '💭',
    words: [
      { id: 'aengstlich', de: 'ängstlich', phonetic: '[ENGST-lich]', es: 'ansioso / temeroso', example: 'Er ist ängstlich vor der Prüfung.', exampleEs: 'Está ansioso antes del examen.' },
      { id: 'eifersuechtig', de: 'eifersüchtig', phonetic: '[I-fer-züch-tig]', es: 'celoso / envidioso', example: 'Sie ist eifersüchtig auf ihren Bruder.', exampleEs: 'Está celosa de su hermano.' },
      { id: 'dankbar', de: 'dankbar', phonetic: '[DANK-bar]', es: 'agradecido', example: 'Ich bin sehr dankbar für deine Hilfe.', exampleEs: 'Estoy muy agradecido por tu ayuda.' },
      { id: 'frustriert', de: 'frustriert', phonetic: '[froos-TREERT]', es: 'frustrado', example: 'Er ist frustriert, weil er keine Arbeit findet.', exampleEs: 'Está frustrado porque no encuentra trabajo.' },
      { id: 'selbstsicher', de: 'selbstsicher', phonetic: '[ZELPST-zi-cher]', es: 'seguro de sí mismo', example: 'Sie ist sehr selbstsicher in Präsentationen.', exampleEs: 'Es muy segura de sí misma en las presentaciones.' },
      { id: 'mitfuehlend', de: 'mitfühlend', phonetic: '[MIT-füh-lend]', es: 'compasivo / empático', example: 'Er ist ein mitfühlender Mensch.', exampleEs: 'Es una persona compasiva.' },
      { id: 'loyal', de: 'loyal', phonetic: '[lo-YAL]', es: 'leal', example: 'Sie ist eine loyale Freundin.', exampleEs: 'Es una amiga leal.' },
      { id: 'grollend', de: 'grollend', phonetic: '[GROL-lend]', es: 'resentido / rencoroso', example: 'Er ist noch grollend nach dem Streit.', exampleEs: 'Todavía está resentido después de la pelea.' },
      { id: 'liebevoll', de: 'liebevoll', phonetic: '[LEE-be-fol]', es: 'cariñoso / afectuoso', example: 'Sie ist eine liebevolle Mutter.', exampleEs: 'Es una madre cariñosa.' },
      { id: 'optimistisch', de: 'optimistisch', phonetic: '[op-ti-MIS-tish]', es: 'optimista', example: 'Trotz der Schwierigkeiten bleibt er optimistisch.', exampleEs: 'A pesar de las dificultades, sigue siendo optimista.' },
    ],
  },
];

type PracticeMode = 'flashcard' | 'mcq' | 'fillblank';
function shuffle<T>(arr: T[]): T[] { return [...arr].sort(() => Math.random() - 0.5); }

function Flashcard({ words, onDone }: { words: Word[]; onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);

  if (idx >= words.length) return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎴</div>
      <h3 style={{ margin: '0 0 0.5rem', color: COLOR }}>Fertig!</h3>
      <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>{known}/{words.length} Wörter bekannt.</p>
      <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setFlipped(false); setKnown(0); }} style={{ background: COLOR, borderColor: COLOR }}>Nochmal</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Andere Modi</button>
      </div>
    </div>
  );

  const w = words[idx];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
      <div style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{idx + 1}/{words.length}</div>
      <div onClick={() => setFlipped(f => !f)} style={{ width: '100%', maxWidth: 420, minHeight: 200, cursor: 'pointer', borderRadius: 18, border: `2px solid ${flipped ? COLOR : 'var(--line-soft)'}`, background: flipped ? `${COLORMix(3.1)}` : 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.65rem', padding: '1.5rem', transition: 'all 0.3s', textAlign: 'center' }}>
        {!flipped ? (
          <>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ink)' }}>{w.de}</div>
            <div style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', color: COLOR, fontStyle: 'italic' }}>{w.phonetic}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.25rem' }}>Klicken zum Sehen</div>
          </>
        ) : (
          <>
            <div style={{ fontSize: '1rem', color: 'var(--muted)', fontStyle: 'italic' }}>{w.de}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: COLOR }}>{w.es}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: '0.5rem', lineHeight: 1.5, borderTop: '1px solid var(--line-soft)', paddingTop: '0.5rem', width: '100%', textAlign: 'left' }}>
              <span style={{ fontStyle: 'italic', color: 'var(--ink)' }}>{w.example}</span><br /><span>{w.exampleEs}</span>
            </div>
          </>
        )}
      </div>
      {flipped && (
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="btn btn-sm" onClick={() => { setKnown(k => k + 1); setIdx(i => i + 1); setFlipped(false); }} style={{ background: COLOR, borderColor: COLOR }}>✓ Ich weiß es</button>
          <button className="btn btn-ghost btn-sm" onClick={() => { setIdx(i => i + 1); setFlipped(false); }}>Nochmal ansehen →</button>
        </div>
      )}
    </div>
  );
}

function MCQPractice({ words, onDone }: { words: Word[]; onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const shuffled = useState(() => shuffle(words))[0];

  if (idx >= shuffled.length) return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h3 style={{ margin: '0 0 0.5rem', color: COLOR }}>{score}/{shuffled.length} richtig</h3>
      <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setScore(0); setAnswered(null); }} style={{ background: COLOR, borderColor: COLOR }}>Wiederholen</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Andere Modi</button>
      </div>
    </div>
  );

  const w = shuffled[idx];
  const distractors = shuffle(shuffled.filter(x => x.de !== w.de)).slice(0, 3).map(x => x.es);
  const allOpts = shuffle([w.es, ...distractors]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ padding: '1.25rem', borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', textAlign: 'center' }}>
        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--ink)' }}>{w.de}</div>
        <div style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', color: COLOR, marginTop: '0.2rem', fontStyle: 'italic' }}>{w.phonetic}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        {allOpts.map((opt, i) => {
          const isCorrect = opt === w.es, isSel = answered !== null && allOpts[answered] === opt;
          let bg = 'var(--bg)', border = '1.5px solid var(--line-soft)', color = 'var(--ink)';
          if (answered !== null && isCorrect) { bg = 'rgba(5,150,105,0.1)'; border = '1.5px solid #059669'; color = '#059669'; }
          if (answered !== null && isSel && !isCorrect) { bg = 'rgba(220,38,38,0.1)'; border = '1.5px solid #dc2626'; color = '#dc2626'; }
          return <button key={i} disabled={answered !== null} onClick={() => { setAnswered(i); if (isCorrect) setScore(s => s + 1); }}
            style={{ padding: '0.65rem 1rem', borderRadius: 10, border, background: bg, color, fontSize: '0.95rem', cursor: answered !== null ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'all 0.15s' }}>
            {opt}
          </button>;
        })}
      </div>
      {answered !== null && (
        <div>
          <div style={{ padding: '0.65rem 0.9rem', borderRadius: 8, background: allOpts[answered] === w.es ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)', fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.65rem' }}>
            <span style={{ fontStyle: 'italic', color: 'var(--ink)' }}>{w.example}</span> — {w.exampleEs}
          </div>
          <button className="btn btn-sm" onClick={() => { setIdx(i => i + 1); setAnswered(null); }} style={{ background: COLOR, borderColor: COLOR }}>
            {idx < shuffled.length - 1 ? 'Weiter →' : 'Ergebnis →'}
          </button>
        </div>
      )}
    </div>
  );
}

function FillBlank({ words, onDone }: { words: Word[]; onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const shuffled = useState(() => shuffle(words))[0];

  if (idx >= shuffled.length) return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h3 style={{ margin: '0 0 0.5rem', color: COLOR }}>{score}/{shuffled.length} richtig</h3>
      <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setScore(0); setInput(''); setChecked(false); }} style={{ background: COLOR, borderColor: COLOR }}>Wiederholen</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Andere Modi</button>
      </div>
    </div>
  );

  const w = shuffled[idx];
  const isCorrect = input.trim().toLowerCase() === w.de.toLowerCase() ||
    input.trim().toLowerCase() === w.de.replace(/^(der|die|das|sich)\s/i, '').toLowerCase();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ padding: '1.25rem', borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', textAlign: 'center' }}>
        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: COLOR }}>{w.es}</div>
      </div>
      <p style={{ margin: 0, fontWeight: 600, color: 'var(--ink)' }}>Wie heißt das auf Deutsch (mit Artikel wenn nötig):</p>
      <input value={input} onChange={e => setInput(e.target.value)} disabled={checked} placeholder="z.B.: die Leistung"
        onKeyDown={e => { if (e.key === 'Enter' && input.trim() && !checked) { setChecked(true); if (isCorrect) setScore(s => s + 1); } }}
        style={{ padding: '0.7rem 1rem', borderRadius: 10, border: `1.5px solid ${checked ? (isCorrect ? '#059669' : '#dc2626') : 'var(--line-soft)'}`, background: 'var(--bg)', color: 'var(--ink)', fontSize: '1rem', fontFamily: 'inherit', outline: 'none' }} />
      {!checked && input.trim() && <button className="btn btn-sm" onClick={() => { setChecked(true); if (isCorrect) setScore(s => s + 1); }} style={{ background: COLOR, borderColor: COLOR }}>Überprüfen</button>}
      {checked && (
        <div>
          <div style={{ padding: '0.7rem 0.9rem', borderRadius: 9, background: isCorrect ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)', fontSize: '0.88rem', marginBottom: '0.65rem' }}>
            {isCorrect ? '✅ Richtig!' : `✗ Richtig: ${w.de}`}
            <div style={{ marginTop: '0.3rem', fontSize: '0.8rem', color: 'var(--muted)', fontStyle: 'italic' }}>{w.example}</div>
          </div>
          <button className="btn btn-sm" onClick={() => { setIdx(i => i + 1); setInput(''); setChecked(false); }} style={{ background: COLOR, borderColor: COLOR }}>
            {idx < shuffled.length - 1 ? 'Weiter →' : 'Ergebnis →'}
          </button>
        </div>
      )}
    </div>
  );
}

export default function VokabularAlemanB1() {
  const [setId, setSetId] = useState<string | null>(null);
  const [mode, setMode] = useState<PracticeMode | null>(null);
  const set = SETS.find(s => s.id === setId);

  if (set && mode) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 580 }}>
        <button onClick={() => setMode(null)} className="btn btn-ghost btn-sm" style={{ marginBottom: '1.25rem' }}>← {set.nameDe}</button>
        {mode === 'flashcard' && <Flashcard words={set.words} onDone={() => setMode(null)} />}
        {mode === 'mcq' && <MCQPractice words={set.words} onDone={() => setMode(null)} />}
        {mode === 'fillblank' && <FillBlank words={set.words} onDone={() => setMode(null)} />}
      </div>
    </section>
  );

  if (set) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 600 }}>
        <button onClick={() => setSetId(null)} className="btn btn-ghost btn-sm" style={{ marginBottom: '1.5rem' }}>← Vokabular B1</button>
        <p className="eyebrow" style={{ marginBottom: '0.4rem' }}><span className="ink-line" />{set.icon} {set.nameDe}</p>
        <h2 style={{ fontSize: '1.75rem', margin: '0 0 0.25rem', fontWeight: 700 }}>{set.name}</h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem' }}>{set.words.length} Wörter · Wähle einen Übungsmodus</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          {[{ id: 'flashcard' as PracticeMode, icon: '🎴', title: 'Karteikarten', desc: 'Sieh jedes Wort mit Übersetzung und Aussprache.' }, { id: 'mcq' as PracticeMode, icon: '🎯', title: 'Multiple Choice', desc: 'Wähle die richtige Übersetzung.' }, { id: 'fillblank' as PracticeMode, icon: '✏️', title: 'Lückentext', desc: 'Schreibe das deutsche Wort (mit Artikel).' }].map(m => (
            <button key={m.id} onClick={() => setMode(m.id)} style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.1rem 1.3rem', border: `1.5px solid ${COLORMix(13.3)}`, borderRadius: 14, background: `${COLORMix(1.6)}`, transition: 'all 0.18s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLORMix(33.3)}`; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${COLORMix(7.8)}`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLORMix(13.3)}`; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>{m.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: '0.1rem' }}>{m.title}</div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)' }}>{m.desc}</p>
                </div>
                <span style={{ color: COLOR, fontWeight: 700 }}>→</span>
              </div>
            </button>
          ))}
        </div>
        <div style={{ borderTop: '1px solid var(--line-soft)', paddingTop: '1.25rem' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.65rem' }}>Wortliste</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px,1fr))', gap: '0.55rem' }}>
            {set.words.map(w => (
              <div key={w.id} style={{ padding: '0.55rem 0.7rem', borderRadius: 9, border: '1px solid var(--line-soft)', background: 'var(--bg)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--ink)' }}>{w.de}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{w.es}</div>
                <div style={{ fontSize: '0.65rem', color: COLOR, fontFamily: 'var(--mono)', fontStyle: 'italic' }}>{w.phonetic}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/aleman/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇩🇪 Deutsch B1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📚 Vokabular</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Vokabular · Deutsch B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Wortschatz B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 520, margin: '0 0 2rem' }}>8 temáticas B1 — 80 palabras con pronunciación y ejemplos. Karteikarten, Multiple Choice y Lückentext.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px,1fr))', gap: '0.85rem' }}>
          {SETS.map(s => (
            <button key={s.id} onClick={() => setSetId(s.id)} style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ padding: '1.25rem', border: `1.5px solid ${COLORMix(13.3)}`, borderRadius: 16, background: `${COLORMix(1.6)}`, height: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem', transition: 'all 0.18s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLORMix(33.3)}`; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${COLORMix(7.8)}`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLORMix(13.3)}`; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                <div style={{ fontSize: '1.75rem' }}>{s.icon}</div>
                <div style={{ fontWeight: 800, color: 'var(--ink)' }}>{s.nameDe}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{s.name} · {s.words.length} Wörter</div>
                <div style={{ marginTop: 'auto', fontSize: '0.8rem', color: COLOR, fontWeight: 700 }}>Lernen →</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
