import { useEffect, useState } from 'react'
import { fetchVerse } from '../data/bibleApi'
import styles from './VerseCard.module.css'

export default function VerseCard({ trans, reference }) {
  const [status, setStatus] = useState('loading')
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setStatus('loading')
    setData(null)
    setError(null)

    fetchVerse(reference, trans.id)
      .then(result => {
        setData(result)
        setStatus('done')
      })
      .catch(err => {
        setError(err.message)
        setStatus('error')
      })
  }, [reference, trans.id])

  const handleCopy = () => {
    if (!data) return
    const text = `${trans.abbr} — ${reference}\n\n${data.text.trim()}`
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  if (status === 'loading') {
    return (
      <div className={styles.card} aria-busy="true" aria-label={`Loading ${trans.abbr}`}>
        <div className={styles.skeletonHeader} />
        <div className={styles.skeletonBody}>
          <div className={`${styles.skel} ${styles.skel100}`} />
          <div className={`${styles.skel} ${styles.skel85}`} />
          <div className={`${styles.skel} ${styles.skel90}`} />
          <div className={`${styles.skel} ${styles.skel60}`} />
        </div>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className={styles.errorCard} role="alert">
        <div className={styles.errorAbbr}>{trans.abbr}</div>
        <div className={styles.errorMsg}>
          Could not load this translation. It may not support this passage.
        </div>
      </div>
    )
  }

  const hasMultiple = data.verses?.length > 1

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <span className={styles.abbr}>{trans.abbr}</span>
        <span className={styles.name}>{trans.name}</span>
      </div>

      <div className={styles.cardBody}>
        <p className={styles.verseText}>
          {hasMultiple
            ? data.verses.map(v => (
                <span key={v.verse}>
                  <sup className={styles.verseNum}>{v.verse}</sup>
                  {v.text.trim()}{' '}
                </span>
              ))
            : data.text.trim()
          }
        </p>
      </div>

      <div className={styles.cardFooter}>
        <button
          className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
          onClick={handleCopy}
          aria-label={copied ? 'Copied' : `Copy ${trans.abbr} text`}
        >
          <i className={`ti ${copied ? 'ti-check' : 'ti-copy'}`} aria-hidden="true" />
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  )
}
