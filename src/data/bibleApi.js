// Bible API service
// Using Bolls Bible API (https://bolls.life/) - supports NIV, NLT, ESV, MSG, NKJV, and more
// Free, no API key required

const BASE_URL = 'https://bolls.life'

/**
 * Parse a Bible reference like "John 3:16" or "Psalm 23:1-6" into components
 * @param {string} reference - e.g. "John 3:16" or "Psalm 23:1-6"
 * @returns {{book: string, chapter: number, verses: number[]}}
 */
function parseReference(reference) {
  const match = reference.match(/^(.+?)\s+(\d+):(\d+)(?:-(\d+))?$/)
  if (!match) throw new Error(`Invalid reference format: ${reference}`)
  
  const [, book, chapter, startVerse, endVerse] = match
  const verses = []
  const start = parseInt(startVerse)
  const end = endVerse ? parseInt(endVerse) : start
  
  for (let i = start; i <= end; i++) {
    verses.push(i)
  }
  
  return { book: book.trim(), chapter: parseInt(chapter), verses }
}

/**
 * Fetch a verse or passage for a given translation.
 * @param {string} reference - e.g. "John 3:16" or "Psalm 23:1-6"
 * @param {string} translationId - e.g. "KJV", "NIV", "NKJV"
 * @returns {Promise<{ text: string, verses: Array, reference: string }>}
 */
export async function fetchVerse(reference, translationId) {
  const { book, chapter, verses } = parseReference(reference)
  
  // Use soft links feature with book abbreviations
  const url = `${BASE_URL}/get-text/${translationId}/${book}/${chapter}/`

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`Network error: ${res.status} ${res.statusText}`)
  }

  const data = await res.json()

  // Filter verses to only those requested
  const verseSet = new Set(verses)
  const filteredVerses = Array.isArray(data) 
    ? data.filter(v => verseSet.has(v.verse))
    : []

  // Build text from filtered verses
  const text = filteredVerses
    .map(v => `${v.verse} ${v.text}`)
    .join(' ')

  return {
    text: text || 'Verse not found',
    verses: filteredVerses,
    reference,
    translationId,
  }
}

/**
 * Fetch a verse across multiple translations in parallel.
 * Returns an array of settled results (resolved or rejected).
 * @param {string} reference
 * @param {string[]} translationIds
 */
export async function fetchAllTranslations(reference, translationIds) {
  const promises = translationIds.map(id =>
    fetchVerse(reference, id)
      .then(data => ({ status: 'fulfilled', id, data }))
      .catch(error => ({ status: 'rejected', id, error: error.message }))
  )
  return Promise.all(promises)
}
