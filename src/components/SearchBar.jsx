import styles from './SearchBar.module.css'

export default function SearchBar({ value, onChange, onSearch }) {
  const handleKey = (e) => {
    if (e.key === 'Enter') onSearch()
  }

  return (
    <div className={styles.section}>
      <div className={styles.row}>
        <div className={styles.inputWrap}>
          <i className="ti ti-search" aria-hidden="true" />
          <input
            className={styles.input}
            type="text"
            placeholder="e.g. John 3:16  ·  Psalm 23:1-6  ·  Romans 8:28"
            value={value}
            onChange={e => onChange(e.target.value)}
            onKeyDown={handleKey}
            aria-label="Bible verse reference"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        <button
          className={styles.searchBtn}
          onClick={onSearch}
          disabled={!value.trim()}
          aria-label="Compare translations"
        >
          <i className="ti ti-arrows-exchange" aria-hidden="true" />
          Compare
        </button>
      </div>
    </div>
  )
}
