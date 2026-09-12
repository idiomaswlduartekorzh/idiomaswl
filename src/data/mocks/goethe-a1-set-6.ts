import { buildGoetheA1AudioManifest, buildGoetheA1Set } from './goethe-a1-set-builder';
import { getGoetheA1SetContent } from './goethe-a1-sets-3-8-content';

const content = getGoetheA1SetContent(6);
export const audioManifest = buildGoetheA1AudioManifest(content);
export default buildGoetheA1Set(content);
