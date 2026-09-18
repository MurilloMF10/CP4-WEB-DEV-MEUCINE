import { useReducer } from 'react'

const STORAGE_KEY = 'meu-cine:watchlist'

const readWatchlist = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

export default function WatchlistButton({ item, onChange }) {
  const [, refresh] = useReducer((value) => value + 1, 0)
  const saved = readWatchlist().some((savedItem) => String(savedItem.id) === String(item.id))

  function toggleWatchlist() {
    const current = readWatchlist()
    const exists = current.some((savedItem) => String(savedItem.id) === String(item.id))
    const next = exists ? current.filter((savedItem) => String(savedItem.id) !== String(item.id)) : [...current, item]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    refresh()
    onChange?.(next)
  }

  return <button className={`watchlist-button ${saved ? 'is-saved' : ''}`} onClick={toggleWatchlist} type="button">{saved ? 'NA MINHA LISTA' : 'ADICIONAR À LISTA'}</button>
}
