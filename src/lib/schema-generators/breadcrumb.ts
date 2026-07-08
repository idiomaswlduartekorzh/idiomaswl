/**
 * BreadcrumbList Schema Generator
 * Mejora CTR en SERPs mostrando la ruta de navegación
 */

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbListProps {
  items: BreadcrumbItem[];
}

export function generateBreadcrumbSchema(props: BreadcrumbListProps): object {
  const { items } = props;

  const itemListElement = items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };
}

/**
 * Helpers para generar breadcrumbs comunes en el sitio
 */

export function practicaBreadcrumbs(lang: string, level?: string, skill?: string, theme?: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { name: 'Inicio', url: 'https://www.idiomaswl.com' },
    { name: 'Práctica', url: 'https://www.idiomaswl.com/practica' },
    { name: `${capitalizeFirst(lang)}`, url: `https://www.idiomaswl.com/practica/${lang}` },
  ];

  if (level) {
    items.push({
      name: `Nivel ${level.toUpperCase()}`,
      url: `https://www.idiomaswl.com/practica/${lang}/${level}`,
    });

    if (skill && skill !== 'gramatica') {
      items.push({
        name: `${capitalizeFirst(skill)}`,
        url: `https://www.idiomaswl.com/practica/${lang}/${level}/${skill}`,
      });
    }

    if (skill === 'gramatica' && theme) {
      items.push({
        name: 'Gramática',
        url: `https://www.idiomaswl.com/practica/${lang}/${level}/gramatica`,
      });
      items.push({
        name: theme,
        url: `https://www.idiomaswl.com/practica/${lang}/${level}/gramatica/${theme}`,
      });
    }
  }

  return items;
}

export function blogBreadcrumbs(slug: string, category?: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { name: 'Inicio', url: 'https://www.idiomaswl.com' },
    { name: 'Blog', url: 'https://www.idiomaswl.com/blog' },
  ];

  if (category) {
    items.push({
      name: `${capitalizeFirst(category)}`,
      url: `https://www.idiomaswl.com/blog?category=${category}`,
    });
  }

  items.push({
    name: slug,
    url: `https://www.idiomaswl.com/blog/${slug}`,
  });

  return items;
}

export function examenBreadcrumbs(exam: string, level?: string): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { name: 'Inicio', url: 'https://www.idiomaswl.com' },
    { name: 'Exámenes', url: 'https://www.idiomaswl.com/examenes' },
    { name: capitalizeFirst(exam), url: `https://www.idiomaswl.com/examenes/${exam}` },
  ];

  if (level) {
    items.push({
      name: level,
      url: `https://www.idiomaswl.com/examenes/${exam}/${level}`,
    });
  }

  return items;
}

function capitalizeFirst(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
