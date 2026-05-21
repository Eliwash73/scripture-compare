import { useState, useCallback } from 'react'
import { fetchVerse } from '../data/bibleApi'

/**
 * Hook to manage fetching a verse for a single translation.
 * Each VerseCard uses this independently so they load in parallel.
 */
export function useVerse(reference, translationId) {
  const [state, setState] = useState({
    status: 'idle', // 'idle' | 'loading' | 'done' | 'error'
    data: null,
    error: null,
  })

  const load = useCallback(() => {
    if (!reference || !translationId) return

    setState({ status: 'loading', data: null, error: null })

    fetchVerse(reference, translationId)
      .then(data => setState({ status: 'done', data, error: null }))
      .catch(err => setState({ status: 'error', data: null, error: err.message }))
  }, [reference, translationId])

  return { ...state, load }
}

/**
 * Hook to manage URL-based search state.
 * Syncs ?ref= and ?t= query params for shareable links.
 */
export function useSearchState() {
  const getParams = () => {
    const params = new URLSearchParams(window.location.search)
    return {
      ref: params.get('ref') || '',
      translations: params.get('t') ? params.get('t').split(',') : null,
    }
  }

  const setParams = useCallback((ref, translationIds) => {
    const params = new URLSearchParams()
    if (ref) params.set('ref', ref)
    if (translationIds?.length) params.set('t', translationIds.join(','))
    const newUrl = `${window.location.pathname}?${params.toString()}`
    window.history.pushState({}, '', newUrl)
  }, [])

  return { getParams, setParams }
}
