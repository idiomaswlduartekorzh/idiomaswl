/** Route an explicit download action through the server entitlement check. */
export function protectedMaterialHref(source: string): string {
  if (source.startsWith('/api/site-materials/')) return source;
  if (!source.startsWith('/') || source.includes('..')) throw new Error('invalid_material_source');
  return `/api/site-materials/_public${source}`;
}
