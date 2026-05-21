import { useState, useEffect, useCallback } from 'react'
import { TRANSLATIONS, DEFAULT_SELECTED } from './data/translations'
import SearchBar from './components/SearchBar'
import TranslationSelector from './components/TranslationSelector'
import VerseCard from './components/VerseCard'
import EmptyState from './components/EmptyState'
import styles from './App.module.css'

// Read initial state from URL params (enables shareable links)
function getInitialState() {
  const params = new URLSearchParams(window.location.search)
  const ref = params.get('ref') || ''
  const t = params.get('t')
  const translationIds = t ? t.split(',').filter(id => TRANSLATIONS.find(x => x.id === id)) : DEFAULT_SELECTED
  return { ref, translationIds }
}

export default function App() {
  const initial = getInitialState()

  const [inputVal, setInputVal]     = useState(initial.ref)
  const [currentRef, setCurrentRef] = useState(initial.ref || null)
  const [selected, setSelected]     = useState(new Set(initial.translationIds))
  const [copiedAll, setCopiedAll]   = useState(false)

  // Sync URL when search changes
  useEffect(() => {
    if (!currentRef) return
    const params = new URLSearchParams()
    params.set('ref', currentRef)
    params.set('t', [...selected].join(','))
    window.history.replaceState({}, '', `?${params.toString()}`)
  }, [currentRef, selected])

  const handleSearch = useCallback(() => {
    const ref = inputVal.trim()
    if (!ref) return
    setCurrentRef(ref)
  }, [inputVal])

  const handleExample = (ex) => {
    setInputVal(ex)
    setCurrentRef(ex)
  }

  const selectedTrans = TRANSLATIONS.filter(t => selected.has(t.id))

  const handleCopyAll = () => {
    const header = `Scripture Compare — ${currentRef}\n${'─'.repeat(40)}\n\n`
    const footer = `\nTranslations: ${selectedTrans.map(t => t.abbr).join(', ')}`
    navigator.clipboard.writeText(header + footer).then(() => {
      setCopiedAll(true)
      setTimeout(() => setCopiedAll(false), 2000)
    })
  }

  return (
    <div className={styles.app}>
      {/* Header */}
      <header className={styles.header}>
        <i className="ti ti-book-2" aria-hidden="true" className={styles.headerIcon} />
        <div>
          <h1 className={styles.headerTitle}>Scripture Compare</h1>
          <p className={styles.headerSub}>Multi-Translation Verse Viewer</p>
        </div>
      </header>

      {/* Search */}
      <div className={styles.searchPadding}>
        <SearchBar
          value={inputVal}
          onChange={setInputVal}
          onSearch={handleSearch}
        />
      </div>

      {/* Translation selector */}
      <TranslationSelector selected={selected} onChange={setSelected} />

      {/* Results */}
      <main className={styles.results}>
        {currentRef ? (
          <>
            <div className={styles.resultsHeader}>
              <div className={styles.refRow}>
                <span className={styles.passageRef}>{currentRef}</span>
                <span className={styles.count}>
                  {selectedTrans.length} translation{selectedTrans.length !== 1 ? 's' : ''}
                </span>
              </div>
              <button
                className={`${styles.copyAllBtn} ${copiedAll ? styles.copied : ''}`}
                onClick={handleCopyAll}
                aria-label="Copy all references"
              >
                <i className={`ti ${copiedAll ? 'ti-check' : 'ti-copy'}`} aria-hidden="true" />
                {copiedAll ? 'Copied' : 'Copy all'}
              </button>
            </div>

            <div className={styles.grid}>
              {selectedTrans.map((t, i) => (
                <div
                  key={`${currentRef}-${t.id}`}
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <VerseCard trans={t} reference={currentRef} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <EmptyState onExample={handleExample} />
        )}
      </main>
    </div>
  )
}
