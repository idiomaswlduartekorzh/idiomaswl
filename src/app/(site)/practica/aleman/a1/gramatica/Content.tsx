'use client';

import QuestEngine from '@/components/practica/QuestEngine';
import type { QuestLevel, QuestGuide } from '@/components/practica/QuestEngine';

const guide: QuestGuide = {
  title: 'Gramática Alemán A1 — Guía de referencia',
  body: 'Los 5 pilares del alemán A1: artículos (der/die/das), sein (ser/estar), haben (tener), pronombres personales y negación con nicht/kein.\nEl alemán tiene 3 géneros gramaticales (masculino, femenino, neutro) y 4 casos. En A1 trabajamos principalmente el Nominativo (sujeto) y el Acusativo (objeto directo).',
  tip: 'Truco clave: siempre aprende el artículo con el sustantivo: "der Tisch" no solo "Tisch". El género no sigue reglas claras — memorizar en contexto es la clave.',
  tableHead: ['Tema', 'Puntos clave', 'Ejemplo'],
  tableRows: [
    ['Artikel', 'der (m) · die (f) · das (n) · ein/eine', '"der Mann, die Frau, das Kind"'],
    ['sein', 'bin · bist · ist · sind · seid', '"Ich bin Student. Du bist nett."'],
    ['haben', 'habe · hast · hat · haben · habt', '"Ich habe Hunger. Er hat keine Zeit."'],
    ['Pronomen', 'ich du er sie es wir ihr sie Sie', '"Sie" formal con mayúscula = usted'],
    ['Verneinung', 'nicht (verbos/adj.) · kein/keine (sustantivos)', '"Ich fahre nicht. Ich habe kein Auto."'],
  ],
};

const levels: QuestLevel[] = [
  {
    type: 'freeText',
    icon: '🔤',
    title: 'Artikel — der, die, das, ein, eine',
    desc: 'El alemán tiene 3 géneros. No hay regla universal — hay que memorizar con cada sustantivo. Acusativo masculino: der → den / ein → einen.',
    items: [
      { text: 'Wo ist ___ Tisch? (m.)', ans: 'der', hint: '"Tisch" (mesa) es masculino → der Tisch' },
      { text: 'Ich kaufe ___ Buch. (n.)', ans: 'ein', hint: '"Buch" es neutro, objeto indefinido → ein Buch' },
      { text: '___ Frau ist sehr nett. (f.)', ans: 'Die', hint: '"Frau" es femenino → die Frau' },
      { text: 'Das ist ___ Auto. (n.)', ans: 'ein', hint: '"Auto" es neutro → ein Auto (indefinido)' },
      { text: 'Ich habe ___ Hund. (m.)', ans: 'einen', hint: '"Hund" es masculino objeto (Akk.) → ein → einen' },
      { text: '___ Kind spielt im Garten. (n.)', ans: 'Das', hint: '"Kind" (niño) es neutro → Das Kind' },
      { text: 'Wo ist ___ Küche? (f.)', ans: 'die', hint: '"Küche" (cocina) es femenino → die Küche' },
      { text: 'Ich trinke ___ Kaffee. (m.)', ans: 'einen', hint: '"Kaffee" objeto masculino → einen Kaffee (Akk.)' },
      { text: 'Das ist ___ Wohnung. (f.)', ans: 'eine', hint: '"Wohnung" es femenino indefinido → eine Wohnung' },
      { text: '___ Mann kommt aus Berlin. (m.)', ans: 'Der', hint: '"Mann" masculino sujeto → Der Mann' },
    ],
  },
  {
    type: 'freeText',
    icon: '🧩',
    title: 'sein — ser/estar (bin, bist, ist…)',
    desc: '"Sein" hace las dos funciones de ser y estar. Conjugación irregular: bin / bist / ist / sind / seid / sind.',
    items: [
      { text: 'Ich ___ Student.', ans: 'bin', hint: 'Primera persona singular: ich bin' },
      { text: 'Du ___ sehr nett!', ans: 'bist', hint: 'Segunda persona singular: du bist' },
      { text: 'Er ___ aus Deutschland.', ans: 'ist', hint: 'Tercera persona singular: er/sie/es ist' },
      { text: 'Sie (she) ___ Ärztin.', ans: 'ist', hint: 'Sie (ella) → ist (igual que er)' },
      { text: 'Wir ___ Freunde.', ans: 'sind', hint: 'Primera persona plural: wir sind' },
      { text: 'Ihr ___ in Berlin.', ans: 'seid', hint: 'Segunda persona plural informal: ihr seid' },
      { text: 'Sie (they) ___ Studenten.', ans: 'sind', hint: 'Tercera persona plural: sie sind' },
      { text: 'Das ___ mein Buch.', ans: 'ist', hint: 'Das (neutro 3ª persona) → ist' },
      { text: 'Ich ___ nicht müde.', ans: 'bin', hint: 'Con negación "nicht" el verbo no cambia' },
      { text: 'Wo ___ du?', ans: 'bist', hint: 'Pregunta con du → bist → Wo bist du?' },
    ],
  },
  {
    type: 'freeText',
    icon: '✋',
    title: 'haben — tener (habe, hast, hat…)',
    desc: '"Haben" se usa para posesión, familia y estados físicos. "Ich habe Hunger" = tengo hambre (NOT bin hungry como en inglés).',
    items: [
      { text: 'Ich ___ einen Bruder.', ans: 'habe', hint: 'Primera persona: ich habe' },
      { text: 'Du ___ ein großes Haus.', ans: 'hast', hint: 'Segunda persona: du hast' },
      { text: 'Er ___ keine Zeit.', ans: 'hat', hint: 'Tercera persona: er/sie/es hat' },
      { text: 'Wir ___ zwei Kinder.', ans: 'haben', hint: 'Primera plural: wir haben' },
      { text: 'Ihr ___ viele Freunde.', ans: 'habt', hint: 'Segunda plural: ihr habt' },
      { text: 'Sie (they) ___ ein Auto.', ans: 'haben', hint: 'Tercera plural: sie haben' },
      { text: 'Ich ___ Hunger.', ans: 'habe', hint: 'Estados físicos: Ich habe Hunger (tengo hambre)' },
      { text: 'Sie (she) ___ eine Katze.', ans: 'hat', hint: 'Sie (ella) → hat (igual que er)' },
      { text: '___ du ein Handy?', ans: 'Hast', hint: 'Pregunta invertida: verbo al inicio → Hast du...?' },
      { text: 'Wir ___ keine Garage.', ans: 'haben', hint: 'kein/keine + sustantivo niega la posesión' },
    ],
  },
  {
    type: 'freeText',
    icon: '👤',
    title: 'Personalpronomen — Pronombres',
    desc: 'ich · du · er · sie · es · wir · ihr · sie (ellos) · Sie (usted). Cuidado: "Sie" con mayúscula = usted/ustedes (formal).',
    items: [
      { text: '___ heiße Marie.', ans: 'Ich', hint: 'Primera persona: Ich (yo)' },
      { text: '___ kommst aus Spanien.', ans: 'Du', hint: 'Segunda persona informal: Du (tú)' },
      { text: '___ ist sehr groß. (m.)', ans: 'Er', hint: 'Tercera persona masculino: Er (él)' },
      { text: '___ wohnt in Paris. (f.)', ans: 'Sie', hint: 'Tercera persona femenino: Sie (ella)' },
      { text: '___ sind Studenten. (nosotros)', ans: 'Wir', hint: 'Primera persona plural: Wir (nosotros)' },
      { text: '___ seid meine Freunde. (vosotros)', ans: 'Ihr', hint: 'Segunda persona plural informal: Ihr' },
      { text: '___ kommen aus Deutschland. (ellos)', ans: 'Sie', hint: 'Tercera persona plural: Sie/sie (ellos)' },
      { text: '___ sind der Chef? (usted formal)', ans: 'Sie', hint: '"Sie" con mayúscula = usted (formal)' },
      { text: '___ ist klein. (el carro — neutro)', ans: 'Es', hint: 'Pronombre neutro: Es (ello/él-neutro)' },
      { text: '___ lernst Deutsch.', ans: 'Du', hint: '"Du lernst" — conjugación -st para du' },
    ],
  },
  {
    type: 'freeText',
    icon: '🚫',
    title: 'Verneinung — nicht y kein/keine',
    desc: '"Nicht" niega verbos, adjetivos y adverbios. "Kein/Keine" niega sustantivos. Regla: NO se dice "Ich habe nicht ein Auto" — debe ser "kein Auto".',
    items: [
      { text: 'Ich habe ___ Hund. (ningún perro)', ans: 'keinen', hint: '"Hund" masculino objeto (Akk.) → keinen' },
      { text: 'Das ist ___ Problem. (no es un problema)', ans: 'kein', hint: '"Problem" es neutro → kein Problem' },
      { text: 'Ich verstehe das ___.', ans: 'nicht', hint: '"Nicht" niega el verbo, va al final' },
      { text: 'Er kommt ___ heute.', ans: 'nicht', hint: '"Nicht" delante del adverbio "heute"' },
      { text: 'Wir haben ___ Zeit. (ningún tiempo)', ans: 'keine', hint: '"Zeit" es femenino → keine Zeit' },
      { text: 'Das ist ___ Tisch. (no es una mesa)', ans: 'kein', hint: '"Tisch" masculino predicado → kein Tisch' },
      { text: 'Ich bin ___ müde.', ans: 'nicht', hint: '"Nicht" niega el adjetivo "müde"' },
      { text: 'Sie hat ___ Kinder. (ningún hijo)', ans: 'keine', hint: '"Kinder" (plural) → keine Kinder' },
      { text: 'Ich spreche ___ Englisch.', ans: 'kein', hint: '"Englisch" como sustantivo neutro incontable → kein' },
      { text: 'Er arbeitet ___ viel.', ans: 'nicht', hint: '"Nicht" niega el adverbio "viel"' },
    ],
  },
  {
    type: 'sprint',
    icon: '⚡',
    title: 'Sprint — alle Themen!',
    desc: 'Mix de los 5 temas. Escribe sin pensar.',
    inputWidth: 75,
    items: [
      { text: '___ Frau kommt aus München. (f.)', ans: 'Die', hint: 'artículo femenino' },
      { text: 'Du ___ sehr intelligent!', ans: 'bist', hint: 'sein: du' },
      { text: 'Er ___ ein großes Haus.', ans: 'hat', hint: 'haben: er' },
      { text: '___ bin Lehrerin.', ans: 'Ich', hint: 'pronombre' },
      { text: 'Ich habe ___ Auto. (ningún carro)', ans: 'kein', hint: 'kein + neutro' },
      { text: 'Wir ___ Studenten.', ans: 'sind', hint: 'sein: wir' },
      { text: 'Ich kaufe ___ Buch. (n.)', ans: 'ein', hint: 'artículo neutro indefinido' },
      { text: 'Sie (she) ___ eine Katze.', ans: 'hat', hint: 'haben: sie (ella)' },
      { text: 'Ich spreche ___ Deutsch. (todavía no)', ans: ['nicht', 'kein'], hint: 'niega verbo → nicht; o "kein Deutsch"' },
      { text: '___ sind meine Freunde. (nosotros)', ans: 'Wir', hint: 'pronombre plural' },
    ],
  },
];

export default function GramaticaAlemanA1() {
  return (
    <QuestEngine
      color="#dd0000"
      flag="🇩🇪"
      storageKey="quest-de-a1-grammatik"
      guide={guide}
      levels={levels}
      backHref="/practica/aleman/a1"
      backLabel="Deutsch A1"
      title="Grammatik A1"
      subtitle="Alemán A1 — Gramática"
    />
  );
}
