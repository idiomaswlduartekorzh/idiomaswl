import type { BodyOneBlock } from './body-one-data';
import styles from '../introduccion/page.module.css';

export default function ColoredBodyParagraph({ blocks }: { blocks: BodyOneBlock[] }) {
  return <p className={styles.coloredParagraph}>
    {blocks.map((block) => <span key={`${block.label}-${block.text}`} className={`${styles.paragraphBlock} ${styles[block.tone]}`} title={block.label}>{block.text}</span>)}
  </p>;
}
