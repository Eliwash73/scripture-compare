import { TRANSLATIONS } from '../data/translations'
import styles from './TranslationSelector.module.css'

export default function TranslationSelector({ selected, onChange }) {
  const toggle = (id) => {
    const next = new Set(selected)
    if (next.has(id)) {
      if (next.size > 1) next.delete(id) // always keep at least 1
    } else {
      next.add(id)
    }
    onChange(next)
  }

  const selectAll = () => onChange(new Set(TRANSLATIONS.map(t => t.id)))
  const clearAll = () => onChange(new Set([TRANSLATIONS[0].id]))

  return (
    <div className={styles.section}>
      <div className={styles.label}>Translations — select to compare</div>
      <div className={styles.chips} role="group" aria-label="Select translations">
        {TRANSLATIONS.map(t => (
          <button
            key={t.id}
            className={`${styles.chip} ${selected.has(t.id) ? styles.selected : ''}`}
            onClick={() => toggle(t.id)}
            aria-pressed={selected.has(t.id)}
            title={t.name}
          >
            {t.abbr}
          </button>
        ))}
      </div>
      <div className={styles.actions}>
        <button className={styles.smallBtn} onClick={selectAll}>Select all</button>
        <button className={styles.smallBtn} onClick={clearAll}>Clear</button>
      </div>
    </div>
  )
}
