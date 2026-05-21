// Bible API service
// Currently wired to bible-api.com (free, no key, public domain translations)
// See .env.example to switch to api.bible for NIV/ESV/NLT/MSG

const BASE_URL = 'https://bible-api.com'

/**
 * Fetch a verse or passage for a given translation.
 * @param {string} reference - e.g. "John 3:16" or "Psalm 23:1-6"
 * @param {string} translationId - e.g. "kjv", "web"
 * @returns {Promise<{ text: string, verses: Array, reference: string }>}
 */
export async function fetchVerse(reference, translationId) {
  const encoded = encodeURIComponent(reference)
  const url = `${BASE_URL}/${encoded}?translation=${translationId}`

  const res = await fetch(url)

  if (!res.ok) {
    throw new Error(`Network error: ${res.status} ${res.statusText}`)
  }

  const data = await res.json()

  if (data.error) {
    throw new Error(data.error)
  }

  return {
    text: data.text,
    verses: data.verses || [],
    reference: data.reference,
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
