import { EXAMPLE_VERSES } from '../data/translations'
import styles from './EmptyState.module.css'

export default function EmptyState({ onExample }) {
  return (
    <div className={styles.wrap} role="region" aria-label="Getting started">
      <div className={styles.icon} aria-hidden="true">
        <i className="ti ti-book-open" />
      </div>
      <h2 className={styles.title}>Enter a verse or passage to begin</h2>
      <p className={styles.sub}>
        Type a reference above and choose your translations.<br />
        Supports single verses, ranges, and full chapters.
      </p>
      <div className={styles.examples} role="list">
        {EXAMPLE_VERSES.map(ex => (
          <button
            key={ex}
            className={styles.pill}
            onClick={() => onExample(ex)}
            role="listitem"
            aria-label={`Try ${ex}`}
          >
            {ex}
          </button>
        ))}
      </div>
    </div>
  )
}
