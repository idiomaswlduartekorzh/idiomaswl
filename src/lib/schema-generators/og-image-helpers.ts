/**
 * OG Image URL Generator
 * Usa edge rendering para crear OG images dinámicas por página
 * Patrón: /api/og?type=practica&lang=ingles&level=a1&skill=lectura
 */

interface OGImageParams {
  type: 'practica' | 'blog' | 'examen' | 'landing';
  lang?: string;
  level?: string;
  skill?: string;
  title?: string;
  category?: string;
  exam?: string;
}

const langEmojis: Record<string, string> = {
  ingles: '🇬🇧',
  coreano: '🇰🇷',
  frances: '🇫🇷',
  aleman: '🇩🇪',
  italiano: '🇮🇹',
  portugues: '🇵🇹',
  japones: '🇯🇵',
  ruso: '🇷🇺',
};

const langColors: Record<string, string> = {
  ingles: '#0f3d8c',
  coreano: '#c60c30',
  frances: '#1a2ecc',
  aleman: '#1a2ecc',
  italiano: '#009246',
  portugues: '#166534',
  japones: '#bc002d',
  ruso: '#ff0000',
};

const skillEmojis: Record<string, string> = {
  lectura: '📖',
  gramatica: '📐',
  escritura: '✍️',
  vocabulario: '📚',
  habla: '🗣️',
  escucha: '🎧',
};

export function generateOGImageUrl(params: OGImageParams): string {
  const baseUrl = 'https://www.idiomaswl.com/api/og';
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.append(key, String(value));
    }
  });

  return `${baseUrl}?${searchParams.toString()}`;
}

/**
 * Helper específico para práctica
 */
export function practiceOGImage(lang: string, level: string, skill: string): string {
  return generateOGImageUrl({
    type: 'practica',
    lang,
    level,
    skill,
  });
}

/**
 * Helper específico para blog
 */
export function blogOGImage(title: string, category?: string): string {
  return generateOGImageUrl({
    type: 'blog',
    title,
    category,
  });
}

/**
 * Helper específico para exámenes
 */
export function examOGImage(exam: string, level?: string): string {
  return generateOGImageUrl({
    type: 'examen',
    exam,
    level,
  });
}

/**
 * Helper específico para landing pages
 */
export function landingOGImage(title: string, lang?: string): string {
  return generateOGImageUrl({
    type: 'landing',
    title,
    lang,
  });
}

/**
 * Obtener emoji e información visual para un idioma
 */
export function getLangDisplay(lang: string): { emoji: string; color: string; name: string } {
  const langNames: Record<string, string> = {
    ingles: 'Inglés',
    coreano: 'Coreano',
    frances: 'Francés',
    aleman: 'Alemán',
    italiano: 'Italiano',
    portugues: 'Portugués',
    japones: 'Japonés',
    ruso: 'Ruso',
  };

  return {
    emoji: langEmojis[lang] ?? '🌍',
    color: langColors[lang] ?? '#0f3d8c',
    name: langNames[lang] ?? lang,
  };
}

export function getSkillDisplay(skill: string): { emoji: string; name: string } {
  const skillNames: Record<string, string> = {
    lectura: 'Lectura',
    gramatica: 'Gramática',
    escritura: 'Escritura',
    vocabulario: 'Vocabulario',
    habla: 'Expresión Oral',
    escucha: 'Comprensión Auditiva',
  };

  return {
    emoji: skillEmojis[skill] ?? '📚',
    name: skillNames[skill] ?? skill,
  };
}
