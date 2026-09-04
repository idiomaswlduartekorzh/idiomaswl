/** Pixel coordinates on the preserved source images, not a new answer key.
 * Each rectangle covers only the printed answer line, never its question number.
 * The original question template remains the accessible alternative view.
 */
export interface IeltsDiagramLayout {
  imageUrl: string;
  width: number;
  height: number;
  blanks: { num: number; x: number; y: number; width: number; height: number; context: string }[];
}

export const IELTS_SET1_DIAGRAM_LAYOUTS: Record<string, IeltsDiagramLayout> = {
  'r1-flowchart': {
    imageUrl: '/ielts/images/reading-set-1-bakelite-flowchart.png',
    width: 992, height: 1306,
    blanks: [
      { num: 4, x: 620, y: 216, width: 104, height: 32, context: 'Stage one resin, called' },
      { num: 5, x: 238, y: 420, width: 101, height: 32, context: 'Added substance, for example cotton or asbestos' },
      { num: 6, x: 300, y: 575, width: 102, height: 32, context: 'Compound formed from ammonia and formaldehyde' },
      { num: 7, x: 550, y: 907, width: 102, height: 32, context: 'Bakelite before heating' },
      { num: 8, x: 605, y: 1162, width: 103, height: 32, context: 'Applied with intense heat' },
    ],
  },
  'r2-diagram': {
    imageUrl: '/ielts/images/reading-set-1-brain-diagram.png',
    width: 1068, height: 682,
    blanks: [
      { num: 21, x: 877, y: 113, width: 125, height: 32, context: 'Right prefrontal cortex: area of brain linked to' },
      { num: 22, x: 698, y: 580, width: 102, height: 32, context: 'Brain areas that become active too' },
      { num: 23, x: 229, y: 170, width: 128, height: 32, context: 'Orbital prefrontal cortex: involved with' },
    ],
  },
};

export function getIeltsDiagramLayout(id: string, imageUrl?: string): IeltsDiagramLayout | null {
  const layout = IELTS_SET1_DIAGRAM_LAYOUTS[id];
  return layout?.imageUrl === imageUrl ? layout : null;
}
