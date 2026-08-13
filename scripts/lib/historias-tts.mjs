// ─── Normalización del guion para locución ────────────────────────────────────
//
// Fuente única de la verdad sobre QUÉ TEXTO se le manda al TTS. La usan tanto la
// auditoría (`audit-historias-tts.mjs`) como el generador
// (`generate-historias-audio.mjs`), para que el número de caracteres que ves
// auditando sea exactamente el que se factura al generar.
//
// REGLA QUE NO SE TOCA: esto no reescribe el guion. Solo quita marcas que existen
// para la PANTALLA y que no son palabras. Si alguna vez hiciera falta cambiar
// palabras para que suenen mejor, se cambia el archivo de la historia — porque la
// transcripción que lee el alumno tiene que decir lo mismo que oye.

/**
 * El japonés se escribe sin espacios. Los que hay en las transcripciones son
 * artificiales: existen para que el clic-para-traducir pueda separar palabras.
 *
 * Mandárselos al TTS es malo por dos motivos: mete micropausas donde no las hay
 * (suena a lectura de lista, no a nota de voz) y cada espacio es un carácter que
 * se paga. En un texto japonés de ~200 palabras son ~200 caracteres tirados.
 *
 * Se quitan solo entre caracteres japoneses, no dentro de una palabra latina
 * suelta, por si algún día entra una sigla.
 */
function stripJapaneseDisplaySpaces(text) {
  const JP = '\\p{Script=Han}\\p{Script=Hiragana}\\p{Script=Katakana}ー々〆〇、。「」『』！？…';
  return text.replace(new RegExp(`(?<=[${JP}])[ \\t]+(?=[${JP}])`, 'gu'), '');
}

const NORMALIZERS = {
  japones: stripJapaneseDisplaySpaces,
};

/**
 * Texto exacto que se manda al TTS para una nota de voz.
 * Los párrafos van separados por línea en blanco: el modelo lo interpreta como
 * pausa de respiración, que es justo lo que hace alguien mandando un audio.
 */
export function ttsTextFor(lang, paragraphs) {
  const joined = paragraphs.map(p => p.trim()).join('\n\n');
  const normalize = NORMALIZERS[lang];
  return normalize ? normalize(joined) : joined;
}

/** Lo que conviene saber antes de elegir voz y modelo en cada idioma. */
export const TTS_LANG_NOTES = {
  ingles: 'Inglés británico o americano, indistinto: la historia no lo marca.',
  aleman: 'Alemán estándar. Ojo con «Größvater»/«ß» si alguna vez entra: los modelos lo llevan bien, pero escúchalo.',
  frances: 'Francés de Francia. Vigila las liaisons en «les affaires» y «vous avez».',
  italiano: 'Italiano estándar. Escucha las dobles («fidanzata», «tabella»): es donde más se nota un modelo flojo.',
  portugues: 'Portugués de BRASIL, no de Portugal. Elegir voz brasileña explícitamente: la historia usa «celular», «a gente», «zoando».',
  coreano: 'Coreano. La nuera habla en 존댓말 todo el rato aunque esté acusando: la voz no debe sonar agresiva, ahí está la gracia.',
  japones: 'Japonés. Los espacios del texto son de pantalla y se quitan antes de enviar (ver arriba).',
  ruso: 'Ruso. Comprueba la acentuación de «звонит»/«началА» tipo: es el fallo clásico de los modelos en ruso.',
};
