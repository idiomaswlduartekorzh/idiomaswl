// ─── Korean Compound Words Dataset ───────────────────────────────────────────
// 합성어 (hapseong-eo) — words built by combining two existing roots.
// Used in /practica → Bloques de vocabulario

export type RootCategory = 'cuerpo' | 'naturaleza' | 'objetos' | 'espacio';
export type CompoundLevel = 'A1' | 'A2' | 'B1';

export interface KoreanRoot {
  id: string;
  hangul: string;
  romanization: string;
  meaning: string;        // Spanish
  emoji: string;
  category: RootCategory;
}

export interface KoreanCompound {
  id: string;
  parts: [string, string]; // root IDs
  hangul: string;
  romanization: string;
  meaning: string;         // Spanish
  explanation: string;     // how the parts produce the meaning
  level: CompoundLevel;
  note?: string;           // phonological note (sound changes, etc.)
}

export const CATEGORY_COLORS: Record<RootCategory, string> = {
  cuerpo:     '#e11d48',
  naturaleza: '#059669',
  objetos:    '#d97706',
  espacio:    '#534AB7',
};

// ─── Roots ────────────────────────────────────────────────────────────────────

export const ROOTS: KoreanRoot[] = [
  // Cuerpo
  { id: 'nun',   hangul: '눈',   romanization: 'nun',   meaning: 'ojo / nieve',    emoji: '👁️',  category: 'cuerpo'     },
  { id: 'son',   hangul: '손',   romanization: 'son',   meaning: 'mano',           emoji: '✋',  category: 'cuerpo'     },
  { id: 'bal',   hangul: '발',   romanization: 'bal',   meaning: 'pie',            emoji: '🦶',  category: 'cuerpo'     },
  { id: 'mok',   hangul: '목',   romanization: 'mok',   meaning: 'cuello / tallo', emoji: '🔗',  category: 'cuerpo'     },
  { id: 'saram', hangul: '사람', romanization: 'saram', meaning: 'persona',        emoji: '🧍',  category: 'cuerpo'     },
  { id: 'garak', hangul: '가락', romanization: 'garak', meaning: 'dedo / palito',  emoji: '〽️', category: 'cuerpo'     },
  // Naturaleza
  { id: 'mul',   hangul: '물',   romanization: 'mul',   meaning: 'agua',           emoji: '💧',  category: 'naturaleza' },
  { id: 'bi',    hangul: '비',   romanization: 'bi',    meaning: 'lluvia',         emoji: '🌧️',  category: 'naturaleza' },
  { id: 'baram', hangul: '바람', romanization: 'baram', meaning: 'viento',         emoji: '💨',  category: 'naturaleza' },
  { id: 'kkot',  hangul: '꽃',   romanization: 'kkot',  meaning: 'flor',           emoji: '🌸',  category: 'naturaleza' },
  { id: 'namu',  hangul: '나무', romanization: 'namu',  meaning: 'árbol',          emoji: '🌳',  category: 'naturaleza' },
  { id: 'ip',    hangul: '잎',   romanization: 'ip',    meaning: 'hoja',           emoji: '🍃',  category: 'naturaleza' },
  { id: 'haneul',hangul: '하늘', romanization: 'haneul',meaning: 'cielo',          emoji: '🌤️',  category: 'naturaleza' },
  { id: 'bul',   hangul: '불',   romanization: 'bul',   meaning: 'fuego',          emoji: '🔥',  category: 'naturaleza' },
  { id: 'bat',   hangul: '밭',   romanization: 'bat',   meaning: 'campo / jardín', emoji: '🌾',  category: 'naturaleza' },
  // Objetos
  { id: 'gogi',  hangul: '고기', romanization: 'gogi',  meaning: 'carne',          emoji: '🥩',  category: 'objetos'    },
  { id: 'saek',  hangul: '색',   romanization: 'saek',  meaning: 'color',          emoji: '🎨',  category: 'objetos'    },
  { id: 'bich',  hangul: '빛',   romanization: 'bich',  meaning: 'luz',            emoji: '✨',  category: 'objetos'    },
  { id: 'jip',   hangul: '집',   romanization: 'jip',   meaning: 'casa',           emoji: '🏡',  category: 'objetos'    },
  // Espacio
  { id: 'badak', hangul: '바닥', romanization: 'badak', meaning: 'suelo / fondo',  emoji: '⬇️',  category: 'espacio'    },
  { id: 'gil',   hangul: '길',   romanization: 'gil',   meaning: 'camino',         emoji: '🛤️',  category: 'espacio'    },
  { id: 'an',    hangul: '안',   romanization: 'an',    meaning: 'interior / adentro', emoji: '📦', category: 'espacio' },
  { id: 'ga',    hangul: '가',   romanization: 'ga',    meaning: 'borde / lado',   emoji: '↔️',  category: 'espacio'    },
];

// ─── Compounds ────────────────────────────────────────────────────────────────

export const COMPOUNDS: KoreanCompound[] = [
  // ── 눈 family ──────────────────────────────────────────────────────────────
  {
    id: 'nunmul', parts: ['nun', 'mul'],
    hangul: '눈물', romanization: 'nunmul', level: 'A1',
    meaning: 'lágrimas',
    explanation: 'El "agua" (물) de los "ojos" (눈). Las lágrimas son literalmente agua de ojo.',
  },
  {
    id: 'nunsaram', parts: ['nun', 'saram'],
    hangul: '눈사람', romanization: 'nunsaram', level: 'A1',
    meaning: 'muñeco de nieve',
    explanation: 'Una "persona" (사람) hecha de "nieve" (눈). Aquí 눈 significa nieve, no ojo.',
    note: '눈 tiene dos significados: ojo y nieve. El contexto lo determina.',
  },
  {
    id: 'nunbaram', parts: ['nun', 'baram'],
    hangul: '눈바람', romanization: 'nunbaram', level: 'A2',
    meaning: 'ventisca / tormenta de nieve',
    explanation: '"Nieve" (눈) arrastrada por el "viento" (바람).',
  },

  // ── 손 family ──────────────────────────────────────────────────────────────
  {
    id: 'songarak', parts: ['son', 'garak'],
    hangul: '손가락', romanization: 'songarak', level: 'A1',
    meaning: 'dedo (de la mano)',
    explanation: 'Los "palitos" (가락) de la "mano" (손). Piensa en los dedos como ramitas de la mano.',
  },
  {
    id: 'sonbadak', parts: ['son', 'badak'],
    hangul: '손바닥', romanization: 'sonbadak', level: 'A1',
    meaning: 'palma de la mano',
    explanation: 'El "fondo" (바닥) de la "mano" (손). Como el suelo de la mano.',
  },
  {
    id: 'sonmok', parts: ['son', 'mok'],
    hangul: '손목', romanization: 'sonmok', level: 'A2',
    meaning: 'muñeca',
    explanation: 'El "cuello" (목) de la "mano" (손). El cuello es la parte que conecta dos cosas.',
  },

  // ── 발 family ──────────────────────────────────────────────────────────────
  {
    id: 'balgarak', parts: ['bal', 'garak'],
    hangul: '발가락', romanization: 'balgarak', level: 'A1',
    meaning: 'dedo del pie',
    explanation: 'Los "palitos" (가락) del "pie" (발). Mismo patrón que 손가락.',
  },
  {
    id: 'balbadak', parts: ['bal', 'badak'],
    hangul: '발바닥', romanization: 'balbadak', level: 'A1',
    meaning: 'planta del pie',
    explanation: 'El "fondo" (바닥) del "pie" (발). Mismo patrón que 손바닥.',
  },
  {
    id: 'balmok', parts: ['bal', 'mok'],
    hangul: '발목', romanization: 'balmok', level: 'A2',
    meaning: 'tobillo',
    explanation: 'El "cuello" (목) del "pie" (발). El tobillo conecta la pierna con el pie, como un cuello.',
  },

  // ── 불 family ──────────────────────────────────────────────────────────────
  {
    id: 'bulgogi', parts: ['bul', 'gogi'],
    hangul: '불고기', romanization: 'bulgogi', level: 'A1',
    meaning: 'bulgogi (carne a la brasa)',
    explanation: '"Carne" (고기) al "fuego" (불). Un plato coreano famoso.',
  },
  {
    id: 'bulbich', parts: ['bul', 'bich'],
    hangul: '불빛', romanization: 'bulbit', level: 'A2',
    meaning: 'resplandor / luz del fuego',
    explanation: 'La "luz" (빛) del "fuego" (불). El brillo de una llama.',
  },

  // ── 비/물 family ──────────────────────────────────────────────────────────
  {
    id: 'binmul', parts: ['bi', 'mul'],
    hangul: '빗물', romanization: 'binmul', level: 'A1',
    meaning: 'agua de lluvia',
    explanation: 'El "agua" (물) de la "lluvia" (비).',
    note: 'Al unirse 비+물, se agrega una ㅅ entre los dos: 빗물. Este fenómeno se llama 사이시옷 (saiiot).',
  },
  {
    id: 'bibaram', parts: ['bi', 'baram'],
    hangul: '비바람', romanization: 'bibaram', level: 'A1',
    meaning: 'lluvia con viento / aguacero ventoso',
    explanation: '"Lluvia" (비) y "viento" (바람) juntos. Una tormenta.',
  },
  {
    id: 'mulbich', parts: ['mul', 'bich'],
    hangul: '물빛', romanization: 'mulbit', level: 'A2',
    meaning: 'color del agua / azul agua',
    explanation: 'La "luz/color" (빛) del "agua" (물). El tono azul transparente del agua.',
  },

  // ── 꽃 family ─────────────────────────────────────────────────────────────
  {
    id: 'kkotbat', parts: ['kkot', 'bat'],
    hangul: '꽃밭', romanization: 'kkotbat', level: 'A1',
    meaning: 'jardín de flores',
    explanation: 'Un "campo/jardín" (밭) de "flores" (꽃). Un lugar lleno de flores.',
  },
  {
    id: 'kkotgil', parts: ['kkot', 'gil'],
    hangul: '꽃길', romanization: 'kkotgil', level: 'A1',
    meaning: 'camino de flores',
    explanation: 'Un "camino" (길) rodeado de "flores" (꽃). También se usa metafóricamente para un camino bonito en la vida.',
  },

  // ── 나무 family ──────────────────────────────────────────────────────────
  {
    id: 'namunnip', parts: ['namu', 'ip'],
    hangul: '나뭇잎', romanization: 'namunnip', level: 'A1',
    meaning: 'hoja de árbol',
    explanation: 'La "hoja" (잎) del "árbol" (나무).',
    note: 'Al unirse 나무+잎, se agrega 사이시옷: 나뭇잎. La pronunciación es [나문닙].',
  },

  // ── 눈 familia extendida ──────────────────────────────────────────────────
  {
    id: 'nunbich', parts: ['nun', 'bich'],
    hangul: '눈빛', romanization: 'nunbit', level: 'A1',
    meaning: 'mirada / expresión de los ojos',
    explanation: 'La "luz" (빛) de los "ojos" (눈). La expresión que transmiten los ojos sin palabras.',
  },
  {
    id: 'nungil', parts: ['nun', 'gil'],
    hangul: '눈길', romanization: 'nungil', level: 'A2',
    meaning: 'camino nevado / mirada',
    explanation: '"Camino" (길) de "nieve" (눈) en sentido literal. En sentido figurado, la dirección de la mirada.',
    note: '눈 puede ser ojo o nieve. 눈길 tiene ambos significados según el contexto.',
  },
  {
    id: 'nunga', parts: ['nun', 'ga'],
    hangul: '눈가', romanization: 'nunga', level: 'A2',
    meaning: 'rabillo / zona alrededor del ojo',
    explanation: 'El "borde" (가) del "ojo" (눈). La zona que rodea el ojo, especialmente el rabillo.',
  },

  // ── 손·발 familia extendida ───────────────────────────────────────────────
  {
    id: 'songil', parts: ['son', 'gil'],
    hangul: '손길', romanization: 'songil', level: 'A2',
    meaning: 'toque / mano amiga',
    explanation: 'El "camino" (길) de la "mano" (손). El alcance o el toque de una mano — también se usa para un gesto de ayuda.',
  },
  {
    id: 'balgil', parts: ['bal', 'gil'],
    hangul: '발길', romanization: 'balgil', level: 'A2',
    meaning: 'pisada / patada',
    explanation: 'El "camino" (길) del "pie" (발). El movimiento del pie al caminar, y también un puntapié.',
  },

  // ── 물 familia extendida ──────────────────────────────────────────────────
  {
    id: 'mulgogi', parts: ['mul', 'gogi'],
    hangul: '물고기', romanization: 'mulgogi', level: 'A1',
    meaning: 'pez / pescado',
    explanation: 'La "carne" (고기) del "agua" (물). ¡Un pez es literalmente la carne del agua en coreano! Es uno de los compuestos más elegantes del idioma.',
  },
  {
    id: 'mulga', parts: ['mul', 'ga'],
    hangul: '물가', romanization: 'mulga', level: 'A1',
    meaning: 'orilla del agua / ribera',
    explanation: 'El "borde" (가) del "agua" (물). La orilla de un río, lago o mar.',
  },
  {
    id: 'mulgil', parts: ['mul', 'gil'],
    hangul: '물길', romanization: 'mulgil', level: 'A2',
    meaning: 'cauce / canal de agua',
    explanation: 'El "camino" (길) del "agua" (물). El recorrido que hace el agua — un río, canal o acequia.',
  },

  // ── 꽃 familia extendida ──────────────────────────────────────────────────
  {
    id: 'kkotnip', parts: ['kkot', 'ip'],
    hangul: '꽃잎', romanization: 'kkonnip', level: 'A1',
    meaning: 'pétalo',
    explanation: 'La "hoja" (잎) de la "flor" (꽃). Los pétalos son como las hojas de una flor.',
    note: 'Saiiot: 꽃+잎 → 꽃잎, pronunciado [꼰닙].',
  },

  // ── 하늘 familia extendida ────────────────────────────────────────────────
  {
    id: 'haneulbich', parts: ['haneul', 'bich'],
    hangul: '하늘빛', romanization: 'haneulbit', level: 'A2',
    meaning: 'resplandor del cielo / azul cielo',
    explanation: 'La "luz/color" (빛) del "cielo" (하늘). El tono o el brillo del cielo, más poético que 하늘색.',
  },
  {
    id: 'haneulsaek', parts: ['haneul', 'saek'],
    hangul: '하늘색', romanization: 'haneulsaek', level: 'A2',
    meaning: 'azul cielo (color)',
    explanation: 'El "color" (색) del "cielo" (하늘). El celeste clásico. 하늘색 es más específico al color; 하늘빛 es más poético.',
  },

  // ── 불 familia extendida ──────────────────────────────────────────────────
  {
    id: 'bulgil', parts: ['bul', 'gil'],
    hangul: '불길', romanization: 'bulgil', level: 'A2',
    meaning: 'llamarada / presagio',
    explanation: 'El "camino" (길) del "fuego" (불). Las llamas que avanzan. También se usa como adjetivo para decir que algo es de mal agüero.',
  },
  {
    id: 'bulbaram', parts: ['bul', 'baram'],
    hangul: '불바람', romanization: 'bulbaram', level: 'B1',
    meaning: 'vendaval ardiente / tormenta de fuego',
    explanation: 'El "viento" (바람) del "fuego" (불). Una ráfaga de calor extremo, también se usa metafóricamente.',
  },

  // ── misc ──────────────────────────────────────────────────────────────────
  {
    id: 'jiban', parts: ['jip', 'an'],
    hangul: '집안', romanization: 'jizan', level: 'A2',
    meaning: 'interior del hogar / familia',
    explanation: 'El "interior" (안) de la "casa" (집). También se usa para referirse a la familia y los asuntos del hogar.',
  },
  {
    id: 'gilga', parts: ['gil', 'ga'],
    hangul: '길가', romanization: 'gilga', level: 'B1',
    meaning: 'borde del camino / cuneta',
    explanation: 'El "borde/lado" (가) del "camino" (길). La orilla de la calle.',
  },
];

// ─── helpers ──────────────────────────────────────────────────────────────────

export function getRootById(id: string): KoreanRoot | undefined {
  return ROOTS.find(r => r.id === id);
}

export function findCompound(id1: string, id2: string): KoreanCompound | null {
  return COMPOUNDS.find(c =>
    (c.parts[0] === id1 && c.parts[1] === id2) ||
    (c.parts[0] === id2 && c.parts[1] === id1)
  ) ?? null;
}

export function getCompoundsForRoot(rootId: string): KoreanCompound[] {
  return COMPOUNDS.filter(c => c.parts.includes(rootId));
}
