// ─── Historias — registro ─────────────────────────────────────────────────────
//
// Punto único de entrada. Las rutas /practica/<idioma>/historias y
// /practica/<idioma>/historias/<slug> leen solo de aquí.
//
// Para añadir una historia: crea su archivo en `<idioma>/<slug>.ts`, impórtalo
// abajo y mételo en el array de su idioma. No hay que tocar ni el motor ni las
// rutas.

import type { Historia, HistoriaLang } from './types';
import { balanceHistoria, hasAudio } from './types';

import { theLockedPhone } from './ingles/the-locked-phone';
import { theGrandfathersLedger } from './ingles/the-grandfathers-ledger';
import { theTipScreen } from './ingles/the-tip-screen';
import { dasGesperrteHandy } from './aleman/das-gesperrte-handy';
import { dasKassenbuchDesGrossvaters } from './aleman/das-kassenbuch-des-grossvaters';
import { leTelephoneVerrouille } from './frances/le-telephone-verrouille';
import { leCarnetDuGrandPere } from './frances/le-carnet-du-grand-pere';
import { ilTelefonoCapovolto } from './italiano/il-telefono-capovolto';
import { ilQuadernoDelNonno } from './italiano/il-quaderno-del-nonno';
import { oCelularViradoParaBaixo } from './portugues/o-celular-virado-para-baixo';
import { oCadernoDoAvo } from './portugues/o-caderno-do-avo';
import { jamginHyudaepon } from './coreano/jamgin-hyudaepon';
import { harabeojiuiJangbu } from './coreano/harabeoji-ui-jangbu';
import { fuseraretaSumaho } from './japones/fuserareta-sumaho';
import { sofuNoChoubo } from './japones/sofu-no-choubo';
import { telefonEkranomVniz } from './ruso/telefon-ekranom-vniz';
import { dedushkinaTetrad } from './ruso/dedushkina-tetrad';

export type { Historia, HistoriaLang } from './types';
export { totalQuestions, hasAudio } from './types';

export interface HistoriaLangMeta {
  /** Nombre del idioma en español, como se ve en el sitio. */
  label: string;
  flag: string;
  color: string;
  /** Cómo se llama la sección en la lengua del alumno (título del hub). */
  hubTitle: string;
}

export const HISTORIA_LANGS: Record<HistoriaLang, HistoriaLangMeta> = {
  ingles:    { label: 'Inglés',    flag: '🇬🇧', color: '#0066cc', hubTitle: 'Stories' },
  aleman:    { label: 'Alemán',    flag: '🇩🇪', color: '#dd0000', hubTitle: 'Geschichten' },
  frances:   { label: 'Francés',   flag: '🇫🇷', color: '#003189', hubTitle: 'Histoires' },
  italiano:  { label: 'Italiano',  flag: '🇮🇹', color: '#009246', hubTitle: 'Storie' },
  portugues: { label: 'Portugués', flag: '🇧🇷', color: '#009c3b', hubTitle: 'Histórias' },
  coreano:   { label: 'Coreano',   flag: '🇰🇷', color: '#534AB7', hubTitle: '이야기' },
  japones:   { label: 'Japonés',   flag: '🇯🇵', color: '#bc002d', hubTitle: '物語' },
  ruso:      { label: 'Ruso',      flag: '🇷🇺', color: '#cc0000', hubTitle: 'Истории' },
};

// Todas pasan por `balanceHistoria`: los archivos de contenido se escriben con
// la opción correcta donde caiga —es más fácil redactarlas así— y el reparto de
// posiciones se hace aquí, una sola vez. Ver la nota en types.ts sobre por qué.
const raw: Record<HistoriaLang, Historia[]> = {
  ingles:    [theLockedPhone, theGrandfathersLedger, theTipScreen],
  aleman:    [dasGesperrteHandy, dasKassenbuchDesGrossvaters],
  frances:   [leTelephoneVerrouille, leCarnetDuGrandPere],
  italiano:  [ilTelefonoCapovolto, ilQuadernoDelNonno],
  portugues: [oCelularViradoParaBaixo, oCadernoDoAvo],
  coreano:   [jamginHyudaepon, harabeojiuiJangbu],
  japones:   [fuseraretaSumaho, sofuNoChoubo],
  ruso:      [telefonEkranomVniz, dedushkinaTetrad],
};

export const HISTORIAS_BY_LANG: Record<HistoriaLang, Historia[]> = Object.fromEntries(
  Object.entries(raw).map(([lang, list]) => [lang, list.map(balanceHistoria)]),
) as Record<HistoriaLang, Historia[]>;

export const HISTORIA_LANG_KEYS = Object.keys(HISTORIAS_BY_LANG) as HistoriaLang[];

export function getHistorias(lang: HistoriaLang): Historia[] {
  return HISTORIAS_BY_LANG[lang] ?? [];
}

export function getHistoria(lang: HistoriaLang, slug: string): Historia | undefined {
  return getHistorias(lang).find(h => h.slug === slug);
}

/** Todas las historias de todos los idiomas — lo usa el sitemap. */
export function allHistorias(): Historia[] {
  return HISTORIA_LANG_KEYS.flatMap(l => HISTORIAS_BY_LANG[l]);
}

/** Cuántas historias del idioma ya tienen sus dos grabaciones. */
export function audioReadyCount(lang: HistoriaLang): number {
  return getHistorias(lang).filter(hasAudio).length;
}
